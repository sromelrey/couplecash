"use client";

import { useState, useEffect } from "react";
import { Expense, User } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (expense: Omit<Expense, "id" | "created_at">) => void;
  expense?: Expense | null;
  users: User[];
}

export function ExpenseModal({
  isOpen,
  onClose,
  onSave,
  expense,
  users,
}: ExpenseModalProps) {
  const [formData, setFormData] = useState({
    user_id: 0,
    category: "misc" as Expense["category"],
    description: "",
    amount: "",
    expense_date: "",
  });

  useEffect(() => {
    if (expense) {
      setFormData({
        user_id: expense.user_id,
        category: expense.category,
        description: expense.description,
        amount: expense.amount.toString(),
        expense_date: expense.expense_date,
      });
    } else {
      setFormData({
        user_id: 0,
        category: "misc",
        description: "",
        amount: "",
        expense_date: new Date().toISOString().split("T")[0],
      });
    }
  }, [expense, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.user_id === 0 || !formData.amount || !formData.expense_date) {
      return;
    }

    onSave({
      user_id: formData.user_id,
      category: formData.category,
      description: formData.description,
      amount: parseFloat(formData.amount),
      expense_date: formData.expense_date,
    });
    onClose();
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>
            {expense ? "Edit Expense" : "Add New Expense"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='text-sm font-medium'>Person *</label>
            <Select
              value={formData.user_id.toString()}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, user_id: parseInt(value) }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder='Select person' />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id.toString()}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className='text-sm font-medium'>Category *</label>
            <Select
              value={formData.category}
              onValueChange={(value: Expense["category"]) =>
                setFormData((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder='Select category' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='groceries'>🛒 Groceries</SelectItem>
                <SelectItem value='bills'>⚡ Bills</SelectItem>
                <SelectItem value='credit_card'>💳 Credit Card</SelectItem>
                <SelectItem value='misc'>📦 Miscellaneous</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className='text-sm font-medium'>Amount (₱) *</label>
            <Input
              type='number'
              step='0.01'
              value={formData.amount}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, amount: e.target.value }))
              }
              placeholder='0.00'
              required
            />
          </div>

          <div>
            <label className='text-sm font-medium'>Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder='What was this expense for?'
              rows={2}
            />
          </div>

          <div>
            <label className='text-sm font-medium'>Date *</label>
            <Input
              type='date'
              value={formData.expense_date}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  expense_date: e.target.value,
                }))
              }
              required
            />
          </div>

          <DialogFooter>
            <Button type='button' variant='outline' onClick={onClose}>
              Cancel
            </Button>
            <Button type='submit'>
              {expense ? "Update Expense" : "Add Expense"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
