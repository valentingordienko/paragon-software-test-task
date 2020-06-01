export default async function ({lat, lng, date}) {
	let targetPath = null;
	let targetDate = 'today';
	if (lat && lng) {
		targetPath = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}`;
	} else {
		throw new Error('Не переданы обязательные параметры запроса')
	}
	targetPath += `&date=${date || targetDate}`;
	targetPath += `&formatted=0`;

	if (targetPath) {
		try {
			const response = await fetch(targetPath)
			const data = await response.json();
			if (data.status === "OK") {
				return data.results;
			} else {
				console.error(`Ошибка запроса данных: ${data.status}`);
			}
		} catch (error) {
			console.error(error);
		}
	}
}