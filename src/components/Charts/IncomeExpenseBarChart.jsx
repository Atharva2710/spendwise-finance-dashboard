import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const IncomeExpenseBarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
       <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
        No chart data available
      </div>
    );
  }

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barSize={32}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
          <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis 
            stroke="var(--text-muted)" 
            fontSize={12} 
            tickFormatter={(value) => `₹${value}`} 
            tickLine={false} 
            axisLine={false} 
            width={60}
          />
          <Tooltip 
            formatter={(value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)}
            contentStyle={{ borderRadius: 'var(--radius-md)', border: 'none', boxShadow: 'var(--shadow-md)', background: 'var(--surface-color)' }}
            cursor={{ fill: 'var(--bg-color)' }}
          />
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="income" fill="var(--success-color)" radius={[4, 4, 0, 0]} name="Income" />
          <Bar dataKey="expense" fill="var(--danger-color)" radius={[4, 4, 0, 0]} name="Expense" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeExpenseBarChart;
