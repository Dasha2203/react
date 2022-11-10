import React from 'react';
import styles from './Block.module.scss';

const Block = ({children, className}) => {
    return (
        <div className={`${styles.block} ${className}`}>
            {children}
        </div>
    );
};

export default Block;