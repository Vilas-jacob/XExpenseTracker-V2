import { useEffect, useState } from "react";
import AddBalanceModal from "./AddBalanceModal";
import AddExpensesModal from "./AddExpensesModal";
import ExpenseList from "./ExpenseList";
import ExpenseTrends from "./ExpenseTrends";
import ExpenseSummary from "./ExpenseSummary";
import { useSnackbar } from "notistack";

export default function WalletBalance(){
    const [walletBalance, setWalletBalance]=useState(5000);
    const [expenses,setExpenses] = useState([]);
    const [openAddBalance, setOpenAddBalance]=useState(false);
    const [openAddExpenses,setOpenAddExpenses]=useState(false);
    const [editingExpense,setEditingExpense]=useState(null);
    const {enqueueSnackbar} = useSnackbar();

    useEffect(()=>{
        const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const storedWalletBalance = localStorage.getItem('walletBalance') || 5000;
        setExpenses(storedExpenses);
        setWalletBalance(Number(storedWalletBalance));
    },[]);
    
    useEffect(()=>{
        localStorage.setItem('expenses', JSON.stringify(expenses));
        localStorage.setItem('walletBalance', walletBalance);
    },[expenses,walletBalance]);


    const addBalance = (amount)=>{
        //console.log("Adding balance:", amount);
        setWalletBalance(prevBalance => prevBalance + Number(amount));
        setOpenAddBalance(false);
    };

    const addExpense = (expense)=>{
        if(expense.price > walletBalance){
            enqueueSnackbar("Insufficient Balance", { variant: 'warning' });
            return;
        }
        setExpenses(prevExpenses=>[...prevExpenses, expense]);
        setWalletBalance(prevBalance=>prevBalance-Number(expense.price));
        setOpenAddExpenses(false);
    };

    const editExpense = (updatedExpense)=>{
        const existingExpense = expenses.find(expense => expense.id === updatedExpense.id);
    
        if (existingExpense) {
            const priceDifference = updatedExpense.price - existingExpense.price;
            setExpenses(prevExpenses => 
                prevExpenses.map(expense => 
                    expense.id === updatedExpense.id ? updatedExpense : expense
                )
            );
            setWalletBalance(prevBalance => prevBalance - priceDifference);
        }
        setOpenAddExpenses(true);
        setEditingExpense(updatedExpense);
    };

    const deleteExpense = (id) => {
        const toDelete = expenses.find(expense => expense.id === id);
        setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
        setWalletBalance(prevBalance => prevBalance + Number(toDelete.price));
        enqueueSnackbar("Expense deleted", { variant: 'success' });
    };

    return (
        <>
            <div className="container flex flex-col bg-gray-600 font-serif items-center">
                <header className="p-5">
                    <h1 className="text-xl font-bold text-white">Expense Tracker</h1>
                </header>
                <main>
                    <div className="bg-gray-500 flex flex-col md:flex-row gap-5 md:gap-2 justify-center  text-white rounded-lg mx-5">
                        <div className="bg-gray-400 m-5 md:m-2 lg:m-5 rounded-lg flex flex-col justify-center px-20 py-5 md:px-2 md:py-10 lg:px-10 flex-1">
                        <h3 className="text-sm md:text-md lg:text-lg font-semibold lg:font-bold text-center">Wallet Balance: &#8377;{walletBalance}</h3>
                        <button className="rounded-lg bg-gradient-to-r from-green-300 to-green-600 px-6 md:px-2 lg:px-6 py-2 m-5 md:m-2 lg:m-5" onClick={()=>{setOpenAddBalance(true)}}>+ Add Income</button>
                        </div>
                        <div className="bg-gray-400 m-5 md:m-2 lg:m-5 rounded-lg flex flex-col  justify-center px-20 py-5 md:px-5 md:py-10 lg:px-10  flex-1">
                        <h3 className="text-sm md:text-md lg:text-lg font-semibold lg:font-bold text-center">Expenses: &#8377;{expenses.reduce((acc, exp) => acc + Number(exp.price), 0)}</h3>
                        <button className="rounded-lg bg-gradient-to-r from-red-300 to-red-600 px-6 md:px-2 lg:px-6 py-2 m-5 md:m-2 lg:m-5" onClick={()=>{setOpenAddExpenses(true)}}>+ Add Expense</button>
                        </div>
                        <div className="bg-gray-400 m-5 md:m-2 lg:m-5 rounded-lg justify-items-center px-20 py-5 md:px-5 md:py-10 lg:px-10  flex-1">
                      
                            <ExpenseSummary expenses={expenses.map(expense => ({ ...expense, price: Number(expense.price) }))} />
                       
                        </div>

                    
                    </div>

                    <div className="m-5 grid grid-flow-row md:grid-flow-col md:grid-cols-3 gap-5">
                            <div className="col-span-2">
                                <div className="text-center md:text-left">
                                    <h3 className="text-white text-lg font-semibold md:text-xl md:font-bold ">Recent Transactions</h3>
                                    <ExpenseList expenses={expenses} forEdit={editExpense} forDelete={deleteExpense} />
                                </div>
                                
                            </div>
                            <div className="col-span-1">
                                    <ExpenseTrends expenses={expenses} />
                            </div>
                        </div>
                </main>
                {openAddBalance &&  <AddBalanceModal cancelAddBalanceModal={setOpenAddBalance} addBalance={addBalance} />}
                {openAddExpenses && <AddExpensesModal cancelAddExpensesModal={setOpenAddExpenses} addExpense={editingExpense ? editExpense : addExpense} editingExpense={editingExpense} setEditingExpense={setEditingExpense} />}
            </div>
           
           
        </>
    );
}