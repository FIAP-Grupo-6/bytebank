import { useMemo } from 'react';
import { useEffect, useState } from 'react'
import { transactionViewModel } from '@/domain/Transaction'
import { Transaction } from '@/types/transaction'

export function useDashboard() {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    async function fetchTransactions() {
        try {
            setLoading(true)
            const data = await transactionViewModel.getAll()
            setTransactions(data)
        } catch (err) {
            setError('Erro ao carregar as transações')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTransactions()
    }, [])

    const recentTransactions = useMemo(() => {
        return [...transactions]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 6)
    }, [transactions])

    const { balance, income, expense } = useMemo(() => {
        let balance = 0
        let income = 0
        let expense = 0

        for(const transaction of transactions) {
            balance += transaction.value

            if(transaction.value > 0) {
                income += transaction.value
            } else {
                expense += Math.abs(transaction.value)
            }
        }

        return { balance, income, expense }
    }, [transactions])

    return {
        transactions,
        recentTransactions,
        balance,
        income,
        expense,
        loading,
        error,
        reload: fetchTransactions
    }
}