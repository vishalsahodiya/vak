/*
 * svg-editor.js
 *
 * Licensed under the MIT License
 *
 * Copyright(c) 2010 Alexis Deveria
 * Copyright(c) 2010 Pavol Rusnak
 * Copyright(c) 2010 Jeff Schiller
 * Copyright(c) 2010 Narendra Sisodiya
 *
 */

// Dependencies:
// 1) units.js
// 2) browser.js
// 3) svgcanvas.js

( this.svgEditorFunc = function() {

	document.addEventListener("touchstart", touchHandler, true);
	document.addEventListener("touchmove", touchHandler, true);
	document.addEventListener("touchend", touchHandler, true);
	document.addEventListener("touchcancel", touchHandler, true);

	if(!window.svgEditor) window.svgEditor = function($j) {

		var svgCanvas;
		var Editor = {};
		var is_ready = false;
		var defaultPrefs = {
			lang:'en',
			iconsize:'m',
			bkgd_color:'#FFF',
			bkgd_url:'',
			img_save:'embed'
			},
			curPrefs = {},
			// Note: Difference between Prefs and Config is that Prefs can be
			// changed in the UI and are stored in the browser, config can not

			curConfig = {
				canvasName: 'default',
				canvas_expansion: 3,
				dimensions: [640,480],
				
				initFill: {
					color: 'FF0000',  // solid red
					opacity: 1
				},
				initStroke: {
					width: 5,
					color: '000000',  // solid black
					opacity: 1
				},
				initOpacity: 1,
				imgPath: jspath+'images/',
				langPath: jspath+'locale/',
				extPath: jspath+'extensions/',
				jGraduatePath: jspath+'jgraduate/images/',
				//extensions: ['ext-markers.js','ext-connector.js', 'ext-shapes.js','ext-imagelib.js'],	//,'ext-helloworld.js'
				extensions: ['ext-markers.js', 'ext-shapes.js','ext-imagelib.js'],	//,'ext-helloworld.js'
				initTool: 'select',
				wireframe: false,
				colorPickerCSS: null,
				gridSnapping: false,
				gridColor: "#000",
				baseUnit: 'px',
				snappingStep: 10,
				showRulers: true
			},
			uiStrings = Editor.uiStrings = {
				common: {
					"ok":chgPrdOk,
					"cancel":chgPrdCnc,
					"key_up":"Up",
					"key_down":"Down",
					"key_backspace":"Backspace",
					"key_del":"Del"

				},
				// This is needed if the locale is English, since the locale strings are not read in that instance.
				layers: {
					"layer":"Layer"
				},
				notification: {
					"invalidAttrValGiven":"Invalid value given",
					"noContentToFitTo":"No content to fit to",
					"dupeLayerName":"There is already a layer named that!",
					"enterUniqueLayerName":"Please enter a unique layer name",
					"enterNewLayerName":"Please enter the new layer name",
					"layerHasThatName":"Layer already has that name",
					"QmoveElemsToLayer":"Move selected elements to layer \"%s\"?",
					"QwantToClear":"Do you want to clear the drawing?\nThis will also erase your undo history!",
					"QwantToOpen":"Do you want to open a new file?\nThis will also erase your undo history!",
					"QerrorsRevertToSource":"There were parsing errors in your SVG source.\nRevert back to original SVG source?",
					"QignoreSourceChanges":"Ignore changes made to SVG source?",
					"featNotSupported":"Feature not supported",
					"enterNewImgURL":"Enter the new image URL",
					"defsFailOnSave": "NOTE: Due to a bug in your browser, this image may appear wrong (missing gradients or elements). It will however appear correct once actually saved.",
					"loadingImage": "Loading image, please wait...",
					"saveFromBrowser": "Select \"Save As...\" in your browser to save this image as a %s file.",
					"noteTheseIssues": "Also note the following issues: ",
					"unsavedChanges": "There are unsaved changes.",
					"enterNewLinkURL": "Enter the new hyperlink URL",
					"errorLoadingSVG": "Error: Unable to load SVG data",
					"URLloadFail": "Unable to load from URL",
					"retrieving": 'Retrieving "%s" ...'
				}
			};

		var curPrefs = {}; //$j.extend({}, defaultPrefs);

		var customHandlers = {};

		Editor.curConfig = curConfig;

		Editor.tool_scale = 1;
		// Store and retrieve preferences
		$j.pref = function(key, val) {
			//alert(key+':'+val);
			if(val) curPrefs[key] = val;
			key = 'svg-edit-'+key;
			var host = location.hostname,
				onweb = host && host.indexOf('.') >= 0,
				store = (val != undefined),
				storage = false;
				//alert(store);
			// Some FF versions throw security errors here
			try {
				if(window.localStorage) { // && onweb removed so Webkit works locally
					storage = localStorage;
				}
			} catch(e) {}
			try {
				if(window.globalStorage && onweb) {
					storage = globalStorage[host];
				}
			} catch(e) {}

			if(storage) {
				if(store) storage.setItem(key, val);
					else if (storage.getItem(key)) return storage.getItem(key) + ''; // Convert to string for FF (.value fails in Webkit)
			} else if(window.widget) {
				if(store) widget.setPreferenceForKey(val, key);
					else return widget.preferenceForKey(key);
			} else {
				if(store) {
					var d = new Date();
					d.setTime(d.getTime() + 31536000000);
					val = encodeURIComponent(val);
					document.cookie = key+'='+val+'; expires='+d.toUTCString();
				} else {
					var result = document.cookie.match(new RegExp(key + "=([^;]+)"));
					return result?decodeURIComponent(result[1]):'';
				}
			}
		}

		Editor.setConfig = function(opts) {
			$j.each(opts, function(key, val) {
				// Only allow prefs defined in defaultPrefs
				//alert(key);
				if(key in defaultPrefs) {
					$j.pref(key, val);
				}
			});
			$j.extend(true, curConfig, opts);
			if(opts.extensions) {
				curConfig.extensions = opts.extensions;
			}

		}

		// Extension mechanisms must call setCustomHandlers with two functions: opts.open and opts.save
		// opts.open's responsibilities are:
		// 	- invoke a file chooser dialog in 'open' mode
		//	- let user pick a SVG file
		//	- calls setCanvas.setSvgString() with the string contents of that file
		// opts.save's responsibilities are:
		//	- accept the string contents of the current document
		//	- invoke a file chooser dialog in 'save' mode
		// 	- save the file to location chosen by the user
		Editor.setCustomHandlers = function(opts) {
			Editor.ready(function() {
				if(opts.open) {
					$j('#tool_open > input[type="file"]').remove();
					$j('#tool_open').show();
					svgCanvas.open = opts.open;
				}
				if(opts.save) {
					Editor.show_save_warning = false;
					svgCanvas.bind("saved", opts.save);
				}
				if(opts.pngsave) {
					svgCanvas.bind("exported", opts.pngsave);
				}
				customHandlers = opts;
			});
		}

		Editor.randomizeIds = function() {
			svgCanvas.randomizeIds(arguments)
		}

		Editor.init = function() {
			// For external openers
			(function() {
				// let the opener know SVG Edit is ready
				var w = window.opener;
				if (w) {
			    		try {
						var svgEditorReadyEvent = w.document.createEvent("Event");
						svgEditorReadyEvent.initEvent("svgEditorReady", true, true);
						w.document.documentElement.dispatchEvent(svgEditorReadyEvent);
			    		}
					catch(e) {}
				}
			})();

			(function() {
				// Load config/data from URL if given


				var urldata = $j.deparam.querystring(true);
				if(!$j.isEmptyObject(urldata)) {
					if(urldata.dimensions) {
						urldata.dimensions = urldata.dimensions.split(',');
					}

					if(urldata.extensions) {
						urldata.extensions = urldata.extensions.split(',');
					}

					if(urldata.bkgd_color) {
						urldata.bkgd_color = '#' + urldata.bkgd_color;
					}

					svgEditor.setConfig(urldata);

					var src = urldata.source;
					var qstr = $j.param.querystring();

					if(!src) { // urldata.source may have been null if it ended with '='
						if(qstr.indexOf('source=data:') >= 0) {
							src = qstr.match(/source=(data:[^&]*)/)[1];
						}
					}

					if(src) {
						if(src.indexOf("data:") === 0) {
							// plusses get replaced by spaces, so re-insert
							src = src.replace(/ /g, "+");
							Editor.loadFromDataURI(src);
						} else {
							Editor.loadFromString(src);
						}
					} else if(qstr.indexOf('paramurl=') !== -1) {
						// Get paramater URL (use full length of remaining location.href)
						svgEditor.loadFromURL(qstr.substr(9));
					} else if(urldata.url) {
						svgEditor.loadFromURL(urldata.url);
					}
				} else {
					var name = 'svgedit-' + Editor.curConfig.canvasName;
					var cached = window.localStorage.getItem(name);
					//trace("cached = " + cached);
					cached = '';
					if (cached) {
						Editor.loadFromString(cached);
					}
				}
			})();

			var extFunc = function() {
				$j.each(curConfig.extensions, function() {
					var extname = this;
					$j.getScript(curConfig.extPath + extname, function(d) {
						// Fails locally in Chrome 5
						if(!d) {
							var s = document.createElement('script');
							s.src = curConfig.extPath + extname;
							document.querySelector('head').appendChild(s);
						}
					});
				});

				var good_langs = [];

				$j('#lang_select option').each(function() {
					good_langs.push(this.value);
				});

				// 			var lang = ('lang' in curPrefs) ? curPrefs.lang : null;
				Editor.putLocale(null, good_langs);
			}

			// Load extensions
			// Bit of a hack to run extensions in local Opera/IE9
			if(document.location.protocol === 'file:') {
				setTimeout(extFunc, 100);
			} else {
				extFunc();
			}
			$j.svgIcons(curConfig.imgPath + 'svg_edit_icons.svg', {
				w:24, h:24,
				id_match: false,
 				no_img: !svgedit.browser.isWebkit(), // Opera & Firefox 4 gives odd behavior w/images
				fallback_path: curConfig.imgPath,
				fallback:{
					'new_image':'clear.png',
					'save':'save.png',
					'open':'open.png',
					'source':'source.png',
					'docprops':'document-properties.png',
					'wireframe':'wireframe.png',
					'select_node':'select_node.png',

					'undo':'undo.png',
					'redo':'redo.png',

					'pencil':'fhpath.png',
					'pen':'line.png',
					'square':'square.png',
					'rect':'rect.png',
					'fh_rect':'freehand-square.png',
					'circle':'circle.png',
					'ellipse':'ellipse.png',
					'fh_ellipse':'freehand-circle.png',
					'path':'path.png',
					'text':'text.png',
					'image':'image.png',
					'zoom':'zoom.png',

					'clone':'clone.png',
					'blur':'blur.png',
					'node_clone':'node_clone.png',
					'delete':'d_delete.png',
					'node_delete':'d_delete.png',
					'group':'shape_group.png',
					'ungroup':'shape_ungroup.png',
					'move_top':'move_top.png',
					'move_bottom':'move_bottom.png',
					'to_path':'to_path.png',
					'link_controls':'link_controls.png',
					'reorient':'reorient.png',
					'fill':'fill.png',					
					'stroke':'stroke.png',
					'opacity':'opacity.png',	

					'align':'align.png',
					'align_left':'align-left.png',
					'align_center':'align-center.png',
					'align_right':'align-right.png',
					'align_top':'align-top.png',
					'align_middle':'align-middle.png',
					'align_bottom':'align-bottom.png',
					'tool_ds':'tool_ds.png',
					

					'go_up':'go-up.png',
					'go_down':'go-down.png',

					'ok':'save.png',
					'cancel':'cancel.png',

					'arrow_right':'flyouth.png',
					'arrow_down':'dropdown.gif'
				},
				placement: {
					'#logo':'logo',

					//'#tool_clear div,#layer_new':'new_image',
					'#tool_save div':'save',
					'#tool_export div':'export',
					'#tool_open div div':'open',
					'#tool_import div div':'import',
					'#tool_source':'source',
					'#tool_docprops > div':'docprops',
					'#tool_wireframe':'wireframe',

					/*'#tool_undo':'undo',
					'#tool_redo':'redo',*/

					'#tool_fhpath':'pencil',
					'#tool_line':'pen',
					//'#mode_connect':'link_controls',
					'#tool_rect,#tools_rect_show':'rect',
					'#tool_square':'square',
					'#tool_fhrect':'fh_rect',
					'#tool_ellipse,#tools_ellipse_show':'ellipse',
					'#tool_circle':'circle',
					'#tool_fhellipse':'fh_ellipse',
					'#tool_path':'path',
					'#tool_text,#layer_rename':'text',
					'#tool_image':'image',
					'#tool_zoom':'zoom',

					'#tool_clone ,#tool_clone_multi':'clone',
					'#tool_node_clone':'node_clone',
					'#layer_delete,#tool_delete,#tool_delete_multi':'delete',
					'#tool_node_delete':'node_delete',
					'#tool_add_subpath':'add_subpath',
					'#tool_openclose_path':'open_path',
					'#tool_move_top':'move_top',
					'#tool_move_bottom':'move_bottom',
					'#tool_topath':'to_path',
					'#tool_node_link':'link_controls',
					'#tool_reorient':'reorient',
					'#tool_group':'group',
					'#tool_ungroup':'ungroup',
					'#tool_unlink_use':'group',
					/*'#tool_unlink_use':'unlink_use',*/

					'#tool_alignleft, #tool_posleft':'align_left',
					'#tool_aligncenter, #tool_poscenter':'align_center',
					'#tool_alignright, #tool_posright':'align_right',
					'#tool_aligntop, #tool_postop':'align_top',
					'#tool_alignmiddle, #tool_posmiddle':'align_middle',
					'#tool_alignbottom, #tool_posbottom':'align_bottom',
					'#cur_position':'align',
					'#tools_shapelib_show':'tool_ds',

					'#linecap_butt,#cur_linecap':'linecap_butt',
					'#linecap_round':'linecap_round',
					'#linecap_square':'linecap_square',

					'#linejoin_miter,#cur_linejoin':'linejoin_miter',
					'#linejoin_round':'linejoin_round',
					'#linejoin_bevel':'linejoin_bevel',

					'#url_notice':'warning',

					'#layer_up':'go_up',
					'#layer_down':'go_down',
					'#layer_moreopts':'context_menu',
					'#layerlist td.layervis':'eye',

					'#tool_source_save,#tool_docprops_save,#tool_prefs_save':'ok',
					'#tool_edit_close,#tool_pick_color_close,#tool_add_art_close,#tool_place_text_close,#tool_add_image_close,#tool_add_shape_close,#tool_design_idea_close,#tool_choose_prod_close,#tool_source_cancel,#tool_docprops_cancel,#tool_image_upload_cancel,#tool_login_window_cancel,#tool_addnote_cancel,#tool_beforeaddtocart_cancel, #tool_save_design_window_cancel, #tool_facebook_window_cancel, #tool_flickr_window_cancel, #tool_picasa_window_cancel, #tool_preview_window_cancel, #tool_prefs_cancel':'cancel',

					'#rwidthLabel, #iwidthLabel':'width',
					'#rheightLabel, #iheightLabel':'height',
					'#cornerRadiusLabel span':'c_radius',
					'#angleLabel':'angle',
					'#linkLabel,#tool_make_link,#tool_make_link_multi':'globe_link',
					'#zoomLabel':'zoom',
					'#tool_fill label': 'fill',
					'#tool_stroke .icon_label': 'stroke',
					'#group_opacityLabel': 'opacity',
					'#blurLabel': 'blur',
					'#font_sizeLabel': 'fontsize',

					'.flyout_arrow_horiz':'arrow_right',
					'.dropdown button, #main_button .dropdown':'arrow_down',
					'#palette .palette_item:first, #fill_bg, #stroke_bg':'no_color'
				},
				resize: {
					'#logo .svg_icon': 28,
					'.flyout_arrow_horiz .svg_icon': 5,
					'.layer_button .svg_icon, #layerlist td.layervis .svg_icon': 14,
					'.dropdown button .svg_icon': 7,
					'#main_button .dropdown .svg_icon': 9,
					'.palette_item:first .svg_icon' : 15,
					'#fill_bg .svg_icon, #stroke_bg .svg_icon': 19,
					'.toolbar_button button .svg_icon':16,
					'.stroke_tool div div .svg_icon': 20,
					'#tools_bottom label .svg_icon': 18,
					'#tool_clone':30
				},
				callback: function(icons) {
					$j('.toolbar_button button > svg, .toolbar_button button > img').each(function() {
						$j(this).parent().prepend(this);
					});

					var tleft = $j('#tools_left');
					if (tleft.length != 0) {
						var min_height = tleft.offset().top + tleft.outerHeight();
					}

					// Look for any missing flyout icons from plugins
					$j('.tools_flyout').each(function() {
						var shower = $j('#' + this.id + '_show');
						var sel = shower.attr('data-curopt');
						// Check if there's an icon here
						if(!shower.children('svg, img').length) {
							var clone = $j(sel).children().clone();
							if(clone.length) {
								clone[0].removeAttribute('style'); //Needed for Opera
								shower.append(clone);
							}
						}
					});

					svgEditor.runCallbacks();

					setTimeout(function() {
						$j('.flyout_arrow_horiz:empty').each(function() {
							$j(this).append($j.getSvgIcon('arrow_right').width(5).height(5));
						});
					}, 1);
				}
			});
			Editor.canvas = svgCanvas = new $j.SvgCanvas(document.getElementById("svgcanvas"), curConfig);

			Editor.show_save_warning = false;
			var palette = ["#000000", "#3f3f3f", "#7f7f7f", "#bfbfbf", "#ffffff",
			           "#ff0000", "#ff7f00", "#ffff00", "#7fff00",
			           "#00ff00", "#00ff7f", "#00ffff", "#007fff",
			           "#0000ff", "#7f00ff", "#ff00ff", "#ff007f",
			           "#7f0000", "#7f3f00", "#7f7f00", "#3f7f00",
			           "#007f00", "#007f3f", "#007f7f", "#003f7f",
			           "#00007f", "#3f007f", "#7f007f", "#7f003f",
			           "#ffaaaa", "#ffd4aa", "#ffffaa", "#d4ffaa",
			           "#aaffaa", "#aaffd4", "#aaffff", "#aad4ff",
			           "#aaaaff", "#d4aaff", "#ffaaff", "#ffaad4"
			           ],
				isMac = (navigator.platform.indexOf("Mac") >= 0),
				isWebkit = (navigator.userAgent.indexOf("AppleWebKit") >= 0),
				modKey = (isMac ? "meta+" : "ctrl+"), //
				path = svgCanvas.pathActions,
				undoMgr = svgCanvas.undoMgr,
				Utils = svgedit.utilities,
				default_img_url = curConfig.imgPath + "logo.png",
				workarea = $j("#workarea"),
				canv_menu = $j("#cmenu_canvas"),
				layer_menu = $j("#cmenu_layers"),
				exportWindow = null,
				tool_scale = 1,
				zoomInIcon = 'crosshair',
				zoomOutIcon = 'crosshair',
				ui_context = 'toolbars',
				orig_source = '',
				paintBox = {fill: null, stroke:null};

			// This sets up alternative dialog boxes. They mostly work the same way as
			// their UI counterparts, expect instead of returning the result, a callback
			// needs to be included that returns the result as its first parameter.
			// In the future we may want to add additional types of dialog boxes, since
			// they should be easy to handle this way.
			(function() {
				$j('#dialog_container').draggable({cancel:'#dialog_content, #dialog_buttons *', containment: 'window'});
				var box = $j('#dialog_box'), btn_holder = $j('#dialog_buttons');

				var dbox = function(type, msg, callback, defText) {
					$j('#dialog_content').html('<p>'+msg.replace(/\n/g,'</p><p>')+'</p>')
						.toggleClass('prompt',(type=='prompt'));
					btn_holder.empty();

					var ok = $j('<input type="button" id="btn_ok_dig" value="' + uiStrings.common.ok + '">').appendTo(btn_holder);

					if(type != 'alert') {
						$j('<input type="button" id="btn_cancel_dig" value="' + uiStrings.common.cancel + '">')
							.appendTo(btn_holder)
							.click(function() { box.hide();callback(false)});
					}

					if(type == 'prompt') {
						var input = $j('<input type="text">').prependTo(btn_holder);
						input.val(defText || '');
						input.bind('keydown', 'return', function() {ok.click();});
					}

					if(type == 'process') {
						ok.hide();
					}

					box.show();

					ok.click(function() {
						box.hide();
						var resp = (type == 'prompt')?input.val():true;
						if(callback) callback(resp);
					}).focus();

					if(type == 'prompt') input.focus();
				}

				$j.alert = function(msg, cb) { dbox('alert', msg, cb);};
				$j.confirm = function(msg, cb) { dbox('confirm', msg, cb);};
				$j.confirm_custom = function(msg, cb) { dbox('confirm_custom', msg, cb); $j("#btn_ok_dig").val('Yes'); $j("#btn_cancel_dig").val('No');};
				$j.process_cancel = function(msg, cb) {	dbox('process', msg, cb);};
				$j.prompt = function(msg, txt, cb) { dbox('prompt', msg, cb, txt);};

			}());

			var setSelectMode = function() {
				var curr = $j('.tool_button_current');
				if(curr.length && curr[0].id !== 'tool_select') {
					curr.removeClass('tool_button_current').addClass('tool_button');
					$j('#styleoverrides').text('#svgcanvas svg *{cursor:move;pointer-events:all} #svgcanvas svg{cursor:default}');
				}
				svgCanvas.setMode('select');
				workarea.css('cursor','auto');
			};

			var togglePathEditMode = function(editmode, elems) {
				$j('#path_node_panel').toggle(editmode);
				$j('#tools_bottom_2,#tools_bottom_3').toggle(!editmode);
				if(editmode) {
					// Change select icon
					$j('.tool_button_current').removeClass('tool_button_current').addClass('tool_button');
					setIcon('#tool_select', 'select_node');
					multiselected = false;
					if(elems.length) {
						selectedElement = elems[0];
					}
				} else {
					setIcon('#tool_select', 'select');
				}
			}

			// used to make the flyouts stay on the screen longer the very first time
			var flyoutspeed = 1250;
			var textBeingEntered = false;
			var selectedElement = null;
			var multiselected = false;
			var editingsource = false;
			var docprops = false;
			var preferences = false;
			var cur_context = '';
			var orig_title = $j('title:first').text();

			var saveHandler = function(window,svg) {
				Editor.show_save_warning = false;

				// by default, we add the XML prolog back, systems integrating SVG-edit (wikis, CMSs)
				// can just provide their own custom save handler and might not want the XML prolog
				svg = '<?xml version="1.0"?>\n' + svg;

				// Opens the SVG in new window, with warning about Mozilla bug #308590 when applicable

				var ua = navigator.userAgent;

				// Chrome 5 (and 6?) don't allow saving, show source instead ( http://code.google.com/p/chromium/issues/detail?id=46735 )
				// IE9 doesn't allow standalone Data URLs ( https://connect.microsoft.com/IE/feedback/details/542600/data-uri-images-fail-when-loaded-by-themselves )
				if((~ua.indexOf('Chrome') && $j.browser.version >= 533) || ~ua.indexOf('MSIE')) {
					showSourceEditor(0,true);
					return;
				}
				var win = window.open("data:image/svg+xml;content-disposition: attachment;base64," + Utils.encode64(svg));

				// Alert will only appear the first time saved OR the first time the bug is encountered
				var done = $j.pref('save_notice_done');
				if(done !== "all") {

					var note = uiStrings.notification.saveFromBrowser.replace('%s', 'SVG');

					// Check if FF and has <defs/>
					if(ua.indexOf('Gecko/') !== -1) {
						if(svg.indexOf('<defs') !== -1) {
							note += "\n\n" + uiStrings.notification.defsFailOnSave;
							$j.pref('save_notice_done', 'all');
							done = "all";
						} else {
							$j.pref('save_notice_done', 'part');
						}
					} else {
						$j.pref('save_notice_done', 'all');
					}

					if(done !== 'part') {
						win.alert(note);
					}
				}
			};

			var exportHandler = function(window, data) {
				var issues = data.issues;

				if(!$('#export_canvas').length) {
					$('<canvas>', {id: 'export_canvas'}).hide().appendTo('body');
				}
				var c = $('#export_canvas')[0];

				width = svgCanvas.contentW;
				height = svgCanvas.contentH;
				canvg(c, data.svg, {renderCallback: function() {
					var datauri = c.toDataURL('image/png');
					exportWindow.location.href = datauri;
					var done = $.pref('export_notice_done');
					if(done !== "all") {
						var note = uiStrings.notification.saveFromBrowser.replace('%s', 'PNG');

						// Check if there's issues
						if(issues.length) {
							var pre = "\n \u2022 ";
							note += ("\n\n" + uiStrings.notification.noteTheseIssues + pre + issues.join(pre));
						}

						// Note that this will also prevent the notice even though new issues may appear later.
						// May want to find a way to deal with that without annoying the user
						$.pref('export_notice_done', 'all');
						exportWindow.alert(note);
					}
				}});
			};

			
			/* by rws
			var exportHandler = function(window, data) {
				var issues = data.issues;
				
				if(!$j('#export_canvas').length) {
					$j('<canvas>', {id: 'export_canvas'}).hide().appendTo('body');
				}
				var c = $j('#export_canvas')[0];
				c.width = svgCanvas.contentW;
				c.height = svgCanvas.contentH;
				
				
				canvg(c, data.svg, {renderCallback: function() {
					console.log('in canvg function');
					var datauri = c.toDataURL('image/png');
					
					var ret_string =  clickSave();
					
					if( datauri != 'undefined')
					{
						$j.ajax({
							type: 'POST',
							url: backend_url,
							cache: false,
							data: "id="+ template_id +"&form_key="+ formkey +"&save_str=" + ret_string +"&save_png=" + datauri,
							success: function (html) {
								alert('Design saved successfully!');
								window.location.href = html;
							},
							error:function (html) {alert('error in saving');}
						});
					}
					var done = $j.pref('export_notice_done');
					if(done !== "all") {
						var note = uiStrings.notification.saveFromBrowser.replace('%s', 'PNG');

						// Check if there's issues
						if(issues.length) {
							var pre = "\n \u2022 ";
							note += ("\n\n" + uiStrings.notification.noteTheseIssues + pre + issues.join(pre));
						}

						// Note that this will also prevent the notice even though new issues may appear later.
						// May want to find a way to deal with that without annoying the user
						$j.pref('export_notice_done', 'all');
						exportWindow.alert(note);
					}
				}});
			};*/
			
			// called when we've selected a different element
			var selectedChanged = function(window,elems) {
				var mode = svgCanvas.getMode();
				trace("element change =  " + mode);
				if(mode === "select") setSelectMode();
				var is_node = (mode == "pathedit");
				// if elems[1] is present, then we have more than one element
				selectedElement = (elems.length == 1 || elems[1] == null ? elems[0] : null);
				multiselected = (elems.length >= 2 && elems[1] != null);
				
				if (selectedElement != null ) {
					// unless we're already in always set the mode of the editor to select because
					// upon creation of a text element the editor is switched into
					// select mode and this event fires - we need our UI to be in sync
					//is_node =true; //25-7-13 added by rws to solve image loading issue on first click
					//updateToolbar();
					if (!is_node) {
						updateToolbar();
					}
					if (selectedElement !== null && selectedElement !== '') 
					{
						if(selectedElement.tagName === "text")
						{
							var cls = selectedElement.getAttributeNS(null, 'class');
							if (cls == "titleClass")
								myButton = "addtitle";
							if (cls == "textClass")
								myButton = "addtext";
							if (cls == "extraTextClass")
								myButton = "addextra";
							if (cls == "FAImage")
								myButton = "addart";
						}
						if(selectedElement.tagName === 'image')
						{
							if(selectedElement.getAttributeNS(null, 'class') == "scissorImage")
							{
								myButton = "addOneScissors";
							}
						}
					}


				}
				
				// Deal with pathedit mode
				togglePathEditMode(is_node, elems);
				updateContextPanel();
				svgCanvas.runExtensions("selectedChanged", {
					elems: elems,
					selectedElement: selectedElement,
					multiselected: multiselected
				});
			};

			// Call when part of element is in process of changing, generally
			// on mousemove actions like rotate, move, etc.
			var elementTransition = function(window,elems) {
				var mode = svgCanvas.getMode();
				var elem = elems[0];

				if(!elem) return;

				multiselected = (elems.length >= 2 && elems[1] != null);
				// Only updating fields for single elements for now
				if(!multiselected) {
					switch ( mode ) {
						case "rotate":
							var ang = svgCanvas.getRotationAngle(elem);
							$j('#angle').val(ang);
							$j('#tool_reorient').toggleClass('disabled', ang == 0);
							break;

						// TODO: Update values that change on move/resize, etc
// 						case "select":
// 						case "resize":
// 							break;
					}
				}
				svgCanvas.runExtensions("elementTransition", {
					elems: elems
				});
			};

			// called when any element has changed
			var elementChanged = function(window,elems) {
				var mode = svgCanvas.getMode();
				if(mode === "select") {
					setSelectMode();
				}

				for (var i = 0; i < elems.length; ++i) {
					var elem = elems[i];

					// if the element changed was the svg, then it could be a resolution change
					if (elem && elem.tagName === "svg") {
						populateLayers();
						updateCanvas();
					}
					// Update selectedElement if element is no longer part of the image.
					// This occurs for the text elements in Firefox
					else if(elem && selectedElement && selectedElement.parentNode == null) {
// 						|| elem && elem.tagName == "path" && !multiselected) { // This was added in r1430, but not sure why
						selectedElement = elem;
					}
				}

				Editor.show_save_warning = false;

				// we update the contextual panel with potentially new
				// positional/sizing information (we DON'T want to update the
				// toolbar here as that creates an infinite loop)
				// also this updates the history buttons

				// we tell it to skip focusing the text control if the
				// text element was previously in focus
				updateContextPanel();

				// In the event a gradient was flipped:
				if(selectedElement && mode === "select") {
					paintBox.fill.update();
					paintBox.stroke.update();
				}

				svgCanvas.runExtensions("elementChanged", {
					elems: elems
				});
			};

			var zoomChanged = svgCanvas.zoomChanged = function(window, bbox, autoCenter) {
				var scrbar = 15,
					res = svgCanvas.getResolution(),
					w_area = workarea,
					canvas_pos = $j('#svgcanvas').position();
				var z_info = svgCanvas.setBBoxZoom(bbox, w_area.width()-scrbar, w_area.height()-scrbar);
				if(!z_info) return;
				var zoomlevel = z_info.zoom,
					bb = z_info.bbox;

				if(zoomlevel < .001) {
					changeZoom({value: .1});
					return;
				}
				$j('#zoom').val(zoomlevel*100);

				if(autoCenter) {
					updateCanvas();
				} else {
					updateCanvas(false, {x: bb.x * zoomlevel + (bb.width * zoomlevel)/2, y: bb.y * zoomlevel + (bb.height * zoomlevel)/2});
				}

				if(svgCanvas.getMode() == 'zoom' && bb.width) {
					// Go to select if a zoom box was drawn
					setSelectMode();
				}

				zoomDone();
			}

			$j('#cur_context_panel').delegate('a', 'click', function() {
				var link = $j(this);
				if(link.attr('data-root')) {
					svgCanvas.leaveContext();
				} else {
					svgCanvas.setContext(link.text());
				}
				svgCanvas.clearSelection();
				return false;
			});

			var contextChanged = function(win, context) {
				var link_str = '';
				if(context) {
					var str = '';
					link_str = '<a href="#" data-root="y">' + svgCanvas.getCurrentDrawing().getCurrentLayerName() + '</a>';

					$j(context).parentsUntil('#svgcontent > g').andSelf().each(function() {
						if(this.id) {
							str += ' > ' + this.id;
							if(this !== context) {
								link_str += ' > <a href="#">' + this.id + '</a>';
							} else {
								link_str += ' > ' + this.id;
							}
						}
					});
					cur_context = str;
				} else {
					cur_context = null;
				}
				$j('#cur_context_panel').toggle(!!context).html(link_str);
				updateTitle();
			}

			// Makes sure the current selected paint is available to work with
			var prepPaints = function() {
				paintBox.fill.prep();
				paintBox.stroke.prep();
			}

			var flyout_funcs = {};

			var setupFlyouts = function(holders) {
				$j.each(holders, function(hold_sel, btn_opts) {
					var buttons = $j(hold_sel).children();
					var show_sel = hold_sel + '_show';
					var shower = $j(show_sel);
					var def = false;
					buttons.addClass('tool_button')
						.unbind('click mousedown mouseup') // may not be necessary
						.each(function(i) {
							// Get this buttons options
							var opts = btn_opts[i];

							// Remember the function that goes with this ID
							flyout_funcs[opts.sel] = opts.fn;

							if(opts.isDefault) def = i;

							// Clicking the icon in flyout should set this set's icon
							var func = function(event) {
								var options = opts;
								//find the currently selected tool if comes from keystroke
								if (event.type === "keydown") {
									var flyoutIsSelected = $j(options.parent + "_show").hasClass('tool_button_current');
									var currentOperation = $j(options.parent + "_show").attr("data-curopt");
									$j.each(holders[opts.parent], function(i, tool){
										if (tool.sel == currentOperation) {
											if(!event.shiftKey || !flyoutIsSelected) {
												options = tool;
											}
											else {
												options = holders[opts.parent][i+1] || holders[opts.parent][0];
											}
										}
									});
								}
								if($j(this).hasClass('disabled')) return false;
								if (toolButtonClick(show_sel)) {
									options.fn();
								}
								if(options.icon) {
									var icon = $j.getSvgIcon(options.icon, true);
								} else {
									var icon = $j(options.sel).children().eq(0).clone();
								}

								icon[0].setAttribute('width',shower.width());
								icon[0].setAttribute('height',shower.height());
								shower.children(':not(.flyout_arrow_horiz)').remove();
								shower.append(icon).attr('data-curopt', options.sel); // This sets the current mode
							}

							$j(this).mouseup(func);

							if(opts.key) {
								$j(document).bind('keydown', opts.key[0] + " shift+" + opts.key[0], func);
							}
						});

					if(def) {
						shower.attr('data-curopt', btn_opts[def].sel);
					} else if(!shower.attr('data-curopt')) {
						// Set first as default
						shower.attr('data-curopt', btn_opts[0].sel);
					}

					var timer;

					var pos = $j(show_sel).position();
					$j(hold_sel).css({'left': pos.left+34, 'top': pos.top+40});

					// Clicking the "show" icon should set the current mode
					shower.mousedown(function(evt) {
						if(shower.hasClass('disabled')) return false;
						var holder = $j(hold_sel);
						var l = pos.left+34;
						var w = holder.width()*-1;
						var time = holder.data('shown_popop')?200:0;
						timer = setTimeout(function() {
							// Show corresponding menu
							if(!shower.data('isLibrary')) {
								holder.css('left', w).show().animate({
									left: l
								},150);
							} else {
								holder.css('left', l).show();
							}
							holder.data('shown_popop',true);
						},time);
						evt.preventDefault();
					}).mouseup(function(evt) {
						clearTimeout(timer);
						var opt = $j(this).attr('data-curopt');
						// Is library and popped up, so do nothing
						if(shower.data('isLibrary') && $j(show_sel.replace('_show','')).is(':visible')) {
							toolButtonClick(show_sel, true);
							return;
						}
						if (toolButtonClick(show_sel) && (opt in flyout_funcs)) {
							flyout_funcs[opt]();
						}
					});
				});
				setFlyoutTitles();
			}

			var makeFlyoutHolder = function(id, child) {
				var div = $j('<div>',{
					'class': 'tools_flyout',
					id: id
				}).appendTo('#tools_left').append(child);
				return div;
			}

			var setFlyoutPositions = function() {
				$j('.tools_flyout').each(function() {
					var shower = $j('#' + this.id + '_show');
					var pos = shower.offset();
					var w = shower.outerWidth();
					$j(this).css({left: (pos.left + w)*tool_scale, top: pos.top});
				});
			}

			var setFlyoutTitles = function() {
				$j('.tools_flyout').each(function() {
					var shower = $j('#' + this.id + '_show');
					if(shower.data('isLibrary')) return;

					var tooltips = [];
					$j(this).children().each(function() {
						tooltips.push(this.title);
					});
					shower[0].title = tooltips.join(' / ');
				});
			}

			var resize_timer;

			var extAdded = function(window, ext) {

				var cb_called = false;
				var resize_done = false;
				var cb_ready = true; // Set to false to delay callback (e.g. wait for $j.svgIcons)

				function prepResize() {
					if(resize_timer) {
						clearTimeout(resize_timer);
						resize_timer = null;
					}
					if(!resize_done) {
						resize_timer = setTimeout(function() {
							resize_done = true;
							setIconSize(curPrefs.iconsize);
						}, 50);
					}
				}


				var runCallback = function() {
					if(ext.callback && !cb_called && cb_ready) {
						cb_called = true;
						ext.callback();
					}
				}

				var btn_selects = [];

				if(ext.context_tools) {
					$j.each(ext.context_tools, function(i, tool) {
						// Add select tool
						var cont_id = tool.container_id?(' id="' + tool.container_id + '"'):"";

						var panel = $j('#' + tool.panel);

						// create the panel if it doesn't exist
						if(!panel.length)
							panel = $j('<div>', {id: tool.panel}).appendTo("#tools_top");

						// TODO: Allow support for other types, or adding to existing tool
						switch (tool.type) {
						case 'tool_button':
							var html = '<div class="tool_button">' + tool.id + '</div>';
							var div = $j(html).appendTo(panel);
							if (tool.events) {
								$j.each(tool.events, function(evt, func) {
									$j(div).bind(evt, func);
								});
							}
							break;
						case 'select':
							var html = '<label' + cont_id + '>'
								+ '<select id="' + tool.id + '">';
							$j.each(tool.options, function(val, text) {
								var sel = (val == tool.defval) ? " selected":"";
								html += '<option value="'+val+'"' + sel + '>' + text + '</option>';
							});
							html += "</select></label>";
							// Creates the tool, hides & adds it, returns the select element
							var sel = $j(html).appendTo(panel).find('select');

							$j.each(tool.events, function(evt, func) {
								$j(sel).bind(evt, func);
							});
							break;
						case 'button-select':
							var html = '<div id="' + tool.id + '" class="dropdown toolset" title="' + tool.title + '">'
								+ '<div id="cur_' + tool.id + '" class="icon_label"></div><button></button></div>';

							var list = $j('<ul id="' + tool.id + '_opts"></ul>').appendTo('#option_lists');

							if(tool.colnum) {
								list.addClass('optcols' + tool.colnum);
							}

							// Creates the tool, hides & adds it, returns the select element
							var dropdown = $j(html).appendTo(panel).children();

							btn_selects.push({
								elem: ('#' + tool.id),
								list: ('#' + tool.id + '_opts'),
								title: tool.title,
								callback: tool.events.change,
								cur: ('#cur_' + tool.id)
							});

							break;
						case 'input':
							var html = '<label' + cont_id + '>'
								+ '<span id="' + tool.id + '_label">'
								+ tool.label + ':</span>'
								+ '<input id="' + tool.id + '" title="' + tool.title
								+ '" size="' + (tool.size || "4") + '" value="' + (tool.defval || "") + '" type="text"/></label>'

							// Creates the tool, hides & adds it, returns the select element

							// Add to given tool.panel
							var inp = $j(html).appendTo(panel).find('input');

							if(tool.spindata) {
								inp.SpinButton(tool.spindata);
							}

							if(tool.events) {
								$j.each(tool.events, function(evt, func) {
									inp.bind(evt, func);
								});
							}
							break;
						default:
							break;
						}
					});
				}

				if(ext.buttons) {
					var fallback_obj = {},
						placement_obj = {},
						svgicons = ext.svgicons;
					var holders = {};


					// Add buttons given by extension
					$j.each(ext.buttons, function(i, btn) {
						var icon;
						var id = btn.id;
						var num = i;

						// Give button a unique ID
						while($j('#'+id).length) {
							id = btn.id + '_' + (++num);
						}

						if(!svgicons) {
							icon = $j('<img src="' + btn.icon + '">');
						} else {
							fallback_obj[id] = btn.icon;
							var svgicon = btn.svgicon?btn.svgicon:btn.id;
							if(btn.type == 'app_menu') {
								placement_obj['#' + id + ' > div'] = svgicon;
							} else {
								placement_obj['#' + id] = svgicon;
							}
						}

						var cls, parent;

						// Set button up according to its type
						switch ( btn.type ) {
						case 'mode_flyout':
						case 'mode':
							cls = 'tool_button';
							parent = "#tools_left";
							break;
						case 'context':
							cls = 'tool_button';
							parent = "#" + btn.panel;
							// create the panel if it doesn't exist
							if(!$j(parent).length)
								$j('<div>', {id: btn.panel}).appendTo("#tools_top");
							break;
						case 'app_menu':
							cls = '';
							parent = '#main_menu ul';
							break;
						}

						var button = $j((btn.list || btn.type == 'app_menu')?'<li/>':'<div/>')
							.attr("id", id)
							.attr("title", btn.title)
							.addClass(cls);
						if(!btn.includeWith && !btn.list) {
							if("position" in btn) {
								$j(parent).children().eq(btn.position).before(button);
							} else {
								button.appendTo(parent);
							}

							if(btn.type =='mode_flyout') {
							// Add to flyout menu / make flyout menu
	// 							var opts = btn.includeWith;
	// 							// opts.button, default, position
								var ref_btn = $j(button);

								var flyout_holder = ref_btn.parent();
								// Create a flyout menu if there isn't one already
								if(!ref_btn.parent().hasClass('tools_flyout')) {
									// Create flyout placeholder
									var tls_id = ref_btn[0].id.replace('tool_','tools_')
									var show_btn = ref_btn.clone()
										.attr('id',tls_id + '_show')
										.append($j('<div>',{'class':'flyout_arrow_horiz'}));

									ref_btn.before(show_btn);

									// Create a flyout div
									flyout_holder = makeFlyoutHolder(tls_id, ref_btn);
									flyout_holder.data('isLibrary', true);
									show_btn.data('isLibrary', true);
								}
	// 							var ref_data = Actions.getButtonData(opts.button);
								placement_obj['#' + tls_id + '_show'] = btn.id;
								// TODO: Find way to set the current icon using the iconloader if this is not default
								// Include data for extension button as well as ref button
								var cur_h = holders['#'+flyout_holder[0].id] = [{
									sel: '#'+id,
									fn: btn.events.click,
									icon: btn.id,
// 									key: btn.key,
									isDefault: true
								}, ref_data];
							} else if(btn.type == 'app_menu') {
								button.append('<div>').append(btn.title);
							}

						} else if(btn.list) {
							// Add button to list
							button.addClass('push_button');
							$j('#' + btn.list + '_opts').append(button);
 							if(btn.isDefault) {
 								$j('#cur_' + btn.list).append(button.children().clone());
 								var svgicon = btn.svgicon?btn.svgicon:btn.id;
	 							placement_obj['#cur_' + btn.list] = svgicon;
 							}
						} else if(btn.includeWith) {
							// Add to flyout menu / make flyout menu
							var opts = btn.includeWith;
							// opts.button, default, position
							var ref_btn = $j(opts.button);

							var flyout_holder = ref_btn.parent();
							// Create a flyout menu if there isn't one already
							if(!ref_btn.parent().hasClass('tools_flyout')) {
								// Create flyout placeholder
								var tls_id = ref_btn[0].id.replace('tool_','tools_')
								var show_btn = ref_btn.clone()
									.attr('id',tls_id + '_show')
									.append($j('<div>',{'class':'flyout_arrow_horiz'}));

								ref_btn.before(show_btn);

								// Create a flyout div
								flyout_holder = makeFlyoutHolder(tls_id, ref_btn);
							}

							var ref_data = Actions.getButtonData(opts.button);

							if(opts.isDefault) {
								placement_obj['#' + tls_id + '_show'] = btn.id;
							}
							// TODO: Find way to set the current icon using the iconloader if this is not default

							// Include data for extension button as well as ref button
							var cur_h = holders['#'+flyout_holder[0].id] = [{
								sel: '#'+id,
								fn: btn.events.click,
								icon: btn.id,
								key: btn.key,
								isDefault: btn.includeWith?btn.includeWith.isDefault:0
							}, ref_data];
							// {sel:'#tool_rect', fn: clickRect, evt: 'mouseup', key: 4, parent: '#tools_rect', icon: 'rect'}
							var pos  = ("position" in opts)?opts.position:'last';
							var len = flyout_holder.children().length;
							// Add at given position or end
							if(!isNaN(pos) && pos >= 0 && pos < len) {
								flyout_holder.children().eq(pos).before(button);
							} else {
								flyout_holder.append(button);
								cur_h.reverse();
							}
						}
						if(!svgicons) {
							button.append(icon);
						}

						if(!btn.list) {
							// Add given events to button
							$j.each(btn.events, function(name, func) {
								if(name == "click") {
									if(btn.type == 'mode') {
										if(btn.includeWith) {
											button.bind(name, func);
										} else {
											button.bind(name, function() {
												if(toolButtonClick(button)) {
													func();
												}
											});
										}
										if(btn.key) {
											$j(document).bind('keydown', btn.key, func);
											if(btn.title) button.attr("title", btn.title + ' ['+btn.key+']');
										}
									} else {
										button.bind(name, func);
									}
								} else {
									button.bind(name, func);
								}
							});
						}
						setupFlyouts(holders);
					});

					$j.each(btn_selects, function() {
						addAltDropDown(this.elem, this.list, this.callback, {seticon: true});
					});

					if (svgicons)	cb_ready = false; // Delay callback
					$j.svgIcons(svgicons, {
						w:24, h:24,
						id_match: false,
						no_img: (!isWebkit),
						fallback: fallback_obj,
						placement: placement_obj,
						callback: function(icons) {
							// Non-ideal hack to make the icon match the current size
							if(curPrefs.iconsize && curPrefs.iconsize != 'm') {
								prepResize();
							}
							cb_ready = true; // Ready for callback
							runCallback();
						}
					});
				}
				runCallback();
			};

			var getPaint = function(color, opac, type) {
				// update the editor's fill paint
				var opts = null;
				if (color.indexOf("url(#") === 0) {
					var refElem = svgCanvas.getRefElem(color);
					if(refElem) {
						refElem = refElem.cloneNode(true);
					} else {
						refElem =  $j("#" + type + "_color defs *")[0];
					}
					opts = { alpha: opac };
					opts[refElem.tagName] = refElem;
				}
				else if (color.indexOf("#") === 0) {
					//Added by A -  to set text color input field - Start
					fontcolorflag = parseInt(fontcolorflag) + 1;
					if(parseInt(fontcolorflag)%2 === 0) {
					opts = {
						alpha: opac,
						solidColor: color.substr(1)
					};
					}
					//Added by A -  to set text color input field - End
					
				}
				else {
					opts = {
						alpha: opac,
						solidColor: 'none'
					};
				}
				return new $j.jGraduate.Paint(opts);
			};

			// updates the toolbar (colors, opacity, etc) based on the selected element
			// This function also updates the opacity and id elements that are in the context panel
			var updateToolbar = function() {
				if (selectedElement != null) {
					//trace("update toolbar");
					switch ( selectedElement.tagName ) {
					case 'use':
					case 'image':
					case 'foreignObject':
						break;
					case 'g':
					case 'a':
						// Look for common styles

						var gWidth = null;

						var childs = selectedElement.getElementsByTagName('*');
						for(var i = 0, len = childs.length; i < len; i++) {
							var swidth = childs[i].getAttribute("stroke-width");

							if(i === 0) {
								gWidth = swidth;
							} else if(gWidth !== swidth) {
								gWidth = null;
							}
						}

						$j('#stroke_width').val(gWidth === null ? "" : gWidth);

						paintBox.fill.update(true);
						paintBox.stroke.update(true);


						break;
					default:
						paintBox.fill.update(true);
						paintBox.stroke.update(true);
						//console.log(paintBox.fill);
						var strokewid = selectedElement.getAttribute("stroke-width");
						strokewid = (strokewid)? strokewid : 1;
						$j('#stroke_slider').slider('option', 'value', strokewid);
						$j('#stroke_width').val(strokewid);
						$j('#stroke_style').val(selectedElement.getAttribute("stroke-dasharray")||"none");

						var attr = selectedElement.getAttribute("stroke-linejoin") || 'miter';

						if ($j('#linejoin_' + attr).length != 0)
							setStrokeOpt($j('#linejoin_' + attr)[0]);

						attr = selectedElement.getAttribute("stroke-linecap") || 'butt';

						if ($j('#linecap_' + attr).length != 0)
							setStrokeOpt($j('#linecap_' + attr)[0]);
					}

				}

				// All elements including image and group have opacity
				if(selectedElement != null) {
					var opac_perc = ((selectedElement.getAttribute("opacity")||1.0)*100);
					$j('#group_opacity').val(opac_perc);
					$j('#opac_slider').slider('option', 'value', 100-opac_perc);
					$j('#elem_id').val(selectedElement.id);
				}
				updateToolButtonState();
			};

			var setImageURL = Editor.setImageURL = function(url) {
				if(!url) url = default_img_url;
				svgCanvas.setImageURL(url);
				$j('#image_url').val(url);
				if(url.indexOf('data:') === 0) {
					// data URI found
					$j('#image_url').hide();
					$j('#change_image_url').show();
				} else {
					// regular URL
					svgCanvas.embedImage(url, function(datauri) {
						if(!datauri) {
							// Couldn't embed, so show warning
							$j('#url_notice').show();
						} else {
							$j('#url_notice').hide();
						}
						default_img_url = url;
					});
					$j('#image_url').show();
					$j('#change_image_url').hide();
				}
			}
			var setInputWidth = function(elem) {
				var w = Math.min(Math.max(12 + elem.value.length * 6, 50), 300);
				$j(elem).width(w);
			}
			// updates the context panel tools based on the selected element
			var updateContextPanel = function() {  
				var elem = selectedElement;

				// If element has just been deleted, consider it null
				if(elem != null && !elem.parentNode) elem = null;
				var currentLayerName = svgCanvas.getCurrentDrawing().getCurrentLayerName();
				var currentMode = svgCanvas.getMode();
				var unit = curConfig.baseUnit !== 'px' ? curConfig.baseUnit : null;
				var is_node = currentMode == 'pathedit';
				var menu_items = $j('#cmenu_canvas li');
				$j('#selected_panel, #tools_bottom_2, #multiselected_panel, #g_panel, #rect_panel, #circle_panel,\
					#ellipse_panel, #line_panel, #text_panel, #image_panel, #container_panel, #use_panel, #a_panel, #tool_font_family, #images_loaded').hide();
				$j("#common-panel").removeClass('cbp-spmenu-open');
				$j("#edit-panel").removeClass('cbp-spmenu-open');
				$j("#addtext-panel").removeClass('cbp-spmenu-open');
				//$j(".bottom-share-panel").css("display", "none");
				$j("#tool_group").addClass("disabled");
				$j("#tool_ungroup").addClass("disabled");
				
				//setSharePanel();
				if (elem != null) {
					var elname = elem.nodeName;
					var angle = svgCanvas.getRotationAngle(elem);
					$j('#angle').val(angle);
					var blurval = svgCanvas.getBlur(elem);
					// $j('#blur').text(blurval);
					$j('#blur').val(blurval);
					if(elname === 'g') {
						selected_id = $j(selectedElement).attr('id');
						stroke_width = $j('#'+selected_id+' g path').attr("stroke-width");
						var stroke_width_final = (stroke_width)? stroke_width:0;
						$j('#stroke_width').val(stroke_width_final);
						$j('#stroke_slider').slider('option', 'value', stroke_width_final);
						stroke_color = $j('#'+selected_id+' g path').attr("stroke");
						$j("#stroke_color svg rect").attr('fill', stroke_color);
						fill_color = $j('#'+selected_id+' g path').attr("fill");
						$j("#fill_color svg rect").attr('fill', fill_color);
					}
					if(elname === 'text') {
						$j('#stroke_width').text(selectedElement.getAttribute("stroke-width") || 1);
						$j('#stroke_slider').slider('option', 'value', selectedElement.getAttribute("stroke-width"));
						var dd = $j('#dd');
						placeholder = dd.children('span');
						opts = dd.find('ul.dropdown > li');
						placeholder.text(selectedElement.getAttribute("font-family"));
						placeholder.css('font-family', selectedElement.getAttribute("font-family"));

					}
					$j('#blur_slider').slider('option', 'value', blurval);
					if(svgCanvas.addedNew) {
						if(elname === 'image') {
							// Prompt for URL if not a data URL
							if(svgCanvas.getHref(elem).indexOf('data:') !== 0) {
								promptImgURL();
							}
						}
					}

					if(!is_node && currentMode != 'pathedit') {
						//$j('#selected_panel').show();
						//$j('#tools_bottom_2').show();
						//$j("#common-panel").addClass('cbp-spmenu-open');
						// Elements in this array already have coord fields
						if(['line', 'circle', 'ellipse'].indexOf(elname) >= 0) {
							$j('#xy_panel').hide();
						} else {
							var x,y;
							// Get BBox vals for g, polyline and path
							if(['g', 'polyline', 'path'].indexOf(elname) >= 0) {
								var bb = svgCanvas.getStrokedBBox([elem]);
								if(bb) {
									x = bb.x;
									y = bb.y;
								}
							} else {
								x = elem.getAttribute('x');
								y = elem.getAttribute('y');
							}
							if(unit) {
								x = svgedit.units.convertUnit(x);
								y = svgedit.units.convertUnit(y);
							}
							$j('#selected_x').val(x || 0);
							$j('#selected_y').val(y || 0);
							$j('#xy_panel').show();
						}

						// Elements in this array cannot be converted to a path
						var no_path = ['image', 'text', 'path', 'g', 'use'].indexOf(elname) == -1;
						$j('#tool_topath').toggle(no_path);
						$j('#tool_reorient').toggle(elname == 'path');
						$j('#tool_reorient').toggleClass('disabled', angle == 0);
					} else {
						var point = path.getNodePoint();
						$j('#tool_add_subpath').removeClass('push_button_pressed').addClass('tool_button');
						$j('#tool_node_delete').toggleClass('disabled', !path.canDeleteNodes);

						// Show open/close button based on selected point
						setIcon('#tool_openclose_path', path.closed_subpath ? 'open_path' : 'close_path');
						if(point) {
							var seg_type = $j('#seg_type');
							if(unit) {
								point.x = svgedit.units.convertUnit(point.x);
								point.y = svgedit.units.convertUnit(point.y);
							}
							$j('#path_node_x').val(point.x);
							$j('#path_node_y').val(point.y);
							if(point.type) {
								seg_type.val(point.type).removeAttr('disabled');
							} else {
								seg_type.val(4).attr('disabled','disabled');
							}
						}
						return;
					}

					// update contextual tools here
					var panels = {
						g: [],
						a: [],
						rect: ['rx','width','height'],
						image: ['width','height'],
						circle: ['cx','cy','r'],
						ellipse: ['cx','cy','rx','ry'],
						line: ['x1','y1','x2','y2'],
						text: [],
						path: [],
						'use': []
					};

					var el_name = elem.tagName;
					var link_href = null;
					if (el_name === 'a') {
						link_href = svgCanvas.getHref(elem);
						//$j('#g_panel').show();
						$j('#tool_ungroup').show();
						$j('#tool_ungroup').removeClass("disabled");
						$j('#tool_group').hide();
					}

					if(elem.parentNode.tagName === 'a') {
						if(!$j(elem).siblings().length) {
							//$j('#a_panel').show();
							$j('#tool_ungroup').show();
							$j('#tool_ungroup').removeClass("disabled");
							$j('#tool_group').hide();
							link_href = svgCanvas.getHref(elem.parentNode);
						}
					}

					// Hide/show the make_link buttons
					$j('#tool_make_link, #tool_make_link').toggle(!link_href);

					if(link_href) {
						$j('#link_url').val(link_href);
					}
					trace("el_name = " + el_name);
					if(panels[el_name]) {
						var cur_panel = panels[el_name];

						$j('#' + el_name + '_panel').show();

						$j.each(cur_panel, function(i, item) {
							var attrVal = elem.getAttribute(item);
							if(curConfig.baseUnit !== 'px' && elem[item]) {
								var bv = elem[item].baseVal.value;
								attrVal = svgedit.units.convertUnit(bv);
							}

							$j('#' + el_name + '_' + item).val(attrVal || 0);
						});
						
						$j('#fill_box').css("display", "block");
						$j('#tool_fill').css("display", "none");//Parth edited 6-5-2014 hide colorpicker
						$j('#tool_stroke').css("display", "block");
						$j('#border_box').css("display", "block");
						
						//show both gradient tabs, hidden by text selection
						$j('.jGraduate_tab_lingrad').show();
						$j('.jGraduate_tab_radgrad').show();
						
						
						
						
						if(el_name == 'text') {
							
							//hide both gradient tabs becuase text gradient in image creation does not support that
							$j('.jGraduate_tab_lingrad').hide();
							$j('.jGraduate_tab_radgrad').hide();
							$j('.jGraduate_tab_color').trigger("click");
							
							//show addtext panel
							if (myButton === "addtitle")
							{
								disableOther('addtitle');
								$j("#addtitle").addClass('active');
								$j("#addtitle-panel").addClass('cbp-spmenu-open');									
							}
							else if (myButton === "addextra")
							{
								disableOther('addextra');
								$j("#addextra").addClass('active');
								$j("#addextra-panel").addClass('cbp-spmenu-open');
							}
							else if (myButton === "addart")
							{
								disableOther('addart');
								$j("#addart").addClass('active');
								$j("#addart-panel").addClass('cbp-spmenu-open');
							}
							else 
							{
								disableOther('addtext');
								$j("#addtext").addClass('active');
								$j("#addtext-panel").addClass('cbp-spmenu-open');
							}
							
							//$j('#common-panel').css("margin-top", "145px");
							$j("#common-panel").addClass('cbp-spmenu-open');
							
							$j('#text_panel').css("display", "inline");
							$j('#tool_font_family').show();
							
							if (svgCanvas.getItalic()) {
								$j('#tool_italic').addClass('push_button_pressed').removeClass('tool_button');
							}
							else {
								$j('#tool_italic').removeClass('push_button_pressed').addClass('tool_button');
							}
							if (svgCanvas.getBold()) {
								$j('#tool_bold').addClass('push_button_pressed').removeClass('tool_button');
							}
							else {
								$j('#tool_bold').removeClass('push_button_pressed').addClass('tool_button');
							}
							
							$j('#font-selector').val(elem.getAttribute("font-family")).attr("selected", "selected");
							$j('#font_size').val(elem.getAttribute("font-size"));
							$j('#font_size_slider').slider('option', 'value', elem.getAttribute("font-size"));
							if (myButton === "addtitle"){
								$j('#prb_title_textarea').val(elem.textContent);
								if (svgCanvas.addedNew) {
									// Timeout needed for IE9
									setTimeout(function() {
										$j('#prb_title_textarea').focus().select();
									},100);
								}								
							}
							if (myButton === "addtext")
							{
								$j('#prb_name_title_textarea').val(elem.textContent);
								if (svgCanvas.addedNew) {
									// Timeout needed for IE9
									setTimeout(function() {
										$j('#prb_name_title_textarea').focus().select();
									},100);
								}								
							}
							if (myButton === "addextra")
							{
								$j('#prb_extra_field_textarea').val(elem.textContent);
								if (svgCanvas.addedNew) {
									// Timeout needed for IE9
									setTimeout(function() {
										$j('#prb_extra_field_textarea').focus().select();
									},100);
								}								
							}
							$j('#stroke_width').text(selectedElement.getAttribute("stroke-width") || 1);
						} // text
						else if(el_name == 'image') {
							if (myButton === "addOneScissors")
							{
								disableOther('addOneScissors');
								$j("#addOneScissors-panel").addClass('cbp-spmenu-open');								
							}
							else{
								disableOther('editpanel');
								$j("#edit-panel").addClass('cbp-spmenu-open');
							}
							//$j('#common-panel').css("margin-top", "315px");
							$j("#common-panel").addClass('cbp-spmenu-open');
							$j('#images_loaded').show();
							//$j("#addtimage").trigger("mousedown");
							$j('#tool_fill').css("display", "none");
							$j('#tool_stroke').css("display", "none");
							$j('#border_box').css("display", "none");
							$j('#fill_box').css("display", "none");
							setImageURL(svgCanvas.getHref(elem));
						} // image
						else if(el_name === 'g' || el_name === 'use') {
							//$j("#addart").trigger("mousedown");
							disableOther('editpanel');
							$j("#edit-panel").addClass('cbp-spmenu-open');
							
							//$j('#common-panel').css("margin-top", "68px");
							$j("#common-panel").addClass('cbp-spmenu-open');
							
							$j('#container_panel').show();
							//$j(".bottom-share-panel").css("display", "block");
							$j('#tool_ungroup').show();
							$j('#tool_ungroup').removeClass("disabled");
							$j('#tool_group').hide();
							var title = svgCanvas.getTitle();
							var label = $j('#g_title')[0];
							label.value = title;
							setInputWidth(label);
							var d = 'disabled';
							if(el_name == 'use') {
								label.setAttribute(d, d);
							} else {
								label.removeAttribute(d);
							}
						}else if(el_name === 'path' || el_name === 'line' || el_name === 'rect' || el_name === 'ellipse' || el_name === 'circle' ) {
							disableOther('addshape');
							$j("#addshape").addClass('active');
							$j("#addshape-panel").addClass('cbp-spmenu-open');
							
							//$j('#common-panel').css("margin-top", "123px");
							$j("#common-panel").addClass('cbp-spmenu-open');
						}
					}
					menu_items[(el_name === 'g' ? 'en':'dis') + 'ableContextMenuItems']('#ungroup');
					menu_items[((el_name === 'g' || !multiselected) ? 'dis':'en') + 'ableContextMenuItems']('#group');
				} // if (elem != null)
				else if (multiselected) {
					//$j('#multiselected_panel').show();
					disableOther('editpanel');
					$j("#edit-panel").addClass('cbp-spmenu-open');
					
					//$j('#common-panel').css("margin-top", "68px");
					$j("#common-panel").addClass('cbp-spmenu-open');
					if(svgCanvas.hasImageSelected()){
						$j('#tool_fill').css("display", "none");
						$j('#tool_stroke').css("display", "none");
						$j('#border_box').css("display", "none");
						$j('#fill_box').css("display", "none");
					}else{
						$j('#fill_box').css("display", "block");
						$j('#tool_fill').css("display", "none");//Parth edited 6-5-2014 hide colorpicker
						$j('#tool_stroke').css("display", "block");
						$j('#border_box').css("display", "block");
					}
					
					//$j(".bottom-share-panel").css("display", "block");
					$j('#tool_group').show();
					$j('#tool_group').removeClass("disabled");
					$j('#tool_ungroup').hide();
					menu_items
						.enableContextMenuItems('#group')
						.disableContextMenuItems('#ungroup');
				} else {
					menu_items.disableContextMenuItems('#delete,#cut,#copy,#group,#ungroup,#move_front,#move_up,#move_down,#move_back');
					disableOther('pickcolor');
					$j("#pickcolor").addClass('active');
					$j("#pickcolor-panel").addClass('cbp-spmenu-open');
				}

				// update history buttons
				if (undoMgr.getUndoStackSize() > 0) {
					$j('#tool_undo').removeClass( 'disabled');
				}
				else {
					$j('#tool_undo').addClass( 'disabled');
				}
				if (undoMgr.getRedoStackSize() > 0) {
					$j('#tool_redo').removeClass( 'disabled');
				}
				else {
					$j('#tool_redo').addClass( 'disabled');
				}

				svgCanvas.addedNew = false;

				if ( (elem && !is_node)	|| multiselected) {
					// update the selected elements' layer
					$j('#selLayerNames').removeAttr('disabled').val(currentLayerName);

					// Enable regular menu options
					canv_menu.enableContextMenuItems('#delete,#cut,#copy,#move_front,#move_up,#move_down,#move_back');
				}
				else {
					$j('#selLayerNames').attr('disabled', 'disabled');
				}
			};
			$j('#text').focus( function(){ textBeingEntered = true; } );
			$j('#text').blur( function(){ textBeingEntered = false; } );

			// bind the selected event to our function that handles updates to the UI
			svgCanvas.bind("selected", selectedChanged);
			svgCanvas.bind("transition", elementTransition);
			svgCanvas.bind("changed", elementChanged);
			svgCanvas.bind("saved", saveHandler);
			
			svgCanvas.bind("exported", exportHandler);
			svgCanvas.bind("zoomed", zoomChanged);
			svgCanvas.bind("contextset", contextChanged);
			svgCanvas.bind("extension_added", extAdded);
			
			svgCanvas.textActions.setInputElem($j("#text")[0]);

			var str = '<div class="palette_item" data-rgb="none"></div>'
			$j.each(palette, function(i,item){
				str += '<div class="palette_item" style="background-color: ' + item + ';" data-rgb="' + item + '"></div>';
			});
			$j('#palette').append(str);

			// Set up editor background functionality
			// TODO add checkerboard as "pattern"
			var color_blocks = ['#FFF','#888','#000'];
			var str = '';
			$j.each(color_blocks, function() {
				str += '<div class="color_block" style="background-color:' + this + ';"></div>';
			});
			$j('#bg_blocks').append(str);
			var blocks = $j('#bg_blocks div');
			var cur_bg = 'cur_background';
			blocks.each(function() {
				var blk = $j(this);
				blk.click(function() {
					blocks.removeClass(cur_bg);
					$j(this).addClass(cur_bg);
				});
			});

			if($j.pref('bkgd_color')) { 
				setBackground($j.pref('bkgd_color'), $j.pref('bkgd_url'));
			} else if($j.pref('bkgd_url')) {
				// No color set, only URL
				setBackground(defaultPrefs.bkgd_color, $j.pref('bkgd_url'));
			}

			if($j.pref('img_save')) {
				curPrefs.img_save = $j.pref('img_save');
				$j('#image_save_opts input').val([curPrefs.img_save]);
			}

			var changeRectRadius = function(ctl) {
				svgCanvas.setRectRadius(ctl.value);
			}

			var changeFontSize = function(ctl) {
				$j("#font_size").val(ctl.value);
				svgCanvas.setFontSize(ctl.value);
			}
			var changeStrokeWidth = function(ctl) {
				var val = ctl.value;
				$j('#stroke_width').val(val);
				if(val == 0 && selectedElement && ['line', 'polyline'].indexOf(selectedElement.nodeName) >= 0) {
					val = ctl.value = 1;
				}
				svgCanvas.setStrokeWidth(val);
			}
			var changeRotationAngle = function(ctl) {
				svgCanvas.setRotationAngle(ctl.value);
				$j('#tool_reorient').toggleClass('disabled', ctl.value == 0);
			}
			var changeZoom = function(ctl) {
				var zoomlevel = ctl.value / 100;
				if(zoomlevel < .001) {
					ctl.value = .1;
					return;
				}
				var zoom = svgCanvas.getZoom();
				var w_area = workarea;

				zoomChanged(window, {
					width: 0,
					height: 0,
					// center pt of scroll position
					x: (w_area[0].scrollLeft + w_area.width()/2)/zoom,
					y: (w_area[0].scrollTop + w_area.height()/2)/zoom,
					zoom: zoomlevel
				}, true);
			}

			var changeOpacity = function(ctl, val, noUndo) {
				if(val == null) val = ctl.value;
				$j('#group_opacity').val(val);
				//var complete = false;
				if(!ctl || !ctl.handle) {
					$j('#opac_slider').slider('option', 'value', val);
					//var complete = false;
				}
				svgCanvas.setOpacity(val/100);
				//if(noUndo)	svgCanvas.setOpacity(val/100);
				//else		svgCanvas.setOpacity(val, complete);	
			}

			var changeBlur = function(ctl, val, noUndo) {
				if(val == null) val = ctl.value;
				$j('#blur').val(val);
				var complete = false;
				if(!ctl || !ctl.handle) {
					$j('#blur_slider').slider('option', 'value', val);
					complete = true;
				}
				svgCanvas.setBlurNoUndo(val);
				if(noUndo)	svgCanvas.setBlurNoUndo(val);
				else		svgCanvas.setBlur(val, complete);			
			}

			var operaRepaint = function() {
				// Repaints canvas in Opera. Needed for stroke-dasharray change as well as fill change
				if(!window.opera) return;
				$j('<p/>').hide().appendTo('body').remove();
			}

			$j('#stroke_style').change(function(){
				svgCanvas.setStrokeAttr('stroke-dasharray', $j(this).val());
				operaRepaint();
			});

			$j('#stroke_linejoin').change(function(){
				svgCanvas.setStrokeAttr('stroke-linejoin', $j(this).val());
				operaRepaint();
			});


			// Lose focus for select elements when changed (Allows keyboard shortcuts to work better)
			$j('select').change(function(){$j(this).blur();});

			// fired when user wants to move elements to another layer
			var promptMoveLayerOnce = false;
			$j('#selLayerNames').change(function(){
				var destLayer = this.options[this.selectedIndex].value;
				var confirm_str = uiStrings.notification.QmoveElemsToLayer.replace('%s',destLayer);
				var moveToLayer = function(ok) {
					if(!ok) return;
					promptMoveLayerOnce = true;
					svgCanvas.moveSelectedToLayer(destLayer);
					svgCanvas.clearSelection();
					populateLayers();
				}
				if (destLayer) {
					if(promptMoveLayerOnce) {
						moveToLayer(true);
					} else {
						$j.confirm(confirm_str, moveToLayer);
					}
				}
			});

			$j('#font_family').change(function() {
				svgCanvas.setFontFamily(this.value);
			});

			$j('#seg_type').change(function() {
				svgCanvas.setSegType($j(this).val());
			});

			$j('#prb_name_title_textarea').keyup(function(){
				svgCanvas.setTextContent(this.value);
			});

			$j('#prb_extra_field_textarea').keyup(function(){
				if(addExtraFlag == '1'){
					svgCanvas.setTextContent(this.value);	
				}
			});

			$j('#prb_title_textarea').keyup(function(){
				svgCanvas.setTextContent(this.value);
			});

			$j('#image_url').change(function(){
				setImageURL(this.value);
			});

			$j('#link_url').change(function() {
				if(this.value.length) {
					svgCanvas.setLinkURL(this.value);
				} else {
					svgCanvas.removeHyperlink();
				}
			});

			$j('#g_title').change(function() {
				svgCanvas.setGroupTitle(this.value);
			});

			$j('.attr_changer').change(function() {
				var attr = this.getAttribute("data-attr");
				var val = this.value;
				var valid = svgedit.units.isValidUnit(attr, val, selectedElement);

				if(!valid) {
					$j.alert(uiStrings.notification.invalidAttrValGiven);
					this.value = selectedElement.getAttribute(attr);
					return false;
				}

				if (attr !== "id") {
					if (isNaN(val)) {
						val = svgCanvas.convertToNum(attr, val);
					} else if(curConfig.baseUnit !== 'px') {
						// Convert unitless value to one with given unit

						var unitData = svgedit.units.getTypeMap();

						if(selectedElement[attr] || svgCanvas.getMode() === "pathedit" || attr === "x" || attr === "y") {
							val *= unitData[curConfig.baseUnit];
						}
					}
				}

				// if the user is changing the id, then de-select the element first
				// change the ID, then re-select it with the new ID
				if (attr === "id") {
					var elem = selectedElement;
					svgCanvas.clearSelection();
					elem.id = val;
					svgCanvas.addToSelection([elem],true);
				}
				else {
					svgCanvas.changeSelectedAttribute(attr, val);
				}
				this.blur();
			});

			// Prevent selection of elements when shift-clicking
			$j('#palette').mouseover(function() {
				var inp = $j('<input type="hidden">');
				$j(this).append(inp);
				inp.focus().remove();
			})

			$j('.palette_item').mousedown(function(evt){
				var right_click = evt.button === 2;
				var isStroke = evt.shiftKey || right_click;
				var picker = isStroke ? "stroke" : "fill";
				var color = $j(this).attr('data-rgb');
				var paint = null;

				// Webkit-based browsers returned 'initial' here for no stroke
				if (color === 'none' || color === 'transparent' || color === 'initial') {
					color = 'none';
					paint = new $j.jGraduate.Paint();
				}
				else {
					paint = new $j.jGraduate.Paint({alpha: 100, solidColor: color.substr(1)});
				}

				paintBox[picker].setPaint(paint);

				if (isStroke) {
					svgCanvas.setColor('stroke', color);
					if (color != 'none' && svgCanvas.getStrokeOpacity() != 1) {
						svgCanvas.setPaintOpacity('stroke', 1.0);
					}
				} else {
					svgCanvas.setColor('fill', color);
					if (color != 'none' && svgCanvas.getFillOpacity() != 1) {
						svgCanvas.setPaintOpacity('fill', 1.0);
					}
				}
				updateToolButtonState();
			}).bind('contextmenu', function(e) {e.preventDefault()});

			$j("#toggle_stroke_tools").on("click", function() {
				$j("#tools_bottom").toggleClass("expanded");
			});

			// This is a common function used when a tool has been clicked (chosen)
			// It does several common things:
			// - removes the tool_button_current class from whatever tool currently has it
			// - hides any flyouts
			// - adds the tool_button_current class to the button passed in
			var toolButtonClick = function(button, noHiding) {
				if ($j(button).hasClass('disabled')) return false;
				if($j(button).parent().hasClass('tools_flyout')) return true;
				var fadeFlyouts = fadeFlyouts || 'normal';
				if(!noHiding) {
					//$j('.tools_flyout').delay(1000).fadeOut(fadeFlyouts);
				}
				$j('#styleoverrides').text('');
				workarea.css('cursor','auto');
				$j('.tool_button_current').removeClass('tool_button_current').addClass('tool_button');
				$j(button).addClass('tool_button_current').removeClass('tool_button');
				return true;
			};

			(function() {
				var last_x = null, last_y = null, w_area = workarea[0],
					panning = false, keypan = false;

				$j('#svgcanvas').bind('mousemove mouseup', function(evt) {
					if(panning === false) return;

					w_area.scrollLeft -= (evt.clientX - last_x);
					w_area.scrollTop -= (evt.clientY - last_y);

					last_x = evt.clientX;
					last_y = evt.clientY;

					if(evt.type === 'mouseup') panning = false;
					return false;
				}).mousedown(function(evt) {
					if(evt.button === 1 || keypan === true) {
						panning = true;
						last_x = evt.clientX;
						last_y = evt.clientY;
						return false;
					}
				});

				$j(window).mouseup(function() {
					panning = false;
				});

				$j(document).bind('keydown', 'space', function(evt) {
					svgCanvas.spaceKey = keypan = true;
					evt.preventDefault();
				}).bind('keyup', 'space', function(evt) {
					evt.preventDefault();
					svgCanvas.spaceKey = keypan = false;
				}).bind('keydown', 'shift', function(evt) {
					if(svgCanvas.getMode() === 'zoom') {
						workarea.css('cursor', zoomOutIcon);
					}
				}).bind('keyup', 'shift', function(evt) {
					if(svgCanvas.getMode() === 'zoom') {
						workarea.css('cursor', zoomInIcon);
					}
				})
			}());

			function setStrokeOpt(opt, changeElem) {
				var id = opt.id;
				var bits = id.split('_');
				var pre = bits[0];
				var val = bits[1];

				if(changeElem) {
					svgCanvas.setStrokeAttr('stroke-' + pre, val);
				}
				operaRepaint();
				setIcon('#cur_' + pre , id, 20);
				$j(opt).addClass('current').siblings().removeClass('current');
			}

			(function() {
				var button = $j('#main_icon');
				var overlay = $j('#main_icon span');
				var list = $j('#main_menu');
				var on_button = false;
				var height = 0;
				var js_hover = true;
				var set_click = false;

				var hideMenu = function() {
					list.fadeOut(200);
				};

				/*$j(window).mouseup(function(evt) {
					if(!on_button) {
						button.removeClass('buttondown');
						// do not hide if it was the file input as that input needs to be visible
						// for its change event to fire
						if (evt.target.tagName != "INPUT") {
							list.fadeOut(200);
						} else if(!set_click) {
							set_click = true;
							$j(evt.target).click(function() {
								list.css('margin-left','-9999px').show();
							});
						}
					}
					on_button = false;
				}).mousedown(function(evt) {
// 					$j(".contextMenu").hide();
// 					console.log('cm', $j(evt.target).closest('.contextMenu'));

					var islib = $j(evt.target).closest('div.tools_flyout, .contextMenu').length;
					trace("islib = " + islib);
					if(!islib) $j('.tools_flyout:visible,.contextMenu').fadeOut(250);
				});*/
				$j(window).mouseup(function(evt) {
					//trace("evt.target = " + $j(evt.target));
					//trace($j(evt.target).closest('div.tools_flyout'));
					//if(!$j("#addshape").hasClass('active')){
						var islib = $j(evt.target).closest('div.tools_flyout, .contextMenu').length;
						//trace("islib = " + islib);
						if(!islib) $j('.tools_flyout:visible,.contextMenu').hide();
						
						$j('.tools_flyout').hide();
						
						if(!on_button) {
							button.removeClass('buttondown');
							// do not hide if it was the file input as that input needs to be visible
							// for its change event to fire
							if (evt.target.tagName != "INPUT") {
								list.fadeOut(200);
							} else if(!set_click) {
								set_click = true;
								$j(evt.target).click(function() {
									list.css('margin-left','-9999px').show();
								});
							}
						}
						on_button = false;
					//}
				});

				/*overlay.bind('mousedown',function() {
					if (!button.hasClass('buttondown')) {
						button.addClass('buttondown').removeClass('buttonup')
						// Margin must be reset in case it was changed before;
						list.css('margin-left',0).show();
						if(!height) {
							height = list.height();
						}
						// Using custom animation as slideDown has annoying "bounce effect"
						list.css('height',0).animate({
							'height': height
						},200);
						on_button = true;
						return false;
					} else {
						button.removeClass('buttondown').addClass('buttonup');
						list.fadeOut(200);
					}
				}).hover(function() {
					on_button = true;
				}).mouseout(function() {
					on_button = false;
				});*/

				var list_items = $j('#main_menu li');

				// Check if JS method of hovering needs to be used (Webkit bug)
				list_items.mouseover(function() {
					js_hover = ($j(this).css('background-color') == 'rgba(0, 0, 0, 0)');

					list_items.unbind('mouseover');
					if(js_hover) {
						list_items.mouseover(function() {
							this.style.backgroundColor = '#FFC';
						}).mouseout(function() {
							this.style.backgroundColor = 'transparent';
							return true;
						});
					}
				});
			}());
			// Made public for UI customization.
			// TODO: Group UI functions into a public svgEditor.ui interface.
			Editor.addDropDown = function(elem, callback, dropUp) {
				if ($j(elem).length == 0) return; // Quit if called on non-existant element
				var button = $j(elem).find('button');

				var list = $j(elem).find('ul').attr('id', $j(elem)[0].id + '-list');

				if(!dropUp) {
					// Move list to place where it can overflow container
					//$j('#option_lists').append(list); // commented by rws to change the postion of dropdown
					$j('#tool_font_family').append(list); 
				}

				var on_button = false;
				if(dropUp) {
					$j(elem).addClass('dropup');
				}

				list.find('li').bind('mouseup', callback);

				$j(window).mouseup(function(evt) {
					if(!on_button) {
						button.removeClass('down');
						list.hide();
					}
					on_button = false;
				});

				button.bind('mousedown',function() {
					if (!button.hasClass('down')) {
						button.addClass('down');

						if(!dropUp) {
							var pos = $j(elem).position();
							list.css({
								top: pos.top + 24,
								left: pos.left - 10
							});
						}
						list.show();

						on_button = true;
					} else {
						button.removeClass('down');
						list.hide();
					}
				}).hover(function() {
					on_button = true;
				}).mouseout(function() {
					on_button = false;
				});
			}

			// TODO: Combine this with addDropDown or find other way to optimize
			var addAltDropDown = function(elem, list, callback, opts) {
				var button = $j(elem);
				var list = $j(list);
				var on_button = false;
				var dropUp = opts.dropUp;
				if(dropUp) {
					$j(elem).addClass('dropup');
				}
				list.find('li').bind('mouseup', function() {
					if(opts.seticon) {
						setIcon('#cur_' + button[0].id , $j(this).children());
						$j(this).addClass('current').siblings().removeClass('current');
					}
					callback.apply(this, arguments);

				});

				$j(window).mouseup(function(evt) {
					if(!on_button) {
						button.removeClass('down');
						list.hide();
						list.css({top:0, left:0});
					}
					on_button = false;
				});

				var height = list.height();
				$j(elem).bind('mousedown',function() {
					var off = $j(elem).offset();
					if(dropUp) {
						off.top -= list.height();
						off.left += 8;
					} else {
						off.top += $j(elem).height();
					}
					$j(list).offset(off);

					if (!button.hasClass('down')) {
						button.addClass('down');
						list.show();
						on_button = true;
						return false;
					} else {
						button.removeClass('down');
						// CSS position must be reset for Webkit
						list.hide();
						list.css({top:0, left:0});
					}
				}).hover(function() {
					on_button = true;
				}).mouseout(function() {
					on_button = false;
				});

				if(opts.multiclick) {
					list.mousedown(function() {
						on_button = true;
					});
				}
			}

			Editor.addDropDown('#font_family_dropdown', function() {
				var fam = $j(this).text();
				$j('#font_family').val($j(this).text()).change();
			});

			Editor.addDropDown('#opacity_dropdown', function() {
				if($j(this).find('div').length) return;
				var perc = parseInt($j(this).text().split('%')[0]);
				changeOpacity(false, perc);
			}, true);

			// For slider usage, see: http://jqueryui.com/demos/slider/
			$j("#opac_slider").slider({
				min: 0,
				max: 100,
				step: 1,
				range: "min",				
				orientation: "horizontal",
				start: function() {
					$j('#opacity_dropdown li:not(.special)').hide();
				},
				stop: function() {
					$j('#opacity_dropdown li').show();
					$j(window).mouseup();
				},
				slide: function(evt, ui){
					//alert("ui.value = " + ui.value);
					changeOpacity(ui, 100-ui.value);
				}
			}).draggable();

			Editor.addDropDown('#blur_dropdown', $j.noop, true);

			var slideStart = false;

			$j("#blur_slider").slider({
				max: 10,
				step: .1,
				range: "min",
				orientation: "horizontal",
				stop: function(evt, ui) {
					slideStart = false;
					changeBlur(ui);
					$j('#blur_dropdown li').show();
					$j(window).mouseup();
				},
				start: function() {
					slideStart = true;
				},
				slide: function(evt, ui){
					changeBlur(ui, null, slideStart);
				}
			}).draggable();
			
			Editor.addDropDown('#stroke_dropdown', $j.noop, true);

			var slideStart = false;
			/*$j( "#stroke_slider" ).change(function(event, ui) {
				//trace("ui = " + ui);
				//trace(event);
				changeStrokeWidth(event.target, null, slideStart);
			});*/
			$j("#stroke_slider").slider({
				min: 0,
				max: 10,
				step: 1,
				range: "min",
				orientation: "horizontal",
				stop: function(evt, ui) {
					slideStart = false;
					changeStrokeWidth(ui);
					$j('#stroke_dropdown li').show();
					$j(window).mouseup();
				},
				start: function() {
					slideStart = true;
				},
				slide: function(evt, ui){
					changeStrokeWidth(ui, null, slideStart);
				}
			}).draggable();
			
			var updateCanvas = Editor.updateCanvas = function onStrokeChange(){
				
			}
			
			/*Editor.addDropDown('#font_size_dropdown', $j.noop, true);*/

			var slideStart = false;

			$j("#font_size_slider").slider({
				max: 50,
				min: 8,
				step: 1,
				range: "min",
				orientation: "horizontal",
				value: $j("#font_size").val(),
				stop: function(evt, ui) {
					slideStart = false;
					changeFontSize(ui);
					$j('#font_size_dropdown li').show();
					$j(window).mouseup();
				},
				start: function() {
					slideStart = true;
				},
				slide: function(evt, ui){
					changeFontSize(ui, null, slideStart);
				}
			}).draggable();
			
			Editor.addDropDown('#zoom_dropdown', function() {
				var item = $j(this);
				var val = item.attr('data-val');
				if(val) {
					zoomChanged(window, val);
				} else {
					changeZoom({value:parseInt(item.text())});
				}
			}, true);

			addAltDropDown('#stroke_linecap', '#linecap_opts', function() {
				setStrokeOpt(this, true);
			}, {dropUp: true});

			addAltDropDown('#stroke_linejoin', '#linejoin_opts', function() {
				setStrokeOpt(this, true);
			}, {dropUp: true});

			addAltDropDown('#tool_position', '#position_opts', function() {
				var letter = this.id.replace('tool_pos','').charAt(0);
				svgCanvas.alignSelectedElements(letter, 'page');
			}, {multiclick: true});
			
			

			/*

			When a flyout icon is selected
				(if flyout) {
				- Change the icon
				- Make pressing the button run its stuff
				}
				- Run its stuff

			When its shortcut key is pressed
				- If not current in list, do as above
				, else:
				- Just run its stuff

			*/
			// Unfocus text input when workarea is mousedowned.
			(function() {
				var inp;

				var unfocus = function() {
					$j(inp).blur();
				}

				$j('#svg_editor').find('button, select, input:not(#text)').focus(function() {
					inp = this;
					ui_context = 'toolbars';
					workarea.mousedown(unfocus);
				}).blur(function() {
					ui_context = 'canvas';
					workarea.unbind('mousedown', unfocus);
					// Go back to selecting text if in textedit mode
					if(svgCanvas.getMode() == 'textedit') {
						$j('#prb_name_title_textarea').focus();
					}
				});

			}());

			var clickSelect = function() {
				if (toolButtonClick('#tool_select')) {
					svgCanvas.setMode('select');
					$j('#styleoverrides').text('#svgcanvas svg *{cursor:move;pointer-events:all}, #svgcanvas svg{cursor:default}');
				}
			};

			var clickFHPath = function() {
				if (toolButtonClick('#tool_fhpath')) {
					svgCanvas.setMode('fhpath');
				}
			};

			var clickLine = function(event) {
				if (toolButtonClick('#tool_line')) {
					var e = window.event || event;
					trace(this);
					if(e){
						trace(e);
						e.preventDefault();
						e.stopPropagation();
					}
					svgCanvas.setMode('line');
					$j("#tools_line").show();
					disableOther('addshape');
				}
			};

			var clickSquare = function(){
				if (toolButtonClick('#tool_square')) {
					svgCanvas.setMode('square');
				}
			};

			var clickRect = function(event){
				if (toolButtonClick('#tool_rect')) {
					var e = window.event || event;
					if(e){
						trace(e);
						e.preventDefault();
						e.stopPropagation();
					}
					$j('.tools_flyout').hide();
					svgCanvas.setMode('rect');
					$j("#tools_rect").show();
					$j("#tools_rect_show").removeAttr("class").addClass("flyout_current tool_button_current tool_rect");
					disableOther('addshape');
				}
			};

			var clickFHRect = function(){
				if (toolButtonClick('#tool_fhrect')) {
					svgCanvas.setMode('fhrect');
				}
			};

			var clickCircle = function(){
				if (toolButtonClick('#tool_circle')) {
					svgCanvas.setMode('circle');
				}
			};

			var clickEllipse = function(event){
				if (toolButtonClick('#tool_ellipse')) {
					var e = window.event || event;
					if(e){
						trace(e);
						e.preventDefault();
						e.stopPropagation();
					}
					$j('.tools_flyout').hide();
					svgCanvas.setMode('ellipse');
					$j("#tools_ellipse").show();
					disableOther('addshape');
				}
			};

			var clickFHEllipse = function(){
				if (toolButtonClick('#tool_fhellipse')) {
					svgCanvas.setMode('fhellipse');
				}
			};

			var clickImage = function(){
				if (toolButtonClick('#tool_image')) {
					svgCanvas.setMode('image');
				}
			};

			var clickZoom = function(){
				if (toolButtonClick('#tool_zoom')) {
					svgCanvas.setMode('zoom');
					workarea.css('cursor', zoomInIcon);
				}
			};

			var dblclickZoom = function(){
				if (toolButtonClick('#tool_zoom')) {
					zoomImage();
					setSelectMode();
				}
			};

			var clickText = Editor.clickText = function(){
				if (toolButtonClick('#tool_text')) {
					svgCanvas.setMode('text');
				}
			};

			var clickPath = function(){
				if (toolButtonClick('#tool_path')) {
					svgCanvas.setMode('path');
				}
			};

			// Delete is a contextual tool that only appears in the ribbon if
			// an element has been selected
			var deleteSelected = function() {
				console.log(selectedElement.getAttribute('class'));
				if (selectedElement != null || multiselected) {
					
					var currencySymbol = jQuery('#currencySymbol').val();
			    	var main_price = _getCurrentPrice();
			    	var current_price = formatePrice(main_price);
			    	var _class = selectedElement.getAttribute('class');

			    	if(_class == window.faClass){
			    		var icon_price = parseFloat(jQuery('#icon_price').val());	
			    		var final_price = _getFinalPrice(currencySymbol,current_price,icon_price,'icon_price');
			    		_setPrice(final_price);
			    		jQuery('#cb_icon').prop('checked',false);
				    	isFaAdded = false;
			    	}
			    	if(_class == window.imageClass){
			    		var image_price = parseFloat(jQuery('#image_price').val());	
			    		var final_price = _getFinalPrice(currencySymbol,current_price,image_price,'image_price');
			    		_setPrice(final_price);
			    		jQuery('#cb_image').prop('checked',false);
				    	isImageAdded = false;	
				    	imgExists = '';
						addImageFlag = '0';
			    	}
			    	if(_class == window.logoClass){
			    		var image_price = parseFloat(jQuery('#image_price').val());	
			    		var final_price = _getFinalPrice(currencySymbol,current_price,image_price,'image_price');
			    		_setPrice(final_price);
			    		jQuery('#cb_image').prop('checked',false);
				    	isImageAdded = false;	
				    	imgExists = '';
						addImageFlag = '0';
			    	}

					svgCanvas.deleteSelectedElements();
				}
			};

			var cutSelected = function() {
				if (selectedElement != null || multiselected) {
					svgCanvas.cutSelectedElements();
				}
			};

			var copySelected = function() {
				if (selectedElement != null || multiselected) {
					svgCanvas.copySelectedElements();
				}
			};

			var pasteInCenter = function() {
				var zoom = svgCanvas.getZoom();
				var x = (workarea[0].scrollLeft + workarea.width()/2)/zoom  - svgCanvas.contentW;
				var y = (workarea[0].scrollTop + workarea.height()/2)/zoom  - svgCanvas.contentH;
				svgCanvas.pasteElements('in_place', x, y);
			}

			var moveToTopSelected = function() {
				if (selectedElement != null) {
					svgCanvas.moveToTopSelectedElement();
				}
			};

			var moveToBottomSelected = function() {
				if (selectedElement != null) {
					svgCanvas.moveToBottomSelectedElement();
				}
			};

			var moveUpDownSelected = function(dir) {
				if (selectedElement != null) {
					svgCanvas.moveUpDownSelected(dir);
				}
			};

			var convertToPath = function() {
				if (selectedElement != null) {
					svgCanvas.convertToPath();
				}
			}

			var reorientPath = function() {
				if (selectedElement != null) {
					path.reorient();
				}
			}

			var makeHyperlink = function() {
				if (selectedElement != null || multiselected) {
					$j.prompt(uiStrings.notification.enterNewLinkURL, "http://", function(url) {
						if(url) svgCanvas.makeHyperlink(url);
					});
				}
			}

			var moveSelected = function(dx,dy) {
				if (selectedElement != null || multiselected) {
					if(curConfig.gridSnapping) {
						// Use grid snap value regardless of zoom level
						var multi = svgCanvas.getZoom() * curConfig.snappingStep;
						dx *= multi;
						dy *= multi;
					}
					svgCanvas.moveSelectedElements(dx,dy);
				}
			};

			var linkControlPoints = function() {
				var linked = !$j('#tool_node_link').hasClass('push_button_pressed');
				if (linked)
					$j('#tool_node_link').addClass('push_button_pressed').removeClass('tool_button');
				else
					$j('#tool_node_link').removeClass('push_button_pressed').addClass('tool_button');

				path.linkControlPoints(linked);
			}

			var clonePathNode = function() {
				if (path.getNodePoint()) {
					path.clonePathNode();
				}
			};

			var deletePathNode = function() {
				if (path.getNodePoint()) {
					path.deletePathNode();
				}
			};

			var addSubPath = function() {
				var button = $j('#tool_add_subpath');
				var sp = !button.hasClass('push_button_pressed');
				if (sp) {
					button.addClass('push_button_pressed').removeClass('tool_button');
				} else {
					button.removeClass('push_button_pressed').addClass('tool_button');
				}

				path.addSubPath(sp);

			};

			var opencloseSubPath = function() {
				path.opencloseSubPath();
			}

			var selectNext = function() {
				svgCanvas.cycleElement(1);
			};

			var selectPrev = function() {
				svgCanvas.cycleElement(0);
			};

			var rotateSelected = function(cw,step) {
				if (selectedElement == null || multiselected) return;
				if(!cw) step *= -1;
				var new_angle = $j('#angle').val()*1 + step;
				svgCanvas.setRotationAngle(new_angle);
				updateContextPanel();
			};

			var clickClear = function(){
				var dims = curConfig.dimensions;
				$j.confirm(uiStrings.notification.QwantToClear, function(ok) {
					if(!ok) return;
					setSelectMode();
					svgCanvas.clear();
					svgCanvas.setResolution(dims[0], dims[1]);
					updateCanvas(true);
					zoomImage();
					populateLayers();
					updateContextPanel();
					prepPaints();
					svgCanvas.runExtensions('onNewDocument');
				});
			};
			
			var clickClear_All = Editor.clickClear_All = function(){
				//var dims = curConfig.dimensions;
				//setSelectMode();
				svgCanvas.clear();
				//svgCanvas.setResolution(dims[0], dims[1]);
				//updateCanvas(true);
				//zoomImage();
				//populateLayers();
				//updateContextPanel();
				//prepPaints();
				//svgCanvas.runExtensions('onNewDocument');
			};

			var clickBold = function(){
				svgCanvas.setBold( !svgCanvas.getBold() );
				updateContextPanel();
				return false;
			};

			var clickItalic = function(){
				svgCanvas.setItalic( !svgCanvas.getItalic() );
				updateContextPanel();
				return false;
			};

			var clickSave = Editor.clickSave = function(){
				// In the future, more options can be provided here
				var saveOpts = {
					//'images': curPrefs.img_save,
					'images': true,
					'round_digits': 6
				}
				return svgCanvas.save(saveOpts);
			};

			var clickExport = Editor.clickExport = function() {
				if(!customHandlers.pngsave)  {
					var str = uiStrings.notification.loadingImage;
				}
				
				if(window.canvg) {
					return svgCanvas.rasterExport();
				} else {
					$j.getScript(jspath+'canvg/rgbcolor.js', function() {
						$j.getScript(jspath+'canvg/canvg.js', function() {
							return svgCanvas.rasterExport();
						});
					});
				}
			}
			// by default, svgCanvas.open() is a no-op.
			// it is up to an extension mechanism (opera widget, etc)
			// to call setCustomHandlers() which will make it do something
			var clickOpen = function(){
				svgCanvas.open();
			};
			var clickImport = Editor.clickImport = function(){
			};

			var clickUndo = function(){
				if (undoMgr.getUndoStackSize() > 0) {
					undoMgr.undo();
					populateLayers();
				}
			};

			var clickRedo = function(){
				if (undoMgr.getRedoStackSize() > 0) {
					undoMgr.redo();
					populateLayers();
				}
			};

			var clickGroup = function(){
				// group
				trace("multiselected = " + multiselected);
				if (multiselected) {
					svgCanvas.groupSelectedElements();
				}
				// ungroup
				else if(selectedElement){
					svgCanvas.ungroupSelectedElement();
				}
			};

			var clickClone = function(){
				//trace("cloning....");
				svgCanvas.cloneSelectedElements(20,20);
			};

			var clickAlign = function() {
				var letter = this.id.replace('tool_align','').charAt(0);
				svgCanvas.alignSelectedElements(letter, $j('#align_relative_to').val());
			};

			var zoomImage = function(multiplier) {
				var res = svgCanvas.getResolution();
				multiplier = multiplier?res.zoom * multiplier:1;
				$j('#zoom').val(multiplier * 100);
				svgCanvas.setZoom(multiplier);
				zoomDone();
				updateCanvas(true);
			};

			var zoomDone = function() {
				updateWireFrame();
			}

			var clickWireframe = function() {
				var wf = !$j('#tool_wireframe').hasClass('push_button_pressed');
				if (wf)
					$j('#tool_wireframe').addClass('push_button_pressed').removeClass('tool_button');
				else
					$j('#tool_wireframe').removeClass('push_button_pressed').addClass('tool_button');
				workarea.toggleClass('wireframe');

				if(supportsNonSS) return;
				var wf_rules = $j('#wireframe_rules');
				if(!wf_rules.length) {
					wf_rules = $j('<style id="wireframe_rules"><\/style>').appendTo('head');
				} else {
					wf_rules.empty();
				}

				updateWireFrame();
			}

			var updateWireFrame = function() {
				if(supportsNonSS) return;
				var rule = "#workarea.wireframe #svgcontent * { stroke-width: " + 1/svgCanvas.getZoom() + "px; }";
				$j('#wireframe_rules').text(workarea.hasClass('wireframe') ? rule : "");
			}

			var showSourceEditor = function(e, forSaving){
				if (editingsource) return;
				editingsource = true;

				$j('#save_output_btns').toggle(!!forSaving);
				$j('#tool_source_back').toggle(!forSaving);

				var str = orig_source = svgCanvas.getSvgString();
				$j('#svg_source_textarea').val(str);
				$j('#svg_source_editor').fadeIn();
				properlySourceSizeTextArea();
				$j('#svg_source_textarea').focus();
			};

			$j('#svg_docprops_container, #svg_add_note_container, #svg_image_upload_container, #svg_login_window_container, #svg_beforeaddtocart_container, #svg_prefs_container').draggable({cancel:'button,fieldset', containment: 'window'});

			var showDocProperties = function(){
				if (docprops) return;
				docprops = true;
				$j('#image_save_opts input').val([curPrefs.img_save]);
				var res = svgCanvas.getResolution();
				if(curConfig.baseUnit !== "px") {
					res.w = svgedit.units.convertUnit(res.w) + curConfig.baseUnit;
					res.h = svgedit.units.convertUnit(res.h) + curConfig.baseUnit;
				}
				$j('#canvas_width').val(res.w);
				$j('#canvas_height').val(res.h);
				$j('#canvas_title').val(svgCanvas.getDocumentTitle());
				$j('#svg_docprops').show();
			};

			var svgaddnoteProperties = function(evt){
				if(evt.button==0){
					$j('#svg_add_note').show();
				}
			};
			
			var showPreferences = function(){
				if (preferences) return;
				preferences = true;
				$j('#main_menu').hide();
				var blocks = $j('#bg_blocks div');
				var cur_bg = 'cur_background';
				var canvas_bg = $j.pref('bkgd_color');
				var url = $j.pref('bkgd_url');
				blocks.each(function() {
					var blk = $j(this);
					var is_bg = blk.css('background-color') == canvas_bg;
					blk.toggleClass(cur_bg, is_bg);
					if(is_bg) $j('#canvas_bg_url').removeClass(cur_bg);
				});
				if(!canvas_bg) blocks.eq(0).addClass(cur_bg);
				if(url) {
					$j('#canvas_bg_url').val(url);
				}
				$j('grid_snapping_step').attr('value', curConfig.snappingStep);
				if (curConfig.gridSnapping == true) {
				    $j('#grid_snapping_on').attr('checked', 'checked');
				} else {
				    $j('#grid_snapping_on').removeAttr('checked');
				}

				$j('#svg_prefs').show();
			};

			var properlySourceSizeTextArea = function(){				
				var height = $j('#svg_source_container').height() - 80;
				$j('#svg_source_textarea').css('height', height);
			};

			var saveSourceEditor = function(){
				if (!editingsource) return;

				var saveChanges = function() {
					svgCanvas.clearSelection();
					hideSourceEditor();
					zoomImage();
					populateLayers();
					updateTitle();
					prepPaints();
				}

				if (!svgCanvas.setSvgString($j('#svg_source_textarea').val())) {
					$j.confirm(uiStrings.notification.QerrorsRevertToSource, function(ok) {
						if(!ok) return false;
						saveChanges();
					});
				} else {
					saveChanges();
				}
				setSelectMode();
			};

			var updateTitle = function(title) {
				title = title || svgCanvas.getDocumentTitle();
				var new_title = orig_title + (title?': ' + title:'');
				$j('title:first').text(new_title);
			}

			var saveDocProperties = function(){
				var new_title = $j('#canvas_title').val();
				updateTitle(new_title);
				svgCanvas.setDocumentTitle(new_title);
				var width = $j('#canvas_width'), w = width.val();
				var height = $j('#canvas_height'), h = height.val();

				if(w != "fit" && !svgedit.units.isValidUnit('width', w)) {
					$j.alert(uiStrings.notification.invalidAttrValGiven);
					width.parent().addClass('error');
					return false;
				}

				width.parent().removeClass('error');

				if(h != "fit" && !svgedit.units.isValidUnit('height', h)) {
					$j.alert(uiStrings.notification.invalidAttrValGiven);
					height.parent().addClass('error');
					return false;
				}

				height.parent().removeClass('error');

				if(!svgCanvas.setResolution(w, h)) {
					$j.alert(uiStrings.notification.noContentToFitTo);
					return false;
				}

				// set image save option
				curPrefs.img_save = $j('#image_save_opts :checked').val();
				$j.pref('img_save',curPrefs.img_save);
				updateCanvas();
				hideDocProperties();
			};

			var savePreferences = function() {
				// set background
				var color = $j('#bg_blocks div.cur_background').css('background-color') || '#FFF';
				setBackground(color, $j('#canvas_bg_url').val());

				// set language
				var lang = $j('#lang_select').val();
				if(lang != curPrefs.lang) {
					Editor.putLocale(lang);
				}

				// set icon size
				setIconSize($j('#iconsize').val());

				// set grid setting
				curConfig.gridSnapping = $j('#grid_snapping_on')[0].checked;
				curConfig.snappingStep = $j('#grid_snapping_step').val();
				curConfig.showRulers = $j('#show_rulers')[0].checked;

				$j('#rulers').toggle(curConfig.showRulers);
				if(curConfig.showRulers) updateRulers();
				curConfig.baseUnit = $j('#base_unit').val();

				svgCanvas.setConfig(curConfig);

				updateCanvas();
				hidePreferences();
			}

			function setBackground(color, url) {
				$j.pref('bkgd_color', color);
				$j.pref('bkgd_url', url);

				// This should be done in svgcanvas.js for the borderRect fill
				svgCanvas.setBackground(color, url);
			}

			var setIcon = Editor.setIcon = function(elem, icon_id, forcedSize) {
				var icon = (typeof icon_id === 'string') ? $j.getSvgIcon(icon_id, true) : icon_id.clone();
				if(!icon) {
					//console.log('NOTE: Icon image missing: ' + icon_id);
					return;
				}

				$j(elem).empty().append(icon);
			}

			var ua_prefix;
			(ua_prefix = function() {
				var regex = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/;
				var someScript = document.getElementsByTagName('script')[0];
				for(var prop in someScript.style) {
					if(regex.test(prop)) {
						// test is faster than match, so it's better to perform
						// that on the lot and match only when necessary
						return prop.match(regex)[0];
					}
				}

				// Nothing found so far?
				if('WebkitOpacity' in someScript.style) return 'Webkit';
				if('KhtmlOpacity' in someScript.style) return 'Khtml';

				return '';
			}());

			var scaleElements = function(elems, scale) {
				var prefix = '-' + ua_prefix.toLowerCase() + '-';

				var sides = ['top', 'left', 'bottom', 'right'];

				elems.each(function() {
					// Handled in CSS
					// this.style[ua_prefix + 'Transform'] = 'scale(' + scale + ')';

					var el = $j(this);
					var w = el.outerWidth() * (scale - 1);
					var h = el.outerHeight() * (scale - 1);
					var margins = {};

					for(var i = 0; i < 4; i++) {
						var s = sides[i];

						var cur = el.data('orig_margin-' + s);
						if(cur == null) {
							cur = parseInt(el.css('margin-' + s));
							// Cache the original margin
							el.data('orig_margin-' + s, cur);
						}
						var val = cur * scale;
						if(s === 'right') {
							val += w;
						} else if(s === 'bottom') {
							val += h;
						}

						el.css('margin-' + s, val);
					}
				});
			}

			var setIconSize = Editor.setIconSize = function(size, force) {
				if(size == curPrefs.size && !force) return;
				var sel_toscale = '#tools_top .toolset, #editor_panel > *, #history_panel > *,\
				#main_button, #tools_left > *, #path_node_panel > *, #multiselected_panel > *,\
				#g_panel > *, #tool_font_size > *, .tools_flyout';

				var elems = $j(sel_toscale);

				var scale = 1;

				if(typeof size == 'number') {
					scale = size;
				} else {
					var icon_sizes = { s:.75, m:1, l:1.25, xl:1.5 };
					scale = icon_sizes[size];
				}

				Editor.tool_scale = tool_scale = scale;

				setFlyoutPositions();

				var hidden_ps = elems.parents(':hidden');
				hidden_ps.css('visibility', 'hidden').show();
				scaleElements(elems, scale);
				hidden_ps.css('visibility', 'visible').hide();

				$j.pref('iconsize', size);
				$j('#iconsize').val(size);


				// Change icon size

				// Note that all rules will be prefixed with '#svg_editor' when parsed
				var cssResizeRules = {
// 					".tool_button,\
// 					.push_button,\
// 					.tool_button_current,\
// 					.push_button_pressed,\
// 					.disabled,\
// 					.icon_label,\
// 					.tools_flyout .tool_button": {
// 						'width': {s: '16px', l: '32px', xl: '48px'},
// 						'height': {s: '16px', l: '32px', xl: '48px'},
// 						'padding': {s: '1px', l: '2px', xl: '3px'}
// 					},
// 					".tool_sep": {
// 						'height': {s: '16px', l: '32px', xl: '48px'},
// 						'margin': {s: '2px 2px', l: '2px 5px', xl: '2px 8px'}
// 					},
// 					"#main_icon": {
// 						'width': {s: '31px', l: '53px', xl: '75px'},
// 						'height': {s: '22px', l: '42px', xl: '64px'}
// 					},
					"#tools_top": {
						'left': 50,
						'height': 72
					},
					"#tools_left": {
						'width': 31,
						'top': 74
					},
					"div#workarea": {
						'left': 38,
						'top': 74
					}
// 					"#tools_bottom": {
// 						'left': {s: '27px', l: '46px', xl: '65px'},
// 						'height': {s: '58px', l: '98px', xl: '145px'}
// 					},
// 					"#color_tools": {
// 						'border-spacing': {s: '0 1px'},
// 						'margin-top': {s: '-1px'}
// 					},
// 					"#color_tools .icon_label": {
// 						'width': {l:'43px', xl: '60px'}
// 					},
// 					".color_tool": {
// 						'height': {s: '20px'}
// 					},
// 					"#tool_opacity": {
// 						'top': {s: '1px'},
// 						'height': {s: 'auto', l:'auto', xl:'auto'}
// 					},
// 					"#tools_top input, #tools_bottom input": {
// 						'margin-top': {s: '2px', l: '4px', xl: '5px'},
// 						'height': {s: 'auto', l: 'auto', xl: 'auto'},
// 						'border': {s: '1px solid #555', l: 'auto', xl: 'auto'},
// 						'font-size': {s: '.9em', l: '1.2em', xl: '1.4em'}
// 					},
// 					"#zoom_panel": {
// 						'margin-top': {s: '3px', l: '4px', xl: '5px'}
// 					},
// 					"#copyright, #tools_bottom .label": {
// 						'font-size': {l: '1.5em', xl: '2em'},
// 						'line-height': {s: '15px'}
// 					},
// 					"#tools_bottom_2": {
// 						'width': {l: '295px', xl: '355px'},
// 						'top': {s: '4px'}
// 					},
// 					"#tools_top > div, #tools_top": {
// 						'line-height': {s: '17px', l: '34px', xl: '50px'}
// 					},
// 					".dropdown button": {
// 						'height': {s: '18px', l: '34px', xl: '40px'},
// 						'line-height': {s: '18px', l: '34px', xl: '40px'},
// 						'margin-top': {s: '3px'}
// 					},
// 					"#tools_top label, #tools_bottom label": {
// 						'font-size': {s: '1em', l: '1.5em', xl: '2em'},
// 						'height': {s: '25px', l: '42px', xl: '64px'}
// 					},
// 					"div.toolset": {
// 						'height': {s: '25px', l: '42px', xl: '64px'}
// 					},
// 					"#tool_bold, #tool_italic": {
// 						'font-size': {s: '1.5em', l: '3em', xl: '4.5em'}
// 					},
// 					"#sidepanels": {
// 						'top': {s: '50px', l: '88px', xl: '125px'},
// 						'bottom': {s: '51px', l: '68px', xl: '65px'}
// 					},
// 					'#layerbuttons': {
// 						'width': {l: '130px', xl: '175px'},
// 						'height': {l: '24px', xl: '30px'}
// 					},
// 					'#layerlist': {
// 						'width': {l: '128px', xl: '150px'}
// 					},
// 					'.layer_button': {
// 						'width': {l: '19px', xl: '28px'},
// 						'height': {l: '19px', xl: '28px'}
// 					},
// 					"input.spin-button": {
// 						'background-image': {l: "url('images/spinbtn_updn_big.png')", xl: "url('images/spinbtn_updn_big.png')"},
// 						'background-position': {l: '100% -5px', xl: '100% -2px'},
// 						'padding-right': {l: '24px', xl: '24px' }
// 					},
// 					"input.spin-button.up": {
// 						'background-position': {l: '100% -45px', xl: '100% -42px'}
// 					},
// 					"input.spin-button.down": {
// 						'background-position': {l: '100% -85px', xl: '100% -82px'}
// 					},
// 					"#position_opts": {
// 						'width': {all: (size_num*4) +'px'}
// 					}
				};

				var rule_elem = $j('#tool_size_rules');
				if(!rule_elem.length) {
					rule_elem = $j('<style id="tool_size_rules"><\/style>').appendTo('head');
				} else {
					rule_elem.empty();
				}

				if(size != 'm') {
					var style_str = '';
					$j.each(cssResizeRules, function(selector, rules) {
						selector = '#svg_editor ' + selector.replace(/,/g,', #svg_editor');
						style_str += selector + '{';
						$j.each(rules, function(prop, values) {
							if(typeof values === 'number') {
								var val = (values * scale) + 'px';
							} else if(values[size] || values.all) {
								var val = (values[size] || values.all);
							}
							style_str += (prop + ':' + val + ';');
						});
						style_str += '}';
					});
					//this.style[ua_prefix + 'Transform'] = 'scale(' + scale + ')';
					var prefix = '-' + ua_prefix.toLowerCase() + '-';
					style_str += (sel_toscale + '{' + prefix + 'transform: scale(' + scale + ');}'
					+ ' #svg_editor div.toolset .toolset {' + prefix + 'transform: scale(1); margin: 1px !important;}' // Hack for markers
					+ ' #svg_editor .ui-slider {' + prefix + 'transform: scale(' + (1/scale) + ');}' // Hack for sliders
					);
					rule_elem.text(style_str);
				}

				setFlyoutPositions();
			}

			var cancelOverlays = function(evt) {
				$j('#dialog_box').hide();
				if (!editingsource && !docprops && !preferences) {
					if(cur_context) {
						svgCanvas.leaveContext();
					}
					return;
				};

				if (editingsource) {
					if (orig_source !== $j('#svg_source_textarea').val()) {
						$j.confirm(uiStrings.notification.QignoreSourceChanges, function(ok) {
							if(ok) hideSourceEditor();
						});
					} else {
						hideSourceEditor();
					}
				}
				else if (docprops) {
					hideDocProperties();
				} else if (preferences) {
					hidePreferences();
				}
				resetScrollPos();
				
			};

			var hideSourceEditor = function(){
				$j('#svg_source_editor').hide();
				editingsource = false;
				$j('#svg_source_textarea').blur();
			};

			var hideDocProperties = function(){
				$j('#svg_docprops').hide();
				$j('#svg_add_note').hide();
				$j('#svg_beforeaddtocart').hide();
				$j('#svg_login_window').hide();
				$j('#svg_image_upload').hide();
				
				$j('#canvas_width,#canvas_height').removeAttr('disabled');
				$j('#resolution')[0].selectedIndex = 0;
				$j('#image_save_opts input').val([curPrefs.img_save]);
				docprops = false;
			};

			var hidePreferences = function(){
				$j('#svg_prefs').hide();
				preferences = false;
			};

			var win_wh = {width:$j(window).width(), height:$j(window).height()};

			var resetScrollPos = $j.noop, curScrollPos;

			// Fix for Issue 781: Drawing area jumps to top-left corner on window resize (IE9)
			if(svgedit.browser.isIE()) {
				(function() {
					resetScrollPos = function() {
						if(workarea[0].scrollLeft === 0
						&& workarea[0].scrollTop === 0) {
							workarea[0].scrollLeft = curScrollPos.left;
							workarea[0].scrollTop = curScrollPos.top;
						}
					}

					curScrollPos = {
						left: workarea[0].scrollLeft,
						top: workarea[0].scrollTop
					};

					$j(window).resize(resetScrollPos);
					svgEditor.ready(function() {
						// TODO: Find better way to detect when to do this to minimize
						// flickering effect
						setTimeout(function() {
							resetScrollPos();
						}, 500);
					});

					workarea.scroll(function() {
						curScrollPos = {
							left: workarea[0].scrollLeft,
							top: workarea[0].scrollTop
						};
					});
				}());
			}

			$j(window).resize(function(evt) {
				if (editingsource) {
					properlySourceSizeTextArea();
				}

				$j.each(win_wh, function(type, val) {
					var curval = $j(window)[type]();
					workarea[0]['scroll' + (type==='width'?'Left':'Top')] -= (curval - val)/2;
					win_wh[type] = curval;
				});
			});

			(function() {
				workarea.scroll(function() {
					// TODO:  jQuery's scrollLeft/Top() wouldn't require a null check
					if ($j('#ruler_x').length != 0) {
						$j('#ruler_x')[0].scrollLeft = workarea[0].scrollLeft;
					}
					if ($j('#ruler_y').length != 0) {
						$j('#ruler_y')[0].scrollTop = workarea[0].scrollTop;
					}
				});

			}());

			$j('#url_notice').click(function() {
				$j.alert(this.title);
			});

			$j('#change_image_url').click(promptImgURL);

			function promptImgURL() {
				var curhref = svgCanvas.getHref(selectedElement);
				curhref = curhref.indexOf("data:") === 0?"":curhref;
				$j.prompt(uiStrings.notification.enterNewImgURL, curhref, function(url) {
					if(url) setImageURL(url);
				});
			}

			// added these event handlers for all the push buttons so they
			// behave more like buttons being pressed-in and not images
			/*(function() {
				var toolnames = ['clear','open','save','source','delete','delete_multi','paste','clone','clone_multi','move_top','move_bottom'];
				var all_tools = '';
				var cur_class = 'tool_button_current';

				$j.each(toolnames, function(i,item) {
					all_tools += '#tool_' + item + (i==toolnames.length-1?',':'');
				});

				$j(all_tools).mousedown(function() {
					$j(this).addClass(cur_class);
				}).bind('mousedown mouseout', function() {
					$j(this).removeClass(cur_class);
				});

				$j('#tool_undo, #tool_redo').mousedown(function(){
					if (!$j(this).hasClass('disabled')) $j(this).addClass(cur_class);
				}).bind('mousedown mouseout',function(){
					$j(this).removeClass(cur_class);}
				);
			}());*/

			// switch modifier key in tooltips if mac
			// NOTE: This code is not used yet until I can figure out how to successfully bind ctrl/meta
			// in Opera and Chrome
			if (isMac && !window.opera) {
				var shortcutButtons = ["tool_clear", "tool_save", "tool_source", "tool_undo", "tool_redo", "tool_clone"];
				var i = shortcutButtons.length;
				while (i--) {
					var button = document.getElementById(shortcutButtons[i]);
					if (button != null) {
						var title = button.title;
						var index = title.indexOf("Ctrl+");
						button.title = [title.substr(0, index), "Cmd+", title.substr(index + 5)].join('');
					}
				}
			}

			// TODO: go back to the color boxes having white background-color and then setting
			//       background-image to none.png (otherwise partially transparent gradients look weird)
			var colorPicker = function(elem) {
				var picker = elem.attr('id') == 'stroke_color' ? 'stroke' : 'fill';
// 				var opacity = (picker == 'stroke' ? $j('#stroke_opacity') : $j('#fill_opacity'));
				var paint = paintBox[picker].paint;
				var title = (picker == 'stroke' ? 'Pick a Stroke Paint and Opacity' : 'Pick a Fill Paint and Opacity');
				var was_none = false;
				var pos = elem.offset();
				$j("#color_picker")
					.draggable({cancel:'.jGraduate_tabs, .jGraduate_colPick, .jGraduate_gradPick, .jPicker', containment: 'window'})
					.css(curConfig.colorPickerCSS || {'left': -311, 'top': -11.5})
					.jGraduate(
					{
						paint: paint,
						window: { pickerTitle: title },
						images: { clientPath: curConfig.jGraduatePath },
						newstop: 'inverse'
					},
					function(p) {
						paint = new $j.jGraduate.Paint(p);
						paintBox[picker].setPaint(paint);
						svgCanvas.setPaint(picker, paint);

						$j('#color_picker').hide();
					},
					function(p) {
						$j('#color_picker').hide();
					});
			};

			//added try catch in  updateToolButtonState function for first time add object on canvas (this._each is not a function)
			var updateToolButtonState = function() {
				try{
				var bNoFill = (svgCanvas.getColor('fill') == 'none');
				var bNoStroke = (svgCanvas.getColor('stroke') == 'none');
				var buttonsNeedingStroke = [ '#tool_fhpath', '#tool_line' ];
				var buttonsNeedingFillAndStroke = [ '#tools_rect .tool_button', '#tools_ellipse .tool_button', '#tool_text', '#tool_path'];
				//trace("bNoStroke = " + bNoStroke);
				if (bNoStroke) {
					for (var index in buttonsNeedingStroke) {
						var button = buttonsNeedingStroke[index];
						if ($j(button).hasClass('tool_button_current')) {
							clickSelect();
						}
						$j(button).addClass('disabled');
					}
				}
				else {
				//trace("bNoStroke = " + buttonsNeedingStroke[0]);
				//trace("bNoStroke = " + buttonsNeedingStroke[1]);
					for (var index in buttonsNeedingStroke) {
						//trace("index = " + index);
						var button = buttonsNeedingStroke[index];
						$j(button).removeClass('disabled');
					}
				}
				if (bNoStroke && bNoFill) {
					for (var index in buttonsNeedingFillAndStroke) {
						var button = buttonsNeedingFillAndStroke[index];
						if ($j(button).hasClass('tool_button_current')) {
							clickSelect();
						}
						$j(button).addClass('disabled');
					}
				}
				else {
					for (var index in buttonsNeedingFillAndStroke) {
						var button = buttonsNeedingFillAndStroke[index];
						$j(button).removeClass('disabled');
					}
				}

				svgCanvas.runExtensions("toolButtonStateUpdate", {
					nofill: bNoFill,
					nostroke: bNoStroke
				});

				// Disable flyouts if all inside are disabled
				$j('.tools_flyout').each(function() {
					var shower = $j('#' + this.id + '_show');
					var has_enabled = false;
					$j(this).children().each(function() {
						if(!$j(this).hasClass('disabled')) {
							has_enabled = true;
						}
					});
					shower.toggleClass('disabled', !has_enabled);
				});

				operaRepaint();
				}catch(e){
					trace(e);
					updateToolButtonState();
				}
			};



			var PaintBox = function(container, type) {
				var cur = curConfig[type === 'fill' ? 'initFill' : 'initStroke'];

				/*set up gradients to be used for the buttons*/
				var svgdocbox = new DOMParser().parseFromString(
					//'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><rect width="25" height="24" fill="#' + cur.color + '" opacity="' + cur.opacity + '"/><image overflow="visible" width="25" height="24" xlink:href="'+jspath+'jgraduate/images/picker.gif"  transform="matrix(1 0 0 1 7.321239e-004 0))"></image><defs><linearGradient id="gradbox_"/></defs></svg>', 'text/xml');
					'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><rect width="25" height="24" fill="#' + cur.color + '" opacity="' + cur.opacity + '"/><image overflow="visible" width="25" height="24" xlink:href="'+jspath+'jgraduate/images/picker.gif"  transform="matrix(1 0 0 1 7.321239e-004 0)"></image><defs><linearGradient id="gradbox_"/></defs></svg>', 'text/xml');
				var docElem = svgdocbox.documentElement;

				docElem = $j(container)[0].appendChild(document.importNode(docElem, true));
				docElem.setAttribute('width',26);

				this.rect = docElem.firstChild;
				/*trace("defs = " + docElem.getElementsByTagName('defs')[0]);*/
				this.defs = docElem.getElementsByTagName('defs')[0];
				this.grad = this.defs.firstChild;
				this.paint = new $j.jGraduate.Paint({solidColor: cur.color});
				this.type = type;

				this.setPaint = function(paint, apply) {
					// this.paint = paint;

					// var fillAttr = "none";
					// var ptype = paint.type;
					// var opac = paint.alpha / 100;

					// switch ( ptype ) {
					// 	case 'solidColor':
					// 		fillAttr = (paint[ptype] != 'none') ? "#" + paint[ptype] : paint[ptype];
					// 		break;
					// 	case 'linearGradient':
					// 	case 'radialGradient':
					// 		this.defs.removeChild(this.grad);
					// 		this.grad = this.defs.appendChild(paint[ptype]);
					// 		var id = this.grad.id = 'gradbox_' + this.type;
					// 		fillAttr = "url(#" + id + ')';
					// }

					// this.rect.setAttribute('fill', fillAttr);
					// this.rect.setAttribute('opacity', opac);

					// if(apply) {
					// 	svgCanvas.setColor(this.type, paintColor, true);
					// 	svgCanvas.setPaintOpacity(this.type, paintOpacity, true);
					// }
				}

				this.update = function(apply) {
					if(!selectedElement) return;
					var type = this.type;

					switch ( selectedElement.tagName ) {
					case 'use':
					case 'image':
					case 'foreignObject':
						// These elements don't have fill or stroke, so don't change
						// the current value
						return;
					case 'g':
					case 'a':
						var gPaint = null;

						var childs = selectedElement.getElementsByTagName('*');
						for(var i = 0, len = childs.length; i < len; i++) {
							var elem = childs[i];
							var p = elem.getAttribute(type);
							if(i === 0) {
								gPaint = p;
							} else if(gPaint !== p) {
								gPaint = null;
								break;
							}
						}
						if(gPaint === null) {
							// No common color, don't update anything
							var paintColor = null;
							return;
						}
						var paintColor = gPaint;

						var paintOpacity = 1;
						break;
					default:
						var paintOpacity = parseFloat(selectedElement.getAttribute(type + "-opacity"));
						if (isNaN(paintOpacity)) {
							paintOpacity = 1.0;
						}

						var defColor = type === "fill" ? "black" : "none";
						var paintColor = selectedElement.getAttribute(type) || defColor;
					}

					if(apply) {
						svgCanvas.setColor(type, paintColor, true);
						svgCanvas.setPaintOpacity(type, paintOpacity, true);
					}

					paintOpacity *= 100;

					var paint = getPaint(paintColor, paintOpacity, type);
					/*var options = null;
					options = {
						alpha: 100,
						type : "solidColor",
						solidColor: "186604",
					};					
					var paint = new $j.jGraduate.Paint(options);*/
					
					// update the rect inside #fill_color/#stroke_color
					this.setPaint(paint);
				}

				this.prep = function() {
					var ptype = this.paint.type;

					switch ( ptype ) {
						case 'linearGradient':
						case 'radialGradient':
							var paint = new $j.jGraduate.Paint({copy: this.paint});
							svgCanvas.setPaint(type, paint);
					}
				}
			};

			paintBox.fill = new PaintBox('#fill_color', 'fill');
			paintBox.stroke = new PaintBox('#stroke_color', 'stroke');

			$j('#stroke_width').text(curConfig.initStroke.width);
			$j('#stroke_slider').slider('option', 'value', curConfig.initStroke.width);
			var opac_val = curConfig.initOpacity * 100;
			opac_val = opac_val.toFixed(2);
			$j('#group_opacity').text(opac_val);			// Use this SVG elem to test vectorEffect support
			//var test_el = paintBox.fill.rect.cloneNode(false);
			//test_el.setAttribute('style','vector-effect:non-scaling-stroke');
			//var supportsNonSS = (test_el.style.vectorEffect === 'non-scaling-stroke');
			//test_el.removeAttribute('style');
			var svgdocbox = paintBox.fill.rect.ownerDocument;
			// Use this to test support for blur element. Seems to work to test support in Webkit
			var blur_test = svgdocbox.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
			trace("svgedit.browser");
			trace(svgedit.browser);
			if(typeof blur_test.stdDeviationX === "undefined" || (svgedit.browser.isWebkit() && !svgedit.browser.isChrome())) {
				$j('#tool_blur').hide();
			}
			$j(blur_test).remove();

			// Test for zoom icon support
			(function() {
				var pre = '-' + ua_prefix.toLowerCase() + '-zoom-';
				var zoom = pre + 'in';
				workarea.css('cursor', zoom);
				if(workarea.css('cursor') === zoom) {
					zoomInIcon = zoom;
					zoomOutIcon = pre + 'out';
				}
				workarea.css('cursor', 'auto');
			}());



			// Test for embedImage support (use timeout to not interfere with page load)
			setTimeout(function() {
				svgCanvas.embedImage(jspath+'images/logo.png', function(datauri) {
					if(!datauri) {
						// Disable option
						$j('#image_save_opts [value=embed]').attr('disabled','disabled');
						$j('#image_save_opts input').val(['ref']);
						curPrefs.img_save = 'ref';
						$j('#image_opt_embed').css('color','#666').attr('title',uiStrings.notification.featNotSupported);
					}
				});
			},1000);

			$j('#fill_color, #tool_fill .icon_label').click(function(){
				colorPicker($j('#fill_color'));
				updateToolButtonState();
				trace('selectedElement = ' + selectedElement);
				var el_name = selectedElement.tagName;
				if(el_name == 'text') {
					//hide both gradient tabs becuase text gradient in image creation does not support that
					$j('.jGraduate_tab_lingrad').hide();
					$j('.jGraduate_tab_radgrad').hide();
				}else{
					$j('.jGraduate_tab_lingrad').show();
					$j('.jGraduate_tab_radgrad').show();
				}
			});

			$j('#stroke_color, #tool_stroke .icon_label').click(function(){
				colorPicker($j('#stroke_color'));
				updateToolButtonState();
				var el_name = selectedElement.tagName;
				if(el_name == 'text') {
					//hide both gradient tabs becuase text gradient in image creation does not support that
					$j('.jGraduate_tab_lingrad').hide();
					$j('.jGraduate_tab_radgrad').hide();
				}else{
					$j('.jGraduate_tab_lingrad').show();
					$j('.jGraduate_tab_radgrad').show();
				}
			});

			$j('#group_opacityLabel').click(function() {
				$j('#opacity_dropdown button').mousedown();
				$j(window).mouseup();
			});

			$j('#zoomLabel').click(function() {
				$j('#zoom_dropdown button').mousedown();
				$j(window).mouseup();
			});

			$j('#tool_move_t').mousedown(function(evt){
				$j('#tools_stacking').show();
				evt.preventDefault();
			});

			$j('.layer_button').mousedown(function() {
				$j(this).addClass('layer_buttonpressed');
			}).mouseout(function() {
				$j(this).removeClass('layer_buttonpressed');
			}).mouseup(function() {
				$j(this).removeClass('layer_buttonpressed');
			});

			$j('.push_button').mousedown(function() {
				if (!$j(this).hasClass('disabled')) {
					$j(this).addClass('push_button_pressed').removeClass('push_button');
				}
			}).mouseout(function() {
				$j(this).removeClass('push_button_pressed').addClass('push_button');
			}).mouseup(function() {
				$j(this).removeClass('push_button_pressed').addClass('push_button');
			});

			$j('#layer_new').click(function() {
				var i = svgCanvas.getCurrentDrawing().getNumLayers();
				do {
					var uniqName = uiStrings.layers.layer + " " + ++i;
				} while(svgCanvas.getCurrentDrawing().hasLayer(uniqName));

				$j.prompt(uiStrings.notification.enterUniqueLayerName,uniqName, function(newName) {
					if (!newName) return;
					if (svgCanvas.getCurrentDrawing().hasLayer(newName)) {
						$j.alert(uiStrings.notification.dupeLayerName);
						return;
					}
					svgCanvas.createLayer(newName);
					updateContextPanel();
					populateLayers();
				});
			});

			function deleteLayer() {
				if (svgCanvas.deleteCurrentLayer()) {
					updateContextPanel();
					populateLayers();
					// This matches what SvgCanvas does
					// TODO: make this behavior less brittle (svg-editor should get which
					// layer is selected from the canvas and then select that one in the UI)
					$j('#layerlist tr.layer').removeClass("layersel");
					$j('#layerlist tr.layer:first').addClass("layersel");
				}
			}

			function cloneLayer() {
				var name = svgCanvas.getCurrentDrawing().getCurrentLayerName() + ' copy';

				$j.prompt(uiStrings.notification.enterUniqueLayerName, name, function(newName) {
					if (!newName) return;
					if (svgCanvas.getCurrentDrawing().hasLayer(newName)) {
						$j.alert(uiStrings.notification.dupeLayerName);
						return;
					}
					svgCanvas.cloneLayer(newName);
					updateContextPanel();
					populateLayers();
				});
			}

			function mergeLayer() {
				if($j('#layerlist tr.layersel').index() == svgCanvas.getCurrentDrawing().getNumLayers()-1) return;
				svgCanvas.mergeLayer();
				updateContextPanel();
				populateLayers();
			}

			function moveLayer(pos) {
				var curIndex = $j('#layerlist tr.layersel').index();
				var total = svgCanvas.getCurrentDrawing().getNumLayers();
				if(curIndex > 0 || curIndex < total-1) {
					curIndex += pos;
					svgCanvas.setCurrentLayerPosition(total-curIndex-1);
					populateLayers();
				}
			}

			$j('#layer_delete').click(deleteLayer);

			$j('#layer_up').click(function() {
				moveLayer(-1);
			});

			$j('#layer_down').click(function() {
				moveLayer(1);
			});

			$j('#layer_rename').click(function() {
				var curIndex = $j('#layerlist tr.layersel').prevAll().length;
				var oldName = $j('#layerlist tr.layersel td.layername').text();
				$j.prompt(uiStrings.notification.enterNewLayerName,"", function(newName) {
					if (!newName) return;
					if (oldName == newName || svgCanvas.getCurrentDrawing().hasLayer(newName)) {
						$j.alert(uiStrings.notification.layerHasThatName);
						return;
					}

					svgCanvas.renameCurrentLayer(newName);
					populateLayers();
				});
			});

			var SIDEPANEL_MAXWIDTH = 300;
			var SIDEPANEL_OPENWIDTH = 150;
			var sidedrag = -1, sidedragging = false, allowmove = false;

			var resizePanel = function(evt) {
				if (!allowmove) return;
				if (sidedrag == -1) return;
				sidedragging = true;
				var deltax = sidedrag - evt.pageX;

				var sidepanels = $j('#sidepanels');
				var sidewidth = parseInt(sidepanels.css('width'));
				if (sidewidth+deltax > SIDEPANEL_MAXWIDTH) {
					deltax = SIDEPANEL_MAXWIDTH - sidewidth;
					sidewidth = SIDEPANEL_MAXWIDTH;
				}
				else if (sidewidth+deltax < 2) {
					deltax = 2 - sidewidth;
					sidewidth = 2;
				}

				if (deltax == 0) return;
				sidedrag -= deltax;

				var layerpanel = $j('#layerpanel');
				workarea.css('right', parseInt(workarea.css('right'))+deltax);
				sidepanels.css('width', parseInt(sidepanels.css('width'))+deltax);
				layerpanel.css('width', parseInt(layerpanel.css('width'))+deltax);
				var ruler_x = $j('#ruler_x');
				ruler_x.css('right', parseInt(ruler_x.css('right')) + deltax);
			}

			$j('#sidepanel_handle')
				.mousedown(function(evt) {
					sidedrag = evt.pageX;
					$j(window).mousemove(resizePanel);
					allowmove = false;
					// Silly hack for Chrome, which always runs mousemove right after mousedown
					setTimeout(function() {
						allowmove = true;
					}, 20);
				})
				.mouseup(function(evt) {
					if (!sidedragging) toggleSidePanel();
					sidedrag = -1;
					sidedragging = false;
				});

			$j(window).mouseup(function() {
				sidedrag = -1;
				sidedragging = false;
				$j('#svg_editor').unbind('mousemove', resizePanel);
			});

			// if width is non-zero, then fully close it, otherwise fully open it
			// the optional close argument forces the side panel closed
			var toggleSidePanel = function(close){
				var w = parseInt($j('#sidepanels').css('width'));
				var deltax = (w > 2 || close ? 2 : SIDEPANEL_OPENWIDTH) - w;
				var sidepanels = $j('#sidepanels');
				var layerpanel = $j('#layerpanel');
				var ruler_x = $j('#ruler_x');
				workarea.css('right', parseInt(workarea.css('right')) + deltax);
				sidepanels.css('width', parseInt(sidepanels.css('width')) + deltax);
				layerpanel.css('width', parseInt(layerpanel.css('width')) + deltax);
				ruler_x.css('right', parseInt(ruler_x.css('right')) + deltax);
			};

			// this function highlights the layer passed in (by fading out the other layers)
			// if no layer is passed in, this function restores the other layers
			var toggleHighlightLayer = function(layerNameToHighlight) {
				var curNames = new Array(svgCanvas.getCurrentDrawing().getNumLayers());
				for (var i = 0; i < curNames.length; ++i) { curNames[i] = svgCanvas.getCurrentDrawing().getLayerName(i); }

				if (layerNameToHighlight) {
					for (var i = 0; i < curNames.length; ++i) {
						if (curNames[i] != layerNameToHighlight) {
							svgCanvas.getCurrentDrawing().setLayerOpacity(curNames[i], 0.5);
						}
					}
				}
				else {
					for (var i = 0; i < curNames.length; ++i) {
						svgCanvas.getCurrentDrawing().setLayerOpacity(curNames[i], 1.0);
					}
				}
			};

			var populateLayers = function(){
				var layerlist = $j('#layerlist tbody');
				var selLayerNames = $j('#selLayerNames');
				layerlist.empty();
				selLayerNames.empty();
				var currentLayerName = svgCanvas.getCurrentDrawing().getCurrentLayerName();
				var layer = svgCanvas.getCurrentDrawing().getNumLayers();
				var icon = $j.getSvgIcon('eye');
				// we get the layers in the reverse z-order (the layer rendered on top is listed first)
				while (layer--) {
					var name = svgCanvas.getCurrentDrawing().getLayerName(layer);
					// contenteditable=\"true\"
					var appendstr = "<tr class=\"layer";
					if (name == currentLayerName) {
						appendstr += " layersel"
					}
					appendstr += "\">";

					if (svgCanvas.getCurrentDrawing().getLayerVisibility(name)) {
						appendstr += "<td class=\"layervis\"/><td class=\"layername\" >" + name + "</td></tr>";
					}
					else {
						appendstr += "<td class=\"layervis layerinvis\"/><td class=\"layername\" >" + name + "</td></tr>";
					}
					layerlist.append(appendstr);
					selLayerNames.append("<option value=\"" + name + "\">" + name + "</option>");
				}
				if(icon !== undefined) {
					var copy = icon.clone();
					$j('td.layervis',layerlist).append(icon.clone());
					$j.resizeSvgIcons({'td.layervis .svg_icon':14});
				}
				// handle selection of layer
				$j('#layerlist td.layername')
					.mouseup(function(evt){
						$j('#layerlist tr.layer').removeClass("layersel");
						var row = $j(this.parentNode);
						row.addClass("layersel");
						svgCanvas.setCurrentLayer(this.textContent);
						evt.preventDefault();
					})
					.mouseover(function(evt){
						$j(this).css({"font-style": "italic", "color":"blue"});
						toggleHighlightLayer(this.textContent);
					})
					.mouseout(function(evt){
						$j(this).css({"font-style": "normal", "color":"black"});
						toggleHighlightLayer();
					});
				$j('#layerlist td.layervis').click(function(evt){
					var row = $j(this.parentNode).prevAll().length;
					var name = $j('#layerlist tr.layer:eq(' + row + ') td.layername').text();
					var vis = $j(this).hasClass('layerinvis');
					svgCanvas.setLayerVisibility(name, vis);
					if (vis) {
						$j(this).removeClass('layerinvis');
					}
					else {
						$j(this).addClass('layerinvis');
					}
				});

				// if there were too few rows, let's add a few to make it not so lonely
				var num = 5 - $j('#layerlist tr.layer').size();
				while (num-- > 0) {
					// FIXME: there must a better way to do this
					layerlist.append("<tr><td style=\"color:white\">_</td><td/></tr>");
				}
			};
			populateLayers();

		// 	function changeResolution(x,y) {
		// 		var zoom = svgCanvas.getResolution().zoom;
		// 		setResolution(x * zoom, y * zoom);
		// 	}

			var centerCanvas = function() {
				// this centers the canvas vertically in the workarea (horizontal handled in CSS)
				//workarea.css('line-height', workarea.height() + 'px');
				workarea.css('line-height', '100%');
			};

			$j(window).bind('load resize', centerCanvas);

			function stepFontSize(elem, step) {
				var orig_val = elem.value-0;
				var sug_val = orig_val + step;
				var increasing = sug_val >= orig_val;
				if(step === 0) return orig_val;

				if(orig_val >= 24) {
					if(increasing) {
						return Math.round(orig_val * 1.1);
					} else {
						return Math.round(orig_val / 1.1);
					}
				} else if(orig_val <= 1) {
					if(increasing) {
						return orig_val * 2;
					} else {
						return orig_val / 2;
					}
				} else {
					return sug_val;
				}
			}

			function stepZoom(elem, step) {
				var orig_val = elem.value-0;
				if(orig_val === 0) return 100;
				var sug_val = orig_val + step;
				if(step === 0) return orig_val;

				if(orig_val >= 100) {
					return sug_val;
				} else {
					if(sug_val >= orig_val) {
						return orig_val * 2;
					} else {
						return orig_val / 2;
					}
				}
			}

		// 	function setResolution(w, h, center) {
		// 		updateCanvas();
		// // 		w-=0; h-=0;
		// // 		$j('#svgcanvas').css( { 'width': w, 'height': h } );
		// // 		$j('#canvas_width').val(w);
		// // 		$j('#canvas_height').val(h);
		// //
		// // 		if(center) {
		// // 			var w_area = workarea;
		// // 			var scroll_y = h/2 - w_area.height()/2;
		// // 			var scroll_x = w/2 - w_area.width()/2;
		// // 			w_area[0].scrollTop = scroll_y;
		// // 			w_area[0].scrollLeft = scroll_x;
		// // 		}
		// 	}

			$j('#resolution').change(function(){
				var wh = $j('#canvas_width,#canvas_height');
				if(!this.selectedIndex) {
					if($j('#canvas_width').val() == 'fit') {
						wh.removeAttr("disabled").val(100);
					}
				} else if(this.value == 'content') {
					wh.val('fit').attr("disabled","disabled");
				} else {
					var dims = this.value.split('x');
					$j('#canvas_width').val(dims[0]);
					$j('#canvas_height').val(dims[1]);
					wh.removeAttr("disabled");
				}
			});

			//Prevent browser from erroneously repopulating fields
			$j('input,select').attr("autocomplete","off");

			// Associate all button actions as well as non-button keyboard shortcuts
			var Actions = function() {
				// sel:'selector', fn:function, evt:'event', key:[key, preventDefault, NoDisableInInput]
				var tool_buttons = [
					{sel:'#tool_select', fn: clickSelect, evt: 'click'},
					{sel:'#tool_fhpath', fn: clickFHPath, evt: 'click'},
					{sel:'#tool_line', fn: clickLine, evt: 'click'},
					{sel:'#tool_rect', fn: clickRect, evt: 'click', parent: '#tools_rect', icon: 'rect'},
					{sel:'#tool_square', fn: clickSquare, evt: 'click', parent: '#tools_rect', icon: 'square'},
					{sel:'#tool_fhrect', fn: clickFHRect, evt: 'click', parent: '#tools_rect', icon: 'fh_rect'},
					{sel:'#tool_ellipse', fn: clickEllipse, evt: 'click', parent: '#tools_ellipse', icon: 'ellipse'},
					{sel:'#tool_circle', fn: clickCircle, evt: 'click', parent: '#tools_ellipse', icon: 'circle'},
					{sel:'#tool_fhellipse', fn: clickFHEllipse, evt: 'click', parent: '#tools_ellipse', icon: 'fh_ellipse'},
					{sel:'#tool_path', fn: clickPath, evt: 'click'},
					{sel:'#tool_text', fn: clickText, evt: 'click'},
					{sel:'#tool_image', fn: clickImage, evt: 'click'},
					{sel:'#tool_zoom', fn: clickZoom, evt: 'click'},
					{sel:'#tool_clear', fn: clickClear, evt: 'click'},
					{sel:'#tool_open', fn: clickOpen, evt: 'click'},
					{sel:'#tool_import', fn: clickImport, evt: 'click'},
					{sel:'#tool_source', fn: showSourceEditor, evt: 'click'},
					{sel:'#tool_wireframe', fn: clickWireframe, evt: 'click'},
					{sel:'#tool_source_cancel,#svg_source_overlay,#tool_login_window_cancel,#tool_image_upload_cancel,#tool_beforeaddtocart_cancel, #tool_save_design_window_cancel, #tool_facebook_window_cancel, #tool_flickr_window_cancel, #tool_picasa_window_cancel, #tool_preview_window_cancel, #tool_prefs_cancel', fn: cancelOverlays, evt: 'click', hidekey: true},
					{sel:'#tool_source_save', fn: saveSourceEditor, evt: 'click'},
					{sel:'#tool_docprops_save', fn: saveDocProperties, evt: 'click'},
					{sel:'#tool_docprops', fn: showDocProperties, evt: 'click'},
					{sel:'#add-note', fn: svgaddnoteProperties, evt: 'click'},
					{sel:'#tool_prefs_save', fn: savePreferences, evt: 'click'},
					{sel:'#tool_prefs_option', fn: function() {showPreferences();return false}, evt: 'mouseup'},
					//{sel:'#tool_delete,#tool_delete_multi', fn: deleteSelected, evt: 'click', key: ['del/backspace', true]},
					{sel:'#tool_delete,#art_delete,#text_delete,#tool_delete_multi', fn: deleteSelected, evt: 'click'},
					{sel:'#tool_reorient', fn: reorientPath, evt: 'click'},
					{sel:'#tool_node_link', fn: linkControlPoints, evt: 'click'},
					{sel:'#tool_node_clone', fn: clonePathNode, evt: 'click'},
					{sel:'#tool_node_delete', fn: deletePathNode, evt: 'click'},
					{sel:'#tool_openclose_path', fn: opencloseSubPath, evt: 'click'},
					{sel:'#tool_add_subpath', fn: addSubPath, evt: 'click'},
					{sel:'#tool_move_t', fn: moveToTopSelected, evt: 'click'},
					{sel:'#tool_move_b', fn: moveToBottomSelected, evt: 'click'},
					{sel:'#tool_topath', fn: convertToPath, evt: 'click'},
					{sel:'#tool_make_link,#tool_make_link_multi', fn: makeHyperlink, evt: 'mousedown'},
					{sel:'#tool_undo', fn: clickUndo, evt: 'click'}, // client event is defined in script.js because of multiple call issue.
					{sel:'#tool_redo', fn: clickRedo, evt: 'click'}, // client event is defined in script.js because of multiple call issue.
					{sel:'#tool_clone, #tool_clone_multi', fn: clickClone, evt: 'click'}, // client event is defined in script.js because of multiple call issue.
					{sel:'#tool_group', fn: clickGroup, evt: 'click'},// client event is defined in script.js because of multiple call issue.
					{sel:'#tool_ungroup', fn: clickGroup, evt: 'click'},// client event is defined in script.js because of multiple call issue.
					{sel:'#tool_unlink_use', fn: clickGroup, evt: 'click'},
					{sel:'[id^=tool_align]', fn: clickAlign, evt: 'click'},
					// these two lines are required to make Opera work properly with the flyout mechanism
		 			{sel:'#tools_rect_show', fn: clickRect, evt: 'click'},
		 			{sel:'#tools_ellipse_show', fn: clickEllipse, evt: 'click'},
					{sel:'#tool_bold', fn: clickBold, evt: 'click'}, // client event is defined in script.js because of multiple call issue.
					{sel:'#tool_italic', fn: clickItalic, evt: 'click'}, // client event is defined in script.js because of multiple call issue.
					{sel:'#sidepanel_handle', fn: toggleSidePanel},
					{sel:'#copy_save_done', fn: cancelOverlays, evt: 'click'},
					{sel:'#tool_copy', fn: copySelected, evt:'click'},
					{sel:'#tool_cut', fn: cutSelected, evt:'click'},
					{sel:'#tool_paste', fn: pasteInCenter, evt:'click'},

					// Shortcuts not associated with buttons

					//{key: 'ctrl+left', fn: function(){rotateSelected(0,1)}},
					//{key: 'ctrl+right', fn: function(){rotateSelected(1,1)}},
					//{key: 'ctrl+shift+left', fn: function(){rotateSelected(0,5)}},
					//{key: 'ctrl+shift+right', fn: function(){rotateSelected(1,5)}},
					//{key: 'shift+O', fn: selectPrev},
					//{key: 'shift+P', fn: selectNext},
					//{key: [modKey+'up', true], fn: function(){zoomImage(2);}},
					//{key: [modKey+'down', true], fn: function(){zoomImage(.5);}},
					//{key: [modKey+']', true], fn: function(){moveUpDownSelected('Up');}},
                    //{key: [modKey+'[', true], fn: function(){moveUpDownSelected('Down');}},
					//{key: ['del/backspace', true], fn: function(){deleteSelected();}},
					//{key: ['up', true], fn: function(){moveSelected(0,-1);}},
					//{key: ['down', true], fn: function(){moveSelected(0,1);}},
					//{key: ['left', true], fn: function(){moveSelected(-1,0);}},
					//{key: ['right', true], fn: function(){moveSelected(1,0);}},
					//{key: 'shift+up', fn: function(){moveSelected(0,-10)}},
					//{key: 'shift+down', fn: function(){moveSelected(0,10)}},
					//{key: 'shift+left', fn: function(){moveSelected(-10,0)}},
					//{key: 'shift+right', fn: function(){moveSelected(10,0)}},
					//{key: ['alt+up', true], fn: function(){svgCanvas.cloneSelectedElements(0,-1)}},
					//{key: ['alt+down', true], fn: function(){svgCanvas.cloneSelectedElements(0,1)}},
					//{key: ['alt+left', true], fn: function(){svgCanvas.cloneSelectedElements(-1,0)}},
					//{key: ['alt+right', true], fn: function(){svgCanvas.cloneSelectedElements(1,0)}},
					//{key: ['alt+shift+up', true], fn: function(){svgCanvas.cloneSelectedElements(0,-10)}},
					//{key: ['alt+shift+down', true], fn: function(){svgCanvas.cloneSelectedElements(0,10)}},
					//{key: ['alt+shift+left', true], fn: function(){svgCanvas.cloneSelectedElements(-10,0)}},
					//{key: ['alt+shift+right', true], fn: function(){svgCanvas.cloneSelectedElements(10,0)}},
					//{key: 'A', fn: function(){svgCanvas.selectAllInCurrentLayer();}},

					// Standard shortcuts
					{key: modKey+'z', fn: clickUndo},
					{key: modKey + 'shift+z', fn: clickRedo},
					{key: modKey + 'y', fn: clickRedo},

					{key: modKey+'x', fn: cutSelected},
					{key: modKey+'c', fn: copySelected},
					{key: modKey+'v', fn: pasteInCenter}


				];

				// Tooltips not directly associated with a single function
				var key_assocs = {
					'4/Shift+4': '#tools_rect_show',
					'5/Shift+5': '#tools_ellipse_show'
				};

				return {
					setAll: function() {
						var flyouts = {};

						$j.each(tool_buttons, function(i, opts)  {
							// Bind function to button
							if(opts.sel) {
								var btn = $j(opts.sel);
								if (btn.length == 0) return true; // Skip if markup does not exist
								if(opts.evt) {
								  //if (svgedit.browser.isTouch() && opts.evt === "click") opts.evt = "mouseup";
									//btn[opts.evt](opts.fn);
									//btn.unbind("mousedown",opts.fn);
									//btn.unbind("mouseup",opts.fn);
									btn.bind(opts.evt,opts.fn);
								}

								// Add to parent flyout menu, if able to be displayed
								if(opts.parent && $j(opts.parent + '_show').length != 0) {
									var f_h = $j(opts.parent);
									if(!f_h.length) {
										f_h = makeFlyoutHolder(opts.parent.substr(1));
									}

									f_h.append(btn);

									if(!$j.isArray(flyouts[opts.parent])) {
										flyouts[opts.parent] = [];
									}
									flyouts[opts.parent].push(opts);
								}
							}


							// Bind function to shortcut key
							if(opts.key) {
								// Set shortcut based on options
								var keyval, shortcut = '', disInInp = true, fn = opts.fn, pd = false;
								if($j.isArray(opts.key)) {
									keyval = opts.key[0];
									if(opts.key.length > 1) pd = opts.key[1];
									if(opts.key.length > 2) disInInp = opts.key[2];
								} else {
									keyval = opts.key;
								}
								keyval += '';

								$j.each(keyval.split('/'), function(i, key) {
									$j(document).bind('keydown', key, function(e) {
										fn();
										if(pd) {
											e.preventDefault();
										}
										// Prevent default on ALL keys?
										return false;
									});
								});

								// Put shortcut in title
								if(opts.sel && !opts.hidekey && btn.attr('title')) {
									var new_title = btn.attr('title').split('[')[0] + ' (' + keyval + ')';
									key_assocs[keyval] = opts.sel;
									// Disregard for menu items
									if(!btn.parents('#main_menu').length) {
										btn.attr('title', new_title);
									}
								}
							}
						});

						// Setup flyouts
						setupFlyouts(flyouts);


						// Misc additional actions

						// Make "return" keypress trigger the change event
						$j('.attr_changer, #image_url').bind('keydown', 'return',
							function(evt) {$j(this).change();evt.preventDefault();}
						);

						$j(window).bind('keydown', 'tab', function(e) {
							if(ui_context === 'canvas') {
								e.preventDefault();
								selectNext();
							}
						}).bind('keydown', 'shift+tab', function(e) {
							if(ui_context === 'canvas') {
								e.preventDefault();
								selectPrev();
							}
						});

						$j('#tool_zoom').dblclick(dblclickZoom);
					},
					setTitles: function() {
						$j.each(key_assocs, function(keyval, sel)  {
							var menu = ($j(sel).parents('#main_menu').length);

							$j(sel).each(function() {
								if(menu) {
									var t = $j(this).text().split(' [')[0];
								} else {
									var t = this.title.split(' [')[0];
								}
								var key_str = '';
								// Shift+Up
								$j.each(keyval.split('/'), function(i, key) {
									var mod_bits = key.split('+'), mod = '';
									if(mod_bits.length > 1) {
										mod = mod_bits[0] + '+';
										key = mod_bits[1];
									}
									key_str += (i?'/':'') + mod + (uiStrings['key_'+key] || key);
								});
								if(menu) {
									this.lastChild.textContent = t +' ['+key_str+']';
								} else {
									this.title = t +' ['+key_str+']';
								}
							});
						});
					},
					getButtonData: function(sel) {
						var b;
						$j.each(tool_buttons, function(i, btn) {
							if(btn.sel === sel) b = btn;
						});
						return b;
					}
				};
			}();
			Actions.setAll();

			// Select given tool
			Editor.ready(function() {
				var tool,
					itool = curConfig.initTool,
					container = $j("#tools_left, #svg_editor .tools_flyout"),
					pre_tool = container.find("#tool_" + itool),
					reg_tool = container.find("#" + itool);
				if(pre_tool.length) {
					tool = pre_tool;
				} else if(reg_tool.length){
					tool = reg_tool;
				} else {
					tool = $j("#tool_select");
				}
				tool.click().mouseup();

				if(curConfig.wireframe) {
					$j('#tool_wireframe').click();
				}

				if(curConfig.showlayers) {
					toggleSidePanel();
				}
				/*$j('#show_rulers')[0].checked = false;
				$j('#rulers').toggle(!!curConfig.showRulers);

				if(curConfig.gridSnapping) {
					$j('#grid_snapping_on')[0].checked = true;
				}

				if(curConfig.baseUnit) {
					$j('#base_unit').val(curConfig.baseUnit);
				}

				if(curConfig.snappingStep) {
					$j('#grid_snapping_step').val(curConfig.snappingStep);
				}*/
				/*Edited rajesh 14-06-2014*/
				/*Set add to text tab by default*/
					$j("#addtext").addClass('active');
						$j("#addtext-panel").addClass('cbp-spmenu-open');  
					

					if(cartEditMode && cartEditMode == 1)
					{
						
						//	$j("#svgroot").replaceWith(svgrt);
						obj = $j.parseJSON(cartEditData);
						//console.log((obj.replaceText));
				        $j("#usePms").val(obj.usePms);
				        $j("#addLabel").val(obj.addLabel);
        				$j("#prb_text_colour").val(obj.prb_text_colour);
        				$j("#prb_name_title").val(obj.prb_name_title);
        				$j("#prb_extra_field").val(obj.prb_extra_field);
        				$j("#prb_text_size").val(obj.prb_text_size);
        				$j("#prb_extra_size").val(obj.prb_extra_size);
        				$j("#prb_fonts").val(obj.prb_fonts);
        				$j("#prb_product_image_path").val(obj.prb_product_image_path);
        				$j("#prb_smiley_image_path").val(obj.prb_smiley_image_path);
        				$j("#prb_fa_image_path").val(obj.prb_fa_image_path);
        				$j("#prb_fa_text").val(obj.prb_fa_text);
        				$j("#prb_fa_size").val(obj.prb_fa_size);
        				$j("#prb_fa_color").val(obj.prb_fa_color);
        				$j("#prb_logo_path").val(obj.prb_logo_path);
        				$j("#prb_text_length").val(obj.prb_text_length);
        				$j("#prb_title_colour").val(obj.prb_title_colour);
        				$j("#prb_title").val(obj.prb_title);
        				$j("#prb_title_size").val(obj.prb_title_size);
        				$j("#prb_back_colour").val(obj.prb_back_colour);
        				$j("#prb_title_fonts").val(obj.prb_title_fonts);
        				$j("#prb_scissors_colour").val(obj.prb_scissors_colour);
        				$j("#h_scissor_Used").val(obj.h_scissor_Used);
        				$j("#prb_printer_back_colour").val(obj.prb_printer_back_colour);
        				$j("#prb_printer_title_colour").val(obj.prb_printer_title_colour);
        				$j("#prb_printer_text_colour").val(obj.prb_printer_text_colour);
        				$j("#prb_printer_extratext_colour").val(obj.prb_printer_extratext_colour);
        				$j("#prb_printer_fa_colour").val(obj.prb_printer_fa_colour);
        				$j("#prb_pen_colour").val(obj.prb_pen_colour);
        				$j("#prb_penlight_color").val(obj.prb_penlight_color);
        				$j("#prb_tweezer_color").val(obj.prb_tweezer_color);
        				$j("#prb_extra_color").val(obj.prb_extra_color);
        				$j("#prb_extra_font").val(obj.prb_extra_font);
        				$j("#prb_scissors_patterns").val(obj.prb_scissors_patterns);
				        $j("#prb_scissors_sel_patterns").val(obj.prb_scissors_sel_patterns);
        				$j('#prb_name_title_textarea').text(obj.prb_name_title);
        				$j('#prb_title_textarea').text(obj.prb_title);
        				$j("#prb_extra_field_textarea").val(obj.prb_extra_field);
        				$j("#prb_border_color").val(obj.prb_border_color);

        				var scissorcolor  = '#FFFFFF';
        				var textColorCode = '#000000';
        				var titleColorCode = '#000000';
        				
        				if (obj.prb_text_colour)
        				{
        					var prbTextColour = obj.prb_text_colour.replace(" ","_");
        					textColorCode = $j("#prb_text_colour_"+prbTextColour).attr('val');
					        $j(".prb_text_colour").children().removeClass("selectedColor");
					      	$j("#prb_text_colour_"+prbTextColour).addClass('selectedColor');
        				}
        				if (obj.prb_fonts)
        				{
        					var textFonts = mkPrbFontsSelected("prb_fonts",obj.prb_fonts);
        				}

        				if (obj.prb_text_size)
        				{
	        				var textSize   = $j('select[name=prb_text_size] option:contains('+obj.prb_text_size+')').val();
	        				$j('select[name=prb_text_size]').val(textSize);
        				}
        				/*Assign Values for Text : EOC*/

        				/*Assign Values for Title : SOC*/
        				if (obj.prb_title_colour)
        				{
         					var prbTitleColour = obj.prb_title_colour.replace(" ", "_");
        					titleColorCode = $j("#prb_title_colour_"+prbTitleColour).attr('val');
					        $j(".prb_title_colour").children().removeClass("selectedColor");
					      	$j("#prb_title_colour_"+prbTitleColour).addClass('selectedColor');
        				}
        				if (obj.prb_title_fonts)
        				{
	        				var titleFonts = mkPrbTitleSelected("prb_title_fonts",obj.prb_title_fonts);
        				}
        				if (obj.prb_title_size)
        				{
	        				var titleSize = $j('select[name=prb_title_size] option:contains('+obj.prb_title_size+')').val();
	        				$j('select[name=prb_title_size]').val(titleSize);
        				}
        				/*Assign Values for Title : EOC*/

        				/*Assign Values for Extra : SOC*/
        				if (obj.prb_extra_color)
        				{
        					var prbExtraColour = obj.prb_extra_color.replace(" ", "_");
        					extraColorCode = $j("#prb_extra_color_"+prbExtraColour).attr('val');
					        $j(".prb_extra_color").children().removeClass("selectedColor");
					      	$j("#prb_extra_color_"+prbExtraColour).addClass('selectedColor');
        				}

        				if (obj.prb_extra_font)
        				{
	        				var extraFonts = mkPrbExtraSelected("prb_extra_font",obj.prb_extra_font);;
        				}

        				if (obj.prb_extra_size)
        				{
	        				var extraSize   = $j('select[name=prb_extra_size] option:contains('+obj.prb_extra_size+')').val();
	        				$j('select[name=prb_extra_size]').val(extraSize);
        				}
        				/*Assign Values for Extra : EOC*/

        				/*Assign Values for Scissors : SOC*/
        				if (obj.prb_scissors_colour && !obj.prb_scissors_patterns)
        				{
							if (obj.prb_scissors_colour != 'Transparent')
							{
								var prbScissorsColour = obj.prb_scissors_colour.replace(" ", "_");
	        					scissorcolor = $j("#prb_scissors_colour_"+prbScissorsColour).attr('val');
						        $j(".prb_scissors_colour").children().removeClass("selectedColor");
						      	$j("#prb_scissors_colour_"+prbScissorsColour).addClass('selectedColor');
							}
							else{
									var scissorcolor  = '#FFFFFF';
								}
        				}
        				if (obj.prb_scissors_patterns)
        				{
        					scissorcolor = "#CCCCCC";
        					if(obj.prb_scissors_sel_patterns)
        					{
						        $j("#"+obj.prb_scissors_sel_patterns).addClass("selectedColor");
						        $j(".prb_scissors_colour").children().removeClass("selectedColor");
        					}
        				}
        				/*Assign Values for Scissors : EOC*/

        				/*Edit for BgColor : SOC*/
        				if (obj.prb_back_colour)
        				{
        					if (obj.usePms == 1){
	        					bgColor = obj.prb_back_colour;
						        $j(".prb_back_colour").children().removeClass("selectedColor");
								$j("#pmsColor").val(obj.pmsCode);
        					}
        					else{
        						var backColor = obj.prb_back_colour.replace(" ", "_");
	        					bgColor = $j("#prb_back_colour_"+backColor).attr('val');
						        $j(".prb_back_colour").children().removeClass("selectedColor");
						      	$j("#prb_back_colour_"+backColor).addClass('selectedColor');
        					}
						    $j('#canvasBackground').find('rect').attr('fill', bgColor);
							
						    hexcode = bgColor;
        				}

        				/*Edit for Smiley : SOC*/
        				if(obj.prb_smiley_image_path && obj.prb_smiley_image_path != null)
        				{
							var smiley_Image = svgCanvas.addSvgElementFromJson({
								"element": "image",
								"attr": {
									"x": obj.h_smiley_X,
									"y": obj.h_smiley_Y,
									"width": obj.h_smiley_width,
									"height": obj.h_smiley_height,
									"id": svgCanvas.getNextId(),
									"class" : 'smileyImage',
									"style": "pointer-events:inherit"
								}
							});
							svgCanvas.setHref(smiley_Image, obj.prb_smiley_image_path);
							svgCanvas.selectOnly([smiley_Image]);
							window.replaceSmileyId = smiley_Image;
							$j("#replaceSmiley").val(replaceSmileyId);

							if(!isImageAdded){
								var currencySymbol = jQuery('#currencySymbol').val();
								var main_price = _getCurrentPrice();
						    	var current_price = formatePrice(main_price);
						    	var image_price = parseFloat(jQuery('#image_price').val());

						    	var final_price = _getFinalPrice(currencySymbol,current_price,image_price,'image_price');
						    	_setPrice(final_price);
						    	jQuery('#cb_image').prop('checked',true);
						    	isImageAdded = true;
					    	}
	        			}
	        			/*Edit for Smiley : EOC*/

        				if(obj.prb_fa_image_path && obj.prb_fa_image_path != null)
        				{
        					/*Fa Color selection*/
        					var prbFaColor = obj.prb_fa_color.replace(" ", "_");
	        				faColor = $j("#prb_fa_color_"+prbFaColor).attr('val');
							$j(".prb_fa_color").children().removeClass("selectedColor");
						    $j("#prb_fa_color_"+prbFaColor).addClass('selectedColor');

        					/*Fa Size selection*/
							var prbFaSize   = $j('select[name=prb_fa_size] option:contains('+obj.prb_fa_size+')').val();
	        				$j('select[name=prb_fa_size]').val(prbFaSize);

							var FA_Image = svgCanvas.addSvgElementFromJson({
								"element": "text",
								"curStyles": true,
								"attr": {
									"x": obj.h_FA_X,
									"y": obj.h_FA_Y,
									"id": svgCanvas.getNextId(),
									"font-size": obj.prb_fa_size,
									"fill": faColor,
									"stroke-width": "0",
									"font-family": "FontAwesome",
									"text-anchor": "middle",
									"xml:space": "preserve",
									"opacity": "1",
									"class" : "FAImage",
								}
							});
							FA_Image.textContent = obj.prb_fa_text;
							svgCanvas.keep = true;
							// svgCanvas.selectOnly([FA_Image]);
							window.replaceFAId = FA_Image;
							$j("#replaceFA").val(replaceFAId);
							if($j(".prb_fa_content").hasClass("contBtn")){
								$j(".prb_fa_content").addClass("contBtn");
							}
							addFaFlag = 1;
							if(!isFaAdded){
								var currencySymbol = jQuery('#currencySymbol').val();
						    	var main_price = _getCurrentPrice();
						    	var current_price = formatePrice(main_price);
						    	var icon_price = parseFloat(jQuery('#icon_price').val());

						    	var final_price = _getFinalPrice(currencySymbol,current_price,icon_price,'icon_price');
						    	_setPrice(final_price);
						    	jQuery('#cb_icon').prop('checked',true);
						    	isFaAdded = true;
							}
	        			}

        				/*Edit for Scissors : SOC*/

        				/*alert(obj.h_scissor_Used);alert(useScissors);*/
        				if(obj.h_scissor_Used == 1 && useScissors == 1)
        				{
        					/*$j("#prb_scissor_image_url").trigger({
						      type:"click",
						    });*/

							var scissor_Image = svgCanvas.addSvgElementFromJson({
								"element": "image",
								"attr": {
									"x": obj.h_scissor_X,
									"y": obj.h_scissor_Y,
									"width": obj.h_scissor_width,
									"height": obj.h_scissor_height,
									"id": svgCanvas.getNextId(),
									"class" : 'scissorImage',
									"style": "pointer-events:inherit",
									"filter" : "url(#scissorMat)"
								}
							});
							svgCanvas.setHref(scissor_Image, scissorPath);
							svgCanvas.selectOnly([scissor_Image],false);
							//svgCanvas.setImageURL(scissorPath);

							getScissorMatrix(scissorcolor);
	        			}
	        			/*Edit for Scissors : EOC*/
						
	        			/*Edit for LogoImage : SOC*/
						if(obj.prb_product_image_path && obj.prb_product_image_path != null)
        				{
							/*var prd_img_ahref = '<a style="display:none;" href="javascript:void(0);" id ="prd_img_ahref" class="prd_img_ahref" rel="'+obj.prb_product_image_path+'"><img data="'+obj.prb_product_image_path+'" src="'+obj.prb_product_image_path+'"></a>';
        					$j('#manage_side').append(prd_img_ahref);*/
							//loadImageONCanvas(document.getElementById('prd_img_ahref'));
							
							var prd_Image = svgCanvas.addSvgElementFromJson({
							"element": "image",
							"attr": {
								"x": obj.h_image_X,
								"y": obj.h_image_Y,
								"width": obj.h_image_width,
								"height": obj.h_image_height,
								"id": svgCanvas.getNextId(),
								"class" : 'logoImage new',
								"style": "pointer-events:inherit",
								"preserveAspectRatio" : "xMinYMax meet"
								}
							});

							if(!isImageAdded){
								var currencySymbol = jQuery('#currencySymbol').val();
								var main_price = _getCurrentPrice();
						    	var current_price = formatePrice(main_price);
						    	var image_price = parseFloat(jQuery('#image_price').val());

						    	var final_price = _getFinalPrice(currencySymbol,current_price,image_price,'image_price');
						    	_setPrice(final_price);
						    	jQuery('#cb_image').prop('checked',true);
						    	isImageAdded = true;
							}
										
							function getBase64Image_prb(img) {
							
							  var canvas_prb = document.getElementById("canvas_prb");
							  var ctx_prb = canvas_prb.getContext("2d");
							  
							  
							  ctx_prb.drawImage(img, 0, 0,obj.h_image_width,obj.h_image_height);
							  var dataURL = canvas_prb.toDataURL();
							  
								console.log('dataURL '+ dataURL);
							  return dataURL;//.replace(/^data:image\/(png|jpg);base64,/, "");
							}
							var base64_prb = getBase64Image_prb((document.getElementById("preview_prb_product_image_path")));

							var full_path = $j('#preview_prb_product_image_path').attr('src');
							var full_path_array = full_path.split('/');
							uploadedLogoFileName = full_path_array[full_path_array.length - 1];
                            //alert(base64_prb);
							// svgCanvas.setHref(prd_Image, base64_prb);
							svgCanvas.setHref(prd_Image, $j('#preview_prb_product_image_path').attr('src'));
							svgCanvas.selectOnly([prd_Image]);
							imgExists = prd_Image;
							/*setImageURL(obj.prb_product_image_path);
							updateContextPanel();*/
        				}
	        			/*Edit for LogoImage : EOC*/

	        			if((obj.prb_name_title != null || obj.prb_title != null || obj.prb_extra_field != null) && obj.prb_border_color && obj.prb_border_color != null)
	        			{
	    				  var prbBorderColor = obj.prb_border_color.replace(" ","_");
	    				  BorderColorCode = $j("#prb_border_color_"+prbBorderColor).attr('val');

					      var yDif = 30; /*Padding from sides */

					      var brdX = yDif;
					      var brdY = useScissors == 1 ? origmyY+yDif : yDif;
					      var brdW = useScissors == 1 ? origmyW-(2*brdX) : myW-(2*brdX);
					      var brdH = useScissors == 1 ? origmyH-(2*yDif) : myH-(2*yDif);

					      if(jQuery(document).width() < 650)
					      {
					        brdX = brdX/2;
					        brdY = brdY/2;
					        brdW = brdW/2;
					        brdH = brdH/2;
					      }
						  
					      var rect = svgCanvas.addSvgElementFromJson({
					            "element": "rect",
					            "curStyles": true,
					            "attr": {
					              "x": brdX,
					              "y": brdY,
					              "width": brdW,
					              "height": brdH,
					              "id": "applyBorderRect",
					              "stroke" : BorderColorCode,
					              "fill": "transparent",
					              "style":"pointer-events:none;",
					              "overflow" : "hidden",
					              "class" : "applyBorderRect",
					            }
					      });
					      borderApplied = 1;
					      jQuery("#cancelBorder").show();
					      jQuery("#applyBorder").hide();
				          jQuery(".prb_border_color").children().removeClass("selectedColor");
				          jQuery("#prb_border_color_"+prbBorderColor).addClass('selectedColor');
				          jQuery("#prb_border_color").val(prbBorderColor);
	        			}
        				if (obj.prb_extra_field && obj.prb_extra_field != null)
        				{
							var newExtraText = svgCanvas.addSvgElementFromJson({
								"element": "text",
								"curStyles": true,
								"attr": {
									"x": obj.h_extratext_X ,
									"y": obj.h_extratext_Y ,
									"id": svgCanvas.getNextId(),
									"fill": obj.prb_extra_color ? extraColorCode : "#000000",
									"stroke-width": "0",
									"font-size": extraSize ? extraSize : ($j(document).width() < 650) ? 10 : 16,
									"font-family": obj.prb_extra_font ? extraFonts : "Afta sans",
									"text-anchor": "middle",
									"xml:space": "preserve",
									"opacity": "1",
									"class" : "extraTextClass",
									"transform" : obj.h_extratext_transform,
								}
							});

							newExtraText.textContent = obj.prb_extra_field;
							svgCanvas.keep = true;
							$j("#smileyalert").css("display","block");
							addExtraFlag = 1;
						}

	        			/*Edit for Title : SOC*/
        				if (obj.prb_title && obj.prb_title != null)
        				{
							var newText = svgCanvas.addSvgElementFromJson({
								"element": "text",
								"curStyles": true,
								"attr": {
									"x": obj.h_title_X ,
									"y": obj.h_title_Y ,
									"id": svgCanvas.getNextId(),
									"fill": obj.prb_title_colour ? titleColorCode : "#000000",
									"stroke-width": "0",
									"font-size": titleSize,
									"font-family": titleFonts,
									"text-anchor": "middle",
									"xml:space": "preserve",
									"opacity": "1",
									"class" : "titleClass",
									"transform" : obj.h_title_transform,
								}
							});

							newText.textContent = obj.prb_title;
							svgCanvas.keep = true;
							//svgCanvas.selectOnly([newText], true);
							$j("#smileyalert").css("display","block");
							addTitleFlag = 1;
						}
	        			/*Edit for Title : EOC*/

	        			/*Edit for Text : SOC*/
        				if (obj.prb_name_title && obj.prb_name_title != null)
        				{
        					if($j(".myTextBox").hasClass("noheight"))
        					{
	        					$j(".myTextBox").removeClass("noheight");        						
        					}

							var newText = svgCanvas.addSvgElementFromJson({
								"element": "text",
								"curStyles": true,
								"attr": {
									"x": obj.h_text_X ,
									"y": obj.h_text_Y ,
									"id": svgCanvas.getNextId(),
									"fill": obj.prb_text_colour ? textColorCode : "#000000",
									"stroke-width": "0",
									"font-size": textSize,
									"font-family": textFonts,
									"text-anchor": "middle",
									"xml:space": "preserve",
									"opacity": "1",
									"class" : "textClass",
									"transform" : obj.h_text_transform,
								}
							});

							$j( "#addtext-panel .myTextBox" ).removeClass("noheight");
							newText.textContent = obj.prb_name_title;
							svgCanvas.keep = true;
							var ct = startTime();
							/*console.log('text: '+ct);*/
							svgCanvas.selectOnly([newText], false);
							$j("#replaceText").val([newText]);
							$j("#smileyalert").css("display","block");
							addTextFlag = 1;
							$j("#addtext").trigger({
					          type:"click",
					          button:0,
					      });
							/*svgedit.select.getSelectorManager().releaseSelector([newText]);
							svgedit.path.removePath_([newText]);*/
						}
	        			/*Edit for Text : EOC*/
        				if (usePen == 1 || useTweezers == 1)
        				{
	        				if (obj.prb_pen_colour)
	        				{
	        					penColorCode = $j("#prb_pen_colour_"+obj.prb_pen_colour).attr('val');
						        $j(".prb_pen_colour").children().removeClass("selectedColor");
						      	$j("#prb_pen_colour_"+obj.prb_pen_colour).addClass('selectedColor');
	        				}
							if (obj.prb_penlight_color)
	        				{
	        					penLightColorCode = $j("#prb_penlight_color_"+obj.prb_penlight_color).attr('val');
						        $j(".prb_penlight_color").children().removeClass("selectedColor");
						      	$j("#prb_penlight_color_"+obj.prb_penlight_color).addClass('selectedColor');
	        				}
            				if (useTweezers == 1)
        					{
								if (obj.prb_tweezer_color)
		        				{
		        					penLightColorCode = $j("#prb_tweezer_color_"+obj.prb_tweezer_color).attr('val');
							        $j(".prb_tweezer_color").children().removeClass("selectedColor");
							      	$j("#prb_tweezer_color_"+obj.prb_tweezer_color).addClass('selectedColor');
		        				}
        					}
        				}
					}

					if (cartEditMode == 0)
					{

						if(useScissors == 1){
							var sciX = ($j(document).width() < 650) ? (mySciSelX - myX)/2: (mySciSelX - myX);
							var sciY = ($j(document).width() < 650) ? ((scisely2 - sciImageHeight) - myY)/2: (scisely2 - sciImageHeight) - myY;
							var sciW = ($j(document).width() < 650) ? sciImageWidth/2 : sciImageWidth;
							var sciH = ($j(document).width() < 650) ? sciImageHeight/2: sciImageHeight;

							var scissor_Image = svgCanvas.addSvgElementFromJson({
								"element": "image",
								"attr": {
									"x": sciX,
									"y": sciY,
									"width": sciW,
									"height": sciH,
									"id": svgCanvas.getNextId(),
									"class" : 'scissorImage',
									"style": "pointer-events:inherit",
									"filter" : "url(#scissorMat)"
								}
							});
							svgCanvas.setHref(scissor_Image, scissorPath);
							svgCanvas.selectOnly([scissor_Image],false);
							
							addScissorFlag = 1;
					        $j( "#addOneScissors-panel .myTextBox" ).addClass("noheight");
						    $j("#h_scissor_Used").val(1);
						    $j("#prb_scissors_colour").val("Transparent");
						}
						if ($j(document).width() < 650)
						{
							var w  = myW/2;
							/*10-09-2014 :- Check for Setting  the element position*/
							if(!(typeof replaceFAId === 'undefined') && !(replaceFAId == '') || !(typeof replaceSmileyId === 'undefined') && !(replaceSmileyId == '') || !(typeof imgExists === 'undefined') && !(imgExists == ''))
								var h  = (useScissors == 1) ? (Math.abs(origmyY-myY)+origmyH/2)/2 : myH/4;
							else
								var h  = (useScissors == 1) ? (Math.abs(origmyY-myY)+(2*origmyH)/3)/2 : myH/3;					
							var font = 20;
						}
						else
						{
							var w  = myW;
							/*10-09-2014 :- Check for Setting  the element position*/
							// alert('myH '+myH);
							// alert('myY '+ myY);
							// alert('origmyH '+ origmyH);
							// alert('origmyY '+ origmyY);
							if(!(typeof replaceFAId === 'undefined') && !(replaceFAId == '') || !(typeof replaceSmileyId === 'undefined') && !(replaceSmileyId == '') || !(typeof imgExists === 'undefined') && !(imgExists == ''))
								var h  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/2 : myH/2;
							else
								var h  = (useScissors == 1) ? Math.abs(origmyY-myY)+origmyH/4 : myH/4;
							var font = 26; 
						}

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
						
						// Oval Editing
						// $j('#canvasBackground').html('<ellipse cx="200" cy="80" rx="100" ry="50" fill="yellow" style="stroke:purple;stroke-width:2" />');

						
						svgCanvas.keep = true;
							//svgCanvas.selectOnly([newTitle], true);
							 $j("#smileyalert").css("display","block");
							addTitleFlag = 1;
							$j("#prb_title").val(prbYourTitle);

							if($j(document).width() < 650)
								$j("#prb_title_size").val("20");
							else
								$j("#prb_title_size").val("26");
							
							$j("#prb_title_fonts").val("Arial");

					    $j("#addtext").trigger({
					          type:"click",
					          button:0,
					      });

					    $j("#pickcolor").trigger({
					          type:"click",
					          button:0,
					      });
						}
			});
			
			function startTime(){
			  var today = new Date();
			  var h = today.getHours();
			  var m = today.getMinutes();
			  var s = today.getSeconds(); 
			  var ms = today.getMilliseconds();
			  return [ h, m, s,ms ].join(':')
			}
			$j('#zoom').SpinButton({ min: 0.001, max: 10000, step: 50, stepfunc: stepZoom, callback: changeZoom })
				// Set default zoom
				.val(svgCanvas.getZoom() * 100);

			var lmenu_func = function(action, el, pos) {
				switch ( action ) {
					case 'dupe':
						cloneLayer();
						break;
					case 'delete':
						deleteLayer();
						break;
					case 'merge_down':
						mergeLayer();
						break;
					case 'merge_all':
						svgCanvas.mergeAllLayers();
						updateContextPanel();
						populateLayers();
						break;
				}
			}

			$j("#layerlist").contextMenu({
					menu: 'cmenu_layers',
					inSpeed: 0
				},
				lmenu_func
			);

			$j("#layer_moreopts").contextMenu({
					menu: 'cmenu_layers',
					inSpeed: 0,
					allowLeft: true
				},
				lmenu_func
			);

			$j('.contextMenu li').mousedown(function(ev) {
				ev.preventDefault();
			})

			$j('#cmenu_canvas li').disableContextMenu();
			canv_menu.enableContextMenuItems('#delete,#cut,#copy');
			
			window.onbeforeunload = function() {
				alert(undoMgr.getUndoStackSize());

				if ('localStorage' in window) {
					var name = 'svgedit-' + Editor.curConfig.canvasName;
					window.localStorage.setItem(name, svgCanvas.getSvgString());
					Editor.show_save_warning = false;
				}
				Editor.show_save_warning = true;

				// Suppress warning if page is empty
				if(undoMgr.getUndoStackSize() === 0) {
					Editor.show_save_warning = false;
				}
				
				// show_save_warning is set to "false" when the page is saved.
				if(!curConfig.no_save_warning && Editor.show_save_warning) { 
					// Browser already asks question about closing the page
					return uiStrings.notification.unsavedChanges;
				}
			};

			Editor.openPrep = function(func) {
				$j('#main_menu').hide();
				if(undoMgr.getUndoStackSize() === 0) {
					func(true);
				} else {
					$j.confirm(uiStrings.notification.QwantToOpen, func);
				}
			}

			// use HTML5 File API: http://www.w3.org/TR/FileAPI/
			// if browser has HTML5 File API support, then we will show the open menu item
			// and provide a file input to click.  When that change event fires, it will
			// get the text contents of the file and send it to the canvas
			if (window.FileReader) {
				var import_image = function(e) {
					e.stopPropagation();
					e.preventDefault();
					$j("#workarea").removeAttr("style");
					$j('#main_menu').hide();
					var file = null;
					if (e.type == "drop") file = e.dataTransfer.files[0]
					else file = this.files[0];
					if (file) {
						if(file.type.indexOf("image") != -1) {
							//detected an image
							//svg handling
							if(file.type.indexOf("svg") != -1) {
								var reader = new FileReader();
								reader.onloadend = function(e) {
									svgCanvas.importSvgString(e.target.result, true);
									svgCanvas.ungroupSelectedElement()
									svgCanvas.ungroupSelectedElement()
									svgCanvas.groupSelectedElements()
									svgCanvas.alignSelectedElements("m", "page")
									svgCanvas.alignSelectedElements("c", "page")
								};
								reader.readAsText(file);
							}

							//bitmap handling
							else {
								var reader = new FileReader();
								reader.onloadend = function(e) {
									// let's insert the new image until we know its dimensions
									insertNewImage = function(img_width, img_height){
										var newImage = svgCanvas.addSvgElementFromJson({
											"element": "image",
											"attr": {
												"x": 0,
												"y": 0,
												"width": img_width,
												"height": img_height,
												"id": svgCanvas.getNextId(),
												"style": "pointer-events:inherit"											}
										});
										svgCanvas.setHref(newImage, e.target.result);		

										svgCanvas.selectOnly([newImage]);
										svgCanvas.alignSelectedElements("m", "page")
										svgCanvas.alignSelectedElements("c", "page")
										updateContextPanel();
									}
 									// create dummy img so we know the default dimensions
									var img_width = 100;
 									var img_height = 100;
									var img = new Image();
									img.src = e.target.result;
									img.style.opacity = 0;
									img.onload = function() {
										img_width = img.offsetWidth
										img_height = img.offsetHeight
										insertNewImage(img_width, img_height);
									}
								};
								reader.readAsDataURL(file)
							}
						}
					}
				}

				function onDragEnter(e) {
					e.stopPropagation();
					e.preventDefault();
					// and indicator should be displayed here, such as "drop files here"
				}

				function onDragOver(e) {
					e.stopPropagation();
					e.preventDefault();
				}

				function onDragLeave(e) {
					e.stopPropagation();
					e.preventDefault();
					// hypothetical indicator should be removed here
				}

				workarea[0].addEventListener('dragenter', onDragEnter, false);
				workarea[0].addEventListener('dragover', onDragOver, false);
				workarea[0].addEventListener('dragleave', onDragLeave, false);
				workarea[0].addEventListener('drop', import_image, false);

				var open = $j('<input type="file">').change(function() {
					var f = this;
					Editor.openPrep(function(ok) {
						if(!ok) return;
						svgCanvas.clear();
						if(f.files.length==1) {
							var reader = new FileReader();
							reader.onloadend = function(e) {
								loadSvgString(e.target.result);
								updateCanvas();
							};
							reader.readAsText(f.files[0]);
						}
					});
				});
				$j("#tool_open").show().prepend(open);

				var img_import = $j('<input type="file">').change(import_image);
				$j("#tool_import").show().prepend(img_import);
			}

			var updateCanvas = Editor.updateCanvas = function(center, new_ctr) {
				/*console.log(workarea);*/
				var w = workarea.width(), h = workarea.height();
				//alert('w:'+w);alert('h:'+h);
				//Parth Edited 24-06-2014 Responsive Start

				// if($j(document).width() > 650)
				// {
				// 	w = myW;
				// 	h = myH;
				// }

				if($j(document).width() < 650)
				{
					w = myW/2;
					h = myH/2;
				}
				//Parth Edited 24-06-2014 Responsive End

				var w_orig = w, h_orig = h;
				var zoom = svgCanvas.getZoom();
				var w_area = workarea;
				var cnvs = $j("#svgcanvas");
				
				var old_ctr = {
					x: w_area[0].scrollLeft + w_orig/2,
					y: w_area[0].scrollTop + h_orig/2
				};

				var multi = curConfig.canvas_expansion;
				w = Math.max(w_orig, svgCanvas.contentW * zoom * multi);
				h = Math.max(h_orig, svgCanvas.contentH * zoom * multi);

				workarea.css('overflow','hidden');
				var old_can_y = cnvs.height()/2;
				var old_can_x = cnvs.width()/2;
				cnvs.width(w).height(h);
				var new_can_y = h/2;
				var new_can_x = w/2;
				var offset = svgCanvas.updateCanvas(w, h);

				var ratio = new_can_x / old_can_x;

				var scroll_x = w/2 - w_orig/2;
				var scroll_y = h/2 - h_orig/2;

				if(!new_ctr) {

					var old_dist_x = old_ctr.x - old_can_x;
					var new_x = new_can_x + old_dist_x * ratio;

					var old_dist_y = old_ctr.y - old_can_y;
					var new_y = new_can_y + old_dist_y * ratio;

					new_ctr = {
						x: new_x,
						y: new_y
					};

				} else {
					new_ctr.x += offset.x,
					new_ctr.y += offset.y;
				}

				if(center) {
					// Go to top-left for larger documents
					if(svgCanvas.contentW > w_area.width()) {
						// Top-left
						workarea[0].scrollLeft = offset.x - 10;
						workarea[0].scrollTop = offset.y - 10;
					} else {
						// Center
						w_area[0].scrollLeft = scroll_x;
						w_area[0].scrollTop = scroll_y;
					}
				} else {
					w_area[0].scrollLeft = new_ctr.x - w_orig/2;
					w_area[0].scrollTop = new_ctr.y - h_orig/2;
				}
				if(curConfig.showRulers) {
					updateRulers(cnvs, zoom);
					workarea.scroll();
				}
			}
			
			// Make [1,2,5] array
			var r_intervals = [];
			for(var i = .1; i < 1E5; i *= 10) {
				r_intervals.push(1 * i);
				r_intervals.push(2 * i);
				r_intervals.push(5 * i);
			}

			function updateRulers(scanvas, zoom) {
				if(!zoom) zoom = svgCanvas.getZoom();
				if(!scanvas) scanvas = $j("#svgcanvas");

				var limit = 30000;

				var c_elem = svgCanvas.getContentElem();

				var units = svgedit.units.getTypeMap();
				var unit = units[curConfig.baseUnit]; // 1 = 1px

				for(var d = 0; d < 2; d++) {
					var is_x = (d === 0);
					var dim = is_x ? 'x' : 'y';
					var lentype = is_x?'width':'height';
					var content_d = c_elem.getAttribute(dim)-0;

					var $hcanv_orig = $j('#ruler_' + dim + ' canvas:first');

					// Bit of a hack to fully clear the canvas in Safari & IE9
					$hcanv = $hcanv_orig.clone();
					$hcanv_orig.replaceWith($hcanv);

					var hcanv = $hcanv[0];

					// Set the canvas size to the width of the container
					var ruler_len = scanvas[lentype]();
					var total_len = ruler_len;
					hcanv.parentNode.style[lentype] = total_len + 'px';


					var canv_count = 1;
					var ctx_num = 0;
					var ctx_arr;
					var ctx = hcanv.getContext("2d");

					ctx.fillStyle = "rgb(200,0,0)";
					ctx.fillRect(0,0,hcanv.width,hcanv.height);

					// Remove any existing canvasses
					$hcanv.siblings().remove();

					// Create multiple canvases when necessary (due to browser limits)
					if(ruler_len >= limit) {
						var num = parseInt(ruler_len / limit) + 1;
						ctx_arr = Array(num);
						ctx_arr[0] = ctx;
						for(var i = 1; i < num; i++) {
							hcanv[lentype] = limit;
							var copy = hcanv.cloneNode(true);
							hcanv.parentNode.appendChild(copy);
							ctx_arr[i] = copy.getContext('2d');
						}

						copy[lentype] = ruler_len % limit;

						// set copy width to last
						ruler_len = limit;
					}

					hcanv[lentype] = ruler_len;

					var u_multi = unit * zoom;

					// Calculate the main number interval
					var raw_m = 50 / u_multi;
					var multi = 1;
					for(var i = 0; i < r_intervals.length; i++) {
						var num = r_intervals[i];
						multi = num;
						if(raw_m <= num) {
							break;
						}
					}

					var big_int = multi * u_multi;

					ctx.font = "9px sans-serif";

					var ruler_d = ((content_d / u_multi) % multi) * u_multi;
					var label_pos = ruler_d - big_int;
					for (; ruler_d < total_len; ruler_d += big_int) {
						label_pos += big_int;
						var real_d = ruler_d - content_d;

						var cur_d = Math.round(ruler_d) + .5;
						if(is_x) {
							ctx.moveTo(cur_d, 15);
							ctx.lineTo(cur_d, 0);
						} else {
							ctx.moveTo(15, cur_d);
							ctx.lineTo(0, cur_d);
						}

						var num = (label_pos - content_d) / u_multi;
						var label;
						if(multi >= 1) {
							label = Math.round(num);
						} else {
							var decs = (multi+'').split('.')[1].length;
							label = num.toFixed(decs)-0;
						}

						// Do anything special for negative numbers?
// 						var is_neg = label < 0;
// 						real_d2 = Math.abs(real_d2);

						// Change 1000s to Ks
						if(label !== 0 && label !== 1000 && label % 1000 === 0) {
							label = (label / 1000) + 'K';
						}

						if(is_x) {
							ctx.fillText(label, ruler_d+2, 8);
						} else {
							var str = (label+'').split('');
							for(var i = 0; i < str.length; i++) {
								ctx.fillText(str[i], 1, (ruler_d+9) + i*9);
							}
						}

						var part = big_int / 10;
						for(var i = 1; i < 10; i++) {
							var sub_d = Math.round(ruler_d + part * i) + .5;
							if(ctx_arr && sub_d > ruler_len) {
								ctx_num++;
								ctx.stroke();
								if(ctx_num >= ctx_arr.length) {
									i = 10;
									ruler_d = total_len;
									continue;
								}
								ctx = ctx_arr[ctx_num];
								ruler_d -= limit;
								sub_d = Math.round(ruler_d + part * i) + .5;
							}

							var line_num = (i % 2)?12:10;
							if(is_x) {
								ctx.moveTo(sub_d, 15);
								ctx.lineTo(sub_d, line_num);
							} else {
								ctx.moveTo(15, sub_d);
								ctx.lineTo(line_num ,sub_d);
							}
						}
					}
					ctx.strokeStyle = "#000";
					ctx.stroke();
				}
			}

			updateCanvas(true);


			// Callback handler for embedapi.js
 			try{
 				var json_encode = function(obj){
 			  //simple partial JSON encoder implementation
 			  if(window.JSON && JSON.stringify) return JSON.stringify(obj);
 			  var enc = arguments.callee; //for purposes of recursion
 			  if(typeof obj == "boolean" || typeof obj == "number"){
 				  return obj+'' //should work...
 			  }else if(typeof obj == "string"){
 				//a large portion of this is stolen from Douglas Crockford's json2.js
 				return '"'+
 					  obj.replace(
 						/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g
 					  , function (a) {
 						return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
 					  })
 					  +'"'; //note that this isn't quite as purtyful as the usualness
 			  }else if(obj.length){ //simple hackish test for arrayish-ness
 				for(var i = 0; i < obj.length; i++){
 				  obj[i] = enc(obj[i]); //encode every sub-thingy on top
 				}
 				return "["+obj.join(",")+"]";
 			  }else{
 				var pairs = []; //pairs will be stored here
 				for(var k in obj){ //loop through thingys
 				  pairs.push(enc(k)+":"+enc(obj[k])); //key: value
 				}
 				return "{"+pairs.join(",")+"}" //wrap in the braces
 			  }
 			}
 			  window.addEventListener("message", function(e){
 				var cbid = parseInt(e.data.substr(0, e.data.indexOf(";")));
				//trace("message posted.");
				//trace(e);	
 				try{
					e.source.postMessage("SVGe"+cbid+";"+json_encode(eval(e.data)), "*");
				}catch(err){
					e.source.postMessage("SVGe"+cbid+";error:"+err.message, "*");
				}
 			}, false)
 			}catch(err){
				window.embed_error = err;
			}

			// For Compatibility with older extensions
			$j(function() {
				window.svgCanvas = svgCanvas;
				svgCanvas.ready = svgEditor.ready;
			});

			Editor.setLang = function(lang, allStrings) {
				$j.pref('lang', lang);
				$j('#lang_select').val(lang);
				if(allStrings) {
					var notif = allStrings.notification;

					// $j.extend will only replace the given strings
					var oldLayerName = $j('#layerlist tr.layersel td.layername').text();
					var rename_layer = (oldLayerName == uiStrings.common.layer + ' 1');

					$j.extend(uiStrings, allStrings);
					svgCanvas.setUiStrings(allStrings);
					Actions.setTitles();

					if(rename_layer) {
						svgCanvas.renameCurrentLayer(uiStrings.common.layer + ' 1');
						populateLayers();
					}

					svgCanvas.runExtensions("langChanged", lang);

					// Update flyout tooltips
					setFlyoutTitles();

					// Copy title for certain tool elements
					var elems = {
						'#stroke_color': '#tool_stroke .icon_label, #tool_stroke .color_block',
						'#fill_color': '#tool_fill label, #tool_fill .color_block',
						'#linejoin_miter': '#cur_linejoin',
						'#linecap_butt': '#cur_linecap'
					}

					$j.each(elems, function(source, dest) {
						$j(dest).attr('title', $j(source)[0].title);
					});

					// Copy alignment titles
					$j('#multiselected_panel div[id^=tool_align]').each(function() {
						$j('#tool_pos' + this.id.substr(10))[0].title = this.title;
					});

				}
			};
		};

		var callbacks = [];

		function loadSvgString(str, callback) {
			var success = svgCanvas.setSvgString(str) !== false;
			callback = callback || $j.noop;
			if(success) {
				callback(true);
			} else {
				$j.alert(uiStrings.notification.errorLoadingSVG, function() {
					callback(false);
				});
			}
		}

		Editor.ready = function(cb) {
			if(!is_ready) {
				callbacks.push(cb);
			} else {
				cb();
			}
		};

		Editor.runCallbacks = function() {
			$j.each(callbacks, function() {
				this();
			});
			is_ready = true;
		};

		Editor.loadFromString = function(str) {
			Editor.ready(function() {
				loadSvgString(str);
			});
		};

		Editor.disableUI = function(featList) {};

		Editor.loadFromURL = function(url, opts) {
			if(!opts) opts = {};

			var cache = opts.cache;
			var cb = opts.callback;

			Editor.ready(function() {
				$j.ajax({
					'url': url,
					'dataType': 'text',
					cache: !!cache,
					success: function(str) {
						loadSvgString(str, cb);
					},
					error: function(xhr, stat, err) {
						if(xhr.status != 404 && xhr.responseText) {
							loadSvgString(xhr.responseText, cb);
						} else {
							$j.alert(uiStrings.notification.URLloadFail + ": \n"+err+'', cb);
						}
					}
				});
			});
		};

		Editor.loadFromDataURI = function(str) {
			Editor.ready(function() {
				var pre = 'data:image/svg+xml;base64,';
				var src = str.substring(pre.length);
				loadSvgString(svgedit.utilities.decode64(src));
			});
		};

		Editor.addExtension = function() {
			var args = arguments;

			// Note that we don't want this on Editor.ready since some extensions
			// may want to run before then (like server_opensave).
			$j(function() {
				if(svgCanvas) svgCanvas.addExtension.apply(this, args);
			});
		};
		return Editor;
	}(jQuery);
	// Run init once DOM is loaded
	$j(svgEditor.init);
})();