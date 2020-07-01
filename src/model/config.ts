import {IButtonData} from "../definitions";

export const buttons: IButtonData[] = [
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