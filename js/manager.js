function initialize() {
	return;
}

function openAddTaskDialog() {
	var title = document.getElementById('add-task-title').innerHTML;
	var body = document.getElementById('add-task-body').innerHTML;
	var footer = document.getElementById('add-task-footer').innerHTML;

	console.log(title);
	document.getElementById('modal-title').innerHTML = title;
	document.getElementById('modal-body').innerHTML = body;
	document.getElementById('modal-footer').innerHTML = footer;
}

async function fetchTasks() {
	query = await makeAsyncPostRequest(
		'/javascript-clock/fetch-tasks/',
		queryObj
	);
	data = query['result'];
	finalText = '';
	divText = document.getElementById('task-text').innerHTML;
	for (x in query) {
		task = query[x].task;
		urgent = query[x].urgent;
		tid = query[x].tid;
		tempText = divText;
		tempText = tempText.replace('{task-data}', task);
		if (urgent) tempText = tempText.replace('{urgent}', 'urgent');
		tempText = tempText.replace('{taskid}', tid);

		finalText += tempText;
	}
	document.getElementById('task-box').innerHTML = finalText;
}

async function addTask() {
	task = document.getElementById('add-task').value;
	urgent = false;
	if (document.getElementById('add-urgent').checked) urgent = true;
	queryObj = { task: task, urgent: urgent };
	query = await makeAsyncPostRequest('/javascript-clock/add-task/');
	if (query['result'] == 'Added') {
		document.getElementById('modal-body').innerHTML =
			'<span class="line">Task Added Successfully...!</span>';
		document.getElementById('modal-footer').innerHTML = '';

		await fetchTasks();
	}
}

async function deleteTask(elem, tid) {
	parentDiv = elem.parentNode.parentNode;
	queryObj = { TID: tid };
	query = await makeAsyncPostRequest(
		'/javascript-clock/delete-task/',
		queryObj
	);
	response = query.result;
	// console.log(response);
	parentDiv.remove(1);
}
