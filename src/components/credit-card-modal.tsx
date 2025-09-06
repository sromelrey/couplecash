"use client";

import { useState, useEffect } from "react";
import { CreditCard, User } from "@/lib/store";
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

interface CreditCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (card: Omit<CreditCard, "id" | "created_at">) => void;
  card?: CreditCard | null;
  users: User[];
}

export function CreditCardModal({
  isOpen,
  onClose,
  onSave,
  card,
  users,
}: CreditCardModalProps) {
  const [formData, setFormData] = useState({
    user_id: 0,
    bank: "",
    card_number: "",
    swipe_date: "",
    due_date: "",
    payable_amount: "",
  });

  useEffect(() => {
    if (card) {
      setFormData({
        user_id: card.user_id,
        bank: card.bank,
        card_number: card.card_number,
        swipe_date: card.swipe_date,
        due_date: card.due_date,
        payable_amount: card.payable_amount.toString(),
      });
    } else {
      setFormData({
        user_id: 0,
        bank: "",
        card_number: "",
        swipe_date: new Date().toISOString().split("T")[0],
        due_date: "",
        payable_amount: "",
      });
    }
  }, [card, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.user_id === 0 ||
      !formData.bank ||
      !formData.card_number ||
      !formData.swipe_date ||
      !formData.due_date ||
      !formData.payable_amount
    ) {
      return;
    }

    onSave({
      user_id: formData.user_id,
      bank: formData.bank,
      card_number: formData.card_number,
      swipe_date: formData.swipe_date,
      due_date: formData.due_date,
      payable_amount: parseFloat(formData.payable_amount),
    });
    onClose();
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");

    // Format as ****-****-****-1234
    if (digits.length <= 4) {
      return digits;
    } else if (digits.length <= 8) {
      return `****-${digits.slice(-4)}`;
    } else if (digits.length <= 12) {
      return `****-****-${digits.slice(-4)}`;
    } else {
      return `****-****-****-${digits.slice(-4)}`;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData((prev) => ({ ...prev, card_number: formatted }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>
            {card ? "Edit Credit Card" : "Add New Credit Card"}
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
            <label className='text-sm font-medium'>Bank *</label>
            <Select
              value={formData.bank}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, bank: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder='Select bank' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='BPI'>BPI</SelectItem>
                <SelectItem value='BDO'>BDO</SelectItem>
                <SelectItem value='Metrobank'>Metrobank</SelectItem>
                <SelectItem value='Security Bank'>Security Bank</SelectItem>
                <SelectItem value='RCBC'>RCBC</SelectItem>
                <SelectItem value='UnionBank'>UnionBank</SelectItem>
                <SelectItem value='EastWest'>EastWest</SelectItem>
                <SelectItem value='Other'>Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className='text-sm font-medium'>Card Number *</label>
            <Input
              value={formData.card_number}
              onChange={handleCardNumberChange}
              placeholder='****-****-****-1234'
              maxLength={19}
              required
            />
          </div>

          <div>
            <label className='text-sm font-medium'>Payable Amount (₱) *</label>
            <Input
              type='number'
              step='0.01'
              value={formData.payable_amount}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  payable_amount: e.target.value,
                }))
              }
              placeholder='0.00'
              required
            />
          </div>

          <div>
            <label className='text-sm font-medium'>Swipe Date *</label>
            <Input
              type='date'
              value={formData.swipe_date}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, swipe_date: e.target.value }))
              }
              required
            />
          </div>

          <div>
            <label className='text-sm font-medium'>Due Date *</label>
            <Input
              type='date'
              value={formData.due_date}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, due_date: e.target.value }))
              }
              required
            />
          </div>

          <DialogFooter>
            <Button type='button' variant='outline' onClick={onClose}>
              Cancel
            </Button>
            <Button type='submit'>
              {card ? "Update Credit Card" : "Add Credit Card"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
