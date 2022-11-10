import {DateTime} from "luxon";

const API_KEY = 'c065f555d4e19864fdc27e420f758663';
const URL_API = 'https://api.openweathermap.org/data/2.5/';

export async function getWeather(type, searchParams) {
    const url = new URL(`${URL_API}/${type}`);
    const params = new URLSearchParams({...searchParams, appid: API_KEY});
    url.search = params.toString();

    try {
        let res = await fetch(url);
        const data = await res.json();

        if (res.status === 404) {
            throw new SyntaxError(data.message);
        }
        return data;

    } catch (err) {
        console.log('get data', err)
         throw err;
    }
}

function formatForecastWeather(data) {
    let {
        lat,
        lon,
        current: {temp, dt, weather},
        daily,
        hourly,
        timezone,
    } = data;

    daily = daily.slice(1, 7).map((d) => {
        return {
            date: formattedTime(d.dt, timezone),
            temp: d.temp.day,
            icon: d.weather[0].icon,
        };
    });

    hourly = hourly.slice(0, 24).map((h) => {
        return {
            date: formattedTime(h.dt, timezone),
            temp: h.temp,
            icon: h.weather[0].icon,
        };
    });

    const {icon, description} = weather[0];

    return ({
        current: {
            lat,
            lon,
            temp,
            city: timezone.split('/')[1],
            dt,
            icon,
            description,
            date: formattedTime(dt, timezone),
        },
        daily,
        hourly

    });
}

function formatCurrentWeather(data) {
    const {
        coord: {lat, lon}
    } = data;

    return {
        lat,
        lon,
    };
}

export async function getDataCurrentWeather(searchParams) {
    try {
        let data = await getWeather('weather', searchParams);

        const formattedCurrentWeather = formatCurrentWeather(data);
        const {lat, lon} = formattedCurrentWeather;

        return await getFormattedDataWeather({lat, lon, units: 'metric'});
    } catch (err) {
        throw err;
    }
}

export async function getFormattedDataWeather(searchParams) {
    try {
        let data = await getWeather('onecall', searchParams);

        return formatForecastWeather(data);
    } catch (err) {
        throw err;
    }
}

const getLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

function formattedTime(sec, timezone) {
    return {
        dayShort: getLocalTime(sec, timezone, 'EEE'),
        dayLong: getLocalTime(sec, timezone, 'EEEE'),
        time: getLocalTime(sec, timezone, 'HH:MM'),
        date: getLocalTime(sec, timezone, 'dd/MM/yyyy')
    }
}

// export function timeToLocal(sec, timezone) {
//     return (new Date(sec * 1000 + (timezone * 1000)).toUTCString())
// }

// function getTime(date) {
//     const localeDate = new Date(date);
//     const dayLong = localeDate.toLocaleDateString("en-GB", {
//         weekday: 'long'
//     });
//     const dayShort = localeDate.toLocaleDateString("en-GB", {
//         weekday: 'short'
//     });
//
//     let time = localeDate.toLocaleTimeString('en-GB');
//     time = time.split(':').splice(0, 2).join(':');
//
//     return ({
//         dayLong,
//         dayShort,
//         time,
//         date: localeDate.toLocaleDateString("en-GB")
//     })
//
// }

