# 💖 CoupleCash - Personal Finance Tracker for Couples

A modern, mobile-first personal finance application designed for married couples to manage their combined finances, track expenses, and monitor their financial health together.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd couplecash
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 User Guide

### 🏠 Dashboard Overview

The CoupleCash dashboard provides a comprehensive view of your financial situation:

#### Financial Overview Cards
- **💰 Total Income**: Combined salary and income sources
- **💸 Total Expenses**: All recorded expenses by category
- **💳 Credit Card Debt**: Outstanding credit card balances
- **💵 Cash**: Available cash on hand
- **💳 Debit Cards**: Spending from debit cards
- **⚖️ Balance**: Net financial position (Income - Expenses - Credit Cards - Debit Cards)

### 📊 Managing Transactions

#### Adding New Transactions

**1. Income (Salary & Other Sources)**
- Click the **"Income"** button
- Select the person (you or your partner)
- Choose income source (Salary, Freelance, Investment, Other)
- Enter the amount in PHP (₱)
- Add a description (optional)
- Select the date received
- Click **"Add Income"**

**2. Expenses (Bills, Groceries, etc.)**
- Click the **"Expense"** button
- Select the person who made the expense
- Choose expense category:
  - 🛒 **Groceries**: Food and household items
  - 🏠 **Bills**: Utilities, rent, subscriptions
  - 🚗 **Transportation**: Gas, public transport, car maintenance
  - 🍽️ **Dining**: Restaurants, takeout, food delivery
  - 🛍️ **Shopping**: Clothing, electronics, personal items
  - 🏥 **Healthcare**: Medical expenses, pharmacy
  - 🎬 **Entertainment**: Movies, games, hobbies
  - 📚 **Education**: Books, courses, school fees
  - 🏠 **Home**: Furniture, appliances, home improvement
  - 🎁 **Gifts**: Presents, celebrations
  - 🚗 **Car**: Insurance, maintenance, parking
  - 📱 **Tech**: Software, gadgets, internet
  - 🏥 **Insurance**: Health, life, property insurance
  - 🏠 **Rent/Mortgage**: Housing payments
  - 📦 **Miscellaneous**: Other expenses
- Enter the amount spent
- Add a description
- Select the expense date
- Click **"Add Expense"**

**3. Cash Transactions**
- Click the **"Cash"** button
- Select the person
- Choose cash source:
  - 💳 **ATM Withdrawal**: Money withdrawn from bank
  - 💰 **Salary Cash**: Cash portion from salary
  - 🪙 **Change**: Change from purchases
  - 📦 **Other**: Other cash sources
- Enter the amount
- Add a description
- Select the transaction date
- Click **"Add Cash"**

**4. Debit Card Transactions**
- Click the **"Debit"** button
- Select the person
- Choose the bank (BPI, BDO, Metrobank, etc.)
- Enter card number (automatically formatted as ****-****-****-1234)
- Enter the amount spent
- Add a description
- Select the transaction date
- Click **"Add Debit Card"**

**5. Credit Card Transactions**
- Click the **"Credit"** button
- Select the person
- Choose the bank
- Enter card number
- Enter the payable amount
- Set the swipe date (when you used the card)
- Set the due date (when payment is due)
- Click **"Add Credit Card"**

### 📋 Viewing Transactions

#### Transaction Tabs
Use the tabs to filter and view specific transaction types:

- **All**: Shows all transactions sorted by date (newest first)
- **Income**: Shows only income transactions
- **Expenses**: Shows only expense transactions
- **Cash**: Shows only cash transactions
- **Debit**: Shows only debit card transactions
- **Credit**: Shows only credit card transactions

#### Transaction Cards
Each transaction is displayed as a color-coded card:
- 💚 **Green**: Income (positive impact on balance)
- ❤️ **Red**: Expenses (negative impact on balance)
- 💜 **Purple**: Cash (neutral - money movement)
- 💙 **Indigo**: Debit Cards (negative impact on balance)
- 🧡 **Orange**: Credit Cards (debt - negative impact on balance)

### ✏️ Editing Transactions

1. **Find the transaction** you want to edit
2. **Click the three dots (⋮)** on the right side of the transaction card
3. **Select "Edit"** from the dropdown menu
4. **Modify the information** in the popup form
5. **Click "Update"** to save changes

### 🗑️ Deleting Transactions

1. **Find the transaction** you want to delete
2. **Click the three dots (⋮)** on the right side of the transaction card
3. **Select "Delete"** from the dropdown menu
4. **Confirm the deletion** (transaction will be permanently removed)

### 📱 Mobile-First Design

CoupleCash is optimized for mobile devices:
- **Responsive layout** that works on phones, tablets, and desktops
- **Touch-friendly buttons** and interface elements
- **Easy navigation** with large, accessible buttons
- **Readable text** and clear visual hierarchy

### 💡 Tips for Better Usage

#### 1. **Regular Updates**
- Add transactions as they happen for accurate tracking
- Review your financial overview weekly
- Update credit card payments when made

#### 2. **Categorization**
- Use specific categories for better expense analysis
- Be consistent with category names
- Add descriptions for clarity

#### 3. **Cash Management**
- Track ATM withdrawals to monitor cash flow
- Record cash expenses when possible
- Keep track of change and small cash transactions

#### 4. **Credit Card Management**
- Set due dates accurately to avoid late fees
- Track swipe dates for better payment planning
- Monitor total credit card debt regularly

#### 5. **Partner Coordination**
- Both partners should add their own transactions
- Use consistent naming and categorization
- Review finances together regularly

### 🔄 Data Management

**Important Note**: CoupleCash currently uses mock data that resets when you refresh the page. This is perfect for:
- Testing the application
- Demonstrating features
- Learning how to use the app

For production use, the app would be connected to a real database to persist your data.

### 🎯 Understanding Your Financial Health

#### Balance Calculation
Your balance is calculated as:
```
Balance = Total Income - Total Expenses - Credit Card Debt - Debit Card Spending
```

#### Positive Balance
- You're spending less than you earn
- Good financial health
- Consider saving or investing excess funds

#### Negative Balance
- You're spending more than you earn
- Review expenses and find areas to cut back
- Consider increasing income sources

#### Expense Categories
Monitor which categories consume the most of your budget:
- High grocery expenses? Consider meal planning
- High transportation costs? Look for carpooling or public transport options
- High entertainment expenses? Set monthly limits

### 🆘 Troubleshooting

#### Common Issues

**1. Can't see my transactions?**
- Check if you're on the correct tab
- Refresh the page to reload data
- Ensure you've added transactions correctly

**2. Balance seems incorrect?**
- Verify all transactions are categorized correctly
- Check if credit card payments are recorded
- Ensure income and expenses are properly entered

**3. App not loading?**
- Check your internet connection
- Refresh the browser page
- Clear browser cache if needed

**4. Mobile display issues?**
- Rotate your device to landscape mode
- Zoom out on your browser
- Use a modern mobile browser (Chrome, Safari, Firefox)

### 🔮 Future Features

CoupleCash is designed to be extensible. Future versions may include:
- Real database integration
- Budget setting and tracking
- Financial goal setting
- Expense reports and analytics
- Bill reminders and notifications
- Multi-currency support
- Data export functionality

### 📞 Support

If you encounter any issues or have suggestions for improvement:
1. Check this user guide first
2. Review the transaction data for accuracy
3. Try refreshing the application
4. Document any bugs or issues you find

---

**Happy Financial Tracking! 💖💰**

*CoupleCash helps you and your partner build a stronger financial future together.*