import React from 'react';

export default function Alert({ type, text }) {
    return <div className={`alert ${type}`}>{text}</div>;
}
