if(localStorage.getItem('Authorization') != null && localStorage.getItem('Authorization').indexOf('Bearer') == 0) {
	var isAuthed = true;
} else {
	var isAuthed = false;
}

if(isAuthed) {
	$("#app-menu").removeClass("d-none");
}