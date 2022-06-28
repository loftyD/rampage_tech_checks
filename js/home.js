if(!isAuthed) {
	window.location.replace("/login");
} else {
	$(".home-container").removeClass('d-none');
}