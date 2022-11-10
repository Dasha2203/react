import React from 'react';
import IconSVG from '../../assets/icons/icons.svg';

const Loader = ({className}) => {
    return (
        <svg className={`animate-spin ${className}`}>
            <use xlinkHref={`${IconSVG}#spinner`}/>
        </svg>
    );
};

export default Loader;