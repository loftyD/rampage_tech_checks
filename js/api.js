var isDevelopment = true;

if(isDevelopment) {
	var apiUrl = "https://8b286e789c55.ngrok.io/api";
} else {
	var apiUrl = "https://www.rampagebots.co.uk/api";
}

function unAuthPost(path, params, callback) {
	fullResource = apiUrl + path;
	$.ajax({
		type: "POST",
		data: params,
		headers: {"Content-Type": "application/json"},
		url: fullResource
	}).done(function(data) {
		callback(data);
	})
}