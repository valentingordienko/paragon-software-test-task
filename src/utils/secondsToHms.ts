import {ITime} from "../definitions";

export function secondsToHms(digit: number | string): ITime {
	const globalSeconds: number = Number(digit);
	const hours: number = Math.floor(globalSeconds / 3600);
	const minutes: number = Math.floor(globalSeconds % 3600 / 60);
	const seconds: number = Math.floor(globalSeconds % 3600 % 60);
	return {hours, minutes, seconds};
}