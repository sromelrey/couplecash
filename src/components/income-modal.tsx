"use client";

import { useState, useEffect } from "react";
import { Income, User } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface IncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (income: Omit<Income, "id" | "created_at">) => void;
  income?: Income | null;
  users: User[];
}

export function IncomeModal({
  isOpen,
  onClose,
  onSave,
  income,
  users,
}: IncomeModalProps) {
  const [formData, setFormData] = useState({
    user_id: 0,
    amount: "",
    source: "",
    received_at: "",
  });

  useEffect(() => {
    if (income) {
      setFormData({
        user_id: income.user_id,
        amount: income.amount.toString(),
        source: income.source,
        received_at: income.received_at,
      });
    } else {
      setFormData({
        user_id: 0,
        amount: "",
        source: "",
        received_at: new Date().toISOString().split("T")[0],
      });
    }
  }, [income, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.user_id === 0 ||
      !formData.amount ||
      !formData.source ||
      !formData.received_at
    ) {
      return;
    }

    onSave({
      user_id: formData.user_id,
      amount: parseFloat(formData.amount),
      source: formData.source,
      received_at: formData.received_at,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>{income ? "Edit Income" : "Add New Income"}</DialogTitle>
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
                <SelectItem value='Salary'>Salary</SelectItem>
                <SelectItem value='Bonus'>Bonus</SelectItem>
                <SelectItem value='Freelance'>Freelance</SelectItem>
                <SelectItem value='Investment'>Investment</SelectItem>
                <SelectItem value='Other'>Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className='text-sm font-medium'>Date Received *</label>
            <Input
              type='date'
              value={formData.received_at}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  received_at: e.target.value,
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
              {income ? "Update Income" : "Add Income"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
