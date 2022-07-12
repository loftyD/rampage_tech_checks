if(!isAuthed) {
	window.location.replace("/login");
} else {
	robot = $("#path").data("robot");
	event = $("#path").data("event");
	localStorage.setItem("robot", robot);
	localStorage.setItem("event", event);
	window.location.replace("/event");

}