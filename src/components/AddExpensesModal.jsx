import React, { useEffect, useState } from 'react';



function AddExpensesModal({cancelAddExpensesModal, addExpense, editingExpense, setEditingExpense}) {
        const[title,setTitle]=useState('');
        const[price,setPrice]=useState('');
        const[category,setCategory]= useState('');
        const[date,setDate]=useState('');

        useEffect(() => {
            if (editingExpense) {
                setTitle(editingExpense.title);
                setPrice(editingExpense.price);
                setCategory(editingExpense.category);
                setDate(editingExpense.date);
            }
        }, [editingExpense]);

        const handleAddExpense = (e)=>{
            e.preventDefault();
            const expense = {
                id: editingExpense ? editingExpense.id : Date.now(),
                title,
                price,
                category,
                date,
            };
            addExpense(expense);
            resetForm();
        };


        const resetForm = ()=>{
            setTitle('');
            setPrice('');
            setCategory('');
            setDate('');
            setEditingExpense(null);
            cancelAddExpensesModal(false);
        };


  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray bg-opacity-30 backdrop-blur-sm'>
        <div className='modalContainer bg-gray-200 rounded-lg shadow-lg mb-10 w-150 h-60 m-5 '>
            <div className='modalTitle p-5 '>
                <h2 className='text-xl font-bold'>{editingExpense? 'Edit Expense' : 'Add Expenses'}</h2>
            </div>
            <div className='addExpensesForm '>
                <form onSubmit={handleAddExpense} >
                    <div className='grid grid-cols-2 gap-5 px-5 mb-5 text-md font-semibold md:text-lg md:font-bold'>
                        <input className='rounded-lg bg-white px-5 shadow-md' type='text' placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)} required ></input>
                        <input className='rounded-lg bg-white px-5 shadow-md' type='number' placeholder='Price' value={price} onChange={(e)=>setPrice(e.target.value)} required ></input>
                    </div>
                    <div className='grid grid-cols-2 gap-5 px-5 mb-5 text-md font-semibold md:text-lg md:font-bold'>
                      
                        <select className='rounded-lg bg-white px-5 shadow-md' value={category} onChange={(e)=>setCategory(e.target.value)} required>  
                            <option value="">Select Category</option>
                            <option value="Food">Food</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Travel">Travel</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Others">Others</option>
                        </select>
                        <input className='rounded-lg bg-white px-5 shadow-md' type='date' value={date} onChange={(e)=>setDate(e.target.value)} required></input>
                    </div>
                    <div className='grid grid-flow-col px-5 mb-5 gap-5 text-md font-semibold md:text-lg md:font-bold'>
                    <button type="submit" className='addExpenseButton rounded-lg bg-orange-300 text-white px-3 py-2 shadow-md'>{editingExpense ? 'Edit Expense' : 'Add Expense'}</button>
                    <button type='button' className='cancelButton rounded-lg bg-gray-300 text-black px-3 py-2 shadow-md' onClick={resetForm}>Cancel</button>
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddExpensesModal