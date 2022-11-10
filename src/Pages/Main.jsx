import React, {useContext, useEffect, useState} from 'react';

import WeatherItem from "../components/WeatherItem/WeatherItem";
import Button from "../components/Button/Button";
import Block from "../components/Block/Block";
import CustomLink from "../components/Link/Link";
import Loader from "../components/Loader/Loader";
import WeatherInfo from "../components/WeatherInfo/WeatherInfo";

import {CITIES} from "../const/const";
import {Context} from "../context";

const Main = () => {
    const {loader, weather, fetchWeather, dailyWeather} = useContext(Context);
    const [town, setTown] = useState(JSON.parse(localStorage.getItem('town')) || CITIES[0]);

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                if (!localStorage.getItem('town')) {
                    setTown({lat: position.coords.latitude, lon: position.coords.longitude})
                }
            })
        }
    }

    useEffect(() => {
        if (!town) return;

        localStorage.setItem('town', JSON.stringify(town));
    }, [town])


    useEffect(() => {
        if (!town) return;
        fetchWeather({lat: town.lat, lon: town.lon});

        window.onload = function () {
            getLocation();
        }
    }, [town])

    return (
        <div className={'min-h-screen flex'}>
            <div className={'container px-4 mx-auto pt-5'}>

                <div className={'flex gap-1 sm:gap-4'}>
                    <Button active={town.name === 'Minsk'} onClick={() => setTown(CITIES[0])}>
                        Minsk
                    </Button>
                    <Button active={town.name === 'Moscow'} onClick={() => setTown(CITIES[1])}>
                        Moscow
                    </Button>
                    <Button active={town.name === 'Bratislava'} onClick={() => setTown(CITIES[2])}>
                        Bratislava
                    </Button>
                    <CustomLink to={'/details'}>Details</CustomLink>
                </div>

                {loader && <Loader className={'mt-3 w-20 h-20 stroke-white mx-auto'}/>}

                {weather && !loader && <WeatherInfo weather={weather}/>}

                {!loader && dailyWeather && (
                    <Block>
                        {
                            dailyWeather.map((item, i) => (
                                <WeatherItem
                                    day={item.date.dayShort}
                                    className={'w-1/4'}
                                    temp={item.temp}
                                    icon={item.icon}
                                    key={i}
                                />
                            ))
                        }
                    </Block>
                )}
            </div>
        </div>
    );
};

export default Main;