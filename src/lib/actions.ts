"use server";

import { User, Income, Expense, CreditCard, Cash, DebitCard } from "./store";
import {
  mockUsers,
  mockIncomes,
  mockExpenses,
  mockCreditCards,
  mockCash,
  mockDebitCards,
} from "./mock-data";

// Mock database operations - these would be replaced with real DB calls
export async function getUsers(): Promise<User[]> {
  console.log("👥 Fetching users from mock database");
  return mockUsers;
}

export async function getIncomes(): Promise<Income[]> {
  console.log("💰 Fetching incomes from mock database");
  return mockIncomes;
}

export async function getExpenses(): Promise<Expense[]> {
  console.log("💸 Fetching expenses from mock database");
  return mockExpenses;
}

export async function getCreditCards(): Promise<CreditCard[]> {
  console.log("💳 Fetching credit cards from mock database");
  return mockCreditCards;
}

export async function getCash(): Promise<Cash[]> {
  console.log("💵 Fetching cash transactions from mock database");
  return mockCash;
}

export async function getDebitCards(): Promise<DebitCard[]> {
  console.log("💳 Fetching debit card transactions from mock database");
  return mockDebitCards;
}

// Income actions
export async function createIncome(
  incomeData: Omit<Income, "id" | "created_at">
): Promise<Income> {
  console.log("➕ Creating new income:", incomeData);
  const newIncome: Income = {
    ...incomeData,
    id: Date.now(),
    created_at: new Date().toISOString(),
  };
  return newIncome;
}

export async function updateIncome(
  id: number,
  updates: Partial<Income>
): Promise<Income> {
  console.log(`✏️ Updating income ${id}:`, updates);
  const updatedIncome: Income = {
    id,
    ...updates,
  } as Income;
  return updatedIncome;
}

export async function deleteIncome(id: number): Promise<void> {
  console.log(`🗑️ Deleting income ${id}`);
  // In a real app, this would delete from database
}

// Expense actions
export async function createExpense(
  expenseData: Omit<Expense, "id" | "created_at">
): Promise<Expense> {
  console.log("➕ Creating new expense:", expenseData);
  const newExpense: Expense = {
    ...expenseData,
    id: Date.now(),
    created_at: new Date().toISOString(),
  };
  return newExpense;
}

export async function updateExpense(
  id: number,
  updates: Partial<Expense>
): Promise<Expense> {
  console.log(`✏️ Updating expense ${id}:`, updates);
  const updatedExpense: Expense = {
    id,
    ...updates,
  } as Expense;
  return updatedExpense;
}

export async function deleteExpense(id: number): Promise<void> {
  console.log(`🗑️ Deleting expense ${id}`);
  // In a real app, this would delete from database
}

// Credit card actions
export async function createCreditCard(
  cardData: Omit<CreditCard, "id" | "created_at">
): Promise<CreditCard> {
  console.log("➕ Creating new credit card:", cardData);
  const newCard: CreditCard = {
    ...cardData,
    id: Date.now(),
    created_at: new Date().toISOString(),
  };
  return newCard;
}

export async function updateCreditCard(
  id: number,
  updates: Partial<CreditCard>
): Promise<CreditCard> {
  console.log(`✏️ Updating credit card ${id}:`, updates);
  const updatedCard: CreditCard = {
    id,
    ...updates,
  } as CreditCard;
  return updatedCard;
}

export async function deleteCreditCard(id: number): Promise<void> {
  console.log(`🗑️ Deleting credit card ${id}`);
  // In a real app, this would delete from database
}

// Cash actions
export async function createCash(
  cashData: Omit<Cash, "id" | "created_at">
): Promise<Cash> {
  console.log("➕ Creating new cash transaction:", cashData);
  const newCash: Cash = {
    ...cashData,
    id: Date.now(),
    created_at: new Date().toISOString(),
  };
  return newCash;
}

export async function updateCash(
  id: number,
  updates: Partial<Cash>
): Promise<Cash> {
  console.log(`✏️ Updating cash transaction ${id}:`, updates);
  const updatedCash: Cash = {
    id,
    ...updates,
  } as Cash;
  return updatedCash;
}

export async function deleteCash(id: number): Promise<void> {
  console.log(`🗑️ Deleting cash transaction ${id}`);
  // In a real app, this would delete from database
}

// Debit card actions
export async function createDebitCard(
  cardData: Omit<DebitCard, "id" | "created_at">
): Promise<DebitCard> {
  console.log("➕ Creating new debit card transaction:", cardData);
  const newCard: DebitCard = {
    ...cardData,
    id: Date.now(),
    created_at: new Date().toISOString(),
  };
  return newCard;
}

export async function updateDebitCard(
  id: number,
  updates: Partial<DebitCard>
): Promise<DebitCard> {
  console.log(`✏️ Updating debit card transaction ${id}:`, updates);
  const updatedCard: DebitCard = {
    id,
    ...updates,
  } as DebitCard;
  return updatedCard;
}

export async function deleteDebitCard(id: number): Promise<void> {
  console.log(`🗑️ Deleting debit card transaction ${id}`);
  // In a real app, this would delete from database
}
