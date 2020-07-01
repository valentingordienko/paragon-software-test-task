import {IApiData, IApiResponse, IApiResult} from "../definitions";

export default async function ({lat, lng, date = 'today'}: IApiData): Promise<IApiResult | void> {
    try {
        const response: Response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${date}&formatted=0`)
        const data: IApiResponse = await response.json();
        if (data.status === "OK") {
            return data.results;
        } else {
            console.error(`Ошибка запроса данных: ${data.status}`);
        }
    } catch (error) {
        console.error(error);
    }
}