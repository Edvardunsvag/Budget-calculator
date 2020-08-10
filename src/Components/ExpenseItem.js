import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
export default function ExpenseItem({ type, handleDelete, handleEdit }) {
    const { id, charge, amount, minusOrPluss } = type;

    return (
        <li className='item'>
            <div className='info'>
                <span className='expense'>{charge}</span>
                <span className='amount'>${amount}</span>
            </div>
            <div>
                <button
                    className='edit-btn'
                    onClick={() =>
                        handleEdit(id, charge, amount, minusOrPluss)
                    }>
                    <MdEdit></MdEdit>
                </button>
                <button
                    className='clear-btn'
                    aria-label='Delete button'
                    onClick={() => handleDelete(id, minusOrPluss)}>
                    <MdDelete></MdDelete>
                </button>
            </div>
        </li>
    );
}
