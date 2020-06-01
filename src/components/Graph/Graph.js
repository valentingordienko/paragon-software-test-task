import React, {memo} from "react";

import "./Graph.css";

const mainCssClass = "graph";

function Graph ({className, data}) {

	const {sunrise, sunset, civilTwilightBegin, civilTwilightEnd} = data;
	const sunriseData = new Date(sunrise);
	const sunsetData = new Date(sunset);
	const civilTwilightBeginData = new Date(civilTwilightBegin);
	const civilTwilightEndData = new Date(civilTwilightEnd);

	const sunDayBegin = (sunriseData.getHours() * 60) + sunriseData.getMinutes();
	const sunDayEnd = 1440 - ((sunsetData.getHours() * 60) + sunsetData.getMinutes());
	const morningTwilightBegin = (civilTwilightBeginData.getHours() * 60) + civilTwilightBeginData.getMinutes();
	const morningTwilightEnd = 1440 - sunDayBegin;
	const eveningTwilightBegin = (sunsetData.getHours() * 60) + sunsetData.getMinutes();
	const eveningTwilightEnd = 1440 - ((civilTwilightEndData.getHours() * 60) + civilTwilightEndData.getMinutes());

	return <div className={`${className || ''} ${mainCssClass}`}>
		<div className={`${mainCssClass}__morning-twilight`} style={{left: `${morningTwilightBegin}px`, right: `${morningTwilightEnd}px`}}/>
		<div className={`${mainCssClass}__sun-day`} style={{left: `${sunDayBegin}px`, right: `${sunDayEnd}px`}}/>
		<div className={`${mainCssClass}__evening-twilight`} style={{left: `${eveningTwilightBegin}px`, right: `${eveningTwilightEnd}px`}}/>
	</div>
}

export default memo(Graph);