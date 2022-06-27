$(".page-login .form-signin button[type='submit']").on('click', function(e) {
	e.preventDefault();
	data = { email: $("#inputEmail").val(), password: $("#inputPassword").val() }

	if($("#inputMfa").val() != "") {
		data.mfa_code = $("#inputMfa").val();
	}
	$("#login-error").text('');
	unAuthPost("/users/sign_in", JSON.stringify(data), function(data, textStatus, request) {
		if(data.hasOwnProperty('success') && data.hasOwnProperty('mfa_required')) {
			// 2fa
			$("#phase-1").addClass('d-none');
			$("#phase-2").removeClass('d-none');
			return;
		}

		if(data.hasOwnProperty('success')) {			
			if(request.getResponseHeader('authorization') !== null || request.getResponseHeader('Authorization') !== null) {
				$auth = request.getResponseHeader('authorization') == null ? request.getResponseHeader('Authorization') : request.getResponseHeader('authorization');
				localStorage.setItem('Authorization', $auth);
				window.location.replace("/");
				return;
			}		

		}
	}, function(request, textStatus, errorThrown) {
		data = request.responseJSON;
		if(data.hasOwnProperty('error')) {
			$("#login-error").text(data.error);
			return;
		}
	});
});