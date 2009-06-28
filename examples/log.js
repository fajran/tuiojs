
var logs = [];
var max = 20;

function updateLog() {
	if (logs.length > max) {
		logs = logs.splice(logs.length - max);
	}

	var text = logs.join("\n");
	document.getElementById('log').innerHTML = text;
}

function log(msg) {
	if (console.log) {
		console.log(msg);
	}
	else {
		logs.push(msg);
		updateLog();
	}
}

