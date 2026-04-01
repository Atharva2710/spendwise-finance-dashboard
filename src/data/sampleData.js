import { v4 as uuidv4 } from 'uuid';
import { subDays } from 'date-fns';

const today = new Date();

// Helper to ensure sample data always falls smoothly within the current calendar month
const getSampleDate = (day) => {
  const d = new Date(today);
  d.setDate(day);
  return d.toISOString();
};

export const sampleTransactions = [
  {
    id: uuidv4(),
    title: 'Monthly Salary',
    amount: 85000,
    category: 'Salary',
    type: 'income',
    date: getSampleDate(1), // 1st of the month
    notes: 'Base salary for the month',
    recurring: true
  },
  {
    id: uuidv4(),
    title: 'Freelance Payment',
    amount: 15000,
    category: 'Freelance Payment',
    type: 'income',
    date: getSampleDate(10),
    notes: 'Website design project',
    recurring: false
  },
  {
    id: uuidv4(),
    title: 'Rent',
    amount: 25000,
    category: 'Rent',
    type: 'expense',
    date: getSampleDate(2),
    notes: 'Monthly apartment rent',
    recurring: true
  },
  {
    id: uuidv4(),
    title: 'Food Order',
    amount: 850,
    category: 'Food Order',
    type: 'expense',
    date: getSampleDate(5),
    notes: 'Dinner from Swiggy',
    recurring: false
  },
  {
    id: uuidv4(),
    title: 'Uber Ride',
    amount: 350,
    category: 'Uber Ride',
    type: 'expense',
    date: getSampleDate(6),
    notes: 'Ride to office',
    recurring: false
  },
  {
    id: uuidv4(),
    title: 'Netflix Subscription',
    amount: 649,
    category: 'Netflix Subscription',
    type: 'expense',
    date: getSampleDate(7),
    notes: 'Premium plan',
    recurring: true
  },
  {
    id: uuidv4(),
    title: 'Shopping',
    amount: 4500,
    category: 'Shopping',
    type: 'expense',
    date: getSampleDate(15),
    notes: 'New clothes',
    recurring: false
  },
  {
    id: uuidv4(),
    title: 'Gym Membership',
    amount: 1500,
    category: 'Gym Membership',
    type: 'expense',
    date: getSampleDate(20),
    notes: 'Monthly fee',
    recurring: true
  }
];

export const sampleBudget = {
  monthlyBudget: 40000
};
