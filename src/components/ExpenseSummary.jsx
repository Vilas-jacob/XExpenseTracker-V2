import React from 'react'
import { PieChart, Pie, Cell } from 'recharts'


const categoryColors = {
    Food: 'Violet',        
    Entertainment: 'Orange', 
    Travel: 'Yellow',      
    Utilities: 'Teal',  
    Others: 'Purple'       
};

function ExpenseSummary({expenses}) {
    //console.log("Received expenses in Pie Chart:", expenses);
    if (expenses.length === 0) {
        return <p>No expenses to display</p>; 
    }
  return (
    <div className='flex flex-col'>
        <PieChart width={200} height={200}>
            <Pie data={expenses} 
                 dataKey="price" 
                 nameKey="category" 
                 cx="50%" 
                 cy="50%" 
                 outerRadius={80} 
                 fill="#8884d8" 
                 >
                    {expenses.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={categoryColors[entry.category] || '#888'} />
                ))}
            </Pie>
        </PieChart>

        <div className="flex flex-wrap items-start gap-2  mt-4">
            {expenses.map((entry,index)=>(
                <div key={`legend-${index}`} className='flex items-center gap-2 mb-2'>
                    <div  className='w-4 h-4' style={{ backgroundColor: categoryColors[entry.category] || '#888' }} >
                    </div>
                    <span style={{ color: categoryColors[entry.category] || '#888' }}>
                            {entry.category}
                        </span>
                </div>
            ))

            }
        </div>
    </div>
  )
}

export default ExpenseSummary