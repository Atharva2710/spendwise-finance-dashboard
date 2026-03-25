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