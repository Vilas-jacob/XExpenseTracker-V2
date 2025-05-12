import React, {useState} from 'react';



function AddBalanceModal({cancelAddBalanceModal, addBalance}) {

    const [amount, setAmount]=useState('');

    const handleAddBalance = ()=>{
        if(amount){
            addBalance(amount);
            setAmount('');
        }
    };

  return (
    <div className='fixed inset-0 flex items-center  justify-center bg-gray bg-opacity-30 backdrop-blur-sm rounded-lg'>
        <div className='modalContainer bg-gray-200 rounded-lg shadow-lg w-150 h-40 m-5'>
            <div className='modalTitle px-5 pt-5'>
                <h2 className='text-xl font-bold'>Add Balance</h2>
            </div>
            <div className='modalForm '>
                <form onSubmit={handleAddBalance} className='grid grid-flow-col gap-5  p-5 text-md font-semibold md:text-lg md:font-bold'>
                    <input className='incomeAmount rounded-lg bg-white p-3 shadow-md' type='number' placeholder='Income Amount' value={amount} onChange={(e)=>setAmount(e.target.value)}></input>
                    <button type='submit' className='addBalanceButton rounded-lg bg-orange-300 text-white px-3 py-2 shadow-md'>Add Balance</button>
                    <button className='cancelButton rounded-lg bg-gray-300 text-black px-3 py-2 shadow-md' onClick={()=>{cancelAddBalanceModal(false)}}>Cancel</button>
                </form>
                
            </div>

        </div>

    </div>
  )
}

export default AddBalanceModal