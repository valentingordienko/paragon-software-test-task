import {TApiData, TApiResponse, TApiResult} from "../definitions";

export default async function ({lat, lng, date = 'today'}: TApiData): Promise<TApiResult | void> {
    try {
        console.log(date);
        const response: Response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${date}&formatted=0`)
        const data: TApiResponse = await response.json();
        if (data.status === "OK") {
            return data.results;
        } else {
            console.error(`Ошибка запроса данных: ${data.status}`);
        }
    } catch (error) {
        console.error(error);
    }
}