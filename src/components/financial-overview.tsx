"use client";

import { useFinanceStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, CreditCard, DollarSign } from "lucide-react";

export function FinancialOverview() {
  const {
    getTotalIncome,
    getTotalExpenses,
    getTotalCreditCardDebt,
    getTotalCash,
    getTotalDebitCardSpending,
    getBalance,
    getExpensesByCategory,
  } = useFinanceStore();

  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const totalCreditCardDebt = getTotalCreditCardDebt();
  const totalCash = getTotalCash();
  const totalDebitCardSpending = getTotalDebitCardSpending();
  const balance = getBalance();
  const expensesByCategory = getExpensesByCategory();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
    }).format(amount);
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

  return (
    <div className='space-y-4'>
      {/* Main Financial Cards */}
      <div className='grid grid-cols-2 gap-3'>
        <Card className='bg-green-50 border-green-200'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-green-800 flex items-center gap-2'>
              <TrendingUp className='h-4 w-4' />
              Total Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold text-green-900'>
              {formatCurrency(totalIncome)}
            </p>
          </CardContent>
        </Card>

        <Card className='bg-red-50 border-red-200'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-red-800 flex items-center gap-2'>
              <TrendingDown className='h-4 w-4' />
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold text-red-900'>
              {formatCurrency(totalExpenses)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Credit Card Debt */}
      <Card className='bg-orange-50 border-orange-200'>
        <CardHeader className='pb-2'>
          <CardTitle className='text-sm font-medium text-orange-800 flex items-center gap-2'>
            <CreditCard className='h-4 w-4' />
            Credit Card Debt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-2xl font-bold text-orange-900'>
            {formatCurrency(totalCreditCardDebt)}
          </p>
        </CardContent>
      </Card>

      {/* Cash & Debit Card Spending */}
      <div className='grid grid-cols-2 gap-3'>
        <Card className='bg-purple-50 border-purple-200'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-purple-800 flex items-center gap-2'>
              💵 Cash
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-xl font-bold text-purple-900'>
              {formatCurrency(totalCash)}
            </p>
          </CardContent>
        </Card>

        <Card className='bg-indigo-50 border-indigo-200'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-indigo-800 flex items-center gap-2'>
              💳 Debit Cards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-xl font-bold text-indigo-900'>
              {formatCurrency(totalDebitCardSpending)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Balance */}
      <Card
        className={`${
          balance >= 0
            ? "bg-blue-50 border-blue-200"
            : "bg-red-50 border-red-200"
        }`}
      >
        <CardHeader className='pb-2'>
          <CardTitle
            className={`text-sm font-medium flex items-center gap-2 ${
              balance >= 0 ? "text-blue-800" : "text-red-800"
            }`}
          >
            <DollarSign className='h-4 w-4' />
            Current Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p
            className={`text-2xl font-bold ${
              balance >= 0 ? "text-blue-900" : "text-red-900"
            }`}
          >
            {formatCurrency(balance)}
          </p>
        </CardContent>
      </Card>

      {/* Expense Breakdown */}
      {Object.keys(expensesByCategory).length > 0 && (
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium'>
              Expense Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              {Object.entries(expensesByCategory).map(([category, amount]) => (
                <div
                  key={category}
                  className='flex items-center justify-between'
                >
                  <div className='flex items-center gap-2'>
                    <span className='text-lg'>{getCategoryIcon(category)}</span>
                    <span className='text-sm font-medium'>
                      {getCategoryLabel(category)}
                    </span>
                  </div>
                  <Badge variant='secondary' className='text-xs'>
                    {formatCurrency(amount)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
