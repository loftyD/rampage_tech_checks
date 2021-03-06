if(!isAuthed) {
	window.location.replace("/login");
} else {

	var selected_event = '';
	var selected_robot = '';
	if(localStorage.getItem('robot') != null && localStorage.getItem('event') != null) {
		selected_robot = localStorage.getItem('robot');
		selected_event = localStorage.getItem('event');
		$("#robot-tab").addClass('disabled');
	   	$("#event-tab").addClass('disabled');
	   	$("#checks-tab").removeClass("disabled");
	   	$('#eventTab a[href="#checks"]').tab('show');
	   	localStorage.removeItem('robot');
	   	localStorage.removeItem('event');
	}

	var checks = ['check_cradle', 'check_sharp_edges', 'check_locking_bars', 'check_batteries', 
			  'check_chargers', 'check_wiring', 'check_pneumatic_system', 'check_hydraulic_system', 
			  'check_ic_engine_system', 'check_weaponry', 'check_removable_link', 'check_power_light', 
			  'check_radio_system', 'check_deactivation', 'check_weight'];

	authGet("/users/show", function(data) {
		var me = {}
		me.name = data.name;
		$(".current-user").text(me.name);
	});

	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	    // here is the new selected tab id
	    var selectedTabId = e.target.id;
	    if(selectedTabId == 'event-tab') {
	    	$(".btn-checks-continue").addClass("d-none");
	    	$("#robot-tab").addClass('disabled');
	    	$("#checks-tab").addClass('disabled');
	    }
	    if(selectedTabId == 'robot-tab') {
	    	$("#checks-tab").addClass('disabled');
	    	$("#comments").val("");
			$("#driver_name").val("");
	    }
	    if(selectedTabId == 'checks-tab') {
	    	authGet("/techchecks/find?event_id=" + selected_event +"&robot_id=" + selected_robot, function(data) {
	  
				if(data.hasOwnProperty('techcheck')) {
							techcheck = data.techcheck;
							$("#driver_name").val(techcheck.driver_name);
							$("#comments").val(techcheck.comments);
							for(i=0;i<checks.length;i++) {
								metric = checks[i];
								currentCheck = techcheck[metric];
								if(currentCheck == '1') {
									idToUse = metric+"_y";
								} else {
									idToUse = metric+"_n";
								}
								$("#" + idToUse).prop("checked", true);

								if(techcheck.has_passed == true) {
									$("#pass").prop("checked", true);
								} else {
									$("#fail").prop("checked", true);
								}

							}
							$(".main_checks").show();
							$("#checks-save").removeClass('d-none');
				} else {
					$("#driver_name").val(data.driver_name);
					$("#comments").val('');
					$("input[type=radio]").prop("checked", false);
					$("#pass").prop("checked", false);
					$("#fail").prop("checked", false);
					$(".main_checks").show();
					$("#checks-save").removeClass('d-none');
				}
	    	}, function(request, textStatus, errorThrown) {
	    		data = request.responseJSON;
	    		if(data.hasOwnProperty('error')) {
	    			alert(data.error);
	    			$("#robot-tab").addClass('disabled');
	   				$("#event-tab").removeClass('disabled');
	   				$("#checks-tab").addClass("disabled");
	    			$('#eventTab a[href="#event"]').tab('show');
	    			selected_robot = '';
	    		}
	    	});
	    }
	});



	$(".metric").on("change", function() {
		let isFail = false;
		let res = [];
		let complete = false;
		count = $(".metric").length;
		if(count/2 == $(".metric:checked").length) {
			complete = true;
		}
		$.each($(".metric:checked"), function(i, el) {
			if($(this).val() === '0') {
				isFail = true;
				return;
			}
		});

		if(isFail) {
			$("#pass").prop("checked", false);
			$("#fail").prop("checked", true);
		} else {
			$("#pass").prop("checked", true);
			$("#fail").prop("checked", false);					
		}

		if(complete) {
			$("#checks-save").removeClass('disabled');
		}
	});

	$("#checks-save").on("click", function(e) {
		e.preventDefault();
		data = {};
		data.checks = {};
		for(i=0;i<checks.length;i++) {
			data['checks'][checks[i]] = $("input[name="+checks[i]+"]:checked").val();
		}

		data.event_id = selected_event;
		data.robot_id = selected_robot;
		data.comments = $("#comments").val();
		data.driver_name = $("#driver_name").val();
		authPost("/techchecks/create", JSON.stringify(data), function(data) {
			if(data.hasOwnProperty('status')) {
				alert(data.status);
				$('a[href="#robot"]').tab('show');
			}
		});
	})


	$("#robot_select").on('change', function() {
		$("#bot-info").text("Is Reserve: " + $(this).find(":selected").data('reserve'));
		selected_robot = $(this).val();
		$(".btn-checks-continue").removeClass("d-none");
	});

	$(".btn-checks-continue").on("click", function() {
		$('.nav-tabs .active').parent().next('li').find('a').removeClass('disabled').trigger('click');
	});

	$("table.events-table > tbody").on("click", "td a.btn-event", function(event){
	    selected_event = $(this).data('event');
	    $("#bot-info").text('');
	    $("#robot_select > option").remove();
	    $("#robot_select").append("<option value=''></option>");
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
