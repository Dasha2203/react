import React from 'react';
import IconSVG from '../../assets/icons/icons.svg';

const Icon = ({name, className}) => {
    return (
        <svg className={`${className}`}  preserveAspectRatio={'none'}>
            <use className={'h-full'} xlinkHref={`${IconSVG}#${name}`}/>
        </svg>
    );
};

export default Icon;