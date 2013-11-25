/*
*	typecoords, authored by me just now
*/
var typecoords = (function () {

	// global counter to ensure unique ids
	var eCount = 0;

	// private
	// take an element full of text and create spilt chars into choord elements
	var coordify = function ($e) {

		var str = $e.html(),
			chars = str.split('');

		var $wce = $('<span></span>'); // temp wordchords element

		for (var i = 0, l = chars.length; i < l; i++) {
			$wce.append('<span class="wc_letter" id="wc_letter' + eCount + '">' + chars[i] + '</span>');
			eCount++;
		}

		return $e.html($wce.html());

	};

	// public
	// calculate the coordinates of each coord element in a coordified element
	// usefull in isolation if any position changes in the dom and we need to recalculate
	var calc = function ($e) {

		var es = $e.find('.wc_letter'),
			position = [],
			offset = [],
			scroll = [];

		es.each(function (i, e) {

			var pos = $(e).position();
			pos.e = $(e);
			position.push(pos);

			var off = $(e).offset();
			off.e = $(e);
			offset.push(off);

			var scr = {
				top: $e.scrollTop(),
				left: $e.scrollLeft(),
				e: $(e)
			};
			scroll.push(scr);

		});

		return {
			position: position,
			offset: offset,
			scroll: scroll
		};

	};

	// public
	// e: an element or selector containing text
	// coordifies the element contents
	// returns an object containing information about the coordified sub elements  
	var chop = function (e) {

		var $e = $(e);

		// coordify the element;
		coordify($e);
		$e.addClass('coordified'); // mark the element as coordified

		// get object of addresses
		return calc($e);

	};

	return {
		chop: chop,
		calc: calc
	};

}());