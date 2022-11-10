import React from 'react';

const Input = ({value, onChange, className, placeholder}) => {

    function handleChangeInput(e) {
        onChange(e.target.value);
    }

    return (
        <input
            type="text"
            value={value}
            onChange={handleChangeInput}
            placeholder={placeholder}
            className={`outline-none rounded-lg ${className}`}
        />
    );
};

export default Input;