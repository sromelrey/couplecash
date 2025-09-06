"use client";

import {
  useFinanceStore,
  Income,
  Expense,
  CreditCard,
  Cash,
  DebitCard,
} from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  TrendingUp,
  TrendingDown,
  CreditCard as CreditCardIcon,
  Edit,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TransactionsListProps {
  onAddIncome: () => void;
  onAddExpense: () => void;
  onAddCreditCard: () => void;
  onAddCash: () => void;
  onAddDebitCard: () => void;
  onEditIncome: (income: Income) => void;
  onEditExpense: (expense: Expense) => void;
  onEditCreditCard: (card: CreditCard) => void;
  onEditCash: (cash: Cash) => void;
  onEditDebitCard: (card: DebitCard) => void;
  onDeleteIncome: (id: number) => void;
  onDeleteExpense: (id: number) => void;
  onDeleteCreditCard: (id: number) => void;
  onDeleteCash: (id: number) => void;
  onDeleteDebitCard: (id: number) => void;
}

export function TransactionsList({
  onAddIncome,
  onAddExpense,
  onAddCreditCard,
  onAddCash,
  onAddDebitCard,
  onEditIncome,
  onEditExpense,
  onEditCreditCard,
  onEditCash,
  onEditDebitCard,
  onDeleteIncome,
  onDeleteExpense,
  onDeleteCreditCard,
  onDeleteCash,
  onDeleteDebitCard,
}: TransactionsListProps) {
  const { incomes, expenses, creditCards, cash, debitCards, users } =
    useFinanceStore();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getUserName = (userId: number) => {
    return users.find((user) => user.id === userId)?.name || "Unknown";
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "groceries":
        return "🛒";
      case "bills":
        return "⚡";
      case "credit_card":
        return "💳";
      case "misc":
        return "📦";
      default:
        return "💰";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "groceries":
        return "Groceries";
      case "bills":
        return "Bills";
      case "credit_card":
        return "Credit Card";
      case "misc":
        return "Miscellaneous";
      default:
        return category;
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <span>Transactions</span>
          <div className='flex gap-2 ml-auto'>
            <Button size='sm' onClick={onAddIncome} className='h-8'>
              <Plus className='h-3 w-3 mr-1' />
              Income
            </Button>
            <Button size='sm' onClick={onAddExpense} className='h-8'>
              <Plus className='h-3 w-3 mr-1' />
              Expense
            </Button>
            <Button size='sm' onClick={onAddCash} className='h-8'>
              <Plus className='h-3 w-3 mr-1' />
              Cash
            </Button>
            <Button size='sm' onClick={onAddDebitCard} className='h-8'>
              <Plus className='h-3 w-3 mr-1' />
              Debit
            </Button>
            <Button size='sm' onClick={onAddCreditCard} className='h-8'>
              <Plus className='h-3 w-3 mr-1' />
              Credit
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='all' className='w-full'>
          <TabsList className='grid w-full grid-cols-6'>
            <TabsTrigger value='all'>All</TabsTrigger>
            <TabsTrigger value='income'>Income</TabsTrigger>
            <TabsTrigger value='expenses'>Expenses</TabsTrigger>
            <TabsTrigger value='cash'>Cash</TabsTrigger>
            <TabsTrigger value='debit'>Debit</TabsTrigger>
            <TabsTrigger value='credit'>Credit</TabsTrigger>
          </TabsList>

          <TabsContent value='all' className='space-y-3 mt-4'>
            {/* Combined list sorted by date */}
            {[...incomes, ...expenses, ...cash, ...debitCards, ...creditCards]
              .sort(
                (a, b) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
              )
              .map((item) => {
                if ("source" in item && "received_at" in item) {
                  // Income
                  return (
                    <div
                      key={`income-${item.id}`}
                      className='flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200'
                    >
                      <div className='flex items-center gap-3'>
                        <div className='p-2 bg-green-100 rounded-full'>
                          <TrendingUp className='h-4 w-4 text-green-600' />
                        </div>
                        <div>
                          <p className='font-medium text-green-900'>
                            {item.source}
                          </p>
                          <p className='text-sm text-green-600'>
                            {getUserName(item.user_id)} •{" "}
                            {formatDate(item.received_at)}
                          </p>
                        </div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className='font-bold text-green-900'>
                          +{formatCurrency(item.amount)}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant='ghost'
                              size='sm'
                              className='h-6 w-6 p-0'
                            >
                              <MoreHorizontal className='h-3 w-3' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuItem
                              onClick={() => onEditIncome(item)}
                            >
                              <Edit className='h-3 w-3 mr-2' />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onDeleteIncome(item.id)}
                              className='text-red-600'
                            >
                              <Trash2 className='h-3 w-3 mr-2' />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  );
                } else if ("category" in item && "expense_date" in item) {
                  // Expense
                  return (
                    <div
                      key={`expense-${item.id}`}
                      className='flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200'
                    >
                      <div className='flex items-center gap-3'>
                        <div className='p-2 bg-red-100 rounded-full'>
                          <TrendingDown className='h-4 w-4 text-red-600' />
                        </div>
                        <div>
                          <p className='font-medium text-red-900'>
                            {getCategoryIcon(item.category)}{" "}
                            {getCategoryLabel(item.category)}
                          </p>
                          <p className='text-sm text-red-600'>
                            {getUserName(item.user_id)} •{" "}
                            {formatDate(item.expense_date)}
                          </p>
                          {item.description && (
                            <p className='text-xs text-red-500'>
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className='font-bold text-red-900'>
                          -{formatCurrency(item.amount)}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant='ghost'
                              size='sm'
                              className='h-6 w-6 p-0'
                            >
                              <MoreHorizontal className='h-3 w-3' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuItem
                              onClick={() => onEditExpense(item)}
                            >
                              <Edit className='h-3 w-3 mr-2' />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onDeleteExpense(item.id)}
                              className='text-red-600'
                            >
                              <Trash2 className='h-3 w-3 mr-2' />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  );
                } else if ("due_date" in item) {
                  // Credit Card
                  return (
                    <div
                      key={`card-${item.id}`}
                      className='flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200'
                    >
                      <div className='flex items-center gap-3'>
                        <div className='p-2 bg-orange-100 rounded-full'>
                          <CreditCardIcon className='h-4 w-4 text-orange-600' />
                        </div>
                        <div>
                          <p className='font-medium text-orange-900'>
                            {item.bank} {item.card_number}
                          </p>
                          <p className='text-sm text-orange-600'>
                            {getUserName(item.user_id)} • Due:{" "}
                            {formatDate(item.due_date)}
                          </p>
                          {isOverdue(item.due_date) && (
                            <Badge
                              variant='destructive'
                              className='text-xs mt-1'
                            >
                              Overdue
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className='font-bold text-orange-900'>
                          {formatCurrency(item.payable_amount)}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant='ghost'
                              size='sm'
                              className='h-6 w-6 p-0'
                            >
                              <MoreHorizontal className='h-3 w-3' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuItem
                              onClick={() => onEditCreditCard(item)}
                            >
                              <Edit className='h-3 w-3 mr-2' />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onDeleteCreditCard(item.id)}
                              className='text-red-600'
                            >
                              <Trash2 className='h-3 w-3 mr-2' />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  );
                } else if ("source" in item && "transaction_date" in item) {
                  // Cash
                  return (
                    <div
                      key={`cash-${item.id}`}
                      className='flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200'
                    >
                      <div className='flex items-center gap-3'>
                        <div className='p-2 bg-purple-100 rounded-full'>💵</div>
                        <div>
                          <p className='font-medium text-purple-900'>
                            Cash - {item.source}
                          </p>
                          <p className='text-sm text-purple-600'>
                            {getUserName(item.user_id)} •{" "}
                            {formatDate(item.transaction_date)}
                          </p>
                          {item.description && (
                            <p className='text-xs text-purple-500'>
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className='font-bold text-purple-900'>
                          +{formatCurrency(item.amount)}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant='ghost'
                              size='sm'
                              className='h-6 w-6 p-0'
                            >
                              <MoreHorizontal className='h-3 w-3' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuItem onClick={() => onEditCash(item)}>
                              <Edit className='h-3 w-3 mr-2' />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onDeleteCash(item.id)}
                              className='text-red-600'
                            >
                              <Trash2 className='h-3 w-3 mr-2' />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  );
                } else {
                  // Debit Card
                  return (
                    <div
                      key={`debit-${item.id}`}
                      className='flex items-center justify-between p-3 bg-indigo-50 rounded-lg border border-indigo-200'
                    >
                      <div className='flex items-center gap-3'>
                        <div className='p-2 bg-indigo-100 rounded-full'>💳</div>
                        <div>
                          <p className='font-medium text-indigo-900'>
                            {item.bank} {item.card_number}
                          </p>
                          <p className='text-sm text-indigo-600'>
                            {getUserName(item.user_id)} •{" "}
                            {formatDate(item.transaction_date)}
                          </p>
                          {item.description && (
                            <p className='text-xs text-indigo-500'>
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className='font-bold text-indigo-900'>
                          -{formatCurrency(item.amount)}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant='ghost'
                              size='sm'
                              className='h-6 w-6 p-0'
                            >
                              <MoreHorizontal className='h-3 w-3' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuItem
                              onClick={() => onEditDebitCard(item)}
                            >
                              <Edit className='h-3 w-3 mr-2' />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onDeleteDebitCard(item.id)}
                              className='text-red-600'
                            >
                              <Trash2 className='h-3 w-3 mr-2' />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  );
                }
              })}
          </TabsContent>

          <TabsContent value='income' className='space-y-3 mt-4'>
            {incomes.length === 0 ? (
              <div className='text-center py-8 text-gray-500'>
                <TrendingUp className='h-8 w-8 mx-auto mb-2 text-gray-400' />
                <p className='text-sm'>No income recorded yet</p>
                <Button size='sm' onClick={onAddIncome} className='mt-2'>
                  <Plus className='h-3 w-3 mr-1' />
                  Add Income
                </Button>
              </div>
            ) : (
              incomes
                .sort(
                  (a, b) =>
                    new Date(b.received_at).getTime() -
                    new Date(a.received_at).getTime()
                )
                .map((income) => (
                  <div
                    key={income.id}
                    className='flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200'
                  >
                    <div className='flex items-center gap-3'>
                      <div className='p-2 bg-green-100 rounded-full'>
                        <TrendingUp className='h-4 w-4 text-green-600' />
                      </div>
                      <div>
                        <p className='font-medium text-green-900'>
                          {income.source}
                        </p>
                        <p className='text-sm text-green-600'>
                          {getUserName(income.user_id)} •{" "}
                          {formatDate(income.received_at)}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='font-bold text-green-900'>
                        +{formatCurrency(income.amount)}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='h-6 w-6 p-0'
                          >
                            <MoreHorizontal className='h-3 w-3' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem
                            onClick={() => onEditIncome(income)}
                          >
                            <Edit className='h-3 w-3 mr-2' />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onDeleteIncome(income.id)}
                            className='text-red-600'
                          >
                            <Trash2 className='h-3 w-3 mr-2' />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
            )}
          </TabsContent>

          <TabsContent value='expenses' className='space-y-3 mt-4'>
            {expenses.length === 0 ? (
              <div className='text-center py-8 text-gray-500'>
                <TrendingDown className='h-8 w-8 mx-auto mb-2 text-gray-400' />
                <p className='text-sm'>No expenses recorded yet</p>
                <Button size='sm' onClick={onAddExpense} className='mt-2'>
                  <Plus className='h-3 w-3 mr-1' />
                  Add Expense
                </Button>
              </div>
            ) : (
              expenses
                .sort(
                  (a, b) =>
                    new Date(b.expense_date).getTime() -
                    new Date(a.expense_date).getTime()
                )
                .map((expense) => (
                  <div
                    key={expense.id}
                    className='flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200'
                  >
                    <div className='flex items-center gap-3'>
                      <div className='p-2 bg-red-100 rounded-full'>
                        <TrendingDown className='h-4 w-4 text-red-600' />
                      </div>
                      <div>
                        <p className='font-medium text-red-900'>
                          {getCategoryIcon(expense.category)}{" "}
                          {getCategoryLabel(expense.category)}
                        </p>
                        <p className='text-sm text-red-600'>
                          {getUserName(expense.user_id)} •{" "}
                          {formatDate(expense.expense_date)}
                        </p>
                        {expense.description && (
                          <p className='text-xs text-red-500'>
                            {expense.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='font-bold text-red-900'>
                        -{formatCurrency(expense.amount)}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='h-6 w-6 p-0'
                          >
                            <MoreHorizontal className='h-3 w-3' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem
                            onClick={() => onEditExpense(expense)}
                          >
                            <Edit className='h-3 w-3 mr-2' />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onDeleteExpense(expense.id)}
                            className='text-red-600'
                          >
                            <Trash2 className='h-3 w-3 mr-2' />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
            )}
          </TabsContent>

          <TabsContent value='cards' className='space-y-3 mt-4'>
            {creditCards.length === 0 ? (
              <div className='text-center py-8 text-gray-500'>
                <CreditCardIcon className='h-8 w-8 mx-auto mb-2 text-gray-400' />
                <p className='text-sm'>No credit cards recorded yet</p>
                <Button size='sm' onClick={onAddCreditCard} className='mt-2'>
                  <Plus className='h-3 w-3 mr-1' />
                  Add Credit Card
                </Button>
              </div>
            ) : (
              creditCards
                .sort(
                  (a, b) =>
                    new Date(a.due_date).getTime() -
                    new Date(b.due_date).getTime()
                )
                .map((card) => (
                  <div
                    key={card.id}
                    className='flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200'
                  >
                    <div className='flex items-center gap-3'>
                      <div className='p-2 bg-orange-100 rounded-full'>
                        <CreditCardIcon className='h-4 w-4 text-orange-600' />
                      </div>
                      <div>
                        <p className='font-medium text-orange-900'>
                          {card.bank} {card.card_number}
                        </p>
                        <p className='text-sm text-orange-600'>
                          {getUserName(card.user_id)} • Due:{" "}
                          {formatDate(card.due_date)}
                        </p>
                        {isOverdue(card.due_date) && (
                          <Badge variant='destructive' className='text-xs mt-1'>
                            Overdue
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='font-bold text-orange-900'>
                        {formatCurrency(card.payable_amount)}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='h-6 w-6 p-0'
                          >
                            <MoreHorizontal className='h-3 w-3' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem
                            onClick={() => onEditCreditCard(card)}
                          >
                            <Edit className='h-3 w-3 mr-2' />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onDeleteCreditCard(card.id)}
                            className='text-red-600'
                          >
                            <Trash2 className='h-3 w-3 mr-2' />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
            )}
          </TabsContent>

          <TabsContent value='cash' className='space-y-3 mt-4'>
            {cash.length === 0 ? (
              <div className='text-center py-8 text-gray-500'>
                <span className='text-2xl mb-2 block'>💵</span>
                <p className='text-sm'>No cash transactions yet</p>
                <Button size='sm' onClick={onAddCash} className='mt-2'>
                  <Plus className='h-3 w-3 mr-1' />
                  Add Cash
                </Button>
              </div>
            ) : (
              cash
                .sort(
                  (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                )
                .map((cashItem) => (
                  <div
                    key={cashItem.id}
                    className='flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200'
                  >
                    <div className='flex items-center gap-3'>
                      <div className='p-2 bg-purple-100 rounded-full'>💵</div>
                      <div>
                        <p className='font-medium text-purple-900'>
                          Cash - {cashItem.source}
                        </p>
                        <p className='text-sm text-purple-600'>
                          {getUserName(cashItem.user_id)} •{" "}
                          {formatDate(cashItem.transaction_date)}
                        </p>
                        {cashItem.description && (
                          <p className='text-xs text-purple-500'>
                            {cashItem.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='font-bold text-purple-900'>
                        +{formatCurrency(cashItem.amount)}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='h-6 w-6 p-0'
                          >
                            <MoreHorizontal className='h-3 w-3' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem
                            onClick={() => onEditCash(cashItem)}
                          >
                            <Edit className='h-3 w-3 mr-2' />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onDeleteCash(cashItem.id)}
                            className='text-red-600'
                          >
                            <Trash2 className='h-3 w-3 mr-2' />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
            )}
          </TabsContent>

          <TabsContent value='debit' className='space-y-3 mt-4'>
            {debitCards.length === 0 ? (
              <div className='text-center py-8 text-gray-500'>
                <span className='text-2xl mb-2 block'>💳</span>
                <p className='text-sm'>No debit card transactions yet</p>
                <Button size='sm' onClick={onAddDebitCard} className='mt-2'>
                  <Plus className='h-3 w-3 mr-1' />
                  Add Debit Card
                </Button>
              </div>
            ) : (
              debitCards
                .sort(
                  (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                )
                .map((card) => (
                  <div
                    key={card.id}
                    className='flex items-center justify-between p-3 bg-indigo-50 rounded-lg border border-indigo-200'
                  >
                    <div className='flex items-center gap-3'>
                      <div className='p-2 bg-indigo-100 rounded-full'>💳</div>
                      <div>
                        <p className='font-medium text-indigo-900'>
                          {card.bank} {card.card_number}
                        </p>
                        <p className='text-sm text-indigo-600'>
                          {getUserName(card.user_id)} •{" "}
                          {formatDate(card.transaction_date)}
                        </p>
                        {card.description && (
                          <p className='text-xs text-indigo-500'>
                            {card.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='font-bold text-indigo-900'>
                        -{formatCurrency(card.amount)}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='h-6 w-6 p-0'
                          >
                            <MoreHorizontal className='h-3 w-3' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem
                            onClick={() => onEditDebitCard(card)}
                          >
                            <Edit className='h-3 w-3 mr-2' />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onDeleteDebitCard(card.id)}
                            className='text-red-600'
                          >
                            <Trash2 className='h-3 w-3 mr-2' />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
