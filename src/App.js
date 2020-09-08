import React, { useState } from 'react';
import ExpenseForm from './Components/ExpenseForm';
import ExpenseList from './Components/ExpenseList';
import Alert from './Components/Alert';
import { v4 as uuid } from 'uuid';

import './App.css';

function App() {
    const [expenses, setExpenses] = useState([]);

    const [income, setIncome] = useState([]);

    const [charge, setCharge] = useState('');

    const [amount, setAmount] = useState('');

    const [showAlert, setAlert] = useState({ showAlert: false });

    const [edit, setEdit] = useState(false);

    const [id, setId] = useState(0);

    const [type, setType] = useState('-');

    const displayBudget = () => {
        let exp = expenses.reduce((acc, curr) => {
            return acc + parseInt(curr.amount);
        }, 0);

        let inc = income.reduce((acc, curr) => {
            return acc + parseInt(curr.amount);
        }, 0);
        console.log();
        return inc - exp;
    };

    const handleCharge = (event) => {
        setCharge(event.target.value);
    };

    const handleAmount = (event) => {
        console.log(event.target.value);
        setAmount(event.target.value);
    };

    const handleAlert = ({ text, type }) => {
        setAlert({ showAlert: true, text, type });
        setTimeout(() => {
            setAlert({ showAlert: false });
        }, 3000);
    };

    const handleEdit = (id, charge, amount, minusOrPluss) => {
        setId(id);
        setEdit(true);
        if (minusOrPluss === '-') {
            let expense = expenses.find((item) => item.id === id);
            setCharge(expense.charge);
            setAmount(expense.amount);
        } else {
            let incomes = income.find((item) => item.id === id);
            setCharge(incomes.charge);
            setAmount(incomes.amount);
        }
        setType(minusOrPluss);
        handleAlert({ text: 'Edit Item', type: 'alert-success' });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (charge !== '' && amount > 0) {
            if (edit) {
                if (type === '-') {
                    let tempItems = expenses.map((item) => {
                        return item.id === id
                            ? { ...item, charge, amount }
                            : item;
                    });
                    setExpenses(tempItems);
                    setEdit(false);
                } else {
                    let tempItems = income.map((item) => {
                        return item.id === id
                            ? { ...item, charge, amount }
                            : item;
                    });
                    setIncome(tempItems);
                    setEdit(false);
                }
            } else {
                const newExpense = {
                    id: uuid(),
                    charge: charge,
                    amount: amount,
                    minusOrPluss: '-',
                };
                const newIncome = {
                    id: uuid(),
                    charge: charge,
                    amount: amount,
                    minusOrPluss: '+',
                };

                type === '-'
                    ? setExpenses([...expenses, newExpense])
                    : setIncome([...income, newIncome]);
            }

            setCharge('');
            setAmount('');
            handleAlert({ type: 'alert-success', text: 'Item added' });
        } else {
            handleAlert({
                type: 'alert-danger',
                text:
                    'Amount must be larger than zero, and Value must be a string',
            });
        }
    };

    const handleDelete = (id, minusOrPluss) => {
        console.log(id, minusOrPluss);
        let tempItems = [];

        if (minusOrPluss === '-') {
            tempItems = expenses.filter((item) => id !== item.id);
            setExpenses(tempItems);
        } else {
            tempItems = income.filter((item) => id !== item.id);
            setIncome(tempItems);
        }
    };

    const handleClear = () => {
        handleAlert({ type: 'alert-success', text: 'List Cleared' });
        setExpenses([]);
    };

    const handleClearIncome = () => {
        handleAlert({ type: 'alert-success', text: 'List Cleared' });
        setIncome([]);
    };

    const handleChange = (event) => {
        setType(event.target.value);
    };

    return (
        <>
            {showAlert.showAlert && (
                <Alert type={showAlert.type} text={showAlert.text}></Alert>
            )}

            <h1>Budget Calculator</h1>
            <main className='App'>
                <ExpenseForm
                    charge={charge}
                    amount={amount}
                    handleAmount={handleAmount}
                    handleCharge={handleCharge}
                    handleChange={handleChange}
                    edit={edit}
                    handleSubmit={handleSubmit}></ExpenseForm>
                <ExpenseList
                    handleEdit={handleEdit}
                    expenses={expenses}
                    income={income}
                    handleDelete={handleDelete}
                    handleClearIncome={handleClearIncome}
                    handleClear={handleClear}></ExpenseList>
            </main>
            <h1>
                Total Money: <span className='total'>${displayBudget()}</span>
            </h1>
        </>
    );
}

export default App;
