import { User, Income, Expense, CreditCard, Cash, DebitCard } from "./store";

export const mockUsers: User[] = [
  { id: 1, name: "Romel Rey", email: "romel@example.com" },
  { id: 2, name: "Joy Silva", email: "joy@example.com" },
];

export const mockIncomes: Income[] = [
  {
    id: 1,
    user_id: 1,
    amount: 50000,
    source: "Salary",
    received_at: "2025-01-01",
    created_at: "2025-01-01T10:00:00Z",
  },
  {
    id: 2,
    user_id: 2,
    amount: 45000,
    source: "Salary",
    received_at: "2025-01-01",
    created_at: "2025-01-01T10:00:00Z",
  },
  {
    id: 3,
    user_id: 1,
    amount: 5000,
    source: "Bonus",
    received_at: "2025-01-15",
    created_at: "2025-01-15T10:00:00Z",
  },
];

export const mockExpenses: Expense[] = [
  {
    id: 1,
    user_id: 1,
    category: "groceries",
    description: "Supermarket run - weekly groceries",
    amount: 5000,
    expense_date: "2025-01-03",
    created_at: "2025-01-03T10:00:00Z",
  },
  {
    id: 2,
    user_id: 2,
    category: "bills",
    description: "Electricity bill",
    amount: 3000,
    expense_date: "2025-01-05",
    created_at: "2025-01-05T10:00:00Z",
  },
  {
    id: 3,
    user_id: 1,
    category: "misc",
    description: "Dinner out with friends",
    amount: 1500,
    expense_date: "2025-01-06",
    created_at: "2025-01-06T10:00:00Z",
  },
  {
    id: 4,
    user_id: 2,
    category: "groceries",
    description: "Organic vegetables",
    amount: 2000,
    expense_date: "2025-01-08",
    created_at: "2025-01-08T10:00:00Z",
  },
  {
    id: 5,
    user_id: 1,
    category: "bills",
    description: "Internet bill",
    amount: 2500,
    expense_date: "2025-01-10",
    created_at: "2025-01-10T10:00:00Z",
  },
];

export const mockCreditCards: CreditCard[] = [
  {
    id: 1,
    user_id: 1,
    bank: "BPI",
    card_number: "****-****-****-1234",
    swipe_date: "2025-01-01",
    due_date: "2025-01-25",
    payable_amount: 12000,
    created_at: "2025-01-01T10:00:00Z",
  },
  {
    id: 2,
    user_id: 2,
    bank: "BDO",
    card_number: "****-****-****-5678",
    swipe_date: "2025-01-02",
    due_date: "2025-01-28",
    payable_amount: 8000,
    created_at: "2025-01-02T10:00:00Z",
  },
  {
    id: 3,
    user_id: 1,
    bank: "Metrobank",
    card_number: "****-****-****-9012",
    swipe_date: "2025-01-05",
    due_date: "2025-02-05",
    payable_amount: 15000,
    created_at: "2025-01-05T10:00:00Z",
  },
];

export const mockCash: Cash[] = [
  {
    id: 1,
    user_id: 1,
    amount: 5000,
    source: "withdrawal",
    description: "ATM withdrawal for daily expenses",
    transaction_date: "2025-01-02",
    created_at: "2025-01-02T10:00:00Z",
  },
  {
    id: 2,
    user_id: 2,
    amount: 3000,
    source: "salary_cash",
    description: "Cash portion from salary",
    transaction_date: "2025-01-01",
    created_at: "2025-01-01T10:00:00Z",
  },
  {
    id: 3,
    user_id: 1,
    amount: 500,
    source: "change",
    description: "Change from grocery shopping",
    transaction_date: "2025-01-03",
    created_at: "2025-01-03T10:00:00Z",
  },
];

export const mockDebitCards: DebitCard[] = [
  {
    id: 1,
    user_id: 1,
    bank: "BPI",
    card_number: "****-****-****-1111",
    amount: 2500,
    description: "Grocery shopping at SM",
    transaction_date: "2025-01-03",
    created_at: "2025-01-03T10:00:00Z",
  },
  {
    id: 2,
    user_id: 2,
    bank: "BDO",
    card_number: "****-****-****-2222",
    amount: 1800,
    description: "Gas station payment",
    transaction_date: "2025-01-04",
    created_at: "2025-01-04T10:00:00Z",
  },
  {
    id: 3,
    user_id: 1,
    bank: "Metrobank",
    card_number: "****-****-****-3333",
    amount: 3200,
    description: "Online shopping - Lazada",
    transaction_date: "2025-01-05",
    created_at: "2025-01-05T10:00:00Z",
  },
];
