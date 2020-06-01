import React, {memo, useMemo} from "react";
import {secondsToHms} from "../../utils";
import Button from "../Button";
import Graph from "../Graph";
import "./SunWidget.css";

const mainCssClass = "sun-widget";

function SunWidget ({dateSunData, buttons, onDayNavigate}) {
	const {
		date,
		sunrise,
		sunset,
		day_length: dayLength,
		civil_twilight_begin: civilTwilightBegin,
		civil_twilight_end: civilTwilightEnd
	} = dateSunData;
	const dayLengthData = dayLength ? secondsToHms(dayLength) : null;
	const sunriseData = sunrise ? new Date(sunrise) : null;
	const sunsetData = sunrise ? new Date(sunset) : null;
	const formattedDate = date ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` : '---';
	const formattedSunrise = sunriseData ? `${sunriseData.getHours()}:${sunriseData.getMinutes()}` : '---';
	const formattedSunset = sunsetData ? `${sunsetData.getHours()}:${sunsetData.getMinutes()}` : '---';
	const formattedLength = dayLengthData ? `${dayLengthData.hours}:${dayLengthData.minutes}` : '---';
	const graphData = useMemo(()=> {
		return {sunrise, sunset, civilTwilightBegin, civilTwilightEnd};
	}, [sunrise, sunset, civilTwilightBegin, civilTwilightEnd])

	return <div className={mainCssClass}>
		<div className={`${mainCssClass}__item ${mainCssClass}__day-data`}>
			<div>Day: {formattedDate}</div>
			<div>Sunrise: {formattedSunrise}</div>
			<div>Sunset: {formattedSunset}</div>
			<div>Length: {formattedLength}</div>
		</div>
		<div className={`${mainCssClass}__item ${mainCssClass}__buttons`}>
			{buttons.map((item)=>{
				return <Button
					key={item.id}
					className={`${mainCssClass}__button`}
					caption={item.caption}
					id={item.id}
					onClick={onDayNavigate}
				/>
			})}
		</div>
		<Graph
			className={`${mainCssClass}__item ${mainCssClass}__graph`}
			data={graphData}
		/>
	</div>
}

export default memo(SunWidget);