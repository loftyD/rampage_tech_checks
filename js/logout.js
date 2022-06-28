if(isAuthed) {
	localStorage.removeItem('Authorization');
	window.location.replace("/login");
}