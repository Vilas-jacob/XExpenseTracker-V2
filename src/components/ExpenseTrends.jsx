import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';



function ExpenseTrends({expenses}) {
  return (
    <div >
    <h3 className="text-white text-lg font-semibold md:text-xl md:font-bold">Top Expenses</h3>
    <div className='rounded-lg bg-gray-100 my-5 p-5'>
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <BarChart width={window.innerWidth < 768 ? 320 : 400} height={200} data={expenses} layout="vertical">
                <XAxis type="number" hide={true} />
                <YAxis dataKey="category" type="category" axisLine={false}  />
                <Tooltip />
                <Bar dataKey="price" fill="indigo" barSize={30}  />
            </BarChart>
        </div>
       
    </div>
  
</div>
  )
}

export default ExpenseTrends