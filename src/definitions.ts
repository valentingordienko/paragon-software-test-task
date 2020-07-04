export type TApiData = {
    lat: string,
    lng: string,
    date: string
}

export type TApiResult = {
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

export type TApiResponse = {
    status: string,
    results: TApiResult
}

export type TDateSunData = {
    date: Date | null,
    sunrise: string,
    sunset: string,
    day_length: string,
    civil_twilight_begin: string,
    civil_twilight_end: string
}

export type TButton = {
    caption: string,
    multiplier: number,
    id: string
}

export type TAppGeo = {
    lat: string | null,
    lng: string | null
}

export type TTime = {
    hours: number,
    minutes: number,
    seconds: number
}