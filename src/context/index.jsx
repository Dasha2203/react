import React, {useState} from 'react';
import {getDataCurrentWeather, getFormattedDataWeather} from "../weather";

const initialState = {
    dailyWeather: null,
    hourlyWeather: null,
    weather: null,
    fetchWeather: () => undefined,
    fetchCurrentWeather: () => undefined,
    loader: false,
    error: ''
}

export const Context = React.createContext(initialState);

export const ContextProvider = ({children}) => {
    const [weather, setWeather] = useState(null);
    const [dailyWeather, setDailyWeather] = useState(null);
    const [hourlyWeather, setHourlyWeather] = useState(null);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState('');

    function saveWeather(data) {
        setWeather(data.current);
        setDailyWeather(data.daily.slice(0,3));
        setHourlyWeather(data.hourly);
        setError('');

        const {city, lat: latData, lon: lonData} = data.current;
        localStorage.setItem('town', JSON.stringify({town: city, lat: latData, lon: lonData}));
    }

    async function fetchWeather({lat, lon}) {
        setLoader(true);

        try {
            let res = await getFormattedDataWeather({lat, lon, units: "metric", exclude: 'minutely'});

            saveWeather(res);
        } catch(err) {
            setError(err.message)
        } finally {
            setLoader(false);
        }
    }

    async function fetchCurrentWeather({q}) {
        try {
            let res = await getDataCurrentWeather({q, units: "metric"});

           saveWeather(res);
        } catch(err) {
            setError(err.message);
        } finally {
            setLoader(false);
        }
    }

    return (
        <Context.Provider value={{
            error,
            loader,
            weather,
            setWeather,
            dailyWeather,
            setDailyWeather,
            hourlyWeather,
            setHourlyWeather,
            fetchWeather,
            fetchCurrentWeather,
        }}>
            {children}
        </Context.Provider>
    )
}