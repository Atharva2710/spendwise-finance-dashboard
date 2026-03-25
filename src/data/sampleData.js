import { v4 as uuidv4 } from 'uuid';
import { subDays } from 'date-fns';

const today = new Date();

export const sampleTransactions = [
  {
    id: uuidv4(),
    title: 'Monthly Salary',
    amount: 85000,
    category: 'Salary',
    type: 'income',
    date: subDays(today, 2).toISOString(),
    notes: 'Base salary for the month',
    recurring: true
  },
  {
    id: uuidv4(),
    title: 'Freelance Payment',
    amount: 15000,
    category: 'Freelance Payment',
    type: 'income',
    date: subDays(today, 10).toISOString(),
    notes: 'Website design project',
    recurring: false
  },
  {
    id: uuidv4(),
    title: 'Rent',
    amount: 25000,
    category: 'Rent',
    type: 'expense',
    date: subDays(today, 3).toISOString(),
    notes: 'Monthly apartment rent',
    recurring: true
  },
  {
    id: uuidv4(),
    title: 'Food Order',
    amount: 850,
    category: 'Food Order',
    type: 'expense',
    date: subDays(today, 1).toISOString(),
    notes: 'Dinner from Swiggy',
    recurring: false
  },
  {
    id: uuidv4(),
    title: 'Uber Ride',
    amount: 350,
    category: 'Uber Ride',
    type: 'expense',
    date: subDays(today, 2).toISOString(),
    notes: 'Ride to office',
    recurring: false
  },
  {
    id: uuidv4(),
    title: 'Netflix Subscription',
    amount: 649,
    category: 'Netflix Subscription',
    type: 'expense',
    date: subDays(today, 5).toISOString(),
    notes: 'Premium plan',
    recurring: true
  },
  {
    id: uuidv4(),
    title: 'Shopping',
    amount: 4500,
    category: 'Shopping',
    type: 'expense',
    date: subDays(today, 8).toISOString(),
    notes: 'New clothes',
    recurring: false
  },
  {
    id: uuidv4(),
    title: 'Gym Membership',
    amount: 1500,
    category: 'Gym Membership',
    type: 'expense',
    date: subDays(today, 12).toISOString(),
    notes: 'Monthly fee',
    recurring: true
  }
];

export const sampleBudget = {
  monthlyBudget: 40000
};
