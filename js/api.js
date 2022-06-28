var apiUrl = "https://www.rampagebots.co.uk/api";

if(localStorage.getItem('isDevelopment') !== null) {
	apiUrl = "http://localhost/api";
}

$(document).ajaxStart($.blockUI).ajaxStop($.unblockUI);

function unAuthPost(path, params, callbackSuccess, callbackFail) {
	fullResource = apiUrl + path;
	$.ajax({
		type: "POST",
		data: params,
		headers: {"Content-Type": "application/json"},
		url: fullResource
	}).done(function(data, textStatus, request) {
		callbackSuccess(data, textStatus, request);
	}).fail(function(data, textStatus, request) {
		callbackFail(data, textStatus, request);
	});
}

function authGet(path, callbackSuccess, callbackFail=null) {
	fullResource = apiUrl + path;
	$.ajax({
		type: "GET",
		headers: {"Content-Type": "application/json", "Authorization": localStorage.getItem('Authorization')},
		url: fullResource
	}).done(function(data, textStatus, request) {
		callbackSuccess(data, textStatus, request);
	}).fail(function(data, textStatus, request) {
		if(callbackFail != null) {
			callbackFail(data, textStatus, request);
		}
	});	
}