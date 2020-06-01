export function secondsToHms(digit) {
	const globalSeconds = Number(digit);
	const hours = Math.floor(globalSeconds / 3600);
	const minutes = Math.floor(globalSeconds % 3600 / 60);
	const seconds = Math.floor(globalSeconds % 3600 % 60);
	return {hours, minutes, seconds};
}