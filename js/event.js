if(!isAuthed) {
	window.location.replace("/login");
} else {
	var selected_event = '';
	var selected_robot = '';
	var robot_data = [];
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
			club_checks = null;
	    	// authGet("/techchecks/eventclubchecks?event_id="+selected_event, function(data) {
	    	// 	club_checks = Object.keys(data);
	    	// });			
	    }
	    if(selectedTabId == 'checks-tab') {
	    	authGet("/techchecks/find?event_id=" + selected_event +"&robot_id=" + selected_robot, function(data) {
	  	    		
    			authGet("/techchecks/eventclubchecks?event_id=" + selected_event, function(club_data) {
    				for(key in club_data) {
	    				$(".club_checks").append(`\
	    					<div class="row"> \
								<div class="col-2"> \
									<h5>${club_data[key].title}<span class="br_check_${key}"></span><span class="sub_check_${key}"></span></h5> \
								</div> \
								<div class="col-6"> \
									<p><small>${club_data[key].description}</small></p> \
								</div> \
								<div class="col-2"><input type="radio" id="${key}_y" name="${key}" value="1" class="form-control metric" /></div> \
								<div class="col-2"><input type="radio" id="${key}_n" name="${key}" value="0" class="form-control metric" /></div> \
							</div> \
						`);
						if(club_data[key].sub_title_text != null) {
							$(`.br_check_${key}`).html($("<br>"));
							$(`.sub_check_${key}`).html(`<small>${club_data[key].sub_title_text}</small>`);
						}
						
	    			}
					if(data.hasOwnProperty('techcheck')) {
								techcheck = data.techcheck;
								$("#driver_name").val(techcheck.driver_name);
								$("#comments").val(techcheck.comments);
								all_checks = checks.concat(club_checks);

								for(i=0;i<all_checks.length;i++) {
									metric = all_checks[i];
									currentCheck = techcheck[metric];
									if(currentCheck == '1') {
										idToUse = metric+"_y";
									} else {
										idToUse = metric+"_n";
									}
									console.log(idToUse);
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
    			}, function(club_data) {
					if(data.hasOwnProperty('techcheck')) {
								techcheck = data.techcheck;
								$("#driver_name").val(techcheck.driver_name);
								$("#comments").val(techcheck.comments);
								all_checks = checks.concat(club_checks);

								for(i=0;i<all_checks.length;i++) {
									metric = all_checks[i];
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
    			});

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



	$( document ).on("change",".metric", function() {
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
		all_checks = checks.concat(club_checks);
		for(i=0;i<all_checks.length;i++) {
			data['checks'][all_checks[i]] = $("input[name="+all_checks[i]+"]:checked").val();
		}

		console.log(data.checks);

		data.event_id = selected_event;
		data.robot_id = selected_robot;
		data.comments = $("#comments").val();
		data.driver_name = $("#driver_name").val();
		authPost("/techchecks/create", JSON.stringify(data), function(data) {
			if(data.hasOwnProperty('status')) {
				alert(data.status);
				all_checks = checks;
	   			$(".club_checks").empty();
	    		club_checks = null;
				$("#bot-info").html('');
				$('a[href="#robot"]').tab('show');
				$("#robot_select > option").remove();
				$("#robot_select").append("<option value=''></option>");
			    authGet("/events/permissible_robots?event_id="+selected_event, function(data) {
			    	for(i=0;i<data.length;i++) {
			    		robot_data[data[i].id] = data[i];
			    		$("#robot_select").append("<option data-reserve='"+ data[i].reserve + "' value='"+ data[i].id+"'>"+ data[i].name +"</option>");
			    	}

			    	$("#robot_select").select2({
						theme: "bootstrap",
						placeholder: "Please Select",
						width: "100%"
					});
			    });
			}
		});
	})

	$("#robot_select").on('change', function() {
		let techcheck = false;
		// $("#bot-info").text("Is Reserve: " + $(this).find(":selected").data('reserve'));
		$("#bot-info").html('');
		selected_robot = $(this).val();
		let data = robot_data[selected_robot];
		let recentTechCheck = null;
		authGet("/techchecks/history?robot_id="+selected_robot, function(data_hist) {
			if(data_hist !== null) {
				recentTechCheck = data_hist;
				$("#bot-info").append("<div class='row'><div class='col-sm-12'><ul id='main_tc_details'>");
				for(key in data) {
					okey = key;
					dt = data[okey];
					if(okey == 'id' || key == "comments") {
						continue;
					}
					if(okey == 'inspector' && dt == false) {
						continue;
					}

					if(okey == 'techcheck') {
						key="Has Been Tech Checked"
					}

					if(okey == 'has_passed') {
						key = 'Has Passed Tech Checks';
						if(dt == null) {
							continue;
						} else {
							if(dt == true) {
								dt = 'PASS';
							} else {
								dt = 'FAIL';
							}
						}
					}

					if(okey == 'techcheck') {
						techcheck = dt;
						if(typeof data[okey] === 'object') {
							dt = 'Yes';
						} else {
							dt = 'No';
						}
					}

				$("#main_tc_details").append("<li>"+ key.toProperCase() +": "+ dt +"</li>");
				}


				getTechCheck(data);
				if(recentTechCheck == null) {
					$("#bot-info").append("<div class='row' id='tc_panel'><div class='col-sm-6' id='main_tc'>");
				} else {
					$("#bot-info").append("<div class='row' id='tc_panel'><div class='col-sm-12' id='main_tc'></div></div>");
				}
				if(recentTechCheck != null) {
					$("#tc_panel").append("<div class='col-sm-6' id='hist_tc'>");
					$("#hist_tc").append("<hr><h3 data-toggle='tooltip' data-placement='top' title='"+ recentTechCheck.techcheck.event + "'>Previous Event Tech Check History</h3><br /><br />");
					$("#hist_tc").append("<ul id='hist_tc_list'>");
					recentTechCheck = recentTechCheck.techcheck;
					for(key in recentTechCheck) {
						okey = key;
						if(key == 'event' || key == 'comments' || key == 'inspector') {
							continue;
						}
						if(okey == 'last_tech_checked_at') {
							key = 'Last Tech Checked At'
						}
						dt = recentTechCheck[okey];
						if(dt == '1') {
							dt = 'Yes';
						} else if(dt == '0') {
							dt = 'No';
						}
						re = /_/gi;
						$("#hist_tc_list").append("<li>"+ key.toProperCase().replace(re,' ') +": "+ dt +"</li>");
					}
					$("#hist_tc").append("<h4>Comments</h4><blockquote>" + data_hist.techcheck.comments +"</blockquote><br /><br /><strong>Inspected By: "+data_hist.techcheck.inspector+"</strong>");	
				}
			} else {
				$("#bot-info").append("<div class='row'><div class='col-sm-12'><ul id='main_tc_details'>");
				for(key in data) {
					okey = key;
					dt = data[okey];
					if(okey == 'id' || okey == 'comments') {
						continue;
					}
					if(okey == 'inspector' && dt == false) {
						continue;
					}

					if(okey == 'techcheck') {
						key="Has Been Tech Checked"
					}

					if(okey == 'has_passed') {
						key = 'Has Passed Tech Checks';
						if(dt == null) {
							continue;
						} else {
							if(dt == true) {
								dt = 'PASS';
							} else {
								dt = 'FAIL';
							}
						}
					}

					if(okey == 'techcheck') {
						techcheck = dt;
						if(typeof data[okey] === 'object') {
							dt = 'Yes';
						} else {
							dt = 'No';
						}
					}

				$("#main_tc_details").append("<li>"+ key.toProperCase() +": "+ dt +"</li>");
				}				
				$("#bot-info").append("<div class='row' id='tc_panel'><div class='col-sm-12' id='main_tc'>");
				if(typeof data === 'object') {
					getTechCheck(data);
				}
			}
		});	

		$(".btn-checks-continue").removeClass("d-none");
	});

	$(".btn-checks-continue").on("click", function() {
		$('.nav-tabs .active').parent().next('li').find('a').removeClass('disabled').trigger('click');
	});

	$("table.events-table > tbody").on("click", "td a.btn-event", function(event){
	    selected_event = $(this).data('event');
	    $(".club_checks").empty();
	    club_checks = null;

	    authGet("/techchecks/eventclubchecks?event_id="+selected_event, function(data) {
	    	club_checks = Object.keys(data);
	    });

	    $("#bot-info").text('');
	    $("#robot_select > option").remove();
	    $("#robot_select").append("<option value=''></option>");
	    $('.nav-tabs .active').parent().next('li').find('a').removeClass('disabled').trigger('click');
	    authGet("/events/permissible_robots?event_id="+selected_event, function(data) {
	    	for(i=0;i<data.length;i++) {
	    		robot_data[data[i].id] = data[i];
	    		$("#robot_select").append("<option data-reserve='"+ data[i].reserve + "' value='"+ data[i].id+"'>"+ data[i].name +"</option>");
	    	}

	    	$("#robot_select").select2({
				theme: "bootstrap",
				placeholder: "Please Select",
				width: "100%"
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



function getTechCheck(data) {
	if(typeof data === 'object' && data.techcheck) {
		$("#main_tc").append("<hr><h3>Recent Tech Check History For This Event</h3><br /><br />");
		$("#main_tc").append("<ul id='main_tc_list'>");
		for(k in data.techcheck) {
			val = data.techcheck[k];
			key = k;
			if(k == 'id' || k =='series_id' || k == 'robot_id' || k == 'inspector_id' || k == 'comments') {
				continue;
			}
			if (k.match(/^check_/)) {
				if(val == '1') {
					val = 'Yes';
				} else {
					val = 'No';
				}
			}

			if (k == 'created_at') {
				key = 'Tech Check Created At';
			}
			if (k == 'updated_at') {
				key = 'Last Updated At';
			}
			re = /_/gi;
			$("#main_tc_list").append("<li>"+ key.toProperCase().replace(re,' ') +": "+ val +"</li>");
		}
		if(data.techcheck.comments) {
			$("#main_tc").append("<h4>Comments</h4><blockquote>" + data.techcheck.comments +"</blockquote><br /><br /><strong>Inspected By: "+data.inspector+"</strong>");
		}
	}
}
