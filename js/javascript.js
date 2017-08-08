/**
 * 
 */
// variavel para new scale
var i = 1;
//variavel para xml
var sldsymb;

var simples;
var categorias;
var bubbles;
var simplesf;
var categoriasf;
var bubblesf;
//var lbllbl;
var lbl;
var lblf;


//var type;
//var colfill;
//var parafill;
//var fill;

//Conversor de css.background para hex
$.cssHooks.backgroundColor = {
	    get: function(elem) {
	        if (elem.currentStyle)
	            var bg = elem.currentStyle["backgroundColor"];
	        else if (window.getComputedStyle)
	            var bg = document.defaultView.getComputedStyle(elem,
	                null).getPropertyValue("background-color");
	        if (bg.search("rgb") == -1)
	            return bg;
	        else {
	            bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	            function hex(x) {
	                return ("0" + parseInt(x).toString(16)).slice(-2);
	            }
	            return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
	        }
	    }
	};

// Abrir propriedades
$(function() {
	$("#janela").dialog({
		autoOpen : false,
		"height" : 'auto',
		"width" : 'auto'
//		"height" : 500,
//		"width" : 540
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


		//Sencillo
		var name = $("#txtbox").val();
		var desc = $("#txtarea").val();
		
		var scale = '';
		
		//Tamanho do Símbolo
		var szsld = $('#sencsizeslider').slider("option", "value");
		var size = '<Size>' + szsld + '</Size>';
		//Transparencia
		var opac = $('#senctranspslider').slider("option", "value");
		var transpoint = '<Opacity>' + opac + '</Opacity>';
		var transline = '<CssParameter name="stroke-opacity">' + opac + '</CssParameter>'
		var transpol = '<CssParameter name="fill-opacity">' + opac + '</CssParameter>'
		//Cor do Símbolo		
		var colfill = $("#collorpicker_pickersencrell .colpick_new_color").css('backgroundColor');
		var parafill = '<CssParameter name="fill">' + colfill +'</CssParameter>';
		var fill; 	
		
		//Cor da borda do Símbolo
		var colstk = $("#collorpicker_pickersencbord .colpick_new_color").css('backgroundColor');		
		var widthstk = $('#sencstrokeslider').slider("option", "value");		
		var das = '';
		var ar = '';
			//Pontilhado
			if ($(".dash option:selected").val() != undefined && $(".dash option:selected").val() != "-1")das+=$(".dash option:selected").val();
			if ($(".array option:selected").val() != undefined && $(".array option:selected").val() != "-1")ar+=$(".array option:selected").val();
			var dasarstk;
			if ($("#dashline").prop('checked')) {
				dasarstk = '<CssParameter name="stroke-dasharray">' + das + ' ' +ar + '</CssParameter>';
			} else {
				das = '';
				ar = '';
				dasarstk = '';
			};			
		var parastk = '<CssParameter name="stroke">' + colstk + '</CssParameter><CssParameter name="stroke-width">' + widthstk + '</CssParameter>';		
		var stk = '<Stroke>' + parastk + transline + dasarstk + '</Stroke>';
		
		//Linha de borda///////////////////////////////////////////////////////////////////////////////////////////
		var colstksec = $("#collorpicker_pickersencbordsec .colpick_new_color").css('backgroundColor');
		var widthstksec = $('#sencstrokesecslider').slider("option", "value");
        var parastksec = '<LineSymbolizer><Stroke><CssParameter name="stroke">' + colstksec + '</CssParameter>'+
          '<CssParameter name="stroke-width">' + widthstksec + '</CssParameter>' + transline + '</Stroke></LineSymbolizer>';
        
        //Transparencia FILL ////////////////////////////////////////////////////////////////////////////////////////////
//        var transinval = $('#senctranspinslider').slider("option", "value");
//        var transin = '<CssParameter name="fill-opacity">' + transinval + '</CssParameter>';
     
		
		//Tipo de símbolo
		var type = ''; //tomar cuidado com aspas. Se uma vem "" no if, a variavel tem que estar com '' e vice versa
		if ($("#symbsenc option:selected").val() != undefined && $("#symbsenc option:selected").val() != "-1")type+="<WellKnownName>"+$("#symbsenc option:selected").val()+"</WellKnownName>";
		//Angulo do simbolo
		var rotation = '';
		if ($("#symbsenc option:selected").text() == "Diamond") {
			rotation = 45;
		} else {
			rotation = 0;
		};
		var graphic;	
		
		//Controle de Escala
		//variáveis sendo declaradas como vazias para serem preenchidas dentro nos if's
		if ($(".escalamin option:selected").val() != undefined && $(".escalamin option:selected").val() != "-1")scale+='<MinScaleDenominator>'+$(".escalamin option:selected").val()+'</MinScaleDenominator>';
		if ($(".escalamax option:selected").val() != undefined && $(".escalamax option:selected").val() != "-1")scale+='<MaxScaleDenominator>'+$(".escalamax option:selected").val()+'</MaxScaleDenominator>';
		
		
//------------------------------------		
		//Sencillo Filha		
		var scalef = '';
		
		//Tamanho do Símbolo
		var szsldf = $('#sencsizesliderfilha').slider("option", "value");
		var sizef = '<Size>' + szsldf + '</Size>';
		//Transparencia
		var opacf = $('#senctranspsliderfilha').slider("option", "value");
		var transpointf = '<Opacity>' + opacf + '</Opacity>';
		var translinef = '<CssParameter name="stroke-opacity">' + opacf + '</CssParameter>'
		var transpolf = '<CssParameter name="fill-opacity">' + opacf + '</CssParameter>'
		//Cor do Símbolo		
		var colfillf = $("#collorpicker_pickersencrellfilha .colpick_new_color").css('backgroundColor');
		var parafillf = '<CssParameter name="fill">' + colfillf +'</CssParameter>';
		var fillf; 	
		
		//Cor da borda do Símbolo
		var colstkf = $("#collorpicker_pickersencbordfilha .colpick_new_color").css('backgroundColor');
		var widthstkf = $('#sencstrokesliderfilha').slider("option", "value");
		var dasf = '';
		var arf = '';
			//Pontilhado
			if ($(".dashfilha option:selected").val() != undefined && $(".dashfilha option:selected").val() != "-1")dasf+=$(".dashfilha option:selected").val();
			if ($(".arrayfilha option:selected").val() != undefined && $(".arrayfilha option:selected").val() != "-1")arf+=$(".arrayfilha option:selected").val();
			var dasarstkf;
			if ($("#dashlinefilha").prop('checked')) {
				dasarstkf = '<CssParameter name="stroke-dasharray">' + dasf + ' ' + arf + '</CssParameter>';
			} else {
				dasf = '';
				arf = '';
				dasarstkf = '';
			};			
		var parastkf = '<CssParameter name="stroke">' + colstkf + '</CssParameter><CssParameter name="stroke-width">' + widthstkf + '</CssParameter>';		
		var stkf = '<Stroke>' + parastkf + translinef + dasarstkf + '</Stroke>';
		
		//Linha de borda///////////////////////////////////////////////////////////////////////////////////////////
		var colstksecf = $("#collorpicker_pickersencbordsec .colpick_new_color").css('backgroundColor');
		var widthstksecf = $('#sencstrokesecslider').slider("option", "value");
        var parastksecf = '<LineSymbolizer><Stroke><CssParameter name="stroke">' + colstksec + '</CssParameter>'+
          '<CssParameter name="stroke-width">' + widthstksec + '</CssParameter>' + transline + '</Stroke></LineSymbolizer>';
        
        //Transparencia FILL ////////////////////////////////////////////////////////////////////////////////////////////
//        var transinvalf = $('#senctranspinsliderfilha').slider("option", "value");
//        var transinf = '<CssParameter name="fill-opacity">' + transinval + '</CssParameter>';
		
		//Tipo de símbolo
		var typef = ''; //tomar cuidado com aspas. Se uma vem "" no if, a variavel tem que estar com '' e vice versa
		if ($("#symbsencfilha option:selected").val() != undefined && $("#symbsencfilha option:selected").val() != "-1")typef+="<WellKnownName>"+$("#symbsencfilha option:selected").val()+"</WellKnownName>";
		//Angulo do simbolo
		var rotationf = '';
		if ($("#symbsencfilha option:selected").text() == "Diamond") {
			rotation = 45;
		} else {
			rotation = 0;
		};
		var graphicf;	
		
		//Controle de Escala
		//variáveis sendo declaradas como vazias para serem preenchidas dentro nos if's
		if ($(".escalaminfilha option:selected").val() != undefined && $(".escalaminfilha option:selected").val() != "-1")scalef+='<MinScaleDenominator>'+$(".escalaminfilha option:selected").val()+'</MinScaleDenominator>';
		if ($(".escalamaxfilha option:selected").val() != undefined && $(".escalamaxfilha option:selected").val() != "-1")scalef+='<MaxScaleDenominator>'+$(".escalamaxfilha option:selected").val()+'</MaxScaleDenominator>';		
//------------------------------------	
		
		var fieldcat = $("#catcolumbox").val();
		var cell1 = $("#txtcellbox").val();
		var cell2 = $("#txtcellbox2").val();
		var cell3 = $("#txtcellbox3").val();
		var cell4 = $("#txtcellbox4").val();
		var cell5 = $("#txtcellbox5").val();	
						
		var catcampomin = '<ogc:Filter><ogc:PropertyIsLessThan><ogc:PropertyName>' + fieldcat + '</ogc:PropertyName>'+
							'<ogc:Literal>' + cell1 + '</ogc:Literal></ogc:PropertyIsLessThan></ogc:Filter>';		
		var catcampo1 = '<ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>' + fieldcat + '</ogc:PropertyName>'+
			'<ogc:Literal>' + cell1 + '</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter>'		
						
		var catcampomed = '<ogc:Filter><ogc:And><ogc:PropertyIsGreaterThanOrEqualTo><ogc:PropertyName>' + fieldcat + '</ogc:PropertyName>'+
							'<ogc:Literal>' + cell2 + '</ogc:Literal></ogc:PropertyIsGreaterThanOrEqualTo><ogc:PropertyIsLessThan>'+
							'<ogc:PropertyName>' + fieldcat + '</ogc:PropertyName><ogc:Literal>' + cell2 + '</ogc:Literal></ogc:PropertyIsLessThan></ogc:And></ogc:Filter>';
		var catcampo2 = '<ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>' + fieldcat + '</ogc:PropertyName>'+
		'<ogc:Literal>' + cell2 + '</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter>'		
		
		var catcampomax = '<ogc:Filter><ogc:PropertyIsGreaterThanOrEqualTo><ogc:PropertyName>' + fieldcat + '</ogc:PropertyName>'+
							'<ogc:Literal>' + cell3 + '</ogc:Literal></ogc:PropertyIsGreaterThanOrEqualTo></ogc:Filter>'
		var catcampo3 = '<ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>' + fieldcat + '</ogc:PropertyName>'+
		'<ogc:Literal>' + cell3 + '</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter>'								
		
		var catcampo4 = '<ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>' + fieldcat + '</ogc:PropertyName>'+
		'<ogc:Literal>' + cell4 + '</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter>'	
		
		var catcampo5 = '<ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>' + fieldcat + '</ogc:PropertyName>'+
		'<ogc:Literal>' + cell5 + '</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter>'	
		
		var catsybl1 = '';
		if ($("#symbsenccell option:selected").val() != undefined && $("#symbsenccell option:selected").val() != "-1")catsybl1+="<WellKnownName>"+$("#symbsenccell option:selected").val()+"</WellKnownName>";
		var catsybl2 = '';
		if ($("#symbsenccell2 option:selected").val() != undefined && $("#symbsenccell2 option:selected").val() != "-1")catsybl2+="<WellKnownName>"+$("#symbsenccell2 option:selected").val()+"</WellKnownName>";
		var catsybl3 = '';
		if ($("#symbsenccell3 option:selected").val() != undefined && $("#symbsenccell3 option:selected").val() != "-1")catsybl3+="<WellKnownName>"+$("#symbsenccell3 option:selected").val()+"</WellKnownName>";
		var catsybl4 = '';
		if ($("#symbsenccell4 option:selected").val() != undefined && $("#symbsenccell4 option:selected").val() != "-1")catsybl4+="<WellKnownName>"+$("#symbsenccell4 option:selected").val()+"</WellKnownName>";
		var catsybl5 = '';
		if ($("#symbsenccell5 option:selected").val() != undefined && $("#symbsenccell5 option:selected").val() != "-1")catsybl5+="<WellKnownName>"+$("#symbsenccell5 option:selected").val()+"</WellKnownName>";
		
		var rotation1 = '';
		if ($("#symbsenccell option:selected").text() == "Diamond") {
			rotation1 = 45;
		} else {
			rotation1 = 0;
		};
		var rotation2 = '';
		if ($("#symbsenccell2 option:selected").text() == "Diamond") {
			rotation2 = 45;
		} else {
			rotation2 = 0;
		};
		var rotation3 = '';
		if ($("#symbsenccell3 option:selected").text() == "Diamond") {
			rotation3 = 45;
		} else {
			rotation3 = 0;
		};
		var rotation4 = '';
		if ($("#symbsenccell3 option:selected").text() == "Diamond") {
			rotation4 = 45;
		} else {
			rotation4 = 0;
		};
		var rotation5 = '';
		if ($("#symbsenccell3 option:selected").text() == "Diamond") {
			rotation5 = 45;
		} else {
			rotation5 = 0;
		};
		
		var dasarstk1 = '';
		var das1 = '';
		var ar1 = '';
		if ($(".dashcell option:selected").val() != undefined && $(".dashcell option:selected").val() != "-1")das1+=$(".dashcell option:selected").val();
		if ($(".arraycell option:selected").val() != undefined && $(".arraycell option:selected").val() != "-1")ar1+=$(".arraycell option:selected").val();
		
		if ($("#dashlinecell").prop('checked')) {
			dasarstk1 = '<CssParameter name="stroke-dasharray">' + das1 + ' ' +ar1 + '</CssParameter>';
		} else {
			das1 = '';
			ar1 = '';
			dasarstk1 = '';
		};
		
		var dasarstk2 = '';
		var das2 = '';
		var ar2 = '';
		if ($(".dashcell2 option:selected").val() != undefined && $(".dashcell2 option:selected").val() != "-1")das2+=$(".dashcell2 option:selected").val();
		if ($(".arraycell2 option:selected").val() != undefined && $(".arraycell2 option:selected").val() != "-1")ar2+=$(".arraycell option:selected").val();
		
		if ($("#dashlinecell2").prop('checked')) {
			dasarstk2 = '<CssParameter name="stroke-dasharray">' + das2 + ' ' +ar2 + '</CssParameter>';
		} else {
			das2 = '';
			ar2 = '';
			dasarstk2 = '';
		};
		
		var dasarstk3 = '';
		var das3 = '';
		var ar3 = '';
		if ($(".dashcell3 option:selected").val() != undefined && $(".dashcell3 option:selected").val() != "-1")das3+=$(".dashcell3 option:selected").val();
		if ($(".arraycell3 option:selected").val() != undefined && $(".arraycell3 option:selected").val() != "-1")ar3+=$(".arraycell3 option:selected").val();
		
		if ($("#dashlinecell3").prop('checked')) {
			dasarstk3 = '<CssParameter name="stroke-dasharray">' + das3 + ' ' +ar3 + '</CssParameter>';
		} else {
			das3 = '';
			ar3 = '';
			dasarstk3 = '';
		};
		var dasarstk4 = '';
		var das4 = '';
		var ar4 = '';
		if ($(".dashcell4 option:selected").val() != undefined && $(".dashcell4 option:selected").val() != "-1")das4+=$(".dashcell4 option:selected").val();
		if ($(".arraycell4 option:selected").val() != undefined && $(".arraycell4 option:selected").val() != "-1")ar4+=$(".arraycell4 option:selected").val();
		
		if ($("#dashlinecell4").prop('checked')) {
			dasarstk4 = '<CssParameter name="stroke-dasharray">' + das4 + ' ' +ar4 + '</CssParameter>';
		} else {
			das4 = '';
			ar4 = '';
			dasarstk4 = '';
		};
		var dasarstk5 = '';
		var das5 = '';
		var ar5 = '';
		if ($(".dashcell5 option:selected").val() != undefined && $(".dashcell3 option:selected").val() != "-1")das5+=$(".dashcell3 option:selected").val();
		if ($(".arraycell5 option:selected").val() != undefined && $(".arraycell3 option:selected").val() != "-1")ar5+=$(".arraycell3 option:selected").val();
		
		if ($("#dashlinecell5").prop('checked')) {
			dasarstk5 = '<CssParameter name="stroke-dasharray">' + das5 + ' ' +ar5 + '</CssParameter>';
		} else {
			das5 = '';
			ar5 = '';
			dasarstk5 = '';
		};
				 
//        var transinval1 = $('#senctranspinslidercell').slider("option", "value");
//        var transin1 = '<CssParameter name="fill-opacity">' + transinval1 + '</CssParameter>';
//        var transinval2 = $('#senctranspinslidercell2').slider("option", "value");
//        var transin2 = '<CssParameter name="fill-opacity">' + transinval2 + '</CssParameter>';
//        var transinval3 = $('#senctranspinslidercell3').slider("option", "value");
//        var transin3 = '<CssParameter name="fill-opacity">' + transinval3 + '</CssParameter>';
//        var transinval4 = $('#senctranspinslidercell4').slider("option", "value");
//        var transin4 = '<CssParameter name="fill-opacity">' + transinval4 + '</CssParameter>';
//        var transinval5 = $('#senctranspinslidercell5').slider("option", "value");
//        var transin5 = '<CssParameter name="fill-opacity">' + transinval5 + '</CssParameter>';
				
		var catsz1 = $('#sencsizeslidercell').slider("option", "value");
		var catsz2 = $('#sencsizeslidercell2').slider("option", "value");
		var catsz3 = $('#sencsizeslidercell3').slider("option", "value");
		var catsz4 = $('#sencsizeslidercell4').slider("option", "value");
		var catsz5 = $('#sencsizeslidercell5').slider("option", "value");
		var catstk1 = $('#sencstrokeslidercell').slider("option", "value");
		var catstk2 = $('#sencstrokeslidercell2').slider("option", "value");
		var catstk3 = $('#sencstrokeslidercell3').slider("option", "value");
		var catstk4 = $('#sencstrokeslidercell4').slider("option", "value");
		var catstk5 = $('#sencstrokeslidercell5').slider("option", "value");
		var catopac1 = $('#senctranspslidercell').slider("option", "value");
		var catopac2 = $('#senctranspslidercell2').slider("option", "value");
		var catopac3 = $('#senctranspslidercell3').slider("option", "value");
		var catopac4 = $('#senctranspslidercell4').slider("option", "value");
		var catopac5 = $('#senctranspslidercell5').slider("option", "value");
		var transpoint1 = '<Opacity>' + catopac1 + '</Opacity>';
		var transpoint2 = '<Opacity>' + catopac2 + '</Opacity>';
		var transpoint3 = '<Opacity>' + catopac3 + '</Opacity>';
		var transpoint4 = '<Opacity>' + catopac4 + '</Opacity>';
		var transpoint5 = '<Opacity>' + catopac5 + '</Opacity>';
		var transline1 = '<CssParameter name="stroke-opacity">' + catopac1 + '</CssParameter>'
		var transline2 = '<CssParameter name="stroke-opacity">' + catopac2 + '</CssParameter>'
		var transline3 = '<CssParameter name="stroke-opacity">' + catopac3 + '</CssParameter>'
		var transline4 = '<CssParameter name="stroke-opacity">' + catopac4 + '</CssParameter>'
		var transline5 = '<CssParameter name="stroke-opacity">' + catopac5 + '</CssParameter>'
		var transpol1 = '<CssParameter name="fill-opacity">' + catopac1 + '</CssParameter>'
		var transpol2 = '<CssParameter name="fill-opacity">' + catopac2 + '</CssParameter>'
		var transpol3 = '<CssParameter name="fill-opacity">' + catopac3 + '</CssParameter>'
		var transpol4 = '<CssParameter name="fill-opacity">' + catopac4 + '</CssParameter>'
		var transpol5 = '<CssParameter name="fill-opacity">' + catopac5 + '</CssParameter>'
		var catbilbo1 = $("#collorpicker_pickersencrellcell .colpick_new_color").css('backgroundColor');
		var catbilbo2 = $("#collorpicker_pickersencrellcell2 .colpick_new_color").css('backgroundColor');
		var catbilbo3 = $("#collorpicker_pickersencrellcell3 .colpick_new_color").css('backgroundColor');
		var catbilbo4 = $("#collorpicker_pickersencrellcell4 .colpick_new_color").css('backgroundColor');
		var catbilbo5 = $("#collorpicker_pickersencrellcell5 .colpick_new_color").css('backgroundColor');
		var catbaggins1 = $("#collorpicker_pickersencbordcell .colpick_new_color").css('backgroundColor');
		var catbaggins2 = $("#collorpicker_pickersencbordcell2 .colpick_new_color").css('backgroundColor');
		var catbaggins3 = $("#collorpicker_pickersencbordcell3 .colpick_new_color").css('backgroundColor');
		var catbaggins4 = $("#collorpicker_pickersencbordcell4 .colpick_new_color").css('backgroundColor');
		var catbaggins5 = $("#collorpicker_pickersencbordcell5 .colpick_new_color").css('backgroundColor');
		var cathobbit1 = '<CssParameter name="fill">' + catbilbo1 +'</CssParameter>';
		var cathobbit2 = '<CssParameter name="fill">' + catbilbo2 +'</CssParameter>';
		var cathobbit3 = '<CssParameter name="fill">' + catbilbo3 +'</CssParameter>';
		var cathobbit4 = '<CssParameter name="fill">' + catbilbo4 +'</CssParameter>';
		var cathobbit5 = '<CssParameter name="fill">' + catbilbo5 +'</CssParameter>';
		var catgandalf1 = '';	
		var catgandalf2 = '';		
		var catgandalf3 = '';	
		var catgandalf4 = '';		
		var catgandalf5 = '';
		var catshire1 = '<CssParameter name="stroke">' + catbaggins1 + '</CssParameter><CssParameter name="stroke-width">' + catstk1 + '</CssParameter>';
		var catshire2 = '<CssParameter name="stroke">' + catbaggins2 + '</CssParameter><CssParameter name="stroke-width">' + catstk2 + '</CssParameter>';
		var catshire3 = '<CssParameter name="stroke">' + catbaggins3 + '</CssParameter><CssParameter name="stroke-width">' + catstk3 + '</CssParameter>';
		var catshire4 = '<CssParameter name="stroke">' + catbaggins4 + '</CssParameter><CssParameter name="stroke-width">' + catstk4 + '</CssParameter>';
		var catshire5 = '<CssParameter name="stroke">' + catbaggins5 + '</CssParameter><CssParameter name="stroke-width">' + catstk5 + '</CssParameter>';
		var stkcat1 = '';
		var stkcat2 = '';
		var stkcat3 = '';
		var stkcat4 = '';
		var stkcat5 = '';
		var sizecatmin = '<Size>' + catsz1 + '</Size>';
		var sizecatmax = '<Size>' + catsz3 + '</Size>';	
		var sizecatmed = '<Size>' + catsz2 + '</Size>'; 
		var sizecat4 = '<Size>' + catsz4 + '</Size>';	
		var sizecat5 = '<Size>' + catsz5 + '</Size>'; 
		
		var colstksec1 = $("#collorpicker_pickersencbordseccell .colpick_new_color").css('backgroundColor');
		var widthstksec1 = $('#sencstrokesecslidercell').slider("option", "value");
        var parastksec1 = '<LineSymbolizer><Stroke><CssParameter name="stroke">' + colstksec1 + '</CssParameter>'+
          '<CssParameter name="stroke-width">' + widthstksec1 + '</CssParameter>' + transline1 + '</Stroke></LineSymbolizer>';
        var colstksec2 = $("#collorpicker_pickersencbordseccell2 .colpick_new_color").css('backgroundColor');
		var widthstksec2 = $('#sencstrokesecslidercell2').slider("option", "value");
        var parastksec2 = '<LineSymbolizer><Stroke><CssParameter name="stroke">' + colstksec2 + '</CssParameter>'+
          '<CssParameter name="stroke-width">' + widthstksec2 + '</CssParameter>' + transline2 + '</Stroke></LineSymbolizer>';
        var colstksec3 = $("#collorpicker_pickersencbordseccell3 .colpick_new_color").css('backgroundColor');
		var widthstksec3 = $('#sencstrokesecslidercell3').slider("option", "value");
        var parastksec3 = '<LineSymbolizer><Stroke><CssParameter name="stroke">' + colstksec3 + '</CssParameter>'+
          '<CssParameter name="stroke-width">' + widthstksec3 + '</CssParameter>' + transline3 + '</Stroke></LineSymbolizer>';
        var colstksec4 = $("#collorpicker_pickersencbordseccell4 .colpick_new_color").css('backgroundColor');
		var widthstksec4 = $('#sencstrokesecslidercell4').slider("option", "value");
        var parastksec4 = '<LineSymbolizer><Stroke><CssParameter name="stroke">' + colstksec4 + '</CssParameter>'+
          '<CssParameter name="stroke-width">' + widthstksec4 + '</CssParameter>' + transline4 + '</Stroke></LineSymbolizer>';
        var colstksec5 = $("#collorpicker_pickersencbordseccell5 .colpick_new_color").css('backgroundColor');
		var widthstksec5 = $('#sencstrokesecslidercell5').slider("option", "value");
        var parastksec5 = '<LineSymbolizer><Stroke><CssParameter name="stroke">' + colstksec5 + '</CssParameter>'+
          '<CssParameter name="stroke-width">' + widthstksec5 + '</CssParameter>' + transline5 + '</Stroke></LineSymbolizer>';
							
		var graphiccatmin;					
		var graphiccatmed;
		var graphiccatmax;
		var graphiccat4;
		var graphiccat5;
		
//------------------------------------
		
		var fieldcatf = $("#catcolumboxfilha").val();
		var cell1f = $("#txtcellboxfilha").val();
		var cell2f = $("#txtcellbox2filha").val();
		var cell3f = $("#txtcellbox3filha").val();
		var cell4f = $("#txtcellbox4filha").val();
		var cell5f = $("#txtcellbox5filha").val();	
						
		var catcampominf = '<ogc:Filter><ogc:PropertyIsLessThan><ogc:PropertyName>' + fieldcatf + '</ogc:PropertyName>'+
							'<ogc:Literal>' + cell1f + '</ogc:Literal></ogc:PropertyIsLessThan></ogc:Filter>';		
		var catcampo1f = '<ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>' + fieldcatf + '</ogc:PropertyName>'+
			'<ogc:Literal>' + cell1f + '</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter>'		
						
		var catcampomedf = '<ogc:Filter><ogc:And><ogc:PropertyIsGreaterThanOrEqualTo><ogc:PropertyName>' + fieldcatf + '</ogc:PropertyName>'+
							'<ogc:Literal>' + cell2f + '</ogc:Literal></ogc:PropertyIsGreaterThanOrEqualTo><ogc:PropertyIsLessThan>'+
							'<ogc:PropertyName>' + fieldcatf + '</ogc:PropertyName><ogc:Literal>' + cell2f + '</ogc:Literal></ogc:PropertyIsLessThan></ogc:And></ogc:Filter>';
		var catcampo2f = '<ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>' + fieldcatf + '</ogc:PropertyName>'+
		'<ogc:Literal>' + cell2f + '</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter>'		
		
		var catcampomaxf = '<ogc:Filter><ogc:PropertyIsGreaterThanOrEqualTo><ogc:PropertyName>' + fieldcatf + '</ogc:PropertyName>'+
							'<ogc:Literal>' + cell3f + '</ogc:Literal></ogc:PropertyIsGreaterThanOrEqualTo></ogc:Filter>'
		var catcampo3f = '<ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>' + fieldcatf + '</ogc:PropertyName>'+
		'<ogc:Literal>' + cell3f + '</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter>'								
		
		var catcampo4f = '<ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>' + fieldcatf + '</ogc:PropertyName>'+
		'<ogc:Literal>' + cell4f + '</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter>'	
		
		var catcampo5f = '<ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>' + fieldcatf + '</ogc:PropertyName>'+
		'<ogc:Literal>' + cell5f + '</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter>'	
		
		var catsybl1f = '';
		if ($("#symbsenccellfilha option:selected").val() != undefined && $("#symbsenccellfilha option:selected").val() != "-1")catsybl1f+="<WellKnownName>"+$("#symbsenccellfilha option:selected").val()+"</WellKnownName>";
		var catsybl2f = '';
		if ($("#symbsenccell2filha option:selected").val() != undefined && $("#symbsenccell2filha option:selected").val() != "-1")catsybl2+="<WellKnownName>"+$("#symbsenccell2filha option:selected").val()+"</WellKnownName>";
		var catsybl3f = '';
		if ($("#symbsenccell3filha option:selected").val() != undefined && $("#symbsenccell3filha option:selected").val() != "-1")catsybl3+="<WellKnownName>"+$("#symbsenccell3filha option:selected").val()+"</WellKnownName>";
		var catsybl4f = '';
		if ($("#symbsenccell4filha option:selected").val() != undefined && $("#symbsenccell4filha option:selected").val() != "-1")catsybl4+="<WellKnownName>"+$("#symbsenccell4filha option:selected").val()+"</WellKnownName>";
		var catsybl5f = '';
		if ($("#symbsenccell5filha option:selected").val() != undefined && $("#symbsenccell5filha option:selected").val() != "-1")catsybl5+="<WellKnownName>"+$("#symbsenccell5filha option:selected").val()+"</WellKnownName>";
		
		var rotation1f = '';
		if ($("#symbsenccellfilha option:selected").text() == "Diamond") {
			rotation1f = 45;
		} else {
			rotation1f = 0;
		};
		var rotation2f = '';
		if ($("#symbsenccell2filha option:selected").text() == "Diamond") {
			rotation2f = 45;
		} else {
			rotation2f = 0;
		};
		var rotation3f = '';
		if ($("#symbsenccell3filha option:selected").text() == "Diamond") {
			rotation3f = 45;
		} else {
			rotation3f = 0;
		};
		var rotation4f = '';
		if ($("#symbsenccell3filha option:selected").text() == "Diamond") {
			rotation4f = 45;
		} else {
			rotation4f = 0;
		};
		var rotation5f = '';
		if ($("#symbsenccell3filha option:selected").text() == "Diamond") {
			rotation5f = 45;
		} else {
			rotation5f = 0;
		};
		
		var dasarstk1f = '';
		var das1f = '';
		var ar1f = '';
		if ($(".dashcellfilha option:selected").val() != undefined && $(".dashcellfilha option:selected").val() != "-1")das1f+=$(".dashcellfilha option:selected").val();
		if ($(".arraycellfilha option:selected").val() != undefined && $(".arraycellfilha option:selected").val() != "-1")ar1f+=$(".arraycellfilha option:selected").val();
		
		if ($("#dashlinecellfilha").prop('checked')) {
			dasarstk1f = '<CssParameter name="stroke-dasharray">' + das1f + ' ' +ar1f + '</CssParameter>';
		} else {
			das1f = '';
			ar1f = '';
			dasarstk1f = '';
		};
		
		var dasarstk2f = '';
		var das2f = '';
		var ar2f = '';
		if ($(".dashcell2filha option:selected").val() != undefined && $(".dashcell2filha option:selected").val() != "-1")das2f+=$(".dashcell2filha option:selected").val();
		if ($(".arraycell2filha option:selected").val() != undefined && $(".arraycell2filha option:selected").val() != "-1")ar2f+=$(".arraycellfilha option:selected").val();
		
		if ($("#dashlinecell2").prop('checked')) {
			dasarstk2f = '<CssParameter name="stroke-dasharray">' + das2f + ' ' +ar2f + '</CssParameter>';
		} else {
			das2f = '';
			ar2f = '';
			dasarstk2f = '';
		};
		
		var dasarstk3f = '';
		var das3f;
		var ar3f;
		if ($(".dashcell3filha option:selected").val() != undefined && $(".dashcell3filha option:selected").val() != "-1")das3f+=$(".dashcell3filha option:selected").val();
		if ($(".arraycell3filha option:selected").val() != undefined && $(".arraycell3filha option:selected").val() != "-1")ar3f+=$(".arraycell3filha option:selected").val();
		
		if ($("#dashlinecell3filha").prop('checked')) {
			dasarstk3f = '<CssParameter name="stroke-dasharray">' + das3f + ' ' +ar3f + '</CssParameter>';
		} else {
			das3f = '';
			ar3f = '';
			dasarstk3f = '';
		};
		var dasarstk4f = '';
		var das4f = '';
		var ar4f = '';
		if ($(".dashcell4filha option:selected").val() != undefined && $(".dashcell4filha option:selected").val() != "-1")das4f+=$(".dashcell4filha option:selected").val();
		if ($(".arraycell4filha option:selected").val() != undefined && $(".arraycell4filha option:selected").val() != "-1")ar4f+=$(".arraycell4filha option:selected").val();
		
		if ($("#dashlinecell4filha").prop('checked')) {
			dasarstk4f = '<CssParameter name="stroke-dasharray">' + das4f + ' ' +ar4f + '</CssParameter>';
		} else {
			das4f = '';
			ar4f = '';
			dasarstk4f = '';
		};
		var dasarstk5f = '';
		var das5f = '';
		var ar5f = '';
		if ($(".dashcell5filha option:selected").val() != undefined && $(".dashcell5filha option:selected").val() != "-1")das5f+=$(".dashcell5filha option:selected").val();
		if ($(".arraycell5filha option:selected").val() != undefined && $(".arraycell5filha option:selected").val() != "-1")ar5f+=$(".arraycell5filha option:selected").val();
		
		if ($("#dashlinecell5").prop('checked')) {
			dasarstk5f = '<CssParameter name="stroke-dasharray">' + das5f + ' ' +ar5f + '</CssParameter>';
		} else {
			das5f = '';
			ar5f = '';
			dasarstk5f = '';
		};
		
//		  var transinpolval1f = $('#senctranspinslidercellfilha').slider("option", "value");
//	        var transin1f = '<CssParameter name="fill-opacity">' + transinval1f + '</CssParameter>';
//	        var transinval2f = $('#senctranspinslidercell2filha').slider("option", "value");
//	        var transin2f = '<CssParameter name="fill-opacity">' + transinval2f + '</CssParameter>';
//	        var transinval3f = $('#senctranspinslidercell3filha').slider("option", "value");
//	        var transin3f = '<CssParameter name="fill-opacity">' + transinval3f + '</CssParameter>';
//	        var transinval4f = $('#senctranspinslidercell4filha').slider("option", "value");
//	        var transin4f = '<CssParameter name="fill-opacity">' + transinval4f + '</CssParameter>';
//	        var transinval5f = $('#senctranspinslidercell5filha').slider("option", "value");
//	        var transin5f = '<CssParameter name="fill-opacity">' + transinval5f + '</CssParameter>';
		
		var catsz1f = $('#sencsizeslidercellfilha').slider("option", "value");
		var catsz2f = $('#sencsizeslidercell2filha').slider("option", "value");
		var catsz3f = $('#sencsizeslidercell3filha').slider("option", "value");
		var catsz4f = $('#sencsizeslidercell4filha').slider("option", "value");
		var catsz5f = $('#sencsizeslidercell5filha').slider("option", "value");
		var catstk1f = $('#sencstrokeslidercellfilha').slider("option", "value");
		var catstk2f = $('#sencstrokeslidercell2filha').slider("option", "value");
		var catstk3f = $('#sencstrokeslidercell3filha').slider("option", "value");
		var catstk4f = $('#sencstrokeslidercell4filha').slider("option", "value");
		var catstk5f = $('#sencstrokeslidercell5filha').slider("option", "value");
		var catopac1f = $('#senctranspslidercellfilha').slider("option", "value");
		var catopac2f = $('#senctranspslidercell2filha').slider("option", "value");
		var catopac3f = $('#senctranspslidercell3filha').slider("option", "value");
		var catopac4f = $('#senctranspslidercell4filha').slider("option", "value");
		var catopac5f = $('#senctranspslidercell5filha').slider("option", "value");
		var transpoint1f = '<Opacity>' + catopac1f + '</Opacity>';
		var transpoint2f = '<Opacity>' + catopac2f + '</Opacity>';
		var transpoint3f = '<Opacity>' + catopac3f + '</Opacity>';
		var transpoint4f = '<Opacity>' + catopac4f + '</Opacity>';
		var transpoint5f = '<Opacity>' + catopac5f + '</Opacity>';
		var transline1f = '<CssParameter name="stroke-opacity">' + catopac1f + '</CssParameter>'
		var transline2f = '<CssParameter name="stroke-opacity">' + catopac2f + '</CssParameter>'
		var transline3f = '<CssParameter name="stroke-opacity">' + catopac3f + '</CssParameter>'
		var transline4f = '<CssParameter name="stroke-opacity">' + catopac4f + '</CssParameter>'
		var transline5f = '<CssParameter name="stroke-opacity">' + catopac5f + '</CssParameter>'
		var transpol1f = '<CssParameter name="fill-opacity">' + catopac1f + '</CssParameter>'
		var transpol2f = '<CssParameter name="fill-opacity">' + catopac2f + '</CssParameter>'
		var transpol3f = '<CssParameter name="fill-opacity">' + catopac3f + '</CssParameter>'
		var transpol4f = '<CssParameter name="fill-opacity">' + catopac4f + '</CssParameter>'
		var transpol5f = '<CssParameter name="fill-opacity">' + catopac5f + '</CssParameter>'
		var catbilbo1f = $("#collorpicker_pickersencrellcellfilha .colpick_new_color").css('backgroundColor');
		var catbilbo2f = $("#collorpicker_pickersencrellcell2filha .colpick_new_color").css('backgroundColor');
		var catbilbo3f = $("#collorpicker_pickersencrellcell3filha .colpick_new_color").css('backgroundColor');
		var catbilbo4f = $("#collorpicker_pickersencrellcell4filha .colpick_new_color").css('backgroundColor');
		var catbilbo5f = $("#collorpicker_pickersencrellcell5filha .colpick_new_color").css('backgroundColor');
		var catbaggins1f = $("#collorpicker_pickersencbordcellfilha .colpick_new_color").css('backgroundColor');
		var catbaggins2f = $("#collorpicker_pickersencbordcell2filha .colpick_new_color").css('backgroundColor');
		var catbaggins3f = $("#collorpicker_pickersencbordcell3filha .colpick_new_color").css('backgroundColor');
		var catbaggins4f = $("#collorpicker_pickersencbordcell4filha .colpick_new_color").css('backgroundColor');
		var catbaggins5f = $("#collorpicker_pickersencbordcell5filha .colpick_new_color").css('backgroundColor');
		var cathobbit1f = '<CssParameter name="fill">' + catbilbo1f +'</CssParameter>';
		var cathobbit2f = '<CssParameter name="fill">' + catbilbo2f +'</CssParameter>';
		var cathobbit3f = '<CssParameter name="fill">' + catbilbo3f +'</CssParameter>';
		var cathobbit4f = '<CssParameter name="fill">' + catbilbo4f +'</CssParameter>';
		var cathobbit5f = '<CssParameter name="fill">' + catbilbo5f +'</CssParameter>';
		var catgandalf1f = '';	
		var catgandalf2f = '';		
		var catgandalf3f = '';	
		var catgandalf4f = '';		
		var catgandalf5f = '';
		var catshire1f = '<CssParameter name="stroke">' + catbaggins1f + '</CssParameter><CssParameter name="stroke-width">' + catstk1f + '</CssParameter>';
		var catshire2f = '<CssParameter name="stroke">' + catbaggins2f + '</CssParameter><CssParameter name="stroke-width">' + catstk2f + '</CssParameter>';
		var catshire3f = '<CssParameter name="stroke">' + catbaggins3f + '</CssParameter><CssParameter name="stroke-width">' + catstk3f + '</CssParameter>';
		var catshire4f = '<CssParameter name="stroke">' + catbaggins4f + '</CssParameter><CssParameter name="stroke-width">' + catstk4f + '</CssParameter>';
		var catshire5f = '<CssParameter name="stroke">' + catbaggins5f + '</CssParameter><CssParameter name="stroke-width">' + catstk5f + '</CssParameter>';
		var stkcat1f = '';
		var stkcat2f = '';
		var stkcat3f = '';
		var stkcat4f = '';
		var stkcat5f = '';
		var sizecatminf = '<Size>' + catsz1f + '</Size>';
		var sizecatmaxf = '<Size>' + catsz3f + '</Size>';	
		var sizecatmedf = '<Size>' + catsz2f + '</Size>'; 
		var sizecat4f = '<Size>' + catsz4f + '</Size>';	
		var sizecat5f = '<Size>' + catsz5f + '</Size>'; 
		
		var colstksec1f = $("#collorpicker_pickersencbordseccellfilha .colpick_new_color").css('backgroundColor');
		var widthstksec1f = $('#sencstrokesecslidercellfilha').slider("option", "value");
        var parastksec1f = '<LineSymbolizer><Stroke><CssParameter name="stroke">' + colstksec1f + '</CssParameter>'+
          '<CssParameter name="stroke-width">' + widthstksec1f + '</CssParameter>' + transline1f + '</Stroke></LineSymbolizer>';
        var colstksec2f = $("#collorpicker_pickersencbordseccell2filha .colpick_new_color").css('backgroundColor');
		var widthstksec2f = $('#sencstrokesecslidercell2filha').slider("option", "value");
        var parastksec2f = '<LineSymbolizer><Stroke><CssParameter name="stroke">' + colstksec2f + '</CssParameter>'+
          '<CssParameter name="stroke-width">' + widthstksec2f + '</CssParameter>' + transline2f + '</Stroke></LineSymbolizer>';
        var colstksec3f = $("#collorpicker_pickersencbordseccell3filha .colpick_new_color").css('backgroundColor');
		var widthstksec3f = $('#sencstrokesecslidercell3filha').slider("option", "value");
        var parastksec3f = '<LineSymbolizer><Stroke><CssParameter name="stroke">' + colstksec3f + '</CssParameter>'+
          '<CssParameter name="stroke-width">' + widthstksec3f + '</CssParameter>' + transline3f + '</Stroke></LineSymbolizer>';
        var colstksec4f = $("#collorpicker_pickersencbordseccell4filha .colpick_new_color").css('backgroundColor');
		var widthstksec4f = $('#sencstrokesecslidercell4filha').slider("option", "value");
        var parastksec4f = '<LineSymbolizer><Stroke><CssParameter name="stroke">' + colstksec4f + '</CssParameter>'+
          '<CssParameter name="stroke-width">' + widthstksec4f + '</CssParameter>' + transline4f + '</Stroke></LineSymbolizer>';
        var colstksec5f = $("#collorpicker_pickersencbordseccell5filha .colpick_new_color").css('backgroundColor');
		var widthstksec5f = $('#sencstrokesecslidercell5filha').slider("option", "value");
        var parastksec5f = '<LineSymbolizer><Stroke><CssParameter name="stroke">' + colstksec5f + '</CssParameter>'+
          '<CssParameter name="stroke-width">' + widthstksec5f + '</CssParameter>' + transline5f + '</Stroke></LineSymbolizer>';       
							
		var graphiccatminf;					
		var graphiccatmedf;
		var graphiccatmaxf;
		var graphiccat4f;
		var graphiccat5f;
		
		
//------------------------------------		
		
		
		//Bubble		
		var fieldbub = $("#bubcolumbox").val();			
		var cellbubmin = $("#bubcellboxmin").val();
		var bubcampomin = '<ogc:Filter><ogc:PropertyIsLessThan><ogc:PropertyName>' + fieldbub + '</ogc:PropertyName>'+
			'<ogc:Literal>' + cellbubmin + '</ogc:Literal></ogc:PropertyIsLessThan></ogc:Filter>';		
		var cellbubmed = $("#bubcellboxmed").val();		
		var bubcampomed = '<ogc:Filter><ogc:And><ogc:PropertyIsGreaterThanOrEqualTo><ogc:PropertyName>' + fieldbub + '</ogc:PropertyName>'+
			'<ogc:Literal>' + cellbubmin + '</ogc:Literal></ogc:PropertyIsGreaterThanOrEqualTo><ogc:PropertyIsLessThan>'+
			'<ogc:PropertyName>' + fieldbub + '</ogc:PropertyName><ogc:Literal>' + cellbubmed + '</ogc:Literal></ogc:PropertyIsLessThan></ogc:And></ogc:Filter>';			
		var cellbubmax = $("#bubcellboxmax").val();
		var bubcampomax = '<ogc:Filter><ogc:PropertyIsGreaterThanOrEqualTo><ogc:PropertyName>' + fieldbub + '</ogc:PropertyName>'+
			'<ogc:Literal>' + cellbubmax + '</ogc:Literal></ogc:PropertyIsGreaterThanOrEqualTo></ogc:Filter>';
		var bubstk = $('#bubstrokeslider').slider("option", "value");
		var bubopac = $('#bubtranspslider').slider("option", "value");
		var bilbo = $("#collorpicker_pickerbubrell .colpick_new_color").css('backgroundColor');
		var baggins = $("#collorpicker_pickerbubbord .colpick_new_color").css('backgroundColor');	
		var hobbit = '<CssParameter name="fill">' + bilbo +'</CssParameter>';
		var gandalf = '<Fill>' + hobbit + '</Fill>';		
		var shire = '<CssParameter name="stroke">' + baggins + '</CssParameter><CssParameter name="stroke-width">' + bubstk + '</CssParameter>';
		var stkbub = '<Stroke>' + shire + '</Stroke>';			
		var minsize = $('#bubminslider').slider("option", "value");
		var maxsize = $('#bubmaxslider').slider("option", "value");		
		var sizemin = '<Size>' + minsize + '</Size>';
		var sizemax = '<Size>' + maxsize + '</Size>';	
		var sizemed = '<Size>' + (minsize + maxsize)/2 + '</Size>'; 
		var graphicbubmin = '<Graphic><Mark><WellKnownName>circle</WellKnownName>' + gandalf + stkbub +'</Mark>' + transpoint + sizemin + '</Graphic>';
		var graphicbubmed = '<Graphic><Mark><WellKnownName>circle</WellKnownName>' + gandalf + stkbub +'</Mark>' + transpoint + sizemed + '</Graphic>';
		var graphicbubmax =	'<Graphic><Mark><WellKnownName>circle</WellKnownName>' + gandalf + stkbub +'</Mark>' + transpoint + sizemax + '</Graphic>';
		
//------------------------------------
		
		//Bubble Filha		
		var fieldbubf = $("#bubcolumboxfilha").val();			
		var cellbubminf = $("#bubcellboxminfilha").val();
		var bubcampominf = '<ogc:Filter><ogc:PropertyIsLessThan><ogc:PropertyName>' + fieldbubf + '</ogc:PropertyName>'+
			'<ogc:Literal>' + cellbubminf + '</ogc:Literal></ogc:PropertyIsLessThan></ogc:Filter>';		
		var cellbubmedf = $("#bubcellboxmedfilha").val();		
		var bubcampomedf = '<ogc:Filter><ogc:And><ogc:PropertyIsGreaterThanOrEqualTo><ogc:PropertyName>' + fieldbubf + '</ogc:PropertyName>'+
			'<ogc:Literal>' + cellbubminf + '</ogc:Literal></ogc:PropertyIsGreaterThanOrEqualTo><ogc:PropertyIsLessThan>'+
			'<ogc:PropertyName>' + fieldbubf + '</ogc:PropertyName><ogc:Literal>' + cellbubmedf + '</ogc:Literal></ogc:PropertyIsLessThan></ogc:And></ogc:Filter>';			
		var cellbubmaxf = $("#bubcellboxmaxfilha").val();
		var bubcampomaxf = '<ogc:Filter><ogc:PropertyIsGreaterThanOrEqualTo><ogc:PropertyName>' + fieldbubf + '</ogc:PropertyName>'+
			'<ogc:Literal>' + cellbubmaxf + '</ogc:Literal></ogc:PropertyIsGreaterThanOrEqualTo></ogc:Filter>';
		var bubstkf = $('#bubstrokesliderfilha').slider("option", "value");
		var bubopacf = $('#bubtranspsliderfilha').slider("option", "value");
		var bilbof = $("#collorpicker_pickerbubrellfilha .colpick_new_color").css('backgroundColor');
		var bagginsf = $("#collorpicker_pickerbubbordfilha .colpick_new_color").css('backgroundColor');	
		var hobbitf = '<CssParameter name="fill">' + bilbof +'</CssParameter>';
		var gandalff = '<Fill>' + hobbitf + '</Fill>';		
		var shiref = '<CssParameter name="stroke">' + bagginsf + '</CssParameter><CssParameter name="stroke-width">' + bubstkf + '</CssParameter>';
		var stkbubf = '<Stroke>' + shiref + '</Stroke>';			
		var minsizef = $('#bubminsliderfilha').slider("option", "value");
		var maxsizef = $('#bubmaxsliderfilha').slider("option", "value");		
		var sizeminf = '<Size>' + minsizef + '</Size>';
		var sizemaxf = '<Size>' + maxsizef + '</Size>';	
		var sizemedf = '<Size>' + (minsizef + maxsizef)/2 + '</Size>'; 
		var graphicbubminf = '<Graphic><Mark><WellKnownName>circle</WellKnownName>' + gandalff + stkbubf +'</Mark>' + transpointf + sizeminf + '</Graphic>';
		var graphicbubmedf = '<Graphic><Mark><WellKnownName>circle</WellKnownName>' + gandalff + stkbubf +'</Mark>' + transpointf + sizemedf + '</Graphic>';
		var graphicbubmaxf = '<Graphic><Mark><WellKnownName>circle</WellKnownName>' + gandalff + stkbubf +'</Mark>' + transpointf + sizemaxf + '</Graphic>';
		
//------------------------------------
		
		//Label			
		var lblc = $("#collorpicker_picker .colpick_new_color").css('backgroundColor');
		var lblfill = '<CssParameter name="font-colour">' + lblc + '</CssParameter>'
		//Font Weight
		var lblw;		
		if ($("#checklblN:checkbox").prop('checked')) {
			lblw = '<CssParameter name="font-weight">bold</CssParameter>';
		} 
		else if ($("#checklblI:checkbox").prop('checked')) {
			lblw = '<CssParameter name="font-weight">italic</CssParameter>';
		}
		else if ($("#checklblS:checkbox").prop('checked')) {
			lblw = '<CssParameter name="font-weight">oblique</CssParameter>';
		}
		else {
			lblw = '<CssParameter name="font-weight">normal</CssParameter>';
		};
		//Font Size
		var lbltam = '';
		if ($("#lblsize option:selected").val() != undefined && $("#lblsize option:selected").val() != "-1")lbltam+='<CssParameter name="font-size">'+$("#lblsize option:selected").val()+'</CssParameter>';
		//Font Family
		var family = '';
		if ($("#lblfamily option:selected").val() != undefined && $("#lblfamily option:selected").val() != "-1")family+='<CssParameter name="font-family">'+$("#lblfamily option:selected").val()+'</CssParameter>';
		var font = '<Font>' + family + lbltam + '<CssParameter name="font-style">normal</CssParameter>' + lblw + lblfill + '</Font>';
		
		var columlbltxt = $("#lblcolumbox").val();
		var columlbl = '<Label>' + columlbltxt + '</Label>';
		var celllbltxt = $("#lblcellbox").val();
		//Check Label Escala
		var lblscl = '';
		if ($("#escalaminlbl option:selected").val() != undefined && $("#escalaminlbl option:selected").val() != "-1")lblscl+="<MinScaleDenominator>"+$("#escalaminlbl option:selected").val()+"</MinScaleDenominator>";
		if ($("#escalamaxlbl option:selected").val() != undefined && $("#escalamaxlbl option:selected").val() != "-1")lblscl+="<MaxScaleDenominator>"+$("#escalamaxlbl option:selected").val()+"</MaxScaleDenominator>";		
		//Check Label
		if ($("#checklbltype:checkbox").prop('checked')) {	
			
			lbl = '<Rule><Name></Name>' + lblscl + '<TextSymbolizer>' + columlbl + font + '<LabelPlacement>'+
			'<PointPlacement><AnchorPoint><AnchorPointX>0.5</AnchorPointX><AnchorPointY>0.0</AnchorPointY></AnchorPoint>'+
				'<Displacement><DisplacementX>0</DisplacementX><DisplacementY>5</DisplacementY></Displacement>'+
				'</PointPlacement></LabelPlacement></TextSymbolizer></Rule>';
		} else {
			($("#checklbltype:checkbox").prop('unchecked'))	
			lbl = '';			
		} 
		
		//A outra maneira de inserir um lbl (repetindo a simbolizacao)
//		if ($("#showlblscl:checkbox").prop('checked')) {	
//			lbl = '';
//			lbllbl = '<Rule><Name></Name><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>' + columlbltxt + '</ogc:PropertyName>'+  
//			'<ogc:Literal>' + celllbltxt + '</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter><Name></Name><TextSymbolizer>' + columlbl + font + 
//			'<LabelPlacement><PointPlacement><AnchorPoint><AnchorPointX>0.5</AnchorPointX><AnchorPointY>0.0</AnchorPointY></AnchorPoint>'+
//			'<Displacement><DisplacementX>0</DisplacementX><DisplacementY>5</DisplacementY></Displacement></PointPlacement></LabelPlacement>'+
//			'</TextSymbolizer></Rule>';
//			lblnewrule = '<FeatureTypeStyle><Rule>' + lblscl + lbllbl + '</Rule></FeatureTypeStyle>';
////			lblnewrule = '<FeatureTypeStyle><Rule><Name>' + name + '</Name>' + lblscl + sldsymb + lbllbl + '</Rule></FeatureTypeStyle>';
//		} else {
//			($("#showlblscl:checkbox").prop('unchecked'))
//			lbllbl = '';
//			lblnewrule = '';
//		};	
		
//------------------------------
		
		//Label	Filha		
		var lblcf = $("#collorpicker_pickerfilha .colpick_new_color").css('backgroundColor');
		var lblfillf = '<CssParameter name="font-colour">' + lblcf + '</CssParameter>'
		//Font Weight
		var lblwf;		
		if ($("#checklblNfilha:checkbox").prop('checked')) {
			lblwf = '<CssParameter name="font-weight">bold</CssParameter>';
		} 
		else if ($("#checklblIfilha:checkbox").prop('checked')) {
			lblwf = '<CssParameter name="font-weight">italic</CssParameter>';
		}
		else if ($("#checklblSfilha:checkbox").prop('checked')) {
			lblwf = '<CssParameter name="font-weight">oblique</CssParameter>';
		}
		else {
			lblwf = '<CssParameter name="font-weight">normal</CssParameter>';
		};
		//Font Size
		var lbltamf = '';
		if ($("#lblsizefilha option:selected").val() != undefined && $("#lblsizefilha option:selected").val() != "-1")lbltamf+='<CssParameter name="font-size">'+$("#lblsizefilha option:selected").val()+'</CssParameter>';
		//Font Family
		var familyf = '';
		if ($("#lblfamilyfilha option:selected").val() != undefined && $("#lblfamilyfilha option:selected").val() != "-1")familyf+='<CssParameter name="font-family">'+$("#lblfamily option:selected").val()+'</CssParameter>';
		var fontf = '<Font>' + familyf + lbltamf + '<CssParameter name="font-style">normal</CssParameter>' + lblwf + lblfillf + '</Font>';
		
		var columlbltxtf = $("#lblcolumboxfilha").val();
		var columlblf = '<Label>' + columlbltxtf + '</Label>';
		var celllbltxtf = $("#lblcellboxfilha").val();
		//Check Label Escala
		var lblsclf = '';
		if ($("#escalaminlblfilha option:selected").val() != undefined && $("#escalaminlblfilha option:selected").val() != "-1")lblsclf+="<MinScaleDenominator>"+$("#escalaminlblfilha option:selected").val()+"</MinScaleDenominator>";
		if ($("#escalamaxlblfilha option:selected").val() != undefined && $("#escalamaxlblfilha option:selected").val() != "-1")lblsclf+="<MaxScaleDenominator>"+$("#escalamaxlblfilha option:selected").val()+"</MaxScaleDenominator>";		
		//Check Label
		if ($("#addnsc:checkbox").prop('checked')) {	
			if ($("#checklbltypefilha:checkbox").prop('checked')) {			
				lblf = '<Rule><Name></Name>' + lblsclf + '<TextSymbolizer>' + columlblf + fontf + '<LabelPlacement><PointPlacement>'+
				'<AnchorPoint><AnchorPointX>0.5</AnchorPointX><AnchorPointY>0.0</AnchorPointY></AnchorPoint><Displacement>'+
				'<DisplacementX>0</DisplacementX><DisplacementY>5</DisplacementY></Displacement></PointPlacement>'+
				'</LabelPlacement></TextSymbolizer></Rule>';
			} else {
				($("#checklbltype:checkbox").prop('unchecked'))	
				lblf = '';			
			} 
		} else {
			($("#addnsc:checkbox").prop('unchecked'))
			lblf = '';
		}
		
//------------------------------	
		
		//Tipo de Simbolizaçao			
		if ($("#radio :radio:checked + label").text() == "Simple") {	
			bubbles = '';
			categorias = '';
			if ($("#chggrp option:selected").val() == "puntos") {
				fill = '<Fill>' + parafill + '</Fill>';
				stk = '<Stroke>' + parastk + dasarstk + '</Stroke>';
				parastksec = '';
				graphic = '<Graphic><Mark>' + type + fill + stk +'</Mark>' + transpoint + size + '<Rotation>' + rotation + '</Rotation></Graphic>';	
				sldsymb = '<PointSymbolizer>' + graphic + '</PointSymbolizer>';
				simples = '<Rule><Name>' + name + '</Name><Title></Title>' + scale + sldsymb + '</Rule>';
			}
			if ($("#chggrp option:selected").val() == "lineas") {	
				bubbles = '';
				stk = '<Stroke>' + parastk + transline + dasarstk + '</Stroke>';
				graphic = stk;
				sldsymb = '<LineSymbolizer>' + graphic + '</LineSymbolizer>';
				simples = '<Rule><Name>' + name + '</Name><Title></Title>' + scale + parastksec + sldsymb + '</Rule>';		
				
			}
			if ($("#chggrp option:selected").val() == "poligonos") {
				bubbles = '';
				fill = '<Fill>' + parafill + transpol + '</Fill>';
				stk = '<Stroke>' + parastk + transline + dasarstk + '</Stroke>';
				graphic = fill + stk;
				sldsymb = '<PolygonSymbolizer>' + graphic + '</PolygonSymbolizer>';
				simples = '<Rule><Name>' + name + '</Name><Title></Title>' + scale + sldsymb + '</Rule>';
			}			
		}		
		if ($("#radio :radio:checked + label").text() == "Category") {
			if ($("#checkinterval:checkbox").prop('checked')) {
				if ($("#chggrp option:selected").val() == "puntos") {
					simples = '';
					bubbles = '';
					catcampo1 = '';
					catcampo2 = '';
					catcampo3 = '';
					catcampo4 = '';
					catcampo5 = '';
					catgandalf1 = '<Fill>' + cathobbit1 + '</Fill>';	
					catgandalf2 = '<Fill>' + cathobbit2 + '</Fill>';		
					catgandalf3 = '<Fill>' + cathobbit3 + '</Fill>';
					stkcat1 = '<Stroke>' + catshire1 + dasarstk1 + '</Stroke>';
					stkcat2 = '<Stroke>' + catshire2 + dasarstk2 + '</Stroke>';
					stkcat3 = '<Stroke>' + catshire3 + dasarstk3 + '</Stroke>';	
					graphiccatmin = '<PointSymbolizer><Graphic><Mark>' + catsybl1 + catgandalf1 + stkcat1 + '</Mark>' + transpoint1 + sizecatmin + '<Rotation>' + rotation1 + '</Rotation></Graphic></PointSymbolizer>'
					graphiccatmed = '<PointSymbolizer><Graphic><Mark>' + catsybl2 + catgandalf2 + stkcat2 + '</Mark>' + transpoint2 + sizecatmed + '<Rotation>' + rotation2 + '</Rotation></Graphic></PointSymbolizer>'
					graphiccatmax = '<PointSymbolizer><Graphic><Mark>' + catsybl3 + catgandalf3 + stkcat3 + '</Mark>' + transpoint3 + sizecatmax + '<Rotation>' + rotation3 + '</Rotation></Graphic></PointSymbolizer>'
					
					categorias = '<Rule><Name>' + name + '</Name><Title></Title>' + catcampomin + scale + graphiccatmin + '</Rule><Rule>'+
					'<Name>' + name + '</Name><Title></Title>' + catcampomed + scale + graphiccatmed + '</Rule><Rule>'+
					'<Name>' + name + '</Name><Title></Title>' + catcampomax + scale + graphiccatmax + '</Rule>';
				}
				if ($("#chggrp option:selected").val() == "lineas") {		
					simples = '';
					bubbles = '';
					catcampo1 = '';
					catcampo2 = '';
					catcampo3 = '';
					catcampo4 = '';
					catcampo5 = '';
					stkcat1 = '<Stroke>' + catshire1 + transline1 + dasarstk1 + '</Stroke>';
					stkcat2 = '<Stroke>' + catshire2 + transline2 + dasarstk2 + '</Stroke>';
					stkcat3 = '<Stroke>' + catshire3 + transline3 + dasarstk3 + '</Stroke>';		
					graphiccatmin = '<LineSymbolizer>' + stkcat1 + '</LineSymbolizer>';
					graphiccatmed = '<LineSymbolizer>' + stkcat2 + '</LineSymbolizer>';
					graphiccatmax = '<LineSymbolizer>' + stkcat3 + '</LineSymbolizer>';
					
					categorias = '<Rule><Name>' + name + '</Name><Title></Title>' + catcampomin + scale + graphiccatmin + '</Rule><Rule>'+
					'<Name>' + name + '</Name><Title></Title>' + catcampomed + scale + graphiccatmed + '</Rule><Rule>'+
					'<Name>' + name + '</Name><Title></Title>' + catcampomax + scale + graphiccatmax + '</Rule>';		
				}
				if ($("#chggrp option:selected").val() == "poligonos") {
					simples = '';
					bubbles = '';
					catcampo1 = '';
					catcampo2 = '';
					catcampo3 = '';
					catcampo4 = '';
					catcampo5 = '';
					catgandalf1 = '<Fill>' + cathobbit1 + '</Fill>';	
					catgandalf2 = '<Fill>' + cathobbit2 + '</Fill>';		
					catgandalf3 = '<Fill>' + cathobbit3 + '</Fill>';
					stkcat1 = '<Stroke>' + catshire1 + transline1 + dasarstk1 + '</Stroke>';
					stkcat2 = '<Stroke>' + catshire2 + transline2 + dasarstk2 + '</Stroke>';
					stkcat3 = '<Stroke>' + catshire3 + transline3 + dasarstk3 + '</Stroke>';			
					graphiccatmin = '<PolygonSymbolizer>' + catgandalf1 + stkcat1 + '</PolygonSymbolizer>';
					graphiccatmed = '<PolygonSymbolizer>' + catgandalf2 + stkcat2 + '</PolygonSymbolizer>';
					graphiccatmax = '<PolygonSymbolizer>' + catgandalf3 + stkcat3 + '</PolygonSymbolizer>';
					
					categorias = '<Rule><Name>' + name + '</Name><Title></Title>' + catcampomin + scale + graphiccatmin + '</Rule><Rule>'+
					'<Name>' + name + '</Name><Title></Title>' + catcampomed + scale + graphiccatmed + '</Rule><Rule>'+
					'<Name>' + name + '</Name><Title></Title>' + catcampomax + scale + graphiccatmax + '</Rule>';
				}		
			} else {
				($("#checkinterval:checkbox").prop('unchecked'))	
					if ($("#chggrp option:selected").val() == "puntos") {
						simples = '';
						bubbles = '';
						catcampomin = '';
						catcampomed = '';
						catcampomax = '';
						catgandalf1 = '<Fill>' + cathobbit1 + '</Fill>';	
						catgandalf2 = '<Fill>' + cathobbit2 + '</Fill>';		
						catgandalf3 = '<Fill>' + cathobbit3 + '</Fill>';
						catgandalf4 = '<Fill>' + cathobbit4 + '</Fill>';
						catgandalf5 = '<Fill>' + cathobbit5 + '</Fill>';
						stkcat1 = '<Stroke>' + catshire1 + dasarstk1 + '</Stroke>';
						stkcat2 = '<Stroke>' + catshire2 + dasarstk2 + '</Stroke>';
						stkcat3 = '<Stroke>' + catshire3 + dasarstk3 + '</Stroke>';	
						stkcat4 = '<Stroke>' + catshire4 + dasarstk4 + '</Stroke>';
						stkcat5 = '<Stroke>' + catshire5 + dasarstk5 + '</Stroke>';	
						graphiccatmin = '<PointSymbolizer><Graphic><Mark>' + catsybl1 + catgandalf1 + stkcat1 + '</Mark>' + transpoint1 + sizecatmin + '<Rotation>' + rotation1 + '</Rotation></Graphic></PointSymbolizer>'
						graphiccatmed = '<PointSymbolizer><Graphic><Mark>' + catsybl2 + catgandalf2 + stkcat2 + '</Mark>' + transpoint2 + sizecatmed + '<Rotation>' + rotation2 + '</Rotation></Graphic></PointSymbolizer>'
						graphiccatmax = '<PointSymbolizer><Graphic><Mark>' + catsybl3 + catgandalf3 + stkcat3 + '</Mark>' + transpoint3 + sizecatmax + '<Rotation>' + rotation3 + '</Rotation></Graphic></PointSymbolizer>'
						graphiccat4 = '<PointSymbolizer><Graphic><Mark>' + catsybl4 + catgandalf4 + stkcat4 + '</Mark>' + transpoint4 + sizecat4 + '<Rotation>' + rotation4 + '</Rotation></Graphic></PointSymbolizer>'
						graphiccat5 = '<PointSymbolizer><Graphic><Mark>' + catsybl5 + catgandalf5 + stkcat5 + '</Mark>' + transpoint5 + sizecat5 + '<Rotation>' + rotation5 + '</Rotation></Graphic></PointSymbolizer>'
										
						categorias = '<Rule><Name>' + name + '</Name><Title></Title>' + catcampo1 + scale + graphiccatmin + '</Rule><Rule>'+
						'<Name>' + name + '</Name><Title></Title>' + catcampo2 + scale + graphiccatmed + '</Rule><Rule>'+
						'<Name>' + name + '</Name><Title></Title>' + catcampo3 + scale + graphiccatmax + '</Rule><Rule>'+
						'<Name>' + name + '</Name><Title></Title>' + catcampo4 + scale + graphiccat4 + '</Rule><Rule>'+
						'<Name>' + name + '</Name><Title></Title>' + catcampo5 + scale + graphiccat5 + '</Rule>';
					}
					if ($("#chggrp option:selected").val() == "lineas") {		
						simples = '';
						bubbles = '';
						catcampomin = '';
						catcampomed = '';
						catcampomax = '';
						stkcat1 = '<Stroke>' + catshire1 + transline1 + dasarstk1 + '</Stroke>';
						stkcat2 = '<Stroke>' + catshire2 + transline2 + dasarstk2 + '</Stroke>';
						stkcat3 = '<Stroke>' + catshire3 + transline3 + dasarstk3 + '</Stroke>';	
						stkcat4 = '<Stroke>' + catshire4 + transline4 + dasarstk4 + '</Stroke>';
						stkcat5 = '<Stroke>' + catshire5 + transline5 + dasarstk5 + '</Stroke>';
						graphiccatmin = '<LineSymbolizer>' + stkcat1 + '</LineSymbolizer>';
						graphiccatmed = '<LineSymbolizer>' + stkcat2 + '</LineSymbolizer>';
						graphiccatmax = '<LineSymbolizer>' + stkcat3 + '</LineSymbolizer>';
						graphiccat4 = '<LineSymbolizer>' + stkcat4 + '</LineSymbolizer>';
						graphiccat5 = '<LineSymbolizer>' + stkcat5 + '</LineSymbolizer>';
						
						categorias = '<Rule><Name>' + name + '</Name><Title></Title>' + catcampo1 + scale + graphiccatmin + '</Rule><Rule>'+
						'<Name>' + name + '</Name><Title></Title>' + catcampo2 + scale + graphiccatmed + '</Rule><Rule>'+
						'<Name>' + name + '</Name><Title></Title>' + catcampo3 + scale + graphiccatmax + '</Rule><Rule>'+
						'<Name>' + name + '</Name><Title></Title>' + catcampo4 + scale + graphiccat4 + '</Rule><Rule>'+
						'<Name>' + name + '</Name><Title></Title>' + catcampo5 + scale + graphiccat5 + '</Rule>';
						
					}
					if ($("#chggrp option:selected").val() == "poligonos") {
						simples = '';
						bubbles = '';
						catcampomin = '';
						catcampomed = '';
						catcampomax = '';
						catgandalf1 = '<Fill>' + cathobbit1 + '</Fill>';	
						catgandalf2 = '<Fill>' + cathobbit2 + '</Fill>';		
						catgandalf3 = '<Fill>' + cathobbit3 + '</Fill>';
						catgandalf4 = '<Fill>' + cathobbit4 + '</Fill>';		
						catgandalf5 = '<Fill>' + cathobbit5 + '</Fill>';
						stkcat1 = '<Stroke>' + catshire1 + transline1 + dasarstk1 + '</Stroke>';
						stkcat2 = '<Stroke>' + catshire2 + transline2 + dasarstk2 + '</Stroke>';
						stkcat3 = '<Stroke>' + catshire3 + transline3 + dasarstk3 + '</Stroke>';
						stkcat4 = '<Stroke>' + catshire4 + transline4 + dasarstk4 + '</Stroke>';
						stkcat5 = '<Stroke>' + catshire5 + transline5 + dasarstk5 + '</Stroke>';
						graphiccatmin = '<PolygonSymbolizer>' + catgandalf1 + stkcat1 + '</PolygonSymbolizer>';
						graphiccatmed = '<PolygonSymbolizer>' + catgandalf2 + stkcat2 + '</PolygonSymbolizer>';
						graphiccatmax = '<PolygonSymbolizer>' + catgandalf3 + stkcat3 + '</PolygonSymbolizer>';
						graphiccat4 = '<PolygonSymbolizer>' + catgandalf4 + stkcat4 + '</PolygonSymbolizer>';
						graphiccat5 = '<PolygonSymbolizer>' + catgandalf5 + stkcat5 + '</PolygonSymbolizer>';
						
						categorias = '<Rule><Name>' + name + '</Name><Title></Title>' + catcampo1 + scale + graphiccatmin + '</Rule><Rule>'+
						'<Name>' + name + '</Name><Title></Title>' + catcampo2 + scale + graphiccatmed + '</Rule><Rule>'+
						'<Name>' + name + '</Name><Title></Title>' + catcampo3 + scale + graphiccatmax + '</Rule><Rule>'+
						'<Name>' + name + '</Name><Title></Title>' + catcampo4 + scale + graphiccat4 + '</Rule><Rule>'+
						'<Name>' + name + '</Name><Title></Title>' + catcampo5 + scale + graphiccat5 + '</Rule>';
					}	
				} 
			}	
		if ($("#radio :radio:checked + label").text() == "Bubble") {
			if ($("#chggrp option:selected").val() == "puntos") {
				simples = '';
				transline = '';
				categorias = '';
//				stk = '<Stroke>' + shire + '</Stroke>';		????
				transpoint = '<Opacity>' + bubopac + '</Opacity>';
				bubbles = '<Rule><Name>' + name + '</Name><Title></Title>' + bubcampomin + scale + '<PointSymbolizer>' + graphicbubmin + '</PointSymbolizer></Rule>'+
				'<Rule><Name>' + name + '</Name><Title></Title>' + bubcampomed + scale + '<PointSymbolizer>' + graphicbubmed + '</PointSymbolizer></Rule>'+
				'<Rule><Name>' + name + '</Name><Title></Title>' + bubcampomax + scale + '<PointSymbolizer>' + graphicbubmax + '</PointSymbolizer></Rule>';
			}
			if ($("#chggrp option:selected").val() == "lineas") {
				bubbles = '';
				categorias = '';
				simples = '';
				lbl = '';
			}
			if ($("#chggrp option:selected").val() == "poligonos") {
				bubbles = '';
				simples = '';
				categorias = '';
				lbl = '';
			}
			
		};	
		
		
//------------------------------------
		//Tipo de Simbolizaçao	Filha
		if ($("#addnsc:checkbox").prop('checked')) {		
			bubblesf = '';
			categoriasf = '';
			if ($("#radiofilha :radio:checked + label").text() == "Simple") {					
				if ($("#chggrp option:selected").val() == "puntos") {
					fillf = '<Fill>' + parafillf + '</Fill>';
					stkf = '<Stroke>' + parastkf + dasarstkf + '</Stroke>';
					graphicf = '<Graphic><Mark>' + typef + fillf + stkf +'</Mark>' + transpointf + sizef + '<Rotation>' + rotationf + '</Rotation></Graphic>';	
					sldsymbf = '<PointSymbolizer>' + graphicf + '</PointSymbolizer>';
					simplesf = '<Rule><Name>' + name + '</Name><Title></Title>' + scalef + sldsymbf + '</Rule>';
				}
				if ($("#chggrp option:selected").val() == "lineas") {
					stkf = '<Stroke>' + parastkf + translinef + dasarstkf + '</Stroke>';
					graphicf = stkf;
					sldsymbf = '<LineSymbolizer>' + graphicf + '</LineSymbolizer>';
					simplesf = '<Rule><Name>' + name + '</Name><Title></Title>' + scalef + sldsymbf + '</Rule>';
				}
				if ($("#chggrp option:selected").val() == "poligonos") {
					fillf = '<Fill>' + parafillf + transpolf + '</Fill>';
					stkf = '<Stroke>' + parastkf + translinef + dasarstkf + '</Stroke>';
					graphicf = fillf + stkf;
					sldsymbf = '<PolygonSymbolizer>' + graphicf + '</PolygonSymbolizer>';
					simplesf = '<Rule><Name>' + name + '</Name><Title></Title>' + scalef + sldsymbf + '</Rule>';
				}			
			}		
			if ($("#radiofilha :radio:checked + label").text() == "Category") {
				if ($("#checkinterval:checkbox").prop('checked')) {
					if ($("#chggrp option:selected").val() == "puntos") {
						simplesf = '';
						bubblesf = '';
						catcampo1f = '';
						catcampo2f = '';
						catcampo3f = '';
						catcampo4f = '';
						catcampo5f = '';
						catgandalf1f = '<Fill>' + cathobbit1f + '</Fill>';	
						catgandalf2f = '<Fill>' + cathobbit2f + '</Fill>';		
						catgandalf3f = '<Fill>' + cathobbit3f + '</Fill>';
						stkcat1f = '<Stroke>' + catshire1f + dasarstk1f + '</Stroke>';
						stkcat2f = '<Stroke>' + catshire2f + dasarstk2f + '</Stroke>';
						stkcat3f = '<Stroke>' + catshire3f + dasarstk3f + '</Stroke>';	
						graphiccatminf = '<PointSymbolizer><Graphic><Mark>' + catsybl1f + catgandalf1f + stkcat1f + '</Mark>' + transpoint1f + sizecatminf + '<Rotation>' + rotation1f + '</Rotation></Graphic></PointSymbolizer>'
						graphiccatmedf = '<PointSymbolizer><Graphic><Mark>' + catsybl2f + catgandalf2f + stkcat2f + '</Mark>' + transpoint2f + sizecatmedf + '<Rotation>' + rotation2f + '</Rotation></PointSymbolizer>'
						graphiccatmaxf = '<PointSymbolizer><Graphic><Mark>' + catsybl3f + catgandalf3f + stkcat3f + '</Mark>' + transpoint3f + sizecatmaxf + '<Rotation>' + rotation3f + '</Rotation></PointSymbolizer>'
						
						categoriasf = '<Rule><Name>' + name + '</Name><Title></Title>' + catcampominf + scalef + graphiccatminf + '</Rule><Rule>'+
						'<Name>' + name + '</Name><Title></Title>' + catcampomedf + scalef + graphiccatmedf + '</Rule><Rule>'+
						'<Name>' + name + '</Name><Title></Title>' + catcampomaxf + scalef + graphiccatmaxf + '</Rule>';
					}
					if ($("#chggrp option:selected").val() == "lineas") {		
						simplesf = '';
						bubblesf = '';
						catcampo1f = '';
						catcampo2f = '';
						catcampo3f = '';
						catcampo4f = '';
						catcampo5f = '';
						stkcat1f = '<Stroke>' + catshire1f + transline1f + dasarstk1f + '</Stroke>';
						stkcat2f = '<Stroke>' + catshire2f + transline2f + dasarstk2f + '</Stroke>';
						stkcat3f = '<Stroke>' + catshire3f + transline3f + dasarstk3f + '</Stroke>';		
						graphiccatminf = '<LineSymbolizer>' + stkcat1f + '</LineSymbolizer>';
						graphiccatmedf = '<LineSymbolizer>' + stkcat2f + '</LineSymbolizer>';
						graphiccatmaxf = '<LineSymbolizer>' + stkcat3f + '</LineSymbolizer>';
						
						categoriasf = '<Rule><Name>' + name + '</Name><Title></Title>' + catcampominf + scalef + graphiccatminf + '</Rule><Rule>'+
						'<Name>' + name + '</Name><Title></Title>' + catcampomedf + scalef + graphiccatmedf + '</Rule><Rule>'+
						'<Name>' + name + '</Name><Title></Title>' + catcampomaxf + scalef + graphiccatmaxf + '</Rule>';		
					}
					if ($("#chggrp option:selected").val() == "poligonos") {
						simplesf = '';
						bubblesf = '';
						catcampo1f = '';
						catcampo2f = '';
						catcampo3f = '';
						catcampo4f = '';
						catcampo5f = '';
						catgandalf1f = '<Fill>' + cathobbit1f + '</Fill>';	
						catgandalf2f = '<Fill>' + cathobbit2f + '</Fill>';		
						catgandalf3f = '<Fill>' + cathobbit3f + '</Fill>';
						stkcat1f = '<Stroke>' + catshire1f + transline1f + dasarstk1f + '</Stroke>';
						stkcat2f = '<Stroke>' + catshire2f + transline2f + dasarstk2f + '</Stroke>';
						stkcat3f = '<Stroke>' + catshire2f + transline3f + dasarstk3f + '</Stroke>';			
						graphiccatminf = '<PolygonSymbolizer>' + catgandalf1f + stkcat1f + '</PolygonSymbolizer>';
						graphiccatmedf = '<PolygonSymbolizer>' + catgandalf2f + stkcat2f + '</PolygonSymbolizer>';
						graphiccatmaxf = '<PolygonSymbolizer>' + catgandalf3f + stkcat3f + '</PolygonSymbolizer>';
						
						categoriasf = '<Rule><Name>' + name + '</Name><Title></Title>' + catcampominf + scalef + graphiccatminf + '</Rule><Rule>'+
						'<Name>' + name + '</Name><Title></Title>' + catcampomedf + scalef + graphiccatmedf + '</Rule><Rule>'+
						'<Name>' + name + '</Name><Title></Title>' + catcampomaxf + scalef + graphiccatmaxf + '</Rule>';
					}		
				} else {
					($("#checkinterval:checkbox").prop('unchecked'))	
						if ($("#chggrp option:selected").val() == "puntos") {
							simplesf = '';
							bubblesf = '';
							catcampominf = '';
							catcampomedf = '';
							catcampomaxf = '';
							catgandalf1f = '<Fill>' + cathobbit1f + '</Fill>';	
							catgandalf2f = '<Fill>' + cathobbit2f + '</Fill>';		
							catgandalf3f = '<Fill>' + cathobbit3f + '</Fill>';
							catgandalf4f = '<Fill>' + cathobbit4f + '</Fill>';
							catgandalf5f = '<Fill>' + cathobbit5f + '</Fill>';
							stkcat1f = '<Stroke>' + catshire1f + dasarstk1f + '</Stroke>';
							stkcat2f = '<Stroke>' + catshire2f + dasarstk2f + '</Stroke>';
							stkcat3f = '<Stroke>' + catshire3f + dasarstk3f + '</Stroke>';	
							stkcat4f = '<Stroke>' + catshire4f + dasarstk4f + '</Stroke>';
							stkcat5f = '<Stroke>' + catshire5f + dasarstk5f + '</Stroke>';	
							graphiccatminf = '<PointSymbolizer><Graphic><Mark>' + catsybl1f + catgandalf1f + stkcat1f + '</Mark>' + transpoint1f + sizecatminf + '<Rotation>' + rotation1f + '</Rotation></Graphic></PointSymbolizer>'
							graphiccatmedf = '<PointSymbolizer><Graphic><Mark>' + catsybl2f + catgandalf2f + stkcat2f + '</Mark>' + transpoint2f + sizecatmedf + '<Rotation>' + rotation2f + '</Rotation></Graphic></PointSymbolizer>'
							graphiccatmaxf = '<PointSymbolizer><Graphic><Mark>' + catsybl3f + catgandalf3f + stkcat3f + '</Mark>' + transpoint3f + sizecatmaxf + '<Rotation>' + rotation3f + '</Rotation></Graphic></PointSymbolizer>'
							graphiccat4f = '<PointSymbolizer><Graphic><Mark>' + catsybl4f + catgandalf4f + stkcat4f + '</Mark>' + transpoint4f + sizecat4f + '<Rotation>' + rotation4f + '</Rotation></Graphic></PointSymbolizer>'
							graphiccat5f = '<PointSymbolizer><Graphic><Mark>' + catsybl5f + catgandalf5f + stkcat5f + '</Mark>' + transpoint5f + sizecat5f + '<Rotation>' + rotation5f + '</Rotation></Graphic></PointSymbolizer>'
											
							categoriasf = '<Rule><Name>' + name + '</Name><Title></Title>' + catcampo1f + scalef + graphiccatminf + '</Rule><Rule>'+
							'<Name>' + name + '</Name><Title></Title>' + catcampo2f + scalef + graphiccatmedf + '</Rule><Rule>'+
							'<Name>' + name + '</Name><Title></Title>' + catcampo3f + scalef + graphiccatmaxf + '</Rule><Rule>'+
							'<Name>' + name + '</Name><Title></Title>' + catcampo4f + scalef + graphiccat4f + '</Rule><Rule>'+
							'<Name>' + name + '</Name><Title></Title>' + catcampo5f + scalef + graphiccat5f + '</Rule>';
						}
						if ($("#chggrp option:selected").val() == "lineas") {		
							simplesf = '';
							bubblesf = '';
							catcampominf = '';
							catcampomedf = '';
							catcampomaxf = '';
							stkcat1f = '<Stroke>' + catshire1f + transline1f + dasarstk1f + '</Stroke>';
							stkcat2f = '<Stroke>' + catshire2f + transline2f + dasarstk2f + '</Stroke>';
							stkcat3f = '<Stroke>' + catshire3f + transline3f + dasarstk3f + '</Stroke>';	
							stkcat4f = '<Stroke>' + catshire4f + transline4f + dasarstk4f + '</Stroke>';
							stkcat5f = '<Stroke>' + catshire5f + transline5f + dasarstk5f + '</Stroke>';
							graphiccatminf = '<LineSymbolizer>' + stkcat1f + '</LineSymbolizer>';
							graphiccatmedf = '<LineSymbolizer>' + stkcat2f + '</LineSymbolizer>';
							graphiccatmaxf = '<LineSymbolizer>' + stkcat3f + '</LineSymbolizer>';
							graphiccat4f = '<LineSymbolizer>' + stkcat4f + '</LineSymbolizer>';
							graphiccat5f = '<LineSymbolizer>' + stkcat5f + '</LineSymbolizer>';
							
							categoriasf = '<Rule><Name>' + name + '</Name><Title></Title>' + catcampo1f + scalef + graphiccatminf + '</Rule><Rule>'+
							'<Name>' + name + '</Name><Title></Title>' + catcampo2f + scalef + graphiccatmedf + '</Rule><Rule>'+
							'<Name>' + name + '</Name><Title></Title>' + catcampo3f + scalef + graphiccatmaxf + '</Rule><Rule>'+
							'<Name>' + name + '</Name><Title></Title>' + catcampo4f + scalef + graphiccat4f + '</Rule><Rule>'+
							'<Name>' + name + '</Name><Title></Title>' + catcampo5f + scalef + graphiccat5f + '</Rule>';
							
						}
						if ($("#chggrp option:selected").val() == "poligonos") {
							simplesf = '';
							bubblesf = '';
							catcampominf = '';
							catcampomedf = '';
							catcampomaxf = '';
							catgandalf1f = '<Fill>' + cathobbit1f + '</Fill>';	
							catgandalf2f = '<Fill>' + cathobbit2f + '</Fill>';		
							catgandalf3f = '<Fill>' + cathobbit3f + '</Fill>';
							catgandalf4f = '<Fill>' + cathobbit4f + '</Fill>';		
							catgandalf5f = '<Fill>' + cathobbit5f + '</Fill>';
							stkcat1f = '<Stroke>' + catshire1f + transline1f + dasarstk1f + '</Stroke>';
							stkcat2f = '<Stroke>' + catshire2f + transline2f + dasarstk2f + '</Stroke>';
							stkcat3f = '<Stroke>' + catshire3f + transline3f + dasarstk3f + '</Stroke>';
							stkcat4f = '<Stroke>' + catshire4f + transline4f + dasarstk4f + '</Stroke>';
							stkcat5f = '<Stroke>' + catshire5f + transline5f + dasarstk5f + '</Stroke>';
							graphiccatminf = '<PolygonSymbolizer>' + catgandalf1 + stkcat1f + '</PolygonSymbolizer>';
							graphiccatmedf = '<PolygonSymbolizer>' + catgandalf2 + stkcat2f + '</PolygonSymbolizer>';
							graphiccatmaxf = '<PolygonSymbolizer>' + catgandalf3 + stkcat3f + '</PolygonSymbolizer>';
							graphiccat4f = '<PolygonSymbolizer>' + catgandalf4 + stkcat4f + '</PolygonSymbolizer>';
							graphiccat5f = '<PolygonSymbolizer>' + catgandalf5 + stkcat5f + '</PolygonSymbolizer>';
							
							categoriasf = '<Rule><Name>' + name + '</Name><Title></Title>' + catcampo1f + scalef + graphiccatminf + '</Rule><Rule>'+
							'<Name>' + name + '</Name><Title></Title>' + catcampo2f + scalef + graphiccatmedf + '</Rule><Rule>'+
							'<Name>' + name + '</Name><Title></Title>' + catcampo3f + scalef + graphiccatmaxf + '</Rule><Rule>'+
							'<Name>' + name + '</Name><Title></Title>' + catcampo4f + scalef + graphiccat4f + '</Rule><Rule>'+
							'<Name>' + name + '</Name><Title></Title>' + catcampo5f + scalef + graphiccat5f + '</Rule>';
						}	
					} 
				}	
			if ($("#radiofilha :radio:checked + label").text() == "Bubble") {
				if ($("#chggrp option:selected").val() == "puntos") {
					simplesf = '';
					categorias = '';
					translinef = '';
					transpointf = '<Opacity>' + bubopacf + '</Opacity>';
					bubblesf = '<Rule><Name>' + name + '</Name><Title></Title>' + bubcampominf + scalef + '<PointSymbolizer>' + graphicbubminf + '</PointSymbolizer></Rule>'+
					'<Rule><Name>' + name + '</Name><Title></Title>' + bubcampomedf + scalef + '<PointSymbolizer>' + graphicbubmedf + '</PointSymbolizer></Rule>'+
					'<Rule><Name>' + name + '</Name><Title></Title>' + bubcampomaxf + scalef + '<PointSymbolizer>' + graphicbubmaxf + '</PointSymbolizer></Rule>';
				}
				if ($("#chggrp option:selected").val() == "lineas") {
					bubblesf = '';
					simplesf = '';
					categoriasf = '';
					lblf = '';
				}
				if ($("#chggrp option:selected").val() == "poligonos") {
					bubblesf = '';
					simplesf = '';
					categoriasf = '';
					lblf = '';
				}
			};		
		} else {
			($("#addnsc:checkbox").prop('unchecked'))	
				simplesf = '';
				categoriasf = '';
				bubblesf = '';
				lblf = '';
		}; 

	
//------------------------------	
		
		var sld = '<?xml version="1.0" encoding="UTF-8"?>';
		sld += '<StyledLayerDescriptor version="1.0.0"' + ' '; 
		sld +=                       'xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd"' + ' '; 
		sld +=                       'xmlns="http://www.opengis.net/sld"' + ' '; 
		sld +=                       'xmlns:ogc="http://www.opengis.net/ogc"' + ' '; 
		sld +=                       'xmlns:xlink="http://www.w3.org/1999/xlink"' + ' ';  
		sld +=                       'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
		sld +=  '<NamedLayer>';
		sld +=    '<Name>'+ name +'</Name>';		
		sld += 		'<UserStyle>';
		sld +=			'<Title></Title>';
		sld +=			'<Abstract>'+ desc +'</Abstract>';
		sld +=				'<FeatureTypeStyle>';
		sld +=					simples;
		sld +=                  categorias;
		sld +=					bubbles;
		sld +=    					lbl;
		sld +=					simplesf;
		sld +=                  categoriasf;
		sld +=					bubblesf;
		sld +=    					lblf;
		sld +=  			'</FeatureTypeStyle>';
		sld +=    		'</UserStyle>';
		sld += 		'</NamedLayer>';
		sld +=    '</StyledLayerDescriptor>';
		
//		Formulario para geraçao do arquivo final	
		$("#formGenerateStyle").val(sld);
		$("#formGenerateName").val(name);		
		 $( "#formGenerate" ).submit();
		
//		alert(sld);
//		alert(parastksec);
//		alert(bubbles);
//		alert(bubblesf);
//		alert(cell1);
//		$.post('http://giscorp.sitep.com/generate_sld.php',{STYLE:sld},function(data){
//		    alert(data);
//		});
//		alert($("#radiofilha :radio:checked").prop('id'));
//		alert(graphicbubmin);
//		alert($('#sencstrokeslidercell').slider("option", "value"));
//		alert(dois);
//		alert($("#catcolumbox").val());
//		alert($("#txtcellbox").val());
//		alert(rotation);
//		alert(desc);	
//		/*alert($("#bubble[type=radio]").attr('disabled'));*/
//		alert(grp);
//		alert($("#txtbox").val());
//		alert($("#symbsenc option:selected").text());
//		alert($("#chggrp option:selected").text());
//		alert($("#chggrp option:selected").val());
//		alert ($('#picker').colpick().pickersencrell('text'));	
//		alert($("#txtarea").val());
//		alert($("#radio :radio:checked").prop('id'));
//		alert($('#sencstrokeslider').slider("option", "value"));
//		alert($("#checklbltype:checkbox").prop('checked'));
//		alert($(".editlbl").button('enable'));
//		alert($('#pickersencrell').ColorPickerSetColor(color));
//		alert($('#colorSelector input').val('#pickersencrell' + hex));		
//		alert($("#collorpicker_pickerbubrell .colpick_new_color").css('backgroundColor'));
	});
});

// Janela Simbolizacao
$(function() {
	$("#simbwindow").dialog({
		autoOpen : false,
		"height" : 'auto',
		"width" : 'auto'
	});

	$("#simbwindowfilha").dialog({
		autoOpen : false,
		"height" : 'auto',
		"width" : 'auto'
	});
});

// Label Options
$(function() {
	$("#editlblwindow").dialog({
		autoOpen : false,
		"height" : 'auto',
		"width" : 400
	});
	$("#editlblwindowfilha").dialog({
		autoOpen : false,
		"height" : 'auto',
		"width" : 400
	});	

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
//		else if ($("#cluster:checked").val() == "on")
//			$("#editsymbwindow4").dialog("open");
//		else if ($("#mapasdecalor:checked").val() == "on")
//			$("#editsymbwindow5").dialog("open");
	});
	
	$("#editsymbfilha").click(function() {

		if ($("#sencillofilha:checked").val() == "on")
			$("#editsymbwindowfilha").dialog("open");
		else if ($("#categoriasfilha:checked").val() == "on")
			$("#editsymbwindow2filha").dialog("open");
		else if ($("#bubblefilha:checked").val() == "on")
			$("#editsymbwindow3filha").dialog("open");		
	});
});

$(function() {
	$("#editcell1").click(function() {
		$("#editcellwindow").dialog("open");
	});
	$("#editcell1filha").click(function() {
		$("#editcellwindowfilha").dialog("open");
	});
	$("#editcell2").click(function() {
		$("#editcellwindow2").dialog("open");
	});
	$("#editcell2filha").click(function() {
		$("#editcellwindow2filha").dialog("open");
	});
	$("#editcell3").click(function() {
		$("#editcellwindow3").dialog("open");
	});
	$("#editcell3filha").click(function() {
		$("#editcellwindow3filha").dialog("open");
	});
	$("#editcell4").click(function() {
		$("#editcellwindow4").dialog("open");
	});
	$("#editcell4filha").click(function() {
		$("#editcellwindow4filha").dialog("open");
	});
	$("#editcell5").click(function() {
		$("#editcellwindow5").dialog("open");
	});
	$("#editcell5filha").click(function() {
		$("#editcellwindow5filha").dialog("open");
	});
});

function ocultarSimbWindows() {

	$("#editsymbwindow").dialog({
		autoOpen : false,
		"height" : 'auto',
		"width" : 'auto'
	});
	
	$("#editsymbwindowfilha").dialog({
		autoOpen : false,
		"height" : 'auto',
		"width" : 'auto'
	});

	$("#editsymbwindow2").dialog({
		autoOpen : false,
		"height" : 'auto',
		"width" : 'auto'
	});

	$("#editsymbwindow2filha").dialog({
		autoOpen : false,
		"height" : 'auto',
		"width" : 'auto'
	});
	
	$("#editcellwindow").dialog({
		autoOpen : false,
		"height" : 'auto',
		"width" : 'auto'
	});
	
	$("#editcellwindowfilha").dialog({
		autoOpen : false,
		"height" : 'auto',
		"width" : 'auto'
	});
	
	$("#editcellwindow2").dialog({
		autoOpen : false,
		"height" : 'auto',
		"width" : 'auto'
	});
	
	$("#editcellwindow2filha").dialog({
		autoOpen : false,
		"height" : 'auto',
		"width" : 'auto'
	});
		
	$("#editcellwindow3").dialog({
		autoOpen : false,
		"height" : 'auto',
		"width" : 'auto'
	});
	
	$("#editcellwindow3filha").dialog({
		autoOpen : false,
		"height" : 'auto',
		"width" : 'auto'
	});
	
	$("#editcellwindow4").dialog({
		autoOpen : false,
		"height" : 'auto',
		"width" : 'auto'
	});
	
	$("#editcellwindow4filha").dialog({
		autoOpen : false,
		"height" : 'auto',
		"width" : 'auto'
	});
	
	$("#editcellwindow5").dialog({
		autoOpen : false,
		"height" : 'auto',
		"width" : 'auto'
	});
	
	$("#editcellwindow5filha").dialog({
		autoOpen : false,
		"height" : 'auto',
		"width" : 'auto'
	});

	$("#editsymbwindow3").dialog({
		autoOpen : false,
		"height" : 'auto',
		"width" : 'auto'
	});
	
	$("#editsymbwindow3filha").dialog({
		autoOpen : false,
		"height" : 'auto',
		"width" : 'auto'
	});

	$("#propbubwindow").dialog({
		autoOpen : false,
		"height" : 'auto',
		"width" : 'auto'
	});
	
	$("#propbubwindowfilha").dialog({
		autoOpen : false,
		"height" : 'auto',
		"width" : 'auto'
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

	$("#oksenc").click(function() {
		$("#editsymbwindow").dialog("close");
	});
	
	$("#oksencfilha").click(function() {
		$("#editsymbwindowfilha").dialog("close");
	});
	

	$("#okcat").click(function() {
		$("#editsymbwindow2").dialog("close");
	});
	
	$("#okcatfilha").click(function() {
		$("#editsymbwindow2filha").dialog("close");
	});

	$("#okcat1").click(function() {
		$("#editcellwindow").dialog("close");
	});
	
	$("#okcat1filha").click(function() {
		$("#editcellwindowfilha").dialog("close");
	});
	
	$("#okcat2").click(function() {
		$("#editcellwindow2").dialog("close");
	});
	
	$("#okcat2filha").click(function() {
		$("#editcellwindow2filha").dialog("close");
	});
	
	$("#okcat3").click(function() {
		$("#editcellwindow3").dialog("close");
	});
	
	$("#okcat3filha").click(function() {
		$("#editcellwindow3filha").dialog("close");
	});
	
	$("#okcat4").click(function() {
		$("#editcellwindow4").dialog("close");
	});
	
	$("#okcat4filha").click(function() {
		$("#editcellwindow4filha").dialog("close");
	});
	
	$("#okcat5").click(function() {
		$("#editcellwindow5").dialog("close");
	});
	
	$("#okcat5filha").click(function() {
		$("#editcellwindow5filha").dialog("close");
	});

	$("#okbub").click(function() {
		$("#editsymbwindow3").dialog("close");
	});
	
	$("#okbubfilha").click(function() {
		$("#editsymbwindow3filha").dialog("close");
	});

	$("#propbub").click(function() {
		$("#propbubwindow").dialog("open");
	});
	
	$("#propbubfilha").click(function() {
		$("#propbubwindowfilha").dialog("open");
	});

	$("#okbubwindow").click(function() {
		$("#propbubwindow").dialog("close");
	});
	
	$("#okbubwindowfilha").click(function() {
		$("#propbubwindowfilha").dialog("close");
	});	

	$("#okclus").click(function() {
		$("#editsymbwindow4").dialog("close");
	});

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

$(function() {
	$("button").button().click(function(event) {
		event.preventDefault();
	});
});

$(".editlblfilha").button({
	disabled : true
});

$("#checklbltypefilha").prop({
	checked : false
});

// Radios Janela Sim
$(function() {
	$("#radio").buttonset();
	
	$("#radiofilha").buttonset();
});

// Checkboxes Nova escala, Lable e Tipolbl
$(function() {
	$("#checknesc").button();
	$("#format").buttonset();

	$("#checklbltype").button();
	$("#format").buttonset();
	
	$("#checklbltypefilha").button();
	$("#format").buttonset();

	$("#checklblN").button();
	$("#checklblI").button();
	$("#checklblS").button();
	$("#format").buttonset();
	
	$("#checklblNfilha").button();
	$("#checklblIfilha").button();
	$("#checklblSfilha").button();
	$("#format").buttonset();

	$("#chkapplyfilter").button();
	$("#format").buttonset();

	$("#chkfilterman").button();
	$("#format").buttonset();

	$("#sencselsymb").button();
	$("#format").buttonset();

	$("#selsecfieldcat").button();
	$("#format").buttonset();

	$("#defintervalcat").button();
	$("#format").buttonset();

	$("#calc").button();
	$("#format").buttonset();

	$("#showlblscl").button();
	$("#format").buttonset();
	
	$("#showlblsclfilha").button();
	$("#format").buttonset();

	$("#dashline").button();
	$("#format").buttonset();
	
	$("#dashlinefilha").button();
	$("#format").buttonset();

	$("#dashlinecell").button();
	$("#format").buttonset();
	
	$("#dashlinecell2").button();
	$("#format").buttonset();
	
	$("#dashlinecell3").button();
	$("#format").buttonset();
	
	$("#dashlinecell4").button();
	$("#format").buttonset();
	
	$("#dashlinecell5").button();
	$("#format").buttonset();
	
	$("#dashlinecellfilha").button();
	$("#format").buttonset();
	
	$("#dashlinecell2filha").button();
	$("#format").buttonset();
	
	$("#dashlinecell3filha").button();
	$("#format").buttonset();
	
	$("#dashlinecell4filha").button();
	$("#format").buttonset();
	
	$("#dashlinecell5filha").button();
	$("#format").buttonset();
	
	$("#checkinterval").button();
	$("#format").buttonset();	
	
	$("#checkintervalfilha").button();
	$("#format").buttonset();	
	
	/*$("#addnsc").button();
	$("#format").buttonset();*/	
});

$(function() {
	$("#addnsc").button();
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

	$("#sencstrokeslider").slider({
		range : "max",
		min : 0,
		max : 10,
		value : 0,
		slide : function(event, ui) {
			$("#txtsencstroke").val(ui.value);
		}	});	
	$("#txtsencstroke").val($("#sencstrokeslider").slider("value"));
	
		$("#sencstrokesliderfilha").slider({
		range : "max",
		min : 0,
		max : 10,
		value : 0,
		slide : function(event, ui) {
			$("#txtsencstrokefilha").val(ui.value);
		}
	});
	$("#txtsencstrokefilha").val($("#sencstrokesliderfilha").slider("value"));

	$("#sencsizeslider").slider({
		range : "max",
		min : 0,
		max : 36,
		value : 0,
		slide : function(event, ui) {
			$("#txtsencsize").val(ui.value);
		}
	});
	$("#txtsencsize").val($("#sencsizeslider").slider("value"));
	
		$("#sencsizesliderfilha").slider({
		range : "max",
		min : 0,
		max : 36,
		value : 0,
		slide : function(event, ui) {
			$("#txtsencsizefilha").val(ui.value);
		}
	});
	$("#txtsencsizefilha").val($("#sencsizesliderfilha").slider("value"));

	$("#senctranspslider").slider({
		range : "max",
		min : 0,
		max : 1.09,
		step: 0.1,
		value : 1,
		slide : function(event, ui) {
			$("#txtsenctransp").val(ui.value);
		}
	});
	$("#txtsenctransp").val($("#senctranspslider").slider("value"));
	
		$("#senctranspsliderfilha").slider({
		range : "max",
		min : 0,
		max : 1.09,
		step: 0.1,
		value : 1,
		slide : function(event, ui) {
			$("#txtsenctranspfilha").val(ui.value);
		}
	});
	$("#txtsenctranspfilha").val($("#senctranspsliderfilha").slider("value"));

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
	
	$("#bubstrokesliderfilha").slider({
		range : "max",
		min : 0,
		max : 10,
		value : 0,
		slide : function(event, ui) {
			$("#txtbubstrokefilha").val(ui.value);
		}
	});
	$("#txtbubstrokefilha").val($("#bubstrokesliderfilha").slider("value"));	

	$("#bubtranspslider").slider({
		range : "max",
		min : 0,
		max : 1.09,
		step : 0.1,
		value : 1,
		slide : function(event, ui) {
			$("#txtbubtransp").val(ui.value);
		}
	});
	$("#txtbubtransp").val($("#bubtranspslider").slider("value"));
	
	$("#bubtranspsliderfilha").slider({
		range : "max",
		min : 0,
		max : 1.09,
		step : 0.1,
		value : 1,
		slide : function(event, ui) {
			$("#txtbubtranspfilha").val(ui.value);
		}
	});
	$("#txtbubtranspfilha").val($("#bubtranspsliderfilha").slider("value"));

	$("#bubminslider").slider({
		range : "max",
		min : 0,
		max : 36,
		value : 0,
		slide : function(event, ui) {
			$("#txtbubmin").val(ui.value);
		}
	});
	$("#txtbubmin").val($("#bubminslider").slider("value"));
	
	$("#bubminsliderfilha").slider({
		range : "max",
		min : 0,
		max : 36,
		value : 0,
		slide : function(event, ui) {
			$("#txtbubminfilha").val(ui.value);
		}
	});
	$("#txtbubminfilha").val($("#bubminsliderfilha").slider("value"));	

	$("#bubmaxslider").slider({
		range : "max",
		min : 0,
		max : 36,
		value : 0,
		slide : function(event, ui) {
			$("#txtbubmax").val(ui.value);
		}
	});
	$("#txtbubmax").val($("#bubmaxslider").slider("value"));
	
	$("#bubmaxsliderfilha").slider({
		range : "max",
		min : 0,
		max : 36,
		value : 0,
		slide : function(event, ui) {
			$("#txtbubmaxfilha").val(ui.value);
		}
	});
	$("#txtbubmaxfilha").val($("#bubmaxsliderfilha").slider("value"));

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

	$("#sencstrokeslidercell").slider({
		range : "max",
		min : 0,
		max : 10,
		value : 0,
		slide : function(event, ui) {
			$("#txtsencstrokecell").val(ui.value);
		}
	});
	$("#txtsencstrokecell").val($("#sencstrokeslidercell").slider("value"));
	
	$("#sencstrokeslidercell2").slider({
		range : "max",
		min : 0,
		max : 10,
		value : 0,
		slide : function(event, ui) {
			$("#txtsencstrokecell2").val(ui.value);
		}
	});
	$("#txtsencstrokecell2").val($("#sencstrokeslidercell2").slider("value"));
	
	$("#sencstrokeslidercell3").slider({
		range : "max",
		min : 0,
		max : 10,
		value : 0,
		slide : function(event, ui) {
			$("#txtsencstrokecell3").val(ui.value);
		}
	});
	$("#txtsencstrokecell3").val($("#sencstrokeslidercell3").slider("value"));
	
	$("#sencstrokeslidercell4").slider({
		range : "max",
		min : 0,
		max : 10,
		value : 0,
		slide : function(event, ui) {
			$("#txtsencstrokecell4").val(ui.value);
		}
	});
	$("#txtsencstrokecell4").val($("#sencstrokeslidercell4").slider("value"));
	
	$("#sencstrokeslidercell5").slider({
		range : "max",
		min : 0,
		max : 10,
		value : 0,
		slide : function(event, ui) {
			$("#txtsencstrokecell5").val(ui.value);
		}
	});
	$("#txtsencstrokecell5").val($("#sencstrokeslidercell5").slider("value"));
	
	$("#sencstrokeslidercellfilha").slider({
		range : "max",
		min : 0,
		max : 10,
		value : 0,
		slide : function(event, ui) {
			$("#txtsencstrokecellfilha").val(ui.value);
		}
	});
	$("#txtsencstrokecellfilha").val($("#sencstrokeslidercellfilha").slider("value"));	
	
	$("#sencstrokeslidercell2filha").slider({
		range : "max",
		min : 0,
		max : 10,
		value : 0,
		slide : function(event, ui) {
			$("#txtsencstrokecell2filha").val(ui.value);
		}
	});
	$("#txtsencstrokecell2filha").val($("#sencstrokeslidercell2filha").slider("value"));
	
	$("#sencstrokeslidercell3filha").slider({
		range : "max",
		min : 0,
		max : 10,
		value : 0,
		slide : function(event, ui) {
			$("#txtsencstrokecell3filha").val(ui.value);
		}
	});
	$("#txtsencstrokecell3filha").val($("#sencstrokeslidercell3filha").slider("value"));
	
	$("#sencstrokeslidercell4filha").slider({
		range : "max",
		min : 0,
		max : 10,
		value : 0,
		slide : function(event, ui) {
			$("#txtsencstrokecell4filha").val(ui.value);
		}
	});
	$("#txtsencstrokecell4filha").val($("#sencstrokeslidercell4filha").slider("value"));
	
	$("#sencstrokeslidercell5filha").slider({
		range : "max",
		min : 0,
		max : 10,
		value : 0,
		slide : function(event, ui) {
			$("#txtsencstrokecell5filha").val(ui.value);
		}
	});
	$("#txtsencstrokecell5filha").val($("#sencstrokeslidercell5filha").slider("value"));

	$("#sencsizeslidercell").slider({
		range : "max",
		min : 0,
		max : 36,
		value : 0,
		slide : function(event, ui) {
			$("#txtsencsizecell").val(ui.value);
		}
	});
	$("#txtsencsizecell").val($("#sencsizeslidercell").slider("value"));
	
	$("#sencsizeslidercell2").slider({
		range : "max",
		min : 0,
		max : 36,
		value : 0,
		slide : function(event, ui) {
			$("#txtsencsizecell2").val(ui.value);
		}
	});
	$("#txtsencsizecell2").val($("#sencsizeslidercell2").slider("value"));
	
	$("#sencsizeslidercell3").slider({
		range : "max",
		min : 0,
		max : 36,
		value : 0,
		slide : function(event, ui) {
			$("#txtsencsizecell3").val(ui.value);
		}
	});
	$("#txtsencsizecell3").val($("#sencsizeslidercell3").slider("value"));
	
	$("#sencsizeslidercell4").slider({
		range : "max",
		min : 0,
		max : 36,
		value : 0,
		slide : function(event, ui) {
			$("#txtsencsizecell4").val(ui.value);
		}
	});
	$("#txtsencsizecell4").val($("#sencsizeslidercell4").slider("value"));
	
	$("#sencsizeslidercell5").slider({
		range : "max",
		min : 0,
		max : 36,
		value : 0,
		slide : function(event, ui) {
			$("#txtsencsizecell5").val(ui.value);
		}
	});
	$("#txtsencsizecell5").val($("#sencsizeslidercell5").slider("value"));
	
	$("#sencsizeslidercellfilha").slider({
		range : "max",
		min : 0,
		max : 36,
		value : 0,
		slide : function(event, ui) {
			$("#txtsencsizecellfilha").val(ui.value);
		}
	});
	$("#txtsencsizecellfilha").val($("#sencsizeslidercellfilha").slider("value"));
	
	$("#sencsizeslidercell2filha").slider({
		range : "max",
		min : 0,
		max : 36,
		value : 0,
		slide : function(event, ui) {
			$("#txtsencsizecell2filha").val(ui.value);
		}
	});
	$("#txtsencsizecell2filha").val($("#sencsizeslidercell2filha").slider("value"));
	
	$("#sencsizeslidercell3filha").slider({
		range : "max",
		min : 0,
		max : 36,
		value : 0,
		slide : function(event, ui) {
			$("#txtsencsizecell3filha").val(ui.value);
		}
	});
	$("#txtsencsizecell3filha").val($("#sencsizeslidercell3filha").slider("value"));
	
	$("#sencsizeslidercell4filha").slider({
		range : "max",
		min : 0,
		max : 36,
		value : 0,
		slide : function(event, ui) {
			$("#txtsencsizecell4filha").val(ui.value);
		}
	});
	$("#txtsencsizecell4filha").val($("#sencsizeslidercell4filha").slider("value"));
	
	$("#sencsizeslidercell5filha").slider({
		range : "max",
		min : 0,
		max : 36,
		value : 0,
		slide : function(event, ui) {
			$("#txtsencsizecell5filha").val(ui.value);
		}
	});
	$("#txtsencsizecell5filha").val($("#sencsizeslidercell5filha").slider("value"));


	$("#senctranspslidercell").slider({
		range : "max",
		min : 0,
		max : 1.09,
		step: 0.1,
		value : 1,
		slide : function(event, ui) {
			$("#txtsenctranspcell").val(ui.value);
		}
	});
	$("#txtsenctranspcell").val($("#senctranspslidercell").slider("value"));	
	
	$("#senctranspslidercell2").slider({
		range : "max",
		min : 0,
		max : 1.09,
		step: 0.1,
		value : 1,
		slide : function(event, ui) {
			$("#txtsenctranspcell2").val(ui.value);
		}
	});
	$("#txtsenctranspcell2").val($("#senctranspslidercell2").slider("value"));
	
	$("#senctranspslidercell3").slider({
		range : "max",
		min : 0,
		max : 1.09,
		step: 0.1,
		value : 1,
		slide : function(event, ui) {
			$("#txtsenctranspcell3").val(ui.value);
		}
	});
	$("#txtsenctranspcell3").val($("#senctranspslidercell3").slider("value"));
	
	$("#senctranspslidercell4").slider({
		range : "max",
		min : 0,
		max : 1.09,
		step: 0.1,
		value : 1,
		slide : function(event, ui) {
			$("#txtsenctranspcell4").val(ui.value);
		}
	});
	$("#txtsenctranspcell4").val($("#senctranspslidercell4").slider("value"));
	
	$("#senctranspslidercell5").slider({
		range : "max",
		min : 0,
		max : 1.09,
		step: 0.1,
		value : 1,
		slide : function(event, ui) {
			$("#txtsenctranspcell5").val(ui.value);
		}
	});
	$("#txtsenctranspcell5").val($("#senctranspslidercell5").slider("value"));
	
	$("#senctranspslidercellfilha").slider({
		range : "max",
		min : 0,
		max : 1.09,
		step: 0.1,
		value : 1,
		slide : function(event, ui) {
			$("#txtsenctranspcellfilha").val(ui.value);
		}
	});
	$("#txtsenctranspcellfilha").val($("#senctranspslidercellfilha").slider("value"));	
	
	$("#senctranspslidercell2filha").slider({
		range : "max",
		min : 0,
		max : 1.09,
		step: 0.1,
		value : 1,
		slide : function(event, ui) {
			$("#txtsenctranspcell2filha").val(ui.value);
		}
	});
	$("#txtsenctranspcell2filha").val($("#senctranspslidercell2filha").slider("value"));	
	
	$("#senctranspslidercell3filha").slider({
		range : "max",
		min : 0,
		max : 1.09,
		step: 0.1,
		value : 1,
		slide : function(event, ui) {
			$("#txtsenctranspcell3filha").val(ui.value);
		}
	});
	$("#txtsenctranspcell3filha").val($("#senctranspslidercell3filha").slider("value"));	
	
	$("#senctranspslidercell4filha").slider({
		range : "max",
		min : 0,
		max : 1.09,
		step: 0.1,
		value : 1,
		slide : function(event, ui) {
			$("#txtsenctranspcell4filha").val(ui.value);
		}
	});
	$("#txtsenctranspcell4filha").val($("#senctranspslidercell4filha").slider("value"));	
	
	$("#senctranspslidercell5filha").slider({
		range : "max",
		min : 0,
		max : 1.09,
		step: 0.1,
		value : 1,
		slide : function(event, ui) {
			$("#txtsenctranspcell5filha").val(ui.value);
		}
	});
	$("#txtsenctranspcell5filha").val($("#senctranspslidercell5filha").slider("value"));	
	
	$("#sencstrokesecslider").slider({
		range : "max",
		min : 0,
		max : 10,
		value : 1,
		slide : function(event, ui) {
			$("#txtsencstrokesec").val(ui.value);
		}
	});
	$("#txtsencstrokesec").val($("#sencstrokesecslider").slider("value"));
	
	$("#sencstrokesecslidercell").slider({
		range : "max",
		min : 0,
		max : 10,
		value : 1,
		slide : function(event, ui) {
			$("#txtsencstrokeseccell").val(ui.value);
		}
	});
	$("#txtsencstrokeseccell").val($("#sencstrokesecslidercell").slider("value"));
	
	$("#sencstrokesecslidercell2").slider({
		range : "max",
		min : 0,
		max : 10,
		value : 1,
		slide : function(event, ui) {
			$("#txtsencstrokeseccell2").val(ui.value);
		}
	});
	$("#txtsencstrokeseccell2").val($("#sencstrokesecslidercell2").slider("value"));
	
	$("#sencstrokesecslidercell3").slider({
		range : "max",
		min : 0,
		max : 10,
		value : 1,
		slide : function(event, ui) {
			$("#txtsencstrokeseccell3").val(ui.value);
		}
	});
	$("#txtsencstrokeseccell3").val($("#sencstrokesecslidercell3").slider("value"));
	
	$("#sencstrokesecslidercell4").slider({
		range : "max",
		min : 0,
		max : 10,
		value : 1,
		slide : function(event, ui) {
			$("#txtsencstrokeseccell4").val(ui.value);
		}
	});
	$("#txtsencstrokeseccell4").val($("#sencstrokesecslidercell4").slider("value"));
	
	$("#sencstrokesecslidercell5").slider({
		range : "max",
		min : 0,
		max : 10,
		value : 1,
		slide : function(event, ui) {
			$("#txtsencstrokeseccell5").val(ui.value);
		}
	});
	$("#txtsencstrokeseccell5").val($("#sencstrokesecslidercell5").slider("value"));
	
	$("#sencstrokesecslidercellfilha").slider({
		range : "max",
		min : 0,
		max : 10,
		value : 1,
		slide : function(event, ui) {
			$("#txtsencstrokeseccellfilha").val(ui.value);
		}
	});
	$("#txtsencstrokeseccellfilha").val($("#sencstrokesecslidercellfilha").slider("value"));	
	
	$("#sencstrokesecslidercell2filha").slider({
		range : "max",
		min : 0,
		max : 10,
		value : 1,
		slide : function(event, ui) {
			$("#txtsencstrokeseccell2filha").val(ui.value);
		}
	});
	$("#txtsencstrokeseccell2filha").val($("#sencstrokesecslidercell2filha").slider("value"));	
	
	$("#sencstrokesecslidercell3filha").slider({
		range : "max",
		min : 0,
		max : 10,
		value : 1,
		slide : function(event, ui) {
			$("#txtsencstrokeseccell3filha").val(ui.value);
		}
	});
	$("#txtsencstrokeseccell3filha").val($("#sencstrokesecslidercell3filha").slider("value"));	
	
	$("#sencstrokesecslidercell4filha").slider({
		range : "max",
		min : 0,
		max : 10,
		value : 1,
		slide : function(event, ui) {
			$("#txtsencstrokeseccell4filha").val(ui.value);
		}
	});
	$("#txtsencstrokeseccell4filha").val($("#sencstrokesecslidercell4filha").slider("value"));	
	
	$("#sencstrokesecslidercell5filha").slider({
		range : "max",
		min : 0,
		max : 10,
		value : 1,
		slide : function(event, ui) {
			$("#txtsencstrokeseccell5filha").val(ui.value);
		}
	});
	$("#txtsencstrokeseccell5filha").val($("#sencstrokesecslidercell5filha").slider("value"));	
});



// Colorpicker
$(function() {
	$('#picker').colpick(null, "picker");
	
	$('#pickerfilha').colpick(null, "pickerfilha");

    $('#pickersencrell').colpick(null, "pickersencrell");
	
	$('#pickersencrellfilha').colpick(null, "pickersencrellfilha");

	$('#pickersencbord').colpick(null, "pickersencbord");
	
	$('#pickersencbordfilha').colpick(null, "pickersencbordfilha");

	$('#pickerbubrell').colpick(null, "pickerbubrell");
	
	$('#pickerbubrellfilha').colpick(null, "pickerbubrellfilha");

	$('#pickerbubbord').colpick(null, "pickerbubbord");
	
	$('#pickerbubbordfilha').colpick(null, "pickerbubbordfilha");

	$('#pickerclusrell').colpick(null, "pickerclusrell");

	$('#pickerclusbord').colpick(null, "pickerclusbord");

	$('#pickersencrellcell').colpick(null, "pickersencrellcell");
	
	$('#pickersencrellcellfilha').colpick(null, "pickersencrellcellfilha");
	
	$('#pickersencrellcell2').colpick(null, "pickersencrellcell2");
	
	$('#pickersencrellcell2filha').colpick(null, "pickersencrellcell2filha");
	
	$('#pickersencrellcell3').colpick(null, "pickersencrellcell3");
	
	$('#pickersencrellcell3filha').colpick(null, "pickersencrellcell3filha");
	
	$('#pickersencrellcell4').colpick(null, "pickersencrellcell4");
	
	$('#pickersencrellcell4filha').colpick(null, "pickersencrellcell4filha");
	
	$('#pickersencrellcell5').colpick(null, "pickersencrellcell5");
	
	$('#pickersencrellcell5filha').colpick(null, "pickersencrellcell5filha");	

	$('#pickersencbordcell').colpick(null, "pickersencbordcell");
	
	$('#pickersencbordcellfilha').colpick(null, "pickersencbordcellfilha");
	
	$('#pickersencbordcell2').colpick(null, "pickersencbordcell2");
	
	$('#pickersencbordcell2filha').colpick(null, "pickersencbordcell2filha");
	
	$('#pickersencbordcell3').colpick(null, "pickersencbordcell3");
	
	$('#pickersencbordcell3filha').colpick(null, "pickersencbordcell3filha");
	
	$('#pickersencbordcell4').colpick(null, "pickersencbordcell4");
	
	$('#pickersencbordcell4filha').colpick(null, "pickersencbordcell4filha");
	
	$('#pickersencbordcell5').colpick(null, "pickersencbordcell5");
	
	$('#pickersencbordcell5filha').colpick(null, "pickersencbordcell5filha");
	
	$('#pickersencbordsec').colpick(null, "pickersencbordsec");
	
	$('#pickersencbordsecfilha').colpick(null, "pickersencbordsecfilha");
	
	$('#pickersencbordseccell').colpick(null, "pickersencbordseccell");
	
	$('#pickersencbordseccellfilha').colpick(null, "pickersencbordseccellfilha");
	
	$('#pickersencbordseccell2').colpick(null, "pickersencbordseccell2");
	
	$('#pickersencbordseccell2filha').colpick(null, "pickersencbordseccell2filha");
	
	$('#pickersencbordseccell3').colpick(null, "pickersencbordseccell3");
	
	$('#pickersencbordseccell3filha').colpick(null, "pickersencbordseccell3filha");
	
	$('#pickersencbordseccell4').colpick(null, "pickersencbordseccell4");
	
	$('#pickersencbordseccell4filha').colpick(null, "pickersencbordseccell4filha");
	
	$('#pickersencbordseccell5').colpick(null, "pickersencbordseccell5");
	
	$('#pickersencbordseccell5filha').colpick(null, "pickersencbordseccell5filha");
});

// Add new scale
/*$(function() {
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
});*/

//$(function() {
//	$("#rules").accordion({
//		collapsible : true,
//		heightStyle : "fill"
//	});
//});
//$(function() {
//	$("#addnewrule").resizable({
//		minHeight : 140,
//		minWidth : 200,
//		resize : function() {
//			$("#rules").accordion("refresh");
//		}
//	});
//});

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
	//$("#chggrp").combobox();
//	$("#toggle").click(function() {
//		$("#chggrp").toggle();
//	});
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
	$("#lblsizefilha").combobox();
	$("#toggle").click(function() {
		$("#lblsizefilha").toggle();
	});
	$("#lblfamily").combobox();
	$("#toggle").click(function() {
		$("#lblfamily").toggle();
	});
	$("#lblfamilyfilha").combobox();
	$("#toggle").click(function() {
		$("#lblfamilyfilha").toggle();
	});	
//	$("#lblattr").combobox();
//	$("#toggle").click(function() {
//		$("#lblattr").toggle();
//	});
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
	
	$("#selfieldcat").combobox();
	$("#toggle").click(function() {
		$("#selfieldcat").toggle();
	});

	$("#selfieldcat2").combobox();
	$("#toggle").click(function() {
		$("#selfieldcat2").toggle();
	});

	$("#colorrampcat").combobox();
	$("#toggle").click(function() {
		$("#colorrampcat").toggle();
	});
});
//$(function() {
//	$("#normalcat").combobox();
//	$("#toggle").click(function() {
//		$("#normalcat").toggle();
//	});
//});
//$(function() {
//	$("#intervalcat").combobox();
//	$("#toggle").click(function() {
//		$("#intervalcat").toggle();
//	});
//});
$(function() {
	$("#selfieldbub").combobox();
	$("#toggle").click(function() {
		$("#selfieldbub").toggle();
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
	$('.colorrampfilha').colorramp();

	$('.colorrampfilha').change(function() {
		$(this).colorramp('getColors', reportColors);
	});

	$('.getcolorsbut').click(function() {
		$(this).prev('.colorrampfilha').colorramp('getColors', reportColors);
	});
});

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

	$('#chkfilterman').change(function() {
		if (this.checked)
			$('#filterbox').show();
		else
			$('#filterbox').hide();
	});
	$('#sencselsymb').change(function() {
		if (this.checked)
			$('#sencselect').show();
		else
			$('#sencselect').hide();
	});
	$('#selsecfieldcat').change(function() {
		if (this.checked)
			$('#divsecfield').show();
		else
			$('#divsecfield').hide();
	});
	$('#showlblscl').change(function() {
		if (this.checked)
			$('#escalaslbl').show();
		else
			$('#escalaslbl').hide();
	});
	$('#showlblsclfilha').change(function() {
		if (this.checked)
			$('#escalaslblfilha').show();
		else
			$('#escalaslblfilha').hide();
	});
	
	$('#dashline').change(function() {
		if (this.checked)
			$('#linedash').show();
		else
			$('#linedash').hide();
	});	
	$('#dashlinefilha').change(function() {
		if (this.checked)
			$('#linedashfilha').show();
		else
			$('#linedashfilha').hide();
	});	
	$('#dashlinecell').change(function() {
		if (this.checked)
			$('#linedashcell').show();
		else
			$('#linedashcell').hide();
	});
	$('#dashlinecell2').change(function() {
		if (this.checked)
			$('#linedashcell2').show();
		else
			$('#linedashcell2').hide();
	});
	$('#dashlinecell3').change(function() {
		if (this.checked)
			$('#linedashcell3').show();
		else
			$('#linedashcell3').hide();
	});
	$('#dashlinecell4').change(function() {
		if (this.checked)
			$('#linedashcell4').show();
		else
			$('#linedashcell4').hide();
	});
	$('#dashlinecell5').change(function() {
		if (this.checked)
			$('#linedashcell5').show();
		else
			$('#linedashcell5').hide();
	});
	$('#dashlinecellfilha').change(function() {
		if (this.checked)
			$('#linedashcellfilha').show();
		else
			$('#linedashcellfilha').hide();
	});
	$('#dashlinecell2filha').change(function() {
		if (this.checked)
			$('#linedashcell2filha').show();
		else
			$('#linedashcell2filha').hide();
	});
	$('#dashlinecell3filha').change(function() {
		if (this.checked)
			$('#linedashcell3filha').show();
		else
			$('#linedashcell3filha').hide();
	});
	$('#dashlinecell4filha').change(function() {
		if (this.checked)
			$('#linedashcell4filha').show();
		else
			$('#linedashcell4filha').hide();
	});
	$('#dashlinecell5filha').change(function() {
		if (this.checked)
			$('#linedashcell5filha').show();
		else
			$('#linedashcell5filha').hide();
	});
	
	$('#addnsc').change(function() {
		if (this.checked)
			$('#rulemasterfilha').show();
		else
			$('#rulemasterfilha').hide();
	});
	
//	
//		if ("#si".checked)
//			$('#escalas').show();		
////		else ("#no".checked)
////			$('#escalas').hide();
	
	
	definenewrule();
});

//show/hide através de um combobox
$(document).ready(function() {
    $('#chggrp').change(function() {
    	//Bubble desativado quando poligono ou linha
    	$("#radio #bubble").prop( "disabled", true );
        $('#bubble, [for="bubble"]').prop('disabled', true).addClass("ui-button-disabled ui-state-disabled");
        
        $("#radiofilha #bubblefilha").prop( "disabled", true );
        $('#bubblefilha, [for="bubblefilha"]').prop('disabled', true).addClass("ui-button-disabled ui-state-disabled");
//---------------------------        
            if ($("#chggrp option:selected").val() == "puntos") {
            	
            		$('#sencsize').show();  
            		$('#sencsizecell').show(); 
            		$('#sencsizecell2').show(); 
            		$('#sencsizecell3').show(); 
            		$('#sencsizecell4').show(); 
            		$('#sencsizecell5').show(); 
                    $('#ptnstipus').show();
                    $('#ptnstipuscell').show();
                    $('#ptnstipuscell2').show();
                    $('#ptnstipuscell3').show();
                    $('#ptnstipuscell4').show();
                    $('#ptnstipuscell5').show();                    
                    $('#sencstrokesec').hide();
                    $('#sencstrokeseccell').hide();
                    $('#sencstrokeseccell2').hide();
                    $('#sencstrokeseccell3').hide();
                    $('#sencstrokeseccell4').hide();
                    $('#sencstrokeseccell5').hide();                      
                    $("#pickersencrell").button({disabled : false});
                    $("#pickersencrellcell").button({disabled : false});
                    $("#pickersencrellcell2").button({disabled : false});
                    $("#pickersencrellcell3").button({disabled : false});
                    $("#pickersencrellcell4").button({disabled : false});
                    $("#pickersencrellcell5").button({disabled : false});
                    $("#pickersencbordsec").button({disabled : true});
                    $("#pickersencbordseccell").button({disabled : true});
                    $("#pickersencbordseccell2").button({disabled : true});
                    $("#pickersencbordseccell3").button({disabled : true});
                    $("#pickersencbordseccell4").button({disabled : true});
                    $("#pickersencbordseccell5").button({disabled : true});
                    
                    
                    
                    
//-----------------------------                   
                  //Bubble desativado quando poligono ou linha
                    $("#radio #bubble").prop( "disabled", false );
                    $('#bubble, [for="bubble"]').prop('disabled', false).removeClass("ui-button-disabled ui-state-disabled");
                    $("#radio #bubble").click();
                    $("#radio #sencillo").click();     
                    $("#bubble[type=radio]").attr('disabled', false);
                    
                    $("#radiofilha #bubblefilha").prop( "disabled", false );
                    $('#bubblefilha, [for="bubblefilha"]').prop('disabled', false).removeClass("ui-button-disabled ui-state-disabled");
                    $("#radiofilha #bubblefilha").click();
                    $("#radio #sencillo").click();     
                    $("#bubble[type=radio]").attr('disabled', false);
            }
//---------------------------
            else if ($("#chggrp option:selected").val() == "lineas") {
            		$('#sencsize').hide(); 
            		$('#sencsizecell').hide(); 
            		$('#sencsizecell2').hide(); 
            		$('#sencsizecell3').hide(); 
            		$('#sencsizecell4').hide(); 
            		$('#sencsizecell5').hide(); 
                    $('#ptnstipus').hide();
                    $('#ptnstipuscell').hide();
                    $('#ptnstipuscell2').hide();
                    $('#ptnstipuscell3').hide();
                    $('#ptnstipuscell4').hide();
                    $('#ptnstipuscell5').hide();
                    $('#sencstrokesec').show();
                    $('#sencstrokeseccell').show();
                    $('#sencstrokeseccell2').show();
                    $('#sencstrokeseccell3').show();
                    $('#sencstrokeseccell4').show();
                    $('#sencstrokeseccell5').show();                     
                    $("#pickersencrell").button({disabled : true});
                    $("#pickersencrellcell").button({disabled : true});
                    $("#pickersencrellcell2").button({disabled : true});
                    $("#pickersencrellcell3").button({disabled : true});
                    $("#pickersencrellcell4").button({disabled : true});
                    $("#pickersencrellcell5").button({disabled : true});
                    $("#pickersencbordsec").button({disabled : false});
                    $("#pickersencbordseccell").button({disabled : false});
                    $("#pickersencbordseccell2").button({disabled : false});
                    $("#pickersencbordseccell3").button({disabled : false});
                    $("#pickersencbordseccell4").button({disabled : false});
                    $("#pickersencbordseccell5").button({disabled : false});
                    
            }
            else if ($("#chggrp option:selected").val() == "poligonos") {
            		$('#sencsize').hide(); 
            		$('#sencsizecell').show(); 
            		$('#sencsizecell2').show(); 
            		$('#sencsizecell3').show(); 
            		$('#sencsizecell4').show(); 
            		$('#sencsizecell5').show(); 
                    $('#ptnstipus').hide();
                    $('#ptnstipuscell').hide();
                    $('#ptnstipuscell2').hide();
                    $('#ptnstipuscell3').hide();
                    $('#ptnstipuscell4').hide();
                    $('#ptnstipuscell5').hide();
                    $('#sencstrokesec').hide();
                    $('#sencstrokeseccell').hide();
                    $('#sencstrokeseccell2').hide();
                    $('#sencstrokeseccell3').hide();
                    $('#sencstrokeseccell4').hide();
                    $('#sencstrokeseccell5').hide();                     
                    $("#pickersencrell").button({disabled : false});
                    $("#pickersencrellcell").button({disabled : false});
                    $("#pickersencrellcell2").button({disabled : false});
                    $("#pickersencrellcell3").button({disabled : false});
                    $("#pickersencrellcell4").button({disabled : false});
                    $("#pickersencrellcell5").button({disabled : false});
                    $("#pickersencbordsec").button({disabled : true});
                    $("#pickersencbordseccell").button({disabled : true});
                    $("#pickersencbordseccell2").button({disabled : true});
                    $("#pickersencbordseccell3").button({disabled : true});
                    $("#pickersencbordseccell4").button({disabled : true});
                    $("#pickersencbordseccell5").button({disabled : true});
            }
    });
	
	$('#chggrp').change(function() {
            if ($("#chggrp option:selected").val() == "puntos") {
            		$('#sencsizefilha').show();
            		$('#sencsizecellfilha').show();
            		$('#sencsizecell2filha').show();
            		$('#sencsizecell3filha').show();
            		$('#sencsizecell4filha').show();
            		$('#sencsizecell5filha').show();
                    $('#ptnstipusfilha').show();
                    $('#ptnstipuscellfilha').show();
                    $('#ptnstipuscell2filha').show();
                    $('#ptnstipuscell3filha').show();
                    $('#ptnstipuscell4filha').show();
                    $('#ptnstipuscell5filha').show();
                    $('#sencstrokesecfilha').hide();
                    $('#sencstrokeseccellfilha').hide();
                    $('#sencstrokeseccell2filha').hide();
                    $('#sencstrokeseccell3filha').hide();
                    $('#sencstrokeseccell4filha').hide();
                    $('#sencstrokeseccell5filha').hide();                     
                    $("#pickersencrellfilha").button({disabled : false});
                    $("#pickersencrellcellfilha").button({disabled : false});
                    $("#pickersencrellcell2filha").button({disabled : false});
                    $("#pickersencrellcell3filha").button({disabled : false});
                    $("#pickersencrellcell4filha").button({disabled : false});
                    $("#pickersencrellcell5filha").button({disabled : false});
                    $("#pickersencbordsecfilha").button({disabled : true});
                    $("#pickersencbordseccellfilha").button({disabled : true});
                    $("#pickersencbordseccell2filha").button({disabled : true});
                    $("#pickersencbordseccell3filha").button({disabled : true});
                    $("#pickersencbordseccell4filha").button({disabled : true});
                    $("#pickersencbordseccell5filha").button({disabled : true});
            }
            else if ($("#chggrp option:selected").val() == "lineas") {
            		$('#sencsizefilha').hide();
            		$('#sencsizecellfilha').hide();
            		$('#sencsizecell2filha').hide();
            		$('#sencsizecell3filha').hide();
            		$('#sencsizecell4filha').hide();
            		$('#sencsizecell5filha').hide();
                    $('#ptnstipusfilha').hide();
                    $('#ptnstipuscellfilha').hide();
                    $('#ptnstipuscell2filha').hide();
                    $('#ptnstipuscell3filha').hide();
                    $('#ptnstipuscell4filha').hide();
                    $('#ptnstipuscell5filha').hide();
                    $('#sencstrokesecfilha').show();
                    $('#sencstrokeseccellfilha').show();
                    $('#sencstrokeseccell2filha').show();
                    $('#sencstrokeseccell3filha').show();
                    $('#sencstrokeseccell4filha').show();
                    $('#sencstrokeseccell5filha').show();                     
                    $("#pickersencrellfilha").button({disabled : true});
                    $("#pickersencrellcellfilha").button({disabled : true});
                    $("#pickersencrellcell2filha").button({disabled : true});
                    $("#pickersencrellcell3filha").button({disabled : true});
                    $("#pickersencrellcell4filha").button({disabled : true});
                    $("#pickersencrellcell5filha").button({disabled : true});
                    $("#pickersencbordsecfilha").button({disabled : false});
                    $("#pickersencbordseccellfilha").button({disabled : false});
                    $("#pickersencbordseccell2filha").button({disabled : false});
                    $("#pickersencbordseccell3filha").button({disabled : false});
                    $("#pickersencbordseccell4filha").button({disabled : false});
                    $("#pickersencbordseccell5filha").button({disabled : false});
            }
            else if ($("#chggrp option:selected").val() == "poligonos") {
            		$('#sencsizefilha').hide();
            		$('#sencsizecellfilha').hide();
            		$('#sencsizecell2filha').hide();
            		$('#sencsizecell3filha').hide();
            		$('#sencsizecell4filha').hide();
            		$('#sencsizecell5filha').hide();
                    $('#ptnstipusfilha').hide();
                    $('#ptnstipuscellfilha').hide();
                    $('#ptnstipuscell2filha').hide();
                    $('#ptnstipuscell3filha').hide();
                    $('#ptnstipuscell4filha').hide();
                    $('#ptnstipuscell5filha').hide();
                    $('#sencstrokesecfilha').hide();
                    $('#sencstrokeseccellfilha').hide();
                    $('#sencstrokeseccell2filha').hide();
                    $('#sencstrokeseccell3filha').hide();
                    $('#sencstrokeseccell4filha').hide();
                    $('#sencstrokeseccell5filha').hide();                    
                    $("#pickersencrellfilha").button({disabled : false});
                    $("#pickersencrellcellfilha").button({disabled : false});
                    $("#pickersencrellcell2filha").button({disabled : false});
                    $("#pickersencrellcell3filha").button({disabled : false});
                    $("#pickersencrellcell4filha").button({disabled : false});
                    $("#pickersencrellcell5filha").button({disabled : false});
                    $("#pickersencbordsecfilha").button({disabled : true});
                    $("#pickersencbordseccellfilha").button({disabled : true});
                    $("#pickersencbordseccell2filha").button({disabled : true});
                    $("#pickersencbordseccell3filha").button({disabled : true});
                    $("#pickersencbordseccell4filha").button({disabled : true});
                    $("#pickersencbordseccell5filha").button({disabled : true});
            }
    })
});

//????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
//$(document).ready(function() {
//    $('#normalcat').change(function() {
//            if ($("#normalcat option:selected").text() == "1") {                    
//                   	$('#catcellbox2').hide();
//            }
//            else if ($("#normal option:selected").text() == "2"){
//            		$('#catcellbox2').show();
//            }
//          else if ($("#normal option:selected").val() == "3") {
//            		$('#catcellbox2').show();
//            }   
//    });
//});		

//botoes de N I e S
$(function() {
//$(".editlbl").button();
$('#checklblN').change(function() {
	var isChecked = $(this).prop("checked");
	if (isChecked) {
		$("#checklblI").button("disable");
		$("#checklblS").button("disable");
	}
	else {
		$("#checklblI").button("enable");
		$("#checklblS").button("enable")
	}
});
$('#checklblI').change(function() {
	var isChecked = $(this).prop("checked");
	if (isChecked) {
		$("#checklblN").button("disable");
		$("#checklblS").button("disable");
	}
	else {
		$("#checklblN").button("enable");
		$("#checklblS").button("enable")
	}
});
$('#checklblS').change(function() {
	var isChecked = $(this).prop("checked");
	if (isChecked) {
		$("#checklblI").button("disable");
		$("#checklblN").button("disable");
	}
	else {
		$("#checklblI").button("enable");
		$("#checklblN").button("enable")
	}
});
$('#checklblNfilha').change(function() {
	var isChecked = $(this).prop("checked");
	if (isChecked) {
		$("#checklblIfilha").button("disable");
		$("#checklblSfilha").button("disable");
	}
	else {
		$("#checklblIfilha").button("enable");
		$("#checklblSfilha").button("enable")
	}
});
$('#checklblIfilha').change(function() {
	var isChecked = $(this).prop("checked");
	if (isChecked) {
		$("#checklblNfilha").button("disable");
		$("#checklblSfilha").button("disable");
	}
	else {
		$("#checklblNfilha").button("enable");
		$("#checklblSfilha").button("enable")
	}
});
$('#checklblSfilha').change(function() {
	var isChecked = $(this).prop("checked");
	if (isChecked) {
		$("#checklblIfilha").button("disable");
		$("#checklblNfilha").button("disable");
	}
	else {
		$("#checklblIfilha").button("enable");
		$("#checklblNfilha").button("enable")
	}
});
$('#checkinterval').change(function() {
	if (this.checked)
		$('#cellinter').hide();
	else
		$('#cellinter').show();
	
});
$('#checkintervalfilha').change(function() {
	if (this.checked)
		$('#cellinterfilha').hide();
	else
		$('#cellinterfilha').show();
	
});
});

//var rule = '';
//
//var sldsymb = $("#chggrp").change(function(){
//	if ($("#chggrp").val() == "puntos") {
//		'<PointSymbolizer>' + rule + '</PointSymbolizer>';
//	}
//	if ($("#chggrp").val() == "lineas") {
//		'<LineSymbolizer>' + rule + '</LineSymbolizer>';
//	}
//	if ($("#chggrp").val() == "poligonos") {
//		'<PolygonSymbolizer>' + rule + '</PolygonSymbolizer>';
//	}
//});	