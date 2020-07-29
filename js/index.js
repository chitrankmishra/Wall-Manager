function initialize() {
	const deg = 6;
	const hr = document.querySelector('#hr');
	const mn = document.querySelector('#mn');
	const sc = document.querySelector('#sc');

	setInterval(() => {
		let day = new Date();
		let hh = day.getHours() * 30;
		let mm = day.getMinutes() * deg;
		let ss = day.getSeconds() * deg;

		hr.style.transform = `rotateZ(${hh + mm / 12}deg)`;
		mn.style.transform = `rotateZ(${mm}deg)`;
		sc.style.transform = `rotateZ(${ss}deg)`;
	});

	getMainTaskListData();
	getCalendarDetails();
}

function validateEmail(email) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

function test() {
	window.alert('Chal Raha hai...');
}

async function getMainTaskListData() {
	path = 'getMainTaskListData/';
	response = await makeAsyncGetRequest(path);
	var destination = document.getElementById('tasks-display-div');
	var template = document.getElementById('task-template').innerHTML;
	var final_text = '';
	tasks = response['result'];
	for (i in tasks) {
		temp_text = template;
		temp_text = temp_text.replace('{notes}', tasks[i]['notes']);
		temp_text = temp_text.replace('{title}', tasks[i]['title']);
		temp_text = temp_text.replace('{updated}', tasks[i]['updated']);
		final_text += temp_text;
	}
	destination.innerHTML = final_text;
	// console.log(response);
}

async function getCalendarDetails() {
	path = 'getCalendarDetails/';
	response = await makeAsyncGetRequest(path);

	console.log(response);
}
