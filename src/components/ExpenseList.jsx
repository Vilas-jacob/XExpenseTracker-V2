import { faBolt, faEdit, faEllipsisH, faFilm, faPizzaSlice, faPlane, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const getIconForCategory = (category)=>{
    switch (category){
        case 'Food':
            return faPizzaSlice;
        case 'Entertainment':
            return faFilm;
        case 'Travel':
            return faPlane;
        case 'Utilities':
            return faBolt;
        default:
            return faEllipsisH;
    }
}
function ExpenseList({expenses, forEdit, forDelete}) {
  return (
    <div className='rounded-lg bg-gray-100 my-5'>
        {expenses.length === 0 ? 
            (<h2 className='text-black p-5'>No transactions!</h2>) : (
                expenses.map((expense)=> (
                    <div key={expense.id} className='flex flex-col md:flex-row justify-between p-2 border-b'>
                        <div className='flex px-5'>
                        <div className='bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center'>
                        <FontAwesomeIcon icon={getIconForCategory(expense.category)} className='text-blue-400' />
                        </div>
                        <div className='flex flex-col px-5'>
                           
                            <span className="text-md text-black">{expense.title}</span>
                            <p className='text-gray-500 text-sm whitespace-nowrap'>{expense.date}</p>
                        </div>
                        </div>
                       
                            <div className='flex flex-row justify-between md:justify-end items-center w-full gap-2 pl-20 pr-5 md:p-5'>
                                <span className="text-lg text-orange-500 mr-4">₹{expense.price}</span>
                                    <div className='flex gap-2'>
                                    
                                        <button className="text-green-400 hover:text-green-600 mr-2" onClick={()=>forEdit(expense)}><FontAwesomeIcon icon={faEdit} className='text-xl' /></button>
                                        <button className="text-red-400 hover:text-red-600" onClick={()=>forDelete(expense.id)}><FontAwesomeIcon icon={faTrash} className='text-xl' /></button>
                                    </div>
                                
                            </div>
                       
                        
                       
                    </div>
                ))
            )

        }
    </div>
  )
}

export default ExpenseList