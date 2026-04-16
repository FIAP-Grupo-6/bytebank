'use client';

import { useState } from 'react';
import { TransactionFormModal } from '@/views/TransactionFormModal';

export default function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div>Transactions</div>
      <button onClick={() => setIsModalOpen(true)}>Abrir</button>

      <TransactionFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
