import React, {useCallback, useState, useEffect, useRef, memo} from "react";
import apiRequest from "../../model/api";
import SunWidget from "../SunWidget";
import {TDateSunData, TButton, TAppGeo, TApiResult} from "../../definitions";
import {dayLength} from "../../model/data";
import "./App.css";

const maimCssClass: string = "app"

export type TAppProps = {
    geolocationApi: Geolocation,
    buttons: Array<TButton>
}

const App: React.FC<TAppProps> = ({geolocationApi, buttons}) => {

    const geolocation = useRef<TAppGeo>({lat: null, lng: null});
    const targetTimestamp = useRef<number>(0);
    const [sunWidgetData, setSunWidgetData] = useState<TDateSunData>({
        date: null,
        sunrise: '',
        sunset: '',
        civil_twilight_begin: '',
        civil_twilight_end: '',
        day_length: '',

    });

    const getSunData = useCallback(async () => {
        const {lat, lng} = geolocation.current;
        const date = new Date(targetTimestamp.current);
        if (lat && lng && date) {
            const requestData = {
                lat,
                lng,
                date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
            };
            const result: TApiResult = await apiRequest(requestData) as TApiResult;
            setSunWidgetData({
                ...result,
                date
            })
        }
    }, [])

    const handleGeolocationGettingSuccess = useCallback(async (position) => {
        const {timestamp, coords} = position;
        if (timestamp) {
            targetTimestamp.current = timestamp;
        }
        if (coords) {
            geolocation.current.lat = coords.latitude;
            geolocation.current.lng = coords.longitude;
        }
        await getSunData();
    }, [getSunData]);

    const handleGeolocationGettingError = useCallback((error) => {
        console.error(error);
    }, [])

    const handleDayNavigation = useCallback(async (buttonId) => {
        const button = buttons.find((item) => item.id === buttonId);
        if (button) {
            targetTimestamp.current = targetTimestamp.current + (button.multiplier * dayLength);
            await getSunData();
        }
    }, [])

    useEffect(() => {
        if (geolocationApi) {
            navigator.geolocation.getCurrentPosition(handleGeolocationGettingSuccess, handleGeolocationGettingError);
        }
    }, [geolocationApi, handleGeolocationGettingSuccess, handleGeolocationGettingError])

    return (
        <div className={maimCssClass}>
            {
                geolocationApi
                    ? <SunWidget dateSunData={sunWidgetData} buttons={buttons} onDayNavigate={handleDayNavigation}/>
                    : <p className={`${maimCssClass}__unsupported-geo`}>Geolocation is not supported by your browser</p>
            }
        </div>
    );
}

export default memo(App);
