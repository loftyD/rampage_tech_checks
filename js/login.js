if(localStorage.getItem('Authorization') != null && localStorage.getItem('Authorization').indexOf('Bearer') == 0) {
	window.location.replace("/");
}