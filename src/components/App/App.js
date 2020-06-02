import React, {useCallback, useState, useEffect, useRef, memo} from "react";
import apiRequest from "../../model/api";
import SunWidget from "../SunWidget";
import "./App.css";

const maimCssClass = "app"

const dayLength = 86400000; //ms
const buttons = [
	{
		caption: '-7 days',
		multiplier: -7,
		id: 'weekAgo'
	},
	{
		caption: '-1 day',
		multiplier: -1,
		id: 'dayAgo'
	},
	{
		caption: '+1 day',
		multiplier: 1,
		id: 'dayAhead'
	},
	{
		caption: '+7 days',
		multiplier: 7,
		id: 'weekAhead'
	}
]

function App({hasGeolocationApi}) {

	const geolocation = useRef({lat: null, lng: null});
	const targetTimestamp = useRef(0);
	const [sunWidgetData, setSunWidgetData] = useState({});

	const getSunData = useCallback(async () => {
		try {
			const {lat, lng} = geolocation.current;
			const date = new Date(targetTimestamp.current);
			if (lat && lng && date) {
				const requestData = {lat, lng, date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`};
				const result = await apiRequest(requestData);
				setSunWidgetData({
					...result,
					date
				})
			}
		} catch (error) {
			console.error(error);
		}
	}, [])

	const handleGeolocationGettingSuccess = useCallback((position) => {
		const {timestamp, coords} = position;
		if (timestamp) {
			targetTimestamp.current = timestamp;
		}
		if (coords) {
			geolocation.current.lat = coords.latitude;
			geolocation.current.lng = coords.longitude;
		}
		getSunData();
	}, [getSunData]);

	const handleGeolocationGettingError = useCallback((error) => {
		console.error(error);
	}, [])

	const handleDayNavigation = useCallback((buttonId) => {
		const button = buttons.find((item) => item.id === buttonId);
		if (button) {
			targetTimestamp.current = targetTimestamp.current + (button.multiplier * dayLength);
			getSunData();
		}
	}, [])

	useEffect(() => {
		if (hasGeolocationApi) {
			navigator.geolocation.getCurrentPosition(handleGeolocationGettingSuccess, handleGeolocationGettingError);
		}
	}, [hasGeolocationApi, handleGeolocationGettingSuccess, handleGeolocationGettingError])

	return (
		<div className={maimCssClass}>
			{
				hasGeolocationApi
					? <SunWidget dateSunData={sunWidgetData} buttons={buttons} onDayNavigate={handleDayNavigation}/>
					: <p className={`${maimCssClass}__unsupported-geo`}>Geolocation is not supported by your browser</p>
			}
		</div>
	);
}

export default App;
