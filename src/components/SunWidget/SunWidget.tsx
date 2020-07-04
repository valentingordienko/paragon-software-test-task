import React, {memo, useMemo} from "react";
import {secondsToHms} from "../../utils";
import Button from "../Button";
import Graph, {TGraphData} from "../Graph";
import {TDateSunData, TButton, TTime} from "../../definitions";
import "./SunWidget.css";

const mainCssClass = "sun-widget";

export type TSunWidgetProps = {
    className?: string,
    dateSunData: TDateSunData,
    buttons: Array<TButton>,
    onDayNavigate: (buttonId: string) => void
}

const SunWidget: React.FC<TSunWidgetProps> = ({className, dateSunData, buttons, onDayNavigate}) => {
    const {
        date,
        sunrise,
        sunset,
        day_length: dayLength,
        civil_twilight_begin: civilTwilightBegin,
        civil_twilight_end: civilTwilightEnd
    } = dateSunData;
    const dayLengthData: TTime | null = secondsToHms(dayLength);
    const sunriseData: Date | null = new Date(sunrise);
    const sunsetData: Date | null = new Date(sunset);
    const formattedDate: string = date ? `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}` : '---';
    const formattedSunrise: string = sunriseData ? `${sunriseData.getHours()}:${sunriseData.getMinutes()}` : '---';
    const formattedSunset: string = sunsetData ? `${sunsetData.getHours()}:${sunsetData.getMinutes()}` : '---';
    const formattedLength: string = dayLengthData ? `${dayLengthData.hours}:${dayLengthData.minutes}` : '---';
    const graphData: TGraphData = useMemo(() => {
        return {sunrise, sunset, civilTwilightBegin, civilTwilightEnd};
    }, [sunrise, sunset, civilTwilightBegin, civilTwilightEnd])

    return <div className={`${className || ''} ${mainCssClass}`}>
        <div className={`${mainCssClass}__item ${mainCssClass}__day-data`}>
            <div className={`${mainCssClass}__day-data-item`}>Day: {formattedDate}</div>
            <div className={`${mainCssClass}__day-data-item`}>Sunrise: {formattedSunrise}</div>
            <div className={`${mainCssClass}__day-data-item`}>Sunset: {formattedSunset}</div>
            <div className={`${mainCssClass}__day-data-item`}>Length: {formattedLength}</div>
        </div>
        <div className={`${mainCssClass}__item ${mainCssClass}__buttons`}>
            {buttons.map((item) => {
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