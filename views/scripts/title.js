function createCountString(count) {
	let countNumber;
	for(let number=count-5; number < count; number++) {
		if (number % 5 == 0){
			countNumber = number
			break
		}
	}
	if (count <= 5){
		countNumber = count.toString()
	} else {
		countNumber = `${countNumber}+`
	}
	return countNumber
}

export function setWindowTitle() {
	fetch('/count', {
		method : 'GET'
	}).then(response => response.json()).then((jsonResponse) => {
		const count = jsonResponse.count
		window.document.title = `Yakhi- Serving ${createCountString(count)} server(s)`
	}).catch((exception) => {
		console.error(exception)
	})
}