var cachedCliparts = {};

var cachedFAicons = {};

var cachedDesignidea = {};

var cachedProducts = {};

var customer_id;

window.myButton = '';



function disableOther(button) {

	trace('button = ' + button);



	$j(".canvas-heading").removeClass("preview_portrait");

	if(button !== 'addproduct')	{ $j("#addproduct-panel").removeClass('cbp-spmenu-open'); $j("#addproduct").removeClass('active');}

	if(button !== 'addart')		{ $j("#addart-panel").removeClass('cbp-spmenu-open'); $j("#addart").removeClass('active');}

	if(button !== 'pickcolor')	{ $j("#pickcolor-panel").removeClass('cbp-spmenu-open');$j("#pickcolor").removeClass('active');}

	if(button !== 'addtext') 	{ $j("#addtext-panel").removeClass('cbp-spmenu-open'); $j("#addtext").removeClass('active'); $j("#common-panel").removeClass('cbp-spmenu-open');}

	if(button !== 'addextra') 	{ $j("#addextra-panel").removeClass('cbp-spmenu-open'); $j("#addextra").removeClass('active'); $j("#common-panel").removeClass('cbp-spmenu-open');}

	if(button !== 'addtitle') 	{ $j("#addtitle-panel").removeClass('cbp-spmenu-open'); $j("#addtitle").removeClass('active'); $j("#common-panel").removeClass('cbp-spmenu-open');}

	if(button !== 'addtimage') 	{ $j("#addtimage-panel").removeClass('cbp-spmenu-open'); $j("#addtimage").removeClass('active');}

	if(button !== 'addshape') 	{ $j("#addshape-panel").removeClass('cbp-spmenu-open'); $j("#addshape").removeClass('active'); $j("#common-panel").removeClass('cbp-spmenu-open');}

	if(button !== 'desingidea')	{ $j("#designidea-panel").removeClass('cbp-spmenu-open'); $j("#desingidea").removeClass('active');}

	if(button !== 'editpanel')	{ $j("#edit-panel").removeClass('cbp-spmenu-open'); $j("#edittimage").removeClass('active');}

	if(button !== 'addOneScissors')	{ $j("#addOneScissors-panel").removeClass('cbp-spmenu-open'); $j("#addOneScissors").removeClass('active');}

	if(button !== 'addPenTweezers')	{ $j("#addPenTweezers-panel").removeClass('cbp-spmenu-open'); $j("#addPenTweezers").removeClass('active');}

	if(button !== 'addlabel')	{ $j("#addlabel-panel").removeClass('cbp-spmenu-open'); $j("#addlabel").removeClass('active');}

	

	$j("#design_tooltip").hide();

	$j("#inst_text_tooltip").hide();

	$j("#inst_image_tooltip").hide();

	$j("#inst_shape_tooltip").hide();

	$j("#tool_font_family").hide();

	$j("#design_tooltip_edit_panel").hide();

	$j("#back_color_tooltip").hide();

	$j("#change_prd_tooltip").hide();

	$j("#add_text_tooltip").hide();

	$j("#add_title_tooltip").hide();

	$j("#add_extra_tooltip").hide();

	$j("#add_scissor_tooltip").hide();

	$j("#add_label_tooltip").hide();

}

function getVisibleSide(){

	var $side;

	$j(".main_image").each(

		function(){

			if($j(this).css("display") == "inline"){

				$side = $j(this);

			}

		}

	)

	return $side;

}

function setSharePanel(set){

		//$j(".product-area").css("left", 50 + ($j(".wraper_dt").width() - 50 - 255 - 65 - parseInt(getVisibleSide().attr('width')))/2+'px');

		//50 is top share panel y plus height

		$j(".product-area").css("top", 50 + ($j(".wraper_dt").height() - 50 - parseInt(getVisibleSide().attr('height')))/2+'px');



		/*Parth 6-5-2014 edited Custom Start*/

		//$j(".product-area").css("left", 10+'px');

		$j(".product-area").css("top", 50+'px');

		// Parth 6-5-2014 edited Custom End

}

$j("#tool_choose_prod_close").live("mouseup",function(evt){

	if(evt.button == 0){

		$j("#addproduct-panel").removeClass('cbp-spmenu-open');

		$j("#addproduct").removeClass('active');

		$j(".canvas-heading").addClass("preview_portrait");

	}

});

$j("#tool_pick_color_close").live("mouseup",function(evt){

	if(evt.button == 0){

		$j("#pickcolor-panel").removeClass('cbp-spmenu-open');

		$j("#pickcolor").removeClass('active');

		$j(".canvas-heading").addClass("preview_portrait");

	}

});

$j("#tool_add_art_close").live("mouseup",function(evt){

	if(evt.button == 0){

		$j("#addart-panel").removeClass('cbp-spmenu-open');

		$j("#addart").removeClass('active');

		$j(".canvas-heading").addClass("preview_portrait");

	}

});

$j("#tool_place_text_close").live("mouseup",function(evt){

	if(evt.button == 0){

		$j("#tool_font_family").hide();

		$j("#addtext-panel").removeClass('cbp-spmenu-open');

		$j("#common-panel").removeClass('cbp-spmenu-open');

		$j("#addtext").removeClass('active');

		$j(".canvas-heading").addClass("preview_portrait");

	}

});

$j("#tool_add_image_close").live("mouseup",function(evt){

	if(evt.button == 0){

		$j("#addtimage-panel").removeClass('cbp-spmenu-open');

		$j("#addtimage").removeClass('active');

		$j(".canvas-heading").addClass("preview_portrait");

	}

});

$j("#tool_add_shape_close").live("mouseup",function(evt){

	if(evt.button == 0){

		$j("#addshape-panel").removeClass('cbp-spmenu-open');

		$j("#addshape").removeClass('active');

		$j(".canvas-heading").addClass("preview_portrait");

	}

});

$j("#tool_design_idea_close").live("mouseup",function(evt){

	if(evt.button == 0){

		$j("#desingidea").removeClass('active');

		$j("#designidea-panel").removeClass('cbp-spmenu-open');

		$j(".canvas-heading").addClass("preview_portrait");

	}

});

$j("#tool_edit_close").live("mouseup",function(evt){

	if(evt.button == 0){

		$j("#edit-panel").removeClass('cbp-spmenu-open');

		$j("#common-panel").removeClass('cbp-spmenu-open');		

		$j(".canvas-heading").addClass("preview_portrait");

	}

});

$j("#addproduct").live("mouseup",function(evt) {

	if(evt.button == 0){	

		disableOther('addproduct');

		$j(this).addClass('active');

		$j("#addproduct-panel").addClass('cbp-spmenu-open');

	}

});

$j("#pickcolor").live("mouseup",function(evt) {

	if(evt.button == 0){

		disableOther('pickcolor');

		$j(this).addClass('active');

		$j("#pickcolor-panel").addClass('cbp-spmenu-open');

	}

});

$j("#addtitle").live("mouseup",function(evt) {

	if(evt.button == 0){

		disableOther('addtitle');

		$j(this).addClass('active');

		$j("#addtitle-panel").addClass('cbp-spmenu-open');

	}

});

$j("#addOneScissors").live("mouseup",function(evt) {

	if(evt.button == 0){

		disableOther('addOneScissors');

		$j(this).addClass('active');

		$j("#addOneScissors-panel").addClass('cbp-spmenu-open');

	}

});

$j("#addPenTweezers").live("mouseup",function(evt) {

	if(evt.button == 0){

		disableOther('addPenTweezers');

		$j(this).addClass('active');

		$j("#addPenTweezers-panel").addClass('cbp-spmenu-open');

	}

});

$j("#addart").live("click",function(evt) {

	if(evt.button == 0){	

		if(!faloaded){

			getrelatedfa();

			faloaded=1;

		}

		if (addFaFlag == 1){

			svgCanvas.selectOnly([replaceFAId],true);

			svgCanvas.setMode("select");			

			$j("#common-panel").addClass('cbp-spmenu-open');

		}

		else

		{

			disableOther('addart');

			$j(this).addClass('active');

			$j("#addart-panel").addClass('cbp-spmenu-open');

		}

	}

});

$j("#addtext").live("click", function(evt) { 

	trace("evt.button on addtext = " + evt.button);

	// Parth Edited 26-05-2014 to open "your txt" onload start 

	if(evt.button == 0){

				disableOther('addtext');

				$j(this).addClass('active');

				$j("#addtext-panel").addClass('cbp-spmenu-open');		

				//$j("#common-panel").addClass('cbp-spmenu-open');

						

		//svgCanvas.setMode('text');

		start_x = 352;

		start_y = 177;		

		started = true;

				

		//Parth Edited 7-5-2014 

		if ((!addTextFlag && addTextFlag == 0)) {

		$j( "#addtext-panel .myTextBox" ).removeClass("noheight");

			

			//Parth Edited 24-06-2014 Responsive Start

			if ($j(document).width() < 650)

			{

				var w  = myW/2;

				/*10-09-2014 :- Check for Setting  the element position*/

				if(addExtraFlag==1 ||(!(typeof replaceFAId === 'undefined') && !(replaceFAId == '')) || (!(typeof replaceSmileyId === 'undefined') && !(replaceSmileyId == '')) || (!(typeof imgExists === 'undefined') && !(imgExists == ''))){



					if (addTitleFlag == 0)

					{

						if(addExtraFlag == 1)

						{

							var h  = (useScissors == 1) ? (Math.abs(origmyY-myY)+origmyH/2)/2 : myH/4;

							var extraH  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/3 : myH/3;

							$j('.extraTextClass').attr('y',extraH);													

						}

						else

							var h  = (useScissors == 1) ? (Math.abs(origmyY-myY)+origmyH/2)/2 : myH/4;

					}

					else

					{

						if(addExtraFlag == 1)

						{

							var h  = (useScissors == 1) ? (Math.abs(origmyY-myY)+origmyH/3)/2 : myH/6;

							var titleH  = (useScissors == 1) ? (Math.abs(origmyY-myY)+origmyH/2)/2 : myH/4;

							var extraH  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/3 : myH/3;

							$j('.extraTextClass').attr('y',extraH);													

							$j('.titleClass').attr('y',titleH);													

						}

						else

						{

							var h  = (useScissors == 1) ? (Math.abs(origmyY-myY)+origmyH/2)/2 : myH/4;

							var titleH  = (useScissors == 1) ? (Math.abs(origmyY-myY)+(origmyH)/3)/2 : myH/4;

							$j('.titleClass').attr('y',titleH);	

						}

					}

				}

				else{

					var h  = (useScissors == 1) ? (Math.abs(origmyY-myY)+origmyH/2)/2 : myH/4;

					if(addTitleFlag == 1){

						var titleH  = (useScissors == 1) ? (Math.abs(origmyY-myY)+(origmyH))/2.3 : myH/3;

						$j('.titleClass').attr('y',titleH);						

					}

				}

				var font = 16; 

			}

			else

			{

				var w  = myW;

				/*10-09-2014 :- Check for Setting  the element position*/

				if(addExtraFlag==1 || !(typeof replaceFAId === 'undefined') && !(replaceFAId == '')  || !(typeof replaceSmileyId === 'undefined') && !(replaceSmileyId == '') || !(typeof imgExists === 'undefined') && !(imgExists == '')){

					if (addTitleFlag == 0){

						if(addExtraFlag == 1){

							var h  = (useScissors == 1) ? (Math.abs(origmyY-myY)+origmyH/2) : myH/2;

							var extraH  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/1.5 : 2*myH/3;

							$j('.extraTextClass').attr('y',extraH);													

						}

						else

							var h  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/2 : myH/2;

					}

					else{

						if(addExtraFlag == 1){

							var h  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/3 : myH/3;

							var titleH  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/2 : myH/2;

							var extraH  = (useScissors == 1) ? Math.abs(origmyY-myY)+2*origmyH/3 : 2*myH/3;

							$j('.extraTextClass').attr('y',extraH);													

							$j('.titleClass').attr('y',titleH);													

						}

						else{

							var h  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/2 : myH/2;

							var titleH  = (useScissors == 1) ? Math.abs(origmyY-myY)+2*origmyH/3 : 2*myH/3;

							$j('.titleClass').attr('y',titleH);	

						}

					}

				}

				else{

					var h  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/2 : myH/2;

					if(addTitleFlag == 1){

						var titleH  = (useScissors == 1) ? Math.abs(origmyY-myY)+2*origmyH/3 : 2*myH/3;

						$j('.titleClass').attr('y',titleH);						

					}

				}

				var font = 24; 

			}

			//Parth Edited 24-06-2014 Responsive End



			var newText = svgCanvas.addSvgElementFromJson({

				"element": "text",

				"curStyles": true,

				"attr": {

					// Parth 8-5-2014 Edited -- Re-edited 24-05-2014 Make it centre(this is Temporary fix it would be changed when the design changes)

					"x": w/2 ,

					"y": h,

					// Parth 8-5-2014 Edited -- Re-edited 24-05-2014 Make it centre End

					"id": svgCanvas.getNextId(),

					"fill": "#000000",

					"stroke-width": "0",

					"font-size": font,

					"font-family": "Arial", //Parth Edited 24-05-10 Make Arial as default font

					"text-anchor": "middle",

					"xml:space": "preserve",

					"opacity": "1",

					"class" : "textClass",

				}

			});

			newText.textContent = prbYourText;

			svgCanvas.keep = true;

			//try{

				svgCanvas.selectOnly([newText], false);

				 $j("#smileyalert").css("display","block");

				addTextFlag = 1;

				$j("#prb_name_title").val(prbYourText);

				

				if($j(document).width() < 650)

					$j("#prb_text_size").val("16");

				else

					$j("#prb_text_size").val("24");

				

				$j("#prb_fonts").val("Arial");

			}



			// Parth :- Edited 28-05-2014 - Start : Add Text Clickable (If text is added once then open the panel to edit it)

			else

			{

				svgCanvas.selectOnly([Oldtext],false);//store the selected in Oldtext	

				svgCanvas.setMode("select");				

			}

			// Parth :- Edited 28-05-2014 - End : Add Text Clickable (If text is added once then open the panel to edit it)

	}

});



$j("#addtitle").live("click", function(evt) { 

	

	if(evt.button == 0){

		disableOther('addtitle');

		$j(this).addClass('active');

		$j("#addtitle-panel").addClass('cbp-spmenu-open');		

		$j("#common-panel").addClass('cbp-spmenu-open');



		start_x = 752;

		start_y = 377;		

		started = true;

		

		//Parth Edited 7-5-2014 

		if (!addTitleFlag && addTitleFlag == 0) 

		{

			//Parth Edited 24-06-2014 Responsive Start

			if ($j(document).width() < 650)

			{

				var w  = myW/2;

				/*10-09-2014 :- Check for Setting  the element position*/

				if(addExtraFlag==1 || !(typeof replaceFAId === 'undefined') && !(replaceFAId == '') || !(typeof replaceSmileyId === 'undefined') && !(replaceSmileyId == '') || !(typeof imgExists === 'undefined') && !(imgExists == ''))

				{

					if (addTextFlag == 1)

					{

						if (addExtraFlag == 1)

						{

							var textH  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/6 : myH/6;

							var h  = (useScissors == 1) ? (Math.abs(origmyY-myY)+origmyH/2)/2 : myH/4;

							var extraH  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/3 : myH/3;

							$j('.extraTextClass').attr('y',extraH);													

						}

						else

						{

							var textH  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/4 : myH/4;

							var h  = (useScissors == 1) ? (Math.abs(origmyY-myY)+(2*origmyH)/3)/2 : myH/3;

						}

						$j('.textClass').attr('y',textH);	

					}

					else

					{

						var h  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/6 : myH/6;

					}

				}

				else

				{

					if(addTextFlag == 1)

						var h  = (useScissors == 1) ? (Math.abs(origmyY-myY)+(2*origmyH)/3)/2 : myH/3;

					else

						var h  = (useScissors == 1) ? (Math.abs(origmyY-myY)+(origmyH)/2)/2 : myH/4;

				}

				var font = 10;

			}

			else

			{

				var w  = myW;

				/*10-09-2014 :- Check for Setting  the element position*/

				if(addExtraFlag==1 || !(typeof replaceFAId === 'undefined') && !(replaceFAId == '')  || (!(typeof replaceSmileyId === 'undefined') && !(replaceSmileyId == '')) || (!(typeof imgExists === 'undefined') && !(imgExists == ''))){

					if (addTextFlag == 1)

					{

						if (addExtraFlag == 1){

							var textH  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/3 : myH/3;

							var h  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/2 : myH/2;

							var extraH  = (useScissors == 1) ? Math.abs(origmyY-myY)+2*origmyH/3 : 2*myH/3;

							$j('.extraTextClass').attr('y',extraH);													

						}

						else{

							var textH  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/2 : myH/2;

							var h  = (useScissors == 1) ? Math.abs(origmyY-myY)+2*origmyH/3 : 2*myH/3;

						}



						$j('.textClass').attr('y',textH);	

					}

					else

						var h  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/2 : myH/2;

				}

				else{

					if(addTextFlag == 1)

						var h  = (useScissors == 1) ? Math.abs(origmyY-myY)+(2*origmyH)/3 : 2*myH/3;

					else

						var h  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/2 : myH/2;

				}

				var font = 16; 

			}

			//Parth Edited 24-06-2014 Responsive Start



		$j( "#addtitle-panel" ).toggleClass("bounce");

			var newTitle = svgCanvas.addSvgElementFromJson({

				"element": "text",

				"curStyles": true,

				"attr": {

					"x": w/2 ,

					"y": h,

					"id": svgCanvas.getNextId(),

					"fill": "#000000",

					"stroke-width": "0",

					"font-size": font,

					"font-family": "Arial",					

					"text-anchor": "middle",

					"xml:space": "preserve",

					"opacity": "1",

					"class" : "titleClass",

				}

			});

			newTitle.textContent = prbYourTitle;

			

			svgCanvas.keep = true;

				svgCanvas.selectOnly([newTitle], false);

				 $j("#smileyalert").css("display","block");

				addTitleFlag = 1;

				$j("#prb_title").val(prbYourTitle);



				if($j(document).width() < 650)

					$j("#prb_title_size").val("10");

				else

					$j("#prb_title_size").val("16");

				

				$j("#prb_title_fonts").val("Arial");

			}

			else

			{

				svgCanvas.selectOnly([Oldtitle],false);//store the selected in Oldtext	

				svgCanvas.setMode("select");				

			}			

	}

});

function addExtraTextfield(prbExtraText)

{

		//Parth Edited 7-5-2014 

		if ((!addExtraFlag && addExtraFlag == 0) && prbExtraText != '') 

		{

			$j( "#addextra-panel .myTextBox" ).removeClass("noheight");

			

			//Parth Edited 24-06-2014 Responsive Start

			if ($j(document).width() < 650)

			{

				var w  = myW/2;

				/*10-09-2014 :- Check for Setting  the element position*/

				if (addTextFlag == 1 || addTitleFlag == 1)

					var h  = (useScissors == 1) ? (Math.abs(origmyY-myY)+(origmyH))/2.3 : myH/3;

				else

					var h  = (useScissors == 1) ? (Math.abs(origmyY-myY)+origmyH/4) : myH/4;

				/*else

					var h  = (useScissors == 1) ? (Math.abs(origmyY-myY)+origmyH/2)/2 : myH/4;*/



				var font = 10; 

			}

			else

			{

				var w  = myW;

				/*10-09-2014 :- Check for Setting  the element position*/

				if (addTextFlag == 1 || addTitleFlag == 1)

					var h  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/1.5 : myH/1.5;

				else

					var h  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/2 : myH/2;

				/*else

					var h  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/2 : myH/2;*/

				var font = 16; 

			}

			//Parth Edited 24-06-2014 Responsive End

			if(((typeof imgExists === 'undefined') || (imgExists == '')) && ((typeof replaceFAId === 'undefined') || (replaceFAId == '')) && ((typeof replaceSmileyId === 'undefined') || (replaceSmileyId == '')))

			{

				if(!$j.isEmptyObject($j('.textClass')))

				{

					if ($j(document).width() < 650){

						if (addTitleFlag == 1)

							var textH   = (useScissors == 1) ? (Math.abs(origmyY-myY)+origmyH/3)/2 : myH/6;

						else

							var textH   = (useScissors == 1) ? Math.abs(origmyY-myY)+(origmyH)/4 : myH/4;

					}

					else{

						if(addTitleFlag == 1)

							var textH   = (useScissors == 1) ? Math.abs(origmyY-myY)+(origmyH)/3 : myH/3;

						else

							var textH   = (useScissors == 1) ? Math.abs(origmyY-myY)+(origmyH)/2 : myH/2;

					}



					$j('.textClass').attr('y',textH);

				}



				if(!$j.isEmptyObject($j('.titleClass')))

				{

					if ($j(document).width() < 650)

						var titleH  = (useScissors == 1) ? (Math.abs(origmyY-myY)+origmyH/2)/2 : myH/4;

					else

						var titleH  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/2 : myH/2;



					$j('.titleClass').attr('y',titleH);

				}		

			}

			if((!(typeof replaceFAId === 'undefined') && !(replaceFAId == '')) || (!(typeof replaceSmileyId === 'undefined') && !(replaceSmileyId == '')) || (!(typeof imgExists === 'undefined') && !(imgExists == '')))

			{

				if(!$j.isEmptyObject($j('.textClass')))

				{

					if ($j(document).width() < 650){

						if(addTitleFlag == 1)

							var textH   = (useScissors == 1) ? (Math.abs(origmyY-myY)+origmyH/3)/2 : myH/6;

						else

							var textH   = (useScissors == 1) ? Math.abs(origmyY-myY)+(origmyH)/4 : myH/4;

					}

					else{

						if(addTitleFlag == 1)

							var textH   = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/3 : myH/3;

						else

							var textH   = (useScissors == 1) ? Math.abs(origmyY-myY)+(origmyH)/2 : myH/2;

					}



					$j('.textClass').attr('y',textH);

				}



				if(!$j.isEmptyObject($j('.titleClass')))

				{

					if ($j(document).width() < 650)

							var titleH  = (useScissors == 1) ? (Math.abs(origmyY-myY)+origmyH/2)/2 : myH/4;

					else

						var titleH  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/2 : myH/2;



					$j('.titleClass').attr('y',titleH);

				}		



			}



			var newExtraText = svgCanvas.addSvgElementFromJson({

				"element": "text",

				"curStyles": true,

				"attr": {

					// Parth 8-5-2014 Edited -- Re-edited 24-05-2014 Make it centre(this is Temporary fix it would be changed when the design changes)

					"x": w/2 ,

					"y": h,

					// Parth 8-5-2014 Edited -- Re-edited 24-05-2014 Make it centre End

					"id": svgCanvas.getNextId(),

					"fill": "#000000",

					"stroke-width": "0",

					"font-size": font,

					"font-family": "Arial", //Parth Edited 24-05-10 Make Arial as default font

					"text-anchor": "middle",

					"xml:space": "preserve",

					"opacity": "1",

					"class" : "extraTextClass",

				}

			});

			newExtraText.textContent = prbExtraText;

			svgCanvas.keep = true;

			//try{

				svgCanvas.selectOnly([newExtraText], false);

				 $j("#smileyalert").css("display","block");

				addExtraFlag = 1;

				$j("#prb_extra_field").val(prbYourText);

				if($j(document).width() < 650)

					$j("#prb_extra_size").val("10");

				else

					$j("#prb_extra_size").val("16");

				$j("#prb_extra_field").val(prbYourText);

				$j("#prb_extra_font").val("Arial");

		}

		else

		{

			$j( "#addextra-panel .myTextBox" ).removeClass("noheight");

			svgCanvas.selectOnly([OldExtraText],false);//store the selected in Oldtext	

			svgCanvas.setMode("select");				

		}

}

$j("#addextra").live("click", function(evt) { 

	

	if(evt.button == 0)

	{

		disableOther('addextra');

		$j(this).addClass('active');

		$j("#addextra-panel").addClass('cbp-spmenu-open');

		if(!addExtraFlag && addExtraFlag == 0)

		{

			$j("#svgroot").trigger({

				type:"click",

				button:0,

				"x": 0,

				"y": 0,

				"width": 0,

				"height": 0,

			});

			/*$j("#svgroot").trigger({

				type:"mousedown",

				button:0,

			});*/

			disableOther('addextra');

			$j(this).addClass('active');

			$j("#addextra-panel").addClass('cbp-spmenu-open');			

		}

		else

		{

			svgCanvas.selectOnly([OldExtraText],false);//store the selected in Oldtext	

			svgCanvas.setMode("select");			

		}

	}

});



$j("#addtimage").live("mouseup",function(evt) {

	if(evt.button == 0){

		if(!clipartsloaded){

			getrelatedclipart();

			clipartsloaded=1;

		}

		disableOther('addtimage');

		$j(this).addClass('active');

		$j("#addtimage-panel").addClass('cbp-spmenu-open');

	}

});

$j("#addshape").live("mouseup",function(evt) {

	if(evt.button == 0){

		disableOther('addshape');	

		$j(this).addClass('active');

		$j("#addshape-panel").addClass('cbp-spmenu-open');

		//$j("#desingidea").addClass('cbp-spmenu-open');

		$j("#tools_rect").hide();

	}

});

$j("#desingidea").live("mouseup",function(evt) {

	if(evt.button == 0){	

		if(!designIdeasloaded){

			//trace("length = " + $j($j("#designideaopt option")[0]).attr("value"));

			getrelateddesignidea($j($j("#designideaopt option")[0]).attr("value")); 

			designIdeasloaded=1;

		}

		disableOther('desingidea');

		$j(this).addClass('active');

		//$j("#designideaopt").val(1);

		$j("#designidea-panel").addClass('cbp-spmenu-open');

	}

});

$j("#inst_edit_panel").live("click",function(){

	$j("#design_tooltip_edit_panel").toggle();

	if($j("#design_tooltip_edit_panel").css("display") == "none"){

		//$j("#common-panel").css("margin-top","68px");

		//$j("#common-panel").addClass('cbp-spmenu-open');

	}else{

		//$j("#common-panel").css("margin-top","273px");

		//$j("#common-panel").removeClass('cbp-spmenu-open');

	}

});



$j("#back_color_panel").live("click",function()

{

	$j("#back_color_tooltip").toggle();

});



$j("#change_prd_panel").live("click",function()

{

	$j("#change_prd_tooltip").toggle();

});



$j("#add_text_panel").live("click",function()

{

	$j("#add_text_tooltip").toggle();

});



$j("#add_title_panel").live("click",function()

{

	$j("#add_title_tooltip").toggle();

});



$j("#add_extra_panel").live("click",function()

{

	$j("#add_extra_tooltip").toggle();

});



$j("#add_scissor_panel").live("click",function()

{

	$j("#add_scissor_tooltip").toggle();

});



$j("#add_pentweezer_panel").live("click",function()

{

	$j("#add_pentweezer_tooltip").toggle();

});



$j("#add_label_panel").live("click",function()

{

	$j("#add_label_tooltip").toggle();

});



$j("#inst").live("click",function(){

	$j("#design_tooltip").toggle();

});

$j("#inst_text").live("click",function(){

	$j("#inst_text_tooltip").toggle();

});

$j("#inst_image").live("click",function(){

	$j("#inst_image_tooltip").toggle();

});

$j("#tool_posleft, #tool_poscenter, #tool_posright, #tool_postop, #tool_posmiddle, #tool_posbottom").live("click",function(){

	var letter = this.id.replace('tool_pos','').charAt(0);

	trace(letter);

	svgCanvas.alignSelectedElements(letter, 'page');

});

$j("#inst_shape").live("click",function(){

	$j("#inst_shape_tooltip").toggle();

	if($j("#inst_shape_tooltip").css("display") == "none"){

		$j("#common-panel").css("margin-top","123px");

		//$j("#common-panel").addClass('cbp-spmenu-open');

	}else{

		$j("#common-panel").css("margin-top","158px");

		//$j("#common-panel").removeClass('cbp-spmenu-open');

	}

});

$j("#exit_studio").live("click",function(){

	$j.confirm_custom('Do you really want to exit??', function(ok) {

		if(ok){

			history.go(-1);

		}

	}); 

});



function loadScissorONCanvas(anchorTag)

{

	$j("#loaderImage").addClass('loader_pos');

	var href = anchorTag.rel;

	var target = window;



	trace("anchorTag = " + anchorTag);

	if(anchorTag.rel.indexOf('.svg') === -1) {

		var meta_str = JSON.stringify({

			name: $j(anchorTag).text()+'',

			id: href,

			className : 'scissorImage'

		});

			var scissorOrigin = location.origin;



		target.postMessage(meta_str, "*");

		

		var img = new Image();



		img.onload = function() {

			var canvasBg  = document.getElementById("canvasBackground");

			var canvas = document.createElement("canvas");

			this.className = 'scissorImage';

			



			var widthToUse  = ($j(document).width() > 650) ? img.width : img.width/2;

			var heightToUse = ($j(document).width() > 650) ? img.height : img.height/2;



			canvas.x = 0;

			canvas.y = 0;

			canvas.width = widthToUse;

			canvas.height = heightToUse;

			canvas.getContext("2d").drawImage(this,0,0,widthToUse,heightToUse);

			addScissorFlag = 1;

			try {

				var dataurl = canvas.toDataURL();

				dataurl = dataurl.replace(" ","+");

				trace("got dataurl");

			} catch(err) {

				$j.alert("Data URL conversion failed: " + err);

				var dataurl = "";

				trace("lost dataurl");

			}

			//if (/*navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1 &&*/ cartEditMode && cartEditMode == 1) 

				safariImportImage(dataurl, href,"scissorImage")

			//else

				//window.postMessage('|' + href + '|' + dataurl, "*");



			hideLoader();

			$j("#loaderImage").removeClass('loader_pos');

			

		}

		img.src = href;

		/*img.className = 'scissorImage';*/

	} 	

}



function loadImageONCanvas(anchorTag){

	/*10-09-2014 :- Check for Setting  the element position*/



	if((typeof imgExists === 'undefined') || (imgExists == ''))

	{

		if(addExtraFlag == 1)

		{

			if(!$j.isEmptyObject($j('.textClass')))

			{

				if ($j(document).width() < 650){

					if(addTitleFlag == 1)

						var textH   = (useScissors == 1) ? (Math.abs(origmyY-myY)+origmyH/3)/2 : myH/6;

					else

						var textH   = (useScissors == 1) ? (Math.abs(origmyY-myY)+origmyH/2)/2 : myH/4;

				}

				else{

					if(addTitleFlag == 1)

						var textH   = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/3 : myH/3;

					else

						var textH   = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/2 : myH/2;

				}



				$j('.textClass').attr('y',textH);

			}



			if(!$j.isEmptyObject($j('.titleClass')))

			{

				if ($j(document).width() < 650)

					var titleH  = (useScissors == 1) ? (Math.abs(origmyY-myY)+origmyH/2)/2 : myH/4;

				else

					var titleH  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/2 : myH/2;



				$j('.titleClass').attr('y',titleH);

			}

		}

		else

		{

			if(!$j.isEmptyObject($j('.textClass')))

			{

				if ($j(document).width() < 650)

					var textH   = (useScissors == 1) ? (Math.abs(origmyY-myY)+origmyH/2)/2 : myH/4;

				else

					var textH   = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/2 : myH/2;



				$j('.textClass').attr('y',textH);

			}



			if(!$j.isEmptyObject($j('.titleClass')))

			{

				if ($j(document).width() < 650){

					if (addTextFlag == 1)

						var titleH  = (useScissors == 1) ? (Math.abs(origmyY-myY)+origmyH/3) : myH/3;

					else

						var titleH  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/4 : myH/4;

				}

				else{

					if (addTextFlag == 1)

						var titleH  = (useScissors == 1) ? Math.abs(origmyY-myY)+2*origmyH/3 : 2*myH/3;

					else

						var titleH  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/2 : myH/2;

				}



				$j('.titleClass').attr('y',titleH);

			}

		}

	}



	if(!(typeof imgExists == 'undefined') && !(imgExists == ''))

	{

		svgCanvas.replaceImage(imgExists);

	}



	if(!(typeof replaceSmileyId === 'undefined') && !(replaceSmileyId == '')){

		svgCanvas.replaceEmoticon(replaceSmileyId,"smiley");

	}



	//showLoader();

	$j("#loaderImage").addClass('loader_pos');

	var href = anchorTag.rel;

	var target = window;



	trace("anchorTag = " + anchorTag);

	if(anchorTag.rel.indexOf('.svg') === -1) {

		var meta_str = JSON.stringify({

			name: $j(anchorTag).text()+'',

			id: href

		});

		//target.postMessage(meta_str, "*");

		if (!addImageFlag && addImageFlag == 0){

		var img = new Image();

		img.onload = function() {

			var canvasBg  = document.getElementById("canvasBackground");

			var canvas = document.createElement("canvas");

			var ratio = img.width/img.height;

			//Parth 8-5-2014 Edited (You assign the position and size of the Canvas from here)



			/*Start : 17-10-2014 : Max Width/Max Height*/

			if(useScissors == 1)

			{

				if (img.width > origmyW){

					img.width = origmyW;

					img.height = (img.width/ratio);

				}



				if (img.height > origmyH){

					img.height = origmyH;

					img.width  = ratio*img.height;

				}

			}

			else

			{

				if (img.width > myW){

					img.width = myW;

					img.height = (img.width/ratio);

				}

				

				if (img.height > myH){

					img.height = myH;

					img.width  = ratio*img.height;

				}

			}

			img.width = img.width - logXPad;

			img.height = img.height - logYPad;

			/*End : 17-10-2014 : Max Width/Max Height*/



			window.setImgWdth = img.width;

			window.setImgHght = img.height;



			canvas.width = img.width;

			canvas.height = img.height;

			canvas.x = 0;

			canvas.y = 0;



			canvas.getContext("2d").drawImage(this,0,0,canvas.width,canvas.height);



			addImageFlag = 1;



		    $j("#images_loaded").removeClass("noheight");



			$j("#prb_product_image_path").val(href);

		    $j("#smileyalert").css("display","block");

		    $j("#smiley_alert_img_spc").show();

			//Parth 8-5-2014 Edited End



			try {

				var dataurl = canvas.toDataURL();

				dataurl = dataurl.replace(" ","+"); 

				trace("got dataurl");

			} catch(err) {

				$j.alert("Data URL conversion failed: " + err);

				var dataurl = "";

				trace("lost dataurl");

			}

			safariImportImage(dataurl, href,"")

			$j("#loaderImage").removeClass('loader_pos');

			

		}

	}

		img.src = href;

	} else {

		var meta_str = JSON.stringify({

			name: $j(anchorTag).text(),

			id: href

		});

		target.postMessage(meta_str, "*");

		$j.get(href, function(data) {

			data = '|' + href + '|' + data;

			target.postMessage(data, "*");

		}, 'html');

	}

	if(added_images == '')	added_images = href;

	else					added_images += "||" + href;



	return false;

}



function safariImportImage(url,imageUrl,scissorClass)

{

	if (!(typeof scissorClass == 'undefined') && !(scissorClass== '')){



		var newImage = svgCanvas.addSvgElementFromJson({

			"element": "image",

			"attr": {

				"x": 25,

				"y": 25,

				"width": 0,

				"height": 0,

				"id": svgCanvas.getNextId(),

				"class" : scissorClass,

				"style": "pointer-events:inherit",

				"filter" : "url(#scissorMat)",

				"xlink:title":imageUrl

			}

		});

	}

	else{

		var newImage = svgCanvas.addSvgElementFromJson({

			"element": "image",

			"attr": {

				"x": 25,

				"y": 25,

				"width": 0,

				"height": 0,

				"id": svgCanvas.getNextId(),

				"style": "pointer-events:inherit",

				"xlink:title":imageUrl

			}

		});

	}





	svgCanvas.clearSelection();

	svgCanvas.addToSelection([newImage],false);

	svgCanvas.setImageURL(url);

}





function loadDesignIdeaONCanvas(file,type){

	$j.confirm_custom('Do you want to scrap your existing design in design area?', function(ok) { 

		showLoader(true);

		if(ok){

			svgEditor.clickClear_All(); 

		}

		svgEditor.processFile(base64_encode(file_get_contents(file)),type);

		hideLoader();

	}); 

}

function loadClipartONCanvas(file,type){

	showLoader();

	$j("#loaderImage").addClass('loader_pos');

	// Parth 23-05-2014 - Edited : Deletes a smiley and replaces it with another

	if(!(typeof replaceSmileyId === 'undefined') && !(replaceSmileyId == ''))

		svgCanvas.replaceSmiley(replaceSmileyId);



	svgEditor.processFile(base64_encode(file_get_contents(file)),type);

	hideLoader();

	$j("#loaderImage").removeClass('loader_pos');

	$j("#tool_unlink_use").trigger('click');

}



function loadFA(smileyHref,iconCode)

{

	showLoader();

	$j("#loaderImage").addClass('loader_pos');

	// Parth 23-05-2014 - Edited : Deletes a smiley and replaces it with another



	if(!(typeof replaceFAId === 'undefined') && !(replaceFAId == ''))

	{

		svgCanvas.replaceFA(replaceFAId);

		$j( "#addart-panel .input-area" ).removeClass("noheight");

	}



	/*10-09-2014 :- Check for Setting  the element position*/

	if(((typeof imgExists === 'undefined') || (imgExists == '')) && ((typeof replaceSmileyId === 'undefined') || (replaceSmileyId == '')))

	{

		if(addExtraFlag == 1)

		{

			if(!$j.isEmptyObject($j('.textClass')))

			{

				if ($j(document).width() < 650){

					if(addTitleFlag == 1)

						var textH   = (useScissors == 1) ? (Math.abs(origmyY-myY)+origmyH/3)/2 : myH/6;

					else

						var textH   = (useScissors == 1) ? (Math.abs(origmyY-myY)+origmyH/2)/2 : myH/4;

				}

				else{

					if(addTitleFlag == 1)

						var textH   = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/3 : myH/3;

					else

						var textH   = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/2 : myH/2;

				}



				$j('.textClass').attr('y',textH);

			}



			if(!$j.isEmptyObject($j('.titleClass')))

			{

				if ($j(document).width() < 650)

					var titleH  = (useScissors == 1) ? (Math.abs(origmyY-myY)+origmyH/2)/2 : myH/4;

				else

					var titleH  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/2 : myH/2;



				$j('.titleClass').attr('y',titleH);

			}

		}

		else

		{

			if(!$j.isEmptyObject($j('.textClass')))

			{

				if ($j(document).width() < 650)

					var textH   = (useScissors == 1) ? (Math.abs(origmyY-myY)+origmyH/2)/2 : myH/4;

				else

					var textH   = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/2 : myH/2;



				$j('.textClass').attr('y',textH);

			}



			if(!$j.isEmptyObject($j('.titleClass')))

			{

				if ($j(document).width() < 650){

					if (addTextFlag == 1)

						var titleH  = (useScissors == 1) ? (Math.abs(origmyY-myY)+origmyH/3) : myH/3;

					else

						var titleH  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/4 : myH/4;

				}

				else{

					if (addTextFlag == 1)

						var titleH  = (useScissors == 1) ? Math.abs(origmyY-myY)+2*origmyH/3 : 2*myH/3;

					else

						var titleH  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/2 : myH/2;

				}



				$j('.titleClass').attr('y',titleH);

			}

		}

	}

	

	//var elements = document.getElementsByClassName('textClass');console.log(elements.getAttribute());	



	if ($j(document).width() < 650)

	{

		var sCanW = myW/2;

		var sCanH = myH/2;

		var smXPad = 5;

		var smYPad = 5;

		var sImgW = 24; 

		var sImgH = 24; 

	}

	else

	{

		var sCanW = myW;

		var sCanH = myH;

		var smXPad = 10;

		var smYPad = 10;

		var sImgW = 40; 

		var sImgH = 40; 

	}



	var prd_Image = svgCanvas.addSvgElementFromJson({

				"element": "text",

				"curStyles": true,

				"attr": {

					"x": (sCanW-sImgW/2)-smXPad/2,

					"y": sCanH-smYPad,

					"id": svgCanvas.getNextId(),

					"font-size": sImgW,

					"fill": "#000000",

					"stroke-width": "0",

					"font-family": "FontAwesome",

					"text-anchor": "middle",

					"xml:space": "preserve",

					"opacity": "1",

					"class" : "FAImage",

		}

	});

	





	prd_Image.textContent = iconCode;

	svgCanvas.keep = true;

	svgCanvas.selectOnly([prd_Image]);

	$j( "#addart-panel .input-area" ).removeClass("noheight");

	$j("#prb_fa_text").val(iconCode);

	$j(".prb_fa_size option[value='40']").attr('selected', 'selected');

	$j("#prb_fa_size").val(40);

	$j(".prb_fa_content").addClass("contBtn");

	addFaFlag = 1;

	window.replaceFAId = prd_Image;

	$j("#replaceFA").val(replaceFAId);



	hideLoader();

	$j("#loaderImage").removeClass('loader_pos');

	$j("#tool_unlink_use").trigger('click');

}



function loadSmiley(smileyHref)

{

	/*10-09-2014 :- Check for Setting  the element position*/

	if((typeof imgExists === 'undefined') || (imgExists == ''))

	{

		if(addExtraFlag == 1)

		{

			if(!$j.isEmptyObject($j('.textClass')))

			{

				if ($j(document).width() < 650){

					if(addTitleFlag == 1)

						var textH   = (useScissors == 1) ? (Math.abs(origmyY-myY)+origmyH/3)/2 : myH/6;

					else

						var textH   = (useScissors == 1) ? (Math.abs(origmyY-myY)+origmyH/2)/2 : myH/4;

				}

				else{

					if(addTitleFlag == 1)

						var textH   = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/3 : myH/3;

					else

						var textH   = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/2 : myH/2;

				}



				$j('.textClass').attr('y',textH);

			}



			if(!$j.isEmptyObject($j('.titleClass')))

			{

				if ($j(document).width() < 650)

					var titleH  = (useScissors == 1) ? (Math.abs(origmyY-myY)+origmyH/2)/2 : myH/4;

				else

					var titleH  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/2 : myH/2;



				$j('.titleClass').attr('y',titleH);

			}

		}

		else

		{

			if(!$j.isEmptyObject($j('.textClass')))

			{

				if ($j(document).width() < 650)

					var textH   = (useScissors == 1) ? (Math.abs(origmyY-myY)+origmyH/2)/2 : myH/4;

				else

					var textH   = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/2 : myH/2;



				$j('.textClass').attr('y',textH);

			}



			if(!$j.isEmptyObject($j('.titleClass')))

			{

				if ($j(document).width() < 650){

					if (addTextFlag == 1)

						var titleH  = (useScissors == 1) ? (Math.abs(origmyY-myY)+origmyH/3) : myH/3;

					else

						var titleH  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/4 : myH/4;

				}

				else{

					if (addTextFlag == 1)

						var titleH  = (useScissors == 1) ? Math.abs(origmyY-myY)+2*origmyH/3 : 2*myH/3;

					else

						var titleH  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/2 : myH/2;

				}



				$j('.titleClass').attr('y',titleH);

			}

		}

	}

	

	//var elements = document.getElementsByClassName('textClass');console.log(elements.getAttribute());	



	showLoader();

	$j("#loaderImage").addClass('loader_pos');

	// Parth 23-05-2014 - Edited : Deletes a smiley and replaces it with another



	if(!(typeof replaceSmileyId === 'undefined') && !(replaceSmileyId == '')){

		svgCanvas.replaceSmiley(replaceSmileyId);

	}



	if(!(typeof imgExists == 'undefined') && !(imgExists == ''))

	{

		svgCanvas.replaceEmoticon(imgExists,"image");

	}

	if ($j(document).width() < 650)

	{

		var sCanW = myW/2;

		var sCanH = myH/2;

		var smXPad = 5;

		var smYPad = 5;

		var sImgW = 24; 

		var sImgH = 24; 

	}

	else

	{

		var sCanW = myW;

		var sCanH = myH;

		var smXPad = 10;

		var smYPad = 10;

		var sImgW = 48; 

		var sImgH = 48; 

	}



	var prd_Image = svgCanvas.addSvgElementFromJson({

		"element": "image",

		"attr": {

			"x": 0+smXPad,

			"y": (sCanH-sImgH)-smYPad,

			"width":  sImgW,

			"height": sImgH,

			"class" : 'smileyImage',

			"id": svgCanvas.getNextId(),

			"style": "pointer-events:inherit"

		}

	});

	svgCanvas.setHref(prd_Image, smileyHref.rel);

	svgCanvas.selectOnly([prd_Image]);

	window.replaceSmileyId = prd_Image;

	$j("#replaceSmiley").val(replaceSmileyId);



	/*svgCanvas.setImageURL(smileyHref.rel);

	svgCanvas.updateContextPanel();*/



	hideLoader();

	$j("#loaderImage").removeClass('loader_pos');

	$j("#tool_unlink_use").trigger('click');

}



function trace(str){

	//console.log(str);

	return false;

}

function lazyLoaderImg(e)

{

	var img = new Image();

	img.src = e.getAttribute("data");

	img.onload = imageLoaded.bind(e);

}

function imageLoaded(){

	this.onload = null;

	this.src = this.getAttribute("data");

}

function confirm_product_load(prod_url){

	if(confirm(chgPrdText))

		window.location.href = prod_url;

	else

		return false;

}

function base64_encode(data) {

	var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

	var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,

    ac = 0,

    enc = "",

    tmp_arr = [];



	if (!data)	return data;



	do { // pack three octets into four hexets

		o1 = data.charCodeAt(i++);

		o2 = data.charCodeAt(i++);

		o3 = data.charCodeAt(i++);



		bits = o1 << 16 | o2 << 8 | o3;



		h1 = bits >> 18 & 0x3f;

		h2 = bits >> 12 & 0x3f;

		h3 = bits >> 6 & 0x3f;

		h4 = bits & 0x3f;

		// use hexets to index into b64, and append result to encoded string

		tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);

	} while (i < data.length);

	enc = tmp_arr.join('');

	var r = data.length % 3;

	return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);

}

function set_config_svg(w, h, x, y, page_id)

{

	width_x = $j("#img_"+page_id).attr('width');

	height_y = $j("#img_"+page_id).attr('height');

	svgEditor.setConfig({

		dimensions: [w, h],

		position: [x, y]

	});

	$j("#svgcanvas").css('width', width_x);

	$j("#svgcanvas").css('height', height_y);

//	$j("#svgcanvas").css('width', "400");

//	$j("#svgcanvas").css('height', "485");

	//Edited : End	

	$j("#canvasBackground").attr('x', x);

	$j("#canvasBackground").attr('y', y);

	//$j("#svgroot").attr('x', x);

	//$j("#svgroot").attr('y', y);

	$j("#svgcontent").attr('x', x);

	$j("#svgcontent").attr('y', y);

	$j("#current_page").val(page_id);

	$j("#selectorParentGroup").attr('transform',"translate("+x+","+y+")");

}



function changeProduct(url) {

	$j.confirm(chgPrdText, 

		function(ok) { 

			if(!ok){

				return false;

			} else{

				$j(window).unbind("beforeunload");

				window.location.href = url;

			}

		}

	);

}

function showalert(value) {

    $("#productchange").mb_open();

    changeurl = value;

};

function refreshpage() {

    window.location.href = changeurl;

};

function hexToR(h) {

	return parseInt((cutHex(h)).substring(0, 2), 16)

};



function hexToG(h) {

	return parseInt((cutHex(h)).substring(2, 4), 16)

};



function hexToB(h) {

	return parseInt((cutHex(h)).substring(4, 6), 16)

};



function cutHex(h) {

	return (h.charAt(0) == "#") ? h.substring(1, 7) : h

};

function showLoader(bool){

	$j("#loaderImage").show();

	trace("width = " + getBrowserSize()[0]);

	var center = (getBrowserSize()[0]-128)/2;

	//trace("center = " + $j("#loaderImage").width());

	if(bool){

		$j("#loaderImage").attr("style","left:"+center+"px");

	}else{

		$j("#loaderImage").removeAttr("style");

	}

	$j("#loaderImage-overlay").show();

}



function hideLoader(){

	$j("#loaderImage").hide();

	$j("#loaderImage-overlay").hide();

}

function getBrowserSize() {

	var myWidth = 0, myHeight = 0;

	if( typeof( window.innerWidth ) == 'number' ) {

		//Non-IE

		myWidth = window.innerWidth;

		myHeight = window.innerHeight;

	} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {

		//IE 6+ in 'standards compliant mode'

		myWidth = document.documentElement.clientWidth;

		myHeight = document.documentElement.clientHeight;

	} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {

		//IE 4 compatible

		myWidth = document.body.clientWidth;

		myHeight = document.body.clientHeight;

	}

	

	return [myWidth,myHeight];

}

function getrelatedsubcat(){

	showLoader();

	$j("#loaderImage").addClass('loader_pos');

	$j.ajax({

		type: 'POST',

		url: webpath + "design/index/getrelatedproducttype",

		cache: false,

		data: "prodcat_id=" + $j("#prod_type").val(),

		success: function (html) {

			if(html != '')	$j('#prod_sub_div_type').html(html);

			else

			{

				$j('#prod_sub_div_type').html('');

				getrelatedproduct($j("#prod_type").val());

			}

			hideLoader();

			$j("#loaderImage").removeClass('loader_pos');

		}

	});

}

function pageload_changecolor(colorid,colorcode,is_multicolor)

{

	showLoader();

	$j("#loaderImage").addClass('loader_pos');

	//Edited : Ashesh 27-2-2014

	//$j('#objectinputsize ul').hide();

	//Edited : End

	$j('#colorid_'+colorid).show();

	$j("#current_product_colorid").val(colorid);

	$j("#current_product_colorhash").val(colorcode);

	//for(var i=1; i<=no_of_side; i++)

	//{

		//var image_hidden1 = document.getElementById("img_"+i);

		//image_hidden1.name = i+"*##*"+colorcode;

		if(is_multicolor!='yes'){

			getMatrix(colorcode);

		}

	//}

	hideLoader();

	$j("#loaderImage").removeClass('loader_pos');

}

function getMatrix(color){

	color = strPad(color, 6, "0"); 

	color = color.substr(1, 6);

	var rclr = parseInt(color.substr(0, 2),16);

	var gclr = parseInt(color.substr(2, 2),16);

	var bclr = parseInt(color.substr(4, 2),16);  

	var matrix = Number(rclr / 255) + " 0 0 0 0 ";

	matrix += "0 " + Number(gclr / 255) + " 0 0 0 ";

	matrix += "0 0 " + Number(bclr / 255) + " 0 0 ";

	matrix += "0 0 0 1 0"; 

	applyMatrixFilter(matrix);

}

function getScissorMatrix(color){



	if (typeof color === 'undefined')

		color = '#FFFFFF';

		

	color = strPad(color, 6, "0"); 

	color = color.substr(1, 6);

	var rclr = parseInt(color.substr(0, 2),16);

	var gclr = parseInt(color.substr(2, 2),16);

	var bclr = parseInt(color.substr(4, 2),16);  

	var matrix = Number(rclr / 255) + " 0 0 0 0 ";

	matrix += "0 " + Number(gclr / 255) + " 0 0 0 ";

	matrix += "0 0 " + Number(bclr / 255) + " 0 0 ";

	matrix += "0 0 0 1 0"; 

	applyScissorMatrixFilter(matrix);

}

function strPad(input, pad_length, pad_string, pad_left)

 {

   // return input if length greater than padded length

   if (input.length >= pad_length)

    return input;

   

   // generate padding

   var paddedString = "";

   var cnt = pad_length - (input.length);

   for (var i = 0; i < cnt; i++)

    paddedString += pad_string;

   

   // concatonate results

   var resultStr = pad_left ? (paddedString + input) : (input + paddedString);

   

   // account for overflow if any

   if (resultStr.length > pad_length)

   {

    // chop off extra from result based on pad_type

    if (pad_left)

     resultStr = resultStr.substr((resultStr.length) - pad_length, resultStr.length);

    else

     resultStr = resultStr.substr(0, pad_length);

   }

   return resultStr;

  }

/*added by ajay*/

function applyMatrixFilter(matrixValue) {



	var gaussFilterElem = document.getElementById("feColorMatrix");	

	gaussFilterElem.setAttributeNS(null, "type", "matrix" );

	gaussFilterElem.setAttributeNS(null, "values", matrixValue );



	for(var i=1; i<=no_of_side; i++)

	{

		var gaussFilterElemIcon = document.getElementById("feColorMatrixIcon"+i);	

		if (typeof(gaussFilterElemIcon) != 'undefined' && gaussFilterElemIcon != null)

		{

			gaussFilterElemIcon.setAttributeNS(null, "type", "matrix" );

			gaussFilterElemIcon.setAttributeNS(null, "values", matrixValue );		

		}

	}

	

	

}



function applyScissorMatrixFilter(matrixValue) {

	var gaussFilterElem = document.getElementById("scissorMatMatrix");

	gaussFilterElem.setAttributeNS(null, "type", "matrix" );

	gaussFilterElem.setAttributeNS(null, "values", matrixValue );	

}



function numeric_validation(event)

{

	// Allow: backspace, delete, tab, escape, and enter

	//trace("event.keyCode = " + event.keyCode);

	if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || 

		 // Allow: Ctrl+A

		(event.keyCode == 65 && event.ctrlKey === true) || 

		 // Allow: home, end, left, right

		(event.keyCode >= 35 && event.keyCode <= 39)) {

			 // let it happen, don't do anything

			 return;

	}

	else {

		// Ensure that it is a number and stop the keypress

		if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {

			event.preventDefault(); 

		}   

	}

}

function pageload_changecolor_admin(colorid,colorcode)

{

	showLoader();

	$j("#loaderImage").addClass('loader_pos');

	$j('#objectinputsize ul').hide();

	$j('#colorid_'+colorid).show();

	$j("#current_product_colorid").val(colorid);

	$j("#current_product_colorhash").val(colorcode);

	//for(var i=1; i<=no_of_side; i++)

	//{

	//	var image_hidden1 = document.getElementById("img_"+i);

		//image_hidden1.name = i+"*##*"+colorcode;

		getMatrix(colorcode);

	//}

	$j("#loaderImage").removeClass('loader_pos');

	hideLoader();

}

function productImageLoaded(e){

	var ary = e.target.name.split("*##*");

	var image_hidden1 = e.target;

	var image1 = document.getElementById("img_"+ary[0]);

	var tempcanvas = document.getElementById("temp_"+ary[0]+"_canvas");

	var ctx = tempcanvas.getContext("2d");

	if(ary[1] == 'undefined')	ary[1] = "#FFFFFF";

	var newColor_r = hexToR(ary[1]);

	var newColor_g = hexToG(ary[1]);

	var newColor_b = hexToB(ary[1]);	

	

	tempcanvas.width = image_hidden1.width;

	tempcanvas.height = image_hidden1.height;



	ctx.drawImage(image_hidden1, 0, 0, image_hidden1.naturalWidth, image_hidden1.naturalHeight, 0, 0, image_hidden1.width, image_hidden1.height);

	var originalPixels = ctx.getImageData(0, 0, image_hidden1.width, image_hidden1.height);

	var currentPixels = ctx.getImageData(0, 0, image_hidden1.width, image_hidden1.height);



	image_hidden1.onload = null;

	if(!originalPixels){

		$j.alert("originalPixels not loaded.");

		return; // Check if image has loaded

	}

	for(var I = 0, L = originalPixels.data.length; I < L; I += 4)

	{

		if(currentPixels.data[I + 3] > 0) // If it's not a transparent pixel

		{

			currentPixels.data[I] = originalPixels.data[I] / 255 * newColor_r;

			currentPixels.data[I + 1] = originalPixels.data[I + 1] / 255 * newColor_g;

			currentPixels.data[I + 2] = originalPixels.data[I + 2] / 255 * newColor_b;

		}

	}

	ctx.putImageData(currentPixels, 0, 0);

	image1.src = tempcanvas.toDataURL("image/png");

}



function changecolor(colorid,colorcode)

{

	$j("#loaderImage").addClass('loader_pos');

	//showLoader();

	$j('#objectinputsize ul').hide();

	$j('#colorid_'+colorid).show();

	if(colorcode == 'undefined')	colorcode = "#FFFFFF";

	var newColor_r = hexToR(colorcode);

	var newColor_g = hexToG(colorcode);

	var newColor_b = hexToB(colorcode);



	$j("#current_product_colorid").val(colorid);

	$j("#current_product_colorhash").val(colorcode);

	getMatrix(colorcode);



	$j("#loaderImage").removeClass('loader_pos');

}

function changemulticolor(colorid,img_src,json_obj)

{

	

	$j('#objectinputsize ul').hide();

	$j('#colorid_'+colorid).show();



	$j("#current_product_colorid").val(colorid);

	for(var i=1; i<=no_of_side; i++)

	{

		trace('jsonList.image[colorid]'+jsonList.image[colorid][i]);

		if ($j("#sideButton_"+i+" image").length > 0){

			$j("#sideButton_"+i+" image").attr("xlink:href",jsonList.image[colorid][i][0]);

			document.getElementById("img_"+i).setAttribute("xlink:href", jsonList.image[colorid][i][0]);

		}

	}

}

function countcolor() {

	return 0;

	var frontcolor = new Array();

	return totalcolor;

};

function getrelatedproduct(catid) {

	$j("#loaderImage").addClass('loader_pos');

	showLoader();

	if(typeof catid == "undefined" || catid == "")	catid = $j('#prod_sub_type').val();

	if(catid == 0)

	{

		$j("#productconatiner").html('');

		$j("#loaderImage").removeClass('loader_pos');

		hideLoader();

	}

	else 

	{

		if (cachedProducts[catid]) {

			var value = cachedProducts[catid];

			$j("#productconatiner").html(value);

			hideLoader();

		} else {

			$j.ajax({

				type: 'POST',

				url: webpath + "design/index/getrelatedproduct",

				cache: false,

				data: "cat_id=" + catid,

				success: function(html) {

					var insertvalue = '';

					if (html == '')	insertvalue = '<span class="itemnotfound">' + confignotfound + '</span>';

					else			insertvalue = html;

					cachedProducts[catid] = html;

					$j("#productconatiner").html(insertvalue);

					$j("#loaderImage").removeClass('loader_pos');				

					hideLoader();

				}

			});

		}

	}

};

function getrelatedproductadmin(catid) {

	$j("#loaderImage").addClass('loader_pos');

	showLoader();

	if(typeof catid == "undefined" || catid == "")	catid = $j('#prod_sub_type').val();

	if(catid == 0)

	{

		$j("#productconatiner").html('');

		$j("#loaderImage").removeClass('loader_pos');

		hideLoader();

	}

	else 

	{

		$j.ajax({

			type: 'POST',

			url: admin_product_url,

			cache: false,

			data: "cat_id=" + catid,

			success: function(html) {

				var insertvalue = '';

				if (html == '')	insertvalue = '<span class="itemnotfound">' + confignotfound + '</span>'

				else			insertvalue = html;

				$j("#productconatiner").html(insertvalue);

				$j("#loaderImage").removeClass('loader_pos');

				hideLoader();

			}

		});

	}

};



function getrelatedclipart(clipcatid) {

	showLoader();

	$j("#loaderImage").addClass('loader_pos');

	if (typeof clipcatid == "undefined" || clipcatid == '') {

		if($j("#clipartopt").val() == '')	clipcatid = $j('#firstclipartcat').val();

		else								clipcatid = $j("#clipartopt").val();

	}

	$j('#clipcatlist_' + clipcatid).addClass("selected");

	if (cachedCliparts[clipcatid]) {

        var value = cachedCliparts[clipcatid];

        $j("#clipartcontainer").html(value);

		hideLoader();

    } else {

		$j.ajax({

			type: 'POST',

			url: webpath + "code/getrelatedclipart.php",

			cache: false,

			data: "clipArtFolder=" + clipcatid,

			success: function(html) {

				cachedCliparts[clipcatid] = html;

				$j("#clipartcontainer").html(html);

				hideLoader();

				$j("#loaderImage").removeClass('loader_pos');

			}

		});

	}

};



function getrelatedfa() {

	showLoader();

	$j("#loaderImage").addClass('loader_pos');



	if (cachedFAicons["fa"]) {

        var value = cachedFAicons["fa"];

        $j("#clipartcontainer").html(value);

		hideLoader();

    } else {

		$j.ajax({

			type: 'POST',

			url: webpath + "code/getrelatedFA.php",

			cache: false,

			success: function(html) {

				cachedFAicons["fa"] = html;

				$j("#facontainer").html(html);

				hideLoader();

				$j("#loaderImage").removeClass('loader_pos');

			}

		});

	}

};



function decode64(str_xml) {

	var input = str_xml;

	var output = "";

	var hex = "";

	var chr1, chr2, chr3 = "";

	var enc1, enc2, enc3, enc4 = "";

	var i = 0;

	var b64array = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv" + "wxyz0123456789+/" + "=";

	var base64test = /[^A-Za-z0-9\+\/\=]/g;

	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	do {

		enc1 = b64array.indexOf(input.charAt(i++));

		enc2 = b64array.indexOf(input.charAt(i++));

		enc3 = b64array.indexOf(input.charAt(i++));

		enc4 = b64array.indexOf(input.charAt(i++));

		chr1 = (enc1 << 2) | (enc2 >> 4);

		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);

		chr3 = ((enc3 & 3) << 6) | enc4;

		output = output + String.fromCharCode(chr1);

		if (enc3 != 64) {

			output = output + String.fromCharCode(chr2);

		}

		if (enc4 != 64) {

			output = output + String.fromCharCode(chr3);

		}

		chr1 = chr2 = chr3 = "";

		enc1 = enc2 = enc3 = enc4 = "";

	} while (i < input.length);

	return unescape(output);

}



var Util = {

crossOriginUpload: function (url) {

		crossOriginUploadURI = webpath+"/design/index/downloadImage/index.php";		

        var def = jQuery.Deferred();

       

        jQuery.post(crossOriginUploadURI, { url: url }).done(function (response) {

            var img = new Image();

            img.src = mediapath + response;

            img.onload = function () {

                def.resolve(this);

            }

        });

        return def;

    }

}



$j("#upload_img_show").live("mouseup",function(){

	if($j("#upload_img_show").attr("disabled") != "disabled"){



		$j('#svg_image_upload').show();  

		//Parth Edited Start 14-6-14 : Hide Loaded Images and show Bg Color Instead

			disableOther('pickcolor');

			$j("#pickcolor").addClass('active');

			$j("#pickcolor-panel").addClass('cbp-spmenu-open');

		//Parth Edited End 14-6-14 : Hide Loaded Images and show Bg Color Instead



		// disableOther('editpanel');

		// $j("#edit-panel").addClass('cbp-spmenu-open');

		// $j('#images_loaded').show();



	}

});



$j("#upload_img_show_gallery").live("click",function(){

	//disableOther('editpanel');

	//$j("#edit-panel").addClass('cbp-spmenu-open');

	//$j('#images_loaded').show();

});


$j(".mybtn-back-cart").click(function(){
	alert("111");
    $j(".right-panel .active").removeClass("active"); 
   // $(".tab").addClass("active");        
});



function LocalImport(){

var LocalImport = (function () {

	$container = $j('#addtimage-panel');

	$button = $container.find('#upload_img_show');

	//$button.attr("disabled", "disabled");			

	$button.css('cursor', 'default');

	$container.find("#ihavetheright").change(function () {

		$button.toggleClass('disable_img');

		if($j(this).is(':checked'))

		{

			$button.removeAttr("disabled");

			$button.css('cursor', 'pointer');

		}

		else

		{

			$button.attr("disabled", "disabled");			

			$button.css('cursor', 'default');

		}

	})

})();

}

var canvasImport = (function (img) {

	$j('<li class="imgloader"><a rel="'+img+'" onclick="loadImageONCanvas(this)" class="imageclass" href="javascript:void(0);"><img onload="lazyLoaderImg(this)" src="'+img+'" data="'+img+'" class="lazy"></a></li>').appendTo('#flickerresult');

	

	$j("#loaderImage").addClass('loader_pos');

	var href = img;

	var target = window;

	

		var meta_str = JSON.stringify({

			id: href

		});

		//console.log('meta_str'+meta_str);

		target.postMessage(meta_str, "*");

		var img = new Image();

		img.onload = function() {

			var canvas = document.createElement("canvas");

			canvas.width = this.width;

			canvas.height = this.height;

			canvas.getContext("2d").drawImage(this,0,0);

			try {

				var dataurl = canvas.toDataURL();
 
				dataurl = dataurl.replace(" ","+"); 

			} catch(err) {

				$j.alert("Data URL conversion failed: " + err);

				var dataurl = "";

			}

			target.postMessage('|' + href + '|' + dataurl, "*");

			hideLoader();

			$j("#loaderImage").removeClass('loader_pos');

		}

		img.src = href;

	

	if(added_images == '')	added_images = href;

	else					added_images += "||" + href;

	

	return false; 

});



$j( document ).on( "orientationchange", function( event ) {

	//if($j(".cbp-spmenu-open").length){

		setSharePanel(true);

	//}else{

		//setSharePanel();

	//}

	//$j(".product-area").css("left", ($j(window).width() - $j("#product-image").width())/2+'px');

});

$j( window ).resize( function( event ) {

	//if($j(".cbp-spmenu-open").length){

	//trace("size changed");

		setSharePanel(true);

	//}else{

		//setSharePanel();

	//}

	//$j(".product-area").css("left", ($j(window).width() - $j("#product-image").width())/2+'px');

});



	//Edited Parth 20-5-14 function changed for our requirement

	$j('#prod_type').live("change",function()

	{

		var url = $j("#prod_type").val();

		$j.confirm(chgPrdText, 

		function(ok) { 

			if(!ok)

			{

				/*$j('#prod_type option#'+pid).prop('selected',true);*/

				$j("#prod_type option[id="+pid+"]").attr("selected", "selected");

				return false;

			} 

			else

			{

				if (window.location.href == url)

					return false;

				$j(window).unbind("beforeunload");

				window.location.href = url;

			}

		}

		);

	});

	//Edited End Parth 20-5-14 function changed for our requirement



	$j('#prod_sub_type').live("change",function(){getrelatedproduct();});

	

	function showHelp(basePath)

	{

		window.open(basePath,'Help','width=1024,height=600,scrollbars=yes');

	}

	function getsvg_str()

	{

		var page_id = $j("#current_page").val();

		var d = svgEditor.canvas;



		$j("#textsvg_"+page_id).val(d.getSvgString());

		/*Parth : Added a new svg that is default(for preview) becuase by adding filter for Customized Image it was causing issues in Preview*/

		

		$j("#prev_textsvg_1").val(d.getSvgString().replace('stroke="#000000"',''));



		if (useScissors == 1){

			$j("#prev_textsvg_1").val($j("#prev_textsvg_1").val().replace('"#scissorMat"','#scissorMat'));

		}

		else

			$j("#prev_textsvg_1").val($j("#prev_textsvg_1").val());

			

		var gaussFilterElem = document.getElementById("scissorMatMatrix");	

		var scissorFilter = gaussFilterElem.getAttributeNS(null, "values");



		var fId = '<defs><filter id="scissorMat"><feColorMatrix values="'+scissorFilter+'" type="matrix" id="scissorMatMatrix" /></filter></defs>';



		

		for(var i=1; i<=no_of_side; i++)

		{

			if(i==1)

			{

				if (useScissors == 1){

					/*text_svg1 = $j("#textsvg_1").val(d.getSvgString().replace('<svg','<svg x="'+origmyX+'" y="'+origmyY+'" '));*/

					$j("#textsvg_1").val(d.getSvgString().replace('"#scissorMat"','#scissorMat'));

					text_svg1 = $j("#textsvg_1").val($j("#textsvg_1").val().replace('</svg>',fId+'</svg>'));

					//console.log($j("#textsvg_1").val());

				}

				

				if (useScissors == 1){

					var recPreW = ($j(document).width() > 650) ? myW : myW/2 ;

					var recPreH = ($j(document).width() > 650) ? origmyH : origmyH/2 ;

					var recPreY = ($j(document).width() > 650) ? Math.abs(myY-origmyY) : Math.abs(myY-origmyY)/2 ;

				}

				

				prev_text_svg1 = (useScissors == 1) ? 

				$j("#prev_textsvg_1").val($j("#prev_textsvg_1").val().replace('<g>','<rect width="'+recPreW+'" height="'+recPreH+'" x="0" y="'+recPreY+'" fill="'+hexcode+'" style="pointer-events:none;"/>'+'<g>')) :

				/*$j("#prev_textsvg_1").val($j("#prev_textsvg_1").val().replace('<g>','<rect width="100%" height="100%" x="0" y="0" stroke="#000" fill="'+hexcode+'" style="pointer-events:none;"/>'+'<g>')) :*/

				$j("#prev_textsvg_1").val($j("#prev_textsvg_1").val().replace('<g>','<rect width="100%" height="100%" x="0" y="0" fill="'+hexcode+'" style="pointer-events:none"/>'+'<g>'));



				//prev_text_svg1 = $j("#prev_textsvg_1").val(d.getSvgString().replace('height="354"','height="154"'));

			}

			else if(i==2)

			{

				text_svg2 = $j("#textsvg_2").val();

			}

			else if(i==3)

			{

				text_svg3 = $j("#textsvg_3").val();

			}

			else if(i==4)

			{

				text_svg4 = $j("#textsvg_4").val();

			}

		}

	}



	function previewImage() {

		svgCanvas.clearSelection();

		getsvg_str();

		

		$j(".preview_holder").empty();

		str = $j("#product-image").html();



		if(!$j(str).attr("xmlns:xlink")){

			//str = str.replace("xlink=","xmlns:xlink=");

			if (curOs == "Windows" || curOs == "Android")

			{

				if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) 

					{

						str = str.replace(new RegExp('href=','g'),"xlink:href=");

					}

			}

		}



		var totalMarginLeft = 0;

		for(var i=0; i<$j("#product-image").find("image").length; i++){

			var id = "prev_img_" + i;

			$j("<div class = 'preview-image-slot' id='"+id+"' ></div>").appendTo($j(".preview_holder"));

			

			var l = pos_x[i+1];

			var t = pos_y[i+1];



			text_svg = $j("#prev_textsvg_" + (i+1)).val();

			

			/*t = document.getElementsByClassName('scissorImage');

			//t = $j("#prod_" + id).find('image .scissorImage', document.getElementsByClassName('scissorImage'));

			var so = '  <image xlink:href="'+mediaUrl+'scissor_1.png" filter="url(#scissorMat)" class="scissorImage" id="svg_1" height="150" width="210" y="50" x="103"/>';

			text_svg = text_svg.replace(so,"");*/



			//Edited : Ashesh 10-2-2014

			if($j(document).width()==640){ 

				x = x/2;

				y = y/2;

			}			

			//Edited : End

			/*width:'+myW+'px; height:'+origmyH+'px;*/

			/*if (useScissors == 1)

				t = origmyY; */



			var bgColor = (useScissors != 1) ? hexcode : "";

			/*border : 1px solid black; $j('<div style="position:absolute;background:'+ bgColor +';left:'+ l +'px; top:'+ t +'px ">' + text_svg + '</div>').appendTo($j("#"+id));*/

			$j('<div style=" position:absolute; overflow:hidden; left:'+ l +'px; top:'+ t +'px ">' + text_svg + '</div>').appendTo($j("#"+id));

			$j("<div id='prod_"+id+"' >	"+ str + "</div>").appendTo($j("#"+id));

			$j("#prod_" + id).find('filter').attr("id", "filter_"+id );

			images = $j("#prod_" + id).find('image').each(

				function(){

					$j(this).css("display","none");

					/*Parth Edited 08-07-14 : Main Image uses scissor Color filter*/

					/*$j(this).attr("filter","url(#filter_"+id+")");*/

					$j(this).removeAttr("id");

					$j(this).removeAttr("class");

				}

			)

			$j(images[i]).css("display", "block");//We can hide bg image from here display : none 

			if($j("#addLabel").val() == 1){

				$j(images[i]).css("display", "none");

			    $j(".scissorImage").hide();

			}



			var marginleft = (400 -  parseFloat($j(images[i]).attr("width")))/2;

			var margintop = (485 -  parseFloat($j(images[i]).attr("height")))/2;

			/*$j("#"+id).css("margin-top", margintop + "px");

			$j("#"+id).css("margin-left", marginleft + "px");*/

			totalMarginLeft += marginleft;

		}

		t = $j("#prod_" + id).find('image .scissorImage', document.getElementsByClassName('scissorImage'));

		//t.replace(t,'');

		//console.log(t);

		/*alert($j("#prod_" + id).html());

		var t = $j("#prod_" + id).find('image').attr("class", "scissorImage").remove();*/

		

		var previewHolderWidth = ($j("#product-image").find("image").length * 410) + totalMarginLeft + 5;

		//$j("#preview_window_container .preview_holder").css("width", previewHolderWidth+"px" );

		

};

	function downloadPreview(){

		png_data =[];

		curr_side_id = 1;

		action = "preview";

		generate_side();

	}

	function addtocart() {

		getsvg_str();

		png_data =[];

		curr_side_id = 1;

		action = "addtocart";

		generate_side();

		$j('.svgcanvas').hide();

		

	};

	

	function generate_side()

	{

		//showLoader(true);

		showLoadingAnimation();



		if(curr_side_id > no_of_side)

		{

			$j('.svgcanvas').show();



			if(typeof text_svg1 != "undefined" || typeof text_svg2 != "undefined" || typeof text_svg3 != "undefined" || typeof text_svg4 != "undefined" )

			{

				if(action == "addtocart"){

					$j.ajax({

						type: 'POST',

						url: webpath + "design/index/savebase64onserver",

						cache: false,

						data: "svg_1=" + encodeURIComponent(text_svg1) + "&svg_2=" + encodeURIComponent(text_svg2) + "&svg_3=" + encodeURIComponent(text_svg3) + "&svg_4=" + encodeURIComponent(text_svg4) + "&png_data1=" + png_data[0] + "&png_data2=" + png_data[1] + "&png_data3=" + png_data[2] + "&png_data4=" + png_data[3] + "&fonts_used="+fonts_used,

						success: function (html) {

							filenameobj = $j.parseJSON(html);

							trace("filenameobj = " + filenameobj);

							var m = 0;

							for(x in filenameobj){

								filearray[m] = filenameobj[x];

								m++;

							}

							hideLoader();

							afteraddtocart();

						},

						error:function (html) {$j.alert('error in saving'); hideLoader();}

					});

					

				}else if(action == "save"){



					var designName = $j.trim($j('#design_name').val());

					var color_id = $j('#current_product_colorid').val();

					$j.ajax({

						type: 'POST',

						url: webpath + "design/index/savemydesign",

						cache: false,

						data: "cust_id="+ customer_id +"&design_name="+designName+"&product_id="+ productid +"&save_str1=" + encodeURIComponent(text_svg1) +"&save_str2=" + encodeURIComponent(text_svg2) + "&save_str3=" + encodeURIComponent(text_svg3) +"&save_str4=" + encodeURIComponent(text_svg4) + "&png_data1=" + png_data[0] + "&png_data2=" + png_data[1] + "&png_data3=" + png_data[2] + "&png_data4=" + png_data[3] + "&color_id=" + color_id,

						success: function (html) {

							//document.getElementById("btn_save_design").disabled = false;

							$j('#design_name').val('');

							//$j("#svg_save_design_window").hide();

							$j.alert('Design saved');

							hideLoader();

						},

						error:function (html) {$j.alert('error in saving'); hideLoader();}

					});

				}else if(action == 'share'){

					//shareDesign();

					var designName = 'Shared design';

					var imageUrl;

					var color_id = $j('#current_product_colorid').val();

					$j.ajax({

						type: 'POST',

						url: webpath + "design/index/sharemydesign",

						cache: false,

						data: "cust_id="+ customer_id +"&design_name="+designName+"&product_id="+ productid +"&save_str1=" + encodeURIComponent(text_svg1) +"&save_str2=" + encodeURIComponent(text_svg2) + "&save_str3=" + encodeURIComponent(text_svg3) +"&save_str4=" + encodeURIComponent(text_svg4) + "&png_data1=" + png_data[0] + "&png_data2=" + png_data[1] + "&png_data3=" + png_data[2] + "&png_data4=" + png_data[3] + "&color_id=" + color_id,

						success: function (html) {

							filenameobj = $j.parseJSON(html);

							imageUrl = filenameobj['file_path'] + filenameobj['front_image'];

							ref_url = filenameobj['design_id'];

							if (shareType == 'facebook') {

								//var url = "http://www.facebook.com/sharer.php?s=100&p[title]="+designName+"&p[summary]=my design&p[url]="+ref_url;

								var url = "http://www.facebook.com/sharer.php?s=100&p[title]="+designName+"&p[url]="+ref_url+"&p[images][0]="+imageUrl;

								trace("url = "+ url);

							} else if (shareType == 'twitter') {

								var url = "https://twitter.com/share?url="+ref_url+"&text=My Design&tw_p=tweetbutton";

							} else if (shareType == 'pinterest') {

								var url = "http://pinterest.com/pin/create/button/?url="+ref_url+"&media="+imageUrl+"&description=My Design&ref="+ref_url;

							}

							window.open(url,"Share Design", "menubar=no,status=no,location=no,width=750,height=450,toolbar=no");

							hideLoader();

						},

						error:function (html) {$j.alert('error in saving'); hideLoader();}

					});

				}else if(action == 'preview'){



							if($j(".textClass").attr("x"))

								$j("#h_text_X").val($j(".textClass").attr("x"));

							if($j(".textClass").attr("y"))

								$j("#h_text_Y").val($j(".textClass").attr("y"));

							if($j(".textClass").attr("transform"))

								$j("#h_text_transform").val($j(".textClass").attr("transform"));





							if($j(".titleClass").attr("x"))

								$j("#h_title_X").val($j(".titleClass").attr("x"));

							if($j(".titleClass").attr("y"))

								$j("#h_title_Y").val($j(".titleClass").attr("y"));

							if($j(".titleClass").attr("transform"))

								$j("#h_title_transform").val($j(".titleClass").attr("transform"));



							if($j(".extraTextClass").attr("x"))

								$j("#h_extratext_X").val($j(".extraTextClass").attr("x"));

							if($j(".extraTextClass").attr("y"))

								$j("#h_extratext_Y").val($j(".extraTextClass").attr("y"));

							if($j(".extraTextClass").attr("transform"))

								$j("#h_extratext_transform").val($j(".extraTextClass").attr("transform"));



							if($j(".smileyImage").attr("x"))

								$j("#h_smiley_X").val($j(".smileyImage").attr("x"));

							if($j(".smileyImage").attr("y"))

								$j("#h_smiley_Y").val($j(".smileyImage").attr("y"));

							if($j(".smileyImage").attr("width"))

								$j("#h_smiley_width").val($j(".smileyImage").attr("width"));

							if($j(".smileyImage").attr("height"))

								$j("#h_smiley_height").val($j(".smileyImage").attr("height"));



							if($j(".FAImage").attr("x"))

								$j("#h_FA_X").val($j(".FAImage").attr("x"));

							if($j(".FAImage").attr("y"))

								$j("#h_FA_Y").val($j(".FAImage").attr("y"));

							if($j(".FAImage").attr("width"))

								$j("#h_FA_width").val($j(".FAImage").attr("width"));

							if($j(".FAImage").attr("height"))

								$j("#h_FA_height").val($j(".FAImage").attr("height"));



							if($j(".logoImage").attr("x"))

								$j("#h_image_X").val($j(".logoImage").attr("x"));

							if($j(".logoImage").attr("y"))

								$j("#h_image_Y").val($j(".logoImage").attr("y"));

							if($j(".logoImage").attr("width"))

								$j("#h_image_width").val($j(".logoImage").attr("width"));

							if($j(".logoImage").attr("height"))

								$j("#h_image_height").val($j(".logoImage").attr("height"));



							if (useScissors == 1)

							{

								if($j(".scissorImage").attr("x"))

									$j("#h_scissor_X").val($j(".scissorImage").attr("x"));

								if($j(".scissorImage").attr("y"))

									$j("#h_scissor_Y").val($j(".scissorImage").attr("y"));

								if($j(".scissorImage").attr("width"))

									$j("#h_scissor_width").val($j(".scissorImage").attr("width"));

								if($j(".scissorImage").attr("height"))

									$j("#h_scissor_height").val($j(".scissorImage").attr("height"));

							}



					$j.ajax({

						type: 'POST',

						url: baseUrl + "personalize/index/createCustomImage",//url: webpath + "code/previewPdf.php",

						cache: false,

						data: "png_data1=" + encodeURIComponent(png_data[0]) +"&cartEditMode="+cartEditMode+"&cartEditId="+cartEditId,

						success: function (html) { 

							$j("#prb_customized_image").val(html);

							

							hideLoader();

							//23-06-14 Issue Solved: Form was submitted before preview was generated

							var qtytoadd= $j("#qty").val();



							if(jQuery("#addLabel").val() == 1 && typeof option_type_id !== "undefined" && typeof option_id !== "undefined" && option_type_id != '' && option_id != ''){

								var urlAppend = "&option_id="+option_id+"&option_type_id="+option_type_id;

	        					document.productbuilderform.action = document.productbuilderform.action+"?qty="+qtytoadd+urlAppend;

									jQuery('#c_addLabel').trigger('click');//prop('checked', true);

									jQuery('#c_addLabel').trigger('click');//prop('checked', false);

								}

							else

	        					document.productbuilderform.action = document.productbuilderform.action+"?qty="+qtytoadd;



        					//document.productbuilderform.submit();

        					var valuePass = document.getElementById("addCartId");

        					productAddToCartForm.submit(valuePass)

							//23-06-14 Issue Solved: Form was submitted before preview was generated

						},

						error:function (html) {$j.alert('error in saving'); hideLoader();}

					});

				}

			}

			curr_side_id = 1;

			//Edited : Ashesh 21-2-2014  as problem was coming after clossing download window, so removed below code

			//svgCanvas.setSvgString($j("#textsvg_"+curr_side_id).val());

			///set_config_svg(design_area_x[curr_side_id], design_area_y[curr_side_id], pos_x[curr_side_id], pos_y[curr_side_id],curr_side_id);

			//Edited : End

			$j(".main_image").hide();

			$j("#img_"+curr_side_id).show();

		}

		else

		{

			if(!$j('#export_canvas').length) {

				$j('<canvas>', {id: 'export_canvas'}).hide().appendTo('body');

			}

			if(!customizationCan){

				customizationCan = document.createElement("canvas");

			}

			var d = svgEditor.canvas;

			var E = svgEditor.curConfig.dimensions;

			text_svg = $j("#textsvg_"+curr_side_id).val();



			/*Code to remove the Scissor from the SVG : 12-12-2014*/

			if ($j("#addLabel").val()==1){

				var sciX = ($j(document).width() < 650) ? (mySciSelX - myX)/2: (mySciSelX - myX);

				var sciY = ($j(document).width() < 650) ? ((scisely2 - sciImageHeight) - myY)/2: (scisely2 - sciImageHeight) - myY;

				var sciW = ($j(document).width() < 650) ? sciImageWidth/2 : sciImageWidth;

				var sciH = ($j(document).width() < 650) ? sciImageHeight/2: sciImageHeight;



				var so = '  <image xlink:href="'+mediaUrl+'scissor_1.png" filter="url(#scissorMat)" class="scissorImage" id="svg_1" height="'+sciH+'" width="'+sciW+'" y="'+sciY+'" x="'+sciX+'"/>';

					text_svg = text_svg.replace(so,"");

				var mso = '<image xlink:href="'+mediaUrl+'scissor_1.png" filter="url(#scissorMat)" class="scissorImage" id="svg_1" height="'+sciH+'" width="'+sciW+'" y="'+sciY+'" x="'+sciX+'"/>'

				//console.log(mso);

					text_svg = text_svg.replace(mso,"");

			}

			//console.log(text_svg)

			

			/*Code to remove the Scissor from the SVG : 12-12-2014*/



			canvg(customizationCan, text_svg, {renderCallback: completeCustomization});

		}

	}

	

	function completeCustomization(){

		if(!productImageCan){

			productImageCan = document.createElement("canvas");

		}

		else

		{

			//console.log("productImageCan used.");

		}

		$j(".main_image").hide();

		$j("#img_"+curr_side_id).show();

		productImageSvgStr = document.getElementById('product-image').innerHTML.trim();

		if(!$j(productImageSvgStr).attr("xmlns:xlink")){



			/*Parth Edited Start: 04-07-14 Code Commented to Solve Parse Error while Add to Cart especially in IE*/

			/*productImageSvgStr = productImageSvgStr.replace("xlink=","xmlns:xlink=");

			productImageSvgStr = productImageSvgStr.replace(new RegExp('href=','g'),"xlink:href=");*/

			/*Parth Edited End : 04-07-14 Code Commented to Solve Parse Error while Add to Cart especially in IE*/

		}

		/*console.log('prdCan'+productImageCan);

		console.log(2+productImageSvgStr);*/

		canvg(productImageCan, productImageSvgStr, {renderCallback: completeProductImage});

	}

	

	function completeProductImage(){

		mycanvas = document.createElement("canvas");

		/*Can change height-width of Image*/

		mycanvas.width = productImageCan.width;

		mycanvas.height = productImageCan.height;

		mycontext = mycanvas.getContext('2d');



		if (jQuery("#addLabel").val() == 0)

		{

			mycontext.drawImage(productImageCan, 0, 0, productImageCan.width, productImageCan.height);

		}



		mycontext.globalCompositeOperation = "source-over";

		

		//Parth Custom Code 16-6-14

		mycontext.fillStyle   = hexcode; // set canvas background color



		if($j(document).width()<650)

		{

			if (useScissors == 1)

			{

				mycontext.fillRect (myX/2,origmyY/2,myW/2,origmyH/2);				

			}

			else

				mycontext.fillRect (myX/2,myY/2,myW/2,myH/2);  // now fill the canvas	

		}

		else

		{

			if (useScissors == 1)

			{

				mycontext.fillRect (myX,origmyY,myW,origmyH);				

			}

			else

				mycontext.fillRect (myX,myY,myW,myH);  // now fill the canvas

		}



		//set_config_svg(design_area_x[curr_side_id], design_area_y[curr_side_id], pos_x[curr_side_id], pos_y[curr_side_id],curr_side_id);

		//var E = svgEditor.curConfig.dimensions;

		//console.log(productImageCan.height);

		//console.log("design_area_x[curr_side_id] = " + design_area_x[curr_side_id]);

		//console.log("design_area_y[curr_side_id] = " + design_area_y[curr_side_id]);

		//console.log("E[0] = " + E[0]);

		//console.log("E[1] = " +E[1]);



		mycontext.drawImage(customizationCan, pos_x[curr_side_id], pos_y[curr_side_id], design_area_x[curr_side_id], design_area_y[curr_side_id]);

		png_data[curr_side_id-1] = mycanvas.toDataURL("image/png");



		curr_side_id++;

		mycanvas.getContext('2d').clearRect(0, 0, mycanvas.width, mycanvas.height);

		customizationCan.getContext('2d').clearRect(0, 0, customizationCan.width, customizationCan.height);

		productImageCan.getContext('2d').clearRect(0, 0, productImageCan.width, productImageCan.height);



		generate_side();

	}

	





	function svgLoaded(e){

		var svg_image = e.target;

		mycanvas = document.getElementById("final_"+curr_side_id+"_canvas");

		mycontext = mycanvas.getContext('2d');

		set_config_svg(design_area_x[curr_side_id], design_area_y[curr_side_id], pos_x[curr_side_id], pos_y[curr_side_id],curr_side_id);

		var E = svgEditor.curConfig.dimensions;

		mycontext.drawImage(svg_image, pos_x[curr_side_id], pos_y[curr_side_id], E[0], E[1]);

		png_data[curr_side_id-1] = mycanvas.toDataURL("image/png");

		curr_side_id++;

		generate_side();

	}



	function afteraddtocart() {

		showLoader(true);

		var attribute_id = $j('#current_product_colorid').val();

		var counter = 0;

		var ajaxcounter = 0;

		var savestr = filearray;

		for (var i = 0; i < jsonsizeList.sizearr[attribute_id].sizeid.length; i++) {

			var sizeid = parseInt(jsonsizeList.sizearr[attribute_id].sizeid[i]);

			var quantity = parseInt($j('#size' + jsonsizeList.sizearr[attribute_id].sizeid[i] + "_" + attribute_id).val());

			if (quantity > 0) {

				counter++;

				$j.ajax({

					type: 'POST',

					// url: webpath + "/checkout/cart/add/",

					url: cartUrl,

					cache: false,

					data: "product=" + productid + "&qty=" + quantity + "&super_attribute[" + $j('#superattributeidsize').val() + "]=" + sizeid + "&super_attribute[" + $j('#superattributeidcolor').val() + "]=" + attribute_id + "&savestr=" + savestr + "&uploadedimages="+added_images+"&comment=" + "&totalcolor=" + countcolor(),

					success: function (html) {

						ajaxcounter++;

						if (ajaxcounter == counter) {

							hideLoader();

							$j(window).unbind("beforeunload");

							window.location = webpath + 'checkout/cart/';

						}

					}

				});

			}

		}

	};



	//$j('#tool_front_image').live("mousedown", showSide);

	function showSide(evt) {

		

		var imageId = evt.id.substring(evt.id.indexOf("_")+1);

		var cursor = svgCanvas.getElem('text_cursor');		

		if(cursor) {

			cursor.setAttribute('visibility', 'hidden');

		}

		//trace('$j("#current_page").val() = ' + $j("#current_page").val());

		//trace('imageId = ' + imageId);

		if($j("#current_page").val() == imageId)	return false;

		else

		{

			var E = svgEditor.curConfig.dimensions;

			var d = svgEditor.canvas;

			var previousSideId = $j("#current_page").val();

			$j(".main_image").hide();

			$j("#img_"+imageId).show();

			//side_1 = 1;

			//trace('d.getSvgString() = ' + d.getSvgString());

			//trace('svgCanvas.getSvgString() = ' + svgCanvas.getSvgString());

			$j("#textsvg_"+previousSideId).val(d.getSvgString());

			

			if($j("#textsvg_"+imageId).val() == "")

			{

				svgCanvas.setSvgString('<svg width="' + design_area_x[imageId] + '" height="' + design_area_y[imageId] + '" x="' + pos_x[imageId] + '" y="' + pos_y[imageId] + '" xmlns="http://www.w3.org/2000/svg"></svg>');

			}

			else	svgCanvas.setSvgString($j("#textsvg_"+imageId).val());

			set_config_svg(design_area_x[imageId], design_area_y[imageId], pos_x[imageId], pos_y[imageId],imageId);

		}

		setSharePanel();

	}

	function file_get_contents (url, flags, context, offset, maxLen) {

	  // Read the entire file into a string

	  //

	  // version: 906.111

	  // discuss at: http://phpjs.org/functions/file_get_contents

	  // +   original by: Legaev Andrey

	  // +      input by: Jani Hartikainen

	  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

	  // +   improved by: Brett Zamir (http://brett-zamir.me)

	  // +   input by: Raphael (Ao) RUDLER

	  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)

	  // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain without modifications.

	  // %        note 2: Synchronous by default (as in PHP) so may lock up browser. Can

	  // %        note 2: get async by setting a custom "phpjs.async" property to true and "notification" for an

	  // %        note 2: optional callback (both as context params, with responseText, and other JS-specific

	  // %        note 2: request properties available via 'this'). Note that file_get_contents() will not return the text

	  // %        note 2: in such a case (use this.responseText within the callback). Or, consider using

	  // %        note 2: jQuery's: $('#divId').load('http://url') instead.

	  // %        note 3: The context argument is only implemented for http, and only partially (see below for

	  // %        note 3: "Presently unimplemented HTTP context options"); also the arguments passed to

	  // %        note 3: notification are incomplete

	  // *     example 1: file_get_contents('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');

	  // *     returns 1: '123'

	  // Note: could also be made to optionally add to global $http_response_header as per http://php.net/manual/en/reserved.variables.httpresponseheader.php

	  var tmp, headers = [],

		newTmp = [],

		k = 0,

		i = 0,

		href = '',

		pathPos = -1,

		flagNames = 0,

		content = null,

		http_stream = false;

	  var func = function (value) {

		return value.substring(1) !== '';

	  };



	  // BEGIN REDUNDANT

	  this.php_js = this.php_js || {};

	  this.php_js.ini = this.php_js.ini || {};

	  // END REDUNDANT

	  var ini = this.php_js.ini;

	  context = context || this.php_js.default_streams_context || null;



	  if (!flags) {

		flags = 0;

	  }

	  var OPTS = {

		FILE_USE_INCLUDE_PATH: 1,

		FILE_TEXT: 32,

		FILE_BINARY: 64

	  };

	  if (typeof flags === 'number') { // Allow for a single string or an array of string flags

		flagNames = flags;

	  } else {

		flags = [].concat(flags);

		for (i = 0; i < flags.length; i++) {

		  if (OPTS[flags[i]]) {

			flagNames = flagNames | OPTS[flags[i]];

		  }

		}

	  }



	  if (flagNames & OPTS.FILE_BINARY && (flagNames & OPTS.FILE_TEXT)) { // These flags shouldn't be together

		throw 'You cannot pass both FILE_BINARY and FILE_TEXT to file_get_contents()';

	  }



	  if ((flagNames & OPTS.FILE_USE_INCLUDE_PATH) && ini.include_path && ini.include_path.local_value) {

		var slash = ini.include_path.local_value.indexOf('/') !== -1 ? '/' : '\\';

		url = ini.include_path.local_value + slash + url;

	  } else if (!/^(https?|file):/.test(url)) { // Allow references within or below the same directory (should fix to allow other relative references or root reference; could make dependent on parse_url())

		href = this.window.location.href;

		pathPos = url.indexOf('/') === 0 ? href.indexOf('/', 8) - 1 : href.lastIndexOf('/');

		url = href.slice(0, pathPos + 1) + url;

	  }



	  if (context) {

		var http_options = context.stream_options && context.stream_options.http;

		http_stream = !! http_options;

	  }



	  if (!context || http_stream) {

		var req = this.window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();

		if (!req) {

		  throw new Error('XMLHttpRequest not supported');

		}



		var method = http_stream ? http_options.method : 'GET';

		var async = !! (context && context.stream_params && context.stream_params['phpjs.async']);



		if (ini['phpjs.ajaxBypassCache'] && ini['phpjs.ajaxBypassCache'].local_value) {

		  url += (url.match(/\?/) == null ? "?" : "&") + (new Date()).getTime(); // Give optional means of forcing bypass of cache

		}



		req.open(method, url, async);

		if (async) {

		  var notification = context.stream_params.notification;

		  if (typeof notification === 'function') {

			// Fix: make work with req.addEventListener if available: https://developer.mozilla.org/En/Using_XMLHttpRequest

			if (0 && req.addEventListener) { // Unimplemented so don't allow to get here

	/*

			  req.addEventListener('progress', updateProgress, false);

			  req.addEventListener('load', transferComplete, false);

			  req.addEventListener('error', transferFailed, false);

			  req.addEventListener('abort', transferCanceled, false);

			  */

			} else {

			  req.onreadystatechange = function (aEvt) { // aEvt has stopPropagation(), preventDefault(); see https://developer.mozilla.org/en/NsIDOMEvent

				// Other XMLHttpRequest properties: multipart, responseXML, status, statusText, upload, withCredentials

	/*

	  PHP Constants:

	  STREAM_NOTIFY_RESOLVE   1       A remote address required for this stream has been resolved, or the resolution failed. See severity  for an indication of which happened.

	  STREAM_NOTIFY_CONNECT   2     A connection with an external resource has been established.

	  STREAM_NOTIFY_AUTH_REQUIRED 3     Additional authorization is required to access the specified resource. Typical issued with severity level of STREAM_NOTIFY_SEVERITY_ERR.

	  STREAM_NOTIFY_MIME_TYPE_IS  4     The mime-type of resource has been identified, refer to message for a description of the discovered type.

	  STREAM_NOTIFY_FILE_SIZE_IS  5     The size of the resource has been discovered.

	  STREAM_NOTIFY_REDIRECTED    6     The external resource has redirected the stream to an alternate location. Refer to message .

	  STREAM_NOTIFY_PROGRESS  7     Indicates current progress of the stream transfer in bytes_transferred and possibly bytes_max as well.

	  STREAM_NOTIFY_COMPLETED 8     There is no more data available on the stream.

	  STREAM_NOTIFY_FAILURE   9     A generic error occurred on the stream, consult message and message_code for details.

	  STREAM_NOTIFY_AUTH_RESULT   10     Authorization has been completed (with or without success).



	  STREAM_NOTIFY_SEVERITY_INFO 0     Normal, non-error related, notification.

	  STREAM_NOTIFY_SEVERITY_WARN 1     Non critical error condition. Processing may continue.

	  STREAM_NOTIFY_SEVERITY_ERR  2     A critical error occurred. Processing cannot continue.

	  */

				var objContext = {

				  responseText: req.responseText,

				  responseXML: req.responseXML,

				  status: req.status,

				  statusText: req.statusText,

				  readyState: req.readyState,

				  evt: aEvt

				}; // properties are not available in PHP, but offered on notification via 'this' for convenience

				// notification args: notification_code, severity, message, message_code, bytes_transferred, bytes_max (all int's except string 'message')

				// Need to add message, etc.

				var bytes_transferred;

				switch (req.readyState) {

				case 0:

				  //     UNINITIALIZED     open() has not been called yet.

				  notification.call(objContext, 0, 0, '', 0, 0, 0);

				  break;

				case 1:

				  //     LOADING     send() has not been called yet.

				  notification.call(objContext, 0, 0, '', 0, 0, 0);

				  break;

				case 2:

				  //     LOADED     send() has been called, and headers and status are available.

				  notification.call(objContext, 0, 0, '', 0, 0, 0);

				  break;

				case 3:

				  //     INTERACTIVE     Downloading; responseText holds partial data.

				  bytes_transferred = req.responseText.length * 2; // One character is two bytes

				  notification.call(objContext, 7, 0, '', 0, bytes_transferred, 0);

				  break;

				case 4:

				  //     COMPLETED     The operation is complete.

				  if (req.status >= 200 && req.status < 400) {

					bytes_transferred = req.responseText.length * 2; // One character is two bytes

					notification.call(objContext, 8, 0, '', req.status, bytes_transferred, 0);

				  } else if (req.status === 403) { // Fix: These two are finished except for message

					notification.call(objContext, 10, 2, '', req.status, 0, 0);

				  } else { // Errors

					notification.call(objContext, 9, 2, '', req.status, 0, 0);

				  }

				  break;

				default:

				  throw 'Unrecognized ready state for file_get_contents()';

				}

			  }

			}

		  }

		}



		if (http_stream) {

		  var sendHeaders = http_options.header && http_options.header.split(/\r?\n/);

		  var userAgentSent = false;

		  for (i = 0; i < sendHeaders.length; i++) {

			var sendHeader = sendHeaders[i];

			var breakPos = sendHeader.search(/:\s*/);

			var sendHeaderName = sendHeader.substring(0, breakPos);

			req.setRequestHeader(sendHeaderName, sendHeader.substring(breakPos + 1));

			if (sendHeaderName === 'User-Agent') {

			  userAgentSent = true;

			}

		  }

		  if (!userAgentSent) {

			var user_agent = http_options.user_agent || (ini.user_agent && ini.user_agent.local_value);

			if (user_agent) {

			  req.setRequestHeader('User-Agent', user_agent);

			}

		  }

		  content = http_options.content || null;

	/*

		  // Presently unimplemented HTTP context options

		  var request_fulluri = http_options.request_fulluri || false; // When set to TRUE, the entire URI will be used when constructing the request. (i.e. GET http://www.example.com/path/to/file.html HTTP/1.0). While this is a non-standard request format, some proxy servers require it.

		  var max_redirects = http_options.max_redirects || 20; // The max number of redirects to follow. Value 1 or less means that no redirects are followed.

		  var protocol_version = http_options.protocol_version || 1.0; // HTTP protocol version

		  var timeout = http_options.timeout || (ini.default_socket_timeout && ini.default_socket_timeout.local_value); // Read timeout in seconds, specified by a float

		  var ignore_errors = http_options.ignore_errors || false; // Fetch the content even on failure status codes.

		  */

		}



		if (flagNames & OPTS.FILE_TEXT) { // Overrides how encoding is treated (regardless of what is returned from the server)

		  var content_type = 'text/html';

		  if (http_options && http_options['phpjs.override']) { // Fix: Could allow for non-HTTP as well

			content_type = http_options['phpjs.override']; // We use this, e.g., in gettext-related functions if character set

			//   overridden earlier by bind_textdomain_codeset()

		  } else {

			var encoding = (ini['unicode.stream_encoding'] && ini['unicode.stream_encoding'].local_value) || 'UTF-8';

			if (http_options && http_options.header && (/^content-type:/im).test(http_options.header)) { // We'll assume a content-type expects its own specified encoding if present

			  content_type = http_options.header.match(/^content-type:\s*(.*)$/im)[1]; // We let any header encoding stand

			}

			if (!(/;\s*charset=/).test(content_type)) { // If no encoding

			  content_type += '; charset=' + encoding;

			}

		  }

		  req.overrideMimeType(content_type);

		}

		// Default is FILE_BINARY, but for binary, we apparently deviate from PHP in requiring the flag, since many if not

		//     most people will also want a way to have it be auto-converted into native JavaScript text instead

		else if (flagNames & OPTS.FILE_BINARY) { // Trick at https://developer.mozilla.org/En/Using_XMLHttpRequest to get binary

		  req.overrideMimeType('text/plain; charset=x-user-defined');

		  // Getting an individual byte then requires:

		  // responseText.charCodeAt(x) & 0xFF; // throw away high-order byte (f7) where x is 0 to responseText.length-1 (see notes in our substr())

		}



		try {

		  if (http_options && http_options['phpjs.sendAsBinary']) { // For content sent in a POST or PUT request (use with file_put_contents()?)

			req.sendAsBinary(content); // In Firefox, only available FF3+

		  } else {

			req.send(content);

		  }

		} catch (e) {

		  // catches exception reported in issue #66

		  return false;

		}



		tmp = req.getAllResponseHeaders();

		if (tmp) {

		  tmp = tmp.split('\n');

		  for (k = 0; k < tmp.length; k++) {

			if (func(tmp[k])) {

			  newTmp.push(tmp[k]);

			}

		  }

		  tmp = newTmp;

		  for (i = 0; i < tmp.length; i++) {

			headers[i] = tmp[i];

		  }

		  this.$http_response_header = headers; // see http://php.net/manual/en/reserved.variables.httpresponseheader.php

		}



		if (offset || maxLen) {

		  if (maxLen) {

			return req.responseText.substr(offset || 0, maxLen);

		  }

		  return req.responseText.substr(offset);

		}

		return req.responseText;

	  }

	  return false;

	}

