import React, {memo} from "react";
import {secondsToHms} from "../../utils";
import Button from "../Button";
import "./SunWidget.css";

const mainCssClass = "sun-widget";

function SunWidget ({dateSunData, buttons, onDayNavigate}) {
	const {date, sunrise, sunset, day_length} = dateSunData;
	const dayLengthData = day_length ? secondsToHms(day_length) : null;
	const sunriseData = sunrise ? new Date(sunrise) : null;
	const sunsetData = sunset ? new Date(sunset) : null;
	const formattedDate = date ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` : '---';
	const formattedSunrise = sunriseData ? `${sunriseData.getHours()}:${sunriseData.getMinutes()}:${sunriseData.getSeconds()}` : '---';
	const formattedSunset = sunsetData ? `${sunsetData.getHours()}:${sunsetData.getMinutes()}:${sunsetData.getSeconds()}` : '---';
	const formattedLength = dayLengthData ? `${dayLengthData.hours}:${dayLengthData.minutes}:${dayLengthData.seconds}` : '---';

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
					className={`${mainCssClass}__button`} caption={item.caption}
					id={item.id}
					onClick={onDayNavigate}
				/>
			})}
		</div>
	</div>
}

export default memo(SunWidget);