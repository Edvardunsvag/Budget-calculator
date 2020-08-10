import React from 'react';
import { GrAdd } from 'react-icons/gr';
export default function ExpenseForm({
    handleCharge,
    amount,
    charge,
    handleAmount,
    handleSubmit,
    handleChange,
    edit,
}) {
    return (
        <form onSubmit={handleSubmit}>
            <div className='form-center'>
                <div className='form-group'>
                    <select type='text' onChange={handleChange}>
                        <option value='-'>-</option>
                        <option value='+'>+</option>
                    </select>
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        id='charge'
                        name='charge'
                        value={charge}
                        className='form-control'
                        placeholder='eg. rent'
                        onChange={handleCharge}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='number'
                        id='amount'
                        name='amount'
                        value={amount}
                        onChange={handleAmount}
                        placeholder='eg. 2500'
                        className='form-control'
                    />
                </div>
                <div className='form-group'>
                    {edit ? (
                        <button type='submit' className='btn'>
                            Edit
                            <GrAdd className='btn-icon'></GrAdd>
                        </button>
                    ) : (
                        <button type='submit' className='btn'>
                            Submit
                            <GrAdd className='btn-icon'></GrAdd>
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
}
