/**
 * jQuery custom selectboxes
 * 
 * Copyright (c) 2008 Krzysztof Suszyński (suszynski.org)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @version 0.6.1
 * @category visual
 * @package jquery
 * @subpakage ui.selectbox
 * @author Krzysztof Suszyński <k.suszynski@wit.edu.pl>
**/
jQuery.fn.selectbox = function(options){
	/* Default settings */
	var settings = {
		className: 'jquery-selectbox',
		animationSpeed: "normal",
		listboxMaxSize: 10,
		replaceInvisible: false
	};
	var commonClass = 'jquery-custom-selectboxes-replaced';
	var listOpen = false;
	var showList = function(listObj) {
		var selectbox = listObj.parents('.' + settings.className + '');
		if (selectbox.find(".slider_bg").size() == 1) selectbox.find(".slider_bg").hide();
		if (selectbox.find(".slider_selectbg01").size() == 1) selectbox.find(".slider_selectbg01").hide();
		if (selectbox.find(".slider_selectbg02").size() == 1) selectbox.find(".slider_selectbg02").hide();
		if (selectbox.find(".slider_bg2").size() == 1) selectbox.find(".slider_bg2").hide();
		listObj.slideDown(settings.animationSpeed, function(){
			listOpen = true;
			if (selectbox.find(".slider_bg").size() == 1) selectbox.find(".slider_bg").show();
			if (selectbox.find(".slider_selectbg01").size() == 1) selectbox.find(".slider_selectbg01").show();
			if (selectbox.find(".slider_selectbg02").size() == 1) selectbox.find(".slider_selectbg02").show();
			if (selectbox.find(".slider_bg2").size() == 1) selectbox.find(".slider_bg2").show();
			if (listObj.hasClass("mCustomScrollbar")) {
				listObj.mCustomScrollbar("update");
			}
		});
		selectbox.addClass('selecthover');

		jQuery(document).bind('click', onBlurList);
		return listObj;
	}
	var hideList = function(listObj) {
		var selectbox = listObj.parents('.' + settings.className + '');
		if (selectbox.find(".slider_bg").size() == 1) selectbox.find(".slider_bg").hide();
		if (selectbox.find(".slider_selectbg01").size() == 1) selectbox.find(".slider_selectbg01").hide();
		if (selectbox.find(".slider_selectbg02").size() == 1) selectbox.find(".slider_selectbg02").hide();
		if (selectbox.find(".slider_bg2").size() == 1) selectbox.find(".slider_bg2").hide();

		/*listObj.each(function() {
			//if ($(this).hasClass("mCustomScrollbar")) $(this).mCustomScrollbar("scrollTo",0);
			if ($(this).hasClass("mCustomScrollbar")) $(this).find(".mCSB_container, .mCSB_dragger").css("top",0);
		});*/

		listObj.slideUp(settings.animationSpeed, function(){
			listOpen = false;
			jQuery(this).parents('.' + settings.className + '').removeClass('selecthover');
			jQuery(this).parents('.' + settings.className + '').find('.' + settings.className + '-moreButton').removeClass('morebuttonhover');
			listObj.each(function() {
				if ($(this).hasClass("mCustomScrollbar")) $(this).find(".mCSB_container, .mCSB_dragger").css("top",0);
			});
		});
		jQuery(document).unbind('click', onBlurList);
		return listObj;
	}
	var onBlurList = function(e) {
		var trgt = e.target;
		var currentListElements = jQuery('.' + settings.className + '-list:visible').parent().find('*').andSelf();
		//if(jQuery.inArray(trgt, currentListElements)<0 && listOpen) {
		if(jQuery.inArray(trgt, currentListElements)<0) {
			hideList( jQuery('.' + commonClass + '-list') );
		}
		return false;
	}
	
	/* Processing settings */
	settings = jQuery.extend(settings, options || {});
	/* Wrapping all passed elements */
	return this.each(function() {
		var _this = jQuery(this);
		if(_this.filter(':visible').length == 0 && !settings.replaceInvisible)
			return;
		var replacement = jQuery(
			'<div class="' + settings.className + ' ' + commonClass + '">' +
				'<div class="' + settings.className + '-moreButton" />' +
				'<div class="' + settings.className + '-list ' + commonClass + '-list" />' +
				'<a href="#" class="' + settings.className + '-currentItem item-0" />' +
			'</div>'
		);
		jQuery('option', _this).each(function(k,v){
			var v = jQuery(v);
			var listElement =  jQuery('<span class="' + settings.className + '-item value-'+v.val()+' item-'+k+'">' + v.text() + '</span>');
			listElement.click(function(){
				var thisListElement = jQuery(this);
				var thisReplacment = thisListElement.parents('.'+settings.className);
				var thisIndex = thisListElement[0].className.split(' ');
				for( k1 in thisIndex ) {
					if(/^item-[0-9]+$/.test(thisIndex[k1])) {
						thisIndex = parseInt(thisIndex[k1].replace('item-',''), 10);
						break;
					}
				};
				var thisValue = thisListElement[0].className.split(' ');
				for( k1 in thisValue ) {
					if(/^value-.+$/.test(thisValue[k1])) {
						thisValue = thisValue[k1].replace('value-','');
						break;
					}
				};
				thisReplacment
					.find('.' + settings.className + '-currentItem')
					.text(thisListElement.text())
					.attr("class",settings.className + '-currentItem item-'+k );
				thisReplacment
					.find('select')
					.val(thisValue)
					.triggerHandler('change');
				var thisSublist = thisReplacment.find('.' + settings.className + '-list');
				if(thisSublist.filter(":visible").length > 0) {
					hideList( thisSublist );
				}else{
					showList( thisSublist );
				}
			}).bind('mouseenter',function(){
				jQuery(this).addClass('listelementhover');

			}).bind('mouseleave',function(){
				jQuery(this).removeClass('listelementhover');
			});
			jQuery('.' + settings.className + '-list', replacement).append(listElement);
			if(v.filter(':selected').length > 0) {
				jQuery('.'+settings.className + '-currentItem', replacement).text(v.text());
			}
		});
		replacement.find('.' + settings.className + '-moreButton').click(function(){
			var thisMoreButton = jQuery(this);
			var otherLists = jQuery('.' + settings.className + '-list')
				.not(thisMoreButton.siblings('.' + settings.className + '-list'));
			hideList( otherLists );
			var thisList = thisMoreButton.siblings('.' + settings.className + '-list');
			if(thisList.filter(":visible").length > 0) {
				hideList( thisList );
				jQuery(this).removeClass('morebuttonhover');
			}else{
				showList( thisList );
				jQuery(this).addClass('morebuttonhover');
			}
			return false;
		});
		// .bind('mouseenter',function(){
		// 	jQuery(this).addClass('morebuttonhover');
		// })
		// .bind('mouseleave',function(){
		// 	jQuery(this).removeClass('morebuttonhover');
		// });
		
		replacement.find('.' + settings.className +'-currentItem').click(function(){
			replacement.find('.' + settings.className + '-moreButton').click();
			return false;
		}); // MODIFY

		replacement.find('.' + settings.className +'-currentItem').focus(function() {
			$(this).parents(".jquery-selectbox").addClass("selectbox_on");
		});
		replacement.find('.' + settings.className +'-currentItem').blur(function() {
			$(this).parents(".jquery-selectbox").removeClass("selectbox_on");
		});

		replacement.find('.' + settings.className + '-moreButton').focus(function() {
			$(this).parents(".jquery-selectbox").addClass("selectbox_on");
		});

		replacement.find('.' + settings.className + '-moreButton').blur(function() {
			$(this).parents(".jquery-selectbox").removeClass("selectbox_on");
		});

		_this.hide().replaceWith(replacement).appendTo(replacement);
		var thisListBox = replacement.find('.' + settings.className + '-list');
		var thisListBoxSize = thisListBox.find('.' + settings.className + '-item').length;
		if(thisListBoxSize > 4) {
			thisListBoxSize = 4;
			selectScroll(thisListBox);
		}
		if(thisListBoxSize == 0)
			thisListBoxSize = 1;	
		// if(jQuery.browser.safari)
		// 	thisListBoxWidth = thisListBoxWidth * 0.94;
		// if (thisListBox.parents("div").hasClass("controler")) var thisListBoxWidth = Math.round(_this.width() + 2);
		// else var thisListBoxWidth = Math.round(_this.width() + 5);
		var thisListBoxWidth = Math.round(_this.width() + 5);
		replacement.css('width', thisListBoxWidth + 'px');
		var heightSize = Math.round(thisListBoxSize*34) + 'px';
		if (thisListBox.parents(".slider_btn").size() > 0 || thisListBox.parents(".controler").size() > 0) heightSize = Math.round(thisListBoxSize*23) + 'px';
		if (thisListBox.parents(".sort_search03").size() >  0) heightSize = Math.round(thisListBoxSize*25) + 'px';
		thisListBox.css({
			width: Math.round(thisListBoxWidth+6) + 'px',
			// width: 139 + 'px',
			height: heightSize
			// height: Math.round(thisListBoxSize*2) + 'em'
		});
	});
}
jQuery.fn.unselectbox = function(){
	var commonClass = 'jquery-custom-selectboxes-replaced';
	return this.each(function() {
		var selectToRemove = jQuery(this).filter('.' + commonClass);
		selectToRemove.replaceWith(selectToRemove.find('select').show());
	});
}

function selectScroll(thisListBox) {
	thisListBox.mCustomScrollbar({
		theme:"dark-thick",
		scrollButtons:{
						enable:true
					},
		advanced:{
				//updateOnContentResize: true,
				autoScrollOnFocus: false
			}
   });
}

