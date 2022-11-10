import React from 'react';
import styles from './Button.module.scss';

const Button = ({children, onClick, active}) => {
    return (
        <button
            className={`${styles.button} ${active ? styles.active: ''}`}

            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;