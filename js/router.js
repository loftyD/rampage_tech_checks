$(".page-login .form-signin button[type='submit']").on('click', function(e) {
	e.preventDefault();
	data = { email: $("#inputEmail").val(), password: $("#inputPassword").val() }
	unAuthPost("/users/sign_in", JSON.stringify(data), function(data, textStatus, request) {
		alert(data.success);
	});
});