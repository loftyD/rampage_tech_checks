var apiUrl = "https://www.rampagebots.co.uk/api";


function unAuthPost(path, params, callback) {
	fullResource = apiUrl + path;
	$.ajax({
		type: "POST",
		data: params,
		headers: {"Content-Type": "application/json"},
		url: fullResource
	}).done(function(data, textStatus, request) {
		callback(data, textStatus, request);
	})
}