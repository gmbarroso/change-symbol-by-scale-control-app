/**
 * 
 */
// variavel para new scale
var i = 1;
//variavel para xml
var sldsymb;
var lbl;
var rule;

// Abrir propriedades
$(function() {
	$("#janela").dialog({
		autoOpen : false,
		"height" : 500,
		"width" : 540
	});

	$("#botao").click(function() {
		$("#janela").dialog("open");
	});

	// $( "#ok" ).click(function() {
	// $( "#janela" ).dialog( "close" );
	// });
});


// Retorna valor name no botao "OK"
$(function() {
	$("#janela2").dialog({
		autoOpen : false,
	});

	$("#ok").click(function() {	

//		var typesymb = $("#radio:radio:checked").attr('id')
//		if $("#radio:radio:checked").attr('sencillo') {
//			graphic = ''
//		};	
		
		var name = $("#txtbox").val();
		var desc = $("#txtarea").val();
		
		var scale;
		
		var szsld = $('#sencsizeslider').slider("option", "value");
		var size = '<Size>' + szsld + '</Size';
		
		var opac = $('#senctranspslider').slider("option", "value");
		var transp = '<Opacity>' + opac + '</Opacity>';
				
		var colfill;
		var parafill = '<CssParameter name="fill">' + colfill +'</CssParameter>';
		var fill = '<Fill>' + parafill + '</Fill>';
		
		var colstk;
		var widthstk = $('#sencstrokeslider').slider("option", "value");
		var parastk = '<CssParameter name="stroke">' + colstk + '<CssParameter><CssParameter name="stroke-width">' + widthstk + '</CssParameter>';		
		var stk = '<Stroke>' + parastk + '</Stroke>';
		
		var type;
		if ($("#symbsenc option:selected").val() != undefined && $("#symbsenc option:selected").val() != "-1")type+="<WellKnownName>"+$("#symbsenc option:selected").val()+"</WellKnownName>";
		var graphic = '<Graphic><Mark>' + type + fill + stk +'</Mark>' + transp + size + '<Rotation>0</Rotation></Graphic>';	
		rule = graphic;
				
		//variáveis sendo declaradas como vazias para serem preenchidas dentro dos if's
		if ($(".escalamax option:selected").val() != undefined && $(".escalamax option:selected").val() != "-1")scale+="<MaxScaleDenominator>"+$(".escalamax option:selected").val()+"</MaxScaleDenominator>";
		if ($(".escalamin option:selected").val() != undefined && $(".escalamin option:selected").val() != "-1")scale+="<MinScaleDenominator>"+$(".escalamin option:selected").val()+"</MinScaleDenominator>";
		
		if ($("#chggrp option:selected").val() == "puntos") {
					sldsymb = '' + scale + '<PointSymbolizer>' + rule + '</PointSymbolizer>';
				}
				if ($("#chggrp option:selected").val() == "lineas") {
					sldsymb = '' + scale + '<LineSymbolizer>' + rule + '</LineSymbolizer>';
				}
				if ($("#chggrp option:selected").val() == "poligonos") {
					sldsymb = '' + scale + '<PolygonSymbolizer>' + rule + '</PolygonSymbolizer>';
				};
				
		var columlbl = '<Label></Label>';
		//alterar depois
		//if ($("#lblattr option:selected").val() != undefined && $("#lblattr option:selected").val() != "-1")columlbl+="<Label>"+$("#lblattr option:selected").val()+"</Label>";		
		
		var lblc;
		var lblfill = '<CssParameter name="font-colour">' + lblc + '</CssParameter>'
		
		var lblw;		
		/*if ($("#checklblN:checkbox").prop('checked')) {
			lblw = '<CssParameter name="font-weight">bold</CssParameter>';
		}; 
		else if ($("#checklblI:checkbox").prop('checked')) {
			lblw = '<CssParameter name="font-weight">italic</CssParameter>';
		};
		else if ($("#checklblS:checkbox").prop('checked')) {
			lblw = '<CssParameter name="font-weight">oblique</CssParameter>';
		};
		else if {
			lblw = '<CssParameter name="font-weight">normal</CssParameter>';
		};*/
		
		var lbltam;
		if ($("#lblsize option:selected").val() != undefined && $("#lblsize option:selected").val() != "-1")lbltam+="<CssParameter name='font-size'>"+$("#lblsize option:selected").val()+" </CssParameter>";
		var family;
		if ($("#lblfamily option:selected").val() != undefined && $("#lblfamily option:selected").val() != "-1")family+="<CssParameter name='font-family'>"+$("#lblfamily option:selected").val()+" </CssParameter>";
				
		var font = '<Font>' + family + lbltam + '<CssParameter name="font-style">normal</CssParameter>' + lblw + lblfill + '</Font>';
		
		if ($("#checklbltype:checkbox").prop('checked')) {
			lbl = '<TextSymbolizer>' + columlbl + font + '<LabelPlacement><PointPlacement><AnchorPoint><AnchorPointX>0.5</AnchorPointX><AnchorPointY>0.0</AnchorPointY></AnchorPoint><Displacement><DisplacementX>0</DisplacementX><DisplacementY>5</DisplacementY></Displacement></PointPlacement></LabelPlacement></TextSymbolizer>';
		} else {
			($("#checklbltype:checkbox").prop('unchecked'))
			lbl = '';
		};		
		
//		var rule = '';
//		
//		var sldsymb = $("#chggrp").change(function(){
//			if ($("#chggrp").val() == "puntos") {
//				'<PointSymbolizer>' + rule + '</PointSymbolizer>';
//			}
//			if ($("#chggrp").val() == "lineas") {
//				'<LineSymbolizer>' + rule + '</LineSymbolizer>';
//			}
//			if ($("#chggrp").val() == "poligonos") {
//				'<PolygonSymbolizer>' + rule + '</PolygonSymbolizer>';
//			}
//		});		
					
		var sld = '<?xml version="1.0" encoding="UTF-8"?>';
		sld += '<StyledLayerDescriptor version="1.0.0"';
		sld +=                       'xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd"'; 
		sld +=                       'xmlns="http://www.opengis.net/sld"'; 
		sld +=                       'xmlns:ogc="http://www.opengis.net/ogc"'; 
		sld +=                       'xmlns:xlink="http://www.w3.org/1999/xlink"'; 
		sld +=                       'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
		sld +=  '<NamedLayer>';
		sld +=    '<Name>'+ name +'</Name>';
		sld +=    '</NamedLayer>';
		sld += 		'<UserStyle>';
		sld +=			'<Title></Title>';
		sld +=			'<Abstract>'+ desc +'</Abstract>';
		sld +=				'<FeatureTypeStyle>';
		sld +=  				'<Rule>';
		sld +=    					'<Name></Name>';
		sld +=    					'<Title></Title>';
		sld +=						sldsymb;
		sld +=						lbl;
		sld +=    				'</Rule>';
		sld +=  			'</FeatureTypeStyle>';
		sld += 		'</UserStyle>';
		sld +=    '</StyledLayerDescriptor>';
		
	
		alert(sld);
//		alert(desc);
//		alert(grp);
//		alert($("#txtbox").val());
//		
//		alert($("#chggrp option:selected").val());
//		alert ($('#picker').colpick().pickersencrell('text'));	
//		alert($("#txtarea").val());
//		alert($("#radio:radio:checked").attr('id'));
//		alert($('#sencstrokeslider').slider("option", "value"));
//		alert($("#checklbltype:checkbox").prop('checked'));
//		alert($(".editlbl").button('enable'));
		

		// if($("#sencillo:checked").val()=="on");
		// alert ($("#selfieldcat option:selected").text())
		// if ($("#categorias:checked").val()=="on");
		// alert ($("#normalcat option:selected").text())
		// if ($("#bubble:checked").val()=="on");
		// alert ($("txtclusstroke").slider( "value" ))
		// if ($("#cluster:checked").val()=="on");

		// if($("#sencillo:checked").val()=="on")
		// alert ($("txtsencstroke").slider( "value" ));
		// else if
		// ($("#categorias:checked").val()=="on")
		// alert ($("#selfieldcat option:selected").text());
		// else if
		// ($("#bubble:checked").val()=="on")
		// alert ($("#normalcat option:selected").text());
		// else if
		// ($("#cluster:checked").val()=="on")
		// alert ($("txtclusstroke").slider( "value" ));
		// else if
		// ($("#mapasdecalor:checked").val()=="on")
		// alert ($("#radio :radio:checked").attr('id'));
	});
});

// Janela Simbolizacao
$(function() {
	$("#simbwindow").dialog({
		autoOpen : false,
		"height" : 150,
		"width" : 'auto'
	});
});

// Label Options
$(function() {
	$("#editlblwindow").dialog({
		autoOpen : false,
		"height" : 300,
		"width" : 400
	});

//	$(".editlbl").click(function() {
//		$("#editlblwindow").dialog("open");
//	});
//
//	$(".oklbl").click(function() {
//		$("#editlblwindow").dialog("close");
//	});
});
// Edit Symbol Sencillo

$(function() {
	$("#editsymb").click(function() {

		if ($("#sencillo:checked").val() == "on")
			$("#editsymbwindow").dialog("open");
		else if ($("#categorias:checked").val() == "on")
			$("#editsymbwindow2").dialog("open");
		else if ($("#bubble:checked").val() == "on")
			$("#editsymbwindow3").dialog("open");
		else if ($("#cluster:checked").val() == "on")
			$("#editsymbwindow4").dialog("open");
		else if ($("#mapasdecalor:checked").val() == "on")
			$("#editsymbwindow5").dialog("open");
	});
});

function ocultarSimbWindows() {

	$("#editsymbwindow").dialog({
		autoOpen : false,
		"height" : 'auto',
		"width" : 'auto'
	});

	$("#editsymbwindow2").dialog({
		autoOpen : false,
		"height" : 'auto',
		"width" : 530
	});

	$("#editsymbwindow3").dialog({
		autoOpen : false,
		"height" : 'auto',
		"width" : 470
	});

	$("#propbubwindow").dialog({
		autoOpen : false,
		"height" : 'auto',
		"width" : 500
	});

	$("#editsymbwindow4").dialog({
		autoOpen : false,
		"height" : 'auto',
		"width" : 400
	});

	$("#editsymbwindow5").dialog({
		autoOpen : false,
		"height" : 'auto',
		"width" : 250
	});
}

$(function() {
	/*
	 * $( "#editsymbwindow" ).dialog({ autoOpen:false, "height": 'auto',
	 * "width": 400 }); $( "#sencillo" ).click(function() { $( "#editsymbwindow"
	 * ).dialog( "open" ); });
	 */

	$("#oksenc").click(function() {
		$("#editsymbwindow").dialog("close");
	});
});
// Edit Symbol Categoria
$(function() {
	/*
	 * $( "#editsymbwindow2" ).dialog({ autoOpen:false, "height": 'auto',
	 * "width": 530 }); $( "#categorias" ).click(function() { $(
	 * "#editsymbwindow2" ).dialog( "open" ); });
	 */

	$("#okcat").click(function() {
		$("#editsymbwindow2").dialog("close");
	});
});
// Edit Symbol Bubble
$(function() {
	/*
	 * $( "#editsymbwindow3" ).dialog({ autoOpen:false, "height": 'auto',
	 * "width": '500' }); $( "#bubble" ).click(function() { $(
	 * "#editsymbwindow3" ).dialog( "open" ); });
	 */

	$("#okbub").click(function() {
		$("#editsymbwindow3").dialog("close");
	});
});

$(function() {
	/*
	 * $( "#propbubwindow" ).dialog({ autoOpen:false, "height": 'auto', "width":
	 * 500 });
	 */

	$("#propbub").click(function() {
		$("#propbubwindow").dialog("open");
	});

	$("#okbubwindow").click(function() {
		$("#propbubwindow").dialog("close");
	});
});
// Edit Symbol Cluster
$(function() {
	/*
	 * $( "#editsymbwindow4" ).dialog({ autoOpen:false, "height": 'auto',
	 * "width": 450 }); $( "#cluster" ).click(function() { $( "#editsymbwindow4"
	 * ).dialog( "open" ); });
	 */

	$("#okclus").click(function() {
		$("#editsymbwindow4").dialog("close");
	});
});
// Edit Symbol Mapas de Calor
$(function() {
	/*
	 * $( "#editsymbwindow5" ).dialog({ autoOpen:false, "height": 'auto',
	 * "width": 250 }); $( "#mapasdecalor" ).click(function() { $(
	 * "#editsymbwindow5" ).dialog( "open" ); });
	 */

	$("#okmc").click(function() {
		$("#editsymbwindow5").dialog("close");
	});
});

// Botao
$(function() {
	$("button").button().click(function(event) {
		event.preventDefault();
	});
});

$(".editlbl").button({
	disabled : true
});

$("#checklbltype").prop({
	checked : false
});

// Radios Janela Sim
$(function() {
	$("#radio").buttonset();
});

// Checkboxes Nova escala, Lable e Tipolbl
$(function() {
	$("#checknesc").button();
	$("#format").buttonset();
});

$(function() {
	$("#checklbltype").button();
	$("#format").buttonset();
});

$(function() {
	$("#checklblN").button();
	$("#checklblI").button();
	$("#checklblS").button();
	$("#format").buttonset();
});

$(function() {
	$("#chkapplyfilter").button();
	$("#format").buttonset();
});

$(function() {
	$("#chkfilterman").button();
	$("#format").buttonset();
});

$(function() {
	$("#sencselsymb").button();
	$("#format").buttonset();
});

$(function() {
	$("#selsecfieldcat").button();
	$("#format").buttonset();
});

$(function() {
	$("#defintervalcat").button();
	$("#format").buttonset();
});

$(function() {
	$("#calc").button();
	$("#format").buttonset();
});

// Slider
$(function() {
	$("#transpslider").slider({
		range : "max",
		min : 0,
		max : 100,
		value : 0,
		slide : function(event, ui) {
			$("#txttransp").val(ui.value);
		}
	});
	$("#txttransp").val($("#transpslider").slider("value"));
});

$(function() {
	$("#sencstrokeslider").slider({
		range : "max",
		min : 0,
		max : 10,
		value : 0,
		slide : function(event, ui) {
			$("#txtsencstroke").val(ui.value);
		}
	});
	$("#txtsencstroke").val($("#sencstrokeslider").slider("value"));
});

$(function() {
	$("#sencsizeslider").slider({
		range : "max",
		min : 0,
		max : 100,
		value : 0,
		slide : function(event, ui) {
			$("#txtsencsize").val(ui.value);
		}
	});
	$("#txtsencsize").val($("#sencsizeslider").slider("value"));
});

$(function() {
	$("#senctranspslider").slider({
		range : "max",
		min : 0,
		max : 1,
		step: 0.1,
		value : 0,
		slide : function(event, ui) {
			$("#txtsenctransp").val(ui.value);
		}
	});
	$("#txtsenctransp").val($("#senctranspslider").slider("value"));
});

$(function() {
	$("#bubstrokeslider").slider({
		range : "max",
		min : 0,
		max : 10,
		value : 0,
		slide : function(event, ui) {
			$("#txtbubstroke").val(ui.value);
		}
	});
	$("#txtbubstroke").val($("#bubstrokeslider").slider("value"));
});

$(function() {
	$("#bubtranspslider").slider({
		range : "max",
		min : 0,
		max : 100,
		value : 0,
		slide : function(event, ui) {
			$("#txtbubtransp").val(ui.value);
		}
	});
	$("#txtbubtransp").val($("#bubtranspslider").slider("value"));
});

$(function() {
	$("#bubminslider").slider({
		range : "max",
		min : 0,
		max : 100,
		value : 0,
		slide : function(event, ui) {
			$("#txtbubmin").val(ui.value);
		}
	});
	$("#txtbubmin").val($("#bubminslider").slider("value"));
});

$(function() {
	$("#bubmaxslider").slider({
		range : "max",
		min : 0,
		max : 100,
		value : 0,
		slide : function(event, ui) {
			$("#txtbubmax").val(ui.value);
		}
	});
	$("#txtbubmax").val($("#bubmaxslider").slider("value"));
});

$(function() {
	$("#clusstrokeslider").slider({
		range : "max",
		min : 0,
		max : 10,
		value : 0,
		slide : function(event, ui) {
			$("#txtclusstroke").val(ui.value);
		}
	});
	$("#txtclusstroke").val($("#clusstrokeslider").slider("value"));
});

// Colorpicker
$(function() {
	$('#picker').colpick();
});

$(function() {
	$('#pickersencrell').colpick();
});

$(function() {
	$('#pickersencbord').colpick();
});

$(function() {
	$('#pickerbubrell').colpick();
});

$(function() {
	$('#pickerbubbord').colpick();
});

$(function() {
	$('#pickerclusrell').colpick();
});

$(function() {
	$('#pickerclusbord').colpick();
});

$(function() {
	$('#pickercluslbl').colpick();
});

// Add new scale
$(function() {
	$("#addnewscale").click(
			function() {
				if (i < 4) {
					$("#rules").append(
							"<h3>Rule</h3><div style='height:auto;'>"
									+ $("#rulemaster").html() + "</div>");
					i++;
					if(i==4){
//						$("#addnewscale").disable();
					}
					if (i > 1) {
//						$(".cerrar").enable();
					}
					$("#rules").accordion("refresh");
					definenewrule();
				}
			});
});

$(function() {
	$("#rules").accordion({
		collapsible : true,
		heightStyle : "fill"
	});
});
$(function() {
	$("#addnewrule").resizable({
		minHeight : 140,
		minWidth : 200,
		resize : function() {
			$("#rules").accordion("refresh");
		}
	});
});

// Comboboxes
(function($) {
	$
			.widget(
					"custom.combobox",
					{
						_create : function() {
							this.wrapper = $("<span>").addClass(
									"custom-combobox")
									.insertAfter(this.element);
							this.element.hide();
							this._createAutocomplete();
							this._createShowAllButton();
						},
						_createAutocomplete : function() {
							var selected = this.element.children(":selected"), value = selected
									.val() ? selected.text() : "";
							this.input = $("<input>")
									.appendTo(this.wrapper)
									.val(value)
									.attr("title", "")
									.addClass(
											"custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
									.autocomplete({
										delay : 0,
										minLength : 0,
										source : $.proxy(this, "_source")
									}).tooltip({
										tooltipClass : "ui-state-highlight"
									});
							this._on(this.input, {
								autocompleteselect : function(event, ui) {
									ui.item.option.selected = true;
									this._trigger("select", event, {
										item : ui.item.option
									});
								},
								autocompletechange : ""
							});
						},
						_createShowAllButton : function() {
							var input = this.input, wasOpen = false;
							$("<a>").attr("tabIndex", -1).attr("title",
									"Show All Items").tooltip().appendTo(
									this.wrapper).button({
								icons : {
									primary : "ui-icon-triangle-1-s"
								},
								text : false
							}).removeClass("ui-corner-all").addClass(
									"custom-combobox-toggle ui-corner-right")
									.mousedown(
											function() {
												wasOpen = input.autocomplete(
														"widget")
														.is(":visible");
											}).click(function() {
										input.focus();
										// Close if already visible
										if (wasOpen) {
											return;
										}
										// Pass empty string as value to search
										// for, displaying all results
										input.autocomplete("search", "");
									});
						},
						_source : function(request, response) {
							var matcher = new RegExp($.ui.autocomplete
									.escapeRegex(request.term), "i");
							response(this.element.children("option").map(
									function() {
										var text = $(this).text();
										if (this.value
												&& (!request.term || matcher
														.test(text)))
											return {
												label : text,
												value : text,
												option : this
											};
									}));
						},
						_removeIfInvalid : function(event, ui) {
							// Selected an item, nothing to do
							if (ui.item) {
								return;
							}
							// Search for a match (case-insensitive)
							var value = this.input.val(), valueLowerCase = value
									.toLowerCase(), valid = false;
							this.element
									.children("option")
									.each(
											function() {
												if ($(this).text()
														.toLowerCase() === valueLowerCase) {
													this.selected = valid = true;
													return false;
												}
											});
							// Found a match, nothing to do
							if (valid) {
								return;
							}
							// Remove invalid value
							this.input.val("").attr("title",
									value + " didn't match any item").tooltip(
									"open");
							this.element.val("");
							this._delay(function() {
								this.input.tooltip("close").attr("title", "");
							}, 2500);
							this.input.autocomplete("instance").term = "";
						},
						_destroy : function() {
							this.wrapper.remove();
							this.element.show();
						}
					});
})(jQuery);
$(function() {
	$("#chggrp").combobox();
	$("#toggle").click(function() {
		$("#chggrp").toggle();
	});
//	$(".escalamin").combobox();
//	$("#toggle").click(function() {
//		$(".escalamin").toggle();
//	});
//	$(".escalamax").combobox();
//	$("#toggle").click(function() {
//		$(".escalamax").toggle();
//	});
	$("#lblsize").combobox();
	$("#toggle").click(function() {
		$("#lblsize").toggle();
	});
	$("#lblfamily").combobox();
	$("#toggle").click(function() {
		$("#lblfamily").toggle();
	});
	$("#lblattr").combobox();
	$("#toggle").click(function() {
		$("#lblattr").toggle();
	});
	$("#cmbselsymb").combobox();
	$("#toggle").click(function() {
		$("#cmbselsymb").toggle();
	});
	/*$("#symbsenc").combobox();
	$("#toggle").click(function() {
	$("#symbsenc").toggle();
	});*/
});

// posso apagar daqui se eu quiser pois já tenho o addnewrul
$(function() {
	$("#escalaminlbl").combobox();
	$("#toggle").click(function() {
		$("#escalaminlbl").toggle();
	});
});
$(function() {
	$("#escalamaxlbl").combobox();
	$("#toggle").click(function() {
		$("#escalamaxlbl").toggle();
	});
});
$(function() {
	$("#selfieldcat").combobox();
	$("#toggle").click(function() {
		$("#selfieldcat").toggle();
	});
});
$(function() {
	$("#selfieldcat2").combobox();
	$("#toggle").click(function() {
		$("#selfieldcat2").toggle();
	});
});
$(function() {
	$("#colorrampcat").combobox();
	$("#toggle").click(function() {
		$("#colorrampcat").toggle();
	});
});
$(function() {
	$("#normalcat").combobox();
	$("#toggle").click(function() {
		$("#normalcat").toggle();
	});
});
$(function() {
	$("#intervalcat").combobox();
	$("#toggle").click(function() {
		$("#intervalcat").toggle();
	});
});
$(function() {
	$("#selfieldbub").combobox();
	$("#toggle").click(function() {
		$("#selfieldbub").toggle();
	});
});
$(function() {
	$("#normalbub").combobox();
	$("#toggle").click(function() {
		$("#normalbub").toggle();
	});
});
$(function() {
	$("#colorrampbub").combobox();
	$("#toggle").click(function() {
		$("#colorrampbub").toggle();
	});
});
$(function() {
	$("#intervalbub").combobox();
	$("#toggle").click(function() {
		$("#intervalbub").toggle();
	});
});
$(function() {
	$("#groupclus").combobox();
	$("#toggle").click(function() {
		$("#groupclus").toggle();
	});
});
$(function() {
	$("#minsizeclus").combobox();
	$("#toggle").click(function() {
		$("#minsizeclus").toggle();
	});
});
$(function() {
	$("#maxsizeclus").combobox();
	$("#toggle").click(function() {
		$("#maxsizeclus").toggle();
	});
});
$(function() {
	$("#fontclus").combobox();
	$("#toggle").click(function() {
		$("#fontclus").toggle();
	});
});
$(function() {
	$("#mcselfield").combobox();
	$("#toggle").click(function() {
		$("#mcselfield").toggle();
	});
});
$(function() {
	$("#mcradio").combobox();
	$("#toggle").click(function() {
		$("#mcradio").toggle();
	});
});
$(function() {
	$("#mccellh").combobox();
	$("#toggle").click(function() {
		$("#mccellh").toggle();
	});
});
$(function() {
	$("#mccellw").combobox();
	$("#toggle").click(function() {
		$("#mccellw").toggle();
	});
});
$(function() {
	$("#mccolour").combobox();
	$("#toggle").click(function() {
		$("#mccolour").toggle();
	});
});
$(function() {
	$("#chkqrum").combobox();
	$("#toggle").click(function() {
		$("#chkqrum").toggle();
	});
});
$(function() {
	$("#chkqrdois").combobox();
	$("#toggle").click(function() {
		$("#chkqrdois").toggle();
	});
});


$(function() {

	// the the default base path where you installed the code
	// normally the path is disconvered from the script with
	// id=jquery-colorramp-script
	// $().colorramp('cfg').path = '/js/jquery-colorramp/';

	// configure a div element as a color ramp
	$('.colorramp').colorramp();

	// when the user selects a color ramp, the change event is called
	// with the colorArray
	$('.colorramp').change(function() {
		$(this).colorramp('getColors', reportColors);
	});

	// output colors used in selected ramp when user clicks the report
	// colors button
	$('.getcolorsbut').click(function() {
		$(this).prev('.colorramp').colorramp('getColors', reportColors);
	});
	//		  
	//
	// // function to make an array of colors, and print it to the screen nicely
	// function reportColors(colorArray) {
	// var buf = [];
	// $.each(colorArray, function(){
	// buf.push('<font color='+this+'>'+this+'</font>');
	// });
	// $('#selectedramp').html(buf.join(', '));
	// }

});

// $('input:checkbox[#checklbltype]').is('checked', true);

// Retorna Valor do botao(enable)
// $("#editlbl").button("disable")

// $("#checklbltype").attr("autocomplete", "off");

// Ativa botao através do checkbox
//$(function() {
//	$(".editlbl").button();
//	$('#checklbltype').change(function() {
//		var isChecked = $(this).prop("checked");
//		if (isChecked)
//			$(".editlbl").button("enable");
//		else
//			$(".editlbl").button("disable");
//	});
//});

// Mostra um div através do checkbox
$(document).ready(function() {
	$('#chkapplyfilter').change(function() {
		if (this.checked)
			$('#applyfilter').show();
		else
			$('#applyfilter').hide();
	});
});
$(document).ready(function() {
	$('#chkfilterman').change(function() {
		if (this.checked)
			$('#filterbox').show();
		else
			$('#filterbox').hide();
	});
});
$(document).ready(function() {
	$('#sencselsymb').change(function() {
		if (this.checked)
			$('#sencselect').show();
		else
			$('#sencselect').hide();
	});
});

$(document).ready(function() {
	$('#selsecfieldcat').change(function() {
		if (this.checked)
			$('#divsecfield').show();
		else
			$('#divsecfield').hide();
	});
	definenewrule();
});

//function pageLoad() {
//
//	// assuming that $ is jQuery
//	$(".testando").each(function() {
//
//		// this refers to the element
//		var combo = $find(this.id);
//		combo.disable();
//
//	});
//}

