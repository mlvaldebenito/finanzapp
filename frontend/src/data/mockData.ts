import { Transaction } from '../types';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-02-28',
    description: 'Online Purchase - Amazon',
    amount: 299.99,
    type: 'debit',
    category: 'Shopping',
    ticketProbability: 0.82
  },
  {
    id: '2',
    date: '2024-02-27',
    description: 'Salary Deposit',
    amount: 5000.00,
    type: 'credit',
    category: 'Income',
    ticketProbability: 0.15
  },
  {
    id: '3',
    date: '2024-02-26',
    description: 'Restaurant Payment',
    amount: 85.50,
    type: 'debit',
    category: 'Dining',
    ticketProbability: 0.75
  },
  {
    id: '4',
    date: '2024-02-25',
    description: 'Subscription Service',
    amount: 14.99,
    type: 'debit',
    category: 'Entertainment',
    ticketProbability: 0.91
  },
  {
    id: '5',
    date: '2024-02-24',
    description: 'Utility Bill',
    amount: 150.00,
    type: 'debit',
    category: 'Bills',
    ticketProbability: 0.88
  }
];