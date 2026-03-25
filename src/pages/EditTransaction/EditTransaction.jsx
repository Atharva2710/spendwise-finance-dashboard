import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PageHeader from '../../components/PageHeader/PageHeader';
import useTransactions from '../../hooks/useTransactions';
import { CATEGORIES, TRANSACTION_TYPES } from '../../utils/constants';
import { toast } from 'react-toastify';
import EmptyState from '../../components/EmptyState/EmptyState';
import PageWrapper from '../../components/PageWrapper/PageWrapper';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  amount: yup.number().typeError('Amount must be a number').positive('Amount must be positive').required('Amount is required'),
  category: yup.string().required('Category is required'),
  date: yup.string().required('Date is required'),
  type: yup.string().oneOf(Object.values(TRANSACTION_TYPES)).required('Type is required'),
  notes: yup.string(),
  recurring: yup.boolean()
}).required();

const EditTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allTransactions, updateTransaction } = useTransactions();

  const transactionToEdit = allTransactions.find(t => t.id === id);

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      amount: '',
      type: TRANSACTION_TYPES.EXPENSE,
      category: '',
      date: '',
      notes: '',
      recurring: false
    }
  });

  useEffect(() => {
    if (transactionToEdit) {
      reset({
        title: transactionToEdit.title,
        amount: transactionToEdit.amount,
        type: transactionToEdit.type,
        category: transactionToEdit.category,
        date: transactionToEdit.date.split('T')[0], 
        notes: transactionToEdit.notes || '',
        recurring: transactionToEdit.recurring || false
      });
    }
  }, [transactionToEdit, reset]);

  if (!transactionToEdit) {
    return (
      <EmptyState 
        title="Transaction Not Found" 
        message="The transaction you are trying to edit does not exist or has been deleted."
        action={<button onClick={() => navigate('/transactions')} className="btn btn-primary">Back to Transactions</button>}
      />
    );
  }

  const selectedType = watch('type');
  const validCategories = selectedType === TRANSACTION_TYPES.INCOME ? CATEGORIES.INCOME : CATEGORIES.EXPENSE;

  const onSubmit = (data) => {
    const updatedData = {
      ...data,
      amount: Number(data.amount),
      date: new Date(data.date).toISOString()
    };
    
    updateTransaction(id, updatedData);
    toast.success('Transaction updated successfully!');
    navigate('/transactions');
  };

  return (
    <PageWrapper className="pb-8" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <PageHeader 
        title="Edit Transaction" 
        subtitle="Update the details of your recorded transaction"
      />

      <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <label style={{ flex: '1 1 200px', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem', border: '1px solid', borderColor: selectedType === TRANSACTION_TYPES.EXPENSE ? 'var(--danger-color)' : 'var(--border-color)', borderRadius: 'var(--radius-md)', cursor: 'pointer', background: selectedType === TRANSACTION_TYPES.EXPENSE ? 'rgba(239, 68, 68, 0.05)' : 'transparent', transition: 'all 0.2s' }}>
              <input type="radio" value={TRANSACTION_TYPES.EXPENSE} {...register('type')} style={{ cursor: 'pointer', accentColor: 'var(--danger-color)' }} />
              <span style={{ fontWeight: 500, color: selectedType === TRANSACTION_TYPES.EXPENSE ? 'var(--danger-color)' : 'var(--text-main)' }}>Expense</span>
            </label>
            <label style={{ flex: '1 1 200px', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem', border: '1px solid', borderColor: selectedType === TRANSACTION_TYPES.INCOME ? 'var(--success-color)' : 'var(--border-color)', borderRadius: 'var(--radius-md)', cursor: 'pointer', background: selectedType === TRANSACTION_TYPES.INCOME ? 'rgba(16, 185, 129, 0.05)' : 'transparent', transition: 'all 0.2s' }}>
              <input type="radio" value={TRANSACTION_TYPES.INCOME} {...register('type')} style={{ cursor: 'pointer', accentColor: 'var(--success-color)' }} />
              <span style={{ fontWeight: 500, color: selectedType === TRANSACTION_TYPES.INCOME ? 'var(--success-color)' : 'var(--text-main)' }}>Income</span>
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div className="form-group">
              <label>Title</label>
              <input type="text" {...register('title')} className="form-control" />
              {errors.title && <span className="error-text">{errors.title.message}</span>}
            </div>

            <div className="form-group">
              <label>Amount (₹)</label>
              <input type="number" step="0.01" {...register('amount')} className="form-control" />
              {errors.amount && <span className="error-text">{errors.amount.message}</span>}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div className="form-group">
              <label>Category</label>
              <select {...register('category')} className="form-control">
                <option value="">Select a category</option>
                {validCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <span className="error-text">{errors.category.message}</span>}
            </div>

            <div className="form-group">
              <label>Date</label>
              <input type="date" {...register('date')} className="form-control" />
              {errors.date && <span className="error-text">{errors.date.message}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Notes (Optional)</label>
            <textarea {...register('notes')} className="form-control" rows="3" />
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', marginTop: '0.5rem' }}>
            <input type="checkbox" {...register('recurring')} style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--primary-color)', cursor: 'pointer' }} />
            <span style={{ fontWeight: 500, color: 'var(--text-main)' }}>This is a recurring transaction</span>
          </label>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
            <button type="button" onClick={() => navigate('/transactions')} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .form-group label { font-size: 0.875rem; font-weight: 500; color: var(--text-main); }
        .form-control { width: 100%; padding: 0.75rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); background: var(--bg-color); color: var(--text-main); font-size: 1rem; outline: none; transition: border-color 0.2s; box-sizing: border-box; }
        .form-control:focus { border-color: var(--primary-color); box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1); }
        .error-text { color: var(--danger-color); font-size: 0.825rem; margin-top: -0.25rem; font-weight: 500; }
      `}</style>
    </PageWrapper>
  );
};

export default EditTransaction;
