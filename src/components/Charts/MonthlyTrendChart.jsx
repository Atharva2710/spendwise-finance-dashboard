import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MonthlyTrendChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
       <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
        No trend data available
      </div>
    );
  }

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--danger-color)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--danger-color)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--success-color)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--success-color)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis 
            stroke="var(--text-muted)" 
            fontSize={12} 
            tickFormatter={(value) => `₹${value}`} 
            tickLine={false} 
            axisLine={false} 
            width={60}
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
          <Tooltip 
            formatter={(value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)}
            contentStyle={{ borderRadius: 'var(--radius-md)', border: 'none', boxShadow: 'var(--shadow-md)' }}
          />
          <Area type="monotone" dataKey="income" stroke="var(--success-color)" fillOpacity={1} fill="url(#colorIncome)" name="Income" />
          <Area type="monotone" dataKey="expense" stroke="var(--danger-color)" fillOpacity={1} fill="url(#colorExpense)" name="Expense" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyTrendChart;
