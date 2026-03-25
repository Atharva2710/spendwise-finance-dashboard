# SpendWise — Personal Finance & Expense Analytics App

SpendWise is a modern React-based personal finance dashboard that helps users track income and expenses, manage monthly budgets, monitor recurring payments, and visualize spending patterns through interactive analytics.

This project was built as a college frontend React project with a focus on clean UI, reusable architecture, and practical real-world functionality.

---

## Features

### Transaction Management
- Add new income and expense transactions
- Edit existing transactions
- Delete transactions
- Mark transactions as recurring

### Smart Transaction Handling
- Search transactions by title or notes
- Filter transactions by category, type, and date range
- Sort transactions by date, amount, or category
- Toggle between card view and table view

### Budget Tracking
- Set a monthly budget
- View total spending
- View remaining budget
- Track percentage of budget used
- Over-budget warning state

### Dashboard Analytics
- Total Income
- Total Expenses
- Net Balance
- Top Spending Category
- Recurring Expense Count

### Charts & Insights
- Spending by category (Pie Chart)
- Monthly spending trend (Line Chart)
- Income vs Expense comparison (Bar Chart)

### UX Features
- Responsive layout
- Toast notifications
- Empty states
- Form validation
- LocalStorage persistence

---

## Tech Stack

- **React**
- **Vite**
- **React Router DOM**
- **Context API**
- **Axios**
- **React Icons**
- **React Toastify**
- **React Hook Form**
- **Yup**
- **Recharts**
- **date-fns**
- **uuid**
- **Framer Motion**

---

## Folder Structure

```bash
src/
  components/
    Navbar/
    Sidebar/
    DashboardCards/
    TransactionCard/
    TransactionTable/
    SearchBar/
    Filters/
    SortDropdown/
    BudgetCard/
    Charts/
    EmptyState/
    LoadingSpinner/
    PageHeader/

  pages/
    Dashboard/
    Transactions/
    AddTransaction/
    EditTransaction/
    Budget/
    Analytics/

  context/
    FinanceContext.jsx

  hooks/
    useTransactions.js
    useBudget.js
    useDebounce.js
    useLocalStorage.js

  services/
    api.js

  utils/
    currencyFormatter.js
    helpers.js
    constants.js

  data/
    sampleData.js

  App.jsx
  main.jsx
  index.css
```

---

## How to Run Locally

Follow these steps to set up and run the SpendWise project on your local machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Atharva2710/spendwise-finance-dashboard.git
   ```

2. **Navigate into the project directory:**
   ```bash
   cd spendwise-finance-dashboard
   ```

3. **Install dependencies:**
   Make sure you have [Node.js](https://nodejs.org/) installed, then run:
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open the App:**
   Open your browser and navigate to `http://localhost:5173` (or the URL provided in your terminal).

---

## Building for Production

To create a production-ready build, run:
```bash
npm run build
```
This will compile the application into the `dist` folder.