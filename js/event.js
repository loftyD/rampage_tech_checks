if(!isAuthed) {
	window.location.replace("/login");
} else {

	$("#robot_select").on('change', function() {
		$("#bot-info").text("Is Reserve: " + $(this).find(":selected").data('reserve'));
	});

	$("table.events-table > tbody").on("click", "td a.btn-event", function(event){
	    var selected_event = $(this).data('event');
	    $("#bot-info").text('');
	    $("#robot_select > option").remove();
	    $('.nav-tabs .active').parent().next('li').find('a').removeClass('disabled').trigger('click');
	    authGet("/events/permissible_robots?event_id="+selected_event, function(data) {
	    	for(i=0;i<data.length;i++) {
	    		$("#robot_select").append("<option data-reserve='"+ data[i].reserve + "' value='"+ data[i].id+"'>"+ data[i].name +"</option>");
	    	}
	    	$("#robot_select").select2({
				theme: "bootstrap",
				placeholder: "Please Select"
			});
	    });
	});

	authGet("/events/permissible", function(data) {
		for(i=0;i<data.length;i++) {
			$("table.events-table > tbody").append("<tr><td>"+data[i].name+"</td><td>"+data[i].weight_class+"</td><td>"+data[i].eo+"</td> \
				<td><a href='javascript:void(0)' class='btn btn-primary btn-event' data-event='"+data[i].id+"'>Select</a></td>/tr>");
		}
	}, null);



}