"use client";

import { useState, useEffect } from "react";
import { Cash, User } from "@/lib/store";
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

interface CashModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cash: Omit<Cash, "id" | "created_at">) => void;
  cash?: Cash | null;
  users: User[];
}

export function CashModal({
  isOpen,
  onClose,
  onSave,
  cash,
  users,
}: CashModalProps) {
  const [formData, setFormData] = useState({
    user_id: 0,
    amount: "",
    source: "",
    description: "",
    transaction_date: "",
  });

  useEffect(() => {
    if (cash) {
      setFormData({
        user_id: cash.user_id,
        amount: cash.amount.toString(),
        source: cash.source,
        description: cash.description,
        transaction_date: cash.transaction_date,
      });
    } else {
      setFormData({
        user_id: 0,
        amount: "",
        source: "",
        description: "",
        transaction_date: new Date().toISOString().split("T")[0],
      });
    }
  }, [cash, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.user_id === 0 ||
      !formData.amount ||
      !formData.source ||
      !formData.transaction_date
    ) {
      return;
    }

    onSave({
      user_id: formData.user_id,
      amount: parseFloat(formData.amount),
      source: formData.source,
      description: formData.description,
      transaction_date: formData.transaction_date,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>
            {cash ? "Edit Cash Transaction" : "Add New Cash Transaction"}
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
            <label className='text-sm font-medium'>Source *</label>
            <Select
              value={formData.source}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, source: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder='Select source' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='withdrawal'>💳 ATM Withdrawal</SelectItem>
                <SelectItem value='salary_cash'>💰 Salary Cash</SelectItem>
                <SelectItem value='change'>🪙 Change</SelectItem>
                <SelectItem value='other'>📦 Other</SelectItem>
              </SelectContent>
            </Select>
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
              placeholder='What was this cash for?'
              rows={2}
            />
          </div>

          <div>
            <label className='text-sm font-medium'>Date *</label>
            <Input
              type='date'
              value={formData.transaction_date}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  transaction_date: e.target.value,
                }))
              }
              required
            />
          </div>

          <DialogFooter>
            <Button type='button' variant='outline' onClick={onClose}>
              Cancel
            </Button>
            <Button type='submit'>{cash ? "Update Cash" : "Add Cash"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
