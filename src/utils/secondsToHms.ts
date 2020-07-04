import {TTime} from "../definitions";

export function secondsToHms(digit: number | string): TTime | null {
    const globalSeconds: number = Number(digit);
    if (!Number.isNaN(globalSeconds)) {
        const hours: number = Math.floor(globalSeconds / 3600);
        const minutes: number = Math.floor(globalSeconds % 3600 / 60);
        const seconds: number = Math.floor(globalSeconds % 3600 % 60);
        return {hours, minutes, seconds};
    }
    return null;
}