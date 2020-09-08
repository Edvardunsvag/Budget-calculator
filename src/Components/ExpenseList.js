import React from 'react';
import Item from './ExpenseItem';
import { MdDelete } from 'react-icons/md';

export default function ExpenseList({
    expenses,
    handleDelete,
    handleClear,
    handleEdit,
    hoverEffect,
    handleClearIncome,
    income,
}) {
    return (
        <>
            <div className='list-container'>
                <ul className='list'>
                    {income.map((income) => {
                        return (
                            <Item
                                handleEdit={handleEdit}
                                key={income.id}
                                handleDelete={handleDelete}
                                type={income}></Item>
                        );
                    })}
                </ul>
                <ul className='list'>
                    {expenses.map((expense) => {
                        return (
                            <Item
                                handleEdit={handleEdit}
                                key={expense.id}
                                handleDelete={handleDelete}
                                type={expense}></Item>
                        );
                    })}
                </ul>
            </div>
            <div className='btn-group'>
                <button
                    className='btn btn-income'
                    onClick={() => handleClearIncome()}>
                    Clear Income
                    <MdDelete className='btn-icon'></MdDelete>
                </button>
                <button
                    className='btn btn-expense'
                    onClick={() => handleClear()}>
                    Clear Expenses
                    <MdDelete className='btn-icon'></MdDelete>
                </button>
            </div>
        </>
    );
}
