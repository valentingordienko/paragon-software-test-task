export interface IApiData {
    lat: string,
    lng: string,
    date: string
}

export interface IApiResult {
    sunrise: string,
    sunset: string,
    solar_noon: string,
    day_length: string,
    civil_twilight_begin: string,
    civil_twilight_end: string,
    nautical_twilight_begin: string,
    nautical_twilight_end: string,
    astronomical_twilight_begin: string,
    astronomical_twilight_end: string
}

export interface IApiResponse {
    status: string,
    results: IApiResult
}

export interface IDateSunData {
    date: Date | null,
    sunrise: string,
    sunset: string,
    day_length: string,
    civil_twilight_begin: string,
    civil_twilight_end: string
}

export interface IButtonData {
    caption: string,
    multiplier: number,
    id: string
}

export interface AppGeo {
    lat: string | null,
    lng: string | null
}

export interface ITime {
    hours: number,
    minutes: number,
    seconds: number
}