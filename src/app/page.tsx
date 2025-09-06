"use client";

import { useEffect, useState } from "react";
import {
  useFinanceStore,
  Income,
  Expense,
  CreditCard,
  Cash,
  DebitCard,
} from "@/lib/store";
import { FinancialOverview } from "@/components/financial-overview";
import { TransactionsList } from "@/components/transactions-list";
import { IncomeModal } from "@/components/income-modal";
import { ExpenseModal } from "@/components/expense-modal";
import { CreditCardModal } from "@/components/credit-card-modal";
import { CashModal } from "@/components/cash-modal";
import { DebitCardModal } from "@/components/debit-card-modal";
import { HelpModal } from "@/components/help-modal";
import { Button } from "@/components/ui/button";
import { Plus, Wallet } from "lucide-react";
import {
  getUsers,
  getIncomes,
  getExpenses,
  getCreditCards,
  getCash,
  getDebitCards,
  createIncome,
  updateIncome,
  deleteIncome,
  createExpense,
  updateExpense,
  deleteExpense,
  createCreditCard,
  updateCreditCard,
  deleteCreditCard,
  createCash,
  updateCash,
  deleteCash,
  createDebitCard,
  updateDebitCard,
  deleteDebitCard,
} from "@/lib/actions";

export default function Home() {
  const {
    users,
    setUsers,
    setIncomes,
    setExpenses,
    setCreditCards,
    setCash,
    setDebitCards,
    addIncome,
    updateIncome: updateIncomeStore,
    deleteIncome: deleteIncomeStore,
    addExpense,
    updateExpense: updateExpenseStore,
    deleteExpense: deleteExpenseStore,
    addCreditCard,
    updateCreditCard: updateCreditCardStore,
    deleteCreditCard: deleteCreditCardStore,
    addCash,
    updateCash: updateCashStore,
    deleteCash: deleteCashStore,
    addDebitCard,
    updateDebitCard: updateDebitCardStore,
    deleteDebitCard: deleteDebitCardStore,
  } = useFinanceStore();

  const [isLoading, setIsLoading] = useState(true);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isCreditCardModalOpen, setIsCreditCardModalOpen] = useState(false);
  const [editingIncome, setEditingIncome] = useState<Income | null>(null);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [editingCreditCard, setEditingCreditCard] = useState<CreditCard | null>(
    null
  );
  const [isCashModalOpen, setIsCashModalOpen] = useState(false);
  const [editingCash, setEditingCash] = useState<Cash | null>(null);
  const [isDebitCardModalOpen, setIsDebitCardModalOpen] = useState(false);
  const [editingDebitCard, setEditingDebitCard] = useState<DebitCard | null>(
    null
  );

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          usersData,
          incomesData,
          expensesData,
          creditCardsData,
          cashData,
          debitCardsData,
        ] = await Promise.all([
          getUsers(),
          getIncomes(),
          getExpenses(),
          getCreditCards(),
          getCash(),
          getDebitCards(),
        ]);

        setUsers(usersData);
        setIncomes(incomesData);
        setExpenses(expensesData);
        setCreditCards(creditCardsData);
        setCash(cashData);
        setDebitCards(debitCardsData);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [
    setUsers,
    setIncomes,
    setExpenses,
    setCreditCards,
    setCash,
    setDebitCards,
  ]);

  // Income handlers
  const handleAddIncome = () => {
    setEditingIncome(null);
    setIsIncomeModalOpen(true);
  };

  const handleEditIncome = (income: Income) => {
    setEditingIncome(income);
    setIsIncomeModalOpen(true);
  };

  const handleSaveIncome = async (
    incomeData: Omit<Income, "id" | "created_at">
  ) => {
    try {
      if (editingIncome) {
        await updateIncome(editingIncome.id, incomeData);
        updateIncomeStore(editingIncome.id, incomeData);
      } else {
        await createIncome(incomeData);
        addIncome(incomeData);
      }
    } catch (error) {
      console.error("Failed to save income:", error);
    }
  };

  const handleDeleteIncome = async (id: number) => {
    try {
      await deleteIncome(id);
      deleteIncomeStore(id);
    } catch (error) {
      console.error("Failed to delete income:", error);
    }
  };

  // Expense handlers
  const handleAddExpense = () => {
    setEditingExpense(null);
    setIsExpenseModalOpen(true);
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setIsExpenseModalOpen(true);
  };

  const handleSaveExpense = async (
    expenseData: Omit<Expense, "id" | "created_at">
  ) => {
    try {
      if (editingExpense) {
        await updateExpense(editingExpense.id, expenseData);
        updateExpenseStore(editingExpense.id, expenseData);
      } else {
        await createExpense(expenseData);
        addExpense(expenseData);
      }
    } catch (error) {
      console.error("Failed to save expense:", error);
    }
  };

  const handleDeleteExpense = async (id: number) => {
    try {
      await deleteExpense(id);
      deleteExpenseStore(id);
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  // Credit card handlers
  const handleAddCreditCard = () => {
    setEditingCreditCard(null);
    setIsCreditCardModalOpen(true);
  };

  const handleEditCreditCard = (card: CreditCard) => {
    setEditingCreditCard(card);
    setIsCreditCardModalOpen(true);
  };

  const handleSaveCreditCard = async (
    cardData: Omit<CreditCard, "id" | "created_at">
  ) => {
    try {
      if (editingCreditCard) {
        await updateCreditCard(editingCreditCard.id, cardData);
        updateCreditCardStore(editingCreditCard.id, cardData);
      } else {
        await createCreditCard(cardData);
        addCreditCard(cardData);
      }
    } catch (error) {
      console.error("Failed to save credit card:", error);
    }
  };

  const handleDeleteCreditCard = async (id: number) => {
    try {
      await deleteCreditCard(id);
      deleteCreditCardStore(id);
    } catch (error) {
      console.error("Failed to delete credit card:", error);
    }
  };

  // Cash handlers
  const handleAddCash = () => {
    setEditingCash(null);
    setIsCashModalOpen(true);
  };

  const handleEditCash = (cash: Cash) => {
    setEditingCash(cash);
    setIsCashModalOpen(true);
  };

  const handleSaveCash = async (cashData: Omit<Cash, "id" | "created_at">) => {
    try {
      if (editingCash) {
        await updateCash(editingCash.id, cashData);
        updateCashStore(editingCash.id, cashData);
      } else {
        await createCash(cashData);
        addCash(cashData);
      }
    } catch (error) {
      console.error("Failed to save cash:", error);
    }
  };

  const handleDeleteCash = async (id: number) => {
    try {
      await deleteCash(id);
      deleteCashStore(id);
    } catch (error) {
      console.error("Failed to delete cash:", error);
    }
  };

  // Debit card handlers
  const handleAddDebitCard = () => {
    setEditingDebitCard(null);
    setIsDebitCardModalOpen(true);
  };

  const handleEditDebitCard = (card: DebitCard) => {
    setEditingDebitCard(card);
    setIsDebitCardModalOpen(true);
  };

  const handleSaveDebitCard = async (
    cardData: Omit<DebitCard, "id" | "created_at">
  ) => {
    try {
      if (editingDebitCard) {
        await updateDebitCard(editingDebitCard.id, cardData);
        updateDebitCardStore(editingDebitCard.id, cardData);
      } else {
        await createDebitCard(cardData);
        addDebitCard(cardData);
      }
    } catch (error) {
      console.error("Failed to save debit card:", error);
    }
  };

  const handleDeleteDebitCard = async (id: number) => {
    try {
      await deleteDebitCard(id);
      deleteDebitCardStore(id);
    } catch (error) {
      console.error("Failed to delete debit card:", error);
    }
  };

  // Modal close handlers
  const handleCloseIncomeModal = () => {
    setIsIncomeModalOpen(false);
    setEditingIncome(null);
  };

  const handleCloseExpenseModal = () => {
    setIsExpenseModalOpen(false);
    setEditingExpense(null);
  };

  const handleCloseCreditCardModal = () => {
    setIsCreditCardModalOpen(false);
    setEditingCreditCard(null);
  };

  const handleCloseCashModal = () => {
    setIsCashModalOpen(false);
    setEditingCash(null);
  };

  const handleCloseDebitCardModal = () => {
    setIsDebitCardModalOpen(false);
    setEditingDebitCard(null);
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <Wallet className='h-12 w-12 mx-auto mb-4 text-blue-600' />
          <h1 className='text-2xl font-bold text-gray-900 mb-2'>CoupleCash</h1>
          <p className='text-sm text-gray-600'>Loading your finances...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-xl font-bold text-gray-900 flex items-center gap-2'>
              <Wallet className='h-5 w-5 text-blue-600' />
              CoupleCash
            </h1>
            <p className='text-xs text-gray-600'>
              Shared budget tracking for couples
            </p>
          </div>
          <div className='flex gap-2'>
            <HelpModal />
            <Button size='sm' onClick={handleAddIncome} className='h-8'>
              <Plus className='h-3 w-3 mr-1' />
              Income
            </Button>
            <Button size='sm' onClick={handleAddExpense} className='h-8'>
              <Plus className='h-3 w-3 mr-1' />
              Expense
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='p-4 space-y-6 pb-20'>
        {/* Financial Overview */}
        <FinancialOverview />

        {/* Transactions List */}
        <TransactionsList
          onAddIncome={handleAddIncome}
          onAddExpense={handleAddExpense}
          onAddCreditCard={handleAddCreditCard}
          onAddCash={handleAddCash}
          onAddDebitCard={handleAddDebitCard}
          onEditIncome={handleEditIncome}
          onEditExpense={handleEditExpense}
          onEditCreditCard={handleEditCreditCard}
          onEditCash={handleEditCash}
          onEditDebitCard={handleEditDebitCard}
          onDeleteIncome={handleDeleteIncome}
          onDeleteExpense={handleDeleteExpense}
          onDeleteCreditCard={handleDeleteCreditCard}
          onDeleteCash={handleDeleteCash}
          onDeleteDebitCard={handleDeleteDebitCard}
        />
      </main>

      {/* Modals */}
      <IncomeModal
        isOpen={isIncomeModalOpen}
        onClose={handleCloseIncomeModal}
        onSave={handleSaveIncome}
        income={editingIncome}
        users={users}
      />

      <ExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={handleCloseExpenseModal}
        onSave={handleSaveExpense}
        expense={editingExpense}
        users={users}
      />

      <CreditCardModal
        isOpen={isCreditCardModalOpen}
        onClose={handleCloseCreditCardModal}
        onSave={handleSaveCreditCard}
        card={editingCreditCard}
        users={users}
      />

      <CashModal
        isOpen={isCashModalOpen}
        onClose={handleCloseCashModal}
        onSave={handleSaveCash}
        cash={editingCash}
        users={users}
      />

      <DebitCardModal
        isOpen={isDebitCardModalOpen}
        onClose={handleCloseDebitCardModal}
        onSave={handleSaveDebitCard}
        card={editingDebitCard}
        users={users}
      />
    </div>
  );
}
