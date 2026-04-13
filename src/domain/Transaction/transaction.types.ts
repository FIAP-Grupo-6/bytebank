import { z } from 'zod';

export const TransactionSchema = z.object({
  id: z.number(),
  description: z.string(),
  date: z.string(),
  category: z.string(),
  value: z.number(),
  type: z.enum(['deposito', 'pagamento', 'transferencia', 'saque']),
});

export type Transaction = z.infer<typeof TransactionSchema>;

export const TransactionResponseSchema = z.array(TransactionSchema);
