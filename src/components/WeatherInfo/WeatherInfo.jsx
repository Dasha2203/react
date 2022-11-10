import React from 'react';
import styles from "./WeatherInfo.module.scss";

import Icon from "../Icon/Icon";
import Block from "../Block/Block";

const WeatherInfo = ({weather}) => {
    return (
        <Block>
            <div className={styles.city}>
                {weather.city}
            </div>
            <div className={styles.info}>
                <p>{weather.date.dayLong}</p>
                <p>{weather.date.date}</p>
            </div>
            <div className={styles.image}>
                <div className={'h-24 sm:mb-5'}>
                    <Icon className={'fill-white h-full'} name={weather.icon}/>
                </div>
                <p>{weather.description}</p>
            </div>
            <div className={styles.degree}>
                {Math.round(weather.temp)}°
            </div>
        </Block>
    );
};

export default WeatherInfo;