import React from 'react';
import styles from './WeatherItem.module.scss';
import Icon from "../Icon/Icon";

const WeatherItem = ({day, icon, temp, className}) => {
    return (
        <div className={`${styles.day} ${className}`}>
            <p>{ day }</p>
            <div className={'w-full my-1 flex justify-center'}>
                <Icon className={'fill-white h-12 sm:h-16 w-1/2'} name={icon}/>
            </div>
            <p className={'font-bold'}>{ Math.round(temp) }°</p>
        </div>
    );
};

export default WeatherItem;