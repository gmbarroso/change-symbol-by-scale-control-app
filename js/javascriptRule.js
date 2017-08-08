function definenewrule() {
	$(".simb").click(function() {
		ocultarSimbWindows();
		$("#simbwindow").dialog("open");
	});

	$(".oksymb").click(function() {
		$("#simbwindow").dialog("close");
	});
	
	$(".simbfilha").click(function() {
		ocultarSimbWindows();
		$("#simbwindowfilha").dialog("open");
	});

	$(".oksymbfilha").click(function() {
		$("#simbwindowfilha").dialog("close");
	});	
	
	$(".escalamin").combobox();
	$("#toggle").click(function() {
		$(".escalamin").toggle();
	});
	
	$(".escalamax").combobox();
	$("#toggle").click(function() {
		$(".escalamax").toggle();
	});
	
	$(".escalaminfilha").combobox();
	$("#toggle").click(function() {
		$(".escalaminfilha").toggle();
	});
	
	$(".escalamaxfilha").combobox();
	$("#toggle").click(function() {
		$(".escalamaxfilha").toggle();
	});
	
	$(".editlbl").button();
	$('#checklbltype').change(function() {
		var isChecked = $(this).prop("checked");
		if (isChecked)
			$(".editlbl").button("enable");
		else
			$(".editlbl").button("disable");
	});	
	
	$(".editlblfilha").button();
	$('#checklbltypefilha').change(function() {
		var isChecked = $(this).prop("checked");
		if (isChecked)
			$(".editlblfilha").button("enable");
		else
			$(".editlblfilha").button("disable");
	});	
	
	$(".editlbl").click(function() {
		$("#editlblwindow").dialog("open");
	});

	$(".oklbl").click(function() {
		$("#editlblwindow").dialog("close");
	});
	
	$(".editlblfilha").click(function() {
		$("#editlblwindowfilha").dialog("open");
	});

	$(".oklblfilha").click(function() {
		$("#editlblwindowfilha").dialog("close");
	});
	
	/*$('.cerrar').each(function(i, obj) {
		var parent = $(obj).closest('div');
		if (parent.attr("id") != "rulemaster") {
			$(obj).show();
		}else{
			$(obj).hide();
		}
	});*/
	
	/*$(".cerrar").click(function() {
		if (i > 1) {
			var parent = $(this).closest('div');
			if (parent.attr("id") != "rulemaster") {

				var head = parent.prev('h3');
				parent.add(head).fadeOut('slow', function() {
					$(this).remove();
				});
				$("#rules").accordion("refresh");
				definenewrule();
				i--;
				if (i < 4) {
					// $("#addnewscale").enable();
				}
			}
		} else {
			// $(".cerrar").disable();
		}
	});*/

}
