import React, {useContext, useEffect, useState} from 'react';
import Button from "../../components/Button/Button";
import Block from "../../components/Block/Block";
import {Context} from "../../context";
import WeatherItem from "../../components/WeatherItem/WeatherItem";
import {CITIES} from "../../const/const";
import CustomLink from "../../components/Link/Link";
import Input from "../../components/Input/Input";
import Loader from "../../components/Loader/Loader";

const Details = () => {
    const {hourlyWeather, fetchWeather, fetchCurrentWeather, weather, loader, error} = useContext(Context);
    const [town, setTown] = useState(JSON.parse(localStorage.getItem('town')) || CITIES[0])
    const [searchCity, setSearchCity] = useState('');

    useEffect(() => {
        if (!town) return;
        fetchWeather({lat: town.lat, lon: town.lon});
    }, [town])

    function searchWeather() {
        if (!searchCity) return;
        fetchCurrentWeather({q: searchCity})
    }

    return (
        <div className={'min-h-screen flex'}>
            <div className={'container px-4 mx-auto pt-5'}>
                <CustomLink to={'/'} className={'mb-3 ml-auto block '}>Main</CustomLink>
                <div className={'mb-5 flex gap-1 items-stretch'}>
                    <Input
                        value={searchCity}
                        onChange={value => setSearchCity(value)}
                        className={'py-2 px-3  flex-auto '}
                        placeholder={'Enter your city'}
                    />
                    <Button onClick={searchWeather}>Search</Button>
                </div>

                {!!error && <div className={`mt-3 text-red-600 font-bold`}>{ error }</div>}
                {loader && <Loader className={'mt-3 w-20 h-20 stroke-white mx-auto'}/>}

                {weather && !error && (
                    <div className={`mb-3 text-white`}>
                        City: { weather.city }
                    </div>
                )}

                {hourlyWeather && !loader && !error &&
                    <Block className={'px-0 flex-nowrap overflow-auto overflow scrollbar-hide '}>
                        {
                            hourlyWeather.map((i, idx) => (
                                <WeatherItem
                                    key={idx + i.icon}
                                    icon={i.icon}
                                    day={i.date.time}
                                    temp={i.temp}
                                    className={'w-1/4 mx-3 first:ml-5 last:mr-5'}
                                />
                            ))
                        }
                    </Block>
                }
            </div>

        </div>
    );
};

export default Details;