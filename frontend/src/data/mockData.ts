import { Transaction } from '../types';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-02-28',
    observation: 'Online Purchase - Amazon',
    amount: 299.99,
    type: 'debit',
    category: 'Shopping',
    ticketProbability: 0.82
  },
  {
    id: '2',
    date: '2024-02-27',
    observation: 'Salary Deposit',
    amount: 5000.00,
    type: 'credit',
    category: 'Income',
    ticketProbability: 0.15
  },
  {
    id: '3',
    date: '2024-02-26',
    observation: 'Restaurant Payment',
    amount: 85.50,
    type: 'debit',
    category: 'Dining',
    ticketProbability: 0.75
  },
  {
    id: '4',
    date: '2024-02-25',
    observation: 'Subscription Service',
    amount: 14.99,
    type: 'debit',
    category: 'Entertainment',
    ticketProbability: 0.91
  },
  {
    id: '5',
    date: '2024-02-24',
    observation: 'Utility Bill',
    amount: 150.00,
    type: 'debit',
    category: 'Bills',
    ticketProbability: 0.88
  }
];