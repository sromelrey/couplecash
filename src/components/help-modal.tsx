"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  HelpCircle,
  Wallet,
  TrendingUp,
  TrendingDown,
  CreditCard,
  DollarSign,
} from "lucide-react";

export function HelpModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm' className='h-8'>
          <HelpCircle className='h-3 w-3 mr-1' />
          How to Use
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <HelpCircle className='h-5 w-5' />
            CoupleCash User Guide
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-6 text-sm'>
          {/* Overview */}
          <section>
            <h3 className='text-lg font-semibold mb-3 flex items-center gap-2'>
              <Wallet className='h-4 w-4' />
              Dashboard Overview
            </h3>
            <div className='grid grid-cols-2 gap-3 mb-4'>
              <div className='p-3 bg-green-50 rounded-lg border border-green-200'>
                <div className='flex items-center gap-2 mb-1'>
                  <TrendingUp className='h-4 w-4 text-green-600' />
                  <span className='font-medium text-green-800'>
                    Total Income
                  </span>
                </div>
                <p className='text-xs text-green-600'>
                  Combined salary and income sources
                </p>
              </div>
              <div className='p-3 bg-red-50 rounded-lg border border-red-200'>
                <div className='flex items-center gap-2 mb-1'>
                  <TrendingDown className='h-4 w-4 text-red-600' />
                  <span className='font-medium text-red-800'>
                    Total Expenses
                  </span>
                </div>
                <p className='text-xs text-red-600'>
                  All recorded expenses by category
                </p>
              </div>
              <div className='p-3 bg-orange-50 rounded-lg border border-orange-200'>
                <div className='flex items-center gap-2 mb-1'>
                  <CreditCard className='h-4 w-4 text-orange-600' />
                  <span className='font-medium text-orange-800'>
                    Credit Card Debt
                  </span>
                </div>
                <p className='text-xs text-orange-600'>
                  Outstanding credit card balances
                </p>
              </div>
              <div className='p-3 bg-blue-50 rounded-lg border border-blue-200'>
                <div className='flex items-center gap-2 mb-1'>
                  <DollarSign className='h-4 w-4 text-blue-600' />
                  <span className='font-medium text-blue-800'>Balance</span>
                </div>
                <p className='text-xs text-blue-600'>Net financial position</p>
              </div>
            </div>
          </section>

          {/* Adding Transactions */}
          <section>
            <h3 className='text-lg font-semibold mb-3'>
              📊 Adding Transactions
            </h3>

            <div className='space-y-4'>
              <div className='p-4 bg-green-50 rounded-lg border border-green-200'>
                <h4 className='font-medium text-green-800 mb-2'>
                  💰 Income (Salary & Other Sources)
                </h4>
                <ol className='list-decimal list-inside space-y-1 text-green-700'>
                  <li>
                    Click the <strong>&quot;Income&quot;</strong> button
                  </li>
                  <li>Select the person (you or your partner)</li>
                  <li>
                    Choose income source (Salary, Freelance, Investment, Other)
                  </li>
                  <li>Enter the amount in PHP (₱)</li>
                  <li>Add a description (optional)</li>
                  <li>Select the date received</li>
                  <li>
                    Click <strong>&quot;Add Income&quot;</strong>
                  </li>
                </ol>
              </div>

              <div className='p-4 bg-red-50 rounded-lg border border-red-200'>
                <h4 className='font-medium text-red-800 mb-2'>
                  💸 Expenses (Bills, Groceries, etc.)
                </h4>
                <ol className='list-decimal list-inside space-y-1 text-red-700'>
                  <li>
                    Click the <strong>&quot;Expense&quot;</strong> button
                  </li>
                  <li>Select the person who made the expense</li>
                  <li>
                    Choose expense category (Groceries, Bills, Transportation,
                    etc.)
                  </li>
                  <li>Enter the amount spent</li>
                  <li>Add a description</li>
                  <li>Select the expense date</li>
                  <li>
                    Click <strong>&quot;Add Expense&quot;</strong>
                  </li>
                </ol>
              </div>

              <div className='p-4 bg-purple-50 rounded-lg border border-purple-200'>
                <h4 className='font-medium text-purple-800 mb-2'>
                  💵 Cash Transactions
                </h4>
                <ol className='list-decimal list-inside space-y-1 text-purple-700'>
                  <li>
                    Click the <strong>&quot;Cash&quot;</strong> button
                  </li>
                  <li>Select the person</li>
                  <li>
                    Choose cash source (ATM Withdrawal, Salary Cash, Change,
                    Other)
                  </li>
                  <li>Enter the amount</li>
                  <li>Add a description</li>
                  <li>Select the transaction date</li>
                  <li>
                    Click <strong>&quot;Add Cash&quot;</strong>
                  </li>
                </ol>
              </div>

              <div className='p-4 bg-indigo-50 rounded-lg border border-indigo-200'>
                <h4 className='font-medium text-indigo-800 mb-2'>
                  💳 Debit Card Transactions
                </h4>
                <ol className='list-decimal list-inside space-y-1 text-indigo-700'>
                  <li>
                    Click the <strong>&quot;Debit&quot;</strong> button
                  </li>
                  <li>Select the person</li>
                  <li>Choose the bank (BPI, BDO, Metrobank, etc.)</li>
                  <li>
                    Enter card number (auto-formatted as ****-****-****-1234)
                  </li>
                  <li>Enter the amount spent</li>
                  <li>Add a description</li>
                  <li>Select the transaction date</li>
                  <li>
                    Click <strong>&quot;Add Debit Card&quot;</strong>
                  </li>
                </ol>
              </div>

              <div className='p-4 bg-orange-50 rounded-lg border border-orange-200'>
                <h4 className='font-medium text-orange-800 mb-2'>
                  💳 Credit Card Transactions
                </h4>
                <ol className='list-decimal list-inside space-y-1 text-orange-700'>
                  <li>
                    Click the <strong>&quot;Credit&quot;</strong> button
                  </li>
                  <li>Select the person</li>
                  <li>Choose the bank</li>
                  <li>Enter card number</li>
                  <li>Enter the payable amount</li>
                  <li>Set the swipe date (when you used the card)</li>
                  <li>Set the due date (when payment is due)</li>
                  <li>
                    Click <strong>&quot;Add Credit Card&quot;</strong>
                  </li>
                </ol>
              </div>
            </div>
          </section>

          {/* Viewing Transactions */}
          <section>
            <h3 className='text-lg font-semibold mb-3'>
              📋 Viewing Transactions
            </h3>
            <div className='space-y-3'>
              <div>
                <h4 className='font-medium mb-2'>Transaction Tabs</h4>
                <p className='text-gray-600 mb-2'>
                  Use the tabs to filter and view specific transaction types:
                </p>
                <ul className='list-disc list-inside space-y-1 text-gray-600'>
                  <li>
                    <strong>All:</strong> Shows all transactions sorted by date
                    (newest first)
                  </li>
                  <li>
                    <strong>Income:</strong> Shows only income transactions
                  </li>
                  <li>
                    <strong>Expenses:</strong> Shows only expense transactions
                  </li>
                  <li>
                    <strong>Cash:</strong> Shows only cash transactions
                  </li>
                  <li>
                    <strong>Debit:</strong> Shows only debit card transactions
                  </li>
                  <li>
                    <strong>Credit:</strong> Shows only credit card transactions
                  </li>
                </ul>
              </div>

              <div>
                <h4 className='font-medium mb-2'>
                  Color-Coded Transaction Cards
                </h4>
                <div className='grid grid-cols-2 gap-2 text-xs'>
                  <div className='flex items-center gap-2'>
                    <div className='w-3 h-3 bg-green-500 rounded'></div>
                    <span>Green: Income (positive impact)</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='w-3 h-3 bg-red-500 rounded'></div>
                    <span>Red: Expenses (negative impact)</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='w-3 h-3 bg-purple-500 rounded'></div>
                    <span>Purple: Cash (neutral movement)</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='w-3 h-3 bg-indigo-500 rounded'></div>
                    <span>Indigo: Debit Cards (negative impact)</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='w-3 h-3 bg-orange-500 rounded'></div>
                    <span>Orange: Credit Cards (debt)</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Editing & Deleting */}
          <section>
            <h3 className='text-lg font-semibold mb-3'>
              ✏️ Editing & Deleting Transactions
            </h3>
            <div className='space-y-3'>
              <div className='p-3 bg-blue-50 rounded-lg border border-blue-200'>
                <h4 className='font-medium text-blue-800 mb-2'>
                  To Edit a Transaction:
                </h4>
                <ol className='list-decimal list-inside space-y-1 text-blue-700'>
                  <li>Find the transaction you want to edit</li>
                  <li>Click the three dots (⋮) on the right side</li>
                  <li>Select &quot;Edit&quot; from the dropdown menu</li>
                  <li>Modify the information in the popup form</li>
                  <li>Click &quot;Update&quot; to save changes</li>
                </ol>
              </div>

              <div className='p-3 bg-red-50 rounded-lg border border-red-200'>
                <h4 className='font-medium text-red-800 mb-2'>
                  To Delete a Transaction:
                </h4>
                <ol className='list-decimal list-inside space-y-1 text-red-700'>
                  <li>Find the transaction you want to delete</li>
                  <li>Click the three dots (⋮) on the right side</li>
                  <li>Select &quot;Delete&quot; from the dropdown menu</li>
                  <li>
                    Confirm the deletion (transaction will be permanently
                    removed)
                  </li>
                </ol>
              </div>
            </div>
          </section>

          {/* Tips */}
          <section>
            <h3 className='text-lg font-semibold mb-3'>
              💡 Tips for Better Usage
            </h3>
            <div className='space-y-3'>
              <div className='p-3 bg-yellow-50 rounded-lg border border-yellow-200'>
                <h4 className='font-medium text-yellow-800 mb-2'>
                  📅 Regular Updates
                </h4>
                <ul className='list-disc list-inside space-y-1 text-yellow-700'>
                  <li>Add transactions as they happen for accurate tracking</li>
                  <li>Review your financial overview weekly</li>
                  <li>Update credit card payments when made</li>
                </ul>
              </div>

              <div className='p-3 bg-green-50 rounded-lg border border-green-200'>
                <h4 className='font-medium text-green-800 mb-2'>
                  🏷️ Categorization
                </h4>
                <ul className='list-disc list-inside space-y-1 text-green-700'>
                  <li>Use specific categories for better expense analysis</li>
                  <li>Be consistent with category names</li>
                  <li>Add descriptions for clarity</li>
                </ul>
              </div>

              <div className='p-3 bg-blue-50 rounded-lg border border-blue-200'>
                <h4 className='font-medium text-blue-800 mb-2'>
                  👫 Partner Coordination
                </h4>
                <ul className='list-disc list-inside space-y-1 text-blue-700'>
                  <li>Both partners should add their own transactions</li>
                  <li>Use consistent naming and categorization</li>
                  <li>Review finances together regularly</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Financial Health */}
          <section>
            <h3 className='text-lg font-semibold mb-3'>
              🎯 Understanding Your Financial Health
            </h3>
            <div className='space-y-3'>
              <div className='p-3 bg-green-50 rounded-lg border border-green-200'>
                <h4 className='font-medium text-green-800 mb-2'>
                  ✅ Positive Balance
                </h4>
                <ul className='list-disc list-inside space-y-1 text-green-700'>
                  <li>You&apos;re spending less than you earn</li>
                  <li>Good financial health</li>
                  <li>Consider saving or investing excess funds</li>
                </ul>
              </div>

              <div className='p-3 bg-red-50 rounded-lg border border-red-200'>
                <h4 className='font-medium text-red-800 mb-2'>
                  ⚠️ Negative Balance
                </h4>
                <ul className='list-disc list-inside space-y-1 text-red-700'>
                  <li>You&apos;re spending more than you earn</li>
                  <li>Review expenses and find areas to cut back</li>
                  <li>Consider increasing income sources</li>
                </ul>
              </div>

              <div className='p-3 bg-blue-50 rounded-lg border border-blue-200'>
                <h4 className='font-medium text-blue-800 mb-2'>
                  📊 Balance Calculation
                </h4>
                <p className='text-blue-700 text-xs'>
                  <strong>
                    Balance = Total Income - Total Expenses - Credit Card Debt -
                    Debit Card Spending
                  </strong>
                </p>
              </div>
            </div>
          </section>

          {/* Important Note */}
          <section>
            <h3 className='text-lg font-semibold mb-3'>⚠️ Important Note</h3>
            <div className='p-4 bg-orange-50 rounded-lg border border-orange-200'>
              <p className='text-orange-800'>
                <strong>Data Storage:</strong> CoupleCash currently uses mock
                data that resets when you refresh the page. This is perfect for
                testing and learning how to use the app. For production use, the
                app would be connected to a real database to persist your data.
              </p>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
