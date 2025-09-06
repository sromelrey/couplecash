import { create } from "zustand";

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Income {
  id: number;
  user_id: number;
  amount: number;
  source: string;
  received_at: string;
  created_at: string;
}

export interface Expense {
  id: number;
  user_id: number;
  category: "groceries" | "bills" | "credit_card" | "misc";
  description: string;
  amount: number;
  expense_date: string;
  created_at: string;
}

export interface CreditCard {
  id: number;
  user_id: number;
  bank: string;
  card_number: string;
  swipe_date: string;
  due_date: string;
  payable_amount: number;
  created_at: string;
}

export interface Cash {
  id: number;
  user_id: number;
  amount: number;
  source: string; // "withdrawal", "salary_cash", "change"
  description: string;
  transaction_date: string;
  created_at: string;
}

export interface DebitCard {
  id: number;
  user_id: number;
  bank: string;
  card_number: string;
  amount: number;
  description: string;
  transaction_date: string;
  created_at: string;
}

interface FinanceStore {
  users: User[];
  incomes: Income[];
  expenses: Expense[];
  creditCards: CreditCard[];
  cash: Cash[];
  debitCards: DebitCard[];

  // Income actions
  addIncome: (income: Omit<Income, "id" | "created_at">) => void;
  updateIncome: (id: number, updates: Partial<Income>) => void;
  deleteIncome: (id: number) => void;

  // Expense actions
  addExpense: (expense: Omit<Expense, "id" | "created_at">) => void;
  updateExpense: (id: number, updates: Partial<Expense>) => void;
  deleteExpense: (id: number) => void;

  // Credit card actions
  addCreditCard: (card: Omit<CreditCard, "id" | "created_at">) => void;
  updateCreditCard: (id: number, updates: Partial<CreditCard>) => void;
  deleteCreditCard: (id: number) => void;

  // Cash actions
  addCash: (cash: Omit<Cash, "id" | "created_at">) => void;
  updateCash: (id: number, updates: Partial<Cash>) => void;
  deleteCash: (id: number) => void;

  // Debit card actions
  addDebitCard: (card: Omit<DebitCard, "id" | "created_at">) => void;
  updateDebitCard: (id: number, updates: Partial<DebitCard>) => void;
  deleteDebitCard: (id: number) => void;

  // Data setters
  setUsers: (users: User[]) => void;
  setIncomes: (incomes: Income[]) => void;
  setExpenses: (expenses: Expense[]) => void;
  setCreditCards: (cards: CreditCard[]) => void;
  setCash: (cash: Cash[]) => void;
  setDebitCards: (cards: DebitCard[]) => void;

  // Computed values
  getTotalIncome: () => number;
  getTotalExpenses: () => number;
  getTotalCreditCardDebt: () => number;
  getTotalCash: () => number;
  getTotalDebitCardSpending: () => number;
  getBalance: () => number;
  getExpensesByCategory: () => Record<string, number>;
}

export const useFinanceStore = create<FinanceStore>((set, get) => ({
  users: [],
  incomes: [],
  expenses: [],
  creditCards: [],
  cash: [],
  debitCards: [],

  addIncome: (income) =>
    set((state) => ({
      incomes: [
        ...state.incomes,
        {
          ...income,
          id: Date.now(),
          created_at: new Date().toISOString(),
        },
      ],
    })),

  updateIncome: (id, updates) =>
    set((state) => ({
      incomes: state.incomes.map((income) =>
        income.id === id ? { ...income, ...updates } : income
      ),
    })),

  deleteIncome: (id) =>
    set((state) => ({
      incomes: state.incomes.filter((income) => income.id !== id),
    })),

  addExpense: (expense) =>
    set((state) => ({
      expenses: [
        ...state.expenses,
        {
          ...expense,
          id: Date.now(),
          created_at: new Date().toISOString(),
        },
      ],
    })),

  updateExpense: (id, updates) =>
    set((state) => ({
      expenses: state.expenses.map((expense) =>
        expense.id === id ? { ...expense, ...updates } : expense
      ),
    })),

  deleteExpense: (id) =>
    set((state) => ({
      expenses: state.expenses.filter((expense) => expense.id !== id),
    })),

  addCreditCard: (card) =>
    set((state) => ({
      creditCards: [
        ...state.creditCards,
        {
          ...card,
          id: Date.now(),
          created_at: new Date().toISOString(),
        },
      ],
    })),

  updateCreditCard: (id, updates) =>
    set((state) => ({
      creditCards: state.creditCards.map((card) =>
        card.id === id ? { ...card, ...updates } : card
      ),
    })),

  deleteCreditCard: (id) =>
    set((state) => ({
      creditCards: state.creditCards.filter((card) => card.id !== id),
    })),

  addCash: (cash) =>
    set((state) => ({
      cash: [
        ...state.cash,
        {
          ...cash,
          id: Date.now(),
          created_at: new Date().toISOString(),
        },
      ],
    })),

  updateCash: (id, updates) =>
    set((state) => ({
      cash: state.cash.map((cash) =>
        cash.id === id ? { ...cash, ...updates } : cash
      ),
    })),

  deleteCash: (id) =>
    set((state) => ({
      cash: state.cash.filter((cash) => cash.id !== id),
    })),

  addDebitCard: (card) =>
    set((state) => ({
      debitCards: [
        ...state.debitCards,
        {
          ...card,
          id: Date.now(),
          created_at: new Date().toISOString(),
        },
      ],
    })),

  updateDebitCard: (id, updates) =>
    set((state) => ({
      debitCards: state.debitCards.map((card) =>
        card.id === id ? { ...card, ...updates } : card
      ),
    })),

  deleteDebitCard: (id) =>
    set((state) => ({
      debitCards: state.debitCards.filter((card) => card.id !== id),
    })),

  setUsers: (users) => set({ users }),
  setIncomes: (incomes) => set({ incomes }),
  setExpenses: (expenses) => set({ expenses }),
  setCreditCards: (creditCards) => set({ creditCards }),
  setCash: (cash) => set({ cash }),
  setDebitCards: (debitCards) => set({ debitCards }),

  getTotalIncome: () => {
    const { incomes } = get();
    return incomes.reduce((total, income) => total + income.amount, 0);
  },

  getTotalExpenses: () => {
    const { expenses } = get();
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  },

  getTotalCreditCardDebt: () => {
    const { creditCards } = get();
    return creditCards.reduce((total, card) => total + card.payable_amount, 0);
  },

  getTotalCash: () => {
    const { cash } = get();
    return cash.reduce((total, cash) => total + cash.amount, 0);
  },

  getTotalDebitCardSpending: () => {
    const { debitCards } = get();
    return debitCards.reduce((total, card) => total + card.amount, 0);
  },

  getBalance: () => {
    const {
      getTotalIncome,
      getTotalExpenses,
      getTotalCreditCardDebt,
      getTotalDebitCardSpending,
    } = get();
    return (
      getTotalIncome() -
      getTotalExpenses() -
      getTotalCreditCardDebt() -
      getTotalDebitCardSpending()
    );
  },

  getExpensesByCategory: () => {
    const { expenses } = get();
    return expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);
  },
}));
