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

		if (hh == 0 && mm == 0 && ss == 0) {
			getCalendarDetails();
			getMainTaskListData();
		}

		hr.style.transform = `rotateZ(${hh + mm / 12}deg)`;
		mn.style.transform = `rotateZ(${mm}deg)`;
		sc.style.transform = `rotateZ(${ss}deg)`;
	});
	getCalendarDetails();
	getMainTaskListData();
}

function validateEmail(email) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

function getDateFromISO(date_value) {
	var date_value = new Date(date_value);
	var new_date_value = date_value.getFullYear() + '-';
	if (date_value.getMonth() + 1 < 10) new_date_value += '0';
	new_date_value += date_value.getMonth() + 1 + '-';
	if (date_value.getDate() < 10) new_date_value += '0';
	new_date_value += date_value.getDate() + ' ';
	if (date_value.getHours() < 10) new_date_value += '0';
	new_date_value += date_value.getHours() + ':';
	if (date_value.getMinutes() < 10) new_date_value += '0';
	new_date_value += date_value.getMinutes() + ':';
	if (date_value.getSeconds() < 10) new_date_value += '0';
	new_date_value += date_value.getSeconds();
	return new_date_value;
}

function test() {
	window.alert('Chal Raha hai...');
}

async function getMainTaskListData() {
	path = 'getMainTaskListData/';
	response = await makeAsyncGetRequest(path);
	var destination = document.getElementById('tasks-display-div');
	var template = document.getElementById('task-element-template').innerHTML;
	var final_text = '';
	tasks = response['result'];
	for (i in tasks) {
		temp_text = template;
		if (tasks[i]['notes'] != null)
			temp_text = temp_text.replace('{notes}', tasks[i]['notes']);
		else temp_text = temp_text.replace('{notes}', 'No details');
		temp_text = temp_text.replace('{title}', tasks[i]['title']);
		date_value = getDateFromISO(tasks[i]['updated']);
		temp_text = temp_text.replace('{updated}', date_value);

		final_text += temp_text;
	}
	destination.innerHTML = final_text;
	// console.log(response);
}

async function getCalendarDetails() {
	var template = document.getElementById('calendar-template').innerHTML;
	var destination = document.getElementById('calendar-display-div');

	today = new Date();
	var months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	month = months[today.getMonth()];
	year = today.getFullYear();
	template = template.replace('{month}', month);
	template = template.replace('{year}', year);
	destination.innerHTML = template;

	var day_arrange = document.getElementById('day-arrange');
	var final_text = '';
	first_day = new Date(year, today.getMonth(), 1);
	first_day = first_day.getDay();

	var weekday_header =
		'<div class="day">S</div>\n<div class="day">M</div>\n<div class="day">T</div>\n<div class="day">W</div>\n<div class="day">T</div>\n<div class="day">F</div>\n<div class="day">S</div>\n';
	final_text += weekday_header;
	for (var i = 0; i < first_day; i++)
		final_text += '<div class="number"></div>\n';

	month = today.getMonth();
	if (month in [0, 2, 4, 6, 7, 9, 11]) no_of_days = 31;
	else if (month in [3, 5, 8, 10]) no_of_days = 30;
	else {
		leap_year = year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
		if (leap_year) no_of_days = 29;
		else no_of_days = 28;
	}
	today_date = today.getDate();
	for (var i = 1; i <= no_of_days; i++) {
		if (i == today_date)
			final_text += '<div class="number active">' + i + '</div>\n';
		else final_text += '<div class="number">' + i + '</div>\n';
	}
	day_arrange.innerHTML = final_text;

	path = 'getCalendarDetails/';
	response = await makeAsyncGetRequest(path);

	destination = document.getElementById('calendar-events');
	template = document.getElementById('calendar-element-template').innerHTML;
	final_text = '';
	events = response['result'];

	for (i in events) {
		temp_text = template;
		var color = events[i]['color'];
		var backgroundColor = events[i]['backgroundColor'];
		var title = events[i]['summary'];
		var description = events[i]['description'];
		var start_time = getDateFromISO(events[i]['startTime']);
		var end_time = getDateFromISO(events[i]['endTime']);
		var updated = getDateFromISO(events[i]['updated']);

		temp_text = temp_text.replace('{title}', title);
		temp_text = temp_text.replace('{startTime}', start_time);
		temp_text = temp_text.replace('{color}', backgroundColor);
		if (description != null)
			temp_text = temp_text.replace('{description}', description);
		else temp_text = temp_text.replace('{description}', 'No details');
		// console.log(color, backgroundColor, title, start_time, end_time, updated);
		final_text += temp_text;
	}
	destination.innerHTML = final_text;
	// console.log(response);
}
