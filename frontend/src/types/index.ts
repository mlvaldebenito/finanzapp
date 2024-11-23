export interface Transaction {
  id: string;
  accountingDate: string;
  observation: string;
  amount: number;
  type: 'credit' | 'debit';
  category: string;
  ticketProbability: number;
}