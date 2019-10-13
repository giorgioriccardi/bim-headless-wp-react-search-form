(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var fields = require('./includes/fields');
var pagination = require('./includes/pagination');
var state = require('./includes/state');
var plugin = require('./includes/plugin');


(function ( $ ) {

	"use strict";

	$(function () {

		String.prototype.replaceAll = function(str1, str2, ignore)
		{
			return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
		}

		if (!Object.keys) {
		  Object.keys = (function () {
			'use strict';
			var hasOwnProperty = Object.prototype.hasOwnProperty,
				hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
				dontEnums = [
				  'toString',
				  'toLocaleString',
				  'valueOf',
				  'hasOwnProperty',
				  'isPrototypeOf',
				  'propertyIsEnumerable',
				  'constructor'
				],
				dontEnumsLength = dontEnums.length;

			return function (obj) {
			  if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
				throw new TypeError('Object.keys called on non-object');
			  }

			  var result = [], prop, i;

			  for (prop in obj) {
				if (hasOwnProperty.call(obj, prop)) {
				  result.push(prop);
				}
			  }

			  if (hasDontEnumBug) {
				for (i = 0; i < dontEnumsLength; i++) {
				  if (hasOwnProperty.call(obj, dontEnums[i])) {
					result.push(dontEnums[i]);
				  }
				}
			  }
			  return result;
			};
		  }());
		}

		/* Search & Filter jQuery Plugin */
		$.fn.searchAndFilter = plugin;

		/* init */
		$(".searchandfilter").searchAndFilter();

		/* external controls */
		$(document).on("click", ".search-filter-reset", function(e){

			e.preventDefault();

			var searchFormID = typeof($(this).attr("data-search-form-id"))!="undefined" ? $(this).attr("data-search-form-id") : "";
			var submitForm = typeof($(this).attr("data-sf-submit-form"))!="undefined" ? $(this).attr("data-sf-submit-form") : "";

			state.getSearchForm(searchFormID).reset(submitForm);

			//var $linked = $("#search-filter-form-"+searchFormID).searchFilterForm({action: "reset"});

			return false;

		});

	});

	$.easing.jswing=$.easing.swing;$.extend($.easing,{def:"easeOutQuad",swing:function(e,t,n,r,i){return $.easing[$.easing.def](e,t,n,r,i)},easeInQuad:function(e,t,n,r,i){return r*(t/=i)*t+n},easeOutQuad:function(e,t,n,r,i){return-r*(t/=i)*(t-2)+n},easeInOutQuad:function(e,t,n,r,i){if((t/=i/2)<1)return r/2*t*t+n;return-r/2*(--t*(t-2)-1)+n},easeInCubic:function(e,t,n,r,i){return r*(t/=i)*t*t+n},easeOutCubic:function(e,t,n,r,i){return r*((t=t/i-1)*t*t+1)+n},easeInOutCubic:function(e,t,n,r,i){if((t/=i/2)<1)return r/2*t*t*t+n;return r/2*((t-=2)*t*t+2)+n},easeInQuart:function(e,t,n,r,i){return r*(t/=i)*t*t*t+n},easeOutQuart:function(e,t,n,r,i){return-r*((t=t/i-1)*t*t*t-1)+n},easeInOutQuart:function(e,t,n,r,i){if((t/=i/2)<1)return r/2*t*t*t*t+n;return-r/2*((t-=2)*t*t*t-2)+n},easeInQuint:function(e,t,n,r,i){return r*(t/=i)*t*t*t*t+n},easeOutQuint:function(e,t,n,r,i){return r*((t=t/i-1)*t*t*t*t+1)+n},easeInOutQuint:function(e,t,n,r,i){if((t/=i/2)<1)return r/2*t*t*t*t*t+n;return r/2*((t-=2)*t*t*t*t+2)+n},easeInSine:function(e,t,n,r,i){return-r*Math.cos(t/i*(Math.PI/2))+r+n},easeOutSine:function(e,t,n,r,i){return r*Math.sin(t/i*(Math.PI/2))+n},easeInOutSine:function(e,t,n,r,i){return-r/2*(Math.cos(Math.PI*t/i)-1)+n},easeInExpo:function(e,t,n,r,i){return t==0?n:r*Math.pow(2,10*(t/i-1))+n},easeOutExpo:function(e,t,n,r,i){return t==i?n+r:r*(-Math.pow(2,-10*t/i)+1)+n},easeInOutExpo:function(e,t,n,r,i){if(t==0)return n;if(t==i)return n+r;if((t/=i/2)<1)return r/2*Math.pow(2,10*(t-1))+n;return r/2*(-Math.pow(2,-10*--t)+2)+n},easeInCirc:function(e,t,n,r,i){return-r*(Math.sqrt(1-(t/=i)*t)-1)+n},easeOutCirc:function(e,t,n,r,i){return r*Math.sqrt(1-(t=t/i-1)*t)+n},easeInOutCirc:function(e,t,n,r,i){if((t/=i/2)<1)return-r/2*(Math.sqrt(1-t*t)-1)+n;return r/2*(Math.sqrt(1-(t-=2)*t)+1)+n},easeInElastic:function(e,t,n,r,i){var s=1.70158;var o=0;var u=r;if(t==0)return n;if((t/=i)==1)return n+r;if(!o)o=i*.3;if(u<Math.abs(r)){u=r;var s=o/4}else var s=o/(2*Math.PI)*Math.asin(r/u);return-(u*Math.pow(2,10*(t-=1))*Math.sin((t*i-s)*2*Math.PI/o))+n},easeOutElastic:function(e,t,n,r,i){var s=1.70158;var o=0;var u=r;if(t==0)return n;if((t/=i)==1)return n+r;if(!o)o=i*.3;if(u<Math.abs(r)){u=r;var s=o/4}else var s=o/(2*Math.PI)*Math.asin(r/u);return u*Math.pow(2,-10*t)*Math.sin((t*i-s)*2*Math.PI/o)+r+n},easeInOutElastic:function(e,t,n,r,i){var s=1.70158;var o=0;var u=r;if(t==0)return n;if((t/=i/2)==2)return n+r;if(!o)o=i*.3*1.5;if(u<Math.abs(r)){u=r;var s=o/4}else var s=o/(2*Math.PI)*Math.asin(r/u);if(t<1)return-.5*u*Math.pow(2,10*(t-=1))*Math.sin((t*i-s)*2*Math.PI/o)+n;return u*Math.pow(2,-10*(t-=1))*Math.sin((t*i-s)*2*Math.PI/o)*.5+r+n},easeInBack:function(e,t,n,r,i,s){if(s==undefined)s=1.70158;return r*(t/=i)*t*((s+1)*t-s)+n},easeOutBack:function(e,t,n,r,i,s){if(s==undefined)s=1.70158;return r*((t=t/i-1)*t*((s+1)*t+s)+1)+n},easeInOutBack:function(e,t,n,r,i,s){if(s==undefined)s=1.70158;if((t/=i/2)<1)return r/2*t*t*(((s*=1.525)+1)*t-s)+n;return r/2*((t-=2)*t*(((s*=1.525)+1)*t+s)+2)+n},easeInBounce:function(e,t,n,r,i){return r-$.easing.easeOutBounce(e,i-t,0,r,i)+n},easeOutBounce:function(e,t,n,r,i){if((t/=i)<1/2.75){return r*7.5625*t*t+n}else if(t<2/2.75){return r*(7.5625*(t-=1.5/2.75)*t+.75)+n}else if(t<2.5/2.75){return r*(7.5625*(t-=2.25/2.75)*t+.9375)+n}else{return r*(7.5625*(t-=2.625/2.75)*t+.984375)+n}},easeInOutBounce:function(e,t,n,r,i){if(t<i/2)return $.easing.easeInBounce(e,t*2,0,r,i)*.5+n;return $.easing.easeOutBounce(e,t*2-i,0,r,i)*.5+r*.5+n}})

}(jQuery));

/* wpnumb - nouislider number formatting */
!function(){"use strict";function e(e){return e.split("").reverse().join("")}function n(e,n){return e.substring(0,n.length)===n}function r(e,n){return e.slice(-1*n.length)===n}function t(e,n,r){if((e[n]||e[r])&&e[n]===e[r])throw new Error(n)}function i(e){return"number"==typeof e&&isFinite(e)}function o(e,n){var r=Math.pow(10,n);return(Math.round(e*r)/r).toFixed(n)}function u(n,r,t,u,f,a,c,s,p,d,l,h){var g,v,w,m=h,x="",b="";return a&&(h=a(h)),i(h)?(n!==!1&&0===parseFloat(h.toFixed(n))&&(h=0),0>h&&(g=!0,h=Math.abs(h)),n!==!1&&(h=o(h,n)),h=h.toString(),-1!==h.indexOf(".")?(v=h.split("."),w=v[0],t&&(x=t+v[1])):w=h,r&&(w=e(w).match(/.{1,3}/g),w=e(w.join(e(r)))),g&&s&&(b+=s),u&&(b+=u),g&&p&&(b+=p),b+=w,b+=x,f&&(b+=f),d&&(b=d(b,m)),b):!1}function f(e,t,o,u,f,a,c,s,p,d,l,h){var g,v="";return l&&(h=l(h)),h&&"string"==typeof h?(s&&n(h,s)&&(h=h.replace(s,""),g=!0),u&&n(h,u)&&(h=h.replace(u,"")),p&&n(h,p)&&(h=h.replace(p,""),g=!0),f&&r(h,f)&&(h=h.slice(0,-1*f.length)),t&&(h=h.split(t).join("")),o&&(h=h.replace(o,".")),g&&(v+="-"),v+=h,v=v.replace(/[^0-9\.\-.]/g,""),""===v?!1:(v=Number(v),c&&(v=c(v)),i(v)?v:!1)):!1}function a(e){var n,r,i,o={};for(n=0;n<p.length;n+=1)if(r=p[n],i=e[r],void 0===i)"negative"!==r||o.negativeBefore?"mark"===r&&"."!==o.thousand?o[r]=".":o[r]=!1:o[r]="-";else if("decimals"===r){if(!(i>=0&&8>i))throw new Error(r);o[r]=i}else if("encoder"===r||"decoder"===r||"edit"===r||"undo"===r){if("function"!=typeof i)throw new Error(r);o[r]=i}else{if("string"!=typeof i)throw new Error(r);o[r]=i}return t(o,"mark","thousand"),t(o,"prefix","negative"),t(o,"prefix","negativeBefore"),o}function c(e,n,r){var t,i=[];for(t=0;t<p.length;t+=1)i.push(e[p[t]]);return i.push(r),n.apply("",i)}function s(e){return this instanceof s?void("object"==typeof e&&(e=a(e),this.to=function(n){return c(e,u,n)},this.from=function(n){return c(e,f,n)})):new s(e)}var p=["decimals","thousand","mark","prefix","postfix","encoder","decoder","negativeBefore","negative","edit","undo"];window.wNumb=s}();


},{"./includes/fields":4,"./includes/pagination":5,"./includes/plugin":6,"./includes/state":8}],2:[function(require,module,exports){
/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return (document.cookie = key + '=' + value + stringifiedAttributes);
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!this.json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));

},{}],3:[function(require,module,exports){
/*! nouislider - 11.1.0 - 2018-04-02 11:18:13 */

(function (factory) {

    if ( typeof define === 'function' && define.amd ) {

        // AMD. Register as an anonymous module.
        define([], factory);

    } else if ( typeof exports === 'object' ) {

        // Node/CommonJS
        module.exports = factory();

    } else {

        // Browser globals
        window.noUiSlider = factory();
    }

}(function( ){

	'use strict';

	var VERSION = '11.1.0';


	function isValidFormatter ( entry ) {
		return typeof entry === 'object' && typeof entry.to === 'function' && typeof entry.from === 'function';
	}

	function removeElement ( el ) {
		el.parentElement.removeChild(el);
	}

	function isSet ( value ) {
		return value !== null && value !== undefined;
	}

	// Bindable version
	function preventDefault ( e ) {
		e.preventDefault();
	}

	// Removes duplicates from an array.
	function unique ( array ) {
		return array.filter(function(a){
			return !this[a] ? this[a] = true : false;
		}, {});
	}

	// Round a value to the closest 'to'.
	function closest ( value, to ) {
		return Math.round(value / to) * to;
	}

	// Current position of an element relative to the document.
	function offset ( elem, orientation ) {

		var rect = elem.getBoundingClientRect();
		var doc = elem.ownerDocument;
		var docElem = doc.documentElement;
		var pageOffset = getPageOffset(doc);

		// getBoundingClientRect contains left scroll in Chrome on Android.
		// I haven't found a feature detection that proves this. Worst case
		// scenario on mis-match: the 'tap' feature on horizontal sliders breaks.
		if ( /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) ) {
			pageOffset.x = 0;
		}

		return orientation ? (rect.top + pageOffset.y - docElem.clientTop) : (rect.left + pageOffset.x - docElem.clientLeft);
	}

	// Checks whether a value is numerical.
	function isNumeric ( a ) {
		return typeof a === 'number' && !isNaN( a ) && isFinite( a );
	}

	// Sets a class and removes it after [duration] ms.
	function addClassFor ( element, className, duration ) {
		if (duration > 0) {
		addClass(element, className);
			setTimeout(function(){
				removeClass(element, className);
			}, duration);
		}
	}

	// Limits a value to 0 - 100
	function limit ( a ) {
		return Math.max(Math.min(a, 100), 0);
	}

	// Wraps a variable as an array, if it isn't one yet.
	// Note that an input array is returned by reference!
	function asArray ( a ) {
		return Array.isArray(a) ? a : [a];
	}

	// Counts decimals
	function countDecimals ( numStr ) {
		numStr = String(numStr);
		var pieces = numStr.split(".");
		return pieces.length > 1 ? pieces[1].length : 0;
	}

	// http://youmightnotneedjquery.com/#add_class
	function addClass ( el, className ) {
		if ( el.classList ) {
			el.classList.add(className);
		} else {
			el.className += ' ' + className;
		}
	}

	// http://youmightnotneedjquery.com/#remove_class
	function removeClass ( el, className ) {
		if ( el.classList ) {
			el.classList.remove(className);
		} else {
			el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	}

	// https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
	function hasClass ( el, className ) {
		return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
	}

	// https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY#Notes
	function getPageOffset ( doc ) {

		var supportPageOffset = window.pageXOffset !== undefined;
		var isCSS1Compat = ((doc.compatMode || "") === "CSS1Compat");
		var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? doc.documentElement.scrollLeft : doc.body.scrollLeft;
		var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? doc.documentElement.scrollTop : doc.body.scrollTop;

		return {
			x: x,
			y: y
		};
	}

	// we provide a function to compute constants instead
	// of accessing window.* as soon as the module needs it
	// so that we do not compute anything if not needed
	function getActions ( ) {

		// Determine the events to bind. IE11 implements pointerEvents without
		// a prefix, which breaks compatibility with the IE10 implementation.
		return window.navigator.pointerEnabled ? {
			start: 'pointerdown',
			move: 'pointermove',
			end: 'pointerup'
		} : window.navigator.msPointerEnabled ? {
			start: 'MSPointerDown',
			move: 'MSPointerMove',
			end: 'MSPointerUp'
		} : {
			start: 'mousedown touchstart',
			move: 'mousemove touchmove',
			end: 'mouseup touchend'
		};
	}

	// https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
	// Issue #785
	function getSupportsPassive ( ) {

		var supportsPassive = false;

		try {

			var opts = Object.defineProperty({}, 'passive', {
				get: function() {
					supportsPassive = true;
				}
			});

			window.addEventListener('test', null, opts);

		} catch (e) {}

		return supportsPassive;
	}

	function getSupportsTouchActionNone ( ) {
		return window.CSS && CSS.supports && CSS.supports('touch-action', 'none');
	}


// Value calculation

	// Determine the size of a sub-range in relation to a full range.
	function subRangeRatio ( pa, pb ) {
		return (100 / (pb - pa));
	}

	// (percentage) How many percent is this value of this range?
	function fromPercentage ( range, value ) {
		return (value * 100) / ( range[1] - range[0] );
	}

	// (percentage) Where is this value on this range?
	function toPercentage ( range, value ) {
		return fromPercentage( range, range[0] < 0 ?
			value + Math.abs(range[0]) :
				value - range[0] );
	}

	// (value) How much is this percentage on this range?
	function isPercentage ( range, value ) {
		return ((value * ( range[1] - range[0] )) / 100) + range[0];
	}


// Range conversion

	function getJ ( value, arr ) {

		var j = 1;

		while ( value >= arr[j] ){
			j += 1;
		}

		return j;
	}

	// (percentage) Input a value, find where, on a scale of 0-100, it applies.
	function toStepping ( xVal, xPct, value ) {

		if ( value >= xVal.slice(-1)[0] ){
			return 100;
		}

		var j = getJ( value, xVal );
		var va = xVal[j-1];
		var vb = xVal[j];
		var pa = xPct[j-1];
		var pb = xPct[j];

		return pa + (toPercentage([va, vb], value) / subRangeRatio (pa, pb));
	}

	// (value) Input a percentage, find where it is on the specified range.
	function fromStepping ( xVal, xPct, value ) {

		// There is no range group that fits 100
		if ( value >= 100 ){
			return xVal.slice(-1)[0];
		}

		var j = getJ( value, xPct );
		var va = xVal[j-1];
		var vb = xVal[j];
		var pa = xPct[j-1];
		var pb = xPct[j];

		return isPercentage([va, vb], (value - pa) * subRangeRatio (pa, pb));
	}

	// (percentage) Get the step that applies at a certain value.
	function getStep ( xPct, xSteps, snap, value ) {

		if ( value === 100 ) {
			return value;
		}

		var j = getJ( value, xPct );
		var a = xPct[j-1];
		var b = xPct[j];

		// If 'snap' is set, steps are used as fixed points on the slider.
		if ( snap ) {

			// Find the closest position, a or b.
			if ((value - a) > ((b-a)/2)){
				return b;
			}

			return a;
		}

		if ( !xSteps[j-1] ){
			return value;
		}

		return xPct[j-1] + closest(
			value - xPct[j-1],
			xSteps[j-1]
		);
	}


// Entry parsing

	function handleEntryPoint ( index, value, that ) {

		var percentage;

		// Wrap numerical input in an array.
		if ( typeof value === "number" ) {
			value = [value];
		}

		// Reject any invalid input, by testing whether value is an array.
		if ( !Array.isArray(value) ){
			throw new Error("noUiSlider (" + VERSION + "): 'range' contains invalid value.");
		}

		// Covert min/max syntax to 0 and 100.
		if ( index === 'min' ) {
			percentage = 0;
		} else if ( index === 'max' ) {
			percentage = 100;
		} else {
			percentage = parseFloat( index );
		}

		// Check for correct input.
		if ( !isNumeric( percentage ) || !isNumeric( value[0] ) ) {
			throw new Error("noUiSlider (" + VERSION + "): 'range' value isn't numeric.");
		}

		// Store values.
		that.xPct.push( percentage );
		that.xVal.push( value[0] );

		// NaN will evaluate to false too, but to keep
		// logging clear, set step explicitly. Make sure
		// not to override the 'step' setting with false.
		if ( !percentage ) {
			if ( !isNaN( value[1] ) ) {
				that.xSteps[0] = value[1];
			}
		} else {
			that.xSteps.push( isNaN(value[1]) ? false : value[1] );
		}

		that.xHighestCompleteStep.push(0);
	}

	function handleStepPoint ( i, n, that ) {

		// Ignore 'false' stepping.
		if ( !n ) {
			return true;
		}

		// Factor to range ratio
		that.xSteps[i] = fromPercentage([that.xVal[i], that.xVal[i+1]], n) / subRangeRatio(that.xPct[i], that.xPct[i+1]);

		var totalSteps = (that.xVal[i+1] - that.xVal[i]) / that.xNumSteps[i];
		var highestStep = Math.ceil(Number(totalSteps.toFixed(3)) - 1);
		var step = that.xVal[i] + (that.xNumSteps[i] * highestStep);

		that.xHighestCompleteStep[i] = step;
	}


// Interface

	function Spectrum ( entry, snap, singleStep ) {

		this.xPct = [];
		this.xVal = [];
		this.xSteps = [ singleStep || false ];
		this.xNumSteps = [ false ];
		this.xHighestCompleteStep = [];

		this.snap = snap;

		var index;
		var ordered = []; // [0, 'min'], [1, '50%'], [2, 'max']

		// Map the object keys to an array.
		for ( index in entry ) {
			if ( entry.hasOwnProperty(index) ) {
				ordered.push([entry[index], index]);
			}
		}

		// Sort all entries by value (numeric sort).
		if ( ordered.length && typeof ordered[0][0] === "object" ) {
			ordered.sort(function(a, b) { return a[0][0] - b[0][0]; });
		} else {
			ordered.sort(function(a, b) { return a[0] - b[0]; });
		}


		// Convert all entries to subranges.
		for ( index = 0; index < ordered.length; index++ ) {
			handleEntryPoint(ordered[index][1], ordered[index][0], this);
		}

		// Store the actual step values.
		// xSteps is sorted in the same order as xPct and xVal.
		this.xNumSteps = this.xSteps.slice(0);

		// Convert all numeric steps to the percentage of the subrange they represent.
		for ( index = 0; index < this.xNumSteps.length; index++ ) {
			handleStepPoint(index, this.xNumSteps[index], this);
		}
	}

	Spectrum.prototype.getMargin = function ( value ) {

		var step = this.xNumSteps[0];

		if ( step && ((value / step) % 1) !== 0 ) {
			throw new Error("noUiSlider (" + VERSION + "): 'limit', 'margin' and 'padding' must be divisible by step.");
		}

		return this.xPct.length === 2 ? fromPercentage(this.xVal, value) : false;
	};

	Spectrum.prototype.toStepping = function ( value ) {

		value = toStepping( this.xVal, this.xPct, value );

		return value;
	};

	Spectrum.prototype.fromStepping = function ( value ) {

		return fromStepping( this.xVal, this.xPct, value );
	};

	Spectrum.prototype.getStep = function ( value ) {

		value = getStep(this.xPct, this.xSteps, this.snap, value );

		return value;
	};

	Spectrum.prototype.getNearbySteps = function ( value ) {

		var j = getJ(value, this.xPct);

		return {
			stepBefore: { startValue: this.xVal[j-2], step: this.xNumSteps[j-2], highestStep: this.xHighestCompleteStep[j-2] },
			thisStep: { startValue: this.xVal[j-1], step: this.xNumSteps[j-1], highestStep: this.xHighestCompleteStep[j-1] },
			stepAfter: { startValue: this.xVal[j-0], step: this.xNumSteps[j-0], highestStep: this.xHighestCompleteStep[j-0] }
		};
	};

	Spectrum.prototype.countStepDecimals = function () {
		var stepDecimals = this.xNumSteps.map(countDecimals);
		return Math.max.apply(null, stepDecimals);
	};

	// Outside testing
	Spectrum.prototype.convert = function ( value ) {
		return this.getStep(this.toStepping(value));
	};

/*	Every input option is tested and parsed. This'll prevent
	endless validation in internal methods. These tests are
	structured with an item for every option available. An
	option can be marked as required by setting the 'r' flag.
	The testing function is provided with three arguments:
		- The provided value for the option;
		- A reference to the options object;
		- The name for the option;

	The testing function returns false when an error is detected,
	or true when everything is OK. It can also modify the option
	object, to make sure all values can be correctly looped elsewhere. */

	var defaultFormatter = { 'to': function( value ){
		return value !== undefined && value.toFixed(2);
	}, 'from': Number };

	function validateFormat ( entry ) {

		// Any object with a to and from method is supported.
		if ( isValidFormatter(entry) ) {
			return true;
		}

		throw new Error("noUiSlider (" + VERSION + "): 'format' requires 'to' and 'from' methods.");
	}

	function testStep ( parsed, entry ) {

		if ( !isNumeric( entry ) ) {
			throw new Error("noUiSlider (" + VERSION + "): 'step' is not numeric.");
		}

		// The step option can still be used to set stepping
		// for linear sliders. Overwritten if set in 'range'.
		parsed.singleStep = entry;
	}

	function testRange ( parsed, entry ) {

		// Filter incorrect input.
		if ( typeof entry !== 'object' || Array.isArray(entry) ) {
			throw new Error("noUiSlider (" + VERSION + "): 'range' is not an object.");
		}

		// Catch missing start or end.
		if ( entry.min === undefined || entry.max === undefined ) {
			throw new Error("noUiSlider (" + VERSION + "): Missing 'min' or 'max' in 'range'.");
		}

		// Catch equal start or end.
		if ( entry.min === entry.max ) {
			throw new Error("noUiSlider (" + VERSION + "): 'range' 'min' and 'max' cannot be equal.");
		}

		parsed.spectrum = new Spectrum(entry, parsed.snap, parsed.singleStep);
	}

	function testStart ( parsed, entry ) {

		entry = asArray(entry);

		// Validate input. Values aren't tested, as the public .val method
		// will always provide a valid location.
		if ( !Array.isArray( entry ) || !entry.length ) {
			throw new Error("noUiSlider (" + VERSION + "): 'start' option is incorrect.");
		}

		// Store the number of handles.
		parsed.handles = entry.length;

		// When the slider is initialized, the .val method will
		// be called with the start options.
		parsed.start = entry;
	}

	function testSnap ( parsed, entry ) {

		// Enforce 100% stepping within subranges.
		parsed.snap = entry;

		if ( typeof entry !== 'boolean' ){
			throw new Error("noUiSlider (" + VERSION + "): 'snap' option must be a boolean.");
		}
	}

	function testAnimate ( parsed, entry ) {

		// Enforce 100% stepping within subranges.
		parsed.animate = entry;

		if ( typeof entry !== 'boolean' ){
			throw new Error("noUiSlider (" + VERSION + "): 'animate' option must be a boolean.");
		}
	}

	function testAnimationDuration ( parsed, entry ) {

		parsed.animationDuration = entry;

		if ( typeof entry !== 'number' ){
			throw new Error("noUiSlider (" + VERSION + "): 'animationDuration' option must be a number.");
		}
	}

	function testConnect ( parsed, entry ) {

		var connect = [false];
		var i;

		// Map legacy options
		if ( entry === 'lower' ) {
			entry = [true, false];
		}

		else if ( entry === 'upper' ) {
			entry = [false, true];
		}

		// Handle boolean options
		if ( entry === true || entry === false ) {

			for ( i = 1; i < parsed.handles; i++ ) {
				connect.push(entry);
			}

			connect.push(false);
		}

		// Reject invalid input
		else if ( !Array.isArray( entry ) || !entry.length || entry.length !== parsed.handles + 1 ) {
			throw new Error("noUiSlider (" + VERSION + "): 'connect' option doesn't match handle count.");
		}

		else {
			connect = entry;
		}

		parsed.connect = connect;
	}

	function testOrientation ( parsed, entry ) {

		// Set orientation to an a numerical value for easy
		// array selection.
		switch ( entry ){
			case 'horizontal':
				parsed.ort = 0;
				break;
			case 'vertical':
				parsed.ort = 1;
				break;
			default:
				throw new Error("noUiSlider (" + VERSION + "): 'orientation' option is invalid.");
		}
	}

	function testMargin ( parsed, entry ) {

		if ( !isNumeric(entry) ){
			throw new Error("noUiSlider (" + VERSION + "): 'margin' option must be numeric.");
		}

		// Issue #582
		if ( entry === 0 ) {
			return;
		}

		parsed.margin = parsed.spectrum.getMargin(entry);

		if ( !parsed.margin ) {
			throw new Error("noUiSlider (" + VERSION + "): 'margin' option is only supported on linear sliders.");
		}
	}

	function testLimit ( parsed, entry ) {

		if ( !isNumeric(entry) ){
			throw new Error("noUiSlider (" + VERSION + "): 'limit' option must be numeric.");
		}

		parsed.limit = parsed.spectrum.getMargin(entry);

		if ( !parsed.limit || parsed.handles < 2 ) {
			throw new Error("noUiSlider (" + VERSION + "): 'limit' option is only supported on linear sliders with 2 or more handles.");
		}
	}

	function testPadding ( parsed, entry ) {

		if ( !isNumeric(entry) && !Array.isArray(entry) ){
			throw new Error("noUiSlider (" + VERSION + "): 'padding' option must be numeric or array of exactly 2 numbers.");
		}

		if ( Array.isArray(entry) && !(entry.length === 2 || isNumeric(entry[0]) || isNumeric(entry[1])) ) {
			throw new Error("noUiSlider (" + VERSION + "): 'padding' option must be numeric or array of exactly 2 numbers.");
		}

		if ( entry === 0 ) {
			return;
		}

		if ( !Array.isArray(entry) ) {
			entry = [entry, entry];
		}

		// 'getMargin' returns false for invalid values.
		parsed.padding = [parsed.spectrum.getMargin(entry[0]), parsed.spectrum.getMargin(entry[1])];

		if ( parsed.padding[0] === false || parsed.padding[1] === false ) {
			throw new Error("noUiSlider (" + VERSION + "): 'padding' option is only supported on linear sliders.");
		}

		if ( parsed.padding[0] < 0 || parsed.padding[1] < 0 ) {
			throw new Error("noUiSlider (" + VERSION + "): 'padding' option must be a positive number(s).");
		}

		if ( parsed.padding[0] + parsed.padding[1] >= 100 ) {
			throw new Error("noUiSlider (" + VERSION + "): 'padding' option must not exceed 100% of the range.");
		}
	}

	function testDirection ( parsed, entry ) {

		// Set direction as a numerical value for easy parsing.
		// Invert connection for RTL sliders, so that the proper
		// handles get the connect/background classes.
		switch ( entry ) {
			case 'ltr':
				parsed.dir = 0;
				break;
			case 'rtl':
				parsed.dir = 1;
				break;
			default:
				throw new Error("noUiSlider (" + VERSION + "): 'direction' option was not recognized.");
		}
	}

	function testBehaviour ( parsed, entry ) {

		// Make sure the input is a string.
		if ( typeof entry !== 'string' ) {
			throw new Error("noUiSlider (" + VERSION + "): 'behaviour' must be a string containing options.");
		}

		// Check if the string contains any keywords.
		// None are required.
		var tap = entry.indexOf('tap') >= 0;
		var drag = entry.indexOf('drag') >= 0;
		var fixed = entry.indexOf('fixed') >= 0;
		var snap = entry.indexOf('snap') >= 0;
		var hover = entry.indexOf('hover') >= 0;

		if ( fixed ) {

			if ( parsed.handles !== 2 ) {
				throw new Error("noUiSlider (" + VERSION + "): 'fixed' behaviour must be used with 2 handles");
			}

			// Use margin to enforce fixed state
			testMargin(parsed, parsed.start[1] - parsed.start[0]);
		}

		parsed.events = {
			tap: tap || snap,
			drag: drag,
			fixed: fixed,
			snap: snap,
			hover: hover
		};
	}

	function testTooltips ( parsed, entry ) {

		if ( entry === false ) {
			return;
		}

		else if ( entry === true ) {

			parsed.tooltips = [];

			for ( var i = 0; i < parsed.handles; i++ ) {
				parsed.tooltips.push(true);
			}
		}

		else {

			parsed.tooltips = asArray(entry);

			if ( parsed.tooltips.length !== parsed.handles ) {
				throw new Error("noUiSlider (" + VERSION + "): must pass a formatter for all handles.");
			}

			parsed.tooltips.forEach(function(formatter){
				if ( typeof formatter !== 'boolean' && (typeof formatter !== 'object' || typeof formatter.to !== 'function') ) {
					throw new Error("noUiSlider (" + VERSION + "): 'tooltips' must be passed a formatter or 'false'.");
				}
			});
		}
	}

	function testAriaFormat ( parsed, entry ) {
		parsed.ariaFormat = entry;
		validateFormat(entry);
	}

	function testFormat ( parsed, entry ) {
		parsed.format = entry;
		validateFormat(entry);
	}

	function testCssPrefix ( parsed, entry ) {

		if ( typeof entry !== 'string' && entry !== false ) {
			throw new Error("noUiSlider (" + VERSION + "): 'cssPrefix' must be a string or `false`.");
		}

		parsed.cssPrefix = entry;
	}

	function testCssClasses ( parsed, entry ) {

		if ( typeof entry !== 'object' ) {
			throw new Error("noUiSlider (" + VERSION + "): 'cssClasses' must be an object.");
		}

		if ( typeof parsed.cssPrefix === 'string' ) {
			parsed.cssClasses = {};

			for ( var key in entry ) {
				if ( !entry.hasOwnProperty(key) ) { continue; }

				parsed.cssClasses[key] = parsed.cssPrefix + entry[key];
			}
		} else {
			parsed.cssClasses = entry;
		}
	}

	// Test all developer settings and parse to assumption-safe values.
	function testOptions ( options ) {

		// To prove a fix for #537, freeze options here.
		// If the object is modified, an error will be thrown.
		// Object.freeze(options);

		var parsed = {
			margin: 0,
			limit: 0,
			padding: 0,
			animate: true,
			animationDuration: 300,
			ariaFormat: defaultFormatter,
			format: defaultFormatter
		};

		// Tests are executed in the order they are presented here.
		var tests = {
			'step': { r: false, t: testStep },
			'start': { r: true, t: testStart },
			'connect': { r: true, t: testConnect },
			'direction': { r: true, t: testDirection },
			'snap': { r: false, t: testSnap },
			'animate': { r: false, t: testAnimate },
			'animationDuration': { r: false, t: testAnimationDuration },
			'range': { r: true, t: testRange },
			'orientation': { r: false, t: testOrientation },
			'margin': { r: false, t: testMargin },
			'limit': { r: false, t: testLimit },
			'padding': { r: false, t: testPadding },
			'behaviour': { r: true, t: testBehaviour },
			'ariaFormat': { r: false, t: testAriaFormat },
			'format': { r: false, t: testFormat },
			'tooltips': { r: false, t: testTooltips },
			'cssPrefix': { r: true, t: testCssPrefix },
			'cssClasses': { r: true, t: testCssClasses }
		};

		var defaults = {
			'connect': false,
			'direction': 'ltr',
			'behaviour': 'tap',
			'orientation': 'horizontal',
			'cssPrefix' : 'noUi-',
			'cssClasses': {
				target: 'target',
				base: 'base',
				origin: 'origin',
				handle: 'handle',
				handleLower: 'handle-lower',
				handleUpper: 'handle-upper',
				horizontal: 'horizontal',
				vertical: 'vertical',
				background: 'background',
				connect: 'connect',
				connects: 'connects',
				ltr: 'ltr',
				rtl: 'rtl',
				draggable: 'draggable',
				drag: 'state-drag',
				tap: 'state-tap',
				active: 'active',
				tooltip: 'tooltip',
				pips: 'pips',
				pipsHorizontal: 'pips-horizontal',
				pipsVertical: 'pips-vertical',
				marker: 'marker',
				markerHorizontal: 'marker-horizontal',
				markerVertical: 'marker-vertical',
				markerNormal: 'marker-normal',
				markerLarge: 'marker-large',
				markerSub: 'marker-sub',
				value: 'value',
				valueHorizontal: 'value-horizontal',
				valueVertical: 'value-vertical',
				valueNormal: 'value-normal',
				valueLarge: 'value-large',
				valueSub: 'value-sub'
			}
		};

		// AriaFormat defaults to regular format, if any.
		if ( options.format && !options.ariaFormat ) {
			options.ariaFormat = options.format;
		}

		// Run all options through a testing mechanism to ensure correct
		// input. It should be noted that options might get modified to
		// be handled properly. E.g. wrapping integers in arrays.
		Object.keys(tests).forEach(function( name ){

			// If the option isn't set, but it is required, throw an error.
			if ( !isSet(options[name]) && defaults[name] === undefined ) {

				if ( tests[name].r ) {
					throw new Error("noUiSlider (" + VERSION + "): '" + name + "' is required.");
				}

				return true;
			}

			tests[name].t( parsed, !isSet(options[name]) ? defaults[name] : options[name] );
		});

		// Forward pips options
		parsed.pips = options.pips;

		// All recent browsers accept unprefixed transform.
		// We need -ms- for IE9 and -webkit- for older Android;
		// Assume use of -webkit- if unprefixed and -ms- are not supported.
		// https://caniuse.com/#feat=transforms2d
		var d = document.createElement("div");
		var msPrefix = d.style.msTransform !== undefined;
		var noPrefix = d.style.transform !== undefined;

		parsed.transformRule = noPrefix ? 'transform' : (msPrefix ? 'msTransform' : 'webkitTransform');

		// Pips don't move, so we can place them using left/top.
		var styles = [['left', 'top'], ['right', 'bottom']];

		parsed.style = styles[parsed.dir][parsed.ort];

		return parsed;
	}


function scope ( target, options, originalOptions ){

	var actions = getActions();
	var supportsTouchActionNone = getSupportsTouchActionNone();
	var supportsPassive = supportsTouchActionNone && getSupportsPassive();

	// All variables local to 'scope' are prefixed with 'scope_'
	var scope_Target = target;
	var scope_Locations = [];
	var scope_Base;
	var scope_Handles;
	var scope_HandleNumbers = [];
	var scope_ActiveHandlesCount = 0;
	var scope_Connects;
	var scope_Spectrum = options.spectrum;
	var scope_Values = [];
	var scope_Events = {};
	var scope_Self;
	var scope_Pips;
	var scope_Document = target.ownerDocument;
	var scope_DocumentElement = scope_Document.documentElement;
	var scope_Body = scope_Document.body;


	// For horizontal sliders in standard ltr documents,
	// make .noUi-origin overflow to the left so the document doesn't scroll.
	var scope_DirOffset = (scope_Document.dir === 'rtl') || (options.ort === 1) ? 0 : 100;

/*! In this file: Construction of DOM elements; */

	// Creates a node, adds it to target, returns the new node.
	function addNodeTo ( addTarget, className ) {

		var div = scope_Document.createElement('div');

		if ( className ) {
			addClass(div, className);
		}

		addTarget.appendChild(div);

		return div;
	}

	// Append a origin to the base
	function addOrigin ( base, handleNumber ) {

		var origin = addNodeTo(base, options.cssClasses.origin);
		var handle = addNodeTo(origin, options.cssClasses.handle);

		handle.setAttribute('data-handle', handleNumber);

		// https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
		// 0 = focusable and reachable
		handle.setAttribute('tabindex', '0');
		handle.setAttribute('role', 'slider');
		handle.setAttribute('aria-orientation', options.ort ? 'vertical' : 'horizontal');

		if ( handleNumber === 0 ) {
			addClass(handle, options.cssClasses.handleLower);
		}

		else if ( handleNumber === options.handles - 1 ) {
			addClass(handle, options.cssClasses.handleUpper);
		}

		return origin;
	}

	// Insert nodes for connect elements
	function addConnect ( base, add ) {

		if ( !add ) {
			return false;
		}

		return addNodeTo(base, options.cssClasses.connect);
	}

	// Add handles to the slider base.
	function addElements ( connectOptions, base ) {

		var connectBase = addNodeTo(base, options.cssClasses.connects);

		scope_Handles = [];
		scope_Connects = [];

		scope_Connects.push(addConnect(connectBase, connectOptions[0]));

		// [::::O====O====O====]
		// connectOptions = [0, 1, 1, 1]

		for ( var i = 0; i < options.handles; i++ ) {
			// Keep a list of all added handles.
			scope_Handles.push(addOrigin(base, i));
			scope_HandleNumbers[i] = i;
			scope_Connects.push(addConnect(connectBase, connectOptions[i + 1]));
		}
	}

	// Initialize a single slider.
	function addSlider ( addTarget ) {

		// Apply classes and data to the target.
		addClass(addTarget, options.cssClasses.target);

		if ( options.dir === 0 ) {
			addClass(addTarget, options.cssClasses.ltr);
		} else {
			addClass(addTarget, options.cssClasses.rtl);
		}

		if ( options.ort === 0 ) {
			addClass(addTarget, options.cssClasses.horizontal);
		} else {
			addClass(addTarget, options.cssClasses.vertical);
		}

		scope_Base = addNodeTo(addTarget, options.cssClasses.base);
	}


	function addTooltip ( handle, handleNumber ) {

		if ( !options.tooltips[handleNumber] ) {
			return false;
		}

		return addNodeTo(handle.firstChild, options.cssClasses.tooltip);
	}

	// The tooltips option is a shorthand for using the 'update' event.
	function tooltips ( ) {

		// Tooltips are added with options.tooltips in original order.
		var tips = scope_Handles.map(addTooltip);

		bindEvent('update', function(values, handleNumber, unencoded) {

			if ( !tips[handleNumber] ) {
				return;
			}

			var formattedValue = values[handleNumber];

			if ( options.tooltips[handleNumber] !== true ) {
				formattedValue = options.tooltips[handleNumber].to(unencoded[handleNumber]);
			}

			tips[handleNumber].innerHTML = formattedValue;
		});
	}


	function aria ( ) {

		bindEvent('update', function ( values, handleNumber, unencoded, tap, positions ) {

			// Update Aria Values for all handles, as a change in one changes min and max values for the next.
			scope_HandleNumbers.forEach(function( index ){

				var handle = scope_Handles[index];

				var min = checkHandlePosition(scope_Locations, index, 0, true, true, true);
				var max = checkHandlePosition(scope_Locations, index, 100, true, true, true);

				var now = positions[index];
				var text = options.ariaFormat.to(unencoded[index]);

				handle.children[0].setAttribute('aria-valuemin', min.toFixed(1));
				handle.children[0].setAttribute('aria-valuemax', max.toFixed(1));
				handle.children[0].setAttribute('aria-valuenow', now.toFixed(1));
				handle.children[0].setAttribute('aria-valuetext', text);
			});
		});
	}


	function getGroup ( mode, values, stepped ) {

		// Use the range.
		if ( mode === 'range' || mode === 'steps' ) {
			return scope_Spectrum.xVal;
		}

		if ( mode === 'count' ) {

			if ( values < 2 ) {
				throw new Error("noUiSlider (" + VERSION + "): 'values' (>= 2) required for mode 'count'.");
			}

			// Divide 0 - 100 in 'count' parts.
			var interval = values - 1;
			var spread = ( 100 / interval );

			values = [];

			// List these parts and have them handled as 'positions'.
			while ( interval-- ) {
				values[ interval ] = ( interval * spread );
			}

			values.push(100);

			mode = 'positions';
		}

		if ( mode === 'positions' ) {

			// Map all percentages to on-range values.
			return values.map(function( value ){
				return scope_Spectrum.fromStepping( stepped ? scope_Spectrum.getStep( value ) : value );
			});
		}

		if ( mode === 'values' ) {

			// If the value must be stepped, it needs to be converted to a percentage first.
			if ( stepped ) {

				return values.map(function( value ){

					// Convert to percentage, apply step, return to value.
					return scope_Spectrum.fromStepping( scope_Spectrum.getStep( scope_Spectrum.toStepping( value ) ) );
				});

			}

			// Otherwise, we can simply use the values.
			return values;
		}
	}

	function generateSpread ( density, mode, group ) {

		function safeIncrement(value, increment) {
			// Avoid floating point variance by dropping the smallest decimal places.
			return (value + increment).toFixed(7) / 1;
		}

		var indexes = {};
		var firstInRange = scope_Spectrum.xVal[0];
		var lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length-1];
		var ignoreFirst = false;
		var ignoreLast = false;
		var prevPct = 0;

		// Create a copy of the group, sort it and filter away all duplicates.
		group = unique(group.slice().sort(function(a, b){ return a - b; }));

		// Make sure the range starts with the first element.
		if ( group[0] !== firstInRange ) {
			group.unshift(firstInRange);
			ignoreFirst = true;
		}

		// Likewise for the last one.
		if ( group[group.length - 1] !== lastInRange ) {
			group.push(lastInRange);
			ignoreLast = true;
		}

		group.forEach(function ( current, index ) {

			// Get the current step and the lower + upper positions.
			var step;
			var i;
			var q;
			var low = current;
			var high = group[index+1];
			var newPct;
			var pctDifference;
			var pctPos;
			var type;
			var steps;
			var realSteps;
			var stepsize;

			// When using 'steps' mode, use the provided steps.
			// Otherwise, we'll step on to the next subrange.
			if ( mode === 'steps' ) {
				step = scope_Spectrum.xNumSteps[ index ];
			}

			// Default to a 'full' step.
			if ( !step ) {
				step = high-low;
			}

			// Low can be 0, so test for false. If high is undefined,
			// we are at the last subrange. Index 0 is already handled.
			if ( low === false || high === undefined ) {
				return;
			}

			// Make sure step isn't 0, which would cause an infinite loop (#654)
			step = Math.max(step, 0.0000001);

			// Find all steps in the subrange.
			for ( i = low; i <= high; i = safeIncrement(i, step) ) {

				// Get the percentage value for the current step,
				// calculate the size for the subrange.
				newPct = scope_Spectrum.toStepping( i );
				pctDifference = newPct - prevPct;

				steps = pctDifference / density;
				realSteps = Math.round(steps);

				// This ratio represents the amount of percentage-space a point indicates.
				// For a density 1 the points/percentage = 1. For density 2, that percentage needs to be re-devided.
				// Round the percentage offset to an even number, then divide by two
				// to spread the offset on both sides of the range.
				stepsize = pctDifference/realSteps;

				// Divide all points evenly, adding the correct number to this subrange.
				// Run up to <= so that 100% gets a point, event if ignoreLast is set.
				for ( q = 1; q <= realSteps; q += 1 ) {

					// The ratio between the rounded value and the actual size might be ~1% off.
					// Correct the percentage offset by the number of points
					// per subrange. density = 1 will result in 100 points on the
					// full range, 2 for 50, 4 for 25, etc.
					pctPos = prevPct + ( q * stepsize );
					indexes[pctPos.toFixed(5)] = ['x', 0];
				}

				// Determine the point type.
				type = (group.indexOf(i) > -1) ? 1 : ( mode === 'steps' ? 2 : 0 );

				// Enforce the 'ignoreFirst' option by overwriting the type for 0.
				if ( !index && ignoreFirst ) {
					type = 0;
				}

				if ( !(i === high && ignoreLast)) {
					// Mark the 'type' of this point. 0 = plain, 1 = real value, 2 = step value.
					indexes[newPct.toFixed(5)] = [i, type];
				}

				// Update the percentage count.
				prevPct = newPct;
			}
		});

		return indexes;
	}

	function addMarking ( spread, filterFunc, formatter ) {

		var element = scope_Document.createElement('div');

		var valueSizeClasses = [
			options.cssClasses.valueNormal,
			options.cssClasses.valueLarge,
			options.cssClasses.valueSub
		];
		var markerSizeClasses = [
			options.cssClasses.markerNormal,
			options.cssClasses.markerLarge,
			options.cssClasses.markerSub
		];
		var valueOrientationClasses = [
			options.cssClasses.valueHorizontal,
			options.cssClasses.valueVertical
		];
		var markerOrientationClasses = [
			options.cssClasses.markerHorizontal,
			options.cssClasses.markerVertical
		];

		addClass(element, options.cssClasses.pips);
		addClass(element, options.ort === 0 ? options.cssClasses.pipsHorizontal : options.cssClasses.pipsVertical);

		function getClasses( type, source ){
			var a = source === options.cssClasses.value;
			var orientationClasses = a ? valueOrientationClasses : markerOrientationClasses;
			var sizeClasses = a ? valueSizeClasses : markerSizeClasses;

			return source + ' ' + orientationClasses[options.ort] + ' ' + sizeClasses[type];
		}

		function addSpread ( offset, values ){

			// Apply the filter function, if it is set.
			values[1] = (values[1] && filterFunc) ? filterFunc(values[0], values[1]) : values[1];

			// Add a marker for every point
			var node = addNodeTo(element, false);
				node.className = getClasses(values[1], options.cssClasses.marker);
				node.style[options.style] = offset + '%';

			// Values are only appended for points marked '1' or '2'.
			if ( values[1] ) {
				node = addNodeTo(element, false);
				node.className = getClasses(values[1], options.cssClasses.value);
				node.setAttribute('data-value', values[0]);
				node.style[options.style] = offset + '%';
				node.innerText = formatter.to(values[0]);
			}
		}

		// Append all points.
		Object.keys(spread).forEach(function(a){
			addSpread(a, spread[a]);
		});

		return element;
	}

	function removePips ( ) {
		if ( scope_Pips ) {
			removeElement(scope_Pips);
			scope_Pips = null;
		}
	}

	function pips ( grid ) {

		// Fix #669
		removePips();

		var mode = grid.mode;
		var density = grid.density || 1;
		var filter = grid.filter || false;
		var values = grid.values || false;
		var stepped = grid.stepped || false;
		var group = getGroup( mode, values, stepped );
		var spread = generateSpread( density, mode, group );
		var format = grid.format || {
			to: Math.round
		};

		scope_Pips = scope_Target.appendChild(addMarking(
			spread,
			filter,
			format
		));

		return scope_Pips;
	}

/*! In this file: Browser events (not slider events like slide, change); */

	// Shorthand for base dimensions.
	function baseSize ( ) {
		var rect = scope_Base.getBoundingClientRect();
		var alt = 'offset' + ['Width', 'Height'][options.ort];
		return options.ort === 0 ? (rect.width||scope_Base[alt]) : (rect.height||scope_Base[alt]);
	}

	// Handler for attaching events trough a proxy.
	function attachEvent ( events, element, callback, data ) {

		// This function can be used to 'filter' events to the slider.
		// element is a node, not a nodeList

		var method = function ( e ){

			e = fixEvent(e, data.pageOffset, data.target || element);

			// fixEvent returns false if this event has a different target
			// when handling (multi-) touch events;
			if ( !e ) {
				return false;
			}

			// doNotReject is passed by all end events to make sure released touches
			// are not rejected, leaving the slider "stuck" to the cursor;
			if ( scope_Target.hasAttribute('disabled') && !data.doNotReject ) {
				return false;
			}

			// Stop if an active 'tap' transition is taking place.
			if ( hasClass(scope_Target, options.cssClasses.tap) && !data.doNotReject ) {
				return false;
			}

			// Ignore right or middle clicks on start #454
			if ( events === actions.start && e.buttons !== undefined && e.buttons > 1 ) {
				return false;
			}

			// Ignore right or middle clicks on start #454
			if ( data.hover && e.buttons ) {
				return false;
			}

			// 'supportsPassive' is only true if a browser also supports touch-action: none in CSS.
			// iOS safari does not, so it doesn't get to benefit from passive scrolling. iOS does support
			// touch-action: manipulation, but that allows panning, which breaks
			// sliders after zooming/on non-responsive pages.
			// See: https://bugs.webkit.org/show_bug.cgi?id=133112
			if ( !supportsPassive ) {
				e.preventDefault();
			}

			e.calcPoint = e.points[ options.ort ];

			// Call the event handler with the event [ and additional data ].
			callback ( e, data );
		};

		var methods = [];

		// Bind a closure on the target for every event type.
		events.split(' ').forEach(function( eventName ){
			element.addEventListener(eventName, method, supportsPassive ? { passive: true } : false);
			methods.push([eventName, method]);
		});

		return methods;
	}

	// Provide a clean event with standardized offset values.
	function fixEvent ( e, pageOffset, eventTarget ) {

		// Filter the event to register the type, which can be
		// touch, mouse or pointer. Offset changes need to be
		// made on an event specific basis.
		var touch = e.type.indexOf('touch') === 0;
		var mouse = e.type.indexOf('mouse') === 0;
		var pointer = e.type.indexOf('pointer') === 0;

		var x;
		var y;

		// IE10 implemented pointer events with a prefix;
		if ( e.type.indexOf('MSPointer') === 0 ) {
			pointer = true;
		}

		// In the event that multitouch is activated, the only thing one handle should be concerned
		// about is the touches that originated on top of it.
		if ( touch ) {

			// Returns true if a touch originated on the target.
			var isTouchOnTarget = function (checkTouch) {
				return checkTouch.target === eventTarget || eventTarget.contains(checkTouch.target);
			};

			// In the case of touchstart events, we need to make sure there is still no more than one
			// touch on the target so we look amongst all touches.
			if (e.type === 'touchstart') {

				var targetTouches = Array.prototype.filter.call(e.touches, isTouchOnTarget);

				// Do not support more than one touch per handle.
				if ( targetTouches.length > 1 ) {
					return false;
				}

				x = targetTouches[0].pageX;
				y = targetTouches[0].pageY;

			} else {

				// In the other cases, find on changedTouches is enough.
				var targetTouch = Array.prototype.find.call(e.changedTouches, isTouchOnTarget);

				// Cancel if the target touch has not moved.
				if ( !targetTouch ) {
					return false;
				}

				x = targetTouch.pageX;
				y = targetTouch.pageY;
			}
		}

		pageOffset = pageOffset || getPageOffset(scope_Document);

		if ( mouse || pointer ) {
			x = e.clientX + pageOffset.x;
			y = e.clientY + pageOffset.y;
		}

		e.pageOffset = pageOffset;
		e.points = [x, y];
		e.cursor = mouse || pointer; // Fix #435

		return e;
	}

	// Translate a coordinate in the document to a percentage on the slider
	function calcPointToPercentage ( calcPoint ) {
		var location = calcPoint - offset(scope_Base, options.ort);
		var proposal = ( location * 100 ) / baseSize();

		// Clamp proposal between 0% and 100%
		// Out-of-bound coordinates may occur when .noUi-base pseudo-elements
		// are used (e.g. contained handles feature)
		proposal = limit(proposal);

		return options.dir ? 100 - proposal : proposal;
	}

	// Find handle closest to a certain percentage on the slider
	function getClosestHandle ( proposal ) {

		var closest = 100;
		var handleNumber = false;

		scope_Handles.forEach(function(handle, index){

			// Disabled handles are ignored
			if ( handle.hasAttribute('disabled') ) {
				return;
			}

			var pos = Math.abs(scope_Locations[index] - proposal);

			if ( pos < closest || (pos === 100 && closest === 100) ) {
				handleNumber = index;
				closest = pos;
			}
		});

		return handleNumber;
	}

	// Fire 'end' when a mouse or pen leaves the document.
	function documentLeave ( event, data ) {
		if ( event.type === "mouseout" && event.target.nodeName === "HTML" && event.relatedTarget === null ){
			eventEnd (event, data);
		}
	}

	// Handle movement on document for handle and range drag.
	function eventMove ( event, data ) {

		// Fix #498
		// Check value of .buttons in 'start' to work around a bug in IE10 mobile (data.buttonsProperty).
		// https://connect.microsoft.com/IE/feedback/details/927005/mobile-ie10-windows-phone-buttons-property-of-pointermove-event-always-zero
		// IE9 has .buttons and .which zero on mousemove.
		// Firefox breaks the spec MDN defines.
		if ( navigator.appVersion.indexOf("MSIE 9") === -1 && event.buttons === 0 && data.buttonsProperty !== 0 ) {
			return eventEnd(event, data);
		}

		// Check if we are moving up or down
		var movement = (options.dir ? -1 : 1) * (event.calcPoint - data.startCalcPoint);

		// Convert the movement into a percentage of the slider width/height
		var proposal = (movement * 100) / data.baseSize;

		moveHandles(movement > 0, proposal, data.locations, data.handleNumbers);
	}

	// Unbind move events on document, call callbacks.
	function eventEnd ( event, data ) {

		// The handle is no longer active, so remove the class.
		if ( data.handle ) {
			removeClass(data.handle, options.cssClasses.active);
			scope_ActiveHandlesCount -= 1;
		}

		// Unbind the move and end events, which are added on 'start'.
		data.listeners.forEach(function( c ) {
			scope_DocumentElement.removeEventListener(c[0], c[1]);
		});

		if ( scope_ActiveHandlesCount === 0 ) {
			// Remove dragging class.
			removeClass(scope_Target, options.cssClasses.drag);
			setZindex();

			// Remove cursor styles and text-selection events bound to the body.
			if ( event.cursor ) {
				scope_Body.style.cursor = '';
				scope_Body.removeEventListener('selectstart', preventDefault);
			}
		}

		data.handleNumbers.forEach(function(handleNumber){
			fireEvent('change', handleNumber);
			fireEvent('set', handleNumber);
			fireEvent('end', handleNumber);
		});
	}

	// Bind move events on document.
	function eventStart ( event, data ) {

		var handle;
		if ( data.handleNumbers.length === 1 ) {

			var handleOrigin = scope_Handles[data.handleNumbers[0]];

			// Ignore 'disabled' handles
			if ( handleOrigin.hasAttribute('disabled') ) {
				return false;
			}

			handle = handleOrigin.children[0];
			scope_ActiveHandlesCount += 1;

			// Mark the handle as 'active' so it can be styled.
			addClass(handle, options.cssClasses.active);
		}

		// A drag should never propagate up to the 'tap' event.
		event.stopPropagation();

		// Record the event listeners.
		var listeners = [];

		// Attach the move and end events.
		var moveEvent = attachEvent(actions.move, scope_DocumentElement, eventMove, {
			// The event target has changed so we need to propagate the original one so that we keep
			// relying on it to extract target touches.
			target: event.target,
			handle: handle,
			listeners: listeners,
			startCalcPoint: event.calcPoint,
			baseSize: baseSize(),
			pageOffset: event.pageOffset,
			handleNumbers: data.handleNumbers,
			buttonsProperty: event.buttons,
			locations: scope_Locations.slice()
		});

		var endEvent = attachEvent(actions.end, scope_DocumentElement, eventEnd, {
			target: event.target,
			handle: handle,
			listeners: listeners,
			doNotReject: true,
			handleNumbers: data.handleNumbers
		});

		var outEvent = attachEvent("mouseout", scope_DocumentElement, documentLeave, {
			target: event.target,
			handle: handle,
			listeners: listeners,
			doNotReject: true,
			handleNumbers: data.handleNumbers
		});

		// We want to make sure we pushed the listeners in the listener list rather than creating
		// a new one as it has already been passed to the event handlers.
		listeners.push.apply(listeners, moveEvent.concat(endEvent, outEvent));

		// Text selection isn't an issue on touch devices,
		// so adding cursor styles can be skipped.
		if ( event.cursor ) {

			// Prevent the 'I' cursor and extend the range-drag cursor.
			scope_Body.style.cursor = getComputedStyle(event.target).cursor;

			// Mark the target with a dragging state.
			if ( scope_Handles.length > 1 ) {
				addClass(scope_Target, options.cssClasses.drag);
			}

			// Prevent text selection when dragging the handles.
			// In noUiSlider <= 9.2.0, this was handled by calling preventDefault on mouse/touch start/move,
			// which is scroll blocking. The selectstart event is supported by FireFox starting from version 52,
			// meaning the only holdout is iOS Safari. This doesn't matter: text selection isn't triggered there.
			// The 'cursor' flag is false.
			// See: http://caniuse.com/#search=selectstart
			scope_Body.addEventListener('selectstart', preventDefault, false);
		}

		data.handleNumbers.forEach(function(handleNumber){
			fireEvent('start', handleNumber);
		});
	}

	// Move closest handle to tapped location.
	function eventTap ( event ) {

		// The tap event shouldn't propagate up
		event.stopPropagation();

		var proposal = calcPointToPercentage(event.calcPoint);
		var handleNumber = getClosestHandle(proposal);

		// Tackle the case that all handles are 'disabled'.
		if ( handleNumber === false ) {
			return false;
		}

		// Flag the slider as it is now in a transitional state.
		// Transition takes a configurable amount of ms (default 300). Re-enable the slider after that.
		if ( !options.events.snap ) {
			addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
		}

		setHandle(handleNumber, proposal, true, true);

		setZindex();

		fireEvent('slide', handleNumber, true);
		fireEvent('update', handleNumber, true);
		fireEvent('change', handleNumber, true);
		fireEvent('set', handleNumber, true);

		if ( options.events.snap ) {
			eventStart(event, { handleNumbers: [handleNumber] });
		}
	}

	// Fires a 'hover' event for a hovered mouse/pen position.
	function eventHover ( event ) {

		var proposal = calcPointToPercentage(event.calcPoint);

		var to = scope_Spectrum.getStep(proposal);
		var value = scope_Spectrum.fromStepping(to);

		Object.keys(scope_Events).forEach(function( targetEvent ) {
			if ( 'hover' === targetEvent.split('.')[0] ) {
				scope_Events[targetEvent].forEach(function( callback ) {
					callback.call( scope_Self, value );
				});
			}
		});
	}

	// Attach events to several slider parts.
	function bindSliderEvents ( behaviour ) {

		// Attach the standard drag event to the handles.
		if ( !behaviour.fixed ) {

			scope_Handles.forEach(function( handle, index ){

				// These events are only bound to the visual handle
				// element, not the 'real' origin element.
				attachEvent ( actions.start, handle.children[0], eventStart, {
					handleNumbers: [index]
				});
			});
		}

		// Attach the tap event to the slider base.
		if ( behaviour.tap ) {
			attachEvent (actions.start, scope_Base, eventTap, {});
		}

		// Fire hover events
		if ( behaviour.hover ) {
			attachEvent (actions.move, scope_Base, eventHover, { hover: true });
		}

		// Make the range draggable.
		if ( behaviour.drag ){

			scope_Connects.forEach(function( connect, index ){

				if ( connect === false || index === 0 || index === scope_Connects.length - 1 ) {
					return;
				}

				var handleBefore = scope_Handles[index - 1];
				var handleAfter = scope_Handles[index];
				var eventHolders = [connect];

				addClass(connect, options.cssClasses.draggable);

				// When the range is fixed, the entire range can
				// be dragged by the handles. The handle in the first
				// origin will propagate the start event upward,
				// but it needs to be bound manually on the other.
				if ( behaviour.fixed ) {
					eventHolders.push(handleBefore.children[0]);
					eventHolders.push(handleAfter.children[0]);
				}

				eventHolders.forEach(function( eventHolder ) {
					attachEvent ( actions.start, eventHolder, eventStart, {
						handles: [handleBefore, handleAfter],
						handleNumbers: [index - 1, index]
					});
				});
			});
		}
	}

/*! In this file: Slider events (not browser events); */

	// Attach an event to this slider, possibly including a namespace
	function bindEvent ( namespacedEvent, callback ) {
		scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
		scope_Events[namespacedEvent].push(callback);

		// If the event bound is 'update,' fire it immediately for all handles.
		if ( namespacedEvent.split('.')[0] === 'update' ) {
			scope_Handles.forEach(function(a, index){
				fireEvent('update', index);
			});
		}
	}

	// Undo attachment of event
	function removeEvent ( namespacedEvent ) {

		var event = namespacedEvent && namespacedEvent.split('.')[0];
		var namespace = event && namespacedEvent.substring(event.length);

		Object.keys(scope_Events).forEach(function( bind ){

			var tEvent = bind.split('.')[0];
			var tNamespace = bind.substring(tEvent.length);

			if ( (!event || event === tEvent) && (!namespace || namespace === tNamespace) ) {
				delete scope_Events[bind];
			}
		});
	}

	// External event handling
	function fireEvent ( eventName, handleNumber, tap ) {

		Object.keys(scope_Events).forEach(function( targetEvent ) {

			var eventType = targetEvent.split('.')[0];

			if ( eventName === eventType ) {
				scope_Events[targetEvent].forEach(function( callback ) {

					callback.call(
						// Use the slider public API as the scope ('this')
						scope_Self,
						// Return values as array, so arg_1[arg_2] is always valid.
						scope_Values.map(options.format.to),
						// Handle index, 0 or 1
						handleNumber,
						// Unformatted slider values
						scope_Values.slice(),
						// Event is fired by tap, true or false
						tap || false,
						// Left offset of the handle, in relation to the slider
						scope_Locations.slice()
					);
				});
			}
		});
	}

/*! In this file: Mechanics for slider operation */

	function toPct ( pct ) {
		return pct + '%';
	}

	// Split out the handle positioning logic so the Move event can use it, too
	function checkHandlePosition ( reference, handleNumber, to, lookBackward, lookForward, getValue ) {

		// For sliders with multiple handles, limit movement to the other handle.
		// Apply the margin option by adding it to the handle positions.
		if ( scope_Handles.length > 1 ) {

			if ( lookBackward && handleNumber > 0 ) {
				to = Math.max(to, reference[handleNumber - 1] + options.margin);
			}

			if ( lookForward && handleNumber < scope_Handles.length - 1 ) {
				to = Math.min(to, reference[handleNumber + 1] - options.margin);
			}
		}

		// The limit option has the opposite effect, limiting handles to a
		// maximum distance from another. Limit must be > 0, as otherwise
		// handles would be unmoveable.
		if ( scope_Handles.length > 1 && options.limit ) {

			if ( lookBackward && handleNumber > 0 ) {
				to = Math.min(to, reference[handleNumber - 1] + options.limit);
			}

			if ( lookForward && handleNumber < scope_Handles.length - 1 ) {
				to = Math.max(to, reference[handleNumber + 1] - options.limit);
			}
		}

		// The padding option keeps the handles a certain distance from the
		// edges of the slider. Padding must be > 0.
		if ( options.padding ) {

			if ( handleNumber === 0 ) {
				to = Math.max(to, options.padding[0]);
			}

			if ( handleNumber === scope_Handles.length - 1 ) {
				to = Math.min(to, 100 - options.padding[1]);
			}
		}

		to = scope_Spectrum.getStep(to);

		// Limit percentage to the 0 - 100 range
		to = limit(to);

		// Return false if handle can't move
		if ( to === reference[handleNumber] && !getValue ) {
			return false;
		}

		return to;
	}

	// Uses slider orientation to create CSS rules. a = base value;
	function inRuleOrder ( v, a ) {
		var o = options.ort;
		return (o?a:v) + ', ' + (o?v:a);
	}

	// Moves handle(s) by a percentage
	// (bool, % to move, [% where handle started, ...], [index in scope_Handles, ...])
	function moveHandles ( upward, proposal, locations, handleNumbers ) {

		var proposals = locations.slice();

		var b = [!upward, upward];
		var f = [upward, !upward];

		// Copy handleNumbers so we don't change the dataset
		handleNumbers = handleNumbers.slice();

		// Check to see which handle is 'leading'.
		// If that one can't move the second can't either.
		if ( upward ) {
			handleNumbers.reverse();
		}

		// Step 1: get the maximum percentage that any of the handles can move
		if ( handleNumbers.length > 1 ) {

			handleNumbers.forEach(function(handleNumber, o) {

				var to = checkHandlePosition(proposals, handleNumber, proposals[handleNumber] + proposal, b[o], f[o], false);

				// Stop if one of the handles can't move.
				if ( to === false ) {
					proposal = 0;
				} else {
					proposal = to - proposals[handleNumber];
					proposals[handleNumber] = to;
				}
			});
		}

		// If using one handle, check backward AND forward
		else {
			b = f = [true];
		}

		var state = false;

		// Step 2: Try to set the handles with the found percentage
		handleNumbers.forEach(function(handleNumber, o) {
			state = setHandle(handleNumber, locations[handleNumber] + proposal, b[o], f[o]) || state;
		});

		// Step 3: If a handle moved, fire events
		if ( state ) {
			handleNumbers.forEach(function(handleNumber){
				fireEvent('update', handleNumber);
				fireEvent('slide', handleNumber);
			});
		}
	}

	// Takes a base value and an offset. This offset is used for the connect bar size.
	// In the initial design for this feature, the origin element was 1% wide.
	// Unfortunately, a rounding bug in Chrome makes it impossible to implement this feature
	// in this manner: https://bugs.chromium.org/p/chromium/issues/detail?id=798223
	function transformDirection ( a, b ) {
		return options.dir ? 100 - a - b : a;
	}

	// Updates scope_Locations and scope_Values, updates visual state
	function updateHandlePosition ( handleNumber, to ) {

		// Update locations.
		scope_Locations[handleNumber] = to;

		// Convert the value to the slider stepping/range.
		scope_Values[handleNumber] = scope_Spectrum.fromStepping(to);

		var rule = 'translate(' + inRuleOrder(toPct(transformDirection(to, 0) - scope_DirOffset), '0') + ')';
		scope_Handles[handleNumber].style[options.transformRule] = rule;

		updateConnect(handleNumber);
		updateConnect(handleNumber + 1);
	}

	// Handles before the slider middle are stacked later = higher,
	// Handles after the middle later is lower
	// [[7] [8] .......... | .......... [5] [4]
	function setZindex ( ) {

		scope_HandleNumbers.forEach(function(handleNumber){
			var dir = (scope_Locations[handleNumber] > 50 ? -1 : 1);
			var zIndex = 3 + (scope_Handles.length + (dir * handleNumber));
			scope_Handles[handleNumber].style.zIndex = zIndex;
		});
	}

	// Test suggested values and apply margin, step.
	function setHandle ( handleNumber, to, lookBackward, lookForward ) {

		to = checkHandlePosition(scope_Locations, handleNumber, to, lookBackward, lookForward, false);

		if ( to === false ) {
			return false;
		}

		updateHandlePosition(handleNumber, to);

		return true;
	}

	// Updates style attribute for connect nodes
	function updateConnect ( index ) {

		// Skip connects set to false
		if ( !scope_Connects[index] ) {
			return;
		}

		var l = 0;
		var h = 100;

		if ( index !== 0 ) {
			l = scope_Locations[index - 1];
		}

		if ( index !== scope_Connects.length - 1 ) {
			h = scope_Locations[index];
		}

		// We use two rules:
		// 'translate' to change the left/top offset;
		// 'scale' to change the width of the element;
		// As the element has a width of 100%, a translation of 100% is equal to 100% of the parent (.noUi-base)
		var connectWidth = h - l;
		var translateRule = 'translate(' + inRuleOrder(toPct(transformDirection(l, connectWidth)), '0') + ')';
		var scaleRule = 'scale(' + inRuleOrder(connectWidth / 100, '1') + ')';

		scope_Connects[index].style[options.transformRule] = translateRule + ' ' + scaleRule;
	}

/*! In this file: All methods eventually exposed in slider.noUiSlider... */

	// Parses value passed to .set method. Returns current value if not parse-able.
	function resolveToValue ( to, handleNumber ) {

		// Setting with null indicates an 'ignore'.
		// Inputting 'false' is invalid.
		if ( to === null || to === false || to === undefined ) {
			return scope_Locations[handleNumber];
		}

		// If a formatted number was passed, attempt to decode it.
		if ( typeof to === 'number' ) {
			to = String(to);
		}

		to = options.format.from(to);
		to = scope_Spectrum.toStepping(to);

		// If parsing the number failed, use the current value.
		if ( to === false || isNaN(to) ) {
			return scope_Locations[handleNumber];
		}

		return to;
	}

	// Set the slider value.
	function valueSet ( input, fireSetEvent ) {

		var values = asArray(input);
		var isInit = scope_Locations[0] === undefined;

		// Event fires by default
		fireSetEvent = (fireSetEvent === undefined ? true : !!fireSetEvent);

		// Animation is optional.
		// Make sure the initial values were set before using animated placement.
		if ( options.animate && !isInit ) {
			addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
		}

		// First pass, without lookAhead but with lookBackward. Values are set from left to right.
		scope_HandleNumbers.forEach(function(handleNumber){
			setHandle(handleNumber, resolveToValue(values[handleNumber], handleNumber), true, false);
		});

		// Second pass. Now that all base values are set, apply constraints
		scope_HandleNumbers.forEach(function(handleNumber){
			setHandle(handleNumber, scope_Locations[handleNumber], true, true);
		});

		setZindex();

		scope_HandleNumbers.forEach(function(handleNumber){

			fireEvent('update', handleNumber);

			// Fire the event only for handles that received a new value, as per #579
			if ( values[handleNumber] !== null && fireSetEvent ) {
				fireEvent('set', handleNumber);
			}
		});
	}

	// Reset slider to initial values
	function valueReset ( fireSetEvent ) {
		valueSet(options.start, fireSetEvent);
	}

	// Get the slider value.
	function valueGet ( ) {

		var values = scope_Values.map(options.format.to);

		// If only one handle is used, return a single value.
		if ( values.length === 1 ){
			return values[0];
		}

		return values;
	}

	// Removes classes from the root and empties it.
	function destroy ( ) {

		for ( var key in options.cssClasses ) {
			if ( !options.cssClasses.hasOwnProperty(key) ) { continue; }
			removeClass(scope_Target, options.cssClasses[key]);
		}

		while (scope_Target.firstChild) {
			scope_Target.removeChild(scope_Target.firstChild);
		}

		delete scope_Target.noUiSlider;
	}

	// Get the current step size for the slider.
	function getCurrentStep ( ) {

		// Check all locations, map them to their stepping point.
		// Get the step point, then find it in the input list.
		return scope_Locations.map(function( location, index ){

			var nearbySteps = scope_Spectrum.getNearbySteps( location );
			var value = scope_Values[index];
			var increment = nearbySteps.thisStep.step;
			var decrement = null;

			// If the next value in this step moves into the next step,
			// the increment is the start of the next step - the current value
			if ( increment !== false ) {
				if ( value + increment > nearbySteps.stepAfter.startValue ) {
					increment = nearbySteps.stepAfter.startValue - value;
				}
			}


			// If the value is beyond the starting point
			if ( value > nearbySteps.thisStep.startValue ) {
				decrement = nearbySteps.thisStep.step;
			}

			else if ( nearbySteps.stepBefore.step === false ) {
				decrement = false;
			}

			// If a handle is at the start of a step, it always steps back into the previous step first
			else {
				decrement = value - nearbySteps.stepBefore.highestStep;
			}


			// Now, if at the slider edges, there is not in/decrement
			if ( location === 100 ) {
				increment = null;
			}

			else if ( location === 0 ) {
				decrement = null;
			}

			// As per #391, the comparison for the decrement step can have some rounding issues.
			var stepDecimals = scope_Spectrum.countStepDecimals();

			// Round per #391
			if ( increment !== null && increment !== false ) {
				increment = Number(increment.toFixed(stepDecimals));
			}

			if ( decrement !== null && decrement !== false ) {
				decrement = Number(decrement.toFixed(stepDecimals));
			}

			return [decrement, increment];
		});
	}

	// Updateable: margin, limit, padding, step, range, animate, snap
	function updateOptions ( optionsToUpdate, fireSetEvent ) {

		// Spectrum is created using the range, snap, direction and step options.
		// 'snap' and 'step' can be updated.
		// If 'snap' and 'step' are not passed, they should remain unchanged.
		var v = valueGet();

		var updateAble = ['margin', 'limit', 'padding', 'range', 'animate', 'snap', 'step', 'format'];

		// Only change options that we're actually passed to update.
		updateAble.forEach(function(name){
			if ( optionsToUpdate[name] !== undefined ) {
				originalOptions[name] = optionsToUpdate[name];
			}
		});

		var newOptions = testOptions(originalOptions);

		// Load new options into the slider state
		updateAble.forEach(function(name){
			if ( optionsToUpdate[name] !== undefined ) {
				options[name] = newOptions[name];
			}
		});

		scope_Spectrum = newOptions.spectrum;

		// Limit, margin and padding depend on the spectrum but are stored outside of it. (#677)
		options.margin = newOptions.margin;
		options.limit = newOptions.limit;
		options.padding = newOptions.padding;

		// Update pips, removes existing.
		if ( options.pips ) {
			pips(options.pips);
		}

		// Invalidate the current positioning so valueSet forces an update.
		scope_Locations = [];
		valueSet(optionsToUpdate.start || v, fireSetEvent);
	}

/*! In this file: Calls to functions. All other scope_ files define functions only; */

	// Create the base element, initialize HTML and set classes.
	// Add handles and connect elements.
	addSlider(scope_Target);
	addElements(options.connect, scope_Base);

	// Attach user events.
	bindSliderEvents(options.events);

	// Use the public value method to set the start values.
	valueSet(options.start);

	scope_Self = {
		destroy: destroy,
		steps: getCurrentStep,
		on: bindEvent,
		off: removeEvent,
		get: valueGet,
		set: valueSet,
		reset: valueReset,
		// Exposed for unit testing, don't use this in your application.
		__moveHandles: function(a, b, c) { moveHandles(a, b, scope_Locations, c); },
		options: originalOptions, // Issue #600, #678
		updateOptions: updateOptions,
		target: scope_Target, // Issue #597
		removePips: removePips,
		pips: pips // Issue #594
	};

	if ( options.pips ) {
		pips(options.pips);
	}

	if ( options.tooltips ) {
		tooltips();
	}

	aria();

	return scope_Self;

}


	// Run the standard initializer
	function initialize ( target, originalOptions ) {

		if ( !target || !target.nodeName ) {
			throw new Error("noUiSlider (" + VERSION + "): create requires a single element, got: " + target);
		}

		// Throw an error if the slider was already initialized.
		if ( target.noUiSlider ) {
			throw new Error("noUiSlider (" + VERSION + "): Slider was already initialized.");
		}

		// Test the options and create the slider environment;
		var options = testOptions( originalOptions, target );
		var api = scope( target, options, originalOptions );

		target.noUiSlider = api;

		return api;
	}

	// Use an object instead of a function for future expandability;
	return {
		version: VERSION,
		create: initialize
	};

}));
},{}],4:[function(require,module,exports){

var fields = {
	
	functions: {}
	
};

module.exports = fields;
},{}],5:[function(require,module,exports){

//var state = require('./includes/state');

var pagination = {
	
	setupLegacy: function(){
		
		
	},
	
	setupLegacy: function(){
		
		/*if(typeof(self.ajax_links_selector)!="undefined")
		{
			var $ajax_links_object = jQuery(self.ajax_links_selector);
			
			if($ajax_links_object.length>0)
			{
				$ajax_links_object.on('click', function(e) {
					
					e.preventDefault();
					
					var link = jQuery(this).attr('href');
					self.ajax_action = "pagination";
					
					self.fetchLegacyAjaxResults(link);
					return false;
				});
			}
		}*/
	}
};

module.exports = pagination;
},{}],6:[function(require,module,exports){
(function (global){

var $ 				= (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);
var state 			= require('./state');
var process_form 	= require('./process_form');
var noUiSlider		= require('nouislider');
var cookies         = require('js-cookie');

module.exports = function(options)
{
    var defaults = {
        startOpened: false,
        isInit: true,
        action: ""
    };

    var opts = jQuery.extend(defaults, options);

    //loop through each item matched
    this.each(function()
    {

        var $this = $(this);
        var self = this;
        this.sfid = $this.attr("data-sf-form-id");

        state.addSearchForm(this.sfid, this);

        this.$fields = $this.find("> ul > li"); //a reference to each fields parent LI

        this.enable_taxonomy_archives = $this.attr('data-taxonomy-archives');
        this.current_taxonomy_archive = $this.attr('data-current-taxonomy-archive');

        if(typeof(this.enable_taxonomy_archives)=="undefined")
        {
            this.enable_taxonomy_archives = "0";
        }
        if(typeof(this.current_taxonomy_archive)=="undefined")
        {
            this.current_taxonomy_archive = "";
        }

        process_form.init(self.enable_taxonomy_archives, self.current_taxonomy_archive);
        //process_form.setTaxArchiveResultsUrl(self);
        process_form.enableInputs(self);

        if(typeof(this.extra_query_params)=="undefined")
        {
            this.extra_query_params = {all: {}, results: {}, ajax: {}};
        }


        this.template_is_loaded = $this.attr("data-template-loaded");
        this.is_ajax = $this.attr("data-ajax");
        this.instance_number = $this.attr('data-instance-count');
        this.$ajax_results_container = jQuery($this.attr("data-ajax-target"));

        this.results_url = $this.attr("data-results-url");
        this.debug_mode = $this.attr("data-debug-mode");
        this.update_ajax_url = $this.attr("data-update-ajax-url");
        this.pagination_type = $this.attr("data-ajax-pagination-type");
        this.auto_count = $this.attr("data-auto-count");
        this.auto_count_refresh_mode = $this.attr("data-auto-count-refresh-mode");
        this.only_results_ajax = $this.attr("data-only-results-ajax"); //if we are not on the results page, redirect rather than try to load via ajax
        this.scroll_to_pos = $this.attr("data-scroll-to-pos");
        this.custom_scroll_to = $this.attr("data-custom-scroll-to");
        this.scroll_on_action = $this.attr("data-scroll-on-action");
        this.lang_code = $this.attr("data-lang-code");
        this.ajax_url = $this.attr('data-ajax-url');
        this.ajax_form_url = $this.attr('data-ajax-form-url');
        this.is_rtl = $this.attr('data-is-rtl');

        this.display_result_method = $this.attr('data-display-result-method');
        this.maintain_state = $this.attr('data-maintain-state');
        this.ajax_action = "";
        this.last_submit_query_params = "";

        this.current_paged = parseInt($this.attr('data-init-paged'));
        this.last_load_more_html = "";
        this.load_more_html = "";
        this.ajax_data_type = $this.attr('data-ajax-data-type');
        this.ajax_target_attr = $this.attr("data-ajax-target");
        this.use_history_api = $this.attr("data-use-history-api");
        this.is_submitting = false;

        this.last_ajax_request = null;

        if(typeof(this.use_history_api)=="undefined")
        {
            this.use_history_api = "";
        }

        if(typeof(this.pagination_type)=="undefined")
        {
            this.pagination_type = "normal";
        }
        if(typeof(this.current_paged)=="undefined")
        {
            this.current_paged = 1;
        }

        if(typeof(this.ajax_target_attr)=="undefined")
        {
            this.ajax_target_attr = "";
        }

        if(typeof(this.ajax_url)=="undefined")
        {
            this.ajax_url = "";
        }

        if(typeof(this.ajax_form_url)=="undefined")
        {
            this.ajax_form_url = "";
        }

        if(typeof(this.results_url)=="undefined")
        {
            this.results_url = "";
        }

        if(typeof(this.scroll_to_pos)=="undefined")
        {
            this.scroll_to_pos = "";
        }

        if(typeof(this.scroll_on_action)=="undefined")
        {
            this.scroll_on_action = "";
        }
        if(typeof(this.custom_scroll_to)=="undefined")
        {
            this.custom_scroll_to = "";
        }
        this.$custom_scroll_to = jQuery(this.custom_scroll_to);

        if(typeof(this.update_ajax_url)=="undefined")
        {
            this.update_ajax_url = "";
        }

        if(typeof(this.debug_mode)=="undefined")
        {
            this.debug_mode = "";
        }

        if(typeof(this.ajax_target_object)=="undefined")
        {
            this.ajax_target_object = "";
        }

        if(typeof(this.template_is_loaded)=="undefined")
        {
            this.template_is_loaded = "0";
        }

        if(typeof(this.auto_count_refresh_mode)=="undefined")
        {
            this.auto_count_refresh_mode = "0";
        }

        this.ajax_links_selector = $this.attr("data-ajax-links-selector");


        this.auto_update = $this.attr("data-auto-update");
        this.inputTimer = 0;

        this.setInfiniteScrollContainer = function()
        {

            this.is_max_paged = false; //for load more only, once we detect we're at the end set this to true
            this.use_scroll_loader = $this.attr('data-show-scroll-loader'); //for load more only, once we detect we're at the end set this to true
            this.infinite_scroll_container = $this.attr('data-infinite-scroll-container'); //for load more only, once we detect we're at the end set this to true
            this.infinite_scroll_trigger_amount = $this.attr('data-infinite-scroll-trigger');
            this.infinite_scroll_result_class = $this.attr('data-infinite-scroll-result-class');
            this.$infinite_scroll_container = this.$ajax_results_container;

            if(typeof(this.infinite_scroll_container)=="undefined")
            {
                this.infinite_scroll_container = "";
            }
            else
            {
                this.$infinite_scroll_container = jQuery($this.attr('data-infinite-scroll-container'));
            }

            if(typeof(this.infinite_scroll_result_class)=="undefined")
            {
                this.infinite_scroll_result_class = "";
            }

            if(typeof(this.use_scroll_loader)=="undefined")
            {
                this.use_scroll_loader = 1;
            }

        };
        this.setInfiniteScrollContainer();

        /* functions */

        this.reset = function(submit_form)
        {

            this.resetForm(submit_form);
            return true;
        }

        this.inputUpdate = function(delayDuration)
        {
            if(typeof(delayDuration)=="undefined")
            {
                var delayDuration = 300;
            }

            self.resetTimer(delayDuration);
        }

        this.dateInputType = function()
        {
            var $thise = $(this);

            if((self.auto_update==1)||(self.auto_count_refresh_mode==1))
            {
                var $tf_date_pickers = $this.find(".sf-datepicker");
                var no_date_pickers = $tf_date_pickers.length;

                if(no_date_pickers>1)
                {
                    //then it is a date range, so make sure both fields are filled before updating
                    var dp_counter = 0;
                    var dp_empty_field_count = 0;
                    $tf_date_pickers.each(function() {

                        if($(this).val()=="")
                        {
                            dp_empty_field_count++;
                        }

                        dp_counter++;
                    });

                    if(dp_empty_field_count==0) {
                        self.inputUpdate(1200);
                    }
                }
                else {
                    self.inputUpdate(1200);
                }
            }
        }


        this.scrollToPos = function() {
            var offset = 0;
            var canScroll = true;

            if(self.is_ajax==1)
            {
                if(self.scroll_to_pos=="window")
                {
                    offset = 0;

                }
                else if(self.scroll_to_pos=="form")
                {
                    offset = $this.offset().top;
                }
                else if(self.scroll_to_pos=="results")
                {
                    if(self.$ajax_results_container.length>0)
                    {
                        offset = self.$ajax_results_container.offset().top;
                    }
                }
                else if(self.scroll_to_pos=="custom")
                {
                    //custom_scroll_to
                    if(self.$custom_scroll_to.length>0)
                    {
                        offset = self.$custom_scroll_to.offset().top;
                    }
                }
                else
                {
                    canScroll = false;
                }

                if(canScroll)
                {
                    $("html, body").stop().animate({
                        scrollTop: offset
                    }, "normal", "easeOutQuad" );
                }
            }

        };

        this.attachActiveClass = function(){

            //check to see if we are using ajax & auto count
            //if not, the search form does not get reloaded, so we need to update the sf-option-active class on all fields

            $this.on('change', 'input[type="radio"], input[type="checkbox"], select', function(e)
            {
                var $cthis = $(this);
                var $cthis_parent = $cthis.parent();
                var this_tag = $cthis.prop("tagName").toLowerCase();
                var input_type = $cthis.attr("type");
                var parent_tag = $cthis_parent.prop("tagName").toLowerCase();

                if((this_tag=="input")&&((input_type=="radio")||(input_type=="checkbox")) && (parent_tag=="li"))
                {
                    var $all_options = $cthis_parent.parent().find('li');
                    var $all_options_fields = $cthis_parent.parent().find('input:checked');

                    $all_options.removeClass("sf-option-active");
                    $all_options_fields.each(function(){

                        var $parent = $(this).closest("li");
                        $parent.addClass("sf-option-active");

                    });

                }
                else if(this_tag=="select")
                {
                    var $all_options = $cthis.children();
                    $all_options.removeClass("sf-option-active");
                    var this_val = $cthis.val();

                    var this_arr_val = (typeof this_val == 'string' || this_val instanceof String) ? [this_val] : this_val;

                    $(this_arr_val).each(function(i, value){
                        $cthis.find("option[value='"+value+"']").addClass("sf-option-active");
                    });


                }
            });

        };
        this.initAutoUpdateEvents = function(){

            /* auto update */
            if((self.auto_update==1)||(self.auto_count_refresh_mode==1))
            {
                $this.on('change', 'input[type="radio"], input[type="checkbox"], select', function(e) {
                    self.inputUpdate(200);
                });

                //$this.on('change', '.meta-slider', function(e) {
                //    self.inputUpdate(200);
                //    console.log("CHANGE META SLIDER");
                //});

                $this.on('input', 'input[type="number"]', function(e) {
                    self.inputUpdate(800);
                });

                var $textInput = $this.find('input[type="text"]:not(.sf-datepicker)');
                var lastValue = $textInput.val();

                $this.on('input', 'input[type="text"]:not(.sf-datepicker)', function()
                {
                    if(lastValue!=$textInput.val())
                    {
                        self.inputUpdate(1200);
                    }

                    lastValue = $textInput.val();
                });


                $this.on('keypress', 'input[type="text"]:not(.sf-datepicker)', function(e)
                {
                    if (e.which == 13){

                        e.preventDefault();
                        self.submitForm();
                        return false;
                    }

                });

                //$this.on('input', 'input.sf-datepicker', self.dateInputType);

            }
        };

        //this.initAutoUpdateEvents();


        this.clearTimer = function()
        {
            clearTimeout(self.inputTimer);
        };
        this.resetTimer = function(delayDuration)
        {
            clearTimeout(self.inputTimer);
            self.inputTimer = setTimeout(self.formUpdated, delayDuration);

        };

        this.addDatePickers = function()
        {
            var $date_picker = $this.find(".sf-datepicker");

            if($date_picker.length>0)
            {
                $date_picker.each(function(){

                    var $this = $(this);
                    var dateFormat = "";
                    var dateDropdownYear = false;
                    var dateDropdownMonth = false;

                    var $closest_date_wrap = $this.closest(".sf_date_field");
                    if($closest_date_wrap.length>0)
                    {
                        dateFormat = $closest_date_wrap.attr("data-date-format");

                        if($closest_date_wrap.attr("data-date-use-year-dropdown")==1)
                        {
                            dateDropdownYear = true;
                        }
                        if($closest_date_wrap.attr("data-date-use-month-dropdown")==1)
                        {
                            dateDropdownMonth = true;
                        }
                    }

                    var datePickerOptions = {
                        inline: true,
                        showOtherMonths: true,
                        onSelect: function(){ self.dateSelect(); },
                        dateFormat: dateFormat,

                        changeMonth: dateDropdownMonth,
                        changeYear: dateDropdownYear
                    };

                    if(self.is_rtl==1)
                    {
                        datePickerOptions.direction = "rtl";
                    }

                    $this.datepicker(datePickerOptions);

                    if(self.lang_code!="")
                    {
                        $.datepicker.setDefaults(
                            $.extend(
                                {'dateFormat':dateFormat},
                                $.datepicker.regional[ self.lang_code]
                            )
                        );

                    }
                    else
                    {
                        $.datepicker.setDefaults(
                            $.extend(
                                {'dateFormat':dateFormat},
                                $.datepicker.regional["en"]
                            )
                        );

                    }

                });

                if($('.ll-skin-melon').length==0)
                {
                    $date_picker.datepicker('widget').wrap('<div class="ll-skin-melon searchandfilter-date-picker"/>');
                }

            }
        };

        this.dateSelect = function()
        {
            var $this = $(this);

            if((self.auto_update==1)||(self.auto_count_refresh_mode==1))
            {
                var $tf_date_pickers = $this.find(".sf-datepicker");
                var no_date_pickers = $tf_date_pickers.length;

                if(no_date_pickers>1)
                {
                    //then it is a date range, so make sure both fields are filled before updating
                    var dp_counter = 0;
                    var dp_empty_field_count = 0;
                    $tf_date_pickers.each(function(){

                        if($(this).val()=="")
                        {
                            dp_empty_field_count++;
                        }

                        dp_counter++;
                    });

                    if(dp_empty_field_count==0)
                    {
                        self.inputUpdate(1);
                    }
                }
                else
                {
                    self.inputUpdate(1);
                }

            }
        };

        this.addRangeSliders = function()
        {
            var $meta_range = $this.find(".sf-meta-range-slider");

            if($meta_range.length>0)
            {
                $meta_range.each(function(){

                    var $this = $(this);
                    var min = $this.attr("data-min");
                    var max = $this.attr("data-max");
                    var smin = $this.attr("data-start-min");
                    var smax = $this.attr("data-start-max");
                    var display_value_as = $this.attr("data-display-values-as");
                    var step = $this.attr("data-step");
                    var $start_val = $this.find('.sf-range-min');
                    var $end_val = $this.find('.sf-range-max');


                    var decimal_places = $this.attr("data-decimal-places");
                    var thousand_seperator = $this.attr("data-thousand-seperator");
                    var decimal_seperator = $this.attr("data-decimal-seperator");

                    var field_format = wNumb({
                        mark: decimal_seperator,
                        decimals: parseFloat(decimal_places),
                        thousand: thousand_seperator
                    });



                    var min_unformatted = parseFloat(smin);
                    var min_formatted = field_format.to(parseFloat(smin));
                    var max_formatted = field_format.to(parseFloat(smax));
                    var max_unformatted = parseFloat(smax);
                    //alert(min_formatted);
                    //alert(max_formatted);
                    //alert(display_value_as);


                    if(display_value_as=="textinput")
                    {
                        $start_val.val(min_formatted);
                        $end_val.val(max_formatted);
                    }
                    else if(display_value_as=="text")
                    {
                        $start_val.html(min_formatted);
                        $end_val.html(max_formatted);
                    }


                    var noUIOptions = {
                        range: {
                            'min': [ parseFloat(min) ],
                            'max': [ parseFloat(max) ]
                        },
                        start: [min_formatted, max_formatted],
                        handles: 2,
                        connect: true,
                        step: parseFloat(step),

                        behaviour: 'extend-tap',
                        format: field_format
                    };



                    if(self.is_rtl==1)
                    {
                        noUIOptions.direction = "rtl";
                    }

                    //$(this).find(".meta-slider").noUiSlider(noUIOptions);

                    var slider_object = $(this).find(".meta-slider")[0];

                    if( "undefined" !== typeof( slider_object.noUiSlider ) ) {
                        //destroy if it exists.. this means somehow another instance had initialised it..
                        slider_object.noUiSlider.destroy();
                        //console.log(typeof(slider_object.noUiSlider));
                    }

                    noUiSlider.create(slider_object, noUIOptions);

                    $start_val.off();
                    $start_val.on('change', function(){
                        slider_object.noUiSlider.set([$(this).val(), null]);
                    });

                    $end_val.off();
                    $end_val.on('change', function(){
                        slider_object.noUiSlider.set([null, $(this).val()]);
                    });

                    //$start_val.html(min_formatted);
                    //$end_val.html(max_formatted);

                    slider_object.noUiSlider.off('update');
                    slider_object.noUiSlider.on('update', function( values, handle ) {

                        var slider_start_val  = min_formatted;
                        var slider_end_val  = max_formatted;

                        var value = values[handle];


                        if ( handle ) {
                            max_formatted = value;
                        } else {
                            min_formatted = value;
                        }

                        if(display_value_as=="textinput")
                        {
                            $start_val.val(min_formatted);
                            $end_val.val(max_formatted);
                        }
                        else if(display_value_as=="text")
                        {
                            $start_val.html(min_formatted);
                            $end_val.html(max_formatted);
                        }


                        //i think the function that builds the URL needs to decode the formatted string before adding to the url
                        if((self.auto_update==1)||(self.auto_count_refresh_mode==1))
                        {
                            //only try to update if the values have actually changed
                            if((slider_start_val!=min_formatted)||(slider_end_val!=max_formatted)) {

                                self.inputUpdate(800);
                            }


                        }

                    });

                });

                self.clearTimer(); //ignore any changes recently made by the slider (this was just init shouldn't count as an update event)
            }
        };

        this.init = function(keep_pagination)
        {
            if(typeof(keep_pagination)=="undefined")
            {
                var keep_pagination = false;
            }

            this.initAutoUpdateEvents();
            this.attachActiveClass();

            this.addDatePickers();
            this.addRangeSliders();

            //init combo boxes
            var $combobox = $this.find("select[data-combobox='1']");

            if($combobox.length>0)
            {
                $combobox.each(function(index ){
                    var $thiscb = $( this );
                    var nrm = $thiscb.attr("data-combobox-nrm");

                    if (typeof $thiscb.chosen != "undefined")
                    {
                        var chosenoptions = {
                            search_contains: true
                        };

                        if((typeof(nrm)!=="undefined")&&(nrm)){
                            chosenoptions.no_results_text = nrm;
                        }
                        // safe to use the function
                        //search_contains
                        if(self.is_rtl==1)
                        {
                            $thiscb.addClass("chosen-rtl");
                        }

                        $thiscb.chosen(chosenoptions);
                    }
                    else
                    {

                        var select2options = {};

                        if(self.is_rtl==1)
                        {
                            select2options.dir = "rtl";
                        }
                        if((typeof(nrm)!=="undefined")&&(nrm)){
                            select2options.language= {
                                "noResults": function(){
                                    return nrm;
                                }
                            };
                        }

                        $thiscb.select2(select2options);
                    }

                });


            }



            //if ajax is enabled init the pagination
            if(self.is_ajax==1)
            {
                self.setupAjaxPagination();
            }

            $this.submit(this.submitForm);

            self.initWooCommerceControls(); //woocommerce orderby

            if(keep_pagination==false)
            {
                self.last_submit_query_params = self.getUrlParams(false);
            }
        }

        this.onWindowScroll = function(event)
        {
            if((!self.is_loading_more) && (!self.is_max_paged))
            {
                var window_scroll = $(window).scrollTop();
                var window_scroll_bottom = $(window).scrollTop() + $(window).height();
                var scroll_offset = parseInt(self.infinite_scroll_trigger_amount);//self.infinite_scroll_trigger_amount;

                //var $ajax_results_container = jQuery($this.attr("data-ajax-target"));

                if(self.$infinite_scroll_container.length==1)
                {
                    var results_scroll_bottom = self.$infinite_scroll_container.offset().top + self.$infinite_scroll_container.height();

                    //var offset = ($ajax_results_container.offset().top + $ajax_results_container.height()) - window_scroll;
                    var offset = (self.$infinite_scroll_container.offset().top + self.$infinite_scroll_container.height()) - window_scroll;

                    if(window_scroll_bottom > results_scroll_bottom + scroll_offset)
                    {
                        self.loadMoreResults();
                    }
                    else
                    {//dont load more

                    }
                }
            }
        }

        /*if(this.debug_mode=="1")
         {//error logging

         if(self.is_ajax==1)
         {
         if(self.display_results_as=="shortcode")
         {
         if(self.$ajax_results_container.length==0)
         {
         console.log("Search & Filter | Form ID: "+self.sfid+": cannot find the results container on this page - ensure you use the shortcode on this page or provide a URL where it can be found (Results URL)");
         }
         if(self.results_url=="")
         {
         console.log("Search & Filter | Form ID: "+self.sfid+": No Results URL has been defined - ensure that you enter this in order to use the Search Form on any page)");
         }
         //check if results URL is on same domain for potential cross domain errors
         }
         else
         {
         if(self.$ajax_results_container.length==0)
         {
         console.log("Search & Filter | Form ID: "+self.sfid+": cannot find the results container on this page - ensure you use are using the right content selector");
         }
         }
         }
         else
         {

         }

         }*/


        this.stripQueryStringAndHashFromPath = function(url) {
            return url.split("?")[0].split("#")[0];
        }

        this.gup = function( name, url ) {
            if (!url) url = location.href
            name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
            var regexS = "[\\?&]"+name+"=([^&#]*)";
            var regex = new RegExp( regexS );
            var results = regex.exec( url );
            return results == null ? null : results[1];
        };


        this.getUrlParams = function(keep_pagination, type, exclude)
        {
            if(typeof(keep_pagination)=="undefined")
            {
                var keep_pagination = true;
            }
            /*if(typeof(exclude)=="undefined")
             {
             var exclude = "";
             }*/

            if(typeof(type)=="undefined")
            {
                var type = "";
            }

            var url_params_str = "";

            // get all params from fields
            var url_params_array = process_form.getUrlParams(self);

            var length = Object.keys(url_params_array).length;
            var count = 0;

            if(typeof(exclude)!="undefined") {
                if (url_params_array.hasOwnProperty(exclude)) {
                    length--;
                }
            }

            if(length>0)
            {
                for (var k in url_params_array) {
                    if (url_params_array.hasOwnProperty(k)) {

                        var can_add = true;
                        if(typeof(exclude)!="undefined")
                        {
                            if(k==exclude) {
                                can_add = false;
                            }
                        }

                        if(can_add) {
                            url_params_str += k + "=" + url_params_array[k];

                            if (count < length - 1) {
                                url_params_str += "&";
                            }

                            count++;
                        }
                    }
                }
            }

            var query_params = "";

            //form params as url query string
            //var form_params = url_params_str.replaceAll("%2B", "+").replaceAll("%2C", ",")
            var form_params = url_params_str;

            //get url params from the form itself (what the user has selected)
            query_params = self.joinUrlParam(query_params, form_params);

            //add pagination
            if(keep_pagination==true)
            {
                var pageNumber = self.$ajax_results_container.attr("data-paged");

                if(typeof(pageNumber)=="undefined")
                {
                    pageNumber = 1;
                }

                if(pageNumber>1)
                {
                    query_params = self.joinUrlParam(query_params, "sf_paged="+pageNumber);
                }
            }

            //add sfid
            //query_params = self.joinUrlParam(query_params, "sfid="+self.sfid);

            // loop through any extra params (from ext plugins) and add to the url (ie woocommerce `orderby`)
            /*var extra_query_param = "";
             var length = Object.keys(self.extra_query_params).length;
             var count = 0;

             if(length>0)
             {

             for (var k in self.extra_query_params) {
             if (self.extra_query_params.hasOwnProperty(k)) {

             if(self.extra_query_params[k]!="")
             {
             extra_query_param = k+"="+self.extra_query_params[k];
             query_params = self.joinUrlParam(query_params, extra_query_param);
             }
             }
             }
             }
             */
            query_params = self.addQueryParams(query_params, self.extra_query_params.all);

            if(type!="")
            {
                //query_params = self.addQueryParams(query_params, self.extra_query_params[type]);
            }

            return query_params;
        }
        this.addQueryParams = function(query_params, new_params)
        {
            var extra_query_param = "";
            var length = Object.keys(new_params).length;
            var count = 0;

            if(length>0)
            {

                for (var k in new_params) {
                    if (new_params.hasOwnProperty(k)) {

                        if(new_params[k]!="")
                        {
                            extra_query_param = k+"="+new_params[k];
                            query_params = self.joinUrlParam(query_params, extra_query_param);
                        }
                    }
                }
            }

            return query_params;
        }
        this.addUrlParam = function(url, string)
        {
            var add_params = "";

            if(url!="")
            {
                if(url.indexOf("?") != -1)
                {
                    add_params += "&";
                }
                else
                {
                    //url = this.trailingSlashIt(url);
                    add_params += "?";
                }
            }

            if(string!="")
            {

                return url + add_params + string;
            }
            else
            {
                return url;
            }
        };

        this.joinUrlParam = function(params, string)
        {
            var add_params = "";

            if(params!="")
            {
                add_params += "&";
            }

            if(string!="")
            {

                return params + add_params + string;
            }
            else
            {
                return params;
            }
        };

        this.setAjaxResultsURLs = function(query_params)
        {
            if(typeof(self.ajax_results_conf)=="undefined")
            {
                self.ajax_results_conf = new Array();
            }

            self.ajax_results_conf['processing_url'] = "";
            self.ajax_results_conf['results_url'] = "";
            self.ajax_results_conf['data_type'] = "";

            //if(self.ajax_url!="")
            if(self.display_result_method=="shortcode")
            {//then we want to do a request to the ajax endpoint
                self.ajax_results_conf['results_url'] = self.addUrlParam(self.results_url, query_params);

                //add lang code to ajax api request, lang code should already be in there for other requests (ie, supplied in the Results URL)

                if(self.lang_code!="")
                {
                    //so add it
                    query_params = self.joinUrlParam(query_params, "lang="+self.lang_code);
                }

                self.ajax_results_conf['processing_url'] = self.addUrlParam(self.ajax_url, query_params);
                //self.ajax_results_conf['data_type'] = 'json';

            }
            else if(self.display_result_method=="post_type_archive")
            {
                process_form.setTaxArchiveResultsUrl(self, self.results_url);
                var results_url = process_form.getResultsUrl(self, self.results_url);

                self.ajax_results_conf['results_url'] = self.addUrlParam(results_url, query_params);
                self.ajax_results_conf['processing_url'] = self.addUrlParam(results_url, query_params);

            }
            else if(self.display_result_method=="custom_woocommerce_store")
            {
                process_form.setTaxArchiveResultsUrl(self, self.results_url);
                var results_url = process_form.getResultsUrl(self, self.results_url);

                self.ajax_results_conf['results_url'] = self.addUrlParam(results_url, query_params);
                self.ajax_results_conf['processing_url'] = self.addUrlParam(results_url, query_params);

            }
            else
            {//otherwise we want to pull the results directly from the results page
                self.ajax_results_conf['results_url'] = self.addUrlParam(self.results_url, query_params);
                self.ajax_results_conf['processing_url'] = self.addUrlParam(self.ajax_url, query_params);
                //self.ajax_results_conf['data_type'] = 'html';
            }

            self.ajax_results_conf['processing_url'] = self.addQueryParams(self.ajax_results_conf['processing_url'], self.extra_query_params['ajax']);

            self.ajax_results_conf['data_type'] = self.ajax_data_type;
        };



        this.updateLoaderTag = function($object, tagName) {

            var $parent;

            if(self.infinite_scroll_result_class!="")
            {
                $parent = self.$infinite_scroll_container.find(self.infinite_scroll_result_class).last().parent();
            }
            else
            {
                $parent = self.$infinite_scroll_container;
            }

            var tagName = $parent.prop("tagName");

            var tagType = 'div';
            if( ( tagName.toLowerCase() == 'ol' ) || ( tagName.toLowerCase() == 'ul' ) ){
                tagType = 'li';
            }

            var $new = $('<'+tagType+' />').html($object.html());
            var attributes = $object.prop("attributes");

            // loop through <select> attributes and apply them on <div>
            $.each(attributes, function() {
                $new.attr(this.name, this.value);
            });

            return $new;

        }


        this.loadMoreResults = function()
        {
            self.is_loading_more = true;

            //trigger start event
            var event_data = {
                sfid: self.sfid,
                targetSelector: self.ajax_target_attr,
                type: "load_more",
                object: self
            };

            self.triggerEvent("sf:ajaxstart", event_data);

            var query_params = self.getUrlParams(true);
            self.last_submit_query_params = self.getUrlParams(false); //grab a copy of hte URL params without pagination already added

            var ajax_processing_url = "";
            var ajax_results_url = "";
            var data_type = "";


            //now add the new pagination
            var next_paged_number = this.current_paged + 1;
            query_params = self.joinUrlParam(query_params, "sf_paged="+next_paged_number);

            self.setAjaxResultsURLs(query_params);
            ajax_processing_url = self.ajax_results_conf['processing_url'];
            ajax_results_url = self.ajax_results_conf['results_url'];
            data_type = self.ajax_results_conf['data_type'];

            //abort any previous ajax requests
            if(self.last_ajax_request)
            {
                self.last_ajax_request.abort();
            }

            if(self.use_scroll_loader==1)
            {
                var $loader = $('<div/>',{
                    'class': 'search-filter-scroll-loading'
                });//.appendTo(self.$ajax_results_container);

                $loader = self.updateLoaderTag($loader);

                self.infiniteScrollAppend($loader);
            }

            self.last_ajax_request = $.get(ajax_processing_url, function(data, status, request)
            {
                self.current_paged++;
                self.last_ajax_request = null;

                /* scroll */
                //self.scrollResults();

                //updates the resutls & form html
                self.addResults(data, data_type);

            }, data_type).fail(function(jqXHR, textStatus, errorThrown)
            {
                var data = {};
                data.sfid = self.sfid;
                data.object = self;
                data.targetSelector = self.ajax_target_attr;
                data.ajaxURL = ajax_processing_url;
                data.jqXHR = jqXHR;
                data.textStatus = textStatus;
                data.errorThrown = errorThrown;
                self.triggerEvent("sf:ajaxerror", data);
                /*console.log("AJAX FAIL");
                 console.log(e);
                 console.log(x);*/

            }).always(function()
            {
                var data = {};
                data.sfid = self.sfid;
                data.targetSelector = self.ajax_target_attr;
                data.object = self;

                if(self.use_scroll_loader==1)
                {
                    $loader.detach();
                }

                self.is_loading_more = false;

                self.triggerEvent("sf:ajaxfinish", data);
            });

        }
        this.fetchAjaxResults = function()
        {
            //trigger start event
            var event_data = {
                sfid: self.sfid,
                targetSelector: self.ajax_target_attr,
                type: "load_results",
                object: self
            };

            self.triggerEvent("sf:ajaxstart", event_data);

            //refocus any input fields after the form has been updated
            var $last_active_input_text = $this.find('input[type="text"]:focus').not(".sf-datepicker");
            if($last_active_input_text.length==1)
            {
                var last_active_input_text = $last_active_input_text.attr("name");
            }

            $this.addClass("search-filter-disabled");
            process_form.disableInputs(self);

            //fade out results
            self.$ajax_results_container.animate({ opacity: 0.5 }, "fast"); //loading

            if(self.ajax_action=="pagination")
            {
                //need to remove active filter from URL

                //query_params = self.last_submit_query_params;

                //now add the new pagination
                var pageNumber = self.$ajax_results_container.attr("data-paged");

                if(typeof(pageNumber)=="undefined")
                {
                    pageNumber = 1;
                }
                process_form.setTaxArchiveResultsUrl(self, self.results_url);
                query_params = self.getUrlParams(false);

                if(pageNumber>1)
                {
                    query_params = self.joinUrlParam(query_params, "sf_paged="+pageNumber);
                }

            }
            else if(self.ajax_action=="submit")
            {
                var query_params = self.getUrlParams(true);
                self.last_submit_query_params = self.getUrlParams(false); //grab a copy of hte URL params without pagination already added
            }

            var ajax_processing_url = "";
            var ajax_results_url = "";
            var data_type = "";

            self.setAjaxResultsURLs(query_params);
            ajax_processing_url = self.ajax_results_conf['processing_url'];
            ajax_results_url = self.ajax_results_conf['results_url'];
            data_type = self.ajax_results_conf['data_type'];


            //abort any previous ajax requests
            if(self.last_ajax_request)
            {
                self.last_ajax_request.abort();
            }

            self.last_ajax_request = $.get(ajax_processing_url, function(data, status, request)
            {
                self.last_ajax_request = null;

                /* scroll */
                self.scrollResults();

                //updates the resutls & form html
                self.updateResults(data, data_type);

                /* update URL */
                //update url before pagination, because we need to do some checks agains the URL for infinite scroll
                self.updateUrlHistory(ajax_results_url);

                //setup pagination
                self.setupAjaxPagination();



                self.isSubmitting = false;

                /* user def */
                self.initWooCommerceControls(); //woocommerce orderby


            }, data_type).fail(function(jqXHR, textStatus, errorThrown)
            {
                var data = {};
                data.sfid = self.sfid;
                data.targetSelector = self.ajax_target_attr;
                data.object = self;
                data.ajaxURL = ajax_processing_url;
                data.jqXHR = jqXHR;
                data.textStatus = textStatus;
                data.errorThrown = errorThrown;
                self.isSubmitting = false;
                self.triggerEvent("sf:ajaxerror", data);
                /*console.log("AJAX FAIL");
                 console.log(e);
                 console.log(x);*/

            }).always(function()
            {
                self.$ajax_results_container.stop(true,true).animate({ opacity: 1}, "fast"); //finished loading
                var data = {};
                data.sfid = self.sfid;
                data.targetSelector = self.ajax_target_attr;
                data.object = self;
                $this.removeClass("search-filter-disabled");
                process_form.enableInputs(self);

                //refocus the last active text field
                if(last_active_input_text!="")
                {
                    var $input = [];
                    self.$fields.each(function(){

                        var $active_input = $(this).find("input[name='"+last_active_input_text+"']");
                        if($active_input.length==1)
                        {
                            $input = $active_input;
                        }

                    });
                    if($input.length==1) {

                        $input.focus().val($input.val());
                        self.focusCampo($input[0]);
                    }
                }

                $this.find("input[name='_sf_search']").focus();
                self.triggerEvent("sf:ajaxfinish",  data );

            });
        };

        this.focusCampo = function(inputField){
            //var inputField = document.getElementById(id);
            if (inputField != null && inputField.value.length != 0){
                if (inputField.createTextRange){
                    var FieldRange = inputField.createTextRange();
                    FieldRange.moveStart('character',inputField.value.length);
                    FieldRange.collapse();
                    FieldRange.select();
                }else if (inputField.selectionStart || inputField.selectionStart == '0') {
                    var elemLen = inputField.value.length;
                    inputField.selectionStart = elemLen;
                    inputField.selectionEnd = elemLen;
                    inputField.focus();
                }
            }else{
                inputField.focus();
            }
        }

        this.triggerEvent = function(eventname, data)
        {
            var $event_container = $(".searchandfilter[data-sf-form-id='"+self.sfid+"']");
            $event_container.trigger(eventname, [ data ]);
        }

        this.fetchAjaxForm = function()
        {
            //trigger start event
            var event_data = {
                sfid: self.sfid,
                targetSelector: self.ajax_target_attr,
                type: "form",
                object: self
            };

            self.triggerEvent("sf:ajaxformstart", [ event_data ]);

            $this.addClass("search-filter-disabled");
            process_form.disableInputs(self);

            var query_params = self.getUrlParams();

            if(self.lang_code!="")
            {
                //so add it
                query_params = self.joinUrlParam(query_params, "lang="+self.lang_code);
            }

            var ajax_processing_url = self.addUrlParam(self.ajax_form_url, query_params);
            var data_type = "json";


            //abort any previous ajax requests
            /*if(self.last_ajax_request)
             {
             self.last_ajax_request.abort();
             }*/


            //self.last_ajax_request =

            $.get(ajax_processing_url, function(data, status, request)
            {
                //self.last_ajax_request = null;

                //updates the resutls & form html
                self.updateForm(data, data_type);


            }, data_type).fail(function(jqXHR, textStatus, errorThrown)
            {
                var data = {};
                data.sfid = self.sfid;
                data.targetSelector = self.ajax_target_attr;
                data.object = self;
                data.ajaxURL = ajax_processing_url;
                data.jqXHR = jqXHR;
                data.textStatus = textStatus;
                data.errorThrown = errorThrown;
                self.triggerEvent("sf:ajaxerror", [ data ]);

            }).always(function()
            {
                var data = {};
                data.sfid = self.sfid;
                data.targetSelector = self.ajax_target_attr;
                data.object = self;

                $this.removeClass("search-filter-disabled");
                process_form.enableInputs(self);

                self.triggerEvent("sf:ajaxformfinish", [ data ]);
            });
        };

        this.copyListItemsContents = function($list_from, $list_to)
        {
            var self = this;

            //copy over child list items
            var li_contents_array = new Array();
            var from_attributes = new Array();

            var $from_fields = $list_from.find("> ul > li");

            $from_fields.each(function(i){

                li_contents_array.push($(this).html());

                var attributes = $(this).prop("attributes");
                from_attributes.push(attributes);

                //var field_name = $(this).attr("data-sf-field-name");
                //var to_field = $list_to.find("> ul > li[data-sf-field-name='"+field_name+"']");

                //self.copyAttributes($(this), $list_to, "data-sf-");

            });

            var li_it = 0;
            var $to_fields = $list_to.find("> ul > li");
            $to_fields.each(function(i){
                $(this).html(li_contents_array[li_it]);

                var $from_field = $($from_fields.get(li_it));

                var $to_field = $(this);
                $to_field.removeAttr("data-sf-taxonomy-archive");
                self.copyAttributes($from_field, $to_field);

                li_it++;
            });

            /*var $from_fields = $list_from.find(" ul > li");
             var $to_fields = $list_to.find(" > li");
             $from_fields.each(function(index, val){
             if($(this).hasAttribute("data-sf-taxonomy-archive"))
             {

             }
             });

             this.copyAttributes($list_from, $list_to);*/
        }

        this.updateFormAttributes = function($list_from, $list_to)
        {
            var from_attributes = $list_from.prop("attributes");
            // loop through <select> attributes and apply them on <div>

            var to_attributes = $list_to.prop("attributes");
            $.each(to_attributes, function() {
                $list_to.removeAttr(this.name);
            });

            $.each(from_attributes, function() {
                $list_to.attr(this.name, this.value);
            });

        }

        this.copyAttributes = function($from, $to, prefix)
        {
            if(typeof(prefix)=="undefined")
            {
                var prefix = "";
            }

            var from_attributes = $from.prop("attributes");

            var to_attributes = $to.prop("attributes");
            $.each(to_attributes, function() {

                if(prefix!="") {
                    if (this.name.indexOf(prefix) == 0) {
                        $to.removeAttr(this.name);
                    }
                }
                else
                {
                    //$to.removeAttr(this.name);
                }
            });

            $.each(from_attributes, function() {
                $to.attr(this.name, this.value);
            });
        }

        this.copyFormAttributes = function($from, $to)
        {
            $to.removeAttr("data-current-taxonomy-archive");
            this.copyAttributes($from, $to);

        }

        this.updateForm = function(data, data_type)
        {
            var self = this;

            if(data_type=="json")
            {//then we did a request to the ajax endpoint, so expect an object back

                if(typeof(data['form'])!=="undefined")
                {
                    //remove all events from S&F form
                    $this.off();

                    //refresh the form (auto count)
                    self.copyListItemsContents($(data['form']), $this);

                    //re init S&F class on the form
                    //$this.searchAndFilter();

                    //if ajax is enabled init the pagination

                    this.init(true);

                    if(self.is_ajax==1)
                    {
                        self.setupAjaxPagination();
                    }



                }
            }


        }
        this.addResults = function(data, data_type)
        {
            var self = this;

            if(data_type=="json")
            {//then we did a request to the ajax endpoint, so expect an object back
                //grab the results and load in
                //self.$ajax_results_container.append(data['results']);
                self.load_more_html = data['results'];
            }
            else if(data_type=="html")
            {//we are expecting the html of the results page back, so extract the html we need

                var $data_obj = $(data);

                //self.$infinite_scroll_container.append($data_obj.find(self.ajax_target_attr).html());
                self.load_more_html = $data_obj.find(self.ajax_target_attr).html();
            }

            var infinite_scroll_end = false;

            if($("<div>"+self.load_more_html+"</div>").find("[data-search-filter-action='infinite-scroll-end']").length>0)
            {
                infinite_scroll_end = true;
            }

            //if there is another selector for infinite scroll, find the contents of that instead
            if(self.infinite_scroll_container!="")
            {
                self.load_more_html = $("<div>"+self.load_more_html+"</div>").find(self.infinite_scroll_container).html();
            }
            if(self.infinite_scroll_result_class!="")
            {
                var $result_items = $("<div>"+self.load_more_html+"</div>").find(self.infinite_scroll_result_class);
                var $result_items_container = $('<div/>', {});
                $result_items_container.append($result_items);

                self.load_more_html = $result_items_container.html();
            }

            if(infinite_scroll_end)
            {//we found a data attribute signalling the last page so finish here

                self.is_max_paged = true;
                self.last_load_more_html = self.load_more_html;

                self.infiniteScrollAppend(self.load_more_html);

            }
            else if(self.last_load_more_html!==self.load_more_html)
            {
                //check to make sure the new html fetched is different
                self.last_load_more_html = self.load_more_html;
                self.infiniteScrollAppend(self.load_more_html);

            }
            else
            {//we received the same message again so don't add, and tell S&F that we're at the end..
                self.is_max_paged = true;
            }
        }


        this.infiniteScrollAppend = function($object)
        {
            if(self.infinite_scroll_result_class!="")
            {
                self.$infinite_scroll_container.find(self.infinite_scroll_result_class).last().after($object);
            }
            else
            {
               self.$infinite_scroll_container.append($object);
            }
        }


        this.updateResults = function(data, data_type)
        {
            var self = this;

            if(data_type=="json")
            {//then we did a request to the ajax endpoint, so expect an object back
                //grab the results and load in
                self.$ajax_results_container.html(data['results']);

                if(typeof(data['form'])!=="undefined")
                {
                    //remove all events from S&F form
                    $this.off();

                    //remove pagination
                    self.removeAjaxPagination();

                    //refresh the form (auto count)
                    self.copyListItemsContents($(data['form']), $this);

                    //update attributes on form
                    self.copyFormAttributes($(data['form']), $this);

                    //re init S&F class on the form
                    $this.searchAndFilter({'isInit': false});
                }
                else
                {
                    //$this.find("input").removeAttr("disabled");
                }
            }
            else if(data_type=="html") {//we are expecting the html of the results page back, so extract the html we need

                var $data_obj = $(data);

                self.$ajax_results_container.html($data_obj.find(self.ajax_target_attr).html());

                if (self.$ajax_results_container.find(".searchandfilter").length > 0)
                {//then there are search form(s) inside the results container, so re-init them

                    self.$ajax_results_container.find(".searchandfilter").searchAndFilter();
                }

                //if the current search form is not inside the results container, then proceed as normal and update the form
                if(self.$ajax_results_container.find(".searchandfilter[data-sf-form-id='" + self.sfid + "']").length==0) {

                    var $new_search_form = $data_obj.find(".searchandfilter[data-sf-form-id='" + self.sfid + "']");

                    if ($new_search_form.length == 1) {//then replace the search form with the new one

                        //remove all events from S&F form
                        $this.off();

                        //remove pagination
                        self.removeAjaxPagination();

                        //refresh the form (auto count)
                        self.copyListItemsContents($new_search_form, $this);

                        //update attributes on form
                        self.copyFormAttributes($new_search_form, $this);

                        //re init S&F class on the form
                        $this.searchAndFilter({'isInit': false});

                    }
                    else {

                        //$this.find("input").removeAttr("disabled");
                    }
                }
            }

            self.is_max_paged = false; //for infinite scroll
            self.current_paged = 1; //for infinite scroll
            self.setInfiniteScrollContainer();

        }

        this.removeWooCommerceControls = function(){
            var $woo_orderby = $('.woocommerce-ordering .orderby');
            var $woo_orderby_form = $('.woocommerce-ordering');

            $woo_orderby_form.off();
            $woo_orderby.off();
        };

        this.addQueryParam = function(name, value, url_type){

            if(typeof(url_type)=="undefined")
            {
                var url_type = "all";
            }
            self.extra_query_params[url_type][name] = value;

        };

        this.initWooCommerceControls = function(){

            self.removeWooCommerceControls();

            var $woo_orderby = $('.woocommerce-ordering .orderby');
            var $woo_orderby_form = $('.woocommerce-ordering');

            var order_val = "";
            if($woo_orderby.length>0)
            {
                order_val = $woo_orderby.val();
            }
            else
            {
                order_val = self.getQueryParamFromURL("orderby", window.location.href);
            }

            if(order_val=="menu_order")
            {
                order_val = "";
            }

            if((order_val!="")&&(!!order_val))
            {
                self.extra_query_params.all.orderby = order_val;
            }


            $woo_orderby_form.on('submit', function(e)
            {
                e.preventDefault();
                //var form = e.target;
                return false;
            });

            $woo_orderby.on("change", function(e)
            {
                e.preventDefault();

                var val = $(this).val();
                if(val=="menu_order")
                {
                    val = "";
                }

                self.extra_query_params.all.orderby = val;

                $this.submit();

                return false;
            });

        }

        this.scrollResults = function()
        {
            var self = this;

            if((self.scroll_on_action==self.ajax_action)||(self.scroll_on_action=="all"))
            {
                self.scrollToPos(); //scroll the window if it has been set
                //self.ajax_action = "";
            }
        }

        this.updateUrlHistory = function(ajax_results_url)
        {
            var self = this;

            var use_history_api = 0;
            if (window.history && window.history.pushState)
            {
                use_history_api = $this.attr("data-use-history-api");
            }

            if((self.update_ajax_url==1)&&(use_history_api==1))
            {
                //now check if the browser supports history state push :)
                if (window.history && window.history.pushState)
                {
                    history.pushState(null, null, ajax_results_url);
                }
            }
        }
        this.removeAjaxPagination = function()
        {
            var self = this;

            if(typeof(self.ajax_links_selector)!="undefined")
            {
                var $ajax_links_object = jQuery(self.ajax_links_selector);

                if($ajax_links_object.length>0)
                {
                    $ajax_links_object.off();
                }
            }
        }

        this.canFetchAjaxResults = function(fetch_type)
        {
            if(typeof(fetch_type)=="undefined")
            {
                var fetch_type = "";
            }

            var self = this;
            var fetch_ajax_results = false;

            if(self.is_ajax==1)
            {//then we will ajax submit the form

                //and if we can find the results container
                if(self.$ajax_results_container.length==1)
                {
                    fetch_ajax_results = true;
                }

                var results_url = self.results_url;  //
                var current_url = window.location.href;

                //ignore # and everything after
                var hash_pos = window.location.href.indexOf('#');
                if(hash_pos!==-1){
                    current_url = window.location.href.substr(0, window.location.href.indexOf('#'));
                }

                if( ( ( self.display_result_method=="custom_woocommerce_store" ) || ( self.display_result_method=="post_type_archive" ) ) && ( self.enable_taxonomy_archives == 1 ) )
                {
                    if( self.current_taxonomy_archive !=="" )
                    {
                        fetch_ajax_results = true;
                        return fetch_ajax_results;
                    }

                    /*var results_url = process_form.getResultsUrl(self, self.results_url);
                     var active_tax = process_form.getActiveTax();
                     var query_params = self.getUrlParams(true, '', active_tax);*/
                }




                //now see if we are on the URL we think...
                var url_parts = current_url.split("?");
                var url_base = "";

                if(url_parts.length>0)
                {
                    url_base = url_parts[0];
                }
                else {
                    url_base = current_url;
                }

                var lang = self.getQueryParamFromURL("lang", window.location.href);
                if((typeof(lang)!=="undefined")&&(lang!==null))
                {
                    url_base = self.addUrlParam(url_base, "lang="+lang);
                }

                var sfid = self.getQueryParamFromURL("sfid", window.location.href);

                //if sfid is a number
                if(Number(parseFloat(sfid)) == sfid)
                {
                    url_base = self.addUrlParam(url_base, "sfid="+sfid);
                }

                //if any of the 3 conditions are true, then its good to go
                // - 1 | if the url base == results_url
                // - 2 | if url base+ "/"  == results_url - in case of user error in the results URL

                //trim any trailing slash for easier comparison:
                url_base = url_base.replace(/\/$/, '');
                results_url = results_url.replace(/\/$/, '');

                var current_url_contains_results_url = -1;
                if(url_base==results_url)
                {
                    current_url_contains_results_url = 1;
                }

                if(self.only_results_ajax==1)
                {//if a user has chosen to only allow ajax on results pages (default behaviour)

                    if( current_url_contains_results_url > -1)
                    {//this means the current URL contains the results url, which means we can do ajax
                        fetch_ajax_results = true;
                    }
                    else
                    {
                        fetch_ajax_results = false;
                    }
                }
                else
                {
                    if(fetch_type=="pagination")
                    {
                        if( current_url_contains_results_url > -1)
                        {//this means the current URL contains the results url, which means we can do ajax

                        }
                        else
                        {
                            //don't ajax pagination when not on a S&F page
                            fetch_ajax_results = false;
                        }


                    }

                }
            }

            return fetch_ajax_results;
        }

        this.setupAjaxPagination = function()
        {
            if(typeof(self.ajax_links_selector)=="undefined")
            {
                return;
            }

            //infinite scroll
            if(this.pagination_type==="infinite_scroll")
            {
                if(parseInt(this.instance_number)===1) {
                    $(window).off("scroll", self.onWindowScroll);

                    if (self.canFetchAjaxResults("pagination")) {
                        $(window).on("scroll", self.onWindowScroll);
                    }
                }
            }

            //var $ajax_links_object = jQuery(self.ajax_links_selector);

            //if($ajax_links_object.length>0)
            //{
                //console.log("init pagination stuff");
                //$ajax_links_object.off('click');
                //alert(self.ajax_links_selector);
                $(document).off('click', self.ajax_links_selector);
                $(document).on('click', self.ajax_links_selector, function(e){

                    if(self.canFetchAjaxResults("pagination"))
                    {
                        e.preventDefault();

                        var link = jQuery(this).attr('href');
                        self.ajax_action = "pagination";

                        var pageNumber = self.getPagedFromURL(link);

                        self.$ajax_results_container.attr("data-paged", pageNumber);

                        self.fetchAjaxResults();

                        return false;
                    }
                });
           // }
        };

        this.getPagedFromURL = function(URL){

            var pagedVal = 1;
            //first test to see if we have "/page/4/" in the URL
            var tpVal = self.getQueryParamFromURL("sf_paged", URL);
            if((typeof(tpVal)=="string")||(typeof(tpVal)=="number"))
            {
                pagedVal = tpVal;
            }

            return pagedVal;
        };

        this.getQueryParamFromURL = function(name, URL){

            var qstring = "?"+URL.split('?')[1];
            if(typeof(qstring)!="undefined")
            {
                var val = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(qstring)||[,""])[1].replace(/\+/g, '%20'))||null;
                return val;
            }
            return "";
        };



        this.formUpdated = function(e){

            //e.preventDefault();
            if(self.auto_update==1) {
                self.submitForm();
            }
            else if((self.auto_update==0)&&(self.auto_count_refresh_mode==1))
            {
                self.formUpdatedFetchAjax();
            }

            return false;
        };

        this.formUpdatedFetchAjax = function(){

            //loop through all the fields and build the URL
            self.fetchAjaxForm();


            return false;
        };

        //make any corrections/updates to fields before the submit completes
        this.setFields = function(e){

            //if(self.is_ajax==0) {

                //sometimes the form is submitted without the slider yet having updated, and as we get our values from
                //the slider and not inputs, we need to check it if needs to be set
                //only occurs if ajax is off, and autosubmit on
                self.$fields.each(function() {

                    var $field = $(this);

                    var range_display_values = $field.find('.sf-meta-range-slider').attr("data-display-values-as");//data-display-values-as="text"

                    if(range_display_values==="textinput") {

                        if($field.find(".meta-slider").length>0){

                        }
                        $field.find(".meta-slider").each(function (index) {

                            var slider_object = $(this)[0];
                            var $slider_el = $(this).closest(".sf-meta-range-slider");
                            //var minVal = $slider_el.attr("data-min");
                            //var maxVal = $slider_el.attr("data-max");
                            var minVal = $slider_el.find(".sf-range-min").val();
                            var maxVal = $slider_el.find(".sf-range-max").val();
                            slider_object.noUiSlider.set([minVal, maxVal]);

                        });
                    }
                });
            //}

        }

        //submit
        this.submitForm = function(e){

            //loop through all the fields and build the URL
            if(self.isSubmitting == true) {
                return false;
            }

            self.setFields();
            self.clearTimer();

            self.isSubmitting = true;

            process_form.setTaxArchiveResultsUrl(self, self.results_url);

            self.$ajax_results_container.attr("data-paged", 1); //init paged

            if(self.canFetchAjaxResults())
            {//then we will ajax submit the form

                self.ajax_action = "submit"; //so we know it wasn't pagination
                self.fetchAjaxResults();
            }
            else
            {//then we will simply redirect to the Results URL

                var results_url = process_form.getResultsUrl(self, self.results_url);
                var query_params = self.getUrlParams(true, '');
                results_url = self.addUrlParam(results_url, query_params);

                window.location.href = results_url;
            }

            /*if(self.maintain_state=="1")
             {
             //alert("maintain state");
             var inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
             //https://github.com/js-cookie/js-cookie/wiki/Frequently-Asked-Questions#expire-cookies-in-less-than-a-day
             var thirtyminutes = 1/48;
             //cookies.set('name', 'mrross', { expires: 7 });
             //cookies.set('name', 'mrross', { expires: thirtyminutes });
             cookies.set('name', 'mrross', { expires: inFifteenMinutes });
             }*/

            return false;
        };
        // console.log(cookies.get('name'));
        //console.log(cookies.get('name'));
        this.resetForm = function(submit_form)
        {
            //unset all fields
            self.$fields.each(function(){

                var $field = $(this);

                //standard field types
                $field.find("select:not([multiple='multiple']) > option:first-child").prop("selected", true);
                $field.find("select[multiple='multiple'] > option").prop("selected", false);
                $field.find("input[type='checkbox']").prop("checked", false);
                $field.find("> ul > li:first-child input[type='radio']").prop("checked", true);
                $field.find("input[type='text']").val("");


                //number range - 2 number input fields
                $field.find("input[type='number']").each(function(index){

                    var $thisInput = $(this);

                    if($thisInput.parent().parent().hasClass("sf-meta-range")) {

                        if(index==0) {
                            $thisInput.val($thisInput.attr("min"));
                        }
                        else if(index==1) {
                            $thisInput.val($thisInput.attr("max"));
                        }
                    }

                });

                //meta / numbers with 2 inputs (from / to fields) - second input must be reset to max value
                var $meta_select_from_to = $field.find(".sf-meta-range-select-fromto");

                if($meta_select_from_to.length>0) {

                    var start_min = $meta_select_from_to.attr("data-min");
                    var start_max = $meta_select_from_to.attr("data-max");

                    $meta_select_from_to.find("select").each(function(index){

                        var $thisInput = $(this);

                        if(index==0) {

                            $thisInput.val(start_min);
                        }
                        else if(index==1) {
                            $thisInput.val(start_max);
                        }

                    });
                }

                var $meta_radio_from_to = $field.find(".sf-meta-range-radio-fromto");

                if($meta_radio_from_to.length>0)
                {
                    var start_min = $meta_radio_from_to.attr("data-min");
                    var start_max = $meta_radio_from_to.attr("data-max");

                    var $radio_groups = $meta_radio_from_to.find('.sf-input-range-radio');

                    $radio_groups.each(function(index){


                        var $radios = $(this).find(".sf-input-radio");
                        $radios.prop("checked", false);

                        if(index==0)
                        {
                            $radios.filter('[value="'+start_min+'"]').prop("checked", true);
                        }
                        else if(index==1)
                        {
                            $radios.filter('[value="'+start_max+'"]').prop("checked", true);
                        }

                    });

                }

                //number slider - noUiSlider
                $field.find(".meta-slider").each(function(index){

                    var slider_object = $(this)[0];
                    /*var slider_object = $container.find(".meta-slider")[0];
                     var slider_val = slider_object.noUiSlider.get();*/

                    var $slider_el = $(this).closest(".sf-meta-range-slider");
                    var minVal = $slider_el.attr("data-min");
                    var maxVal = $slider_el.attr("data-max");
                    slider_object.noUiSlider.set([minVal, maxVal]);

                });

                //need to see if any are combobox and act accordingly
                var $combobox = $field.find("select[data-combobox='1']");
                if($combobox.length>0)
                {
                    if (typeof $combobox.chosen != "undefined")
                    {
                        $combobox.trigger("chosen:updated"); //for chosen only
                    }
                    else
                    {
                        $combobox.val('');
                        $combobox.trigger('change.select2');
                    }
                }


            });
            self.clearTimer();



            if(submit_form=="always")
            {
                self.submitForm();
            }
            else if(submit_form=="never")
            {
                if(this.auto_count_refresh_mode==1)
                {
                    self.formUpdatedFetchAjax();
                }
            }
            else if(submit_form=="auto")
            {
                if(this.auto_update==true)
                {
                    self.submitForm();
                }
                else
                {
                    if(this.auto_count_refresh_mode==1)
                    {
                        self.formUpdatedFetchAjax();
                    }
                }
            }

        };

        this.init();

        var event_data = {};
        event_data.sfid = self.sfid;
        event_data.targetSelector = self.ajax_target_attr;
        event_data.object = this;
        if(opts.isInit)
        {
            self.triggerEvent("sf:init", event_data);
        }

    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9wdWJsaWMvYXNzZXRzL2pzL2luY2x1ZGVzL3BsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbnZhciAkIFx0XHRcdFx0PSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snalF1ZXJ5J10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydqUXVlcnknXSA6IG51bGwpO1xyXG52YXIgc3RhdGUgXHRcdFx0PSByZXF1aXJlKCcuL3N0YXRlJyk7XHJcbnZhciBwcm9jZXNzX2Zvcm0gXHQ9IHJlcXVpcmUoJy4vcHJvY2Vzc19mb3JtJyk7XHJcbnZhciBub1VpU2xpZGVyXHRcdD0gcmVxdWlyZSgnbm91aXNsaWRlcicpO1xyXG52YXIgY29va2llcyAgICAgICAgID0gcmVxdWlyZSgnanMtY29va2llJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9wdGlvbnMpXHJcbntcclxuICAgIHZhciBkZWZhdWx0cyA9IHtcclxuICAgICAgICBzdGFydE9wZW5lZDogZmFsc2UsXHJcbiAgICAgICAgaXNJbml0OiB0cnVlLFxyXG4gICAgICAgIGFjdGlvbjogXCJcIlxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgb3B0cyA9IGpRdWVyeS5leHRlbmQoZGVmYXVsdHMsIG9wdGlvbnMpO1xyXG5cclxuICAgIC8vbG9vcCB0aHJvdWdoIGVhY2ggaXRlbSBtYXRjaGVkXHJcbiAgICB0aGlzLmVhY2goZnVuY3Rpb24oKVxyXG4gICAge1xyXG5cclxuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLnNmaWQgPSAkdGhpcy5hdHRyKFwiZGF0YS1zZi1mb3JtLWlkXCIpO1xyXG5cclxuICAgICAgICBzdGF0ZS5hZGRTZWFyY2hGb3JtKHRoaXMuc2ZpZCwgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuJGZpZWxkcyA9ICR0aGlzLmZpbmQoXCI+IHVsID4gbGlcIik7IC8vYSByZWZlcmVuY2UgdG8gZWFjaCBmaWVsZHMgcGFyZW50IExJXHJcblxyXG4gICAgICAgIHRoaXMuZW5hYmxlX3RheG9ub215X2FyY2hpdmVzID0gJHRoaXMuYXR0cignZGF0YS10YXhvbm9teS1hcmNoaXZlcycpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudF90YXhvbm9teV9hcmNoaXZlID0gJHRoaXMuYXR0cignZGF0YS1jdXJyZW50LXRheG9ub215LWFyY2hpdmUnKTtcclxuXHJcbiAgICAgICAgaWYodHlwZW9mKHRoaXMuZW5hYmxlX3RheG9ub215X2FyY2hpdmVzKT09XCJ1bmRlZmluZWRcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlX3RheG9ub215X2FyY2hpdmVzID0gXCIwXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHR5cGVvZih0aGlzLmN1cnJlbnRfdGF4b25vbXlfYXJjaGl2ZSk9PVwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRfdGF4b25vbXlfYXJjaGl2ZSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm9jZXNzX2Zvcm0uaW5pdChzZWxmLmVuYWJsZV90YXhvbm9teV9hcmNoaXZlcywgc2VsZi5jdXJyZW50X3RheG9ub215X2FyY2hpdmUpO1xyXG4gICAgICAgIC8vcHJvY2Vzc19mb3JtLnNldFRheEFyY2hpdmVSZXN1bHRzVXJsKHNlbGYpO1xyXG4gICAgICAgIHByb2Nlc3NfZm9ybS5lbmFibGVJbnB1dHMoc2VsZik7XHJcblxyXG4gICAgICAgIGlmKHR5cGVvZih0aGlzLmV4dHJhX3F1ZXJ5X3BhcmFtcyk9PVwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmV4dHJhX3F1ZXJ5X3BhcmFtcyA9IHthbGw6IHt9LCByZXN1bHRzOiB7fSwgYWpheDoge319O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHRoaXMudGVtcGxhdGVfaXNfbG9hZGVkID0gJHRoaXMuYXR0cihcImRhdGEtdGVtcGxhdGUtbG9hZGVkXCIpO1xyXG4gICAgICAgIHRoaXMuaXNfYWpheCA9ICR0aGlzLmF0dHIoXCJkYXRhLWFqYXhcIik7XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZV9udW1iZXIgPSAkdGhpcy5hdHRyKCdkYXRhLWluc3RhbmNlLWNvdW50Jyk7XHJcbiAgICAgICAgdGhpcy4kYWpheF9yZXN1bHRzX2NvbnRhaW5lciA9IGpRdWVyeSgkdGhpcy5hdHRyKFwiZGF0YS1hamF4LXRhcmdldFwiKSk7XHJcblxyXG4gICAgICAgIHRoaXMucmVzdWx0c191cmwgPSAkdGhpcy5hdHRyKFwiZGF0YS1yZXN1bHRzLXVybFwiKTtcclxuICAgICAgICB0aGlzLmRlYnVnX21vZGUgPSAkdGhpcy5hdHRyKFwiZGF0YS1kZWJ1Zy1tb2RlXCIpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlX2FqYXhfdXJsID0gJHRoaXMuYXR0cihcImRhdGEtdXBkYXRlLWFqYXgtdXJsXCIpO1xyXG4gICAgICAgIHRoaXMucGFnaW5hdGlvbl90eXBlID0gJHRoaXMuYXR0cihcImRhdGEtYWpheC1wYWdpbmF0aW9uLXR5cGVcIik7XHJcbiAgICAgICAgdGhpcy5hdXRvX2NvdW50ID0gJHRoaXMuYXR0cihcImRhdGEtYXV0by1jb3VudFwiKTtcclxuICAgICAgICB0aGlzLmF1dG9fY291bnRfcmVmcmVzaF9tb2RlID0gJHRoaXMuYXR0cihcImRhdGEtYXV0by1jb3VudC1yZWZyZXNoLW1vZGVcIik7XHJcbiAgICAgICAgdGhpcy5vbmx5X3Jlc3VsdHNfYWpheCA9ICR0aGlzLmF0dHIoXCJkYXRhLW9ubHktcmVzdWx0cy1hamF4XCIpOyAvL2lmIHdlIGFyZSBub3Qgb24gdGhlIHJlc3VsdHMgcGFnZSwgcmVkaXJlY3QgcmF0aGVyIHRoYW4gdHJ5IHRvIGxvYWQgdmlhIGFqYXhcclxuICAgICAgICB0aGlzLnNjcm9sbF90b19wb3MgPSAkdGhpcy5hdHRyKFwiZGF0YS1zY3JvbGwtdG8tcG9zXCIpO1xyXG4gICAgICAgIHRoaXMuY3VzdG9tX3Njcm9sbF90byA9ICR0aGlzLmF0dHIoXCJkYXRhLWN1c3RvbS1zY3JvbGwtdG9cIik7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxfb25fYWN0aW9uID0gJHRoaXMuYXR0cihcImRhdGEtc2Nyb2xsLW9uLWFjdGlvblwiKTtcclxuICAgICAgICB0aGlzLmxhbmdfY29kZSA9ICR0aGlzLmF0dHIoXCJkYXRhLWxhbmctY29kZVwiKTtcclxuICAgICAgICB0aGlzLmFqYXhfdXJsID0gJHRoaXMuYXR0cignZGF0YS1hamF4LXVybCcpO1xyXG4gICAgICAgIHRoaXMuYWpheF9mb3JtX3VybCA9ICR0aGlzLmF0dHIoJ2RhdGEtYWpheC1mb3JtLXVybCcpO1xyXG4gICAgICAgIHRoaXMuaXNfcnRsID0gJHRoaXMuYXR0cignZGF0YS1pcy1ydGwnKTtcclxuXHJcbiAgICAgICAgdGhpcy5kaXNwbGF5X3Jlc3VsdF9tZXRob2QgPSAkdGhpcy5hdHRyKCdkYXRhLWRpc3BsYXktcmVzdWx0LW1ldGhvZCcpO1xyXG4gICAgICAgIHRoaXMubWFpbnRhaW5fc3RhdGUgPSAkdGhpcy5hdHRyKCdkYXRhLW1haW50YWluLXN0YXRlJyk7XHJcbiAgICAgICAgdGhpcy5hamF4X2FjdGlvbiA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5sYXN0X3N1Ym1pdF9xdWVyeV9wYXJhbXMgPSBcIlwiO1xyXG5cclxuICAgICAgICB0aGlzLmN1cnJlbnRfcGFnZWQgPSBwYXJzZUludCgkdGhpcy5hdHRyKCdkYXRhLWluaXQtcGFnZWQnKSk7XHJcbiAgICAgICAgdGhpcy5sYXN0X2xvYWRfbW9yZV9odG1sID0gXCJcIjtcclxuICAgICAgICB0aGlzLmxvYWRfbW9yZV9odG1sID0gXCJcIjtcclxuICAgICAgICB0aGlzLmFqYXhfZGF0YV90eXBlID0gJHRoaXMuYXR0cignZGF0YS1hamF4LWRhdGEtdHlwZScpO1xyXG4gICAgICAgIHRoaXMuYWpheF90YXJnZXRfYXR0ciA9ICR0aGlzLmF0dHIoXCJkYXRhLWFqYXgtdGFyZ2V0XCIpO1xyXG4gICAgICAgIHRoaXMudXNlX2hpc3RvcnlfYXBpID0gJHRoaXMuYXR0cihcImRhdGEtdXNlLWhpc3RvcnktYXBpXCIpO1xyXG4gICAgICAgIHRoaXMuaXNfc3VibWl0dGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLmxhc3RfYWpheF9yZXF1ZXN0ID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYodHlwZW9mKHRoaXMudXNlX2hpc3RvcnlfYXBpKT09XCJ1bmRlZmluZWRcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudXNlX2hpc3RvcnlfYXBpID0gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHR5cGVvZih0aGlzLnBhZ2luYXRpb25fdHlwZSk9PVwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2luYXRpb25fdHlwZSA9IFwibm9ybWFsXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHR5cGVvZih0aGlzLmN1cnJlbnRfcGFnZWQpPT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50X3BhZ2VkID0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHR5cGVvZih0aGlzLmFqYXhfdGFyZ2V0X2F0dHIpPT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hamF4X3RhcmdldF9hdHRyID0gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHR5cGVvZih0aGlzLmFqYXhfdXJsKT09XCJ1bmRlZmluZWRcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYWpheF91cmwgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodHlwZW9mKHRoaXMuYWpheF9mb3JtX3VybCk9PVwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFqYXhfZm9ybV91cmwgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodHlwZW9mKHRoaXMucmVzdWx0c191cmwpPT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yZXN1bHRzX3VybCA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0eXBlb2YodGhpcy5zY3JvbGxfdG9fcG9zKT09XCJ1bmRlZmluZWRcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsX3RvX3BvcyA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0eXBlb2YodGhpcy5zY3JvbGxfb25fYWN0aW9uKT09XCJ1bmRlZmluZWRcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsX29uX2FjdGlvbiA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHR5cGVvZih0aGlzLmN1c3RvbV9zY3JvbGxfdG8pPT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21fc2Nyb2xsX3RvID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy4kY3VzdG9tX3Njcm9sbF90byA9IGpRdWVyeSh0aGlzLmN1c3RvbV9zY3JvbGxfdG8pO1xyXG5cclxuICAgICAgICBpZih0eXBlb2YodGhpcy51cGRhdGVfYWpheF91cmwpPT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVfYWpheF91cmwgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodHlwZW9mKHRoaXMuZGVidWdfbW9kZSk9PVwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmRlYnVnX21vZGUgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodHlwZW9mKHRoaXMuYWpheF90YXJnZXRfb2JqZWN0KT09XCJ1bmRlZmluZWRcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYWpheF90YXJnZXRfb2JqZWN0ID0gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHR5cGVvZih0aGlzLnRlbXBsYXRlX2lzX2xvYWRlZCk9PVwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRlbXBsYXRlX2lzX2xvYWRlZCA9IFwiMFwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodHlwZW9mKHRoaXMuYXV0b19jb3VudF9yZWZyZXNoX21vZGUpPT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hdXRvX2NvdW50X3JlZnJlc2hfbW9kZSA9IFwiMFwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hamF4X2xpbmtzX3NlbGVjdG9yID0gJHRoaXMuYXR0cihcImRhdGEtYWpheC1saW5rcy1zZWxlY3RvclwiKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuYXV0b191cGRhdGUgPSAkdGhpcy5hdHRyKFwiZGF0YS1hdXRvLXVwZGF0ZVwiKTtcclxuICAgICAgICB0aGlzLmlucHV0VGltZXIgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLnNldEluZmluaXRlU2Nyb2xsQ29udGFpbmVyID0gZnVuY3Rpb24oKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaXNfbWF4X3BhZ2VkID0gZmFsc2U7IC8vZm9yIGxvYWQgbW9yZSBvbmx5LCBvbmNlIHdlIGRldGVjdCB3ZSdyZSBhdCB0aGUgZW5kIHNldCB0aGlzIHRvIHRydWVcclxuICAgICAgICAgICAgdGhpcy51c2Vfc2Nyb2xsX2xvYWRlciA9ICR0aGlzLmF0dHIoJ2RhdGEtc2hvdy1zY3JvbGwtbG9hZGVyJyk7IC8vZm9yIGxvYWQgbW9yZSBvbmx5LCBvbmNlIHdlIGRldGVjdCB3ZSdyZSBhdCB0aGUgZW5kIHNldCB0aGlzIHRvIHRydWVcclxuICAgICAgICAgICAgdGhpcy5pbmZpbml0ZV9zY3JvbGxfY29udGFpbmVyID0gJHRoaXMuYXR0cignZGF0YS1pbmZpbml0ZS1zY3JvbGwtY29udGFpbmVyJyk7IC8vZm9yIGxvYWQgbW9yZSBvbmx5LCBvbmNlIHdlIGRldGVjdCB3ZSdyZSBhdCB0aGUgZW5kIHNldCB0aGlzIHRvIHRydWVcclxuICAgICAgICAgICAgdGhpcy5pbmZpbml0ZV9zY3JvbGxfdHJpZ2dlcl9hbW91bnQgPSAkdGhpcy5hdHRyKCdkYXRhLWluZmluaXRlLXNjcm9sbC10cmlnZ2VyJyk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5maW5pdGVfc2Nyb2xsX3Jlc3VsdF9jbGFzcyA9ICR0aGlzLmF0dHIoJ2RhdGEtaW5maW5pdGUtc2Nyb2xsLXJlc3VsdC1jbGFzcycpO1xyXG4gICAgICAgICAgICB0aGlzLiRpbmZpbml0ZV9zY3JvbGxfY29udGFpbmVyID0gdGhpcy4kYWpheF9yZXN1bHRzX2NvbnRhaW5lcjtcclxuXHJcbiAgICAgICAgICAgIGlmKHR5cGVvZih0aGlzLmluZmluaXRlX3Njcm9sbF9jb250YWluZXIpPT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluZmluaXRlX3Njcm9sbF9jb250YWluZXIgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kaW5maW5pdGVfc2Nyb2xsX2NvbnRhaW5lciA9IGpRdWVyeSgkdGhpcy5hdHRyKCdkYXRhLWluZmluaXRlLXNjcm9sbC1jb250YWluZXInKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHR5cGVvZih0aGlzLmluZmluaXRlX3Njcm9sbF9yZXN1bHRfY2xhc3MpPT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluZmluaXRlX3Njcm9sbF9yZXN1bHRfY2xhc3MgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZih0eXBlb2YodGhpcy51c2Vfc2Nyb2xsX2xvYWRlcik9PVwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlX3Njcm9sbF9sb2FkZXIgPSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zZXRJbmZpbml0ZVNjcm9sbENvbnRhaW5lcigpO1xyXG5cclxuICAgICAgICAvKiBmdW5jdGlvbnMgKi9cclxuXHJcbiAgICAgICAgdGhpcy5yZXNldCA9IGZ1bmN0aW9uKHN1Ym1pdF9mb3JtKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRGb3JtKHN1Ym1pdF9mb3JtKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmlucHV0VXBkYXRlID0gZnVuY3Rpb24oZGVsYXlEdXJhdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHR5cGVvZihkZWxheUR1cmF0aW9uKT09XCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRlbGF5RHVyYXRpb24gPSAzMDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNlbGYucmVzZXRUaW1lcihkZWxheUR1cmF0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZGF0ZUlucHV0VHlwZSA9IGZ1bmN0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciAkdGhpc2UgPSAkKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgaWYoKHNlbGYuYXV0b191cGRhdGU9PTEpfHwoc2VsZi5hdXRvX2NvdW50X3JlZnJlc2hfbW9kZT09MSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciAkdGZfZGF0ZV9waWNrZXJzID0gJHRoaXMuZmluZChcIi5zZi1kYXRlcGlja2VyXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vX2RhdGVfcGlja2VycyA9ICR0Zl9kYXRlX3BpY2tlcnMubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKG5vX2RhdGVfcGlja2Vycz4xKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhlbiBpdCBpcyBhIGRhdGUgcmFuZ2UsIHNvIG1ha2Ugc3VyZSBib3RoIGZpZWxkcyBhcmUgZmlsbGVkIGJlZm9yZSB1cGRhdGluZ1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkcF9jb3VudGVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZHBfZW1wdHlfZmllbGRfY291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICR0Zl9kYXRlX3BpY2tlcnMuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCQodGhpcykudmFsKCk9PVwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRwX2VtcHR5X2ZpZWxkX2NvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRwX2NvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZHBfZW1wdHlfZmllbGRfY291bnQ9PTApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pbnB1dFVwZGF0ZSgxMjAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmlucHV0VXBkYXRlKDEyMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5zY3JvbGxUb1BvcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gMDtcclxuICAgICAgICAgICAgdmFyIGNhblNjcm9sbCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZihzZWxmLmlzX2FqYXg9PTEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHNlbGYuc2Nyb2xsX3RvX3Bvcz09XCJ3aW5kb3dcIilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoc2VsZi5zY3JvbGxfdG9fcG9zPT1cImZvcm1cIilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSAkdGhpcy5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHNlbGYuc2Nyb2xsX3RvX3Bvcz09XCJyZXN1bHRzXCIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi4kYWpheF9yZXN1bHRzX2NvbnRhaW5lci5sZW5ndGg+MClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IHNlbGYuJGFqYXhfcmVzdWx0c19jb250YWluZXIub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoc2VsZi5zY3JvbGxfdG9fcG9zPT1cImN1c3RvbVwiKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY3VzdG9tX3Njcm9sbF90b1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuJGN1c3RvbV9zY3JvbGxfdG8ubGVuZ3RoPjApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSBzZWxmLiRjdXN0b21fc2Nyb2xsX3RvLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FuU2Nyb2xsID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoY2FuU2Nyb2xsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCJodG1sLCBib2R5XCIpLnN0b3AoKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBvZmZzZXRcclxuICAgICAgICAgICAgICAgICAgICB9LCBcIm5vcm1hbFwiLCBcImVhc2VPdXRRdWFkXCIgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmF0dGFjaEFjdGl2ZUNsYXNzID0gZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgIC8vY2hlY2sgdG8gc2VlIGlmIHdlIGFyZSB1c2luZyBhamF4ICYgYXV0byBjb3VudFxyXG4gICAgICAgICAgICAvL2lmIG5vdCwgdGhlIHNlYXJjaCBmb3JtIGRvZXMgbm90IGdldCByZWxvYWRlZCwgc28gd2UgbmVlZCB0byB1cGRhdGUgdGhlIHNmLW9wdGlvbi1hY3RpdmUgY2xhc3Mgb24gYWxsIGZpZWxkc1xyXG5cclxuICAgICAgICAgICAgJHRoaXMub24oJ2NoYW5nZScsICdpbnB1dFt0eXBlPVwicmFkaW9cIl0sIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXSwgc2VsZWN0JywgZnVuY3Rpb24oZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyICRjdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGN0aGlzX3BhcmVudCA9ICRjdGhpcy5wYXJlbnQoKTtcclxuICAgICAgICAgICAgICAgIHZhciB0aGlzX3RhZyA9ICRjdGhpcy5wcm9wKFwidGFnTmFtZVwiKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGlucHV0X3R5cGUgPSAkY3RoaXMuYXR0cihcInR5cGVcIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50X3RhZyA9ICRjdGhpc19wYXJlbnQucHJvcChcInRhZ05hbWVcIikudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZigodGhpc190YWc9PVwiaW5wdXRcIikmJigoaW5wdXRfdHlwZT09XCJyYWRpb1wiKXx8KGlucHV0X3R5cGU9PVwiY2hlY2tib3hcIikpICYmIChwYXJlbnRfdGFnPT1cImxpXCIpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciAkYWxsX29wdGlvbnMgPSAkY3RoaXNfcGFyZW50LnBhcmVudCgpLmZpbmQoJ2xpJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICRhbGxfb3B0aW9uc19maWVsZHMgPSAkY3RoaXNfcGFyZW50LnBhcmVudCgpLmZpbmQoJ2lucHV0OmNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGFsbF9vcHRpb25zLnJlbW92ZUNsYXNzKFwic2Ytb3B0aW9uLWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAkYWxsX29wdGlvbnNfZmllbGRzLmVhY2goZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KFwibGlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQuYWRkQ2xhc3MoXCJzZi1vcHRpb24tYWN0aXZlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXNfdGFnPT1cInNlbGVjdFwiKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciAkYWxsX29wdGlvbnMgPSAkY3RoaXMuY2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICAkYWxsX29wdGlvbnMucmVtb3ZlQ2xhc3MoXCJzZi1vcHRpb24tYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGlzX3ZhbCA9ICRjdGhpcy52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoaXNfYXJyX3ZhbCA9ICh0eXBlb2YgdGhpc192YWwgPT0gJ3N0cmluZycgfHwgdGhpc192YWwgaW5zdGFuY2VvZiBTdHJpbmcpID8gW3RoaXNfdmFsXSA6IHRoaXNfdmFsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXNfYXJyX3ZhbCkuZWFjaChmdW5jdGlvbihpLCB2YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRjdGhpcy5maW5kKFwib3B0aW9uW3ZhbHVlPSdcIit2YWx1ZStcIiddXCIpLmFkZENsYXNzKFwic2Ytb3B0aW9uLWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmluaXRBdXRvVXBkYXRlRXZlbnRzID0gZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgIC8qIGF1dG8gdXBkYXRlICovXHJcbiAgICAgICAgICAgIGlmKChzZWxmLmF1dG9fdXBkYXRlPT0xKXx8KHNlbGYuYXV0b19jb3VudF9yZWZyZXNoX21vZGU9PTEpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAkdGhpcy5vbignY2hhbmdlJywgJ2lucHV0W3R5cGU9XCJyYWRpb1wiXSwgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdLCBzZWxlY3QnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pbnB1dFVwZGF0ZSgyMDApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8kdGhpcy5vbignY2hhbmdlJywgJy5tZXRhLXNsaWRlcicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIHNlbGYuaW5wdXRVcGRhdGUoMjAwKTtcclxuICAgICAgICAgICAgICAgIC8vICAgIGNvbnNvbGUubG9nKFwiQ0hBTkdFIE1FVEEgU0xJREVSXCIpO1xyXG4gICAgICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkdGhpcy5vbignaW5wdXQnLCAnaW5wdXRbdHlwZT1cIm51bWJlclwiXScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmlucHV0VXBkYXRlKDgwMCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgJHRleHRJbnB1dCA9ICR0aGlzLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdOm5vdCguc2YtZGF0ZXBpY2tlciknKTtcclxuICAgICAgICAgICAgICAgIHZhciBsYXN0VmFsdWUgPSAkdGV4dElucHV0LnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICR0aGlzLm9uKCdpbnB1dCcsICdpbnB1dFt0eXBlPVwidGV4dFwiXTpub3QoLnNmLWRhdGVwaWNrZXIpJywgZnVuY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGxhc3RWYWx1ZSE9JHRleHRJbnB1dC52YWwoKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaW5wdXRVcGRhdGUoMTIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBsYXN0VmFsdWUgPSAkdGV4dElucHV0LnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICR0aGlzLm9uKCdrZXlwcmVzcycsICdpbnB1dFt0eXBlPVwidGV4dFwiXTpub3QoLnNmLWRhdGVwaWNrZXIpJywgZnVuY3Rpb24oZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS53aGljaCA9PSAxMyl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3VibWl0Rm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vJHRoaXMub24oJ2lucHV0JywgJ2lucHV0LnNmLWRhdGVwaWNrZXInLCBzZWxmLmRhdGVJbnB1dFR5cGUpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vdGhpcy5pbml0QXV0b1VwZGF0ZUV2ZW50cygpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5jbGVhclRpbWVyID0gZnVuY3Rpb24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHNlbGYuaW5wdXRUaW1lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnJlc2V0VGltZXIgPSBmdW5jdGlvbihkZWxheUR1cmF0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHNlbGYuaW5wdXRUaW1lcik7XHJcbiAgICAgICAgICAgIHNlbGYuaW5wdXRUaW1lciA9IHNldFRpbWVvdXQoc2VsZi5mb3JtVXBkYXRlZCwgZGVsYXlEdXJhdGlvbik7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuYWRkRGF0ZVBpY2tlcnMgPSBmdW5jdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgJGRhdGVfcGlja2VyID0gJHRoaXMuZmluZChcIi5zZi1kYXRlcGlja2VyXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYoJGRhdGVfcGlja2VyLmxlbmd0aD4wKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAkZGF0ZV9waWNrZXIuZWFjaChmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRlRm9ybWF0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0ZURyb3Bkb3duWWVhciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRlRHJvcGRvd25Nb250aCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgJGNsb3Nlc3RfZGF0ZV93cmFwID0gJHRoaXMuY2xvc2VzdChcIi5zZl9kYXRlX2ZpZWxkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCRjbG9zZXN0X2RhdGVfd3JhcC5sZW5ndGg+MClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVGb3JtYXQgPSAkY2xvc2VzdF9kYXRlX3dyYXAuYXR0cihcImRhdGEtZGF0ZS1mb3JtYXRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZigkY2xvc2VzdF9kYXRlX3dyYXAuYXR0cihcImRhdGEtZGF0ZS11c2UteWVhci1kcm9wZG93blwiKT09MSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZURyb3Bkb3duWWVhciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoJGNsb3Nlc3RfZGF0ZV93cmFwLmF0dHIoXCJkYXRhLWRhdGUtdXNlLW1vbnRoLWRyb3Bkb3duXCIpPT0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlRHJvcGRvd25Nb250aCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRlUGlja2VyT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93T3RoZXJNb250aHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OiBmdW5jdGlvbigpeyBzZWxmLmRhdGVTZWxlY3QoKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZUZvcm1hdDogZGF0ZUZvcm1hdCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZU1vbnRoOiBkYXRlRHJvcGRvd25Nb250aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlWWVhcjogZGF0ZURyb3Bkb3duWWVhclxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuaXNfcnRsPT0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZVBpY2tlck9wdGlvbnMuZGlyZWN0aW9uID0gXCJydGxcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICR0aGlzLmRhdGVwaWNrZXIoZGF0ZVBpY2tlck9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmxhbmdfY29kZSE9XCJcIilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuZGF0ZXBpY2tlci5zZXREZWZhdWx0cyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZXh0ZW5kKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsnZGF0ZUZvcm1hdCc6ZGF0ZUZvcm1hdH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5kYXRlcGlja2VyLnJlZ2lvbmFsWyBzZWxmLmxhbmdfY29kZV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuZGF0ZXBpY2tlci5zZXREZWZhdWx0cyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZXh0ZW5kKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsnZGF0ZUZvcm1hdCc6ZGF0ZUZvcm1hdH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5kYXRlcGlja2VyLnJlZ2lvbmFsW1wiZW5cIl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKCQoJy5sbC1za2luLW1lbG9uJykubGVuZ3RoPT0wKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICRkYXRlX3BpY2tlci5kYXRlcGlja2VyKCd3aWRnZXQnKS53cmFwKCc8ZGl2IGNsYXNzPVwibGwtc2tpbi1tZWxvbiBzZWFyY2hhbmRmaWx0ZXItZGF0ZS1waWNrZXJcIi8+Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRlU2VsZWN0ID0gZnVuY3Rpb24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIGlmKChzZWxmLmF1dG9fdXBkYXRlPT0xKXx8KHNlbGYuYXV0b19jb3VudF9yZWZyZXNoX21vZGU9PTEpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJHRmX2RhdGVfcGlja2VycyA9ICR0aGlzLmZpbmQoXCIuc2YtZGF0ZXBpY2tlclwiKTtcclxuICAgICAgICAgICAgICAgIHZhciBub19kYXRlX3BpY2tlcnMgPSAkdGZfZGF0ZV9waWNrZXJzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihub19kYXRlX3BpY2tlcnM+MSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoZW4gaXQgaXMgYSBkYXRlIHJhbmdlLCBzbyBtYWtlIHN1cmUgYm90aCBmaWVsZHMgYXJlIGZpbGxlZCBiZWZvcmUgdXBkYXRpbmdcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZHBfY291bnRlciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRwX2VtcHR5X2ZpZWxkX2NvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAkdGZfZGF0ZV9waWNrZXJzLmVhY2goZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCQodGhpcykudmFsKCk9PVwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRwX2VtcHR5X2ZpZWxkX2NvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRwX2NvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZHBfZW1wdHlfZmllbGRfY291bnQ9PTApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmlucHV0VXBkYXRlKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmlucHV0VXBkYXRlKDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuYWRkUmFuZ2VTbGlkZXJzID0gZnVuY3Rpb24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyICRtZXRhX3JhbmdlID0gJHRoaXMuZmluZChcIi5zZi1tZXRhLXJhbmdlLXNsaWRlclwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmKCRtZXRhX3JhbmdlLmxlbmd0aD4wKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAkbWV0YV9yYW5nZS5lYWNoKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1pbiA9ICR0aGlzLmF0dHIoXCJkYXRhLW1pblwiKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWF4ID0gJHRoaXMuYXR0cihcImRhdGEtbWF4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzbWluID0gJHRoaXMuYXR0cihcImRhdGEtc3RhcnQtbWluXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzbWF4ID0gJHRoaXMuYXR0cihcImRhdGEtc3RhcnQtbWF4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaXNwbGF5X3ZhbHVlX2FzID0gJHRoaXMuYXR0cihcImRhdGEtZGlzcGxheS12YWx1ZXMtYXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0ZXAgPSAkdGhpcy5hdHRyKFwiZGF0YS1zdGVwXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciAkc3RhcnRfdmFsID0gJHRoaXMuZmluZCgnLnNmLXJhbmdlLW1pbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciAkZW5kX3ZhbCA9ICR0aGlzLmZpbmQoJy5zZi1yYW5nZS1tYXgnKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWNpbWFsX3BsYWNlcyA9ICR0aGlzLmF0dHIoXCJkYXRhLWRlY2ltYWwtcGxhY2VzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0aG91c2FuZF9zZXBlcmF0b3IgPSAkdGhpcy5hdHRyKFwiZGF0YS10aG91c2FuZC1zZXBlcmF0b3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlY2ltYWxfc2VwZXJhdG9yID0gJHRoaXMuYXR0cihcImRhdGEtZGVjaW1hbC1zZXBlcmF0b3JcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWVsZF9mb3JtYXQgPSB3TnVtYih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcms6IGRlY2ltYWxfc2VwZXJhdG9yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWNpbWFsczogcGFyc2VGbG9hdChkZWNpbWFsX3BsYWNlcyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRob3VzYW5kOiB0aG91c2FuZF9zZXBlcmF0b3JcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWluX3VuZm9ybWF0dGVkID0gcGFyc2VGbG9hdChzbWluKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWluX2Zvcm1hdHRlZCA9IGZpZWxkX2Zvcm1hdC50byhwYXJzZUZsb2F0KHNtaW4pKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWF4X2Zvcm1hdHRlZCA9IGZpZWxkX2Zvcm1hdC50byhwYXJzZUZsb2F0KHNtYXgpKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWF4X3VuZm9ybWF0dGVkID0gcGFyc2VGbG9hdChzbWF4KTtcclxuICAgICAgICAgICAgICAgICAgICAvL2FsZXJ0KG1pbl9mb3JtYXR0ZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vYWxlcnQobWF4X2Zvcm1hdHRlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9hbGVydChkaXNwbGF5X3ZhbHVlX2FzKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRpc3BsYXlfdmFsdWVfYXM9PVwidGV4dGlucHV0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc3RhcnRfdmFsLnZhbChtaW5fZm9ybWF0dGVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGVuZF92YWwudmFsKG1heF9mb3JtYXR0ZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKGRpc3BsYXlfdmFsdWVfYXM9PVwidGV4dFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXJ0X3ZhbC5odG1sKG1pbl9mb3JtYXR0ZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkZW5kX3ZhbC5odG1sKG1heF9mb3JtYXR0ZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBub1VJT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtaW4nOiBbIHBhcnNlRmxvYXQobWluKSBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21heCc6IFsgcGFyc2VGbG9hdChtYXgpIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IFttaW5fZm9ybWF0dGVkLCBtYXhfZm9ybWF0dGVkXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlczogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogcGFyc2VGbG9hdChzdGVwKSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlaGF2aW91cjogJ2V4dGVuZC10YXAnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IGZpZWxkX2Zvcm1hdFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5pc19ydGw9PTEpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub1VJT3B0aW9ucy5kaXJlY3Rpb24gPSBcInJ0bFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8kKHRoaXMpLmZpbmQoXCIubWV0YS1zbGlkZXJcIikubm9VaVNsaWRlcihub1VJT3B0aW9ucyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZXJfb2JqZWN0ID0gJCh0aGlzKS5maW5kKFwiLm1ldGEtc2xpZGVyXCIpWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiggXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mKCBzbGlkZXJfb2JqZWN0Lm5vVWlTbGlkZXIgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kZXN0cm95IGlmIGl0IGV4aXN0cy4uIHRoaXMgbWVhbnMgc29tZWhvdyBhbm90aGVyIGluc3RhbmNlIGhhZCBpbml0aWFsaXNlZCBpdC4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlcl9vYmplY3Qubm9VaVNsaWRlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2codHlwZW9mKHNsaWRlcl9vYmplY3Qubm9VaVNsaWRlcikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbm9VaVNsaWRlci5jcmVhdGUoc2xpZGVyX29iamVjdCwgbm9VSU9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkc3RhcnRfdmFsLm9mZigpO1xyXG4gICAgICAgICAgICAgICAgICAgICRzdGFydF92YWwub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlcl9vYmplY3Qubm9VaVNsaWRlci5zZXQoWyQodGhpcykudmFsKCksIG51bGxdKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGVuZF92YWwub2ZmKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGVuZF92YWwub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlcl9vYmplY3Qubm9VaVNsaWRlci5zZXQoW251bGwsICQodGhpcykudmFsKCldKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8kc3RhcnRfdmFsLmh0bWwobWluX2Zvcm1hdHRlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8kZW5kX3ZhbC5odG1sKG1heF9mb3JtYXR0ZWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXJfb2JqZWN0Lm5vVWlTbGlkZXIub2ZmKCd1cGRhdGUnKTtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXJfb2JqZWN0Lm5vVWlTbGlkZXIub24oJ3VwZGF0ZScsIGZ1bmN0aW9uKCB2YWx1ZXMsIGhhbmRsZSApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZXJfc3RhcnRfdmFsICA9IG1pbl9mb3JtYXR0ZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZXJfZW5kX3ZhbCAgPSBtYXhfZm9ybWF0dGVkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdmFsdWVzW2hhbmRsZV07XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBoYW5kbGUgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhfZm9ybWF0dGVkID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5fZm9ybWF0dGVkID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRpc3BsYXlfdmFsdWVfYXM9PVwidGV4dGlucHV0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGFydF92YWwudmFsKG1pbl9mb3JtYXR0ZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGVuZF92YWwudmFsKG1heF9mb3JtYXR0ZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoZGlzcGxheV92YWx1ZV9hcz09XCJ0ZXh0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGFydF92YWwuaHRtbChtaW5fZm9ybWF0dGVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRlbmRfdmFsLmh0bWwobWF4X2Zvcm1hdHRlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2kgdGhpbmsgdGhlIGZ1bmN0aW9uIHRoYXQgYnVpbGRzIHRoZSBVUkwgbmVlZHMgdG8gZGVjb2RlIHRoZSBmb3JtYXR0ZWQgc3RyaW5nIGJlZm9yZSBhZGRpbmcgdG8gdGhlIHVybFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZigoc2VsZi5hdXRvX3VwZGF0ZT09MSl8fChzZWxmLmF1dG9fY291bnRfcmVmcmVzaF9tb2RlPT0xKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9vbmx5IHRyeSB0byB1cGRhdGUgaWYgdGhlIHZhbHVlcyBoYXZlIGFjdHVhbGx5IGNoYW5nZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKChzbGlkZXJfc3RhcnRfdmFsIT1taW5fZm9ybWF0dGVkKXx8KHNsaWRlcl9lbmRfdmFsIT1tYXhfZm9ybWF0dGVkKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmlucHV0VXBkYXRlKDgwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLmNsZWFyVGltZXIoKTsgLy9pZ25vcmUgYW55IGNoYW5nZXMgcmVjZW50bHkgbWFkZSBieSB0aGUgc2xpZGVyICh0aGlzIHdhcyBqdXN0IGluaXQgc2hvdWxkbid0IGNvdW50IGFzIGFuIHVwZGF0ZSBldmVudClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdCA9IGZ1bmN0aW9uKGtlZXBfcGFnaW5hdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHR5cGVvZihrZWVwX3BhZ2luYXRpb24pPT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIga2VlcF9wYWdpbmF0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdEF1dG9VcGRhdGVFdmVudHMoKTtcclxuICAgICAgICAgICAgdGhpcy5hdHRhY2hBY3RpdmVDbGFzcygpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hZGREYXRlUGlja2VycygpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFJhbmdlU2xpZGVycygpO1xyXG5cclxuICAgICAgICAgICAgLy9pbml0IGNvbWJvIGJveGVzXHJcbiAgICAgICAgICAgIHZhciAkY29tYm9ib3ggPSAkdGhpcy5maW5kKFwic2VsZWN0W2RhdGEtY29tYm9ib3g9JzEnXVwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmKCRjb21ib2JveC5sZW5ndGg+MClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJGNvbWJvYm94LmVhY2goZnVuY3Rpb24oaW5kZXggKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgJHRoaXNjYiA9ICQoIHRoaXMgKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbnJtID0gJHRoaXNjYi5hdHRyKFwiZGF0YS1jb21ib2JveC1ucm1cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgJHRoaXNjYi5jaG9zZW4gIT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjaG9zZW5vcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoX2NvbnRhaW5zOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZigodHlwZW9mKG5ybSkhPT1cInVuZGVmaW5lZFwiKSYmKG5ybSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hvc2Vub3B0aW9ucy5ub19yZXN1bHRzX3RleHQgPSBucm07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2FmZSB0byB1c2UgdGhlIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VhcmNoX2NvbnRhaW5zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuaXNfcnRsPT0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdGhpc2NiLmFkZENsYXNzKFwiY2hvc2VuLXJ0bFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXNjYi5jaG9zZW4oY2hvc2Vub3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0Mm9wdGlvbnMgPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuaXNfcnRsPT0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Qyb3B0aW9ucy5kaXIgPSBcInJ0bFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCh0eXBlb2YobnJtKSE9PVwidW5kZWZpbmVkXCIpJiYobnJtKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Qyb3B0aW9ucy5sYW5ndWFnZT0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibm9SZXN1bHRzXCI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBucm07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXNjYi5zZWxlY3QyKHNlbGVjdDJvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL2lmIGFqYXggaXMgZW5hYmxlZCBpbml0IHRoZSBwYWdpbmF0aW9uXHJcbiAgICAgICAgICAgIGlmKHNlbGYuaXNfYWpheD09MSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXR1cEFqYXhQYWdpbmF0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICR0aGlzLnN1Ym1pdCh0aGlzLnN1Ym1pdEZvcm0pO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5pbml0V29vQ29tbWVyY2VDb250cm9scygpOyAvL3dvb2NvbW1lcmNlIG9yZGVyYnlcclxuXHJcbiAgICAgICAgICAgIGlmKGtlZXBfcGFnaW5hdGlvbj09ZmFsc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubGFzdF9zdWJtaXRfcXVlcnlfcGFyYW1zID0gc2VsZi5nZXRVcmxQYXJhbXMoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9uV2luZG93U2Nyb2xsID0gZnVuY3Rpb24oZXZlbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZigoIXNlbGYuaXNfbG9hZGluZ19tb3JlKSAmJiAoIXNlbGYuaXNfbWF4X3BhZ2VkKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHdpbmRvd19zY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgd2luZG93X3Njcm9sbF9ib3R0b20gPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgKyAkKHdpbmRvdykuaGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsX29mZnNldCA9IHBhcnNlSW50KHNlbGYuaW5maW5pdGVfc2Nyb2xsX3RyaWdnZXJfYW1vdW50KTsvL3NlbGYuaW5maW5pdGVfc2Nyb2xsX3RyaWdnZXJfYW1vdW50O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vdmFyICRhamF4X3Jlc3VsdHNfY29udGFpbmVyID0galF1ZXJ5KCR0aGlzLmF0dHIoXCJkYXRhLWFqYXgtdGFyZ2V0XCIpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihzZWxmLiRpbmZpbml0ZV9zY3JvbGxfY29udGFpbmVyLmxlbmd0aD09MSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0c19zY3JvbGxfYm90dG9tID0gc2VsZi4kaW5maW5pdGVfc2Nyb2xsX2NvbnRhaW5lci5vZmZzZXQoKS50b3AgKyBzZWxmLiRpbmZpbml0ZV9zY3JvbGxfY29udGFpbmVyLmhlaWdodCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3ZhciBvZmZzZXQgPSAoJGFqYXhfcmVzdWx0c19jb250YWluZXIub2Zmc2V0KCkudG9wICsgJGFqYXhfcmVzdWx0c19jb250YWluZXIuaGVpZ2h0KCkpIC0gd2luZG93X3Njcm9sbDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gKHNlbGYuJGluZmluaXRlX3Njcm9sbF9jb250YWluZXIub2Zmc2V0KCkudG9wICsgc2VsZi4kaW5maW5pdGVfc2Nyb2xsX2NvbnRhaW5lci5oZWlnaHQoKSkgLSB3aW5kb3dfc2Nyb2xsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZih3aW5kb3dfc2Nyb2xsX2JvdHRvbSA+IHJlc3VsdHNfc2Nyb2xsX2JvdHRvbSArIHNjcm9sbF9vZmZzZXQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYWRNb3JlUmVzdWx0cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgey8vZG9udCBsb2FkIG1vcmVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKmlmKHRoaXMuZGVidWdfbW9kZT09XCIxXCIpXHJcbiAgICAgICAgIHsvL2Vycm9yIGxvZ2dpbmdcclxuXHJcbiAgICAgICAgIGlmKHNlbGYuaXNfYWpheD09MSlcclxuICAgICAgICAge1xyXG4gICAgICAgICBpZihzZWxmLmRpc3BsYXlfcmVzdWx0c19hcz09XCJzaG9ydGNvZGVcIilcclxuICAgICAgICAge1xyXG4gICAgICAgICBpZihzZWxmLiRhamF4X3Jlc3VsdHNfY29udGFpbmVyLmxlbmd0aD09MClcclxuICAgICAgICAge1xyXG4gICAgICAgICBjb25zb2xlLmxvZyhcIlNlYXJjaCAmIEZpbHRlciB8IEZvcm0gSUQ6IFwiK3NlbGYuc2ZpZCtcIjogY2Fubm90IGZpbmQgdGhlIHJlc3VsdHMgY29udGFpbmVyIG9uIHRoaXMgcGFnZSAtIGVuc3VyZSB5b3UgdXNlIHRoZSBzaG9ydGNvZGUgb24gdGhpcyBwYWdlIG9yIHByb3ZpZGUgYSBVUkwgd2hlcmUgaXQgY2FuIGJlIGZvdW5kIChSZXN1bHRzIFVSTClcIik7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgaWYoc2VsZi5yZXN1bHRzX3VybD09XCJcIilcclxuICAgICAgICAge1xyXG4gICAgICAgICBjb25zb2xlLmxvZyhcIlNlYXJjaCAmIEZpbHRlciB8IEZvcm0gSUQ6IFwiK3NlbGYuc2ZpZCtcIjogTm8gUmVzdWx0cyBVUkwgaGFzIGJlZW4gZGVmaW5lZCAtIGVuc3VyZSB0aGF0IHlvdSBlbnRlciB0aGlzIGluIG9yZGVyIHRvIHVzZSB0aGUgU2VhcmNoIEZvcm0gb24gYW55IHBhZ2UpXCIpO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIC8vY2hlY2sgaWYgcmVzdWx0cyBVUkwgaXMgb24gc2FtZSBkb21haW4gZm9yIHBvdGVudGlhbCBjcm9zcyBkb21haW4gZXJyb3JzXHJcbiAgICAgICAgIH1cclxuICAgICAgICAgZWxzZVxyXG4gICAgICAgICB7XHJcbiAgICAgICAgIGlmKHNlbGYuJGFqYXhfcmVzdWx0c19jb250YWluZXIubGVuZ3RoPT0wKVxyXG4gICAgICAgICB7XHJcbiAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoICYgRmlsdGVyIHwgRm9ybSBJRDogXCIrc2VsZi5zZmlkK1wiOiBjYW5ub3QgZmluZCB0aGUgcmVzdWx0cyBjb250YWluZXIgb24gdGhpcyBwYWdlIC0gZW5zdXJlIHlvdSB1c2UgYXJlIHVzaW5nIHRoZSByaWdodCBjb250ZW50IHNlbGVjdG9yXCIpO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICAgICBlbHNlXHJcbiAgICAgICAgIHtcclxuXHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIH0qL1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5zdHJpcFF1ZXJ5U3RyaW5nQW5kSGFzaEZyb21QYXRoID0gZnVuY3Rpb24odXJsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1cmwuc3BsaXQoXCI/XCIpWzBdLnNwbGl0KFwiI1wiKVswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZ3VwID0gZnVuY3Rpb24oIG5hbWUsIHVybCApIHtcclxuICAgICAgICAgICAgaWYgKCF1cmwpIHVybCA9IGxvY2F0aW9uLmhyZWZcclxuICAgICAgICAgICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvW1xcW10vLFwiXFxcXFxcW1wiKS5yZXBsYWNlKC9bXFxdXS8sXCJcXFxcXFxdXCIpO1xyXG4gICAgICAgICAgICB2YXIgcmVnZXhTID0gXCJbXFxcXD8mXVwiK25hbWUrXCI9KFteJiNdKilcIjtcclxuICAgICAgICAgICAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cCggcmVnZXhTICk7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHRzID0gcmVnZXguZXhlYyggdXJsICk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRzID09IG51bGwgPyBudWxsIDogcmVzdWx0c1sxXTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5nZXRVcmxQYXJhbXMgPSBmdW5jdGlvbihrZWVwX3BhZ2luYXRpb24sIHR5cGUsIGV4Y2x1ZGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0eXBlb2Yoa2VlcF9wYWdpbmF0aW9uKT09XCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGtlZXBfcGFnaW5hdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLyppZih0eXBlb2YoZXhjbHVkZSk9PVwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICB2YXIgZXhjbHVkZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICB9Ki9cclxuXHJcbiAgICAgICAgICAgIGlmKHR5cGVvZih0eXBlKT09XCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHR5cGUgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgdXJsX3BhcmFtc19zdHIgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgLy8gZ2V0IGFsbCBwYXJhbXMgZnJvbSBmaWVsZHNcclxuICAgICAgICAgICAgdmFyIHVybF9wYXJhbXNfYXJyYXkgPSBwcm9jZXNzX2Zvcm0uZ2V0VXJsUGFyYW1zKHNlbGYpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxlbmd0aCA9IE9iamVjdC5rZXlzKHVybF9wYXJhbXNfYXJyYXkpLmxlbmd0aDtcclxuICAgICAgICAgICAgdmFyIGNvdW50ID0gMDtcclxuXHJcbiAgICAgICAgICAgIGlmKHR5cGVvZihleGNsdWRlKSE9XCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVybF9wYXJhbXNfYXJyYXkuaGFzT3duUHJvcGVydHkoZXhjbHVkZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZW5ndGgtLTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYobGVuZ3RoPjApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGsgaW4gdXJsX3BhcmFtc19hcnJheSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1cmxfcGFyYW1zX2FycmF5Lmhhc093blByb3BlcnR5KGspKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FuX2FkZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZihleGNsdWRlKSE9XCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaz09ZXhjbHVkZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbl9hZGQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2FuX2FkZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsX3BhcmFtc19zdHIgKz0gayArIFwiPVwiICsgdXJsX3BhcmFtc19hcnJheVtrXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPCBsZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsX3BhcmFtc19zdHIgKz0gXCImXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHF1ZXJ5X3BhcmFtcyA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICAvL2Zvcm0gcGFyYW1zIGFzIHVybCBxdWVyeSBzdHJpbmdcclxuICAgICAgICAgICAgLy92YXIgZm9ybV9wYXJhbXMgPSB1cmxfcGFyYW1zX3N0ci5yZXBsYWNlQWxsKFwiJTJCXCIsIFwiK1wiKS5yZXBsYWNlQWxsKFwiJTJDXCIsIFwiLFwiKVxyXG4gICAgICAgICAgICB2YXIgZm9ybV9wYXJhbXMgPSB1cmxfcGFyYW1zX3N0cjtcclxuXHJcbiAgICAgICAgICAgIC8vZ2V0IHVybCBwYXJhbXMgZnJvbSB0aGUgZm9ybSBpdHNlbGYgKHdoYXQgdGhlIHVzZXIgaGFzIHNlbGVjdGVkKVxyXG4gICAgICAgICAgICBxdWVyeV9wYXJhbXMgPSBzZWxmLmpvaW5VcmxQYXJhbShxdWVyeV9wYXJhbXMsIGZvcm1fcGFyYW1zKTtcclxuXHJcbiAgICAgICAgICAgIC8vYWRkIHBhZ2luYXRpb25cclxuICAgICAgICAgICAgaWYoa2VlcF9wYWdpbmF0aW9uPT10cnVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFnZU51bWJlciA9IHNlbGYuJGFqYXhfcmVzdWx0c19jb250YWluZXIuYXR0cihcImRhdGEtcGFnZWRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodHlwZW9mKHBhZ2VOdW1iZXIpPT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VOdW1iZXIgPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKHBhZ2VOdW1iZXI+MSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBxdWVyeV9wYXJhbXMgPSBzZWxmLmpvaW5VcmxQYXJhbShxdWVyeV9wYXJhbXMsIFwic2ZfcGFnZWQ9XCIrcGFnZU51bWJlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vYWRkIHNmaWRcclxuICAgICAgICAgICAgLy9xdWVyeV9wYXJhbXMgPSBzZWxmLmpvaW5VcmxQYXJhbShxdWVyeV9wYXJhbXMsIFwic2ZpZD1cIitzZWxmLnNmaWQpO1xyXG5cclxuICAgICAgICAgICAgLy8gbG9vcCB0aHJvdWdoIGFueSBleHRyYSBwYXJhbXMgKGZyb20gZXh0IHBsdWdpbnMpIGFuZCBhZGQgdG8gdGhlIHVybCAoaWUgd29vY29tbWVyY2UgYG9yZGVyYnlgKVxyXG4gICAgICAgICAgICAvKnZhciBleHRyYV9xdWVyeV9wYXJhbSA9IFwiXCI7XHJcbiAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gT2JqZWN0LmtleXMoc2VsZi5leHRyYV9xdWVyeV9wYXJhbXMpLmxlbmd0aDtcclxuICAgICAgICAgICAgIHZhciBjb3VudCA9IDA7XHJcblxyXG4gICAgICAgICAgICAgaWYobGVuZ3RoPjApXHJcbiAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgZm9yICh2YXIgayBpbiBzZWxmLmV4dHJhX3F1ZXJ5X3BhcmFtcykge1xyXG4gICAgICAgICAgICAgaWYgKHNlbGYuZXh0cmFfcXVlcnlfcGFyYW1zLmhhc093blByb3BlcnR5KGspKSB7XHJcblxyXG4gICAgICAgICAgICAgaWYoc2VsZi5leHRyYV9xdWVyeV9wYXJhbXNba10hPVwiXCIpXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICBleHRyYV9xdWVyeV9wYXJhbSA9IGsrXCI9XCIrc2VsZi5leHRyYV9xdWVyeV9wYXJhbXNba107XHJcbiAgICAgICAgICAgICBxdWVyeV9wYXJhbXMgPSBzZWxmLmpvaW5VcmxQYXJhbShxdWVyeV9wYXJhbXMsIGV4dHJhX3F1ZXJ5X3BhcmFtKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHF1ZXJ5X3BhcmFtcyA9IHNlbGYuYWRkUXVlcnlQYXJhbXMocXVlcnlfcGFyYW1zLCBzZWxmLmV4dHJhX3F1ZXJ5X3BhcmFtcy5hbGwpO1xyXG5cclxuICAgICAgICAgICAgaWYodHlwZSE9XCJcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9xdWVyeV9wYXJhbXMgPSBzZWxmLmFkZFF1ZXJ5UGFyYW1zKHF1ZXJ5X3BhcmFtcywgc2VsZi5leHRyYV9xdWVyeV9wYXJhbXNbdHlwZV0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcXVlcnlfcGFyYW1zO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkZFF1ZXJ5UGFyYW1zID0gZnVuY3Rpb24ocXVlcnlfcGFyYW1zLCBuZXdfcGFyYW1zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGV4dHJhX3F1ZXJ5X3BhcmFtID0gXCJcIjtcclxuICAgICAgICAgICAgdmFyIGxlbmd0aCA9IE9iamVjdC5rZXlzKG5ld19wYXJhbXMpLmxlbmd0aDtcclxuICAgICAgICAgICAgdmFyIGNvdW50ID0gMDtcclxuXHJcbiAgICAgICAgICAgIGlmKGxlbmd0aD4wKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgayBpbiBuZXdfcGFyYW1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld19wYXJhbXMuaGFzT3duUHJvcGVydHkoaykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ld19wYXJhbXNba10hPVwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dHJhX3F1ZXJ5X3BhcmFtID0gaytcIj1cIituZXdfcGFyYW1zW2tdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlfcGFyYW1zID0gc2VsZi5qb2luVXJsUGFyYW0ocXVlcnlfcGFyYW1zLCBleHRyYV9xdWVyeV9wYXJhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBxdWVyeV9wYXJhbXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWRkVXJsUGFyYW0gPSBmdW5jdGlvbih1cmwsIHN0cmluZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBhZGRfcGFyYW1zID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIGlmKHVybCE9XCJcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYodXJsLmluZGV4T2YoXCI/XCIpICE9IC0xKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZF9wYXJhbXMgKz0gXCImXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy91cmwgPSB0aGlzLnRyYWlsaW5nU2xhc2hJdCh1cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZF9wYXJhbXMgKz0gXCI/XCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHN0cmluZyE9XCJcIilcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB1cmwgKyBhZGRfcGFyYW1zICsgc3RyaW5nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVybDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuam9pblVybFBhcmFtID0gZnVuY3Rpb24ocGFyYW1zLCBzdHJpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYWRkX3BhcmFtcyA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICBpZihwYXJhbXMhPVwiXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGFkZF9wYXJhbXMgKz0gXCImXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHN0cmluZyE9XCJcIilcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJhbXMgKyBhZGRfcGFyYW1zICsgc3RyaW5nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuc2V0QWpheFJlc3VsdHNVUkxzID0gZnVuY3Rpb24ocXVlcnlfcGFyYW1zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodHlwZW9mKHNlbGYuYWpheF9yZXN1bHRzX2NvbmYpPT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmFqYXhfcmVzdWx0c19jb25mID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNlbGYuYWpheF9yZXN1bHRzX2NvbmZbJ3Byb2Nlc3NpbmdfdXJsJ10gPSBcIlwiO1xyXG4gICAgICAgICAgICBzZWxmLmFqYXhfcmVzdWx0c19jb25mWydyZXN1bHRzX3VybCddID0gXCJcIjtcclxuICAgICAgICAgICAgc2VsZi5hamF4X3Jlc3VsdHNfY29uZlsnZGF0YV90eXBlJ10gPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgLy9pZihzZWxmLmFqYXhfdXJsIT1cIlwiKVxyXG4gICAgICAgICAgICBpZihzZWxmLmRpc3BsYXlfcmVzdWx0X21ldGhvZD09XCJzaG9ydGNvZGVcIilcclxuICAgICAgICAgICAgey8vdGhlbiB3ZSB3YW50IHRvIGRvIGEgcmVxdWVzdCB0byB0aGUgYWpheCBlbmRwb2ludFxyXG4gICAgICAgICAgICAgICAgc2VsZi5hamF4X3Jlc3VsdHNfY29uZlsncmVzdWx0c191cmwnXSA9IHNlbGYuYWRkVXJsUGFyYW0oc2VsZi5yZXN1bHRzX3VybCwgcXVlcnlfcGFyYW1zKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2FkZCBsYW5nIGNvZGUgdG8gYWpheCBhcGkgcmVxdWVzdCwgbGFuZyBjb2RlIHNob3VsZCBhbHJlYWR5IGJlIGluIHRoZXJlIGZvciBvdGhlciByZXF1ZXN0cyAoaWUsIHN1cHBsaWVkIGluIHRoZSBSZXN1bHRzIFVSTClcclxuXHJcbiAgICAgICAgICAgICAgICBpZihzZWxmLmxhbmdfY29kZSE9XCJcIilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3NvIGFkZCBpdFxyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5X3BhcmFtcyA9IHNlbGYuam9pblVybFBhcmFtKHF1ZXJ5X3BhcmFtcywgXCJsYW5nPVwiK3NlbGYubGFuZ19jb2RlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLmFqYXhfcmVzdWx0c19jb25mWydwcm9jZXNzaW5nX3VybCddID0gc2VsZi5hZGRVcmxQYXJhbShzZWxmLmFqYXhfdXJsLCBxdWVyeV9wYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgLy9zZWxmLmFqYXhfcmVzdWx0c19jb25mWydkYXRhX3R5cGUnXSA9ICdqc29uJztcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihzZWxmLmRpc3BsYXlfcmVzdWx0X21ldGhvZD09XCJwb3N0X3R5cGVfYXJjaGl2ZVwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwcm9jZXNzX2Zvcm0uc2V0VGF4QXJjaGl2ZVJlc3VsdHNVcmwoc2VsZiwgc2VsZi5yZXN1bHRzX3VybCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0c191cmwgPSBwcm9jZXNzX2Zvcm0uZ2V0UmVzdWx0c1VybChzZWxmLCBzZWxmLnJlc3VsdHNfdXJsKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLmFqYXhfcmVzdWx0c19jb25mWydyZXN1bHRzX3VybCddID0gc2VsZi5hZGRVcmxQYXJhbShyZXN1bHRzX3VybCwgcXVlcnlfcGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuYWpheF9yZXN1bHRzX2NvbmZbJ3Byb2Nlc3NpbmdfdXJsJ10gPSBzZWxmLmFkZFVybFBhcmFtKHJlc3VsdHNfdXJsLCBxdWVyeV9wYXJhbXMpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHNlbGYuZGlzcGxheV9yZXN1bHRfbWV0aG9kPT1cImN1c3RvbV93b29jb21tZXJjZV9zdG9yZVwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwcm9jZXNzX2Zvcm0uc2V0VGF4QXJjaGl2ZVJlc3VsdHNVcmwoc2VsZiwgc2VsZi5yZXN1bHRzX3VybCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0c191cmwgPSBwcm9jZXNzX2Zvcm0uZ2V0UmVzdWx0c1VybChzZWxmLCBzZWxmLnJlc3VsdHNfdXJsKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLmFqYXhfcmVzdWx0c19jb25mWydyZXN1bHRzX3VybCddID0gc2VsZi5hZGRVcmxQYXJhbShyZXN1bHRzX3VybCwgcXVlcnlfcGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuYWpheF9yZXN1bHRzX2NvbmZbJ3Byb2Nlc3NpbmdfdXJsJ10gPSBzZWxmLmFkZFVybFBhcmFtKHJlc3VsdHNfdXJsLCBxdWVyeV9wYXJhbXMpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHsvL290aGVyd2lzZSB3ZSB3YW50IHRvIHB1bGwgdGhlIHJlc3VsdHMgZGlyZWN0bHkgZnJvbSB0aGUgcmVzdWx0cyBwYWdlXHJcbiAgICAgICAgICAgICAgICBzZWxmLmFqYXhfcmVzdWx0c19jb25mWydyZXN1bHRzX3VybCddID0gc2VsZi5hZGRVcmxQYXJhbShzZWxmLnJlc3VsdHNfdXJsLCBxdWVyeV9wYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hamF4X3Jlc3VsdHNfY29uZlsncHJvY2Vzc2luZ191cmwnXSA9IHNlbGYuYWRkVXJsUGFyYW0oc2VsZi5hamF4X3VybCwgcXVlcnlfcGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIC8vc2VsZi5hamF4X3Jlc3VsdHNfY29uZlsnZGF0YV90eXBlJ10gPSAnaHRtbCc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNlbGYuYWpheF9yZXN1bHRzX2NvbmZbJ3Byb2Nlc3NpbmdfdXJsJ10gPSBzZWxmLmFkZFF1ZXJ5UGFyYW1zKHNlbGYuYWpheF9yZXN1bHRzX2NvbmZbJ3Byb2Nlc3NpbmdfdXJsJ10sIHNlbGYuZXh0cmFfcXVlcnlfcGFyYW1zWydhamF4J10pO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5hamF4X3Jlc3VsdHNfY29uZlsnZGF0YV90eXBlJ10gPSBzZWxmLmFqYXhfZGF0YV90eXBlO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVMb2FkZXJUYWcgPSBmdW5jdGlvbigkb2JqZWN0LCB0YWdOYW1lKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgJHBhcmVudDtcclxuXHJcbiAgICAgICAgICAgIGlmKHNlbGYuaW5maW5pdGVfc2Nyb2xsX3Jlc3VsdF9jbGFzcyE9XCJcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJHBhcmVudCA9IHNlbGYuJGluZmluaXRlX3Njcm9sbF9jb250YWluZXIuZmluZChzZWxmLmluZmluaXRlX3Njcm9sbF9yZXN1bHRfY2xhc3MpLmxhc3QoKS5wYXJlbnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICRwYXJlbnQgPSBzZWxmLiRpbmZpbml0ZV9zY3JvbGxfY29udGFpbmVyO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgdGFnTmFtZSA9ICRwYXJlbnQucHJvcChcInRhZ05hbWVcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGFnVHlwZSA9ICdkaXYnO1xyXG4gICAgICAgICAgICBpZiggKCB0YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT0gJ29sJyApIHx8ICggdGFnTmFtZS50b0xvd2VyQ2FzZSgpID09ICd1bCcgKSApe1xyXG4gICAgICAgICAgICAgICAgdGFnVHlwZSA9ICdsaSc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciAkbmV3ID0gJCgnPCcrdGFnVHlwZSsnIC8+JykuaHRtbCgkb2JqZWN0Lmh0bWwoKSk7XHJcbiAgICAgICAgICAgIHZhciBhdHRyaWJ1dGVzID0gJG9iamVjdC5wcm9wKFwiYXR0cmlidXRlc1wiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCA8c2VsZWN0PiBhdHRyaWJ1dGVzIGFuZCBhcHBseSB0aGVtIG9uIDxkaXY+XHJcbiAgICAgICAgICAgICQuZWFjaChhdHRyaWJ1dGVzLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICRuZXcuYXR0cih0aGlzLm5hbWUsIHRoaXMudmFsdWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAkbmV3O1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB0aGlzLmxvYWRNb3JlUmVzdWx0cyA9IGZ1bmN0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNlbGYuaXNfbG9hZGluZ19tb3JlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vdHJpZ2dlciBzdGFydCBldmVudFxyXG4gICAgICAgICAgICB2YXIgZXZlbnRfZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIHNmaWQ6IHNlbGYuc2ZpZCxcclxuICAgICAgICAgICAgICAgIHRhcmdldFNlbGVjdG9yOiBzZWxmLmFqYXhfdGFyZ2V0X2F0dHIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcImxvYWRfbW9yZVwiLFxyXG4gICAgICAgICAgICAgICAgb2JqZWN0OiBzZWxmXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBzZWxmLnRyaWdnZXJFdmVudChcInNmOmFqYXhzdGFydFwiLCBldmVudF9kYXRhKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBxdWVyeV9wYXJhbXMgPSBzZWxmLmdldFVybFBhcmFtcyh0cnVlKTtcclxuICAgICAgICAgICAgc2VsZi5sYXN0X3N1Ym1pdF9xdWVyeV9wYXJhbXMgPSBzZWxmLmdldFVybFBhcmFtcyhmYWxzZSk7IC8vZ3JhYiBhIGNvcHkgb2YgaHRlIFVSTCBwYXJhbXMgd2l0aG91dCBwYWdpbmF0aW9uIGFscmVhZHkgYWRkZWRcclxuXHJcbiAgICAgICAgICAgIHZhciBhamF4X3Byb2Nlc3NpbmdfdXJsID0gXCJcIjtcclxuICAgICAgICAgICAgdmFyIGFqYXhfcmVzdWx0c191cmwgPSBcIlwiO1xyXG4gICAgICAgICAgICB2YXIgZGF0YV90eXBlID0gXCJcIjtcclxuXHJcblxyXG4gICAgICAgICAgICAvL25vdyBhZGQgdGhlIG5ldyBwYWdpbmF0aW9uXHJcbiAgICAgICAgICAgIHZhciBuZXh0X3BhZ2VkX251bWJlciA9IHRoaXMuY3VycmVudF9wYWdlZCArIDE7XHJcbiAgICAgICAgICAgIHF1ZXJ5X3BhcmFtcyA9IHNlbGYuam9pblVybFBhcmFtKHF1ZXJ5X3BhcmFtcywgXCJzZl9wYWdlZD1cIituZXh0X3BhZ2VkX251bWJlcik7XHJcblxyXG4gICAgICAgICAgICBzZWxmLnNldEFqYXhSZXN1bHRzVVJMcyhxdWVyeV9wYXJhbXMpO1xyXG4gICAgICAgICAgICBhamF4X3Byb2Nlc3NpbmdfdXJsID0gc2VsZi5hamF4X3Jlc3VsdHNfY29uZlsncHJvY2Vzc2luZ191cmwnXTtcclxuICAgICAgICAgICAgYWpheF9yZXN1bHRzX3VybCA9IHNlbGYuYWpheF9yZXN1bHRzX2NvbmZbJ3Jlc3VsdHNfdXJsJ107XHJcbiAgICAgICAgICAgIGRhdGFfdHlwZSA9IHNlbGYuYWpheF9yZXN1bHRzX2NvbmZbJ2RhdGFfdHlwZSddO1xyXG5cclxuICAgICAgICAgICAgLy9hYm9ydCBhbnkgcHJldmlvdXMgYWpheCByZXF1ZXN0c1xyXG4gICAgICAgICAgICBpZihzZWxmLmxhc3RfYWpheF9yZXF1ZXN0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxhc3RfYWpheF9yZXF1ZXN0LmFib3J0KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHNlbGYudXNlX3Njcm9sbF9sb2FkZXI9PTEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciAkbG9hZGVyID0gJCgnPGRpdi8+Jyx7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsYXNzJzogJ3NlYXJjaC1maWx0ZXItc2Nyb2xsLWxvYWRpbmcnXHJcbiAgICAgICAgICAgICAgICB9KTsvLy5hcHBlbmRUbyhzZWxmLiRhamF4X3Jlc3VsdHNfY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkbG9hZGVyID0gc2VsZi51cGRhdGVMb2FkZXJUYWcoJGxvYWRlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5pbmZpbml0ZVNjcm9sbEFwcGVuZCgkbG9hZGVyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2VsZi5sYXN0X2FqYXhfcmVxdWVzdCA9ICQuZ2V0KGFqYXhfcHJvY2Vzc2luZ191cmwsIGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgcmVxdWVzdClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50X3BhZ2VkKys7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxhc3RfYWpheF9yZXF1ZXN0ID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAvKiBzY3JvbGwgKi9cclxuICAgICAgICAgICAgICAgIC8vc2VsZi5zY3JvbGxSZXN1bHRzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy91cGRhdGVzIHRoZSByZXN1dGxzICYgZm9ybSBodG1sXHJcbiAgICAgICAgICAgICAgICBzZWxmLmFkZFJlc3VsdHMoZGF0YSwgZGF0YV90eXBlKTtcclxuXHJcbiAgICAgICAgICAgIH0sIGRhdGFfdHlwZSkuZmFpbChmdW5jdGlvbihqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge307XHJcbiAgICAgICAgICAgICAgICBkYXRhLnNmaWQgPSBzZWxmLnNmaWQ7XHJcbiAgICAgICAgICAgICAgICBkYXRhLm9iamVjdCA9IHNlbGY7XHJcbiAgICAgICAgICAgICAgICBkYXRhLnRhcmdldFNlbGVjdG9yID0gc2VsZi5hamF4X3RhcmdldF9hdHRyO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5hamF4VVJMID0gYWpheF9wcm9jZXNzaW5nX3VybDtcclxuICAgICAgICAgICAgICAgIGRhdGEuanFYSFIgPSBqcVhIUjtcclxuICAgICAgICAgICAgICAgIGRhdGEudGV4dFN0YXR1cyA9IHRleHRTdGF0dXM7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmVycm9yVGhyb3duID0gZXJyb3JUaHJvd247XHJcbiAgICAgICAgICAgICAgICBzZWxmLnRyaWdnZXJFdmVudChcInNmOmFqYXhlcnJvclwiLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIC8qY29uc29sZS5sb2coXCJBSkFYIEZBSUxcIik7XHJcbiAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coeCk7Ki9cclxuXHJcbiAgICAgICAgICAgIH0pLmFsd2F5cyhmdW5jdGlvbigpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge307XHJcbiAgICAgICAgICAgICAgICBkYXRhLnNmaWQgPSBzZWxmLnNmaWQ7XHJcbiAgICAgICAgICAgICAgICBkYXRhLnRhcmdldFNlbGVjdG9yID0gc2VsZi5hamF4X3RhcmdldF9hdHRyO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5vYmplY3QgPSBzZWxmO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHNlbGYudXNlX3Njcm9sbF9sb2FkZXI9PTEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGxvYWRlci5kZXRhY2goKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLmlzX2xvYWRpbmdfbW9yZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYudHJpZ2dlckV2ZW50KFwic2Y6YWpheGZpbmlzaFwiLCBkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZldGNoQWpheFJlc3VsdHMgPSBmdW5jdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL3RyaWdnZXIgc3RhcnQgZXZlbnRcclxuICAgICAgICAgICAgdmFyIGV2ZW50X2RhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBzZmlkOiBzZWxmLnNmaWQsXHJcbiAgICAgICAgICAgICAgICB0YXJnZXRTZWxlY3Rvcjogc2VsZi5hamF4X3RhcmdldF9hdHRyLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJsb2FkX3Jlc3VsdHNcIixcclxuICAgICAgICAgICAgICAgIG9iamVjdDogc2VsZlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgc2VsZi50cmlnZ2VyRXZlbnQoXCJzZjphamF4c3RhcnRcIiwgZXZlbnRfZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAvL3JlZm9jdXMgYW55IGlucHV0IGZpZWxkcyBhZnRlciB0aGUgZm9ybSBoYXMgYmVlbiB1cGRhdGVkXHJcbiAgICAgICAgICAgIHZhciAkbGFzdF9hY3RpdmVfaW5wdXRfdGV4dCA9ICR0aGlzLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdOmZvY3VzJykubm90KFwiLnNmLWRhdGVwaWNrZXJcIik7XHJcbiAgICAgICAgICAgIGlmKCRsYXN0X2FjdGl2ZV9pbnB1dF90ZXh0Lmxlbmd0aD09MSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxhc3RfYWN0aXZlX2lucHV0X3RleHQgPSAkbGFzdF9hY3RpdmVfaW5wdXRfdGV4dC5hdHRyKFwibmFtZVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJHRoaXMuYWRkQ2xhc3MoXCJzZWFyY2gtZmlsdGVyLWRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICBwcm9jZXNzX2Zvcm0uZGlzYWJsZUlucHV0cyhzZWxmKTtcclxuXHJcbiAgICAgICAgICAgIC8vZmFkZSBvdXQgcmVzdWx0c1xyXG4gICAgICAgICAgICBzZWxmLiRhamF4X3Jlc3VsdHNfY29udGFpbmVyLmFuaW1hdGUoeyBvcGFjaXR5OiAwLjUgfSwgXCJmYXN0XCIpOyAvL2xvYWRpbmdcclxuXHJcbiAgICAgICAgICAgIGlmKHNlbGYuYWpheF9hY3Rpb249PVwicGFnaW5hdGlvblwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL25lZWQgdG8gcmVtb3ZlIGFjdGl2ZSBmaWx0ZXIgZnJvbSBVUkxcclxuXHJcbiAgICAgICAgICAgICAgICAvL3F1ZXJ5X3BhcmFtcyA9IHNlbGYubGFzdF9zdWJtaXRfcXVlcnlfcGFyYW1zO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vbm93IGFkZCB0aGUgbmV3IHBhZ2luYXRpb25cclxuICAgICAgICAgICAgICAgIHZhciBwYWdlTnVtYmVyID0gc2VsZi4kYWpheF9yZXN1bHRzX2NvbnRhaW5lci5hdHRyKFwiZGF0YS1wYWdlZFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YocGFnZU51bWJlcik9PVwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZU51bWJlciA9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwcm9jZXNzX2Zvcm0uc2V0VGF4QXJjaGl2ZVJlc3VsdHNVcmwoc2VsZiwgc2VsZi5yZXN1bHRzX3VybCk7XHJcbiAgICAgICAgICAgICAgICBxdWVyeV9wYXJhbXMgPSBzZWxmLmdldFVybFBhcmFtcyhmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYocGFnZU51bWJlcj4xKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5X3BhcmFtcyA9IHNlbGYuam9pblVybFBhcmFtKHF1ZXJ5X3BhcmFtcywgXCJzZl9wYWdlZD1cIitwYWdlTnVtYmVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihzZWxmLmFqYXhfYWN0aW9uPT1cInN1Ym1pdFwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcXVlcnlfcGFyYW1zID0gc2VsZi5nZXRVcmxQYXJhbXModHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxhc3Rfc3VibWl0X3F1ZXJ5X3BhcmFtcyA9IHNlbGYuZ2V0VXJsUGFyYW1zKGZhbHNlKTsgLy9ncmFiIGEgY29weSBvZiBodGUgVVJMIHBhcmFtcyB3aXRob3V0IHBhZ2luYXRpb24gYWxyZWFkeSBhZGRlZFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgYWpheF9wcm9jZXNzaW5nX3VybCA9IFwiXCI7XHJcbiAgICAgICAgICAgIHZhciBhamF4X3Jlc3VsdHNfdXJsID0gXCJcIjtcclxuICAgICAgICAgICAgdmFyIGRhdGFfdHlwZSA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICBzZWxmLnNldEFqYXhSZXN1bHRzVVJMcyhxdWVyeV9wYXJhbXMpO1xyXG4gICAgICAgICAgICBhamF4X3Byb2Nlc3NpbmdfdXJsID0gc2VsZi5hamF4X3Jlc3VsdHNfY29uZlsncHJvY2Vzc2luZ191cmwnXTtcclxuICAgICAgICAgICAgYWpheF9yZXN1bHRzX3VybCA9IHNlbGYuYWpheF9yZXN1bHRzX2NvbmZbJ3Jlc3VsdHNfdXJsJ107XHJcbiAgICAgICAgICAgIGRhdGFfdHlwZSA9IHNlbGYuYWpheF9yZXN1bHRzX2NvbmZbJ2RhdGFfdHlwZSddO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vYWJvcnQgYW55IHByZXZpb3VzIGFqYXggcmVxdWVzdHNcclxuICAgICAgICAgICAgaWYoc2VsZi5sYXN0X2FqYXhfcmVxdWVzdClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sYXN0X2FqYXhfcmVxdWVzdC5hYm9ydCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZWxmLmxhc3RfYWpheF9yZXF1ZXN0ID0gJC5nZXQoYWpheF9wcm9jZXNzaW5nX3VybCwgZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCByZXF1ZXN0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxhc3RfYWpheF9yZXF1ZXN0ID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAvKiBzY3JvbGwgKi9cclxuICAgICAgICAgICAgICAgIHNlbGYuc2Nyb2xsUmVzdWx0cygpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vdXBkYXRlcyB0aGUgcmVzdXRscyAmIGZvcm0gaHRtbFxyXG4gICAgICAgICAgICAgICAgc2VsZi51cGRhdGVSZXN1bHRzKGRhdGEsIGRhdGFfdHlwZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLyogdXBkYXRlIFVSTCAqL1xyXG4gICAgICAgICAgICAgICAgLy91cGRhdGUgdXJsIGJlZm9yZSBwYWdpbmF0aW9uLCBiZWNhdXNlIHdlIG5lZWQgdG8gZG8gc29tZSBjaGVja3MgYWdhaW5zIHRoZSBVUkwgZm9yIGluZmluaXRlIHNjcm9sbFxyXG4gICAgICAgICAgICAgICAgc2VsZi51cGRhdGVVcmxIaXN0b3J5KGFqYXhfcmVzdWx0c191cmwpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vc2V0dXAgcGFnaW5hdGlvblxyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXR1cEFqYXhQYWdpbmF0aW9uKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLmlzU3VibWl0dGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8qIHVzZXIgZGVmICovXHJcbiAgICAgICAgICAgICAgICBzZWxmLmluaXRXb29Db21tZXJjZUNvbnRyb2xzKCk7IC8vd29vY29tbWVyY2Ugb3JkZXJieVxyXG5cclxuXHJcbiAgICAgICAgICAgIH0sIGRhdGFfdHlwZSkuZmFpbChmdW5jdGlvbihqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge307XHJcbiAgICAgICAgICAgICAgICBkYXRhLnNmaWQgPSBzZWxmLnNmaWQ7XHJcbiAgICAgICAgICAgICAgICBkYXRhLnRhcmdldFNlbGVjdG9yID0gc2VsZi5hamF4X3RhcmdldF9hdHRyO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5vYmplY3QgPSBzZWxmO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5hamF4VVJMID0gYWpheF9wcm9jZXNzaW5nX3VybDtcclxuICAgICAgICAgICAgICAgIGRhdGEuanFYSFIgPSBqcVhIUjtcclxuICAgICAgICAgICAgICAgIGRhdGEudGV4dFN0YXR1cyA9IHRleHRTdGF0dXM7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmVycm9yVGhyb3duID0gZXJyb3JUaHJvd247XHJcbiAgICAgICAgICAgICAgICBzZWxmLmlzU3VibWl0dGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi50cmlnZ2VyRXZlbnQoXCJzZjphamF4ZXJyb3JcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAvKmNvbnNvbGUubG9nKFwiQUpBWCBGQUlMXCIpO1xyXG4gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHgpOyovXHJcblxyXG4gICAgICAgICAgICB9KS5hbHdheXMoZnVuY3Rpb24oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLiRhamF4X3Jlc3VsdHNfY29udGFpbmVyLnN0b3AodHJ1ZSx0cnVlKS5hbmltYXRlKHsgb3BhY2l0eTogMX0sIFwiZmFzdFwiKTsgLy9maW5pc2hlZCBsb2FkaW5nXHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgZGF0YS5zZmlkID0gc2VsZi5zZmlkO1xyXG4gICAgICAgICAgICAgICAgZGF0YS50YXJnZXRTZWxlY3RvciA9IHNlbGYuYWpheF90YXJnZXRfYXR0cjtcclxuICAgICAgICAgICAgICAgIGRhdGEub2JqZWN0ID0gc2VsZjtcclxuICAgICAgICAgICAgICAgICR0aGlzLnJlbW92ZUNsYXNzKFwic2VhcmNoLWZpbHRlci1kaXNhYmxlZFwiKTtcclxuICAgICAgICAgICAgICAgIHByb2Nlc3NfZm9ybS5lbmFibGVJbnB1dHMoc2VsZik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9yZWZvY3VzIHRoZSBsYXN0IGFjdGl2ZSB0ZXh0IGZpZWxkXHJcbiAgICAgICAgICAgICAgICBpZihsYXN0X2FjdGl2ZV9pbnB1dF90ZXh0IT1cIlwiKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciAkaW5wdXQgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLiRmaWVsZHMuZWFjaChmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRhY3RpdmVfaW5wdXQgPSAkKHRoaXMpLmZpbmQoXCJpbnB1dFtuYW1lPSdcIitsYXN0X2FjdGl2ZV9pbnB1dF90ZXh0K1wiJ11cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCRhY3RpdmVfaW5wdXQubGVuZ3RoPT0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQgPSAkYWN0aXZlX2lucHV0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCRpbnB1dC5sZW5ndGg9PTEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC5mb2N1cygpLnZhbCgkaW5wdXQudmFsKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZvY3VzQ2FtcG8oJGlucHV0WzBdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJHRoaXMuZmluZChcImlucHV0W25hbWU9J19zZl9zZWFyY2gnXVwiKS5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi50cmlnZ2VyRXZlbnQoXCJzZjphamF4ZmluaXNoXCIsICBkYXRhICk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmZvY3VzQ2FtcG8gPSBmdW5jdGlvbihpbnB1dEZpZWxkKXtcclxuICAgICAgICAgICAgLy92YXIgaW5wdXRGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuICAgICAgICAgICAgaWYgKGlucHV0RmllbGQgIT0gbnVsbCAmJiBpbnB1dEZpZWxkLnZhbHVlLmxlbmd0aCAhPSAwKXtcclxuICAgICAgICAgICAgICAgIGlmIChpbnB1dEZpZWxkLmNyZWF0ZVRleHRSYW5nZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIEZpZWxkUmFuZ2UgPSBpbnB1dEZpZWxkLmNyZWF0ZVRleHRSYW5nZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIEZpZWxkUmFuZ2UubW92ZVN0YXJ0KCdjaGFyYWN0ZXInLGlucHV0RmllbGQudmFsdWUubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICBGaWVsZFJhbmdlLmNvbGxhcHNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgRmllbGRSYW5nZS5zZWxlY3QoKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmIChpbnB1dEZpZWxkLnNlbGVjdGlvblN0YXJ0IHx8IGlucHV0RmllbGQuc2VsZWN0aW9uU3RhcnQgPT0gJzAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1MZW4gPSBpbnB1dEZpZWxkLnZhbHVlLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dEZpZWxkLnNlbGVjdGlvblN0YXJ0ID0gZWxlbUxlbjtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dEZpZWxkLnNlbGVjdGlvbkVuZCA9IGVsZW1MZW47XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRGaWVsZC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlucHV0RmllbGQuZm9jdXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQgPSBmdW5jdGlvbihldmVudG5hbWUsIGRhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgJGV2ZW50X2NvbnRhaW5lciA9ICQoXCIuc2VhcmNoYW5kZmlsdGVyW2RhdGEtc2YtZm9ybS1pZD0nXCIrc2VsZi5zZmlkK1wiJ11cIik7XHJcbiAgICAgICAgICAgICRldmVudF9jb250YWluZXIudHJpZ2dlcihldmVudG5hbWUsIFsgZGF0YSBdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZmV0Y2hBamF4Rm9ybSA9IGZ1bmN0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vdHJpZ2dlciBzdGFydCBldmVudFxyXG4gICAgICAgICAgICB2YXIgZXZlbnRfZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIHNmaWQ6IHNlbGYuc2ZpZCxcclxuICAgICAgICAgICAgICAgIHRhcmdldFNlbGVjdG9yOiBzZWxmLmFqYXhfdGFyZ2V0X2F0dHIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcImZvcm1cIixcclxuICAgICAgICAgICAgICAgIG9iamVjdDogc2VsZlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgc2VsZi50cmlnZ2VyRXZlbnQoXCJzZjphamF4Zm9ybXN0YXJ0XCIsIFsgZXZlbnRfZGF0YSBdKTtcclxuXHJcbiAgICAgICAgICAgICR0aGlzLmFkZENsYXNzKFwic2VhcmNoLWZpbHRlci1kaXNhYmxlZFwiKTtcclxuICAgICAgICAgICAgcHJvY2Vzc19mb3JtLmRpc2FibGVJbnB1dHMoc2VsZik7XHJcblxyXG4gICAgICAgICAgICB2YXIgcXVlcnlfcGFyYW1zID0gc2VsZi5nZXRVcmxQYXJhbXMoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHNlbGYubGFuZ19jb2RlIT1cIlwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL3NvIGFkZCBpdFxyXG4gICAgICAgICAgICAgICAgcXVlcnlfcGFyYW1zID0gc2VsZi5qb2luVXJsUGFyYW0ocXVlcnlfcGFyYW1zLCBcImxhbmc9XCIrc2VsZi5sYW5nX2NvZGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgYWpheF9wcm9jZXNzaW5nX3VybCA9IHNlbGYuYWRkVXJsUGFyYW0oc2VsZi5hamF4X2Zvcm1fdXJsLCBxdWVyeV9wYXJhbXMpO1xyXG4gICAgICAgICAgICB2YXIgZGF0YV90eXBlID0gXCJqc29uXCI7XHJcblxyXG5cclxuICAgICAgICAgICAgLy9hYm9ydCBhbnkgcHJldmlvdXMgYWpheCByZXF1ZXN0c1xyXG4gICAgICAgICAgICAvKmlmKHNlbGYubGFzdF9hamF4X3JlcXVlc3QpXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICBzZWxmLmxhc3RfYWpheF9yZXF1ZXN0LmFib3J0KCk7XHJcbiAgICAgICAgICAgICB9Ki9cclxuXHJcblxyXG4gICAgICAgICAgICAvL3NlbGYubGFzdF9hamF4X3JlcXVlc3QgPVxyXG5cclxuICAgICAgICAgICAgJC5nZXQoYWpheF9wcm9jZXNzaW5nX3VybCwgZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCByZXF1ZXN0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL3NlbGYubGFzdF9hamF4X3JlcXVlc3QgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vdXBkYXRlcyB0aGUgcmVzdXRscyAmIGZvcm0gaHRtbFxyXG4gICAgICAgICAgICAgICAgc2VsZi51cGRhdGVGb3JtKGRhdGEsIGRhdGFfdHlwZSk7XHJcblxyXG5cclxuICAgICAgICAgICAgfSwgZGF0YV90eXBlKS5mYWlsKGZ1bmN0aW9uKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB7fTtcclxuICAgICAgICAgICAgICAgIGRhdGEuc2ZpZCA9IHNlbGYuc2ZpZDtcclxuICAgICAgICAgICAgICAgIGRhdGEudGFyZ2V0U2VsZWN0b3IgPSBzZWxmLmFqYXhfdGFyZ2V0X2F0dHI7XHJcbiAgICAgICAgICAgICAgICBkYXRhLm9iamVjdCA9IHNlbGY7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmFqYXhVUkwgPSBhamF4X3Byb2Nlc3NpbmdfdXJsO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5qcVhIUiA9IGpxWEhSO1xyXG4gICAgICAgICAgICAgICAgZGF0YS50ZXh0U3RhdHVzID0gdGV4dFN0YXR1cztcclxuICAgICAgICAgICAgICAgIGRhdGEuZXJyb3JUaHJvd24gPSBlcnJvclRocm93bjtcclxuICAgICAgICAgICAgICAgIHNlbGYudHJpZ2dlckV2ZW50KFwic2Y6YWpheGVycm9yXCIsIFsgZGF0YSBdKTtcclxuXHJcbiAgICAgICAgICAgIH0pLmFsd2F5cyhmdW5jdGlvbigpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge307XHJcbiAgICAgICAgICAgICAgICBkYXRhLnNmaWQgPSBzZWxmLnNmaWQ7XHJcbiAgICAgICAgICAgICAgICBkYXRhLnRhcmdldFNlbGVjdG9yID0gc2VsZi5hamF4X3RhcmdldF9hdHRyO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5vYmplY3QgPSBzZWxmO1xyXG5cclxuICAgICAgICAgICAgICAgICR0aGlzLnJlbW92ZUNsYXNzKFwic2VhcmNoLWZpbHRlci1kaXNhYmxlZFwiKTtcclxuICAgICAgICAgICAgICAgIHByb2Nlc3NfZm9ybS5lbmFibGVJbnB1dHMoc2VsZik7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi50cmlnZ2VyRXZlbnQoXCJzZjphamF4Zm9ybWZpbmlzaFwiLCBbIGRhdGEgXSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuY29weUxpc3RJdGVtc0NvbnRlbnRzID0gZnVuY3Rpb24oJGxpc3RfZnJvbSwgJGxpc3RfdG8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvL2NvcHkgb3ZlciBjaGlsZCBsaXN0IGl0ZW1zXHJcbiAgICAgICAgICAgIHZhciBsaV9jb250ZW50c19hcnJheSA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICB2YXIgZnJvbV9hdHRyaWJ1dGVzID0gbmV3IEFycmF5KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgJGZyb21fZmllbGRzID0gJGxpc3RfZnJvbS5maW5kKFwiPiB1bCA+IGxpXCIpO1xyXG5cclxuICAgICAgICAgICAgJGZyb21fZmllbGRzLmVhY2goZnVuY3Rpb24oaSl7XHJcblxyXG4gICAgICAgICAgICAgICAgbGlfY29udGVudHNfYXJyYXkucHVzaCgkKHRoaXMpLmh0bWwoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSAkKHRoaXMpLnByb3AoXCJhdHRyaWJ1dGVzXCIpO1xyXG4gICAgICAgICAgICAgICAgZnJvbV9hdHRyaWJ1dGVzLnB1c2goYXR0cmlidXRlcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy92YXIgZmllbGRfbmFtZSA9ICQodGhpcykuYXR0cihcImRhdGEtc2YtZmllbGQtbmFtZVwiKTtcclxuICAgICAgICAgICAgICAgIC8vdmFyIHRvX2ZpZWxkID0gJGxpc3RfdG8uZmluZChcIj4gdWwgPiBsaVtkYXRhLXNmLWZpZWxkLW5hbWU9J1wiK2ZpZWxkX25hbWUrXCInXVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3NlbGYuY29weUF0dHJpYnV0ZXMoJCh0aGlzKSwgJGxpc3RfdG8sIFwiZGF0YS1zZi1cIik7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBsaV9pdCA9IDA7XHJcbiAgICAgICAgICAgIHZhciAkdG9fZmllbGRzID0gJGxpc3RfdG8uZmluZChcIj4gdWwgPiBsaVwiKTtcclxuICAgICAgICAgICAgJHRvX2ZpZWxkcy5lYWNoKGZ1bmN0aW9uKGkpe1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5odG1sKGxpX2NvbnRlbnRzX2FycmF5W2xpX2l0XSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyICRmcm9tX2ZpZWxkID0gJCgkZnJvbV9maWVsZHMuZ2V0KGxpX2l0KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyICR0b19maWVsZCA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAkdG9fZmllbGQucmVtb3ZlQXR0cihcImRhdGEtc2YtdGF4b25vbXktYXJjaGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuY29weUF0dHJpYnV0ZXMoJGZyb21fZmllbGQsICR0b19maWVsZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGlfaXQrKztcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvKnZhciAkZnJvbV9maWVsZHMgPSAkbGlzdF9mcm9tLmZpbmQoXCIgdWwgPiBsaVwiKTtcclxuICAgICAgICAgICAgIHZhciAkdG9fZmllbGRzID0gJGxpc3RfdG8uZmluZChcIiA+IGxpXCIpO1xyXG4gICAgICAgICAgICAgJGZyb21fZmllbGRzLmVhY2goZnVuY3Rpb24oaW5kZXgsIHZhbCl7XHJcbiAgICAgICAgICAgICBpZigkKHRoaXMpLmhhc0F0dHJpYnV0ZShcImRhdGEtc2YtdGF4b25vbXktYXJjaGl2ZVwiKSlcclxuICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICB0aGlzLmNvcHlBdHRyaWJ1dGVzKCRsaXN0X2Zyb20sICRsaXN0X3RvKTsqL1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVGb3JtQXR0cmlidXRlcyA9IGZ1bmN0aW9uKCRsaXN0X2Zyb20sICRsaXN0X3RvKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGZyb21fYXR0cmlidXRlcyA9ICRsaXN0X2Zyb20ucHJvcChcImF0dHJpYnV0ZXNcIik7XHJcbiAgICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCA8c2VsZWN0PiBhdHRyaWJ1dGVzIGFuZCBhcHBseSB0aGVtIG9uIDxkaXY+XHJcblxyXG4gICAgICAgICAgICB2YXIgdG9fYXR0cmlidXRlcyA9ICRsaXN0X3RvLnByb3AoXCJhdHRyaWJ1dGVzXCIpO1xyXG4gICAgICAgICAgICAkLmVhY2godG9fYXR0cmlidXRlcywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkbGlzdF90by5yZW1vdmVBdHRyKHRoaXMubmFtZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJC5lYWNoKGZyb21fYXR0cmlidXRlcywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkbGlzdF90by5hdHRyKHRoaXMubmFtZSwgdGhpcy52YWx1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY29weUF0dHJpYnV0ZXMgPSBmdW5jdGlvbigkZnJvbSwgJHRvLCBwcmVmaXgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0eXBlb2YocHJlZml4KT09XCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHByZWZpeCA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBmcm9tX2F0dHJpYnV0ZXMgPSAkZnJvbS5wcm9wKFwiYXR0cmlidXRlc1wiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0b19hdHRyaWJ1dGVzID0gJHRvLnByb3AoXCJhdHRyaWJ1dGVzXCIpO1xyXG4gICAgICAgICAgICAkLmVhY2godG9fYXR0cmlidXRlcywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYocHJlZml4IT1cIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubmFtZS5pbmRleE9mKHByZWZpeCkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkdG8ucmVtb3ZlQXR0cih0aGlzLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyR0by5yZW1vdmVBdHRyKHRoaXMubmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJC5lYWNoKGZyb21fYXR0cmlidXRlcywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkdG8uYXR0cih0aGlzLm5hbWUsIHRoaXMudmFsdWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY29weUZvcm1BdHRyaWJ1dGVzID0gZnVuY3Rpb24oJGZyb20sICR0bylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICR0by5yZW1vdmVBdHRyKFwiZGF0YS1jdXJyZW50LXRheG9ub215LWFyY2hpdmVcIik7XHJcbiAgICAgICAgICAgIHRoaXMuY29weUF0dHJpYnV0ZXMoJGZyb20sICR0byk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVGb3JtID0gZnVuY3Rpb24oZGF0YSwgZGF0YV90eXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYoZGF0YV90eXBlPT1cImpzb25cIilcclxuICAgICAgICAgICAgey8vdGhlbiB3ZSBkaWQgYSByZXF1ZXN0IHRvIHRoZSBhamF4IGVuZHBvaW50LCBzbyBleHBlY3QgYW4gb2JqZWN0IGJhY2tcclxuXHJcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YoZGF0YVsnZm9ybSddKSE9PVwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9yZW1vdmUgYWxsIGV2ZW50cyBmcm9tIFMmRiBmb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgJHRoaXMub2ZmKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vcmVmcmVzaCB0aGUgZm9ybSAoYXV0byBjb3VudClcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvcHlMaXN0SXRlbXNDb250ZW50cygkKGRhdGFbJ2Zvcm0nXSksICR0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9yZSBpbml0IFMmRiBjbGFzcyBvbiB0aGUgZm9ybVxyXG4gICAgICAgICAgICAgICAgICAgIC8vJHRoaXMuc2VhcmNoQW5kRmlsdGVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgYWpheCBpcyBlbmFibGVkIGluaXQgdGhlIHBhZ2luYXRpb25cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0KHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmlzX2FqYXg9PTEpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldHVwQWpheFBhZ2luYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkZFJlc3VsdHMgPSBmdW5jdGlvbihkYXRhLCBkYXRhX3R5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBpZihkYXRhX3R5cGU9PVwianNvblwiKVxyXG4gICAgICAgICAgICB7Ly90aGVuIHdlIGRpZCBhIHJlcXVlc3QgdG8gdGhlIGFqYXggZW5kcG9pbnQsIHNvIGV4cGVjdCBhbiBvYmplY3QgYmFja1xyXG4gICAgICAgICAgICAgICAgLy9ncmFiIHRoZSByZXN1bHRzIGFuZCBsb2FkIGluXHJcbiAgICAgICAgICAgICAgICAvL3NlbGYuJGFqYXhfcmVzdWx0c19jb250YWluZXIuYXBwZW5kKGRhdGFbJ3Jlc3VsdHMnXSk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYWRfbW9yZV9odG1sID0gZGF0YVsncmVzdWx0cyddO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoZGF0YV90eXBlPT1cImh0bWxcIilcclxuICAgICAgICAgICAgey8vd2UgYXJlIGV4cGVjdGluZyB0aGUgaHRtbCBvZiB0aGUgcmVzdWx0cyBwYWdlIGJhY2ssIHNvIGV4dHJhY3QgdGhlIGh0bWwgd2UgbmVlZFxyXG5cclxuICAgICAgICAgICAgICAgIHZhciAkZGF0YV9vYmogPSAkKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vc2VsZi4kaW5maW5pdGVfc2Nyb2xsX2NvbnRhaW5lci5hcHBlbmQoJGRhdGFfb2JqLmZpbmQoc2VsZi5hamF4X3RhcmdldF9hdHRyKS5odG1sKCkpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sb2FkX21vcmVfaHRtbCA9ICRkYXRhX29iai5maW5kKHNlbGYuYWpheF90YXJnZXRfYXR0cikuaHRtbCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgaW5maW5pdGVfc2Nyb2xsX2VuZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYoJChcIjxkaXY+XCIrc2VsZi5sb2FkX21vcmVfaHRtbCtcIjwvZGl2PlwiKS5maW5kKFwiW2RhdGEtc2VhcmNoLWZpbHRlci1hY3Rpb249J2luZmluaXRlLXNjcm9sbC1lbmQnXVwiKS5sZW5ndGg+MClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW5maW5pdGVfc2Nyb2xsX2VuZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vaWYgdGhlcmUgaXMgYW5vdGhlciBzZWxlY3RvciBmb3IgaW5maW5pdGUgc2Nyb2xsLCBmaW5kIHRoZSBjb250ZW50cyBvZiB0aGF0IGluc3RlYWRcclxuICAgICAgICAgICAgaWYoc2VsZi5pbmZpbml0ZV9zY3JvbGxfY29udGFpbmVyIT1cIlwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYWRfbW9yZV9odG1sID0gJChcIjxkaXY+XCIrc2VsZi5sb2FkX21vcmVfaHRtbCtcIjwvZGl2PlwiKS5maW5kKHNlbGYuaW5maW5pdGVfc2Nyb2xsX2NvbnRhaW5lcikuaHRtbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHNlbGYuaW5maW5pdGVfc2Nyb2xsX3Jlc3VsdF9jbGFzcyE9XCJcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyICRyZXN1bHRfaXRlbXMgPSAkKFwiPGRpdj5cIitzZWxmLmxvYWRfbW9yZV9odG1sK1wiPC9kaXY+XCIpLmZpbmQoc2VsZi5pbmZpbml0ZV9zY3JvbGxfcmVzdWx0X2NsYXNzKTtcclxuICAgICAgICAgICAgICAgIHZhciAkcmVzdWx0X2l0ZW1zX2NvbnRhaW5lciA9ICQoJzxkaXYvPicsIHt9KTtcclxuICAgICAgICAgICAgICAgICRyZXN1bHRfaXRlbXNfY29udGFpbmVyLmFwcGVuZCgkcmVzdWx0X2l0ZW1zKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYWRfbW9yZV9odG1sID0gJHJlc3VsdF9pdGVtc19jb250YWluZXIuaHRtbCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihpbmZpbml0ZV9zY3JvbGxfZW5kKVxyXG4gICAgICAgICAgICB7Ly93ZSBmb3VuZCBhIGRhdGEgYXR0cmlidXRlIHNpZ25hbGxpbmcgdGhlIGxhc3QgcGFnZSBzbyBmaW5pc2ggaGVyZVxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuaXNfbWF4X3BhZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNlbGYubGFzdF9sb2FkX21vcmVfaHRtbCA9IHNlbGYubG9hZF9tb3JlX2h0bWw7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5pbmZpbml0ZVNjcm9sbEFwcGVuZChzZWxmLmxvYWRfbW9yZV9odG1sKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihzZWxmLmxhc3RfbG9hZF9tb3JlX2h0bWwhPT1zZWxmLmxvYWRfbW9yZV9odG1sKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL2NoZWNrIHRvIG1ha2Ugc3VyZSB0aGUgbmV3IGh0bWwgZmV0Y2hlZCBpcyBkaWZmZXJlbnRcclxuICAgICAgICAgICAgICAgIHNlbGYubGFzdF9sb2FkX21vcmVfaHRtbCA9IHNlbGYubG9hZF9tb3JlX2h0bWw7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmluZmluaXRlU2Nyb2xsQXBwZW5kKHNlbGYubG9hZF9tb3JlX2h0bWwpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHsvL3dlIHJlY2VpdmVkIHRoZSBzYW1lIG1lc3NhZ2UgYWdhaW4gc28gZG9uJ3QgYWRkLCBhbmQgdGVsbCBTJkYgdGhhdCB3ZSdyZSBhdCB0aGUgZW5kLi5cclxuICAgICAgICAgICAgICAgIHNlbGYuaXNfbWF4X3BhZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHRoaXMuaW5maW5pdGVTY3JvbGxBcHBlbmQgPSBmdW5jdGlvbigkb2JqZWN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoc2VsZi5pbmZpbml0ZV9zY3JvbGxfcmVzdWx0X2NsYXNzIT1cIlwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLiRpbmZpbml0ZV9zY3JvbGxfY29udGFpbmVyLmZpbmQoc2VsZi5pbmZpbml0ZV9zY3JvbGxfcmVzdWx0X2NsYXNzKS5sYXN0KCkuYWZ0ZXIoJG9iamVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIHNlbGYuJGluZmluaXRlX3Njcm9sbF9jb250YWluZXIuYXBwZW5kKCRvYmplY3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVSZXN1bHRzID0gZnVuY3Rpb24oZGF0YSwgZGF0YV90eXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYoZGF0YV90eXBlPT1cImpzb25cIilcclxuICAgICAgICAgICAgey8vdGhlbiB3ZSBkaWQgYSByZXF1ZXN0IHRvIHRoZSBhamF4IGVuZHBvaW50LCBzbyBleHBlY3QgYW4gb2JqZWN0IGJhY2tcclxuICAgICAgICAgICAgICAgIC8vZ3JhYiB0aGUgcmVzdWx0cyBhbmQgbG9hZCBpblxyXG4gICAgICAgICAgICAgICAgc2VsZi4kYWpheF9yZXN1bHRzX2NvbnRhaW5lci5odG1sKGRhdGFbJ3Jlc3VsdHMnXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodHlwZW9mKGRhdGFbJ2Zvcm0nXSkhPT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcmVtb3ZlIGFsbCBldmVudHMgZnJvbSBTJkYgZm9ybVxyXG4gICAgICAgICAgICAgICAgICAgICR0aGlzLm9mZigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3JlbW92ZSBwYWdpbmF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5yZW1vdmVBamF4UGFnaW5hdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3JlZnJlc2ggdGhlIGZvcm0gKGF1dG8gY291bnQpXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jb3B5TGlzdEl0ZW1zQ29udGVudHMoJChkYXRhWydmb3JtJ10pLCAkdGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vdXBkYXRlIGF0dHJpYnV0ZXMgb24gZm9ybVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29weUZvcm1BdHRyaWJ1dGVzKCQoZGF0YVsnZm9ybSddKSwgJHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3JlIGluaXQgUyZGIGNsYXNzIG9uIHRoZSBmb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgJHRoaXMuc2VhcmNoQW5kRmlsdGVyKHsnaXNJbml0JzogZmFsc2V9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyR0aGlzLmZpbmQoXCJpbnB1dFwiKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihkYXRhX3R5cGU9PVwiaHRtbFwiKSB7Ly93ZSBhcmUgZXhwZWN0aW5nIHRoZSBodG1sIG9mIHRoZSByZXN1bHRzIHBhZ2UgYmFjaywgc28gZXh0cmFjdCB0aGUgaHRtbCB3ZSBuZWVkXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyICRkYXRhX29iaiA9ICQoZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi4kYWpheF9yZXN1bHRzX2NvbnRhaW5lci5odG1sKCRkYXRhX29iai5maW5kKHNlbGYuYWpheF90YXJnZXRfYXR0cikuaHRtbCgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi4kYWpheF9yZXN1bHRzX2NvbnRhaW5lci5maW5kKFwiLnNlYXJjaGFuZGZpbHRlclwiKS5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgey8vdGhlbiB0aGVyZSBhcmUgc2VhcmNoIGZvcm0ocykgaW5zaWRlIHRoZSByZXN1bHRzIGNvbnRhaW5lciwgc28gcmUtaW5pdCB0aGVtXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGFqYXhfcmVzdWx0c19jb250YWluZXIuZmluZChcIi5zZWFyY2hhbmRmaWx0ZXJcIikuc2VhcmNoQW5kRmlsdGVyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9pZiB0aGUgY3VycmVudCBzZWFyY2ggZm9ybSBpcyBub3QgaW5zaWRlIHRoZSByZXN1bHRzIGNvbnRhaW5lciwgdGhlbiBwcm9jZWVkIGFzIG5vcm1hbCBhbmQgdXBkYXRlIHRoZSBmb3JtXHJcbiAgICAgICAgICAgICAgICBpZihzZWxmLiRhamF4X3Jlc3VsdHNfY29udGFpbmVyLmZpbmQoXCIuc2VhcmNoYW5kZmlsdGVyW2RhdGEtc2YtZm9ybS1pZD0nXCIgKyBzZWxmLnNmaWQgKyBcIiddXCIpLmxlbmd0aD09MCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgJG5ld19zZWFyY2hfZm9ybSA9ICRkYXRhX29iai5maW5kKFwiLnNlYXJjaGFuZGZpbHRlcltkYXRhLXNmLWZvcm0taWQ9J1wiICsgc2VsZi5zZmlkICsgXCInXVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRuZXdfc2VhcmNoX2Zvcm0ubGVuZ3RoID09IDEpIHsvL3RoZW4gcmVwbGFjZSB0aGUgc2VhcmNoIGZvcm0gd2l0aCB0aGUgbmV3IG9uZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZW1vdmUgYWxsIGV2ZW50cyBmcm9tIFMmRiBmb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLm9mZigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZW1vdmUgcGFnaW5hdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlbW92ZUFqYXhQYWdpbmF0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JlZnJlc2ggdGhlIGZvcm0gKGF1dG8gY291bnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY29weUxpc3RJdGVtc0NvbnRlbnRzKCRuZXdfc2VhcmNoX2Zvcm0sICR0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdXBkYXRlIGF0dHJpYnV0ZXMgb24gZm9ybVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNvcHlGb3JtQXR0cmlidXRlcygkbmV3X3NlYXJjaF9mb3JtLCAkdGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JlIGluaXQgUyZGIGNsYXNzIG9uIHRoZSBmb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLnNlYXJjaEFuZEZpbHRlcih7J2lzSW5pdCc6IGZhbHNlfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vJHRoaXMuZmluZChcImlucHV0XCIpLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNlbGYuaXNfbWF4X3BhZ2VkID0gZmFsc2U7IC8vZm9yIGluZmluaXRlIHNjcm9sbFxyXG4gICAgICAgICAgICBzZWxmLmN1cnJlbnRfcGFnZWQgPSAxOyAvL2ZvciBpbmZpbml0ZSBzY3JvbGxcclxuICAgICAgICAgICAgc2VsZi5zZXRJbmZpbml0ZVNjcm9sbENvbnRhaW5lcigpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucmVtb3ZlV29vQ29tbWVyY2VDb250cm9scyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciAkd29vX29yZGVyYnkgPSAkKCcud29vY29tbWVyY2Utb3JkZXJpbmcgLm9yZGVyYnknKTtcclxuICAgICAgICAgICAgdmFyICR3b29fb3JkZXJieV9mb3JtID0gJCgnLndvb2NvbW1lcmNlLW9yZGVyaW5nJyk7XHJcblxyXG4gICAgICAgICAgICAkd29vX29yZGVyYnlfZm9ybS5vZmYoKTtcclxuICAgICAgICAgICAgJHdvb19vcmRlcmJ5Lm9mZigpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuYWRkUXVlcnlQYXJhbSA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlLCB1cmxfdHlwZSl7XHJcblxyXG4gICAgICAgICAgICBpZih0eXBlb2YodXJsX3R5cGUpPT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdXJsX3R5cGUgPSBcImFsbFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYuZXh0cmFfcXVlcnlfcGFyYW1zW3VybF90eXBlXVtuYW1lXSA9IHZhbHVlO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmluaXRXb29Db21tZXJjZUNvbnRyb2xzID0gZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgIHNlbGYucmVtb3ZlV29vQ29tbWVyY2VDb250cm9scygpO1xyXG5cclxuICAgICAgICAgICAgdmFyICR3b29fb3JkZXJieSA9ICQoJy53b29jb21tZXJjZS1vcmRlcmluZyAub3JkZXJieScpO1xyXG4gICAgICAgICAgICB2YXIgJHdvb19vcmRlcmJ5X2Zvcm0gPSAkKCcud29vY29tbWVyY2Utb3JkZXJpbmcnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBvcmRlcl92YWwgPSBcIlwiO1xyXG4gICAgICAgICAgICBpZigkd29vX29yZGVyYnkubGVuZ3RoPjApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9yZGVyX3ZhbCA9ICR3b29fb3JkZXJieS52YWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9yZGVyX3ZhbCA9IHNlbGYuZ2V0UXVlcnlQYXJhbUZyb21VUkwoXCJvcmRlcmJ5XCIsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYob3JkZXJfdmFsPT1cIm1lbnVfb3JkZXJcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3JkZXJfdmFsID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoKG9yZGVyX3ZhbCE9XCJcIikmJighIW9yZGVyX3ZhbCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuZXh0cmFfcXVlcnlfcGFyYW1zLmFsbC5vcmRlcmJ5ID0gb3JkZXJfdmFsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgJHdvb19vcmRlcmJ5X2Zvcm0ub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIC8vdmFyIGZvcm0gPSBlLnRhcmdldDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkd29vX29yZGVyYnkub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24oZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgaWYodmFsPT1cIm1lbnVfb3JkZXJcIilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWwgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuZXh0cmFfcXVlcnlfcGFyYW1zLmFsbC5vcmRlcmJ5ID0gdmFsO1xyXG5cclxuICAgICAgICAgICAgICAgICR0aGlzLnN1Ym1pdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zY3JvbGxSZXN1bHRzID0gZnVuY3Rpb24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYoKHNlbGYuc2Nyb2xsX29uX2FjdGlvbj09c2VsZi5hamF4X2FjdGlvbil8fChzZWxmLnNjcm9sbF9vbl9hY3Rpb249PVwiYWxsXCIpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNjcm9sbFRvUG9zKCk7IC8vc2Nyb2xsIHRoZSB3aW5kb3cgaWYgaXQgaGFzIGJlZW4gc2V0XHJcbiAgICAgICAgICAgICAgICAvL3NlbGYuYWpheF9hY3Rpb24gPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVVybEhpc3RvcnkgPSBmdW5jdGlvbihhamF4X3Jlc3VsdHNfdXJsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIHVzZV9oaXN0b3J5X2FwaSA9IDA7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuaGlzdG9yeSAmJiB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHVzZV9oaXN0b3J5X2FwaSA9ICR0aGlzLmF0dHIoXCJkYXRhLXVzZS1oaXN0b3J5LWFwaVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoKHNlbGYudXBkYXRlX2FqYXhfdXJsPT0xKSYmKHVzZV9oaXN0b3J5X2FwaT09MSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vbm93IGNoZWNrIGlmIHRoZSBicm93c2VyIHN1cHBvcnRzIGhpc3Rvcnkgc3RhdGUgcHVzaCA6KVxyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5oaXN0b3J5ICYmIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCBhamF4X3Jlc3VsdHNfdXJsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbW92ZUFqYXhQYWdpbmF0aW9uID0gZnVuY3Rpb24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYodHlwZW9mKHNlbGYuYWpheF9saW5rc19zZWxlY3RvcikhPVwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciAkYWpheF9saW5rc19vYmplY3QgPSBqUXVlcnkoc2VsZi5hamF4X2xpbmtzX3NlbGVjdG9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZigkYWpheF9saW5rc19vYmplY3QubGVuZ3RoPjApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGFqYXhfbGlua3Nfb2JqZWN0Lm9mZigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNhbkZldGNoQWpheFJlc3VsdHMgPSBmdW5jdGlvbihmZXRjaF90eXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodHlwZW9mKGZldGNoX3R5cGUpPT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmV0Y2hfdHlwZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGZldGNoX2FqYXhfcmVzdWx0cyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYoc2VsZi5pc19hamF4PT0xKVxyXG4gICAgICAgICAgICB7Ly90aGVuIHdlIHdpbGwgYWpheCBzdWJtaXQgdGhlIGZvcm1cclxuXHJcbiAgICAgICAgICAgICAgICAvL2FuZCBpZiB3ZSBjYW4gZmluZCB0aGUgcmVzdWx0cyBjb250YWluZXJcclxuICAgICAgICAgICAgICAgIGlmKHNlbGYuJGFqYXhfcmVzdWx0c19jb250YWluZXIubGVuZ3RoPT0xKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZldGNoX2FqYXhfcmVzdWx0cyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdHNfdXJsID0gc2VsZi5yZXN1bHRzX3VybDsgIC8vXHJcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudF91cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2lnbm9yZSAjIGFuZCBldmVyeXRoaW5nIGFmdGVyXHJcbiAgICAgICAgICAgICAgICB2YXIgaGFzaF9wb3MgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCcjJyk7XHJcbiAgICAgICAgICAgICAgICBpZihoYXNoX3BvcyE9PS0xKXtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50X3VybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnN1YnN0cigwLCB3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCcjJykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKCAoICggc2VsZi5kaXNwbGF5X3Jlc3VsdF9tZXRob2Q9PVwiY3VzdG9tX3dvb2NvbW1lcmNlX3N0b3JlXCIgKSB8fCAoIHNlbGYuZGlzcGxheV9yZXN1bHRfbWV0aG9kPT1cInBvc3RfdHlwZV9hcmNoaXZlXCIgKSApICYmICggc2VsZi5lbmFibGVfdGF4b25vbXlfYXJjaGl2ZXMgPT0gMSApIClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiggc2VsZi5jdXJyZW50X3RheG9ub215X2FyY2hpdmUgIT09XCJcIiApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmZXRjaF9hamF4X3Jlc3VsdHMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmV0Y2hfYWpheF9yZXN1bHRzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLyp2YXIgcmVzdWx0c191cmwgPSBwcm9jZXNzX2Zvcm0uZ2V0UmVzdWx0c1VybChzZWxmLCBzZWxmLnJlc3VsdHNfdXJsKTtcclxuICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGl2ZV90YXggPSBwcm9jZXNzX2Zvcm0uZ2V0QWN0aXZlVGF4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgIHZhciBxdWVyeV9wYXJhbXMgPSBzZWxmLmdldFVybFBhcmFtcyh0cnVlLCAnJywgYWN0aXZlX3RheCk7Ki9cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvL25vdyBzZWUgaWYgd2UgYXJlIG9uIHRoZSBVUkwgd2UgdGhpbmsuLi5cclxuICAgICAgICAgICAgICAgIHZhciB1cmxfcGFydHMgPSBjdXJyZW50X3VybC5zcGxpdChcIj9cIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgdXJsX2Jhc2UgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHVybF9wYXJ0cy5sZW5ndGg+MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmxfYmFzZSA9IHVybF9wYXJ0c1swXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybF9iYXNlID0gY3VycmVudF91cmw7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGxhbmcgPSBzZWxmLmdldFF1ZXJ5UGFyYW1Gcm9tVVJMKFwibGFuZ1wiLCB3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICAgICAgICAgICAgICBpZigodHlwZW9mKGxhbmcpIT09XCJ1bmRlZmluZWRcIikmJihsYW5nIT09bnVsbCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsX2Jhc2UgPSBzZWxmLmFkZFVybFBhcmFtKHVybF9iYXNlLCBcImxhbmc9XCIrbGFuZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHNmaWQgPSBzZWxmLmdldFF1ZXJ5UGFyYW1Gcm9tVVJMKFwic2ZpZFwiLCB3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9pZiBzZmlkIGlzIGEgbnVtYmVyXHJcbiAgICAgICAgICAgICAgICBpZihOdW1iZXIocGFyc2VGbG9hdChzZmlkKSkgPT0gc2ZpZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmxfYmFzZSA9IHNlbGYuYWRkVXJsUGFyYW0odXJsX2Jhc2UsIFwic2ZpZD1cIitzZmlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL2lmIGFueSBvZiB0aGUgMyBjb25kaXRpb25zIGFyZSB0cnVlLCB0aGVuIGl0cyBnb29kIHRvIGdvXHJcbiAgICAgICAgICAgICAgICAvLyAtIDEgfCBpZiB0aGUgdXJsIGJhc2UgPT0gcmVzdWx0c191cmxcclxuICAgICAgICAgICAgICAgIC8vIC0gMiB8IGlmIHVybCBiYXNlKyBcIi9cIiAgPT0gcmVzdWx0c191cmwgLSBpbiBjYXNlIG9mIHVzZXIgZXJyb3IgaW4gdGhlIHJlc3VsdHMgVVJMXHJcblxyXG4gICAgICAgICAgICAgICAgLy90cmltIGFueSB0cmFpbGluZyBzbGFzaCBmb3IgZWFzaWVyIGNvbXBhcmlzb246XHJcbiAgICAgICAgICAgICAgICB1cmxfYmFzZSA9IHVybF9iYXNlLnJlcGxhY2UoL1xcLyQvLCAnJyk7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRzX3VybCA9IHJlc3VsdHNfdXJsLnJlcGxhY2UoL1xcLyQvLCAnJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRfdXJsX2NvbnRhaW5zX3Jlc3VsdHNfdXJsID0gLTE7XHJcbiAgICAgICAgICAgICAgICBpZih1cmxfYmFzZT09cmVzdWx0c191cmwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudF91cmxfY29udGFpbnNfcmVzdWx0c191cmwgPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKHNlbGYub25seV9yZXN1bHRzX2FqYXg9PTEpXHJcbiAgICAgICAgICAgICAgICB7Ly9pZiBhIHVzZXIgaGFzIGNob3NlbiB0byBvbmx5IGFsbG93IGFqYXggb24gcmVzdWx0cyBwYWdlcyAoZGVmYXVsdCBiZWhhdmlvdXIpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCBjdXJyZW50X3VybF9jb250YWluc19yZXN1bHRzX3VybCA+IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHsvL3RoaXMgbWVhbnMgdGhlIGN1cnJlbnQgVVJMIGNvbnRhaW5zIHRoZSByZXN1bHRzIHVybCwgd2hpY2ggbWVhbnMgd2UgY2FuIGRvIGFqYXhcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2hfYWpheF9yZXN1bHRzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2hfYWpheF9yZXN1bHRzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGZldGNoX3R5cGU9PVwicGFnaW5hdGlvblwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIGN1cnJlbnRfdXJsX2NvbnRhaW5zX3Jlc3VsdHNfdXJsID4gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsvL3RoaXMgbWVhbnMgdGhlIGN1cnJlbnQgVVJMIGNvbnRhaW5zIHRoZSByZXN1bHRzIHVybCwgd2hpY2ggbWVhbnMgd2UgY2FuIGRvIGFqYXhcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2Rvbid0IGFqYXggcGFnaW5hdGlvbiB3aGVuIG5vdCBvbiBhIFMmRiBwYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZXRjaF9hamF4X3Jlc3VsdHMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZldGNoX2FqYXhfcmVzdWx0cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0dXBBamF4UGFnaW5hdGlvbiA9IGZ1bmN0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHR5cGVvZihzZWxmLmFqYXhfbGlua3Nfc2VsZWN0b3IpPT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vaW5maW5pdGUgc2Nyb2xsXHJcbiAgICAgICAgICAgIGlmKHRoaXMucGFnaW5hdGlvbl90eXBlPT09XCJpbmZpbml0ZV9zY3JvbGxcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYocGFyc2VJbnQodGhpcy5pbnN0YW5jZV9udW1iZXIpPT09MSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQod2luZG93KS5vZmYoXCJzY3JvbGxcIiwgc2VsZi5vbldpbmRvd1Njcm9sbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLmNhbkZldGNoQWpheFJlc3VsdHMoXCJwYWdpbmF0aW9uXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQod2luZG93KS5vbihcInNjcm9sbFwiLCBzZWxmLm9uV2luZG93U2Nyb2xsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vdmFyICRhamF4X2xpbmtzX29iamVjdCA9IGpRdWVyeShzZWxmLmFqYXhfbGlua3Nfc2VsZWN0b3IpO1xyXG5cclxuICAgICAgICAgICAgLy9pZigkYWpheF9saW5rc19vYmplY3QubGVuZ3RoPjApXHJcbiAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImluaXQgcGFnaW5hdGlvbiBzdHVmZlwiKTtcclxuICAgICAgICAgICAgICAgIC8vJGFqYXhfbGlua3Nfb2JqZWN0Lm9mZignY2xpY2snKTtcclxuICAgICAgICAgICAgICAgIC8vYWxlcnQoc2VsZi5hamF4X2xpbmtzX3NlbGVjdG9yKTtcclxuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm9mZignY2xpY2snLCBzZWxmLmFqYXhfbGlua3Nfc2VsZWN0b3IpO1xyXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgc2VsZi5hamF4X2xpbmtzX3NlbGVjdG9yLCBmdW5jdGlvbihlKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5jYW5GZXRjaEFqYXhSZXN1bHRzKFwicGFnaW5hdGlvblwiKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsaW5rID0galF1ZXJ5KHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hamF4X2FjdGlvbiA9IFwicGFnaW5hdGlvblwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhZ2VOdW1iZXIgPSBzZWxmLmdldFBhZ2VkRnJvbVVSTChsaW5rKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFqYXhfcmVzdWx0c19jb250YWluZXIuYXR0cihcImRhdGEtcGFnZWRcIiwgcGFnZU51bWJlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZldGNoQWpheFJlc3VsdHMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRQYWdlZEZyb21VUkwgPSBmdW5jdGlvbihVUkwpe1xyXG5cclxuICAgICAgICAgICAgdmFyIHBhZ2VkVmFsID0gMTtcclxuICAgICAgICAgICAgLy9maXJzdCB0ZXN0IHRvIHNlZSBpZiB3ZSBoYXZlIFwiL3BhZ2UvNC9cIiBpbiB0aGUgVVJMXHJcbiAgICAgICAgICAgIHZhciB0cFZhbCA9IHNlbGYuZ2V0UXVlcnlQYXJhbUZyb21VUkwoXCJzZl9wYWdlZFwiLCBVUkwpO1xyXG4gICAgICAgICAgICBpZigodHlwZW9mKHRwVmFsKT09XCJzdHJpbmdcIil8fCh0eXBlb2YodHBWYWwpPT1cIm51bWJlclwiKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGFnZWRWYWwgPSB0cFZhbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHBhZ2VkVmFsO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0UXVlcnlQYXJhbUZyb21VUkwgPSBmdW5jdGlvbihuYW1lLCBVUkwpe1xyXG5cclxuICAgICAgICAgICAgdmFyIHFzdHJpbmcgPSBcIj9cIitVUkwuc3BsaXQoJz8nKVsxXTtcclxuICAgICAgICAgICAgaWYodHlwZW9mKHFzdHJpbmcpIT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gZGVjb2RlVVJJQ29tcG9uZW50KChuZXcgUmVnRXhwKCdbP3wmXScgKyBuYW1lICsgJz0nICsgJyhbXiY7XSs/KSgmfCN8O3wkKScpLmV4ZWMocXN0cmluZyl8fFssXCJcIl0pWzFdLnJlcGxhY2UoL1xcKy9nLCAnJTIwJykpfHxudWxsO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgICAgIHRoaXMuZm9ybVVwZGF0ZWQgPSBmdW5jdGlvbihlKXtcclxuXHJcbiAgICAgICAgICAgIC8vZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBpZihzZWxmLmF1dG9fdXBkYXRlPT0xKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnN1Ym1pdEZvcm0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKChzZWxmLmF1dG9fdXBkYXRlPT0wKSYmKHNlbGYuYXV0b19jb3VudF9yZWZyZXNoX21vZGU9PTEpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmZvcm1VcGRhdGVkRmV0Y2hBamF4KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmZvcm1VcGRhdGVkRmV0Y2hBamF4ID0gZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgIC8vbG9vcCB0aHJvdWdoIGFsbCB0aGUgZmllbGRzIGFuZCBidWlsZCB0aGUgVVJMXHJcbiAgICAgICAgICAgIHNlbGYuZmV0Y2hBamF4Rm9ybSgpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL21ha2UgYW55IGNvcnJlY3Rpb25zL3VwZGF0ZXMgdG8gZmllbGRzIGJlZm9yZSB0aGUgc3VibWl0IGNvbXBsZXRlc1xyXG4gICAgICAgIHRoaXMuc2V0RmllbGRzID0gZnVuY3Rpb24oZSl7XHJcblxyXG4gICAgICAgICAgICAvL2lmKHNlbGYuaXNfYWpheD09MCkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vc29tZXRpbWVzIHRoZSBmb3JtIGlzIHN1Ym1pdHRlZCB3aXRob3V0IHRoZSBzbGlkZXIgeWV0IGhhdmluZyB1cGRhdGVkLCBhbmQgYXMgd2UgZ2V0IG91ciB2YWx1ZXMgZnJvbVxyXG4gICAgICAgICAgICAgICAgLy90aGUgc2xpZGVyIGFuZCBub3QgaW5wdXRzLCB3ZSBuZWVkIHRvIGNoZWNrIGl0IGlmIG5lZWRzIHRvIGJlIHNldFxyXG4gICAgICAgICAgICAgICAgLy9vbmx5IG9jY3VycyBpZiBhamF4IGlzIG9mZiwgYW5kIGF1dG9zdWJtaXQgb25cclxuICAgICAgICAgICAgICAgIHNlbGYuJGZpZWxkcy5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgJGZpZWxkID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJhbmdlX2Rpc3BsYXlfdmFsdWVzID0gJGZpZWxkLmZpbmQoJy5zZi1tZXRhLXJhbmdlLXNsaWRlcicpLmF0dHIoXCJkYXRhLWRpc3BsYXktdmFsdWVzLWFzXCIpOy8vZGF0YS1kaXNwbGF5LXZhbHVlcy1hcz1cInRleHRcIlxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihyYW5nZV9kaXNwbGF5X3ZhbHVlcz09PVwidGV4dGlucHV0XCIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCRmaWVsZC5maW5kKFwiLm1ldGEtc2xpZGVyXCIpLmxlbmd0aD4wKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGZpZWxkLmZpbmQoXCIubWV0YS1zbGlkZXJcIikuZWFjaChmdW5jdGlvbiAoaW5kZXgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGVyX29iamVjdCA9ICQodGhpcylbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJHNsaWRlcl9lbCA9ICQodGhpcykuY2xvc2VzdChcIi5zZi1tZXRhLXJhbmdlLXNsaWRlclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIG1pblZhbCA9ICRzbGlkZXJfZWwuYXR0cihcImRhdGEtbWluXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgbWF4VmFsID0gJHNsaWRlcl9lbC5hdHRyKFwiZGF0YS1tYXhcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWluVmFsID0gJHNsaWRlcl9lbC5maW5kKFwiLnNmLXJhbmdlLW1pblwiKS52YWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYXhWYWwgPSAkc2xpZGVyX2VsLmZpbmQoXCIuc2YtcmFuZ2UtbWF4XCIpLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVyX29iamVjdC5ub1VpU2xpZGVyLnNldChbbWluVmFsLCBtYXhWYWxdKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3N1Ym1pdFxyXG4gICAgICAgIHRoaXMuc3VibWl0Rm9ybSA9IGZ1bmN0aW9uKGUpe1xyXG5cclxuICAgICAgICAgICAgLy9sb29wIHRocm91Z2ggYWxsIHRoZSBmaWVsZHMgYW5kIGJ1aWxkIHRoZSBVUkxcclxuICAgICAgICAgICAgaWYoc2VsZi5pc1N1Ym1pdHRpbmcgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZWxmLnNldEZpZWxkcygpO1xyXG4gICAgICAgICAgICBzZWxmLmNsZWFyVGltZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuaXNTdWJtaXR0aW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHByb2Nlc3NfZm9ybS5zZXRUYXhBcmNoaXZlUmVzdWx0c1VybChzZWxmLCBzZWxmLnJlc3VsdHNfdXJsKTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuJGFqYXhfcmVzdWx0c19jb250YWluZXIuYXR0cihcImRhdGEtcGFnZWRcIiwgMSk7IC8vaW5pdCBwYWdlZFxyXG5cclxuICAgICAgICAgICAgaWYoc2VsZi5jYW5GZXRjaEFqYXhSZXN1bHRzKCkpXHJcbiAgICAgICAgICAgIHsvL3RoZW4gd2Ugd2lsbCBhamF4IHN1Ym1pdCB0aGUgZm9ybVxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuYWpheF9hY3Rpb24gPSBcInN1Ym1pdFwiOyAvL3NvIHdlIGtub3cgaXQgd2Fzbid0IHBhZ2luYXRpb25cclxuICAgICAgICAgICAgICAgIHNlbGYuZmV0Y2hBamF4UmVzdWx0cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgey8vdGhlbiB3ZSB3aWxsIHNpbXBseSByZWRpcmVjdCB0byB0aGUgUmVzdWx0cyBVUkxcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0c191cmwgPSBwcm9jZXNzX2Zvcm0uZ2V0UmVzdWx0c1VybChzZWxmLCBzZWxmLnJlc3VsdHNfdXJsKTtcclxuICAgICAgICAgICAgICAgIHZhciBxdWVyeV9wYXJhbXMgPSBzZWxmLmdldFVybFBhcmFtcyh0cnVlLCAnJyk7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRzX3VybCA9IHNlbGYuYWRkVXJsUGFyYW0ocmVzdWx0c191cmwsIHF1ZXJ5X3BhcmFtcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZXN1bHRzX3VybDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyppZihzZWxmLm1haW50YWluX3N0YXRlPT1cIjFcIilcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgIC8vYWxlcnQoXCJtYWludGFpbiBzdGF0ZVwiKTtcclxuICAgICAgICAgICAgIHZhciBpbkZpZnRlZW5NaW51dGVzID0gbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyAxNSAqIDYwICogMTAwMCk7XHJcbiAgICAgICAgICAgICAvL2h0dHBzOi8vZ2l0aHViLmNvbS9qcy1jb29raWUvanMtY29va2llL3dpa2kvRnJlcXVlbnRseS1Bc2tlZC1RdWVzdGlvbnMjZXhwaXJlLWNvb2tpZXMtaW4tbGVzcy10aGFuLWEtZGF5XHJcbiAgICAgICAgICAgICB2YXIgdGhpcnR5bWludXRlcyA9IDEvNDg7XHJcbiAgICAgICAgICAgICAvL2Nvb2tpZXMuc2V0KCduYW1lJywgJ21ycm9zcycsIHsgZXhwaXJlczogNyB9KTtcclxuICAgICAgICAgICAgIC8vY29va2llcy5zZXQoJ25hbWUnLCAnbXJyb3NzJywgeyBleHBpcmVzOiB0aGlydHltaW51dGVzIH0pO1xyXG4gICAgICAgICAgICAgY29va2llcy5zZXQoJ25hbWUnLCAnbXJyb3NzJywgeyBleHBpcmVzOiBpbkZpZnRlZW5NaW51dGVzIH0pO1xyXG4gICAgICAgICAgICAgfSovXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhjb29raWVzLmdldCgnbmFtZScpKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGNvb2tpZXMuZ2V0KCduYW1lJykpO1xyXG4gICAgICAgIHRoaXMucmVzZXRGb3JtID0gZnVuY3Rpb24oc3VibWl0X2Zvcm0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL3Vuc2V0IGFsbCBmaWVsZHNcclxuICAgICAgICAgICAgc2VsZi4kZmllbGRzLmVhY2goZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgJGZpZWxkID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3N0YW5kYXJkIGZpZWxkIHR5cGVzXHJcbiAgICAgICAgICAgICAgICAkZmllbGQuZmluZChcInNlbGVjdDpub3QoW211bHRpcGxlPSdtdWx0aXBsZSddKSA+IG9wdGlvbjpmaXJzdC1jaGlsZFwiKS5wcm9wKFwic2VsZWN0ZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAkZmllbGQuZmluZChcInNlbGVjdFttdWx0aXBsZT0nbXVsdGlwbGUnXSA+IG9wdGlvblwiKS5wcm9wKFwic2VsZWN0ZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgJGZpZWxkLmZpbmQoXCJpbnB1dFt0eXBlPSdjaGVja2JveCddXCIpLnByb3AoXCJjaGVja2VkXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICRmaWVsZC5maW5kKFwiPiB1bCA+IGxpOmZpcnN0LWNoaWxkIGlucHV0W3R5cGU9J3JhZGlvJ11cIikucHJvcChcImNoZWNrZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAkZmllbGQuZmluZChcImlucHV0W3R5cGU9J3RleHQnXVwiKS52YWwoXCJcIik7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vbnVtYmVyIHJhbmdlIC0gMiBudW1iZXIgaW5wdXQgZmllbGRzXHJcbiAgICAgICAgICAgICAgICAkZmllbGQuZmluZChcImlucHV0W3R5cGU9J251bWJlciddXCIpLmVhY2goZnVuY3Rpb24oaW5kZXgpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgJHRoaXNJbnB1dCA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCR0aGlzSW5wdXQucGFyZW50KCkucGFyZW50KCkuaGFzQ2xhc3MoXCJzZi1tZXRhLXJhbmdlXCIpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpbmRleD09MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXNJbnB1dC52YWwoJHRoaXNJbnB1dC5hdHRyKFwibWluXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKGluZGV4PT0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdGhpc0lucHV0LnZhbCgkdGhpc0lucHV0LmF0dHIoXCJtYXhcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vbWV0YSAvIG51bWJlcnMgd2l0aCAyIGlucHV0cyAoZnJvbSAvIHRvIGZpZWxkcykgLSBzZWNvbmQgaW5wdXQgbXVzdCBiZSByZXNldCB0byBtYXggdmFsdWVcclxuICAgICAgICAgICAgICAgIHZhciAkbWV0YV9zZWxlY3RfZnJvbV90byA9ICRmaWVsZC5maW5kKFwiLnNmLW1ldGEtcmFuZ2Utc2VsZWN0LWZyb210b1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZigkbWV0YV9zZWxlY3RfZnJvbV90by5sZW5ndGg+MCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhcnRfbWluID0gJG1ldGFfc2VsZWN0X2Zyb21fdG8uYXR0cihcImRhdGEtbWluXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGFydF9tYXggPSAkbWV0YV9zZWxlY3RfZnJvbV90by5hdHRyKFwiZGF0YS1tYXhcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRtZXRhX3NlbGVjdF9mcm9tX3RvLmZpbmQoXCJzZWxlY3RcIikuZWFjaChmdW5jdGlvbihpbmRleCl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJHRoaXNJbnB1dCA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpbmRleD09MCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzSW5wdXQudmFsKHN0YXJ0X21pbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihpbmRleD09MSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXNJbnB1dC52YWwoc3RhcnRfbWF4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgJG1ldGFfcmFkaW9fZnJvbV90byA9ICRmaWVsZC5maW5kKFwiLnNmLW1ldGEtcmFuZ2UtcmFkaW8tZnJvbXRvXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKCRtZXRhX3JhZGlvX2Zyb21fdG8ubGVuZ3RoPjApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXJ0X21pbiA9ICRtZXRhX3JhZGlvX2Zyb21fdG8uYXR0cihcImRhdGEtbWluXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGFydF9tYXggPSAkbWV0YV9yYWRpb19mcm9tX3RvLmF0dHIoXCJkYXRhLW1heFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICRyYWRpb19ncm91cHMgPSAkbWV0YV9yYWRpb19mcm9tX3RvLmZpbmQoJy5zZi1pbnB1dC1yYW5nZS1yYWRpbycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkcmFkaW9fZ3JvdXBzLmVhY2goZnVuY3Rpb24oaW5kZXgpe1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkcmFkaW9zID0gJCh0aGlzKS5maW5kKFwiLnNmLWlucHV0LXJhZGlvXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcmFkaW9zLnByb3AoXCJjaGVja2VkXCIsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGluZGV4PT0wKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcmFkaW9zLmZpbHRlcignW3ZhbHVlPVwiJytzdGFydF9taW4rJ1wiXScpLnByb3AoXCJjaGVja2VkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoaW5kZXg9PTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRyYWRpb3MuZmlsdGVyKCdbdmFsdWU9XCInK3N0YXJ0X21heCsnXCJdJykucHJvcChcImNoZWNrZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vbnVtYmVyIHNsaWRlciAtIG5vVWlTbGlkZXJcclxuICAgICAgICAgICAgICAgICRmaWVsZC5maW5kKFwiLm1ldGEtc2xpZGVyXCIpLmVhY2goZnVuY3Rpb24oaW5kZXgpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGVyX29iamVjdCA9ICQodGhpcylbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgLyp2YXIgc2xpZGVyX29iamVjdCA9ICRjb250YWluZXIuZmluZChcIi5tZXRhLXNsaWRlclwiKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgdmFyIHNsaWRlcl92YWwgPSBzbGlkZXJfb2JqZWN0Lm5vVWlTbGlkZXIuZ2V0KCk7Ki9cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICRzbGlkZXJfZWwgPSAkKHRoaXMpLmNsb3Nlc3QoXCIuc2YtbWV0YS1yYW5nZS1zbGlkZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1pblZhbCA9ICRzbGlkZXJfZWwuYXR0cihcImRhdGEtbWluXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXhWYWwgPSAkc2xpZGVyX2VsLmF0dHIoXCJkYXRhLW1heFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXJfb2JqZWN0Lm5vVWlTbGlkZXIuc2V0KFttaW5WYWwsIG1heFZhbF0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vbmVlZCB0byBzZWUgaWYgYW55IGFyZSBjb21ib2JveCBhbmQgYWN0IGFjY29yZGluZ2x5XHJcbiAgICAgICAgICAgICAgICB2YXIgJGNvbWJvYm94ID0gJGZpZWxkLmZpbmQoXCJzZWxlY3RbZGF0YS1jb21ib2JveD0nMSddXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYoJGNvbWJvYm94Lmxlbmd0aD4wKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgJGNvbWJvYm94LmNob3NlbiAhPSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGNvbWJvYm94LnRyaWdnZXIoXCJjaG9zZW46dXBkYXRlZFwiKTsgLy9mb3IgY2hvc2VuIG9ubHlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGNvbWJvYm94LnZhbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRjb21ib2JveC50cmlnZ2VyKCdjaGFuZ2Uuc2VsZWN0MicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2VsZi5jbGVhclRpbWVyKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmKHN1Ym1pdF9mb3JtPT1cImFsd2F5c1wiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnN1Ym1pdEZvcm0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHN1Ym1pdF9mb3JtPT1cIm5ldmVyXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYXV0b19jb3VudF9yZWZyZXNoX21vZGU9PTEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5mb3JtVXBkYXRlZEZldGNoQWpheCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoc3VibWl0X2Zvcm09PVwiYXV0b1wiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmF1dG9fdXBkYXRlPT10cnVlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3VibWl0Rm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuYXV0b19jb3VudF9yZWZyZXNoX21vZGU9PTEpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZvcm1VcGRhdGVkRmV0Y2hBamF4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG5cclxuICAgICAgICB2YXIgZXZlbnRfZGF0YSA9IHt9O1xyXG4gICAgICAgIGV2ZW50X2RhdGEuc2ZpZCA9IHNlbGYuc2ZpZDtcclxuICAgICAgICBldmVudF9kYXRhLnRhcmdldFNlbGVjdG9yID0gc2VsZi5hamF4X3RhcmdldF9hdHRyO1xyXG4gICAgICAgIGV2ZW50X2RhdGEub2JqZWN0ID0gdGhpcztcclxuICAgICAgICBpZihvcHRzLmlzSW5pdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNlbGYudHJpZ2dlckV2ZW50KFwic2Y6aW5pdFwiLCBldmVudF9kYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbn07XHJcbiJdfQ==
},{"./process_form":7,"./state":8,"js-cookie":2,"nouislider":3}],7:[function(require,module,exports){
(function (global){

var $ = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

module.exports = {

	taxonomy_archives: 0,
    url_params: {},
    tax_archive_results_url: "",
    active_tax: "",
    fields: {},
	init: function(taxonomy_archives, current_taxonomy_archive){

        this.taxonomy_archives = 0;
        this.url_params = {};
        this.tax_archive_results_url = "";
        this.active_tax = "";

		//this.$fields = $fields;
        this.taxonomy_archives = taxonomy_archives;
        this.current_taxonomy_archive = current_taxonomy_archive;

		this.clearUrlComponents();

	},
    setTaxArchiveResultsUrl: function($form, current_results_url, get_active) {

        var self = this;

        //var current_results_url = "";
        if(this.taxonomy_archives!=1)
        {
            return;
        }

        if(typeof(get_active)=="undefined")
		{
			var get_active = false;
		}

        //check to see if we have any taxonomies selected
        //if so, check their rewrites and use those as the results url
        var $field = false;
        var field_name = "";
        var field_value = "";

        var $active_taxonomy = $form.$fields.parent().find("[data-sf-taxonomy-archive='1']");
        if($active_taxonomy.length==1)
        {
            $field = $active_taxonomy;

            var fieldType = $field.attr("data-sf-field-type");

            if ((fieldType == "tag") || (fieldType == "category") || (fieldType == "taxonomy")) {
                var taxonomy_value = self.processTaxonomy($field, true);
                field_name = $field.attr("data-sf-field-name");
                var taxonomy_name = field_name.replace("_sft_", "");

                if (taxonomy_value) {
                    field_value = taxonomy_value.value;
                }
            }

            if(field_value=="")
            {
                $field = false;
            }
        }

        if((self.current_taxonomy_archive!="")&&(self.current_taxonomy_archive!=taxonomy_name))
        {

            this.tax_archive_results_url = current_results_url;
            return;
        }

        if(((field_value=="")||(!$field) ))
        {
            $form.$fields.each(function () {

                if (!$field) {

                    var fieldType = $(this).attr("data-sf-field-type");

                    if ((fieldType == "tag") || (fieldType == "category") || (fieldType == "taxonomy")) {
                        var taxonomy_value = self.processTaxonomy($(this), true);
                        field_name = $(this).attr("data-sf-field-name");

                        if (taxonomy_value) {

                            field_value = taxonomy_value.value;

                            if (field_value != "") {

                                $field = $(this);
                            }

                        }
                    }
                }
            });
        }

        if( ($field) && (field_value != "" )) {
            //if we found a field
			var rewrite_attr = ($field.attr("data-sf-term-rewrite"));

            if(rewrite_attr!="") {

                var rewrite = JSON.parse(rewrite_attr);
                var input_type = $field.attr("data-sf-field-input-type");
                self.active_tax = field_name;

                //find the active element
                if ((input_type == "radio") || (input_type == "checkbox")) {

                    //var $active = $field.find(".sf-option-active");
                    //explode the values if there is a delim
                    //field_value

                    var is_single_value = true;
                    var field_values = field_value.split(",").join("+").split("+");
                    if (field_values.length > 1) {
                        is_single_value = false;
                    }

                    if (is_single_value) {

                        var $input = $field.find("input[value='" + field_value + "']");
                        var $active = $input.parent();
                        var depth = $active.attr("data-sf-depth");

                        //now loop through parents to grab their names
                        var values = new Array();
                        values.push(field_value);

                        for (var i = depth; i > 0; i--) {
                            $active = $active.parent().parent();
                            values.push($active.find("input").val());
                        }

                        values.reverse();

                        //grab the rewrite for this depth
                        var active_rewrite = rewrite[depth];
                        var url = active_rewrite;


                        //then map from the parents to the depth
                        $(values).each(function (index, value) {

                            url = url.replace("[" + index + "]", value);

                        });
                        this.tax_archive_results_url = url;
                    }
                    else {

                        //if there are multiple values,
                        //then we need to check for 3 things:

                        //if the values selected are all in the same tree then we can do some clever rewrite stuff
                        //merge all values in same level, then combine the levels

                        //if they are from different trees then just combine them or just use `field_value`
                        /*

                         var depths = new Array();
                         $(field_values).each(function (index, val) {

                         var $input = $field.find("input[value='" + field_value + "']");
                         var $active = $input.parent();

                         var depth = $active.attr("data-sf-depth");
                         //depths.push(depth);

                         });*/

                    }
                }
                else if ((input_type == "select") || (input_type == "multiselect")) {

                    var is_single_value = true;
                    var field_values = field_value.split(",").join("+").split("+");
                    if (field_values.length > 1) {
                        is_single_value = false;
                    }

                    if (is_single_value) {

                        var $active = $field.find("option[value='" + field_value + "']");
                        var depth = $active.attr("data-sf-depth");

                        var values = new Array();
                        values.push(field_value);

                        for (var i = depth; i > 0; i--) {
                            $active = $active.prevAll("option[data-sf-depth='" + (i - 1) + "']");
                            values.push($active.val());
                        }

                        values.reverse();
                        var active_rewrite = rewrite[depth];
                        var url = active_rewrite;
                        $(values).each(function (index, value) {

                            url = url.replace("[" + index + "]", value);

                        });
                        this.tax_archive_results_url = url;
                    }

                }
            }

        }
        //this.tax_archive_results_url = current_results_url;
    },
    getResultsUrl: function($form, current_results_url) {

        //this.setTaxArchiveResultsUrl($form, current_results_url);

        if(this.tax_archive_results_url=="")
        {
            return current_results_url;
        }

        return this.tax_archive_results_url;
    },
	getUrlParams: function($form){

		this.buildUrlComponents($form, true);

        if(this.tax_archive_results_url!="")
        {

            if(this.active_tax!="")
            {
                var field_name = this.active_tax;

                if(typeof(this.url_params[field_name])!="undefined")
                {
                    delete this.url_params[field_name];
                }
            }
        }

		return this.url_params;
	},
	clearUrlComponents: function(){
		//this.url_components = "";
		this.url_params = {};
	},
	disableInputs: function($form){
		var self = this;
		
		$form.$fields.each(function(){
			
			var $inputs = $(this).find("input, select, .meta-slider");
			$inputs.attr("disabled", "disabled");
			$inputs.attr("disabled", true);
			$inputs.prop("disabled", true);
			$inputs.trigger("chosen:updated");
			
		});
		
		
	},
	enableInputs: function($form){
		var self = this;
		
		$form.$fields.each(function(){
			
			var $inputs = $(this).find("input, select, .meta-slider");
			$inputs.prop("disabled", true);
			$inputs.removeAttr("disabled");
			$inputs.trigger("chosen:updated");			
		});
		
		
	},
	buildUrlComponents: function($form, clear_components){
		
		var self = this;
		
		if(typeof(clear_components)!="undefined")
		{
			if(clear_components==true)
			{
				this.clearUrlComponents();
			}
		}
		
		$form.$fields.each(function(){
			
			var fieldName = $(this).attr("data-sf-field-name");
			var fieldType = $(this).attr("data-sf-field-type");
			
			if(fieldType=="search")
			{
				self.processSearchField($(this));
			}
			else if((fieldType=="tag")||(fieldType=="category")||(fieldType=="taxonomy"))
			{
				self.processTaxonomy($(this));
			}
			else if(fieldType=="sort_order")
			{
				self.processSortOrderField($(this));
			}
			else if(fieldType=="posts_per_page")
			{
				self.processResultsPerPageField($(this));
			}
			else if(fieldType=="author")
			{
				self.processAuthor($(this));
			}
			else if(fieldType=="post_type")
			{
				self.processPostType($(this));
			}
			else if(fieldType=="post_date")
			{
				self.processPostDate($(this));
			}
			else if(fieldType=="post_meta")
			{
				self.processPostMeta($(this));
				
			}
			else
			{
				
			}
			
		});
		
	},
	processSearchField: function($container)
	{
		var self = this;
		
		var $field = $container.find("input[name^='_sf_search']");
		
		if($field.length>0)
		{
			var fieldName = $field.attr("name").replace('[]', '');
			var fieldVal = $field.val();
			
			if(fieldVal!="")
			{
				//self.url_components += "&_sf_s="+encodeURIComponent(fieldVal);
				self.url_params['_sf_s'] = encodeURIComponent(fieldVal);
			}
		}
	},
	processSortOrderField: function($container)
	{
		this.processAuthor($container);
		
	},
	processResultsPerPageField: function($container)
	{
		this.processAuthor($container);
		
	},
	getActiveTax: function($field) {
		return this.active_tax;
	},
	getSelectVal: function($field){

		var fieldVal = "";
		
		if($field.val()!=0)
		{
			fieldVal = $field.val();
		}
		
		if(fieldVal==null)
		{
			fieldVal = "";
		}
		
		return fieldVal;
	},
	getMetaSelectVal: function($field){
		
		var fieldVal = "";
		
		fieldVal = $field.val();
						
		if(fieldVal==null)
		{
			fieldVal = "";
		}
		
		return fieldVal;
	},
	getMultiSelectVal: function($field, operator){
		
		var delim = "+";
		if(operator=="or")
		{
			delim = ",";
		}
		
		if(typeof($field.val())=="object")
		{
			if($field.val()!=null)
			{
				return $field.val().join(delim);
			}
		}
		
	},
	getMetaMultiSelectVal: function($field, operator){
		
		var delim = "-+-";
		if(operator=="or")
		{
			delim = "-,-";
		}
				
		if(typeof($field.val())=="object")
		{
			if($field.val()!=null)
			{
				
				var fieldval = [];
				
				$($field.val()).each(function(index,value){
					
					fieldval.push((value));
				});
				
				return fieldval.join(delim);
			}
		}
		
		return "";
		
	},
	getCheckboxVal: function($field, operator){
		
		
		var fieldVal = $field.map(function(){
			if($(this).prop("checked")==true)
			{
				return $(this).val();
			}
		}).get();
		
		var delim = "+";
		if(operator=="or")
		{
			delim = ",";
		}
		
		return fieldVal.join(delim);
	},
	getMetaCheckboxVal: function($field, operator){
		
		
		var fieldVal = $field.map(function(){
			if($(this).prop("checked")==true)
			{
				return ($(this).val());
			}
		}).get();
		
		var delim = "-+-";
		if(operator=="or")
		{
			delim = "-,-";
		}
		
		return fieldVal.join(delim);
	},
	getRadioVal: function($field){
							
		var fieldVal = $field.map(function()
		{
			if($(this).prop("checked")==true)
			{
				return $(this).val();
			}
			
		}).get();
		
		
		if(fieldVal[0]!=0)
		{
			return fieldVal[0];
		}
	},
	getMetaRadioVal: function($field){
							
		var fieldVal = $field.map(function()
		{
			if($(this).prop("checked")==true)
			{
				return $(this).val();
			}
			
		}).get();
		
		return fieldVal[0];
	},
	processAuthor: function($container)
	{
		var self = this;
		
		
		var fieldType = $container.attr("data-sf-field-type");
		var inputType = $container.attr("data-sf-field-input-type");
		
		var $field;
		var fieldName = "";
		var fieldVal = "";
		
		if(inputType=="select")
		{
			$field = $container.find("select");
			fieldName = $field.attr("name").replace('[]', '');
			
			fieldVal = self.getSelectVal($field); 
		}
		else if(inputType=="multiselect")
		{
			$field = $container.find("select");
			fieldName = $field.attr("name").replace('[]', '');
			var operator = $field.attr("data-operator");
			
			fieldVal = self.getMultiSelectVal($field, "or");
			
		}
		else if(inputType=="checkbox")
		{
			$field = $container.find("ul > li input:checkbox");
			
			if($field.length>0)
			{
				fieldName = $field.attr("name").replace('[]', '');
										
				var operator = $container.find("> ul").attr("data-operator");
				fieldVal = self.getCheckboxVal($field, "or");
			}
			
		}
		else if(inputType=="radio")
		{
			
			$field = $container.find("ul > li input:radio");
						
			if($field.length>0)
			{
				fieldName = $field.attr("name").replace('[]', '');
				
				fieldVal = self.getRadioVal($field);
			}
		}
		
		if(typeof(fieldVal)!="undefined")
		{
			if(fieldVal!="")
			{
				var fieldSlug = "";
				
				if(fieldName=="_sf_author")
				{
					fieldSlug = "authors";
				}
				else if(fieldName=="_sf_sort_order")
				{
					fieldSlug = "sort_order";
				}
				else if(fieldName=="_sf_ppp")
				{
					fieldSlug = "_sf_ppp";
				}
				else if(fieldName=="_sf_post_type")
				{
					fieldSlug = "post_types";
				}
				else
				{
				
				}
				
				if(fieldSlug!="")
				{
					//self.url_components += "&"+fieldSlug+"="+fieldVal;
					self.url_params[fieldSlug] = fieldVal;
				}
			}
		}
		
	},
	processPostType : function($this){
		
		this.processAuthor($this);
		
	},
	processPostMeta: function($container)
	{
		var self = this;
		
		var fieldType = $container.attr("data-sf-field-type");
		var inputType = $container.attr("data-sf-field-input-type");
		var metaType = $container.attr("data-sf-meta-type");

		var fieldVal = "";
		var $field;
		var fieldName = "";
		
		if(metaType=="number")
		{
			if(inputType=="range-number")
			{
				$field = $container.find(".sf-meta-range-number input");
				
				var values = [];
				$field.each(function(){
					
					values.push($(this).val());
				
				});
				
				fieldVal = values.join("+");
				
			}
			else if(inputType=="range-slider")
			{
				$field = $container.find(".sf-meta-range-slider input");
				
				//get any number formatting stuff
				var $meta_range = $container.find(".sf-meta-range-slider");
				
				var decimal_places = $meta_range.attr("data-decimal-places");
				var thousand_seperator = $meta_range.attr("data-thousand-seperator");
				var decimal_seperator = $meta_range.attr("data-decimal-seperator");

				var field_format = wNumb({
					mark: decimal_seperator,
					decimals: parseFloat(decimal_places),
					thousand: thousand_seperator
				});
				
				var values = [];


				var slider_object = $container.find(".meta-slider")[0];
				//val from slider object
				var slider_val = slider_object.noUiSlider.get();

				values.push(field_format.from(slider_val[0]));
				values.push(field_format.from(slider_val[1]));
				
				fieldVal = values.join("+");
				
				fieldName = $meta_range.attr("data-sf-field-name");
				
				
			}
			else if(inputType=="range-radio")
			{
				$field = $container.find(".sf-input-range-radio");
				
				if($field.length==0)
				{
					//then try again, we must be using a single field
					$field = $container.find("> ul");
				}

				var $meta_range = $container.find(".sf-meta-range");
				
				//there is an element with a from/to class - so we need to get the values of the from & to input fields seperately
				if($field.length>0)
				{	
					var field_vals = [];
					
					$field.each(function(){
						
						var $radios = $(this).find(".sf-input-radio");
						field_vals.push(self.getMetaRadioVal($radios));
						
					});
					
					//prevent second number from being lower than the first
					if(field_vals.length==2)
					{
						if(Number(field_vals[1])<Number(field_vals[0]))
						{
							field_vals[1] = field_vals[0];
						}
					}
					
					fieldVal = field_vals.join("+");
				}
								
				if($field.length==1)
				{
					fieldName = $field.find(".sf-input-radio").attr("name").replace('[]', '');
				}
				else
				{
					fieldName = $meta_range.attr("data-sf-field-name");
				}

			}
			else if(inputType=="range-select")
			{
				$field = $container.find(".sf-input-select");
				var $meta_range = $container.find(".sf-meta-range");
				
				//there is an element with a from/to class - so we need to get the values of the from & to input fields seperately
				
				if($field.length>0)
				{
					var field_vals = [];
					
					$field.each(function(){
						
						var $this = $(this);
						field_vals.push(self.getMetaSelectVal($this));
						
					});
					
					//prevent second number from being lower than the first
					if(field_vals.length==2)
					{
						if(Number(field_vals[1])<Number(field_vals[0]))
						{
							field_vals[1] = field_vals[0];
						}
					}
					
					
					fieldVal = field_vals.join("+");
				}
								
				if($field.length==1)
				{
					fieldName = $field.attr("name").replace('[]', '');
				}
				else
				{
					fieldName = $meta_range.attr("data-sf-field-name");
				}
				
			}
			else if(inputType=="range-checkbox")
			{
				$field = $container.find("ul > li input:checkbox");
				
				if($field.length>0)
				{
					fieldVal = self.getCheckboxVal($field, "and");
				}
			}
			
			if(fieldName=="")
			{
				fieldName = $field.attr("name").replace('[]', '');
			}
		}
		else if(metaType=="choice")
		{
			if(inputType=="select")
			{
				$field = $container.find("select");
				
				fieldVal = self.getMetaSelectVal($field); 
				
			}
			else if(inputType=="multiselect")
			{
				$field = $container.find("select");
				var operator = $field.attr("data-operator");
				
				fieldVal = self.getMetaMultiSelectVal($field, operator);
			}
			else if(inputType=="checkbox")
			{
				$field = $container.find("ul > li input:checkbox");
				
				if($field.length>0)
				{
					var operator = $container.find("> ul").attr("data-operator");
					fieldVal = self.getMetaCheckboxVal($field, operator);
				}
			}
			else if(inputType=="radio")
			{
				$field = $container.find("ul > li input:radio");
				
				if($field.length>0)
				{
					fieldVal = self.getMetaRadioVal($field);
				}
			}
			
			fieldVal = encodeURIComponent(fieldVal);
			if(typeof($field)!=="undefined")
			{
				if($field.length>0)
				{
					fieldName = $field.attr("name").replace('[]', '');
					
					//for those who insist on using & ampersands in the name of the custom field (!)
					fieldName = (fieldName);
				}
			}
			
		}
		else if(metaType=="date")
		{
			self.processPostDate($container);
		}
		
		if(typeof(fieldVal)!="undefined")
		{
			if(fieldVal!="")
			{
				//self.url_components += "&"+encodeURIComponent(fieldName)+"="+(fieldVal);
				self.url_params[encodeURIComponent(fieldName)] = (fieldVal);
			}
		}
	},
	processPostDate: function($container)
	{
		var self = this;
		
		var fieldType = $container.attr("data-sf-field-type");
		var inputType = $container.attr("data-sf-field-input-type");
		
		var $field;
		var fieldName = "";
		var fieldVal = "";
		
		$field = $container.find("ul > li input:text");
		fieldName = $field.attr("name").replace('[]', '');
		
		var dates = [];
		$field.each(function(){
			
			dates.push($(this).val());
		
		});
		
		if($field.length==2)
		{
			if((dates[0]!="")||(dates[1]!=""))
			{
				fieldVal = dates.join("+");
				fieldVal = fieldVal.replace(/\//g,'');
			}
		}
		else if($field.length==1)
		{
			if(dates[0]!="")
			{
				fieldVal = dates.join("+");
				fieldVal = fieldVal.replace(/\//g,'');
			}
		}
		
		if(typeof(fieldVal)!="undefined")
		{
			if(fieldVal!="")
			{
				var fieldSlug = "";
				
				if(fieldName=="_sf_post_date")
				{
					fieldSlug = "post_date";
				}
				else
				{
					fieldSlug = fieldName;
				}
				
				if(fieldSlug!="")
				{
					//self.url_components += "&"+fieldSlug+"="+fieldVal;
					self.url_params[fieldSlug] = fieldVal;
				}
			}
		}
		
	},
	processTaxonomy: function($container, return_object)
	{
        if(typeof(return_object)=="undefined")
        {
            return_object = false;
        }

		//if()					
		//var fieldName = $(this).attr("data-sf-field-name");
		var self = this;
	
		var fieldType = $container.attr("data-sf-field-type");
		var inputType = $container.attr("data-sf-field-input-type");
		
		var $field;
		var fieldName = "";
		var fieldVal = "";
		
		if(inputType=="select")
		{
			$field = $container.find("select");
			fieldName = $field.attr("name").replace('[]', '');
			
			fieldVal = self.getSelectVal($field); 
		}
		else if(inputType=="multiselect")
		{
			$field = $container.find("select");
			fieldName = $field.attr("name").replace('[]', '');
			var operator = $field.attr("data-operator");
			
			fieldVal = self.getMultiSelectVal($field, operator);
		}
		else if(inputType=="checkbox")
		{
			$field = $container.find("ul > li input:checkbox");
			if($field.length>0)
			{
				fieldName = $field.attr("name").replace('[]', '');
										
				var operator = $container.find("> ul").attr("data-operator");
				fieldVal = self.getCheckboxVal($field, operator);
			}
		}
		else if(inputType=="radio")
		{
			$field = $container.find("ul > li input:radio");
			if($field.length>0)
			{
				fieldName = $field.attr("name").replace('[]', '');
				
				fieldVal = self.getRadioVal($field);
			}
		}
		
		if(typeof(fieldVal)!="undefined")
		{
			if(fieldVal!="")
			{
                if(return_object==true)
                {
                    return {name: fieldName, value: fieldVal};
                }
                else
                {
                    //self.url_components += "&"+fieldName+"="+fieldVal;
                    self.url_params[fieldName] = fieldVal;
                }

			}
		}

        if(return_object==true)
        {
            return false;
        }
	}
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9wdWJsaWMvYXNzZXRzL2pzL2luY2x1ZGVzL3Byb2Nlc3NfZm9ybS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJcclxudmFyICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snalF1ZXJ5J10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydqUXVlcnknXSA6IG51bGwpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG5cdHRheG9ub215X2FyY2hpdmVzOiAwLFxyXG4gICAgdXJsX3BhcmFtczoge30sXHJcbiAgICB0YXhfYXJjaGl2ZV9yZXN1bHRzX3VybDogXCJcIixcclxuICAgIGFjdGl2ZV90YXg6IFwiXCIsXHJcbiAgICBmaWVsZHM6IHt9LFxyXG5cdGluaXQ6IGZ1bmN0aW9uKHRheG9ub215X2FyY2hpdmVzLCBjdXJyZW50X3RheG9ub215X2FyY2hpdmUpe1xyXG5cclxuICAgICAgICB0aGlzLnRheG9ub215X2FyY2hpdmVzID0gMDtcclxuICAgICAgICB0aGlzLnVybF9wYXJhbXMgPSB7fTtcclxuICAgICAgICB0aGlzLnRheF9hcmNoaXZlX3Jlc3VsdHNfdXJsID0gXCJcIjtcclxuICAgICAgICB0aGlzLmFjdGl2ZV90YXggPSBcIlwiO1xyXG5cclxuXHRcdC8vdGhpcy4kZmllbGRzID0gJGZpZWxkcztcclxuICAgICAgICB0aGlzLnRheG9ub215X2FyY2hpdmVzID0gdGF4b25vbXlfYXJjaGl2ZXM7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50X3RheG9ub215X2FyY2hpdmUgPSBjdXJyZW50X3RheG9ub215X2FyY2hpdmU7XHJcblxyXG5cdFx0dGhpcy5jbGVhclVybENvbXBvbmVudHMoKTtcclxuXHJcblx0fSxcclxuICAgIHNldFRheEFyY2hpdmVSZXN1bHRzVXJsOiBmdW5jdGlvbigkZm9ybSwgY3VycmVudF9yZXN1bHRzX3VybCwgZ2V0X2FjdGl2ZSkge1xyXG5cclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vdmFyIGN1cnJlbnRfcmVzdWx0c191cmwgPSBcIlwiO1xyXG4gICAgICAgIGlmKHRoaXMudGF4b25vbXlfYXJjaGl2ZXMhPTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0eXBlb2YoZ2V0X2FjdGl2ZSk9PVwidW5kZWZpbmVkXCIpXHJcblx0XHR7XHJcblx0XHRcdHZhciBnZXRfYWN0aXZlID0gZmFsc2U7XHJcblx0XHR9XHJcblxyXG4gICAgICAgIC8vY2hlY2sgdG8gc2VlIGlmIHdlIGhhdmUgYW55IHRheG9ub21pZXMgc2VsZWN0ZWRcclxuICAgICAgICAvL2lmIHNvLCBjaGVjayB0aGVpciByZXdyaXRlcyBhbmQgdXNlIHRob3NlIGFzIHRoZSByZXN1bHRzIHVybFxyXG4gICAgICAgIHZhciAkZmllbGQgPSBmYWxzZTtcclxuICAgICAgICB2YXIgZmllbGRfbmFtZSA9IFwiXCI7XHJcbiAgICAgICAgdmFyIGZpZWxkX3ZhbHVlID0gXCJcIjtcclxuXHJcbiAgICAgICAgdmFyICRhY3RpdmVfdGF4b25vbXkgPSAkZm9ybS4kZmllbGRzLnBhcmVudCgpLmZpbmQoXCJbZGF0YS1zZi10YXhvbm9teS1hcmNoaXZlPScxJ11cIik7XHJcbiAgICAgICAgaWYoJGFjdGl2ZV90YXhvbm9teS5sZW5ndGg9PTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAkZmllbGQgPSAkYWN0aXZlX3RheG9ub215O1xyXG5cclxuICAgICAgICAgICAgdmFyIGZpZWxkVHlwZSA9ICRmaWVsZC5hdHRyKFwiZGF0YS1zZi1maWVsZC10eXBlXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKChmaWVsZFR5cGUgPT0gXCJ0YWdcIikgfHwgKGZpZWxkVHlwZSA9PSBcImNhdGVnb3J5XCIpIHx8IChmaWVsZFR5cGUgPT0gXCJ0YXhvbm9teVwiKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRheG9ub215X3ZhbHVlID0gc2VsZi5wcm9jZXNzVGF4b25vbXkoJGZpZWxkLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGZpZWxkX25hbWUgPSAkZmllbGQuYXR0cihcImRhdGEtc2YtZmllbGQtbmFtZVwiKTtcclxuICAgICAgICAgICAgICAgIHZhciB0YXhvbm9teV9uYW1lID0gZmllbGRfbmFtZS5yZXBsYWNlKFwiX3NmdF9cIiwgXCJcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRheG9ub215X3ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRfdmFsdWUgPSB0YXhvbm9teV92YWx1ZS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoZmllbGRfdmFsdWU9PVwiXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICRmaWVsZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZigoc2VsZi5jdXJyZW50X3RheG9ub215X2FyY2hpdmUhPVwiXCIpJiYoc2VsZi5jdXJyZW50X3RheG9ub215X2FyY2hpdmUhPXRheG9ub215X25hbWUpKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudGF4X2FyY2hpdmVfcmVzdWx0c191cmwgPSBjdXJyZW50X3Jlc3VsdHNfdXJsO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZigoKGZpZWxkX3ZhbHVlPT1cIlwiKXx8KCEkZmllbGQpICkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAkZm9ybS4kZmllbGRzLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghJGZpZWxkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWVsZFR5cGUgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXNmLWZpZWxkLXR5cGVcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoZmllbGRUeXBlID09IFwidGFnXCIpIHx8IChmaWVsZFR5cGUgPT0gXCJjYXRlZ29yeVwiKSB8fCAoZmllbGRUeXBlID09IFwidGF4b25vbXlcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRheG9ub215X3ZhbHVlID0gc2VsZi5wcm9jZXNzVGF4b25vbXkoJCh0aGlzKSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkX25hbWUgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXNmLWZpZWxkLW5hbWVcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGF4b25vbXlfdmFsdWUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZF92YWx1ZSA9IHRheG9ub215X3ZhbHVlLnZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZF92YWx1ZSAhPSBcIlwiKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRmaWVsZCA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCAoJGZpZWxkKSAmJiAoZmllbGRfdmFsdWUgIT0gXCJcIiApKSB7XHJcbiAgICAgICAgICAgIC8vaWYgd2UgZm91bmQgYSBmaWVsZFxyXG5cdFx0XHR2YXIgcmV3cml0ZV9hdHRyID0gKCRmaWVsZC5hdHRyKFwiZGF0YS1zZi10ZXJtLXJld3JpdGVcIikpO1xyXG5cclxuICAgICAgICAgICAgaWYocmV3cml0ZV9hdHRyIT1cIlwiKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHJld3JpdGUgPSBKU09OLnBhcnNlKHJld3JpdGVfYXR0cik7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXRfdHlwZSA9ICRmaWVsZC5hdHRyKFwiZGF0YS1zZi1maWVsZC1pbnB1dC10eXBlXCIpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hY3RpdmVfdGF4ID0gZmllbGRfbmFtZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2ZpbmQgdGhlIGFjdGl2ZSBlbGVtZW50XHJcbiAgICAgICAgICAgICAgICBpZiAoKGlucHV0X3R5cGUgPT0gXCJyYWRpb1wiKSB8fCAoaW5wdXRfdHlwZSA9PSBcImNoZWNrYm94XCIpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vdmFyICRhY3RpdmUgPSAkZmllbGQuZmluZChcIi5zZi1vcHRpb24tYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZXhwbG9kZSB0aGUgdmFsdWVzIGlmIHRoZXJlIGlzIGEgZGVsaW1cclxuICAgICAgICAgICAgICAgICAgICAvL2ZpZWxkX3ZhbHVlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpc19zaW5nbGVfdmFsdWUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWVsZF92YWx1ZXMgPSBmaWVsZF92YWx1ZS5zcGxpdChcIixcIikuam9pbihcIitcIikuc3BsaXQoXCIrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZF92YWx1ZXMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc19zaW5nbGVfdmFsdWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc19zaW5nbGVfdmFsdWUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkaW5wdXQgPSAkZmllbGQuZmluZChcImlucHV0W3ZhbHVlPSdcIiArIGZpZWxkX3ZhbHVlICsgXCInXVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRhY3RpdmUgPSAkaW5wdXQucGFyZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZXB0aCA9ICRhY3RpdmUuYXR0cihcImRhdGEtc2YtZGVwdGhcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL25vdyBsb29wIHRocm91Z2ggcGFyZW50cyB0byBncmFiIHRoZWlyIG5hbWVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzLnB1c2goZmllbGRfdmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IGRlcHRoOyBpID4gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYWN0aXZlID0gJGFjdGl2ZS5wYXJlbnQoKS5wYXJlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKCRhY3RpdmUuZmluZChcImlucHV0XCIpLnZhbCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzLnJldmVyc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JhYiB0aGUgcmV3cml0ZSBmb3IgdGhpcyBkZXB0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aXZlX3Jld3JpdGUgPSByZXdyaXRlW2RlcHRoXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVybCA9IGFjdGl2ZV9yZXdyaXRlO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhlbiBtYXAgZnJvbSB0aGUgcGFyZW50cyB0byB0aGUgZGVwdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh2YWx1ZXMpLmVhY2goZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKFwiW1wiICsgaW5kZXggKyBcIl1cIiwgdmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGF4X2FyY2hpdmVfcmVzdWx0c191cmwgPSB1cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiB0aGVyZSBhcmUgbXVsdGlwbGUgdmFsdWVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoZW4gd2UgbmVlZCB0byBjaGVjayBmb3IgMyB0aGluZ3M6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIHRoZSB2YWx1ZXMgc2VsZWN0ZWQgYXJlIGFsbCBpbiB0aGUgc2FtZSB0cmVlIHRoZW4gd2UgY2FuIGRvIHNvbWUgY2xldmVyIHJld3JpdGUgc3R1ZmZcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9tZXJnZSBhbGwgdmFsdWVzIGluIHNhbWUgbGV2ZWwsIHRoZW4gY29tYmluZSB0aGUgbGV2ZWxzXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIHRoZXkgYXJlIGZyb20gZGlmZmVyZW50IHRyZWVzIHRoZW4ganVzdCBjb21iaW5lIHRoZW0gb3IganVzdCB1c2UgYGZpZWxkX3ZhbHVlYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvKlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZXB0aHMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICQoZmllbGRfdmFsdWVzKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgdmFsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRpbnB1dCA9ICRmaWVsZC5maW5kKFwiaW5wdXRbdmFsdWU9J1wiICsgZmllbGRfdmFsdWUgKyBcIiddXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRhY3RpdmUgPSAkaW5wdXQucGFyZW50KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlcHRoID0gJGFjdGl2ZS5hdHRyKFwiZGF0YS1zZi1kZXB0aFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVwdGhzLnB1c2goZGVwdGgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgIH0pOyovXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKChpbnB1dF90eXBlID09IFwic2VsZWN0XCIpIHx8IChpbnB1dF90eXBlID09IFwibXVsdGlzZWxlY3RcIikpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzX3NpbmdsZV92YWx1ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpZWxkX3ZhbHVlcyA9IGZpZWxkX3ZhbHVlLnNwbGl0KFwiLFwiKS5qb2luKFwiK1wiKS5zcGxpdChcIitcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkX3ZhbHVlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzX3NpbmdsZV92YWx1ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzX3NpbmdsZV92YWx1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRhY3RpdmUgPSAkZmllbGQuZmluZChcIm9wdGlvblt2YWx1ZT0nXCIgKyBmaWVsZF92YWx1ZSArIFwiJ11cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZXB0aCA9ICRhY3RpdmUuYXR0cihcImRhdGEtc2YtZGVwdGhcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKGZpZWxkX3ZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBkZXB0aDsgaSA+IDA7IGktLSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGFjdGl2ZSA9ICRhY3RpdmUucHJldkFsbChcIm9wdGlvbltkYXRhLXNmLWRlcHRoPSdcIiArIChpIC0gMSkgKyBcIiddXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzLnB1c2goJGFjdGl2ZS52YWwoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcy5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY3RpdmVfcmV3cml0ZSA9IHJld3JpdGVbZGVwdGhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXJsID0gYWN0aXZlX3Jld3JpdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodmFsdWVzKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgdmFsdWUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZShcIltcIiArIGluZGV4ICsgXCJdXCIsIHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRheF9hcmNoaXZlX3Jlc3VsdHNfdXJsID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdGhpcy50YXhfYXJjaGl2ZV9yZXN1bHRzX3VybCA9IGN1cnJlbnRfcmVzdWx0c191cmw7XHJcbiAgICB9LFxyXG4gICAgZ2V0UmVzdWx0c1VybDogZnVuY3Rpb24oJGZvcm0sIGN1cnJlbnRfcmVzdWx0c191cmwpIHtcclxuXHJcbiAgICAgICAgLy90aGlzLnNldFRheEFyY2hpdmVSZXN1bHRzVXJsKCRmb3JtLCBjdXJyZW50X3Jlc3VsdHNfdXJsKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy50YXhfYXJjaGl2ZV9yZXN1bHRzX3VybD09XCJcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50X3Jlc3VsdHNfdXJsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGF4X2FyY2hpdmVfcmVzdWx0c191cmw7XHJcbiAgICB9LFxyXG5cdGdldFVybFBhcmFtczogZnVuY3Rpb24oJGZvcm0pe1xyXG5cclxuXHRcdHRoaXMuYnVpbGRVcmxDb21wb25lbnRzKCRmb3JtLCB0cnVlKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy50YXhfYXJjaGl2ZV9yZXN1bHRzX3VybCE9XCJcIilcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLmFjdGl2ZV90YXghPVwiXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBmaWVsZF9uYW1lID0gdGhpcy5hY3RpdmVfdGF4O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHR5cGVvZih0aGlzLnVybF9wYXJhbXNbZmllbGRfbmFtZV0pIT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnVybF9wYXJhbXNbZmllbGRfbmFtZV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMudXJsX3BhcmFtcztcclxuXHR9LFxyXG5cdGNsZWFyVXJsQ29tcG9uZW50czogZnVuY3Rpb24oKXtcclxuXHRcdC8vdGhpcy51cmxfY29tcG9uZW50cyA9IFwiXCI7XHJcblx0XHR0aGlzLnVybF9wYXJhbXMgPSB7fTtcclxuXHR9LFxyXG5cdGRpc2FibGVJbnB1dHM6IGZ1bmN0aW9uKCRmb3JtKXtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdFxyXG5cdFx0JGZvcm0uJGZpZWxkcy5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFxyXG5cdFx0XHR2YXIgJGlucHV0cyA9ICQodGhpcykuZmluZChcImlucHV0LCBzZWxlY3QsIC5tZXRhLXNsaWRlclwiKTtcclxuXHRcdFx0JGlucHV0cy5hdHRyKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcclxuXHRcdFx0JGlucHV0cy5hdHRyKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcblx0XHRcdCRpbnB1dHMucHJvcChcImRpc2FibGVkXCIsIHRydWUpO1xyXG5cdFx0XHQkaW5wdXRzLnRyaWdnZXIoXCJjaG9zZW46dXBkYXRlZFwiKTtcclxuXHRcdFx0XHJcblx0XHR9KTtcclxuXHRcdFxyXG5cdFx0XHJcblx0fSxcclxuXHRlbmFibGVJbnB1dHM6IGZ1bmN0aW9uKCRmb3JtKXtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdFxyXG5cdFx0JGZvcm0uJGZpZWxkcy5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFxyXG5cdFx0XHR2YXIgJGlucHV0cyA9ICQodGhpcykuZmluZChcImlucHV0LCBzZWxlY3QsIC5tZXRhLXNsaWRlclwiKTtcclxuXHRcdFx0JGlucHV0cy5wcm9wKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcblx0XHRcdCRpbnB1dHMucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xyXG5cdFx0XHQkaW5wdXRzLnRyaWdnZXIoXCJjaG9zZW46dXBkYXRlZFwiKTtcdFx0XHRcclxuXHRcdH0pO1xyXG5cdFx0XHJcblx0XHRcclxuXHR9LFxyXG5cdGJ1aWxkVXJsQ29tcG9uZW50czogZnVuY3Rpb24oJGZvcm0sIGNsZWFyX2NvbXBvbmVudHMpe1xyXG5cdFx0XHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHRcclxuXHRcdGlmKHR5cGVvZihjbGVhcl9jb21wb25lbnRzKSE9XCJ1bmRlZmluZWRcIilcclxuXHRcdHtcclxuXHRcdFx0aWYoY2xlYXJfY29tcG9uZW50cz09dHJ1ZSlcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHRoaXMuY2xlYXJVcmxDb21wb25lbnRzKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0JGZvcm0uJGZpZWxkcy5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFxyXG5cdFx0XHR2YXIgZmllbGROYW1lID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1zZi1maWVsZC1uYW1lXCIpO1xyXG5cdFx0XHR2YXIgZmllbGRUeXBlID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1zZi1maWVsZC10eXBlXCIpO1xyXG5cdFx0XHRcclxuXHRcdFx0aWYoZmllbGRUeXBlPT1cInNlYXJjaFwiKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0c2VsZi5wcm9jZXNzU2VhcmNoRmllbGQoJCh0aGlzKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZigoZmllbGRUeXBlPT1cInRhZ1wiKXx8KGZpZWxkVHlwZT09XCJjYXRlZ29yeVwiKXx8KGZpZWxkVHlwZT09XCJ0YXhvbm9teVwiKSlcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHNlbGYucHJvY2Vzc1RheG9ub215KCQodGhpcykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYoZmllbGRUeXBlPT1cInNvcnRfb3JkZXJcIilcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHNlbGYucHJvY2Vzc1NvcnRPcmRlckZpZWxkKCQodGhpcykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYoZmllbGRUeXBlPT1cInBvc3RzX3Blcl9wYWdlXCIpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRzZWxmLnByb2Nlc3NSZXN1bHRzUGVyUGFnZUZpZWxkKCQodGhpcykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYoZmllbGRUeXBlPT1cImF1dGhvclwiKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0c2VsZi5wcm9jZXNzQXV0aG9yKCQodGhpcykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYoZmllbGRUeXBlPT1cInBvc3RfdHlwZVwiKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0c2VsZi5wcm9jZXNzUG9zdFR5cGUoJCh0aGlzKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZihmaWVsZFR5cGU9PVwicG9zdF9kYXRlXCIpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRzZWxmLnByb2Nlc3NQb3N0RGF0ZSgkKHRoaXMpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmKGZpZWxkVHlwZT09XCJwb3N0X21ldGFcIilcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHNlbGYucHJvY2Vzc1Bvc3RNZXRhKCQodGhpcykpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0e1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fSk7XHJcblx0XHRcclxuXHR9LFxyXG5cdHByb2Nlc3NTZWFyY2hGaWVsZDogZnVuY3Rpb24oJGNvbnRhaW5lcilcclxuXHR7XHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHRcclxuXHRcdHZhciAkZmllbGQgPSAkY29udGFpbmVyLmZpbmQoXCJpbnB1dFtuYW1lXj0nX3NmX3NlYXJjaCddXCIpO1xyXG5cdFx0XHJcblx0XHRpZigkZmllbGQubGVuZ3RoPjApXHJcblx0XHR7XHJcblx0XHRcdHZhciBmaWVsZE5hbWUgPSAkZmllbGQuYXR0cihcIm5hbWVcIikucmVwbGFjZSgnW10nLCAnJyk7XHJcblx0XHRcdHZhciBmaWVsZFZhbCA9ICRmaWVsZC52YWwoKTtcclxuXHRcdFx0XHJcblx0XHRcdGlmKGZpZWxkVmFsIT1cIlwiKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0Ly9zZWxmLnVybF9jb21wb25lbnRzICs9IFwiJl9zZl9zPVwiK2VuY29kZVVSSUNvbXBvbmVudChmaWVsZFZhbCk7XHJcblx0XHRcdFx0c2VsZi51cmxfcGFyYW1zWydfc2ZfcyddID0gZW5jb2RlVVJJQ29tcG9uZW50KGZpZWxkVmFsKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0cHJvY2Vzc1NvcnRPcmRlckZpZWxkOiBmdW5jdGlvbigkY29udGFpbmVyKVxyXG5cdHtcclxuXHRcdHRoaXMucHJvY2Vzc0F1dGhvcigkY29udGFpbmVyKTtcclxuXHRcdFxyXG5cdH0sXHJcblx0cHJvY2Vzc1Jlc3VsdHNQZXJQYWdlRmllbGQ6IGZ1bmN0aW9uKCRjb250YWluZXIpXHJcblx0e1xyXG5cdFx0dGhpcy5wcm9jZXNzQXV0aG9yKCRjb250YWluZXIpO1xyXG5cdFx0XHJcblx0fSxcclxuXHRnZXRBY3RpdmVUYXg6IGZ1bmN0aW9uKCRmaWVsZCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYWN0aXZlX3RheDtcclxuXHR9LFxyXG5cdGdldFNlbGVjdFZhbDogZnVuY3Rpb24oJGZpZWxkKXtcclxuXHJcblx0XHR2YXIgZmllbGRWYWwgPSBcIlwiO1xyXG5cdFx0XHJcblx0XHRpZigkZmllbGQudmFsKCkhPTApXHJcblx0XHR7XHJcblx0XHRcdGZpZWxkVmFsID0gJGZpZWxkLnZhbCgpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZihmaWVsZFZhbD09bnVsbClcclxuXHRcdHtcclxuXHRcdFx0ZmllbGRWYWwgPSBcIlwiO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gZmllbGRWYWw7XHJcblx0fSxcclxuXHRnZXRNZXRhU2VsZWN0VmFsOiBmdW5jdGlvbigkZmllbGQpe1xyXG5cdFx0XHJcblx0XHR2YXIgZmllbGRWYWwgPSBcIlwiO1xyXG5cdFx0XHJcblx0XHRmaWVsZFZhbCA9ICRmaWVsZC52YWwoKTtcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRpZihmaWVsZFZhbD09bnVsbClcclxuXHRcdHtcclxuXHRcdFx0ZmllbGRWYWwgPSBcIlwiO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gZmllbGRWYWw7XHJcblx0fSxcclxuXHRnZXRNdWx0aVNlbGVjdFZhbDogZnVuY3Rpb24oJGZpZWxkLCBvcGVyYXRvcil7XHJcblx0XHRcclxuXHRcdHZhciBkZWxpbSA9IFwiK1wiO1xyXG5cdFx0aWYob3BlcmF0b3I9PVwib3JcIilcclxuXHRcdHtcclxuXHRcdFx0ZGVsaW0gPSBcIixcIjtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYodHlwZW9mKCRmaWVsZC52YWwoKSk9PVwib2JqZWN0XCIpXHJcblx0XHR7XHJcblx0XHRcdGlmKCRmaWVsZC52YWwoKSE9bnVsbClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHJldHVybiAkZmllbGQudmFsKCkuam9pbihkZWxpbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdFxyXG5cdH0sXHJcblx0Z2V0TWV0YU11bHRpU2VsZWN0VmFsOiBmdW5jdGlvbigkZmllbGQsIG9wZXJhdG9yKXtcclxuXHRcdFxyXG5cdFx0dmFyIGRlbGltID0gXCItKy1cIjtcclxuXHRcdGlmKG9wZXJhdG9yPT1cIm9yXCIpXHJcblx0XHR7XHJcblx0XHRcdGRlbGltID0gXCItLC1cIjtcclxuXHRcdH1cclxuXHRcdFx0XHRcclxuXHRcdGlmKHR5cGVvZigkZmllbGQudmFsKCkpPT1cIm9iamVjdFwiKVxyXG5cdFx0e1xyXG5cdFx0XHRpZigkZmllbGQudmFsKCkhPW51bGwpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHR2YXIgZmllbGR2YWwgPSBbXTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHQkKCRmaWVsZC52YWwoKSkuZWFjaChmdW5jdGlvbihpbmRleCx2YWx1ZSl7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGZpZWxkdmFsLnB1c2goKHZhbHVlKSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0cmV0dXJuIGZpZWxkdmFsLmpvaW4oZGVsaW0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBcIlwiO1xyXG5cdFx0XHJcblx0fSxcclxuXHRnZXRDaGVja2JveFZhbDogZnVuY3Rpb24oJGZpZWxkLCBvcGVyYXRvcil7XHJcblx0XHRcclxuXHRcdFxyXG5cdFx0dmFyIGZpZWxkVmFsID0gJGZpZWxkLm1hcChmdW5jdGlvbigpe1xyXG5cdFx0XHRpZigkKHRoaXMpLnByb3AoXCJjaGVja2VkXCIpPT10cnVlKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0cmV0dXJuICQodGhpcykudmFsKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pLmdldCgpO1xyXG5cdFx0XHJcblx0XHR2YXIgZGVsaW0gPSBcIitcIjtcclxuXHRcdGlmKG9wZXJhdG9yPT1cIm9yXCIpXHJcblx0XHR7XHJcblx0XHRcdGRlbGltID0gXCIsXCI7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBmaWVsZFZhbC5qb2luKGRlbGltKTtcclxuXHR9LFxyXG5cdGdldE1ldGFDaGVja2JveFZhbDogZnVuY3Rpb24oJGZpZWxkLCBvcGVyYXRvcil7XHJcblx0XHRcclxuXHRcdFxyXG5cdFx0dmFyIGZpZWxkVmFsID0gJGZpZWxkLm1hcChmdW5jdGlvbigpe1xyXG5cdFx0XHRpZigkKHRoaXMpLnByb3AoXCJjaGVja2VkXCIpPT10cnVlKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0cmV0dXJuICgkKHRoaXMpLnZhbCgpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSkuZ2V0KCk7XHJcblx0XHRcclxuXHRcdHZhciBkZWxpbSA9IFwiLSstXCI7XHJcblx0XHRpZihvcGVyYXRvcj09XCJvclwiKVxyXG5cdFx0e1xyXG5cdFx0XHRkZWxpbSA9IFwiLSwtXCI7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBmaWVsZFZhbC5qb2luKGRlbGltKTtcclxuXHR9LFxyXG5cdGdldFJhZGlvVmFsOiBmdW5jdGlvbigkZmllbGQpe1xyXG5cdFx0XHRcdFx0XHRcdFxyXG5cdFx0dmFyIGZpZWxkVmFsID0gJGZpZWxkLm1hcChmdW5jdGlvbigpXHJcblx0XHR7XHJcblx0XHRcdGlmKCQodGhpcykucHJvcChcImNoZWNrZWRcIik9PXRydWUpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRyZXR1cm4gJCh0aGlzKS52YWwoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH0pLmdldCgpO1xyXG5cdFx0XHJcblx0XHRcclxuXHRcdGlmKGZpZWxkVmFsWzBdIT0wKVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm4gZmllbGRWYWxbMF07XHJcblx0XHR9XHJcblx0fSxcclxuXHRnZXRNZXRhUmFkaW9WYWw6IGZ1bmN0aW9uKCRmaWVsZCl7XHJcblx0XHRcdFx0XHRcdFx0XHJcblx0XHR2YXIgZmllbGRWYWwgPSAkZmllbGQubWFwKGZ1bmN0aW9uKClcclxuXHRcdHtcclxuXHRcdFx0aWYoJCh0aGlzKS5wcm9wKFwiY2hlY2tlZFwiKT09dHJ1ZSlcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHJldHVybiAkKHRoaXMpLnZhbCgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fSkuZ2V0KCk7XHJcblx0XHRcclxuXHRcdHJldHVybiBmaWVsZFZhbFswXTtcclxuXHR9LFxyXG5cdHByb2Nlc3NBdXRob3I6IGZ1bmN0aW9uKCRjb250YWluZXIpXHJcblx0e1xyXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0XHJcblx0XHRcclxuXHRcdHZhciBmaWVsZFR5cGUgPSAkY29udGFpbmVyLmF0dHIoXCJkYXRhLXNmLWZpZWxkLXR5cGVcIik7XHJcblx0XHR2YXIgaW5wdXRUeXBlID0gJGNvbnRhaW5lci5hdHRyKFwiZGF0YS1zZi1maWVsZC1pbnB1dC10eXBlXCIpO1xyXG5cdFx0XHJcblx0XHR2YXIgJGZpZWxkO1xyXG5cdFx0dmFyIGZpZWxkTmFtZSA9IFwiXCI7XHJcblx0XHR2YXIgZmllbGRWYWwgPSBcIlwiO1xyXG5cdFx0XHJcblx0XHRpZihpbnB1dFR5cGU9PVwic2VsZWN0XCIpXHJcblx0XHR7XHJcblx0XHRcdCRmaWVsZCA9ICRjb250YWluZXIuZmluZChcInNlbGVjdFwiKTtcclxuXHRcdFx0ZmllbGROYW1lID0gJGZpZWxkLmF0dHIoXCJuYW1lXCIpLnJlcGxhY2UoJ1tdJywgJycpO1xyXG5cdFx0XHRcclxuXHRcdFx0ZmllbGRWYWwgPSBzZWxmLmdldFNlbGVjdFZhbCgkZmllbGQpOyBcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoaW5wdXRUeXBlPT1cIm11bHRpc2VsZWN0XCIpXHJcblx0XHR7XHJcblx0XHRcdCRmaWVsZCA9ICRjb250YWluZXIuZmluZChcInNlbGVjdFwiKTtcclxuXHRcdFx0ZmllbGROYW1lID0gJGZpZWxkLmF0dHIoXCJuYW1lXCIpLnJlcGxhY2UoJ1tdJywgJycpO1xyXG5cdFx0XHR2YXIgb3BlcmF0b3IgPSAkZmllbGQuYXR0cihcImRhdGEtb3BlcmF0b3JcIik7XHJcblx0XHRcdFxyXG5cdFx0XHRmaWVsZFZhbCA9IHNlbGYuZ2V0TXVsdGlTZWxlY3RWYWwoJGZpZWxkLCBcIm9yXCIpO1xyXG5cdFx0XHRcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoaW5wdXRUeXBlPT1cImNoZWNrYm94XCIpXHJcblx0XHR7XHJcblx0XHRcdCRmaWVsZCA9ICRjb250YWluZXIuZmluZChcInVsID4gbGkgaW5wdXQ6Y2hlY2tib3hcIik7XHJcblx0XHRcdFxyXG5cdFx0XHRpZigkZmllbGQubGVuZ3RoPjApXHJcblx0XHRcdHtcclxuXHRcdFx0XHRmaWVsZE5hbWUgPSAkZmllbGQuYXR0cihcIm5hbWVcIikucmVwbGFjZSgnW10nLCAnJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0dmFyIG9wZXJhdG9yID0gJGNvbnRhaW5lci5maW5kKFwiPiB1bFwiKS5hdHRyKFwiZGF0YS1vcGVyYXRvclwiKTtcclxuXHRcdFx0XHRmaWVsZFZhbCA9IHNlbGYuZ2V0Q2hlY2tib3hWYWwoJGZpZWxkLCBcIm9yXCIpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZihpbnB1dFR5cGU9PVwicmFkaW9cIilcclxuXHRcdHtcclxuXHRcdFx0XHJcblx0XHRcdCRmaWVsZCA9ICRjb250YWluZXIuZmluZChcInVsID4gbGkgaW5wdXQ6cmFkaW9cIik7XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRpZigkZmllbGQubGVuZ3RoPjApXHJcblx0XHRcdHtcclxuXHRcdFx0XHRmaWVsZE5hbWUgPSAkZmllbGQuYXR0cihcIm5hbWVcIikucmVwbGFjZSgnW10nLCAnJyk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0ZmllbGRWYWwgPSBzZWxmLmdldFJhZGlvVmFsKCRmaWVsZCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYodHlwZW9mKGZpZWxkVmFsKSE9XCJ1bmRlZmluZWRcIilcclxuXHRcdHtcclxuXHRcdFx0aWYoZmllbGRWYWwhPVwiXCIpXHJcblx0XHRcdHtcclxuXHRcdFx0XHR2YXIgZmllbGRTbHVnID0gXCJcIjtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZihmaWVsZE5hbWU9PVwiX3NmX2F1dGhvclwiKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGZpZWxkU2x1ZyA9IFwiYXV0aG9yc1wiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmKGZpZWxkTmFtZT09XCJfc2Zfc29ydF9vcmRlclwiKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGZpZWxkU2x1ZyA9IFwic29ydF9vcmRlclwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmKGZpZWxkTmFtZT09XCJfc2ZfcHBwXCIpXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0ZmllbGRTbHVnID0gXCJfc2ZfcHBwXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYoZmllbGROYW1lPT1cIl9zZl9wb3N0X3R5cGVcIilcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRmaWVsZFNsdWcgPSBcInBvc3RfdHlwZXNcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYoZmllbGRTbHVnIT1cIlwiKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdC8vc2VsZi51cmxfY29tcG9uZW50cyArPSBcIiZcIitmaWVsZFNsdWcrXCI9XCIrZmllbGRWYWw7XHJcblx0XHRcdFx0XHRzZWxmLnVybF9wYXJhbXNbZmllbGRTbHVnXSA9IGZpZWxkVmFsO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0fSxcclxuXHRwcm9jZXNzUG9zdFR5cGUgOiBmdW5jdGlvbigkdGhpcyl7XHJcblx0XHRcclxuXHRcdHRoaXMucHJvY2Vzc0F1dGhvcigkdGhpcyk7XHJcblx0XHRcclxuXHR9LFxyXG5cdHByb2Nlc3NQb3N0TWV0YTogZnVuY3Rpb24oJGNvbnRhaW5lcilcclxuXHR7XHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHRcclxuXHRcdHZhciBmaWVsZFR5cGUgPSAkY29udGFpbmVyLmF0dHIoXCJkYXRhLXNmLWZpZWxkLXR5cGVcIik7XHJcblx0XHR2YXIgaW5wdXRUeXBlID0gJGNvbnRhaW5lci5hdHRyKFwiZGF0YS1zZi1maWVsZC1pbnB1dC10eXBlXCIpO1xyXG5cdFx0dmFyIG1ldGFUeXBlID0gJGNvbnRhaW5lci5hdHRyKFwiZGF0YS1zZi1tZXRhLXR5cGVcIik7XHJcblxyXG5cdFx0dmFyIGZpZWxkVmFsID0gXCJcIjtcclxuXHRcdHZhciAkZmllbGQ7XHJcblx0XHR2YXIgZmllbGROYW1lID0gXCJcIjtcclxuXHRcdFxyXG5cdFx0aWYobWV0YVR5cGU9PVwibnVtYmVyXCIpXHJcblx0XHR7XHJcblx0XHRcdGlmKGlucHV0VHlwZT09XCJyYW5nZS1udW1iZXJcIilcclxuXHRcdFx0e1xyXG5cdFx0XHRcdCRmaWVsZCA9ICRjb250YWluZXIuZmluZChcIi5zZi1tZXRhLXJhbmdlLW51bWJlciBpbnB1dFwiKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHR2YXIgdmFsdWVzID0gW107XHJcblx0XHRcdFx0JGZpZWxkLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0dmFsdWVzLnB1c2goJCh0aGlzKS52YWwoKSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0ZmllbGRWYWwgPSB2YWx1ZXMuam9pbihcIitcIik7XHJcblx0XHRcdFx0XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZihpbnB1dFR5cGU9PVwicmFuZ2Utc2xpZGVyXCIpXHJcblx0XHRcdHtcclxuXHRcdFx0XHQkZmllbGQgPSAkY29udGFpbmVyLmZpbmQoXCIuc2YtbWV0YS1yYW5nZS1zbGlkZXIgaW5wdXRcIik7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Ly9nZXQgYW55IG51bWJlciBmb3JtYXR0aW5nIHN0dWZmXHJcblx0XHRcdFx0dmFyICRtZXRhX3JhbmdlID0gJGNvbnRhaW5lci5maW5kKFwiLnNmLW1ldGEtcmFuZ2Utc2xpZGVyXCIpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHZhciBkZWNpbWFsX3BsYWNlcyA9ICRtZXRhX3JhbmdlLmF0dHIoXCJkYXRhLWRlY2ltYWwtcGxhY2VzXCIpO1xyXG5cdFx0XHRcdHZhciB0aG91c2FuZF9zZXBlcmF0b3IgPSAkbWV0YV9yYW5nZS5hdHRyKFwiZGF0YS10aG91c2FuZC1zZXBlcmF0b3JcIik7XHJcblx0XHRcdFx0dmFyIGRlY2ltYWxfc2VwZXJhdG9yID0gJG1ldGFfcmFuZ2UuYXR0cihcImRhdGEtZGVjaW1hbC1zZXBlcmF0b3JcIik7XHJcblxyXG5cdFx0XHRcdHZhciBmaWVsZF9mb3JtYXQgPSB3TnVtYih7XHJcblx0XHRcdFx0XHRtYXJrOiBkZWNpbWFsX3NlcGVyYXRvcixcclxuXHRcdFx0XHRcdGRlY2ltYWxzOiBwYXJzZUZsb2F0KGRlY2ltYWxfcGxhY2VzKSxcclxuXHRcdFx0XHRcdHRob3VzYW5kOiB0aG91c2FuZF9zZXBlcmF0b3JcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHR2YXIgdmFsdWVzID0gW107XHJcblxyXG5cclxuXHRcdFx0XHR2YXIgc2xpZGVyX29iamVjdCA9ICRjb250YWluZXIuZmluZChcIi5tZXRhLXNsaWRlclwiKVswXTtcclxuXHRcdFx0XHQvL3ZhbCBmcm9tIHNsaWRlciBvYmplY3RcclxuXHRcdFx0XHR2YXIgc2xpZGVyX3ZhbCA9IHNsaWRlcl9vYmplY3Qubm9VaVNsaWRlci5nZXQoKTtcclxuXHJcblx0XHRcdFx0dmFsdWVzLnB1c2goZmllbGRfZm9ybWF0LmZyb20oc2xpZGVyX3ZhbFswXSkpO1xyXG5cdFx0XHRcdHZhbHVlcy5wdXNoKGZpZWxkX2Zvcm1hdC5mcm9tKHNsaWRlcl92YWxbMV0pKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRmaWVsZFZhbCA9IHZhbHVlcy5qb2luKFwiK1wiKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRmaWVsZE5hbWUgPSAkbWV0YV9yYW5nZS5hdHRyKFwiZGF0YS1zZi1maWVsZC1uYW1lXCIpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYoaW5wdXRUeXBlPT1cInJhbmdlLXJhZGlvXCIpXHJcblx0XHRcdHtcclxuXHRcdFx0XHQkZmllbGQgPSAkY29udGFpbmVyLmZpbmQoXCIuc2YtaW5wdXQtcmFuZ2UtcmFkaW9cIik7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYoJGZpZWxkLmxlbmd0aD09MClcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQvL3RoZW4gdHJ5IGFnYWluLCB3ZSBtdXN0IGJlIHVzaW5nIGEgc2luZ2xlIGZpZWxkXHJcblx0XHRcdFx0XHQkZmllbGQgPSAkY29udGFpbmVyLmZpbmQoXCI+IHVsXCIpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dmFyICRtZXRhX3JhbmdlID0gJGNvbnRhaW5lci5maW5kKFwiLnNmLW1ldGEtcmFuZ2VcIik7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Ly90aGVyZSBpcyBhbiBlbGVtZW50IHdpdGggYSBmcm9tL3RvIGNsYXNzIC0gc28gd2UgbmVlZCB0byBnZXQgdGhlIHZhbHVlcyBvZiB0aGUgZnJvbSAmIHRvIGlucHV0IGZpZWxkcyBzZXBlcmF0ZWx5XHJcblx0XHRcdFx0aWYoJGZpZWxkLmxlbmd0aD4wKVxyXG5cdFx0XHRcdHtcdFxyXG5cdFx0XHRcdFx0dmFyIGZpZWxkX3ZhbHMgPSBbXTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0JGZpZWxkLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdHZhciAkcmFkaW9zID0gJCh0aGlzKS5maW5kKFwiLnNmLWlucHV0LXJhZGlvXCIpO1xyXG5cdFx0XHRcdFx0XHRmaWVsZF92YWxzLnB1c2goc2VsZi5nZXRNZXRhUmFkaW9WYWwoJHJhZGlvcykpO1xyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQvL3ByZXZlbnQgc2Vjb25kIG51bWJlciBmcm9tIGJlaW5nIGxvd2VyIHRoYW4gdGhlIGZpcnN0XHJcblx0XHRcdFx0XHRpZihmaWVsZF92YWxzLmxlbmd0aD09MilcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0aWYoTnVtYmVyKGZpZWxkX3ZhbHNbMV0pPE51bWJlcihmaWVsZF92YWxzWzBdKSlcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdGZpZWxkX3ZhbHNbMV0gPSBmaWVsZF92YWxzWzBdO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGZpZWxkVmFsID0gZmllbGRfdmFscy5qb2luKFwiK1wiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRpZigkZmllbGQubGVuZ3RoPT0xKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGZpZWxkTmFtZSA9ICRmaWVsZC5maW5kKFwiLnNmLWlucHV0LXJhZGlvXCIpLmF0dHIoXCJuYW1lXCIpLnJlcGxhY2UoJ1tdJywgJycpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0ZmllbGROYW1lID0gJG1ldGFfcmFuZ2UuYXR0cihcImRhdGEtc2YtZmllbGQtbmFtZVwiKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYoaW5wdXRUeXBlPT1cInJhbmdlLXNlbGVjdFwiKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0JGZpZWxkID0gJGNvbnRhaW5lci5maW5kKFwiLnNmLWlucHV0LXNlbGVjdFwiKTtcclxuXHRcdFx0XHR2YXIgJG1ldGFfcmFuZ2UgPSAkY29udGFpbmVyLmZpbmQoXCIuc2YtbWV0YS1yYW5nZVwiKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHQvL3RoZXJlIGlzIGFuIGVsZW1lbnQgd2l0aCBhIGZyb20vdG8gY2xhc3MgLSBzbyB3ZSBuZWVkIHRvIGdldCB0aGUgdmFsdWVzIG9mIHRoZSBmcm9tICYgdG8gaW5wdXQgZmllbGRzIHNlcGVyYXRlbHlcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZigkZmllbGQubGVuZ3RoPjApXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dmFyIGZpZWxkX3ZhbHMgPSBbXTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0JGZpZWxkLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XHJcblx0XHRcdFx0XHRcdGZpZWxkX3ZhbHMucHVzaChzZWxmLmdldE1ldGFTZWxlY3RWYWwoJHRoaXMpKTtcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0Ly9wcmV2ZW50IHNlY29uZCBudW1iZXIgZnJvbSBiZWluZyBsb3dlciB0aGFuIHRoZSBmaXJzdFxyXG5cdFx0XHRcdFx0aWYoZmllbGRfdmFscy5sZW5ndGg9PTIpXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdGlmKE51bWJlcihmaWVsZF92YWxzWzFdKTxOdW1iZXIoZmllbGRfdmFsc1swXSkpXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRmaWVsZF92YWxzWzFdID0gZmllbGRfdmFsc1swXTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGZpZWxkVmFsID0gZmllbGRfdmFscy5qb2luKFwiK1wiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRpZigkZmllbGQubGVuZ3RoPT0xKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGZpZWxkTmFtZSA9ICRmaWVsZC5hdHRyKFwibmFtZVwiKS5yZXBsYWNlKCdbXScsICcnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGZpZWxkTmFtZSA9ICRtZXRhX3JhbmdlLmF0dHIoXCJkYXRhLXNmLWZpZWxkLW5hbWVcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYoaW5wdXRUeXBlPT1cInJhbmdlLWNoZWNrYm94XCIpXHJcblx0XHRcdHtcclxuXHRcdFx0XHQkZmllbGQgPSAkY29udGFpbmVyLmZpbmQoXCJ1bCA+IGxpIGlucHV0OmNoZWNrYm94XCIpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmKCRmaWVsZC5sZW5ndGg+MClcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRmaWVsZFZhbCA9IHNlbGYuZ2V0Q2hlY2tib3hWYWwoJGZpZWxkLCBcImFuZFwiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdGlmKGZpZWxkTmFtZT09XCJcIilcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGZpZWxkTmFtZSA9ICRmaWVsZC5hdHRyKFwibmFtZVwiKS5yZXBsYWNlKCdbXScsICcnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZihtZXRhVHlwZT09XCJjaG9pY2VcIilcclxuXHRcdHtcclxuXHRcdFx0aWYoaW5wdXRUeXBlPT1cInNlbGVjdFwiKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0JGZpZWxkID0gJGNvbnRhaW5lci5maW5kKFwic2VsZWN0XCIpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGZpZWxkVmFsID0gc2VsZi5nZXRNZXRhU2VsZWN0VmFsKCRmaWVsZCk7IFxyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYoaW5wdXRUeXBlPT1cIm11bHRpc2VsZWN0XCIpXHJcblx0XHRcdHtcclxuXHRcdFx0XHQkZmllbGQgPSAkY29udGFpbmVyLmZpbmQoXCJzZWxlY3RcIik7XHJcblx0XHRcdFx0dmFyIG9wZXJhdG9yID0gJGZpZWxkLmF0dHIoXCJkYXRhLW9wZXJhdG9yXCIpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGZpZWxkVmFsID0gc2VsZi5nZXRNZXRhTXVsdGlTZWxlY3RWYWwoJGZpZWxkLCBvcGVyYXRvcik7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZihpbnB1dFR5cGU9PVwiY2hlY2tib3hcIilcclxuXHRcdFx0e1xyXG5cdFx0XHRcdCRmaWVsZCA9ICRjb250YWluZXIuZmluZChcInVsID4gbGkgaW5wdXQ6Y2hlY2tib3hcIik7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYoJGZpZWxkLmxlbmd0aD4wKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHZhciBvcGVyYXRvciA9ICRjb250YWluZXIuZmluZChcIj4gdWxcIikuYXR0cihcImRhdGEtb3BlcmF0b3JcIik7XHJcblx0XHRcdFx0XHRmaWVsZFZhbCA9IHNlbGYuZ2V0TWV0YUNoZWNrYm94VmFsKCRmaWVsZCwgb3BlcmF0b3IpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmKGlucHV0VHlwZT09XCJyYWRpb1wiKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0JGZpZWxkID0gJGNvbnRhaW5lci5maW5kKFwidWwgPiBsaSBpbnB1dDpyYWRpb1wiKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZigkZmllbGQubGVuZ3RoPjApXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0ZmllbGRWYWwgPSBzZWxmLmdldE1ldGFSYWRpb1ZhbCgkZmllbGQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0ZmllbGRWYWwgPSBlbmNvZGVVUklDb21wb25lbnQoZmllbGRWYWwpO1xyXG5cdFx0XHRpZih0eXBlb2YoJGZpZWxkKSE9PVwidW5kZWZpbmVkXCIpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRpZigkZmllbGQubGVuZ3RoPjApXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0ZmllbGROYW1lID0gJGZpZWxkLmF0dHIoXCJuYW1lXCIpLnJlcGxhY2UoJ1tdJywgJycpO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQvL2ZvciB0aG9zZSB3aG8gaW5zaXN0IG9uIHVzaW5nICYgYW1wZXJzYW5kcyBpbiB0aGUgbmFtZSBvZiB0aGUgY3VzdG9tIGZpZWxkICghKVxyXG5cdFx0XHRcdFx0ZmllbGROYW1lID0gKGZpZWxkTmFtZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZihtZXRhVHlwZT09XCJkYXRlXCIpXHJcblx0XHR7XHJcblx0XHRcdHNlbGYucHJvY2Vzc1Bvc3REYXRlKCRjb250YWluZXIpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZih0eXBlb2YoZmllbGRWYWwpIT1cInVuZGVmaW5lZFwiKVxyXG5cdFx0e1xyXG5cdFx0XHRpZihmaWVsZFZhbCE9XCJcIilcclxuXHRcdFx0e1xyXG5cdFx0XHRcdC8vc2VsZi51cmxfY29tcG9uZW50cyArPSBcIiZcIitlbmNvZGVVUklDb21wb25lbnQoZmllbGROYW1lKStcIj1cIisoZmllbGRWYWwpO1xyXG5cdFx0XHRcdHNlbGYudXJsX3BhcmFtc1tlbmNvZGVVUklDb21wb25lbnQoZmllbGROYW1lKV0gPSAoZmllbGRWYWwpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHRwcm9jZXNzUG9zdERhdGU6IGZ1bmN0aW9uKCRjb250YWluZXIpXHJcblx0e1xyXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0XHJcblx0XHR2YXIgZmllbGRUeXBlID0gJGNvbnRhaW5lci5hdHRyKFwiZGF0YS1zZi1maWVsZC10eXBlXCIpO1xyXG5cdFx0dmFyIGlucHV0VHlwZSA9ICRjb250YWluZXIuYXR0cihcImRhdGEtc2YtZmllbGQtaW5wdXQtdHlwZVwiKTtcclxuXHRcdFxyXG5cdFx0dmFyICRmaWVsZDtcclxuXHRcdHZhciBmaWVsZE5hbWUgPSBcIlwiO1xyXG5cdFx0dmFyIGZpZWxkVmFsID0gXCJcIjtcclxuXHRcdFxyXG5cdFx0JGZpZWxkID0gJGNvbnRhaW5lci5maW5kKFwidWwgPiBsaSBpbnB1dDp0ZXh0XCIpO1xyXG5cdFx0ZmllbGROYW1lID0gJGZpZWxkLmF0dHIoXCJuYW1lXCIpLnJlcGxhY2UoJ1tdJywgJycpO1xyXG5cdFx0XHJcblx0XHR2YXIgZGF0ZXMgPSBbXTtcclxuXHRcdCRmaWVsZC5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFxyXG5cdFx0XHRkYXRlcy5wdXNoKCQodGhpcykudmFsKCkpO1xyXG5cdFx0XHJcblx0XHR9KTtcclxuXHRcdFxyXG5cdFx0aWYoJGZpZWxkLmxlbmd0aD09MilcclxuXHRcdHtcclxuXHRcdFx0aWYoKGRhdGVzWzBdIT1cIlwiKXx8KGRhdGVzWzFdIT1cIlwiKSlcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGZpZWxkVmFsID0gZGF0ZXMuam9pbihcIitcIik7XHJcblx0XHRcdFx0ZmllbGRWYWwgPSBmaWVsZFZhbC5yZXBsYWNlKC9cXC8vZywnJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoJGZpZWxkLmxlbmd0aD09MSlcclxuXHRcdHtcclxuXHRcdFx0aWYoZGF0ZXNbMF0hPVwiXCIpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRmaWVsZFZhbCA9IGRhdGVzLmpvaW4oXCIrXCIpO1xyXG5cdFx0XHRcdGZpZWxkVmFsID0gZmllbGRWYWwucmVwbGFjZSgvXFwvL2csJycpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGlmKHR5cGVvZihmaWVsZFZhbCkhPVwidW5kZWZpbmVkXCIpXHJcblx0XHR7XHJcblx0XHRcdGlmKGZpZWxkVmFsIT1cIlwiKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0dmFyIGZpZWxkU2x1ZyA9IFwiXCI7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYoZmllbGROYW1lPT1cIl9zZl9wb3N0X2RhdGVcIilcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRmaWVsZFNsdWcgPSBcInBvc3RfZGF0ZVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0ZmllbGRTbHVnID0gZmllbGROYW1lO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZihmaWVsZFNsdWchPVwiXCIpXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0Ly9zZWxmLnVybF9jb21wb25lbnRzICs9IFwiJlwiK2ZpZWxkU2x1ZytcIj1cIitmaWVsZFZhbDtcclxuXHRcdFx0XHRcdHNlbGYudXJsX3BhcmFtc1tmaWVsZFNsdWddID0gZmllbGRWYWw7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRcclxuXHR9LFxyXG5cdHByb2Nlc3NUYXhvbm9teTogZnVuY3Rpb24oJGNvbnRhaW5lciwgcmV0dXJuX29iamVjdClcclxuXHR7XHJcbiAgICAgICAgaWYodHlwZW9mKHJldHVybl9vYmplY3QpPT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuX29iamVjdCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcblx0XHQvL2lmKClcdFx0XHRcdFx0XHJcblx0XHQvL3ZhciBmaWVsZE5hbWUgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXNmLWZpZWxkLW5hbWVcIik7XHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHJcblx0XHR2YXIgZmllbGRUeXBlID0gJGNvbnRhaW5lci5hdHRyKFwiZGF0YS1zZi1maWVsZC10eXBlXCIpO1xyXG5cdFx0dmFyIGlucHV0VHlwZSA9ICRjb250YWluZXIuYXR0cihcImRhdGEtc2YtZmllbGQtaW5wdXQtdHlwZVwiKTtcclxuXHRcdFxyXG5cdFx0dmFyICRmaWVsZDtcclxuXHRcdHZhciBmaWVsZE5hbWUgPSBcIlwiO1xyXG5cdFx0dmFyIGZpZWxkVmFsID0gXCJcIjtcclxuXHRcdFxyXG5cdFx0aWYoaW5wdXRUeXBlPT1cInNlbGVjdFwiKVxyXG5cdFx0e1xyXG5cdFx0XHQkZmllbGQgPSAkY29udGFpbmVyLmZpbmQoXCJzZWxlY3RcIik7XHJcblx0XHRcdGZpZWxkTmFtZSA9ICRmaWVsZC5hdHRyKFwibmFtZVwiKS5yZXBsYWNlKCdbXScsICcnKTtcclxuXHRcdFx0XHJcblx0XHRcdGZpZWxkVmFsID0gc2VsZi5nZXRTZWxlY3RWYWwoJGZpZWxkKTsgXHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKGlucHV0VHlwZT09XCJtdWx0aXNlbGVjdFwiKVxyXG5cdFx0e1xyXG5cdFx0XHQkZmllbGQgPSAkY29udGFpbmVyLmZpbmQoXCJzZWxlY3RcIik7XHJcblx0XHRcdGZpZWxkTmFtZSA9ICRmaWVsZC5hdHRyKFwibmFtZVwiKS5yZXBsYWNlKCdbXScsICcnKTtcclxuXHRcdFx0dmFyIG9wZXJhdG9yID0gJGZpZWxkLmF0dHIoXCJkYXRhLW9wZXJhdG9yXCIpO1xyXG5cdFx0XHRcclxuXHRcdFx0ZmllbGRWYWwgPSBzZWxmLmdldE11bHRpU2VsZWN0VmFsKCRmaWVsZCwgb3BlcmF0b3IpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZihpbnB1dFR5cGU9PVwiY2hlY2tib3hcIilcclxuXHRcdHtcclxuXHRcdFx0JGZpZWxkID0gJGNvbnRhaW5lci5maW5kKFwidWwgPiBsaSBpbnB1dDpjaGVja2JveFwiKTtcclxuXHRcdFx0aWYoJGZpZWxkLmxlbmd0aD4wKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0ZmllbGROYW1lID0gJGZpZWxkLmF0dHIoXCJuYW1lXCIpLnJlcGxhY2UoJ1tdJywgJycpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdHZhciBvcGVyYXRvciA9ICRjb250YWluZXIuZmluZChcIj4gdWxcIikuYXR0cihcImRhdGEtb3BlcmF0b3JcIik7XHJcblx0XHRcdFx0ZmllbGRWYWwgPSBzZWxmLmdldENoZWNrYm94VmFsKCRmaWVsZCwgb3BlcmF0b3IpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKGlucHV0VHlwZT09XCJyYWRpb1wiKVxyXG5cdFx0e1xyXG5cdFx0XHQkZmllbGQgPSAkY29udGFpbmVyLmZpbmQoXCJ1bCA+IGxpIGlucHV0OnJhZGlvXCIpO1xyXG5cdFx0XHRpZigkZmllbGQubGVuZ3RoPjApXHJcblx0XHRcdHtcclxuXHRcdFx0XHRmaWVsZE5hbWUgPSAkZmllbGQuYXR0cihcIm5hbWVcIikucmVwbGFjZSgnW10nLCAnJyk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0ZmllbGRWYWwgPSBzZWxmLmdldFJhZGlvVmFsKCRmaWVsZCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYodHlwZW9mKGZpZWxkVmFsKSE9XCJ1bmRlZmluZWRcIilcclxuXHRcdHtcclxuXHRcdFx0aWYoZmllbGRWYWwhPVwiXCIpXHJcblx0XHRcdHtcclxuICAgICAgICAgICAgICAgIGlmKHJldHVybl9vYmplY3Q9PXRydWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtuYW1lOiBmaWVsZE5hbWUsIHZhbHVlOiBmaWVsZFZhbH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZWxmLnVybF9jb21wb25lbnRzICs9IFwiJlwiK2ZpZWxkTmFtZStcIj1cIitmaWVsZFZhbDtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnVybF9wYXJhbXNbZmllbGROYW1lXSA9IGZpZWxkVmFsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuICAgICAgICBpZihyZXR1cm5fb2JqZWN0PT10cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHR9XHJcbn07Il19
},{}],8:[function(require,module,exports){

module.exports = {
	
	searchForms: {},
	
	init: function(){
		
		
	},
	addSearchForm: function(id, object){
		
		this.searchForms[id] = object;
	},
	getSearchForm: function(id)
	{
		return this.searchForms[id];	
	}
	
};
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvcHVibGljL2Fzc2V0cy9qcy9hcHAuanMiLCJub2RlX21vZHVsZXMvanMtY29va2llL3NyYy9qcy5jb29raWUuanMiLCJub2RlX21vZHVsZXMvbm91aXNsaWRlci9kaXN0cmlidXRlL25vdWlzbGlkZXIuanMiLCJzcmMvcHVibGljL2Fzc2V0cy9qcy9pbmNsdWRlcy9maWVsZHMuanMiLCJzcmMvcHVibGljL2Fzc2V0cy9qcy9pbmNsdWRlcy9wYWdpbmF0aW9uLmpzIiwic3JjL3B1YmxpYy9hc3NldHMvanMvaW5jbHVkZXMvcGx1Z2luLmpzIiwic3JjL3B1YmxpYy9hc3NldHMvanMvaW5jbHVkZXMvcHJvY2Vzc19mb3JtLmpzIiwic3JjL3B1YmxpYy9hc3NldHMvanMvaW5jbHVkZXMvc3RhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzF5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzOEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxyXG52YXIgZmllbGRzID0gcmVxdWlyZSgnLi9pbmNsdWRlcy9maWVsZHMnKTtcclxudmFyIHBhZ2luYXRpb24gPSByZXF1aXJlKCcuL2luY2x1ZGVzL3BhZ2luYXRpb24nKTtcclxudmFyIHN0YXRlID0gcmVxdWlyZSgnLi9pbmNsdWRlcy9zdGF0ZScpO1xyXG52YXIgcGx1Z2luID0gcmVxdWlyZSgnLi9pbmNsdWRlcy9wbHVnaW4nKTtcclxuXHJcblxyXG4oZnVuY3Rpb24gKCAkICkge1xyXG5cclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0JChmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0U3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlQWxsID0gZnVuY3Rpb24oc3RyMSwgc3RyMiwgaWdub3JlKVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5yZXBsYWNlKG5ldyBSZWdFeHAoc3RyMS5yZXBsYWNlKC8oW1xcL1xcLFxcIVxcXFxcXF5cXCRcXHtcXH1cXFtcXF1cXChcXClcXC5cXCpcXCtcXD9cXHxcXDxcXD5cXC1cXCZdKS9nLFwiXFxcXCQmXCIpLChpZ25vcmU/XCJnaVwiOlwiZ1wiKSksKHR5cGVvZihzdHIyKT09XCJzdHJpbmdcIik/c3RyMi5yZXBsYWNlKC9cXCQvZyxcIiQkJCRcIik6c3RyMik7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFPYmplY3Qua2V5cykge1xyXG5cdFx0ICBPYmplY3Qua2V5cyA9IChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdCd1c2Ugc3RyaWN0JztcclxuXHRcdFx0dmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSxcclxuXHRcdFx0XHRoYXNEb250RW51bUJ1ZyA9ICEoe3RvU3RyaW5nOiBudWxsfSkucHJvcGVydHlJc0VudW1lcmFibGUoJ3RvU3RyaW5nJyksXHJcblx0XHRcdFx0ZG9udEVudW1zID0gW1xyXG5cdFx0XHRcdCAgJ3RvU3RyaW5nJyxcclxuXHRcdFx0XHQgICd0b0xvY2FsZVN0cmluZycsXHJcblx0XHRcdFx0ICAndmFsdWVPZicsXHJcblx0XHRcdFx0ICAnaGFzT3duUHJvcGVydHknLFxyXG5cdFx0XHRcdCAgJ2lzUHJvdG90eXBlT2YnLFxyXG5cdFx0XHRcdCAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcclxuXHRcdFx0XHQgICdjb25zdHJ1Y3RvcidcclxuXHRcdFx0XHRdLFxyXG5cdFx0XHRcdGRvbnRFbnVtc0xlbmd0aCA9IGRvbnRFbnVtcy5sZW5ndGg7XHJcblxyXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKG9iaikge1xyXG5cdFx0XHQgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyAmJiAodHlwZW9mIG9iaiAhPT0gJ2Z1bmN0aW9uJyB8fCBvYmogPT09IG51bGwpKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmtleXMgY2FsbGVkIG9uIG5vbi1vYmplY3QnKTtcclxuXHRcdFx0ICB9XHJcblxyXG5cdFx0XHQgIHZhciByZXN1bHQgPSBbXSwgcHJvcCwgaTtcclxuXHJcblx0XHRcdCAgZm9yIChwcm9wIGluIG9iaikge1xyXG5cdFx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIHtcclxuXHRcdFx0XHQgIHJlc3VsdC5wdXNoKHByb3ApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0ICB9XHJcblxyXG5cdFx0XHQgIGlmIChoYXNEb250RW51bUJ1Zykge1xyXG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBkb250RW51bXNMZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdCAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqLCBkb250RW51bXNbaV0pKSB7XHJcblx0XHRcdFx0XHRyZXN1bHQucHVzaChkb250RW51bXNbaV0pO1xyXG5cdFx0XHRcdCAgfVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0ICB9XHJcblx0XHRcdCAgcmV0dXJuIHJlc3VsdDtcclxuXHRcdFx0fTtcclxuXHRcdCAgfSgpKTtcclxuXHRcdH1cclxuXHJcblx0XHQvKiBTZWFyY2ggJiBGaWx0ZXIgalF1ZXJ5IFBsdWdpbiAqL1xyXG5cdFx0JC5mbi5zZWFyY2hBbmRGaWx0ZXIgPSBwbHVnaW47XHJcblxyXG5cdFx0LyogaW5pdCAqL1xyXG5cdFx0JChcIi5zZWFyY2hhbmRmaWx0ZXJcIikuc2VhcmNoQW5kRmlsdGVyKCk7XHJcblxyXG5cdFx0LyogZXh0ZXJuYWwgY29udHJvbHMgKi9cclxuXHRcdCQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIuc2VhcmNoLWZpbHRlci1yZXNldFwiLCBmdW5jdGlvbihlKXtcclxuXHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdHZhciBzZWFyY2hGb3JtSUQgPSB0eXBlb2YoJCh0aGlzKS5hdHRyKFwiZGF0YS1zZWFyY2gtZm9ybS1pZFwiKSkhPVwidW5kZWZpbmVkXCIgPyAkKHRoaXMpLmF0dHIoXCJkYXRhLXNlYXJjaC1mb3JtLWlkXCIpIDogXCJcIjtcclxuXHRcdFx0dmFyIHN1Ym1pdEZvcm0gPSB0eXBlb2YoJCh0aGlzKS5hdHRyKFwiZGF0YS1zZi1zdWJtaXQtZm9ybVwiKSkhPVwidW5kZWZpbmVkXCIgPyAkKHRoaXMpLmF0dHIoXCJkYXRhLXNmLXN1Ym1pdC1mb3JtXCIpIDogXCJcIjtcclxuXHJcblx0XHRcdHN0YXRlLmdldFNlYXJjaEZvcm0oc2VhcmNoRm9ybUlEKS5yZXNldChzdWJtaXRGb3JtKTtcclxuXHJcblx0XHRcdC8vdmFyICRsaW5rZWQgPSAkKFwiI3NlYXJjaC1maWx0ZXItZm9ybS1cIitzZWFyY2hGb3JtSUQpLnNlYXJjaEZpbHRlckZvcm0oe2FjdGlvbjogXCJyZXNldFwifSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdH0pO1xyXG5cclxuXHQkLmVhc2luZy5qc3dpbmc9JC5lYXNpbmcuc3dpbmc7JC5leHRlbmQoJC5lYXNpbmcse2RlZjpcImVhc2VPdXRRdWFkXCIsc3dpbmc6ZnVuY3Rpb24oZSx0LG4scixpKXtyZXR1cm4gJC5lYXNpbmdbJC5lYXNpbmcuZGVmXShlLHQsbixyLGkpfSxlYXNlSW5RdWFkOmZ1bmN0aW9uKGUsdCxuLHIsaSl7cmV0dXJuIHIqKHQvPWkpKnQrbn0sZWFzZU91dFF1YWQ6ZnVuY3Rpb24oZSx0LG4scixpKXtyZXR1cm4tcioodC89aSkqKHQtMikrbn0sZWFzZUluT3V0UXVhZDpmdW5jdGlvbihlLHQsbixyLGkpe2lmKCh0Lz1pLzIpPDEpcmV0dXJuIHIvMip0KnQrbjtyZXR1cm4tci8yKigtLXQqKHQtMiktMSkrbn0sZWFzZUluQ3ViaWM6ZnVuY3Rpb24oZSx0LG4scixpKXtyZXR1cm4gcioodC89aSkqdCp0K259LGVhc2VPdXRDdWJpYzpmdW5jdGlvbihlLHQsbixyLGkpe3JldHVybiByKigodD10L2ktMSkqdCp0KzEpK259LGVhc2VJbk91dEN1YmljOmZ1bmN0aW9uKGUsdCxuLHIsaSl7aWYoKHQvPWkvMik8MSlyZXR1cm4gci8yKnQqdCp0K247cmV0dXJuIHIvMiooKHQtPTIpKnQqdCsyKStufSxlYXNlSW5RdWFydDpmdW5jdGlvbihlLHQsbixyLGkpe3JldHVybiByKih0Lz1pKSp0KnQqdCtufSxlYXNlT3V0UXVhcnQ6ZnVuY3Rpb24oZSx0LG4scixpKXtyZXR1cm4tciooKHQ9dC9pLTEpKnQqdCp0LTEpK259LGVhc2VJbk91dFF1YXJ0OmZ1bmN0aW9uKGUsdCxuLHIsaSl7aWYoKHQvPWkvMik8MSlyZXR1cm4gci8yKnQqdCp0KnQrbjtyZXR1cm4tci8yKigodC09MikqdCp0KnQtMikrbn0sZWFzZUluUXVpbnQ6ZnVuY3Rpb24oZSx0LG4scixpKXtyZXR1cm4gcioodC89aSkqdCp0KnQqdCtufSxlYXNlT3V0UXVpbnQ6ZnVuY3Rpb24oZSx0LG4scixpKXtyZXR1cm4gciooKHQ9dC9pLTEpKnQqdCp0KnQrMSkrbn0sZWFzZUluT3V0UXVpbnQ6ZnVuY3Rpb24oZSx0LG4scixpKXtpZigodC89aS8yKTwxKXJldHVybiByLzIqdCp0KnQqdCp0K247cmV0dXJuIHIvMiooKHQtPTIpKnQqdCp0KnQrMikrbn0sZWFzZUluU2luZTpmdW5jdGlvbihlLHQsbixyLGkpe3JldHVybi1yKk1hdGguY29zKHQvaSooTWF0aC5QSS8yKSkrcitufSxlYXNlT3V0U2luZTpmdW5jdGlvbihlLHQsbixyLGkpe3JldHVybiByKk1hdGguc2luKHQvaSooTWF0aC5QSS8yKSkrbn0sZWFzZUluT3V0U2luZTpmdW5jdGlvbihlLHQsbixyLGkpe3JldHVybi1yLzIqKE1hdGguY29zKE1hdGguUEkqdC9pKS0xKStufSxlYXNlSW5FeHBvOmZ1bmN0aW9uKGUsdCxuLHIsaSl7cmV0dXJuIHQ9PTA/bjpyKk1hdGgucG93KDIsMTAqKHQvaS0xKSkrbn0sZWFzZU91dEV4cG86ZnVuY3Rpb24oZSx0LG4scixpKXtyZXR1cm4gdD09aT9uK3I6ciooLU1hdGgucG93KDIsLTEwKnQvaSkrMSkrbn0sZWFzZUluT3V0RXhwbzpmdW5jdGlvbihlLHQsbixyLGkpe2lmKHQ9PTApcmV0dXJuIG47aWYodD09aSlyZXR1cm4gbityO2lmKCh0Lz1pLzIpPDEpcmV0dXJuIHIvMipNYXRoLnBvdygyLDEwKih0LTEpKStuO3JldHVybiByLzIqKC1NYXRoLnBvdygyLC0xMCotLXQpKzIpK259LGVhc2VJbkNpcmM6ZnVuY3Rpb24oZSx0LG4scixpKXtyZXR1cm4tciooTWF0aC5zcXJ0KDEtKHQvPWkpKnQpLTEpK259LGVhc2VPdXRDaXJjOmZ1bmN0aW9uKGUsdCxuLHIsaSl7cmV0dXJuIHIqTWF0aC5zcXJ0KDEtKHQ9dC9pLTEpKnQpK259LGVhc2VJbk91dENpcmM6ZnVuY3Rpb24oZSx0LG4scixpKXtpZigodC89aS8yKTwxKXJldHVybi1yLzIqKE1hdGguc3FydCgxLXQqdCktMSkrbjtyZXR1cm4gci8yKihNYXRoLnNxcnQoMS0odC09MikqdCkrMSkrbn0sZWFzZUluRWxhc3RpYzpmdW5jdGlvbihlLHQsbixyLGkpe3ZhciBzPTEuNzAxNTg7dmFyIG89MDt2YXIgdT1yO2lmKHQ9PTApcmV0dXJuIG47aWYoKHQvPWkpPT0xKXJldHVybiBuK3I7aWYoIW8pbz1pKi4zO2lmKHU8TWF0aC5hYnMocikpe3U9cjt2YXIgcz1vLzR9ZWxzZSB2YXIgcz1vLygyKk1hdGguUEkpKk1hdGguYXNpbihyL3UpO3JldHVybi0odSpNYXRoLnBvdygyLDEwKih0LT0xKSkqTWF0aC5zaW4oKHQqaS1zKSoyKk1hdGguUEkvbykpK259LGVhc2VPdXRFbGFzdGljOmZ1bmN0aW9uKGUsdCxuLHIsaSl7dmFyIHM9MS43MDE1ODt2YXIgbz0wO3ZhciB1PXI7aWYodD09MClyZXR1cm4gbjtpZigodC89aSk9PTEpcmV0dXJuIG4rcjtpZighbylvPWkqLjM7aWYodTxNYXRoLmFicyhyKSl7dT1yO3ZhciBzPW8vNH1lbHNlIHZhciBzPW8vKDIqTWF0aC5QSSkqTWF0aC5hc2luKHIvdSk7cmV0dXJuIHUqTWF0aC5wb3coMiwtMTAqdCkqTWF0aC5zaW4oKHQqaS1zKSoyKk1hdGguUEkvbykrcitufSxlYXNlSW5PdXRFbGFzdGljOmZ1bmN0aW9uKGUsdCxuLHIsaSl7dmFyIHM9MS43MDE1ODt2YXIgbz0wO3ZhciB1PXI7aWYodD09MClyZXR1cm4gbjtpZigodC89aS8yKT09MilyZXR1cm4gbityO2lmKCFvKW89aSouMyoxLjU7aWYodTxNYXRoLmFicyhyKSl7dT1yO3ZhciBzPW8vNH1lbHNlIHZhciBzPW8vKDIqTWF0aC5QSSkqTWF0aC5hc2luKHIvdSk7aWYodDwxKXJldHVybi0uNSp1Kk1hdGgucG93KDIsMTAqKHQtPTEpKSpNYXRoLnNpbigodCppLXMpKjIqTWF0aC5QSS9vKStuO3JldHVybiB1Kk1hdGgucG93KDIsLTEwKih0LT0xKSkqTWF0aC5zaW4oKHQqaS1zKSoyKk1hdGguUEkvbykqLjUrcitufSxlYXNlSW5CYWNrOmZ1bmN0aW9uKGUsdCxuLHIsaSxzKXtpZihzPT11bmRlZmluZWQpcz0xLjcwMTU4O3JldHVybiByKih0Lz1pKSp0KigocysxKSp0LXMpK259LGVhc2VPdXRCYWNrOmZ1bmN0aW9uKGUsdCxuLHIsaSxzKXtpZihzPT11bmRlZmluZWQpcz0xLjcwMTU4O3JldHVybiByKigodD10L2ktMSkqdCooKHMrMSkqdCtzKSsxKStufSxlYXNlSW5PdXRCYWNrOmZ1bmN0aW9uKGUsdCxuLHIsaSxzKXtpZihzPT11bmRlZmluZWQpcz0xLjcwMTU4O2lmKCh0Lz1pLzIpPDEpcmV0dXJuIHIvMip0KnQqKCgocyo9MS41MjUpKzEpKnQtcykrbjtyZXR1cm4gci8yKigodC09MikqdCooKChzKj0xLjUyNSkrMSkqdCtzKSsyKStufSxlYXNlSW5Cb3VuY2U6ZnVuY3Rpb24oZSx0LG4scixpKXtyZXR1cm4gci0kLmVhc2luZy5lYXNlT3V0Qm91bmNlKGUsaS10LDAscixpKStufSxlYXNlT3V0Qm91bmNlOmZ1bmN0aW9uKGUsdCxuLHIsaSl7aWYoKHQvPWkpPDEvMi43NSl7cmV0dXJuIHIqNy41NjI1KnQqdCtufWVsc2UgaWYodDwyLzIuNzUpe3JldHVybiByKig3LjU2MjUqKHQtPTEuNS8yLjc1KSp0Ky43NSkrbn1lbHNlIGlmKHQ8Mi41LzIuNzUpe3JldHVybiByKig3LjU2MjUqKHQtPTIuMjUvMi43NSkqdCsuOTM3NSkrbn1lbHNle3JldHVybiByKig3LjU2MjUqKHQtPTIuNjI1LzIuNzUpKnQrLjk4NDM3NSkrbn19LGVhc2VJbk91dEJvdW5jZTpmdW5jdGlvbihlLHQsbixyLGkpe2lmKHQ8aS8yKXJldHVybiAkLmVhc2luZy5lYXNlSW5Cb3VuY2UoZSx0KjIsMCxyLGkpKi41K247cmV0dXJuICQuZWFzaW5nLmVhc2VPdXRCb3VuY2UoZSx0KjItaSwwLHIsaSkqLjUrciouNStufX0pXHJcblxyXG59KGpRdWVyeSkpO1xyXG5cclxuLyogd3BudW1iIC0gbm91aXNsaWRlciBudW1iZXIgZm9ybWF0dGluZyAqL1xyXG4hZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBlKGUpe3JldHVybiBlLnNwbGl0KFwiXCIpLnJldmVyc2UoKS5qb2luKFwiXCIpfWZ1bmN0aW9uIG4oZSxuKXtyZXR1cm4gZS5zdWJzdHJpbmcoMCxuLmxlbmd0aCk9PT1ufWZ1bmN0aW9uIHIoZSxuKXtyZXR1cm4gZS5zbGljZSgtMSpuLmxlbmd0aCk9PT1ufWZ1bmN0aW9uIHQoZSxuLHIpe2lmKChlW25dfHxlW3JdKSYmZVtuXT09PWVbcl0pdGhyb3cgbmV3IEVycm9yKG4pfWZ1bmN0aW9uIGkoZSl7cmV0dXJuXCJudW1iZXJcIj09dHlwZW9mIGUmJmlzRmluaXRlKGUpfWZ1bmN0aW9uIG8oZSxuKXt2YXIgcj1NYXRoLnBvdygxMCxuKTtyZXR1cm4oTWF0aC5yb3VuZChlKnIpL3IpLnRvRml4ZWQobil9ZnVuY3Rpb24gdShuLHIsdCx1LGYsYSxjLHMscCxkLGwsaCl7dmFyIGcsdix3LG09aCx4PVwiXCIsYj1cIlwiO3JldHVybiBhJiYoaD1hKGgpKSxpKGgpPyhuIT09ITEmJjA9PT1wYXJzZUZsb2F0KGgudG9GaXhlZChuKSkmJihoPTApLDA+aCYmKGc9ITAsaD1NYXRoLmFicyhoKSksbiE9PSExJiYoaD1vKGgsbikpLGg9aC50b1N0cmluZygpLC0xIT09aC5pbmRleE9mKFwiLlwiKT8odj1oLnNwbGl0KFwiLlwiKSx3PXZbMF0sdCYmKHg9dCt2WzFdKSk6dz1oLHImJih3PWUodykubWF0Y2goLy57MSwzfS9nKSx3PWUody5qb2luKGUocikpKSksZyYmcyYmKGIrPXMpLHUmJihiKz11KSxnJiZwJiYoYis9cCksYis9dyxiKz14LGYmJihiKz1mKSxkJiYoYj1kKGIsbSkpLGIpOiExfWZ1bmN0aW9uIGYoZSx0LG8sdSxmLGEsYyxzLHAsZCxsLGgpe3ZhciBnLHY9XCJcIjtyZXR1cm4gbCYmKGg9bChoKSksaCYmXCJzdHJpbmdcIj09dHlwZW9mIGg/KHMmJm4oaCxzKSYmKGg9aC5yZXBsYWNlKHMsXCJcIiksZz0hMCksdSYmbihoLHUpJiYoaD1oLnJlcGxhY2UodSxcIlwiKSkscCYmbihoLHApJiYoaD1oLnJlcGxhY2UocCxcIlwiKSxnPSEwKSxmJiZyKGgsZikmJihoPWguc2xpY2UoMCwtMSpmLmxlbmd0aCkpLHQmJihoPWguc3BsaXQodCkuam9pbihcIlwiKSksbyYmKGg9aC5yZXBsYWNlKG8sXCIuXCIpKSxnJiYodis9XCItXCIpLHYrPWgsdj12LnJlcGxhY2UoL1teMC05XFwuXFwtLl0vZyxcIlwiKSxcIlwiPT09dj8hMToodj1OdW1iZXIodiksYyYmKHY9Yyh2KSksaSh2KT92OiExKSk6ITF9ZnVuY3Rpb24gYShlKXt2YXIgbixyLGksbz17fTtmb3Iobj0wO248cC5sZW5ndGg7bis9MSlpZihyPXBbbl0saT1lW3JdLHZvaWQgMD09PWkpXCJuZWdhdGl2ZVwiIT09cnx8by5uZWdhdGl2ZUJlZm9yZT9cIm1hcmtcIj09PXImJlwiLlwiIT09by50aG91c2FuZD9vW3JdPVwiLlwiOm9bcl09ITE6b1tyXT1cIi1cIjtlbHNlIGlmKFwiZGVjaW1hbHNcIj09PXIpe2lmKCEoaT49MCYmOD5pKSl0aHJvdyBuZXcgRXJyb3Iocik7b1tyXT1pfWVsc2UgaWYoXCJlbmNvZGVyXCI9PT1yfHxcImRlY29kZXJcIj09PXJ8fFwiZWRpdFwiPT09cnx8XCJ1bmRvXCI9PT1yKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBpKXRocm93IG5ldyBFcnJvcihyKTtvW3JdPWl9ZWxzZXtpZihcInN0cmluZ1wiIT10eXBlb2YgaSl0aHJvdyBuZXcgRXJyb3Iocik7b1tyXT1pfXJldHVybiB0KG8sXCJtYXJrXCIsXCJ0aG91c2FuZFwiKSx0KG8sXCJwcmVmaXhcIixcIm5lZ2F0aXZlXCIpLHQobyxcInByZWZpeFwiLFwibmVnYXRpdmVCZWZvcmVcIiksb31mdW5jdGlvbiBjKGUsbixyKXt2YXIgdCxpPVtdO2Zvcih0PTA7dDxwLmxlbmd0aDt0Kz0xKWkucHVzaChlW3BbdF1dKTtyZXR1cm4gaS5wdXNoKHIpLG4uYXBwbHkoXCJcIixpKX1mdW5jdGlvbiBzKGUpe3JldHVybiB0aGlzIGluc3RhbmNlb2Ygcz92b2lkKFwib2JqZWN0XCI9PXR5cGVvZiBlJiYoZT1hKGUpLHRoaXMudG89ZnVuY3Rpb24obil7cmV0dXJuIGMoZSx1LG4pfSx0aGlzLmZyb209ZnVuY3Rpb24obil7cmV0dXJuIGMoZSxmLG4pfSkpOm5ldyBzKGUpfXZhciBwPVtcImRlY2ltYWxzXCIsXCJ0aG91c2FuZFwiLFwibWFya1wiLFwicHJlZml4XCIsXCJwb3N0Zml4XCIsXCJlbmNvZGVyXCIsXCJkZWNvZGVyXCIsXCJuZWdhdGl2ZUJlZm9yZVwiLFwibmVnYXRpdmVcIixcImVkaXRcIixcInVuZG9cIl07d2luZG93LndOdW1iPXN9KCk7XHJcblxyXG4iLCIvKiFcbiAqIEphdmFTY3JpcHQgQ29va2llIHYyLjIuMFxuICogaHR0cHM6Ly9naXRodWIuY29tL2pzLWNvb2tpZS9qcy1jb29raWVcbiAqXG4gKiBDb3B5cmlnaHQgMjAwNiwgMjAxNSBLbGF1cyBIYXJ0bCAmIEZhZ25lciBCcmFja1xuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbjsoZnVuY3Rpb24gKGZhY3RvcnkpIHtcblx0dmFyIHJlZ2lzdGVyZWRJbk1vZHVsZUxvYWRlciA9IGZhbHNlO1xuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKGZhY3RvcnkpO1xuXHRcdHJlZ2lzdGVyZWRJbk1vZHVsZUxvYWRlciA9IHRydWU7XG5cdH1cblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRcdHJlZ2lzdGVyZWRJbk1vZHVsZUxvYWRlciA9IHRydWU7XG5cdH1cblx0aWYgKCFyZWdpc3RlcmVkSW5Nb2R1bGVMb2FkZXIpIHtcblx0XHR2YXIgT2xkQ29va2llcyA9IHdpbmRvdy5Db29raWVzO1xuXHRcdHZhciBhcGkgPSB3aW5kb3cuQ29va2llcyA9IGZhY3RvcnkoKTtcblx0XHRhcGkubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHdpbmRvdy5Db29raWVzID0gT2xkQ29va2llcztcblx0XHRcdHJldHVybiBhcGk7XG5cdFx0fTtcblx0fVxufShmdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIGV4dGVuZCAoKSB7XG5cdFx0dmFyIGkgPSAwO1xuXHRcdHZhciByZXN1bHQgPSB7fTtcblx0XHRmb3IgKDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGF0dHJpYnV0ZXMgPSBhcmd1bWVudHNbIGkgXTtcblx0XHRcdGZvciAodmFyIGtleSBpbiBhdHRyaWJ1dGVzKSB7XG5cdFx0XHRcdHJlc3VsdFtrZXldID0gYXR0cmlidXRlc1trZXldO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0ZnVuY3Rpb24gaW5pdCAoY29udmVydGVyKSB7XG5cdFx0ZnVuY3Rpb24gYXBpIChrZXksIHZhbHVlLCBhdHRyaWJ1dGVzKSB7XG5cdFx0XHR2YXIgcmVzdWx0O1xuXHRcdFx0aWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBXcml0ZVxuXG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcblx0XHRcdFx0YXR0cmlidXRlcyA9IGV4dGVuZCh7XG5cdFx0XHRcdFx0cGF0aDogJy8nXG5cdFx0XHRcdH0sIGFwaS5kZWZhdWx0cywgYXR0cmlidXRlcyk7XG5cblx0XHRcdFx0aWYgKHR5cGVvZiBhdHRyaWJ1dGVzLmV4cGlyZXMgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdFx0dmFyIGV4cGlyZXMgPSBuZXcgRGF0ZSgpO1xuXHRcdFx0XHRcdGV4cGlyZXMuc2V0TWlsbGlzZWNvbmRzKGV4cGlyZXMuZ2V0TWlsbGlzZWNvbmRzKCkgKyBhdHRyaWJ1dGVzLmV4cGlyZXMgKiA4NjRlKzUpO1xuXHRcdFx0XHRcdGF0dHJpYnV0ZXMuZXhwaXJlcyA9IGV4cGlyZXM7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBXZSdyZSB1c2luZyBcImV4cGlyZXNcIiBiZWNhdXNlIFwibWF4LWFnZVwiIGlzIG5vdCBzdXBwb3J0ZWQgYnkgSUVcblx0XHRcdFx0YXR0cmlidXRlcy5leHBpcmVzID0gYXR0cmlidXRlcy5leHBpcmVzID8gYXR0cmlidXRlcy5leHBpcmVzLnRvVVRDU3RyaW5nKCkgOiAnJztcblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHJlc3VsdCA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcblx0XHRcdFx0XHRpZiAoL15bXFx7XFxbXS8udGVzdChyZXN1bHQpKSB7XG5cdFx0XHRcdFx0XHR2YWx1ZSA9IHJlc3VsdDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHt9XG5cblx0XHRcdFx0aWYgKCFjb252ZXJ0ZXIud3JpdGUpIHtcblx0XHRcdFx0XHR2YWx1ZSA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcodmFsdWUpKVxuXHRcdFx0XHRcdFx0LnJlcGxhY2UoLyUoMjN8MjR8MjZ8MkJ8M0F8M0N8M0V8M0R8MkZ8M0Z8NDB8NUJ8NUR8NUV8NjB8N0J8N0R8N0MpL2csIGRlY29kZVVSSUNvbXBvbmVudCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFsdWUgPSBjb252ZXJ0ZXIud3JpdGUodmFsdWUsIGtleSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRrZXkgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGtleSkpO1xuXHRcdFx0XHRrZXkgPSBrZXkucmVwbGFjZSgvJSgyM3wyNHwyNnwyQnw1RXw2MHw3QykvZywgZGVjb2RlVVJJQ29tcG9uZW50KTtcblx0XHRcdFx0a2V5ID0ga2V5LnJlcGxhY2UoL1tcXChcXCldL2csIGVzY2FwZSk7XG5cblx0XHRcdFx0dmFyIHN0cmluZ2lmaWVkQXR0cmlidXRlcyA9ICcnO1xuXG5cdFx0XHRcdGZvciAodmFyIGF0dHJpYnV0ZU5hbWUgaW4gYXR0cmlidXRlcykge1xuXHRcdFx0XHRcdGlmICghYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSkge1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHN0cmluZ2lmaWVkQXR0cmlidXRlcyArPSAnOyAnICsgYXR0cmlidXRlTmFtZTtcblx0XHRcdFx0XHRpZiAoYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHN0cmluZ2lmaWVkQXR0cmlidXRlcyArPSAnPScgKyBhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiAoZG9jdW1lbnQuY29va2llID0ga2V5ICsgJz0nICsgdmFsdWUgKyBzdHJpbmdpZmllZEF0dHJpYnV0ZXMpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZWFkXG5cblx0XHRcdGlmICgha2V5KSB7XG5cdFx0XHRcdHJlc3VsdCA9IHt9O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBUbyBwcmV2ZW50IHRoZSBmb3IgbG9vcCBpbiB0aGUgZmlyc3QgcGxhY2UgYXNzaWduIGFuIGVtcHR5IGFycmF5XG5cdFx0XHQvLyBpbiBjYXNlIHRoZXJlIGFyZSBubyBjb29raWVzIGF0IGFsbC4gQWxzbyBwcmV2ZW50cyBvZGQgcmVzdWx0IHdoZW5cblx0XHRcdC8vIGNhbGxpbmcgXCJnZXQoKVwiXG5cdFx0XHR2YXIgY29va2llcyA9IGRvY3VtZW50LmNvb2tpZSA/IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOyAnKSA6IFtdO1xuXHRcdFx0dmFyIHJkZWNvZGUgPSAvKCVbMC05QS1aXXsyfSkrL2c7XG5cdFx0XHR2YXIgaSA9IDA7XG5cblx0XHRcdGZvciAoOyBpIDwgY29va2llcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgcGFydHMgPSBjb29raWVzW2ldLnNwbGl0KCc9Jyk7XG5cdFx0XHRcdHZhciBjb29raWUgPSBwYXJ0cy5zbGljZSgxKS5qb2luKCc9Jyk7XG5cblx0XHRcdFx0aWYgKCF0aGlzLmpzb24gJiYgY29va2llLmNoYXJBdCgwKSA9PT0gJ1wiJykge1xuXHRcdFx0XHRcdGNvb2tpZSA9IGNvb2tpZS5zbGljZSgxLCAtMSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHZhciBuYW1lID0gcGFydHNbMF0ucmVwbGFjZShyZGVjb2RlLCBkZWNvZGVVUklDb21wb25lbnQpO1xuXHRcdFx0XHRcdGNvb2tpZSA9IGNvbnZlcnRlci5yZWFkID9cblx0XHRcdFx0XHRcdGNvbnZlcnRlci5yZWFkKGNvb2tpZSwgbmFtZSkgOiBjb252ZXJ0ZXIoY29va2llLCBuYW1lKSB8fFxuXHRcdFx0XHRcdFx0Y29va2llLnJlcGxhY2UocmRlY29kZSwgZGVjb2RlVVJJQ29tcG9uZW50KTtcblxuXHRcdFx0XHRcdGlmICh0aGlzLmpzb24pIHtcblx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdGNvb2tpZSA9IEpTT04ucGFyc2UoY29va2llKTtcblx0XHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHt9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKGtleSA9PT0gbmFtZSkge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gY29va2llO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKCFrZXkpIHtcblx0XHRcdFx0XHRcdHJlc3VsdFtuYW1lXSA9IGNvb2tpZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHt9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdFx0YXBpLnNldCA9IGFwaTtcblx0XHRhcGkuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0cmV0dXJuIGFwaS5jYWxsKGFwaSwga2V5KTtcblx0XHR9O1xuXHRcdGFwaS5nZXRKU09OID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGFwaS5hcHBseSh7XG5cdFx0XHRcdGpzb246IHRydWVcblx0XHRcdH0sIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG5cdFx0fTtcblx0XHRhcGkuZGVmYXVsdHMgPSB7fTtcblxuXHRcdGFwaS5yZW1vdmUgPSBmdW5jdGlvbiAoa2V5LCBhdHRyaWJ1dGVzKSB7XG5cdFx0XHRhcGkoa2V5LCAnJywgZXh0ZW5kKGF0dHJpYnV0ZXMsIHtcblx0XHRcdFx0ZXhwaXJlczogLTFcblx0XHRcdH0pKTtcblx0XHR9O1xuXG5cdFx0YXBpLndpdGhDb252ZXJ0ZXIgPSBpbml0O1xuXG5cdFx0cmV0dXJuIGFwaTtcblx0fVxuXG5cdHJldHVybiBpbml0KGZ1bmN0aW9uICgpIHt9KTtcbn0pKTtcbiIsIi8qISBub3Vpc2xpZGVyIC0gMTEuMS4wIC0gMjAxOC0wNC0wMiAxMToxODoxMyAqL1xyXG5cclxuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XHJcblxyXG4gICAgaWYgKCB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XHJcblxyXG4gICAgICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cclxuICAgICAgICBkZWZpbmUoW10sIGZhY3RvcnkpO1xyXG5cclxuICAgIH0gZWxzZSBpZiAoIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyApIHtcclxuXHJcbiAgICAgICAgLy8gTm9kZS9Db21tb25KU1xyXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xyXG4gICAgICAgIHdpbmRvdy5ub1VpU2xpZGVyID0gZmFjdG9yeSgpO1xyXG4gICAgfVxyXG5cclxufShmdW5jdGlvbiggKXtcclxuXHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHR2YXIgVkVSU0lPTiA9ICcxMS4xLjAnO1xyXG5cclxuXG5cdGZ1bmN0aW9uIGlzVmFsaWRGb3JtYXR0ZXIgKCBlbnRyeSApIHtcblx0XHRyZXR1cm4gdHlwZW9mIGVudHJ5ID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgZW50cnkudG8gPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGVudHJ5LmZyb20gPT09ICdmdW5jdGlvbic7XG5cdH1cblxuXHRmdW5jdGlvbiByZW1vdmVFbGVtZW50ICggZWwgKSB7XG5cdFx0ZWwucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChlbCk7XG5cdH1cblxuXHRmdW5jdGlvbiBpc1NldCAoIHZhbHVlICkge1xuXHRcdHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkO1xuXHR9XG5cblx0Ly8gQmluZGFibGUgdmVyc2lvblxuXHRmdW5jdGlvbiBwcmV2ZW50RGVmYXVsdCAoIGUgKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHR9XG5cblx0Ly8gUmVtb3ZlcyBkdXBsaWNhdGVzIGZyb20gYW4gYXJyYXkuXG5cdGZ1bmN0aW9uIHVuaXF1ZSAoIGFycmF5ICkge1xuXHRcdHJldHVybiBhcnJheS5maWx0ZXIoZnVuY3Rpb24oYSl7XG5cdFx0XHRyZXR1cm4gIXRoaXNbYV0gPyB0aGlzW2FdID0gdHJ1ZSA6IGZhbHNlO1xuXHRcdH0sIHt9KTtcblx0fVxuXG5cdC8vIFJvdW5kIGEgdmFsdWUgdG8gdGhlIGNsb3Nlc3QgJ3RvJy5cblx0ZnVuY3Rpb24gY2xvc2VzdCAoIHZhbHVlLCB0byApIHtcblx0XHRyZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAvIHRvKSAqIHRvO1xuXHR9XG5cblx0Ly8gQ3VycmVudCBwb3NpdGlvbiBvZiBhbiBlbGVtZW50IHJlbGF0aXZlIHRvIHRoZSBkb2N1bWVudC5cblx0ZnVuY3Rpb24gb2Zmc2V0ICggZWxlbSwgb3JpZW50YXRpb24gKSB7XG5cblx0XHR2YXIgcmVjdCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0dmFyIGRvYyA9IGVsZW0ub3duZXJEb2N1bWVudDtcblx0XHR2YXIgZG9jRWxlbSA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG5cdFx0dmFyIHBhZ2VPZmZzZXQgPSBnZXRQYWdlT2Zmc2V0KGRvYyk7XG5cblx0XHQvLyBnZXRCb3VuZGluZ0NsaWVudFJlY3QgY29udGFpbnMgbGVmdCBzY3JvbGwgaW4gQ2hyb21lIG9uIEFuZHJvaWQuXG5cdFx0Ly8gSSBoYXZlbid0IGZvdW5kIGEgZmVhdHVyZSBkZXRlY3Rpb24gdGhhdCBwcm92ZXMgdGhpcy4gV29yc3QgY2FzZVxuXHRcdC8vIHNjZW5hcmlvIG9uIG1pcy1tYXRjaDogdGhlICd0YXAnIGZlYXR1cmUgb24gaG9yaXpvbnRhbCBzbGlkZXJzIGJyZWFrcy5cblx0XHRpZiAoIC93ZWJraXQuKkNocm9tZS4qTW9iaWxlL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSApIHtcblx0XHRcdHBhZ2VPZmZzZXQueCA9IDA7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG9yaWVudGF0aW9uID8gKHJlY3QudG9wICsgcGFnZU9mZnNldC55IC0gZG9jRWxlbS5jbGllbnRUb3ApIDogKHJlY3QubGVmdCArIHBhZ2VPZmZzZXQueCAtIGRvY0VsZW0uY2xpZW50TGVmdCk7XG5cdH1cblxuXHQvLyBDaGVja3Mgd2hldGhlciBhIHZhbHVlIGlzIG51bWVyaWNhbC5cblx0ZnVuY3Rpb24gaXNOdW1lcmljICggYSApIHtcblx0XHRyZXR1cm4gdHlwZW9mIGEgPT09ICdudW1iZXInICYmICFpc05hTiggYSApICYmIGlzRmluaXRlKCBhICk7XG5cdH1cblxuXHQvLyBTZXRzIGEgY2xhc3MgYW5kIHJlbW92ZXMgaXQgYWZ0ZXIgW2R1cmF0aW9uXSBtcy5cblx0ZnVuY3Rpb24gYWRkQ2xhc3NGb3IgKCBlbGVtZW50LCBjbGFzc05hbWUsIGR1cmF0aW9uICkge1xuXHRcdGlmIChkdXJhdGlvbiA+IDApIHtcblx0XHRhZGRDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpO1xuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0XHRyZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpO1xuXHRcdFx0fSwgZHVyYXRpb24pO1xuXHRcdH1cblx0fVxuXG5cdC8vIExpbWl0cyBhIHZhbHVlIHRvIDAgLSAxMDBcblx0ZnVuY3Rpb24gbGltaXQgKCBhICkge1xuXHRcdHJldHVybiBNYXRoLm1heChNYXRoLm1pbihhLCAxMDApLCAwKTtcblx0fVxuXG5cdC8vIFdyYXBzIGEgdmFyaWFibGUgYXMgYW4gYXJyYXksIGlmIGl0IGlzbid0IG9uZSB5ZXQuXG5cdC8vIE5vdGUgdGhhdCBhbiBpbnB1dCBhcnJheSBpcyByZXR1cm5lZCBieSByZWZlcmVuY2UhXG5cdGZ1bmN0aW9uIGFzQXJyYXkgKCBhICkge1xuXHRcdHJldHVybiBBcnJheS5pc0FycmF5KGEpID8gYSA6IFthXTtcblx0fVxuXG5cdC8vIENvdW50cyBkZWNpbWFsc1xuXHRmdW5jdGlvbiBjb3VudERlY2ltYWxzICggbnVtU3RyICkge1xuXHRcdG51bVN0ciA9IFN0cmluZyhudW1TdHIpO1xuXHRcdHZhciBwaWVjZXMgPSBudW1TdHIuc3BsaXQoXCIuXCIpO1xuXHRcdHJldHVybiBwaWVjZXMubGVuZ3RoID4gMSA/IHBpZWNlc1sxXS5sZW5ndGggOiAwO1xuXHR9XG5cblx0Ly8gaHR0cDovL3lvdW1pZ2h0bm90bmVlZGpxdWVyeS5jb20vI2FkZF9jbGFzc1xuXHRmdW5jdGlvbiBhZGRDbGFzcyAoIGVsLCBjbGFzc05hbWUgKSB7XG5cdFx0aWYgKCBlbC5jbGFzc0xpc3QgKSB7XG5cdFx0XHRlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVsLmNsYXNzTmFtZSArPSAnICcgKyBjbGFzc05hbWU7XG5cdFx0fVxuXHR9XG5cblx0Ly8gaHR0cDovL3lvdW1pZ2h0bm90bmVlZGpxdWVyeS5jb20vI3JlbW92ZV9jbGFzc1xuXHRmdW5jdGlvbiByZW1vdmVDbGFzcyAoIGVsLCBjbGFzc05hbWUgKSB7XG5cdFx0aWYgKCBlbC5jbGFzc0xpc3QgKSB7XG5cdFx0XHRlbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhefFxcXFxiKScgKyBjbGFzc05hbWUuc3BsaXQoJyAnKS5qb2luKCd8JykgKyAnKFxcXFxifCQpJywgJ2dpJyksICcgJyk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gaHR0cHM6Ly9wbGFpbmpzLmNvbS9qYXZhc2NyaXB0L2F0dHJpYnV0ZXMvYWRkaW5nLXJlbW92aW5nLWFuZC10ZXN0aW5nLWZvci1jbGFzc2VzLTkvXG5cdGZ1bmN0aW9uIGhhc0NsYXNzICggZWwsIGNsYXNzTmFtZSApIHtcblx0XHRyZXR1cm4gZWwuY2xhc3NMaXN0ID8gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkgOiBuZXcgUmVnRXhwKCdcXFxcYicgKyBjbGFzc05hbWUgKyAnXFxcXGInKS50ZXN0KGVsLmNsYXNzTmFtZSk7XG5cdH1cblxuXHQvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2luZG93L3Njcm9sbFkjTm90ZXNcblx0ZnVuY3Rpb24gZ2V0UGFnZU9mZnNldCAoIGRvYyApIHtcblxuXHRcdHZhciBzdXBwb3J0UGFnZU9mZnNldCA9IHdpbmRvdy5wYWdlWE9mZnNldCAhPT0gdW5kZWZpbmVkO1xuXHRcdHZhciBpc0NTUzFDb21wYXQgPSAoKGRvYy5jb21wYXRNb2RlIHx8IFwiXCIpID09PSBcIkNTUzFDb21wYXRcIik7XG5cdFx0dmFyIHggPSBzdXBwb3J0UGFnZU9mZnNldCA/IHdpbmRvdy5wYWdlWE9mZnNldCA6IGlzQ1NTMUNvbXBhdCA/IGRvYy5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCA6IGRvYy5ib2R5LnNjcm9sbExlZnQ7XG5cdFx0dmFyIHkgPSBzdXBwb3J0UGFnZU9mZnNldCA/IHdpbmRvdy5wYWdlWU9mZnNldCA6IGlzQ1NTMUNvbXBhdCA/IGRvYy5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIDogZG9jLmJvZHkuc2Nyb2xsVG9wO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHg6IHgsXG5cdFx0XHR5OiB5XG5cdFx0fTtcblx0fVxuXHJcblx0Ly8gd2UgcHJvdmlkZSBhIGZ1bmN0aW9uIHRvIGNvbXB1dGUgY29uc3RhbnRzIGluc3RlYWRcclxuXHQvLyBvZiBhY2Nlc3Npbmcgd2luZG93LiogYXMgc29vbiBhcyB0aGUgbW9kdWxlIG5lZWRzIGl0XHJcblx0Ly8gc28gdGhhdCB3ZSBkbyBub3QgY29tcHV0ZSBhbnl0aGluZyBpZiBub3QgbmVlZGVkXHJcblx0ZnVuY3Rpb24gZ2V0QWN0aW9ucyAoICkge1xyXG5cclxuXHRcdC8vIERldGVybWluZSB0aGUgZXZlbnRzIHRvIGJpbmQuIElFMTEgaW1wbGVtZW50cyBwb2ludGVyRXZlbnRzIHdpdGhvdXRcclxuXHRcdC8vIGEgcHJlZml4LCB3aGljaCBicmVha3MgY29tcGF0aWJpbGl0eSB3aXRoIHRoZSBJRTEwIGltcGxlbWVudGF0aW9uLlxyXG5cdFx0cmV0dXJuIHdpbmRvdy5uYXZpZ2F0b3IucG9pbnRlckVuYWJsZWQgPyB7XHJcblx0XHRcdHN0YXJ0OiAncG9pbnRlcmRvd24nLFxyXG5cdFx0XHRtb3ZlOiAncG9pbnRlcm1vdmUnLFxyXG5cdFx0XHRlbmQ6ICdwb2ludGVydXAnXHJcblx0XHR9IDogd2luZG93Lm5hdmlnYXRvci5tc1BvaW50ZXJFbmFibGVkID8ge1xyXG5cdFx0XHRzdGFydDogJ01TUG9pbnRlckRvd24nLFxyXG5cdFx0XHRtb3ZlOiAnTVNQb2ludGVyTW92ZScsXHJcblx0XHRcdGVuZDogJ01TUG9pbnRlclVwJ1xyXG5cdFx0fSA6IHtcclxuXHRcdFx0c3RhcnQ6ICdtb3VzZWRvd24gdG91Y2hzdGFydCcsXHJcblx0XHRcdG1vdmU6ICdtb3VzZW1vdmUgdG91Y2htb3ZlJyxcclxuXHRcdFx0ZW5kOiAnbW91c2V1cCB0b3VjaGVuZCdcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHQvLyBodHRwczovL2dpdGh1Yi5jb20vV0lDRy9FdmVudExpc3RlbmVyT3B0aW9ucy9ibG9iL2doLXBhZ2VzL2V4cGxhaW5lci5tZFxyXG5cdC8vIElzc3VlICM3ODVcclxuXHRmdW5jdGlvbiBnZXRTdXBwb3J0c1Bhc3NpdmUgKCApIHtcclxuXHJcblx0XHR2YXIgc3VwcG9ydHNQYXNzaXZlID0gZmFsc2U7XHJcblxyXG5cdFx0dHJ5IHtcclxuXHJcblx0XHRcdHZhciBvcHRzID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAncGFzc2l2ZScsIHtcclxuXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0c3VwcG9ydHNQYXNzaXZlID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCBvcHRzKTtcclxuXHJcblx0XHR9IGNhdGNoIChlKSB7fVxyXG5cclxuXHRcdHJldHVybiBzdXBwb3J0c1Bhc3NpdmU7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBnZXRTdXBwb3J0c1RvdWNoQWN0aW9uTm9uZSAoICkge1xyXG5cdFx0cmV0dXJuIHdpbmRvdy5DU1MgJiYgQ1NTLnN1cHBvcnRzICYmIENTUy5zdXBwb3J0cygndG91Y2gtYWN0aW9uJywgJ25vbmUnKTtcclxuXHR9XHJcblxyXG5cclxuLy8gVmFsdWUgY2FsY3VsYXRpb25cclxuXHJcblx0Ly8gRGV0ZXJtaW5lIHRoZSBzaXplIG9mIGEgc3ViLXJhbmdlIGluIHJlbGF0aW9uIHRvIGEgZnVsbCByYW5nZS5cclxuXHRmdW5jdGlvbiBzdWJSYW5nZVJhdGlvICggcGEsIHBiICkge1xyXG5cdFx0cmV0dXJuICgxMDAgLyAocGIgLSBwYSkpO1xyXG5cdH1cclxuXHJcblx0Ly8gKHBlcmNlbnRhZ2UpIEhvdyBtYW55IHBlcmNlbnQgaXMgdGhpcyB2YWx1ZSBvZiB0aGlzIHJhbmdlP1xyXG5cdGZ1bmN0aW9uIGZyb21QZXJjZW50YWdlICggcmFuZ2UsIHZhbHVlICkge1xyXG5cdFx0cmV0dXJuICh2YWx1ZSAqIDEwMCkgLyAoIHJhbmdlWzFdIC0gcmFuZ2VbMF0gKTtcclxuXHR9XHJcblxyXG5cdC8vIChwZXJjZW50YWdlKSBXaGVyZSBpcyB0aGlzIHZhbHVlIG9uIHRoaXMgcmFuZ2U/XHJcblx0ZnVuY3Rpb24gdG9QZXJjZW50YWdlICggcmFuZ2UsIHZhbHVlICkge1xyXG5cdFx0cmV0dXJuIGZyb21QZXJjZW50YWdlKCByYW5nZSwgcmFuZ2VbMF0gPCAwID9cclxuXHRcdFx0dmFsdWUgKyBNYXRoLmFicyhyYW5nZVswXSkgOlxyXG5cdFx0XHRcdHZhbHVlIC0gcmFuZ2VbMF0gKTtcclxuXHR9XHJcblxyXG5cdC8vICh2YWx1ZSkgSG93IG11Y2ggaXMgdGhpcyBwZXJjZW50YWdlIG9uIHRoaXMgcmFuZ2U/XHJcblx0ZnVuY3Rpb24gaXNQZXJjZW50YWdlICggcmFuZ2UsIHZhbHVlICkge1xyXG5cdFx0cmV0dXJuICgodmFsdWUgKiAoIHJhbmdlWzFdIC0gcmFuZ2VbMF0gKSkgLyAxMDApICsgcmFuZ2VbMF07XHJcblx0fVxyXG5cclxuXHJcbi8vIFJhbmdlIGNvbnZlcnNpb25cclxuXHJcblx0ZnVuY3Rpb24gZ2V0SiAoIHZhbHVlLCBhcnIgKSB7XHJcblxyXG5cdFx0dmFyIGogPSAxO1xyXG5cclxuXHRcdHdoaWxlICggdmFsdWUgPj0gYXJyW2pdICl7XHJcblx0XHRcdGogKz0gMTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gajtcclxuXHR9XHJcblxyXG5cdC8vIChwZXJjZW50YWdlKSBJbnB1dCBhIHZhbHVlLCBmaW5kIHdoZXJlLCBvbiBhIHNjYWxlIG9mIDAtMTAwLCBpdCBhcHBsaWVzLlxyXG5cdGZ1bmN0aW9uIHRvU3RlcHBpbmcgKCB4VmFsLCB4UGN0LCB2YWx1ZSApIHtcclxuXHJcblx0XHRpZiAoIHZhbHVlID49IHhWYWwuc2xpY2UoLTEpWzBdICl7XHJcblx0XHRcdHJldHVybiAxMDA7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGogPSBnZXRKKCB2YWx1ZSwgeFZhbCApO1xyXG5cdFx0dmFyIHZhID0geFZhbFtqLTFdO1xyXG5cdFx0dmFyIHZiID0geFZhbFtqXTtcclxuXHRcdHZhciBwYSA9IHhQY3Rbai0xXTtcclxuXHRcdHZhciBwYiA9IHhQY3Rbal07XHJcblxyXG5cdFx0cmV0dXJuIHBhICsgKHRvUGVyY2VudGFnZShbdmEsIHZiXSwgdmFsdWUpIC8gc3ViUmFuZ2VSYXRpbyAocGEsIHBiKSk7XHJcblx0fVxyXG5cclxuXHQvLyAodmFsdWUpIElucHV0IGEgcGVyY2VudGFnZSwgZmluZCB3aGVyZSBpdCBpcyBvbiB0aGUgc3BlY2lmaWVkIHJhbmdlLlxyXG5cdGZ1bmN0aW9uIGZyb21TdGVwcGluZyAoIHhWYWwsIHhQY3QsIHZhbHVlICkge1xyXG5cclxuXHRcdC8vIFRoZXJlIGlzIG5vIHJhbmdlIGdyb3VwIHRoYXQgZml0cyAxMDBcclxuXHRcdGlmICggdmFsdWUgPj0gMTAwICl7XHJcblx0XHRcdHJldHVybiB4VmFsLnNsaWNlKC0xKVswXTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgaiA9IGdldEooIHZhbHVlLCB4UGN0ICk7XHJcblx0XHR2YXIgdmEgPSB4VmFsW2otMV07XHJcblx0XHR2YXIgdmIgPSB4VmFsW2pdO1xyXG5cdFx0dmFyIHBhID0geFBjdFtqLTFdO1xyXG5cdFx0dmFyIHBiID0geFBjdFtqXTtcclxuXHJcblx0XHRyZXR1cm4gaXNQZXJjZW50YWdlKFt2YSwgdmJdLCAodmFsdWUgLSBwYSkgKiBzdWJSYW5nZVJhdGlvIChwYSwgcGIpKTtcclxuXHR9XHJcblxyXG5cdC8vIChwZXJjZW50YWdlKSBHZXQgdGhlIHN0ZXAgdGhhdCBhcHBsaWVzIGF0IGEgY2VydGFpbiB2YWx1ZS5cclxuXHRmdW5jdGlvbiBnZXRTdGVwICggeFBjdCwgeFN0ZXBzLCBzbmFwLCB2YWx1ZSApIHtcclxuXHJcblx0XHRpZiAoIHZhbHVlID09PSAxMDAgKSB7XHJcblx0XHRcdHJldHVybiB2YWx1ZTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgaiA9IGdldEooIHZhbHVlLCB4UGN0ICk7XHJcblx0XHR2YXIgYSA9IHhQY3Rbai0xXTtcclxuXHRcdHZhciBiID0geFBjdFtqXTtcclxuXHJcblx0XHQvLyBJZiAnc25hcCcgaXMgc2V0LCBzdGVwcyBhcmUgdXNlZCBhcyBmaXhlZCBwb2ludHMgb24gdGhlIHNsaWRlci5cclxuXHRcdGlmICggc25hcCApIHtcclxuXHJcblx0XHRcdC8vIEZpbmQgdGhlIGNsb3Nlc3QgcG9zaXRpb24sIGEgb3IgYi5cclxuXHRcdFx0aWYgKCh2YWx1ZSAtIGEpID4gKChiLWEpLzIpKXtcclxuXHRcdFx0XHRyZXR1cm4gYjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCAheFN0ZXBzW2otMV0gKXtcclxuXHRcdFx0cmV0dXJuIHZhbHVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB4UGN0W2otMV0gKyBjbG9zZXN0KFxyXG5cdFx0XHR2YWx1ZSAtIHhQY3Rbai0xXSxcclxuXHRcdFx0eFN0ZXBzW2otMV1cclxuXHRcdCk7XHJcblx0fVxyXG5cclxuXHJcbi8vIEVudHJ5IHBhcnNpbmdcclxuXHJcblx0ZnVuY3Rpb24gaGFuZGxlRW50cnlQb2ludCAoIGluZGV4LCB2YWx1ZSwgdGhhdCApIHtcclxuXHJcblx0XHR2YXIgcGVyY2VudGFnZTtcclxuXHJcblx0XHQvLyBXcmFwIG51bWVyaWNhbCBpbnB1dCBpbiBhbiBhcnJheS5cclxuXHRcdGlmICggdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICkge1xyXG5cdFx0XHR2YWx1ZSA9IFt2YWx1ZV07XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUmVqZWN0IGFueSBpbnZhbGlkIGlucHV0LCBieSB0ZXN0aW5nIHdoZXRoZXIgdmFsdWUgaXMgYW4gYXJyYXkuXHJcblx0XHRpZiAoICFBcnJheS5pc0FycmF5KHZhbHVlKSApe1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyIChcIiArIFZFUlNJT04gKyBcIik6ICdyYW5nZScgY29udGFpbnMgaW52YWxpZCB2YWx1ZS5cIik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ292ZXJ0IG1pbi9tYXggc3ludGF4IHRvIDAgYW5kIDEwMC5cclxuXHRcdGlmICggaW5kZXggPT09ICdtaW4nICkge1xyXG5cdFx0XHRwZXJjZW50YWdlID0gMDtcclxuXHRcdH0gZWxzZSBpZiAoIGluZGV4ID09PSAnbWF4JyApIHtcclxuXHRcdFx0cGVyY2VudGFnZSA9IDEwMDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHBlcmNlbnRhZ2UgPSBwYXJzZUZsb2F0KCBpbmRleCApO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENoZWNrIGZvciBjb3JyZWN0IGlucHV0LlxyXG5cdFx0aWYgKCAhaXNOdW1lcmljKCBwZXJjZW50YWdlICkgfHwgIWlzTnVtZXJpYyggdmFsdWVbMF0gKSApIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm9VaVNsaWRlciAoXCIgKyBWRVJTSU9OICsgXCIpOiAncmFuZ2UnIHZhbHVlIGlzbid0IG51bWVyaWMuXCIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFN0b3JlIHZhbHVlcy5cclxuXHRcdHRoYXQueFBjdC5wdXNoKCBwZXJjZW50YWdlICk7XHJcblx0XHR0aGF0LnhWYWwucHVzaCggdmFsdWVbMF0gKTtcclxuXHJcblx0XHQvLyBOYU4gd2lsbCBldmFsdWF0ZSB0byBmYWxzZSB0b28sIGJ1dCB0byBrZWVwXHJcblx0XHQvLyBsb2dnaW5nIGNsZWFyLCBzZXQgc3RlcCBleHBsaWNpdGx5LiBNYWtlIHN1cmVcclxuXHRcdC8vIG5vdCB0byBvdmVycmlkZSB0aGUgJ3N0ZXAnIHNldHRpbmcgd2l0aCBmYWxzZS5cclxuXHRcdGlmICggIXBlcmNlbnRhZ2UgKSB7XHJcblx0XHRcdGlmICggIWlzTmFOKCB2YWx1ZVsxXSApICkge1xyXG5cdFx0XHRcdHRoYXQueFN0ZXBzWzBdID0gdmFsdWVbMV07XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoYXQueFN0ZXBzLnB1c2goIGlzTmFOKHZhbHVlWzFdKSA/IGZhbHNlIDogdmFsdWVbMV0gKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGF0LnhIaWdoZXN0Q29tcGxldGVTdGVwLnB1c2goMCk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBoYW5kbGVTdGVwUG9pbnQgKCBpLCBuLCB0aGF0ICkge1xyXG5cclxuXHRcdC8vIElnbm9yZSAnZmFsc2UnIHN0ZXBwaW5nLlxyXG5cdFx0aWYgKCAhbiApIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRmFjdG9yIHRvIHJhbmdlIHJhdGlvXHJcblx0XHR0aGF0LnhTdGVwc1tpXSA9IGZyb21QZXJjZW50YWdlKFt0aGF0LnhWYWxbaV0sIHRoYXQueFZhbFtpKzFdXSwgbikgLyBzdWJSYW5nZVJhdGlvKHRoYXQueFBjdFtpXSwgdGhhdC54UGN0W2krMV0pO1xyXG5cclxuXHRcdHZhciB0b3RhbFN0ZXBzID0gKHRoYXQueFZhbFtpKzFdIC0gdGhhdC54VmFsW2ldKSAvIHRoYXQueE51bVN0ZXBzW2ldO1xyXG5cdFx0dmFyIGhpZ2hlc3RTdGVwID0gTWF0aC5jZWlsKE51bWJlcih0b3RhbFN0ZXBzLnRvRml4ZWQoMykpIC0gMSk7XHJcblx0XHR2YXIgc3RlcCA9IHRoYXQueFZhbFtpXSArICh0aGF0LnhOdW1TdGVwc1tpXSAqIGhpZ2hlc3RTdGVwKTtcclxuXHJcblx0XHR0aGF0LnhIaWdoZXN0Q29tcGxldGVTdGVwW2ldID0gc3RlcDtcclxuXHR9XHJcblxyXG5cclxuLy8gSW50ZXJmYWNlXHJcblxyXG5cdGZ1bmN0aW9uIFNwZWN0cnVtICggZW50cnksIHNuYXAsIHNpbmdsZVN0ZXAgKSB7XHJcblxyXG5cdFx0dGhpcy54UGN0ID0gW107XHJcblx0XHR0aGlzLnhWYWwgPSBbXTtcclxuXHRcdHRoaXMueFN0ZXBzID0gWyBzaW5nbGVTdGVwIHx8IGZhbHNlIF07XHJcblx0XHR0aGlzLnhOdW1TdGVwcyA9IFsgZmFsc2UgXTtcclxuXHRcdHRoaXMueEhpZ2hlc3RDb21wbGV0ZVN0ZXAgPSBbXTtcclxuXHJcblx0XHR0aGlzLnNuYXAgPSBzbmFwO1xyXG5cclxuXHRcdHZhciBpbmRleDtcclxuXHRcdHZhciBvcmRlcmVkID0gW107IC8vIFswLCAnbWluJ10sIFsxLCAnNTAlJ10sIFsyLCAnbWF4J11cclxuXHJcblx0XHQvLyBNYXAgdGhlIG9iamVjdCBrZXlzIHRvIGFuIGFycmF5LlxyXG5cdFx0Zm9yICggaW5kZXggaW4gZW50cnkgKSB7XHJcblx0XHRcdGlmICggZW50cnkuaGFzT3duUHJvcGVydHkoaW5kZXgpICkge1xyXG5cdFx0XHRcdG9yZGVyZWQucHVzaChbZW50cnlbaW5kZXhdLCBpbmRleF0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gU29ydCBhbGwgZW50cmllcyBieSB2YWx1ZSAobnVtZXJpYyBzb3J0KS5cclxuXHRcdGlmICggb3JkZXJlZC5sZW5ndGggJiYgdHlwZW9mIG9yZGVyZWRbMF1bMF0gPT09IFwib2JqZWN0XCIgKSB7XHJcblx0XHRcdG9yZGVyZWQuc29ydChmdW5jdGlvbihhLCBiKSB7IHJldHVybiBhWzBdWzBdIC0gYlswXVswXTsgfSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRvcmRlcmVkLnNvcnQoZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gYVswXSAtIGJbMF07IH0pO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHQvLyBDb252ZXJ0IGFsbCBlbnRyaWVzIHRvIHN1YnJhbmdlcy5cclxuXHRcdGZvciAoIGluZGV4ID0gMDsgaW5kZXggPCBvcmRlcmVkLmxlbmd0aDsgaW5kZXgrKyApIHtcclxuXHRcdFx0aGFuZGxlRW50cnlQb2ludChvcmRlcmVkW2luZGV4XVsxXSwgb3JkZXJlZFtpbmRleF1bMF0sIHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFN0b3JlIHRoZSBhY3R1YWwgc3RlcCB2YWx1ZXMuXHJcblx0XHQvLyB4U3RlcHMgaXMgc29ydGVkIGluIHRoZSBzYW1lIG9yZGVyIGFzIHhQY3QgYW5kIHhWYWwuXHJcblx0XHR0aGlzLnhOdW1TdGVwcyA9IHRoaXMueFN0ZXBzLnNsaWNlKDApO1xyXG5cclxuXHRcdC8vIENvbnZlcnQgYWxsIG51bWVyaWMgc3RlcHMgdG8gdGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIHN1YnJhbmdlIHRoZXkgcmVwcmVzZW50LlxyXG5cdFx0Zm9yICggaW5kZXggPSAwOyBpbmRleCA8IHRoaXMueE51bVN0ZXBzLmxlbmd0aDsgaW5kZXgrKyApIHtcclxuXHRcdFx0aGFuZGxlU3RlcFBvaW50KGluZGV4LCB0aGlzLnhOdW1TdGVwc1tpbmRleF0sIHRoaXMpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0U3BlY3RydW0ucHJvdG90eXBlLmdldE1hcmdpbiA9IGZ1bmN0aW9uICggdmFsdWUgKSB7XHJcblxyXG5cdFx0dmFyIHN0ZXAgPSB0aGlzLnhOdW1TdGVwc1swXTtcclxuXHJcblx0XHRpZiAoIHN0ZXAgJiYgKCh2YWx1ZSAvIHN0ZXApICUgMSkgIT09IDAgKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXIgKFwiICsgVkVSU0lPTiArIFwiKTogJ2xpbWl0JywgJ21hcmdpbicgYW5kICdwYWRkaW5nJyBtdXN0IGJlIGRpdmlzaWJsZSBieSBzdGVwLlwiKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy54UGN0Lmxlbmd0aCA9PT0gMiA/IGZyb21QZXJjZW50YWdlKHRoaXMueFZhbCwgdmFsdWUpIDogZmFsc2U7XHJcblx0fTtcclxuXHJcblx0U3BlY3RydW0ucHJvdG90eXBlLnRvU3RlcHBpbmcgPSBmdW5jdGlvbiAoIHZhbHVlICkge1xyXG5cclxuXHRcdHZhbHVlID0gdG9TdGVwcGluZyggdGhpcy54VmFsLCB0aGlzLnhQY3QsIHZhbHVlICk7XHJcblxyXG5cdFx0cmV0dXJuIHZhbHVlO1xyXG5cdH07XHJcblxyXG5cdFNwZWN0cnVtLnByb3RvdHlwZS5mcm9tU3RlcHBpbmcgPSBmdW5jdGlvbiAoIHZhbHVlICkge1xyXG5cclxuXHRcdHJldHVybiBmcm9tU3RlcHBpbmcoIHRoaXMueFZhbCwgdGhpcy54UGN0LCB2YWx1ZSApO1xyXG5cdH07XHJcblxyXG5cdFNwZWN0cnVtLnByb3RvdHlwZS5nZXRTdGVwID0gZnVuY3Rpb24gKCB2YWx1ZSApIHtcclxuXHJcblx0XHR2YWx1ZSA9IGdldFN0ZXAodGhpcy54UGN0LCB0aGlzLnhTdGVwcywgdGhpcy5zbmFwLCB2YWx1ZSApO1xyXG5cclxuXHRcdHJldHVybiB2YWx1ZTtcclxuXHR9O1xyXG5cclxuXHRTcGVjdHJ1bS5wcm90b3R5cGUuZ2V0TmVhcmJ5U3RlcHMgPSBmdW5jdGlvbiAoIHZhbHVlICkge1xyXG5cclxuXHRcdHZhciBqID0gZ2V0Sih2YWx1ZSwgdGhpcy54UGN0KTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzdGVwQmVmb3JlOiB7IHN0YXJ0VmFsdWU6IHRoaXMueFZhbFtqLTJdLCBzdGVwOiB0aGlzLnhOdW1TdGVwc1tqLTJdLCBoaWdoZXN0U3RlcDogdGhpcy54SGlnaGVzdENvbXBsZXRlU3RlcFtqLTJdIH0sXHJcblx0XHRcdHRoaXNTdGVwOiB7IHN0YXJ0VmFsdWU6IHRoaXMueFZhbFtqLTFdLCBzdGVwOiB0aGlzLnhOdW1TdGVwc1tqLTFdLCBoaWdoZXN0U3RlcDogdGhpcy54SGlnaGVzdENvbXBsZXRlU3RlcFtqLTFdIH0sXHJcblx0XHRcdHN0ZXBBZnRlcjogeyBzdGFydFZhbHVlOiB0aGlzLnhWYWxbai0wXSwgc3RlcDogdGhpcy54TnVtU3RlcHNbai0wXSwgaGlnaGVzdFN0ZXA6IHRoaXMueEhpZ2hlc3RDb21wbGV0ZVN0ZXBbai0wXSB9XHJcblx0XHR9O1xyXG5cdH07XHJcblxyXG5cdFNwZWN0cnVtLnByb3RvdHlwZS5jb3VudFN0ZXBEZWNpbWFscyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBzdGVwRGVjaW1hbHMgPSB0aGlzLnhOdW1TdGVwcy5tYXAoY291bnREZWNpbWFscyk7XHJcblx0XHRyZXR1cm4gTWF0aC5tYXguYXBwbHkobnVsbCwgc3RlcERlY2ltYWxzKTtcclxuXHR9O1xyXG5cclxuXHQvLyBPdXRzaWRlIHRlc3RpbmdcclxuXHRTcGVjdHJ1bS5wcm90b3R5cGUuY29udmVydCA9IGZ1bmN0aW9uICggdmFsdWUgKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5nZXRTdGVwKHRoaXMudG9TdGVwcGluZyh2YWx1ZSkpO1xyXG5cdH07XHJcblxyXG4vKlx0RXZlcnkgaW5wdXQgb3B0aW9uIGlzIHRlc3RlZCBhbmQgcGFyc2VkLiBUaGlzJ2xsIHByZXZlbnRcblx0ZW5kbGVzcyB2YWxpZGF0aW9uIGluIGludGVybmFsIG1ldGhvZHMuIFRoZXNlIHRlc3RzIGFyZVxuXHRzdHJ1Y3R1cmVkIHdpdGggYW4gaXRlbSBmb3IgZXZlcnkgb3B0aW9uIGF2YWlsYWJsZS4gQW5cblx0b3B0aW9uIGNhbiBiZSBtYXJrZWQgYXMgcmVxdWlyZWQgYnkgc2V0dGluZyB0aGUgJ3InIGZsYWcuXG5cdFRoZSB0ZXN0aW5nIGZ1bmN0aW9uIGlzIHByb3ZpZGVkIHdpdGggdGhyZWUgYXJndW1lbnRzOlxuXHRcdC0gVGhlIHByb3ZpZGVkIHZhbHVlIGZvciB0aGUgb3B0aW9uO1xuXHRcdC0gQSByZWZlcmVuY2UgdG8gdGhlIG9wdGlvbnMgb2JqZWN0O1xuXHRcdC0gVGhlIG5hbWUgZm9yIHRoZSBvcHRpb247XG5cblx0VGhlIHRlc3RpbmcgZnVuY3Rpb24gcmV0dXJucyBmYWxzZSB3aGVuIGFuIGVycm9yIGlzIGRldGVjdGVkLFxuXHRvciB0cnVlIHdoZW4gZXZlcnl0aGluZyBpcyBPSy4gSXQgY2FuIGFsc28gbW9kaWZ5IHRoZSBvcHRpb25cblx0b2JqZWN0LCB0byBtYWtlIHN1cmUgYWxsIHZhbHVlcyBjYW4gYmUgY29ycmVjdGx5IGxvb3BlZCBlbHNld2hlcmUuICovXG5cblx0dmFyIGRlZmF1bHRGb3JtYXR0ZXIgPSB7ICd0byc6IGZ1bmN0aW9uKCB2YWx1ZSApe1xuXHRcdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlLnRvRml4ZWQoMik7XG5cdH0sICdmcm9tJzogTnVtYmVyIH07XG5cblx0ZnVuY3Rpb24gdmFsaWRhdGVGb3JtYXQgKCBlbnRyeSApIHtcblxuXHRcdC8vIEFueSBvYmplY3Qgd2l0aCBhIHRvIGFuZCBmcm9tIG1ldGhvZCBpcyBzdXBwb3J0ZWQuXG5cdFx0aWYgKCBpc1ZhbGlkRm9ybWF0dGVyKGVudHJ5KSApIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXIgKFwiICsgVkVSU0lPTiArIFwiKTogJ2Zvcm1hdCcgcmVxdWlyZXMgJ3RvJyBhbmQgJ2Zyb20nIG1ldGhvZHMuXCIpO1xuXHR9XG5cblx0ZnVuY3Rpb24gdGVzdFN0ZXAgKCBwYXJzZWQsIGVudHJ5ICkge1xuXG5cdFx0aWYgKCAhaXNOdW1lcmljKCBlbnRyeSApICkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm9VaVNsaWRlciAoXCIgKyBWRVJTSU9OICsgXCIpOiAnc3RlcCcgaXMgbm90IG51bWVyaWMuXCIpO1xuXHRcdH1cblxuXHRcdC8vIFRoZSBzdGVwIG9wdGlvbiBjYW4gc3RpbGwgYmUgdXNlZCB0byBzZXQgc3RlcHBpbmdcblx0XHQvLyBmb3IgbGluZWFyIHNsaWRlcnMuIE92ZXJ3cml0dGVuIGlmIHNldCBpbiAncmFuZ2UnLlxuXHRcdHBhcnNlZC5zaW5nbGVTdGVwID0gZW50cnk7XG5cdH1cblxuXHRmdW5jdGlvbiB0ZXN0UmFuZ2UgKCBwYXJzZWQsIGVudHJ5ICkge1xuXG5cdFx0Ly8gRmlsdGVyIGluY29ycmVjdCBpbnB1dC5cblx0XHRpZiAoIHR5cGVvZiBlbnRyeSAhPT0gJ29iamVjdCcgfHwgQXJyYXkuaXNBcnJheShlbnRyeSkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyIChcIiArIFZFUlNJT04gKyBcIik6ICdyYW5nZScgaXMgbm90IGFuIG9iamVjdC5cIik7XG5cdFx0fVxuXG5cdFx0Ly8gQ2F0Y2ggbWlzc2luZyBzdGFydCBvciBlbmQuXG5cdFx0aWYgKCBlbnRyeS5taW4gPT09IHVuZGVmaW5lZCB8fCBlbnRyeS5tYXggPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXIgKFwiICsgVkVSU0lPTiArIFwiKTogTWlzc2luZyAnbWluJyBvciAnbWF4JyBpbiAncmFuZ2UnLlwiKTtcblx0XHR9XG5cblx0XHQvLyBDYXRjaCBlcXVhbCBzdGFydCBvciBlbmQuXG5cdFx0aWYgKCBlbnRyeS5taW4gPT09IGVudHJ5Lm1heCApIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXIgKFwiICsgVkVSU0lPTiArIFwiKTogJ3JhbmdlJyAnbWluJyBhbmQgJ21heCcgY2Fubm90IGJlIGVxdWFsLlwiKTtcblx0XHR9XG5cblx0XHRwYXJzZWQuc3BlY3RydW0gPSBuZXcgU3BlY3RydW0oZW50cnksIHBhcnNlZC5zbmFwLCBwYXJzZWQuc2luZ2xlU3RlcCk7XG5cdH1cblxuXHRmdW5jdGlvbiB0ZXN0U3RhcnQgKCBwYXJzZWQsIGVudHJ5ICkge1xuXG5cdFx0ZW50cnkgPSBhc0FycmF5KGVudHJ5KTtcblxuXHRcdC8vIFZhbGlkYXRlIGlucHV0LiBWYWx1ZXMgYXJlbid0IHRlc3RlZCwgYXMgdGhlIHB1YmxpYyAudmFsIG1ldGhvZFxuXHRcdC8vIHdpbGwgYWx3YXlzIHByb3ZpZGUgYSB2YWxpZCBsb2NhdGlvbi5cblx0XHRpZiAoICFBcnJheS5pc0FycmF5KCBlbnRyeSApIHx8ICFlbnRyeS5sZW5ndGggKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyIChcIiArIFZFUlNJT04gKyBcIik6ICdzdGFydCcgb3B0aW9uIGlzIGluY29ycmVjdC5cIik7XG5cdFx0fVxuXG5cdFx0Ly8gU3RvcmUgdGhlIG51bWJlciBvZiBoYW5kbGVzLlxuXHRcdHBhcnNlZC5oYW5kbGVzID0gZW50cnkubGVuZ3RoO1xuXG5cdFx0Ly8gV2hlbiB0aGUgc2xpZGVyIGlzIGluaXRpYWxpemVkLCB0aGUgLnZhbCBtZXRob2Qgd2lsbFxuXHRcdC8vIGJlIGNhbGxlZCB3aXRoIHRoZSBzdGFydCBvcHRpb25zLlxuXHRcdHBhcnNlZC5zdGFydCA9IGVudHJ5O1xuXHR9XG5cblx0ZnVuY3Rpb24gdGVzdFNuYXAgKCBwYXJzZWQsIGVudHJ5ICkge1xuXG5cdFx0Ly8gRW5mb3JjZSAxMDAlIHN0ZXBwaW5nIHdpdGhpbiBzdWJyYW5nZXMuXG5cdFx0cGFyc2VkLnNuYXAgPSBlbnRyeTtcblxuXHRcdGlmICggdHlwZW9mIGVudHJ5ICE9PSAnYm9vbGVhbicgKXtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXIgKFwiICsgVkVSU0lPTiArIFwiKTogJ3NuYXAnIG9wdGlvbiBtdXN0IGJlIGEgYm9vbGVhbi5cIik7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gdGVzdEFuaW1hdGUgKCBwYXJzZWQsIGVudHJ5ICkge1xuXG5cdFx0Ly8gRW5mb3JjZSAxMDAlIHN0ZXBwaW5nIHdpdGhpbiBzdWJyYW5nZXMuXG5cdFx0cGFyc2VkLmFuaW1hdGUgPSBlbnRyeTtcblxuXHRcdGlmICggdHlwZW9mIGVudHJ5ICE9PSAnYm9vbGVhbicgKXtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXIgKFwiICsgVkVSU0lPTiArIFwiKTogJ2FuaW1hdGUnIG9wdGlvbiBtdXN0IGJlIGEgYm9vbGVhbi5cIik7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gdGVzdEFuaW1hdGlvbkR1cmF0aW9uICggcGFyc2VkLCBlbnRyeSApIHtcblxuXHRcdHBhcnNlZC5hbmltYXRpb25EdXJhdGlvbiA9IGVudHJ5O1xuXG5cdFx0aWYgKCB0eXBlb2YgZW50cnkgIT09ICdudW1iZXInICl7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyIChcIiArIFZFUlNJT04gKyBcIik6ICdhbmltYXRpb25EdXJhdGlvbicgb3B0aW9uIG11c3QgYmUgYSBudW1iZXIuXCIpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHRlc3RDb25uZWN0ICggcGFyc2VkLCBlbnRyeSApIHtcblxuXHRcdHZhciBjb25uZWN0ID0gW2ZhbHNlXTtcblx0XHR2YXIgaTtcblxuXHRcdC8vIE1hcCBsZWdhY3kgb3B0aW9uc1xuXHRcdGlmICggZW50cnkgPT09ICdsb3dlcicgKSB7XG5cdFx0XHRlbnRyeSA9IFt0cnVlLCBmYWxzZV07XG5cdFx0fVxuXG5cdFx0ZWxzZSBpZiAoIGVudHJ5ID09PSAndXBwZXInICkge1xuXHRcdFx0ZW50cnkgPSBbZmFsc2UsIHRydWVdO1xuXHRcdH1cblxuXHRcdC8vIEhhbmRsZSBib29sZWFuIG9wdGlvbnNcblx0XHRpZiAoIGVudHJ5ID09PSB0cnVlIHx8IGVudHJ5ID09PSBmYWxzZSApIHtcblxuXHRcdFx0Zm9yICggaSA9IDE7IGkgPCBwYXJzZWQuaGFuZGxlczsgaSsrICkge1xuXHRcdFx0XHRjb25uZWN0LnB1c2goZW50cnkpO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25uZWN0LnB1c2goZmFsc2UpO1xuXHRcdH1cblxuXHRcdC8vIFJlamVjdCBpbnZhbGlkIGlucHV0XG5cdFx0ZWxzZSBpZiAoICFBcnJheS5pc0FycmF5KCBlbnRyeSApIHx8ICFlbnRyeS5sZW5ndGggfHwgZW50cnkubGVuZ3RoICE9PSBwYXJzZWQuaGFuZGxlcyArIDEgKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyIChcIiArIFZFUlNJT04gKyBcIik6ICdjb25uZWN0JyBvcHRpb24gZG9lc24ndCBtYXRjaCBoYW5kbGUgY291bnQuXCIpO1xuXHRcdH1cblxuXHRcdGVsc2Uge1xuXHRcdFx0Y29ubmVjdCA9IGVudHJ5O1xuXHRcdH1cblxuXHRcdHBhcnNlZC5jb25uZWN0ID0gY29ubmVjdDtcblx0fVxuXG5cdGZ1bmN0aW9uIHRlc3RPcmllbnRhdGlvbiAoIHBhcnNlZCwgZW50cnkgKSB7XG5cblx0XHQvLyBTZXQgb3JpZW50YXRpb24gdG8gYW4gYSBudW1lcmljYWwgdmFsdWUgZm9yIGVhc3lcblx0XHQvLyBhcnJheSBzZWxlY3Rpb24uXG5cdFx0c3dpdGNoICggZW50cnkgKXtcblx0XHRcdGNhc2UgJ2hvcml6b250YWwnOlxuXHRcdFx0XHRwYXJzZWQub3J0ID0gMDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICd2ZXJ0aWNhbCc6XG5cdFx0XHRcdHBhcnNlZC5vcnQgPSAxO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXIgKFwiICsgVkVSU0lPTiArIFwiKTogJ29yaWVudGF0aW9uJyBvcHRpb24gaXMgaW52YWxpZC5cIik7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gdGVzdE1hcmdpbiAoIHBhcnNlZCwgZW50cnkgKSB7XG5cblx0XHRpZiAoICFpc051bWVyaWMoZW50cnkpICl7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyIChcIiArIFZFUlNJT04gKyBcIik6ICdtYXJnaW4nIG9wdGlvbiBtdXN0IGJlIG51bWVyaWMuXCIpO1xuXHRcdH1cblxuXHRcdC8vIElzc3VlICM1ODJcblx0XHRpZiAoIGVudHJ5ID09PSAwICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHBhcnNlZC5tYXJnaW4gPSBwYXJzZWQuc3BlY3RydW0uZ2V0TWFyZ2luKGVudHJ5KTtcblxuXHRcdGlmICggIXBhcnNlZC5tYXJnaW4gKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyIChcIiArIFZFUlNJT04gKyBcIik6ICdtYXJnaW4nIG9wdGlvbiBpcyBvbmx5IHN1cHBvcnRlZCBvbiBsaW5lYXIgc2xpZGVycy5cIik7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gdGVzdExpbWl0ICggcGFyc2VkLCBlbnRyeSApIHtcblxuXHRcdGlmICggIWlzTnVtZXJpYyhlbnRyeSkgKXtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXIgKFwiICsgVkVSU0lPTiArIFwiKTogJ2xpbWl0JyBvcHRpb24gbXVzdCBiZSBudW1lcmljLlwiKTtcblx0XHR9XG5cblx0XHRwYXJzZWQubGltaXQgPSBwYXJzZWQuc3BlY3RydW0uZ2V0TWFyZ2luKGVudHJ5KTtcblxuXHRcdGlmICggIXBhcnNlZC5saW1pdCB8fCBwYXJzZWQuaGFuZGxlcyA8IDIgKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyIChcIiArIFZFUlNJT04gKyBcIik6ICdsaW1pdCcgb3B0aW9uIGlzIG9ubHkgc3VwcG9ydGVkIG9uIGxpbmVhciBzbGlkZXJzIHdpdGggMiBvciBtb3JlIGhhbmRsZXMuXCIpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHRlc3RQYWRkaW5nICggcGFyc2VkLCBlbnRyeSApIHtcblxuXHRcdGlmICggIWlzTnVtZXJpYyhlbnRyeSkgJiYgIUFycmF5LmlzQXJyYXkoZW50cnkpICl7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyIChcIiArIFZFUlNJT04gKyBcIik6ICdwYWRkaW5nJyBvcHRpb24gbXVzdCBiZSBudW1lcmljIG9yIGFycmF5IG9mIGV4YWN0bHkgMiBudW1iZXJzLlwiKTtcblx0XHR9XG5cblx0XHRpZiAoIEFycmF5LmlzQXJyYXkoZW50cnkpICYmICEoZW50cnkubGVuZ3RoID09PSAyIHx8IGlzTnVtZXJpYyhlbnRyeVswXSkgfHwgaXNOdW1lcmljKGVudHJ5WzFdKSkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyIChcIiArIFZFUlNJT04gKyBcIik6ICdwYWRkaW5nJyBvcHRpb24gbXVzdCBiZSBudW1lcmljIG9yIGFycmF5IG9mIGV4YWN0bHkgMiBudW1iZXJzLlwiKTtcblx0XHR9XG5cblx0XHRpZiAoIGVudHJ5ID09PSAwICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICggIUFycmF5LmlzQXJyYXkoZW50cnkpICkge1xuXHRcdFx0ZW50cnkgPSBbZW50cnksIGVudHJ5XTtcblx0XHR9XG5cblx0XHQvLyAnZ2V0TWFyZ2luJyByZXR1cm5zIGZhbHNlIGZvciBpbnZhbGlkIHZhbHVlcy5cblx0XHRwYXJzZWQucGFkZGluZyA9IFtwYXJzZWQuc3BlY3RydW0uZ2V0TWFyZ2luKGVudHJ5WzBdKSwgcGFyc2VkLnNwZWN0cnVtLmdldE1hcmdpbihlbnRyeVsxXSldO1xuXG5cdFx0aWYgKCBwYXJzZWQucGFkZGluZ1swXSA9PT0gZmFsc2UgfHwgcGFyc2VkLnBhZGRpbmdbMV0gPT09IGZhbHNlICkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm9VaVNsaWRlciAoXCIgKyBWRVJTSU9OICsgXCIpOiAncGFkZGluZycgb3B0aW9uIGlzIG9ubHkgc3VwcG9ydGVkIG9uIGxpbmVhciBzbGlkZXJzLlwiKTtcblx0XHR9XG5cblx0XHRpZiAoIHBhcnNlZC5wYWRkaW5nWzBdIDwgMCB8fCBwYXJzZWQucGFkZGluZ1sxXSA8IDAgKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyIChcIiArIFZFUlNJT04gKyBcIik6ICdwYWRkaW5nJyBvcHRpb24gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcihzKS5cIik7XG5cdFx0fVxuXG5cdFx0aWYgKCBwYXJzZWQucGFkZGluZ1swXSArIHBhcnNlZC5wYWRkaW5nWzFdID49IDEwMCApIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXIgKFwiICsgVkVSU0lPTiArIFwiKTogJ3BhZGRpbmcnIG9wdGlvbiBtdXN0IG5vdCBleGNlZWQgMTAwJSBvZiB0aGUgcmFuZ2UuXCIpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHRlc3REaXJlY3Rpb24gKCBwYXJzZWQsIGVudHJ5ICkge1xuXG5cdFx0Ly8gU2V0IGRpcmVjdGlvbiBhcyBhIG51bWVyaWNhbCB2YWx1ZSBmb3IgZWFzeSBwYXJzaW5nLlxuXHRcdC8vIEludmVydCBjb25uZWN0aW9uIGZvciBSVEwgc2xpZGVycywgc28gdGhhdCB0aGUgcHJvcGVyXG5cdFx0Ly8gaGFuZGxlcyBnZXQgdGhlIGNvbm5lY3QvYmFja2dyb3VuZCBjbGFzc2VzLlxuXHRcdHN3aXRjaCAoIGVudHJ5ICkge1xuXHRcdFx0Y2FzZSAnbHRyJzpcblx0XHRcdFx0cGFyc2VkLmRpciA9IDA7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAncnRsJzpcblx0XHRcdFx0cGFyc2VkLmRpciA9IDE7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm9VaVNsaWRlciAoXCIgKyBWRVJTSU9OICsgXCIpOiAnZGlyZWN0aW9uJyBvcHRpb24gd2FzIG5vdCByZWNvZ25pemVkLlwiKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiB0ZXN0QmVoYXZpb3VyICggcGFyc2VkLCBlbnRyeSApIHtcblxuXHRcdC8vIE1ha2Ugc3VyZSB0aGUgaW5wdXQgaXMgYSBzdHJpbmcuXG5cdFx0aWYgKCB0eXBlb2YgZW50cnkgIT09ICdzdHJpbmcnICkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm9VaVNsaWRlciAoXCIgKyBWRVJTSU9OICsgXCIpOiAnYmVoYXZpb3VyJyBtdXN0IGJlIGEgc3RyaW5nIGNvbnRhaW5pbmcgb3B0aW9ucy5cIik7XG5cdFx0fVxuXG5cdFx0Ly8gQ2hlY2sgaWYgdGhlIHN0cmluZyBjb250YWlucyBhbnkga2V5d29yZHMuXG5cdFx0Ly8gTm9uZSBhcmUgcmVxdWlyZWQuXG5cdFx0dmFyIHRhcCA9IGVudHJ5LmluZGV4T2YoJ3RhcCcpID49IDA7XG5cdFx0dmFyIGRyYWcgPSBlbnRyeS5pbmRleE9mKCdkcmFnJykgPj0gMDtcblx0XHR2YXIgZml4ZWQgPSBlbnRyeS5pbmRleE9mKCdmaXhlZCcpID49IDA7XG5cdFx0dmFyIHNuYXAgPSBlbnRyeS5pbmRleE9mKCdzbmFwJykgPj0gMDtcblx0XHR2YXIgaG92ZXIgPSBlbnRyeS5pbmRleE9mKCdob3ZlcicpID49IDA7XG5cblx0XHRpZiAoIGZpeGVkICkge1xuXG5cdFx0XHRpZiAoIHBhcnNlZC5oYW5kbGVzICE9PSAyICkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyIChcIiArIFZFUlNJT04gKyBcIik6ICdmaXhlZCcgYmVoYXZpb3VyIG11c3QgYmUgdXNlZCB3aXRoIDIgaGFuZGxlc1wiKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gVXNlIG1hcmdpbiB0byBlbmZvcmNlIGZpeGVkIHN0YXRlXG5cdFx0XHR0ZXN0TWFyZ2luKHBhcnNlZCwgcGFyc2VkLnN0YXJ0WzFdIC0gcGFyc2VkLnN0YXJ0WzBdKTtcblx0XHR9XG5cblx0XHRwYXJzZWQuZXZlbnRzID0ge1xuXHRcdFx0dGFwOiB0YXAgfHwgc25hcCxcblx0XHRcdGRyYWc6IGRyYWcsXG5cdFx0XHRmaXhlZDogZml4ZWQsXG5cdFx0XHRzbmFwOiBzbmFwLFxuXHRcdFx0aG92ZXI6IGhvdmVyXG5cdFx0fTtcblx0fVxuXG5cdGZ1bmN0aW9uIHRlc3RUb29sdGlwcyAoIHBhcnNlZCwgZW50cnkgKSB7XG5cblx0XHRpZiAoIGVudHJ5ID09PSBmYWxzZSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRlbHNlIGlmICggZW50cnkgPT09IHRydWUgKSB7XG5cblx0XHRcdHBhcnNlZC50b29sdGlwcyA9IFtdO1xuXG5cdFx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCBwYXJzZWQuaGFuZGxlczsgaSsrICkge1xuXHRcdFx0XHRwYXJzZWQudG9vbHRpcHMucHVzaCh0cnVlKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRlbHNlIHtcblxuXHRcdFx0cGFyc2VkLnRvb2x0aXBzID0gYXNBcnJheShlbnRyeSk7XG5cblx0XHRcdGlmICggcGFyc2VkLnRvb2x0aXBzLmxlbmd0aCAhPT0gcGFyc2VkLmhhbmRsZXMgKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXIgKFwiICsgVkVSU0lPTiArIFwiKTogbXVzdCBwYXNzIGEgZm9ybWF0dGVyIGZvciBhbGwgaGFuZGxlcy5cIik7XG5cdFx0XHR9XG5cblx0XHRcdHBhcnNlZC50b29sdGlwcy5mb3JFYWNoKGZ1bmN0aW9uKGZvcm1hdHRlcil7XG5cdFx0XHRcdGlmICggdHlwZW9mIGZvcm1hdHRlciAhPT0gJ2Jvb2xlYW4nICYmICh0eXBlb2YgZm9ybWF0dGVyICE9PSAnb2JqZWN0JyB8fCB0eXBlb2YgZm9ybWF0dGVyLnRvICE9PSAnZnVuY3Rpb24nKSApIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyIChcIiArIFZFUlNJT04gKyBcIik6ICd0b29sdGlwcycgbXVzdCBiZSBwYXNzZWQgYSBmb3JtYXR0ZXIgb3IgJ2ZhbHNlJy5cIik7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHRlc3RBcmlhRm9ybWF0ICggcGFyc2VkLCBlbnRyeSApIHtcblx0XHRwYXJzZWQuYXJpYUZvcm1hdCA9IGVudHJ5O1xuXHRcdHZhbGlkYXRlRm9ybWF0KGVudHJ5KTtcblx0fVxuXG5cdGZ1bmN0aW9uIHRlc3RGb3JtYXQgKCBwYXJzZWQsIGVudHJ5ICkge1xuXHRcdHBhcnNlZC5mb3JtYXQgPSBlbnRyeTtcblx0XHR2YWxpZGF0ZUZvcm1hdChlbnRyeSk7XG5cdH1cblxuXHRmdW5jdGlvbiB0ZXN0Q3NzUHJlZml4ICggcGFyc2VkLCBlbnRyeSApIHtcblxuXHRcdGlmICggdHlwZW9mIGVudHJ5ICE9PSAnc3RyaW5nJyAmJiBlbnRyeSAhPT0gZmFsc2UgKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyIChcIiArIFZFUlNJT04gKyBcIik6ICdjc3NQcmVmaXgnIG11c3QgYmUgYSBzdHJpbmcgb3IgYGZhbHNlYC5cIik7XG5cdFx0fVxuXG5cdFx0cGFyc2VkLmNzc1ByZWZpeCA9IGVudHJ5O1xuXHR9XG5cblx0ZnVuY3Rpb24gdGVzdENzc0NsYXNzZXMgKCBwYXJzZWQsIGVudHJ5ICkge1xuXG5cdFx0aWYgKCB0eXBlb2YgZW50cnkgIT09ICdvYmplY3QnICkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm9VaVNsaWRlciAoXCIgKyBWRVJTSU9OICsgXCIpOiAnY3NzQ2xhc3NlcycgbXVzdCBiZSBhbiBvYmplY3QuXCIpO1xuXHRcdH1cblxuXHRcdGlmICggdHlwZW9mIHBhcnNlZC5jc3NQcmVmaXggPT09ICdzdHJpbmcnICkge1xuXHRcdFx0cGFyc2VkLmNzc0NsYXNzZXMgPSB7fTtcblxuXHRcdFx0Zm9yICggdmFyIGtleSBpbiBlbnRyeSApIHtcblx0XHRcdFx0aWYgKCAhZW50cnkuaGFzT3duUHJvcGVydHkoa2V5KSApIHsgY29udGludWU7IH1cblxuXHRcdFx0XHRwYXJzZWQuY3NzQ2xhc3Nlc1trZXldID0gcGFyc2VkLmNzc1ByZWZpeCArIGVudHJ5W2tleV07XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHBhcnNlZC5jc3NDbGFzc2VzID0gZW50cnk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gVGVzdCBhbGwgZGV2ZWxvcGVyIHNldHRpbmdzIGFuZCBwYXJzZSB0byBhc3N1bXB0aW9uLXNhZmUgdmFsdWVzLlxuXHRmdW5jdGlvbiB0ZXN0T3B0aW9ucyAoIG9wdGlvbnMgKSB7XG5cblx0XHQvLyBUbyBwcm92ZSBhIGZpeCBmb3IgIzUzNywgZnJlZXplIG9wdGlvbnMgaGVyZS5cblx0XHQvLyBJZiB0aGUgb2JqZWN0IGlzIG1vZGlmaWVkLCBhbiBlcnJvciB3aWxsIGJlIHRocm93bi5cblx0XHQvLyBPYmplY3QuZnJlZXplKG9wdGlvbnMpO1xuXG5cdFx0dmFyIHBhcnNlZCA9IHtcblx0XHRcdG1hcmdpbjogMCxcblx0XHRcdGxpbWl0OiAwLFxuXHRcdFx0cGFkZGluZzogMCxcblx0XHRcdGFuaW1hdGU6IHRydWUsXG5cdFx0XHRhbmltYXRpb25EdXJhdGlvbjogMzAwLFxuXHRcdFx0YXJpYUZvcm1hdDogZGVmYXVsdEZvcm1hdHRlcixcblx0XHRcdGZvcm1hdDogZGVmYXVsdEZvcm1hdHRlclxuXHRcdH07XG5cblx0XHQvLyBUZXN0cyBhcmUgZXhlY3V0ZWQgaW4gdGhlIG9yZGVyIHRoZXkgYXJlIHByZXNlbnRlZCBoZXJlLlxuXHRcdHZhciB0ZXN0cyA9IHtcblx0XHRcdCdzdGVwJzogeyByOiBmYWxzZSwgdDogdGVzdFN0ZXAgfSxcblx0XHRcdCdzdGFydCc6IHsgcjogdHJ1ZSwgdDogdGVzdFN0YXJ0IH0sXG5cdFx0XHQnY29ubmVjdCc6IHsgcjogdHJ1ZSwgdDogdGVzdENvbm5lY3QgfSxcblx0XHRcdCdkaXJlY3Rpb24nOiB7IHI6IHRydWUsIHQ6IHRlc3REaXJlY3Rpb24gfSxcblx0XHRcdCdzbmFwJzogeyByOiBmYWxzZSwgdDogdGVzdFNuYXAgfSxcblx0XHRcdCdhbmltYXRlJzogeyByOiBmYWxzZSwgdDogdGVzdEFuaW1hdGUgfSxcblx0XHRcdCdhbmltYXRpb25EdXJhdGlvbic6IHsgcjogZmFsc2UsIHQ6IHRlc3RBbmltYXRpb25EdXJhdGlvbiB9LFxuXHRcdFx0J3JhbmdlJzogeyByOiB0cnVlLCB0OiB0ZXN0UmFuZ2UgfSxcblx0XHRcdCdvcmllbnRhdGlvbic6IHsgcjogZmFsc2UsIHQ6IHRlc3RPcmllbnRhdGlvbiB9LFxuXHRcdFx0J21hcmdpbic6IHsgcjogZmFsc2UsIHQ6IHRlc3RNYXJnaW4gfSxcblx0XHRcdCdsaW1pdCc6IHsgcjogZmFsc2UsIHQ6IHRlc3RMaW1pdCB9LFxuXHRcdFx0J3BhZGRpbmcnOiB7IHI6IGZhbHNlLCB0OiB0ZXN0UGFkZGluZyB9LFxuXHRcdFx0J2JlaGF2aW91cic6IHsgcjogdHJ1ZSwgdDogdGVzdEJlaGF2aW91ciB9LFxuXHRcdFx0J2FyaWFGb3JtYXQnOiB7IHI6IGZhbHNlLCB0OiB0ZXN0QXJpYUZvcm1hdCB9LFxuXHRcdFx0J2Zvcm1hdCc6IHsgcjogZmFsc2UsIHQ6IHRlc3RGb3JtYXQgfSxcblx0XHRcdCd0b29sdGlwcyc6IHsgcjogZmFsc2UsIHQ6IHRlc3RUb29sdGlwcyB9LFxuXHRcdFx0J2Nzc1ByZWZpeCc6IHsgcjogdHJ1ZSwgdDogdGVzdENzc1ByZWZpeCB9LFxuXHRcdFx0J2Nzc0NsYXNzZXMnOiB7IHI6IHRydWUsIHQ6IHRlc3RDc3NDbGFzc2VzIH1cblx0XHR9O1xuXG5cdFx0dmFyIGRlZmF1bHRzID0ge1xuXHRcdFx0J2Nvbm5lY3QnOiBmYWxzZSxcblx0XHRcdCdkaXJlY3Rpb24nOiAnbHRyJyxcblx0XHRcdCdiZWhhdmlvdXInOiAndGFwJyxcblx0XHRcdCdvcmllbnRhdGlvbic6ICdob3Jpem9udGFsJyxcblx0XHRcdCdjc3NQcmVmaXgnIDogJ25vVWktJyxcblx0XHRcdCdjc3NDbGFzc2VzJzoge1xuXHRcdFx0XHR0YXJnZXQ6ICd0YXJnZXQnLFxuXHRcdFx0XHRiYXNlOiAnYmFzZScsXG5cdFx0XHRcdG9yaWdpbjogJ29yaWdpbicsXG5cdFx0XHRcdGhhbmRsZTogJ2hhbmRsZScsXG5cdFx0XHRcdGhhbmRsZUxvd2VyOiAnaGFuZGxlLWxvd2VyJyxcblx0XHRcdFx0aGFuZGxlVXBwZXI6ICdoYW5kbGUtdXBwZXInLFxuXHRcdFx0XHRob3Jpem9udGFsOiAnaG9yaXpvbnRhbCcsXG5cdFx0XHRcdHZlcnRpY2FsOiAndmVydGljYWwnLFxuXHRcdFx0XHRiYWNrZ3JvdW5kOiAnYmFja2dyb3VuZCcsXG5cdFx0XHRcdGNvbm5lY3Q6ICdjb25uZWN0Jyxcblx0XHRcdFx0Y29ubmVjdHM6ICdjb25uZWN0cycsXG5cdFx0XHRcdGx0cjogJ2x0cicsXG5cdFx0XHRcdHJ0bDogJ3J0bCcsXG5cdFx0XHRcdGRyYWdnYWJsZTogJ2RyYWdnYWJsZScsXG5cdFx0XHRcdGRyYWc6ICdzdGF0ZS1kcmFnJyxcblx0XHRcdFx0dGFwOiAnc3RhdGUtdGFwJyxcblx0XHRcdFx0YWN0aXZlOiAnYWN0aXZlJyxcblx0XHRcdFx0dG9vbHRpcDogJ3Rvb2x0aXAnLFxuXHRcdFx0XHRwaXBzOiAncGlwcycsXG5cdFx0XHRcdHBpcHNIb3Jpem9udGFsOiAncGlwcy1ob3Jpem9udGFsJyxcblx0XHRcdFx0cGlwc1ZlcnRpY2FsOiAncGlwcy12ZXJ0aWNhbCcsXG5cdFx0XHRcdG1hcmtlcjogJ21hcmtlcicsXG5cdFx0XHRcdG1hcmtlckhvcml6b250YWw6ICdtYXJrZXItaG9yaXpvbnRhbCcsXG5cdFx0XHRcdG1hcmtlclZlcnRpY2FsOiAnbWFya2VyLXZlcnRpY2FsJyxcblx0XHRcdFx0bWFya2VyTm9ybWFsOiAnbWFya2VyLW5vcm1hbCcsXG5cdFx0XHRcdG1hcmtlckxhcmdlOiAnbWFya2VyLWxhcmdlJyxcblx0XHRcdFx0bWFya2VyU3ViOiAnbWFya2VyLXN1YicsXG5cdFx0XHRcdHZhbHVlOiAndmFsdWUnLFxuXHRcdFx0XHR2YWx1ZUhvcml6b250YWw6ICd2YWx1ZS1ob3Jpem9udGFsJyxcblx0XHRcdFx0dmFsdWVWZXJ0aWNhbDogJ3ZhbHVlLXZlcnRpY2FsJyxcblx0XHRcdFx0dmFsdWVOb3JtYWw6ICd2YWx1ZS1ub3JtYWwnLFxuXHRcdFx0XHR2YWx1ZUxhcmdlOiAndmFsdWUtbGFyZ2UnLFxuXHRcdFx0XHR2YWx1ZVN1YjogJ3ZhbHVlLXN1Yidcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0Ly8gQXJpYUZvcm1hdCBkZWZhdWx0cyB0byByZWd1bGFyIGZvcm1hdCwgaWYgYW55LlxuXHRcdGlmICggb3B0aW9ucy5mb3JtYXQgJiYgIW9wdGlvbnMuYXJpYUZvcm1hdCApIHtcblx0XHRcdG9wdGlvbnMuYXJpYUZvcm1hdCA9IG9wdGlvbnMuZm9ybWF0O1xuXHRcdH1cblxuXHRcdC8vIFJ1biBhbGwgb3B0aW9ucyB0aHJvdWdoIGEgdGVzdGluZyBtZWNoYW5pc20gdG8gZW5zdXJlIGNvcnJlY3Rcblx0XHQvLyBpbnB1dC4gSXQgc2hvdWxkIGJlIG5vdGVkIHRoYXQgb3B0aW9ucyBtaWdodCBnZXQgbW9kaWZpZWQgdG9cblx0XHQvLyBiZSBoYW5kbGVkIHByb3Blcmx5LiBFLmcuIHdyYXBwaW5nIGludGVnZXJzIGluIGFycmF5cy5cblx0XHRPYmplY3Qua2V5cyh0ZXN0cykuZm9yRWFjaChmdW5jdGlvbiggbmFtZSApe1xuXG5cdFx0XHQvLyBJZiB0aGUgb3B0aW9uIGlzbid0IHNldCwgYnV0IGl0IGlzIHJlcXVpcmVkLCB0aHJvdyBhbiBlcnJvci5cblx0XHRcdGlmICggIWlzU2V0KG9wdGlvbnNbbmFtZV0pICYmIGRlZmF1bHRzW25hbWVdID09PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdFx0aWYgKCB0ZXN0c1tuYW1lXS5yICkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXIgKFwiICsgVkVSU0lPTiArIFwiKTogJ1wiICsgbmFtZSArIFwiJyBpcyByZXF1aXJlZC5cIik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0dGVzdHNbbmFtZV0udCggcGFyc2VkLCAhaXNTZXQob3B0aW9uc1tuYW1lXSkgPyBkZWZhdWx0c1tuYW1lXSA6IG9wdGlvbnNbbmFtZV0gKTtcblx0XHR9KTtcblxuXHRcdC8vIEZvcndhcmQgcGlwcyBvcHRpb25zXG5cdFx0cGFyc2VkLnBpcHMgPSBvcHRpb25zLnBpcHM7XG5cblx0XHQvLyBBbGwgcmVjZW50IGJyb3dzZXJzIGFjY2VwdCB1bnByZWZpeGVkIHRyYW5zZm9ybS5cblx0XHQvLyBXZSBuZWVkIC1tcy0gZm9yIElFOSBhbmQgLXdlYmtpdC0gZm9yIG9sZGVyIEFuZHJvaWQ7XG5cdFx0Ly8gQXNzdW1lIHVzZSBvZiAtd2Via2l0LSBpZiB1bnByZWZpeGVkIGFuZCAtbXMtIGFyZSBub3Qgc3VwcG9ydGVkLlxuXHRcdC8vIGh0dHBzOi8vY2FuaXVzZS5jb20vI2ZlYXQ9dHJhbnNmb3JtczJkXG5cdFx0dmFyIGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHZhciBtc1ByZWZpeCA9IGQuc3R5bGUubXNUcmFuc2Zvcm0gIT09IHVuZGVmaW5lZDtcblx0XHR2YXIgbm9QcmVmaXggPSBkLnN0eWxlLnRyYW5zZm9ybSAhPT0gdW5kZWZpbmVkO1xuXG5cdFx0cGFyc2VkLnRyYW5zZm9ybVJ1bGUgPSBub1ByZWZpeCA/ICd0cmFuc2Zvcm0nIDogKG1zUHJlZml4ID8gJ21zVHJhbnNmb3JtJyA6ICd3ZWJraXRUcmFuc2Zvcm0nKTtcblxuXHRcdC8vIFBpcHMgZG9uJ3QgbW92ZSwgc28gd2UgY2FuIHBsYWNlIHRoZW0gdXNpbmcgbGVmdC90b3AuXG5cdFx0dmFyIHN0eWxlcyA9IFtbJ2xlZnQnLCAndG9wJ10sIFsncmlnaHQnLCAnYm90dG9tJ11dO1xuXG5cdFx0cGFyc2VkLnN0eWxlID0gc3R5bGVzW3BhcnNlZC5kaXJdW3BhcnNlZC5vcnRdO1xuXG5cdFx0cmV0dXJuIHBhcnNlZDtcblx0fVxuXHJcblxyXG5mdW5jdGlvbiBzY29wZSAoIHRhcmdldCwgb3B0aW9ucywgb3JpZ2luYWxPcHRpb25zICl7XHJcblxyXG5cdHZhciBhY3Rpb25zID0gZ2V0QWN0aW9ucygpO1xyXG5cdHZhciBzdXBwb3J0c1RvdWNoQWN0aW9uTm9uZSA9IGdldFN1cHBvcnRzVG91Y2hBY3Rpb25Ob25lKCk7XHJcblx0dmFyIHN1cHBvcnRzUGFzc2l2ZSA9IHN1cHBvcnRzVG91Y2hBY3Rpb25Ob25lICYmIGdldFN1cHBvcnRzUGFzc2l2ZSgpO1xyXG5cclxuXHQvLyBBbGwgdmFyaWFibGVzIGxvY2FsIHRvICdzY29wZScgYXJlIHByZWZpeGVkIHdpdGggJ3Njb3BlXydcclxuXHR2YXIgc2NvcGVfVGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdHZhciBzY29wZV9Mb2NhdGlvbnMgPSBbXTtcclxuXHR2YXIgc2NvcGVfQmFzZTtcclxuXHR2YXIgc2NvcGVfSGFuZGxlcztcclxuXHR2YXIgc2NvcGVfSGFuZGxlTnVtYmVycyA9IFtdO1xyXG5cdHZhciBzY29wZV9BY3RpdmVIYW5kbGVzQ291bnQgPSAwO1xyXG5cdHZhciBzY29wZV9Db25uZWN0cztcclxuXHR2YXIgc2NvcGVfU3BlY3RydW0gPSBvcHRpb25zLnNwZWN0cnVtO1xyXG5cdHZhciBzY29wZV9WYWx1ZXMgPSBbXTtcclxuXHR2YXIgc2NvcGVfRXZlbnRzID0ge307XHJcblx0dmFyIHNjb3BlX1NlbGY7XHJcblx0dmFyIHNjb3BlX1BpcHM7XHJcblx0dmFyIHNjb3BlX0RvY3VtZW50ID0gdGFyZ2V0Lm93bmVyRG9jdW1lbnQ7XHJcblx0dmFyIHNjb3BlX0RvY3VtZW50RWxlbWVudCA9IHNjb3BlX0RvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxuXHR2YXIgc2NvcGVfQm9keSA9IHNjb3BlX0RvY3VtZW50LmJvZHk7XHJcblxyXG5cclxuXHQvLyBGb3IgaG9yaXpvbnRhbCBzbGlkZXJzIGluIHN0YW5kYXJkIGx0ciBkb2N1bWVudHMsXHJcblx0Ly8gbWFrZSAubm9VaS1vcmlnaW4gb3ZlcmZsb3cgdG8gdGhlIGxlZnQgc28gdGhlIGRvY3VtZW50IGRvZXNuJ3Qgc2Nyb2xsLlxyXG5cdHZhciBzY29wZV9EaXJPZmZzZXQgPSAoc2NvcGVfRG9jdW1lbnQuZGlyID09PSAncnRsJykgfHwgKG9wdGlvbnMub3J0ID09PSAxKSA/IDAgOiAxMDA7XHJcblxyXG4vKiEgSW4gdGhpcyBmaWxlOiBDb25zdHJ1Y3Rpb24gb2YgRE9NIGVsZW1lbnRzOyAqL1xyXG5cclxuXHQvLyBDcmVhdGVzIGEgbm9kZSwgYWRkcyBpdCB0byB0YXJnZXQsIHJldHVybnMgdGhlIG5ldyBub2RlLlxyXG5cdGZ1bmN0aW9uIGFkZE5vZGVUbyAoIGFkZFRhcmdldCwgY2xhc3NOYW1lICkge1xyXG5cclxuXHRcdHZhciBkaXYgPSBzY29wZV9Eb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcblx0XHRpZiAoIGNsYXNzTmFtZSApIHtcclxuXHRcdFx0YWRkQ2xhc3MoZGl2LCBjbGFzc05hbWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGFkZFRhcmdldC5hcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuXHRcdHJldHVybiBkaXY7XHJcblx0fVxyXG5cclxuXHQvLyBBcHBlbmQgYSBvcmlnaW4gdG8gdGhlIGJhc2VcclxuXHRmdW5jdGlvbiBhZGRPcmlnaW4gKCBiYXNlLCBoYW5kbGVOdW1iZXIgKSB7XHJcblxyXG5cdFx0dmFyIG9yaWdpbiA9IGFkZE5vZGVUbyhiYXNlLCBvcHRpb25zLmNzc0NsYXNzZXMub3JpZ2luKTtcclxuXHRcdHZhciBoYW5kbGUgPSBhZGROb2RlVG8ob3JpZ2luLCBvcHRpb25zLmNzc0NsYXNzZXMuaGFuZGxlKTtcclxuXHJcblx0XHRoYW5kbGUuc2V0QXR0cmlidXRlKCdkYXRhLWhhbmRsZScsIGhhbmRsZU51bWJlcik7XHJcblxyXG5cdFx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRNTC9HbG9iYWxfYXR0cmlidXRlcy90YWJpbmRleFxyXG5cdFx0Ly8gMCA9IGZvY3VzYWJsZSBhbmQgcmVhY2hhYmxlXHJcblx0XHRoYW5kbGUuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XHJcblx0XHRoYW5kbGUuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3NsaWRlcicpO1xyXG5cdFx0aGFuZGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1vcmllbnRhdGlvbicsIG9wdGlvbnMub3J0ID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJyk7XHJcblxyXG5cdFx0aWYgKCBoYW5kbGVOdW1iZXIgPT09IDAgKSB7XHJcblx0XHRcdGFkZENsYXNzKGhhbmRsZSwgb3B0aW9ucy5jc3NDbGFzc2VzLmhhbmRsZUxvd2VyKTtcclxuXHRcdH1cclxuXHJcblx0XHRlbHNlIGlmICggaGFuZGxlTnVtYmVyID09PSBvcHRpb25zLmhhbmRsZXMgLSAxICkge1xyXG5cdFx0XHRhZGRDbGFzcyhoYW5kbGUsIG9wdGlvbnMuY3NzQ2xhc3Nlcy5oYW5kbGVVcHBlcik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG9yaWdpbjtcclxuXHR9XHJcblxyXG5cdC8vIEluc2VydCBub2RlcyBmb3IgY29ubmVjdCBlbGVtZW50c1xyXG5cdGZ1bmN0aW9uIGFkZENvbm5lY3QgKCBiYXNlLCBhZGQgKSB7XHJcblxyXG5cdFx0aWYgKCAhYWRkICkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGFkZE5vZGVUbyhiYXNlLCBvcHRpb25zLmNzc0NsYXNzZXMuY29ubmVjdCk7XHJcblx0fVxyXG5cclxuXHQvLyBBZGQgaGFuZGxlcyB0byB0aGUgc2xpZGVyIGJhc2UuXHJcblx0ZnVuY3Rpb24gYWRkRWxlbWVudHMgKCBjb25uZWN0T3B0aW9ucywgYmFzZSApIHtcclxuXHJcblx0XHR2YXIgY29ubmVjdEJhc2UgPSBhZGROb2RlVG8oYmFzZSwgb3B0aW9ucy5jc3NDbGFzc2VzLmNvbm5lY3RzKTtcclxuXHJcblx0XHRzY29wZV9IYW5kbGVzID0gW107XHJcblx0XHRzY29wZV9Db25uZWN0cyA9IFtdO1xyXG5cclxuXHRcdHNjb3BlX0Nvbm5lY3RzLnB1c2goYWRkQ29ubmVjdChjb25uZWN0QmFzZSwgY29ubmVjdE9wdGlvbnNbMF0pKTtcclxuXHJcblx0XHQvLyBbOjo6Ok89PT09Tz09PT1PPT09PV1cclxuXHRcdC8vIGNvbm5lY3RPcHRpb25zID0gWzAsIDEsIDEsIDFdXHJcblxyXG5cdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgb3B0aW9ucy5oYW5kbGVzOyBpKysgKSB7XHJcblx0XHRcdC8vIEtlZXAgYSBsaXN0IG9mIGFsbCBhZGRlZCBoYW5kbGVzLlxyXG5cdFx0XHRzY29wZV9IYW5kbGVzLnB1c2goYWRkT3JpZ2luKGJhc2UsIGkpKTtcclxuXHRcdFx0c2NvcGVfSGFuZGxlTnVtYmVyc1tpXSA9IGk7XHJcblx0XHRcdHNjb3BlX0Nvbm5lY3RzLnB1c2goYWRkQ29ubmVjdChjb25uZWN0QmFzZSwgY29ubmVjdE9wdGlvbnNbaSArIDFdKSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBJbml0aWFsaXplIGEgc2luZ2xlIHNsaWRlci5cclxuXHRmdW5jdGlvbiBhZGRTbGlkZXIgKCBhZGRUYXJnZXQgKSB7XHJcblxyXG5cdFx0Ly8gQXBwbHkgY2xhc3NlcyBhbmQgZGF0YSB0byB0aGUgdGFyZ2V0LlxyXG5cdFx0YWRkQ2xhc3MoYWRkVGFyZ2V0LCBvcHRpb25zLmNzc0NsYXNzZXMudGFyZ2V0KTtcclxuXHJcblx0XHRpZiAoIG9wdGlvbnMuZGlyID09PSAwICkge1xyXG5cdFx0XHRhZGRDbGFzcyhhZGRUYXJnZXQsIG9wdGlvbnMuY3NzQ2xhc3Nlcy5sdHIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0YWRkQ2xhc3MoYWRkVGFyZ2V0LCBvcHRpb25zLmNzc0NsYXNzZXMucnRsKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIG9wdGlvbnMub3J0ID09PSAwICkge1xyXG5cdFx0XHRhZGRDbGFzcyhhZGRUYXJnZXQsIG9wdGlvbnMuY3NzQ2xhc3Nlcy5ob3Jpem9udGFsKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGFkZENsYXNzKGFkZFRhcmdldCwgb3B0aW9ucy5jc3NDbGFzc2VzLnZlcnRpY2FsKTtcclxuXHRcdH1cclxuXHJcblx0XHRzY29wZV9CYXNlID0gYWRkTm9kZVRvKGFkZFRhcmdldCwgb3B0aW9ucy5jc3NDbGFzc2VzLmJhc2UpO1xyXG5cdH1cclxuXHJcblxyXG5cdGZ1bmN0aW9uIGFkZFRvb2x0aXAgKCBoYW5kbGUsIGhhbmRsZU51bWJlciApIHtcclxuXHJcblx0XHRpZiAoICFvcHRpb25zLnRvb2x0aXBzW2hhbmRsZU51bWJlcl0gKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYWRkTm9kZVRvKGhhbmRsZS5maXJzdENoaWxkLCBvcHRpb25zLmNzc0NsYXNzZXMudG9vbHRpcCk7XHJcblx0fVxyXG5cclxuXHQvLyBUaGUgdG9vbHRpcHMgb3B0aW9uIGlzIGEgc2hvcnRoYW5kIGZvciB1c2luZyB0aGUgJ3VwZGF0ZScgZXZlbnQuXHJcblx0ZnVuY3Rpb24gdG9vbHRpcHMgKCApIHtcclxuXHJcblx0XHQvLyBUb29sdGlwcyBhcmUgYWRkZWQgd2l0aCBvcHRpb25zLnRvb2x0aXBzIGluIG9yaWdpbmFsIG9yZGVyLlxyXG5cdFx0dmFyIHRpcHMgPSBzY29wZV9IYW5kbGVzLm1hcChhZGRUb29sdGlwKTtcclxuXHJcblx0XHRiaW5kRXZlbnQoJ3VwZGF0ZScsIGZ1bmN0aW9uKHZhbHVlcywgaGFuZGxlTnVtYmVyLCB1bmVuY29kZWQpIHtcclxuXHJcblx0XHRcdGlmICggIXRpcHNbaGFuZGxlTnVtYmVyXSApIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBmb3JtYXR0ZWRWYWx1ZSA9IHZhbHVlc1toYW5kbGVOdW1iZXJdO1xyXG5cclxuXHRcdFx0aWYgKCBvcHRpb25zLnRvb2x0aXBzW2hhbmRsZU51bWJlcl0gIT09IHRydWUgKSB7XHJcblx0XHRcdFx0Zm9ybWF0dGVkVmFsdWUgPSBvcHRpb25zLnRvb2x0aXBzW2hhbmRsZU51bWJlcl0udG8odW5lbmNvZGVkW2hhbmRsZU51bWJlcl0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aXBzW2hhbmRsZU51bWJlcl0uaW5uZXJIVE1MID0gZm9ybWF0dGVkVmFsdWU7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cclxuXHRmdW5jdGlvbiBhcmlhICggKSB7XHJcblxyXG5cdFx0YmluZEV2ZW50KCd1cGRhdGUnLCBmdW5jdGlvbiAoIHZhbHVlcywgaGFuZGxlTnVtYmVyLCB1bmVuY29kZWQsIHRhcCwgcG9zaXRpb25zICkge1xyXG5cclxuXHRcdFx0Ly8gVXBkYXRlIEFyaWEgVmFsdWVzIGZvciBhbGwgaGFuZGxlcywgYXMgYSBjaGFuZ2UgaW4gb25lIGNoYW5nZXMgbWluIGFuZCBtYXggdmFsdWVzIGZvciB0aGUgbmV4dC5cclxuXHRcdFx0c2NvcGVfSGFuZGxlTnVtYmVycy5mb3JFYWNoKGZ1bmN0aW9uKCBpbmRleCApe1xyXG5cclxuXHRcdFx0XHR2YXIgaGFuZGxlID0gc2NvcGVfSGFuZGxlc1tpbmRleF07XHJcblxyXG5cdFx0XHRcdHZhciBtaW4gPSBjaGVja0hhbmRsZVBvc2l0aW9uKHNjb3BlX0xvY2F0aW9ucywgaW5kZXgsIDAsIHRydWUsIHRydWUsIHRydWUpO1xyXG5cdFx0XHRcdHZhciBtYXggPSBjaGVja0hhbmRsZVBvc2l0aW9uKHNjb3BlX0xvY2F0aW9ucywgaW5kZXgsIDEwMCwgdHJ1ZSwgdHJ1ZSwgdHJ1ZSk7XHJcblxyXG5cdFx0XHRcdHZhciBub3cgPSBwb3NpdGlvbnNbaW5kZXhdO1xyXG5cdFx0XHRcdHZhciB0ZXh0ID0gb3B0aW9ucy5hcmlhRm9ybWF0LnRvKHVuZW5jb2RlZFtpbmRleF0pO1xyXG5cclxuXHRcdFx0XHRoYW5kbGUuY2hpbGRyZW5bMF0uc2V0QXR0cmlidXRlKCdhcmlhLXZhbHVlbWluJywgbWluLnRvRml4ZWQoMSkpO1xyXG5cdFx0XHRcdGhhbmRsZS5jaGlsZHJlblswXS5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWVtYXgnLCBtYXgudG9GaXhlZCgxKSk7XHJcblx0XHRcdFx0aGFuZGxlLmNoaWxkcmVuWzBdLnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZW5vdycsIG5vdy50b0ZpeGVkKDEpKTtcclxuXHRcdFx0XHRoYW5kbGUuY2hpbGRyZW5bMF0uc2V0QXR0cmlidXRlKCdhcmlhLXZhbHVldGV4dCcsIHRleHQpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblxyXG5cdGZ1bmN0aW9uIGdldEdyb3VwICggbW9kZSwgdmFsdWVzLCBzdGVwcGVkICkge1xyXG5cclxuXHRcdC8vIFVzZSB0aGUgcmFuZ2UuXHJcblx0XHRpZiAoIG1vZGUgPT09ICdyYW5nZScgfHwgbW9kZSA9PT0gJ3N0ZXBzJyApIHtcclxuXHRcdFx0cmV0dXJuIHNjb3BlX1NwZWN0cnVtLnhWYWw7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCBtb2RlID09PSAnY291bnQnICkge1xyXG5cclxuXHRcdFx0aWYgKCB2YWx1ZXMgPCAyICkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXIgKFwiICsgVkVSU0lPTiArIFwiKTogJ3ZhbHVlcycgKD49IDIpIHJlcXVpcmVkIGZvciBtb2RlICdjb3VudCcuXCIpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBEaXZpZGUgMCAtIDEwMCBpbiAnY291bnQnIHBhcnRzLlxyXG5cdFx0XHR2YXIgaW50ZXJ2YWwgPSB2YWx1ZXMgLSAxO1xyXG5cdFx0XHR2YXIgc3ByZWFkID0gKCAxMDAgLyBpbnRlcnZhbCApO1xyXG5cclxuXHRcdFx0dmFsdWVzID0gW107XHJcblxyXG5cdFx0XHQvLyBMaXN0IHRoZXNlIHBhcnRzIGFuZCBoYXZlIHRoZW0gaGFuZGxlZCBhcyAncG9zaXRpb25zJy5cclxuXHRcdFx0d2hpbGUgKCBpbnRlcnZhbC0tICkge1xyXG5cdFx0XHRcdHZhbHVlc1sgaW50ZXJ2YWwgXSA9ICggaW50ZXJ2YWwgKiBzcHJlYWQgKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFsdWVzLnB1c2goMTAwKTtcclxuXHJcblx0XHRcdG1vZGUgPSAncG9zaXRpb25zJztcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIG1vZGUgPT09ICdwb3NpdGlvbnMnICkge1xyXG5cclxuXHRcdFx0Ly8gTWFwIGFsbCBwZXJjZW50YWdlcyB0byBvbi1yYW5nZSB2YWx1ZXMuXHJcblx0XHRcdHJldHVybiB2YWx1ZXMubWFwKGZ1bmN0aW9uKCB2YWx1ZSApe1xyXG5cdFx0XHRcdHJldHVybiBzY29wZV9TcGVjdHJ1bS5mcm9tU3RlcHBpbmcoIHN0ZXBwZWQgPyBzY29wZV9TcGVjdHJ1bS5nZXRTdGVwKCB2YWx1ZSApIDogdmFsdWUgKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCBtb2RlID09PSAndmFsdWVzJyApIHtcclxuXHJcblx0XHRcdC8vIElmIHRoZSB2YWx1ZSBtdXN0IGJlIHN0ZXBwZWQsIGl0IG5lZWRzIHRvIGJlIGNvbnZlcnRlZCB0byBhIHBlcmNlbnRhZ2UgZmlyc3QuXHJcblx0XHRcdGlmICggc3RlcHBlZCApIHtcclxuXHJcblx0XHRcdFx0cmV0dXJuIHZhbHVlcy5tYXAoZnVuY3Rpb24oIHZhbHVlICl7XHJcblxyXG5cdFx0XHRcdFx0Ly8gQ29udmVydCB0byBwZXJjZW50YWdlLCBhcHBseSBzdGVwLCByZXR1cm4gdG8gdmFsdWUuXHJcblx0XHRcdFx0XHRyZXR1cm4gc2NvcGVfU3BlY3RydW0uZnJvbVN0ZXBwaW5nKCBzY29wZV9TcGVjdHJ1bS5nZXRTdGVwKCBzY29wZV9TcGVjdHJ1bS50b1N0ZXBwaW5nKCB2YWx1ZSApICkgKTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIE90aGVyd2lzZSwgd2UgY2FuIHNpbXBseSB1c2UgdGhlIHZhbHVlcy5cclxuXHRcdFx0cmV0dXJuIHZhbHVlcztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGdlbmVyYXRlU3ByZWFkICggZGVuc2l0eSwgbW9kZSwgZ3JvdXAgKSB7XHJcblxyXG5cdFx0ZnVuY3Rpb24gc2FmZUluY3JlbWVudCh2YWx1ZSwgaW5jcmVtZW50KSB7XHJcblx0XHRcdC8vIEF2b2lkIGZsb2F0aW5nIHBvaW50IHZhcmlhbmNlIGJ5IGRyb3BwaW5nIHRoZSBzbWFsbGVzdCBkZWNpbWFsIHBsYWNlcy5cclxuXHRcdFx0cmV0dXJuICh2YWx1ZSArIGluY3JlbWVudCkudG9GaXhlZCg3KSAvIDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGluZGV4ZXMgPSB7fTtcclxuXHRcdHZhciBmaXJzdEluUmFuZ2UgPSBzY29wZV9TcGVjdHJ1bS54VmFsWzBdO1xyXG5cdFx0dmFyIGxhc3RJblJhbmdlID0gc2NvcGVfU3BlY3RydW0ueFZhbFtzY29wZV9TcGVjdHJ1bS54VmFsLmxlbmd0aC0xXTtcclxuXHRcdHZhciBpZ25vcmVGaXJzdCA9IGZhbHNlO1xyXG5cdFx0dmFyIGlnbm9yZUxhc3QgPSBmYWxzZTtcclxuXHRcdHZhciBwcmV2UGN0ID0gMDtcclxuXHJcblx0XHQvLyBDcmVhdGUgYSBjb3B5IG9mIHRoZSBncm91cCwgc29ydCBpdCBhbmQgZmlsdGVyIGF3YXkgYWxsIGR1cGxpY2F0ZXMuXHJcblx0XHRncm91cCA9IHVuaXF1ZShncm91cC5zbGljZSgpLnNvcnQoZnVuY3Rpb24oYSwgYil7IHJldHVybiBhIC0gYjsgfSkpO1xyXG5cclxuXHRcdC8vIE1ha2Ugc3VyZSB0aGUgcmFuZ2Ugc3RhcnRzIHdpdGggdGhlIGZpcnN0IGVsZW1lbnQuXHJcblx0XHRpZiAoIGdyb3VwWzBdICE9PSBmaXJzdEluUmFuZ2UgKSB7XHJcblx0XHRcdGdyb3VwLnVuc2hpZnQoZmlyc3RJblJhbmdlKTtcclxuXHRcdFx0aWdub3JlRmlyc3QgPSB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIExpa2V3aXNlIGZvciB0aGUgbGFzdCBvbmUuXHJcblx0XHRpZiAoIGdyb3VwW2dyb3VwLmxlbmd0aCAtIDFdICE9PSBsYXN0SW5SYW5nZSApIHtcclxuXHRcdFx0Z3JvdXAucHVzaChsYXN0SW5SYW5nZSk7XHJcblx0XHRcdGlnbm9yZUxhc3QgPSB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdyb3VwLmZvckVhY2goZnVuY3Rpb24gKCBjdXJyZW50LCBpbmRleCApIHtcclxuXHJcblx0XHRcdC8vIEdldCB0aGUgY3VycmVudCBzdGVwIGFuZCB0aGUgbG93ZXIgKyB1cHBlciBwb3NpdGlvbnMuXHJcblx0XHRcdHZhciBzdGVwO1xyXG5cdFx0XHR2YXIgaTtcclxuXHRcdFx0dmFyIHE7XHJcblx0XHRcdHZhciBsb3cgPSBjdXJyZW50O1xyXG5cdFx0XHR2YXIgaGlnaCA9IGdyb3VwW2luZGV4KzFdO1xyXG5cdFx0XHR2YXIgbmV3UGN0O1xyXG5cdFx0XHR2YXIgcGN0RGlmZmVyZW5jZTtcclxuXHRcdFx0dmFyIHBjdFBvcztcclxuXHRcdFx0dmFyIHR5cGU7XHJcblx0XHRcdHZhciBzdGVwcztcclxuXHRcdFx0dmFyIHJlYWxTdGVwcztcclxuXHRcdFx0dmFyIHN0ZXBzaXplO1xyXG5cclxuXHRcdFx0Ly8gV2hlbiB1c2luZyAnc3RlcHMnIG1vZGUsIHVzZSB0aGUgcHJvdmlkZWQgc3RlcHMuXHJcblx0XHRcdC8vIE90aGVyd2lzZSwgd2UnbGwgc3RlcCBvbiB0byB0aGUgbmV4dCBzdWJyYW5nZS5cclxuXHRcdFx0aWYgKCBtb2RlID09PSAnc3RlcHMnICkge1xyXG5cdFx0XHRcdHN0ZXAgPSBzY29wZV9TcGVjdHJ1bS54TnVtU3RlcHNbIGluZGV4IF07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIERlZmF1bHQgdG8gYSAnZnVsbCcgc3RlcC5cclxuXHRcdFx0aWYgKCAhc3RlcCApIHtcclxuXHRcdFx0XHRzdGVwID0gaGlnaC1sb3c7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIExvdyBjYW4gYmUgMCwgc28gdGVzdCBmb3IgZmFsc2UuIElmIGhpZ2ggaXMgdW5kZWZpbmVkLFxyXG5cdFx0XHQvLyB3ZSBhcmUgYXQgdGhlIGxhc3Qgc3VicmFuZ2UuIEluZGV4IDAgaXMgYWxyZWFkeSBoYW5kbGVkLlxyXG5cdFx0XHRpZiAoIGxvdyA9PT0gZmFsc2UgfHwgaGlnaCA9PT0gdW5kZWZpbmVkICkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gTWFrZSBzdXJlIHN0ZXAgaXNuJ3QgMCwgd2hpY2ggd291bGQgY2F1c2UgYW4gaW5maW5pdGUgbG9vcCAoIzY1NClcclxuXHRcdFx0c3RlcCA9IE1hdGgubWF4KHN0ZXAsIDAuMDAwMDAwMSk7XHJcblxyXG5cdFx0XHQvLyBGaW5kIGFsbCBzdGVwcyBpbiB0aGUgc3VicmFuZ2UuXHJcblx0XHRcdGZvciAoIGkgPSBsb3c7IGkgPD0gaGlnaDsgaSA9IHNhZmVJbmNyZW1lbnQoaSwgc3RlcCkgKSB7XHJcblxyXG5cdFx0XHRcdC8vIEdldCB0aGUgcGVyY2VudGFnZSB2YWx1ZSBmb3IgdGhlIGN1cnJlbnQgc3RlcCxcclxuXHRcdFx0XHQvLyBjYWxjdWxhdGUgdGhlIHNpemUgZm9yIHRoZSBzdWJyYW5nZS5cclxuXHRcdFx0XHRuZXdQY3QgPSBzY29wZV9TcGVjdHJ1bS50b1N0ZXBwaW5nKCBpICk7XHJcblx0XHRcdFx0cGN0RGlmZmVyZW5jZSA9IG5ld1BjdCAtIHByZXZQY3Q7XHJcblxyXG5cdFx0XHRcdHN0ZXBzID0gcGN0RGlmZmVyZW5jZSAvIGRlbnNpdHk7XHJcblx0XHRcdFx0cmVhbFN0ZXBzID0gTWF0aC5yb3VuZChzdGVwcyk7XHJcblxyXG5cdFx0XHRcdC8vIFRoaXMgcmF0aW8gcmVwcmVzZW50cyB0aGUgYW1vdW50IG9mIHBlcmNlbnRhZ2Utc3BhY2UgYSBwb2ludCBpbmRpY2F0ZXMuXHJcblx0XHRcdFx0Ly8gRm9yIGEgZGVuc2l0eSAxIHRoZSBwb2ludHMvcGVyY2VudGFnZSA9IDEuIEZvciBkZW5zaXR5IDIsIHRoYXQgcGVyY2VudGFnZSBuZWVkcyB0byBiZSByZS1kZXZpZGVkLlxyXG5cdFx0XHRcdC8vIFJvdW5kIHRoZSBwZXJjZW50YWdlIG9mZnNldCB0byBhbiBldmVuIG51bWJlciwgdGhlbiBkaXZpZGUgYnkgdHdvXHJcblx0XHRcdFx0Ly8gdG8gc3ByZWFkIHRoZSBvZmZzZXQgb24gYm90aCBzaWRlcyBvZiB0aGUgcmFuZ2UuXHJcblx0XHRcdFx0c3RlcHNpemUgPSBwY3REaWZmZXJlbmNlL3JlYWxTdGVwcztcclxuXHJcblx0XHRcdFx0Ly8gRGl2aWRlIGFsbCBwb2ludHMgZXZlbmx5LCBhZGRpbmcgdGhlIGNvcnJlY3QgbnVtYmVyIHRvIHRoaXMgc3VicmFuZ2UuXHJcblx0XHRcdFx0Ly8gUnVuIHVwIHRvIDw9IHNvIHRoYXQgMTAwJSBnZXRzIGEgcG9pbnQsIGV2ZW50IGlmIGlnbm9yZUxhc3QgaXMgc2V0LlxyXG5cdFx0XHRcdGZvciAoIHEgPSAxOyBxIDw9IHJlYWxTdGVwczsgcSArPSAxICkge1xyXG5cclxuXHRcdFx0XHRcdC8vIFRoZSByYXRpbyBiZXR3ZWVuIHRoZSByb3VuZGVkIHZhbHVlIGFuZCB0aGUgYWN0dWFsIHNpemUgbWlnaHQgYmUgfjElIG9mZi5cclxuXHRcdFx0XHRcdC8vIENvcnJlY3QgdGhlIHBlcmNlbnRhZ2Ugb2Zmc2V0IGJ5IHRoZSBudW1iZXIgb2YgcG9pbnRzXHJcblx0XHRcdFx0XHQvLyBwZXIgc3VicmFuZ2UuIGRlbnNpdHkgPSAxIHdpbGwgcmVzdWx0IGluIDEwMCBwb2ludHMgb24gdGhlXHJcblx0XHRcdFx0XHQvLyBmdWxsIHJhbmdlLCAyIGZvciA1MCwgNCBmb3IgMjUsIGV0Yy5cclxuXHRcdFx0XHRcdHBjdFBvcyA9IHByZXZQY3QgKyAoIHEgKiBzdGVwc2l6ZSApO1xyXG5cdFx0XHRcdFx0aW5kZXhlc1twY3RQb3MudG9GaXhlZCg1KV0gPSBbJ3gnLCAwXTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIERldGVybWluZSB0aGUgcG9pbnQgdHlwZS5cclxuXHRcdFx0XHR0eXBlID0gKGdyb3VwLmluZGV4T2YoaSkgPiAtMSkgPyAxIDogKCBtb2RlID09PSAnc3RlcHMnID8gMiA6IDAgKTtcclxuXHJcblx0XHRcdFx0Ly8gRW5mb3JjZSB0aGUgJ2lnbm9yZUZpcnN0JyBvcHRpb24gYnkgb3ZlcndyaXRpbmcgdGhlIHR5cGUgZm9yIDAuXHJcblx0XHRcdFx0aWYgKCAhaW5kZXggJiYgaWdub3JlRmlyc3QgKSB7XHJcblx0XHRcdFx0XHR0eXBlID0gMDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmICggIShpID09PSBoaWdoICYmIGlnbm9yZUxhc3QpKSB7XHJcblx0XHRcdFx0XHQvLyBNYXJrIHRoZSAndHlwZScgb2YgdGhpcyBwb2ludC4gMCA9IHBsYWluLCAxID0gcmVhbCB2YWx1ZSwgMiA9IHN0ZXAgdmFsdWUuXHJcblx0XHRcdFx0XHRpbmRleGVzW25ld1BjdC50b0ZpeGVkKDUpXSA9IFtpLCB0eXBlXTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIFVwZGF0ZSB0aGUgcGVyY2VudGFnZSBjb3VudC5cclxuXHRcdFx0XHRwcmV2UGN0ID0gbmV3UGN0O1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gaW5kZXhlcztcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGFkZE1hcmtpbmcgKCBzcHJlYWQsIGZpbHRlckZ1bmMsIGZvcm1hdHRlciApIHtcclxuXHJcblx0XHR2YXIgZWxlbWVudCA9IHNjb3BlX0RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuXHRcdHZhciB2YWx1ZVNpemVDbGFzc2VzID0gW1xyXG5cdFx0XHRvcHRpb25zLmNzc0NsYXNzZXMudmFsdWVOb3JtYWwsXHJcblx0XHRcdG9wdGlvbnMuY3NzQ2xhc3Nlcy52YWx1ZUxhcmdlLFxyXG5cdFx0XHRvcHRpb25zLmNzc0NsYXNzZXMudmFsdWVTdWJcclxuXHRcdF07XHJcblx0XHR2YXIgbWFya2VyU2l6ZUNsYXNzZXMgPSBbXHJcblx0XHRcdG9wdGlvbnMuY3NzQ2xhc3Nlcy5tYXJrZXJOb3JtYWwsXHJcblx0XHRcdG9wdGlvbnMuY3NzQ2xhc3Nlcy5tYXJrZXJMYXJnZSxcclxuXHRcdFx0b3B0aW9ucy5jc3NDbGFzc2VzLm1hcmtlclN1YlxyXG5cdFx0XTtcclxuXHRcdHZhciB2YWx1ZU9yaWVudGF0aW9uQ2xhc3NlcyA9IFtcclxuXHRcdFx0b3B0aW9ucy5jc3NDbGFzc2VzLnZhbHVlSG9yaXpvbnRhbCxcclxuXHRcdFx0b3B0aW9ucy5jc3NDbGFzc2VzLnZhbHVlVmVydGljYWxcclxuXHRcdF07XHJcblx0XHR2YXIgbWFya2VyT3JpZW50YXRpb25DbGFzc2VzID0gW1xyXG5cdFx0XHRvcHRpb25zLmNzc0NsYXNzZXMubWFya2VySG9yaXpvbnRhbCxcclxuXHRcdFx0b3B0aW9ucy5jc3NDbGFzc2VzLm1hcmtlclZlcnRpY2FsXHJcblx0XHRdO1xyXG5cclxuXHRcdGFkZENsYXNzKGVsZW1lbnQsIG9wdGlvbnMuY3NzQ2xhc3Nlcy5waXBzKTtcclxuXHRcdGFkZENsYXNzKGVsZW1lbnQsIG9wdGlvbnMub3J0ID09PSAwID8gb3B0aW9ucy5jc3NDbGFzc2VzLnBpcHNIb3Jpem9udGFsIDogb3B0aW9ucy5jc3NDbGFzc2VzLnBpcHNWZXJ0aWNhbCk7XHJcblxyXG5cdFx0ZnVuY3Rpb24gZ2V0Q2xhc3NlcyggdHlwZSwgc291cmNlICl7XHJcblx0XHRcdHZhciBhID0gc291cmNlID09PSBvcHRpb25zLmNzc0NsYXNzZXMudmFsdWU7XHJcblx0XHRcdHZhciBvcmllbnRhdGlvbkNsYXNzZXMgPSBhID8gdmFsdWVPcmllbnRhdGlvbkNsYXNzZXMgOiBtYXJrZXJPcmllbnRhdGlvbkNsYXNzZXM7XHJcblx0XHRcdHZhciBzaXplQ2xhc3NlcyA9IGEgPyB2YWx1ZVNpemVDbGFzc2VzIDogbWFya2VyU2l6ZUNsYXNzZXM7XHJcblxyXG5cdFx0XHRyZXR1cm4gc291cmNlICsgJyAnICsgb3JpZW50YXRpb25DbGFzc2VzW29wdGlvbnMub3J0XSArICcgJyArIHNpemVDbGFzc2VzW3R5cGVdO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGFkZFNwcmVhZCAoIG9mZnNldCwgdmFsdWVzICl7XHJcblxyXG5cdFx0XHQvLyBBcHBseSB0aGUgZmlsdGVyIGZ1bmN0aW9uLCBpZiBpdCBpcyBzZXQuXHJcblx0XHRcdHZhbHVlc1sxXSA9ICh2YWx1ZXNbMV0gJiYgZmlsdGVyRnVuYykgPyBmaWx0ZXJGdW5jKHZhbHVlc1swXSwgdmFsdWVzWzFdKSA6IHZhbHVlc1sxXTtcclxuXHJcblx0XHRcdC8vIEFkZCBhIG1hcmtlciBmb3IgZXZlcnkgcG9pbnRcclxuXHRcdFx0dmFyIG5vZGUgPSBhZGROb2RlVG8oZWxlbWVudCwgZmFsc2UpO1xyXG5cdFx0XHRcdG5vZGUuY2xhc3NOYW1lID0gZ2V0Q2xhc3Nlcyh2YWx1ZXNbMV0sIG9wdGlvbnMuY3NzQ2xhc3Nlcy5tYXJrZXIpO1xyXG5cdFx0XHRcdG5vZGUuc3R5bGVbb3B0aW9ucy5zdHlsZV0gPSBvZmZzZXQgKyAnJSc7XHJcblxyXG5cdFx0XHQvLyBWYWx1ZXMgYXJlIG9ubHkgYXBwZW5kZWQgZm9yIHBvaW50cyBtYXJrZWQgJzEnIG9yICcyJy5cclxuXHRcdFx0aWYgKCB2YWx1ZXNbMV0gKSB7XHJcblx0XHRcdFx0bm9kZSA9IGFkZE5vZGVUbyhlbGVtZW50LCBmYWxzZSk7XHJcblx0XHRcdFx0bm9kZS5jbGFzc05hbWUgPSBnZXRDbGFzc2VzKHZhbHVlc1sxXSwgb3B0aW9ucy5jc3NDbGFzc2VzLnZhbHVlKTtcclxuXHRcdFx0XHRub2RlLnNldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScsIHZhbHVlc1swXSk7XHJcblx0XHRcdFx0bm9kZS5zdHlsZVtvcHRpb25zLnN0eWxlXSA9IG9mZnNldCArICclJztcclxuXHRcdFx0XHRub2RlLmlubmVyVGV4dCA9IGZvcm1hdHRlci50byh2YWx1ZXNbMF0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQXBwZW5kIGFsbCBwb2ludHMuXHJcblx0XHRPYmplY3Qua2V5cyhzcHJlYWQpLmZvckVhY2goZnVuY3Rpb24oYSl7XHJcblx0XHRcdGFkZFNwcmVhZChhLCBzcHJlYWRbYV0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiByZW1vdmVQaXBzICggKSB7XHJcblx0XHRpZiAoIHNjb3BlX1BpcHMgKSB7XHJcblx0XHRcdHJlbW92ZUVsZW1lbnQoc2NvcGVfUGlwcyk7XHJcblx0XHRcdHNjb3BlX1BpcHMgPSBudWxsO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gcGlwcyAoIGdyaWQgKSB7XHJcblxyXG5cdFx0Ly8gRml4ICM2NjlcclxuXHRcdHJlbW92ZVBpcHMoKTtcclxuXHJcblx0XHR2YXIgbW9kZSA9IGdyaWQubW9kZTtcclxuXHRcdHZhciBkZW5zaXR5ID0gZ3JpZC5kZW5zaXR5IHx8IDE7XHJcblx0XHR2YXIgZmlsdGVyID0gZ3JpZC5maWx0ZXIgfHwgZmFsc2U7XHJcblx0XHR2YXIgdmFsdWVzID0gZ3JpZC52YWx1ZXMgfHwgZmFsc2U7XHJcblx0XHR2YXIgc3RlcHBlZCA9IGdyaWQuc3RlcHBlZCB8fCBmYWxzZTtcclxuXHRcdHZhciBncm91cCA9IGdldEdyb3VwKCBtb2RlLCB2YWx1ZXMsIHN0ZXBwZWQgKTtcclxuXHRcdHZhciBzcHJlYWQgPSBnZW5lcmF0ZVNwcmVhZCggZGVuc2l0eSwgbW9kZSwgZ3JvdXAgKTtcclxuXHRcdHZhciBmb3JtYXQgPSBncmlkLmZvcm1hdCB8fCB7XHJcblx0XHRcdHRvOiBNYXRoLnJvdW5kXHJcblx0XHR9O1xyXG5cclxuXHRcdHNjb3BlX1BpcHMgPSBzY29wZV9UYXJnZXQuYXBwZW5kQ2hpbGQoYWRkTWFya2luZyhcclxuXHRcdFx0c3ByZWFkLFxyXG5cdFx0XHRmaWx0ZXIsXHJcblx0XHRcdGZvcm1hdFxyXG5cdFx0KSk7XHJcblxyXG5cdFx0cmV0dXJuIHNjb3BlX1BpcHM7XHJcblx0fVxyXG5cclxuLyohIEluIHRoaXMgZmlsZTogQnJvd3NlciBldmVudHMgKG5vdCBzbGlkZXIgZXZlbnRzIGxpa2Ugc2xpZGUsIGNoYW5nZSk7ICovXHJcblxyXG5cdC8vIFNob3J0aGFuZCBmb3IgYmFzZSBkaW1lbnNpb25zLlxyXG5cdGZ1bmN0aW9uIGJhc2VTaXplICggKSB7XHJcblx0XHR2YXIgcmVjdCA9IHNjb3BlX0Jhc2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0XHR2YXIgYWx0ID0gJ29mZnNldCcgKyBbJ1dpZHRoJywgJ0hlaWdodCddW29wdGlvbnMub3J0XTtcclxuXHRcdHJldHVybiBvcHRpb25zLm9ydCA9PT0gMCA/IChyZWN0LndpZHRofHxzY29wZV9CYXNlW2FsdF0pIDogKHJlY3QuaGVpZ2h0fHxzY29wZV9CYXNlW2FsdF0pO1xyXG5cdH1cclxuXHJcblx0Ly8gSGFuZGxlciBmb3IgYXR0YWNoaW5nIGV2ZW50cyB0cm91Z2ggYSBwcm94eS5cclxuXHRmdW5jdGlvbiBhdHRhY2hFdmVudCAoIGV2ZW50cywgZWxlbWVudCwgY2FsbGJhY2ssIGRhdGEgKSB7XHJcblxyXG5cdFx0Ly8gVGhpcyBmdW5jdGlvbiBjYW4gYmUgdXNlZCB0byAnZmlsdGVyJyBldmVudHMgdG8gdGhlIHNsaWRlci5cclxuXHRcdC8vIGVsZW1lbnQgaXMgYSBub2RlLCBub3QgYSBub2RlTGlzdFxyXG5cclxuXHRcdHZhciBtZXRob2QgPSBmdW5jdGlvbiAoIGUgKXtcclxuXHJcblx0XHRcdGUgPSBmaXhFdmVudChlLCBkYXRhLnBhZ2VPZmZzZXQsIGRhdGEudGFyZ2V0IHx8IGVsZW1lbnQpO1xyXG5cclxuXHRcdFx0Ly8gZml4RXZlbnQgcmV0dXJucyBmYWxzZSBpZiB0aGlzIGV2ZW50IGhhcyBhIGRpZmZlcmVudCB0YXJnZXRcclxuXHRcdFx0Ly8gd2hlbiBoYW5kbGluZyAobXVsdGktKSB0b3VjaCBldmVudHM7XHJcblx0XHRcdGlmICggIWUgKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBkb05vdFJlamVjdCBpcyBwYXNzZWQgYnkgYWxsIGVuZCBldmVudHMgdG8gbWFrZSBzdXJlIHJlbGVhc2VkIHRvdWNoZXNcclxuXHRcdFx0Ly8gYXJlIG5vdCByZWplY3RlZCwgbGVhdmluZyB0aGUgc2xpZGVyIFwic3R1Y2tcIiB0byB0aGUgY3Vyc29yO1xyXG5cdFx0XHRpZiAoIHNjb3BlX1RhcmdldC5oYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJykgJiYgIWRhdGEuZG9Ob3RSZWplY3QgKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBTdG9wIGlmIGFuIGFjdGl2ZSAndGFwJyB0cmFuc2l0aW9uIGlzIHRha2luZyBwbGFjZS5cclxuXHRcdFx0aWYgKCBoYXNDbGFzcyhzY29wZV9UYXJnZXQsIG9wdGlvbnMuY3NzQ2xhc3Nlcy50YXApICYmICFkYXRhLmRvTm90UmVqZWN0ICkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gSWdub3JlIHJpZ2h0IG9yIG1pZGRsZSBjbGlja3Mgb24gc3RhcnQgIzQ1NFxyXG5cdFx0XHRpZiAoIGV2ZW50cyA9PT0gYWN0aW9ucy5zdGFydCAmJiBlLmJ1dHRvbnMgIT09IHVuZGVmaW5lZCAmJiBlLmJ1dHRvbnMgPiAxICkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gSWdub3JlIHJpZ2h0IG9yIG1pZGRsZSBjbGlja3Mgb24gc3RhcnQgIzQ1NFxyXG5cdFx0XHRpZiAoIGRhdGEuaG92ZXIgJiYgZS5idXR0b25zICkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gJ3N1cHBvcnRzUGFzc2l2ZScgaXMgb25seSB0cnVlIGlmIGEgYnJvd3NlciBhbHNvIHN1cHBvcnRzIHRvdWNoLWFjdGlvbjogbm9uZSBpbiBDU1MuXHJcblx0XHRcdC8vIGlPUyBzYWZhcmkgZG9lcyBub3QsIHNvIGl0IGRvZXNuJ3QgZ2V0IHRvIGJlbmVmaXQgZnJvbSBwYXNzaXZlIHNjcm9sbGluZy4gaU9TIGRvZXMgc3VwcG9ydFxyXG5cdFx0XHQvLyB0b3VjaC1hY3Rpb246IG1hbmlwdWxhdGlvbiwgYnV0IHRoYXQgYWxsb3dzIHBhbm5pbmcsIHdoaWNoIGJyZWFrc1xyXG5cdFx0XHQvLyBzbGlkZXJzIGFmdGVyIHpvb21pbmcvb24gbm9uLXJlc3BvbnNpdmUgcGFnZXMuXHJcblx0XHRcdC8vIFNlZTogaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTEzMzExMlxyXG5cdFx0XHRpZiAoICFzdXBwb3J0c1Bhc3NpdmUgKSB7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRlLmNhbGNQb2ludCA9IGUucG9pbnRzWyBvcHRpb25zLm9ydCBdO1xyXG5cclxuXHRcdFx0Ly8gQ2FsbCB0aGUgZXZlbnQgaGFuZGxlciB3aXRoIHRoZSBldmVudCBbIGFuZCBhZGRpdGlvbmFsIGRhdGEgXS5cclxuXHRcdFx0Y2FsbGJhY2sgKCBlLCBkYXRhICk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHZhciBtZXRob2RzID0gW107XHJcblxyXG5cdFx0Ly8gQmluZCBhIGNsb3N1cmUgb24gdGhlIHRhcmdldCBmb3IgZXZlcnkgZXZlbnQgdHlwZS5cclxuXHRcdGV2ZW50cy5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24oIGV2ZW50TmFtZSApe1xyXG5cdFx0XHRlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBtZXRob2QsIHN1cHBvcnRzUGFzc2l2ZSA/IHsgcGFzc2l2ZTogdHJ1ZSB9IDogZmFsc2UpO1xyXG5cdFx0XHRtZXRob2RzLnB1c2goW2V2ZW50TmFtZSwgbWV0aG9kXSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gbWV0aG9kcztcclxuXHR9XHJcblxyXG5cdC8vIFByb3ZpZGUgYSBjbGVhbiBldmVudCB3aXRoIHN0YW5kYXJkaXplZCBvZmZzZXQgdmFsdWVzLlxyXG5cdGZ1bmN0aW9uIGZpeEV2ZW50ICggZSwgcGFnZU9mZnNldCwgZXZlbnRUYXJnZXQgKSB7XHJcblxyXG5cdFx0Ly8gRmlsdGVyIHRoZSBldmVudCB0byByZWdpc3RlciB0aGUgdHlwZSwgd2hpY2ggY2FuIGJlXHJcblx0XHQvLyB0b3VjaCwgbW91c2Ugb3IgcG9pbnRlci4gT2Zmc2V0IGNoYW5nZXMgbmVlZCB0byBiZVxyXG5cdFx0Ly8gbWFkZSBvbiBhbiBldmVudCBzcGVjaWZpYyBiYXNpcy5cclxuXHRcdHZhciB0b3VjaCA9IGUudHlwZS5pbmRleE9mKCd0b3VjaCcpID09PSAwO1xyXG5cdFx0dmFyIG1vdXNlID0gZS50eXBlLmluZGV4T2YoJ21vdXNlJykgPT09IDA7XHJcblx0XHR2YXIgcG9pbnRlciA9IGUudHlwZS5pbmRleE9mKCdwb2ludGVyJykgPT09IDA7XHJcblxyXG5cdFx0dmFyIHg7XHJcblx0XHR2YXIgeTtcclxuXHJcblx0XHQvLyBJRTEwIGltcGxlbWVudGVkIHBvaW50ZXIgZXZlbnRzIHdpdGggYSBwcmVmaXg7XHJcblx0XHRpZiAoIGUudHlwZS5pbmRleE9mKCdNU1BvaW50ZXInKSA9PT0gMCApIHtcclxuXHRcdFx0cG9pbnRlciA9IHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gSW4gdGhlIGV2ZW50IHRoYXQgbXVsdGl0b3VjaCBpcyBhY3RpdmF0ZWQsIHRoZSBvbmx5IHRoaW5nIG9uZSBoYW5kbGUgc2hvdWxkIGJlIGNvbmNlcm5lZFxyXG5cdFx0Ly8gYWJvdXQgaXMgdGhlIHRvdWNoZXMgdGhhdCBvcmlnaW5hdGVkIG9uIHRvcCBvZiBpdC5cclxuXHRcdGlmICggdG91Y2ggKSB7XHJcblxyXG5cdFx0XHQvLyBSZXR1cm5zIHRydWUgaWYgYSB0b3VjaCBvcmlnaW5hdGVkIG9uIHRoZSB0YXJnZXQuXHJcblx0XHRcdHZhciBpc1RvdWNoT25UYXJnZXQgPSBmdW5jdGlvbiAoY2hlY2tUb3VjaCkge1xyXG5cdFx0XHRcdHJldHVybiBjaGVja1RvdWNoLnRhcmdldCA9PT0gZXZlbnRUYXJnZXQgfHwgZXZlbnRUYXJnZXQuY29udGFpbnMoY2hlY2tUb3VjaC50YXJnZXQpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0Ly8gSW4gdGhlIGNhc2Ugb2YgdG91Y2hzdGFydCBldmVudHMsIHdlIG5lZWQgdG8gbWFrZSBzdXJlIHRoZXJlIGlzIHN0aWxsIG5vIG1vcmUgdGhhbiBvbmVcclxuXHRcdFx0Ly8gdG91Y2ggb24gdGhlIHRhcmdldCBzbyB3ZSBsb29rIGFtb25nc3QgYWxsIHRvdWNoZXMuXHJcblx0XHRcdGlmIChlLnR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xyXG5cclxuXHRcdFx0XHR2YXIgdGFyZ2V0VG91Y2hlcyA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbChlLnRvdWNoZXMsIGlzVG91Y2hPblRhcmdldCk7XHJcblxyXG5cdFx0XHRcdC8vIERvIG5vdCBzdXBwb3J0IG1vcmUgdGhhbiBvbmUgdG91Y2ggcGVyIGhhbmRsZS5cclxuXHRcdFx0XHRpZiAoIHRhcmdldFRvdWNoZXMubGVuZ3RoID4gMSApIHtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHggPSB0YXJnZXRUb3VjaGVzWzBdLnBhZ2VYO1xyXG5cdFx0XHRcdHkgPSB0YXJnZXRUb3VjaGVzWzBdLnBhZ2VZO1xyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0Ly8gSW4gdGhlIG90aGVyIGNhc2VzLCBmaW5kIG9uIGNoYW5nZWRUb3VjaGVzIGlzIGVub3VnaC5cclxuXHRcdFx0XHR2YXIgdGFyZ2V0VG91Y2ggPSBBcnJheS5wcm90b3R5cGUuZmluZC5jYWxsKGUuY2hhbmdlZFRvdWNoZXMsIGlzVG91Y2hPblRhcmdldCk7XHJcblxyXG5cdFx0XHRcdC8vIENhbmNlbCBpZiB0aGUgdGFyZ2V0IHRvdWNoIGhhcyBub3QgbW92ZWQuXHJcblx0XHRcdFx0aWYgKCAhdGFyZ2V0VG91Y2ggKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR4ID0gdGFyZ2V0VG91Y2gucGFnZVg7XHJcblx0XHRcdFx0eSA9IHRhcmdldFRvdWNoLnBhZ2VZO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cGFnZU9mZnNldCA9IHBhZ2VPZmZzZXQgfHwgZ2V0UGFnZU9mZnNldChzY29wZV9Eb2N1bWVudCk7XHJcblxyXG5cdFx0aWYgKCBtb3VzZSB8fCBwb2ludGVyICkge1xyXG5cdFx0XHR4ID0gZS5jbGllbnRYICsgcGFnZU9mZnNldC54O1xyXG5cdFx0XHR5ID0gZS5jbGllbnRZICsgcGFnZU9mZnNldC55O1xyXG5cdFx0fVxyXG5cclxuXHRcdGUucGFnZU9mZnNldCA9IHBhZ2VPZmZzZXQ7XHJcblx0XHRlLnBvaW50cyA9IFt4LCB5XTtcclxuXHRcdGUuY3Vyc29yID0gbW91c2UgfHwgcG9pbnRlcjsgLy8gRml4ICM0MzVcclxuXHJcblx0XHRyZXR1cm4gZTtcclxuXHR9XHJcblxyXG5cdC8vIFRyYW5zbGF0ZSBhIGNvb3JkaW5hdGUgaW4gdGhlIGRvY3VtZW50IHRvIGEgcGVyY2VudGFnZSBvbiB0aGUgc2xpZGVyXHJcblx0ZnVuY3Rpb24gY2FsY1BvaW50VG9QZXJjZW50YWdlICggY2FsY1BvaW50ICkge1xyXG5cdFx0dmFyIGxvY2F0aW9uID0gY2FsY1BvaW50IC0gb2Zmc2V0KHNjb3BlX0Jhc2UsIG9wdGlvbnMub3J0KTtcclxuXHRcdHZhciBwcm9wb3NhbCA9ICggbG9jYXRpb24gKiAxMDAgKSAvIGJhc2VTaXplKCk7XHJcblxyXG5cdFx0Ly8gQ2xhbXAgcHJvcG9zYWwgYmV0d2VlbiAwJSBhbmQgMTAwJVxyXG5cdFx0Ly8gT3V0LW9mLWJvdW5kIGNvb3JkaW5hdGVzIG1heSBvY2N1ciB3aGVuIC5ub1VpLWJhc2UgcHNldWRvLWVsZW1lbnRzXHJcblx0XHQvLyBhcmUgdXNlZCAoZS5nLiBjb250YWluZWQgaGFuZGxlcyBmZWF0dXJlKVxyXG5cdFx0cHJvcG9zYWwgPSBsaW1pdChwcm9wb3NhbCk7XHJcblxyXG5cdFx0cmV0dXJuIG9wdGlvbnMuZGlyID8gMTAwIC0gcHJvcG9zYWwgOiBwcm9wb3NhbDtcclxuXHR9XHJcblxyXG5cdC8vIEZpbmQgaGFuZGxlIGNsb3Nlc3QgdG8gYSBjZXJ0YWluIHBlcmNlbnRhZ2Ugb24gdGhlIHNsaWRlclxyXG5cdGZ1bmN0aW9uIGdldENsb3Nlc3RIYW5kbGUgKCBwcm9wb3NhbCApIHtcclxuXHJcblx0XHR2YXIgY2xvc2VzdCA9IDEwMDtcclxuXHRcdHZhciBoYW5kbGVOdW1iZXIgPSBmYWxzZTtcclxuXHJcblx0XHRzY29wZV9IYW5kbGVzLmZvckVhY2goZnVuY3Rpb24oaGFuZGxlLCBpbmRleCl7XHJcblxyXG5cdFx0XHQvLyBEaXNhYmxlZCBoYW5kbGVzIGFyZSBpZ25vcmVkXHJcblx0XHRcdGlmICggaGFuZGxlLmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKSApIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBwb3MgPSBNYXRoLmFicyhzY29wZV9Mb2NhdGlvbnNbaW5kZXhdIC0gcHJvcG9zYWwpO1xyXG5cclxuXHRcdFx0aWYgKCBwb3MgPCBjbG9zZXN0IHx8IChwb3MgPT09IDEwMCAmJiBjbG9zZXN0ID09PSAxMDApICkge1xyXG5cdFx0XHRcdGhhbmRsZU51bWJlciA9IGluZGV4O1xyXG5cdFx0XHRcdGNsb3Nlc3QgPSBwb3M7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBoYW5kbGVOdW1iZXI7XHJcblx0fVxyXG5cclxuXHQvLyBGaXJlICdlbmQnIHdoZW4gYSBtb3VzZSBvciBwZW4gbGVhdmVzIHRoZSBkb2N1bWVudC5cclxuXHRmdW5jdGlvbiBkb2N1bWVudExlYXZlICggZXZlbnQsIGRhdGEgKSB7XHJcblx0XHRpZiAoIGV2ZW50LnR5cGUgPT09IFwibW91c2VvdXRcIiAmJiBldmVudC50YXJnZXQubm9kZU5hbWUgPT09IFwiSFRNTFwiICYmIGV2ZW50LnJlbGF0ZWRUYXJnZXQgPT09IG51bGwgKXtcclxuXHRcdFx0ZXZlbnRFbmQgKGV2ZW50LCBkYXRhKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIEhhbmRsZSBtb3ZlbWVudCBvbiBkb2N1bWVudCBmb3IgaGFuZGxlIGFuZCByYW5nZSBkcmFnLlxyXG5cdGZ1bmN0aW9uIGV2ZW50TW92ZSAoIGV2ZW50LCBkYXRhICkge1xyXG5cclxuXHRcdC8vIEZpeCAjNDk4XHJcblx0XHQvLyBDaGVjayB2YWx1ZSBvZiAuYnV0dG9ucyBpbiAnc3RhcnQnIHRvIHdvcmsgYXJvdW5kIGEgYnVnIGluIElFMTAgbW9iaWxlIChkYXRhLmJ1dHRvbnNQcm9wZXJ0eSkuXHJcblx0XHQvLyBodHRwczovL2Nvbm5lY3QubWljcm9zb2Z0LmNvbS9JRS9mZWVkYmFjay9kZXRhaWxzLzkyNzAwNS9tb2JpbGUtaWUxMC13aW5kb3dzLXBob25lLWJ1dHRvbnMtcHJvcGVydHktb2YtcG9pbnRlcm1vdmUtZXZlbnQtYWx3YXlzLXplcm9cclxuXHRcdC8vIElFOSBoYXMgLmJ1dHRvbnMgYW5kIC53aGljaCB6ZXJvIG9uIG1vdXNlbW92ZS5cclxuXHRcdC8vIEZpcmVmb3ggYnJlYWtzIHRoZSBzcGVjIE1ETiBkZWZpbmVzLlxyXG5cdFx0aWYgKCBuYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmRleE9mKFwiTVNJRSA5XCIpID09PSAtMSAmJiBldmVudC5idXR0b25zID09PSAwICYmIGRhdGEuYnV0dG9uc1Byb3BlcnR5ICE9PSAwICkge1xyXG5cdFx0XHRyZXR1cm4gZXZlbnRFbmQoZXZlbnQsIGRhdGEpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENoZWNrIGlmIHdlIGFyZSBtb3ZpbmcgdXAgb3IgZG93blxyXG5cdFx0dmFyIG1vdmVtZW50ID0gKG9wdGlvbnMuZGlyID8gLTEgOiAxKSAqIChldmVudC5jYWxjUG9pbnQgLSBkYXRhLnN0YXJ0Q2FsY1BvaW50KTtcclxuXHJcblx0XHQvLyBDb252ZXJ0IHRoZSBtb3ZlbWVudCBpbnRvIGEgcGVyY2VudGFnZSBvZiB0aGUgc2xpZGVyIHdpZHRoL2hlaWdodFxyXG5cdFx0dmFyIHByb3Bvc2FsID0gKG1vdmVtZW50ICogMTAwKSAvIGRhdGEuYmFzZVNpemU7XHJcblxyXG5cdFx0bW92ZUhhbmRsZXMobW92ZW1lbnQgPiAwLCBwcm9wb3NhbCwgZGF0YS5sb2NhdGlvbnMsIGRhdGEuaGFuZGxlTnVtYmVycyk7XHJcblx0fVxyXG5cclxuXHQvLyBVbmJpbmQgbW92ZSBldmVudHMgb24gZG9jdW1lbnQsIGNhbGwgY2FsbGJhY2tzLlxyXG5cdGZ1bmN0aW9uIGV2ZW50RW5kICggZXZlbnQsIGRhdGEgKSB7XHJcblxyXG5cdFx0Ly8gVGhlIGhhbmRsZSBpcyBubyBsb25nZXIgYWN0aXZlLCBzbyByZW1vdmUgdGhlIGNsYXNzLlxyXG5cdFx0aWYgKCBkYXRhLmhhbmRsZSApIHtcclxuXHRcdFx0cmVtb3ZlQ2xhc3MoZGF0YS5oYW5kbGUsIG9wdGlvbnMuY3NzQ2xhc3Nlcy5hY3RpdmUpO1xyXG5cdFx0XHRzY29wZV9BY3RpdmVIYW5kbGVzQ291bnQgLT0gMTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBVbmJpbmQgdGhlIG1vdmUgYW5kIGVuZCBldmVudHMsIHdoaWNoIGFyZSBhZGRlZCBvbiAnc3RhcnQnLlxyXG5cdFx0ZGF0YS5saXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiggYyApIHtcclxuXHRcdFx0c2NvcGVfRG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoY1swXSwgY1sxXSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAoIHNjb3BlX0FjdGl2ZUhhbmRsZXNDb3VudCA9PT0gMCApIHtcclxuXHRcdFx0Ly8gUmVtb3ZlIGRyYWdnaW5nIGNsYXNzLlxyXG5cdFx0XHRyZW1vdmVDbGFzcyhzY29wZV9UYXJnZXQsIG9wdGlvbnMuY3NzQ2xhc3Nlcy5kcmFnKTtcclxuXHRcdFx0c2V0WmluZGV4KCk7XHJcblxyXG5cdFx0XHQvLyBSZW1vdmUgY3Vyc29yIHN0eWxlcyBhbmQgdGV4dC1zZWxlY3Rpb24gZXZlbnRzIGJvdW5kIHRvIHRoZSBib2R5LlxyXG5cdFx0XHRpZiAoIGV2ZW50LmN1cnNvciApIHtcclxuXHRcdFx0XHRzY29wZV9Cb2R5LnN0eWxlLmN1cnNvciA9ICcnO1xyXG5cdFx0XHRcdHNjb3BlX0JvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2VsZWN0c3RhcnQnLCBwcmV2ZW50RGVmYXVsdCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRkYXRhLmhhbmRsZU51bWJlcnMuZm9yRWFjaChmdW5jdGlvbihoYW5kbGVOdW1iZXIpe1xyXG5cdFx0XHRmaXJlRXZlbnQoJ2NoYW5nZScsIGhhbmRsZU51bWJlcik7XHJcblx0XHRcdGZpcmVFdmVudCgnc2V0JywgaGFuZGxlTnVtYmVyKTtcclxuXHRcdFx0ZmlyZUV2ZW50KCdlbmQnLCBoYW5kbGVOdW1iZXIpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvLyBCaW5kIG1vdmUgZXZlbnRzIG9uIGRvY3VtZW50LlxyXG5cdGZ1bmN0aW9uIGV2ZW50U3RhcnQgKCBldmVudCwgZGF0YSApIHtcclxuXHJcblx0XHR2YXIgaGFuZGxlO1xyXG5cdFx0aWYgKCBkYXRhLmhhbmRsZU51bWJlcnMubGVuZ3RoID09PSAxICkge1xyXG5cclxuXHRcdFx0dmFyIGhhbmRsZU9yaWdpbiA9IHNjb3BlX0hhbmRsZXNbZGF0YS5oYW5kbGVOdW1iZXJzWzBdXTtcclxuXHJcblx0XHRcdC8vIElnbm9yZSAnZGlzYWJsZWQnIGhhbmRsZXNcclxuXHRcdFx0aWYgKCBoYW5kbGVPcmlnaW4uaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpICkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aGFuZGxlID0gaGFuZGxlT3JpZ2luLmNoaWxkcmVuWzBdO1xyXG5cdFx0XHRzY29wZV9BY3RpdmVIYW5kbGVzQ291bnQgKz0gMTtcclxuXHJcblx0XHRcdC8vIE1hcmsgdGhlIGhhbmRsZSBhcyAnYWN0aXZlJyBzbyBpdCBjYW4gYmUgc3R5bGVkLlxyXG5cdFx0XHRhZGRDbGFzcyhoYW5kbGUsIG9wdGlvbnMuY3NzQ2xhc3Nlcy5hY3RpdmUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEEgZHJhZyBzaG91bGQgbmV2ZXIgcHJvcGFnYXRlIHVwIHRvIHRoZSAndGFwJyBldmVudC5cclxuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHRcdC8vIFJlY29yZCB0aGUgZXZlbnQgbGlzdGVuZXJzLlxyXG5cdFx0dmFyIGxpc3RlbmVycyA9IFtdO1xyXG5cclxuXHRcdC8vIEF0dGFjaCB0aGUgbW92ZSBhbmQgZW5kIGV2ZW50cy5cclxuXHRcdHZhciBtb3ZlRXZlbnQgPSBhdHRhY2hFdmVudChhY3Rpb25zLm1vdmUsIHNjb3BlX0RvY3VtZW50RWxlbWVudCwgZXZlbnRNb3ZlLCB7XHJcblx0XHRcdC8vIFRoZSBldmVudCB0YXJnZXQgaGFzIGNoYW5nZWQgc28gd2UgbmVlZCB0byBwcm9wYWdhdGUgdGhlIG9yaWdpbmFsIG9uZSBzbyB0aGF0IHdlIGtlZXBcclxuXHRcdFx0Ly8gcmVseWluZyBvbiBpdCB0byBleHRyYWN0IHRhcmdldCB0b3VjaGVzLlxyXG5cdFx0XHR0YXJnZXQ6IGV2ZW50LnRhcmdldCxcclxuXHRcdFx0aGFuZGxlOiBoYW5kbGUsXHJcblx0XHRcdGxpc3RlbmVyczogbGlzdGVuZXJzLFxyXG5cdFx0XHRzdGFydENhbGNQb2ludDogZXZlbnQuY2FsY1BvaW50LFxyXG5cdFx0XHRiYXNlU2l6ZTogYmFzZVNpemUoKSxcclxuXHRcdFx0cGFnZU9mZnNldDogZXZlbnQucGFnZU9mZnNldCxcclxuXHRcdFx0aGFuZGxlTnVtYmVyczogZGF0YS5oYW5kbGVOdW1iZXJzLFxyXG5cdFx0XHRidXR0b25zUHJvcGVydHk6IGV2ZW50LmJ1dHRvbnMsXHJcblx0XHRcdGxvY2F0aW9uczogc2NvcGVfTG9jYXRpb25zLnNsaWNlKClcclxuXHRcdH0pO1xyXG5cclxuXHRcdHZhciBlbmRFdmVudCA9IGF0dGFjaEV2ZW50KGFjdGlvbnMuZW5kLCBzY29wZV9Eb2N1bWVudEVsZW1lbnQsIGV2ZW50RW5kLCB7XHJcblx0XHRcdHRhcmdldDogZXZlbnQudGFyZ2V0LFxyXG5cdFx0XHRoYW5kbGU6IGhhbmRsZSxcclxuXHRcdFx0bGlzdGVuZXJzOiBsaXN0ZW5lcnMsXHJcblx0XHRcdGRvTm90UmVqZWN0OiB0cnVlLFxyXG5cdFx0XHRoYW5kbGVOdW1iZXJzOiBkYXRhLmhhbmRsZU51bWJlcnNcclxuXHRcdH0pO1xyXG5cclxuXHRcdHZhciBvdXRFdmVudCA9IGF0dGFjaEV2ZW50KFwibW91c2VvdXRcIiwgc2NvcGVfRG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudExlYXZlLCB7XHJcblx0XHRcdHRhcmdldDogZXZlbnQudGFyZ2V0LFxyXG5cdFx0XHRoYW5kbGU6IGhhbmRsZSxcclxuXHRcdFx0bGlzdGVuZXJzOiBsaXN0ZW5lcnMsXHJcblx0XHRcdGRvTm90UmVqZWN0OiB0cnVlLFxyXG5cdFx0XHRoYW5kbGVOdW1iZXJzOiBkYXRhLmhhbmRsZU51bWJlcnNcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIFdlIHdhbnQgdG8gbWFrZSBzdXJlIHdlIHB1c2hlZCB0aGUgbGlzdGVuZXJzIGluIHRoZSBsaXN0ZW5lciBsaXN0IHJhdGhlciB0aGFuIGNyZWF0aW5nXHJcblx0XHQvLyBhIG5ldyBvbmUgYXMgaXQgaGFzIGFscmVhZHkgYmVlbiBwYXNzZWQgdG8gdGhlIGV2ZW50IGhhbmRsZXJzLlxyXG5cdFx0bGlzdGVuZXJzLnB1c2guYXBwbHkobGlzdGVuZXJzLCBtb3ZlRXZlbnQuY29uY2F0KGVuZEV2ZW50LCBvdXRFdmVudCkpO1xyXG5cclxuXHRcdC8vIFRleHQgc2VsZWN0aW9uIGlzbid0IGFuIGlzc3VlIG9uIHRvdWNoIGRldmljZXMsXHJcblx0XHQvLyBzbyBhZGRpbmcgY3Vyc29yIHN0eWxlcyBjYW4gYmUgc2tpcHBlZC5cclxuXHRcdGlmICggZXZlbnQuY3Vyc29yICkge1xyXG5cclxuXHRcdFx0Ly8gUHJldmVudCB0aGUgJ0knIGN1cnNvciBhbmQgZXh0ZW5kIHRoZSByYW5nZS1kcmFnIGN1cnNvci5cclxuXHRcdFx0c2NvcGVfQm9keS5zdHlsZS5jdXJzb3IgPSBnZXRDb21wdXRlZFN0eWxlKGV2ZW50LnRhcmdldCkuY3Vyc29yO1xyXG5cclxuXHRcdFx0Ly8gTWFyayB0aGUgdGFyZ2V0IHdpdGggYSBkcmFnZ2luZyBzdGF0ZS5cclxuXHRcdFx0aWYgKCBzY29wZV9IYW5kbGVzLmxlbmd0aCA+IDEgKSB7XHJcblx0XHRcdFx0YWRkQ2xhc3Moc2NvcGVfVGFyZ2V0LCBvcHRpb25zLmNzc0NsYXNzZXMuZHJhZyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFByZXZlbnQgdGV4dCBzZWxlY3Rpb24gd2hlbiBkcmFnZ2luZyB0aGUgaGFuZGxlcy5cclxuXHRcdFx0Ly8gSW4gbm9VaVNsaWRlciA8PSA5LjIuMCwgdGhpcyB3YXMgaGFuZGxlZCBieSBjYWxsaW5nIHByZXZlbnREZWZhdWx0IG9uIG1vdXNlL3RvdWNoIHN0YXJ0L21vdmUsXHJcblx0XHRcdC8vIHdoaWNoIGlzIHNjcm9sbCBibG9ja2luZy4gVGhlIHNlbGVjdHN0YXJ0IGV2ZW50IGlzIHN1cHBvcnRlZCBieSBGaXJlRm94IHN0YXJ0aW5nIGZyb20gdmVyc2lvbiA1MixcclxuXHRcdFx0Ly8gbWVhbmluZyB0aGUgb25seSBob2xkb3V0IGlzIGlPUyBTYWZhcmkuIFRoaXMgZG9lc24ndCBtYXR0ZXI6IHRleHQgc2VsZWN0aW9uIGlzbid0IHRyaWdnZXJlZCB0aGVyZS5cclxuXHRcdFx0Ly8gVGhlICdjdXJzb3InIGZsYWcgaXMgZmFsc2UuXHJcblx0XHRcdC8vIFNlZTogaHR0cDovL2Nhbml1c2UuY29tLyNzZWFyY2g9c2VsZWN0c3RhcnRcclxuXHRcdFx0c2NvcGVfQm9keS5hZGRFdmVudExpc3RlbmVyKCdzZWxlY3RzdGFydCcsIHByZXZlbnREZWZhdWx0LCBmYWxzZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZGF0YS5oYW5kbGVOdW1iZXJzLmZvckVhY2goZnVuY3Rpb24oaGFuZGxlTnVtYmVyKXtcclxuXHRcdFx0ZmlyZUV2ZW50KCdzdGFydCcsIGhhbmRsZU51bWJlcik7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8vIE1vdmUgY2xvc2VzdCBoYW5kbGUgdG8gdGFwcGVkIGxvY2F0aW9uLlxyXG5cdGZ1bmN0aW9uIGV2ZW50VGFwICggZXZlbnQgKSB7XHJcblxyXG5cdFx0Ly8gVGhlIHRhcCBldmVudCBzaG91bGRuJ3QgcHJvcGFnYXRlIHVwXHJcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblx0XHR2YXIgcHJvcG9zYWwgPSBjYWxjUG9pbnRUb1BlcmNlbnRhZ2UoZXZlbnQuY2FsY1BvaW50KTtcclxuXHRcdHZhciBoYW5kbGVOdW1iZXIgPSBnZXRDbG9zZXN0SGFuZGxlKHByb3Bvc2FsKTtcclxuXHJcblx0XHQvLyBUYWNrbGUgdGhlIGNhc2UgdGhhdCBhbGwgaGFuZGxlcyBhcmUgJ2Rpc2FibGVkJy5cclxuXHRcdGlmICggaGFuZGxlTnVtYmVyID09PSBmYWxzZSApIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEZsYWcgdGhlIHNsaWRlciBhcyBpdCBpcyBub3cgaW4gYSB0cmFuc2l0aW9uYWwgc3RhdGUuXHJcblx0XHQvLyBUcmFuc2l0aW9uIHRha2VzIGEgY29uZmlndXJhYmxlIGFtb3VudCBvZiBtcyAoZGVmYXVsdCAzMDApLiBSZS1lbmFibGUgdGhlIHNsaWRlciBhZnRlciB0aGF0LlxyXG5cdFx0aWYgKCAhb3B0aW9ucy5ldmVudHMuc25hcCApIHtcclxuXHRcdFx0YWRkQ2xhc3NGb3Ioc2NvcGVfVGFyZ2V0LCBvcHRpb25zLmNzc0NsYXNzZXMudGFwLCBvcHRpb25zLmFuaW1hdGlvbkR1cmF0aW9uKTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXRIYW5kbGUoaGFuZGxlTnVtYmVyLCBwcm9wb3NhbCwgdHJ1ZSwgdHJ1ZSk7XHJcblxyXG5cdFx0c2V0WmluZGV4KCk7XHJcblxyXG5cdFx0ZmlyZUV2ZW50KCdzbGlkZScsIGhhbmRsZU51bWJlciwgdHJ1ZSk7XHJcblx0XHRmaXJlRXZlbnQoJ3VwZGF0ZScsIGhhbmRsZU51bWJlciwgdHJ1ZSk7XHJcblx0XHRmaXJlRXZlbnQoJ2NoYW5nZScsIGhhbmRsZU51bWJlciwgdHJ1ZSk7XHJcblx0XHRmaXJlRXZlbnQoJ3NldCcsIGhhbmRsZU51bWJlciwgdHJ1ZSk7XHJcblxyXG5cdFx0aWYgKCBvcHRpb25zLmV2ZW50cy5zbmFwICkge1xyXG5cdFx0XHRldmVudFN0YXJ0KGV2ZW50LCB7IGhhbmRsZU51bWJlcnM6IFtoYW5kbGVOdW1iZXJdIH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gRmlyZXMgYSAnaG92ZXInIGV2ZW50IGZvciBhIGhvdmVyZWQgbW91c2UvcGVuIHBvc2l0aW9uLlxyXG5cdGZ1bmN0aW9uIGV2ZW50SG92ZXIgKCBldmVudCApIHtcclxuXHJcblx0XHR2YXIgcHJvcG9zYWwgPSBjYWxjUG9pbnRUb1BlcmNlbnRhZ2UoZXZlbnQuY2FsY1BvaW50KTtcclxuXHJcblx0XHR2YXIgdG8gPSBzY29wZV9TcGVjdHJ1bS5nZXRTdGVwKHByb3Bvc2FsKTtcclxuXHRcdHZhciB2YWx1ZSA9IHNjb3BlX1NwZWN0cnVtLmZyb21TdGVwcGluZyh0byk7XHJcblxyXG5cdFx0T2JqZWN0LmtleXMoc2NvcGVfRXZlbnRzKS5mb3JFYWNoKGZ1bmN0aW9uKCB0YXJnZXRFdmVudCApIHtcclxuXHRcdFx0aWYgKCAnaG92ZXInID09PSB0YXJnZXRFdmVudC5zcGxpdCgnLicpWzBdICkge1xyXG5cdFx0XHRcdHNjb3BlX0V2ZW50c1t0YXJnZXRFdmVudF0uZm9yRWFjaChmdW5jdGlvbiggY2FsbGJhY2sgKSB7XHJcblx0XHRcdFx0XHRjYWxsYmFjay5jYWxsKCBzY29wZV9TZWxmLCB2YWx1ZSApO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8vIEF0dGFjaCBldmVudHMgdG8gc2V2ZXJhbCBzbGlkZXIgcGFydHMuXHJcblx0ZnVuY3Rpb24gYmluZFNsaWRlckV2ZW50cyAoIGJlaGF2aW91ciApIHtcclxuXHJcblx0XHQvLyBBdHRhY2ggdGhlIHN0YW5kYXJkIGRyYWcgZXZlbnQgdG8gdGhlIGhhbmRsZXMuXHJcblx0XHRpZiAoICFiZWhhdmlvdXIuZml4ZWQgKSB7XHJcblxyXG5cdFx0XHRzY29wZV9IYW5kbGVzLmZvckVhY2goZnVuY3Rpb24oIGhhbmRsZSwgaW5kZXggKXtcclxuXHJcblx0XHRcdFx0Ly8gVGhlc2UgZXZlbnRzIGFyZSBvbmx5IGJvdW5kIHRvIHRoZSB2aXN1YWwgaGFuZGxlXHJcblx0XHRcdFx0Ly8gZWxlbWVudCwgbm90IHRoZSAncmVhbCcgb3JpZ2luIGVsZW1lbnQuXHJcblx0XHRcdFx0YXR0YWNoRXZlbnQgKCBhY3Rpb25zLnN0YXJ0LCBoYW5kbGUuY2hpbGRyZW5bMF0sIGV2ZW50U3RhcnQsIHtcclxuXHRcdFx0XHRcdGhhbmRsZU51bWJlcnM6IFtpbmRleF1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQXR0YWNoIHRoZSB0YXAgZXZlbnQgdG8gdGhlIHNsaWRlciBiYXNlLlxyXG5cdFx0aWYgKCBiZWhhdmlvdXIudGFwICkge1xyXG5cdFx0XHRhdHRhY2hFdmVudCAoYWN0aW9ucy5zdGFydCwgc2NvcGVfQmFzZSwgZXZlbnRUYXAsIHt9KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBGaXJlIGhvdmVyIGV2ZW50c1xyXG5cdFx0aWYgKCBiZWhhdmlvdXIuaG92ZXIgKSB7XHJcblx0XHRcdGF0dGFjaEV2ZW50IChhY3Rpb25zLm1vdmUsIHNjb3BlX0Jhc2UsIGV2ZW50SG92ZXIsIHsgaG92ZXI6IHRydWUgfSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gTWFrZSB0aGUgcmFuZ2UgZHJhZ2dhYmxlLlxyXG5cdFx0aWYgKCBiZWhhdmlvdXIuZHJhZyApe1xyXG5cclxuXHRcdFx0c2NvcGVfQ29ubmVjdHMuZm9yRWFjaChmdW5jdGlvbiggY29ubmVjdCwgaW5kZXggKXtcclxuXHJcblx0XHRcdFx0aWYgKCBjb25uZWN0ID09PSBmYWxzZSB8fCBpbmRleCA9PT0gMCB8fCBpbmRleCA9PT0gc2NvcGVfQ29ubmVjdHMubGVuZ3RoIC0gMSApIHtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHZhciBoYW5kbGVCZWZvcmUgPSBzY29wZV9IYW5kbGVzW2luZGV4IC0gMV07XHJcblx0XHRcdFx0dmFyIGhhbmRsZUFmdGVyID0gc2NvcGVfSGFuZGxlc1tpbmRleF07XHJcblx0XHRcdFx0dmFyIGV2ZW50SG9sZGVycyA9IFtjb25uZWN0XTtcclxuXHJcblx0XHRcdFx0YWRkQ2xhc3MoY29ubmVjdCwgb3B0aW9ucy5jc3NDbGFzc2VzLmRyYWdnYWJsZSk7XHJcblxyXG5cdFx0XHRcdC8vIFdoZW4gdGhlIHJhbmdlIGlzIGZpeGVkLCB0aGUgZW50aXJlIHJhbmdlIGNhblxyXG5cdFx0XHRcdC8vIGJlIGRyYWdnZWQgYnkgdGhlIGhhbmRsZXMuIFRoZSBoYW5kbGUgaW4gdGhlIGZpcnN0XHJcblx0XHRcdFx0Ly8gb3JpZ2luIHdpbGwgcHJvcGFnYXRlIHRoZSBzdGFydCBldmVudCB1cHdhcmQsXHJcblx0XHRcdFx0Ly8gYnV0IGl0IG5lZWRzIHRvIGJlIGJvdW5kIG1hbnVhbGx5IG9uIHRoZSBvdGhlci5cclxuXHRcdFx0XHRpZiAoIGJlaGF2aW91ci5maXhlZCApIHtcclxuXHRcdFx0XHRcdGV2ZW50SG9sZGVycy5wdXNoKGhhbmRsZUJlZm9yZS5jaGlsZHJlblswXSk7XHJcblx0XHRcdFx0XHRldmVudEhvbGRlcnMucHVzaChoYW5kbGVBZnRlci5jaGlsZHJlblswXSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRldmVudEhvbGRlcnMuZm9yRWFjaChmdW5jdGlvbiggZXZlbnRIb2xkZXIgKSB7XHJcblx0XHRcdFx0XHRhdHRhY2hFdmVudCAoIGFjdGlvbnMuc3RhcnQsIGV2ZW50SG9sZGVyLCBldmVudFN0YXJ0LCB7XHJcblx0XHRcdFx0XHRcdGhhbmRsZXM6IFtoYW5kbGVCZWZvcmUsIGhhbmRsZUFmdGVyXSxcclxuXHRcdFx0XHRcdFx0aGFuZGxlTnVtYmVyczogW2luZGV4IC0gMSwgaW5kZXhdXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuLyohIEluIHRoaXMgZmlsZTogU2xpZGVyIGV2ZW50cyAobm90IGJyb3dzZXIgZXZlbnRzKTsgKi9cclxuXHJcblx0Ly8gQXR0YWNoIGFuIGV2ZW50IHRvIHRoaXMgc2xpZGVyLCBwb3NzaWJseSBpbmNsdWRpbmcgYSBuYW1lc3BhY2VcclxuXHRmdW5jdGlvbiBiaW5kRXZlbnQgKCBuYW1lc3BhY2VkRXZlbnQsIGNhbGxiYWNrICkge1xyXG5cdFx0c2NvcGVfRXZlbnRzW25hbWVzcGFjZWRFdmVudF0gPSBzY29wZV9FdmVudHNbbmFtZXNwYWNlZEV2ZW50XSB8fCBbXTtcclxuXHRcdHNjb3BlX0V2ZW50c1tuYW1lc3BhY2VkRXZlbnRdLnB1c2goY2FsbGJhY2spO1xyXG5cclxuXHRcdC8vIElmIHRoZSBldmVudCBib3VuZCBpcyAndXBkYXRlLCcgZmlyZSBpdCBpbW1lZGlhdGVseSBmb3IgYWxsIGhhbmRsZXMuXHJcblx0XHRpZiAoIG5hbWVzcGFjZWRFdmVudC5zcGxpdCgnLicpWzBdID09PSAndXBkYXRlJyApIHtcclxuXHRcdFx0c2NvcGVfSGFuZGxlcy5mb3JFYWNoKGZ1bmN0aW9uKGEsIGluZGV4KXtcclxuXHRcdFx0XHRmaXJlRXZlbnQoJ3VwZGF0ZScsIGluZGV4KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBVbmRvIGF0dGFjaG1lbnQgb2YgZXZlbnRcclxuXHRmdW5jdGlvbiByZW1vdmVFdmVudCAoIG5hbWVzcGFjZWRFdmVudCApIHtcclxuXHJcblx0XHR2YXIgZXZlbnQgPSBuYW1lc3BhY2VkRXZlbnQgJiYgbmFtZXNwYWNlZEV2ZW50LnNwbGl0KCcuJylbMF07XHJcblx0XHR2YXIgbmFtZXNwYWNlID0gZXZlbnQgJiYgbmFtZXNwYWNlZEV2ZW50LnN1YnN0cmluZyhldmVudC5sZW5ndGgpO1xyXG5cclxuXHRcdE9iamVjdC5rZXlzKHNjb3BlX0V2ZW50cykuZm9yRWFjaChmdW5jdGlvbiggYmluZCApe1xyXG5cclxuXHRcdFx0dmFyIHRFdmVudCA9IGJpbmQuc3BsaXQoJy4nKVswXTtcclxuXHRcdFx0dmFyIHROYW1lc3BhY2UgPSBiaW5kLnN1YnN0cmluZyh0RXZlbnQubGVuZ3RoKTtcclxuXHJcblx0XHRcdGlmICggKCFldmVudCB8fCBldmVudCA9PT0gdEV2ZW50KSAmJiAoIW5hbWVzcGFjZSB8fCBuYW1lc3BhY2UgPT09IHROYW1lc3BhY2UpICkge1xyXG5cdFx0XHRcdGRlbGV0ZSBzY29wZV9FdmVudHNbYmluZF07XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Ly8gRXh0ZXJuYWwgZXZlbnQgaGFuZGxpbmdcclxuXHRmdW5jdGlvbiBmaXJlRXZlbnQgKCBldmVudE5hbWUsIGhhbmRsZU51bWJlciwgdGFwICkge1xyXG5cclxuXHRcdE9iamVjdC5rZXlzKHNjb3BlX0V2ZW50cykuZm9yRWFjaChmdW5jdGlvbiggdGFyZ2V0RXZlbnQgKSB7XHJcblxyXG5cdFx0XHR2YXIgZXZlbnRUeXBlID0gdGFyZ2V0RXZlbnQuc3BsaXQoJy4nKVswXTtcclxuXHJcblx0XHRcdGlmICggZXZlbnROYW1lID09PSBldmVudFR5cGUgKSB7XHJcblx0XHRcdFx0c2NvcGVfRXZlbnRzW3RhcmdldEV2ZW50XS5mb3JFYWNoKGZ1bmN0aW9uKCBjYWxsYmFjayApIHtcclxuXHJcblx0XHRcdFx0XHRjYWxsYmFjay5jYWxsKFxyXG5cdFx0XHRcdFx0XHQvLyBVc2UgdGhlIHNsaWRlciBwdWJsaWMgQVBJIGFzIHRoZSBzY29wZSAoJ3RoaXMnKVxyXG5cdFx0XHRcdFx0XHRzY29wZV9TZWxmLFxyXG5cdFx0XHRcdFx0XHQvLyBSZXR1cm4gdmFsdWVzIGFzIGFycmF5LCBzbyBhcmdfMVthcmdfMl0gaXMgYWx3YXlzIHZhbGlkLlxyXG5cdFx0XHRcdFx0XHRzY29wZV9WYWx1ZXMubWFwKG9wdGlvbnMuZm9ybWF0LnRvKSxcclxuXHRcdFx0XHRcdFx0Ly8gSGFuZGxlIGluZGV4LCAwIG9yIDFcclxuXHRcdFx0XHRcdFx0aGFuZGxlTnVtYmVyLFxyXG5cdFx0XHRcdFx0XHQvLyBVbmZvcm1hdHRlZCBzbGlkZXIgdmFsdWVzXHJcblx0XHRcdFx0XHRcdHNjb3BlX1ZhbHVlcy5zbGljZSgpLFxyXG5cdFx0XHRcdFx0XHQvLyBFdmVudCBpcyBmaXJlZCBieSB0YXAsIHRydWUgb3IgZmFsc2VcclxuXHRcdFx0XHRcdFx0dGFwIHx8IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHQvLyBMZWZ0IG9mZnNldCBvZiB0aGUgaGFuZGxlLCBpbiByZWxhdGlvbiB0byB0aGUgc2xpZGVyXHJcblx0XHRcdFx0XHRcdHNjb3BlX0xvY2F0aW9ucy5zbGljZSgpXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG4vKiEgSW4gdGhpcyBmaWxlOiBNZWNoYW5pY3MgZm9yIHNsaWRlciBvcGVyYXRpb24gKi9cclxuXHJcblx0ZnVuY3Rpb24gdG9QY3QgKCBwY3QgKSB7XHJcblx0XHRyZXR1cm4gcGN0ICsgJyUnO1xyXG5cdH1cclxuXHJcblx0Ly8gU3BsaXQgb3V0IHRoZSBoYW5kbGUgcG9zaXRpb25pbmcgbG9naWMgc28gdGhlIE1vdmUgZXZlbnQgY2FuIHVzZSBpdCwgdG9vXHJcblx0ZnVuY3Rpb24gY2hlY2tIYW5kbGVQb3NpdGlvbiAoIHJlZmVyZW5jZSwgaGFuZGxlTnVtYmVyLCB0bywgbG9va0JhY2t3YXJkLCBsb29rRm9yd2FyZCwgZ2V0VmFsdWUgKSB7XHJcblxyXG5cdFx0Ly8gRm9yIHNsaWRlcnMgd2l0aCBtdWx0aXBsZSBoYW5kbGVzLCBsaW1pdCBtb3ZlbWVudCB0byB0aGUgb3RoZXIgaGFuZGxlLlxyXG5cdFx0Ly8gQXBwbHkgdGhlIG1hcmdpbiBvcHRpb24gYnkgYWRkaW5nIGl0IHRvIHRoZSBoYW5kbGUgcG9zaXRpb25zLlxyXG5cdFx0aWYgKCBzY29wZV9IYW5kbGVzLmxlbmd0aCA+IDEgKSB7XHJcblxyXG5cdFx0XHRpZiAoIGxvb2tCYWNrd2FyZCAmJiBoYW5kbGVOdW1iZXIgPiAwICkge1xyXG5cdFx0XHRcdHRvID0gTWF0aC5tYXgodG8sIHJlZmVyZW5jZVtoYW5kbGVOdW1iZXIgLSAxXSArIG9wdGlvbnMubWFyZ2luKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCBsb29rRm9yd2FyZCAmJiBoYW5kbGVOdW1iZXIgPCBzY29wZV9IYW5kbGVzLmxlbmd0aCAtIDEgKSB7XHJcblx0XHRcdFx0dG8gPSBNYXRoLm1pbih0bywgcmVmZXJlbmNlW2hhbmRsZU51bWJlciArIDFdIC0gb3B0aW9ucy5tYXJnaW4pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gVGhlIGxpbWl0IG9wdGlvbiBoYXMgdGhlIG9wcG9zaXRlIGVmZmVjdCwgbGltaXRpbmcgaGFuZGxlcyB0byBhXHJcblx0XHQvLyBtYXhpbXVtIGRpc3RhbmNlIGZyb20gYW5vdGhlci4gTGltaXQgbXVzdCBiZSA+IDAsIGFzIG90aGVyd2lzZVxyXG5cdFx0Ly8gaGFuZGxlcyB3b3VsZCBiZSB1bm1vdmVhYmxlLlxyXG5cdFx0aWYgKCBzY29wZV9IYW5kbGVzLmxlbmd0aCA+IDEgJiYgb3B0aW9ucy5saW1pdCApIHtcclxuXHJcblx0XHRcdGlmICggbG9va0JhY2t3YXJkICYmIGhhbmRsZU51bWJlciA+IDAgKSB7XHJcblx0XHRcdFx0dG8gPSBNYXRoLm1pbih0bywgcmVmZXJlbmNlW2hhbmRsZU51bWJlciAtIDFdICsgb3B0aW9ucy5saW1pdCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICggbG9va0ZvcndhcmQgJiYgaGFuZGxlTnVtYmVyIDwgc2NvcGVfSGFuZGxlcy5sZW5ndGggLSAxICkge1xyXG5cdFx0XHRcdHRvID0gTWF0aC5tYXgodG8sIHJlZmVyZW5jZVtoYW5kbGVOdW1iZXIgKyAxXSAtIG9wdGlvbnMubGltaXQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gVGhlIHBhZGRpbmcgb3B0aW9uIGtlZXBzIHRoZSBoYW5kbGVzIGEgY2VydGFpbiBkaXN0YW5jZSBmcm9tIHRoZVxyXG5cdFx0Ly8gZWRnZXMgb2YgdGhlIHNsaWRlci4gUGFkZGluZyBtdXN0IGJlID4gMC5cclxuXHRcdGlmICggb3B0aW9ucy5wYWRkaW5nICkge1xyXG5cclxuXHRcdFx0aWYgKCBoYW5kbGVOdW1iZXIgPT09IDAgKSB7XHJcblx0XHRcdFx0dG8gPSBNYXRoLm1heCh0bywgb3B0aW9ucy5wYWRkaW5nWzBdKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCBoYW5kbGVOdW1iZXIgPT09IHNjb3BlX0hhbmRsZXMubGVuZ3RoIC0gMSApIHtcclxuXHRcdFx0XHR0byA9IE1hdGgubWluKHRvLCAxMDAgLSBvcHRpb25zLnBhZGRpbmdbMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dG8gPSBzY29wZV9TcGVjdHJ1bS5nZXRTdGVwKHRvKTtcclxuXHJcblx0XHQvLyBMaW1pdCBwZXJjZW50YWdlIHRvIHRoZSAwIC0gMTAwIHJhbmdlXHJcblx0XHR0byA9IGxpbWl0KHRvKTtcclxuXHJcblx0XHQvLyBSZXR1cm4gZmFsc2UgaWYgaGFuZGxlIGNhbid0IG1vdmVcclxuXHRcdGlmICggdG8gPT09IHJlZmVyZW5jZVtoYW5kbGVOdW1iZXJdICYmICFnZXRWYWx1ZSApIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0bztcclxuXHR9XHJcblxyXG5cdC8vIFVzZXMgc2xpZGVyIG9yaWVudGF0aW9uIHRvIGNyZWF0ZSBDU1MgcnVsZXMuIGEgPSBiYXNlIHZhbHVlO1xyXG5cdGZ1bmN0aW9uIGluUnVsZU9yZGVyICggdiwgYSApIHtcclxuXHRcdHZhciBvID0gb3B0aW9ucy5vcnQ7XHJcblx0XHRyZXR1cm4gKG8/YTp2KSArICcsICcgKyAobz92OmEpO1xyXG5cdH1cclxuXHJcblx0Ly8gTW92ZXMgaGFuZGxlKHMpIGJ5IGEgcGVyY2VudGFnZVxyXG5cdC8vIChib29sLCAlIHRvIG1vdmUsIFslIHdoZXJlIGhhbmRsZSBzdGFydGVkLCAuLi5dLCBbaW5kZXggaW4gc2NvcGVfSGFuZGxlcywgLi4uXSlcclxuXHRmdW5jdGlvbiBtb3ZlSGFuZGxlcyAoIHVwd2FyZCwgcHJvcG9zYWwsIGxvY2F0aW9ucywgaGFuZGxlTnVtYmVycyApIHtcclxuXHJcblx0XHR2YXIgcHJvcG9zYWxzID0gbG9jYXRpb25zLnNsaWNlKCk7XHJcblxyXG5cdFx0dmFyIGIgPSBbIXVwd2FyZCwgdXB3YXJkXTtcclxuXHRcdHZhciBmID0gW3Vwd2FyZCwgIXVwd2FyZF07XHJcblxyXG5cdFx0Ly8gQ29weSBoYW5kbGVOdW1iZXJzIHNvIHdlIGRvbid0IGNoYW5nZSB0aGUgZGF0YXNldFxyXG5cdFx0aGFuZGxlTnVtYmVycyA9IGhhbmRsZU51bWJlcnMuc2xpY2UoKTtcclxuXHJcblx0XHQvLyBDaGVjayB0byBzZWUgd2hpY2ggaGFuZGxlIGlzICdsZWFkaW5nJy5cclxuXHRcdC8vIElmIHRoYXQgb25lIGNhbid0IG1vdmUgdGhlIHNlY29uZCBjYW4ndCBlaXRoZXIuXHJcblx0XHRpZiAoIHVwd2FyZCApIHtcclxuXHRcdFx0aGFuZGxlTnVtYmVycy5yZXZlcnNlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gU3RlcCAxOiBnZXQgdGhlIG1heGltdW0gcGVyY2VudGFnZSB0aGF0IGFueSBvZiB0aGUgaGFuZGxlcyBjYW4gbW92ZVxyXG5cdFx0aWYgKCBoYW5kbGVOdW1iZXJzLmxlbmd0aCA+IDEgKSB7XHJcblxyXG5cdFx0XHRoYW5kbGVOdW1iZXJzLmZvckVhY2goZnVuY3Rpb24oaGFuZGxlTnVtYmVyLCBvKSB7XHJcblxyXG5cdFx0XHRcdHZhciB0byA9IGNoZWNrSGFuZGxlUG9zaXRpb24ocHJvcG9zYWxzLCBoYW5kbGVOdW1iZXIsIHByb3Bvc2Fsc1toYW5kbGVOdW1iZXJdICsgcHJvcG9zYWwsIGJbb10sIGZbb10sIGZhbHNlKTtcclxuXHJcblx0XHRcdFx0Ly8gU3RvcCBpZiBvbmUgb2YgdGhlIGhhbmRsZXMgY2FuJ3QgbW92ZS5cclxuXHRcdFx0XHRpZiAoIHRvID09PSBmYWxzZSApIHtcclxuXHRcdFx0XHRcdHByb3Bvc2FsID0gMDtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cHJvcG9zYWwgPSB0byAtIHByb3Bvc2Fsc1toYW5kbGVOdW1iZXJdO1xyXG5cdFx0XHRcdFx0cHJvcG9zYWxzW2hhbmRsZU51bWJlcl0gPSB0bztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIElmIHVzaW5nIG9uZSBoYW5kbGUsIGNoZWNrIGJhY2t3YXJkIEFORCBmb3J3YXJkXHJcblx0XHRlbHNlIHtcclxuXHRcdFx0YiA9IGYgPSBbdHJ1ZV07XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHN0YXRlID0gZmFsc2U7XHJcblxyXG5cdFx0Ly8gU3RlcCAyOiBUcnkgdG8gc2V0IHRoZSBoYW5kbGVzIHdpdGggdGhlIGZvdW5kIHBlcmNlbnRhZ2VcclxuXHRcdGhhbmRsZU51bWJlcnMuZm9yRWFjaChmdW5jdGlvbihoYW5kbGVOdW1iZXIsIG8pIHtcclxuXHRcdFx0c3RhdGUgPSBzZXRIYW5kbGUoaGFuZGxlTnVtYmVyLCBsb2NhdGlvbnNbaGFuZGxlTnVtYmVyXSArIHByb3Bvc2FsLCBiW29dLCBmW29dKSB8fCBzdGF0ZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIFN0ZXAgMzogSWYgYSBoYW5kbGUgbW92ZWQsIGZpcmUgZXZlbnRzXHJcblx0XHRpZiAoIHN0YXRlICkge1xyXG5cdFx0XHRoYW5kbGVOdW1iZXJzLmZvckVhY2goZnVuY3Rpb24oaGFuZGxlTnVtYmVyKXtcclxuXHRcdFx0XHRmaXJlRXZlbnQoJ3VwZGF0ZScsIGhhbmRsZU51bWJlcik7XHJcblx0XHRcdFx0ZmlyZUV2ZW50KCdzbGlkZScsIGhhbmRsZU51bWJlcik7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gVGFrZXMgYSBiYXNlIHZhbHVlIGFuZCBhbiBvZmZzZXQuIFRoaXMgb2Zmc2V0IGlzIHVzZWQgZm9yIHRoZSBjb25uZWN0IGJhciBzaXplLlxyXG5cdC8vIEluIHRoZSBpbml0aWFsIGRlc2lnbiBmb3IgdGhpcyBmZWF0dXJlLCB0aGUgb3JpZ2luIGVsZW1lbnQgd2FzIDElIHdpZGUuXHJcblx0Ly8gVW5mb3J0dW5hdGVseSwgYSByb3VuZGluZyBidWcgaW4gQ2hyb21lIG1ha2VzIGl0IGltcG9zc2libGUgdG8gaW1wbGVtZW50IHRoaXMgZmVhdHVyZVxyXG5cdC8vIGluIHRoaXMgbWFubmVyOiBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD03OTgyMjNcclxuXHRmdW5jdGlvbiB0cmFuc2Zvcm1EaXJlY3Rpb24gKCBhLCBiICkge1xyXG5cdFx0cmV0dXJuIG9wdGlvbnMuZGlyID8gMTAwIC0gYSAtIGIgOiBhO1xyXG5cdH1cclxuXHJcblx0Ly8gVXBkYXRlcyBzY29wZV9Mb2NhdGlvbnMgYW5kIHNjb3BlX1ZhbHVlcywgdXBkYXRlcyB2aXN1YWwgc3RhdGVcclxuXHRmdW5jdGlvbiB1cGRhdGVIYW5kbGVQb3NpdGlvbiAoIGhhbmRsZU51bWJlciwgdG8gKSB7XHJcblxyXG5cdFx0Ly8gVXBkYXRlIGxvY2F0aW9ucy5cclxuXHRcdHNjb3BlX0xvY2F0aW9uc1toYW5kbGVOdW1iZXJdID0gdG87XHJcblxyXG5cdFx0Ly8gQ29udmVydCB0aGUgdmFsdWUgdG8gdGhlIHNsaWRlciBzdGVwcGluZy9yYW5nZS5cclxuXHRcdHNjb3BlX1ZhbHVlc1toYW5kbGVOdW1iZXJdID0gc2NvcGVfU3BlY3RydW0uZnJvbVN0ZXBwaW5nKHRvKTtcclxuXHJcblx0XHR2YXIgcnVsZSA9ICd0cmFuc2xhdGUoJyArIGluUnVsZU9yZGVyKHRvUGN0KHRyYW5zZm9ybURpcmVjdGlvbih0bywgMCkgLSBzY29wZV9EaXJPZmZzZXQpLCAnMCcpICsgJyknO1xyXG5cdFx0c2NvcGVfSGFuZGxlc1toYW5kbGVOdW1iZXJdLnN0eWxlW29wdGlvbnMudHJhbnNmb3JtUnVsZV0gPSBydWxlO1xyXG5cclxuXHRcdHVwZGF0ZUNvbm5lY3QoaGFuZGxlTnVtYmVyKTtcclxuXHRcdHVwZGF0ZUNvbm5lY3QoaGFuZGxlTnVtYmVyICsgMSk7XHJcblx0fVxyXG5cclxuXHQvLyBIYW5kbGVzIGJlZm9yZSB0aGUgc2xpZGVyIG1pZGRsZSBhcmUgc3RhY2tlZCBsYXRlciA9IGhpZ2hlcixcclxuXHQvLyBIYW5kbGVzIGFmdGVyIHRoZSBtaWRkbGUgbGF0ZXIgaXMgbG93ZXJcclxuXHQvLyBbWzddIFs4XSAuLi4uLi4uLi4uIHwgLi4uLi4uLi4uLiBbNV0gWzRdXHJcblx0ZnVuY3Rpb24gc2V0WmluZGV4ICggKSB7XHJcblxyXG5cdFx0c2NvcGVfSGFuZGxlTnVtYmVycy5mb3JFYWNoKGZ1bmN0aW9uKGhhbmRsZU51bWJlcil7XHJcblx0XHRcdHZhciBkaXIgPSAoc2NvcGVfTG9jYXRpb25zW2hhbmRsZU51bWJlcl0gPiA1MCA/IC0xIDogMSk7XHJcblx0XHRcdHZhciB6SW5kZXggPSAzICsgKHNjb3BlX0hhbmRsZXMubGVuZ3RoICsgKGRpciAqIGhhbmRsZU51bWJlcikpO1xyXG5cdFx0XHRzY29wZV9IYW5kbGVzW2hhbmRsZU51bWJlcl0uc3R5bGUuekluZGV4ID0gekluZGV4O1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvLyBUZXN0IHN1Z2dlc3RlZCB2YWx1ZXMgYW5kIGFwcGx5IG1hcmdpbiwgc3RlcC5cclxuXHRmdW5jdGlvbiBzZXRIYW5kbGUgKCBoYW5kbGVOdW1iZXIsIHRvLCBsb29rQmFja3dhcmQsIGxvb2tGb3J3YXJkICkge1xyXG5cclxuXHRcdHRvID0gY2hlY2tIYW5kbGVQb3NpdGlvbihzY29wZV9Mb2NhdGlvbnMsIGhhbmRsZU51bWJlciwgdG8sIGxvb2tCYWNrd2FyZCwgbG9va0ZvcndhcmQsIGZhbHNlKTtcclxuXHJcblx0XHRpZiAoIHRvID09PSBmYWxzZSApIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHVwZGF0ZUhhbmRsZVBvc2l0aW9uKGhhbmRsZU51bWJlciwgdG8pO1xyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0Ly8gVXBkYXRlcyBzdHlsZSBhdHRyaWJ1dGUgZm9yIGNvbm5lY3Qgbm9kZXNcclxuXHRmdW5jdGlvbiB1cGRhdGVDb25uZWN0ICggaW5kZXggKSB7XHJcblxyXG5cdFx0Ly8gU2tpcCBjb25uZWN0cyBzZXQgdG8gZmFsc2VcclxuXHRcdGlmICggIXNjb3BlX0Nvbm5lY3RzW2luZGV4XSApIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBsID0gMDtcclxuXHRcdHZhciBoID0gMTAwO1xyXG5cclxuXHRcdGlmICggaW5kZXggIT09IDAgKSB7XHJcblx0XHRcdGwgPSBzY29wZV9Mb2NhdGlvbnNbaW5kZXggLSAxXTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIGluZGV4ICE9PSBzY29wZV9Db25uZWN0cy5sZW5ndGggLSAxICkge1xyXG5cdFx0XHRoID0gc2NvcGVfTG9jYXRpb25zW2luZGV4XTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBXZSB1c2UgdHdvIHJ1bGVzOlxyXG5cdFx0Ly8gJ3RyYW5zbGF0ZScgdG8gY2hhbmdlIHRoZSBsZWZ0L3RvcCBvZmZzZXQ7XHJcblx0XHQvLyAnc2NhbGUnIHRvIGNoYW5nZSB0aGUgd2lkdGggb2YgdGhlIGVsZW1lbnQ7XHJcblx0XHQvLyBBcyB0aGUgZWxlbWVudCBoYXMgYSB3aWR0aCBvZiAxMDAlLCBhIHRyYW5zbGF0aW9uIG9mIDEwMCUgaXMgZXF1YWwgdG8gMTAwJSBvZiB0aGUgcGFyZW50ICgubm9VaS1iYXNlKVxyXG5cdFx0dmFyIGNvbm5lY3RXaWR0aCA9IGggLSBsO1xyXG5cdFx0dmFyIHRyYW5zbGF0ZVJ1bGUgPSAndHJhbnNsYXRlKCcgKyBpblJ1bGVPcmRlcih0b1BjdCh0cmFuc2Zvcm1EaXJlY3Rpb24obCwgY29ubmVjdFdpZHRoKSksICcwJykgKyAnKSc7XHJcblx0XHR2YXIgc2NhbGVSdWxlID0gJ3NjYWxlKCcgKyBpblJ1bGVPcmRlcihjb25uZWN0V2lkdGggLyAxMDAsICcxJykgKyAnKSc7XHJcblxyXG5cdFx0c2NvcGVfQ29ubmVjdHNbaW5kZXhdLnN0eWxlW29wdGlvbnMudHJhbnNmb3JtUnVsZV0gPSB0cmFuc2xhdGVSdWxlICsgJyAnICsgc2NhbGVSdWxlO1xyXG5cdH1cclxuXHJcbi8qISBJbiB0aGlzIGZpbGU6IEFsbCBtZXRob2RzIGV2ZW50dWFsbHkgZXhwb3NlZCBpbiBzbGlkZXIubm9VaVNsaWRlci4uLiAqL1xyXG5cclxuXHQvLyBQYXJzZXMgdmFsdWUgcGFzc2VkIHRvIC5zZXQgbWV0aG9kLiBSZXR1cm5zIGN1cnJlbnQgdmFsdWUgaWYgbm90IHBhcnNlLWFibGUuXHJcblx0ZnVuY3Rpb24gcmVzb2x2ZVRvVmFsdWUgKCB0bywgaGFuZGxlTnVtYmVyICkge1xyXG5cclxuXHRcdC8vIFNldHRpbmcgd2l0aCBudWxsIGluZGljYXRlcyBhbiAnaWdub3JlJy5cclxuXHRcdC8vIElucHV0dGluZyAnZmFsc2UnIGlzIGludmFsaWQuXHJcblx0XHRpZiAoIHRvID09PSBudWxsIHx8IHRvID09PSBmYWxzZSB8fCB0byA9PT0gdW5kZWZpbmVkICkge1xyXG5cdFx0XHRyZXR1cm4gc2NvcGVfTG9jYXRpb25zW2hhbmRsZU51bWJlcl07XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gSWYgYSBmb3JtYXR0ZWQgbnVtYmVyIHdhcyBwYXNzZWQsIGF0dGVtcHQgdG8gZGVjb2RlIGl0LlxyXG5cdFx0aWYgKCB0eXBlb2YgdG8gPT09ICdudW1iZXInICkge1xyXG5cdFx0XHR0byA9IFN0cmluZyh0byk7XHJcblx0XHR9XHJcblxyXG5cdFx0dG8gPSBvcHRpb25zLmZvcm1hdC5mcm9tKHRvKTtcclxuXHRcdHRvID0gc2NvcGVfU3BlY3RydW0udG9TdGVwcGluZyh0byk7XHJcblxyXG5cdFx0Ly8gSWYgcGFyc2luZyB0aGUgbnVtYmVyIGZhaWxlZCwgdXNlIHRoZSBjdXJyZW50IHZhbHVlLlxyXG5cdFx0aWYgKCB0byA9PT0gZmFsc2UgfHwgaXNOYU4odG8pICkge1xyXG5cdFx0XHRyZXR1cm4gc2NvcGVfTG9jYXRpb25zW2hhbmRsZU51bWJlcl07XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRvO1xyXG5cdH1cclxuXHJcblx0Ly8gU2V0IHRoZSBzbGlkZXIgdmFsdWUuXHJcblx0ZnVuY3Rpb24gdmFsdWVTZXQgKCBpbnB1dCwgZmlyZVNldEV2ZW50ICkge1xyXG5cclxuXHRcdHZhciB2YWx1ZXMgPSBhc0FycmF5KGlucHV0KTtcclxuXHRcdHZhciBpc0luaXQgPSBzY29wZV9Mb2NhdGlvbnNbMF0gPT09IHVuZGVmaW5lZDtcclxuXHJcblx0XHQvLyBFdmVudCBmaXJlcyBieSBkZWZhdWx0XHJcblx0XHRmaXJlU2V0RXZlbnQgPSAoZmlyZVNldEV2ZW50ID09PSB1bmRlZmluZWQgPyB0cnVlIDogISFmaXJlU2V0RXZlbnQpO1xyXG5cclxuXHRcdC8vIEFuaW1hdGlvbiBpcyBvcHRpb25hbC5cclxuXHRcdC8vIE1ha2Ugc3VyZSB0aGUgaW5pdGlhbCB2YWx1ZXMgd2VyZSBzZXQgYmVmb3JlIHVzaW5nIGFuaW1hdGVkIHBsYWNlbWVudC5cclxuXHRcdGlmICggb3B0aW9ucy5hbmltYXRlICYmICFpc0luaXQgKSB7XHJcblx0XHRcdGFkZENsYXNzRm9yKHNjb3BlX1RhcmdldCwgb3B0aW9ucy5jc3NDbGFzc2VzLnRhcCwgb3B0aW9ucy5hbmltYXRpb25EdXJhdGlvbik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRmlyc3QgcGFzcywgd2l0aG91dCBsb29rQWhlYWQgYnV0IHdpdGggbG9va0JhY2t3YXJkLiBWYWx1ZXMgYXJlIHNldCBmcm9tIGxlZnQgdG8gcmlnaHQuXHJcblx0XHRzY29wZV9IYW5kbGVOdW1iZXJzLmZvckVhY2goZnVuY3Rpb24oaGFuZGxlTnVtYmVyKXtcclxuXHRcdFx0c2V0SGFuZGxlKGhhbmRsZU51bWJlciwgcmVzb2x2ZVRvVmFsdWUodmFsdWVzW2hhbmRsZU51bWJlcl0sIGhhbmRsZU51bWJlciksIHRydWUsIGZhbHNlKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIFNlY29uZCBwYXNzLiBOb3cgdGhhdCBhbGwgYmFzZSB2YWx1ZXMgYXJlIHNldCwgYXBwbHkgY29uc3RyYWludHNcclxuXHRcdHNjb3BlX0hhbmRsZU51bWJlcnMuZm9yRWFjaChmdW5jdGlvbihoYW5kbGVOdW1iZXIpe1xyXG5cdFx0XHRzZXRIYW5kbGUoaGFuZGxlTnVtYmVyLCBzY29wZV9Mb2NhdGlvbnNbaGFuZGxlTnVtYmVyXSwgdHJ1ZSwgdHJ1ZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRzZXRaaW5kZXgoKTtcclxuXHJcblx0XHRzY29wZV9IYW5kbGVOdW1iZXJzLmZvckVhY2goZnVuY3Rpb24oaGFuZGxlTnVtYmVyKXtcclxuXHJcblx0XHRcdGZpcmVFdmVudCgndXBkYXRlJywgaGFuZGxlTnVtYmVyKTtcclxuXHJcblx0XHRcdC8vIEZpcmUgdGhlIGV2ZW50IG9ubHkgZm9yIGhhbmRsZXMgdGhhdCByZWNlaXZlZCBhIG5ldyB2YWx1ZSwgYXMgcGVyICM1NzlcclxuXHRcdFx0aWYgKCB2YWx1ZXNbaGFuZGxlTnVtYmVyXSAhPT0gbnVsbCAmJiBmaXJlU2V0RXZlbnQgKSB7XHJcblx0XHRcdFx0ZmlyZUV2ZW50KCdzZXQnLCBoYW5kbGVOdW1iZXIpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8vIFJlc2V0IHNsaWRlciB0byBpbml0aWFsIHZhbHVlc1xyXG5cdGZ1bmN0aW9uIHZhbHVlUmVzZXQgKCBmaXJlU2V0RXZlbnQgKSB7XHJcblx0XHR2YWx1ZVNldChvcHRpb25zLnN0YXJ0LCBmaXJlU2V0RXZlbnQpO1xyXG5cdH1cclxuXHJcblx0Ly8gR2V0IHRoZSBzbGlkZXIgdmFsdWUuXHJcblx0ZnVuY3Rpb24gdmFsdWVHZXQgKCApIHtcclxuXHJcblx0XHR2YXIgdmFsdWVzID0gc2NvcGVfVmFsdWVzLm1hcChvcHRpb25zLmZvcm1hdC50byk7XHJcblxyXG5cdFx0Ly8gSWYgb25seSBvbmUgaGFuZGxlIGlzIHVzZWQsIHJldHVybiBhIHNpbmdsZSB2YWx1ZS5cclxuXHRcdGlmICggdmFsdWVzLmxlbmd0aCA9PT0gMSApe1xyXG5cdFx0XHRyZXR1cm4gdmFsdWVzWzBdO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB2YWx1ZXM7XHJcblx0fVxyXG5cclxuXHQvLyBSZW1vdmVzIGNsYXNzZXMgZnJvbSB0aGUgcm9vdCBhbmQgZW1wdGllcyBpdC5cclxuXHRmdW5jdGlvbiBkZXN0cm95ICggKSB7XHJcblxyXG5cdFx0Zm9yICggdmFyIGtleSBpbiBvcHRpb25zLmNzc0NsYXNzZXMgKSB7XHJcblx0XHRcdGlmICggIW9wdGlvbnMuY3NzQ2xhc3Nlcy5oYXNPd25Qcm9wZXJ0eShrZXkpICkgeyBjb250aW51ZTsgfVxyXG5cdFx0XHRyZW1vdmVDbGFzcyhzY29wZV9UYXJnZXQsIG9wdGlvbnMuY3NzQ2xhc3Nlc1trZXldKTtcclxuXHRcdH1cclxuXHJcblx0XHR3aGlsZSAoc2NvcGVfVGFyZ2V0LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c2NvcGVfVGFyZ2V0LnJlbW92ZUNoaWxkKHNjb3BlX1RhcmdldC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHJcblx0XHRkZWxldGUgc2NvcGVfVGFyZ2V0Lm5vVWlTbGlkZXI7XHJcblx0fVxyXG5cclxuXHQvLyBHZXQgdGhlIGN1cnJlbnQgc3RlcCBzaXplIGZvciB0aGUgc2xpZGVyLlxyXG5cdGZ1bmN0aW9uIGdldEN1cnJlbnRTdGVwICggKSB7XHJcblxyXG5cdFx0Ly8gQ2hlY2sgYWxsIGxvY2F0aW9ucywgbWFwIHRoZW0gdG8gdGhlaXIgc3RlcHBpbmcgcG9pbnQuXHJcblx0XHQvLyBHZXQgdGhlIHN0ZXAgcG9pbnQsIHRoZW4gZmluZCBpdCBpbiB0aGUgaW5wdXQgbGlzdC5cclxuXHRcdHJldHVybiBzY29wZV9Mb2NhdGlvbnMubWFwKGZ1bmN0aW9uKCBsb2NhdGlvbiwgaW5kZXggKXtcclxuXHJcblx0XHRcdHZhciBuZWFyYnlTdGVwcyA9IHNjb3BlX1NwZWN0cnVtLmdldE5lYXJieVN0ZXBzKCBsb2NhdGlvbiApO1xyXG5cdFx0XHR2YXIgdmFsdWUgPSBzY29wZV9WYWx1ZXNbaW5kZXhdO1xyXG5cdFx0XHR2YXIgaW5jcmVtZW50ID0gbmVhcmJ5U3RlcHMudGhpc1N0ZXAuc3RlcDtcclxuXHRcdFx0dmFyIGRlY3JlbWVudCA9IG51bGw7XHJcblxyXG5cdFx0XHQvLyBJZiB0aGUgbmV4dCB2YWx1ZSBpbiB0aGlzIHN0ZXAgbW92ZXMgaW50byB0aGUgbmV4dCBzdGVwLFxyXG5cdFx0XHQvLyB0aGUgaW5jcmVtZW50IGlzIHRoZSBzdGFydCBvZiB0aGUgbmV4dCBzdGVwIC0gdGhlIGN1cnJlbnQgdmFsdWVcclxuXHRcdFx0aWYgKCBpbmNyZW1lbnQgIT09IGZhbHNlICkge1xyXG5cdFx0XHRcdGlmICggdmFsdWUgKyBpbmNyZW1lbnQgPiBuZWFyYnlTdGVwcy5zdGVwQWZ0ZXIuc3RhcnRWYWx1ZSApIHtcclxuXHRcdFx0XHRcdGluY3JlbWVudCA9IG5lYXJieVN0ZXBzLnN0ZXBBZnRlci5zdGFydFZhbHVlIC0gdmFsdWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0Ly8gSWYgdGhlIHZhbHVlIGlzIGJleW9uZCB0aGUgc3RhcnRpbmcgcG9pbnRcclxuXHRcdFx0aWYgKCB2YWx1ZSA+IG5lYXJieVN0ZXBzLnRoaXNTdGVwLnN0YXJ0VmFsdWUgKSB7XHJcblx0XHRcdFx0ZGVjcmVtZW50ID0gbmVhcmJ5U3RlcHMudGhpc1N0ZXAuc3RlcDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZWxzZSBpZiAoIG5lYXJieVN0ZXBzLnN0ZXBCZWZvcmUuc3RlcCA9PT0gZmFsc2UgKSB7XHJcblx0XHRcdFx0ZGVjcmVtZW50ID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIElmIGEgaGFuZGxlIGlzIGF0IHRoZSBzdGFydCBvZiBhIHN0ZXAsIGl0IGFsd2F5cyBzdGVwcyBiYWNrIGludG8gdGhlIHByZXZpb3VzIHN0ZXAgZmlyc3RcclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0ZGVjcmVtZW50ID0gdmFsdWUgLSBuZWFyYnlTdGVwcy5zdGVwQmVmb3JlLmhpZ2hlc3RTdGVwO1xyXG5cdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0Ly8gTm93LCBpZiBhdCB0aGUgc2xpZGVyIGVkZ2VzLCB0aGVyZSBpcyBub3QgaW4vZGVjcmVtZW50XHJcblx0XHRcdGlmICggbG9jYXRpb24gPT09IDEwMCApIHtcclxuXHRcdFx0XHRpbmNyZW1lbnQgPSBudWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRlbHNlIGlmICggbG9jYXRpb24gPT09IDAgKSB7XHJcblx0XHRcdFx0ZGVjcmVtZW50ID0gbnVsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gQXMgcGVyICMzOTEsIHRoZSBjb21wYXJpc29uIGZvciB0aGUgZGVjcmVtZW50IHN0ZXAgY2FuIGhhdmUgc29tZSByb3VuZGluZyBpc3N1ZXMuXHJcblx0XHRcdHZhciBzdGVwRGVjaW1hbHMgPSBzY29wZV9TcGVjdHJ1bS5jb3VudFN0ZXBEZWNpbWFscygpO1xyXG5cclxuXHRcdFx0Ly8gUm91bmQgcGVyICMzOTFcclxuXHRcdFx0aWYgKCBpbmNyZW1lbnQgIT09IG51bGwgJiYgaW5jcmVtZW50ICE9PSBmYWxzZSApIHtcclxuXHRcdFx0XHRpbmNyZW1lbnQgPSBOdW1iZXIoaW5jcmVtZW50LnRvRml4ZWQoc3RlcERlY2ltYWxzKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICggZGVjcmVtZW50ICE9PSBudWxsICYmIGRlY3JlbWVudCAhPT0gZmFsc2UgKSB7XHJcblx0XHRcdFx0ZGVjcmVtZW50ID0gTnVtYmVyKGRlY3JlbWVudC50b0ZpeGVkKHN0ZXBEZWNpbWFscykpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gW2RlY3JlbWVudCwgaW5jcmVtZW50XTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Ly8gVXBkYXRlYWJsZTogbWFyZ2luLCBsaW1pdCwgcGFkZGluZywgc3RlcCwgcmFuZ2UsIGFuaW1hdGUsIHNuYXBcclxuXHRmdW5jdGlvbiB1cGRhdGVPcHRpb25zICggb3B0aW9uc1RvVXBkYXRlLCBmaXJlU2V0RXZlbnQgKSB7XHJcblxyXG5cdFx0Ly8gU3BlY3RydW0gaXMgY3JlYXRlZCB1c2luZyB0aGUgcmFuZ2UsIHNuYXAsIGRpcmVjdGlvbiBhbmQgc3RlcCBvcHRpb25zLlxyXG5cdFx0Ly8gJ3NuYXAnIGFuZCAnc3RlcCcgY2FuIGJlIHVwZGF0ZWQuXHJcblx0XHQvLyBJZiAnc25hcCcgYW5kICdzdGVwJyBhcmUgbm90IHBhc3NlZCwgdGhleSBzaG91bGQgcmVtYWluIHVuY2hhbmdlZC5cclxuXHRcdHZhciB2ID0gdmFsdWVHZXQoKTtcclxuXHJcblx0XHR2YXIgdXBkYXRlQWJsZSA9IFsnbWFyZ2luJywgJ2xpbWl0JywgJ3BhZGRpbmcnLCAncmFuZ2UnLCAnYW5pbWF0ZScsICdzbmFwJywgJ3N0ZXAnLCAnZm9ybWF0J107XHJcblxyXG5cdFx0Ly8gT25seSBjaGFuZ2Ugb3B0aW9ucyB0aGF0IHdlJ3JlIGFjdHVhbGx5IHBhc3NlZCB0byB1cGRhdGUuXHJcblx0XHR1cGRhdGVBYmxlLmZvckVhY2goZnVuY3Rpb24obmFtZSl7XHJcblx0XHRcdGlmICggb3B0aW9uc1RvVXBkYXRlW25hbWVdICE9PSB1bmRlZmluZWQgKSB7XHJcblx0XHRcdFx0b3JpZ2luYWxPcHRpb25zW25hbWVdID0gb3B0aW9uc1RvVXBkYXRlW25hbWVdO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR2YXIgbmV3T3B0aW9ucyA9IHRlc3RPcHRpb25zKG9yaWdpbmFsT3B0aW9ucyk7XHJcblxyXG5cdFx0Ly8gTG9hZCBuZXcgb3B0aW9ucyBpbnRvIHRoZSBzbGlkZXIgc3RhdGVcclxuXHRcdHVwZGF0ZUFibGUuZm9yRWFjaChmdW5jdGlvbihuYW1lKXtcclxuXHRcdFx0aWYgKCBvcHRpb25zVG9VcGRhdGVbbmFtZV0gIT09IHVuZGVmaW5lZCApIHtcclxuXHRcdFx0XHRvcHRpb25zW25hbWVdID0gbmV3T3B0aW9uc1tuYW1lXTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0c2NvcGVfU3BlY3RydW0gPSBuZXdPcHRpb25zLnNwZWN0cnVtO1xyXG5cclxuXHRcdC8vIExpbWl0LCBtYXJnaW4gYW5kIHBhZGRpbmcgZGVwZW5kIG9uIHRoZSBzcGVjdHJ1bSBidXQgYXJlIHN0b3JlZCBvdXRzaWRlIG9mIGl0LiAoIzY3NylcclxuXHRcdG9wdGlvbnMubWFyZ2luID0gbmV3T3B0aW9ucy5tYXJnaW47XHJcblx0XHRvcHRpb25zLmxpbWl0ID0gbmV3T3B0aW9ucy5saW1pdDtcclxuXHRcdG9wdGlvbnMucGFkZGluZyA9IG5ld09wdGlvbnMucGFkZGluZztcclxuXHJcblx0XHQvLyBVcGRhdGUgcGlwcywgcmVtb3ZlcyBleGlzdGluZy5cclxuXHRcdGlmICggb3B0aW9ucy5waXBzICkge1xyXG5cdFx0XHRwaXBzKG9wdGlvbnMucGlwcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gSW52YWxpZGF0ZSB0aGUgY3VycmVudCBwb3NpdGlvbmluZyBzbyB2YWx1ZVNldCBmb3JjZXMgYW4gdXBkYXRlLlxyXG5cdFx0c2NvcGVfTG9jYXRpb25zID0gW107XHJcblx0XHR2YWx1ZVNldChvcHRpb25zVG9VcGRhdGUuc3RhcnQgfHwgdiwgZmlyZVNldEV2ZW50KTtcclxuXHR9XHJcblxyXG4vKiEgSW4gdGhpcyBmaWxlOiBDYWxscyB0byBmdW5jdGlvbnMuIEFsbCBvdGhlciBzY29wZV8gZmlsZXMgZGVmaW5lIGZ1bmN0aW9ucyBvbmx5OyAqL1xyXG5cclxuXHQvLyBDcmVhdGUgdGhlIGJhc2UgZWxlbWVudCwgaW5pdGlhbGl6ZSBIVE1MIGFuZCBzZXQgY2xhc3Nlcy5cclxuXHQvLyBBZGQgaGFuZGxlcyBhbmQgY29ubmVjdCBlbGVtZW50cy5cclxuXHRhZGRTbGlkZXIoc2NvcGVfVGFyZ2V0KTtcclxuXHRhZGRFbGVtZW50cyhvcHRpb25zLmNvbm5lY3QsIHNjb3BlX0Jhc2UpO1xyXG5cclxuXHQvLyBBdHRhY2ggdXNlciBldmVudHMuXHJcblx0YmluZFNsaWRlckV2ZW50cyhvcHRpb25zLmV2ZW50cyk7XHJcblxyXG5cdC8vIFVzZSB0aGUgcHVibGljIHZhbHVlIG1ldGhvZCB0byBzZXQgdGhlIHN0YXJ0IHZhbHVlcy5cclxuXHR2YWx1ZVNldChvcHRpb25zLnN0YXJ0KTtcclxuXHJcblx0c2NvcGVfU2VsZiA9IHtcclxuXHRcdGRlc3Ryb3k6IGRlc3Ryb3ksXHJcblx0XHRzdGVwczogZ2V0Q3VycmVudFN0ZXAsXHJcblx0XHRvbjogYmluZEV2ZW50LFxyXG5cdFx0b2ZmOiByZW1vdmVFdmVudCxcclxuXHRcdGdldDogdmFsdWVHZXQsXHJcblx0XHRzZXQ6IHZhbHVlU2V0LFxyXG5cdFx0cmVzZXQ6IHZhbHVlUmVzZXQsXHJcblx0XHQvLyBFeHBvc2VkIGZvciB1bml0IHRlc3RpbmcsIGRvbid0IHVzZSB0aGlzIGluIHlvdXIgYXBwbGljYXRpb24uXHJcblx0XHRfX21vdmVIYW5kbGVzOiBmdW5jdGlvbihhLCBiLCBjKSB7IG1vdmVIYW5kbGVzKGEsIGIsIHNjb3BlX0xvY2F0aW9ucywgYyk7IH0sXHJcblx0XHRvcHRpb25zOiBvcmlnaW5hbE9wdGlvbnMsIC8vIElzc3VlICM2MDAsICM2NzhcclxuXHRcdHVwZGF0ZU9wdGlvbnM6IHVwZGF0ZU9wdGlvbnMsXHJcblx0XHR0YXJnZXQ6IHNjb3BlX1RhcmdldCwgLy8gSXNzdWUgIzU5N1xyXG5cdFx0cmVtb3ZlUGlwczogcmVtb3ZlUGlwcyxcclxuXHRcdHBpcHM6IHBpcHMgLy8gSXNzdWUgIzU5NFxyXG5cdH07XHJcblxyXG5cdGlmICggb3B0aW9ucy5waXBzICkge1xyXG5cdFx0cGlwcyhvcHRpb25zLnBpcHMpO1xyXG5cdH1cclxuXHJcblx0aWYgKCBvcHRpb25zLnRvb2x0aXBzICkge1xyXG5cdFx0dG9vbHRpcHMoKTtcclxuXHR9XHJcblxyXG5cdGFyaWEoKTtcclxuXHJcblx0cmV0dXJuIHNjb3BlX1NlbGY7XHJcblxyXG59XHJcblxyXG5cclxuXHQvLyBSdW4gdGhlIHN0YW5kYXJkIGluaXRpYWxpemVyXHJcblx0ZnVuY3Rpb24gaW5pdGlhbGl6ZSAoIHRhcmdldCwgb3JpZ2luYWxPcHRpb25zICkge1xyXG5cclxuXHRcdGlmICggIXRhcmdldCB8fCAhdGFyZ2V0Lm5vZGVOYW1lICkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyIChcIiArIFZFUlNJT04gKyBcIik6IGNyZWF0ZSByZXF1aXJlcyBhIHNpbmdsZSBlbGVtZW50LCBnb3Q6IFwiICsgdGFyZ2V0KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBUaHJvdyBhbiBlcnJvciBpZiB0aGUgc2xpZGVyIHdhcyBhbHJlYWR5IGluaXRpYWxpemVkLlxyXG5cdFx0aWYgKCB0YXJnZXQubm9VaVNsaWRlciApIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm9VaVNsaWRlciAoXCIgKyBWRVJTSU9OICsgXCIpOiBTbGlkZXIgd2FzIGFscmVhZHkgaW5pdGlhbGl6ZWQuXCIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFRlc3QgdGhlIG9wdGlvbnMgYW5kIGNyZWF0ZSB0aGUgc2xpZGVyIGVudmlyb25tZW50O1xyXG5cdFx0dmFyIG9wdGlvbnMgPSB0ZXN0T3B0aW9ucyggb3JpZ2luYWxPcHRpb25zLCB0YXJnZXQgKTtcclxuXHRcdHZhciBhcGkgPSBzY29wZSggdGFyZ2V0LCBvcHRpb25zLCBvcmlnaW5hbE9wdGlvbnMgKTtcclxuXHJcblx0XHR0YXJnZXQubm9VaVNsaWRlciA9IGFwaTtcclxuXHJcblx0XHRyZXR1cm4gYXBpO1xyXG5cdH1cclxuXHJcblx0Ly8gVXNlIGFuIG9iamVjdCBpbnN0ZWFkIG9mIGEgZnVuY3Rpb24gZm9yIGZ1dHVyZSBleHBhbmRhYmlsaXR5O1xyXG5cdHJldHVybiB7XHJcblx0XHR2ZXJzaW9uOiBWRVJTSU9OLFxyXG5cdFx0Y3JlYXRlOiBpbml0aWFsaXplXHJcblx0fTtcclxuXHJcbn0pKTsiLCJcclxudmFyIGZpZWxkcyA9IHtcclxuXHRcclxuXHRmdW5jdGlvbnM6IHt9XHJcblx0XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZpZWxkczsiLCJcclxuLy92YXIgc3RhdGUgPSByZXF1aXJlKCcuL2luY2x1ZGVzL3N0YXRlJyk7XHJcblxyXG52YXIgcGFnaW5hdGlvbiA9IHtcclxuXHRcclxuXHRzZXR1cExlZ2FjeTogZnVuY3Rpb24oKXtcclxuXHRcdFxyXG5cdFx0XHJcblx0fSxcclxuXHRcclxuXHRzZXR1cExlZ2FjeTogZnVuY3Rpb24oKXtcclxuXHRcdFxyXG5cdFx0LyppZih0eXBlb2Yoc2VsZi5hamF4X2xpbmtzX3NlbGVjdG9yKSE9XCJ1bmRlZmluZWRcIilcclxuXHRcdHtcclxuXHRcdFx0dmFyICRhamF4X2xpbmtzX29iamVjdCA9IGpRdWVyeShzZWxmLmFqYXhfbGlua3Nfc2VsZWN0b3IpO1xyXG5cdFx0XHRcclxuXHRcdFx0aWYoJGFqYXhfbGlua3Nfb2JqZWN0Lmxlbmd0aD4wKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0JGFqYXhfbGlua3Nfb2JqZWN0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHR2YXIgbGluayA9IGpRdWVyeSh0aGlzKS5hdHRyKCdocmVmJyk7XHJcblx0XHRcdFx0XHRzZWxmLmFqYXhfYWN0aW9uID0gXCJwYWdpbmF0aW9uXCI7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdHNlbGYuZmV0Y2hMZWdhY3lBamF4UmVzdWx0cyhsaW5rKTtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fSovXHJcblx0fVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwYWdpbmF0aW9uOyIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcblxyXG52YXIgJCBcdFx0XHRcdD0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2pRdWVyeSddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnalF1ZXJ5J10gOiBudWxsKTtcclxudmFyIHN0YXRlIFx0XHRcdD0gcmVxdWlyZSgnLi9zdGF0ZScpO1xyXG52YXIgcHJvY2Vzc19mb3JtIFx0PSByZXF1aXJlKCcuL3Byb2Nlc3NfZm9ybScpO1xyXG52YXIgbm9VaVNsaWRlclx0XHQ9IHJlcXVpcmUoJ25vdWlzbGlkZXInKTtcclxudmFyIGNvb2tpZXMgICAgICAgICA9IHJlcXVpcmUoJ2pzLWNvb2tpZScpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvcHRpb25zKVxyXG57XHJcbiAgICB2YXIgZGVmYXVsdHMgPSB7XHJcbiAgICAgICAgc3RhcnRPcGVuZWQ6IGZhbHNlLFxyXG4gICAgICAgIGlzSW5pdDogdHJ1ZSxcclxuICAgICAgICBhY3Rpb246IFwiXCJcclxuICAgIH07XHJcblxyXG4gICAgdmFyIG9wdHMgPSBqUXVlcnkuZXh0ZW5kKGRlZmF1bHRzLCBvcHRpb25zKTtcclxuXHJcbiAgICAvL2xvb3AgdGhyb3VnaCBlYWNoIGl0ZW0gbWF0Y2hlZFxyXG4gICAgdGhpcy5lYWNoKGZ1bmN0aW9uKClcclxuICAgIHtcclxuXHJcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5zZmlkID0gJHRoaXMuYXR0cihcImRhdGEtc2YtZm9ybS1pZFwiKTtcclxuXHJcbiAgICAgICAgc3RhdGUuYWRkU2VhcmNoRm9ybSh0aGlzLnNmaWQsIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLiRmaWVsZHMgPSAkdGhpcy5maW5kKFwiPiB1bCA+IGxpXCIpOyAvL2EgcmVmZXJlbmNlIHRvIGVhY2ggZmllbGRzIHBhcmVudCBMSVxyXG5cclxuICAgICAgICB0aGlzLmVuYWJsZV90YXhvbm9teV9hcmNoaXZlcyA9ICR0aGlzLmF0dHIoJ2RhdGEtdGF4b25vbXktYXJjaGl2ZXMnKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRfdGF4b25vbXlfYXJjaGl2ZSA9ICR0aGlzLmF0dHIoJ2RhdGEtY3VycmVudC10YXhvbm9teS1hcmNoaXZlJyk7XHJcblxyXG4gICAgICAgIGlmKHR5cGVvZih0aGlzLmVuYWJsZV90YXhvbm9teV9hcmNoaXZlcyk9PVwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZV90YXhvbm9teV9hcmNoaXZlcyA9IFwiMFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0eXBlb2YodGhpcy5jdXJyZW50X3RheG9ub215X2FyY2hpdmUpPT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50X3RheG9ub215X2FyY2hpdmUgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvY2Vzc19mb3JtLmluaXQoc2VsZi5lbmFibGVfdGF4b25vbXlfYXJjaGl2ZXMsIHNlbGYuY3VycmVudF90YXhvbm9teV9hcmNoaXZlKTtcclxuICAgICAgICAvL3Byb2Nlc3NfZm9ybS5zZXRUYXhBcmNoaXZlUmVzdWx0c1VybChzZWxmKTtcclxuICAgICAgICBwcm9jZXNzX2Zvcm0uZW5hYmxlSW5wdXRzKHNlbGYpO1xyXG5cclxuICAgICAgICBpZih0eXBlb2YodGhpcy5leHRyYV9xdWVyeV9wYXJhbXMpPT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5leHRyYV9xdWVyeV9wYXJhbXMgPSB7YWxsOiB7fSwgcmVzdWx0czoge30sIGFqYXg6IHt9fTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB0aGlzLnRlbXBsYXRlX2lzX2xvYWRlZCA9ICR0aGlzLmF0dHIoXCJkYXRhLXRlbXBsYXRlLWxvYWRlZFwiKTtcclxuICAgICAgICB0aGlzLmlzX2FqYXggPSAkdGhpcy5hdHRyKFwiZGF0YS1hamF4XCIpO1xyXG4gICAgICAgIHRoaXMuaW5zdGFuY2VfbnVtYmVyID0gJHRoaXMuYXR0cignZGF0YS1pbnN0YW5jZS1jb3VudCcpO1xyXG4gICAgICAgIHRoaXMuJGFqYXhfcmVzdWx0c19jb250YWluZXIgPSBqUXVlcnkoJHRoaXMuYXR0cihcImRhdGEtYWpheC10YXJnZXRcIikpO1xyXG5cclxuICAgICAgICB0aGlzLnJlc3VsdHNfdXJsID0gJHRoaXMuYXR0cihcImRhdGEtcmVzdWx0cy11cmxcIik7XHJcbiAgICAgICAgdGhpcy5kZWJ1Z19tb2RlID0gJHRoaXMuYXR0cihcImRhdGEtZGVidWctbW9kZVwiKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZV9hamF4X3VybCA9ICR0aGlzLmF0dHIoXCJkYXRhLXVwZGF0ZS1hamF4LXVybFwiKTtcclxuICAgICAgICB0aGlzLnBhZ2luYXRpb25fdHlwZSA9ICR0aGlzLmF0dHIoXCJkYXRhLWFqYXgtcGFnaW5hdGlvbi10eXBlXCIpO1xyXG4gICAgICAgIHRoaXMuYXV0b19jb3VudCA9ICR0aGlzLmF0dHIoXCJkYXRhLWF1dG8tY291bnRcIik7XHJcbiAgICAgICAgdGhpcy5hdXRvX2NvdW50X3JlZnJlc2hfbW9kZSA9ICR0aGlzLmF0dHIoXCJkYXRhLWF1dG8tY291bnQtcmVmcmVzaC1tb2RlXCIpO1xyXG4gICAgICAgIHRoaXMub25seV9yZXN1bHRzX2FqYXggPSAkdGhpcy5hdHRyKFwiZGF0YS1vbmx5LXJlc3VsdHMtYWpheFwiKTsgLy9pZiB3ZSBhcmUgbm90IG9uIHRoZSByZXN1bHRzIHBhZ2UsIHJlZGlyZWN0IHJhdGhlciB0aGFuIHRyeSB0byBsb2FkIHZpYSBhamF4XHJcbiAgICAgICAgdGhpcy5zY3JvbGxfdG9fcG9zID0gJHRoaXMuYXR0cihcImRhdGEtc2Nyb2xsLXRvLXBvc1wiKTtcclxuICAgICAgICB0aGlzLmN1c3RvbV9zY3JvbGxfdG8gPSAkdGhpcy5hdHRyKFwiZGF0YS1jdXN0b20tc2Nyb2xsLXRvXCIpO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsX29uX2FjdGlvbiA9ICR0aGlzLmF0dHIoXCJkYXRhLXNjcm9sbC1vbi1hY3Rpb25cIik7XHJcbiAgICAgICAgdGhpcy5sYW5nX2NvZGUgPSAkdGhpcy5hdHRyKFwiZGF0YS1sYW5nLWNvZGVcIik7XHJcbiAgICAgICAgdGhpcy5hamF4X3VybCA9ICR0aGlzLmF0dHIoJ2RhdGEtYWpheC11cmwnKTtcclxuICAgICAgICB0aGlzLmFqYXhfZm9ybV91cmwgPSAkdGhpcy5hdHRyKCdkYXRhLWFqYXgtZm9ybS11cmwnKTtcclxuICAgICAgICB0aGlzLmlzX3J0bCA9ICR0aGlzLmF0dHIoJ2RhdGEtaXMtcnRsJyk7XHJcblxyXG4gICAgICAgIHRoaXMuZGlzcGxheV9yZXN1bHRfbWV0aG9kID0gJHRoaXMuYXR0cignZGF0YS1kaXNwbGF5LXJlc3VsdC1tZXRob2QnKTtcclxuICAgICAgICB0aGlzLm1haW50YWluX3N0YXRlID0gJHRoaXMuYXR0cignZGF0YS1tYWludGFpbi1zdGF0ZScpO1xyXG4gICAgICAgIHRoaXMuYWpheF9hY3Rpb24gPSBcIlwiO1xyXG4gICAgICAgIHRoaXMubGFzdF9zdWJtaXRfcXVlcnlfcGFyYW1zID0gXCJcIjtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJyZW50X3BhZ2VkID0gcGFyc2VJbnQoJHRoaXMuYXR0cignZGF0YS1pbml0LXBhZ2VkJykpO1xyXG4gICAgICAgIHRoaXMubGFzdF9sb2FkX21vcmVfaHRtbCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5sb2FkX21vcmVfaHRtbCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5hamF4X2RhdGFfdHlwZSA9ICR0aGlzLmF0dHIoJ2RhdGEtYWpheC1kYXRhLXR5cGUnKTtcclxuICAgICAgICB0aGlzLmFqYXhfdGFyZ2V0X2F0dHIgPSAkdGhpcy5hdHRyKFwiZGF0YS1hamF4LXRhcmdldFwiKTtcclxuICAgICAgICB0aGlzLnVzZV9oaXN0b3J5X2FwaSA9ICR0aGlzLmF0dHIoXCJkYXRhLXVzZS1oaXN0b3J5LWFwaVwiKTtcclxuICAgICAgICB0aGlzLmlzX3N1Ym1pdHRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5sYXN0X2FqYXhfcmVxdWVzdCA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmKHR5cGVvZih0aGlzLnVzZV9oaXN0b3J5X2FwaSk9PVwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnVzZV9oaXN0b3J5X2FwaSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0eXBlb2YodGhpcy5wYWdpbmF0aW9uX3R5cGUpPT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdpbmF0aW9uX3R5cGUgPSBcIm5vcm1hbFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0eXBlb2YodGhpcy5jdXJyZW50X3BhZ2VkKT09XCJ1bmRlZmluZWRcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudF9wYWdlZCA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0eXBlb2YodGhpcy5hamF4X3RhcmdldF9hdHRyKT09XCJ1bmRlZmluZWRcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYWpheF90YXJnZXRfYXR0ciA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0eXBlb2YodGhpcy5hamF4X3VybCk9PVwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFqYXhfdXJsID0gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHR5cGVvZih0aGlzLmFqYXhfZm9ybV91cmwpPT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hamF4X2Zvcm1fdXJsID0gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHR5cGVvZih0aGlzLnJlc3VsdHNfdXJsKT09XCJ1bmRlZmluZWRcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdWx0c191cmwgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodHlwZW9mKHRoaXMuc2Nyb2xsX3RvX3Bvcyk9PVwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbF90b19wb3MgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodHlwZW9mKHRoaXMuc2Nyb2xsX29uX2FjdGlvbik9PVwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbF9vbl9hY3Rpb24gPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0eXBlb2YodGhpcy5jdXN0b21fc2Nyb2xsX3RvKT09XCJ1bmRlZmluZWRcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tX3Njcm9sbF90byA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuJGN1c3RvbV9zY3JvbGxfdG8gPSBqUXVlcnkodGhpcy5jdXN0b21fc2Nyb2xsX3RvKTtcclxuXHJcbiAgICAgICAgaWYodHlwZW9mKHRoaXMudXBkYXRlX2FqYXhfdXJsKT09XCJ1bmRlZmluZWRcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlX2FqYXhfdXJsID0gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHR5cGVvZih0aGlzLmRlYnVnX21vZGUpPT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5kZWJ1Z19tb2RlID0gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHR5cGVvZih0aGlzLmFqYXhfdGFyZ2V0X29iamVjdCk9PVwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFqYXhfdGFyZ2V0X29iamVjdCA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0eXBlb2YodGhpcy50ZW1wbGF0ZV9pc19sb2FkZWQpPT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZV9pc19sb2FkZWQgPSBcIjBcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHR5cGVvZih0aGlzLmF1dG9fY291bnRfcmVmcmVzaF9tb2RlKT09XCJ1bmRlZmluZWRcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0b19jb3VudF9yZWZyZXNoX21vZGUgPSBcIjBcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYWpheF9saW5rc19zZWxlY3RvciA9ICR0aGlzLmF0dHIoXCJkYXRhLWFqYXgtbGlua3Mtc2VsZWN0b3JcIik7XHJcblxyXG5cclxuICAgICAgICB0aGlzLmF1dG9fdXBkYXRlID0gJHRoaXMuYXR0cihcImRhdGEtYXV0by11cGRhdGVcIik7XHJcbiAgICAgICAgdGhpcy5pbnB1dFRpbWVyID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRJbmZpbml0ZVNjcm9sbENvbnRhaW5lciA9IGZ1bmN0aW9uKClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmlzX21heF9wYWdlZCA9IGZhbHNlOyAvL2ZvciBsb2FkIG1vcmUgb25seSwgb25jZSB3ZSBkZXRlY3Qgd2UncmUgYXQgdGhlIGVuZCBzZXQgdGhpcyB0byB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMudXNlX3Njcm9sbF9sb2FkZXIgPSAkdGhpcy5hdHRyKCdkYXRhLXNob3ctc2Nyb2xsLWxvYWRlcicpOyAvL2ZvciBsb2FkIG1vcmUgb25seSwgb25jZSB3ZSBkZXRlY3Qgd2UncmUgYXQgdGhlIGVuZCBzZXQgdGhpcyB0byB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMuaW5maW5pdGVfc2Nyb2xsX2NvbnRhaW5lciA9ICR0aGlzLmF0dHIoJ2RhdGEtaW5maW5pdGUtc2Nyb2xsLWNvbnRhaW5lcicpOyAvL2ZvciBsb2FkIG1vcmUgb25seSwgb25jZSB3ZSBkZXRlY3Qgd2UncmUgYXQgdGhlIGVuZCBzZXQgdGhpcyB0byB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMuaW5maW5pdGVfc2Nyb2xsX3RyaWdnZXJfYW1vdW50ID0gJHRoaXMuYXR0cignZGF0YS1pbmZpbml0ZS1zY3JvbGwtdHJpZ2dlcicpO1xyXG4gICAgICAgICAgICB0aGlzLmluZmluaXRlX3Njcm9sbF9yZXN1bHRfY2xhc3MgPSAkdGhpcy5hdHRyKCdkYXRhLWluZmluaXRlLXNjcm9sbC1yZXN1bHQtY2xhc3MnKTtcclxuICAgICAgICAgICAgdGhpcy4kaW5maW5pdGVfc2Nyb2xsX2NvbnRhaW5lciA9IHRoaXMuJGFqYXhfcmVzdWx0c19jb250YWluZXI7XHJcblxyXG4gICAgICAgICAgICBpZih0eXBlb2YodGhpcy5pbmZpbml0ZV9zY3JvbGxfY29udGFpbmVyKT09XCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbmZpbml0ZV9zY3JvbGxfY29udGFpbmVyID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGluZmluaXRlX3Njcm9sbF9jb250YWluZXIgPSBqUXVlcnkoJHRoaXMuYXR0cignZGF0YS1pbmZpbml0ZS1zY3JvbGwtY29udGFpbmVyJykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZih0eXBlb2YodGhpcy5pbmZpbml0ZV9zY3JvbGxfcmVzdWx0X2NsYXNzKT09XCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbmZpbml0ZV9zY3JvbGxfcmVzdWx0X2NsYXNzID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodHlwZW9mKHRoaXMudXNlX3Njcm9sbF9sb2FkZXIpPT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZV9zY3JvbGxfbG9hZGVyID0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2V0SW5maW5pdGVTY3JvbGxDb250YWluZXIoKTtcclxuXHJcbiAgICAgICAgLyogZnVuY3Rpb25zICovXHJcblxyXG4gICAgICAgIHRoaXMucmVzZXQgPSBmdW5jdGlvbihzdWJtaXRfZm9ybSlcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlc2V0Rm9ybShzdWJtaXRfZm9ybSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pbnB1dFVwZGF0ZSA9IGZ1bmN0aW9uKGRlbGF5RHVyYXRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0eXBlb2YoZGVsYXlEdXJhdGlvbik9PVwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBkZWxheUR1cmF0aW9uID0gMzAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZWxmLnJlc2V0VGltZXIoZGVsYXlEdXJhdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmRhdGVJbnB1dFR5cGUgPSBmdW5jdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgJHRoaXNlID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIGlmKChzZWxmLmF1dG9fdXBkYXRlPT0xKXx8KHNlbGYuYXV0b19jb3VudF9yZWZyZXNoX21vZGU9PTEpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJHRmX2RhdGVfcGlja2VycyA9ICR0aGlzLmZpbmQoXCIuc2YtZGF0ZXBpY2tlclwiKTtcclxuICAgICAgICAgICAgICAgIHZhciBub19kYXRlX3BpY2tlcnMgPSAkdGZfZGF0ZV9waWNrZXJzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihub19kYXRlX3BpY2tlcnM+MSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoZW4gaXQgaXMgYSBkYXRlIHJhbmdlLCBzbyBtYWtlIHN1cmUgYm90aCBmaWVsZHMgYXJlIGZpbGxlZCBiZWZvcmUgdXBkYXRpbmdcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZHBfY291bnRlciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRwX2VtcHR5X2ZpZWxkX2NvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAkdGZfZGF0ZV9waWNrZXJzLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZigkKHRoaXMpLnZhbCgpPT1cIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcF9lbXB0eV9maWVsZF9jb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcF9jb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRwX2VtcHR5X2ZpZWxkX2NvdW50PT0wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaW5wdXRVcGRhdGUoMTIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pbnB1dFVwZGF0ZSgxMjAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHRoaXMuc2Nyb2xsVG9Qb3MgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG9mZnNldCA9IDA7XHJcbiAgICAgICAgICAgIHZhciBjYW5TY3JvbGwgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYoc2VsZi5pc19hamF4PT0xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihzZWxmLnNjcm9sbF90b19wb3M9PVwid2luZG93XCIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHNlbGYuc2Nyb2xsX3RvX3Bvcz09XCJmb3JtXCIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gJHRoaXMub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihzZWxmLnNjcm9sbF90b19wb3M9PVwicmVzdWx0c1wiKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuJGFqYXhfcmVzdWx0c19jb250YWluZXIubGVuZ3RoPjApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSBzZWxmLiRhamF4X3Jlc3VsdHNfY29udGFpbmVyLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHNlbGYuc2Nyb2xsX3RvX3Bvcz09XCJjdXN0b21cIilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2N1c3RvbV9zY3JvbGxfdG9cclxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLiRjdXN0b21fc2Nyb2xsX3RvLmxlbmd0aD4wKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gc2VsZi4kY3VzdG9tX3Njcm9sbF90by5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhblNjcm9sbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGNhblNjcm9sbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiaHRtbCwgYm9keVwiKS5zdG9wKCkuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogb2Zmc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgXCJub3JtYWxcIiwgXCJlYXNlT3V0UXVhZFwiICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5hdHRhY2hBY3RpdmVDbGFzcyA9IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICAvL2NoZWNrIHRvIHNlZSBpZiB3ZSBhcmUgdXNpbmcgYWpheCAmIGF1dG8gY291bnRcclxuICAgICAgICAgICAgLy9pZiBub3QsIHRoZSBzZWFyY2ggZm9ybSBkb2VzIG5vdCBnZXQgcmVsb2FkZWQsIHNvIHdlIG5lZWQgdG8gdXBkYXRlIHRoZSBzZi1vcHRpb24tYWN0aXZlIGNsYXNzIG9uIGFsbCBmaWVsZHNcclxuXHJcbiAgICAgICAgICAgICR0aGlzLm9uKCdjaGFuZ2UnLCAnaW5wdXRbdHlwZT1cInJhZGlvXCJdLCBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0sIHNlbGVjdCcsIGZ1bmN0aW9uKGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciAkY3RoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgdmFyICRjdGhpc19wYXJlbnQgPSAkY3RoaXMucGFyZW50KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGhpc190YWcgPSAkY3RoaXMucHJvcChcInRhZ05hbWVcIikudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dF90eXBlID0gJGN0aGlzLmF0dHIoXCJ0eXBlXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudF90YWcgPSAkY3RoaXNfcGFyZW50LnByb3AoXCJ0YWdOYW1lXCIpLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoKHRoaXNfdGFnPT1cImlucHV0XCIpJiYoKGlucHV0X3R5cGU9PVwicmFkaW9cIil8fChpbnB1dF90eXBlPT1cImNoZWNrYm94XCIpKSAmJiAocGFyZW50X3RhZz09XCJsaVwiKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgJGFsbF9vcHRpb25zID0gJGN0aGlzX3BhcmVudC5wYXJlbnQoKS5maW5kKCdsaScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciAkYWxsX29wdGlvbnNfZmllbGRzID0gJGN0aGlzX3BhcmVudC5wYXJlbnQoKS5maW5kKCdpbnB1dDpjaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRhbGxfb3B0aW9ucy5yZW1vdmVDbGFzcyhcInNmLW9wdGlvbi1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgJGFsbF9vcHRpb25zX2ZpZWxkcy5lYWNoKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdChcImxpXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LmFkZENsYXNzKFwic2Ytb3B0aW9uLWFjdGl2ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzX3RhZz09XCJzZWxlY3RcIilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgJGFsbF9vcHRpb25zID0gJGN0aGlzLmNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGFsbF9vcHRpb25zLnJlbW92ZUNsYXNzKFwic2Ytb3B0aW9uLWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGhpc192YWwgPSAkY3RoaXMudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGlzX2Fycl92YWwgPSAodHlwZW9mIHRoaXNfdmFsID09ICdzdHJpbmcnIHx8IHRoaXNfdmFsIGluc3RhbmNlb2YgU3RyaW5nKSA/IFt0aGlzX3ZhbF0gOiB0aGlzX3ZhbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzX2Fycl92YWwpLmVhY2goZnVuY3Rpb24oaSwgdmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkY3RoaXMuZmluZChcIm9wdGlvblt2YWx1ZT0nXCIrdmFsdWUrXCInXVwiKS5hZGRDbGFzcyhcInNmLW9wdGlvbi1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5pbml0QXV0b1VwZGF0ZUV2ZW50cyA9IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICAvKiBhdXRvIHVwZGF0ZSAqL1xyXG4gICAgICAgICAgICBpZigoc2VsZi5hdXRvX3VwZGF0ZT09MSl8fChzZWxmLmF1dG9fY291bnRfcmVmcmVzaF9tb2RlPT0xKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJHRoaXMub24oJ2NoYW5nZScsICdpbnB1dFt0eXBlPVwicmFkaW9cIl0sIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXSwgc2VsZWN0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaW5wdXRVcGRhdGUoMjAwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vJHRoaXMub24oJ2NoYW5nZScsICcubWV0YS1zbGlkZXInLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBzZWxmLmlucHV0VXBkYXRlKDIwMCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBjb25zb2xlLmxvZyhcIkNIQU5HRSBNRVRBIFNMSURFUlwiKTtcclxuICAgICAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHRoaXMub24oJ2lucHV0JywgJ2lucHV0W3R5cGU9XCJudW1iZXJcIl0nLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pbnB1dFVwZGF0ZSg4MDApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyICR0ZXh0SW5wdXQgPSAkdGhpcy5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXTpub3QoLnNmLWRhdGVwaWNrZXIpJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGFzdFZhbHVlID0gJHRleHRJbnB1dC52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkdGhpcy5vbignaW5wdXQnLCAnaW5wdXRbdHlwZT1cInRleHRcIl06bm90KC5zZi1kYXRlcGlja2VyKScsIGZ1bmN0aW9uKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihsYXN0VmFsdWUhPSR0ZXh0SW5wdXQudmFsKCkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmlucHV0VXBkYXRlKDEyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFZhbHVlID0gJHRleHRJbnB1dC52YWwoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkdGhpcy5vbigna2V5cHJlc3MnLCAnaW5wdXRbdHlwZT1cInRleHRcIl06bm90KC5zZi1kYXRlcGlja2VyKScsIGZ1bmN0aW9uKGUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUud2hpY2ggPT0gMTMpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN1Ym1pdEZvcm0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyR0aGlzLm9uKCdpbnB1dCcsICdpbnB1dC5zZi1kYXRlcGlja2VyJywgc2VsZi5kYXRlSW5wdXRUeXBlKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL3RoaXMuaW5pdEF1dG9VcGRhdGVFdmVudHMoKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuY2xlYXJUaW1lciA9IGZ1bmN0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChzZWxmLmlucHV0VGltZXIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5yZXNldFRpbWVyID0gZnVuY3Rpb24oZGVsYXlEdXJhdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChzZWxmLmlucHV0VGltZXIpO1xyXG4gICAgICAgICAgICBzZWxmLmlucHV0VGltZXIgPSBzZXRUaW1lb3V0KHNlbGYuZm9ybVVwZGF0ZWQsIGRlbGF5RHVyYXRpb24pO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmFkZERhdGVQaWNrZXJzID0gZnVuY3Rpb24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyICRkYXRlX3BpY2tlciA9ICR0aGlzLmZpbmQoXCIuc2YtZGF0ZXBpY2tlclwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmKCRkYXRlX3BpY2tlci5sZW5ndGg+MClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJGRhdGVfcGlja2VyLmVhY2goZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0ZUZvcm1hdCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGVEcm9wZG93blllYXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0ZURyb3Bkb3duTW9udGggPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICRjbG9zZXN0X2RhdGVfd3JhcCA9ICR0aGlzLmNsb3Nlc3QoXCIuc2ZfZGF0ZV9maWVsZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZigkY2xvc2VzdF9kYXRlX3dyYXAubGVuZ3RoPjApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlRm9ybWF0ID0gJGNsb3Nlc3RfZGF0ZV93cmFwLmF0dHIoXCJkYXRhLWRhdGUtZm9ybWF0XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoJGNsb3Nlc3RfZGF0ZV93cmFwLmF0dHIoXCJkYXRhLWRhdGUtdXNlLXllYXItZHJvcGRvd25cIik9PTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVEcm9wZG93blllYXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCRjbG9zZXN0X2RhdGVfd3JhcC5hdHRyKFwiZGF0YS1kYXRlLXVzZS1tb250aC1kcm9wZG93blwiKT09MSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZURyb3Bkb3duTW9udGggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0ZVBpY2tlck9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd090aGVyTW9udGhzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDogZnVuY3Rpb24oKXsgc2VsZi5kYXRlU2VsZWN0KCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVGb3JtYXQ6IGRhdGVGb3JtYXQsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VNb250aDogZGF0ZURyb3Bkb3duTW9udGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZVllYXI6IGRhdGVEcm9wZG93blllYXJcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmlzX3J0bD09MSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVQaWNrZXJPcHRpb25zLmRpcmVjdGlvbiA9IFwicnRsXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkdGhpcy5kYXRlcGlja2VyKGRhdGVQaWNrZXJPcHRpb25zKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5sYW5nX2NvZGUhPVwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmRhdGVwaWNrZXIuc2V0RGVmYXVsdHMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmV4dGVuZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7J2RhdGVGb3JtYXQnOmRhdGVGb3JtYXR9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZGF0ZXBpY2tlci5yZWdpb25hbFsgc2VsZi5sYW5nX2NvZGVdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmRhdGVwaWNrZXIuc2V0RGVmYXVsdHMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmV4dGVuZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7J2RhdGVGb3JtYXQnOmRhdGVGb3JtYXR9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZGF0ZXBpY2tlci5yZWdpb25hbFtcImVuXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZigkKCcubGwtc2tpbi1tZWxvbicpLmxlbmd0aD09MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAkZGF0ZV9waWNrZXIuZGF0ZXBpY2tlcignd2lkZ2V0Jykud3JhcCgnPGRpdiBjbGFzcz1cImxsLXNraW4tbWVsb24gc2VhcmNoYW5kZmlsdGVyLWRhdGUtcGlja2VyXCIvPicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZGF0ZVNlbGVjdCA9IGZ1bmN0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICBpZigoc2VsZi5hdXRvX3VwZGF0ZT09MSl8fChzZWxmLmF1dG9fY291bnRfcmVmcmVzaF9tb2RlPT0xKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyICR0Zl9kYXRlX3BpY2tlcnMgPSAkdGhpcy5maW5kKFwiLnNmLWRhdGVwaWNrZXJcIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9fZGF0ZV9waWNrZXJzID0gJHRmX2RhdGVfcGlja2Vycy5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYobm9fZGF0ZV9waWNrZXJzPjEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGVuIGl0IGlzIGEgZGF0ZSByYW5nZSwgc28gbWFrZSBzdXJlIGJvdGggZmllbGRzIGFyZSBmaWxsZWQgYmVmb3JlIHVwZGF0aW5nXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRwX2NvdW50ZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkcF9lbXB0eV9maWVsZF9jb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgJHRmX2RhdGVfcGlja2Vycy5lYWNoKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZigkKHRoaXMpLnZhbCgpPT1cIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcF9lbXB0eV9maWVsZF9jb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcF9jb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRwX2VtcHR5X2ZpZWxkX2NvdW50PT0wKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pbnB1dFVwZGF0ZSgxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pbnB1dFVwZGF0ZSgxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmFkZFJhbmdlU2xpZGVycyA9IGZ1bmN0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciAkbWV0YV9yYW5nZSA9ICR0aGlzLmZpbmQoXCIuc2YtbWV0YS1yYW5nZS1zbGlkZXJcIik7XHJcblxyXG4gICAgICAgICAgICBpZigkbWV0YV9yYW5nZS5sZW5ndGg+MClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJG1ldGFfcmFuZ2UuZWFjaChmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtaW4gPSAkdGhpcy5hdHRyKFwiZGF0YS1taW5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1heCA9ICR0aGlzLmF0dHIoXCJkYXRhLW1heFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc21pbiA9ICR0aGlzLmF0dHIoXCJkYXRhLXN0YXJ0LW1pblwiKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc21heCA9ICR0aGlzLmF0dHIoXCJkYXRhLXN0YXJ0LW1heFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGlzcGxheV92YWx1ZV9hcyA9ICR0aGlzLmF0dHIoXCJkYXRhLWRpc3BsYXktdmFsdWVzLWFzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGVwID0gJHRoaXMuYXR0cihcImRhdGEtc3RlcFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgJHN0YXJ0X3ZhbCA9ICR0aGlzLmZpbmQoJy5zZi1yYW5nZS1taW4nKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgJGVuZF92YWwgPSAkdGhpcy5maW5kKCcuc2YtcmFuZ2UtbWF4Jyk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGVjaW1hbF9wbGFjZXMgPSAkdGhpcy5hdHRyKFwiZGF0YS1kZWNpbWFsLXBsYWNlc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGhvdXNhbmRfc2VwZXJhdG9yID0gJHRoaXMuYXR0cihcImRhdGEtdGhvdXNhbmQtc2VwZXJhdG9yXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWNpbWFsX3NlcGVyYXRvciA9ICR0aGlzLmF0dHIoXCJkYXRhLWRlY2ltYWwtc2VwZXJhdG9yXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmllbGRfZm9ybWF0ID0gd051bWIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrOiBkZWNpbWFsX3NlcGVyYXRvcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVjaW1hbHM6IHBhcnNlRmxvYXQoZGVjaW1hbF9wbGFjZXMpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aG91c2FuZDogdGhvdXNhbmRfc2VwZXJhdG9yXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1pbl91bmZvcm1hdHRlZCA9IHBhcnNlRmxvYXQoc21pbik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1pbl9mb3JtYXR0ZWQgPSBmaWVsZF9mb3JtYXQudG8ocGFyc2VGbG9hdChzbWluKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1heF9mb3JtYXR0ZWQgPSBmaWVsZF9mb3JtYXQudG8ocGFyc2VGbG9hdChzbWF4KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1heF91bmZvcm1hdHRlZCA9IHBhcnNlRmxvYXQoc21heCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9hbGVydChtaW5fZm9ybWF0dGVkKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2FsZXJ0KG1heF9mb3JtYXR0ZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vYWxlcnQoZGlzcGxheV92YWx1ZV9hcyk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihkaXNwbGF5X3ZhbHVlX2FzPT1cInRleHRpbnB1dFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXJ0X3ZhbC52YWwobWluX2Zvcm1hdHRlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbmRfdmFsLnZhbChtYXhfZm9ybWF0dGVkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihkaXNwbGF5X3ZhbHVlX2FzPT1cInRleHRcIilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzdGFydF92YWwuaHRtbChtaW5fZm9ybWF0dGVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGVuZF92YWwuaHRtbChtYXhfZm9ybWF0dGVkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbm9VSU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbWluJzogWyBwYXJzZUZsb2F0KG1pbikgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtYXgnOiBbIHBhcnNlRmxvYXQobWF4KSBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBbbWluX2Zvcm1hdHRlZCwgbWF4X2Zvcm1hdHRlZF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXM6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXA6IHBhcnNlRmxvYXQoc3RlcCksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZWhhdmlvdXI6ICdleHRlbmQtdGFwJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBmaWVsZF9mb3JtYXRcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuaXNfcnRsPT0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9VSU9wdGlvbnMuZGlyZWN0aW9uID0gXCJydGxcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vJCh0aGlzKS5maW5kKFwiLm1ldGEtc2xpZGVyXCIpLm5vVWlTbGlkZXIobm9VSU9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGVyX29iamVjdCA9ICQodGhpcykuZmluZChcIi5tZXRhLXNsaWRlclwiKVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiggc2xpZGVyX29iamVjdC5ub1VpU2xpZGVyICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVzdHJveSBpZiBpdCBleGlzdHMuLiB0aGlzIG1lYW5zIHNvbWVob3cgYW5vdGhlciBpbnN0YW5jZSBoYWQgaW5pdGlhbGlzZWQgaXQuLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXJfb2JqZWN0Lm5vVWlTbGlkZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHR5cGVvZihzbGlkZXJfb2JqZWN0Lm5vVWlTbGlkZXIpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5vVWlTbGlkZXIuY3JlYXRlKHNsaWRlcl9vYmplY3QsIG5vVUlPcHRpb25zKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHN0YXJ0X3ZhbC5vZmYoKTtcclxuICAgICAgICAgICAgICAgICAgICAkc3RhcnRfdmFsLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXJfb2JqZWN0Lm5vVWlTbGlkZXIuc2V0KFskKHRoaXMpLnZhbCgpLCBudWxsXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRlbmRfdmFsLm9mZigpO1xyXG4gICAgICAgICAgICAgICAgICAgICRlbmRfdmFsLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXJfb2JqZWN0Lm5vVWlTbGlkZXIuc2V0KFtudWxsLCAkKHRoaXMpLnZhbCgpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vJHN0YXJ0X3ZhbC5odG1sKG1pbl9mb3JtYXR0ZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vJGVuZF92YWwuaHRtbChtYXhfZm9ybWF0dGVkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyX29iamVjdC5ub1VpU2xpZGVyLm9mZigndXBkYXRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyX29iamVjdC5ub1VpU2xpZGVyLm9uKCd1cGRhdGUnLCBmdW5jdGlvbiggdmFsdWVzLCBoYW5kbGUgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGVyX3N0YXJ0X3ZhbCAgPSBtaW5fZm9ybWF0dGVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGVyX2VuZF92YWwgID0gbWF4X2Zvcm1hdHRlZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHZhbHVlc1toYW5kbGVdO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggaGFuZGxlICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4X2Zvcm1hdHRlZCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluX2Zvcm1hdHRlZCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkaXNwbGF5X3ZhbHVlX2FzPT1cInRleHRpbnB1dFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhcnRfdmFsLnZhbChtaW5fZm9ybWF0dGVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRlbmRfdmFsLnZhbChtYXhfZm9ybWF0dGVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKGRpc3BsYXlfdmFsdWVfYXM9PVwidGV4dFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhcnRfdmFsLmh0bWwobWluX2Zvcm1hdHRlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZW5kX3ZhbC5odG1sKG1heF9mb3JtYXR0ZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pIHRoaW5rIHRoZSBmdW5jdGlvbiB0aGF0IGJ1aWxkcyB0aGUgVVJMIG5lZWRzIHRvIGRlY29kZSB0aGUgZm9ybWF0dGVkIHN0cmluZyBiZWZvcmUgYWRkaW5nIHRvIHRoZSB1cmxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoKHNlbGYuYXV0b191cGRhdGU9PTEpfHwoc2VsZi5hdXRvX2NvdW50X3JlZnJlc2hfbW9kZT09MSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vb25seSB0cnkgdG8gdXBkYXRlIGlmIHRoZSB2YWx1ZXMgaGF2ZSBhY3R1YWxseSBjaGFuZ2VkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZigoc2xpZGVyX3N0YXJ0X3ZhbCE9bWluX2Zvcm1hdHRlZCl8fChzbGlkZXJfZW5kX3ZhbCE9bWF4X2Zvcm1hdHRlZCkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pbnB1dFVwZGF0ZSg4MDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5jbGVhclRpbWVyKCk7IC8vaWdub3JlIGFueSBjaGFuZ2VzIHJlY2VudGx5IG1hZGUgYnkgdGhlIHNsaWRlciAodGhpcyB3YXMganVzdCBpbml0IHNob3VsZG4ndCBjb3VudCBhcyBhbiB1cGRhdGUgZXZlbnQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmluaXQgPSBmdW5jdGlvbihrZWVwX3BhZ2luYXRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0eXBlb2Yoa2VlcF9wYWdpbmF0aW9uKT09XCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGtlZXBfcGFnaW5hdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluaXRBdXRvVXBkYXRlRXZlbnRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0YWNoQWN0aXZlQ2xhc3MoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkRGF0ZVBpY2tlcnMoKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRSYW5nZVNsaWRlcnMoKTtcclxuXHJcbiAgICAgICAgICAgIC8vaW5pdCBjb21ibyBib3hlc1xyXG4gICAgICAgICAgICB2YXIgJGNvbWJvYm94ID0gJHRoaXMuZmluZChcInNlbGVjdFtkYXRhLWNvbWJvYm94PScxJ11cIik7XHJcblxyXG4gICAgICAgICAgICBpZigkY29tYm9ib3gubGVuZ3RoPjApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICRjb21ib2JveC5lYWNoKGZ1bmN0aW9uKGluZGV4ICl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICR0aGlzY2IgPSAkKCB0aGlzICk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ybSA9ICR0aGlzY2IuYXR0cihcImRhdGEtY29tYm9ib3gtbnJtXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mICR0aGlzY2IuY2hvc2VuICE9IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2hvc2Vub3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaF9jb250YWluczogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoKHR5cGVvZihucm0pIT09XCJ1bmRlZmluZWRcIikmJihucm0pKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNob3Nlbm9wdGlvbnMubm9fcmVzdWx0c190ZXh0ID0gbnJtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNhZmUgdG8gdXNlIHRoZSBmdW5jdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlYXJjaF9jb250YWluc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmlzX3J0bD09MSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXNjYi5hZGRDbGFzcyhcImNob3Nlbi1ydGxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzY2IuY2hvc2VuKGNob3Nlbm9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdDJvcHRpb25zID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmlzX3J0bD09MSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0Mm9wdGlvbnMuZGlyID0gXCJydGxcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZigodHlwZW9mKG5ybSkhPT1cInVuZGVmaW5lZFwiKSYmKG5ybSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0Mm9wdGlvbnMubGFuZ3VhZ2U9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5vUmVzdWx0c1wiOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnJtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzY2Iuc2VsZWN0MihzZWxlY3Qyb3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9pZiBhamF4IGlzIGVuYWJsZWQgaW5pdCB0aGUgcGFnaW5hdGlvblxyXG4gICAgICAgICAgICBpZihzZWxmLmlzX2FqYXg9PTEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0dXBBamF4UGFnaW5hdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkdGhpcy5zdWJtaXQodGhpcy5zdWJtaXRGb3JtKTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuaW5pdFdvb0NvbW1lcmNlQ29udHJvbHMoKTsgLy93b29jb21tZXJjZSBvcmRlcmJ5XHJcblxyXG4gICAgICAgICAgICBpZihrZWVwX3BhZ2luYXRpb249PWZhbHNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxhc3Rfc3VibWl0X3F1ZXJ5X3BhcmFtcyA9IHNlbGYuZ2V0VXJsUGFyYW1zKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5vbldpbmRvd1Njcm9sbCA9IGZ1bmN0aW9uKGV2ZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoKCFzZWxmLmlzX2xvYWRpbmdfbW9yZSkgJiYgKCFzZWxmLmlzX21heF9wYWdlZCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB3aW5kb3dfc2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHdpbmRvd19zY3JvbGxfYm90dG9tID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpICsgJCh3aW5kb3cpLmhlaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbF9vZmZzZXQgPSBwYXJzZUludChzZWxmLmluZmluaXRlX3Njcm9sbF90cmlnZ2VyX2Ftb3VudCk7Ly9zZWxmLmluZmluaXRlX3Njcm9sbF90cmlnZ2VyX2Ftb3VudDtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3ZhciAkYWpheF9yZXN1bHRzX2NvbnRhaW5lciA9IGpRdWVyeSgkdGhpcy5hdHRyKFwiZGF0YS1hamF4LXRhcmdldFwiKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoc2VsZi4kaW5maW5pdGVfc2Nyb2xsX2NvbnRhaW5lci5sZW5ndGg9PTEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdHNfc2Nyb2xsX2JvdHRvbSA9IHNlbGYuJGluZmluaXRlX3Njcm9sbF9jb250YWluZXIub2Zmc2V0KCkudG9wICsgc2VsZi4kaW5maW5pdGVfc2Nyb2xsX2NvbnRhaW5lci5oZWlnaHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgb2Zmc2V0ID0gKCRhamF4X3Jlc3VsdHNfY29udGFpbmVyLm9mZnNldCgpLnRvcCArICRhamF4X3Jlc3VsdHNfY29udGFpbmVyLmhlaWdodCgpKSAtIHdpbmRvd19zY3JvbGw7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldCA9IChzZWxmLiRpbmZpbml0ZV9zY3JvbGxfY29udGFpbmVyLm9mZnNldCgpLnRvcCArIHNlbGYuJGluZmluaXRlX3Njcm9sbF9jb250YWluZXIuaGVpZ2h0KCkpIC0gd2luZG93X3Njcm9sbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYod2luZG93X3Njcm9sbF9ib3R0b20gPiByZXN1bHRzX3Njcm9sbF9ib3R0b20gKyBzY3JvbGxfb2Zmc2V0KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2FkTW9yZVJlc3VsdHMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHsvL2RvbnQgbG9hZCBtb3JlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyppZih0aGlzLmRlYnVnX21vZGU9PVwiMVwiKVxyXG4gICAgICAgICB7Ly9lcnJvciBsb2dnaW5nXHJcblxyXG4gICAgICAgICBpZihzZWxmLmlzX2FqYXg9PTEpXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgaWYoc2VsZi5kaXNwbGF5X3Jlc3VsdHNfYXM9PVwic2hvcnRjb2RlXCIpXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgaWYoc2VsZi4kYWpheF9yZXN1bHRzX2NvbnRhaW5lci5sZW5ndGg9PTApXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgY29uc29sZS5sb2coXCJTZWFyY2ggJiBGaWx0ZXIgfCBGb3JtIElEOiBcIitzZWxmLnNmaWQrXCI6IGNhbm5vdCBmaW5kIHRoZSByZXN1bHRzIGNvbnRhaW5lciBvbiB0aGlzIHBhZ2UgLSBlbnN1cmUgeW91IHVzZSB0aGUgc2hvcnRjb2RlIG9uIHRoaXMgcGFnZSBvciBwcm92aWRlIGEgVVJMIHdoZXJlIGl0IGNhbiBiZSBmb3VuZCAoUmVzdWx0cyBVUkwpXCIpO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIGlmKHNlbGYucmVzdWx0c191cmw9PVwiXCIpXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgY29uc29sZS5sb2coXCJTZWFyY2ggJiBGaWx0ZXIgfCBGb3JtIElEOiBcIitzZWxmLnNmaWQrXCI6IE5vIFJlc3VsdHMgVVJMIGhhcyBiZWVuIGRlZmluZWQgLSBlbnN1cmUgdGhhdCB5b3UgZW50ZXIgdGhpcyBpbiBvcmRlciB0byB1c2UgdGhlIFNlYXJjaCBGb3JtIG9uIGFueSBwYWdlKVwiKTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICAvL2NoZWNrIGlmIHJlc3VsdHMgVVJMIGlzIG9uIHNhbWUgZG9tYWluIGZvciBwb3RlbnRpYWwgY3Jvc3MgZG9tYWluIGVycm9yc1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIGVsc2VcclxuICAgICAgICAge1xyXG4gICAgICAgICBpZihzZWxmLiRhamF4X3Jlc3VsdHNfY29udGFpbmVyLmxlbmd0aD09MClcclxuICAgICAgICAge1xyXG4gICAgICAgICBjb25zb2xlLmxvZyhcIlNlYXJjaCAmIEZpbHRlciB8IEZvcm0gSUQ6IFwiK3NlbGYuc2ZpZCtcIjogY2Fubm90IGZpbmQgdGhlIHJlc3VsdHMgY29udGFpbmVyIG9uIHRoaXMgcGFnZSAtIGVuc3VyZSB5b3UgdXNlIGFyZSB1c2luZyB0aGUgcmlnaHQgY29udGVudCBzZWxlY3RvclwiKTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgZWxzZVxyXG4gICAgICAgICB7XHJcblxyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICB9Ki9cclxuXHJcblxyXG4gICAgICAgIHRoaXMuc3RyaXBRdWVyeVN0cmluZ0FuZEhhc2hGcm9tUGF0aCA9IGZ1bmN0aW9uKHVybCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdXJsLnNwbGl0KFwiP1wiKVswXS5zcGxpdChcIiNcIilbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmd1cCA9IGZ1bmN0aW9uKCBuYW1lLCB1cmwgKSB7XHJcbiAgICAgICAgICAgIGlmICghdXJsKSB1cmwgPSBsb2NhdGlvbi5ocmVmXHJcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1tcXFtdLyxcIlxcXFxcXFtcIikucmVwbGFjZSgvW1xcXV0vLFwiXFxcXFxcXVwiKTtcclxuICAgICAgICAgICAgdmFyIHJlZ2V4UyA9IFwiW1xcXFw/Jl1cIituYW1lK1wiPShbXiYjXSopXCI7XHJcbiAgICAgICAgICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAoIHJlZ2V4UyApO1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0cyA9IHJlZ2V4LmV4ZWMoIHVybCApO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cyA9PSBudWxsID8gbnVsbCA6IHJlc3VsdHNbMV07XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuZ2V0VXJsUGFyYW1zID0gZnVuY3Rpb24oa2VlcF9wYWdpbmF0aW9uLCB0eXBlLCBleGNsdWRlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodHlwZW9mKGtlZXBfcGFnaW5hdGlvbik9PVwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBrZWVwX3BhZ2luYXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qaWYodHlwZW9mKGV4Y2x1ZGUpPT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgdmFyIGV4Y2x1ZGUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgfSovXHJcblxyXG4gICAgICAgICAgICBpZih0eXBlb2YodHlwZSk9PVwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB0eXBlID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHVybF9wYXJhbXNfc3RyID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIC8vIGdldCBhbGwgcGFyYW1zIGZyb20gZmllbGRzXHJcbiAgICAgICAgICAgIHZhciB1cmxfcGFyYW1zX2FycmF5ID0gcHJvY2Vzc19mb3JtLmdldFVybFBhcmFtcyhzZWxmKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBsZW5ndGggPSBPYmplY3Qua2V5cyh1cmxfcGFyYW1zX2FycmF5KS5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhciBjb3VudCA9IDA7XHJcblxyXG4gICAgICAgICAgICBpZih0eXBlb2YoZXhjbHVkZSkhPVwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmICh1cmxfcGFyYW1zX2FycmF5Lmhhc093blByb3BlcnR5KGV4Y2x1ZGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3RoLS07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGxlbmd0aD4wKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrIGluIHVybF9wYXJhbXNfYXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXJsX3BhcmFtc19hcnJheS5oYXNPd25Qcm9wZXJ0eShrKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhbl9hZGQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YoZXhjbHVkZSkhPVwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGs9PWV4Y2x1ZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5fYWRkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNhbl9hZGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybF9wYXJhbXNfc3RyICs9IGsgKyBcIj1cIiArIHVybF9wYXJhbXNfYXJyYXlba107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50IDwgbGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybF9wYXJhbXNfc3RyICs9IFwiJlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBxdWVyeV9wYXJhbXMgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgLy9mb3JtIHBhcmFtcyBhcyB1cmwgcXVlcnkgc3RyaW5nXHJcbiAgICAgICAgICAgIC8vdmFyIGZvcm1fcGFyYW1zID0gdXJsX3BhcmFtc19zdHIucmVwbGFjZUFsbChcIiUyQlwiLCBcIitcIikucmVwbGFjZUFsbChcIiUyQ1wiLCBcIixcIilcclxuICAgICAgICAgICAgdmFyIGZvcm1fcGFyYW1zID0gdXJsX3BhcmFtc19zdHI7XHJcblxyXG4gICAgICAgICAgICAvL2dldCB1cmwgcGFyYW1zIGZyb20gdGhlIGZvcm0gaXRzZWxmICh3aGF0IHRoZSB1c2VyIGhhcyBzZWxlY3RlZClcclxuICAgICAgICAgICAgcXVlcnlfcGFyYW1zID0gc2VsZi5qb2luVXJsUGFyYW0ocXVlcnlfcGFyYW1zLCBmb3JtX3BhcmFtcyk7XHJcblxyXG4gICAgICAgICAgICAvL2FkZCBwYWdpbmF0aW9uXHJcbiAgICAgICAgICAgIGlmKGtlZXBfcGFnaW5hdGlvbj09dHJ1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhZ2VOdW1iZXIgPSBzZWxmLiRhamF4X3Jlc3VsdHNfY29udGFpbmVyLmF0dHIoXCJkYXRhLXBhZ2VkXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHR5cGVvZihwYWdlTnVtYmVyKT09XCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlTnVtYmVyID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihwYWdlTnVtYmVyPjEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVlcnlfcGFyYW1zID0gc2VsZi5qb2luVXJsUGFyYW0ocXVlcnlfcGFyYW1zLCBcInNmX3BhZ2VkPVwiK3BhZ2VOdW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2FkZCBzZmlkXHJcbiAgICAgICAgICAgIC8vcXVlcnlfcGFyYW1zID0gc2VsZi5qb2luVXJsUGFyYW0ocXVlcnlfcGFyYW1zLCBcInNmaWQ9XCIrc2VsZi5zZmlkKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCBhbnkgZXh0cmEgcGFyYW1zIChmcm9tIGV4dCBwbHVnaW5zKSBhbmQgYWRkIHRvIHRoZSB1cmwgKGllIHdvb2NvbW1lcmNlIGBvcmRlcmJ5YClcclxuICAgICAgICAgICAgLyp2YXIgZXh0cmFfcXVlcnlfcGFyYW0gPSBcIlwiO1xyXG4gICAgICAgICAgICAgdmFyIGxlbmd0aCA9IE9iamVjdC5rZXlzKHNlbGYuZXh0cmFfcXVlcnlfcGFyYW1zKS5sZW5ndGg7XHJcbiAgICAgICAgICAgICB2YXIgY291bnQgPSAwO1xyXG5cclxuICAgICAgICAgICAgIGlmKGxlbmd0aD4wKVxyXG4gICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgIGZvciAodmFyIGsgaW4gc2VsZi5leHRyYV9xdWVyeV9wYXJhbXMpIHtcclxuICAgICAgICAgICAgIGlmIChzZWxmLmV4dHJhX3F1ZXJ5X3BhcmFtcy5oYXNPd25Qcm9wZXJ0eShrKSkge1xyXG5cclxuICAgICAgICAgICAgIGlmKHNlbGYuZXh0cmFfcXVlcnlfcGFyYW1zW2tdIT1cIlwiKVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgZXh0cmFfcXVlcnlfcGFyYW0gPSBrK1wiPVwiK3NlbGYuZXh0cmFfcXVlcnlfcGFyYW1zW2tdO1xyXG4gICAgICAgICAgICAgcXVlcnlfcGFyYW1zID0gc2VsZi5qb2luVXJsUGFyYW0ocXVlcnlfcGFyYW1zLCBleHRyYV9xdWVyeV9wYXJhbSk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBxdWVyeV9wYXJhbXMgPSBzZWxmLmFkZFF1ZXJ5UGFyYW1zKHF1ZXJ5X3BhcmFtcywgc2VsZi5leHRyYV9xdWVyeV9wYXJhbXMuYWxsKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHR5cGUhPVwiXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vcXVlcnlfcGFyYW1zID0gc2VsZi5hZGRRdWVyeVBhcmFtcyhxdWVyeV9wYXJhbXMsIHNlbGYuZXh0cmFfcXVlcnlfcGFyYW1zW3R5cGVdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5X3BhcmFtcztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hZGRRdWVyeVBhcmFtcyA9IGZ1bmN0aW9uKHF1ZXJ5X3BhcmFtcywgbmV3X3BhcmFtcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBleHRyYV9xdWVyeV9wYXJhbSA9IFwiXCI7XHJcbiAgICAgICAgICAgIHZhciBsZW5ndGggPSBPYmplY3Qua2V5cyhuZXdfcGFyYW1zKS5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhciBjb3VudCA9IDA7XHJcblxyXG4gICAgICAgICAgICBpZihsZW5ndGg+MClcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGsgaW4gbmV3X3BhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdfcGFyYW1zLmhhc093blByb3BlcnR5KGspKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXdfcGFyYW1zW2tdIT1cIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRyYV9xdWVyeV9wYXJhbSA9IGsrXCI9XCIrbmV3X3BhcmFtc1trXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5X3BhcmFtcyA9IHNlbGYuam9pblVybFBhcmFtKHF1ZXJ5X3BhcmFtcywgZXh0cmFfcXVlcnlfcGFyYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcXVlcnlfcGFyYW1zO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkZFVybFBhcmFtID0gZnVuY3Rpb24odXJsLCBzdHJpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYWRkX3BhcmFtcyA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICBpZih1cmwhPVwiXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHVybC5pbmRleE9mKFwiP1wiKSAhPSAtMSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRfcGFyYW1zICs9IFwiJlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdXJsID0gdGhpcy50cmFpbGluZ1NsYXNoSXQodXJsKTtcclxuICAgICAgICAgICAgICAgICAgICBhZGRfcGFyYW1zICs9IFwiP1wiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihzdHJpbmchPVwiXCIpXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdXJsICsgYWRkX3BhcmFtcyArIHN0cmluZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1cmw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmpvaW5VcmxQYXJhbSA9IGZ1bmN0aW9uKHBhcmFtcywgc3RyaW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGFkZF9wYXJhbXMgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgaWYocGFyYW1zIT1cIlwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhZGRfcGFyYW1zICs9IFwiJlwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihzdHJpbmchPVwiXCIpXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zICsgYWRkX3BhcmFtcyArIHN0cmluZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJhbXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnNldEFqYXhSZXN1bHRzVVJMcyA9IGZ1bmN0aW9uKHF1ZXJ5X3BhcmFtcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHR5cGVvZihzZWxmLmFqYXhfcmVzdWx0c19jb25mKT09XCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hamF4X3Jlc3VsdHNfY29uZiA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZWxmLmFqYXhfcmVzdWx0c19jb25mWydwcm9jZXNzaW5nX3VybCddID0gXCJcIjtcclxuICAgICAgICAgICAgc2VsZi5hamF4X3Jlc3VsdHNfY29uZlsncmVzdWx0c191cmwnXSA9IFwiXCI7XHJcbiAgICAgICAgICAgIHNlbGYuYWpheF9yZXN1bHRzX2NvbmZbJ2RhdGFfdHlwZSddID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIC8vaWYoc2VsZi5hamF4X3VybCE9XCJcIilcclxuICAgICAgICAgICAgaWYoc2VsZi5kaXNwbGF5X3Jlc3VsdF9tZXRob2Q9PVwic2hvcnRjb2RlXCIpXHJcbiAgICAgICAgICAgIHsvL3RoZW4gd2Ugd2FudCB0byBkbyBhIHJlcXVlc3QgdG8gdGhlIGFqYXggZW5kcG9pbnRcclxuICAgICAgICAgICAgICAgIHNlbGYuYWpheF9yZXN1bHRzX2NvbmZbJ3Jlc3VsdHNfdXJsJ10gPSBzZWxmLmFkZFVybFBhcmFtKHNlbGYucmVzdWx0c191cmwsIHF1ZXJ5X3BhcmFtcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9hZGQgbGFuZyBjb2RlIHRvIGFqYXggYXBpIHJlcXVlc3QsIGxhbmcgY29kZSBzaG91bGQgYWxyZWFkeSBiZSBpbiB0aGVyZSBmb3Igb3RoZXIgcmVxdWVzdHMgKGllLCBzdXBwbGllZCBpbiB0aGUgUmVzdWx0cyBVUkwpXHJcblxyXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5sYW5nX2NvZGUhPVwiXCIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zbyBhZGQgaXRcclxuICAgICAgICAgICAgICAgICAgICBxdWVyeV9wYXJhbXMgPSBzZWxmLmpvaW5VcmxQYXJhbShxdWVyeV9wYXJhbXMsIFwibGFuZz1cIitzZWxmLmxhbmdfY29kZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5hamF4X3Jlc3VsdHNfY29uZlsncHJvY2Vzc2luZ191cmwnXSA9IHNlbGYuYWRkVXJsUGFyYW0oc2VsZi5hamF4X3VybCwgcXVlcnlfcGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIC8vc2VsZi5hamF4X3Jlc3VsdHNfY29uZlsnZGF0YV90eXBlJ10gPSAnanNvbic7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoc2VsZi5kaXNwbGF5X3Jlc3VsdF9tZXRob2Q9PVwicG9zdF90eXBlX2FyY2hpdmVcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHJvY2Vzc19mb3JtLnNldFRheEFyY2hpdmVSZXN1bHRzVXJsKHNlbGYsIHNlbGYucmVzdWx0c191cmwpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdHNfdXJsID0gcHJvY2Vzc19mb3JtLmdldFJlc3VsdHNVcmwoc2VsZiwgc2VsZi5yZXN1bHRzX3VybCk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5hamF4X3Jlc3VsdHNfY29uZlsncmVzdWx0c191cmwnXSA9IHNlbGYuYWRkVXJsUGFyYW0ocmVzdWx0c191cmwsIHF1ZXJ5X3BhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmFqYXhfcmVzdWx0c19jb25mWydwcm9jZXNzaW5nX3VybCddID0gc2VsZi5hZGRVcmxQYXJhbShyZXN1bHRzX3VybCwgcXVlcnlfcGFyYW1zKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihzZWxmLmRpc3BsYXlfcmVzdWx0X21ldGhvZD09XCJjdXN0b21fd29vY29tbWVyY2Vfc3RvcmVcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHJvY2Vzc19mb3JtLnNldFRheEFyY2hpdmVSZXN1bHRzVXJsKHNlbGYsIHNlbGYucmVzdWx0c191cmwpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdHNfdXJsID0gcHJvY2Vzc19mb3JtLmdldFJlc3VsdHNVcmwoc2VsZiwgc2VsZi5yZXN1bHRzX3VybCk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5hamF4X3Jlc3VsdHNfY29uZlsncmVzdWx0c191cmwnXSA9IHNlbGYuYWRkVXJsUGFyYW0ocmVzdWx0c191cmwsIHF1ZXJ5X3BhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmFqYXhfcmVzdWx0c19jb25mWydwcm9jZXNzaW5nX3VybCddID0gc2VsZi5hZGRVcmxQYXJhbShyZXN1bHRzX3VybCwgcXVlcnlfcGFyYW1zKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7Ly9vdGhlcndpc2Ugd2Ugd2FudCB0byBwdWxsIHRoZSByZXN1bHRzIGRpcmVjdGx5IGZyb20gdGhlIHJlc3VsdHMgcGFnZVxyXG4gICAgICAgICAgICAgICAgc2VsZi5hamF4X3Jlc3VsdHNfY29uZlsncmVzdWx0c191cmwnXSA9IHNlbGYuYWRkVXJsUGFyYW0oc2VsZi5yZXN1bHRzX3VybCwgcXVlcnlfcGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuYWpheF9yZXN1bHRzX2NvbmZbJ3Byb2Nlc3NpbmdfdXJsJ10gPSBzZWxmLmFkZFVybFBhcmFtKHNlbGYuYWpheF91cmwsIHF1ZXJ5X3BhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAvL3NlbGYuYWpheF9yZXN1bHRzX2NvbmZbJ2RhdGFfdHlwZSddID0gJ2h0bWwnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZWxmLmFqYXhfcmVzdWx0c19jb25mWydwcm9jZXNzaW5nX3VybCddID0gc2VsZi5hZGRRdWVyeVBhcmFtcyhzZWxmLmFqYXhfcmVzdWx0c19jb25mWydwcm9jZXNzaW5nX3VybCddLCBzZWxmLmV4dHJhX3F1ZXJ5X3BhcmFtc1snYWpheCddKTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuYWpheF9yZXN1bHRzX2NvbmZbJ2RhdGFfdHlwZSddID0gc2VsZi5hamF4X2RhdGFfdHlwZTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlTG9hZGVyVGFnID0gZnVuY3Rpb24oJG9iamVjdCwgdGFnTmFtZSkge1xyXG5cclxuICAgICAgICAgICAgdmFyICRwYXJlbnQ7XHJcblxyXG4gICAgICAgICAgICBpZihzZWxmLmluZmluaXRlX3Njcm9sbF9yZXN1bHRfY2xhc3MhPVwiXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICRwYXJlbnQgPSBzZWxmLiRpbmZpbml0ZV9zY3JvbGxfY29udGFpbmVyLmZpbmQoc2VsZi5pbmZpbml0ZV9zY3JvbGxfcmVzdWx0X2NsYXNzKS5sYXN0KCkucGFyZW50KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAkcGFyZW50ID0gc2VsZi4kaW5maW5pdGVfc2Nyb2xsX2NvbnRhaW5lcjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHRhZ05hbWUgPSAkcGFyZW50LnByb3AoXCJ0YWdOYW1lXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRhZ1R5cGUgPSAnZGl2JztcclxuICAgICAgICAgICAgaWYoICggdGFnTmFtZS50b0xvd2VyQ2FzZSgpID09ICdvbCcgKSB8fCAoIHRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PSAndWwnICkgKXtcclxuICAgICAgICAgICAgICAgIHRhZ1R5cGUgPSAnbGknO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgJG5ldyA9ICQoJzwnK3RhZ1R5cGUrJyAvPicpLmh0bWwoJG9iamVjdC5odG1sKCkpO1xyXG4gICAgICAgICAgICB2YXIgYXR0cmlidXRlcyA9ICRvYmplY3QucHJvcChcImF0dHJpYnV0ZXNcIik7XHJcblxyXG4gICAgICAgICAgICAvLyBsb29wIHRocm91Z2ggPHNlbGVjdD4gYXR0cmlidXRlcyBhbmQgYXBwbHkgdGhlbSBvbiA8ZGl2PlxyXG4gICAgICAgICAgICAkLmVhY2goYXR0cmlidXRlcywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkbmV3LmF0dHIodGhpcy5uYW1lLCB0aGlzLnZhbHVlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gJG5ldztcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5sb2FkTW9yZVJlc3VsdHMgPSBmdW5jdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZWxmLmlzX2xvYWRpbmdfbW9yZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAvL3RyaWdnZXIgc3RhcnQgZXZlbnRcclxuICAgICAgICAgICAgdmFyIGV2ZW50X2RhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBzZmlkOiBzZWxmLnNmaWQsXHJcbiAgICAgICAgICAgICAgICB0YXJnZXRTZWxlY3Rvcjogc2VsZi5hamF4X3RhcmdldF9hdHRyLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJsb2FkX21vcmVcIixcclxuICAgICAgICAgICAgICAgIG9iamVjdDogc2VsZlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgc2VsZi50cmlnZ2VyRXZlbnQoXCJzZjphamF4c3RhcnRcIiwgZXZlbnRfZGF0YSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcXVlcnlfcGFyYW1zID0gc2VsZi5nZXRVcmxQYXJhbXModHJ1ZSk7XHJcbiAgICAgICAgICAgIHNlbGYubGFzdF9zdWJtaXRfcXVlcnlfcGFyYW1zID0gc2VsZi5nZXRVcmxQYXJhbXMoZmFsc2UpOyAvL2dyYWIgYSBjb3B5IG9mIGh0ZSBVUkwgcGFyYW1zIHdpdGhvdXQgcGFnaW5hdGlvbiBhbHJlYWR5IGFkZGVkXHJcblxyXG4gICAgICAgICAgICB2YXIgYWpheF9wcm9jZXNzaW5nX3VybCA9IFwiXCI7XHJcbiAgICAgICAgICAgIHZhciBhamF4X3Jlc3VsdHNfdXJsID0gXCJcIjtcclxuICAgICAgICAgICAgdmFyIGRhdGFfdHlwZSA9IFwiXCI7XHJcblxyXG5cclxuICAgICAgICAgICAgLy9ub3cgYWRkIHRoZSBuZXcgcGFnaW5hdGlvblxyXG4gICAgICAgICAgICB2YXIgbmV4dF9wYWdlZF9udW1iZXIgPSB0aGlzLmN1cnJlbnRfcGFnZWQgKyAxO1xyXG4gICAgICAgICAgICBxdWVyeV9wYXJhbXMgPSBzZWxmLmpvaW5VcmxQYXJhbShxdWVyeV9wYXJhbXMsIFwic2ZfcGFnZWQ9XCIrbmV4dF9wYWdlZF9udW1iZXIpO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5zZXRBamF4UmVzdWx0c1VSTHMocXVlcnlfcGFyYW1zKTtcclxuICAgICAgICAgICAgYWpheF9wcm9jZXNzaW5nX3VybCA9IHNlbGYuYWpheF9yZXN1bHRzX2NvbmZbJ3Byb2Nlc3NpbmdfdXJsJ107XHJcbiAgICAgICAgICAgIGFqYXhfcmVzdWx0c191cmwgPSBzZWxmLmFqYXhfcmVzdWx0c19jb25mWydyZXN1bHRzX3VybCddO1xyXG4gICAgICAgICAgICBkYXRhX3R5cGUgPSBzZWxmLmFqYXhfcmVzdWx0c19jb25mWydkYXRhX3R5cGUnXTtcclxuXHJcbiAgICAgICAgICAgIC8vYWJvcnQgYW55IHByZXZpb3VzIGFqYXggcmVxdWVzdHNcclxuICAgICAgICAgICAgaWYoc2VsZi5sYXN0X2FqYXhfcmVxdWVzdClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sYXN0X2FqYXhfcmVxdWVzdC5hYm9ydCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihzZWxmLnVzZV9zY3JvbGxfbG9hZGVyPT0xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGxvYWRlciA9ICQoJzxkaXYvPicse1xyXG4gICAgICAgICAgICAgICAgICAgICdjbGFzcyc6ICdzZWFyY2gtZmlsdGVyLXNjcm9sbC1sb2FkaW5nJ1xyXG4gICAgICAgICAgICAgICAgfSk7Ly8uYXBwZW5kVG8oc2VsZi4kYWpheF9yZXN1bHRzX2NvbnRhaW5lcik7XHJcblxyXG4gICAgICAgICAgICAgICAgJGxvYWRlciA9IHNlbGYudXBkYXRlTG9hZGVyVGFnKCRsb2FkZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuaW5maW5pdGVTY3JvbGxBcHBlbmQoJGxvYWRlcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNlbGYubGFzdF9hamF4X3JlcXVlc3QgPSAkLmdldChhamF4X3Byb2Nlc3NpbmdfdXJsLCBmdW5jdGlvbihkYXRhLCBzdGF0dXMsIHJlcXVlc3QpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudF9wYWdlZCsrO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sYXN0X2FqYXhfcmVxdWVzdCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgLyogc2Nyb2xsICovXHJcbiAgICAgICAgICAgICAgICAvL3NlbGYuc2Nyb2xsUmVzdWx0cygpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vdXBkYXRlcyB0aGUgcmVzdXRscyAmIGZvcm0gaHRtbFxyXG4gICAgICAgICAgICAgICAgc2VsZi5hZGRSZXN1bHRzKGRhdGEsIGRhdGFfdHlwZSk7XHJcblxyXG4gICAgICAgICAgICB9LCBkYXRhX3R5cGUpLmZhaWwoZnVuY3Rpb24oanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgZGF0YS5zZmlkID0gc2VsZi5zZmlkO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5vYmplY3QgPSBzZWxmO1xyXG4gICAgICAgICAgICAgICAgZGF0YS50YXJnZXRTZWxlY3RvciA9IHNlbGYuYWpheF90YXJnZXRfYXR0cjtcclxuICAgICAgICAgICAgICAgIGRhdGEuYWpheFVSTCA9IGFqYXhfcHJvY2Vzc2luZ191cmw7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmpxWEhSID0ganFYSFI7XHJcbiAgICAgICAgICAgICAgICBkYXRhLnRleHRTdGF0dXMgPSB0ZXh0U3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5lcnJvclRocm93biA9IGVycm9yVGhyb3duO1xyXG4gICAgICAgICAgICAgICAgc2VsZi50cmlnZ2VyRXZlbnQoXCJzZjphamF4ZXJyb3JcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAvKmNvbnNvbGUubG9nKFwiQUpBWCBGQUlMXCIpO1xyXG4gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHgpOyovXHJcblxyXG4gICAgICAgICAgICB9KS5hbHdheXMoZnVuY3Rpb24oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgZGF0YS5zZmlkID0gc2VsZi5zZmlkO1xyXG4gICAgICAgICAgICAgICAgZGF0YS50YXJnZXRTZWxlY3RvciA9IHNlbGYuYWpheF90YXJnZXRfYXR0cjtcclxuICAgICAgICAgICAgICAgIGRhdGEub2JqZWN0ID0gc2VsZjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihzZWxmLnVzZV9zY3JvbGxfbG9hZGVyPT0xKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICRsb2FkZXIuZGV0YWNoKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5pc19sb2FkaW5nX21vcmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLnRyaWdnZXJFdmVudChcInNmOmFqYXhmaW5pc2hcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mZXRjaEFqYXhSZXN1bHRzID0gZnVuY3Rpb24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy90cmlnZ2VyIHN0YXJ0IGV2ZW50XHJcbiAgICAgICAgICAgIHZhciBldmVudF9kYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgc2ZpZDogc2VsZi5zZmlkLFxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0U2VsZWN0b3I6IHNlbGYuYWpheF90YXJnZXRfYXR0cixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwibG9hZF9yZXN1bHRzXCIsXHJcbiAgICAgICAgICAgICAgICBvYmplY3Q6IHNlbGZcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYudHJpZ2dlckV2ZW50KFwic2Y6YWpheHN0YXJ0XCIsIGV2ZW50X2RhdGEpO1xyXG5cclxuICAgICAgICAgICAgLy9yZWZvY3VzIGFueSBpbnB1dCBmaWVsZHMgYWZ0ZXIgdGhlIGZvcm0gaGFzIGJlZW4gdXBkYXRlZFxyXG4gICAgICAgICAgICB2YXIgJGxhc3RfYWN0aXZlX2lucHV0X3RleHQgPSAkdGhpcy5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXTpmb2N1cycpLm5vdChcIi5zZi1kYXRlcGlja2VyXCIpO1xyXG4gICAgICAgICAgICBpZigkbGFzdF9hY3RpdmVfaW5wdXRfdGV4dC5sZW5ndGg9PTEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBsYXN0X2FjdGl2ZV9pbnB1dF90ZXh0ID0gJGxhc3RfYWN0aXZlX2lucHV0X3RleHQuYXR0cihcIm5hbWVcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICR0aGlzLmFkZENsYXNzKFwic2VhcmNoLWZpbHRlci1kaXNhYmxlZFwiKTtcclxuICAgICAgICAgICAgcHJvY2Vzc19mb3JtLmRpc2FibGVJbnB1dHMoc2VsZik7XHJcblxyXG4gICAgICAgICAgICAvL2ZhZGUgb3V0IHJlc3VsdHNcclxuICAgICAgICAgICAgc2VsZi4kYWpheF9yZXN1bHRzX2NvbnRhaW5lci5hbmltYXRlKHsgb3BhY2l0eTogMC41IH0sIFwiZmFzdFwiKTsgLy9sb2FkaW5nXHJcblxyXG4gICAgICAgICAgICBpZihzZWxmLmFqYXhfYWN0aW9uPT1cInBhZ2luYXRpb25cIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9uZWVkIHRvIHJlbW92ZSBhY3RpdmUgZmlsdGVyIGZyb20gVVJMXHJcblxyXG4gICAgICAgICAgICAgICAgLy9xdWVyeV9wYXJhbXMgPSBzZWxmLmxhc3Rfc3VibWl0X3F1ZXJ5X3BhcmFtcztcclxuXHJcbiAgICAgICAgICAgICAgICAvL25vdyBhZGQgdGhlIG5ldyBwYWdpbmF0aW9uXHJcbiAgICAgICAgICAgICAgICB2YXIgcGFnZU51bWJlciA9IHNlbGYuJGFqYXhfcmVzdWx0c19jb250YWluZXIuYXR0cihcImRhdGEtcGFnZWRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodHlwZW9mKHBhZ2VOdW1iZXIpPT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VOdW1iZXIgPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcHJvY2Vzc19mb3JtLnNldFRheEFyY2hpdmVSZXN1bHRzVXJsKHNlbGYsIHNlbGYucmVzdWx0c191cmwpO1xyXG4gICAgICAgICAgICAgICAgcXVlcnlfcGFyYW1zID0gc2VsZi5nZXRVcmxQYXJhbXMoZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHBhZ2VOdW1iZXI+MSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBxdWVyeV9wYXJhbXMgPSBzZWxmLmpvaW5VcmxQYXJhbShxdWVyeV9wYXJhbXMsIFwic2ZfcGFnZWQ9XCIrcGFnZU51bWJlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoc2VsZi5hamF4X2FjdGlvbj09XCJzdWJtaXRcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHF1ZXJ5X3BhcmFtcyA9IHNlbGYuZ2V0VXJsUGFyYW1zKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sYXN0X3N1Ym1pdF9xdWVyeV9wYXJhbXMgPSBzZWxmLmdldFVybFBhcmFtcyhmYWxzZSk7IC8vZ3JhYiBhIGNvcHkgb2YgaHRlIFVSTCBwYXJhbXMgd2l0aG91dCBwYWdpbmF0aW9uIGFscmVhZHkgYWRkZWRcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGFqYXhfcHJvY2Vzc2luZ191cmwgPSBcIlwiO1xyXG4gICAgICAgICAgICB2YXIgYWpheF9yZXN1bHRzX3VybCA9IFwiXCI7XHJcbiAgICAgICAgICAgIHZhciBkYXRhX3R5cGUgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5zZXRBamF4UmVzdWx0c1VSTHMocXVlcnlfcGFyYW1zKTtcclxuICAgICAgICAgICAgYWpheF9wcm9jZXNzaW5nX3VybCA9IHNlbGYuYWpheF9yZXN1bHRzX2NvbmZbJ3Byb2Nlc3NpbmdfdXJsJ107XHJcbiAgICAgICAgICAgIGFqYXhfcmVzdWx0c191cmwgPSBzZWxmLmFqYXhfcmVzdWx0c19jb25mWydyZXN1bHRzX3VybCddO1xyXG4gICAgICAgICAgICBkYXRhX3R5cGUgPSBzZWxmLmFqYXhfcmVzdWx0c19jb25mWydkYXRhX3R5cGUnXTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL2Fib3J0IGFueSBwcmV2aW91cyBhamF4IHJlcXVlc3RzXHJcbiAgICAgICAgICAgIGlmKHNlbGYubGFzdF9hamF4X3JlcXVlc3QpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubGFzdF9hamF4X3JlcXVlc3QuYWJvcnQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2VsZi5sYXN0X2FqYXhfcmVxdWVzdCA9ICQuZ2V0KGFqYXhfcHJvY2Vzc2luZ191cmwsIGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgcmVxdWVzdClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sYXN0X2FqYXhfcmVxdWVzdCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgLyogc2Nyb2xsICovXHJcbiAgICAgICAgICAgICAgICBzZWxmLnNjcm9sbFJlc3VsdHMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3VwZGF0ZXMgdGhlIHJlc3V0bHMgJiBmb3JtIGh0bWxcclxuICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlUmVzdWx0cyhkYXRhLCBkYXRhX3R5cGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8qIHVwZGF0ZSBVUkwgKi9cclxuICAgICAgICAgICAgICAgIC8vdXBkYXRlIHVybCBiZWZvcmUgcGFnaW5hdGlvbiwgYmVjYXVzZSB3ZSBuZWVkIHRvIGRvIHNvbWUgY2hlY2tzIGFnYWlucyB0aGUgVVJMIGZvciBpbmZpbml0ZSBzY3JvbGxcclxuICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlVXJsSGlzdG9yeShhamF4X3Jlc3VsdHNfdXJsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3NldHVwIHBhZ2luYXRpb25cclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0dXBBamF4UGFnaW5hdGlvbigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5pc1N1Ym1pdHRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvKiB1c2VyIGRlZiAqL1xyXG4gICAgICAgICAgICAgICAgc2VsZi5pbml0V29vQ29tbWVyY2VDb250cm9scygpOyAvL3dvb2NvbW1lcmNlIG9yZGVyYnlcclxuXHJcblxyXG4gICAgICAgICAgICB9LCBkYXRhX3R5cGUpLmZhaWwoZnVuY3Rpb24oanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgZGF0YS5zZmlkID0gc2VsZi5zZmlkO1xyXG4gICAgICAgICAgICAgICAgZGF0YS50YXJnZXRTZWxlY3RvciA9IHNlbGYuYWpheF90YXJnZXRfYXR0cjtcclxuICAgICAgICAgICAgICAgIGRhdGEub2JqZWN0ID0gc2VsZjtcclxuICAgICAgICAgICAgICAgIGRhdGEuYWpheFVSTCA9IGFqYXhfcHJvY2Vzc2luZ191cmw7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmpxWEhSID0ganFYSFI7XHJcbiAgICAgICAgICAgICAgICBkYXRhLnRleHRTdGF0dXMgPSB0ZXh0U3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5lcnJvclRocm93biA9IGVycm9yVGhyb3duO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5pc1N1Ym1pdHRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHNlbGYudHJpZ2dlckV2ZW50KFwic2Y6YWpheGVycm9yXCIsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgLypjb25zb2xlLmxvZyhcIkFKQVggRkFJTFwiKTtcclxuICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh4KTsqL1xyXG5cclxuICAgICAgICAgICAgfSkuYWx3YXlzKGZ1bmN0aW9uKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VsZi4kYWpheF9yZXN1bHRzX2NvbnRhaW5lci5zdG9wKHRydWUsdHJ1ZSkuYW5pbWF0ZSh7IG9wYWNpdHk6IDF9LCBcImZhc3RcIik7IC8vZmluaXNoZWQgbG9hZGluZ1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB7fTtcclxuICAgICAgICAgICAgICAgIGRhdGEuc2ZpZCA9IHNlbGYuc2ZpZDtcclxuICAgICAgICAgICAgICAgIGRhdGEudGFyZ2V0U2VsZWN0b3IgPSBzZWxmLmFqYXhfdGFyZ2V0X2F0dHI7XHJcbiAgICAgICAgICAgICAgICBkYXRhLm9iamVjdCA9IHNlbGY7XHJcbiAgICAgICAgICAgICAgICAkdGhpcy5yZW1vdmVDbGFzcyhcInNlYXJjaC1maWx0ZXItZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgICAgICBwcm9jZXNzX2Zvcm0uZW5hYmxlSW5wdXRzKHNlbGYpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vcmVmb2N1cyB0aGUgbGFzdCBhY3RpdmUgdGV4dCBmaWVsZFxyXG4gICAgICAgICAgICAgICAgaWYobGFzdF9hY3RpdmVfaW5wdXRfdGV4dCE9XCJcIilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgJGlucHV0ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZmllbGRzLmVhY2goZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkYWN0aXZlX2lucHV0ID0gJCh0aGlzKS5maW5kKFwiaW5wdXRbbmFtZT0nXCIrbGFzdF9hY3RpdmVfaW5wdXRfdGV4dCtcIiddXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZigkYWN0aXZlX2lucHV0Lmxlbmd0aD09MSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0ID0gJGFjdGl2ZV9pbnB1dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpZigkaW5wdXQubGVuZ3RoPT0xKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQuZm9jdXMoKS52YWwoJGlucHV0LnZhbCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mb2N1c0NhbXBvKCRpbnB1dFswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICR0aGlzLmZpbmQoXCJpbnB1dFtuYW1lPSdfc2Zfc2VhcmNoJ11cIikuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYudHJpZ2dlckV2ZW50KFwic2Y6YWpheGZpbmlzaFwiLCAgZGF0YSApO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5mb2N1c0NhbXBvID0gZnVuY3Rpb24oaW5wdXRGaWVsZCl7XHJcbiAgICAgICAgICAgIC8vdmFyIGlucHV0RmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dEZpZWxkICE9IG51bGwgJiYgaW5wdXRGaWVsZC52YWx1ZS5sZW5ndGggIT0gMCl7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXRGaWVsZC5jcmVhdGVUZXh0UmFuZ2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBGaWVsZFJhbmdlID0gaW5wdXRGaWVsZC5jcmVhdGVUZXh0UmFuZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBGaWVsZFJhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJyxpbnB1dEZpZWxkLnZhbHVlLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgRmllbGRSYW5nZS5jb2xsYXBzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIEZpZWxkUmFuZ2Uuc2VsZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZiAoaW5wdXRGaWVsZC5zZWxlY3Rpb25TdGFydCB8fCBpbnB1dEZpZWxkLnNlbGVjdGlvblN0YXJ0ID09ICcwJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtTGVuID0gaW5wdXRGaWVsZC52YWx1ZS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRGaWVsZC5zZWxlY3Rpb25TdGFydCA9IGVsZW1MZW47XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRGaWVsZC5zZWxlY3Rpb25FbmQgPSBlbGVtTGVuO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0RmllbGQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpbnB1dEZpZWxkLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50ID0gZnVuY3Rpb24oZXZlbnRuYW1lLCBkYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyICRldmVudF9jb250YWluZXIgPSAkKFwiLnNlYXJjaGFuZGZpbHRlcltkYXRhLXNmLWZvcm0taWQ9J1wiK3NlbGYuc2ZpZCtcIiddXCIpO1xyXG4gICAgICAgICAgICAkZXZlbnRfY29udGFpbmVyLnRyaWdnZXIoZXZlbnRuYW1lLCBbIGRhdGEgXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmZldGNoQWpheEZvcm0gPSBmdW5jdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL3RyaWdnZXIgc3RhcnQgZXZlbnRcclxuICAgICAgICAgICAgdmFyIGV2ZW50X2RhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBzZmlkOiBzZWxmLnNmaWQsXHJcbiAgICAgICAgICAgICAgICB0YXJnZXRTZWxlY3Rvcjogc2VsZi5hamF4X3RhcmdldF9hdHRyLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJmb3JtXCIsXHJcbiAgICAgICAgICAgICAgICBvYmplY3Q6IHNlbGZcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYudHJpZ2dlckV2ZW50KFwic2Y6YWpheGZvcm1zdGFydFwiLCBbIGV2ZW50X2RhdGEgXSk7XHJcblxyXG4gICAgICAgICAgICAkdGhpcy5hZGRDbGFzcyhcInNlYXJjaC1maWx0ZXItZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgIHByb2Nlc3NfZm9ybS5kaXNhYmxlSW5wdXRzKHNlbGYpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHF1ZXJ5X3BhcmFtcyA9IHNlbGYuZ2V0VXJsUGFyYW1zKCk7XHJcblxyXG4gICAgICAgICAgICBpZihzZWxmLmxhbmdfY29kZSE9XCJcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9zbyBhZGQgaXRcclxuICAgICAgICAgICAgICAgIHF1ZXJ5X3BhcmFtcyA9IHNlbGYuam9pblVybFBhcmFtKHF1ZXJ5X3BhcmFtcywgXCJsYW5nPVwiK3NlbGYubGFuZ19jb2RlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGFqYXhfcHJvY2Vzc2luZ191cmwgPSBzZWxmLmFkZFVybFBhcmFtKHNlbGYuYWpheF9mb3JtX3VybCwgcXVlcnlfcGFyYW1zKTtcclxuICAgICAgICAgICAgdmFyIGRhdGFfdHlwZSA9IFwianNvblwiO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vYWJvcnQgYW55IHByZXZpb3VzIGFqYXggcmVxdWVzdHNcclxuICAgICAgICAgICAgLyppZihzZWxmLmxhc3RfYWpheF9yZXF1ZXN0KVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgc2VsZi5sYXN0X2FqYXhfcmVxdWVzdC5hYm9ydCgpO1xyXG4gICAgICAgICAgICAgfSovXHJcblxyXG5cclxuICAgICAgICAgICAgLy9zZWxmLmxhc3RfYWpheF9yZXF1ZXN0ID1cclxuXHJcbiAgICAgICAgICAgICQuZ2V0KGFqYXhfcHJvY2Vzc2luZ191cmwsIGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgcmVxdWVzdClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9zZWxmLmxhc3RfYWpheF9yZXF1ZXN0ID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3VwZGF0ZXMgdGhlIHJlc3V0bHMgJiBmb3JtIGh0bWxcclxuICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlRm9ybShkYXRhLCBkYXRhX3R5cGUpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIH0sIGRhdGFfdHlwZSkuZmFpbChmdW5jdGlvbihqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge307XHJcbiAgICAgICAgICAgICAgICBkYXRhLnNmaWQgPSBzZWxmLnNmaWQ7XHJcbiAgICAgICAgICAgICAgICBkYXRhLnRhcmdldFNlbGVjdG9yID0gc2VsZi5hamF4X3RhcmdldF9hdHRyO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5vYmplY3QgPSBzZWxmO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5hamF4VVJMID0gYWpheF9wcm9jZXNzaW5nX3VybDtcclxuICAgICAgICAgICAgICAgIGRhdGEuanFYSFIgPSBqcVhIUjtcclxuICAgICAgICAgICAgICAgIGRhdGEudGV4dFN0YXR1cyA9IHRleHRTdGF0dXM7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmVycm9yVGhyb3duID0gZXJyb3JUaHJvd247XHJcbiAgICAgICAgICAgICAgICBzZWxmLnRyaWdnZXJFdmVudChcInNmOmFqYXhlcnJvclwiLCBbIGRhdGEgXSk7XHJcblxyXG4gICAgICAgICAgICB9KS5hbHdheXMoZnVuY3Rpb24oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgZGF0YS5zZmlkID0gc2VsZi5zZmlkO1xyXG4gICAgICAgICAgICAgICAgZGF0YS50YXJnZXRTZWxlY3RvciA9IHNlbGYuYWpheF90YXJnZXRfYXR0cjtcclxuICAgICAgICAgICAgICAgIGRhdGEub2JqZWN0ID0gc2VsZjtcclxuXHJcbiAgICAgICAgICAgICAgICAkdGhpcy5yZW1vdmVDbGFzcyhcInNlYXJjaC1maWx0ZXItZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgICAgICBwcm9jZXNzX2Zvcm0uZW5hYmxlSW5wdXRzKHNlbGYpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYudHJpZ2dlckV2ZW50KFwic2Y6YWpheGZvcm1maW5pc2hcIiwgWyBkYXRhIF0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmNvcHlMaXN0SXRlbXNDb250ZW50cyA9IGZ1bmN0aW9uKCRsaXN0X2Zyb20sICRsaXN0X3RvKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy9jb3B5IG92ZXIgY2hpbGQgbGlzdCBpdGVtc1xyXG4gICAgICAgICAgICB2YXIgbGlfY29udGVudHNfYXJyYXkgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgdmFyIGZyb21fYXR0cmlidXRlcyA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyICRmcm9tX2ZpZWxkcyA9ICRsaXN0X2Zyb20uZmluZChcIj4gdWwgPiBsaVwiKTtcclxuXHJcbiAgICAgICAgICAgICRmcm9tX2ZpZWxkcy5lYWNoKGZ1bmN0aW9uKGkpe1xyXG5cclxuICAgICAgICAgICAgICAgIGxpX2NvbnRlbnRzX2FycmF5LnB1c2goJCh0aGlzKS5odG1sKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBhdHRyaWJ1dGVzID0gJCh0aGlzKS5wcm9wKFwiYXR0cmlidXRlc1wiKTtcclxuICAgICAgICAgICAgICAgIGZyb21fYXR0cmlidXRlcy5wdXNoKGF0dHJpYnV0ZXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vdmFyIGZpZWxkX25hbWUgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXNmLWZpZWxkLW5hbWVcIik7XHJcbiAgICAgICAgICAgICAgICAvL3ZhciB0b19maWVsZCA9ICRsaXN0X3RvLmZpbmQoXCI+IHVsID4gbGlbZGF0YS1zZi1maWVsZC1uYW1lPSdcIitmaWVsZF9uYW1lK1wiJ11cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9zZWxmLmNvcHlBdHRyaWJ1dGVzKCQodGhpcyksICRsaXN0X3RvLCBcImRhdGEtc2YtXCIpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbGlfaXQgPSAwO1xyXG4gICAgICAgICAgICB2YXIgJHRvX2ZpZWxkcyA9ICRsaXN0X3RvLmZpbmQoXCI+IHVsID4gbGlcIik7XHJcbiAgICAgICAgICAgICR0b19maWVsZHMuZWFjaChmdW5jdGlvbihpKXtcclxuICAgICAgICAgICAgICAgICQodGhpcykuaHRtbChsaV9jb250ZW50c19hcnJheVtsaV9pdF0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciAkZnJvbV9maWVsZCA9ICQoJGZyb21fZmllbGRzLmdldChsaV9pdCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciAkdG9fZmllbGQgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgJHRvX2ZpZWxkLnJlbW92ZUF0dHIoXCJkYXRhLXNmLXRheG9ub215LWFyY2hpdmVcIik7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNvcHlBdHRyaWJ1dGVzKCRmcm9tX2ZpZWxkLCAkdG9fZmllbGQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxpX2l0Kys7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLyp2YXIgJGZyb21fZmllbGRzID0gJGxpc3RfZnJvbS5maW5kKFwiIHVsID4gbGlcIik7XHJcbiAgICAgICAgICAgICB2YXIgJHRvX2ZpZWxkcyA9ICRsaXN0X3RvLmZpbmQoXCIgPiBsaVwiKTtcclxuICAgICAgICAgICAgICRmcm9tX2ZpZWxkcy5lYWNoKGZ1bmN0aW9uKGluZGV4LCB2YWwpe1xyXG4gICAgICAgICAgICAgaWYoJCh0aGlzKS5oYXNBdHRyaWJ1dGUoXCJkYXRhLXNmLXRheG9ub215LWFyY2hpdmVcIikpXHJcbiAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgdGhpcy5jb3B5QXR0cmlidXRlcygkbGlzdF9mcm9tLCAkbGlzdF90byk7Ki9cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlRm9ybUF0dHJpYnV0ZXMgPSBmdW5jdGlvbigkbGlzdF9mcm9tLCAkbGlzdF90bylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBmcm9tX2F0dHJpYnV0ZXMgPSAkbGlzdF9mcm9tLnByb3AoXCJhdHRyaWJ1dGVzXCIpO1xyXG4gICAgICAgICAgICAvLyBsb29wIHRocm91Z2ggPHNlbGVjdD4gYXR0cmlidXRlcyBhbmQgYXBwbHkgdGhlbSBvbiA8ZGl2PlxyXG5cclxuICAgICAgICAgICAgdmFyIHRvX2F0dHJpYnV0ZXMgPSAkbGlzdF90by5wcm9wKFwiYXR0cmlidXRlc1wiKTtcclxuICAgICAgICAgICAgJC5lYWNoKHRvX2F0dHJpYnV0ZXMsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJGxpc3RfdG8ucmVtb3ZlQXR0cih0aGlzLm5hbWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQuZWFjaChmcm9tX2F0dHJpYnV0ZXMsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJGxpc3RfdG8uYXR0cih0aGlzLm5hbWUsIHRoaXMudmFsdWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvcHlBdHRyaWJ1dGVzID0gZnVuY3Rpb24oJGZyb20sICR0bywgcHJlZml4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodHlwZW9mKHByZWZpeCk9PVwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBwcmVmaXggPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgZnJvbV9hdHRyaWJ1dGVzID0gJGZyb20ucHJvcChcImF0dHJpYnV0ZXNcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgdG9fYXR0cmlidXRlcyA9ICR0by5wcm9wKFwiYXR0cmlidXRlc1wiKTtcclxuICAgICAgICAgICAgJC5lYWNoKHRvX2F0dHJpYnV0ZXMsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHByZWZpeCE9XCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm5hbWUuaW5kZXhPZihwcmVmaXgpID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHRvLnJlbW92ZUF0dHIodGhpcy5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8kdG8ucmVtb3ZlQXR0cih0aGlzLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQuZWFjaChmcm9tX2F0dHJpYnV0ZXMsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJHRvLmF0dHIodGhpcy5uYW1lLCB0aGlzLnZhbHVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvcHlGb3JtQXR0cmlidXRlcyA9IGZ1bmN0aW9uKCRmcm9tLCAkdG8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAkdG8ucmVtb3ZlQXR0cihcImRhdGEtY3VycmVudC10YXhvbm9teS1hcmNoaXZlXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNvcHlBdHRyaWJ1dGVzKCRmcm9tLCAkdG8pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlRm9ybSA9IGZ1bmN0aW9uKGRhdGEsIGRhdGFfdHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmKGRhdGFfdHlwZT09XCJqc29uXCIpXHJcbiAgICAgICAgICAgIHsvL3RoZW4gd2UgZGlkIGEgcmVxdWVzdCB0byB0aGUgYWpheCBlbmRwb2ludCwgc28gZXhwZWN0IGFuIG9iamVjdCBiYWNrXHJcblxyXG4gICAgICAgICAgICAgICAgaWYodHlwZW9mKGRhdGFbJ2Zvcm0nXSkhPT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcmVtb3ZlIGFsbCBldmVudHMgZnJvbSBTJkYgZm9ybVxyXG4gICAgICAgICAgICAgICAgICAgICR0aGlzLm9mZigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3JlZnJlc2ggdGhlIGZvcm0gKGF1dG8gY291bnQpXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jb3B5TGlzdEl0ZW1zQ29udGVudHMoJChkYXRhWydmb3JtJ10pLCAkdGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vcmUgaW5pdCBTJkYgY2xhc3Mgb24gdGhlIGZvcm1cclxuICAgICAgICAgICAgICAgICAgICAvLyR0aGlzLnNlYXJjaEFuZEZpbHRlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2lmIGFqYXggaXMgZW5hYmxlZCBpbml0IHRoZSBwYWdpbmF0aW9uXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdCh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5pc19hamF4PT0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXR1cEFqYXhQYWdpbmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hZGRSZXN1bHRzID0gZnVuY3Rpb24oZGF0YSwgZGF0YV90eXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYoZGF0YV90eXBlPT1cImpzb25cIilcclxuICAgICAgICAgICAgey8vdGhlbiB3ZSBkaWQgYSByZXF1ZXN0IHRvIHRoZSBhamF4IGVuZHBvaW50LCBzbyBleHBlY3QgYW4gb2JqZWN0IGJhY2tcclxuICAgICAgICAgICAgICAgIC8vZ3JhYiB0aGUgcmVzdWx0cyBhbmQgbG9hZCBpblxyXG4gICAgICAgICAgICAgICAgLy9zZWxmLiRhamF4X3Jlc3VsdHNfY29udGFpbmVyLmFwcGVuZChkYXRhWydyZXN1bHRzJ10pO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sb2FkX21vcmVfaHRtbCA9IGRhdGFbJ3Jlc3VsdHMnXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGRhdGFfdHlwZT09XCJodG1sXCIpXHJcbiAgICAgICAgICAgIHsvL3dlIGFyZSBleHBlY3RpbmcgdGhlIGh0bWwgb2YgdGhlIHJlc3VsdHMgcGFnZSBiYWNrLCBzbyBleHRyYWN0IHRoZSBodG1sIHdlIG5lZWRcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgJGRhdGFfb2JqID0gJChkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3NlbGYuJGluZmluaXRlX3Njcm9sbF9jb250YWluZXIuYXBwZW5kKCRkYXRhX29iai5maW5kKHNlbGYuYWpheF90YXJnZXRfYXR0cikuaHRtbCgpKTtcclxuICAgICAgICAgICAgICAgIHNlbGYubG9hZF9tb3JlX2h0bWwgPSAkZGF0YV9vYmouZmluZChzZWxmLmFqYXhfdGFyZ2V0X2F0dHIpLmh0bWwoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGluZmluaXRlX3Njcm9sbF9lbmQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmKCQoXCI8ZGl2PlwiK3NlbGYubG9hZF9tb3JlX2h0bWwrXCI8L2Rpdj5cIikuZmluZChcIltkYXRhLXNlYXJjaC1maWx0ZXItYWN0aW9uPSdpbmZpbml0ZS1zY3JvbGwtZW5kJ11cIikubGVuZ3RoPjApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGluZmluaXRlX3Njcm9sbF9lbmQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2lmIHRoZXJlIGlzIGFub3RoZXIgc2VsZWN0b3IgZm9yIGluZmluaXRlIHNjcm9sbCwgZmluZCB0aGUgY29udGVudHMgb2YgdGhhdCBpbnN0ZWFkXHJcbiAgICAgICAgICAgIGlmKHNlbGYuaW5maW5pdGVfc2Nyb2xsX2NvbnRhaW5lciE9XCJcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sb2FkX21vcmVfaHRtbCA9ICQoXCI8ZGl2PlwiK3NlbGYubG9hZF9tb3JlX2h0bWwrXCI8L2Rpdj5cIikuZmluZChzZWxmLmluZmluaXRlX3Njcm9sbF9jb250YWluZXIpLmh0bWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihzZWxmLmluZmluaXRlX3Njcm9sbF9yZXN1bHRfY2xhc3MhPVwiXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciAkcmVzdWx0X2l0ZW1zID0gJChcIjxkaXY+XCIrc2VsZi5sb2FkX21vcmVfaHRtbCtcIjwvZGl2PlwiKS5maW5kKHNlbGYuaW5maW5pdGVfc2Nyb2xsX3Jlc3VsdF9jbGFzcyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgJHJlc3VsdF9pdGVtc19jb250YWluZXIgPSAkKCc8ZGl2Lz4nLCB7fSk7XHJcbiAgICAgICAgICAgICAgICAkcmVzdWx0X2l0ZW1zX2NvbnRhaW5lci5hcHBlbmQoJHJlc3VsdF9pdGVtcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5sb2FkX21vcmVfaHRtbCA9ICRyZXN1bHRfaXRlbXNfY29udGFpbmVyLmh0bWwoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoaW5maW5pdGVfc2Nyb2xsX2VuZClcclxuICAgICAgICAgICAgey8vd2UgZm91bmQgYSBkYXRhIGF0dHJpYnV0ZSBzaWduYWxsaW5nIHRoZSBsYXN0IHBhZ2Ugc28gZmluaXNoIGhlcmVcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLmlzX21heF9wYWdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxhc3RfbG9hZF9tb3JlX2h0bWwgPSBzZWxmLmxvYWRfbW9yZV9odG1sO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuaW5maW5pdGVTY3JvbGxBcHBlbmQoc2VsZi5sb2FkX21vcmVfaHRtbCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoc2VsZi5sYXN0X2xvYWRfbW9yZV9odG1sIT09c2VsZi5sb2FkX21vcmVfaHRtbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9jaGVjayB0byBtYWtlIHN1cmUgdGhlIG5ldyBodG1sIGZldGNoZWQgaXMgZGlmZmVyZW50XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxhc3RfbG9hZF9tb3JlX2h0bWwgPSBzZWxmLmxvYWRfbW9yZV9odG1sO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5pbmZpbml0ZVNjcm9sbEFwcGVuZChzZWxmLmxvYWRfbW9yZV9odG1sKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7Ly93ZSByZWNlaXZlZCB0aGUgc2FtZSBtZXNzYWdlIGFnYWluIHNvIGRvbid0IGFkZCwgYW5kIHRlbGwgUyZGIHRoYXQgd2UncmUgYXQgdGhlIGVuZC4uXHJcbiAgICAgICAgICAgICAgICBzZWxmLmlzX21heF9wYWdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB0aGlzLmluZmluaXRlU2Nyb2xsQXBwZW5kID0gZnVuY3Rpb24oJG9iamVjdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHNlbGYuaW5maW5pdGVfc2Nyb2xsX3Jlc3VsdF9jbGFzcyE9XCJcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VsZi4kaW5maW5pdGVfc2Nyb2xsX2NvbnRhaW5lci5maW5kKHNlbGYuaW5maW5pdGVfc2Nyb2xsX3Jlc3VsdF9jbGFzcykubGFzdCgpLmFmdGVyKCRvYmplY3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBzZWxmLiRpbmZpbml0ZV9zY3JvbGxfY29udGFpbmVyLmFwcGVuZCgkb2JqZWN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlUmVzdWx0cyA9IGZ1bmN0aW9uKGRhdGEsIGRhdGFfdHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmKGRhdGFfdHlwZT09XCJqc29uXCIpXHJcbiAgICAgICAgICAgIHsvL3RoZW4gd2UgZGlkIGEgcmVxdWVzdCB0byB0aGUgYWpheCBlbmRwb2ludCwgc28gZXhwZWN0IGFuIG9iamVjdCBiYWNrXHJcbiAgICAgICAgICAgICAgICAvL2dyYWIgdGhlIHJlc3VsdHMgYW5kIGxvYWQgaW5cclxuICAgICAgICAgICAgICAgIHNlbGYuJGFqYXhfcmVzdWx0c19jb250YWluZXIuaHRtbChkYXRhWydyZXN1bHRzJ10pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHR5cGVvZihkYXRhWydmb3JtJ10pIT09XCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3JlbW92ZSBhbGwgZXZlbnRzIGZyb20gUyZGIGZvcm1cclxuICAgICAgICAgICAgICAgICAgICAkdGhpcy5vZmYoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9yZW1vdmUgcGFnaW5hdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlQWpheFBhZ2luYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9yZWZyZXNoIHRoZSBmb3JtIChhdXRvIGNvdW50KVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29weUxpc3RJdGVtc0NvbnRlbnRzKCQoZGF0YVsnZm9ybSddKSwgJHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3VwZGF0ZSBhdHRyaWJ1dGVzIG9uIGZvcm1cclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvcHlGb3JtQXR0cmlidXRlcygkKGRhdGFbJ2Zvcm0nXSksICR0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9yZSBpbml0IFMmRiBjbGFzcyBvbiB0aGUgZm9ybVxyXG4gICAgICAgICAgICAgICAgICAgICR0aGlzLnNlYXJjaEFuZEZpbHRlcih7J2lzSW5pdCc6IGZhbHNlfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8kdGhpcy5maW5kKFwiaW5wdXRcIikucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoZGF0YV90eXBlPT1cImh0bWxcIikgey8vd2UgYXJlIGV4cGVjdGluZyB0aGUgaHRtbCBvZiB0aGUgcmVzdWx0cyBwYWdlIGJhY2ssIHNvIGV4dHJhY3QgdGhlIGh0bWwgd2UgbmVlZFxyXG5cclxuICAgICAgICAgICAgICAgIHZhciAkZGF0YV9vYmogPSAkKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuJGFqYXhfcmVzdWx0c19jb250YWluZXIuaHRtbCgkZGF0YV9vYmouZmluZChzZWxmLmFqYXhfdGFyZ2V0X2F0dHIpLmh0bWwoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuJGFqYXhfcmVzdWx0c19jb250YWluZXIuZmluZChcIi5zZWFyY2hhbmRmaWx0ZXJcIikubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgIHsvL3RoZW4gdGhlcmUgYXJlIHNlYXJjaCBmb3JtKHMpIGluc2lkZSB0aGUgcmVzdWx0cyBjb250YWluZXIsIHNvIHJlLWluaXQgdGhlbVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWxmLiRhamF4X3Jlc3VsdHNfY29udGFpbmVyLmZpbmQoXCIuc2VhcmNoYW5kZmlsdGVyXCIpLnNlYXJjaEFuZEZpbHRlcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vaWYgdGhlIGN1cnJlbnQgc2VhcmNoIGZvcm0gaXMgbm90IGluc2lkZSB0aGUgcmVzdWx0cyBjb250YWluZXIsIHRoZW4gcHJvY2VlZCBhcyBub3JtYWwgYW5kIHVwZGF0ZSB0aGUgZm9ybVxyXG4gICAgICAgICAgICAgICAgaWYoc2VsZi4kYWpheF9yZXN1bHRzX2NvbnRhaW5lci5maW5kKFwiLnNlYXJjaGFuZGZpbHRlcltkYXRhLXNmLWZvcm0taWQ9J1wiICsgc2VsZi5zZmlkICsgXCInXVwiKS5sZW5ndGg9PTApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICRuZXdfc2VhcmNoX2Zvcm0gPSAkZGF0YV9vYmouZmluZChcIi5zZWFyY2hhbmRmaWx0ZXJbZGF0YS1zZi1mb3JtLWlkPSdcIiArIHNlbGYuc2ZpZCArIFwiJ11cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkbmV3X3NlYXJjaF9mb3JtLmxlbmd0aCA9PSAxKSB7Ly90aGVuIHJlcGxhY2UgdGhlIHNlYXJjaCBmb3JtIHdpdGggdGhlIG5ldyBvbmVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVtb3ZlIGFsbCBldmVudHMgZnJvbSBTJkYgZm9ybVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5vZmYoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVtb3ZlIHBhZ2luYXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZW1vdmVBamF4UGFnaW5hdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZWZyZXNoIHRoZSBmb3JtIChhdXRvIGNvdW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNvcHlMaXN0SXRlbXNDb250ZW50cygkbmV3X3NlYXJjaF9mb3JtLCAkdGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3VwZGF0ZSBhdHRyaWJ1dGVzIG9uIGZvcm1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jb3B5Rm9ybUF0dHJpYnV0ZXMoJG5ld19zZWFyY2hfZm9ybSwgJHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZSBpbml0IFMmRiBjbGFzcyBvbiB0aGUgZm9ybVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5zZWFyY2hBbmRGaWx0ZXIoeydpc0luaXQnOiBmYWxzZX0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyR0aGlzLmZpbmQoXCJpbnB1dFwiKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZWxmLmlzX21heF9wYWdlZCA9IGZhbHNlOyAvL2ZvciBpbmZpbml0ZSBzY3JvbGxcclxuICAgICAgICAgICAgc2VsZi5jdXJyZW50X3BhZ2VkID0gMTsgLy9mb3IgaW5maW5pdGUgc2Nyb2xsXHJcbiAgICAgICAgICAgIHNlbGYuc2V0SW5maW5pdGVTY3JvbGxDb250YWluZXIoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlbW92ZVdvb0NvbW1lcmNlQ29udHJvbHMgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgJHdvb19vcmRlcmJ5ID0gJCgnLndvb2NvbW1lcmNlLW9yZGVyaW5nIC5vcmRlcmJ5Jyk7XHJcbiAgICAgICAgICAgIHZhciAkd29vX29yZGVyYnlfZm9ybSA9ICQoJy53b29jb21tZXJjZS1vcmRlcmluZycpO1xyXG5cclxuICAgICAgICAgICAgJHdvb19vcmRlcmJ5X2Zvcm0ub2ZmKCk7XHJcbiAgICAgICAgICAgICR3b29fb3JkZXJieS5vZmYoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmFkZFF1ZXJ5UGFyYW0gPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSwgdXJsX3R5cGUpe1xyXG5cclxuICAgICAgICAgICAgaWYodHlwZW9mKHVybF90eXBlKT09XCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHVybF90eXBlID0gXCJhbGxcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLmV4dHJhX3F1ZXJ5X3BhcmFtc1t1cmxfdHlwZV1bbmFtZV0gPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0V29vQ29tbWVyY2VDb250cm9scyA9IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICBzZWxmLnJlbW92ZVdvb0NvbW1lcmNlQ29udHJvbHMoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciAkd29vX29yZGVyYnkgPSAkKCcud29vY29tbWVyY2Utb3JkZXJpbmcgLm9yZGVyYnknKTtcclxuICAgICAgICAgICAgdmFyICR3b29fb3JkZXJieV9mb3JtID0gJCgnLndvb2NvbW1lcmNlLW9yZGVyaW5nJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgb3JkZXJfdmFsID0gXCJcIjtcclxuICAgICAgICAgICAgaWYoJHdvb19vcmRlcmJ5Lmxlbmd0aD4wKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvcmRlcl92YWwgPSAkd29vX29yZGVyYnkudmFsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvcmRlcl92YWwgPSBzZWxmLmdldFF1ZXJ5UGFyYW1Gcm9tVVJMKFwib3JkZXJieVwiLCB3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKG9yZGVyX3ZhbD09XCJtZW51X29yZGVyXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9yZGVyX3ZhbCA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKChvcmRlcl92YWwhPVwiXCIpJiYoISFvcmRlcl92YWwpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmV4dHJhX3F1ZXJ5X3BhcmFtcy5hbGwub3JkZXJieSA9IG9yZGVyX3ZhbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICR3b29fb3JkZXJieV9mb3JtLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAvL3ZhciBmb3JtID0gZS50YXJnZXQ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJHdvb19vcmRlcmJ5Lm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICAgICAgICAgIGlmKHZhbD09XCJtZW51X29yZGVyXCIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLmV4dHJhX3F1ZXJ5X3BhcmFtcy5hbGwub3JkZXJieSA9IHZhbDtcclxuXHJcbiAgICAgICAgICAgICAgICAkdGhpcy5zdWJtaXQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2Nyb2xsUmVzdWx0cyA9IGZ1bmN0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmKChzZWxmLnNjcm9sbF9vbl9hY3Rpb249PXNlbGYuYWpheF9hY3Rpb24pfHwoc2VsZi5zY3JvbGxfb25fYWN0aW9uPT1cImFsbFwiKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zY3JvbGxUb1BvcygpOyAvL3Njcm9sbCB0aGUgd2luZG93IGlmIGl0IGhhcyBiZWVuIHNldFxyXG4gICAgICAgICAgICAgICAgLy9zZWxmLmFqYXhfYWN0aW9uID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVVcmxIaXN0b3J5ID0gZnVuY3Rpb24oYWpheF9yZXN1bHRzX3VybClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciB1c2VfaGlzdG9yeV9hcGkgPSAwO1xyXG4gICAgICAgICAgICBpZiAod2luZG93Lmhpc3RvcnkgJiYgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB1c2VfaGlzdG9yeV9hcGkgPSAkdGhpcy5hdHRyKFwiZGF0YS11c2UtaGlzdG9yeS1hcGlcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKChzZWxmLnVwZGF0ZV9hamF4X3VybD09MSkmJih1c2VfaGlzdG9yeV9hcGk9PTEpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL25vdyBjaGVjayBpZiB0aGUgYnJvd3NlciBzdXBwb3J0cyBoaXN0b3J5IHN0YXRlIHB1c2ggOilcclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuaGlzdG9yeSAmJiB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgYWpheF9yZXN1bHRzX3VybCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBamF4UGFnaW5hdGlvbiA9IGZ1bmN0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmKHR5cGVvZihzZWxmLmFqYXhfbGlua3Nfc2VsZWN0b3IpIT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGFqYXhfbGlua3Nfb2JqZWN0ID0galF1ZXJ5KHNlbGYuYWpheF9saW5rc19zZWxlY3Rvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoJGFqYXhfbGlua3Nfb2JqZWN0Lmxlbmd0aD4wKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICRhamF4X2xpbmtzX29iamVjdC5vZmYoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jYW5GZXRjaEFqYXhSZXN1bHRzID0gZnVuY3Rpb24oZmV0Y2hfdHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHR5cGVvZihmZXRjaF90eXBlKT09XCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZldGNoX3R5cGUgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBmZXRjaF9hamF4X3Jlc3VsdHMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmKHNlbGYuaXNfYWpheD09MSlcclxuICAgICAgICAgICAgey8vdGhlbiB3ZSB3aWxsIGFqYXggc3VibWl0IHRoZSBmb3JtXHJcblxyXG4gICAgICAgICAgICAgICAgLy9hbmQgaWYgd2UgY2FuIGZpbmQgdGhlIHJlc3VsdHMgY29udGFpbmVyXHJcbiAgICAgICAgICAgICAgICBpZihzZWxmLiRhamF4X3Jlc3VsdHNfY29udGFpbmVyLmxlbmd0aD09MSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmZXRjaF9hamF4X3Jlc3VsdHMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHRzX3VybCA9IHNlbGYucmVzdWx0c191cmw7ICAvL1xyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRfdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9pZ25vcmUgIyBhbmQgZXZlcnl0aGluZyBhZnRlclxyXG4gICAgICAgICAgICAgICAgdmFyIGhhc2hfcG9zID0gd2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZignIycpO1xyXG4gICAgICAgICAgICAgICAgaWYoaGFzaF9wb3MhPT0tMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudF91cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5zdWJzdHIoMCwgd2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZignIycpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiggKCAoIHNlbGYuZGlzcGxheV9yZXN1bHRfbWV0aG9kPT1cImN1c3RvbV93b29jb21tZXJjZV9zdG9yZVwiICkgfHwgKCBzZWxmLmRpc3BsYXlfcmVzdWx0X21ldGhvZD09XCJwb3N0X3R5cGVfYXJjaGl2ZVwiICkgKSAmJiAoIHNlbGYuZW5hYmxlX3RheG9ub215X2FyY2hpdmVzID09IDEgKSApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIHNlbGYuY3VycmVudF90YXhvbm9teV9hcmNoaXZlICE9PVwiXCIgKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2hfYWpheF9yZXN1bHRzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZldGNoX2FqYXhfcmVzdWx0cztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8qdmFyIHJlc3VsdHNfdXJsID0gcHJvY2Vzc19mb3JtLmdldFJlc3VsdHNVcmwoc2VsZiwgc2VsZi5yZXN1bHRzX3VybCk7XHJcbiAgICAgICAgICAgICAgICAgICAgIHZhciBhY3RpdmVfdGF4ID0gcHJvY2Vzc19mb3JtLmdldEFjdGl2ZVRheCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICB2YXIgcXVlcnlfcGFyYW1zID0gc2VsZi5nZXRVcmxQYXJhbXModHJ1ZSwgJycsIGFjdGl2ZV90YXgpOyovXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy9ub3cgc2VlIGlmIHdlIGFyZSBvbiB0aGUgVVJMIHdlIHRoaW5rLi4uXHJcbiAgICAgICAgICAgICAgICB2YXIgdXJsX3BhcnRzID0gY3VycmVudF91cmwuc3BsaXQoXCI/XCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHVybF9iYXNlID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZih1cmxfcGFydHMubGVuZ3RoPjApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsX2Jhc2UgPSB1cmxfcGFydHNbMF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmxfYmFzZSA9IGN1cnJlbnRfdXJsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBsYW5nID0gc2VsZi5nZXRRdWVyeVBhcmFtRnJvbVVSTChcImxhbmdcIiwgd2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gICAgICAgICAgICAgICAgaWYoKHR5cGVvZihsYW5nKSE9PVwidW5kZWZpbmVkXCIpJiYobGFuZyE9PW51bGwpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybF9iYXNlID0gc2VsZi5hZGRVcmxQYXJhbSh1cmxfYmFzZSwgXCJsYW5nPVwiK2xhbmcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBzZmlkID0gc2VsZi5nZXRRdWVyeVBhcmFtRnJvbVVSTChcInNmaWRcIiwgd2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vaWYgc2ZpZCBpcyBhIG51bWJlclxyXG4gICAgICAgICAgICAgICAgaWYoTnVtYmVyKHBhcnNlRmxvYXQoc2ZpZCkpID09IHNmaWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsX2Jhc2UgPSBzZWxmLmFkZFVybFBhcmFtKHVybF9iYXNlLCBcInNmaWQ9XCIrc2ZpZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9pZiBhbnkgb2YgdGhlIDMgY29uZGl0aW9ucyBhcmUgdHJ1ZSwgdGhlbiBpdHMgZ29vZCB0byBnb1xyXG4gICAgICAgICAgICAgICAgLy8gLSAxIHwgaWYgdGhlIHVybCBiYXNlID09IHJlc3VsdHNfdXJsXHJcbiAgICAgICAgICAgICAgICAvLyAtIDIgfCBpZiB1cmwgYmFzZSsgXCIvXCIgID09IHJlc3VsdHNfdXJsIC0gaW4gY2FzZSBvZiB1c2VyIGVycm9yIGluIHRoZSByZXN1bHRzIFVSTFxyXG5cclxuICAgICAgICAgICAgICAgIC8vdHJpbSBhbnkgdHJhaWxpbmcgc2xhc2ggZm9yIGVhc2llciBjb21wYXJpc29uOlxyXG4gICAgICAgICAgICAgICAgdXJsX2Jhc2UgPSB1cmxfYmFzZS5yZXBsYWNlKC9cXC8kLywgJycpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0c191cmwgPSByZXN1bHRzX3VybC5yZXBsYWNlKC9cXC8kLywgJycpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50X3VybF9jb250YWluc19yZXN1bHRzX3VybCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgaWYodXJsX2Jhc2U9PXJlc3VsdHNfdXJsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRfdXJsX2NvbnRhaW5zX3Jlc3VsdHNfdXJsID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihzZWxmLm9ubHlfcmVzdWx0c19hamF4PT0xKVxyXG4gICAgICAgICAgICAgICAgey8vaWYgYSB1c2VyIGhhcyBjaG9zZW4gdG8gb25seSBhbGxvdyBhamF4IG9uIHJlc3VsdHMgcGFnZXMgKGRlZmF1bHQgYmVoYXZpb3VyKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiggY3VycmVudF91cmxfY29udGFpbnNfcmVzdWx0c191cmwgPiAtMSlcclxuICAgICAgICAgICAgICAgICAgICB7Ly90aGlzIG1lYW5zIHRoZSBjdXJyZW50IFVSTCBjb250YWlucyB0aGUgcmVzdWx0cyB1cmwsIHdoaWNoIG1lYW5zIHdlIGNhbiBkbyBhamF4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoX2FqYXhfcmVzdWx0cyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoX2FqYXhfcmVzdWx0cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihmZXRjaF90eXBlPT1cInBhZ2luYXRpb25cIilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCBjdXJyZW50X3VybF9jb250YWluc19yZXN1bHRzX3VybCA+IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7Ly90aGlzIG1lYW5zIHRoZSBjdXJyZW50IFVSTCBjb250YWlucyB0aGUgcmVzdWx0cyB1cmwsIHdoaWNoIG1lYW5zIHdlIGNhbiBkbyBhamF4XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kb24ndCBhamF4IHBhZ2luYXRpb24gd2hlbiBub3Qgb24gYSBTJkYgcGFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2hfYWpheF9yZXN1bHRzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmZXRjaF9hamF4X3Jlc3VsdHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldHVwQWpheFBhZ2luYXRpb24gPSBmdW5jdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0eXBlb2Yoc2VsZi5hamF4X2xpbmtzX3NlbGVjdG9yKT09XCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2luZmluaXRlIHNjcm9sbFxyXG4gICAgICAgICAgICBpZih0aGlzLnBhZ2luYXRpb25fdHlwZT09PVwiaW5maW5pdGVfc2Nyb2xsXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHBhcnNlSW50KHRoaXMuaW5zdGFuY2VfbnVtYmVyKT09PTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHdpbmRvdykub2ZmKFwic2Nyb2xsXCIsIHNlbGYub25XaW5kb3dTY3JvbGwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5jYW5GZXRjaEFqYXhSZXN1bHRzKFwicGFnaW5hdGlvblwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHdpbmRvdykub24oXCJzY3JvbGxcIiwgc2VsZi5vbldpbmRvd1Njcm9sbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3ZhciAkYWpheF9saW5rc19vYmplY3QgPSBqUXVlcnkoc2VsZi5hamF4X2xpbmtzX3NlbGVjdG9yKTtcclxuXHJcbiAgICAgICAgICAgIC8vaWYoJGFqYXhfbGlua3Nfb2JqZWN0Lmxlbmd0aD4wKVxyXG4gICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJpbml0IHBhZ2luYXRpb24gc3R1ZmZcIik7XHJcbiAgICAgICAgICAgICAgICAvLyRhamF4X2xpbmtzX29iamVjdC5vZmYoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgICAgICAvL2FsZXJ0KHNlbGYuYWpheF9saW5rc19zZWxlY3Rvcik7XHJcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2NsaWNrJywgc2VsZi5hamF4X2xpbmtzX3NlbGVjdG9yKTtcclxuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIHNlbGYuYWpheF9saW5rc19zZWxlY3RvciwgZnVuY3Rpb24oZSl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuY2FuRmV0Y2hBamF4UmVzdWx0cyhcInBhZ2luYXRpb25cIikpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGluayA9IGpRdWVyeSh0aGlzKS5hdHRyKCdocmVmJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWpheF9hY3Rpb24gPSBcInBhZ2luYXRpb25cIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYWdlTnVtYmVyID0gc2VsZi5nZXRQYWdlZEZyb21VUkwobGluayk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhamF4X3Jlc3VsdHNfY29udGFpbmVyLmF0dHIoXCJkYXRhLXBhZ2VkXCIsIHBhZ2VOdW1iZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mZXRjaEFqYXhSZXN1bHRzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0UGFnZWRGcm9tVVJMID0gZnVuY3Rpb24oVVJMKXtcclxuXHJcbiAgICAgICAgICAgIHZhciBwYWdlZFZhbCA9IDE7XHJcbiAgICAgICAgICAgIC8vZmlyc3QgdGVzdCB0byBzZWUgaWYgd2UgaGF2ZSBcIi9wYWdlLzQvXCIgaW4gdGhlIFVSTFxyXG4gICAgICAgICAgICB2YXIgdHBWYWwgPSBzZWxmLmdldFF1ZXJ5UGFyYW1Gcm9tVVJMKFwic2ZfcGFnZWRcIiwgVVJMKTtcclxuICAgICAgICAgICAgaWYoKHR5cGVvZih0cFZhbCk9PVwic3RyaW5nXCIpfHwodHlwZW9mKHRwVmFsKT09XCJudW1iZXJcIikpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBhZ2VkVmFsID0gdHBWYWw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwYWdlZFZhbDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmdldFF1ZXJ5UGFyYW1Gcm9tVVJMID0gZnVuY3Rpb24obmFtZSwgVVJMKXtcclxuXHJcbiAgICAgICAgICAgIHZhciBxc3RyaW5nID0gXCI/XCIrVVJMLnNwbGl0KCc/JylbMV07XHJcbiAgICAgICAgICAgIGlmKHR5cGVvZihxc3RyaW5nKSE9XCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IGRlY29kZVVSSUNvbXBvbmVudCgobmV3IFJlZ0V4cCgnWz98Jl0nICsgbmFtZSArICc9JyArICcoW14mO10rPykoJnwjfDt8JCknKS5leGVjKHFzdHJpbmcpfHxbLFwiXCJdKVsxXS5yZXBsYWNlKC9cXCsvZywgJyUyMCcpKXx8bnVsbDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG5cclxuICAgICAgICB0aGlzLmZvcm1VcGRhdGVkID0gZnVuY3Rpb24oZSl7XHJcblxyXG4gICAgICAgICAgICAvL2UucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgaWYoc2VsZi5hdXRvX3VwZGF0ZT09MSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zdWJtaXRGb3JtKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZigoc2VsZi5hdXRvX3VwZGF0ZT09MCkmJihzZWxmLmF1dG9fY291bnRfcmVmcmVzaF9tb2RlPT0xKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5mb3JtVXBkYXRlZEZldGNoQWpheCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5mb3JtVXBkYXRlZEZldGNoQWpheCA9IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICAvL2xvb3AgdGhyb3VnaCBhbGwgdGhlIGZpZWxkcyBhbmQgYnVpbGQgdGhlIFVSTFxyXG4gICAgICAgICAgICBzZWxmLmZldGNoQWpheEZvcm0oKTtcclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9tYWtlIGFueSBjb3JyZWN0aW9ucy91cGRhdGVzIHRvIGZpZWxkcyBiZWZvcmUgdGhlIHN1Ym1pdCBjb21wbGV0ZXNcclxuICAgICAgICB0aGlzLnNldEZpZWxkcyA9IGZ1bmN0aW9uKGUpe1xyXG5cclxuICAgICAgICAgICAgLy9pZihzZWxmLmlzX2FqYXg9PTApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3NvbWV0aW1lcyB0aGUgZm9ybSBpcyBzdWJtaXR0ZWQgd2l0aG91dCB0aGUgc2xpZGVyIHlldCBoYXZpbmcgdXBkYXRlZCwgYW5kIGFzIHdlIGdldCBvdXIgdmFsdWVzIGZyb21cclxuICAgICAgICAgICAgICAgIC8vdGhlIHNsaWRlciBhbmQgbm90IGlucHV0cywgd2UgbmVlZCB0byBjaGVjayBpdCBpZiBuZWVkcyB0byBiZSBzZXRcclxuICAgICAgICAgICAgICAgIC8vb25seSBvY2N1cnMgaWYgYWpheCBpcyBvZmYsIGFuZCBhdXRvc3VibWl0IG9uXHJcbiAgICAgICAgICAgICAgICBzZWxmLiRmaWVsZHMuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICRmaWVsZCA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciByYW5nZV9kaXNwbGF5X3ZhbHVlcyA9ICRmaWVsZC5maW5kKCcuc2YtbWV0YS1yYW5nZS1zbGlkZXInKS5hdHRyKFwiZGF0YS1kaXNwbGF5LXZhbHVlcy1hc1wiKTsvL2RhdGEtZGlzcGxheS12YWx1ZXMtYXM9XCJ0ZXh0XCJcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmFuZ2VfZGlzcGxheV92YWx1ZXM9PT1cInRleHRpbnB1dFwiKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZigkZmllbGQuZmluZChcIi5tZXRhLXNsaWRlclwiKS5sZW5ndGg+MCl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRmaWVsZC5maW5kKFwiLm1ldGEtc2xpZGVyXCIpLmVhY2goZnVuY3Rpb24gKGluZGV4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNsaWRlcl9vYmplY3QgPSAkKHRoaXMpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRzbGlkZXJfZWwgPSAkKHRoaXMpLmNsb3Nlc3QoXCIuc2YtbWV0YS1yYW5nZS1zbGlkZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciBtaW5WYWwgPSAkc2xpZGVyX2VsLmF0dHIoXCJkYXRhLW1pblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIG1heFZhbCA9ICRzbGlkZXJfZWwuYXR0cihcImRhdGEtbWF4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1pblZhbCA9ICRzbGlkZXJfZWwuZmluZChcIi5zZi1yYW5nZS1taW5cIikudmFsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF4VmFsID0gJHNsaWRlcl9lbC5maW5kKFwiLnNmLXJhbmdlLW1heFwiKS52YWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlcl9vYmplY3Qubm9VaVNsaWRlci5zZXQoW21pblZhbCwgbWF4VmFsXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9zdWJtaXRcclxuICAgICAgICB0aGlzLnN1Ym1pdEZvcm0gPSBmdW5jdGlvbihlKXtcclxuXHJcbiAgICAgICAgICAgIC8vbG9vcCB0aHJvdWdoIGFsbCB0aGUgZmllbGRzIGFuZCBidWlsZCB0aGUgVVJMXHJcbiAgICAgICAgICAgIGlmKHNlbGYuaXNTdWJtaXR0aW5nID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2VsZi5zZXRGaWVsZHMoKTtcclxuICAgICAgICAgICAgc2VsZi5jbGVhclRpbWVyKCk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLmlzU3VibWl0dGluZyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBwcm9jZXNzX2Zvcm0uc2V0VGF4QXJjaGl2ZVJlc3VsdHNVcmwoc2VsZiwgc2VsZi5yZXN1bHRzX3VybCk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLiRhamF4X3Jlc3VsdHNfY29udGFpbmVyLmF0dHIoXCJkYXRhLXBhZ2VkXCIsIDEpOyAvL2luaXQgcGFnZWRcclxuXHJcbiAgICAgICAgICAgIGlmKHNlbGYuY2FuRmV0Y2hBamF4UmVzdWx0cygpKVxyXG4gICAgICAgICAgICB7Ly90aGVuIHdlIHdpbGwgYWpheCBzdWJtaXQgdGhlIGZvcm1cclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLmFqYXhfYWN0aW9uID0gXCJzdWJtaXRcIjsgLy9zbyB3ZSBrbm93IGl0IHdhc24ndCBwYWdpbmF0aW9uXHJcbiAgICAgICAgICAgICAgICBzZWxmLmZldGNoQWpheFJlc3VsdHMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHsvL3RoZW4gd2Ugd2lsbCBzaW1wbHkgcmVkaXJlY3QgdG8gdGhlIFJlc3VsdHMgVVJMXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdHNfdXJsID0gcHJvY2Vzc19mb3JtLmdldFJlc3VsdHNVcmwoc2VsZiwgc2VsZi5yZXN1bHRzX3VybCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcXVlcnlfcGFyYW1zID0gc2VsZi5nZXRVcmxQYXJhbXModHJ1ZSwgJycpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0c191cmwgPSBzZWxmLmFkZFVybFBhcmFtKHJlc3VsdHNfdXJsLCBxdWVyeV9wYXJhbXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcmVzdWx0c191cmw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qaWYoc2VsZi5tYWludGFpbl9zdGF0ZT09XCIxXCIpXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAvL2FsZXJ0KFwibWFpbnRhaW4gc3RhdGVcIik7XHJcbiAgICAgICAgICAgICB2YXIgaW5GaWZ0ZWVuTWludXRlcyA9IG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgMTUgKiA2MCAqIDEwMDApO1xyXG4gICAgICAgICAgICAgLy9odHRwczovL2dpdGh1Yi5jb20vanMtY29va2llL2pzLWNvb2tpZS93aWtpL0ZyZXF1ZW50bHktQXNrZWQtUXVlc3Rpb25zI2V4cGlyZS1jb29raWVzLWluLWxlc3MtdGhhbi1hLWRheVxyXG4gICAgICAgICAgICAgdmFyIHRoaXJ0eW1pbnV0ZXMgPSAxLzQ4O1xyXG4gICAgICAgICAgICAgLy9jb29raWVzLnNldCgnbmFtZScsICdtcnJvc3MnLCB7IGV4cGlyZXM6IDcgfSk7XHJcbiAgICAgICAgICAgICAvL2Nvb2tpZXMuc2V0KCduYW1lJywgJ21ycm9zcycsIHsgZXhwaXJlczogdGhpcnR5bWludXRlcyB9KTtcclxuICAgICAgICAgICAgIGNvb2tpZXMuc2V0KCduYW1lJywgJ21ycm9zcycsIHsgZXhwaXJlczogaW5GaWZ0ZWVuTWludXRlcyB9KTtcclxuICAgICAgICAgICAgIH0qL1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coY29va2llcy5nZXQoJ25hbWUnKSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhjb29raWVzLmdldCgnbmFtZScpKTtcclxuICAgICAgICB0aGlzLnJlc2V0Rm9ybSA9IGZ1bmN0aW9uKHN1Ym1pdF9mb3JtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy91bnNldCBhbGwgZmllbGRzXHJcbiAgICAgICAgICAgIHNlbGYuJGZpZWxkcy5lYWNoKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyICRmaWVsZCA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9zdGFuZGFyZCBmaWVsZCB0eXBlc1xyXG4gICAgICAgICAgICAgICAgJGZpZWxkLmZpbmQoXCJzZWxlY3Q6bm90KFttdWx0aXBsZT0nbXVsdGlwbGUnXSkgPiBvcHRpb246Zmlyc3QtY2hpbGRcIikucHJvcChcInNlbGVjdGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgJGZpZWxkLmZpbmQoXCJzZWxlY3RbbXVsdGlwbGU9J211bHRpcGxlJ10gPiBvcHRpb25cIikucHJvcChcInNlbGVjdGVkXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICRmaWVsZC5maW5kKFwiaW5wdXRbdHlwZT0nY2hlY2tib3gnXVwiKS5wcm9wKFwiY2hlY2tlZFwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAkZmllbGQuZmluZChcIj4gdWwgPiBsaTpmaXJzdC1jaGlsZCBpbnB1dFt0eXBlPSdyYWRpbyddXCIpLnByb3AoXCJjaGVja2VkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgJGZpZWxkLmZpbmQoXCJpbnB1dFt0eXBlPSd0ZXh0J11cIikudmFsKFwiXCIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvL251bWJlciByYW5nZSAtIDIgbnVtYmVyIGlucHV0IGZpZWxkc1xyXG4gICAgICAgICAgICAgICAgJGZpZWxkLmZpbmQoXCJpbnB1dFt0eXBlPSdudW1iZXInXVwiKS5lYWNoKGZ1bmN0aW9uKGluZGV4KXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICR0aGlzSW5wdXQgPSAkKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZigkdGhpc0lucHV0LnBhcmVudCgpLnBhcmVudCgpLmhhc0NsYXNzKFwic2YtbWV0YS1yYW5nZVwiKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaW5kZXg9PTApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzSW5wdXQudmFsKCR0aGlzSW5wdXQuYXR0cihcIm1pblwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihpbmRleD09MSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXNJbnB1dC52YWwoJHRoaXNJbnB1dC5hdHRyKFwibWF4XCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL21ldGEgLyBudW1iZXJzIHdpdGggMiBpbnB1dHMgKGZyb20gLyB0byBmaWVsZHMpIC0gc2Vjb25kIGlucHV0IG11c3QgYmUgcmVzZXQgdG8gbWF4IHZhbHVlXHJcbiAgICAgICAgICAgICAgICB2YXIgJG1ldGFfc2VsZWN0X2Zyb21fdG8gPSAkZmllbGQuZmluZChcIi5zZi1tZXRhLXJhbmdlLXNlbGVjdC1mcm9tdG9cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoJG1ldGFfc2VsZWN0X2Zyb21fdG8ubGVuZ3RoPjApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXJ0X21pbiA9ICRtZXRhX3NlbGVjdF9mcm9tX3RvLmF0dHIoXCJkYXRhLW1pblwiKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhcnRfbWF4ID0gJG1ldGFfc2VsZWN0X2Zyb21fdG8uYXR0cihcImRhdGEtbWF4XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkbWV0YV9zZWxlY3RfZnJvbV90by5maW5kKFwic2VsZWN0XCIpLmVhY2goZnVuY3Rpb24oaW5kZXgpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICR0aGlzSW5wdXQgPSAkKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaW5kZXg9PTApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdGhpc0lucHV0LnZhbChzdGFydF9taW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoaW5kZXg9PTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzSW5wdXQudmFsKHN0YXJ0X21heCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyICRtZXRhX3JhZGlvX2Zyb21fdG8gPSAkZmllbGQuZmluZChcIi5zZi1tZXRhLXJhbmdlLXJhZGlvLWZyb210b1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZigkbWV0YV9yYWRpb19mcm9tX3RvLmxlbmd0aD4wKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGFydF9taW4gPSAkbWV0YV9yYWRpb19mcm9tX3RvLmF0dHIoXCJkYXRhLW1pblwiKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhcnRfbWF4ID0gJG1ldGFfcmFkaW9fZnJvbV90by5hdHRyKFwiZGF0YS1tYXhcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciAkcmFkaW9fZ3JvdXBzID0gJG1ldGFfcmFkaW9fZnJvbV90by5maW5kKCcuc2YtaW5wdXQtcmFuZ2UtcmFkaW8nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHJhZGlvX2dyb3Vwcy5lYWNoKGZ1bmN0aW9uKGluZGV4KXtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJHJhZGlvcyA9ICQodGhpcykuZmluZChcIi5zZi1pbnB1dC1yYWRpb1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHJhZGlvcy5wcm9wKFwiY2hlY2tlZFwiLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpbmRleD09MClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJhZGlvcy5maWx0ZXIoJ1t2YWx1ZT1cIicrc3RhcnRfbWluKydcIl0nKS5wcm9wKFwiY2hlY2tlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKGluZGV4PT0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcmFkaW9zLmZpbHRlcignW3ZhbHVlPVwiJytzdGFydF9tYXgrJ1wiXScpLnByb3AoXCJjaGVja2VkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL251bWJlciBzbGlkZXIgLSBub1VpU2xpZGVyXHJcbiAgICAgICAgICAgICAgICAkZmllbGQuZmluZChcIi5tZXRhLXNsaWRlclwiKS5lYWNoKGZ1bmN0aW9uKGluZGV4KXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNsaWRlcl9vYmplY3QgPSAkKHRoaXMpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIC8qdmFyIHNsaWRlcl9vYmplY3QgPSAkY29udGFpbmVyLmZpbmQoXCIubWV0YS1zbGlkZXJcIilbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZXJfdmFsID0gc2xpZGVyX29iamVjdC5ub1VpU2xpZGVyLmdldCgpOyovXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciAkc2xpZGVyX2VsID0gJCh0aGlzKS5jbG9zZXN0KFwiLnNmLW1ldGEtcmFuZ2Utc2xpZGVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtaW5WYWwgPSAkc2xpZGVyX2VsLmF0dHIoXCJkYXRhLW1pblwiKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWF4VmFsID0gJHNsaWRlcl9lbC5hdHRyKFwiZGF0YS1tYXhcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyX29iamVjdC5ub1VpU2xpZGVyLnNldChbbWluVmFsLCBtYXhWYWxdKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL25lZWQgdG8gc2VlIGlmIGFueSBhcmUgY29tYm9ib3ggYW5kIGFjdCBhY2NvcmRpbmdseVxyXG4gICAgICAgICAgICAgICAgdmFyICRjb21ib2JveCA9ICRmaWVsZC5maW5kKFwic2VsZWN0W2RhdGEtY29tYm9ib3g9JzEnXVwiKTtcclxuICAgICAgICAgICAgICAgIGlmKCRjb21ib2JveC5sZW5ndGg+MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mICRjb21ib2JveC5jaG9zZW4gIT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRjb21ib2JveC50cmlnZ2VyKFwiY2hvc2VuOnVwZGF0ZWRcIik7IC8vZm9yIGNob3NlbiBvbmx5XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRjb21ib2JveC52YWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkY29tYm9ib3gudHJpZ2dlcignY2hhbmdlLnNlbGVjdDInKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNlbGYuY2xlYXJUaW1lcigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZihzdWJtaXRfZm9ybT09XCJhbHdheXNcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zdWJtaXRGb3JtKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihzdWJtaXRfZm9ybT09XCJuZXZlclwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmF1dG9fY291bnRfcmVmcmVzaF9tb2RlPT0xKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZm9ybVVwZGF0ZWRGZXRjaEFqYXgoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHN1Ym1pdF9mb3JtPT1cImF1dG9cIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5hdXRvX3VwZGF0ZT09dHJ1ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnN1Ym1pdEZvcm0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmF1dG9fY291bnRfcmVmcmVzaF9tb2RlPT0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mb3JtVXBkYXRlZEZldGNoQWpheCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuXHJcbiAgICAgICAgdmFyIGV2ZW50X2RhdGEgPSB7fTtcclxuICAgICAgICBldmVudF9kYXRhLnNmaWQgPSBzZWxmLnNmaWQ7XHJcbiAgICAgICAgZXZlbnRfZGF0YS50YXJnZXRTZWxlY3RvciA9IHNlbGYuYWpheF90YXJnZXRfYXR0cjtcclxuICAgICAgICBldmVudF9kYXRhLm9iamVjdCA9IHRoaXM7XHJcbiAgICAgICAgaWYob3B0cy5pc0luaXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZWxmLnRyaWdnZXJFdmVudChcInNmOmluaXRcIiwgZXZlbnRfZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG59O1xyXG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5OeVl5OXdkV0pzYVdNdllYTnpaWFJ6TDJwekwybHVZMngxWkdWekwzQnNkV2RwYmk1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTSXNJbVpwYkdVaU9pSm5aVzVsY21GMFpXUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpWEhKY2JuWmhjaUFrSUZ4MFhIUmNkRngwUFNBb2RIbHdaVzltSUhkcGJtUnZkeUFoUFQwZ1hDSjFibVJsWm1sdVpXUmNJaUEvSUhkcGJtUnZkMXNuYWxGMVpYSjVKMTBnT2lCMGVYQmxiMllnWjJ4dlltRnNJQ0U5UFNCY0luVnVaR1ZtYVc1bFpGd2lJRDhnWjJ4dlltRnNXeWRxVVhWbGNua25YU0E2SUc1MWJHd3BPMXh5WEc1MllYSWdjM1JoZEdVZ1hIUmNkRngwUFNCeVpYRjFhWEpsS0NjdUwzTjBZWFJsSnlrN1hISmNiblpoY2lCd2NtOWpaWE56WDJadmNtMGdYSFE5SUhKbGNYVnBjbVVvSnk0dmNISnZZMlZ6YzE5bWIzSnRKeWs3WEhKY2JuWmhjaUJ1YjFWcFUyeHBaR1Z5WEhSY2REMGdjbVZ4ZFdseVpTZ25ibTkxYVhOc2FXUmxjaWNwTzF4eVhHNTJZWElnWTI5dmEybGxjeUFnSUNBZ0lDQWdJRDBnY21WeGRXbHlaU2duYW5NdFkyOXZhMmxsSnlrN1hISmNibHh5WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1S0c5d2RHbHZibk1wWEhKY2JudGNjbHh1SUNBZ0lIWmhjaUJrWldaaGRXeDBjeUE5SUh0Y2NseHVJQ0FnSUNBZ0lDQnpkR0Z5ZEU5d1pXNWxaRG9nWm1Gc2MyVXNYSEpjYmlBZ0lDQWdJQ0FnYVhOSmJtbDBPaUIwY25WbExGeHlYRzRnSUNBZ0lDQWdJR0ZqZEdsdmJqb2dYQ0pjSWx4eVhHNGdJQ0FnZlR0Y2NseHVYSEpjYmlBZ0lDQjJZWElnYjNCMGN5QTlJR3BSZFdWeWVTNWxlSFJsYm1Rb1pHVm1ZWFZzZEhNc0lHOXdkR2x2Ym5NcE8xeHlYRzVjY2x4dUlDQWdJQzh2Ykc5dmNDQjBhSEp2ZFdkb0lHVmhZMmdnYVhSbGJTQnRZWFJqYUdWa1hISmNiaUFnSUNCMGFHbHpMbVZoWTJnb1puVnVZM1JwYjI0b0tWeHlYRzRnSUNBZ2UxeHlYRzVjY2x4dUlDQWdJQ0FnSUNCMllYSWdKSFJvYVhNZ1BTQWtLSFJvYVhNcE8xeHlYRzRnSUNBZ0lDQWdJSFpoY2lCelpXeG1JRDBnZEdocGN6dGNjbHh1SUNBZ0lDQWdJQ0IwYUdsekxuTm1hV1FnUFNBa2RHaHBjeTVoZEhSeUtGd2laR0YwWVMxelppMW1iM0p0TFdsa1hDSXBPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQnpkR0YwWlM1aFpHUlRaV0Z5WTJoR2IzSnRLSFJvYVhNdWMyWnBaQ3dnZEdocGN5azdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lIUm9hWE11SkdacFpXeGtjeUE5SUNSMGFHbHpMbVpwYm1Rb1hDSStJSFZzSUQ0Z2JHbGNJaWs3SUM4dllTQnlaV1psY21WdVkyVWdkRzhnWldGamFDQm1hV1ZzWkhNZ2NHRnlaVzUwSUV4SlhISmNibHh5WEc0Z0lDQWdJQ0FnSUhSb2FYTXVaVzVoWW14bFgzUmhlRzl1YjIxNVgyRnlZMmhwZG1WeklEMGdKSFJvYVhNdVlYUjBjaWduWkdGMFlTMTBZWGh2Ym05dGVTMWhjbU5vYVhabGN5Y3BPMXh5WEc0Z0lDQWdJQ0FnSUhSb2FYTXVZM1Z5Y21WdWRGOTBZWGh2Ym05dGVWOWhjbU5vYVhabElEMGdKSFJvYVhNdVlYUjBjaWduWkdGMFlTMWpkWEp5Wlc1MExYUmhlRzl1YjIxNUxXRnlZMmhwZG1VbktUdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ2FXWW9kSGx3Wlc5bUtIUm9hWE11Wlc1aFlteGxYM1JoZUc5dWIyMTVYMkZ5WTJocGRtVnpLVDA5WENKMWJtUmxabWx1WldSY0lpbGNjbHh1SUNBZ0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdVpXNWhZbXhsWDNSaGVHOXViMjE1WDJGeVkyaHBkbVZ6SUQwZ1hDSXdYQ0k3WEhKY2JpQWdJQ0FnSUNBZ2ZWeHlYRzRnSUNBZ0lDQWdJR2xtS0hSNWNHVnZaaWgwYUdsekxtTjFjbkpsYm5SZmRHRjRiMjV2YlhsZllYSmphR2wyWlNrOVBWd2lkVzVrWldacGJtVmtYQ0lwWEhKY2JpQWdJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbU4xY25KbGJuUmZkR0Y0YjI1dmJYbGZZWEpqYUdsMlpTQTlJRndpWENJN1hISmNiaUFnSUNBZ0lDQWdmVnh5WEc1Y2NseHVJQ0FnSUNBZ0lDQndjbTlqWlhOelgyWnZjbTB1YVc1cGRDaHpaV3htTG1WdVlXSnNaVjkwWVhodmJtOXRlVjloY21Ob2FYWmxjeXdnYzJWc1ppNWpkWEp5Wlc1MFgzUmhlRzl1YjIxNVgyRnlZMmhwZG1VcE8xeHlYRzRnSUNBZ0lDQWdJQzh2Y0hKdlkyVnpjMTltYjNKdExuTmxkRlJoZUVGeVkyaHBkbVZTWlhOMWJIUnpWWEpzS0hObGJHWXBPMXh5WEc0Z0lDQWdJQ0FnSUhCeWIyTmxjM05mWm05eWJTNWxibUZpYkdWSmJuQjFkSE1vYzJWc1ppazdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lHbG1LSFI1Y0dWdlppaDBhR2x6TG1WNGRISmhYM0YxWlhKNVgzQmhjbUZ0Y3lrOVBWd2lkVzVrWldacGJtVmtYQ0lwWEhKY2JpQWdJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbVY0ZEhKaFgzRjFaWEo1WDNCaGNtRnRjeUE5SUh0aGJHdzZJSHQ5TENCeVpYTjFiSFJ6T2lCN2ZTd2dZV3BoZURvZ2UzMTlPMXh5WEc0Z0lDQWdJQ0FnSUgxY2NseHVYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lIUm9hWE11ZEdWdGNHeGhkR1ZmYVhOZmJHOWhaR1ZrSUQwZ0pIUm9hWE11WVhSMGNpaGNJbVJoZEdFdGRHVnRjR3hoZEdVdGJHOWhaR1ZrWENJcE8xeHlYRzRnSUNBZ0lDQWdJSFJvYVhNdWFYTmZZV3BoZUNBOUlDUjBhR2x6TG1GMGRISW9YQ0prWVhSaExXRnFZWGhjSWlrN1hISmNiaUFnSUNBZ0lDQWdkR2hwY3k1cGJuTjBZVzVqWlY5dWRXMWlaWElnUFNBa2RHaHBjeTVoZEhSeUtDZGtZWFJoTFdsdWMzUmhibU5sTFdOdmRXNTBKeWs3WEhKY2JpQWdJQ0FnSUNBZ2RHaHBjeTRrWVdwaGVGOXlaWE4xYkhSelgyTnZiblJoYVc1bGNpQTlJR3BSZFdWeWVTZ2tkR2hwY3k1aGRIUnlLRndpWkdGMFlTMWhhbUY0TFhSaGNtZGxkRndpS1NrN1hISmNibHh5WEc0Z0lDQWdJQ0FnSUhSb2FYTXVjbVZ6ZFd4MGMxOTFjbXdnUFNBa2RHaHBjeTVoZEhSeUtGd2laR0YwWVMxeVpYTjFiSFJ6TFhWeWJGd2lLVHRjY2x4dUlDQWdJQ0FnSUNCMGFHbHpMbVJsWW5WblgyMXZaR1VnUFNBa2RHaHBjeTVoZEhSeUtGd2laR0YwWVMxa1pXSjFaeTF0YjJSbFhDSXBPMXh5WEc0Z0lDQWdJQ0FnSUhSb2FYTXVkWEJrWVhSbFgyRnFZWGhmZFhKc0lEMGdKSFJvYVhNdVlYUjBjaWhjSW1SaGRHRXRkWEJrWVhSbExXRnFZWGd0ZFhKc1hDSXBPMXh5WEc0Z0lDQWdJQ0FnSUhSb2FYTXVjR0ZuYVc1aGRHbHZibDkwZVhCbElEMGdKSFJvYVhNdVlYUjBjaWhjSW1SaGRHRXRZV3BoZUMxd1lXZHBibUYwYVc5dUxYUjVjR1ZjSWlrN1hISmNiaUFnSUNBZ0lDQWdkR2hwY3k1aGRYUnZYMk52ZFc1MElEMGdKSFJvYVhNdVlYUjBjaWhjSW1SaGRHRXRZWFYwYnkxamIzVnVkRndpS1R0Y2NseHVJQ0FnSUNBZ0lDQjBhR2x6TG1GMWRHOWZZMjkxYm5SZmNtVm1jbVZ6YUY5dGIyUmxJRDBnSkhSb2FYTXVZWFIwY2loY0ltUmhkR0V0WVhWMGJ5MWpiM1Z1ZEMxeVpXWnlaWE5vTFcxdlpHVmNJaWs3WEhKY2JpQWdJQ0FnSUNBZ2RHaHBjeTV2Ym14NVgzSmxjM1ZzZEhOZllXcGhlQ0E5SUNSMGFHbHpMbUYwZEhJb1hDSmtZWFJoTFc5dWJIa3RjbVZ6ZFd4MGN5MWhhbUY0WENJcE95QXZMMmxtSUhkbElHRnlaU0J1YjNRZ2IyNGdkR2hsSUhKbGMzVnNkSE1nY0dGblpTd2djbVZrYVhKbFkzUWdjbUYwYUdWeUlIUm9ZVzRnZEhKNUlIUnZJR3h2WVdRZ2RtbGhJR0ZxWVhoY2NseHVJQ0FnSUNBZ0lDQjBhR2x6TG5OamNtOXNiRjkwYjE5d2IzTWdQU0FrZEdocGN5NWhkSFJ5S0Z3aVpHRjBZUzF6WTNKdmJHd3RkRzh0Y0c5elhDSXBPMXh5WEc0Z0lDQWdJQ0FnSUhSb2FYTXVZM1Z6ZEc5dFgzTmpjbTlzYkY5MGJ5QTlJQ1IwYUdsekxtRjBkSElvWENKa1lYUmhMV04xYzNSdmJTMXpZM0p2Ykd3dGRHOWNJaWs3WEhKY2JpQWdJQ0FnSUNBZ2RHaHBjeTV6WTNKdmJHeGZiMjVmWVdOMGFXOXVJRDBnSkhSb2FYTXVZWFIwY2loY0ltUmhkR0V0YzJOeWIyeHNMVzl1TFdGamRHbHZibHdpS1R0Y2NseHVJQ0FnSUNBZ0lDQjBhR2x6TG14aGJtZGZZMjlrWlNBOUlDUjBhR2x6TG1GMGRISW9YQ0prWVhSaExXeGhibWN0WTI5a1pWd2lLVHRjY2x4dUlDQWdJQ0FnSUNCMGFHbHpMbUZxWVhoZmRYSnNJRDBnSkhSb2FYTXVZWFIwY2lnblpHRjBZUzFoYW1GNExYVnliQ2NwTzF4eVhHNGdJQ0FnSUNBZ0lIUm9hWE11WVdwaGVGOW1iM0p0WDNWeWJDQTlJQ1IwYUdsekxtRjBkSElvSjJSaGRHRXRZV3BoZUMxbWIzSnRMWFZ5YkNjcE8xeHlYRzRnSUNBZ0lDQWdJSFJvYVhNdWFYTmZjblJzSUQwZ0pIUm9hWE11WVhSMGNpZ25aR0YwWVMxcGN5MXlkR3duS1R0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnZEdocGN5NWthWE53YkdGNVgzSmxjM1ZzZEY5dFpYUm9iMlFnUFNBa2RHaHBjeTVoZEhSeUtDZGtZWFJoTFdScGMzQnNZWGt0Y21WemRXeDBMVzFsZEdodlpDY3BPMXh5WEc0Z0lDQWdJQ0FnSUhSb2FYTXViV0ZwYm5SaGFXNWZjM1JoZEdVZ1BTQWtkR2hwY3k1aGRIUnlLQ2RrWVhSaExXMWhhVzUwWVdsdUxYTjBZWFJsSnlrN1hISmNiaUFnSUNBZ0lDQWdkR2hwY3k1aGFtRjRYMkZqZEdsdmJpQTlJRndpWENJN1hISmNiaUFnSUNBZ0lDQWdkR2hwY3k1c1lYTjBYM04xWW0xcGRGOXhkV1Z5ZVY5d1lYSmhiWE1nUFNCY0lsd2lPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQjBhR2x6TG1OMWNuSmxiblJmY0dGblpXUWdQU0J3WVhKelpVbHVkQ2drZEdocGN5NWhkSFJ5S0Nka1lYUmhMV2x1YVhRdGNHRm5aV1FuS1NrN1hISmNiaUFnSUNBZ0lDQWdkR2hwY3k1c1lYTjBYMnh2WVdSZmJXOXlaVjlvZEcxc0lEMGdYQ0pjSWp0Y2NseHVJQ0FnSUNBZ0lDQjBhR2x6TG14dllXUmZiVzl5WlY5b2RHMXNJRDBnWENKY0lqdGNjbHh1SUNBZ0lDQWdJQ0IwYUdsekxtRnFZWGhmWkdGMFlWOTBlWEJsSUQwZ0pIUm9hWE11WVhSMGNpZ25aR0YwWVMxaGFtRjRMV1JoZEdFdGRIbHdaU2NwTzF4eVhHNGdJQ0FnSUNBZ0lIUm9hWE11WVdwaGVGOTBZWEpuWlhSZllYUjBjaUE5SUNSMGFHbHpMbUYwZEhJb1hDSmtZWFJoTFdGcVlYZ3RkR0Z5WjJWMFhDSXBPMXh5WEc0Z0lDQWdJQ0FnSUhSb2FYTXVkWE5sWDJocGMzUnZjbmxmWVhCcElEMGdKSFJvYVhNdVlYUjBjaWhjSW1SaGRHRXRkWE5sTFdocGMzUnZjbmt0WVhCcFhDSXBPMXh5WEc0Z0lDQWdJQ0FnSUhSb2FYTXVhWE5mYzNWaWJXbDBkR2x1WnlBOUlHWmhiSE5sTzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0IwYUdsekxteGhjM1JmWVdwaGVGOXlaWEYxWlhOMElEMGdiblZzYkR0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnYVdZb2RIbHdaVzltS0hSb2FYTXVkWE5sWDJocGMzUnZjbmxmWVhCcEtUMDlYQ0oxYm1SbFptbHVaV1JjSWlsY2NseHVJQ0FnSUNBZ0lDQjdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11ZFhObFgyaHBjM1J2Y25sZllYQnBJRDBnWENKY0lqdGNjbHh1SUNBZ0lDQWdJQ0I5WEhKY2JseHlYRzRnSUNBZ0lDQWdJR2xtS0hSNWNHVnZaaWgwYUdsekxuQmhaMmx1WVhScGIyNWZkSGx3WlNrOVBWd2lkVzVrWldacGJtVmtYQ0lwWEhKY2JpQWdJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbkJoWjJsdVlYUnBiMjVmZEhsd1pTQTlJRndpYm05eWJXRnNYQ0k3WEhKY2JpQWdJQ0FnSUNBZ2ZWeHlYRzRnSUNBZ0lDQWdJR2xtS0hSNWNHVnZaaWgwYUdsekxtTjFjbkpsYm5SZmNHRm5aV1FwUFQxY0luVnVaR1ZtYVc1bFpGd2lLVnh5WEc0Z0lDQWdJQ0FnSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NWpkWEp5Wlc1MFgzQmhaMlZrSUQwZ01UdGNjbHh1SUNBZ0lDQWdJQ0I5WEhKY2JseHlYRzRnSUNBZ0lDQWdJR2xtS0hSNWNHVnZaaWgwYUdsekxtRnFZWGhmZEdGeVoyVjBYMkYwZEhJcFBUMWNJblZ1WkdWbWFXNWxaRndpS1Z4eVhHNGdJQ0FnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTVoYW1GNFgzUmhjbWRsZEY5aGRIUnlJRDBnWENKY0lqdGNjbHh1SUNBZ0lDQWdJQ0I5WEhKY2JseHlYRzRnSUNBZ0lDQWdJR2xtS0hSNWNHVnZaaWgwYUdsekxtRnFZWGhmZFhKc0tUMDlYQ0oxYm1SbFptbHVaV1JjSWlsY2NseHVJQ0FnSUNBZ0lDQjdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11WVdwaGVGOTFjbXdnUFNCY0lsd2lPMXh5WEc0Z0lDQWdJQ0FnSUgxY2NseHVYSEpjYmlBZ0lDQWdJQ0FnYVdZb2RIbHdaVzltS0hSb2FYTXVZV3BoZUY5bWIzSnRYM1Z5YkNrOVBWd2lkVzVrWldacGJtVmtYQ0lwWEhKY2JpQWdJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbUZxWVhoZlptOXliVjkxY213Z1BTQmNJbHdpTzF4eVhHNGdJQ0FnSUNBZ0lIMWNjbHh1WEhKY2JpQWdJQ0FnSUNBZ2FXWW9kSGx3Wlc5bUtIUm9hWE11Y21WemRXeDBjMTkxY213cFBUMWNJblZ1WkdWbWFXNWxaRndpS1Z4eVhHNGdJQ0FnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTV5WlhOMWJIUnpYM1Z5YkNBOUlGd2lYQ0k3WEhKY2JpQWdJQ0FnSUNBZ2ZWeHlYRzVjY2x4dUlDQWdJQ0FnSUNCcFppaDBlWEJsYjJZb2RHaHBjeTV6WTNKdmJHeGZkRzlmY0c5ektUMDlYQ0oxYm1SbFptbHVaV1JjSWlsY2NseHVJQ0FnSUNBZ0lDQjdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11YzJOeWIyeHNYM1J2WDNCdmN5QTlJRndpWENJN1hISmNiaUFnSUNBZ0lDQWdmVnh5WEc1Y2NseHVJQ0FnSUNBZ0lDQnBaaWgwZVhCbGIyWW9kR2hwY3k1elkzSnZiR3hmYjI1ZllXTjBhVzl1S1QwOVhDSjFibVJsWm1sdVpXUmNJaWxjY2x4dUlDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUhSb2FYTXVjMk55YjJ4c1gyOXVYMkZqZEdsdmJpQTlJRndpWENJN1hISmNiaUFnSUNBZ0lDQWdmVnh5WEc0Z0lDQWdJQ0FnSUdsbUtIUjVjR1Z2WmloMGFHbHpMbU4xYzNSdmJWOXpZM0p2Ykd4ZmRHOHBQVDFjSW5WdVpHVm1hVzVsWkZ3aUtWeHlYRzRnSUNBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1amRYTjBiMjFmYzJOeWIyeHNYM1J2SUQwZ1hDSmNJanRjY2x4dUlDQWdJQ0FnSUNCOVhISmNiaUFnSUNBZ0lDQWdkR2hwY3k0a1kzVnpkRzl0WDNOamNtOXNiRjkwYnlBOUlHcFJkV1Z5ZVNoMGFHbHpMbU4xYzNSdmJWOXpZM0p2Ykd4ZmRHOHBPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQnBaaWgwZVhCbGIyWW9kR2hwY3k1MWNHUmhkR1ZmWVdwaGVGOTFjbXdwUFQxY0luVnVaR1ZtYVc1bFpGd2lLVnh5WEc0Z0lDQWdJQ0FnSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NTFjR1JoZEdWZllXcGhlRjkxY213Z1BTQmNJbHdpTzF4eVhHNGdJQ0FnSUNBZ0lIMWNjbHh1WEhKY2JpQWdJQ0FnSUNBZ2FXWW9kSGx3Wlc5bUtIUm9hWE11WkdWaWRXZGZiVzlrWlNrOVBWd2lkVzVrWldacGJtVmtYQ0lwWEhKY2JpQWdJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbVJsWW5WblgyMXZaR1VnUFNCY0lsd2lPMXh5WEc0Z0lDQWdJQ0FnSUgxY2NseHVYSEpjYmlBZ0lDQWdJQ0FnYVdZb2RIbHdaVzltS0hSb2FYTXVZV3BoZUY5MFlYSm5aWFJmYjJKcVpXTjBLVDA5WENKMWJtUmxabWx1WldSY0lpbGNjbHh1SUNBZ0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdVlXcGhlRjkwWVhKblpYUmZiMkpxWldOMElEMGdYQ0pjSWp0Y2NseHVJQ0FnSUNBZ0lDQjlYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lHbG1LSFI1Y0dWdlppaDBhR2x6TG5SbGJYQnNZWFJsWDJselgyeHZZV1JsWkNrOVBWd2lkVzVrWldacGJtVmtYQ0lwWEhKY2JpQWdJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMblJsYlhCc1lYUmxYMmx6WDJ4dllXUmxaQ0E5SUZ3aU1Gd2lPMXh5WEc0Z0lDQWdJQ0FnSUgxY2NseHVYSEpjYmlBZ0lDQWdJQ0FnYVdZb2RIbHdaVzltS0hSb2FYTXVZWFYwYjE5amIzVnVkRjl5WldaeVpYTm9YMjF2WkdVcFBUMWNJblZ1WkdWbWFXNWxaRndpS1Z4eVhHNGdJQ0FnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTVoZFhSdlgyTnZkVzUwWDNKbFpuSmxjMmhmYlc5a1pTQTlJRndpTUZ3aU8xeHlYRzRnSUNBZ0lDQWdJSDFjY2x4dVhISmNiaUFnSUNBZ0lDQWdkR2hwY3k1aGFtRjRYMnhwYm10elgzTmxiR1ZqZEc5eUlEMGdKSFJvYVhNdVlYUjBjaWhjSW1SaGRHRXRZV3BoZUMxc2FXNXJjeTF6Wld4bFkzUnZjbHdpS1R0Y2NseHVYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lIUm9hWE11WVhWMGIxOTFjR1JoZEdVZ1BTQWtkR2hwY3k1aGRIUnlLRndpWkdGMFlTMWhkWFJ2TFhWd1pHRjBaVndpS1R0Y2NseHVJQ0FnSUNBZ0lDQjBhR2x6TG1sdWNIVjBWR2x0WlhJZ1BTQXdPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQjBhR2x6TG5ObGRFbHVabWx1YVhSbFUyTnliMnhzUTI5dWRHRnBibVZ5SUQwZ1puVnVZM1JwYjI0b0tWeHlYRzRnSUNBZ0lDQWdJSHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUhSb2FYTXVhWE5mYldGNFgzQmhaMlZrSUQwZ1ptRnNjMlU3SUM4dlptOXlJR3h2WVdRZ2JXOXlaU0J2Ym14NUxDQnZibU5sSUhkbElHUmxkR1ZqZENCM1pTZHlaU0JoZENCMGFHVWdaVzVrSUhObGRDQjBhR2x6SUhSdklIUnlkV1ZjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1MWMyVmZjMk55YjJ4c1gyeHZZV1JsY2lBOUlDUjBhR2x6TG1GMGRISW9KMlJoZEdFdGMyaHZkeTF6WTNKdmJHd3RiRzloWkdWeUp5azdJQzh2Wm05eUlHeHZZV1FnYlc5eVpTQnZibXg1TENCdmJtTmxJSGRsSUdSbGRHVmpkQ0IzWlNkeVpTQmhkQ0IwYUdVZ1pXNWtJSE5sZENCMGFHbHpJSFJ2SUhSeWRXVmNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTVwYm1acGJtbDBaVjl6WTNKdmJHeGZZMjl1ZEdGcGJtVnlJRDBnSkhSb2FYTXVZWFIwY2lnblpHRjBZUzFwYm1acGJtbDBaUzF6WTNKdmJHd3RZMjl1ZEdGcGJtVnlKeWs3SUM4dlptOXlJR3h2WVdRZ2JXOXlaU0J2Ym14NUxDQnZibU5sSUhkbElHUmxkR1ZqZENCM1pTZHlaU0JoZENCMGFHVWdaVzVrSUhObGRDQjBhR2x6SUhSdklIUnlkV1ZjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1cGJtWnBibWwwWlY5elkzSnZiR3hmZEhKcFoyZGxjbDloYlc5MWJuUWdQU0FrZEdocGN5NWhkSFJ5S0Nka1lYUmhMV2x1Wm1sdWFYUmxMWE5qY205c2JDMTBjbWxuWjJWeUp5azdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11YVc1bWFXNXBkR1ZmYzJOeWIyeHNYM0psYzNWc2RGOWpiR0Z6Y3lBOUlDUjBhR2x6TG1GMGRISW9KMlJoZEdFdGFXNW1hVzVwZEdVdGMyTnliMnhzTFhKbGMzVnNkQzFqYkdGemN5Y3BPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjBhR2x6TGlScGJtWnBibWwwWlY5elkzSnZiR3hmWTI5dWRHRnBibVZ5SUQwZ2RHaHBjeTRrWVdwaGVGOXlaWE4xYkhSelgyTnZiblJoYVc1bGNqdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJR2xtS0hSNWNHVnZaaWgwYUdsekxtbHVabWx1YVhSbFgzTmpjbTlzYkY5amIyNTBZV2x1WlhJcFBUMWNJblZ1WkdWbWFXNWxaRndpS1Z4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbWx1Wm1sdWFYUmxYM05qY205c2JGOWpiMjUwWVdsdVpYSWdQU0JjSWx3aU8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUdWc2MyVmNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k0a2FXNW1hVzVwZEdWZmMyTnliMnhzWDJOdmJuUmhhVzVsY2lBOUlHcFJkV1Z5ZVNna2RHaHBjeTVoZEhSeUtDZGtZWFJoTFdsdVptbHVhWFJsTFhOamNtOXNiQzFqYjI1MFlXbHVaWEluS1NrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1LSFI1Y0dWdlppaDBhR2x6TG1sdVptbHVhWFJsWDNOamNtOXNiRjl5WlhOMWJIUmZZMnhoYzNNcFBUMWNJblZ1WkdWbWFXNWxaRndpS1Z4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbWx1Wm1sdWFYUmxYM05qY205c2JGOXlaWE4xYkhSZlkyeGhjM01nUFNCY0lsd2lPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmloMGVYQmxiMllvZEdocGN5NTFjMlZmYzJOeWIyeHNYMnh2WVdSbGNpazlQVndpZFc1a1pXWnBibVZrWENJcFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11ZFhObFgzTmpjbTlzYkY5c2IyRmtaWElnUFNBeE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhISmNibHh5WEc0Z0lDQWdJQ0FnSUgwN1hISmNiaUFnSUNBZ0lDQWdkR2hwY3k1elpYUkpibVpwYm1sMFpWTmpjbTlzYkVOdmJuUmhhVzVsY2lncE8xeHlYRzVjY2x4dUlDQWdJQ0FnSUNBdktpQm1kVzVqZEdsdmJuTWdLaTljY2x4dVhISmNiaUFnSUNBZ0lDQWdkR2hwY3k1eVpYTmxkQ0E5SUdaMWJtTjBhVzl1S0hOMVltMXBkRjltYjNKdEtWeHlYRzRnSUNBZ0lDQWdJSHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUhSb2FYTXVjbVZ6WlhSR2IzSnRLSE4xWW0xcGRGOW1iM0p0S1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJSFJ5ZFdVN1hISmNiaUFnSUNBZ0lDQWdmVnh5WEc1Y2NseHVJQ0FnSUNBZ0lDQjBhR2x6TG1sdWNIVjBWWEJrWVhSbElEMGdablZ1WTNScGIyNG9aR1ZzWVhsRWRYSmhkR2x2YmlsY2NseHVJQ0FnSUNBZ0lDQjdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1LSFI1Y0dWdlppaGtaV3hoZVVSMWNtRjBhVzl1S1QwOVhDSjFibVJsWm1sdVpXUmNJaWxjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlHUmxiR0Y1UkhWeVlYUnBiMjRnUFNBek1EQTdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSE5sYkdZdWNtVnpaWFJVYVcxbGNpaGtaV3hoZVVSMWNtRjBhVzl1S1R0Y2NseHVJQ0FnSUNBZ0lDQjlYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lIUm9hWE11WkdGMFpVbHVjSFYwVkhsd1pTQTlJR1oxYm1OMGFXOXVLQ2xjY2x4dUlDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGNpQWtkR2hwYzJVZ1BTQWtLSFJvYVhNcE8xeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lvS0hObGJHWXVZWFYwYjE5MWNHUmhkR1U5UFRFcGZId29jMlZzWmk1aGRYUnZYMk52ZFc1MFgzSmxabkpsYzJoZmJXOWtaVDA5TVNrcFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUFrZEdaZlpHRjBaVjl3YVdOclpYSnpJRDBnSkhSb2FYTXVabWx1WkNoY0lpNXpaaTFrWVhSbGNHbGphMlZ5WENJcE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUc1dlgyUmhkR1ZmY0dsamEyVnljeUE5SUNSMFpsOWtZWFJsWDNCcFkydGxjbk11YkdWdVozUm9PMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1LRzV2WDJSaGRHVmZjR2xqYTJWeWN6NHhLVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzh2ZEdobGJpQnBkQ0JwY3lCaElHUmhkR1VnY21GdVoyVXNJSE52SUcxaGEyVWdjM1Z5WlNCaWIzUm9JR1pwWld4a2N5QmhjbVVnWm1sc2JHVmtJR0psWm05eVpTQjFjR1JoZEdsdVoxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQmtjRjlqYjNWdWRHVnlJRDBnTUR0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ1pIQmZaVzF3ZEhsZlptbGxiR1JmWTI5MWJuUWdQU0F3TzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ1IwWmw5a1lYUmxYM0JwWTJ0bGNuTXVaV0ZqYUNobWRXNWpkR2x2YmlncElIdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUtDUW9kR2hwY3lrdWRtRnNLQ2s5UFZ3aVhDSXBYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHUndYMlZ0Y0hSNVgyWnBaV3hrWDJOdmRXNTBLeXM3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1J3WDJOdmRXNTBaWElyS3p0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5S1R0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWW9aSEJmWlcxd2RIbGZabWxsYkdSZlkyOTFiblE5UFRBcElIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjMlZzWmk1cGJuQjFkRlZ3WkdGMFpTZ3hNakF3S1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmxiSE5sSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J6Wld4bUxtbHVjSFYwVlhCa1lYUmxLREV5TURBcE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYSEpjYmlBZ0lDQWdJQ0FnZlZ4eVhHNWNjbHh1WEhKY2JpQWdJQ0FnSUNBZ2RHaHBjeTV6WTNKdmJHeFViMUJ2Y3lBOUlHWjFibU4wYVc5dUtDa2dlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZWElnYjJabWMyVjBJRDBnTUR0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlHTmhibE5qY205c2JDQTlJSFJ5ZFdVN1hISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaWh6Wld4bUxtbHpYMkZxWVhnOVBURXBYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtS0hObGJHWXVjMk55YjJ4c1gzUnZYM0J2Y3owOVhDSjNhVzVrYjNkY0lpbGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnZabVp6WlhRZ1BTQXdPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1ZzYzJVZ2FXWW9jMlZzWmk1elkzSnZiR3hmZEc5ZmNHOXpQVDFjSW1admNtMWNJaWxjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J2Wm1aelpYUWdQU0FrZEdocGN5NXZabVp6WlhRb0tTNTBiM0E3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmxiSE5sSUdsbUtITmxiR1l1YzJOeWIyeHNYM1J2WDNCdmN6MDlYQ0p5WlhOMWJIUnpYQ0lwWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYVdZb2MyVnNaaTRrWVdwaGVGOXlaWE4xYkhSelgyTnZiblJoYVc1bGNpNXNaVzVuZEdnK01DbGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHOW1abk5sZENBOUlITmxiR1l1SkdGcVlYaGZjbVZ6ZFd4MGMxOWpiMjUwWVdsdVpYSXViMlptYzJWMEtDa3VkRzl3TzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHVnNjMlVnYVdZb2MyVnNaaTV6WTNKdmJHeGZkRzlmY0c5elBUMWNJbU4xYzNSdmJWd2lLVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzh2WTNWemRHOXRYM05qY205c2JGOTBiMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1LSE5sYkdZdUpHTjFjM1J2YlY5elkzSnZiR3hmZEc4dWJHVnVaM1JvUGpBcFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCdlptWnpaWFFnUFNCelpXeG1MaVJqZFhOMGIyMWZjMk55YjJ4c1gzUnZMbTltWm5ObGRDZ3BMblJ2Y0R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmxiSE5sWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWTJGdVUyTnliMnhzSUQwZ1ptRnNjMlU3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOVhISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYVdZb1kyRnVVMk55YjJ4c0tWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUW9YQ0pvZEcxc0xDQmliMlI1WENJcExuTjBiM0FvS1M1aGJtbHRZWFJsS0h0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2MyTnliMnhzVkc5d09pQnZabVp6WlhSY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5TENCY0ltNXZjbTFoYkZ3aUxDQmNJbVZoYzJWUGRYUlJkV0ZrWENJZ0tUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh5WEc1Y2NseHVJQ0FnSUNBZ0lDQjlPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQjBhR2x6TG1GMGRHRmphRUZqZEdsMlpVTnNZWE56SUQwZ1puVnVZM1JwYjI0b0tYdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQzh2WTJobFkyc2dkRzhnYzJWbElHbG1JSGRsSUdGeVpTQjFjMmx1WnlCaGFtRjRJQ1lnWVhWMGJ5QmpiM1Z1ZEZ4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0F2TDJsbUlHNXZkQ3dnZEdobElITmxZWEpqYUNCbWIzSnRJR1J2WlhNZ2JtOTBJR2RsZENCeVpXeHZZV1JsWkN3Z2MyOGdkMlVnYm1WbFpDQjBieUIxY0dSaGRHVWdkR2hsSUhObUxXOXdkR2x2YmkxaFkzUnBkbVVnWTJ4aGMzTWdiMjRnWVd4c0lHWnBaV3hrYzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0pIUm9hWE11YjI0b0oyTm9ZVzVuWlNjc0lDZHBibkIxZEZ0MGVYQmxQVndpY21Ga2FXOWNJbDBzSUdsdWNIVjBXM1I1Y0dVOVhDSmphR1ZqYTJKdmVGd2lYU3dnYzJWc1pXTjBKeXdnWm5WdVkzUnBiMjRvWlNsY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJQ1JqZEdocGN5QTlJQ1FvZEdocGN5azdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ0pHTjBhR2x6WDNCaGNtVnVkQ0E5SUNSamRHaHBjeTV3WVhKbGJuUW9LVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQjBhR2x6WDNSaFp5QTlJQ1JqZEdocGN5NXdjbTl3S0Z3aWRHRm5UbUZ0WlZ3aUtTNTBiMHh2ZDJWeVEyRnpaU2dwTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJR2x1Y0hWMFgzUjVjR1VnUFNBa1kzUm9hWE11WVhSMGNpaGNJblI1Y0dWY0lpazdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ2NHRnlaVzUwWDNSaFp5QTlJQ1JqZEdocGMxOXdZWEpsYm5RdWNISnZjQ2hjSW5SaFowNWhiV1ZjSWlrdWRHOU1iM2RsY2tOaGMyVW9LVHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnBaaWdvZEdocGMxOTBZV2M5UFZ3aWFXNXdkWFJjSWlrbUppZ29hVzV3ZFhSZmRIbHdaVDA5WENKeVlXUnBiMXdpS1h4OEtHbHVjSFYwWDNSNWNHVTlQVndpWTJobFkydGliM2hjSWlrcElDWW1JQ2h3WVhKbGJuUmZkR0ZuUFQxY0lteHBYQ0lwS1Z4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQWtZV3hzWDI5d2RHbHZibk1nUFNBa1kzUm9hWE5mY0dGeVpXNTBMbkJoY21WdWRDZ3BMbVpwYm1Rb0oyeHBKeWs3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUNSaGJHeGZiM0IwYVc5dWMxOW1hV1ZzWkhNZ1BTQWtZM1JvYVhOZmNHRnlaVzUwTG5CaGNtVnVkQ2dwTG1acGJtUW9KMmx1Y0hWME9tTm9aV05yWldRbktUdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdKR0ZzYkY5dmNIUnBiMjV6TG5KbGJXOTJaVU5zWVhOektGd2ljMll0YjNCMGFXOXVMV0ZqZEdsMlpWd2lLVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWtZV3hzWDI5d2RHbHZibk5mWm1sbGJHUnpMbVZoWTJnb1puVnVZM1JwYjI0b0tYdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQWtjR0Z5Wlc1MElEMGdKQ2gwYUdsektTNWpiRzl6WlhOMEtGd2liR2xjSWlrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUndZWEpsYm5RdVlXUmtRMnhoYzNNb1hDSnpaaTF2Y0hScGIyNHRZV04wYVhabFhDSXBPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5S1R0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbGJITmxJR2xtS0hSb2FYTmZkR0ZuUFQxY0luTmxiR1ZqZEZ3aUtWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUFrWVd4c1gyOXdkR2x2Ym5NZ1BTQWtZM1JvYVhNdVkyaHBiR1J5Wlc0b0tUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBa1lXeHNYMjl3ZEdsdmJuTXVjbVZ0YjNabFEyeGhjM01vWENKelppMXZjSFJwYjI0dFlXTjBhWFpsWENJcE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQjBhR2x6WDNaaGJDQTlJQ1JqZEdocGN5NTJZV3dvS1R0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJSFJvYVhOZllYSnlYM1poYkNBOUlDaDBlWEJsYjJZZ2RHaHBjMTkyWVd3Z1BUMGdKM04wY21sdVp5Y2dmSHdnZEdocGMxOTJZV3dnYVc1emRHRnVZMlZ2WmlCVGRISnBibWNwSUQ4Z1czUm9hWE5mZG1Gc1hTQTZJSFJvYVhOZmRtRnNPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FrS0hSb2FYTmZZWEp5WDNaaGJDa3VaV0ZqYUNobWRXNWpkR2x2YmlocExDQjJZV3gxWlNsN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUmpkR2hwY3k1bWFXNWtLRndpYjNCMGFXOXVXM1poYkhWbFBTZGNJaXQyWVd4MVpTdGNJaWRkWENJcExtRmtaRU5zWVhOektGd2ljMll0YjNCMGFXOXVMV0ZqZEdsMlpWd2lLVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlLVHRjY2x4dVhISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0I5S1R0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnZlR0Y2NseHVJQ0FnSUNBZ0lDQjBhR2x6TG1sdWFYUkJkWFJ2VlhCa1lYUmxSWFpsYm5SeklEMGdablZ1WTNScGIyNG9LWHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUM4cUlHRjFkRzhnZFhCa1lYUmxJQ292WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJR2xtS0NoelpXeG1MbUYxZEc5ZmRYQmtZWFJsUFQweEtYeDhLSE5sYkdZdVlYVjBiMTlqYjNWdWRGOXlaV1p5WlhOb1gyMXZaR1U5UFRFcEtWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWtkR2hwY3k1dmJpZ25ZMmhoYm1kbEp5d2dKMmx1Y0hWMFczUjVjR1U5WENKeVlXUnBiMXdpWFN3Z2FXNXdkWFJiZEhsd1pUMWNJbU5vWldOclltOTRYQ0pkTENCelpXeGxZM1FuTENCbWRXNWpkR2x2YmlobEtTQjdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2MyVnNaaTVwYm5CMWRGVndaR0YwWlNneU1EQXBPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlNrN1hISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnTHk4a2RHaHBjeTV2YmlnblkyaGhibWRsSnl3Z0p5NXRaWFJoTFhOc2FXUmxjaWNzSUdaMWJtTjBhVzl1S0dVcElIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzh2SUNBZ0lITmxiR1l1YVc1d2RYUlZjR1JoZEdVb01qQXdLVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUM4dklDQWdJR052Ym5OdmJHVXViRzluS0Z3aVEwaEJUa2RGSUUxRlZFRWdVMHhKUkVWU1hDSXBPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnTHk5OUtUdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBa2RHaHBjeTV2YmlnbmFXNXdkWFFuTENBbmFXNXdkWFJiZEhsd1pUMWNJbTUxYldKbGNsd2lYU2NzSUdaMWJtTjBhVzl1S0dVcElIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCelpXeG1MbWx1Y0hWMFZYQmtZWFJsS0Rnd01DazdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5S1R0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ0pIUmxlSFJKYm5CMWRDQTlJQ1IwYUdsekxtWnBibVFvSjJsdWNIVjBXM1I1Y0dVOVhDSjBaWGgwWENKZE9tNXZkQ2d1YzJZdFpHRjBaWEJwWTJ0bGNpa25LVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQnNZWE4wVm1Gc2RXVWdQU0FrZEdWNGRFbHVjSFYwTG5aaGJDZ3BPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUjBhR2x6TG05dUtDZHBibkIxZENjc0lDZHBibkIxZEZ0MGVYQmxQVndpZEdWNGRGd2lYVHB1YjNRb0xuTm1MV1JoZEdWd2FXTnJaWElwSnl3Z1puVnVZM1JwYjI0b0tWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1LR3hoYzNSV1lXeDFaU0U5SkhSbGVIUkpibkIxZEM1MllXd29LU2xjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSE5sYkdZdWFXNXdkWFJWY0dSaGRHVW9NVEl3TUNrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCc1lYTjBWbUZzZFdVZ1BTQWtkR1Y0ZEVsdWNIVjBMblpoYkNncE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmU2s3WEhKY2JseHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNSMGFHbHpMbTl1S0NkclpYbHdjbVZ6Y3ljc0lDZHBibkIxZEZ0MGVYQmxQVndpZEdWNGRGd2lYVHB1YjNRb0xuTm1MV1JoZEdWd2FXTnJaWElwSnl3Z1puVnVZM1JwYjI0b1pTbGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnBaaUFvWlM1M2FHbGphQ0E5UFNBeE15bDdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbExuQnlaWFpsYm5SRVpXWmhkV3gwS0NrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lITmxiR1l1YzNWaWJXbDBSbTl5YlNncE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z1ptRnNjMlU3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMHBPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDOHZKSFJvYVhNdWIyNG9KMmx1Y0hWMEp5d2dKMmx1Y0hWMExuTm1MV1JoZEdWd2FXTnJaWEluTENCelpXeG1MbVJoZEdWSmJuQjFkRlI1Y0dVcE8xeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh5WEc0Z0lDQWdJQ0FnSUgwN1hISmNibHh5WEc0Z0lDQWdJQ0FnSUM4dmRHaHBjeTVwYm1sMFFYVjBiMVZ3WkdGMFpVVjJaVzUwY3lncE8xeHlYRzVjY2x4dVhISmNiaUFnSUNBZ0lDQWdkR2hwY3k1amJHVmhjbFJwYldWeUlEMGdablZ1WTNScGIyNG9LVnh5WEc0Z0lDQWdJQ0FnSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnWTJ4bFlYSlVhVzFsYjNWMEtITmxiR1l1YVc1d2RYUlVhVzFsY2lrN1hISmNiaUFnSUNBZ0lDQWdmVHRjY2x4dUlDQWdJQ0FnSUNCMGFHbHpMbkpsYzJWMFZHbHRaWElnUFNCbWRXNWpkR2x2Ymloa1pXeGhlVVIxY21GMGFXOXVLVnh5WEc0Z0lDQWdJQ0FnSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnWTJ4bFlYSlVhVzFsYjNWMEtITmxiR1l1YVc1d2RYUlVhVzFsY2lrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUhObGJHWXVhVzV3ZFhSVWFXMWxjaUE5SUhObGRGUnBiV1Z2ZFhRb2MyVnNaaTVtYjNKdFZYQmtZWFJsWkN3Z1pHVnNZWGxFZFhKaGRHbHZiaWs3WEhKY2JseHlYRzRnSUNBZ0lDQWdJSDA3WEhKY2JseHlYRzRnSUNBZ0lDQWdJSFJvYVhNdVlXUmtSR0YwWlZCcFkydGxjbk1nUFNCbWRXNWpkR2x2YmlncFhISmNiaUFnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZWElnSkdSaGRHVmZjR2xqYTJWeUlEMGdKSFJvYVhNdVptbHVaQ2hjSWk1elppMWtZWFJsY0dsamEyVnlYQ0lwTzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWW9KR1JoZEdWZmNHbGphMlZ5TG14bGJtZDBhRDR3S1Z4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBa1pHRjBaVjl3YVdOclpYSXVaV0ZqYUNobWRXNWpkR2x2YmlncGUxeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnSkhSb2FYTWdQU0FrS0hSb2FYTXBPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJrWVhSbFJtOXliV0YwSUQwZ1hDSmNJanRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnWkdGMFpVUnliM0JrYjNkdVdXVmhjaUE5SUdaaGJITmxPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJrWVhSbFJISnZjR1J2ZDI1TmIyNTBhQ0E5SUdaaGJITmxPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ0pHTnNiM05sYzNSZlpHRjBaVjkzY21Gd0lEMGdKSFJvYVhNdVkyeHZjMlZ6ZENoY0lpNXpabDlrWVhSbFgyWnBaV3hrWENJcE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUtDUmpiRzl6WlhOMFgyUmhkR1ZmZDNKaGNDNXNaVzVuZEdnK01DbGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHUmhkR1ZHYjNKdFlYUWdQU0FrWTJ4dmMyVnpkRjlrWVhSbFgzZHlZWEF1WVhSMGNpaGNJbVJoZEdFdFpHRjBaUzFtYjNKdFlYUmNJaWs3WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnBaaWdrWTJ4dmMyVnpkRjlrWVhSbFgzZHlZWEF1WVhSMGNpaGNJbVJoZEdFdFpHRjBaUzExYzJVdGVXVmhjaTFrY205d1pHOTNibHdpS1QwOU1TbGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1pHRjBaVVJ5YjNCa2IzZHVXV1ZoY2lBOUlIUnlkV1U3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWW9KR05zYjNObGMzUmZaR0YwWlY5M2NtRndMbUYwZEhJb1hDSmtZWFJoTFdSaGRHVXRkWE5sTFcxdmJuUm9MV1J5YjNCa2IzZHVYQ0lwUFQweEtWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCa1lYUmxSSEp2Y0dSdmQyNU5iMjUwYUNBOUlIUnlkV1U3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQmtZWFJsVUdsamEyVnlUM0IwYVc5dWN5QTlJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYVc1c2FXNWxPaUIwY25WbExGeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnphRzkzVDNSb1pYSk5iMjUwYUhNNklIUnlkV1VzWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUc5dVUyVnNaV04wT2lCbWRXNWpkR2x2YmlncGV5QnpaV3htTG1SaGRHVlRaV3hsWTNRb0tUc2dmU3hjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWkdGMFpVWnZjbTFoZERvZ1pHRjBaVVp2Y20xaGRDeGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdOb1lXNW5aVTF2Ym5Sb09pQmtZWFJsUkhKdmNHUnZkMjVOYjI1MGFDeGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZMmhoYm1kbFdXVmhjam9nWkdGMFpVUnliM0JrYjNkdVdXVmhjbHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMDdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtS0hObGJHWXVhWE5mY25Sc1BUMHhLVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdaR0YwWlZCcFkydGxjazl3ZEdsdmJuTXVaR2x5WldOMGFXOXVJRDBnWENKeWRHeGNJanRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ1IwYUdsekxtUmhkR1Z3YVdOclpYSW9aR0YwWlZCcFkydGxjazl3ZEdsdmJuTXBPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmloelpXeG1MbXhoYm1kZlkyOWtaU0U5WENKY0lpbGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUXVaR0YwWlhCcFkydGxjaTV6WlhSRVpXWmhkV3gwY3loY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ1F1WlhoMFpXNWtLRnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSHNuWkdGMFpVWnZjbTFoZENjNlpHRjBaVVp2Y20xaGRIMHNYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdKQzVrWVhSbGNHbGphMlZ5TG5KbFoybHZibUZzV3lCelpXeG1MbXhoYm1kZlkyOWtaVjFjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDbGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdLVHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1ZzYzJWY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNRdVpHRjBaWEJwWTJ0bGNpNXpaWFJFWldaaGRXeDBjeWhjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUXVaWGgwWlc1a0tGeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIc25aR0YwWlVadmNtMWhkQ2M2WkdGMFpVWnZjbTFoZEgwc1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0pDNWtZWFJsY0dsamEyVnlMbkpsWjJsdmJtRnNXMXdpWlc1Y0lsMWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNsY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0tUdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMHBPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1LQ1FvSnk1c2JDMXphMmx1TFcxbGJHOXVKeWt1YkdWdVozUm9QVDB3S1Z4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNSa1lYUmxYM0JwWTJ0bGNpNWtZWFJsY0dsamEyVnlLQ2QzYVdSblpYUW5LUzUzY21Gd0tDYzhaR2wySUdOc1lYTnpQVndpYkd3dGMydHBiaTF0Wld4dmJpQnpaV0Z5WTJoaGJtUm1hV3gwWlhJdFpHRjBaUzF3YVdOclpYSmNJaTgrSnlrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEhKY2JpQWdJQ0FnSUNBZ2ZUdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ2RHaHBjeTVrWVhSbFUyVnNaV04wSUQwZ1puVnVZM1JwYjI0b0tWeHlYRzRnSUNBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUNSMGFHbHpJRDBnSkNoMGFHbHpLVHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUtDaHpaV3htTG1GMWRHOWZkWEJrWVhSbFBUMHhLWHg4S0hObGJHWXVZWFYwYjE5amIzVnVkRjl5WldaeVpYTm9YMjF2WkdVOVBURXBLVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ0pIUm1YMlJoZEdWZmNHbGphMlZ5Y3lBOUlDUjBhR2x6TG1acGJtUW9YQ0l1YzJZdFpHRjBaWEJwWTJ0bGNsd2lLVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQnViMTlrWVhSbFgzQnBZMnRsY25NZ1BTQWtkR1pmWkdGMFpWOXdhV05yWlhKekxteGxibWQwYUR0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmlodWIxOWtZWFJsWDNCcFkydGxjbk0rTVNsY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBdkwzUm9aVzRnYVhRZ2FYTWdZU0JrWVhSbElISmhibWRsTENCemJ5QnRZV3RsSUhOMWNtVWdZbTkwYUNCbWFXVnNaSE1nWVhKbElHWnBiR3hsWkNCaVpXWnZjbVVnZFhCa1lYUnBibWRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnWkhCZlkyOTFiblJsY2lBOUlEQTdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJR1J3WDJWdGNIUjVYMlpwWld4a1gyTnZkVzUwSUQwZ01EdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBa2RHWmZaR0YwWlY5d2FXTnJaWEp6TG1WaFkyZ29ablZ1WTNScGIyNG9LWHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1LQ1FvZEdocGN5a3VkbUZzS0NrOVBWd2lYQ0lwWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1J3WDJWdGNIUjVYMlpwWld4a1gyTnZkVzUwS3lzN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdSd1gyTnZkVzUwWlhJckt6dGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOUtUdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lvWkhCZlpXMXdkSGxmWm1sbGJHUmZZMjkxYm5ROVBUQXBYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpaV3htTG1sdWNIVjBWWEJrWVhSbEtERXBPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdWc2MyVmNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpaV3htTG1sdWNIVjBWWEJrWVhSbEtERXBPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHlYRzRnSUNBZ0lDQWdJSDA3WEhKY2JseHlYRzRnSUNBZ0lDQWdJSFJvYVhNdVlXUmtVbUZ1WjJWVGJHbGtaWEp6SUQwZ1puVnVZM1JwYjI0b0tWeHlYRzRnSUNBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUNSdFpYUmhYM0poYm1kbElEMGdKSFJvYVhNdVptbHVaQ2hjSWk1elppMXRaWFJoTFhKaGJtZGxMWE5zYVdSbGNsd2lLVHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUtDUnRaWFJoWDNKaGJtZGxMbXhsYm1kMGFENHdLVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FrYldWMFlWOXlZVzVuWlM1bFlXTm9LR1oxYm1OMGFXOXVLQ2w3WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQWtkR2hwY3lBOUlDUW9kR2hwY3lrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlHMXBiaUE5SUNSMGFHbHpMbUYwZEhJb1hDSmtZWFJoTFcxcGJsd2lLVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnYldGNElEMGdKSFJvYVhNdVlYUjBjaWhjSW1SaGRHRXRiV0Y0WENJcE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQnpiV2x1SUQwZ0pIUm9hWE11WVhSMGNpaGNJbVJoZEdFdGMzUmhjblF0YldsdVhDSXBPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJ6YldGNElEMGdKSFJvYVhNdVlYUjBjaWhjSW1SaGRHRXRjM1JoY25RdGJXRjRYQ0lwTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCa2FYTndiR0Y1WDNaaGJIVmxYMkZ6SUQwZ0pIUm9hWE11WVhSMGNpaGNJbVJoZEdFdFpHbHpjR3hoZVMxMllXeDFaWE10WVhOY0lpazdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJSE4wWlhBZ1BTQWtkR2hwY3k1aGRIUnlLRndpWkdGMFlTMXpkR1Z3WENJcE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQWtjM1JoY25SZmRtRnNJRDBnSkhSb2FYTXVabWx1WkNnbkxuTm1MWEpoYm1kbExXMXBiaWNwTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFpoY2lBa1pXNWtYM1poYkNBOUlDUjBhR2x6TG1acGJtUW9KeTV6WmkxeVlXNW5aUzF0WVhnbktUdGNjbHh1WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQmtaV05wYldGc1gzQnNZV05sY3lBOUlDUjBhR2x6TG1GMGRISW9YQ0prWVhSaExXUmxZMmx0WVd3dGNHeGhZMlZ6WENJcE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQjBhRzkxYzJGdVpGOXpaWEJsY21GMGIzSWdQU0FrZEdocGN5NWhkSFJ5S0Z3aVpHRjBZUzEwYUc5MWMyRnVaQzF6WlhCbGNtRjBiM0pjSWlrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlHUmxZMmx0WVd4ZmMyVndaWEpoZEc5eUlEMGdKSFJvYVhNdVlYUjBjaWhjSW1SaGRHRXRaR1ZqYVcxaGJDMXpaWEJsY21GMGIzSmNJaWs3WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQm1hV1ZzWkY5bWIzSnRZWFFnUFNCM1RuVnRZaWg3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUcxaGNtczZJR1JsWTJsdFlXeGZjMlZ3WlhKaGRHOXlMRnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JrWldOcGJXRnNjem9nY0dGeWMyVkdiRzloZENoa1pXTnBiV0ZzWDNCc1lXTmxjeWtzWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhSb2IzVnpZVzVrT2lCMGFHOTFjMkZ1WkY5elpYQmxjbUYwYjNKY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5S1R0Y2NseHVYSEpjYmx4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMllYSWdiV2x1WDNWdVptOXliV0YwZEdWa0lEMGdjR0Z5YzJWR2JHOWhkQ2h6YldsdUtUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMllYSWdiV2x1WDJadmNtMWhkSFJsWkNBOUlHWnBaV3hrWDJadmNtMWhkQzUwYnlod1lYSnpaVVpzYjJGMEtITnRhVzRwS1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ2JXRjRYMlp2Y20xaGRIUmxaQ0E5SUdacFpXeGtYMlp2Y20xaGRDNTBieWh3WVhKelpVWnNiMkYwS0hOdFlYZ3BLVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnYldGNFgzVnVabTl5YldGMGRHVmtJRDBnY0dGeWMyVkdiRzloZENoemJXRjRLVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXZMMkZzWlhKMEtHMXBibDltYjNKdFlYUjBaV1FwTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzh2WVd4bGNuUW9iV0Y0WDJadmNtMWhkSFJsWkNrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnTHk5aGJHVnlkQ2hrYVhOd2JHRjVYM1poYkhWbFgyRnpLVHRjY2x4dVhISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1LR1JwYzNCc1lYbGZkbUZzZFdWZllYTTlQVndpZEdWNGRHbHVjSFYwWENJcFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBa2MzUmhjblJmZG1Gc0xuWmhiQ2h0YVc1ZlptOXliV0YwZEdWa0tUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdKR1Z1WkY5MllXd3VkbUZzS0cxaGVGOW1iM0p0WVhSMFpXUXBPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbGJITmxJR2xtS0dScGMzQnNZWGxmZG1Gc2RXVmZZWE05UFZ3aWRHVjRkRndpS1Z4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSkhOMFlYSjBYM1poYkM1b2RHMXNLRzFwYmw5bWIzSnRZWFIwWldRcE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWtaVzVrWDNaaGJDNW9kRzFzS0cxaGVGOW1iM0p0WVhSMFpXUXBPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQnViMVZKVDNCMGFXOXVjeUE5SUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtRnVaMlU2SUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ2R0YVc0bk9pQmJJSEJoY25ObFJteHZZWFFvYldsdUtTQmRMRnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0oyMWhlQ2M2SUZzZ2NHRnljMlZHYkc5aGRDaHRZWGdwSUYxY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZTeGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjM1JoY25RNklGdHRhVzVmWm05eWJXRjBkR1ZrTENCdFlYaGZabTl5YldGMGRHVmtYU3hjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYUdGdVpHeGxjem9nTWl4Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1kyOXVibVZqZERvZ2RISjFaU3hjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYzNSbGNEb2djR0Z5YzJWR2JHOWhkQ2h6ZEdWd0tTeGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdKbGFHRjJhVzkxY2pvZ0oyVjRkR1Z1WkMxMFlYQW5MRnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JtYjNKdFlYUTZJR1pwWld4a1gyWnZjbTFoZEZ4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDA3WEhKY2JseHlYRzVjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYVdZb2MyVnNaaTVwYzE5eWRHdzlQVEVwWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J1YjFWSlQzQjBhVzl1Y3k1a2FYSmxZM1JwYjI0Z1BTQmNJbkowYkZ3aU8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0x5OGtLSFJvYVhNcExtWnBibVFvWENJdWJXVjBZUzF6Ykdsa1pYSmNJaWt1Ym05VmFWTnNhV1JsY2lodWIxVkpUM0IwYVc5dWN5azdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCemJHbGtaWEpmYjJKcVpXTjBJRDBnSkNoMGFHbHpLUzVtYVc1a0tGd2lMbTFsZEdFdGMyeHBaR1Z5WENJcFd6QmRPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmlnZ1hDSjFibVJsWm1sdVpXUmNJaUFoUFQwZ2RIbHdaVzltS0NCemJHbGtaWEpmYjJKcVpXTjBMbTV2VldsVGJHbGtaWElnS1NBcElIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdMeTlrWlhOMGNtOTVJR2xtSUdsMElHVjRhWE4wY3k0dUlIUm9hWE1nYldWaGJuTWdjMjl0WldodmR5QmhibTkwYUdWeUlHbHVjM1JoYm1ObElHaGhaQ0JwYm1sMGFXRnNhWE5sWkNCcGRDNHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSE5zYVdSbGNsOXZZbXBsWTNRdWJtOVZhVk5zYVdSbGNpNWtaWE4wY205NUtDazdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzh2WTI5dWMyOXNaUzVzYjJjb2RIbHdaVzltS0hOc2FXUmxjbDl2WW1wbFkzUXVibTlWYVZOc2FXUmxjaWtwTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYm05VmFWTnNhV1JsY2k1amNtVmhkR1VvYzJ4cFpHVnlYMjlpYW1WamRDd2dibTlWU1U5d2RHbHZibk1wTzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBa2MzUmhjblJmZG1Gc0xtOW1aaWdwTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ1J6ZEdGeWRGOTJZV3d1YjI0b0oyTm9ZVzVuWlNjc0lHWjFibU4wYVc5dUtDbDdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSE5zYVdSbGNsOXZZbXBsWTNRdWJtOVZhVk5zYVdSbGNpNXpaWFFvV3lRb2RHaHBjeWt1ZG1Gc0tDa3NJRzUxYkd4ZEtUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOUtUdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdKR1Z1WkY5MllXd3ViMlptS0NrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSkdWdVpGOTJZV3d1YjI0b0oyTm9ZVzVuWlNjc0lHWjFibU4wYVc5dUtDbDdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSE5zYVdSbGNsOXZZbXBsWTNRdWJtOVZhVk5zYVdSbGNpNXpaWFFvVzI1MWJHd3NJQ1FvZEdocGN5a3VkbUZzS0NsZEtUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOUtUdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdMeThrYzNSaGNuUmZkbUZzTG1oMGJXd29iV2x1WDJadmNtMWhkSFJsWkNrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnTHk4a1pXNWtYM1poYkM1b2RHMXNLRzFoZUY5bWIzSnRZWFIwWldRcE8xeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpiR2xrWlhKZmIySnFaV04wTG01dlZXbFRiR2xrWlhJdWIyWm1LQ2QxY0dSaGRHVW5LVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpiR2xrWlhKZmIySnFaV04wTG01dlZXbFRiR2xrWlhJdWIyNG9KM1Z3WkdGMFpTY3NJR1oxYm1OMGFXOXVLQ0IyWVd4MVpYTXNJR2hoYm1Sc1pTQXBJSHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJ6Ykdsa1pYSmZjM1JoY25SZmRtRnNJQ0E5SUcxcGJsOW1iM0p0WVhSMFpXUTdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCemJHbGtaWEpmWlc1a1gzWmhiQ0FnUFNCdFlYaGZabTl5YldGMGRHVmtPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJSFpoYkhWbElEMGdkbUZzZFdWelcyaGhibVJzWlYwN1hISmNibHh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLQ0JvWVc1a2JHVWdLU0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnRZWGhmWm05eWJXRjBkR1ZrSUQwZ2RtRnNkV1U3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgwZ1pXeHpaU0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnRhVzVmWm05eWJXRjBkR1ZrSUQwZ2RtRnNkV1U3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtS0dScGMzQnNZWGxmZG1Gc2RXVmZZWE05UFZ3aWRHVjRkR2x1Y0hWMFhDSXBYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUnpkR0Z5ZEY5MllXd3VkbUZzS0cxcGJsOW1iM0p0WVhSMFpXUXBPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0pHVnVaRjkyWVd3dWRtRnNLRzFoZUY5bWIzSnRZWFIwWldRcE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1ZzYzJVZ2FXWW9aR2x6Y0d4aGVWOTJZV3gxWlY5aGN6MDlYQ0owWlhoMFhDSXBYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUnpkR0Z5ZEY5MllXd3VhSFJ0YkNodGFXNWZabTl5YldGMGRHVmtLVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUmxibVJmZG1Gc0xtaDBiV3dvYldGNFgyWnZjbTFoZEhSbFpDazdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dVhISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0F2TDJrZ2RHaHBibXNnZEdobElHWjFibU4wYVc5dUlIUm9ZWFFnWW5WcGJHUnpJSFJvWlNCVlVrd2dibVZsWkhNZ2RHOGdaR1ZqYjJSbElIUm9aU0JtYjNKdFlYUjBaV1FnYzNSeWFXNW5JR0psWm05eVpTQmhaR1JwYm1jZ2RHOGdkR2hsSUhWeWJGeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnBaaWdvYzJWc1ppNWhkWFJ2WDNWd1pHRjBaVDA5TVNsOGZDaHpaV3htTG1GMWRHOWZZMjkxYm5SZmNtVm1jbVZ6YUY5dGIyUmxQVDB4S1NsY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnTHk5dmJteDVJSFJ5ZVNCMGJ5QjFjR1JoZEdVZ2FXWWdkR2hsSUhaaGJIVmxjeUJvWVhabElHRmpkSFZoYkd4NUlHTm9ZVzVuWldSY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtS0NoemJHbGtaWEpmYzNSaGNuUmZkbUZzSVQxdGFXNWZabTl5YldGMGRHVmtLWHg4S0hOc2FXUmxjbDlsYm1SZmRtRnNJVDF0WVhoZlptOXliV0YwZEdWa0tTa2dlMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCelpXeG1MbWx1Y0hWMFZYQmtZWFJsS0Rnd01DazdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOVhISmNibHh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlLVHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlLVHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpaV3htTG1Oc1pXRnlWR2x0WlhJb0tUc2dMeTlwWjI1dmNtVWdZVzU1SUdOb1lXNW5aWE1nY21WalpXNTBiSGtnYldGa1pTQmllU0IwYUdVZ2MyeHBaR1Z5SUNoMGFHbHpJSGRoY3lCcWRYTjBJR2x1YVhRZ2MyaHZkV3hrYmlkMElHTnZkVzUwSUdGeklHRnVJSFZ3WkdGMFpTQmxkbVZ1ZENsY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4eVhHNGdJQ0FnSUNBZ0lIMDdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lIUm9hWE11YVc1cGRDQTlJR1oxYm1OMGFXOXVLR3RsWlhCZmNHRm5hVzVoZEdsdmJpbGNjbHh1SUNBZ0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJR2xtS0hSNWNHVnZaaWhyWldWd1gzQmhaMmx1WVhScGIyNHBQVDFjSW5WdVpHVm1hVzVsWkZ3aUtWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnYTJWbGNGOXdZV2RwYm1GMGFXOXVJRDBnWm1Gc2MyVTdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdWFXNXBkRUYxZEc5VmNHUmhkR1ZGZG1WdWRITW9LVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1aGRIUmhZMmhCWTNScGRtVkRiR0Z6Y3lncE8xeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1aFpHUkVZWFJsVUdsamEyVnljeWdwTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxtRmtaRkpoYm1kbFUyeHBaR1Z5Y3lncE8xeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdMeTlwYm1sMElHTnZiV0p2SUdKdmVHVnpYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUFrWTI5dFltOWliM2dnUFNBa2RHaHBjeTVtYVc1a0tGd2ljMlZzWldOMFcyUmhkR0V0WTI5dFltOWliM2c5SnpFblhWd2lLVHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUtDUmpiMjFpYjJKdmVDNXNaVzVuZEdnK01DbGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdKR052YldKdlltOTRMbVZoWTJnb1puVnVZM1JwYjI0b2FXNWtaWGdnS1h0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ0pIUm9hWE5qWWlBOUlDUW9JSFJvYVhNZ0tUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMllYSWdibkp0SUQwZ0pIUm9hWE5qWWk1aGRIUnlLRndpWkdGMFlTMWpiMjFpYjJKdmVDMXVjbTFjSWlrN1hISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2gwZVhCbGIyWWdKSFJvYVhOallpNWphRzl6Wlc0Z0lUMGdYQ0oxYm1SbFptbHVaV1JjSWlsY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQmphRzl6Wlc1dmNIUnBiMjV6SUQwZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYzJWaGNtTm9YMk52Ym5SaGFXNXpPaUIwY25WbFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMDdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppZ29kSGx3Wlc5bUtHNXliU2toUFQxY0luVnVaR1ZtYVc1bFpGd2lLU1ltS0c1eWJTa3BlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1kyaHZjMlZ1YjNCMGFXOXVjeTV1YjE5eVpYTjFiSFJ6WDNSbGVIUWdQU0J1Y20wN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdMeThnYzJGbVpTQjBieUIxYzJVZ2RHaGxJR1oxYm1OMGFXOXVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzh2YzJWaGNtTm9YMk52Ym5SaGFXNXpYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtS0hObGJHWXVhWE5mY25Sc1BUMHhLVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWtkR2hwYzJOaUxtRmtaRU5zWVhOektGd2lZMmh2YzJWdUxYSjBiRndpS1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSkhSb2FYTmpZaTVqYUc5elpXNG9ZMmh2YzJWdWIzQjBhVzl1Y3lrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1ZzYzJWY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I3WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnYzJWc1pXTjBNbTl3ZEdsdmJuTWdQU0I3ZlR0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtS0hObGJHWXVhWE5mY25Sc1BUMHhLVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpaV3hsWTNReWIzQjBhVzl1Y3k1a2FYSWdQU0JjSW5KMGJGd2lPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUtDaDBlWEJsYjJZb2JuSnRLU0U5UFZ3aWRXNWtaV1pwYm1Wa1hDSXBKaVlvYm5KdEtTbDdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCelpXeGxZM1F5YjNCMGFXOXVjeTVzWVc1bmRXRm5aVDBnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUZ3aWJtOVNaWE4xYkhSelhDSTZJR1oxYm1OMGFXOXVLQ2w3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCdWNtMDdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0pIUm9hWE5qWWk1elpXeGxZM1F5S0hObGJHVmpkREp2Y0hScGIyNXpLVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZTazdYSEpjYmx4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHlYRzVjY2x4dVhISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMMmxtSUdGcVlYZ2dhWE1nWlc1aFlteGxaQ0JwYm1sMElIUm9aU0J3WVdkcGJtRjBhVzl1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJR2xtS0hObGJHWXVhWE5mWVdwaGVEMDlNU2xjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYzJWc1ppNXpaWFIxY0VGcVlYaFFZV2RwYm1GMGFXOXVLQ2s3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNSMGFHbHpMbk4xWW0xcGRDaDBhR2x6TG5OMVltMXBkRVp2Y20wcE8xeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdjMlZzWmk1cGJtbDBWMjl2UTI5dGJXVnlZMlZEYjI1MGNtOXNjeWdwT3lBdkwzZHZiMk52YlcxbGNtTmxJRzl5WkdWeVlubGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJR2xtS0d0bFpYQmZjR0ZuYVc1aGRHbHZiajA5Wm1Gc2MyVXBYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSE5sYkdZdWJHRnpkRjl6ZFdKdGFYUmZjWFZsY25sZmNHRnlZVzF6SUQwZ2MyVnNaaTVuWlhSVmNteFFZWEpoYlhNb1ptRnNjMlVwTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEhKY2JpQWdJQ0FnSUNBZ2ZWeHlYRzVjY2x4dUlDQWdJQ0FnSUNCMGFHbHpMbTl1VjJsdVpHOTNVMk55YjJ4c0lEMGdablZ1WTNScGIyNG9aWFpsYm5RcFhISmNiaUFnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaWdvSVhObGJHWXVhWE5mYkc5aFpHbHVaMTl0YjNKbEtTQW1KaUFvSVhObGJHWXVhWE5mYldGNFgzQmhaMlZrS1NsY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJSGRwYm1SdmQxOXpZM0p2Ykd3Z1BTQWtLSGRwYm1SdmR5a3VjMk55YjJ4c1ZHOXdLQ2s3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMllYSWdkMmx1Wkc5M1gzTmpjbTlzYkY5aWIzUjBiMjBnUFNBa0tIZHBibVJ2ZHlrdWMyTnliMnhzVkc5d0tDa2dLeUFrS0hkcGJtUnZkeWt1YUdWcFoyaDBLQ2s3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMllYSWdjMk55YjJ4c1gyOW1abk5sZENBOUlIQmhjbk5sU1c1MEtITmxiR1l1YVc1bWFXNXBkR1ZmYzJOeWIyeHNYM1J5YVdkblpYSmZZVzF2ZFc1MEtUc3ZMM05sYkdZdWFXNW1hVzVwZEdWZmMyTnliMnhzWDNSeWFXZG5aWEpmWVcxdmRXNTBPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDOHZkbUZ5SUNSaGFtRjRYM0psYzNWc2RITmZZMjl1ZEdGcGJtVnlJRDBnYWxGMVpYSjVLQ1IwYUdsekxtRjBkSElvWENKa1lYUmhMV0ZxWVhndGRHRnlaMlYwWENJcEtUdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppaHpaV3htTGlScGJtWnBibWwwWlY5elkzSnZiR3hmWTI5dWRHRnBibVZ5TG14bGJtZDBhRDA5TVNsY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMllYSWdjbVZ6ZFd4MGMxOXpZM0p2Ykd4ZlltOTBkRzl0SUQwZ2MyVnNaaTRrYVc1bWFXNXBkR1ZmYzJOeWIyeHNYMk52Ym5SaGFXNWxjaTV2Wm1aelpYUW9LUzUwYjNBZ0t5QnpaV3htTGlScGJtWnBibWwwWlY5elkzSnZiR3hmWTI5dWRHRnBibVZ5TG1obGFXZG9kQ2dwTzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBdkwzWmhjaUJ2Wm1aelpYUWdQU0FvSkdGcVlYaGZjbVZ6ZFd4MGMxOWpiMjUwWVdsdVpYSXViMlptYzJWMEtDa3VkRzl3SUNzZ0pHRnFZWGhmY21WemRXeDBjMTlqYjI1MFlXbHVaWEl1YUdWcFoyaDBLQ2twSUMwZ2QybHVaRzkzWDNOamNtOXNiRHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnYjJabWMyVjBJRDBnS0hObGJHWXVKR2x1Wm1sdWFYUmxYM05qY205c2JGOWpiMjUwWVdsdVpYSXViMlptYzJWMEtDa3VkRzl3SUNzZ2MyVnNaaTRrYVc1bWFXNXBkR1ZmYzJOeWIyeHNYMk52Ym5SaGFXNWxjaTVvWldsbmFIUW9LU2tnTFNCM2FXNWtiM2RmYzJOeWIyeHNPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmloM2FXNWtiM2RmYzJOeWIyeHNYMkp2ZEhSdmJTQStJSEpsYzNWc2RITmZjMk55YjJ4c1gySnZkSFJ2YlNBcklITmpjbTlzYkY5dlptWnpaWFFwWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J6Wld4bUxteHZZV1JOYjNKbFVtVnpkV3gwY3lncE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JsYkhObFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZXk4dlpHOXVkQ0JzYjJGa0lHMXZjbVZjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhISmNiaUFnSUNBZ0lDQWdmVnh5WEc1Y2NseHVJQ0FnSUNBZ0lDQXZLbWxtS0hSb2FYTXVaR1ZpZFdkZmJXOWtaVDA5WENJeFhDSXBYSEpjYmlBZ0lDQWdJQ0FnSUhzdkwyVnljbTl5SUd4dloyZHBibWRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJR2xtS0hObGJHWXVhWE5mWVdwaGVEMDlNU2xjY2x4dUlDQWdJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJQ0JwWmloelpXeG1MbVJwYzNCc1lYbGZjbVZ6ZFd4MGMxOWhjejA5WENKemFHOXlkR052WkdWY0lpbGNjbHh1SUNBZ0lDQWdJQ0FnZTF4eVhHNGdJQ0FnSUNBZ0lDQnBaaWh6Wld4bUxpUmhhbUY0WDNKbGMzVnNkSE5mWTI5dWRHRnBibVZ5TG14bGJtZDBhRDA5TUNsY2NseHVJQ0FnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNCamIyNXpiMnhsTG14dlp5aGNJbE5sWVhKamFDQW1JRVpwYkhSbGNpQjhJRVp2Y20wZ1NVUTZJRndpSzNObGJHWXVjMlpwWkN0Y0lqb2dZMkZ1Ym05MElHWnBibVFnZEdobElISmxjM1ZzZEhNZ1kyOXVkR0ZwYm1WeUlHOXVJSFJvYVhNZ2NHRm5aU0F0SUdWdWMzVnlaU0I1YjNVZ2RYTmxJSFJvWlNCemFHOXlkR052WkdVZ2IyNGdkR2hwY3lCd1lXZGxJRzl5SUhCeWIzWnBaR1VnWVNCVlVrd2dkMmhsY21VZ2FYUWdZMkZ1SUdKbElHWnZkVzVrSUNoU1pYTjFiSFJ6SUZWU1RDbGNJaWs3WEhKY2JpQWdJQ0FnSUNBZ0lIMWNjbHh1SUNBZ0lDQWdJQ0FnYVdZb2MyVnNaaTV5WlhOMWJIUnpYM1Z5YkQwOVhDSmNJaWxjY2x4dUlDQWdJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJQ0JqYjI1emIyeGxMbXh2WnloY0lsTmxZWEpqYUNBbUlFWnBiSFJsY2lCOElFWnZjbTBnU1VRNklGd2lLM05sYkdZdWMyWnBaQ3RjSWpvZ1RtOGdVbVZ6ZFd4MGN5QlZVa3dnYUdGeklHSmxaVzRnWkdWbWFXNWxaQ0F0SUdWdWMzVnlaU0IwYUdGMElIbHZkU0JsYm5SbGNpQjBhR2x6SUdsdUlHOXlaR1Z5SUhSdklIVnpaU0IwYUdVZ1UyVmhjbU5vSUVadmNtMGdiMjRnWVc1NUlIQmhaMlVwWENJcE8xeHlYRzRnSUNBZ0lDQWdJQ0I5WEhKY2JpQWdJQ0FnSUNBZ0lDOHZZMmhsWTJzZ2FXWWdjbVZ6ZFd4MGN5QlZVa3dnYVhNZ2IyNGdjMkZ0WlNCa2IyMWhhVzRnWm05eUlIQnZkR1Z1ZEdsaGJDQmpjbTl6Y3lCa2IyMWhhVzRnWlhKeWIzSnpYSEpjYmlBZ0lDQWdJQ0FnSUgxY2NseHVJQ0FnSUNBZ0lDQWdaV3h6WlZ4eVhHNGdJQ0FnSUNBZ0lDQjdYSEpjYmlBZ0lDQWdJQ0FnSUdsbUtITmxiR1l1SkdGcVlYaGZjbVZ6ZFd4MGMxOWpiMjUwWVdsdVpYSXViR1Z1WjNSb1BUMHdLVnh5WEc0Z0lDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJR052Ym5OdmJHVXViRzluS0Z3aVUyVmhjbU5vSUNZZ1JtbHNkR1Z5SUh3Z1JtOXliU0JKUkRvZ1hDSXJjMlZzWmk1elptbGtLMXdpT2lCallXNXViM1FnWm1sdVpDQjBhR1VnY21WemRXeDBjeUJqYjI1MFlXbHVaWElnYjI0Z2RHaHBjeUJ3WVdkbElDMGdaVzV6ZFhKbElIbHZkU0IxYzJVZ1lYSmxJSFZ6YVc1bklIUm9aU0J5YVdkb2RDQmpiMjUwWlc1MElITmxiR1ZqZEc5eVhDSXBPMXh5WEc0Z0lDQWdJQ0FnSUNCOVhISmNiaUFnSUNBZ0lDQWdJSDFjY2x4dUlDQWdJQ0FnSUNBZ2ZWeHlYRzRnSUNBZ0lDQWdJQ0JsYkhObFhISmNiaUFnSUNBZ0lDQWdJSHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJSDFjY2x4dVhISmNiaUFnSUNBZ0lDQWdJSDBxTDF4eVhHNWNjbHh1WEhKY2JpQWdJQ0FnSUNBZ2RHaHBjeTV6ZEhKcGNGRjFaWEo1VTNSeWFXNW5RVzVrU0dGemFFWnliMjFRWVhSb0lEMGdablZ1WTNScGIyNG9kWEpzS1NCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUIxY213dWMzQnNhWFFvWENJL1hDSXBXekJkTG5Od2JHbDBLRndpSTF3aUtWc3dYVHRjY2x4dUlDQWdJQ0FnSUNCOVhISmNibHh5WEc0Z0lDQWdJQ0FnSUhSb2FYTXVaM1Z3SUQwZ1puVnVZM1JwYjI0b0lHNWhiV1VzSUhWeWJDQXBJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0NGMWNtd3BJSFZ5YkNBOUlHeHZZMkYwYVc5dUxtaHlaV1pjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdibUZ0WlNBOUlHNWhiV1V1Y21Wd2JHRmpaU2d2VzF4Y1cxMHZMRndpWEZ4Y1hGeGNXMXdpS1M1eVpYQnNZV05sS0M5YlhGeGRYUzhzWENKY1hGeGNYRnhkWENJcE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdjbVZuWlhoVElEMGdYQ0piWEZ4Y1hEOG1YVndpSzI1aGJXVXJYQ0k5S0Z0ZUppTmRLaWxjSWp0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlISmxaMlY0SUQwZ2JtVjNJRkpsWjBWNGNDZ2djbVZuWlhoVElDazdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJ5WlhOMWJIUnpJRDBnY21WblpYZ3VaWGhsWXlnZ2RYSnNJQ2s3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQnlaWE4xYkhSeklEMDlJRzUxYkd3Z1B5QnVkV3hzSURvZ2NtVnpkV3gwYzFzeFhUdGNjbHh1SUNBZ0lDQWdJQ0I5TzF4eVhHNWNjbHh1WEhKY2JpQWdJQ0FnSUNBZ2RHaHBjeTVuWlhSVmNteFFZWEpoYlhNZ1BTQm1kVzVqZEdsdmJpaHJaV1Z3WDNCaFoybHVZWFJwYjI0c0lIUjVjR1VzSUdWNFkyeDFaR1VwWEhKY2JpQWdJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppaDBlWEJsYjJZb2EyVmxjRjl3WVdkcGJtRjBhVzl1S1QwOVhDSjFibVJsWm1sdVpXUmNJaWxjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlHdGxaWEJmY0dGbmFXNWhkR2x2YmlBOUlIUnlkV1U3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdMeXBwWmloMGVYQmxiMllvWlhoamJIVmtaU2s5UFZ3aWRXNWtaV1pwYm1Wa1hDSXBYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQjdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnWlhoamJIVmtaU0E5SUZ3aVhDSTdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQjlLaTljY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUtIUjVjR1Z2WmloMGVYQmxLVDA5WENKMWJtUmxabWx1WldSY0lpbGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUhSNWNHVWdQU0JjSWx3aU8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZWElnZFhKc1gzQmhjbUZ0YzE5emRISWdQU0JjSWx3aU8xeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdMeThnWjJWMElHRnNiQ0J3WVhKaGJYTWdabkp2YlNCbWFXVnNaSE5jY2x4dUlDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUhWeWJGOXdZWEpoYlhOZllYSnlZWGtnUFNCd2NtOWpaWE56WDJadmNtMHVaMlYwVlhKc1VHRnlZVzF6S0hObGJHWXBPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlHeGxibWQwYUNBOUlFOWlhbVZqZEM1clpYbHpLSFZ5YkY5d1lYSmhiWE5mWVhKeVlYa3BMbXhsYm1kMGFEdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJR052ZFc1MElEMGdNRHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUtIUjVjR1Z2WmlobGVHTnNkV1JsS1NFOVhDSjFibVJsWm1sdVpXUmNJaWtnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLSFZ5YkY5d1lYSmhiWE5mWVhKeVlYa3VhR0Z6VDNkdVVISnZjR1Z5ZEhrb1pYaGpiSFZrWlNrcElIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCc1pXNW5kR2d0TFR0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lvYkdWdVozUm9QakFwWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdadmNpQW9kbUZ5SUdzZ2FXNGdkWEpzWDNCaGNtRnRjMTloY25KaGVTa2dlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2gxY214ZmNHRnlZVzF6WDJGeWNtRjVMbWhoYzA5M2JsQnliM0JsY25SNUtHc3BLU0I3WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnWTJGdVgyRmtaQ0E5SUhSeWRXVTdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtS0hSNWNHVnZaaWhsZUdOc2RXUmxLU0U5WENKMWJtUmxabWx1WldSY0lpbGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWW9hejA5WlhoamJIVmtaU2tnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdOaGJsOWhaR1FnUFNCbVlXeHpaVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWW9ZMkZ1WDJGa1pDa2dlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RYSnNYM0JoY21GdGMxOXpkSElnS3owZ2F5QXJJRndpUFZ3aUlDc2dkWEpzWDNCaGNtRnRjMTloY25KaGVWdHJYVHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb1kyOTFiblFnUENCc1pXNW5kR2dnTFNBeEtTQjdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkWEpzWDNCaGNtRnRjMTl6ZEhJZ0t6MGdYQ0ltWENJN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWTI5MWJuUXJLenRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJSEYxWlhKNVgzQmhjbUZ0Y3lBOUlGd2lYQ0k3WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBdkwyWnZjbTBnY0dGeVlXMXpJR0Z6SUhWeWJDQnhkV1Z5ZVNCemRISnBibWRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdMeTkyWVhJZ1ptOXliVjl3WVhKaGJYTWdQU0IxY214ZmNHRnlZVzF6WDNOMGNpNXlaWEJzWVdObFFXeHNLRndpSlRKQ1hDSXNJRndpSzF3aUtTNXlaWEJzWVdObFFXeHNLRndpSlRKRFhDSXNJRndpTEZ3aUtWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdabTl5YlY5d1lYSmhiWE1nUFNCMWNteGZjR0Z5WVcxelgzTjBjanRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUM4dloyVjBJSFZ5YkNCd1lYSmhiWE1nWm5KdmJTQjBhR1VnWm05eWJTQnBkSE5sYkdZZ0tIZG9ZWFFnZEdobElIVnpaWElnYUdGeklITmxiR1ZqZEdWa0tWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCeGRXVnllVjl3WVhKaGJYTWdQU0J6Wld4bUxtcHZhVzVWY214UVlYSmhiU2h4ZFdWeWVWOXdZWEpoYlhNc0lHWnZjbTFmY0dGeVlXMXpLVHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUM4dllXUmtJSEJoWjJsdVlYUnBiMjVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lvYTJWbGNGOXdZV2RwYm1GMGFXOXVQVDEwY25WbEtWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnY0dGblpVNTFiV0psY2lBOUlITmxiR1l1SkdGcVlYaGZjbVZ6ZFd4MGMxOWpiMjUwWVdsdVpYSXVZWFIwY2loY0ltUmhkR0V0Y0dGblpXUmNJaWs3WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lvZEhsd1pXOW1LSEJoWjJWT2RXMWlaWElwUFQxY0luVnVaR1ZtYVc1bFpGd2lLVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEJoWjJWT2RXMWlaWElnUFNBeE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1LSEJoWjJWT2RXMWlaWEkrTVNsY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeGRXVnllVjl3WVhKaGJYTWdQU0J6Wld4bUxtcHZhVzVWY214UVlYSmhiU2h4ZFdWeWVWOXdZWEpoYlhNc0lGd2ljMlpmY0dGblpXUTlYQ0lyY0dGblpVNTFiV0psY2lrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQzh2WVdSa0lITm1hV1JjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdMeTl4ZFdWeWVWOXdZWEpoYlhNZ1BTQnpaV3htTG1wdmFXNVZjbXhRWVhKaGJTaHhkV1Z5ZVY5d1lYSmhiWE1zSUZ3aWMyWnBaRDFjSWl0elpXeG1Mbk5tYVdRcE8xeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdMeThnYkc5dmNDQjBhSEp2ZFdkb0lHRnVlU0JsZUhSeVlTQndZWEpoYlhNZ0tHWnliMjBnWlhoMElIQnNkV2RwYm5NcElHRnVaQ0JoWkdRZ2RHOGdkR2hsSUhWeWJDQW9hV1VnZDI5dlkyOXRiV1Z5WTJVZ1lHOXlaR1Z5WW5sZ0tWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBdktuWmhjaUJsZUhSeVlWOXhkV1Z5ZVY5d1lYSmhiU0E5SUZ3aVhDSTdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnYkdWdVozUm9JRDBnVDJKcVpXTjBMbXRsZVhNb2MyVnNaaTVsZUhSeVlWOXhkV1Z5ZVY5d1lYSmhiWE1wTG14bGJtZDBhRHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCamIzVnVkQ0E5SURBN1hISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdhV1lvYkdWdVozUm9QakFwWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0I3WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ1ptOXlJQ2gyWVhJZ2F5QnBiaUJ6Wld4bUxtVjRkSEpoWDNGMVpYSjVYM0JoY21GdGN5a2dlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdhV1lnS0hObGJHWXVaWGgwY21GZmNYVmxjbmxmY0dGeVlXMXpMbWhoYzA5M2JsQnliM0JsY25SNUtHc3BLU0I3WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ2FXWW9jMlZzWmk1bGVIUnlZVjl4ZFdWeWVWOXdZWEpoYlhOYmExMGhQVndpWENJcFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNCbGVIUnlZVjl4ZFdWeWVWOXdZWEpoYlNBOUlHc3JYQ0k5WENJcmMyVnNaaTVsZUhSeVlWOXhkV1Z5ZVY5d1lYSmhiWE5iYTEwN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNCeGRXVnllVjl3WVhKaGJYTWdQU0J6Wld4bUxtcHZhVzVWY214UVlYSmhiU2h4ZFdWeWVWOXdZWEpoYlhNc0lHVjRkSEpoWDNGMVpYSjVYM0JoY21GdEtUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDb3ZYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIRjFaWEo1WDNCaGNtRnRjeUE5SUhObGJHWXVZV1JrVVhWbGNubFFZWEpoYlhNb2NYVmxjbmxmY0dGeVlXMXpMQ0J6Wld4bUxtVjRkSEpoWDNGMVpYSjVYM0JoY21GdGN5NWhiR3dwTzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWW9kSGx3WlNFOVhDSmNJaWxjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnTHk5eGRXVnllVjl3WVhKaGJYTWdQU0J6Wld4bUxtRmtaRkYxWlhKNVVHRnlZVzF6S0hGMVpYSjVYM0JoY21GdGN5d2djMlZzWmk1bGVIUnlZVjl4ZFdWeWVWOXdZWEpoYlhOYmRIbHdaVjBwTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnY1hWbGNubGZjR0Z5WVcxek8xeHlYRzRnSUNBZ0lDQWdJSDFjY2x4dUlDQWdJQ0FnSUNCMGFHbHpMbUZrWkZGMVpYSjVVR0Z5WVcxeklEMGdablZ1WTNScGIyNG9jWFZsY25sZmNHRnlZVzF6TENCdVpYZGZjR0Z5WVcxektWeHlYRzRnSUNBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUdWNGRISmhYM0YxWlhKNVgzQmhjbUZ0SUQwZ1hDSmNJanRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUd4bGJtZDBhQ0E5SUU5aWFtVmpkQzVyWlhsektHNWxkMTl3WVhKaGJYTXBMbXhsYm1kMGFEdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJR052ZFc1MElEMGdNRHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUtHeGxibWQwYUQ0d0tWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCN1hISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWm05eUlDaDJZWElnYXlCcGJpQnVaWGRmY0dGeVlXMXpLU0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lnS0c1bGQxOXdZWEpoYlhNdWFHRnpUM2R1VUhKdmNHVnlkSGtvYXlrcElIdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUtHNWxkMTl3WVhKaGJYTmJhMTBoUFZ3aVhDSXBYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHVjRkSEpoWDNGMVpYSjVYM0JoY21GdElEMGdheXRjSWoxY0lpdHVaWGRmY0dGeVlXMXpXMnRkTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjWFZsY25sZmNHRnlZVzF6SUQwZ2MyVnNaaTVxYjJsdVZYSnNVR0Z5WVcwb2NYVmxjbmxmY0dGeVlXMXpMQ0JsZUhSeVlWOXhkV1Z5ZVY5d1lYSmhiU2s3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCeGRXVnllVjl3WVhKaGJYTTdYSEpjYmlBZ0lDQWdJQ0FnZlZ4eVhHNGdJQ0FnSUNBZ0lIUm9hWE11WVdSa1ZYSnNVR0Z5WVcwZ1BTQm1kVzVqZEdsdmJpaDFjbXdzSUhOMGNtbHVaeWxjY2x4dUlDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGNpQmhaR1JmY0dGeVlXMXpJRDBnWENKY0lqdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJR2xtS0hWeWJDRTlYQ0pjSWlsY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWW9kWEpzTG1sdVpHVjRUMllvWENJL1hDSXBJQ0U5SUMweEtWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHRmtaRjl3WVhKaGJYTWdLejBnWENJbVhDSTdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbGJITmxYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdMeTkxY213Z1BTQjBhR2x6TG5SeVlXbHNhVzVuVTJ4aGMyaEpkQ2gxY213cE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdGa1pGOXdZWEpoYlhNZ0t6MGdYQ0kvWENJN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJR2xtS0hOMGNtbHVaeUU5WENKY0lpbGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2UxeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUIxY213Z0t5QmhaR1JmY0dGeVlXMXpJQ3NnYzNSeWFXNW5PMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lHVnNjMlZjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJSFZ5YkR0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4eVhHNGdJQ0FnSUNBZ0lIMDdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lIUm9hWE11YW05cGJsVnliRkJoY21GdElEMGdablZ1WTNScGIyNG9jR0Z5WVcxekxDQnpkSEpwYm1jcFhISmNiaUFnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZWElnWVdSa1gzQmhjbUZ0Y3lBOUlGd2lYQ0k3WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppaHdZWEpoYlhNaFBWd2lYQ0lwWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdGa1pGOXdZWEpoYlhNZ0t6MGdYQ0ltWENJN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1LSE4wY21sdVp5RTlYQ0pjSWlsY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZTF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQndZWEpoYlhNZ0t5QmhaR1JmY0dGeVlXMXpJQ3NnYzNSeWFXNW5PMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lHVnNjMlZjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJSEJoY21GdGN6dGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHlYRzRnSUNBZ0lDQWdJSDA3WEhKY2JseHlYRzRnSUNBZ0lDQWdJSFJvYVhNdWMyVjBRV3BoZUZKbGMzVnNkSE5WVWt4eklEMGdablZ1WTNScGIyNG9jWFZsY25sZmNHRnlZVzF6S1Z4eVhHNGdJQ0FnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWW9kSGx3Wlc5bUtITmxiR1l1WVdwaGVGOXlaWE4xYkhSelgyTnZibVlwUFQxY0luVnVaR1ZtYVc1bFpGd2lLVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J6Wld4bUxtRnFZWGhmY21WemRXeDBjMTlqYjI1bUlEMGdibVYzSUVGeWNtRjVLQ2s3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUhObGJHWXVZV3BoZUY5eVpYTjFiSFJ6WDJOdmJtWmJKM0J5YjJObGMzTnBibWRmZFhKc0oxMGdQU0JjSWx3aU8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCelpXeG1MbUZxWVhoZmNtVnpkV3gwYzE5amIyNW1XeWR5WlhOMWJIUnpYM1Z5YkNkZElEMGdYQ0pjSWp0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnYzJWc1ppNWhhbUY0WDNKbGMzVnNkSE5mWTI5dVpsc25aR0YwWVY5MGVYQmxKMTBnUFNCY0lsd2lPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnTHk5cFppaHpaV3htTG1GcVlYaGZkWEpzSVQxY0lsd2lLVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaWh6Wld4bUxtUnBjM0JzWVhsZmNtVnpkV3gwWDIxbGRHaHZaRDA5WENKemFHOXlkR052WkdWY0lpbGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2V5OHZkR2hsYmlCM1pTQjNZVzUwSUhSdklHUnZJR0VnY21WeGRXVnpkQ0IwYnlCMGFHVWdZV3BoZUNCbGJtUndiMmx1ZEZ4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2MyVnNaaTVoYW1GNFgzSmxjM1ZzZEhOZlkyOXVabHNuY21WemRXeDBjMTkxY213blhTQTlJSE5sYkdZdVlXUmtWWEpzVUdGeVlXMG9jMlZzWmk1eVpYTjFiSFJ6WDNWeWJDd2djWFZsY25sZmNHRnlZVzF6S1R0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0F2TDJGa1pDQnNZVzVuSUdOdlpHVWdkRzhnWVdwaGVDQmhjR2tnY21WeGRXVnpkQ3dnYkdGdVp5QmpiMlJsSUhOb2IzVnNaQ0JoYkhKbFlXUjVJR0psSUdsdUlIUm9aWEpsSUdadmNpQnZkR2hsY2lCeVpYRjFaWE4wY3lBb2FXVXNJSE4xY0hCc2FXVmtJR2x1SUhSb1pTQlNaWE4xYkhSeklGVlNUQ2xjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnBaaWh6Wld4bUxteGhibWRmWTI5a1pTRTlYQ0pjSWlsY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBdkwzTnZJR0ZrWkNCcGRGeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhGMVpYSjVYM0JoY21GdGN5QTlJSE5sYkdZdWFtOXBibFZ5YkZCaGNtRnRLSEYxWlhKNVgzQmhjbUZ0Y3l3Z1hDSnNZVzVuUFZ3aUszTmxiR1l1YkdGdVoxOWpiMlJsS1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCelpXeG1MbUZxWVhoZmNtVnpkV3gwYzE5amIyNW1XeWR3Y205alpYTnphVzVuWDNWeWJDZGRJRDBnYzJWc1ppNWhaR1JWY214UVlYSmhiU2h6Wld4bUxtRnFZWGhmZFhKc0xDQnhkV1Z5ZVY5d1lYSmhiWE1wTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0x5OXpaV3htTG1GcVlYaGZjbVZ6ZFd4MGMxOWpiMjVtV3lka1lYUmhYM1I1Y0dVblhTQTlJQ2RxYzI5dUp6dGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdaV3h6WlNCcFppaHpaV3htTG1ScGMzQnNZWGxmY21WemRXeDBYMjFsZEdodlpEMDlYQ0p3YjNOMFgzUjVjR1ZmWVhKamFHbDJaVndpS1Z4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCd2NtOWpaWE56WDJadmNtMHVjMlYwVkdGNFFYSmphR2wyWlZKbGMzVnNkSE5WY213b2MyVnNaaXdnYzJWc1ppNXlaWE4xYkhSelgzVnliQ2s3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMllYSWdjbVZ6ZFd4MGMxOTFjbXdnUFNCd2NtOWpaWE56WDJadmNtMHVaMlYwVW1WemRXeDBjMVZ5YkNoelpXeG1MQ0J6Wld4bUxuSmxjM1ZzZEhOZmRYSnNLVHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpaV3htTG1GcVlYaGZjbVZ6ZFd4MGMxOWpiMjVtV3lkeVpYTjFiSFJ6WDNWeWJDZGRJRDBnYzJWc1ppNWhaR1JWY214UVlYSmhiU2h5WlhOMWJIUnpYM1Z5YkN3Z2NYVmxjbmxmY0dGeVlXMXpLVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhObGJHWXVZV3BoZUY5eVpYTjFiSFJ6WDJOdmJtWmJKM0J5YjJObGMzTnBibWRmZFhKc0oxMGdQU0J6Wld4bUxtRmtaRlZ5YkZCaGNtRnRLSEpsYzNWc2RITmZkWEpzTENCeGRXVnllVjl3WVhKaGJYTXBPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0JsYkhObElHbG1LSE5sYkdZdVpHbHpjR3hoZVY5eVpYTjFiSFJmYldWMGFHOWtQVDFjSW1OMWMzUnZiVjkzYjI5amIyMXRaWEpqWlY5emRHOXlaVndpS1Z4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCd2NtOWpaWE56WDJadmNtMHVjMlYwVkdGNFFYSmphR2wyWlZKbGMzVnNkSE5WY213b2MyVnNaaXdnYzJWc1ppNXlaWE4xYkhSelgzVnliQ2s3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMllYSWdjbVZ6ZFd4MGMxOTFjbXdnUFNCd2NtOWpaWE56WDJadmNtMHVaMlYwVW1WemRXeDBjMVZ5YkNoelpXeG1MQ0J6Wld4bUxuSmxjM1ZzZEhOZmRYSnNLVHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpaV3htTG1GcVlYaGZjbVZ6ZFd4MGMxOWpiMjVtV3lkeVpYTjFiSFJ6WDNWeWJDZGRJRDBnYzJWc1ppNWhaR1JWY214UVlYSmhiU2h5WlhOMWJIUnpYM1Z5YkN3Z2NYVmxjbmxmY0dGeVlXMXpLVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhObGJHWXVZV3BoZUY5eVpYTjFiSFJ6WDJOdmJtWmJKM0J5YjJObGMzTnBibWRmZFhKc0oxMGdQU0J6Wld4bUxtRmtaRlZ5YkZCaGNtRnRLSEpsYzNWc2RITmZkWEpzTENCeGRXVnllVjl3WVhKaGJYTXBPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0JsYkhObFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUhzdkwyOTBhR1Z5ZDJselpTQjNaU0IzWVc1MElIUnZJSEIxYkd3Z2RHaGxJSEpsYzNWc2RITWdaR2x5WldOMGJIa2dabkp2YlNCMGFHVWdjbVZ6ZFd4MGN5QndZV2RsWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCelpXeG1MbUZxWVhoZmNtVnpkV3gwYzE5amIyNW1XeWR5WlhOMWJIUnpYM1Z5YkNkZElEMGdjMlZzWmk1aFpHUlZjbXhRWVhKaGJTaHpaV3htTG5KbGMzVnNkSE5mZFhKc0xDQnhkV1Z5ZVY5d1lYSmhiWE1wTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2MyVnNaaTVoYW1GNFgzSmxjM1ZzZEhOZlkyOXVabHNuY0hKdlkyVnpjMmx1WjE5MWNtd25YU0E5SUhObGJHWXVZV1JrVlhKc1VHRnlZVzBvYzJWc1ppNWhhbUY0WDNWeWJDd2djWFZsY25sZmNHRnlZVzF6S1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDOHZjMlZzWmk1aGFtRjRYM0psYzNWc2RITmZZMjl1WmxzblpHRjBZVjkwZVhCbEoxMGdQU0FuYUhSdGJDYzdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSE5sYkdZdVlXcGhlRjl5WlhOMWJIUnpYMk52Ym1aYkozQnliMk5sYzNOcGJtZGZkWEpzSjEwZ1BTQnpaV3htTG1Ga1pGRjFaWEo1VUdGeVlXMXpLSE5sYkdZdVlXcGhlRjl5WlhOMWJIUnpYMk52Ym1aYkozQnliMk5sYzNOcGJtZGZkWEpzSjEwc0lITmxiR1l1WlhoMGNtRmZjWFZsY25sZmNHRnlZVzF6V3lkaGFtRjRKMTBwTzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2MyVnNaaTVoYW1GNFgzSmxjM1ZzZEhOZlkyOXVabHNuWkdGMFlWOTBlWEJsSjEwZ1BTQnpaV3htTG1GcVlYaGZaR0YwWVY5MGVYQmxPMXh5WEc0Z0lDQWdJQ0FnSUgwN1hISmNibHh5WEc1Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnZEdocGN5NTFjR1JoZEdWTWIyRmtaWEpVWVdjZ1BTQm1kVzVqZEdsdmJpZ2tiMkpxWldOMExDQjBZV2RPWVcxbEtTQjdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ0pIQmhjbVZ1ZER0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1LSE5sYkdZdWFXNW1hVzVwZEdWZmMyTnliMnhzWDNKbGMzVnNkRjlqYkdGemN5RTlYQ0pjSWlsY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0pIQmhjbVZ1ZENBOUlITmxiR1l1SkdsdVptbHVhWFJsWDNOamNtOXNiRjlqYjI1MFlXbHVaWEl1Wm1sdVpDaHpaV3htTG1sdVptbHVhWFJsWDNOamNtOXNiRjl5WlhOMWJIUmZZMnhoYzNNcExteGhjM1FvS1M1d1lYSmxiblFvS1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0JsYkhObFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUndZWEpsYm5RZ1BTQnpaV3htTGlScGJtWnBibWwwWlY5elkzSnZiR3hmWTI5dWRHRnBibVZ5TzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdkR0ZuVG1GdFpTQTlJQ1J3WVhKbGJuUXVjSEp2Y0NoY0luUmhaMDVoYldWY0lpazdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ2RHRm5WSGx3WlNBOUlDZGthWFluTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlnZ0tDQjBZV2RPWVcxbExuUnZURzkzWlhKRFlYTmxLQ2tnUFQwZ0oyOXNKeUFwSUh4OElDZ2dkR0ZuVG1GdFpTNTBiMHh2ZDJWeVEyRnpaU2dwSUQwOUlDZDFiQ2NnS1NBcGUxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkR0ZuVkhsd1pTQTlJQ2RzYVNjN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUFrYm1WM0lEMGdKQ2duUENjcmRHRm5WSGx3WlNzbklDOCtKeWt1YUhSdGJDZ2tiMkpxWldOMExtaDBiV3dvS1NrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGNpQmhkSFJ5YVdKMWRHVnpJRDBnSkc5aWFtVmpkQzV3Y205d0tGd2lZWFIwY21saWRYUmxjMXdpS1R0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDOHZJR3h2YjNBZ2RHaHliM1ZuYUNBOGMyVnNaV04wUGlCaGRIUnlhV0oxZEdWeklHRnVaQ0JoY0hCc2VTQjBhR1Z0SUc5dUlEeGthWFkrWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ1F1WldGamFDaGhkSFJ5YVdKMWRHVnpMQ0JtZFc1amRHbHZiaWdwSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUnVaWGN1WVhSMGNpaDBhR2x6TG01aGJXVXNJSFJvYVhNdWRtRnNkV1VwTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0I5S1R0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlBa2JtVjNPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQjlYSEpjYmx4eVhHNWNjbHh1SUNBZ0lDQWdJQ0IwYUdsekxteHZZV1JOYjNKbFVtVnpkV3gwY3lBOUlHWjFibU4wYVc5dUtDbGNjbHh1SUNBZ0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSE5sYkdZdWFYTmZiRzloWkdsdVoxOXRiM0psSUQwZ2RISjFaVHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUM4dmRISnBaMmRsY2lCemRHRnlkQ0JsZG1WdWRGeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdaWFpsYm5SZlpHRjBZU0E5SUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lITm1hV1E2SUhObGJHWXVjMlpwWkN4Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIUmhjbWRsZEZObGJHVmpkRzl5T2lCelpXeG1MbUZxWVhoZmRHRnlaMlYwWDJGMGRISXNYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IwZVhCbE9pQmNJbXh2WVdSZmJXOXlaVndpTEZ4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2IySnFaV04wT2lCelpXeG1YSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIMDdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0J6Wld4bUxuUnlhV2RuWlhKRmRtVnVkQ2hjSW5ObU9tRnFZWGh6ZEdGeWRGd2lMQ0JsZG1WdWRGOWtZWFJoS1R0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJ4ZFdWeWVWOXdZWEpoYlhNZ1BTQnpaV3htTG1kbGRGVnliRkJoY21GdGN5aDBjblZsS1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnYzJWc1ppNXNZWE4wWDNOMVltMXBkRjl4ZFdWeWVWOXdZWEpoYlhNZ1BTQnpaV3htTG1kbGRGVnliRkJoY21GdGN5aG1ZV3h6WlNrN0lDOHZaM0poWWlCaElHTnZjSGtnYjJZZ2FIUmxJRlZTVENCd1lYSmhiWE1nZDJsMGFHOTFkQ0J3WVdkcGJtRjBhVzl1SUdGc2NtVmhaSGtnWVdSa1pXUmNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCaGFtRjRYM0J5YjJObGMzTnBibWRmZFhKc0lEMGdYQ0pjSWp0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlHRnFZWGhmY21WemRXeDBjMTkxY213Z1BTQmNJbHdpTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ1pHRjBZVjkwZVhCbElEMGdYQ0pjSWp0Y2NseHVYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0F2TDI1dmR5QmhaR1FnZEdobElHNWxkeUJ3WVdkcGJtRjBhVzl1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCdVpYaDBYM0JoWjJWa1gyNTFiV0psY2lBOUlIUm9hWE11WTNWeWNtVnVkRjl3WVdkbFpDQXJJREU3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSEYxWlhKNVgzQmhjbUZ0Y3lBOUlITmxiR1l1YW05cGJsVnliRkJoY21GdEtIRjFaWEo1WDNCaGNtRnRjeXdnWENKelpsOXdZV2RsWkQxY0lpdHVaWGgwWDNCaFoyVmtYMjUxYldKbGNpazdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0J6Wld4bUxuTmxkRUZxWVhoU1pYTjFiSFJ6VlZKTWN5aHhkV1Z5ZVY5d1lYSmhiWE1wTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0JoYW1GNFgzQnliMk5sYzNOcGJtZGZkWEpzSUQwZ2MyVnNaaTVoYW1GNFgzSmxjM1ZzZEhOZlkyOXVabHNuY0hKdlkyVnpjMmx1WjE5MWNtd25YVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdZV3BoZUY5eVpYTjFiSFJ6WDNWeWJDQTlJSE5sYkdZdVlXcGhlRjl5WlhOMWJIUnpYMk52Ym1aYkozSmxjM1ZzZEhOZmRYSnNKMTA3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJR1JoZEdGZmRIbHdaU0E5SUhObGJHWXVZV3BoZUY5eVpYTjFiSFJ6WDJOdmJtWmJKMlJoZEdGZmRIbHdaU2RkTzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0x5OWhZbTl5ZENCaGJua2djSEpsZG1sdmRYTWdZV3BoZUNCeVpYRjFaWE4wYzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmloelpXeG1MbXhoYzNSZllXcGhlRjl5WlhGMVpYTjBLVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J6Wld4bUxteGhjM1JmWVdwaGVGOXlaWEYxWlhOMExtRmliM0owS0NrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1LSE5sYkdZdWRYTmxYM05qY205c2JGOXNiMkZrWlhJOVBURXBYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFpoY2lBa2JHOWhaR1Z5SUQwZ0pDZ25QR1JwZGk4K0p5eDdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0oyTnNZWE56SnpvZ0ozTmxZWEpqYUMxbWFXeDBaWEl0YzJOeWIyeHNMV3h2WVdScGJtY25YSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5S1Rzdkx5NWhjSEJsYm1SVWJ5aHpaV3htTGlSaGFtRjRYM0psYzNWc2RITmZZMjl1ZEdGcGJtVnlLVHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWtiRzloWkdWeUlEMGdjMlZzWmk1MWNHUmhkR1ZNYjJGa1pYSlVZV2NvSkd4dllXUmxjaWs3WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjMlZzWmk1cGJtWnBibWwwWlZOamNtOXNiRUZ3Y0dWdVpDZ2tiRzloWkdWeUtUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdjMlZzWmk1c1lYTjBYMkZxWVhoZmNtVnhkV1Z6ZENBOUlDUXVaMlYwS0dGcVlYaGZjSEp2WTJWemMybHVaMTkxY213c0lHWjFibU4wYVc5dUtHUmhkR0VzSUhOMFlYUjFjeXdnY21WeGRXVnpkQ2xjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYzJWc1ppNWpkWEp5Wlc1MFgzQmhaMlZrS3lzN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpaV3htTG14aGMzUmZZV3BoZUY5eVpYRjFaWE4wSUQwZ2JuVnNiRHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXZLaUJ6WTNKdmJHd2dLaTljY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUM4dmMyVnNaaTV6WTNKdmJHeFNaWE4xYkhSektDazdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0x5OTFjR1JoZEdWeklIUm9aU0J5WlhOMWRHeHpJQ1lnWm05eWJTQm9kRzFzWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCelpXeG1MbUZrWkZKbGMzVnNkSE1vWkdGMFlTd2daR0YwWVY5MGVYQmxLVHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUgwc0lHUmhkR0ZmZEhsd1pTa3VabUZwYkNobWRXNWpkR2x2YmlocWNWaElVaXdnZEdWNGRGTjBZWFIxY3l3Z1pYSnliM0pVYUhKdmQyNHBYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCa1lYUmhJRDBnZTMwN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmtZWFJoTG5ObWFXUWdQU0J6Wld4bUxuTm1hV1E3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCa1lYUmhMbTlpYW1WamRDQTlJSE5sYkdZN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmtZWFJoTG5SaGNtZGxkRk5sYkdWamRHOXlJRDBnYzJWc1ppNWhhbUY0WDNSaGNtZGxkRjloZEhSeU8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdaR0YwWVM1aGFtRjRWVkpNSUQwZ1lXcGhlRjl3Y205alpYTnphVzVuWDNWeWJEdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1JoZEdFdWFuRllTRklnUFNCcWNWaElVanRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdSaGRHRXVkR1Y0ZEZOMFlYUjFjeUE5SUhSbGVIUlRkR0YwZFhNN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmtZWFJoTG1WeWNtOXlWR2h5YjNkdUlEMGdaWEp5YjNKVWFISnZkMjQ3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCelpXeG1MblJ5YVdkblpYSkZkbVZ1ZENoY0luTm1PbUZxWVhobGNuSnZjbHdpTENCa1lYUmhLVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUM4cVkyOXVjMjlzWlM1c2IyY29YQ0pCU2tGWUlFWkJTVXhjSWlrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZMjl1YzI5c1pTNXNiMmNvWlNrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZMjl1YzI5c1pTNXNiMmNvZUNrN0tpOWNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSDBwTG1Gc2QyRjVjeWhtZFc1amRHbHZiaWdwWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQmtZWFJoSUQwZ2UzMDdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JrWVhSaExuTm1hV1FnUFNCelpXeG1Mbk5tYVdRN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmtZWFJoTG5SaGNtZGxkRk5sYkdWamRHOXlJRDBnYzJWc1ppNWhhbUY0WDNSaGNtZGxkRjloZEhSeU8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdaR0YwWVM1dlltcGxZM1FnUFNCelpXeG1PMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1LSE5sYkdZdWRYTmxYM05qY205c2JGOXNiMkZrWlhJOVBURXBYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdKR3h2WVdSbGNpNWtaWFJoWTJnb0tUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpaV3htTG1selgyeHZZV1JwYm1kZmJXOXlaU0E5SUdaaGJITmxPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lITmxiR1l1ZEhKcFoyZGxja1YyWlc1MEtGd2ljMlk2WVdwaGVHWnBibWx6YUZ3aUxDQmtZWFJoS1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZlNrN1hISmNibHh5WEc0Z0lDQWdJQ0FnSUgxY2NseHVJQ0FnSUNBZ0lDQjBhR2x6TG1abGRHTm9RV3BoZUZKbGMzVnNkSE1nUFNCbWRXNWpkR2x2YmlncFhISmNiaUFnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMM1J5YVdkblpYSWdjM1JoY25RZ1pYWmxiblJjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUdWMlpXNTBYMlJoZEdFZ1BTQjdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J6Wm1sa09pQnpaV3htTG5ObWFXUXNYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IwWVhKblpYUlRaV3hsWTNSdmNqb2djMlZzWmk1aGFtRjRYM1JoY21kbGRGOWhkSFJ5TEZ4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RIbHdaVG9nWENKc2IyRmtYM0psYzNWc2RITmNJaXhjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUc5aWFtVmpkRG9nYzJWc1pseHlYRzRnSUNBZ0lDQWdJQ0FnSUNCOU8xeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdjMlZzWmk1MGNtbG5aMlZ5UlhabGJuUW9YQ0p6WmpwaGFtRjRjM1JoY25SY0lpd2daWFpsYm5SZlpHRjBZU2s3WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBdkwzSmxabTlqZFhNZ1lXNTVJR2x1Y0hWMElHWnBaV3hrY3lCaFpuUmxjaUIwYUdVZ1ptOXliU0JvWVhNZ1ltVmxiaUIxY0dSaGRHVmtYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUFrYkdGemRGOWhZM1JwZG1WZmFXNXdkWFJmZEdWNGRDQTlJQ1IwYUdsekxtWnBibVFvSjJsdWNIVjBXM1I1Y0dVOVhDSjBaWGgwWENKZE9tWnZZM1Z6SnlrdWJtOTBLRndpTG5ObUxXUmhkR1Z3YVdOclpYSmNJaWs3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJR2xtS0NSc1lYTjBYMkZqZEdsMlpWOXBibkIxZEY5MFpYaDBMbXhsYm1kMGFEMDlNU2xjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlHeGhjM1JmWVdOMGFYWmxYMmx1Y0hWMFgzUmxlSFFnUFNBa2JHRnpkRjloWTNScGRtVmZhVzV3ZFhSZmRHVjRkQzVoZEhSeUtGd2libUZ0WlZ3aUtUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdKSFJvYVhNdVlXUmtRMnhoYzNNb1hDSnpaV0Z5WTJndFptbHNkR1Z5TFdScGMyRmliR1ZrWENJcE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCd2NtOWpaWE56WDJadmNtMHVaR2x6WVdKc1pVbHVjSFYwY3loelpXeG1LVHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUM4dlptRmtaU0J2ZFhRZ2NtVnpkV3gwYzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0J6Wld4bUxpUmhhbUY0WDNKbGMzVnNkSE5mWTI5dWRHRnBibVZ5TG1GdWFXMWhkR1VvZXlCdmNHRmphWFI1T2lBd0xqVWdmU3dnWENKbVlYTjBYQ0lwT3lBdkwyeHZZV1JwYm1kY2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1LSE5sYkdZdVlXcGhlRjloWTNScGIyNDlQVndpY0dGbmFXNWhkR2x2Ymx3aUtWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXZMMjVsWldRZ2RHOGdjbVZ0YjNabElHRmpkR2wyWlNCbWFXeDBaWElnWm5KdmJTQlZVa3hjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXZMM0YxWlhKNVgzQmhjbUZ0Y3lBOUlITmxiR1l1YkdGemRGOXpkV0p0YVhSZmNYVmxjbmxmY0dGeVlXMXpPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDOHZibTkzSUdGa1pDQjBhR1VnYm1WM0lIQmhaMmx1WVhScGIyNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCd1lXZGxUblZ0WW1WeUlEMGdjMlZzWmk0a1lXcGhlRjl5WlhOMWJIUnpYMk52Ym5SaGFXNWxjaTVoZEhSeUtGd2laR0YwWVMxd1lXZGxaRndpS1R0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmloMGVYQmxiMllvY0dGblpVNTFiV0psY2lrOVBWd2lkVzVrWldacGJtVmtYQ0lwWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY0dGblpVNTFiV0psY2lBOUlERTdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCd2NtOWpaWE56WDJadmNtMHVjMlYwVkdGNFFYSmphR2wyWlZKbGMzVnNkSE5WY213b2MyVnNaaXdnYzJWc1ppNXlaWE4xYkhSelgzVnliQ2s3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeGRXVnllVjl3WVhKaGJYTWdQU0J6Wld4bUxtZGxkRlZ5YkZCaGNtRnRjeWhtWVd4elpTazdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWW9jR0ZuWlU1MWJXSmxjajR4S1Z4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhGMVpYSjVYM0JoY21GdGN5QTlJSE5sYkdZdWFtOXBibFZ5YkZCaGNtRnRLSEYxWlhKNVgzQmhjbUZ0Y3l3Z1hDSnpabDl3WVdkbFpEMWNJaXR3WVdkbFRuVnRZbVZ5S1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdaV3h6WlNCcFppaHpaV3htTG1GcVlYaGZZV04wYVc5dVBUMWNJbk4xWW0xcGRGd2lLVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ2NYVmxjbmxmY0dGeVlXMXpJRDBnYzJWc1ppNW5aWFJWY214UVlYSmhiWE1vZEhKMVpTazdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J6Wld4bUxteGhjM1JmYzNWaWJXbDBYM0YxWlhKNVgzQmhjbUZ0Y3lBOUlITmxiR1l1WjJWMFZYSnNVR0Z5WVcxektHWmhiSE5sS1RzZ0x5OW5jbUZpSUdFZ1kyOXdlU0J2WmlCb2RHVWdWVkpNSUhCaGNtRnRjeUIzYVhSb2IzVjBJSEJoWjJsdVlYUnBiMjRnWVd4eVpXRmtlU0JoWkdSbFpGeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZWElnWVdwaGVGOXdjbTlqWlhOemFXNW5YM1Z5YkNBOUlGd2lYQ0k3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCaGFtRjRYM0psYzNWc2RITmZkWEpzSUQwZ1hDSmNJanRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUdSaGRHRmZkSGx3WlNBOUlGd2lYQ0k3WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNCelpXeG1Mbk5sZEVGcVlYaFNaWE4xYkhSelZWSk1jeWh4ZFdWeWVWOXdZWEpoYlhNcE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCaGFtRjRYM0J5YjJObGMzTnBibWRmZFhKc0lEMGdjMlZzWmk1aGFtRjRYM0psYzNWc2RITmZZMjl1WmxzbmNISnZZMlZ6YzJsdVoxOTFjbXduWFR0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnWVdwaGVGOXlaWE4xYkhSelgzVnliQ0E5SUhObGJHWXVZV3BoZUY5eVpYTjFiSFJ6WDJOdmJtWmJKM0psYzNWc2RITmZkWEpzSjEwN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUdSaGRHRmZkSGx3WlNBOUlITmxiR1l1WVdwaGVGOXlaWE4xYkhSelgyTnZibVpiSjJSaGRHRmZkSGx3WlNkZE8xeHlYRzVjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUM4dllXSnZjblFnWVc1NUlIQnlaWFpwYjNWeklHRnFZWGdnY21WeGRXVnpkSE5jY2x4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lvYzJWc1ppNXNZWE4wWDJGcVlYaGZjbVZ4ZFdWemRDbGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjMlZzWmk1c1lYTjBYMkZxWVhoZmNtVnhkV1Z6ZEM1aFltOXlkQ2dwTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNCelpXeG1MbXhoYzNSZllXcGhlRjl5WlhGMVpYTjBJRDBnSkM1blpYUW9ZV3BoZUY5d2NtOWpaWE56YVc1blgzVnliQ3dnWm5WdVkzUnBiMjRvWkdGMFlTd2djM1JoZEhWekxDQnlaWEYxWlhOMEtWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpaV3htTG14aGMzUmZZV3BoZUY5eVpYRjFaWE4wSUQwZ2JuVnNiRHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXZLaUJ6WTNKdmJHd2dLaTljY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhObGJHWXVjMk55YjJ4c1VtVnpkV3gwY3lncE8xeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUM4dmRYQmtZWFJsY3lCMGFHVWdjbVZ6ZFhSc2N5QW1JR1p2Y20wZ2FIUnRiRnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYzJWc1ppNTFjR1JoZEdWU1pYTjFiSFJ6S0dSaGRHRXNJR1JoZEdGZmRIbHdaU2s3WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdMeW9nZFhCa1lYUmxJRlZTVENBcUwxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdMeTkxY0dSaGRHVWdkWEpzSUdKbFptOXlaU0J3WVdkcGJtRjBhVzl1TENCaVpXTmhkWE5sSUhkbElHNWxaV1FnZEc4Z1pHOGdjMjl0WlNCamFHVmphM01nWVdkaGFXNXpJSFJvWlNCVlVrd2dabTl5SUdsdVptbHVhWFJsSUhOamNtOXNiRnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYzJWc1ppNTFjR1JoZEdWVmNteElhWE4wYjNKNUtHRnFZWGhmY21WemRXeDBjMTkxY213cE8xeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUM4dmMyVjBkWEFnY0dGbmFXNWhkR2x2Ymx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2MyVnNaaTV6WlhSMWNFRnFZWGhRWVdkcGJtRjBhVzl1S0NrN1hISmNibHh5WEc1Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J6Wld4bUxtbHpVM1ZpYldsMGRHbHVaeUE5SUdaaGJITmxPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDOHFJSFZ6WlhJZ1pHVm1JQ292WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCelpXeG1MbWx1YVhSWGIyOURiMjF0WlhKalpVTnZiblJ5YjJ4ektDazdJQzh2ZDI5dlkyOXRiV1Z5WTJVZ2IzSmtaWEppZVZ4eVhHNWNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSDBzSUdSaGRHRmZkSGx3WlNrdVptRnBiQ2htZFc1amRHbHZiaWhxY1ZoSVVpd2dkR1Y0ZEZOMFlYUjFjeXdnWlhKeWIzSlVhSEp2ZDI0cFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJrWVhSaElEMGdlMzA3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCa1lYUmhMbk5tYVdRZ1BTQnpaV3htTG5ObWFXUTdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JrWVhSaExuUmhjbWRsZEZObGJHVmpkRzl5SUQwZ2MyVnNaaTVoYW1GNFgzUmhjbWRsZEY5aGRIUnlPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWkdGMFlTNXZZbXBsWTNRZ1BTQnpaV3htTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1pHRjBZUzVoYW1GNFZWSk1JRDBnWVdwaGVGOXdjbTlqWlhOemFXNW5YM1Z5YkR0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHUmhkR0V1YW5GWVNGSWdQU0JxY1ZoSVVqdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1JoZEdFdWRHVjRkRk4wWVhSMWN5QTlJSFJsZUhSVGRHRjBkWE03WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCa1lYUmhMbVZ5Y205eVZHaHliM2R1SUQwZ1pYSnliM0pVYUhKdmQyNDdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J6Wld4bUxtbHpVM1ZpYldsMGRHbHVaeUE5SUdaaGJITmxPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYzJWc1ppNTBjbWxuWjJWeVJYWmxiblFvWENKelpqcGhhbUY0WlhKeWIzSmNJaXdnWkdGMFlTazdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0F2S21OdmJuTnZiR1V1Ykc5bktGd2lRVXBCV0NCR1FVbE1YQ0lwTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHTnZibk52YkdVdWJHOW5LR1VwTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHTnZibk52YkdVdWJHOW5LSGdwT3lvdlhISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlLUzVoYkhkaGVYTW9ablZ1WTNScGIyNG9LVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J6Wld4bUxpUmhhbUY0WDNKbGMzVnNkSE5mWTI5dWRHRnBibVZ5TG5OMGIzQW9kSEoxWlN4MGNuVmxLUzVoYm1sdFlYUmxLSHNnYjNCaFkybDBlVG9nTVgwc0lGd2labUZ6ZEZ3aUtUc2dMeTltYVc1cGMyaGxaQ0JzYjJGa2FXNW5YSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ1pHRjBZU0E5SUh0OU8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdaR0YwWVM1elptbGtJRDBnYzJWc1ppNXpabWxrTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1pHRjBZUzUwWVhKblpYUlRaV3hsWTNSdmNpQTlJSE5sYkdZdVlXcGhlRjkwWVhKblpYUmZZWFIwY2p0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHUmhkR0V1YjJKcVpXTjBJRDBnYzJWc1pqdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ1IwYUdsekxuSmxiVzkyWlVOc1lYTnpLRndpYzJWaGNtTm9MV1pwYkhSbGNpMWthWE5oWW14bFpGd2lLVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhCeWIyTmxjM05mWm05eWJTNWxibUZpYkdWSmJuQjFkSE1vYzJWc1ppazdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0x5OXlaV1p2WTNWeklIUm9aU0JzWVhOMElHRmpkR2wyWlNCMFpYaDBJR1pwWld4a1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnBaaWhzWVhOMFgyRmpkR2wyWlY5cGJuQjFkRjkwWlhoMElUMWNJbHdpS1Z4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQWthVzV3ZFhRZ1BTQmJYVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpaV3htTGlSbWFXVnNaSE11WldGamFDaG1kVzVqZEdsdmJpZ3BlMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJQ1JoWTNScGRtVmZhVzV3ZFhRZ1BTQWtLSFJvYVhNcExtWnBibVFvWENKcGJuQjFkRnR1WVcxbFBTZGNJaXRzWVhOMFgyRmpkR2wyWlY5cGJuQjFkRjkwWlhoMEsxd2lKMTFjSWlrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1LQ1JoWTNScGRtVmZhVzV3ZFhRdWJHVnVaM1JvUFQweEtWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBa2FXNXdkWFFnUFNBa1lXTjBhWFpsWDJsdWNIVjBPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgwcE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUtDUnBibkIxZEM1c1pXNW5kR2c5UFRFcElIdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNScGJuQjFkQzVtYjJOMWN5Z3BMblpoYkNna2FXNXdkWFF1ZG1Gc0tDa3BPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J6Wld4bUxtWnZZM1Z6UTJGdGNHOG9KR2x1Y0hWMFd6QmRLVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdKSFJvYVhNdVptbHVaQ2hjSW1sdWNIVjBXMjVoYldVOUoxOXpabDl6WldGeVkyZ25YVndpS1M1bWIyTjFjeWdwTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2MyVnNaaTUwY21sbloyVnlSWFpsYm5Rb1hDSnpaanBoYW1GNFptbHVhWE5vWENJc0lDQmtZWFJoSUNrN1hISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlLVHRjY2x4dUlDQWdJQ0FnSUNCOU8xeHlYRzVjY2x4dUlDQWdJQ0FnSUNCMGFHbHpMbVp2WTNWelEyRnRjRzhnUFNCbWRXNWpkR2x2YmlocGJuQjFkRVpwWld4a0tYdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0x5OTJZWElnYVc1d2RYUkdhV1ZzWkNBOUlHUnZZM1Z0Wlc1MExtZGxkRVZzWlcxbGJuUkNlVWxrS0dsa0tUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLR2x1Y0hWMFJtbGxiR1FnSVQwZ2JuVnNiQ0FtSmlCcGJuQjFkRVpwWld4a0xuWmhiSFZsTG14bGJtZDBhQ0FoUFNBd0tYdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtSUNocGJuQjFkRVpwWld4a0xtTnlaV0YwWlZSbGVIUlNZVzVuWlNsN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlFWnBaV3hrVW1GdVoyVWdQU0JwYm5CMWRFWnBaV3hrTG1OeVpXRjBaVlJsZUhSU1lXNW5aU2dwTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRVpwWld4a1VtRnVaMlV1Ylc5MlpWTjBZWEowS0NkamFHRnlZV04wWlhJbkxHbHVjSFYwUm1sbGJHUXVkbUZzZFdVdWJHVnVaM1JvS1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JHYVdWc1pGSmhibWRsTG1OdmJHeGhjSE5sS0NrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnUm1sbGJHUlNZVzVuWlM1elpXeGxZM1FvS1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWxiSE5sSUdsbUlDaHBibkIxZEVacFpXeGtMbk5sYkdWamRHbHZibE4wWVhKMElIeDhJR2x1Y0hWMFJtbGxiR1F1YzJWc1pXTjBhVzl1VTNSaGNuUWdQVDBnSnpBbktTQjdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJR1ZzWlcxTVpXNGdQU0JwYm5CMWRFWnBaV3hrTG5aaGJIVmxMbXhsYm1kMGFEdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcGJuQjFkRVpwWld4a0xuTmxiR1ZqZEdsdmJsTjBZWEowSUQwZ1pXeGxiVXhsYmp0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwYm5CMWRFWnBaV3hrTG5ObGJHVmpkR2x2YmtWdVpDQTlJR1ZzWlcxTVpXNDdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXNXdkWFJHYVdWc1pDNW1iMk4xY3lncE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlaV3h6Wlh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbHVjSFYwUm1sbGJHUXVabTlqZFhNb0tUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHlYRzRnSUNBZ0lDQWdJSDFjY2x4dVhISmNiaUFnSUNBZ0lDQWdkR2hwY3k1MGNtbG5aMlZ5UlhabGJuUWdQU0JtZFc1amRHbHZiaWhsZG1WdWRHNWhiV1VzSUdSaGRHRXBYSEpjYmlBZ0lDQWdJQ0FnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ0pHVjJaVzUwWDJOdmJuUmhhVzVsY2lBOUlDUW9YQ0l1YzJWaGNtTm9ZVzVrWm1sc2RHVnlXMlJoZEdFdGMyWXRabTl5YlMxcFpEMG5YQ0lyYzJWc1ppNXpabWxrSzF3aUoxMWNJaWs3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ1JsZG1WdWRGOWpiMjUwWVdsdVpYSXVkSEpwWjJkbGNpaGxkbVZ1ZEc1aGJXVXNJRnNnWkdGMFlTQmRLVHRjY2x4dUlDQWdJQ0FnSUNCOVhISmNibHh5WEc0Z0lDQWdJQ0FnSUhSb2FYTXVabVYwWTJoQmFtRjRSbTl5YlNBOUlHWjFibU4wYVc5dUtDbGNjbHh1SUNBZ0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQzh2ZEhKcFoyZGxjaUJ6ZEdGeWRDQmxkbVZ1ZEZ4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ1pYWmxiblJmWkdGMFlTQTlJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhObWFXUTZJSE5sYkdZdWMyWnBaQ3hjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhSaGNtZGxkRk5sYkdWamRHOXlPaUJ6Wld4bUxtRnFZWGhmZEdGeVoyVjBYMkYwZEhJc1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjBlWEJsT2lCY0ltWnZjbTFjSWl4Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHOWlhbVZqZERvZ2MyVnNabHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnYzJWc1ppNTBjbWxuWjJWeVJYWmxiblFvWENKelpqcGhhbUY0Wm05eWJYTjBZWEowWENJc0lGc2daWFpsYm5SZlpHRjBZU0JkS1R0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDUjBhR2x6TG1Ga1pFTnNZWE56S0Z3aWMyVmhjbU5vTFdacGJIUmxjaTFrYVhOaFlteGxaRndpS1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnY0hKdlkyVnpjMTltYjNKdExtUnBjMkZpYkdWSmJuQjFkSE1vYzJWc1ppazdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ2NYVmxjbmxmY0dGeVlXMXpJRDBnYzJWc1ppNW5aWFJWY214UVlYSmhiWE1vS1R0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1LSE5sYkdZdWJHRnVaMTlqYjJSbElUMWNJbHdpS1Z4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBdkwzTnZJR0ZrWkNCcGRGeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjWFZsY25sZmNHRnlZVzF6SUQwZ2MyVnNaaTVxYjJsdVZYSnNVR0Z5WVcwb2NYVmxjbmxmY0dGeVlXMXpMQ0JjSW14aGJtYzlYQ0lyYzJWc1ppNXNZVzVuWDJOdlpHVXBPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ1lXcGhlRjl3Y205alpYTnphVzVuWDNWeWJDQTlJSE5sYkdZdVlXUmtWWEpzVUdGeVlXMG9jMlZzWmk1aGFtRjRYMlp2Y20xZmRYSnNMQ0J4ZFdWeWVWOXdZWEpoYlhNcE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdaR0YwWVY5MGVYQmxJRDBnWENKcWMyOXVYQ0k3WEhKY2JseHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdMeTloWW05eWRDQmhibmtnY0hKbGRtbHZkWE1nWVdwaGVDQnlaWEYxWlhOMGMxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBdkttbG1LSE5sYkdZdWJHRnpkRjloYW1GNFgzSmxjWFZsYzNRcFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNCelpXeG1MbXhoYzNSZllXcGhlRjl5WlhGMVpYTjBMbUZpYjNKMEtDazdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQjlLaTljY2x4dVhISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMM05sYkdZdWJHRnpkRjloYW1GNFgzSmxjWFZsYzNRZ1BWeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdKQzVuWlhRb1lXcGhlRjl3Y205alpYTnphVzVuWDNWeWJDd2dablZ1WTNScGIyNG9aR0YwWVN3Z2MzUmhkSFZ6TENCeVpYRjFaWE4wS1Z4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBdkwzTmxiR1l1YkdGemRGOWhhbUY0WDNKbGNYVmxjM1FnUFNCdWRXeHNPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDOHZkWEJrWVhSbGN5QjBhR1VnY21WemRYUnNjeUFtSUdadmNtMGdhSFJ0YkZ4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2MyVnNaaTUxY0dSaGRHVkdiM0p0S0dSaGRHRXNJR1JoZEdGZmRIbHdaU2s3WEhKY2JseHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdmU3dnWkdGMFlWOTBlWEJsS1M1bVlXbHNLR1oxYm1OMGFXOXVLR3B4V0VoU0xDQjBaWGgwVTNSaGRIVnpMQ0JsY25KdmNsUm9jbTkzYmlsY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJR1JoZEdFZ1BTQjdmVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdSaGRHRXVjMlpwWkNBOUlITmxiR1l1YzJacFpEdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1JoZEdFdWRHRnlaMlYwVTJWc1pXTjBiM0lnUFNCelpXeG1MbUZxWVhoZmRHRnlaMlYwWDJGMGRISTdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JrWVhSaExtOWlhbVZqZENBOUlITmxiR1k3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCa1lYUmhMbUZxWVhoVlVrd2dQU0JoYW1GNFgzQnliMk5sYzNOcGJtZGZkWEpzTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1pHRjBZUzVxY1ZoSVVpQTlJR3B4V0VoU08xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdaR0YwWVM1MFpYaDBVM1JoZEhWeklEMGdkR1Y0ZEZOMFlYUjFjenRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdSaGRHRXVaWEp5YjNKVWFISnZkMjRnUFNCbGNuSnZjbFJvY205M2JqdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSE5sYkdZdWRISnBaMmRsY2tWMlpXNTBLRndpYzJZNllXcGhlR1Z5Y205eVhDSXNJRnNnWkdGMFlTQmRLVHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUgwcExtRnNkMkY1Y3lobWRXNWpkR2x2YmlncFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJrWVhSaElEMGdlMzA3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCa1lYUmhMbk5tYVdRZ1BTQnpaV3htTG5ObWFXUTdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JrWVhSaExuUmhjbWRsZEZObGJHVmpkRzl5SUQwZ2MyVnNaaTVoYW1GNFgzUmhjbWRsZEY5aGRIUnlPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWkdGMFlTNXZZbXBsWTNRZ1BTQnpaV3htTzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ1IwYUdsekxuSmxiVzkyWlVOc1lYTnpLRndpYzJWaGNtTm9MV1pwYkhSbGNpMWthWE5oWW14bFpGd2lLVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhCeWIyTmxjM05mWm05eWJTNWxibUZpYkdWSmJuQjFkSE1vYzJWc1ppazdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2MyVnNaaTUwY21sbloyVnlSWFpsYm5Rb1hDSnpaanBoYW1GNFptOXliV1pwYm1semFGd2lMQ0JiSUdSaGRHRWdYU2s3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSDBwTzF4eVhHNGdJQ0FnSUNBZ0lIMDdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lIUm9hWE11WTI5d2VVeHBjM1JKZEdWdGMwTnZiblJsYm5SeklEMGdablZ1WTNScGIyNG9KR3hwYzNSZlpuSnZiU3dnSkd4cGMzUmZkRzhwWEhKY2JpQWdJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdjMlZzWmlBOUlIUm9hWE03WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBdkwyTnZjSGtnYjNabGNpQmphR2xzWkNCc2FYTjBJR2wwWlcxelhISmNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGNpQnNhVjlqYjI1MFpXNTBjMTloY25KaGVTQTlJRzVsZHlCQmNuSmhlU2dwTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ1puSnZiVjloZEhSeWFXSjFkR1Z6SUQwZ2JtVjNJRUZ5Y21GNUtDazdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ0pHWnliMjFmWm1sbGJHUnpJRDBnSkd4cGMzUmZabkp2YlM1bWFXNWtLRndpUGlCMWJDQStJR3hwWENJcE8xeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdKR1p5YjIxZlptbGxiR1J6TG1WaFkyZ29ablZ1WTNScGIyNG9hU2w3WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdiR2xmWTI5dWRHVnVkSE5mWVhKeVlYa3VjSFZ6YUNna0tIUm9hWE1wTG1oMGJXd29LU2s3WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUdGMGRISnBZblYwWlhNZ1BTQWtLSFJvYVhNcExuQnliM0FvWENKaGRIUnlhV0oxZEdWelhDSXBPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWm5KdmJWOWhkSFJ5YVdKMWRHVnpMbkIxYzJnb1lYUjBjbWxpZFhSbGN5azdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0x5OTJZWElnWm1sbGJHUmZibUZ0WlNBOUlDUW9kR2hwY3lrdVlYUjBjaWhjSW1SaGRHRXRjMll0Wm1sbGJHUXRibUZ0WlZ3aUtUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzh2ZG1GeUlIUnZYMlpwWld4a0lEMGdKR3hwYzNSZmRHOHVabWx1WkNoY0lqNGdkV3dnUGlCc2FWdGtZWFJoTFhObUxXWnBaV3hrTFc1aGJXVTlKMXdpSzJacFpXeGtYMjVoYldVclhDSW5YVndpS1R0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0F2TDNObGJHWXVZMjl3ZVVGMGRISnBZblYwWlhNb0pDaDBhR2x6S1N3Z0pHeHBjM1JmZEc4c0lGd2laR0YwWVMxelppMWNJaWs3WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNCOUtUdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCc2FWOXBkQ0E5SURBN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGNpQWtkRzlmWm1sbGJHUnpJRDBnSkd4cGMzUmZkRzh1Wm1sdVpDaGNJajRnZFd3Z1BpQnNhVndpS1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSkhSdlgyWnBaV3hrY3k1bFlXTm9LR1oxYm1OMGFXOXVLR2twZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0pDaDBhR2x6S1M1b2RHMXNLR3hwWDJOdmJuUmxiblJ6WDJGeWNtRjVXMnhwWDJsMFhTazdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJQ1JtY205dFgyWnBaV3hrSUQwZ0pDZ2tabkp2YlY5bWFXVnNaSE11WjJWMEtHeHBYMmwwS1NrN1hISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlDUjBiMTltYVdWc1pDQTlJQ1FvZEdocGN5azdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FrZEc5ZlptbGxiR1F1Y21WdGIzWmxRWFIwY2loY0ltUmhkR0V0YzJZdGRHRjRiMjV2YlhrdFlYSmphR2wyWlZ3aUtUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSE5sYkdZdVkyOXdlVUYwZEhKcFluVjBaWE1vSkdaeWIyMWZabWxsYkdRc0lDUjBiMTltYVdWc1pDazdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2JHbGZhWFFyS3p0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZlNrN1hISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZLblpoY2lBa1puSnZiVjltYVdWc1pITWdQU0FrYkdsemRGOW1jbTl0TG1acGJtUW9YQ0lnZFd3Z1BpQnNhVndpS1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQWtkRzlmWm1sbGJHUnpJRDBnSkd4cGMzUmZkRzh1Wm1sdVpDaGNJaUErSUd4cFhDSXBPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdKR1p5YjIxZlptbGxiR1J6TG1WaFkyZ29ablZ1WTNScGIyNG9hVzVrWlhnc0lIWmhiQ2w3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0JwWmlna0tIUm9hWE1wTG1oaGMwRjBkSEpwWW5WMFpTaGNJbVJoZEdFdGMyWXRkR0Y0YjI1dmJYa3RZWEpqYUdsMlpWd2lLU2xjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJSHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNCOVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNCOUtUdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxtTnZjSGxCZEhSeWFXSjFkR1Z6S0NSc2FYTjBYMlp5YjIwc0lDUnNhWE4wWDNSdktUc3FMMXh5WEc0Z0lDQWdJQ0FnSUgxY2NseHVYSEpjYmlBZ0lDQWdJQ0FnZEdocGN5NTFjR1JoZEdWR2IzSnRRWFIwY21saWRYUmxjeUE5SUdaMWJtTjBhVzl1S0NSc2FYTjBYMlp5YjIwc0lDUnNhWE4wWDNSdktWeHlYRzRnSUNBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUdaeWIyMWZZWFIwY21saWRYUmxjeUE5SUNSc2FYTjBYMlp5YjIwdWNISnZjQ2hjSW1GMGRISnBZblYwWlhOY0lpazdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDOHZJR3h2YjNBZ2RHaHliM1ZuYUNBOGMyVnNaV04wUGlCaGRIUnlhV0oxZEdWeklHRnVaQ0JoY0hCc2VTQjBhR1Z0SUc5dUlEeGthWFkrWEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdkRzlmWVhSMGNtbGlkWFJsY3lBOUlDUnNhWE4wWDNSdkxuQnliM0FvWENKaGRIUnlhV0oxZEdWelhDSXBPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWtMbVZoWTJnb2RHOWZZWFIwY21saWRYUmxjeXdnWm5WdVkzUnBiMjRvS1NCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWtiR2x6ZEY5MGJ5NXlaVzF2ZG1WQmRIUnlLSFJvYVhNdWJtRnRaU2s3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSDBwTzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0pDNWxZV05vS0daeWIyMWZZWFIwY21saWRYUmxjeXdnWm5WdVkzUnBiMjRvS1NCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWtiR2x6ZEY5MGJ5NWhkSFJ5S0hSb2FYTXVibUZ0WlN3Z2RHaHBjeTUyWVd4MVpTazdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIMHBPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQjlYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lIUm9hWE11WTI5d2VVRjBkSEpwWW5WMFpYTWdQU0JtZFc1amRHbHZiaWdrWm5KdmJTd2dKSFJ2TENCd2NtVm1hWGdwWEhKY2JpQWdJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppaDBlWEJsYjJZb2NISmxabWw0S1QwOVhDSjFibVJsWm1sdVpXUmNJaWxjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlIQnlaV1pwZUNBOUlGd2lYQ0k3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGNpQm1jbTl0WDJGMGRISnBZblYwWlhNZ1BTQWtabkp2YlM1d2NtOXdLRndpWVhSMGNtbGlkWFJsYzF3aUtUdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCMGIxOWhkSFJ5YVdKMWRHVnpJRDBnSkhSdkxuQnliM0FvWENKaGRIUnlhV0oxZEdWelhDSXBPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWtMbVZoWTJnb2RHOWZZWFIwY21saWRYUmxjeXdnWm5WdVkzUnBiMjRvS1NCN1hISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYVdZb2NISmxabWw0SVQxY0lsd2lLU0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lnS0hSb2FYTXVibUZ0WlM1cGJtUmxlRTltS0hCeVpXWnBlQ2tnUFQwZ01Da2dlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FrZEc4dWNtVnRiM1psUVhSMGNpaDBhR2x6TG01aGJXVXBPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdWc2MyVmNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXZMeVIwYnk1eVpXMXZkbVZCZEhSeUtIUm9hWE11Ym1GdFpTazdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSDBwTzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0pDNWxZV05vS0daeWIyMWZZWFIwY21saWRYUmxjeXdnWm5WdVkzUnBiMjRvS1NCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWtkRzh1WVhSMGNpaDBhR2x6TG01aGJXVXNJSFJvYVhNdWRtRnNkV1VwTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0I5S1R0Y2NseHVJQ0FnSUNBZ0lDQjlYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lIUm9hWE11WTI5d2VVWnZjbTFCZEhSeWFXSjFkR1Z6SUQwZ1puVnVZM1JwYjI0b0pHWnliMjBzSUNSMGJ5bGNjbHh1SUNBZ0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ1IwYnk1eVpXMXZkbVZCZEhSeUtGd2laR0YwWVMxamRYSnlaVzUwTFhSaGVHOXViMjE1TFdGeVkyaHBkbVZjSWlrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUhSb2FYTXVZMjl3ZVVGMGRISnBZblYwWlhNb0pHWnliMjBzSUNSMGJ5azdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lIMWNjbHh1WEhKY2JpQWdJQ0FnSUNBZ2RHaHBjeTUxY0dSaGRHVkdiM0p0SUQwZ1puVnVZM1JwYjI0b1pHRjBZU3dnWkdGMFlWOTBlWEJsS1Z4eVhHNGdJQ0FnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJSE5sYkdZZ1BTQjBhR2x6TzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWW9aR0YwWVY5MGVYQmxQVDFjSW1wemIyNWNJaWxjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdleTh2ZEdobGJpQjNaU0JrYVdRZ1lTQnlaWEYxWlhOMElIUnZJSFJvWlNCaGFtRjRJR1Z1WkhCdmFXNTBMQ0J6YnlCbGVIQmxZM1FnWVc0Z2IySnFaV04wSUdKaFkydGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppaDBlWEJsYjJZb1pHRjBZVnNuWm05eWJTZGRLU0U5UFZ3aWRXNWtaV1pwYm1Wa1hDSXBYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdMeTl5WlcxdmRtVWdZV3hzSUdWMlpXNTBjeUJtY205dElGTW1SaUJtYjNKdFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSkhSb2FYTXViMlptS0NrN1hISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDOHZjbVZtY21WemFDQjBhR1VnWm05eWJTQW9ZWFYwYnlCamIzVnVkQ2xjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpaV3htTG1OdmNIbE1hWE4wU1hSbGJYTkRiMjUwWlc1MGN5Z2tLR1JoZEdGYkoyWnZjbTBuWFNrc0lDUjBhR2x6S1R0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0x5OXlaU0JwYm1sMElGTW1SaUJqYkdGemN5QnZiaUIwYUdVZ1ptOXliVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDOHZKSFJvYVhNdWMyVmhjbU5vUVc1a1JtbHNkR1Z5S0NrN1hISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDOHZhV1lnWVdwaGVDQnBjeUJsYm1GaWJHVmtJR2x1YVhRZ2RHaGxJSEJoWjJsdVlYUnBiMjVjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NXBibWwwS0hSeWRXVXBPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmloelpXeG1MbWx6WDJGcVlYZzlQVEVwWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J6Wld4bUxuTmxkSFZ3UVdwaGVGQmhaMmx1WVhScGIyNG9LVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlYSEpjYmx4eVhHNWNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2NseHVYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lIMWNjbHh1SUNBZ0lDQWdJQ0IwYUdsekxtRmtaRkpsYzNWc2RITWdQU0JtZFc1amRHbHZiaWhrWVhSaExDQmtZWFJoWDNSNWNHVXBYSEpjYmlBZ0lDQWdJQ0FnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ2MyVnNaaUE5SUhSb2FYTTdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmloa1lYUmhYM1I1Y0dVOVBWd2lhbk52Ymx3aUtWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCN0x5OTBhR1Z1SUhkbElHUnBaQ0JoSUhKbGNYVmxjM1FnZEc4Z2RHaGxJR0ZxWVhnZ1pXNWtjRzlwYm5Rc0lITnZJR1Y0Y0dWamRDQmhiaUJ2WW1wbFkzUWdZbUZqYTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0x5OW5jbUZpSUhSb1pTQnlaWE4xYkhSeklHRnVaQ0JzYjJGa0lHbHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0F2TDNObGJHWXVKR0ZxWVhoZmNtVnpkV3gwYzE5amIyNTBZV2x1WlhJdVlYQndaVzVrS0dSaGRHRmJKM0psYzNWc2RITW5YU2s3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCelpXeG1MbXh2WVdSZmJXOXlaVjlvZEcxc0lEMGdaR0YwWVZzbmNtVnpkV3gwY3lkZE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUdWc2MyVWdhV1lvWkdGMFlWOTBlWEJsUFQxY0ltaDBiV3hjSWlsY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZXk4dmQyVWdZWEpsSUdWNGNHVmpkR2x1WnlCMGFHVWdhSFJ0YkNCdlppQjBhR1VnY21WemRXeDBjeUJ3WVdkbElHSmhZMnNzSUhOdklHVjRkSEpoWTNRZ2RHaGxJR2gwYld3Z2QyVWdibVZsWkZ4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFpoY2lBa1pHRjBZVjl2WW1vZ1BTQWtLR1JoZEdFcE8xeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUM4dmMyVnNaaTRrYVc1bWFXNXBkR1ZmYzJOeWIyeHNYMk52Ym5SaGFXNWxjaTVoY0hCbGJtUW9KR1JoZEdGZmIySnFMbVpwYm1Rb2MyVnNaaTVoYW1GNFgzUmhjbWRsZEY5aGRIUnlLUzVvZEcxc0tDa3BPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYzJWc1ppNXNiMkZrWDIxdmNtVmZhSFJ0YkNBOUlDUmtZWFJoWDI5aWFpNW1hVzVrS0hObGJHWXVZV3BoZUY5MFlYSm5aWFJmWVhSMGNpa3VhSFJ0YkNncE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZWElnYVc1bWFXNXBkR1ZmYzJOeWIyeHNYMlZ1WkNBOUlHWmhiSE5sTzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWW9KQ2hjSWp4a2FYWStYQ0lyYzJWc1ppNXNiMkZrWDIxdmNtVmZhSFJ0YkN0Y0lqd3ZaR2wyUGx3aUtTNW1hVzVrS0Z3aVcyUmhkR0V0YzJWaGNtTm9MV1pwYkhSbGNpMWhZM1JwYjI0OUoybHVabWx1YVhSbExYTmpjbTlzYkMxbGJtUW5YVndpS1M1c1pXNW5kR2crTUNsY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXNW1hVzVwZEdWZmMyTnliMnhzWDJWdVpDQTlJSFJ5ZFdVN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDOHZhV1lnZEdobGNtVWdhWE1nWVc1dmRHaGxjaUJ6Wld4bFkzUnZjaUJtYjNJZ2FXNW1hVzVwZEdVZ2MyTnliMnhzTENCbWFXNWtJSFJvWlNCamIyNTBaVzUwY3lCdlppQjBhR0YwSUdsdWMzUmxZV1JjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lvYzJWc1ppNXBibVpwYm1sMFpWOXpZM0p2Ykd4ZlkyOXVkR0ZwYm1WeUlUMWNJbHdpS1Z4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCelpXeG1MbXh2WVdSZmJXOXlaVjlvZEcxc0lEMGdKQ2hjSWp4a2FYWStYQ0lyYzJWc1ppNXNiMkZrWDIxdmNtVmZhSFJ0YkN0Y0lqd3ZaR2wyUGx3aUtTNW1hVzVrS0hObGJHWXVhVzVtYVc1cGRHVmZjMk55YjJ4c1gyTnZiblJoYVc1bGNpa3VhSFJ0YkNncE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUtITmxiR1l1YVc1bWFXNXBkR1ZmYzJOeWIyeHNYM0psYzNWc2RGOWpiR0Z6Y3lFOVhDSmNJaWxjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlDUnlaWE4xYkhSZmFYUmxiWE1nUFNBa0tGd2lQR1JwZGo1Y0lpdHpaV3htTG14dllXUmZiVzl5WlY5b2RHMXNLMXdpUEM5a2FYWStYQ0lwTG1acGJtUW9jMlZzWmk1cGJtWnBibWwwWlY5elkzSnZiR3hmY21WemRXeDBYMk5zWVhOektUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFpoY2lBa2NtVnpkV3gwWDJsMFpXMXpYMk52Ym5SaGFXNWxjaUE5SUNRb0p6eGthWFl2UGljc0lIdDlLVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNSeVpYTjFiSFJmYVhSbGJYTmZZMjl1ZEdGcGJtVnlMbUZ3Y0dWdVpDZ2tjbVZ6ZFd4MFgybDBaVzF6S1R0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J6Wld4bUxteHZZV1JmYlc5eVpWOW9kRzFzSUQwZ0pISmxjM1ZzZEY5cGRHVnRjMTlqYjI1MFlXbHVaWEl1YUhSdGJDZ3BPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlocGJtWnBibWwwWlY5elkzSnZiR3hmWlc1a0tWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCN0x5OTNaU0JtYjNWdVpDQmhJR1JoZEdFZ1lYUjBjbWxpZFhSbElITnBaMjVoYkd4cGJtY2dkR2hsSUd4aGMzUWdjR0ZuWlNCemJ5Qm1hVzVwYzJnZ2FHVnlaVnh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lITmxiR1l1YVhOZmJXRjRYM0JoWjJWa0lEMGdkSEoxWlR0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lITmxiR1l1YkdGemRGOXNiMkZrWDIxdmNtVmZhSFJ0YkNBOUlITmxiR1l1Ykc5aFpGOXRiM0psWDJoMGJXdzdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2MyVnNaaTVwYm1acGJtbDBaVk5qY205c2JFRndjR1Z1WkNoelpXeG1MbXh2WVdSZmJXOXlaVjlvZEcxc0tUdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdaV3h6WlNCcFppaHpaV3htTG14aGMzUmZiRzloWkY5dGIzSmxYMmgwYld3aFBUMXpaV3htTG14dllXUmZiVzl5WlY5b2RHMXNLVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0F2TDJOb1pXTnJJSFJ2SUcxaGEyVWdjM1Z5WlNCMGFHVWdibVYzSUdoMGJXd2dabVYwWTJobFpDQnBjeUJrYVdabVpYSmxiblJjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhObGJHWXViR0Z6ZEY5c2IyRmtYMjF2Y21WZmFIUnRiQ0E5SUhObGJHWXViRzloWkY5dGIzSmxYMmgwYld3N1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpaV3htTG1sdVptbHVhWFJsVTJOeWIyeHNRWEJ3Wlc1a0tITmxiR1l1Ykc5aFpGOXRiM0psWDJoMGJXd3BPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0JsYkhObFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUhzdkwzZGxJSEpsWTJWcGRtVmtJSFJvWlNCellXMWxJRzFsYzNOaFoyVWdZV2RoYVc0Z2MyOGdaRzl1SjNRZ1lXUmtMQ0JoYm1RZ2RHVnNiQ0JUSmtZZ2RHaGhkQ0IzWlNkeVpTQmhkQ0IwYUdVZ1pXNWtMaTVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhObGJHWXVhWE5mYldGNFgzQmhaMlZrSUQwZ2RISjFaVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh5WEc0Z0lDQWdJQ0FnSUgxY2NseHVYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lIUm9hWE11YVc1bWFXNXBkR1ZUWTNKdmJHeEJjSEJsYm1RZ1BTQm1kVzVqZEdsdmJpZ2tiMkpxWldOMEtWeHlYRzRnSUNBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lvYzJWc1ppNXBibVpwYm1sMFpWOXpZM0p2Ykd4ZmNtVnpkV3gwWDJOc1lYTnpJVDFjSWx3aUtWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpaV3htTGlScGJtWnBibWwwWlY5elkzSnZiR3hmWTI5dWRHRnBibVZ5TG1acGJtUW9jMlZzWmk1cGJtWnBibWwwWlY5elkzSnZiR3hmY21WemRXeDBYMk5zWVhOektTNXNZWE4wS0NrdVlXWjBaWElvSkc5aWFtVmpkQ2s3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdaV3h6WlZ4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhObGJHWXVKR2x1Wm1sdWFYUmxYM05qY205c2JGOWpiMjUwWVdsdVpYSXVZWEJ3Wlc1a0tDUnZZbXBsWTNRcE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhISmNiaUFnSUNBZ0lDQWdmVnh5WEc1Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnZEdocGN5NTFjR1JoZEdWU1pYTjFiSFJ6SUQwZ1puVnVZM1JwYjI0b1pHRjBZU3dnWkdGMFlWOTBlWEJsS1Z4eVhHNGdJQ0FnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJSE5sYkdZZ1BTQjBhR2x6TzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWW9aR0YwWVY5MGVYQmxQVDFjSW1wemIyNWNJaWxjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdleTh2ZEdobGJpQjNaU0JrYVdRZ1lTQnlaWEYxWlhOMElIUnZJSFJvWlNCaGFtRjRJR1Z1WkhCdmFXNTBMQ0J6YnlCbGVIQmxZM1FnWVc0Z2IySnFaV04wSUdKaFkydGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzh2WjNKaFlpQjBhR1VnY21WemRXeDBjeUJoYm1RZ2JHOWhaQ0JwYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2MyVnNaaTRrWVdwaGVGOXlaWE4xYkhSelgyTnZiblJoYVc1bGNpNW9kRzFzS0dSaGRHRmJKM0psYzNWc2RITW5YU2s3WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lvZEhsd1pXOW1LR1JoZEdGYkoyWnZjbTBuWFNraFBUMWNJblZ1WkdWbWFXNWxaRndpS1Z4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUM4dmNtVnRiM1psSUdGc2JDQmxkbVZ1ZEhNZ1puSnZiU0JUSmtZZ1ptOXliVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUjBhR2x6TG05bVppZ3BPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0F2TDNKbGJXOTJaU0J3WVdkcGJtRjBhVzl1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjMlZzWmk1eVpXMXZkbVZCYW1GNFVHRm5hVzVoZEdsdmJpZ3BPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0F2TDNKbFpuSmxjMmdnZEdobElHWnZjbTBnS0dGMWRHOGdZMjkxYm5RcFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYzJWc1ppNWpiM0I1VEdsemRFbDBaVzF6UTI5dWRHVnVkSE1vSkNoa1lYUmhXeWRtYjNKdEoxMHBMQ0FrZEdocGN5azdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzh2ZFhCa1lYUmxJR0YwZEhKcFluVjBaWE1nYjI0Z1ptOXliVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lITmxiR1l1WTI5d2VVWnZjbTFCZEhSeWFXSjFkR1Z6S0NRb1pHRjBZVnNuWm05eWJTZGRLU3dnSkhSb2FYTXBPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0F2TDNKbElHbHVhWFFnVXlaR0lHTnNZWE56SUc5dUlIUm9aU0JtYjNKdFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSkhSb2FYTXVjMlZoY21Ob1FXNWtSbWxzZEdWeUtIc25hWE5KYm1sMEp6b2dabUZzYzJWOUtUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdWc2MyVmNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXZMeVIwYUdsekxtWnBibVFvWENKcGJuQjFkRndpS1M1eVpXMXZkbVZCZEhSeUtGd2laR2x6WVdKc1pXUmNJaWs3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnWld4elpTQnBaaWhrWVhSaFgzUjVjR1U5UFZ3aWFIUnRiRndpS1NCN0x5OTNaU0JoY21VZ1pYaHdaV04wYVc1bklIUm9aU0JvZEcxc0lHOW1JSFJvWlNCeVpYTjFiSFJ6SUhCaFoyVWdZbUZqYXl3Z2MyOGdaWGgwY21GamRDQjBhR1VnYUhSdGJDQjNaU0J1WldWa1hISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlDUmtZWFJoWDI5aWFpQTlJQ1FvWkdGMFlTazdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2MyVnNaaTRrWVdwaGVGOXlaWE4xYkhSelgyTnZiblJoYVc1bGNpNW9kRzFzS0NSa1lYUmhYMjlpYWk1bWFXNWtLSE5sYkdZdVlXcGhlRjkwWVhKblpYUmZZWFIwY2lrdWFIUnRiQ2dwS1R0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb2MyVnNaaTRrWVdwaGVGOXlaWE4xYkhSelgyTnZiblJoYVc1bGNpNW1hVzVrS0Z3aUxuTmxZWEpqYUdGdVpHWnBiSFJsY2x3aUtTNXNaVzVuZEdnZ1BpQXdLVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZXk4dmRHaGxiaUIwYUdWeVpTQmhjbVVnYzJWaGNtTm9JR1p2Y20wb2N5a2dhVzV6YVdSbElIUm9aU0J5WlhOMWJIUnpJR052Ym5SaGFXNWxjaXdnYzI4Z2NtVXRhVzVwZENCMGFHVnRYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSE5sYkdZdUpHRnFZWGhmY21WemRXeDBjMTlqYjI1MFlXbHVaWEl1Wm1sdVpDaGNJaTV6WldGeVkyaGhibVJtYVd4MFpYSmNJaWt1YzJWaGNtTm9RVzVrUm1sc2RHVnlLQ2s3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOVhISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnTHk5cFppQjBhR1VnWTNWeWNtVnVkQ0J6WldGeVkyZ2dabTl5YlNCcGN5QnViM1FnYVc1emFXUmxJSFJvWlNCeVpYTjFiSFJ6SUdOdmJuUmhhVzVsY2l3Z2RHaGxiaUJ3Y205alpXVmtJR0Z6SUc1dmNtMWhiQ0JoYm1RZ2RYQmtZWFJsSUhSb1pTQm1iM0p0WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppaHpaV3htTGlSaGFtRjRYM0psYzNWc2RITmZZMjl1ZEdGcGJtVnlMbVpwYm1Rb1hDSXVjMlZoY21Ob1lXNWtabWxzZEdWeVcyUmhkR0V0YzJZdFptOXliUzFwWkQwblhDSWdLeUJ6Wld4bUxuTm1hV1FnS3lCY0lpZGRYQ0lwTG14bGJtZDBhRDA5TUNrZ2UxeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnSkc1bGQxOXpaV0Z5WTJoZlptOXliU0E5SUNSa1lYUmhYMjlpYWk1bWFXNWtLRndpTG5ObFlYSmphR0Z1WkdacGJIUmxjbHRrWVhSaExYTm1MV1p2Y20wdGFXUTlKMXdpSUNzZ2MyVnNaaTV6Wm1sa0lDc2dYQ0luWFZ3aUtUdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lnS0NSdVpYZGZjMlZoY21Ob1gyWnZjbTB1YkdWdVozUm9JRDA5SURFcElIc3ZMM1JvWlc0Z2NtVndiR0ZqWlNCMGFHVWdjMlZoY21Ob0lHWnZjbTBnZDJsMGFDQjBhR1VnYm1WM0lHOXVaVnh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0x5OXlaVzF2ZG1VZ1lXeHNJR1YyWlc1MGN5Qm1jbTl0SUZNbVJpQm1iM0p0WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNSMGFHbHpMbTltWmlncE8xeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnTHk5eVpXMXZkbVVnY0dGbmFXNWhkR2x2Ymx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCelpXeG1MbkpsYlc5MlpVRnFZWGhRWVdkcGJtRjBhVzl1S0NrN1hISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0F2TDNKbFpuSmxjMmdnZEdobElHWnZjbTBnS0dGMWRHOGdZMjkxYm5RcFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lITmxiR1l1WTI5d2VVeHBjM1JKZEdWdGMwTnZiblJsYm5SektDUnVaWGRmYzJWaGNtTm9YMlp2Y20wc0lDUjBhR2x6S1R0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzh2ZFhCa1lYUmxJR0YwZEhKcFluVjBaWE1nYjI0Z1ptOXliVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J6Wld4bUxtTnZjSGxHYjNKdFFYUjBjbWxpZFhSbGN5Z2tibVYzWDNObFlYSmphRjltYjNKdExDQWtkR2hwY3lrN1hISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0F2TDNKbElHbHVhWFFnVXlaR0lHTnNZWE56SUc5dUlIUm9aU0JtYjNKdFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUjBhR2x6TG5ObFlYSmphRUZ1WkVacGJIUmxjaWg3SjJselNXNXBkQ2M2SUdaaGJITmxmU2s3WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JsYkhObElIdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUM4dkpIUm9hWE11Wm1sdVpDaGNJbWx1Y0hWMFhDSXBMbkpsYlc5MlpVRjBkSElvWENKa2FYTmhZbXhsWkZ3aUtUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSE5sYkdZdWFYTmZiV0Y0WDNCaFoyVmtJRDBnWm1Gc2MyVTdJQzh2Wm05eUlHbHVabWx1YVhSbElITmpjbTlzYkZ4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0J6Wld4bUxtTjFjbkpsYm5SZmNHRm5aV1FnUFNBeE95QXZMMlp2Y2lCcGJtWnBibWwwWlNCelkzSnZiR3hjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdjMlZzWmk1elpYUkpibVpwYm1sMFpWTmpjbTlzYkVOdmJuUmhhVzVsY2lncE8xeHlYRzVjY2x4dUlDQWdJQ0FnSUNCOVhISmNibHh5WEc0Z0lDQWdJQ0FnSUhSb2FYTXVjbVZ0YjNabFYyOXZRMjl0YldWeVkyVkRiMjUwY205c2N5QTlJR1oxYm1OMGFXOXVLQ2w3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSFpoY2lBa2QyOXZYMjl5WkdWeVlua2dQU0FrS0NjdWQyOXZZMjl0YldWeVkyVXRiM0prWlhKcGJtY2dMbTl5WkdWeVlua25LVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUNSM2IyOWZiM0prWlhKaWVWOW1iM0p0SUQwZ0pDZ25MbmR2YjJOdmJXMWxjbU5sTFc5eVpHVnlhVzVuSnlrN1hISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWtkMjl2WDI5eVpHVnlZbmxmWm05eWJTNXZabVlvS1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSkhkdmIxOXZjbVJsY21KNUxtOW1aaWdwTzF4eVhHNGdJQ0FnSUNBZ0lIMDdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lIUm9hWE11WVdSa1VYVmxjbmxRWVhKaGJTQTlJR1oxYm1OMGFXOXVLRzVoYldVc0lIWmhiSFZsTENCMWNteGZkSGx3WlNsN1hISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaWgwZVhCbGIyWW9kWEpzWDNSNWNHVXBQVDFjSW5WdVpHVm1hVzVsWkZ3aUtWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnZFhKc1gzUjVjR1VnUFNCY0ltRnNiRndpTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSE5sYkdZdVpYaDBjbUZmY1hWbGNubGZjR0Z5WVcxelczVnliRjkwZVhCbFhWdHVZVzFsWFNBOUlIWmhiSFZsTzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0I5TzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0IwYUdsekxtbHVhWFJYYjI5RGIyMXRaWEpqWlVOdmJuUnliMnh6SUQwZ1puVnVZM1JwYjI0b0tYdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSE5sYkdZdWNtVnRiM1psVjI5dlEyOXRiV1Z5WTJWRGIyNTBjbTlzY3lncE8xeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUNSM2IyOWZiM0prWlhKaWVTQTlJQ1FvSnk1M2IyOWpiMjF0WlhKalpTMXZjbVJsY21sdVp5QXViM0prWlhKaWVTY3BPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZWElnSkhkdmIxOXZjbVJsY21KNVgyWnZjbTBnUFNBa0tDY3VkMjl2WTI5dGJXVnlZMlV0YjNKa1pYSnBibWNuS1R0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJ2Y21SbGNsOTJZV3dnUFNCY0lsd2lPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaWdrZDI5dlgyOXlaR1Z5WW5rdWJHVnVaM1JvUGpBcFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHOXlaR1Z5WDNaaGJDQTlJQ1IzYjI5ZmIzSmtaWEppZVM1MllXd29LVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQmxiSE5sWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUc5eVpHVnlYM1poYkNBOUlITmxiR1l1WjJWMFVYVmxjbmxRWVhKaGJVWnliMjFWVWt3b1hDSnZjbVJsY21KNVhDSXNJSGRwYm1SdmR5NXNiMk5oZEdsdmJpNW9jbVZtS1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWW9iM0prWlhKZmRtRnNQVDFjSW0xbGJuVmZiM0prWlhKY0lpbGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdiM0prWlhKZmRtRnNJRDBnWENKY0lqdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lvS0c5eVpHVnlYM1poYkNFOVhDSmNJaWttSmlnaElXOXlaR1Z5WDNaaGJDa3BYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSE5sYkdZdVpYaDBjbUZmY1hWbGNubGZjR0Z5WVcxekxtRnNiQzV2Y21SbGNtSjVJRDBnYjNKa1pYSmZkbUZzTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEhKY2JseHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdKSGR2YjE5dmNtUmxjbUo1WDJadmNtMHViMjRvSjNOMVltMXBkQ2NzSUdaMWJtTjBhVzl1S0dVcFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHVXVjSEpsZG1WdWRFUmxabUYxYkhRb0tUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzh2ZG1GeUlHWnZjbTBnUFNCbExuUmhjbWRsZER0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCbVlXeHpaVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdmU2s3WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBa2QyOXZYMjl5WkdWeVlua3ViMjRvWENKamFHRnVaMlZjSWl3Z1puVnVZM1JwYjI0b1pTbGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdaUzV3Y21WMlpXNTBSR1ZtWVhWc2RDZ3BPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUIyWVd3Z1BTQWtLSFJvYVhNcExuWmhiQ2dwTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWW9kbUZzUFQxY0ltMWxiblZmYjNKa1pYSmNJaWxjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IyWVd3Z1BTQmNJbHdpTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhObGJHWXVaWGgwY21GZmNYVmxjbmxmY0dGeVlXMXpMbUZzYkM1dmNtUmxjbUo1SUQwZ2RtRnNPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUjBhR2x6TG5OMVltMXBkQ2dwTzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQm1ZV3h6WlR0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZlNrN1hISmNibHh5WEc0Z0lDQWdJQ0FnSUgxY2NseHVYSEpjYmlBZ0lDQWdJQ0FnZEdocGN5NXpZM0p2Ykd4U1pYTjFiSFJ6SUQwZ1puVnVZM1JwYjI0b0tWeHlYRzRnSUNBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUhObGJHWWdQU0IwYUdsek8xeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lvS0hObGJHWXVjMk55YjJ4c1gyOXVYMkZqZEdsdmJqMDljMlZzWmk1aGFtRjRYMkZqZEdsdmJpbDhmQ2h6Wld4bUxuTmpjbTlzYkY5dmJsOWhZM1JwYjI0OVBWd2lZV3hzWENJcEtWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpaV3htTG5OamNtOXNiRlJ2VUc5ektDazdJQzh2YzJOeWIyeHNJSFJvWlNCM2FXNWtiM2NnYVdZZ2FYUWdhR0Z6SUdKbFpXNGdjMlYwWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBdkwzTmxiR1l1WVdwaGVGOWhZM1JwYjI0Z1BTQmNJbHdpTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEhKY2JpQWdJQ0FnSUNBZ2ZWeHlYRzVjY2x4dUlDQWdJQ0FnSUNCMGFHbHpMblZ3WkdGMFpWVnliRWhwYzNSdmNua2dQU0JtZFc1amRHbHZiaWhoYW1GNFgzSmxjM1ZzZEhOZmRYSnNLVnh5WEc0Z0lDQWdJQ0FnSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlITmxiR1lnUFNCMGFHbHpPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlIVnpaVjlvYVhOMGIzSjVYMkZ3YVNBOUlEQTdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2gzYVc1a2IzY3VhR2x6ZEc5eWVTQW1KaUIzYVc1a2IzY3VhR2x6ZEc5eWVTNXdkWE5vVTNSaGRHVXBYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFZ6WlY5b2FYTjBiM0o1WDJGd2FTQTlJQ1IwYUdsekxtRjBkSElvWENKa1lYUmhMWFZ6WlMxb2FYTjBiM0o1TFdGd2FWd2lLVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZb0tITmxiR1l1ZFhCa1lYUmxYMkZxWVhoZmRYSnNQVDB4S1NZbUtIVnpaVjlvYVhOMGIzSjVYMkZ3YVQwOU1Ta3BYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzh2Ym05M0lHTm9aV05ySUdsbUlIUm9aU0JpY205M2MyVnlJSE4xY0hCdmNuUnpJR2hwYzNSdmNua2djM1JoZEdVZ2NIVnphQ0E2S1Z4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLSGRwYm1SdmR5NW9hWE4wYjNKNUlDWW1JSGRwYm1SdmR5NW9hWE4wYjNKNUxuQjFjMmhUZEdGMFpTbGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQm9hWE4wYjNKNUxuQjFjMmhUZEdGMFpTaHVkV3hzTENCdWRXeHNMQ0JoYW1GNFgzSmxjM1ZzZEhOZmRYSnNLVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4eVhHNGdJQ0FnSUNBZ0lIMWNjbHh1SUNBZ0lDQWdJQ0IwYUdsekxuSmxiVzkyWlVGcVlYaFFZV2RwYm1GMGFXOXVJRDBnWm5WdVkzUnBiMjRvS1Z4eVhHNGdJQ0FnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJSE5sYkdZZ1BTQjBhR2x6TzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWW9kSGx3Wlc5bUtITmxiR1l1WVdwaGVGOXNhVzVyYzE5elpXeGxZM1J2Y2lraFBWd2lkVzVrWldacGJtVmtYQ0lwWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQWtZV3BoZUY5c2FXNXJjMTl2WW1wbFkzUWdQU0JxVVhWbGNua29jMlZzWmk1aGFtRjRYMnhwYm10elgzTmxiR1ZqZEc5eUtUdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppZ2tZV3BoZUY5c2FXNXJjMTl2WW1wbFkzUXViR1Z1WjNSb1BqQXBYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdKR0ZxWVhoZmJHbHVhM05mYjJKcVpXTjBMbTltWmlncE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYSEpjYmlBZ0lDQWdJQ0FnZlZ4eVhHNWNjbHh1SUNBZ0lDQWdJQ0IwYUdsekxtTmhia1psZEdOb1FXcGhlRkpsYzNWc2RITWdQU0JtZFc1amRHbHZiaWhtWlhSamFGOTBlWEJsS1Z4eVhHNGdJQ0FnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWW9kSGx3Wlc5bUtHWmxkR05vWDNSNWNHVXBQVDFjSW5WdVpHVm1hVzVsWkZ3aUtWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnWm1WMFkyaGZkSGx3WlNBOUlGd2lYQ0k3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGNpQnpaV3htSUQwZ2RHaHBjenRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUdabGRHTm9YMkZxWVhoZmNtVnpkV3gwY3lBOUlHWmhiSE5sTzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWW9jMlZzWmk1cGMxOWhhbUY0UFQweEtWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCN0x5OTBhR1Z1SUhkbElIZHBiR3dnWVdwaGVDQnpkV0p0YVhRZ2RHaGxJR1p2Y20xY2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0F2TDJGdVpDQnBaaUIzWlNCallXNGdabWx1WkNCMGFHVWdjbVZ6ZFd4MGN5QmpiMjUwWVdsdVpYSmNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtS0hObGJHWXVKR0ZxWVhoZmNtVnpkV3gwYzE5amIyNTBZV2x1WlhJdWJHVnVaM1JvUFQweEtWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHWmxkR05vWDJGcVlYaGZjbVZ6ZFd4MGN5QTlJSFJ5ZFdVN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJSEpsYzNWc2RITmZkWEpzSUQwZ2MyVnNaaTV5WlhOMWJIUnpYM1Z5YkRzZ0lDOHZYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ1kzVnljbVZ1ZEY5MWNtd2dQU0IzYVc1a2IzY3ViRzlqWVhScGIyNHVhSEpsWmp0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0F2TDJsbmJtOXlaU0FqSUdGdVpDQmxkbVZ5ZVhSb2FXNW5JR0ZtZEdWeVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnYUdGemFGOXdiM01nUFNCM2FXNWtiM2N1Ykc5allYUnBiMjR1YUhKbFppNXBibVJsZUU5bUtDY2pKeWs3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppaG9ZWE5vWDNCdmN5RTlQUzB4S1h0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JqZFhKeVpXNTBYM1Z5YkNBOUlIZHBibVJ2ZHk1c2IyTmhkR2x2Ymk1b2NtVm1Mbk4xWW5OMGNpZ3dMQ0IzYVc1a2IzY3ViRzlqWVhScGIyNHVhSEpsWmk1cGJtUmxlRTltS0Njakp5a3BPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtS0NBb0lDZ2djMlZzWmk1a2FYTndiR0Y1WDNKbGMzVnNkRjl0WlhSb2IyUTlQVndpWTNWemRHOXRYM2R2YjJOdmJXMWxjbU5sWDNOMGIzSmxYQ0lnS1NCOGZDQW9JSE5sYkdZdVpHbHpjR3hoZVY5eVpYTjFiSFJmYldWMGFHOWtQVDFjSW5CdmMzUmZkSGx3WlY5aGNtTm9hWFpsWENJZ0tTQXBJQ1ltSUNnZ2MyVnNaaTVsYm1GaWJHVmZkR0Y0YjI1dmJYbGZZWEpqYUdsMlpYTWdQVDBnTVNBcElDbGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnBaaWdnYzJWc1ppNWpkWEp5Wlc1MFgzUmhlRzl1YjIxNVgyRnlZMmhwZG1VZ0lUMDlYQ0pjSWlBcFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbVpYUmphRjloYW1GNFgzSmxjM1ZzZEhNZ1BTQjBjblZsTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnWm1WMFkyaGZZV3BoZUY5eVpYTjFiSFJ6TzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnTHlwMllYSWdjbVZ6ZFd4MGMxOTFjbXdnUFNCd2NtOWpaWE56WDJadmNtMHVaMlYwVW1WemRXeDBjMVZ5YkNoelpXeG1MQ0J6Wld4bUxuSmxjM1ZzZEhOZmRYSnNLVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUdGamRHbDJaVjkwWVhnZ1BTQndjbTlqWlhOelgyWnZjbTB1WjJWMFFXTjBhWFpsVkdGNEtDazdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJ4ZFdWeWVWOXdZWEpoYlhNZ1BTQnpaV3htTG1kbGRGVnliRkJoY21GdGN5aDBjblZsTENBbkp5d2dZV04wYVhabFgzUmhlQ2s3S2k5Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1WEhKY2JseHlYRzVjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXZMMjV2ZHlCelpXVWdhV1lnZDJVZ1lYSmxJRzl1SUhSb1pTQlZVa3dnZDJVZ2RHaHBibXN1TGk1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUIxY214ZmNHRnlkSE1nUFNCamRYSnlaVzUwWDNWeWJDNXpjR3hwZENoY0lqOWNJaWs3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMllYSWdkWEpzWDJKaGMyVWdQU0JjSWx3aU8xeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUtIVnliRjl3WVhKMGN5NXNaVzVuZEdnK01DbGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjFjbXhmWW1GelpTQTlJSFZ5YkY5d1lYSjBjMXN3WFR0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1ZzYzJVZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhWeWJGOWlZWE5sSUQwZ1kzVnljbVZ1ZEY5MWNtdzdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUd4aGJtY2dQU0J6Wld4bUxtZGxkRkYxWlhKNVVHRnlZVzFHY205dFZWSk1LRndpYkdGdVoxd2lMQ0IzYVc1a2IzY3ViRzlqWVhScGIyNHVhSEpsWmlrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnBaaWdvZEhsd1pXOW1LR3hoYm1jcElUMDlYQ0oxYm1SbFptbHVaV1JjSWlrbUppaHNZVzVuSVQwOWJuVnNiQ2twWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZFhKc1gySmhjMlVnUFNCelpXeG1MbUZrWkZWeWJGQmhjbUZ0S0hWeWJGOWlZWE5sTENCY0lteGhibWM5WENJcmJHRnVaeWs3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOVhISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlITm1hV1FnUFNCelpXeG1MbWRsZEZGMVpYSjVVR0Z5WVcxR2NtOXRWVkpNS0Z3aWMyWnBaRndpTENCM2FXNWtiM2N1Ykc5allYUnBiMjR1YUhKbFppazdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0x5OXBaaUJ6Wm1sa0lHbHpJR0VnYm5WdFltVnlYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmloT2RXMWlaWElvY0dGeWMyVkdiRzloZENoelptbGtLU2tnUFQwZ2MyWnBaQ2xjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IxY214ZlltRnpaU0E5SUhObGJHWXVZV1JrVlhKc1VHRnlZVzBvZFhKc1gySmhjMlVzSUZ3aWMyWnBaRDFjSWl0elptbGtLVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0F2TDJsbUlHRnVlU0J2WmlCMGFHVWdNeUJqYjI1a2FYUnBiMjV6SUdGeVpTQjBjblZsTENCMGFHVnVJR2wwY3lCbmIyOWtJSFJ2SUdkdlhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXZMeUF0SURFZ2ZDQnBaaUIwYUdVZ2RYSnNJR0poYzJVZ1BUMGdjbVZ6ZFd4MGMxOTFjbXhjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUM4dklDMGdNaUI4SUdsbUlIVnliQ0JpWVhObEt5QmNJaTljSWlBZ1BUMGdjbVZ6ZFd4MGMxOTFjbXdnTFNCcGJpQmpZWE5sSUc5bUlIVnpaWElnWlhKeWIzSWdhVzRnZEdobElISmxjM1ZzZEhNZ1ZWSk1YSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0x5OTBjbWx0SUdGdWVTQjBjbUZwYkdsdVp5QnpiR0Z6YUNCbWIzSWdaV0Z6YVdWeUlHTnZiWEJoY21semIyNDZYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IxY214ZlltRnpaU0E5SUhWeWJGOWlZWE5sTG5KbGNHeGhZMlVvTDF4Y0x5UXZMQ0FuSnlrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnlaWE4xYkhSelgzVnliQ0E5SUhKbGMzVnNkSE5mZFhKc0xuSmxjR3hoWTJVb0wxeGNMeVF2TENBbkp5azdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJR04xY25KbGJuUmZkWEpzWDJOdmJuUmhhVzV6WDNKbGMzVnNkSE5mZFhKc0lEMGdMVEU3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppaDFjbXhmWW1GelpUMDljbVZ6ZFd4MGMxOTFjbXdwWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWTNWeWNtVnVkRjkxY214ZlkyOXVkR0ZwYm5OZmNtVnpkV3gwYzE5MWNtd2dQU0F4TzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUtITmxiR1l1YjI1c2VWOXlaWE4xYkhSelgyRnFZWGc5UFRFcFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjdMeTlwWmlCaElIVnpaWElnYUdGeklHTm9iM05sYmlCMGJ5QnZibXg1SUdGc2JHOTNJR0ZxWVhnZ2IyNGdjbVZ6ZFd4MGN5QndZV2RsY3lBb1pHVm1ZWFZzZENCaVpXaGhkbWx2ZFhJcFhISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1LQ0JqZFhKeVpXNTBYM1Z5YkY5amIyNTBZV2x1YzE5eVpYTjFiSFJ6WDNWeWJDQStJQzB4S1Z4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSHN2TDNSb2FYTWdiV1ZoYm5NZ2RHaGxJR04xY25KbGJuUWdWVkpNSUdOdmJuUmhhVzV6SUhSb1pTQnlaWE4xYkhSeklIVnliQ3dnZDJocFkyZ2diV1ZoYm5NZ2QyVWdZMkZ1SUdSdklHRnFZWGhjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWm1WMFkyaGZZV3BoZUY5eVpYTjFiSFJ6SUQwZ2RISjFaVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1pXeHpaVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdabVYwWTJoZllXcGhlRjl5WlhOMWJIUnpJRDBnWm1Gc2MyVTdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWld4elpWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1LR1psZEdOb1gzUjVjR1U5UFZ3aWNHRm5hVzVoZEdsdmJsd2lLVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lvSUdOMWNuSmxiblJmZFhKc1gyTnZiblJoYVc1elgzSmxjM1ZzZEhOZmRYSnNJRDRnTFRFcFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIc3ZMM1JvYVhNZ2JXVmhibk1nZEdobElHTjFjbkpsYm5RZ1ZWSk1JR052Ym5SaGFXNXpJSFJvWlNCeVpYTjFiSFJ6SUhWeWJDd2dkMmhwWTJnZ2JXVmhibk1nZDJVZ1kyRnVJR1J2SUdGcVlYaGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1pXeHpaVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXZMMlJ2YmlkMElHRnFZWGdnY0dGbmFXNWhkR2x2YmlCM2FHVnVJRzV2ZENCdmJpQmhJRk1tUmlCd1lXZGxYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbVpYUmphRjloYW1GNFgzSmxjM1ZzZEhNZ1BTQm1ZV3h6WlR0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHlYRzVjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJR1psZEdOb1gyRnFZWGhmY21WemRXeDBjenRjY2x4dUlDQWdJQ0FnSUNCOVhISmNibHh5WEc0Z0lDQWdJQ0FnSUhSb2FYTXVjMlYwZFhCQmFtRjRVR0ZuYVc1aGRHbHZiaUE5SUdaMWJtTjBhVzl1S0NsY2NseHVJQ0FnSUNBZ0lDQjdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1LSFI1Y0dWdlppaHpaV3htTG1GcVlYaGZiR2x1YTNOZmMyVnNaV04wYjNJcFBUMWNJblZ1WkdWbWFXNWxaRndpS1Z4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTQ3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUM4dmFXNW1hVzVwZEdVZ2MyTnliMnhzWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJR2xtS0hSb2FYTXVjR0ZuYVc1aGRHbHZibDkwZVhCbFBUMDlYQ0pwYm1acGJtbDBaVjl6WTNKdmJHeGNJaWxjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYVdZb2NHRnljMlZKYm5Rb2RHaHBjeTVwYm5OMFlXNWpaVjl1ZFcxaVpYSXBQVDA5TVNrZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNRb2QybHVaRzkzS1M1dlptWW9YQ0p6WTNKdmJHeGNJaXdnYzJWc1ppNXZibGRwYm1SdmQxTmpjbTlzYkNrN1hISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2h6Wld4bUxtTmhia1psZEdOb1FXcGhlRkpsYzNWc2RITW9YQ0p3WVdkcGJtRjBhVzl1WENJcEtTQjdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ1FvZDJsdVpHOTNLUzV2YmloY0luTmpjbTlzYkZ3aUxDQnpaV3htTG05dVYybHVaRzkzVTJOeWIyeHNLVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUM4dmRtRnlJQ1JoYW1GNFgyeHBibXR6WDI5aWFtVmpkQ0E5SUdwUmRXVnllU2h6Wld4bUxtRnFZWGhmYkdsdWEzTmZjMlZzWldOMGIzSXBPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnTHk5cFppZ2tZV3BoZUY5c2FXNXJjMTl2WW1wbFkzUXViR1Z1WjNSb1BqQXBYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDOHZlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnTHk5amIyNXpiMnhsTG14dlp5aGNJbWx1YVhRZ2NHRm5hVzVoZEdsdmJpQnpkSFZtWmx3aUtUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzh2SkdGcVlYaGZiR2x1YTNOZmIySnFaV04wTG05bVppZ25ZMnhwWTJzbktUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzh2WVd4bGNuUW9jMlZzWmk1aGFtRjRYMnhwYm10elgzTmxiR1ZqZEc5eUtUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ1FvWkc5amRXMWxiblFwTG05bVppZ25ZMnhwWTJzbkxDQnpaV3htTG1GcVlYaGZiR2x1YTNOZmMyVnNaV04wYjNJcE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdKQ2hrYjJOMWJXVnVkQ2t1YjI0b0oyTnNhV05ySnl3Z2MyVnNaaTVoYW1GNFgyeHBibXR6WDNObGJHVmpkRzl5TENCbWRXNWpkR2x2YmlobEtYdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lvYzJWc1ppNWpZVzVHWlhSamFFRnFZWGhTWlhOMWJIUnpLRndpY0dGbmFXNWhkR2x2Ymx3aUtTbGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHVXVjSEpsZG1WdWRFUmxabUYxYkhRb0tUdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQnNhVzVySUQwZ2FsRjFaWEo1S0hSb2FYTXBMbUYwZEhJb0oyaHlaV1luS1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2MyVnNaaTVoYW1GNFgyRmpkR2x2YmlBOUlGd2ljR0ZuYVc1aGRHbHZibHdpTzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUhCaFoyVk9kVzFpWlhJZ1BTQnpaV3htTG1kbGRGQmhaMlZrUm5KdmJWVlNUQ2hzYVc1cktUdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhObGJHWXVKR0ZxWVhoZmNtVnpkV3gwYzE5amIyNTBZV2x1WlhJdVlYUjBjaWhjSW1SaGRHRXRjR0ZuWldSY0lpd2djR0ZuWlU1MWJXSmxjaWs3WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpaV3htTG1abGRHTm9RV3BoZUZKbGMzVnNkSE1vS1R0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQm1ZV3h6WlR0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOUtUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBdkx5QjlYSEpjYmlBZ0lDQWdJQ0FnZlR0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnZEdocGN5NW5aWFJRWVdkbFpFWnliMjFWVWt3Z1BTQm1kVzVqZEdsdmJpaFZVa3dwZTF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJSEJoWjJWa1ZtRnNJRDBnTVR0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnTHk5bWFYSnpkQ0IwWlhOMElIUnZJSE5sWlNCcFppQjNaU0JvWVhabElGd2lMM0JoWjJVdk5DOWNJaUJwYmlCMGFHVWdWVkpNWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCMGNGWmhiQ0E5SUhObGJHWXVaMlYwVVhWbGNubFFZWEpoYlVaeWIyMVZVa3dvWENKelpsOXdZV2RsWkZ3aUxDQlZVa3dwTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlnb2RIbHdaVzltS0hSd1ZtRnNLVDA5WENKemRISnBibWRjSWlsOGZDaDBlWEJsYjJZb2RIQldZV3dwUFQxY0ltNTFiV0psY2x3aUtTbGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjR0ZuWldSV1lXd2dQU0IwY0ZaaGJEdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlIQmhaMlZrVm1Gc08xeHlYRzRnSUNBZ0lDQWdJSDA3WEhKY2JseHlYRzRnSUNBZ0lDQWdJSFJvYVhNdVoyVjBVWFZsY25sUVlYSmhiVVp5YjIxVlVrd2dQU0JtZFc1amRHbHZiaWh1WVcxbExDQlZVa3dwZTF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJSEZ6ZEhKcGJtY2dQU0JjSWo5Y0lpdFZVa3d1YzNCc2FYUW9KejhuS1ZzeFhUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWW9kSGx3Wlc5bUtIRnpkSEpwYm1jcElUMWNJblZ1WkdWbWFXNWxaRndpS1Z4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMllYSWdkbUZzSUQwZ1pHVmpiMlJsVlZKSlEyOXRjRzl1Wlc1MEtDaHVaWGNnVW1WblJYaHdLQ2RiUDN3bVhTY2dLeUJ1WVcxbElDc2dKejBuSUNzZ0p5aGJYaVk3WFNzL0tTZ21mQ044TzN3a0tTY3BMbVY0WldNb2NYTjBjbWx1WnlsOGZGc3NYQ0pjSWwwcFd6RmRMbkpsY0d4aFkyVW9MMXhjS3k5bkxDQW5KVEl3SnlrcGZIeHVkV3hzTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUhaaGJEdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnWENKY0lqdGNjbHh1SUNBZ0lDQWdJQ0I5TzF4eVhHNWNjbHh1WEhKY2JseHlYRzRnSUNBZ0lDQWdJSFJvYVhNdVptOXliVlZ3WkdGMFpXUWdQU0JtZFc1amRHbHZiaWhsS1h0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDOHZaUzV3Y21WMlpXNTBSR1ZtWVhWc2RDZ3BPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaWh6Wld4bUxtRjFkRzlmZFhCa1lYUmxQVDB4S1NCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpaV3htTG5OMVltMXBkRVp2Y20wb0tUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCbGJITmxJR2xtS0NoelpXeG1MbUYxZEc5ZmRYQmtZWFJsUFQwd0tTWW1LSE5sYkdZdVlYVjBiMTlqYjNWdWRGOXlaV1p5WlhOb1gyMXZaR1U5UFRFcEtWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpaV3htTG1admNtMVZjR1JoZEdWa1JtVjBZMmhCYW1GNEtDazdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQm1ZV3h6WlR0Y2NseHVJQ0FnSUNBZ0lDQjlPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQjBhR2x6TG1admNtMVZjR1JoZEdWa1JtVjBZMmhCYW1GNElEMGdablZ1WTNScGIyNG9LWHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUM4dmJHOXZjQ0IwYUhKdmRXZG9JR0ZzYkNCMGFHVWdabWxsYkdSeklHRnVaQ0JpZFdsc1pDQjBhR1VnVlZKTVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUhObGJHWXVabVYwWTJoQmFtRjRSbTl5YlNncE8xeHlYRzVjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJtWVd4elpUdGNjbHh1SUNBZ0lDQWdJQ0I5TzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0F2TDIxaGEyVWdZVzU1SUdOdmNuSmxZM1JwYjI1ekwzVndaR0YwWlhNZ2RHOGdabWxsYkdSeklHSmxabTl5WlNCMGFHVWdjM1ZpYldsMElHTnZiWEJzWlhSbGMxeHlYRzRnSUNBZ0lDQWdJSFJvYVhNdWMyVjBSbWxsYkdSeklEMGdablZ1WTNScGIyNG9aU2w3WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBdkwybG1LSE5sYkdZdWFYTmZZV3BoZUQwOU1Da2dlMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDOHZjMjl0WlhScGJXVnpJSFJvWlNCbWIzSnRJR2x6SUhOMVltMXBkSFJsWkNCM2FYUm9iM1YwSUhSb1pTQnpiR2xrWlhJZ2VXVjBJR2hoZG1sdVp5QjFjR1JoZEdWa0xDQmhibVFnWVhNZ2QyVWdaMlYwSUc5MWNpQjJZV3gxWlhNZ1puSnZiVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnTHk5MGFHVWdjMnhwWkdWeUlHRnVaQ0J1YjNRZ2FXNXdkWFJ6TENCM1pTQnVaV1ZrSUhSdklHTm9aV05ySUdsMElHbG1JRzVsWldSeklIUnZJR0psSUhObGRGeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdMeTl2Ym14NUlHOWpZM1Z5Y3lCcFppQmhhbUY0SUdseklHOW1aaXdnWVc1a0lHRjFkRzl6ZFdKdGFYUWdiMjVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhObGJHWXVKR1pwWld4a2N5NWxZV05vS0daMWJtTjBhVzl1S0NrZ2UxeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnSkdacFpXeGtJRDBnSkNoMGFHbHpLVHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlISmhibWRsWDJScGMzQnNZWGxmZG1Gc2RXVnpJRDBnSkdacFpXeGtMbVpwYm1Rb0p5NXpaaTF0WlhSaExYSmhibWRsTFhOc2FXUmxjaWNwTG1GMGRISW9YQ0prWVhSaExXUnBjM0JzWVhrdGRtRnNkV1Z6TFdGelhDSXBPeTh2WkdGMFlTMWthWE53YkdGNUxYWmhiSFZsY3kxaGN6MWNJblJsZUhSY0lseHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnBaaWh5WVc1blpWOWthWE53YkdGNVgzWmhiSFZsY3owOVBWd2lkR1Y0ZEdsdWNIVjBYQ0lwSUh0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtS0NSbWFXVnNaQzVtYVc1a0tGd2lMbTFsZEdFdGMyeHBaR1Z5WENJcExteGxibWQwYUQ0d0tYdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0pHWnBaV3hrTG1acGJtUW9YQ0l1YldWMFlTMXpiR2xrWlhKY0lpa3VaV0ZqYUNobWRXNWpkR2x2YmlBb2FXNWtaWGdwSUh0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMllYSWdjMnhwWkdWeVgyOWlhbVZqZENBOUlDUW9kR2hwY3lsYk1GMDdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMllYSWdKSE5zYVdSbGNsOWxiQ0E5SUNRb2RHaHBjeWt1WTJ4dmMyVnpkQ2hjSWk1elppMXRaWFJoTFhKaGJtZGxMWE5zYVdSbGNsd2lLVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDOHZkbUZ5SUcxcGJsWmhiQ0E5SUNSemJHbGtaWEpmWld3dVlYUjBjaWhjSW1SaGRHRXRiV2x1WENJcE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnTHk5MllYSWdiV0Y0Vm1Gc0lEMGdKSE5zYVdSbGNsOWxiQzVoZEhSeUtGd2laR0YwWVMxdFlYaGNJaWs3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnYldsdVZtRnNJRDBnSkhOc2FXUmxjbDlsYkM1bWFXNWtLRndpTG5ObUxYSmhibWRsTFcxcGJsd2lLUzUyWVd3b0tUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQnRZWGhXWVd3Z1BTQWtjMnhwWkdWeVgyVnNMbVpwYm1Rb1hDSXVjMll0Y21GdVoyVXRiV0Y0WENJcExuWmhiQ2dwTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjMnhwWkdWeVgyOWlhbVZqZEM1dWIxVnBVMnhwWkdWeUxuTmxkQ2hiYldsdVZtRnNMQ0J0WVhoV1lXeGRLVHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMHBPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDBwTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0F2TDMxY2NseHVYSEpjYmlBZ0lDQWdJQ0FnZlZ4eVhHNWNjbHh1SUNBZ0lDQWdJQ0F2TDNOMVltMXBkRnh5WEc0Z0lDQWdJQ0FnSUhSb2FYTXVjM1ZpYldsMFJtOXliU0E5SUdaMWJtTjBhVzl1S0dVcGUxeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdMeTlzYjI5d0lIUm9jbTkxWjJnZ1lXeHNJSFJvWlNCbWFXVnNaSE1nWVc1a0lHSjFhV3hrSUhSb1pTQlZVa3hjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lvYzJWc1ppNXBjMU4xWW0xcGRIUnBibWNnUFQwZ2RISjFaU2tnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUdaaGJITmxPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0J6Wld4bUxuTmxkRVpwWld4a2N5Z3BPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQnpaV3htTG1Oc1pXRnlWR2x0WlhJb0tUdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSE5sYkdZdWFYTlRkV0p0YVhSMGFXNW5JRDBnZEhKMVpUdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSEJ5YjJObGMzTmZabTl5YlM1elpYUlVZWGhCY21Ob2FYWmxVbVZ6ZFd4MGMxVnliQ2h6Wld4bUxDQnpaV3htTG5KbGMzVnNkSE5mZFhKc0tUdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSE5sYkdZdUpHRnFZWGhmY21WemRXeDBjMTlqYjI1MFlXbHVaWEl1WVhSMGNpaGNJbVJoZEdFdGNHRm5aV1JjSWl3Z01TazdJQzh2YVc1cGRDQndZV2RsWkZ4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWW9jMlZzWmk1allXNUdaWFJqYUVGcVlYaFNaWE4xYkhSektDa3BYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIc3ZMM1JvWlc0Z2QyVWdkMmxzYkNCaGFtRjRJSE4xWW0xcGRDQjBhR1VnWm05eWJWeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhObGJHWXVZV3BoZUY5aFkzUnBiMjRnUFNCY0luTjFZbTFwZEZ3aU95QXZMM052SUhkbElHdHViM2NnYVhRZ2QyRnpiaWQwSUhCaFoybHVZWFJwYjI1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lITmxiR1l1Wm1WMFkyaEJhbUY0VW1WemRXeDBjeWdwTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJR1ZzYzJWY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZXk4dmRHaGxiaUIzWlNCM2FXeHNJSE5wYlhCc2VTQnlaV1JwY21WamRDQjBieUIwYUdVZ1VtVnpkV3gwY3lCVlVreGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMllYSWdjbVZ6ZFd4MGMxOTFjbXdnUFNCd2NtOWpaWE56WDJadmNtMHVaMlYwVW1WemRXeDBjMVZ5YkNoelpXeG1MQ0J6Wld4bUxuSmxjM1ZzZEhOZmRYSnNLVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQnhkV1Z5ZVY5d1lYSmhiWE1nUFNCelpXeG1MbWRsZEZWeWJGQmhjbUZ0Y3loMGNuVmxMQ0FuSnlrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnlaWE4xYkhSelgzVnliQ0E5SUhObGJHWXVZV1JrVlhKc1VHRnlZVzBvY21WemRXeDBjMTkxY213c0lIRjFaWEo1WDNCaGNtRnRjeWs3WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkMmx1Wkc5M0xteHZZMkYwYVc5dUxtaHlaV1lnUFNCeVpYTjFiSFJ6WDNWeWJEdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdMeXBwWmloelpXeG1MbTFoYVc1MFlXbHVYM04wWVhSbFBUMWNJakZjSWlsY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUM4dllXeGxjblFvWENKdFlXbHVkR0ZwYmlCemRHRjBaVndpS1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQnBia1pwWm5SbFpXNU5hVzUxZEdWeklEMGdibVYzSUVSaGRHVW9ibVYzSUVSaGRHVW9LUzVuWlhSVWFXMWxLQ2tnS3lBeE5TQXFJRFl3SUNvZ01UQXdNQ2s3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0F2TDJoMGRIQnpPaTh2WjJsMGFIVmlMbU52YlM5cWN5MWpiMjlyYVdVdmFuTXRZMjl2YTJsbEwzZHBhMmt2Um5KbGNYVmxiblJzZVMxQmMydGxaQzFSZFdWemRHbHZibk1qWlhod2FYSmxMV052YjJ0cFpYTXRhVzR0YkdWemN5MTBhR0Z1TFdFdFpHRjVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnZEdocGNuUjViV2x1ZFhSbGN5QTlJREV2TkRnN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBdkwyTnZiMnRwWlhNdWMyVjBLQ2R1WVcxbEp5d2dKMjF5Y205emN5Y3NJSHNnWlhod2FYSmxjem9nTnlCOUtUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDOHZZMjl2YTJsbGN5NXpaWFFvSjI1aGJXVW5MQ0FuYlhKeWIzTnpKeXdnZXlCbGVIQnBjbVZ6T2lCMGFHbHlkSGx0YVc1MWRHVnpJSDBwTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnWTI5dmEybGxjeTV6WlhRb0oyNWhiV1VuTENBbmJYSnliM056Snl3Z2V5QmxlSEJwY21Wek9pQnBia1pwWm5SbFpXNU5hVzUxZEdWeklIMHBPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdmU292WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnWm1Gc2MyVTdYSEpjYmlBZ0lDQWdJQ0FnZlR0Y2NseHVJQ0FnSUNBZ0lDQXZMeUJqYjI1emIyeGxMbXh2WnloamIyOXJhV1Z6TG1kbGRDZ25ibUZ0WlNjcEtUdGNjbHh1SUNBZ0lDQWdJQ0F2TDJOdmJuTnZiR1V1Ykc5bktHTnZiMnRwWlhNdVoyVjBLQ2R1WVcxbEp5a3BPMXh5WEc0Z0lDQWdJQ0FnSUhSb2FYTXVjbVZ6WlhSR2IzSnRJRDBnWm5WdVkzUnBiMjRvYzNWaWJXbDBYMlp2Y20wcFhISmNiaUFnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMM1Z1YzJWMElHRnNiQ0JtYVdWc1pITmNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2MyVnNaaTRrWm1sbGJHUnpMbVZoWTJnb1puVnVZM1JwYjI0b0tYdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMllYSWdKR1pwWld4a0lEMGdKQ2gwYUdsektUdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBdkwzTjBZVzVrWVhKa0lHWnBaV3hrSUhSNWNHVnpYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FrWm1sbGJHUXVabWx1WkNoY0luTmxiR1ZqZERwdWIzUW9XMjExYkhScGNHeGxQU2R0ZFd4MGFYQnNaU2RkS1NBK0lHOXdkR2x2YmpwbWFYSnpkQzFqYUdsc1pGd2lLUzV3Y205d0tGd2ljMlZzWldOMFpXUmNJaXdnZEhKMVpTazdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FrWm1sbGJHUXVabWx1WkNoY0luTmxiR1ZqZEZ0dGRXeDBhWEJzWlQwbmJYVnNkR2x3YkdVblhTQStJRzl3ZEdsdmJsd2lLUzV3Y205d0tGd2ljMlZzWldOMFpXUmNJaXdnWm1Gc2MyVXBPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSkdacFpXeGtMbVpwYm1Rb1hDSnBibkIxZEZ0MGVYQmxQU2RqYUdWamEySnZlQ2RkWENJcExuQnliM0FvWENKamFHVmphMlZrWENJc0lHWmhiSE5sS1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUm1hV1ZzWkM1bWFXNWtLRndpUGlCMWJDQStJR3hwT21acGNuTjBMV05vYVd4a0lHbHVjSFYwVzNSNWNHVTlKM0poWkdsdkoxMWNJaWt1Y0hKdmNDaGNJbU5vWldOclpXUmNJaXdnZEhKMVpTazdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FrWm1sbGJHUXVabWx1WkNoY0ltbHVjSFYwVzNSNWNHVTlKM1JsZUhRblhWd2lLUzUyWVd3b1hDSmNJaWs3WEhKY2JseHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUM4dmJuVnRZbVZ5SUhKaGJtZGxJQzBnTWlCdWRXMWlaWElnYVc1d2RYUWdabWxsYkdSelhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWtabWxsYkdRdVptbHVaQ2hjSW1sdWNIVjBXM1I1Y0dVOUoyNTFiV0psY2lkZFhDSXBMbVZoWTJnb1puVnVZM1JwYjI0b2FXNWtaWGdwZTF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMllYSWdKSFJvYVhOSmJuQjFkQ0E5SUNRb2RHaHBjeWs3WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUtDUjBhR2x6U1c1d2RYUXVjR0Z5Wlc1MEtDa3VjR0Z5Wlc1MEtDa3VhR0Z6UTJ4aGMzTW9YQ0p6WmkxdFpYUmhMWEpoYm1kbFhDSXBLU0I3WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnBaaWhwYm1SbGVEMDlNQ2tnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdKSFJvYVhOSmJuQjFkQzUyWVd3b0pIUm9hWE5KYm5CMWRDNWhkSFJ5S0Z3aWJXbHVYQ0lwS1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmxiSE5sSUdsbUtHbHVaR1Y0UFQweEtTQjdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBa2RHaHBjMGx1Y0hWMExuWmhiQ2drZEdocGMwbHVjSFYwTG1GMGRISW9YQ0p0WVhoY0lpa3BPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMHBPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDOHZiV1YwWVNBdklHNTFiV0psY25NZ2QybDBhQ0F5SUdsdWNIVjBjeUFvWm5KdmJTQXZJSFJ2SUdacFpXeGtjeWtnTFNCelpXTnZibVFnYVc1d2RYUWdiWFZ6ZENCaVpTQnlaWE5sZENCMGJ5QnRZWGdnZG1Gc2RXVmNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFpoY2lBa2JXVjBZVjl6Wld4bFkzUmZabkp2YlY5MGJ5QTlJQ1JtYVdWc1pDNW1hVzVrS0Z3aUxuTm1MVzFsZEdFdGNtRnVaMlV0YzJWc1pXTjBMV1p5YjIxMGIxd2lLVHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnBaaWdrYldWMFlWOXpaV3hsWTNSZlpuSnZiVjkwYnk1c1pXNW5kR2crTUNrZ2UxeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnYzNSaGNuUmZiV2x1SUQwZ0pHMWxkR0ZmYzJWc1pXTjBYMlp5YjIxZmRHOHVZWFIwY2loY0ltUmhkR0V0YldsdVhDSXBPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJ6ZEdGeWRGOXRZWGdnUFNBa2JXVjBZVjl6Wld4bFkzUmZabkp2YlY5MGJ5NWhkSFJ5S0Z3aVpHRjBZUzF0WVhoY0lpazdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ1J0WlhSaFgzTmxiR1ZqZEY5bWNtOXRYM1J2TG1acGJtUW9YQ0p6Wld4bFkzUmNJaWt1WldGamFDaG1kVzVqZEdsdmJpaHBibVJsZUNsN1hISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ0pIUm9hWE5KYm5CMWRDQTlJQ1FvZEdocGN5azdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppaHBibVJsZUQwOU1Da2dlMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ1IwYUdselNXNXdkWFF1ZG1Gc0tITjBZWEowWDIxcGJpazdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWld4elpTQnBaaWhwYm1SbGVEMDlNU2tnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdKSFJvYVhOSmJuQjFkQzUyWVd3b2MzUmhjblJmYldGNEtUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5S1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMllYSWdKRzFsZEdGZmNtRmthVzlmWm5KdmJWOTBieUE5SUNSbWFXVnNaQzVtYVc1a0tGd2lMbk5tTFcxbGRHRXRjbUZ1WjJVdGNtRmthVzh0Wm5KdmJYUnZYQ0lwTzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtS0NSdFpYUmhYM0poWkdsdlgyWnliMjFmZEc4dWJHVnVaM1JvUGpBcFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJSE4wWVhKMFgyMXBiaUE5SUNSdFpYUmhYM0poWkdsdlgyWnliMjFmZEc4dVlYUjBjaWhjSW1SaGRHRXRiV2x1WENJcE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQnpkR0Z5ZEY5dFlYZ2dQU0FrYldWMFlWOXlZV1JwYjE5bWNtOXRYM1J2TG1GMGRISW9YQ0prWVhSaExXMWhlRndpS1R0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJQ1J5WVdScGIxOW5jbTkxY0hNZ1BTQWtiV1YwWVY5eVlXUnBiMTltY205dFgzUnZMbVpwYm1Rb0p5NXpaaTFwYm5CMWRDMXlZVzVuWlMxeVlXUnBieWNwTzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBa2NtRmthVzlmWjNKdmRYQnpMbVZoWTJnb1puVnVZM1JwYjI0b2FXNWtaWGdwZTF4eVhHNWNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQWtjbUZrYVc5eklEMGdKQ2gwYUdsektTNW1hVzVrS0Z3aUxuTm1MV2x1Y0hWMExYSmhaR2x2WENJcE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWtjbUZrYVc5ekxuQnliM0FvWENKamFHVmphMlZrWENJc0lHWmhiSE5sS1R0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtS0dsdVpHVjRQVDB3S1Z4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FrY21Ga2FXOXpMbVpwYkhSbGNpZ25XM1poYkhWbFBWd2lKeXR6ZEdGeWRGOXRhVzRySjF3aVhTY3BMbkJ5YjNBb1hDSmphR1ZqYTJWa1hDSXNJSFJ5ZFdVcE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1ZzYzJVZ2FXWW9hVzVrWlhnOVBURXBYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUnlZV1JwYjNNdVptbHNkR1Z5S0NkYmRtRnNkV1U5WENJbkszTjBZWEowWDIxaGVDc25YQ0pkSnlrdWNISnZjQ2hjSW1Ob1pXTnJaV1JjSWl3Z2RISjFaU2s3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZTazdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUM4dmJuVnRZbVZ5SUhOc2FXUmxjaUF0SUc1dlZXbFRiR2xrWlhKY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUm1hV1ZzWkM1bWFXNWtLRndpTG0xbGRHRXRjMnhwWkdWeVhDSXBMbVZoWTJnb1puVnVZM1JwYjI0b2FXNWtaWGdwZTF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMllYSWdjMnhwWkdWeVgyOWlhbVZqZENBOUlDUW9kR2hwY3lsYk1GMDdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0x5cDJZWElnYzJ4cFpHVnlYMjlpYW1WamRDQTlJQ1JqYjI1MFlXbHVaWEl1Wm1sdVpDaGNJaTV0WlhSaExYTnNhV1JsY2x3aUtWc3dYVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUhOc2FXUmxjbDkyWVd3Z1BTQnpiR2xrWlhKZmIySnFaV04wTG01dlZXbFRiR2xrWlhJdVoyVjBLQ2s3S2k5Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJQ1J6Ykdsa1pYSmZaV3dnUFNBa0tIUm9hWE1wTG1Oc2IzTmxjM1FvWENJdWMyWXRiV1YwWVMxeVlXNW5aUzF6Ykdsa1pYSmNJaWs3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUcxcGJsWmhiQ0E5SUNSemJHbGtaWEpmWld3dVlYUjBjaWhjSW1SaGRHRXRiV2x1WENJcE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQnRZWGhXWVd3Z1BTQWtjMnhwWkdWeVgyVnNMbUYwZEhJb1hDSmtZWFJoTFcxaGVGd2lLVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpiR2xrWlhKZmIySnFaV04wTG01dlZXbFRiR2xrWlhJdWMyVjBLRnR0YVc1V1lXd3NJRzFoZUZaaGJGMHBPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMHBPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDOHZibVZsWkNCMGJ5QnpaV1VnYVdZZ1lXNTVJR0Z5WlNCamIyMWliMkp2ZUNCaGJtUWdZV04wSUdGalkyOXlaR2x1WjJ4NVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnSkdOdmJXSnZZbTk0SUQwZ0pHWnBaV3hrTG1acGJtUW9YQ0p6Wld4bFkzUmJaR0YwWVMxamIyMWliMkp2ZUQwbk1TZGRYQ0lwTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWW9KR052YldKdlltOTRMbXhsYm1kMGFENHdLVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoMGVYQmxiMllnSkdOdmJXSnZZbTk0TG1Ob2IzTmxiaUFoUFNCY0luVnVaR1ZtYVc1bFpGd2lLVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdKR052YldKdlltOTRMblJ5YVdkblpYSW9YQ0pqYUc5elpXNDZkWEJrWVhSbFpGd2lLVHNnTHk5bWIzSWdZMmh2YzJWdUlHOXViSGxjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1pXeHpaVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdKR052YldKdlltOTRMblpoYkNnbkp5azdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ1JqYjIxaWIySnZlQzUwY21sbloyVnlLQ2RqYUdGdVoyVXVjMlZzWldOME1pY3BPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dVhISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlLVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdjMlZzWmk1amJHVmhjbFJwYldWeUtDazdYSEpjYmx4eVhHNWNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJR2xtS0hOMVltMXBkRjltYjNKdFBUMWNJbUZzZDJGNWMxd2lLVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J6Wld4bUxuTjFZbTFwZEVadmNtMG9LVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQmxiSE5sSUdsbUtITjFZbTFwZEY5bWIzSnRQVDFjSW01bGRtVnlYQ0lwWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUtIUm9hWE11WVhWMGIxOWpiM1Z1ZEY5eVpXWnlaWE5vWDIxdlpHVTlQVEVwWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYzJWc1ppNW1iM0p0VlhCa1lYUmxaRVpsZEdOb1FXcGhlQ2dwTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUdWc2MyVWdhV1lvYzNWaWJXbDBYMlp2Y20wOVBWd2lZWFYwYjF3aUtWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnBaaWgwYUdsekxtRjFkRzlmZFhCa1lYUmxQVDEwY25WbEtWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lITmxiR1l1YzNWaWJXbDBSbTl5YlNncE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWld4elpWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1LSFJvYVhNdVlYVjBiMTlqYjNWdWRGOXlaV1p5WlhOb1gyMXZaR1U5UFRFcFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCelpXeG1MbVp2Y20xVmNHUmhkR1ZrUm1WMFkyaEJhbUY0S0NrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhISmNibHh5WEc0Z0lDQWdJQ0FnSUgwN1hISmNibHh5WEc0Z0lDQWdJQ0FnSUhSb2FYTXVhVzVwZENncE8xeHlYRzVjY2x4dUlDQWdJQ0FnSUNCMllYSWdaWFpsYm5SZlpHRjBZU0E5SUh0OU8xeHlYRzRnSUNBZ0lDQWdJR1YyWlc1MFgyUmhkR0V1YzJacFpDQTlJSE5sYkdZdWMyWnBaRHRjY2x4dUlDQWdJQ0FnSUNCbGRtVnVkRjlrWVhSaExuUmhjbWRsZEZObGJHVmpkRzl5SUQwZ2MyVnNaaTVoYW1GNFgzUmhjbWRsZEY5aGRIUnlPMXh5WEc0Z0lDQWdJQ0FnSUdWMlpXNTBYMlJoZEdFdWIySnFaV04wSUQwZ2RHaHBjenRjY2x4dUlDQWdJQ0FnSUNCcFppaHZjSFJ6TG1selNXNXBkQ2xjY2x4dUlDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUhObGJHWXVkSEpwWjJkbGNrVjJaVzUwS0Z3aWMyWTZhVzVwZEZ3aUxDQmxkbVZ1ZEY5a1lYUmhLVHRjY2x4dUlDQWdJQ0FnSUNCOVhISmNibHh5WEc0Z0lDQWdmU2s3WEhKY2JuMDdYSEpjYmlKZGZRPT0iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG5cclxudmFyICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snalF1ZXJ5J10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydqUXVlcnknXSA6IG51bGwpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG5cdHRheG9ub215X2FyY2hpdmVzOiAwLFxyXG4gICAgdXJsX3BhcmFtczoge30sXHJcbiAgICB0YXhfYXJjaGl2ZV9yZXN1bHRzX3VybDogXCJcIixcclxuICAgIGFjdGl2ZV90YXg6IFwiXCIsXHJcbiAgICBmaWVsZHM6IHt9LFxyXG5cdGluaXQ6IGZ1bmN0aW9uKHRheG9ub215X2FyY2hpdmVzLCBjdXJyZW50X3RheG9ub215X2FyY2hpdmUpe1xyXG5cclxuICAgICAgICB0aGlzLnRheG9ub215X2FyY2hpdmVzID0gMDtcclxuICAgICAgICB0aGlzLnVybF9wYXJhbXMgPSB7fTtcclxuICAgICAgICB0aGlzLnRheF9hcmNoaXZlX3Jlc3VsdHNfdXJsID0gXCJcIjtcclxuICAgICAgICB0aGlzLmFjdGl2ZV90YXggPSBcIlwiO1xyXG5cclxuXHRcdC8vdGhpcy4kZmllbGRzID0gJGZpZWxkcztcclxuICAgICAgICB0aGlzLnRheG9ub215X2FyY2hpdmVzID0gdGF4b25vbXlfYXJjaGl2ZXM7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50X3RheG9ub215X2FyY2hpdmUgPSBjdXJyZW50X3RheG9ub215X2FyY2hpdmU7XHJcblxyXG5cdFx0dGhpcy5jbGVhclVybENvbXBvbmVudHMoKTtcclxuXHJcblx0fSxcclxuICAgIHNldFRheEFyY2hpdmVSZXN1bHRzVXJsOiBmdW5jdGlvbigkZm9ybSwgY3VycmVudF9yZXN1bHRzX3VybCwgZ2V0X2FjdGl2ZSkge1xyXG5cclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vdmFyIGN1cnJlbnRfcmVzdWx0c191cmwgPSBcIlwiO1xyXG4gICAgICAgIGlmKHRoaXMudGF4b25vbXlfYXJjaGl2ZXMhPTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0eXBlb2YoZ2V0X2FjdGl2ZSk9PVwidW5kZWZpbmVkXCIpXHJcblx0XHR7XHJcblx0XHRcdHZhciBnZXRfYWN0aXZlID0gZmFsc2U7XHJcblx0XHR9XHJcblxyXG4gICAgICAgIC8vY2hlY2sgdG8gc2VlIGlmIHdlIGhhdmUgYW55IHRheG9ub21pZXMgc2VsZWN0ZWRcclxuICAgICAgICAvL2lmIHNvLCBjaGVjayB0aGVpciByZXdyaXRlcyBhbmQgdXNlIHRob3NlIGFzIHRoZSByZXN1bHRzIHVybFxyXG4gICAgICAgIHZhciAkZmllbGQgPSBmYWxzZTtcclxuICAgICAgICB2YXIgZmllbGRfbmFtZSA9IFwiXCI7XHJcbiAgICAgICAgdmFyIGZpZWxkX3ZhbHVlID0gXCJcIjtcclxuXHJcbiAgICAgICAgdmFyICRhY3RpdmVfdGF4b25vbXkgPSAkZm9ybS4kZmllbGRzLnBhcmVudCgpLmZpbmQoXCJbZGF0YS1zZi10YXhvbm9teS1hcmNoaXZlPScxJ11cIik7XHJcbiAgICAgICAgaWYoJGFjdGl2ZV90YXhvbm9teS5sZW5ndGg9PTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAkZmllbGQgPSAkYWN0aXZlX3RheG9ub215O1xyXG5cclxuICAgICAgICAgICAgdmFyIGZpZWxkVHlwZSA9ICRmaWVsZC5hdHRyKFwiZGF0YS1zZi1maWVsZC10eXBlXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKChmaWVsZFR5cGUgPT0gXCJ0YWdcIikgfHwgKGZpZWxkVHlwZSA9PSBcImNhdGVnb3J5XCIpIHx8IChmaWVsZFR5cGUgPT0gXCJ0YXhvbm9teVwiKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRheG9ub215X3ZhbHVlID0gc2VsZi5wcm9jZXNzVGF4b25vbXkoJGZpZWxkLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGZpZWxkX25hbWUgPSAkZmllbGQuYXR0cihcImRhdGEtc2YtZmllbGQtbmFtZVwiKTtcclxuICAgICAgICAgICAgICAgIHZhciB0YXhvbm9teV9uYW1lID0gZmllbGRfbmFtZS5yZXBsYWNlKFwiX3NmdF9cIiwgXCJcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRheG9ub215X3ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRfdmFsdWUgPSB0YXhvbm9teV92YWx1ZS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoZmllbGRfdmFsdWU9PVwiXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICRmaWVsZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZigoc2VsZi5jdXJyZW50X3RheG9ub215X2FyY2hpdmUhPVwiXCIpJiYoc2VsZi5jdXJyZW50X3RheG9ub215X2FyY2hpdmUhPXRheG9ub215X25hbWUpKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudGF4X2FyY2hpdmVfcmVzdWx0c191cmwgPSBjdXJyZW50X3Jlc3VsdHNfdXJsO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZigoKGZpZWxkX3ZhbHVlPT1cIlwiKXx8KCEkZmllbGQpICkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAkZm9ybS4kZmllbGRzLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghJGZpZWxkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWVsZFR5cGUgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXNmLWZpZWxkLXR5cGVcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoZmllbGRUeXBlID09IFwidGFnXCIpIHx8IChmaWVsZFR5cGUgPT0gXCJjYXRlZ29yeVwiKSB8fCAoZmllbGRUeXBlID09IFwidGF4b25vbXlcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRheG9ub215X3ZhbHVlID0gc2VsZi5wcm9jZXNzVGF4b25vbXkoJCh0aGlzKSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkX25hbWUgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXNmLWZpZWxkLW5hbWVcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGF4b25vbXlfdmFsdWUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZF92YWx1ZSA9IHRheG9ub215X3ZhbHVlLnZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZF92YWx1ZSAhPSBcIlwiKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRmaWVsZCA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCAoJGZpZWxkKSAmJiAoZmllbGRfdmFsdWUgIT0gXCJcIiApKSB7XHJcbiAgICAgICAgICAgIC8vaWYgd2UgZm91bmQgYSBmaWVsZFxyXG5cdFx0XHR2YXIgcmV3cml0ZV9hdHRyID0gKCRmaWVsZC5hdHRyKFwiZGF0YS1zZi10ZXJtLXJld3JpdGVcIikpO1xyXG5cclxuICAgICAgICAgICAgaWYocmV3cml0ZV9hdHRyIT1cIlwiKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHJld3JpdGUgPSBKU09OLnBhcnNlKHJld3JpdGVfYXR0cik7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXRfdHlwZSA9ICRmaWVsZC5hdHRyKFwiZGF0YS1zZi1maWVsZC1pbnB1dC10eXBlXCIpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hY3RpdmVfdGF4ID0gZmllbGRfbmFtZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2ZpbmQgdGhlIGFjdGl2ZSBlbGVtZW50XHJcbiAgICAgICAgICAgICAgICBpZiAoKGlucHV0X3R5cGUgPT0gXCJyYWRpb1wiKSB8fCAoaW5wdXRfdHlwZSA9PSBcImNoZWNrYm94XCIpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vdmFyICRhY3RpdmUgPSAkZmllbGQuZmluZChcIi5zZi1vcHRpb24tYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZXhwbG9kZSB0aGUgdmFsdWVzIGlmIHRoZXJlIGlzIGEgZGVsaW1cclxuICAgICAgICAgICAgICAgICAgICAvL2ZpZWxkX3ZhbHVlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpc19zaW5nbGVfdmFsdWUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWVsZF92YWx1ZXMgPSBmaWVsZF92YWx1ZS5zcGxpdChcIixcIikuam9pbihcIitcIikuc3BsaXQoXCIrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZF92YWx1ZXMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc19zaW5nbGVfdmFsdWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc19zaW5nbGVfdmFsdWUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkaW5wdXQgPSAkZmllbGQuZmluZChcImlucHV0W3ZhbHVlPSdcIiArIGZpZWxkX3ZhbHVlICsgXCInXVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRhY3RpdmUgPSAkaW5wdXQucGFyZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZXB0aCA9ICRhY3RpdmUuYXR0cihcImRhdGEtc2YtZGVwdGhcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL25vdyBsb29wIHRocm91Z2ggcGFyZW50cyB0byBncmFiIHRoZWlyIG5hbWVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzLnB1c2goZmllbGRfdmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IGRlcHRoOyBpID4gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYWN0aXZlID0gJGFjdGl2ZS5wYXJlbnQoKS5wYXJlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKCRhY3RpdmUuZmluZChcImlucHV0XCIpLnZhbCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzLnJldmVyc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JhYiB0aGUgcmV3cml0ZSBmb3IgdGhpcyBkZXB0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aXZlX3Jld3JpdGUgPSByZXdyaXRlW2RlcHRoXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVybCA9IGFjdGl2ZV9yZXdyaXRlO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhlbiBtYXAgZnJvbSB0aGUgcGFyZW50cyB0byB0aGUgZGVwdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh2YWx1ZXMpLmVhY2goZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKFwiW1wiICsgaW5kZXggKyBcIl1cIiwgdmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGF4X2FyY2hpdmVfcmVzdWx0c191cmwgPSB1cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiB0aGVyZSBhcmUgbXVsdGlwbGUgdmFsdWVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoZW4gd2UgbmVlZCB0byBjaGVjayBmb3IgMyB0aGluZ3M6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIHRoZSB2YWx1ZXMgc2VsZWN0ZWQgYXJlIGFsbCBpbiB0aGUgc2FtZSB0cmVlIHRoZW4gd2UgY2FuIGRvIHNvbWUgY2xldmVyIHJld3JpdGUgc3R1ZmZcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9tZXJnZSBhbGwgdmFsdWVzIGluIHNhbWUgbGV2ZWwsIHRoZW4gY29tYmluZSB0aGUgbGV2ZWxzXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIHRoZXkgYXJlIGZyb20gZGlmZmVyZW50IHRyZWVzIHRoZW4ganVzdCBjb21iaW5lIHRoZW0gb3IganVzdCB1c2UgYGZpZWxkX3ZhbHVlYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvKlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZXB0aHMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICQoZmllbGRfdmFsdWVzKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgdmFsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRpbnB1dCA9ICRmaWVsZC5maW5kKFwiaW5wdXRbdmFsdWU9J1wiICsgZmllbGRfdmFsdWUgKyBcIiddXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRhY3RpdmUgPSAkaW5wdXQucGFyZW50KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlcHRoID0gJGFjdGl2ZS5hdHRyKFwiZGF0YS1zZi1kZXB0aFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVwdGhzLnB1c2goZGVwdGgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgIH0pOyovXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKChpbnB1dF90eXBlID09IFwic2VsZWN0XCIpIHx8IChpbnB1dF90eXBlID09IFwibXVsdGlzZWxlY3RcIikpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzX3NpbmdsZV92YWx1ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpZWxkX3ZhbHVlcyA9IGZpZWxkX3ZhbHVlLnNwbGl0KFwiLFwiKS5qb2luKFwiK1wiKS5zcGxpdChcIitcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkX3ZhbHVlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzX3NpbmdsZV92YWx1ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzX3NpbmdsZV92YWx1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRhY3RpdmUgPSAkZmllbGQuZmluZChcIm9wdGlvblt2YWx1ZT0nXCIgKyBmaWVsZF92YWx1ZSArIFwiJ11cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZXB0aCA9ICRhY3RpdmUuYXR0cihcImRhdGEtc2YtZGVwdGhcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKGZpZWxkX3ZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBkZXB0aDsgaSA+IDA7IGktLSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGFjdGl2ZSA9ICRhY3RpdmUucHJldkFsbChcIm9wdGlvbltkYXRhLXNmLWRlcHRoPSdcIiArIChpIC0gMSkgKyBcIiddXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzLnB1c2goJGFjdGl2ZS52YWwoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcy5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY3RpdmVfcmV3cml0ZSA9IHJld3JpdGVbZGVwdGhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXJsID0gYWN0aXZlX3Jld3JpdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodmFsdWVzKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgdmFsdWUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZShcIltcIiArIGluZGV4ICsgXCJdXCIsIHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRheF9hcmNoaXZlX3Jlc3VsdHNfdXJsID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdGhpcy50YXhfYXJjaGl2ZV9yZXN1bHRzX3VybCA9IGN1cnJlbnRfcmVzdWx0c191cmw7XHJcbiAgICB9LFxyXG4gICAgZ2V0UmVzdWx0c1VybDogZnVuY3Rpb24oJGZvcm0sIGN1cnJlbnRfcmVzdWx0c191cmwpIHtcclxuXHJcbiAgICAgICAgLy90aGlzLnNldFRheEFyY2hpdmVSZXN1bHRzVXJsKCRmb3JtLCBjdXJyZW50X3Jlc3VsdHNfdXJsKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy50YXhfYXJjaGl2ZV9yZXN1bHRzX3VybD09XCJcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50X3Jlc3VsdHNfdXJsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGF4X2FyY2hpdmVfcmVzdWx0c191cmw7XHJcbiAgICB9LFxyXG5cdGdldFVybFBhcmFtczogZnVuY3Rpb24oJGZvcm0pe1xyXG5cclxuXHRcdHRoaXMuYnVpbGRVcmxDb21wb25lbnRzKCRmb3JtLCB0cnVlKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy50YXhfYXJjaGl2ZV9yZXN1bHRzX3VybCE9XCJcIilcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLmFjdGl2ZV90YXghPVwiXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBmaWVsZF9uYW1lID0gdGhpcy5hY3RpdmVfdGF4O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHR5cGVvZih0aGlzLnVybF9wYXJhbXNbZmllbGRfbmFtZV0pIT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnVybF9wYXJhbXNbZmllbGRfbmFtZV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMudXJsX3BhcmFtcztcclxuXHR9LFxyXG5cdGNsZWFyVXJsQ29tcG9uZW50czogZnVuY3Rpb24oKXtcclxuXHRcdC8vdGhpcy51cmxfY29tcG9uZW50cyA9IFwiXCI7XHJcblx0XHR0aGlzLnVybF9wYXJhbXMgPSB7fTtcclxuXHR9LFxyXG5cdGRpc2FibGVJbnB1dHM6IGZ1bmN0aW9uKCRmb3JtKXtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdFxyXG5cdFx0JGZvcm0uJGZpZWxkcy5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFxyXG5cdFx0XHR2YXIgJGlucHV0cyA9ICQodGhpcykuZmluZChcImlucHV0LCBzZWxlY3QsIC5tZXRhLXNsaWRlclwiKTtcclxuXHRcdFx0JGlucHV0cy5hdHRyKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcclxuXHRcdFx0JGlucHV0cy5hdHRyKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcblx0XHRcdCRpbnB1dHMucHJvcChcImRpc2FibGVkXCIsIHRydWUpO1xyXG5cdFx0XHQkaW5wdXRzLnRyaWdnZXIoXCJjaG9zZW46dXBkYXRlZFwiKTtcclxuXHRcdFx0XHJcblx0XHR9KTtcclxuXHRcdFxyXG5cdFx0XHJcblx0fSxcclxuXHRlbmFibGVJbnB1dHM6IGZ1bmN0aW9uKCRmb3JtKXtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdFxyXG5cdFx0JGZvcm0uJGZpZWxkcy5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFxyXG5cdFx0XHR2YXIgJGlucHV0cyA9ICQodGhpcykuZmluZChcImlucHV0LCBzZWxlY3QsIC5tZXRhLXNsaWRlclwiKTtcclxuXHRcdFx0JGlucHV0cy5wcm9wKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcblx0XHRcdCRpbnB1dHMucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xyXG5cdFx0XHQkaW5wdXRzLnRyaWdnZXIoXCJjaG9zZW46dXBkYXRlZFwiKTtcdFx0XHRcclxuXHRcdH0pO1xyXG5cdFx0XHJcblx0XHRcclxuXHR9LFxyXG5cdGJ1aWxkVXJsQ29tcG9uZW50czogZnVuY3Rpb24oJGZvcm0sIGNsZWFyX2NvbXBvbmVudHMpe1xyXG5cdFx0XHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHRcclxuXHRcdGlmKHR5cGVvZihjbGVhcl9jb21wb25lbnRzKSE9XCJ1bmRlZmluZWRcIilcclxuXHRcdHtcclxuXHRcdFx0aWYoY2xlYXJfY29tcG9uZW50cz09dHJ1ZSlcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHRoaXMuY2xlYXJVcmxDb21wb25lbnRzKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0JGZvcm0uJGZpZWxkcy5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFxyXG5cdFx0XHR2YXIgZmllbGROYW1lID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1zZi1maWVsZC1uYW1lXCIpO1xyXG5cdFx0XHR2YXIgZmllbGRUeXBlID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1zZi1maWVsZC10eXBlXCIpO1xyXG5cdFx0XHRcclxuXHRcdFx0aWYoZmllbGRUeXBlPT1cInNlYXJjaFwiKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0c2VsZi5wcm9jZXNzU2VhcmNoRmllbGQoJCh0aGlzKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZigoZmllbGRUeXBlPT1cInRhZ1wiKXx8KGZpZWxkVHlwZT09XCJjYXRlZ29yeVwiKXx8KGZpZWxkVHlwZT09XCJ0YXhvbm9teVwiKSlcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHNlbGYucHJvY2Vzc1RheG9ub215KCQodGhpcykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYoZmllbGRUeXBlPT1cInNvcnRfb3JkZXJcIilcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHNlbGYucHJvY2Vzc1NvcnRPcmRlckZpZWxkKCQodGhpcykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYoZmllbGRUeXBlPT1cInBvc3RzX3Blcl9wYWdlXCIpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRzZWxmLnByb2Nlc3NSZXN1bHRzUGVyUGFnZUZpZWxkKCQodGhpcykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYoZmllbGRUeXBlPT1cImF1dGhvclwiKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0c2VsZi5wcm9jZXNzQXV0aG9yKCQodGhpcykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYoZmllbGRUeXBlPT1cInBvc3RfdHlwZVwiKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0c2VsZi5wcm9jZXNzUG9zdFR5cGUoJCh0aGlzKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZihmaWVsZFR5cGU9PVwicG9zdF9kYXRlXCIpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRzZWxmLnByb2Nlc3NQb3N0RGF0ZSgkKHRoaXMpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmKGZpZWxkVHlwZT09XCJwb3N0X21ldGFcIilcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHNlbGYucHJvY2Vzc1Bvc3RNZXRhKCQodGhpcykpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0e1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fSk7XHJcblx0XHRcclxuXHR9LFxyXG5cdHByb2Nlc3NTZWFyY2hGaWVsZDogZnVuY3Rpb24oJGNvbnRhaW5lcilcclxuXHR7XHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHRcclxuXHRcdHZhciAkZmllbGQgPSAkY29udGFpbmVyLmZpbmQoXCJpbnB1dFtuYW1lXj0nX3NmX3NlYXJjaCddXCIpO1xyXG5cdFx0XHJcblx0XHRpZigkZmllbGQubGVuZ3RoPjApXHJcblx0XHR7XHJcblx0XHRcdHZhciBmaWVsZE5hbWUgPSAkZmllbGQuYXR0cihcIm5hbWVcIikucmVwbGFjZSgnW10nLCAnJyk7XHJcblx0XHRcdHZhciBmaWVsZFZhbCA9ICRmaWVsZC52YWwoKTtcclxuXHRcdFx0XHJcblx0XHRcdGlmKGZpZWxkVmFsIT1cIlwiKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0Ly9zZWxmLnVybF9jb21wb25lbnRzICs9IFwiJl9zZl9zPVwiK2VuY29kZVVSSUNvbXBvbmVudChmaWVsZFZhbCk7XHJcblx0XHRcdFx0c2VsZi51cmxfcGFyYW1zWydfc2ZfcyddID0gZW5jb2RlVVJJQ29tcG9uZW50KGZpZWxkVmFsKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0cHJvY2Vzc1NvcnRPcmRlckZpZWxkOiBmdW5jdGlvbigkY29udGFpbmVyKVxyXG5cdHtcclxuXHRcdHRoaXMucHJvY2Vzc0F1dGhvcigkY29udGFpbmVyKTtcclxuXHRcdFxyXG5cdH0sXHJcblx0cHJvY2Vzc1Jlc3VsdHNQZXJQYWdlRmllbGQ6IGZ1bmN0aW9uKCRjb250YWluZXIpXHJcblx0e1xyXG5cdFx0dGhpcy5wcm9jZXNzQXV0aG9yKCRjb250YWluZXIpO1xyXG5cdFx0XHJcblx0fSxcclxuXHRnZXRBY3RpdmVUYXg6IGZ1bmN0aW9uKCRmaWVsZCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYWN0aXZlX3RheDtcclxuXHR9LFxyXG5cdGdldFNlbGVjdFZhbDogZnVuY3Rpb24oJGZpZWxkKXtcclxuXHJcblx0XHR2YXIgZmllbGRWYWwgPSBcIlwiO1xyXG5cdFx0XHJcblx0XHRpZigkZmllbGQudmFsKCkhPTApXHJcblx0XHR7XHJcblx0XHRcdGZpZWxkVmFsID0gJGZpZWxkLnZhbCgpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZihmaWVsZFZhbD09bnVsbClcclxuXHRcdHtcclxuXHRcdFx0ZmllbGRWYWwgPSBcIlwiO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gZmllbGRWYWw7XHJcblx0fSxcclxuXHRnZXRNZXRhU2VsZWN0VmFsOiBmdW5jdGlvbigkZmllbGQpe1xyXG5cdFx0XHJcblx0XHR2YXIgZmllbGRWYWwgPSBcIlwiO1xyXG5cdFx0XHJcblx0XHRmaWVsZFZhbCA9ICRmaWVsZC52YWwoKTtcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRpZihmaWVsZFZhbD09bnVsbClcclxuXHRcdHtcclxuXHRcdFx0ZmllbGRWYWwgPSBcIlwiO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gZmllbGRWYWw7XHJcblx0fSxcclxuXHRnZXRNdWx0aVNlbGVjdFZhbDogZnVuY3Rpb24oJGZpZWxkLCBvcGVyYXRvcil7XHJcblx0XHRcclxuXHRcdHZhciBkZWxpbSA9IFwiK1wiO1xyXG5cdFx0aWYob3BlcmF0b3I9PVwib3JcIilcclxuXHRcdHtcclxuXHRcdFx0ZGVsaW0gPSBcIixcIjtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYodHlwZW9mKCRmaWVsZC52YWwoKSk9PVwib2JqZWN0XCIpXHJcblx0XHR7XHJcblx0XHRcdGlmKCRmaWVsZC52YWwoKSE9bnVsbClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHJldHVybiAkZmllbGQudmFsKCkuam9pbihkZWxpbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdFxyXG5cdH0sXHJcblx0Z2V0TWV0YU11bHRpU2VsZWN0VmFsOiBmdW5jdGlvbigkZmllbGQsIG9wZXJhdG9yKXtcclxuXHRcdFxyXG5cdFx0dmFyIGRlbGltID0gXCItKy1cIjtcclxuXHRcdGlmKG9wZXJhdG9yPT1cIm9yXCIpXHJcblx0XHR7XHJcblx0XHRcdGRlbGltID0gXCItLC1cIjtcclxuXHRcdH1cclxuXHRcdFx0XHRcclxuXHRcdGlmKHR5cGVvZigkZmllbGQudmFsKCkpPT1cIm9iamVjdFwiKVxyXG5cdFx0e1xyXG5cdFx0XHRpZigkZmllbGQudmFsKCkhPW51bGwpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHR2YXIgZmllbGR2YWwgPSBbXTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHQkKCRmaWVsZC52YWwoKSkuZWFjaChmdW5jdGlvbihpbmRleCx2YWx1ZSl7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGZpZWxkdmFsLnB1c2goKHZhbHVlKSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0cmV0dXJuIGZpZWxkdmFsLmpvaW4oZGVsaW0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBcIlwiO1xyXG5cdFx0XHJcblx0fSxcclxuXHRnZXRDaGVja2JveFZhbDogZnVuY3Rpb24oJGZpZWxkLCBvcGVyYXRvcil7XHJcblx0XHRcclxuXHRcdFxyXG5cdFx0dmFyIGZpZWxkVmFsID0gJGZpZWxkLm1hcChmdW5jdGlvbigpe1xyXG5cdFx0XHRpZigkKHRoaXMpLnByb3AoXCJjaGVja2VkXCIpPT10cnVlKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0cmV0dXJuICQodGhpcykudmFsKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pLmdldCgpO1xyXG5cdFx0XHJcblx0XHR2YXIgZGVsaW0gPSBcIitcIjtcclxuXHRcdGlmKG9wZXJhdG9yPT1cIm9yXCIpXHJcblx0XHR7XHJcblx0XHRcdGRlbGltID0gXCIsXCI7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBmaWVsZFZhbC5qb2luKGRlbGltKTtcclxuXHR9LFxyXG5cdGdldE1ldGFDaGVja2JveFZhbDogZnVuY3Rpb24oJGZpZWxkLCBvcGVyYXRvcil7XHJcblx0XHRcclxuXHRcdFxyXG5cdFx0dmFyIGZpZWxkVmFsID0gJGZpZWxkLm1hcChmdW5jdGlvbigpe1xyXG5cdFx0XHRpZigkKHRoaXMpLnByb3AoXCJjaGVja2VkXCIpPT10cnVlKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0cmV0dXJuICgkKHRoaXMpLnZhbCgpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSkuZ2V0KCk7XHJcblx0XHRcclxuXHRcdHZhciBkZWxpbSA9IFwiLSstXCI7XHJcblx0XHRpZihvcGVyYXRvcj09XCJvclwiKVxyXG5cdFx0e1xyXG5cdFx0XHRkZWxpbSA9IFwiLSwtXCI7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBmaWVsZFZhbC5qb2luKGRlbGltKTtcclxuXHR9LFxyXG5cdGdldFJhZGlvVmFsOiBmdW5jdGlvbigkZmllbGQpe1xyXG5cdFx0XHRcdFx0XHRcdFxyXG5cdFx0dmFyIGZpZWxkVmFsID0gJGZpZWxkLm1hcChmdW5jdGlvbigpXHJcblx0XHR7XHJcblx0XHRcdGlmKCQodGhpcykucHJvcChcImNoZWNrZWRcIik9PXRydWUpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRyZXR1cm4gJCh0aGlzKS52YWwoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH0pLmdldCgpO1xyXG5cdFx0XHJcblx0XHRcclxuXHRcdGlmKGZpZWxkVmFsWzBdIT0wKVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm4gZmllbGRWYWxbMF07XHJcblx0XHR9XHJcblx0fSxcclxuXHRnZXRNZXRhUmFkaW9WYWw6IGZ1bmN0aW9uKCRmaWVsZCl7XHJcblx0XHRcdFx0XHRcdFx0XHJcblx0XHR2YXIgZmllbGRWYWwgPSAkZmllbGQubWFwKGZ1bmN0aW9uKClcclxuXHRcdHtcclxuXHRcdFx0aWYoJCh0aGlzKS5wcm9wKFwiY2hlY2tlZFwiKT09dHJ1ZSlcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHJldHVybiAkKHRoaXMpLnZhbCgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fSkuZ2V0KCk7XHJcblx0XHRcclxuXHRcdHJldHVybiBmaWVsZFZhbFswXTtcclxuXHR9LFxyXG5cdHByb2Nlc3NBdXRob3I6IGZ1bmN0aW9uKCRjb250YWluZXIpXHJcblx0e1xyXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0XHJcblx0XHRcclxuXHRcdHZhciBmaWVsZFR5cGUgPSAkY29udGFpbmVyLmF0dHIoXCJkYXRhLXNmLWZpZWxkLXR5cGVcIik7XHJcblx0XHR2YXIgaW5wdXRUeXBlID0gJGNvbnRhaW5lci5hdHRyKFwiZGF0YS1zZi1maWVsZC1pbnB1dC10eXBlXCIpO1xyXG5cdFx0XHJcblx0XHR2YXIgJGZpZWxkO1xyXG5cdFx0dmFyIGZpZWxkTmFtZSA9IFwiXCI7XHJcblx0XHR2YXIgZmllbGRWYWwgPSBcIlwiO1xyXG5cdFx0XHJcblx0XHRpZihpbnB1dFR5cGU9PVwic2VsZWN0XCIpXHJcblx0XHR7XHJcblx0XHRcdCRmaWVsZCA9ICRjb250YWluZXIuZmluZChcInNlbGVjdFwiKTtcclxuXHRcdFx0ZmllbGROYW1lID0gJGZpZWxkLmF0dHIoXCJuYW1lXCIpLnJlcGxhY2UoJ1tdJywgJycpO1xyXG5cdFx0XHRcclxuXHRcdFx0ZmllbGRWYWwgPSBzZWxmLmdldFNlbGVjdFZhbCgkZmllbGQpOyBcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoaW5wdXRUeXBlPT1cIm11bHRpc2VsZWN0XCIpXHJcblx0XHR7XHJcblx0XHRcdCRmaWVsZCA9ICRjb250YWluZXIuZmluZChcInNlbGVjdFwiKTtcclxuXHRcdFx0ZmllbGROYW1lID0gJGZpZWxkLmF0dHIoXCJuYW1lXCIpLnJlcGxhY2UoJ1tdJywgJycpO1xyXG5cdFx0XHR2YXIgb3BlcmF0b3IgPSAkZmllbGQuYXR0cihcImRhdGEtb3BlcmF0b3JcIik7XHJcblx0XHRcdFxyXG5cdFx0XHRmaWVsZFZhbCA9IHNlbGYuZ2V0TXVsdGlTZWxlY3RWYWwoJGZpZWxkLCBcIm9yXCIpO1xyXG5cdFx0XHRcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoaW5wdXRUeXBlPT1cImNoZWNrYm94XCIpXHJcblx0XHR7XHJcblx0XHRcdCRmaWVsZCA9ICRjb250YWluZXIuZmluZChcInVsID4gbGkgaW5wdXQ6Y2hlY2tib3hcIik7XHJcblx0XHRcdFxyXG5cdFx0XHRpZigkZmllbGQubGVuZ3RoPjApXHJcblx0XHRcdHtcclxuXHRcdFx0XHRmaWVsZE5hbWUgPSAkZmllbGQuYXR0cihcIm5hbWVcIikucmVwbGFjZSgnW10nLCAnJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0dmFyIG9wZXJhdG9yID0gJGNvbnRhaW5lci5maW5kKFwiPiB1bFwiKS5hdHRyKFwiZGF0YS1vcGVyYXRvclwiKTtcclxuXHRcdFx0XHRmaWVsZFZhbCA9IHNlbGYuZ2V0Q2hlY2tib3hWYWwoJGZpZWxkLCBcIm9yXCIpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZihpbnB1dFR5cGU9PVwicmFkaW9cIilcclxuXHRcdHtcclxuXHRcdFx0XHJcblx0XHRcdCRmaWVsZCA9ICRjb250YWluZXIuZmluZChcInVsID4gbGkgaW5wdXQ6cmFkaW9cIik7XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRpZigkZmllbGQubGVuZ3RoPjApXHJcblx0XHRcdHtcclxuXHRcdFx0XHRmaWVsZE5hbWUgPSAkZmllbGQuYXR0cihcIm5hbWVcIikucmVwbGFjZSgnW10nLCAnJyk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0ZmllbGRWYWwgPSBzZWxmLmdldFJhZGlvVmFsKCRmaWVsZCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYodHlwZW9mKGZpZWxkVmFsKSE9XCJ1bmRlZmluZWRcIilcclxuXHRcdHtcclxuXHRcdFx0aWYoZmllbGRWYWwhPVwiXCIpXHJcblx0XHRcdHtcclxuXHRcdFx0XHR2YXIgZmllbGRTbHVnID0gXCJcIjtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZihmaWVsZE5hbWU9PVwiX3NmX2F1dGhvclwiKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGZpZWxkU2x1ZyA9IFwiYXV0aG9yc1wiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmKGZpZWxkTmFtZT09XCJfc2Zfc29ydF9vcmRlclwiKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGZpZWxkU2x1ZyA9IFwic29ydF9vcmRlclwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmKGZpZWxkTmFtZT09XCJfc2ZfcHBwXCIpXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0ZmllbGRTbHVnID0gXCJfc2ZfcHBwXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYoZmllbGROYW1lPT1cIl9zZl9wb3N0X3R5cGVcIilcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRmaWVsZFNsdWcgPSBcInBvc3RfdHlwZXNcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYoZmllbGRTbHVnIT1cIlwiKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdC8vc2VsZi51cmxfY29tcG9uZW50cyArPSBcIiZcIitmaWVsZFNsdWcrXCI9XCIrZmllbGRWYWw7XHJcblx0XHRcdFx0XHRzZWxmLnVybF9wYXJhbXNbZmllbGRTbHVnXSA9IGZpZWxkVmFsO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0fSxcclxuXHRwcm9jZXNzUG9zdFR5cGUgOiBmdW5jdGlvbigkdGhpcyl7XHJcblx0XHRcclxuXHRcdHRoaXMucHJvY2Vzc0F1dGhvcigkdGhpcyk7XHJcblx0XHRcclxuXHR9LFxyXG5cdHByb2Nlc3NQb3N0TWV0YTogZnVuY3Rpb24oJGNvbnRhaW5lcilcclxuXHR7XHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHRcclxuXHRcdHZhciBmaWVsZFR5cGUgPSAkY29udGFpbmVyLmF0dHIoXCJkYXRhLXNmLWZpZWxkLXR5cGVcIik7XHJcblx0XHR2YXIgaW5wdXRUeXBlID0gJGNvbnRhaW5lci5hdHRyKFwiZGF0YS1zZi1maWVsZC1pbnB1dC10eXBlXCIpO1xyXG5cdFx0dmFyIG1ldGFUeXBlID0gJGNvbnRhaW5lci5hdHRyKFwiZGF0YS1zZi1tZXRhLXR5cGVcIik7XHJcblxyXG5cdFx0dmFyIGZpZWxkVmFsID0gXCJcIjtcclxuXHRcdHZhciAkZmllbGQ7XHJcblx0XHR2YXIgZmllbGROYW1lID0gXCJcIjtcclxuXHRcdFxyXG5cdFx0aWYobWV0YVR5cGU9PVwibnVtYmVyXCIpXHJcblx0XHR7XHJcblx0XHRcdGlmKGlucHV0VHlwZT09XCJyYW5nZS1udW1iZXJcIilcclxuXHRcdFx0e1xyXG5cdFx0XHRcdCRmaWVsZCA9ICRjb250YWluZXIuZmluZChcIi5zZi1tZXRhLXJhbmdlLW51bWJlciBpbnB1dFwiKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHR2YXIgdmFsdWVzID0gW107XHJcblx0XHRcdFx0JGZpZWxkLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0dmFsdWVzLnB1c2goJCh0aGlzKS52YWwoKSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0ZmllbGRWYWwgPSB2YWx1ZXMuam9pbihcIitcIik7XHJcblx0XHRcdFx0XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZihpbnB1dFR5cGU9PVwicmFuZ2Utc2xpZGVyXCIpXHJcblx0XHRcdHtcclxuXHRcdFx0XHQkZmllbGQgPSAkY29udGFpbmVyLmZpbmQoXCIuc2YtbWV0YS1yYW5nZS1zbGlkZXIgaW5wdXRcIik7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Ly9nZXQgYW55IG51bWJlciBmb3JtYXR0aW5nIHN0dWZmXHJcblx0XHRcdFx0dmFyICRtZXRhX3JhbmdlID0gJGNvbnRhaW5lci5maW5kKFwiLnNmLW1ldGEtcmFuZ2Utc2xpZGVyXCIpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHZhciBkZWNpbWFsX3BsYWNlcyA9ICRtZXRhX3JhbmdlLmF0dHIoXCJkYXRhLWRlY2ltYWwtcGxhY2VzXCIpO1xyXG5cdFx0XHRcdHZhciB0aG91c2FuZF9zZXBlcmF0b3IgPSAkbWV0YV9yYW5nZS5hdHRyKFwiZGF0YS10aG91c2FuZC1zZXBlcmF0b3JcIik7XHJcblx0XHRcdFx0dmFyIGRlY2ltYWxfc2VwZXJhdG9yID0gJG1ldGFfcmFuZ2UuYXR0cihcImRhdGEtZGVjaW1hbC1zZXBlcmF0b3JcIik7XHJcblxyXG5cdFx0XHRcdHZhciBmaWVsZF9mb3JtYXQgPSB3TnVtYih7XHJcblx0XHRcdFx0XHRtYXJrOiBkZWNpbWFsX3NlcGVyYXRvcixcclxuXHRcdFx0XHRcdGRlY2ltYWxzOiBwYXJzZUZsb2F0KGRlY2ltYWxfcGxhY2VzKSxcclxuXHRcdFx0XHRcdHRob3VzYW5kOiB0aG91c2FuZF9zZXBlcmF0b3JcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHR2YXIgdmFsdWVzID0gW107XHJcblxyXG5cclxuXHRcdFx0XHR2YXIgc2xpZGVyX29iamVjdCA9ICRjb250YWluZXIuZmluZChcIi5tZXRhLXNsaWRlclwiKVswXTtcclxuXHRcdFx0XHQvL3ZhbCBmcm9tIHNsaWRlciBvYmplY3RcclxuXHRcdFx0XHR2YXIgc2xpZGVyX3ZhbCA9IHNsaWRlcl9vYmplY3Qubm9VaVNsaWRlci5nZXQoKTtcclxuXHJcblx0XHRcdFx0dmFsdWVzLnB1c2goZmllbGRfZm9ybWF0LmZyb20oc2xpZGVyX3ZhbFswXSkpO1xyXG5cdFx0XHRcdHZhbHVlcy5wdXNoKGZpZWxkX2Zvcm1hdC5mcm9tKHNsaWRlcl92YWxbMV0pKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRmaWVsZFZhbCA9IHZhbHVlcy5qb2luKFwiK1wiKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRmaWVsZE5hbWUgPSAkbWV0YV9yYW5nZS5hdHRyKFwiZGF0YS1zZi1maWVsZC1uYW1lXCIpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYoaW5wdXRUeXBlPT1cInJhbmdlLXJhZGlvXCIpXHJcblx0XHRcdHtcclxuXHRcdFx0XHQkZmllbGQgPSAkY29udGFpbmVyLmZpbmQoXCIuc2YtaW5wdXQtcmFuZ2UtcmFkaW9cIik7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYoJGZpZWxkLmxlbmd0aD09MClcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQvL3RoZW4gdHJ5IGFnYWluLCB3ZSBtdXN0IGJlIHVzaW5nIGEgc2luZ2xlIGZpZWxkXHJcblx0XHRcdFx0XHQkZmllbGQgPSAkY29udGFpbmVyLmZpbmQoXCI+IHVsXCIpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dmFyICRtZXRhX3JhbmdlID0gJGNvbnRhaW5lci5maW5kKFwiLnNmLW1ldGEtcmFuZ2VcIik7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Ly90aGVyZSBpcyBhbiBlbGVtZW50IHdpdGggYSBmcm9tL3RvIGNsYXNzIC0gc28gd2UgbmVlZCB0byBnZXQgdGhlIHZhbHVlcyBvZiB0aGUgZnJvbSAmIHRvIGlucHV0IGZpZWxkcyBzZXBlcmF0ZWx5XHJcblx0XHRcdFx0aWYoJGZpZWxkLmxlbmd0aD4wKVxyXG5cdFx0XHRcdHtcdFxyXG5cdFx0XHRcdFx0dmFyIGZpZWxkX3ZhbHMgPSBbXTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0JGZpZWxkLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdHZhciAkcmFkaW9zID0gJCh0aGlzKS5maW5kKFwiLnNmLWlucHV0LXJhZGlvXCIpO1xyXG5cdFx0XHRcdFx0XHRmaWVsZF92YWxzLnB1c2goc2VsZi5nZXRNZXRhUmFkaW9WYWwoJHJhZGlvcykpO1xyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQvL3ByZXZlbnQgc2Vjb25kIG51bWJlciBmcm9tIGJlaW5nIGxvd2VyIHRoYW4gdGhlIGZpcnN0XHJcblx0XHRcdFx0XHRpZihmaWVsZF92YWxzLmxlbmd0aD09MilcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0aWYoTnVtYmVyKGZpZWxkX3ZhbHNbMV0pPE51bWJlcihmaWVsZF92YWxzWzBdKSlcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdGZpZWxkX3ZhbHNbMV0gPSBmaWVsZF92YWxzWzBdO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGZpZWxkVmFsID0gZmllbGRfdmFscy5qb2luKFwiK1wiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRpZigkZmllbGQubGVuZ3RoPT0xKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGZpZWxkTmFtZSA9ICRmaWVsZC5maW5kKFwiLnNmLWlucHV0LXJhZGlvXCIpLmF0dHIoXCJuYW1lXCIpLnJlcGxhY2UoJ1tdJywgJycpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0ZmllbGROYW1lID0gJG1ldGFfcmFuZ2UuYXR0cihcImRhdGEtc2YtZmllbGQtbmFtZVwiKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYoaW5wdXRUeXBlPT1cInJhbmdlLXNlbGVjdFwiKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0JGZpZWxkID0gJGNvbnRhaW5lci5maW5kKFwiLnNmLWlucHV0LXNlbGVjdFwiKTtcclxuXHRcdFx0XHR2YXIgJG1ldGFfcmFuZ2UgPSAkY29udGFpbmVyLmZpbmQoXCIuc2YtbWV0YS1yYW5nZVwiKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHQvL3RoZXJlIGlzIGFuIGVsZW1lbnQgd2l0aCBhIGZyb20vdG8gY2xhc3MgLSBzbyB3ZSBuZWVkIHRvIGdldCB0aGUgdmFsdWVzIG9mIHRoZSBmcm9tICYgdG8gaW5wdXQgZmllbGRzIHNlcGVyYXRlbHlcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZigkZmllbGQubGVuZ3RoPjApXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dmFyIGZpZWxkX3ZhbHMgPSBbXTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0JGZpZWxkLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XHJcblx0XHRcdFx0XHRcdGZpZWxkX3ZhbHMucHVzaChzZWxmLmdldE1ldGFTZWxlY3RWYWwoJHRoaXMpKTtcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0Ly9wcmV2ZW50IHNlY29uZCBudW1iZXIgZnJvbSBiZWluZyBsb3dlciB0aGFuIHRoZSBmaXJzdFxyXG5cdFx0XHRcdFx0aWYoZmllbGRfdmFscy5sZW5ndGg9PTIpXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdGlmKE51bWJlcihmaWVsZF92YWxzWzFdKTxOdW1iZXIoZmllbGRfdmFsc1swXSkpXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRmaWVsZF92YWxzWzFdID0gZmllbGRfdmFsc1swXTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGZpZWxkVmFsID0gZmllbGRfdmFscy5qb2luKFwiK1wiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRpZigkZmllbGQubGVuZ3RoPT0xKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGZpZWxkTmFtZSA9ICRmaWVsZC5hdHRyKFwibmFtZVwiKS5yZXBsYWNlKCdbXScsICcnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGZpZWxkTmFtZSA9ICRtZXRhX3JhbmdlLmF0dHIoXCJkYXRhLXNmLWZpZWxkLW5hbWVcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYoaW5wdXRUeXBlPT1cInJhbmdlLWNoZWNrYm94XCIpXHJcblx0XHRcdHtcclxuXHRcdFx0XHQkZmllbGQgPSAkY29udGFpbmVyLmZpbmQoXCJ1bCA+IGxpIGlucHV0OmNoZWNrYm94XCIpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmKCRmaWVsZC5sZW5ndGg+MClcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRmaWVsZFZhbCA9IHNlbGYuZ2V0Q2hlY2tib3hWYWwoJGZpZWxkLCBcImFuZFwiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdGlmKGZpZWxkTmFtZT09XCJcIilcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGZpZWxkTmFtZSA9ICRmaWVsZC5hdHRyKFwibmFtZVwiKS5yZXBsYWNlKCdbXScsICcnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZihtZXRhVHlwZT09XCJjaG9pY2VcIilcclxuXHRcdHtcclxuXHRcdFx0aWYoaW5wdXRUeXBlPT1cInNlbGVjdFwiKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0JGZpZWxkID0gJGNvbnRhaW5lci5maW5kKFwic2VsZWN0XCIpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGZpZWxkVmFsID0gc2VsZi5nZXRNZXRhU2VsZWN0VmFsKCRmaWVsZCk7IFxyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYoaW5wdXRUeXBlPT1cIm11bHRpc2VsZWN0XCIpXHJcblx0XHRcdHtcclxuXHRcdFx0XHQkZmllbGQgPSAkY29udGFpbmVyLmZpbmQoXCJzZWxlY3RcIik7XHJcblx0XHRcdFx0dmFyIG9wZXJhdG9yID0gJGZpZWxkLmF0dHIoXCJkYXRhLW9wZXJhdG9yXCIpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGZpZWxkVmFsID0gc2VsZi5nZXRNZXRhTXVsdGlTZWxlY3RWYWwoJGZpZWxkLCBvcGVyYXRvcik7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZihpbnB1dFR5cGU9PVwiY2hlY2tib3hcIilcclxuXHRcdFx0e1xyXG5cdFx0XHRcdCRmaWVsZCA9ICRjb250YWluZXIuZmluZChcInVsID4gbGkgaW5wdXQ6Y2hlY2tib3hcIik7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYoJGZpZWxkLmxlbmd0aD4wKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHZhciBvcGVyYXRvciA9ICRjb250YWluZXIuZmluZChcIj4gdWxcIikuYXR0cihcImRhdGEtb3BlcmF0b3JcIik7XHJcblx0XHRcdFx0XHRmaWVsZFZhbCA9IHNlbGYuZ2V0TWV0YUNoZWNrYm94VmFsKCRmaWVsZCwgb3BlcmF0b3IpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmKGlucHV0VHlwZT09XCJyYWRpb1wiKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0JGZpZWxkID0gJGNvbnRhaW5lci5maW5kKFwidWwgPiBsaSBpbnB1dDpyYWRpb1wiKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZigkZmllbGQubGVuZ3RoPjApXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0ZmllbGRWYWwgPSBzZWxmLmdldE1ldGFSYWRpb1ZhbCgkZmllbGQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0ZmllbGRWYWwgPSBlbmNvZGVVUklDb21wb25lbnQoZmllbGRWYWwpO1xyXG5cdFx0XHRpZih0eXBlb2YoJGZpZWxkKSE9PVwidW5kZWZpbmVkXCIpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRpZigkZmllbGQubGVuZ3RoPjApXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0ZmllbGROYW1lID0gJGZpZWxkLmF0dHIoXCJuYW1lXCIpLnJlcGxhY2UoJ1tdJywgJycpO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQvL2ZvciB0aG9zZSB3aG8gaW5zaXN0IG9uIHVzaW5nICYgYW1wZXJzYW5kcyBpbiB0aGUgbmFtZSBvZiB0aGUgY3VzdG9tIGZpZWxkICghKVxyXG5cdFx0XHRcdFx0ZmllbGROYW1lID0gKGZpZWxkTmFtZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZihtZXRhVHlwZT09XCJkYXRlXCIpXHJcblx0XHR7XHJcblx0XHRcdHNlbGYucHJvY2Vzc1Bvc3REYXRlKCRjb250YWluZXIpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZih0eXBlb2YoZmllbGRWYWwpIT1cInVuZGVmaW5lZFwiKVxyXG5cdFx0e1xyXG5cdFx0XHRpZihmaWVsZFZhbCE9XCJcIilcclxuXHRcdFx0e1xyXG5cdFx0XHRcdC8vc2VsZi51cmxfY29tcG9uZW50cyArPSBcIiZcIitlbmNvZGVVUklDb21wb25lbnQoZmllbGROYW1lKStcIj1cIisoZmllbGRWYWwpO1xyXG5cdFx0XHRcdHNlbGYudXJsX3BhcmFtc1tlbmNvZGVVUklDb21wb25lbnQoZmllbGROYW1lKV0gPSAoZmllbGRWYWwpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHRwcm9jZXNzUG9zdERhdGU6IGZ1bmN0aW9uKCRjb250YWluZXIpXHJcblx0e1xyXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0XHJcblx0XHR2YXIgZmllbGRUeXBlID0gJGNvbnRhaW5lci5hdHRyKFwiZGF0YS1zZi1maWVsZC10eXBlXCIpO1xyXG5cdFx0dmFyIGlucHV0VHlwZSA9ICRjb250YWluZXIuYXR0cihcImRhdGEtc2YtZmllbGQtaW5wdXQtdHlwZVwiKTtcclxuXHRcdFxyXG5cdFx0dmFyICRmaWVsZDtcclxuXHRcdHZhciBmaWVsZE5hbWUgPSBcIlwiO1xyXG5cdFx0dmFyIGZpZWxkVmFsID0gXCJcIjtcclxuXHRcdFxyXG5cdFx0JGZpZWxkID0gJGNvbnRhaW5lci5maW5kKFwidWwgPiBsaSBpbnB1dDp0ZXh0XCIpO1xyXG5cdFx0ZmllbGROYW1lID0gJGZpZWxkLmF0dHIoXCJuYW1lXCIpLnJlcGxhY2UoJ1tdJywgJycpO1xyXG5cdFx0XHJcblx0XHR2YXIgZGF0ZXMgPSBbXTtcclxuXHRcdCRmaWVsZC5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFxyXG5cdFx0XHRkYXRlcy5wdXNoKCQodGhpcykudmFsKCkpO1xyXG5cdFx0XHJcblx0XHR9KTtcclxuXHRcdFxyXG5cdFx0aWYoJGZpZWxkLmxlbmd0aD09MilcclxuXHRcdHtcclxuXHRcdFx0aWYoKGRhdGVzWzBdIT1cIlwiKXx8KGRhdGVzWzFdIT1cIlwiKSlcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGZpZWxkVmFsID0gZGF0ZXMuam9pbihcIitcIik7XHJcblx0XHRcdFx0ZmllbGRWYWwgPSBmaWVsZFZhbC5yZXBsYWNlKC9cXC8vZywnJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoJGZpZWxkLmxlbmd0aD09MSlcclxuXHRcdHtcclxuXHRcdFx0aWYoZGF0ZXNbMF0hPVwiXCIpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRmaWVsZFZhbCA9IGRhdGVzLmpvaW4oXCIrXCIpO1xyXG5cdFx0XHRcdGZpZWxkVmFsID0gZmllbGRWYWwucmVwbGFjZSgvXFwvL2csJycpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGlmKHR5cGVvZihmaWVsZFZhbCkhPVwidW5kZWZpbmVkXCIpXHJcblx0XHR7XHJcblx0XHRcdGlmKGZpZWxkVmFsIT1cIlwiKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0dmFyIGZpZWxkU2x1ZyA9IFwiXCI7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYoZmllbGROYW1lPT1cIl9zZl9wb3N0X2RhdGVcIilcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRmaWVsZFNsdWcgPSBcInBvc3RfZGF0ZVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0ZmllbGRTbHVnID0gZmllbGROYW1lO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZihmaWVsZFNsdWchPVwiXCIpXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0Ly9zZWxmLnVybF9jb21wb25lbnRzICs9IFwiJlwiK2ZpZWxkU2x1ZytcIj1cIitmaWVsZFZhbDtcclxuXHRcdFx0XHRcdHNlbGYudXJsX3BhcmFtc1tmaWVsZFNsdWddID0gZmllbGRWYWw7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRcclxuXHR9LFxyXG5cdHByb2Nlc3NUYXhvbm9teTogZnVuY3Rpb24oJGNvbnRhaW5lciwgcmV0dXJuX29iamVjdClcclxuXHR7XHJcbiAgICAgICAgaWYodHlwZW9mKHJldHVybl9vYmplY3QpPT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuX29iamVjdCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcblx0XHQvL2lmKClcdFx0XHRcdFx0XHJcblx0XHQvL3ZhciBmaWVsZE5hbWUgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXNmLWZpZWxkLW5hbWVcIik7XHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHJcblx0XHR2YXIgZmllbGRUeXBlID0gJGNvbnRhaW5lci5hdHRyKFwiZGF0YS1zZi1maWVsZC10eXBlXCIpO1xyXG5cdFx0dmFyIGlucHV0VHlwZSA9ICRjb250YWluZXIuYXR0cihcImRhdGEtc2YtZmllbGQtaW5wdXQtdHlwZVwiKTtcclxuXHRcdFxyXG5cdFx0dmFyICRmaWVsZDtcclxuXHRcdHZhciBmaWVsZE5hbWUgPSBcIlwiO1xyXG5cdFx0dmFyIGZpZWxkVmFsID0gXCJcIjtcclxuXHRcdFxyXG5cdFx0aWYoaW5wdXRUeXBlPT1cInNlbGVjdFwiKVxyXG5cdFx0e1xyXG5cdFx0XHQkZmllbGQgPSAkY29udGFpbmVyLmZpbmQoXCJzZWxlY3RcIik7XHJcblx0XHRcdGZpZWxkTmFtZSA9ICRmaWVsZC5hdHRyKFwibmFtZVwiKS5yZXBsYWNlKCdbXScsICcnKTtcclxuXHRcdFx0XHJcblx0XHRcdGZpZWxkVmFsID0gc2VsZi5nZXRTZWxlY3RWYWwoJGZpZWxkKTsgXHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKGlucHV0VHlwZT09XCJtdWx0aXNlbGVjdFwiKVxyXG5cdFx0e1xyXG5cdFx0XHQkZmllbGQgPSAkY29udGFpbmVyLmZpbmQoXCJzZWxlY3RcIik7XHJcblx0XHRcdGZpZWxkTmFtZSA9ICRmaWVsZC5hdHRyKFwibmFtZVwiKS5yZXBsYWNlKCdbXScsICcnKTtcclxuXHRcdFx0dmFyIG9wZXJhdG9yID0gJGZpZWxkLmF0dHIoXCJkYXRhLW9wZXJhdG9yXCIpO1xyXG5cdFx0XHRcclxuXHRcdFx0ZmllbGRWYWwgPSBzZWxmLmdldE11bHRpU2VsZWN0VmFsKCRmaWVsZCwgb3BlcmF0b3IpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZihpbnB1dFR5cGU9PVwiY2hlY2tib3hcIilcclxuXHRcdHtcclxuXHRcdFx0JGZpZWxkID0gJGNvbnRhaW5lci5maW5kKFwidWwgPiBsaSBpbnB1dDpjaGVja2JveFwiKTtcclxuXHRcdFx0aWYoJGZpZWxkLmxlbmd0aD4wKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0ZmllbGROYW1lID0gJGZpZWxkLmF0dHIoXCJuYW1lXCIpLnJlcGxhY2UoJ1tdJywgJycpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdHZhciBvcGVyYXRvciA9ICRjb250YWluZXIuZmluZChcIj4gdWxcIikuYXR0cihcImRhdGEtb3BlcmF0b3JcIik7XHJcblx0XHRcdFx0ZmllbGRWYWwgPSBzZWxmLmdldENoZWNrYm94VmFsKCRmaWVsZCwgb3BlcmF0b3IpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKGlucHV0VHlwZT09XCJyYWRpb1wiKVxyXG5cdFx0e1xyXG5cdFx0XHQkZmllbGQgPSAkY29udGFpbmVyLmZpbmQoXCJ1bCA+IGxpIGlucHV0OnJhZGlvXCIpO1xyXG5cdFx0XHRpZigkZmllbGQubGVuZ3RoPjApXHJcblx0XHRcdHtcclxuXHRcdFx0XHRmaWVsZE5hbWUgPSAkZmllbGQuYXR0cihcIm5hbWVcIikucmVwbGFjZSgnW10nLCAnJyk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0ZmllbGRWYWwgPSBzZWxmLmdldFJhZGlvVmFsKCRmaWVsZCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYodHlwZW9mKGZpZWxkVmFsKSE9XCJ1bmRlZmluZWRcIilcclxuXHRcdHtcclxuXHRcdFx0aWYoZmllbGRWYWwhPVwiXCIpXHJcblx0XHRcdHtcclxuICAgICAgICAgICAgICAgIGlmKHJldHVybl9vYmplY3Q9PXRydWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtuYW1lOiBmaWVsZE5hbWUsIHZhbHVlOiBmaWVsZFZhbH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZWxmLnVybF9jb21wb25lbnRzICs9IFwiJlwiK2ZpZWxkTmFtZStcIj1cIitmaWVsZFZhbDtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnVybF9wYXJhbXNbZmllbGROYW1lXSA9IGZpZWxkVmFsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuICAgICAgICBpZihyZXR1cm5fb2JqZWN0PT10cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHR9XHJcbn07XG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluTnlZeTl3ZFdKc2FXTXZZWE56WlhSekwycHpMMmx1WTJ4MVpHVnpMM0J5YjJObGMzTmZabTl5YlM1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJJaXdpWm1sc1pTSTZJbWRsYm1WeVlYUmxaQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lKY2NseHVkbUZ5SUNRZ1BTQW9kSGx3Wlc5bUlIZHBibVJ2ZHlBaFBUMGdYQ0oxYm1SbFptbHVaV1JjSWlBL0lIZHBibVJ2ZDFzbmFsRjFaWEo1SjEwZ09pQjBlWEJsYjJZZ1oyeHZZbUZzSUNFOVBTQmNJblZ1WkdWbWFXNWxaRndpSUQ4Z1oyeHZZbUZzV3lkcVVYVmxjbmtuWFNBNklHNTFiR3dwTzF4eVhHNWNjbHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0I3WEhKY2JseHlYRzVjZEhSaGVHOXViMjE1WDJGeVkyaHBkbVZ6T2lBd0xGeHlYRzRnSUNBZ2RYSnNYM0JoY21GdGN6b2dlMzBzWEhKY2JpQWdJQ0IwWVhoZllYSmphR2wyWlY5eVpYTjFiSFJ6WDNWeWJEb2dYQ0pjSWl4Y2NseHVJQ0FnSUdGamRHbDJaVjkwWVhnNklGd2lYQ0lzWEhKY2JpQWdJQ0JtYVdWc1pITTZJSHQ5TEZ4eVhHNWNkR2x1YVhRNklHWjFibU4wYVc5dUtIUmhlRzl1YjIxNVgyRnlZMmhwZG1WekxDQmpkWEp5Wlc1MFgzUmhlRzl1YjIxNVgyRnlZMmhwZG1VcGUxeHlYRzVjY2x4dUlDQWdJQ0FnSUNCMGFHbHpMblJoZUc5dWIyMTVYMkZ5WTJocGRtVnpJRDBnTUR0Y2NseHVJQ0FnSUNBZ0lDQjBhR2x6TG5WeWJGOXdZWEpoYlhNZ1BTQjdmVHRjY2x4dUlDQWdJQ0FnSUNCMGFHbHpMblJoZUY5aGNtTm9hWFpsWDNKbGMzVnNkSE5mZFhKc0lEMGdYQ0pjSWp0Y2NseHVJQ0FnSUNBZ0lDQjBhR2x6TG1GamRHbDJaVjkwWVhnZ1BTQmNJbHdpTzF4eVhHNWNjbHh1WEhSY2RDOHZkR2hwY3k0a1ptbGxiR1J6SUQwZ0pHWnBaV3hrY3p0Y2NseHVJQ0FnSUNBZ0lDQjBhR2x6TG5SaGVHOXViMjE1WDJGeVkyaHBkbVZ6SUQwZ2RHRjRiMjV2YlhsZllYSmphR2wyWlhNN1hISmNiaUFnSUNBZ0lDQWdkR2hwY3k1amRYSnlaVzUwWDNSaGVHOXViMjE1WDJGeVkyaHBkbVVnUFNCamRYSnlaVzUwWDNSaGVHOXViMjE1WDJGeVkyaHBkbVU3WEhKY2JseHlYRzVjZEZ4MGRHaHBjeTVqYkdWaGNsVnliRU52YlhCdmJtVnVkSE1vS1R0Y2NseHVYSEpjYmx4MGZTeGNjbHh1SUNBZ0lITmxkRlJoZUVGeVkyaHBkbVZTWlhOMWJIUnpWWEpzT2lCbWRXNWpkR2x2Ymlna1ptOXliU3dnWTNWeWNtVnVkRjl5WlhOMWJIUnpYM1Z5YkN3Z1oyVjBYMkZqZEdsMlpTa2dlMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQjJZWElnYzJWc1ppQTlJSFJvYVhNN1hISmNibHh5WEc0Z0lDQWdJQ0FnSUM4dmRtRnlJR04xY25KbGJuUmZjbVZ6ZFd4MGMxOTFjbXdnUFNCY0lsd2lPMXh5WEc0Z0lDQWdJQ0FnSUdsbUtIUm9hWE11ZEdGNGIyNXZiWGxmWVhKamFHbDJaWE1oUFRFcFhISmNiaUFnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200N1hISmNiaUFnSUNBZ0lDQWdmVnh5WEc1Y2NseHVJQ0FnSUNBZ0lDQnBaaWgwZVhCbGIyWW9aMlYwWDJGamRHbDJaU2s5UFZ3aWRXNWtaV1pwYm1Wa1hDSXBYSEpjYmx4MFhIUjdYSEpjYmx4MFhIUmNkSFpoY2lCblpYUmZZV04wYVhabElEMGdabUZzYzJVN1hISmNibHgwWEhSOVhISmNibHh5WEc0Z0lDQWdJQ0FnSUM4dlkyaGxZMnNnZEc4Z2MyVmxJR2xtSUhkbElHaGhkbVVnWVc1NUlIUmhlRzl1YjIxcFpYTWdjMlZzWldOMFpXUmNjbHh1SUNBZ0lDQWdJQ0F2TDJsbUlITnZMQ0JqYUdWamF5QjBhR1ZwY2lCeVpYZHlhWFJsY3lCaGJtUWdkWE5sSUhSb2IzTmxJR0Z6SUhSb1pTQnlaWE4xYkhSeklIVnliRnh5WEc0Z0lDQWdJQ0FnSUhaaGNpQWtabWxsYkdRZ1BTQm1ZV3h6WlR0Y2NseHVJQ0FnSUNBZ0lDQjJZWElnWm1sbGJHUmZibUZ0WlNBOUlGd2lYQ0k3WEhKY2JpQWdJQ0FnSUNBZ2RtRnlJR1pwWld4a1gzWmhiSFZsSUQwZ1hDSmNJanRjY2x4dVhISmNiaUFnSUNBZ0lDQWdkbUZ5SUNSaFkzUnBkbVZmZEdGNGIyNXZiWGtnUFNBa1ptOXliUzRrWm1sbGJHUnpMbkJoY21WdWRDZ3BMbVpwYm1Rb1hDSmJaR0YwWVMxelppMTBZWGh2Ym05dGVTMWhjbU5vYVhabFBTY3hKMTFjSWlrN1hISmNiaUFnSUNBZ0lDQWdhV1lvSkdGamRHbDJaVjkwWVhodmJtOXRlUzVzWlc1bmRHZzlQVEVwWEhKY2JpQWdJQ0FnSUNBZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBa1ptbGxiR1FnUFNBa1lXTjBhWFpsWDNSaGVHOXViMjE1TzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJR1pwWld4a1ZIbHdaU0E5SUNSbWFXVnNaQzVoZEhSeUtGd2laR0YwWVMxelppMW1hV1ZzWkMxMGVYQmxYQ0lwTzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLQ2htYVdWc1pGUjVjR1VnUFQwZ1hDSjBZV2RjSWlrZ2ZId2dLR1pwWld4a1ZIbHdaU0E5UFNCY0ltTmhkR1ZuYjNKNVhDSXBJSHg4SUNobWFXVnNaRlI1Y0dVZ1BUMGdYQ0owWVhodmJtOXRlVndpS1NrZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUhSaGVHOXViMjE1WDNaaGJIVmxJRDBnYzJWc1ppNXdjbTlqWlhOelZHRjRiMjV2Ylhrb0pHWnBaV3hrTENCMGNuVmxLVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdacFpXeGtYMjVoYldVZ1BTQWtabWxsYkdRdVlYUjBjaWhjSW1SaGRHRXRjMll0Wm1sbGJHUXRibUZ0WlZ3aUtUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCMFlYaHZibTl0ZVY5dVlXMWxJRDBnWm1sbGJHUmZibUZ0WlM1eVpYQnNZV05sS0Z3aVgzTm1kRjljSWl3Z1hDSmNJaWs3WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lnS0hSaGVHOXViMjE1WDNaaGJIVmxLU0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdabWxsYkdSZmRtRnNkV1VnUFNCMFlYaHZibTl0ZVY5MllXeDFaUzUyWVd4MVpUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZb1ptbGxiR1JmZG1Gc2RXVTlQVndpWENJcFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUm1hV1ZzWkNBOUlHWmhiSE5sTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEhKY2JpQWdJQ0FnSUNBZ2ZWeHlYRzVjY2x4dUlDQWdJQ0FnSUNCcFppZ29jMlZzWmk1amRYSnlaVzUwWDNSaGVHOXViMjE1WDJGeVkyaHBkbVVoUFZ3aVhDSXBKaVlvYzJWc1ppNWpkWEp5Wlc1MFgzUmhlRzl1YjIxNVgyRnlZMmhwZG1VaFBYUmhlRzl1YjIxNVgyNWhiV1VwS1Z4eVhHNGdJQ0FnSUNBZ0lIdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdWRHRjRYMkZ5WTJocGRtVmZjbVZ6ZFd4MGMxOTFjbXdnUFNCamRYSnlaVzUwWDNKbGMzVnNkSE5mZFhKc08xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTQ3WEhKY2JpQWdJQ0FnSUNBZ2ZWeHlYRzVjY2x4dUlDQWdJQ0FnSUNCcFppZ29LR1pwWld4a1gzWmhiSFZsUFQxY0lsd2lLWHg4S0NFa1ptbGxiR1FwSUNrcFhISmNiaUFnSUNBZ0lDQWdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWtabTl5YlM0a1ptbGxiR1J6TG1WaFkyZ29ablZ1WTNScGIyNGdLQ2tnZTF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtSUNnaEpHWnBaV3hrS1NCN1hISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJtYVdWc1pGUjVjR1VnUFNBa0tIUm9hWE1wTG1GMGRISW9YQ0prWVhSaExYTm1MV1pwWld4a0xYUjVjR1ZjSWlrN1hISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2dvWm1sbGJHUlVlWEJsSUQwOUlGd2lkR0ZuWENJcElIeDhJQ2htYVdWc1pGUjVjR1VnUFQwZ1hDSmpZWFJsWjI5eWVWd2lLU0I4ZkNBb1ptbGxiR1JVZVhCbElEMDlJRndpZEdGNGIyNXZiWGxjSWlrcElIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUhSaGVHOXViMjE1WDNaaGJIVmxJRDBnYzJWc1ppNXdjbTlqWlhOelZHRjRiMjV2Ylhrb0pDaDBhR2x6S1N3Z2RISjFaU2s3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdacFpXeGtYMjVoYldVZ1BTQWtLSFJvYVhNcExtRjBkSElvWENKa1lYUmhMWE5tTFdacFpXeGtMVzVoYldWY0lpazdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppQW9kR0Y0YjI1dmJYbGZkbUZzZFdVcElIdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQm1hV1ZzWkY5MllXeDFaU0E5SUhSaGVHOXViMjE1WDNaaGJIVmxMblpoYkhWbE8xeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2htYVdWc1pGOTJZV3gxWlNBaFBTQmNJbHdpS1NCN1hISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ1JtYVdWc1pDQTlJQ1FvZEdocGN5azdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOVhISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0I5S1R0Y2NseHVJQ0FnSUNBZ0lDQjlYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lHbG1LQ0FvSkdacFpXeGtLU0FtSmlBb1ptbGxiR1JmZG1Gc2RXVWdJVDBnWENKY0lpQXBLU0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQzh2YVdZZ2QyVWdabTkxYm1RZ1lTQm1hV1ZzWkZ4eVhHNWNkRngwWEhSMllYSWdjbVYzY21sMFpWOWhkSFJ5SUQwZ0tDUm1hV1ZzWkM1aGRIUnlLRndpWkdGMFlTMXpaaTEwWlhKdExYSmxkM0pwZEdWY0lpa3BPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZb2NtVjNjbWwwWlY5aGRIUnlJVDFjSWx3aUtTQjdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJSEpsZDNKcGRHVWdQU0JLVTA5T0xuQmhjbk5sS0hKbGQzSnBkR1ZmWVhSMGNpazdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ2FXNXdkWFJmZEhsd1pTQTlJQ1JtYVdWc1pDNWhkSFJ5S0Z3aVpHRjBZUzF6WmkxbWFXVnNaQzFwYm5CMWRDMTBlWEJsWENJcE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjMlZzWmk1aFkzUnBkbVZmZEdGNElEMGdabWxsYkdSZmJtRnRaVHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXZMMlpwYm1RZ2RHaGxJR0ZqZEdsMlpTQmxiR1Z0Wlc1MFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnBaaUFvS0dsdWNIVjBYM1I1Y0dVZ1BUMGdYQ0p5WVdScGIxd2lLU0I4ZkNBb2FXNXdkWFJmZEhsd1pTQTlQU0JjSW1Ob1pXTnJZbTk0WENJcEtTQjdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzh2ZG1GeUlDUmhZM1JwZG1VZ1BTQWtabWxsYkdRdVptbHVaQ2hjSWk1elppMXZjSFJwYjI0dFlXTjBhWFpsWENJcE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUM4dlpYaHdiRzlrWlNCMGFHVWdkbUZzZFdWeklHbG1JSFJvWlhKbElHbHpJR0VnWkdWc2FXMWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBdkwyWnBaV3hrWDNaaGJIVmxYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCcGMxOXphVzVuYkdWZmRtRnNkV1VnUFNCMGNuVmxPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJtYVdWc1pGOTJZV3gxWlhNZ1BTQm1hV1ZzWkY5MllXeDFaUzV6Y0d4cGRDaGNJaXhjSWlrdWFtOXBiaWhjSWl0Y0lpa3VjM0JzYVhRb1hDSXJYQ0lwTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtSUNobWFXVnNaRjkyWVd4MVpYTXViR1Z1WjNSb0lENGdNU2tnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcGMxOXphVzVuYkdWZmRtRnNkV1VnUFNCbVlXeHpaVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtSUNocGMxOXphVzVuYkdWZmRtRnNkV1VwSUh0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFpoY2lBa2FXNXdkWFFnUFNBa1ptbGxiR1F1Wm1sdVpDaGNJbWx1Y0hWMFczWmhiSFZsUFNkY0lpQXJJR1pwWld4a1gzWmhiSFZsSUNzZ1hDSW5YVndpS1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJQ1JoWTNScGRtVWdQU0FrYVc1d2RYUXVjR0Z5Wlc1MEtDazdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCa1pYQjBhQ0E5SUNSaFkzUnBkbVV1WVhSMGNpaGNJbVJoZEdFdGMyWXRaR1Z3ZEdoY0lpazdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBdkwyNXZkeUJzYjI5d0lIUm9jbTkxWjJnZ2NHRnlaVzUwY3lCMGJ5Qm5jbUZpSUhSb1pXbHlJRzVoYldWelhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUIyWVd4MVpYTWdQU0J1WlhjZ1FYSnlZWGtvS1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RtRnNkV1Z6TG5CMWMyZ29abWxsYkdSZmRtRnNkV1VwTzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdabTl5SUNoMllYSWdhU0E5SUdSbGNIUm9PeUJwSUQ0Z01Ec2dhUzB0S1NCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FrWVdOMGFYWmxJRDBnSkdGamRHbDJaUzV3WVhKbGJuUW9LUzV3WVhKbGJuUW9LVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhiSFZsY3k1d2RYTm9LQ1JoWTNScGRtVXVabWx1WkNoY0ltbHVjSFYwWENJcExuWmhiQ2dwS1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZG1Gc2RXVnpMbkpsZG1WeWMyVW9LVHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDOHZaM0poWWlCMGFHVWdjbVYzY21sMFpTQm1iM0lnZEdocGN5QmtaWEIwYUZ4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMllYSWdZV04wYVhabFgzSmxkM0pwZEdVZ1BTQnlaWGR5YVhSbFcyUmxjSFJvWFR0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJSFZ5YkNBOUlHRmpkR2wyWlY5eVpYZHlhWFJsTzF4eVhHNWNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUM4dmRHaGxiaUJ0WVhBZ1puSnZiU0IwYUdVZ2NHRnlaVzUwY3lCMGJ5QjBhR1VnWkdWd2RHaGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdKQ2gyWVd4MVpYTXBMbVZoWTJnb1puVnVZM1JwYjI0Z0tHbHVaR1Y0TENCMllXeDFaU2tnZTF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhWeWJDQTlJSFZ5YkM1eVpYQnNZV05sS0Z3aVcxd2lJQ3NnYVc1a1pYZ2dLeUJjSWwxY0lpd2dkbUZzZFdVcE8xeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlNrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11ZEdGNFgyRnlZMmhwZG1WZmNtVnpkV3gwYzE5MWNtd2dQU0IxY213N1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1ZzYzJVZ2UxeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnTHk5cFppQjBhR1Z5WlNCaGNtVWdiWFZzZEdsd2JHVWdkbUZzZFdWekxGeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXZMM1JvWlc0Z2QyVWdibVZsWkNCMGJ5QmphR1ZqYXlCbWIzSWdNeUIwYUdsdVozTTZYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBdkwybG1JSFJvWlNCMllXeDFaWE1nYzJWc1pXTjBaV1FnWVhKbElHRnNiQ0JwYmlCMGFHVWdjMkZ0WlNCMGNtVmxJSFJvWlc0Z2QyVWdZMkZ1SUdSdklITnZiV1VnWTJ4bGRtVnlJSEpsZDNKcGRHVWdjM1IxWm1aY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0x5OXRaWEpuWlNCaGJHd2dkbUZzZFdWeklHbHVJSE5oYldVZ2JHVjJaV3dzSUhSb1pXNGdZMjl0WW1sdVpTQjBhR1VnYkdWMlpXeHpYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBdkwybG1JSFJvWlhrZ1lYSmxJR1p5YjIwZ1pHbG1abVZ5Wlc1MElIUnlaV1Z6SUhSb1pXNGdhblZ6ZENCamIyMWlhVzVsSUhSb1pXMGdiM0lnYW5WemRDQjFjMlVnWUdacFpXeGtYM1poYkhWbFlGeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXZLbHh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJrWlhCMGFITWdQU0J1WlhjZ1FYSnlZWGtvS1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUW9abWxsYkdSZmRtRnNkV1Z6S1M1bFlXTm9LR1oxYm1OMGFXOXVJQ2hwYm1SbGVDd2dkbUZzS1NCN1hISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlDUnBibkIxZENBOUlDUm1hV1ZzWkM1bWFXNWtLRndpYVc1d2RYUmJkbUZzZFdVOUoxd2lJQ3NnWm1sbGJHUmZkbUZzZFdVZ0t5QmNJaWRkWENJcE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUNSaFkzUnBkbVVnUFNBa2FXNXdkWFF1Y0dGeVpXNTBLQ2s3WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUdSbGNIUm9JRDBnSkdGamRHbDJaUzVoZEhSeUtGd2laR0YwWVMxelppMWtaWEIwYUZ3aUtUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzh2WkdWd2RHaHpMbkIxYzJnb1pHVndkR2dwTzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDBwT3lvdlhISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdWc2MyVWdhV1lnS0NocGJuQjFkRjkwZVhCbElEMDlJRndpYzJWc1pXTjBYQ0lwSUh4OElDaHBibkIxZEY5MGVYQmxJRDA5SUZ3aWJYVnNkR2x6Wld4bFkzUmNJaWtwSUh0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJR2x6WDNOcGJtZHNaVjkyWVd4MVpTQTlJSFJ5ZFdVN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlHWnBaV3hrWDNaaGJIVmxjeUE5SUdacFpXeGtYM1poYkhWbExuTndiR2wwS0Z3aUxGd2lLUzVxYjJsdUtGd2lLMXdpS1M1emNHeHBkQ2hjSWl0Y0lpazdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLR1pwWld4a1gzWmhiSFZsY3k1c1pXNW5kR2dnUGlBeEtTQjdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2x6WDNOcGJtZHNaVjkyWVd4MVpTQTlJR1poYkhObE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLR2x6WDNOcGJtZHNaVjkyWVd4MVpTa2dlMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJQ1JoWTNScGRtVWdQU0FrWm1sbGJHUXVabWx1WkNoY0ltOXdkR2x2Ymx0MllXeDFaVDBuWENJZ0t5Qm1hV1ZzWkY5MllXeDFaU0FySUZ3aUoxMWNJaWs3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQmtaWEIwYUNBOUlDUmhZM1JwZG1VdVlYUjBjaWhjSW1SaGRHRXRjMll0WkdWd2RHaGNJaWs3WEhKY2JseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnZG1Gc2RXVnpJRDBnYm1WM0lFRnljbUY1S0NrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhiSFZsY3k1d2RYTm9LR1pwWld4a1gzWmhiSFZsS1R0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1p2Y2lBb2RtRnlJR2tnUFNCa1pYQjBhRHNnYVNBK0lEQTdJR2t0TFNrZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSkdGamRHbDJaU0E5SUNSaFkzUnBkbVV1Y0hKbGRrRnNiQ2hjSW05d2RHbHZibHRrWVhSaExYTm1MV1JsY0hSb1BTZGNJaUFySUNocElDMGdNU2tnS3lCY0lpZGRYQ0lwTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkbUZzZFdWekxuQjFjMmdvSkdGamRHbDJaUzUyWVd3b0tTazdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhiSFZsY3k1eVpYWmxjbk5sS0NrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJoWTNScGRtVmZjbVYzY21sMFpTQTlJSEpsZDNKcGRHVmJaR1Z3ZEdoZE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnZFhKc0lEMGdZV04wYVhabFgzSmxkM0pwZEdVN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUW9kbUZzZFdWektTNWxZV05vS0daMWJtTjBhVzl1SUNocGJtUmxlQ3dnZG1Gc2RXVXBJSHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IxY213Z1BTQjFjbXd1Y21Wd2JHRmpaU2hjSWx0Y0lpQXJJR2x1WkdWNElDc2dYQ0pkWENJc0lIWmhiSFZsS1R0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDBwTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMblJoZUY5aGNtTm9hWFpsWDNKbGMzVnNkSE5mZFhKc0lEMGdkWEpzTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1WEhKY2JpQWdJQ0FnSUNBZ2ZWeHlYRzRnSUNBZ0lDQWdJQzh2ZEdocGN5NTBZWGhmWVhKamFHbDJaVjl5WlhOMWJIUnpYM1Z5YkNBOUlHTjFjbkpsYm5SZmNtVnpkV3gwYzE5MWNtdzdYSEpjYmlBZ0lDQjlMRnh5WEc0Z0lDQWdaMlYwVW1WemRXeDBjMVZ5YkRvZ1puVnVZM1JwYjI0b0pHWnZjbTBzSUdOMWNuSmxiblJmY21WemRXeDBjMTkxY213cElIdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0x5OTBhR2x6TG5ObGRGUmhlRUZ5WTJocGRtVlNaWE4xYkhSelZYSnNLQ1JtYjNKdExDQmpkWEp5Wlc1MFgzSmxjM1ZzZEhOZmRYSnNLVHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdhV1lvZEdocGN5NTBZWGhmWVhKamFHbDJaVjl5WlhOMWJIUnpYM1Z5YkQwOVhDSmNJaWxjY2x4dUlDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJqZFhKeVpXNTBYM0psYzNWc2RITmZkWEpzTzF4eVhHNGdJQ0FnSUNBZ0lIMWNjbHh1WEhKY2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUhSb2FYTXVkR0Y0WDJGeVkyaHBkbVZmY21WemRXeDBjMTkxY213N1hISmNiaUFnSUNCOUxGeHlYRzVjZEdkbGRGVnliRkJoY21GdGN6b2dablZ1WTNScGIyNG9KR1p2Y20wcGUxeHlYRzVjY2x4dVhIUmNkSFJvYVhNdVluVnBiR1JWY214RGIyMXdiMjVsYm5SektDUm1iM0p0TENCMGNuVmxLVHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdhV1lvZEdocGN5NTBZWGhmWVhKamFHbDJaVjl5WlhOMWJIUnpYM1Z5YkNFOVhDSmNJaWxjY2x4dUlDQWdJQ0FnSUNCN1hISmNibHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaWgwYUdsekxtRmpkR2wyWlY5MFlYZ2hQVndpWENJcFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJtYVdWc1pGOXVZVzFsSUQwZ2RHaHBjeTVoWTNScGRtVmZkR0Y0TzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtS0hSNWNHVnZaaWgwYUdsekxuVnliRjl3WVhKaGJYTmJabWxsYkdSZmJtRnRaVjBwSVQxY0luVnVaR1ZtYVc1bFpGd2lLVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1JsYkdWMFpTQjBhR2x6TG5WeWJGOXdZWEpoYlhOYlptbGxiR1JmYm1GdFpWMDdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dUlDQWdJQ0FnSUNCOVhISmNibHh5WEc1Y2RGeDBjbVYwZFhKdUlIUm9hWE11ZFhKc1gzQmhjbUZ0Y3p0Y2NseHVYSFI5TEZ4eVhHNWNkR05zWldGeVZYSnNRMjl0Y0c5dVpXNTBjem9nWm5WdVkzUnBiMjRvS1h0Y2NseHVYSFJjZEM4dmRHaHBjeTUxY214ZlkyOXRjRzl1Wlc1MGN5QTlJRndpWENJN1hISmNibHgwWEhSMGFHbHpMblZ5YkY5d1lYSmhiWE1nUFNCN2ZUdGNjbHh1WEhSOUxGeHlYRzVjZEdScGMyRmliR1ZKYm5CMWRITTZJR1oxYm1OMGFXOXVLQ1JtYjNKdEtYdGNjbHh1WEhSY2RIWmhjaUJ6Wld4bUlEMGdkR2hwY3p0Y2NseHVYSFJjZEZ4eVhHNWNkRngwSkdadmNtMHVKR1pwWld4a2N5NWxZV05vS0daMWJtTjBhVzl1S0NsN1hISmNibHgwWEhSY2RGeHlYRzVjZEZ4MFhIUjJZWElnSkdsdWNIVjBjeUE5SUNRb2RHaHBjeWt1Wm1sdVpDaGNJbWx1Y0hWMExDQnpaV3hsWTNRc0lDNXRaWFJoTFhOc2FXUmxjbHdpS1R0Y2NseHVYSFJjZEZ4MEpHbHVjSFYwY3k1aGRIUnlLRndpWkdsellXSnNaV1JjSWl3Z1hDSmthWE5oWW14bFpGd2lLVHRjY2x4dVhIUmNkRngwSkdsdWNIVjBjeTVoZEhSeUtGd2laR2x6WVdKc1pXUmNJaXdnZEhKMVpTazdYSEpjYmx4MFhIUmNkQ1JwYm5CMWRITXVjSEp2Y0NoY0ltUnBjMkZpYkdWa1hDSXNJSFJ5ZFdVcE8xeHlYRzVjZEZ4MFhIUWthVzV3ZFhSekxuUnlhV2RuWlhJb1hDSmphRzl6Wlc0NmRYQmtZWFJsWkZ3aUtUdGNjbHh1WEhSY2RGeDBYSEpjYmx4MFhIUjlLVHRjY2x4dVhIUmNkRnh5WEc1Y2RGeDBYSEpjYmx4MGZTeGNjbHh1WEhSbGJtRmliR1ZKYm5CMWRITTZJR1oxYm1OMGFXOXVLQ1JtYjNKdEtYdGNjbHh1WEhSY2RIWmhjaUJ6Wld4bUlEMGdkR2hwY3p0Y2NseHVYSFJjZEZ4eVhHNWNkRngwSkdadmNtMHVKR1pwWld4a2N5NWxZV05vS0daMWJtTjBhVzl1S0NsN1hISmNibHgwWEhSY2RGeHlYRzVjZEZ4MFhIUjJZWElnSkdsdWNIVjBjeUE5SUNRb2RHaHBjeWt1Wm1sdVpDaGNJbWx1Y0hWMExDQnpaV3hsWTNRc0lDNXRaWFJoTFhOc2FXUmxjbHdpS1R0Y2NseHVYSFJjZEZ4MEpHbHVjSFYwY3k1d2NtOXdLRndpWkdsellXSnNaV1JjSWl3Z2RISjFaU2s3WEhKY2JseDBYSFJjZENScGJuQjFkSE11Y21WdGIzWmxRWFIwY2loY0ltUnBjMkZpYkdWa1hDSXBPMXh5WEc1Y2RGeDBYSFFrYVc1d2RYUnpMblJ5YVdkblpYSW9YQ0pqYUc5elpXNDZkWEJrWVhSbFpGd2lLVHRjZEZ4MFhIUmNjbHh1WEhSY2RIMHBPMXh5WEc1Y2RGeDBYSEpjYmx4MFhIUmNjbHh1WEhSOUxGeHlYRzVjZEdKMWFXeGtWWEpzUTI5dGNHOXVaVzUwY3pvZ1puVnVZM1JwYjI0b0pHWnZjbTBzSUdOc1pXRnlYMk52YlhCdmJtVnVkSE1wZTF4eVhHNWNkRngwWEhKY2JseDBYSFIyWVhJZ2MyVnNaaUE5SUhSb2FYTTdYSEpjYmx4MFhIUmNjbHh1WEhSY2RHbG1LSFI1Y0dWdlppaGpiR1ZoY2w5amIyMXdiMjVsYm5SektTRTlYQ0oxYm1SbFptbHVaV1JjSWlsY2NseHVYSFJjZEh0Y2NseHVYSFJjZEZ4MGFXWW9ZMnhsWVhKZlkyOXRjRzl1Wlc1MGN6MDlkSEoxWlNsY2NseHVYSFJjZEZ4MGUxeHlYRzVjZEZ4MFhIUmNkSFJvYVhNdVkyeGxZWEpWY214RGIyMXdiMjVsYm5SektDazdYSEpjYmx4MFhIUmNkSDFjY2x4dVhIUmNkSDFjY2x4dVhIUmNkRnh5WEc1Y2RGeDBKR1p2Y20wdUpHWnBaV3hrY3k1bFlXTm9LR1oxYm1OMGFXOXVLQ2w3WEhKY2JseDBYSFJjZEZ4eVhHNWNkRngwWEhSMllYSWdabWxsYkdST1lXMWxJRDBnSkNoMGFHbHpLUzVoZEhSeUtGd2laR0YwWVMxelppMW1hV1ZzWkMxdVlXMWxYQ0lwTzF4eVhHNWNkRngwWEhSMllYSWdabWxsYkdSVWVYQmxJRDBnSkNoMGFHbHpLUzVoZEhSeUtGd2laR0YwWVMxelppMW1hV1ZzWkMxMGVYQmxYQ0lwTzF4eVhHNWNkRngwWEhSY2NseHVYSFJjZEZ4MGFXWW9abWxsYkdSVWVYQmxQVDFjSW5ObFlYSmphRndpS1Z4eVhHNWNkRngwWEhSN1hISmNibHgwWEhSY2RGeDBjMlZzWmk1d2NtOWpaWE56VTJWaGNtTm9SbWxsYkdRb0pDaDBhR2x6S1NrN1hISmNibHgwWEhSY2RIMWNjbHh1WEhSY2RGeDBaV3h6WlNCcFppZ29abWxsYkdSVWVYQmxQVDFjSW5SaFoxd2lLWHg4S0dacFpXeGtWSGx3WlQwOVhDSmpZWFJsWjI5eWVWd2lLWHg4S0dacFpXeGtWSGx3WlQwOVhDSjBZWGh2Ym05dGVWd2lLU2xjY2x4dVhIUmNkRngwZTF4eVhHNWNkRngwWEhSY2RITmxiR1l1Y0hKdlkyVnpjMVJoZUc5dWIyMTVLQ1FvZEdocGN5a3BPMXh5WEc1Y2RGeDBYSFI5WEhKY2JseDBYSFJjZEdWc2MyVWdhV1lvWm1sbGJHUlVlWEJsUFQxY0luTnZjblJmYjNKa1pYSmNJaWxjY2x4dVhIUmNkRngwZTF4eVhHNWNkRngwWEhSY2RITmxiR1l1Y0hKdlkyVnpjMU52Y25SUGNtUmxja1pwWld4a0tDUW9kR2hwY3lrcE8xeHlYRzVjZEZ4MFhIUjlYSEpjYmx4MFhIUmNkR1ZzYzJVZ2FXWW9abWxsYkdSVWVYQmxQVDFjSW5CdmMzUnpYM0JsY2w5d1lXZGxYQ0lwWEhKY2JseDBYSFJjZEh0Y2NseHVYSFJjZEZ4MFhIUnpaV3htTG5CeWIyTmxjM05TWlhOMWJIUnpVR1Z5VUdGblpVWnBaV3hrS0NRb2RHaHBjeWtwTzF4eVhHNWNkRngwWEhSOVhISmNibHgwWEhSY2RHVnNjMlVnYVdZb1ptbGxiR1JVZVhCbFBUMWNJbUYxZEdodmNsd2lLVnh5WEc1Y2RGeDBYSFI3WEhKY2JseDBYSFJjZEZ4MGMyVnNaaTV3Y205alpYTnpRWFYwYUc5eUtDUW9kR2hwY3lrcE8xeHlYRzVjZEZ4MFhIUjlYSEpjYmx4MFhIUmNkR1ZzYzJVZ2FXWW9abWxsYkdSVWVYQmxQVDFjSW5CdmMzUmZkSGx3WlZ3aUtWeHlYRzVjZEZ4MFhIUjdYSEpjYmx4MFhIUmNkRngwYzJWc1ppNXdjbTlqWlhOelVHOXpkRlI1Y0dVb0pDaDBhR2x6S1NrN1hISmNibHgwWEhSY2RIMWNjbHh1WEhSY2RGeDBaV3h6WlNCcFppaG1hV1ZzWkZSNWNHVTlQVndpY0c5emRGOWtZWFJsWENJcFhISmNibHgwWEhSY2RIdGNjbHh1WEhSY2RGeDBYSFJ6Wld4bUxuQnliMk5sYzNOUWIzTjBSR0YwWlNna0tIUm9hWE1wS1R0Y2NseHVYSFJjZEZ4MGZWeHlYRzVjZEZ4MFhIUmxiSE5sSUdsbUtHWnBaV3hrVkhsd1pUMDlYQ0p3YjNOMFgyMWxkR0ZjSWlsY2NseHVYSFJjZEZ4MGUxeHlYRzVjZEZ4MFhIUmNkSE5sYkdZdWNISnZZMlZ6YzFCdmMzUk5aWFJoS0NRb2RHaHBjeWtwTzF4eVhHNWNkRngwWEhSY2RGeHlYRzVjZEZ4MFhIUjlYSEpjYmx4MFhIUmNkR1ZzYzJWY2NseHVYSFJjZEZ4MGUxeHlYRzVjZEZ4MFhIUmNkRnh5WEc1Y2RGeDBYSFI5WEhKY2JseDBYSFJjZEZ4eVhHNWNkRngwZlNrN1hISmNibHgwWEhSY2NseHVYSFI5TEZ4eVhHNWNkSEJ5YjJObGMzTlRaV0Z5WTJoR2FXVnNaRG9nWm5WdVkzUnBiMjRvSkdOdmJuUmhhVzVsY2lsY2NseHVYSFI3WEhKY2JseDBYSFIyWVhJZ2MyVnNaaUE5SUhSb2FYTTdYSEpjYmx4MFhIUmNjbHh1WEhSY2RIWmhjaUFrWm1sbGJHUWdQU0FrWTI5dWRHRnBibVZ5TG1acGJtUW9YQ0pwYm5CMWRGdHVZVzFsWGowblgzTm1YM05sWVhKamFDZGRYQ0lwTzF4eVhHNWNkRngwWEhKY2JseDBYSFJwWmlna1ptbGxiR1F1YkdWdVozUm9QakFwWEhKY2JseDBYSFI3WEhKY2JseDBYSFJjZEhaaGNpQm1hV1ZzWkU1aGJXVWdQU0FrWm1sbGJHUXVZWFIwY2loY0ltNWhiV1ZjSWlrdWNtVndiR0ZqWlNnblcxMG5MQ0FuSnlrN1hISmNibHgwWEhSY2RIWmhjaUJtYVdWc1pGWmhiQ0E5SUNSbWFXVnNaQzUyWVd3b0tUdGNjbHh1WEhSY2RGeDBYSEpjYmx4MFhIUmNkR2xtS0dacFpXeGtWbUZzSVQxY0lsd2lLVnh5WEc1Y2RGeDBYSFI3WEhKY2JseDBYSFJjZEZ4MEx5OXpaV3htTG5WeWJGOWpiMjF3YjI1bGJuUnpJQ3M5SUZ3aUpsOXpabDl6UFZ3aUsyVnVZMjlrWlZWU1NVTnZiWEJ2Ym1WdWRDaG1hV1ZzWkZaaGJDazdYSEpjYmx4MFhIUmNkRngwYzJWc1ppNTFjbXhmY0dGeVlXMXpXeWRmYzJaZmN5ZGRJRDBnWlc1amIyUmxWVkpKUTI5dGNHOXVaVzUwS0dacFpXeGtWbUZzS1R0Y2NseHVYSFJjZEZ4MGZWeHlYRzVjZEZ4MGZWeHlYRzVjZEgwc1hISmNibHgwY0hKdlkyVnpjMU52Y25SUGNtUmxja1pwWld4a09pQm1kVzVqZEdsdmJpZ2tZMjl1ZEdGcGJtVnlLVnh5WEc1Y2RIdGNjbHh1WEhSY2RIUm9hWE11Y0hKdlkyVnpjMEYxZEdodmNpZ2tZMjl1ZEdGcGJtVnlLVHRjY2x4dVhIUmNkRnh5WEc1Y2RIMHNYSEpjYmx4MGNISnZZMlZ6YzFKbGMzVnNkSE5RWlhKUVlXZGxSbWxsYkdRNklHWjFibU4wYVc5dUtDUmpiMjUwWVdsdVpYSXBYSEpjYmx4MGUxeHlYRzVjZEZ4MGRHaHBjeTV3Y205alpYTnpRWFYwYUc5eUtDUmpiMjUwWVdsdVpYSXBPMXh5WEc1Y2RGeDBYSEpjYmx4MGZTeGNjbHh1WEhSblpYUkJZM1JwZG1WVVlYZzZJR1oxYm1OMGFXOXVLQ1JtYVdWc1pDa2dlMXh5WEc1Y2RGeDBjbVYwZFhKdUlIUm9hWE11WVdOMGFYWmxYM1JoZUR0Y2NseHVYSFI5TEZ4eVhHNWNkR2RsZEZObGJHVmpkRlpoYkRvZ1puVnVZM1JwYjI0b0pHWnBaV3hrS1h0Y2NseHVYSEpjYmx4MFhIUjJZWElnWm1sbGJHUldZV3dnUFNCY0lsd2lPMXh5WEc1Y2RGeDBYSEpjYmx4MFhIUnBaaWdrWm1sbGJHUXVkbUZzS0NraFBUQXBYSEpjYmx4MFhIUjdYSEpjYmx4MFhIUmNkR1pwWld4a1ZtRnNJRDBnSkdacFpXeGtMblpoYkNncE8xeHlYRzVjZEZ4MGZWeHlYRzVjZEZ4MFhISmNibHgwWEhScFppaG1hV1ZzWkZaaGJEMDliblZzYkNsY2NseHVYSFJjZEh0Y2NseHVYSFJjZEZ4MFptbGxiR1JXWVd3Z1BTQmNJbHdpTzF4eVhHNWNkRngwZlZ4eVhHNWNkRngwWEhKY2JseDBYSFJ5WlhSMWNtNGdabWxsYkdSV1lXdzdYSEpjYmx4MGZTeGNjbHh1WEhSblpYUk5aWFJoVTJWc1pXTjBWbUZzT2lCbWRXNWpkR2x2Ymlna1ptbGxiR1FwZTF4eVhHNWNkRngwWEhKY2JseDBYSFIyWVhJZ1ptbGxiR1JXWVd3Z1BTQmNJbHdpTzF4eVhHNWNkRngwWEhKY2JseDBYSFJtYVdWc1pGWmhiQ0E5SUNSbWFXVnNaQzUyWVd3b0tUdGNjbHh1WEhSY2RGeDBYSFJjZEZ4MFhISmNibHgwWEhScFppaG1hV1ZzWkZaaGJEMDliblZzYkNsY2NseHVYSFJjZEh0Y2NseHVYSFJjZEZ4MFptbGxiR1JXWVd3Z1BTQmNJbHdpTzF4eVhHNWNkRngwZlZ4eVhHNWNkRngwWEhKY2JseDBYSFJ5WlhSMWNtNGdabWxsYkdSV1lXdzdYSEpjYmx4MGZTeGNjbHh1WEhSblpYUk5kV3gwYVZObGJHVmpkRlpoYkRvZ1puVnVZM1JwYjI0b0pHWnBaV3hrTENCdmNHVnlZWFJ2Y2lsN1hISmNibHgwWEhSY2NseHVYSFJjZEhaaGNpQmtaV3hwYlNBOUlGd2lLMXdpTzF4eVhHNWNkRngwYVdZb2IzQmxjbUYwYjNJOVBWd2liM0pjSWlsY2NseHVYSFJjZEh0Y2NseHVYSFJjZEZ4MFpHVnNhVzBnUFNCY0lpeGNJanRjY2x4dVhIUmNkSDFjY2x4dVhIUmNkRnh5WEc1Y2RGeDBhV1lvZEhsd1pXOW1LQ1JtYVdWc1pDNTJZV3dvS1NrOVBWd2liMkpxWldOMFhDSXBYSEpjYmx4MFhIUjdYSEpjYmx4MFhIUmNkR2xtS0NSbWFXVnNaQzUyWVd3b0tTRTliblZzYkNsY2NseHVYSFJjZEZ4MGUxeHlYRzVjZEZ4MFhIUmNkSEpsZEhWeWJpQWtabWxsYkdRdWRtRnNLQ2t1YW05cGJpaGtaV3hwYlNrN1hISmNibHgwWEhSY2RIMWNjbHh1WEhSY2RIMWNjbHh1WEhSY2RGeHlYRzVjZEgwc1hISmNibHgwWjJWMFRXVjBZVTExYkhScFUyVnNaV04wVm1Gc09pQm1kVzVqZEdsdmJpZ2tabWxsYkdRc0lHOXdaWEpoZEc5eUtYdGNjbHh1WEhSY2RGeHlYRzVjZEZ4MGRtRnlJR1JsYkdsdElEMGdYQ0l0S3kxY0lqdGNjbHh1WEhSY2RHbG1LRzl3WlhKaGRHOXlQVDFjSW05eVhDSXBYSEpjYmx4MFhIUjdYSEpjYmx4MFhIUmNkR1JsYkdsdElEMGdYQ0l0TEMxY0lqdGNjbHh1WEhSY2RIMWNjbHh1WEhSY2RGeDBYSFJjY2x4dVhIUmNkR2xtS0hSNWNHVnZaaWdrWm1sbGJHUXVkbUZzS0NrcFBUMWNJbTlpYW1WamRGd2lLVnh5WEc1Y2RGeDBlMXh5WEc1Y2RGeDBYSFJwWmlna1ptbGxiR1F1ZG1Gc0tDa2hQVzUxYkd3cFhISmNibHgwWEhSY2RIdGNjbHh1WEhSY2RGeDBYSFJjY2x4dVhIUmNkRngwWEhSMllYSWdabWxsYkdSMllXd2dQU0JiWFR0Y2NseHVYSFJjZEZ4MFhIUmNjbHh1WEhSY2RGeDBYSFFrS0NSbWFXVnNaQzUyWVd3b0tTa3VaV0ZqYUNobWRXNWpkR2x2YmlocGJtUmxlQ3gyWVd4MVpTbDdYSEpjYmx4MFhIUmNkRngwWEhSY2NseHVYSFJjZEZ4MFhIUmNkR1pwWld4a2RtRnNMbkIxYzJnb0tIWmhiSFZsS1NrN1hISmNibHgwWEhSY2RGeDBmU2s3WEhKY2JseDBYSFJjZEZ4MFhISmNibHgwWEhSY2RGeDBjbVYwZFhKdUlHWnBaV3hrZG1Gc0xtcHZhVzRvWkdWc2FXMHBPMXh5WEc1Y2RGeDBYSFI5WEhKY2JseDBYSFI5WEhKY2JseDBYSFJjY2x4dVhIUmNkSEpsZEhWeWJpQmNJbHdpTzF4eVhHNWNkRngwWEhKY2JseDBmU3hjY2x4dVhIUm5aWFJEYUdWamEySnZlRlpoYkRvZ1puVnVZM1JwYjI0b0pHWnBaV3hrTENCdmNHVnlZWFJ2Y2lsN1hISmNibHgwWEhSY2NseHVYSFJjZEZ4eVhHNWNkRngwZG1GeUlHWnBaV3hrVm1Gc0lEMGdKR1pwWld4a0xtMWhjQ2htZFc1amRHbHZiaWdwZTF4eVhHNWNkRngwWEhScFppZ2tLSFJvYVhNcExuQnliM0FvWENKamFHVmphMlZrWENJcFBUMTBjblZsS1Z4eVhHNWNkRngwWEhSN1hISmNibHgwWEhSY2RGeDBjbVYwZFhKdUlDUW9kR2hwY3lrdWRtRnNLQ2s3WEhKY2JseDBYSFJjZEgxY2NseHVYSFJjZEgwcExtZGxkQ2dwTzF4eVhHNWNkRngwWEhKY2JseDBYSFIyWVhJZ1pHVnNhVzBnUFNCY0lpdGNJanRjY2x4dVhIUmNkR2xtS0c5d1pYSmhkRzl5UFQxY0ltOXlYQ0lwWEhKY2JseDBYSFI3WEhKY2JseDBYSFJjZEdSbGJHbHRJRDBnWENJc1hDSTdYSEpjYmx4MFhIUjlYSEpjYmx4MFhIUmNjbHh1WEhSY2RISmxkSFZ5YmlCbWFXVnNaRlpoYkM1cWIybHVLR1JsYkdsdEtUdGNjbHh1WEhSOUxGeHlYRzVjZEdkbGRFMWxkR0ZEYUdWamEySnZlRlpoYkRvZ1puVnVZM1JwYjI0b0pHWnBaV3hrTENCdmNHVnlZWFJ2Y2lsN1hISmNibHgwWEhSY2NseHVYSFJjZEZ4eVhHNWNkRngwZG1GeUlHWnBaV3hrVm1Gc0lEMGdKR1pwWld4a0xtMWhjQ2htZFc1amRHbHZiaWdwZTF4eVhHNWNkRngwWEhScFppZ2tLSFJvYVhNcExuQnliM0FvWENKamFHVmphMlZrWENJcFBUMTBjblZsS1Z4eVhHNWNkRngwWEhSN1hISmNibHgwWEhSY2RGeDBjbVYwZFhKdUlDZ2tLSFJvYVhNcExuWmhiQ2dwS1R0Y2NseHVYSFJjZEZ4MGZWeHlYRzVjZEZ4MGZTa3VaMlYwS0NrN1hISmNibHgwWEhSY2NseHVYSFJjZEhaaGNpQmtaV3hwYlNBOUlGd2lMU3N0WENJN1hISmNibHgwWEhScFppaHZjR1Z5WVhSdmNqMDlYQ0p2Y2x3aUtWeHlYRzVjZEZ4MGUxeHlYRzVjZEZ4MFhIUmtaV3hwYlNBOUlGd2lMU3d0WENJN1hISmNibHgwWEhSOVhISmNibHgwWEhSY2NseHVYSFJjZEhKbGRIVnliaUJtYVdWc1pGWmhiQzVxYjJsdUtHUmxiR2x0S1R0Y2NseHVYSFI5TEZ4eVhHNWNkR2RsZEZKaFpHbHZWbUZzT2lCbWRXNWpkR2x2Ymlna1ptbGxiR1FwZTF4eVhHNWNkRngwWEhSY2RGeDBYSFJjZEZ4eVhHNWNkRngwZG1GeUlHWnBaV3hrVm1Gc0lEMGdKR1pwWld4a0xtMWhjQ2htZFc1amRHbHZiaWdwWEhKY2JseDBYSFI3WEhKY2JseDBYSFJjZEdsbUtDUW9kR2hwY3lrdWNISnZjQ2hjSW1Ob1pXTnJaV1JjSWlrOVBYUnlkV1VwWEhKY2JseDBYSFJjZEh0Y2NseHVYSFJjZEZ4MFhIUnlaWFIxY200Z0pDaDBhR2x6S1M1MllXd29LVHRjY2x4dVhIUmNkRngwZlZ4eVhHNWNkRngwWEhSY2NseHVYSFJjZEgwcExtZGxkQ2dwTzF4eVhHNWNkRngwWEhKY2JseDBYSFJjY2x4dVhIUmNkR2xtS0dacFpXeGtWbUZzV3pCZElUMHdLVnh5WEc1Y2RGeDBlMXh5WEc1Y2RGeDBYSFJ5WlhSMWNtNGdabWxsYkdSV1lXeGJNRjA3WEhKY2JseDBYSFI5WEhKY2JseDBmU3hjY2x4dVhIUm5aWFJOWlhSaFVtRmthVzlXWVd3NklHWjFibU4wYVc5dUtDUm1hV1ZzWkNsN1hISmNibHgwWEhSY2RGeDBYSFJjZEZ4MFhISmNibHgwWEhSMllYSWdabWxsYkdSV1lXd2dQU0FrWm1sbGJHUXViV0Z3S0daMWJtTjBhVzl1S0NsY2NseHVYSFJjZEh0Y2NseHVYSFJjZEZ4MGFXWW9KQ2gwYUdsektTNXdjbTl3S0Z3aVkyaGxZMnRsWkZ3aUtUMDlkSEoxWlNsY2NseHVYSFJjZEZ4MGUxeHlYRzVjZEZ4MFhIUmNkSEpsZEhWeWJpQWtLSFJvYVhNcExuWmhiQ2dwTzF4eVhHNWNkRngwWEhSOVhISmNibHgwWEhSY2RGeHlYRzVjZEZ4MGZTa3VaMlYwS0NrN1hISmNibHgwWEhSY2NseHVYSFJjZEhKbGRIVnliaUJtYVdWc1pGWmhiRnN3WFR0Y2NseHVYSFI5TEZ4eVhHNWNkSEJ5YjJObGMzTkJkWFJvYjNJNklHWjFibU4wYVc5dUtDUmpiMjUwWVdsdVpYSXBYSEpjYmx4MGUxeHlYRzVjZEZ4MGRtRnlJSE5sYkdZZ1BTQjBhR2x6TzF4eVhHNWNkRngwWEhKY2JseDBYSFJjY2x4dVhIUmNkSFpoY2lCbWFXVnNaRlI1Y0dVZ1BTQWtZMjl1ZEdGcGJtVnlMbUYwZEhJb1hDSmtZWFJoTFhObUxXWnBaV3hrTFhSNWNHVmNJaWs3WEhKY2JseDBYSFIyWVhJZ2FXNXdkWFJVZVhCbElEMGdKR052Ym5SaGFXNWxjaTVoZEhSeUtGd2laR0YwWVMxelppMW1hV1ZzWkMxcGJuQjFkQzEwZVhCbFhDSXBPMXh5WEc1Y2RGeDBYSEpjYmx4MFhIUjJZWElnSkdacFpXeGtPMXh5WEc1Y2RGeDBkbUZ5SUdacFpXeGtUbUZ0WlNBOUlGd2lYQ0k3WEhKY2JseDBYSFIyWVhJZ1ptbGxiR1JXWVd3Z1BTQmNJbHdpTzF4eVhHNWNkRngwWEhKY2JseDBYSFJwWmlocGJuQjFkRlI1Y0dVOVBWd2ljMlZzWldOMFhDSXBYSEpjYmx4MFhIUjdYSEpjYmx4MFhIUmNkQ1JtYVdWc1pDQTlJQ1JqYjI1MFlXbHVaWEl1Wm1sdVpDaGNJbk5sYkdWamRGd2lLVHRjY2x4dVhIUmNkRngwWm1sbGJHUk9ZVzFsSUQwZ0pHWnBaV3hrTG1GMGRISW9YQ0p1WVcxbFhDSXBMbkpsY0d4aFkyVW9KMXRkSnl3Z0p5Y3BPMXh5WEc1Y2RGeDBYSFJjY2x4dVhIUmNkRngwWm1sbGJHUldZV3dnUFNCelpXeG1MbWRsZEZObGJHVmpkRlpoYkNna1ptbGxiR1FwT3lCY2NseHVYSFJjZEgxY2NseHVYSFJjZEdWc2MyVWdhV1lvYVc1d2RYUlVlWEJsUFQxY0ltMTFiSFJwYzJWc1pXTjBYQ0lwWEhKY2JseDBYSFI3WEhKY2JseDBYSFJjZENSbWFXVnNaQ0E5SUNSamIyNTBZV2x1WlhJdVptbHVaQ2hjSW5ObGJHVmpkRndpS1R0Y2NseHVYSFJjZEZ4MFptbGxiR1JPWVcxbElEMGdKR1pwWld4a0xtRjBkSElvWENKdVlXMWxYQ0lwTG5KbGNHeGhZMlVvSjF0ZEp5d2dKeWNwTzF4eVhHNWNkRngwWEhSMllYSWdiM0JsY21GMGIzSWdQU0FrWm1sbGJHUXVZWFIwY2loY0ltUmhkR0V0YjNCbGNtRjBiM0pjSWlrN1hISmNibHgwWEhSY2RGeHlYRzVjZEZ4MFhIUm1hV1ZzWkZaaGJDQTlJSE5sYkdZdVoyVjBUWFZzZEdsVFpXeGxZM1JXWVd3b0pHWnBaV3hrTENCY0ltOXlYQ0lwTzF4eVhHNWNkRngwWEhSY2NseHVYSFJjZEgxY2NseHVYSFJjZEdWc2MyVWdhV1lvYVc1d2RYUlVlWEJsUFQxY0ltTm9aV05yWW05NFhDSXBYSEpjYmx4MFhIUjdYSEpjYmx4MFhIUmNkQ1JtYVdWc1pDQTlJQ1JqYjI1MFlXbHVaWEl1Wm1sdVpDaGNJblZzSUQ0Z2JHa2dhVzV3ZFhRNlkyaGxZMnRpYjNoY0lpazdYSEpjYmx4MFhIUmNkRnh5WEc1Y2RGeDBYSFJwWmlna1ptbGxiR1F1YkdWdVozUm9QakFwWEhKY2JseDBYSFJjZEh0Y2NseHVYSFJjZEZ4MFhIUm1hV1ZzWkU1aGJXVWdQU0FrWm1sbGJHUXVZWFIwY2loY0ltNWhiV1ZjSWlrdWNtVndiR0ZqWlNnblcxMG5MQ0FuSnlrN1hISmNibHgwWEhSY2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhKY2JseDBYSFJjZEZ4MGRtRnlJRzl3WlhKaGRHOXlJRDBnSkdOdmJuUmhhVzVsY2k1bWFXNWtLRndpUGlCMWJGd2lLUzVoZEhSeUtGd2laR0YwWVMxdmNHVnlZWFJ2Y2x3aUtUdGNjbHh1WEhSY2RGeDBYSFJtYVdWc1pGWmhiQ0E5SUhObGJHWXVaMlYwUTJobFkydGliM2hXWVd3b0pHWnBaV3hrTENCY0ltOXlYQ0lwTzF4eVhHNWNkRngwWEhSOVhISmNibHgwWEhSY2RGeHlYRzVjZEZ4MGZWeHlYRzVjZEZ4MFpXeHpaU0JwWmlocGJuQjFkRlI1Y0dVOVBWd2ljbUZrYVc5Y0lpbGNjbHh1WEhSY2RIdGNjbHh1WEhSY2RGeDBYSEpjYmx4MFhIUmNkQ1JtYVdWc1pDQTlJQ1JqYjI1MFlXbHVaWEl1Wm1sdVpDaGNJblZzSUQ0Z2JHa2dhVzV3ZFhRNmNtRmthVzljSWlrN1hISmNibHgwWEhSY2RGeDBYSFJjZEZ4eVhHNWNkRngwWEhScFppZ2tabWxsYkdRdWJHVnVaM1JvUGpBcFhISmNibHgwWEhSY2RIdGNjbHh1WEhSY2RGeDBYSFJtYVdWc1pFNWhiV1VnUFNBa1ptbGxiR1F1WVhSMGNpaGNJbTVoYldWY0lpa3VjbVZ3YkdGalpTZ25XMTBuTENBbkp5azdYSEpjYmx4MFhIUmNkRngwWEhKY2JseDBYSFJjZEZ4MFptbGxiR1JXWVd3Z1BTQnpaV3htTG1kbGRGSmhaR2x2Vm1Gc0tDUm1hV1ZzWkNrN1hISmNibHgwWEhSY2RIMWNjbHh1WEhSY2RIMWNjbHh1WEhSY2RGeHlYRzVjZEZ4MGFXWW9kSGx3Wlc5bUtHWnBaV3hrVm1Gc0tTRTlYQ0oxYm1SbFptbHVaV1JjSWlsY2NseHVYSFJjZEh0Y2NseHVYSFJjZEZ4MGFXWW9abWxsYkdSV1lXd2hQVndpWENJcFhISmNibHgwWEhSY2RIdGNjbHh1WEhSY2RGeDBYSFIyWVhJZ1ptbGxiR1JUYkhWbklEMGdYQ0pjSWp0Y2NseHVYSFJjZEZ4MFhIUmNjbHh1WEhSY2RGeDBYSFJwWmlobWFXVnNaRTVoYldVOVBWd2lYM05tWDJGMWRHaHZjbHdpS1Z4eVhHNWNkRngwWEhSY2RIdGNjbHh1WEhSY2RGeDBYSFJjZEdacFpXeGtVMngxWnlBOUlGd2lZWFYwYUc5eWMxd2lPMXh5WEc1Y2RGeDBYSFJjZEgxY2NseHVYSFJjZEZ4MFhIUmxiSE5sSUdsbUtHWnBaV3hrVG1GdFpUMDlYQ0pmYzJaZmMyOXlkRjl2Y21SbGNsd2lLVnh5WEc1Y2RGeDBYSFJjZEh0Y2NseHVYSFJjZEZ4MFhIUmNkR1pwWld4a1UyeDFaeUE5SUZ3aWMyOXlkRjl2Y21SbGNsd2lPMXh5WEc1Y2RGeDBYSFJjZEgxY2NseHVYSFJjZEZ4MFhIUmxiSE5sSUdsbUtHWnBaV3hrVG1GdFpUMDlYQ0pmYzJaZmNIQndYQ0lwWEhKY2JseDBYSFJjZEZ4MGUxeHlYRzVjZEZ4MFhIUmNkRngwWm1sbGJHUlRiSFZuSUQwZ1hDSmZjMlpmY0hCd1hDSTdYSEpjYmx4MFhIUmNkRngwZlZ4eVhHNWNkRngwWEhSY2RHVnNjMlVnYVdZb1ptbGxiR1JPWVcxbFBUMWNJbDl6Wmw5d2IzTjBYM1I1Y0dWY0lpbGNjbHh1WEhSY2RGeDBYSFI3WEhKY2JseDBYSFJjZEZ4MFhIUm1hV1ZzWkZOc2RXY2dQU0JjSW5CdmMzUmZkSGx3WlhOY0lqdGNjbHh1WEhSY2RGeDBYSFI5WEhKY2JseDBYSFJjZEZ4MFpXeHpaVnh5WEc1Y2RGeDBYSFJjZEh0Y2NseHVYSFJjZEZ4MFhIUmNjbHh1WEhSY2RGeDBYSFI5WEhKY2JseDBYSFJjZEZ4MFhISmNibHgwWEhSY2RGeDBhV1lvWm1sbGJHUlRiSFZuSVQxY0lsd2lLVnh5WEc1Y2RGeDBYSFJjZEh0Y2NseHVYSFJjZEZ4MFhIUmNkQzh2YzJWc1ppNTFjbXhmWTI5dGNHOXVaVzUwY3lBclBTQmNJaVpjSWl0bWFXVnNaRk5zZFdjclhDSTlYQ0lyWm1sbGJHUldZV3c3WEhKY2JseDBYSFJjZEZ4MFhIUnpaV3htTG5WeWJGOXdZWEpoYlhOYlptbGxiR1JUYkhWblhTQTlJR1pwWld4a1ZtRnNPMXh5WEc1Y2RGeDBYSFJjZEgxY2NseHVYSFJjZEZ4MGZWeHlYRzVjZEZ4MGZWeHlYRzVjZEZ4MFhISmNibHgwZlN4Y2NseHVYSFJ3Y205alpYTnpVRzl6ZEZSNWNHVWdPaUJtZFc1amRHbHZiaWdrZEdocGN5bDdYSEpjYmx4MFhIUmNjbHh1WEhSY2RIUm9hWE11Y0hKdlkyVnpjMEYxZEdodmNpZ2tkR2hwY3lrN1hISmNibHgwWEhSY2NseHVYSFI5TEZ4eVhHNWNkSEJ5YjJObGMzTlFiM04wVFdWMFlUb2dablZ1WTNScGIyNG9KR052Ym5SaGFXNWxjaWxjY2x4dVhIUjdYSEpjYmx4MFhIUjJZWElnYzJWc1ppQTlJSFJvYVhNN1hISmNibHgwWEhSY2NseHVYSFJjZEhaaGNpQm1hV1ZzWkZSNWNHVWdQU0FrWTI5dWRHRnBibVZ5TG1GMGRISW9YQ0prWVhSaExYTm1MV1pwWld4a0xYUjVjR1ZjSWlrN1hISmNibHgwWEhSMllYSWdhVzV3ZFhSVWVYQmxJRDBnSkdOdmJuUmhhVzVsY2k1aGRIUnlLRndpWkdGMFlTMXpaaTFtYVdWc1pDMXBibkIxZEMxMGVYQmxYQ0lwTzF4eVhHNWNkRngwZG1GeUlHMWxkR0ZVZVhCbElEMGdKR052Ym5SaGFXNWxjaTVoZEhSeUtGd2laR0YwWVMxelppMXRaWFJoTFhSNWNHVmNJaWs3WEhKY2JseHlYRzVjZEZ4MGRtRnlJR1pwWld4a1ZtRnNJRDBnWENKY0lqdGNjbHh1WEhSY2RIWmhjaUFrWm1sbGJHUTdYSEpjYmx4MFhIUjJZWElnWm1sbGJHUk9ZVzFsSUQwZ1hDSmNJanRjY2x4dVhIUmNkRnh5WEc1Y2RGeDBhV1lvYldWMFlWUjVjR1U5UFZ3aWJuVnRZbVZ5WENJcFhISmNibHgwWEhSN1hISmNibHgwWEhSY2RHbG1LR2x1Y0hWMFZIbHdaVDA5WENKeVlXNW5aUzF1ZFcxaVpYSmNJaWxjY2x4dVhIUmNkRngwZTF4eVhHNWNkRngwWEhSY2RDUm1hV1ZzWkNBOUlDUmpiMjUwWVdsdVpYSXVabWx1WkNoY0lpNXpaaTF0WlhSaExYSmhibWRsTFc1MWJXSmxjaUJwYm5CMWRGd2lLVHRjY2x4dVhIUmNkRngwWEhSY2NseHVYSFJjZEZ4MFhIUjJZWElnZG1Gc2RXVnpJRDBnVzEwN1hISmNibHgwWEhSY2RGeDBKR1pwWld4a0xtVmhZMmdvWm5WdVkzUnBiMjRvS1h0Y2NseHVYSFJjZEZ4MFhIUmNkRnh5WEc1Y2RGeDBYSFJjZEZ4MGRtRnNkV1Z6TG5CMWMyZ29KQ2gwYUdsektTNTJZV3dvS1NrN1hISmNibHgwWEhSY2RGeDBYSEpjYmx4MFhIUmNkRngwZlNrN1hISmNibHgwWEhSY2RGeDBYSEpjYmx4MFhIUmNkRngwWm1sbGJHUldZV3dnUFNCMllXeDFaWE11YW05cGJpaGNJaXRjSWlrN1hISmNibHgwWEhSY2RGeDBYSEpjYmx4MFhIUmNkSDFjY2x4dVhIUmNkRngwWld4elpTQnBaaWhwYm5CMWRGUjVjR1U5UFZ3aWNtRnVaMlV0YzJ4cFpHVnlYQ0lwWEhKY2JseDBYSFJjZEh0Y2NseHVYSFJjZEZ4MFhIUWtabWxsYkdRZ1BTQWtZMjl1ZEdGcGJtVnlMbVpwYm1Rb1hDSXVjMll0YldWMFlTMXlZVzVuWlMxemJHbGtaWElnYVc1d2RYUmNJaWs3WEhKY2JseDBYSFJjZEZ4MFhISmNibHgwWEhSY2RGeDBMeTluWlhRZ1lXNTVJRzUxYldKbGNpQm1iM0p0WVhSMGFXNW5JSE4wZFdabVhISmNibHgwWEhSY2RGeDBkbUZ5SUNSdFpYUmhYM0poYm1kbElEMGdKR052Ym5SaGFXNWxjaTVtYVc1a0tGd2lMbk5tTFcxbGRHRXRjbUZ1WjJVdGMyeHBaR1Z5WENJcE8xeHlYRzVjZEZ4MFhIUmNkRnh5WEc1Y2RGeDBYSFJjZEhaaGNpQmtaV05wYldGc1gzQnNZV05sY3lBOUlDUnRaWFJoWDNKaGJtZGxMbUYwZEhJb1hDSmtZWFJoTFdSbFkybHRZV3d0Y0d4aFkyVnpYQ0lwTzF4eVhHNWNkRngwWEhSY2RIWmhjaUIwYUc5MWMyRnVaRjl6WlhCbGNtRjBiM0lnUFNBa2JXVjBZVjl5WVc1blpTNWhkSFJ5S0Z3aVpHRjBZUzEwYUc5MWMyRnVaQzF6WlhCbGNtRjBiM0pjSWlrN1hISmNibHgwWEhSY2RGeDBkbUZ5SUdSbFkybHRZV3hmYzJWd1pYSmhkRzl5SUQwZ0pHMWxkR0ZmY21GdVoyVXVZWFIwY2loY0ltUmhkR0V0WkdWamFXMWhiQzF6WlhCbGNtRjBiM0pjSWlrN1hISmNibHh5WEc1Y2RGeDBYSFJjZEhaaGNpQm1hV1ZzWkY5bWIzSnRZWFFnUFNCM1RuVnRZaWg3WEhKY2JseDBYSFJjZEZ4MFhIUnRZWEpyT2lCa1pXTnBiV0ZzWDNObGNHVnlZWFJ2Y2l4Y2NseHVYSFJjZEZ4MFhIUmNkR1JsWTJsdFlXeHpPaUJ3WVhKelpVWnNiMkYwS0dSbFkybHRZV3hmY0d4aFkyVnpLU3hjY2x4dVhIUmNkRngwWEhSY2RIUm9iM1Z6WVc1a09pQjBhRzkxYzJGdVpGOXpaWEJsY21GMGIzSmNjbHh1WEhSY2RGeDBYSFI5S1R0Y2NseHVYSFJjZEZ4MFhIUmNjbHh1WEhSY2RGeDBYSFIyWVhJZ2RtRnNkV1Z6SUQwZ1cxMDdYSEpjYmx4eVhHNWNjbHh1WEhSY2RGeDBYSFIyWVhJZ2MyeHBaR1Z5WDI5aWFtVmpkQ0E5SUNSamIyNTBZV2x1WlhJdVptbHVaQ2hjSWk1dFpYUmhMWE5zYVdSbGNsd2lLVnN3WFR0Y2NseHVYSFJjZEZ4MFhIUXZMM1poYkNCbWNtOXRJSE5zYVdSbGNpQnZZbXBsWTNSY2NseHVYSFJjZEZ4MFhIUjJZWElnYzJ4cFpHVnlYM1poYkNBOUlITnNhV1JsY2w5dlltcGxZM1F1Ym05VmFWTnNhV1JsY2k1blpYUW9LVHRjY2x4dVhISmNibHgwWEhSY2RGeDBkbUZzZFdWekxuQjFjMmdvWm1sbGJHUmZabTl5YldGMExtWnliMjBvYzJ4cFpHVnlYM1poYkZzd1hTa3BPMXh5WEc1Y2RGeDBYSFJjZEhaaGJIVmxjeTV3ZFhOb0tHWnBaV3hrWDJadmNtMWhkQzVtY205dEtITnNhV1JsY2w5MllXeGJNVjBwS1R0Y2NseHVYSFJjZEZ4MFhIUmNjbHh1WEhSY2RGeDBYSFJtYVdWc1pGWmhiQ0E5SUhaaGJIVmxjeTVxYjJsdUtGd2lLMXdpS1R0Y2NseHVYSFJjZEZ4MFhIUmNjbHh1WEhSY2RGeDBYSFJtYVdWc1pFNWhiV1VnUFNBa2JXVjBZVjl5WVc1blpTNWhkSFJ5S0Z3aVpHRjBZUzF6WmkxbWFXVnNaQzF1WVcxbFhDSXBPMXh5WEc1Y2RGeDBYSFJjZEZ4eVhHNWNkRngwWEhSY2RGeHlYRzVjZEZ4MFhIUjlYSEpjYmx4MFhIUmNkR1ZzYzJVZ2FXWW9hVzV3ZFhSVWVYQmxQVDFjSW5KaGJtZGxMWEpoWkdsdlhDSXBYSEpjYmx4MFhIUmNkSHRjY2x4dVhIUmNkRngwWEhRa1ptbGxiR1FnUFNBa1kyOXVkR0ZwYm1WeUxtWnBibVFvWENJdWMyWXRhVzV3ZFhRdGNtRnVaMlV0Y21Ga2FXOWNJaWs3WEhKY2JseDBYSFJjZEZ4MFhISmNibHgwWEhSY2RGeDBhV1lvSkdacFpXeGtMbXhsYm1kMGFEMDlNQ2xjY2x4dVhIUmNkRngwWEhSN1hISmNibHgwWEhSY2RGeDBYSFF2TDNSb1pXNGdkSEo1SUdGbllXbHVMQ0IzWlNCdGRYTjBJR0psSUhWemFXNW5JR0VnYzJsdVoyeGxJR1pwWld4a1hISmNibHgwWEhSY2RGeDBYSFFrWm1sbGJHUWdQU0FrWTI5dWRHRnBibVZ5TG1acGJtUW9YQ0krSUhWc1hDSXBPMXh5WEc1Y2RGeDBYSFJjZEgxY2NseHVYSEpjYmx4MFhIUmNkRngwZG1GeUlDUnRaWFJoWDNKaGJtZGxJRDBnSkdOdmJuUmhhVzVsY2k1bWFXNWtLRndpTG5ObUxXMWxkR0V0Y21GdVoyVmNJaWs3WEhKY2JseDBYSFJjZEZ4MFhISmNibHgwWEhSY2RGeDBMeTkwYUdWeVpTQnBjeUJoYmlCbGJHVnRaVzUwSUhkcGRHZ2dZU0JtY205dEwzUnZJR05zWVhOeklDMGdjMjhnZDJVZ2JtVmxaQ0IwYnlCblpYUWdkR2hsSUhaaGJIVmxjeUJ2WmlCMGFHVWdabkp2YlNBbUlIUnZJR2x1Y0hWMElHWnBaV3hrY3lCelpYQmxjbUYwWld4NVhISmNibHgwWEhSY2RGeDBhV1lvSkdacFpXeGtMbXhsYm1kMGFENHdLVnh5WEc1Y2RGeDBYSFJjZEh0Y2RGeHlYRzVjZEZ4MFhIUmNkRngwZG1GeUlHWnBaV3hrWDNaaGJITWdQU0JiWFR0Y2NseHVYSFJjZEZ4MFhIUmNkRnh5WEc1Y2RGeDBYSFJjZEZ4MEpHWnBaV3hrTG1WaFkyZ29ablZ1WTNScGIyNG9LWHRjY2x4dVhIUmNkRngwWEhSY2RGeDBYSEpjYmx4MFhIUmNkRngwWEhSY2RIWmhjaUFrY21Ga2FXOXpJRDBnSkNoMGFHbHpLUzVtYVc1a0tGd2lMbk5tTFdsdWNIVjBMWEpoWkdsdlhDSXBPMXh5WEc1Y2RGeDBYSFJjZEZ4MFhIUm1hV1ZzWkY5MllXeHpMbkIxYzJnb2MyVnNaaTVuWlhSTlpYUmhVbUZrYVc5V1lXd29KSEpoWkdsdmN5a3BPMXh5WEc1Y2RGeDBYSFJjZEZ4MFhIUmNjbHh1WEhSY2RGeDBYSFJjZEgwcE8xeHlYRzVjZEZ4MFhIUmNkRngwWEhKY2JseDBYSFJjZEZ4MFhIUXZMM0J5WlhabGJuUWdjMlZqYjI1a0lHNTFiV0psY2lCbWNtOXRJR0psYVc1bklHeHZkMlZ5SUhSb1lXNGdkR2hsSUdacGNuTjBYSEpjYmx4MFhIUmNkRngwWEhScFppaG1hV1ZzWkY5MllXeHpMbXhsYm1kMGFEMDlNaWxjY2x4dVhIUmNkRngwWEhSY2RIdGNjbHh1WEhSY2RGeDBYSFJjZEZ4MGFXWW9UblZ0WW1WeUtHWnBaV3hrWDNaaGJITmJNVjBwUEU1MWJXSmxjaWhtYVdWc1pGOTJZV3h6V3pCZEtTbGNjbHh1WEhSY2RGeDBYSFJjZEZ4MGUxeHlYRzVjZEZ4MFhIUmNkRngwWEhSY2RHWnBaV3hrWDNaaGJITmJNVjBnUFNCbWFXVnNaRjkyWVd4eld6QmRPMXh5WEc1Y2RGeDBYSFJjZEZ4MFhIUjlYSEpjYmx4MFhIUmNkRngwWEhSOVhISmNibHgwWEhSY2RGeDBYSFJjY2x4dVhIUmNkRngwWEhSY2RHWnBaV3hrVm1Gc0lEMGdabWxsYkdSZmRtRnNjeTVxYjJsdUtGd2lLMXdpS1R0Y2NseHVYSFJjZEZ4MFhIUjlYSEpjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFJjY2x4dVhIUmNkRngwWEhScFppZ2tabWxsYkdRdWJHVnVaM1JvUFQweEtWeHlYRzVjZEZ4MFhIUmNkSHRjY2x4dVhIUmNkRngwWEhSY2RHWnBaV3hrVG1GdFpTQTlJQ1JtYVdWc1pDNW1hVzVrS0Z3aUxuTm1MV2x1Y0hWMExYSmhaR2x2WENJcExtRjBkSElvWENKdVlXMWxYQ0lwTG5KbGNHeGhZMlVvSjF0ZEp5d2dKeWNwTzF4eVhHNWNkRngwWEhSY2RIMWNjbHh1WEhSY2RGeDBYSFJsYkhObFhISmNibHgwWEhSY2RGeDBlMXh5WEc1Y2RGeDBYSFJjZEZ4MFptbGxiR1JPWVcxbElEMGdKRzFsZEdGZmNtRnVaMlV1WVhSMGNpaGNJbVJoZEdFdGMyWXRabWxsYkdRdGJtRnRaVndpS1R0Y2NseHVYSFJjZEZ4MFhIUjlYSEpjYmx4eVhHNWNkRngwWEhSOVhISmNibHgwWEhSY2RHVnNjMlVnYVdZb2FXNXdkWFJVZVhCbFBUMWNJbkpoYm1kbExYTmxiR1ZqZEZ3aUtWeHlYRzVjZEZ4MFhIUjdYSEpjYmx4MFhIUmNkRngwSkdacFpXeGtJRDBnSkdOdmJuUmhhVzVsY2k1bWFXNWtLRndpTG5ObUxXbHVjSFYwTFhObGJHVmpkRndpS1R0Y2NseHVYSFJjZEZ4MFhIUjJZWElnSkcxbGRHRmZjbUZ1WjJVZ1BTQWtZMjl1ZEdGcGJtVnlMbVpwYm1Rb1hDSXVjMll0YldWMFlTMXlZVzVuWlZ3aUtUdGNjbHh1WEhSY2RGeDBYSFJjY2x4dVhIUmNkRngwWEhRdkwzUm9aWEpsSUdseklHRnVJR1ZzWlcxbGJuUWdkMmwwYUNCaElHWnliMjB2ZEc4Z1kyeGhjM01nTFNCemJ5QjNaU0J1WldWa0lIUnZJR2RsZENCMGFHVWdkbUZzZFdWeklHOW1JSFJvWlNCbWNtOXRJQ1lnZEc4Z2FXNXdkWFFnWm1sbGJHUnpJSE5sY0dWeVlYUmxiSGxjY2x4dVhIUmNkRngwWEhSY2NseHVYSFJjZEZ4MFhIUnBaaWdrWm1sbGJHUXViR1Z1WjNSb1BqQXBYSEpjYmx4MFhIUmNkRngwZTF4eVhHNWNkRngwWEhSY2RGeDBkbUZ5SUdacFpXeGtYM1poYkhNZ1BTQmJYVHRjY2x4dVhIUmNkRngwWEhSY2RGeHlYRzVjZEZ4MFhIUmNkRngwSkdacFpXeGtMbVZoWTJnb1puVnVZM1JwYjI0b0tYdGNjbHh1WEhSY2RGeDBYSFJjZEZ4MFhISmNibHgwWEhSY2RGeDBYSFJjZEhaaGNpQWtkR2hwY3lBOUlDUW9kR2hwY3lrN1hISmNibHgwWEhSY2RGeDBYSFJjZEdacFpXeGtYM1poYkhNdWNIVnphQ2h6Wld4bUxtZGxkRTFsZEdGVFpXeGxZM1JXWVd3b0pIUm9hWE1wS1R0Y2NseHVYSFJjZEZ4MFhIUmNkRngwWEhKY2JseDBYSFJjZEZ4MFhIUjlLVHRjY2x4dVhIUmNkRngwWEhSY2RGeHlYRzVjZEZ4MFhIUmNkRngwTHk5d2NtVjJaVzUwSUhObFkyOXVaQ0J1ZFcxaVpYSWdabkp2YlNCaVpXbHVaeUJzYjNkbGNpQjBhR0Z1SUhSb1pTQm1hWEp6ZEZ4eVhHNWNkRngwWEhSY2RGeDBhV1lvWm1sbGJHUmZkbUZzY3k1c1pXNW5kR2c5UFRJcFhISmNibHgwWEhSY2RGeDBYSFI3WEhKY2JseDBYSFJjZEZ4MFhIUmNkR2xtS0U1MWJXSmxjaWhtYVdWc1pGOTJZV3h6V3pGZEtUeE9kVzFpWlhJb1ptbGxiR1JmZG1Gc2Mxc3dYU2twWEhKY2JseDBYSFJjZEZ4MFhIUmNkSHRjY2x4dVhIUmNkRngwWEhSY2RGeDBYSFJtYVdWc1pGOTJZV3h6V3pGZElEMGdabWxsYkdSZmRtRnNjMXN3WFR0Y2NseHVYSFJjZEZ4MFhIUmNkRngwZlZ4eVhHNWNkRngwWEhSY2RGeDBmVnh5WEc1Y2RGeDBYSFJjZEZ4MFhISmNibHgwWEhSY2RGeDBYSFJjY2x4dVhIUmNkRngwWEhSY2RHWnBaV3hrVm1Gc0lEMGdabWxsYkdSZmRtRnNjeTVxYjJsdUtGd2lLMXdpS1R0Y2NseHVYSFJjZEZ4MFhIUjlYSEpjYmx4MFhIUmNkRngwWEhSY2RGeDBYSFJjY2x4dVhIUmNkRngwWEhScFppZ2tabWxsYkdRdWJHVnVaM1JvUFQweEtWeHlYRzVjZEZ4MFhIUmNkSHRjY2x4dVhIUmNkRngwWEhSY2RHWnBaV3hrVG1GdFpTQTlJQ1JtYVdWc1pDNWhkSFJ5S0Z3aWJtRnRaVndpS1M1eVpYQnNZV05sS0NkYlhTY3NJQ2NuS1R0Y2NseHVYSFJjZEZ4MFhIUjlYSEpjYmx4MFhIUmNkRngwWld4elpWeHlYRzVjZEZ4MFhIUmNkSHRjY2x4dVhIUmNkRngwWEhSY2RHWnBaV3hrVG1GdFpTQTlJQ1J0WlhSaFgzSmhibWRsTG1GMGRISW9YQ0prWVhSaExYTm1MV1pwWld4a0xXNWhiV1ZjSWlrN1hISmNibHgwWEhSY2RGeDBmVnh5WEc1Y2RGeDBYSFJjZEZ4eVhHNWNkRngwWEhSOVhISmNibHgwWEhSY2RHVnNjMlVnYVdZb2FXNXdkWFJVZVhCbFBUMWNJbkpoYm1kbExXTm9aV05yWW05NFhDSXBYSEpjYmx4MFhIUmNkSHRjY2x4dVhIUmNkRngwWEhRa1ptbGxiR1FnUFNBa1kyOXVkR0ZwYm1WeUxtWnBibVFvWENKMWJDQStJR3hwSUdsdWNIVjBPbU5vWldOclltOTRYQ0lwTzF4eVhHNWNkRngwWEhSY2RGeHlYRzVjZEZ4MFhIUmNkR2xtS0NSbWFXVnNaQzVzWlc1bmRHZytNQ2xjY2x4dVhIUmNkRngwWEhSN1hISmNibHgwWEhSY2RGeDBYSFJtYVdWc1pGWmhiQ0E5SUhObGJHWXVaMlYwUTJobFkydGliM2hXWVd3b0pHWnBaV3hrTENCY0ltRnVaRndpS1R0Y2NseHVYSFJjZEZ4MFhIUjlYSEpjYmx4MFhIUmNkSDFjY2x4dVhIUmNkRngwWEhKY2JseDBYSFJjZEdsbUtHWnBaV3hrVG1GdFpUMDlYQ0pjSWlsY2NseHVYSFJjZEZ4MGUxeHlYRzVjZEZ4MFhIUmNkR1pwWld4a1RtRnRaU0E5SUNSbWFXVnNaQzVoZEhSeUtGd2libUZ0WlZ3aUtTNXlaWEJzWVdObEtDZGJYU2NzSUNjbktUdGNjbHh1WEhSY2RGeDBmVnh5WEc1Y2RGeDBmVnh5WEc1Y2RGeDBaV3h6WlNCcFppaHRaWFJoVkhsd1pUMDlYQ0pqYUc5cFkyVmNJaWxjY2x4dVhIUmNkSHRjY2x4dVhIUmNkRngwYVdZb2FXNXdkWFJVZVhCbFBUMWNJbk5sYkdWamRGd2lLVnh5WEc1Y2RGeDBYSFI3WEhKY2JseDBYSFJjZEZ4MEpHWnBaV3hrSUQwZ0pHTnZiblJoYVc1bGNpNW1hVzVrS0Z3aWMyVnNaV04wWENJcE8xeHlYRzVjZEZ4MFhIUmNkRnh5WEc1Y2RGeDBYSFJjZEdacFpXeGtWbUZzSUQwZ2MyVnNaaTVuWlhSTlpYUmhVMlZzWldOMFZtRnNLQ1JtYVdWc1pDazdJRnh5WEc1Y2RGeDBYSFJjZEZ4eVhHNWNkRngwWEhSOVhISmNibHgwWEhSY2RHVnNjMlVnYVdZb2FXNXdkWFJVZVhCbFBUMWNJbTExYkhScGMyVnNaV04wWENJcFhISmNibHgwWEhSY2RIdGNjbHh1WEhSY2RGeDBYSFFrWm1sbGJHUWdQU0FrWTI5dWRHRnBibVZ5TG1acGJtUW9YQ0p6Wld4bFkzUmNJaWs3WEhKY2JseDBYSFJjZEZ4MGRtRnlJRzl3WlhKaGRHOXlJRDBnSkdacFpXeGtMbUYwZEhJb1hDSmtZWFJoTFc5d1pYSmhkRzl5WENJcE8xeHlYRzVjZEZ4MFhIUmNkRnh5WEc1Y2RGeDBYSFJjZEdacFpXeGtWbUZzSUQwZ2MyVnNaaTVuWlhSTlpYUmhUWFZzZEdsVFpXeGxZM1JXWVd3b0pHWnBaV3hrTENCdmNHVnlZWFJ2Y2lrN1hISmNibHgwWEhSY2RIMWNjbHh1WEhSY2RGeDBaV3h6WlNCcFppaHBibkIxZEZSNWNHVTlQVndpWTJobFkydGliM2hjSWlsY2NseHVYSFJjZEZ4MGUxeHlYRzVjZEZ4MFhIUmNkQ1JtYVdWc1pDQTlJQ1JqYjI1MFlXbHVaWEl1Wm1sdVpDaGNJblZzSUQ0Z2JHa2dhVzV3ZFhRNlkyaGxZMnRpYjNoY0lpazdYSEpjYmx4MFhIUmNkRngwWEhKY2JseDBYSFJjZEZ4MGFXWW9KR1pwWld4a0xteGxibWQwYUQ0d0tWeHlYRzVjZEZ4MFhIUmNkSHRjY2x4dVhIUmNkRngwWEhSY2RIWmhjaUJ2Y0dWeVlYUnZjaUE5SUNSamIyNTBZV2x1WlhJdVptbHVaQ2hjSWo0Z2RXeGNJaWt1WVhSMGNpaGNJbVJoZEdFdGIzQmxjbUYwYjNKY0lpazdYSEpjYmx4MFhIUmNkRngwWEhSbWFXVnNaRlpoYkNBOUlITmxiR1l1WjJWMFRXVjBZVU5vWldOclltOTRWbUZzS0NSbWFXVnNaQ3dnYjNCbGNtRjBiM0lwTzF4eVhHNWNkRngwWEhSY2RIMWNjbHh1WEhSY2RGeDBmVnh5WEc1Y2RGeDBYSFJsYkhObElHbG1LR2x1Y0hWMFZIbHdaVDA5WENKeVlXUnBiMXdpS1Z4eVhHNWNkRngwWEhSN1hISmNibHgwWEhSY2RGeDBKR1pwWld4a0lEMGdKR052Ym5SaGFXNWxjaTVtYVc1a0tGd2lkV3dnUGlCc2FTQnBibkIxZERweVlXUnBiMXdpS1R0Y2NseHVYSFJjZEZ4MFhIUmNjbHh1WEhSY2RGeDBYSFJwWmlna1ptbGxiR1F1YkdWdVozUm9QakFwWEhKY2JseDBYSFJjZEZ4MGUxeHlYRzVjZEZ4MFhIUmNkRngwWm1sbGJHUldZV3dnUFNCelpXeG1MbWRsZEUxbGRHRlNZV1JwYjFaaGJDZ2tabWxsYkdRcE8xeHlYRzVjZEZ4MFhIUmNkSDFjY2x4dVhIUmNkRngwZlZ4eVhHNWNkRngwWEhSY2NseHVYSFJjZEZ4MFptbGxiR1JXWVd3Z1BTQmxibU52WkdWVlVrbERiMjF3YjI1bGJuUW9abWxsYkdSV1lXd3BPMXh5WEc1Y2RGeDBYSFJwWmloMGVYQmxiMllvSkdacFpXeGtLU0U5UFZ3aWRXNWtaV1pwYm1Wa1hDSXBYSEpjYmx4MFhIUmNkSHRjY2x4dVhIUmNkRngwWEhScFppZ2tabWxsYkdRdWJHVnVaM1JvUGpBcFhISmNibHgwWEhSY2RGeDBlMXh5WEc1Y2RGeDBYSFJjZEZ4MFptbGxiR1JPWVcxbElEMGdKR1pwWld4a0xtRjBkSElvWENKdVlXMWxYQ0lwTG5KbGNHeGhZMlVvSjF0ZEp5d2dKeWNwTzF4eVhHNWNkRngwWEhSY2RGeDBYSEpjYmx4MFhIUmNkRngwWEhRdkwyWnZjaUIwYUc5elpTQjNhRzhnYVc1emFYTjBJRzl1SUhWemFXNW5JQ1lnWVcxd1pYSnpZVzVrY3lCcGJpQjBhR1VnYm1GdFpTQnZaaUIwYUdVZ1kzVnpkRzl0SUdacFpXeGtJQ2doS1Z4eVhHNWNkRngwWEhSY2RGeDBabWxsYkdST1lXMWxJRDBnS0dacFpXeGtUbUZ0WlNrN1hISmNibHgwWEhSY2RGeDBmVnh5WEc1Y2RGeDBYSFI5WEhKY2JseDBYSFJjZEZ4eVhHNWNkRngwZlZ4eVhHNWNkRngwWld4elpTQnBaaWh0WlhSaFZIbHdaVDA5WENKa1lYUmxYQ0lwWEhKY2JseDBYSFI3WEhKY2JseDBYSFJjZEhObGJHWXVjSEp2WTJWemMxQnZjM1JFWVhSbEtDUmpiMjUwWVdsdVpYSXBPMXh5WEc1Y2RGeDBmVnh5WEc1Y2RGeDBYSEpjYmx4MFhIUnBaaWgwZVhCbGIyWW9abWxsYkdSV1lXd3BJVDFjSW5WdVpHVm1hVzVsWkZ3aUtWeHlYRzVjZEZ4MGUxeHlYRzVjZEZ4MFhIUnBaaWhtYVdWc1pGWmhiQ0U5WENKY0lpbGNjbHh1WEhSY2RGeDBlMXh5WEc1Y2RGeDBYSFJjZEM4dmMyVnNaaTUxY214ZlkyOXRjRzl1Wlc1MGN5QXJQU0JjSWlaY0lpdGxibU52WkdWVlVrbERiMjF3YjI1bGJuUW9abWxsYkdST1lXMWxLU3RjSWoxY0lpc29abWxsYkdSV1lXd3BPMXh5WEc1Y2RGeDBYSFJjZEhObGJHWXVkWEpzWDNCaGNtRnRjMXRsYm1OdlpHVlZVa2xEYjIxd2IyNWxiblFvWm1sbGJHUk9ZVzFsS1YwZ1BTQW9abWxsYkdSV1lXd3BPMXh5WEc1Y2RGeDBYSFI5WEhKY2JseDBYSFI5WEhKY2JseDBmU3hjY2x4dVhIUndjbTlqWlhOelVHOXpkRVJoZEdVNklHWjFibU4wYVc5dUtDUmpiMjUwWVdsdVpYSXBYSEpjYmx4MGUxeHlYRzVjZEZ4MGRtRnlJSE5sYkdZZ1BTQjBhR2x6TzF4eVhHNWNkRngwWEhKY2JseDBYSFIyWVhJZ1ptbGxiR1JVZVhCbElEMGdKR052Ym5SaGFXNWxjaTVoZEhSeUtGd2laR0YwWVMxelppMW1hV1ZzWkMxMGVYQmxYQ0lwTzF4eVhHNWNkRngwZG1GeUlHbHVjSFYwVkhsd1pTQTlJQ1JqYjI1MFlXbHVaWEl1WVhSMGNpaGNJbVJoZEdFdGMyWXRabWxsYkdRdGFXNXdkWFF0ZEhsd1pWd2lLVHRjY2x4dVhIUmNkRnh5WEc1Y2RGeDBkbUZ5SUNSbWFXVnNaRHRjY2x4dVhIUmNkSFpoY2lCbWFXVnNaRTVoYldVZ1BTQmNJbHdpTzF4eVhHNWNkRngwZG1GeUlHWnBaV3hrVm1Gc0lEMGdYQ0pjSWp0Y2NseHVYSFJjZEZ4eVhHNWNkRngwSkdacFpXeGtJRDBnSkdOdmJuUmhhVzVsY2k1bWFXNWtLRndpZFd3Z1BpQnNhU0JwYm5CMWREcDBaWGgwWENJcE8xeHlYRzVjZEZ4MFptbGxiR1JPWVcxbElEMGdKR1pwWld4a0xtRjBkSElvWENKdVlXMWxYQ0lwTG5KbGNHeGhZMlVvSjF0ZEp5d2dKeWNwTzF4eVhHNWNkRngwWEhKY2JseDBYSFIyWVhJZ1pHRjBaWE1nUFNCYlhUdGNjbHh1WEhSY2RDUm1hV1ZzWkM1bFlXTm9LR1oxYm1OMGFXOXVLQ2w3WEhKY2JseDBYSFJjZEZ4eVhHNWNkRngwWEhSa1lYUmxjeTV3ZFhOb0tDUW9kR2hwY3lrdWRtRnNLQ2twTzF4eVhHNWNkRngwWEhKY2JseDBYSFI5S1R0Y2NseHVYSFJjZEZ4eVhHNWNkRngwYVdZb0pHWnBaV3hrTG14bGJtZDBhRDA5TWlsY2NseHVYSFJjZEh0Y2NseHVYSFJjZEZ4MGFXWW9LR1JoZEdWeld6QmRJVDFjSWx3aUtYeDhLR1JoZEdWeld6RmRJVDFjSWx3aUtTbGNjbHh1WEhSY2RGeDBlMXh5WEc1Y2RGeDBYSFJjZEdacFpXeGtWbUZzSUQwZ1pHRjBaWE11YW05cGJpaGNJaXRjSWlrN1hISmNibHgwWEhSY2RGeDBabWxsYkdSV1lXd2dQU0JtYVdWc1pGWmhiQzV5WlhCc1lXTmxLQzljWEM4dlp5d25KeWs3WEhKY2JseDBYSFJjZEgxY2NseHVYSFJjZEgxY2NseHVYSFJjZEdWc2MyVWdhV1lvSkdacFpXeGtMbXhsYm1kMGFEMDlNU2xjY2x4dVhIUmNkSHRjY2x4dVhIUmNkRngwYVdZb1pHRjBaWE5iTUYwaFBWd2lYQ0lwWEhKY2JseDBYSFJjZEh0Y2NseHVYSFJjZEZ4MFhIUm1hV1ZzWkZaaGJDQTlJR1JoZEdWekxtcHZhVzRvWENJclhDSXBPMXh5WEc1Y2RGeDBYSFJjZEdacFpXeGtWbUZzSUQwZ1ptbGxiR1JXWVd3dWNtVndiR0ZqWlNndlhGd3ZMMmNzSnljcE8xeHlYRzVjZEZ4MFhIUjlYSEpjYmx4MFhIUjlYSEpjYmx4MFhIUmNjbHh1WEhSY2RHbG1LSFI1Y0dWdlppaG1hV1ZzWkZaaGJDa2hQVndpZFc1a1pXWnBibVZrWENJcFhISmNibHgwWEhSN1hISmNibHgwWEhSY2RHbG1LR1pwWld4a1ZtRnNJVDFjSWx3aUtWeHlYRzVjZEZ4MFhIUjdYSEpjYmx4MFhIUmNkRngwZG1GeUlHWnBaV3hrVTJ4MVp5QTlJRndpWENJN1hISmNibHgwWEhSY2RGeDBYSEpjYmx4MFhIUmNkRngwYVdZb1ptbGxiR1JPWVcxbFBUMWNJbDl6Wmw5d2IzTjBYMlJoZEdWY0lpbGNjbHh1WEhSY2RGeDBYSFI3WEhKY2JseDBYSFJjZEZ4MFhIUm1hV1ZzWkZOc2RXY2dQU0JjSW5CdmMzUmZaR0YwWlZ3aU8xeHlYRzVjZEZ4MFhIUmNkSDFjY2x4dVhIUmNkRngwWEhSbGJITmxYSEpjYmx4MFhIUmNkRngwZTF4eVhHNWNkRngwWEhSY2RGeDBabWxsYkdSVGJIVm5JRDBnWm1sbGJHUk9ZVzFsTzF4eVhHNWNkRngwWEhSY2RIMWNjbHh1WEhSY2RGeDBYSFJjY2x4dVhIUmNkRngwWEhScFppaG1hV1ZzWkZOc2RXY2hQVndpWENJcFhISmNibHgwWEhSY2RGeDBlMXh5WEc1Y2RGeDBYSFJjZEZ4MEx5OXpaV3htTG5WeWJGOWpiMjF3YjI1bGJuUnpJQ3M5SUZ3aUpsd2lLMlpwWld4a1UyeDFaeXRjSWoxY0lpdG1hV1ZzWkZaaGJEdGNjbHh1WEhSY2RGeDBYSFJjZEhObGJHWXVkWEpzWDNCaGNtRnRjMXRtYVdWc1pGTnNkV2RkSUQwZ1ptbGxiR1JXWVd3N1hISmNibHgwWEhSY2RGeDBmVnh5WEc1Y2RGeDBYSFI5WEhKY2JseDBYSFI5WEhKY2JseDBYSFJjY2x4dVhIUjlMRnh5WEc1Y2RIQnliMk5sYzNOVVlYaHZibTl0ZVRvZ1puVnVZM1JwYjI0b0pHTnZiblJoYVc1bGNpd2djbVYwZFhKdVgyOWlhbVZqZENsY2NseHVYSFI3WEhKY2JpQWdJQ0FnSUNBZ2FXWW9kSGx3Wlc5bUtISmxkSFZ5Ymw5dlltcGxZM1FwUFQxY0luVnVaR1ZtYVc1bFpGd2lLVnh5WEc0Z0lDQWdJQ0FnSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVYMjlpYW1WamRDQTlJR1poYkhObE8xeHlYRzRnSUNBZ0lDQWdJSDFjY2x4dVhISmNibHgwWEhRdkwybG1LQ2xjZEZ4MFhIUmNkRngwWEhKY2JseDBYSFF2TDNaaGNpQm1hV1ZzWkU1aGJXVWdQU0FrS0hSb2FYTXBMbUYwZEhJb1hDSmtZWFJoTFhObUxXWnBaV3hrTFc1aGJXVmNJaWs3WEhKY2JseDBYSFIyWVhJZ2MyVnNaaUE5SUhSb2FYTTdYSEpjYmx4MFhISmNibHgwWEhSMllYSWdabWxsYkdSVWVYQmxJRDBnSkdOdmJuUmhhVzVsY2k1aGRIUnlLRndpWkdGMFlTMXpaaTFtYVdWc1pDMTBlWEJsWENJcE8xeHlYRzVjZEZ4MGRtRnlJR2x1Y0hWMFZIbHdaU0E5SUNSamIyNTBZV2x1WlhJdVlYUjBjaWhjSW1SaGRHRXRjMll0Wm1sbGJHUXRhVzV3ZFhRdGRIbHdaVndpS1R0Y2NseHVYSFJjZEZ4eVhHNWNkRngwZG1GeUlDUm1hV1ZzWkR0Y2NseHVYSFJjZEhaaGNpQm1hV1ZzWkU1aGJXVWdQU0JjSWx3aU8xeHlYRzVjZEZ4MGRtRnlJR1pwWld4a1ZtRnNJRDBnWENKY0lqdGNjbHh1WEhSY2RGeHlYRzVjZEZ4MGFXWW9hVzV3ZFhSVWVYQmxQVDFjSW5ObGJHVmpkRndpS1Z4eVhHNWNkRngwZTF4eVhHNWNkRngwWEhRa1ptbGxiR1FnUFNBa1kyOXVkR0ZwYm1WeUxtWnBibVFvWENKelpXeGxZM1JjSWlrN1hISmNibHgwWEhSY2RHWnBaV3hrVG1GdFpTQTlJQ1JtYVdWc1pDNWhkSFJ5S0Z3aWJtRnRaVndpS1M1eVpYQnNZV05sS0NkYlhTY3NJQ2NuS1R0Y2NseHVYSFJjZEZ4MFhISmNibHgwWEhSY2RHWnBaV3hrVm1Gc0lEMGdjMlZzWmk1blpYUlRaV3hsWTNSV1lXd29KR1pwWld4a0tUc2dYSEpjYmx4MFhIUjlYSEpjYmx4MFhIUmxiSE5sSUdsbUtHbHVjSFYwVkhsd1pUMDlYQ0p0ZFd4MGFYTmxiR1ZqZEZ3aUtWeHlYRzVjZEZ4MGUxeHlYRzVjZEZ4MFhIUWtabWxsYkdRZ1BTQWtZMjl1ZEdGcGJtVnlMbVpwYm1Rb1hDSnpaV3hsWTNSY0lpazdYSEpjYmx4MFhIUmNkR1pwWld4a1RtRnRaU0E5SUNSbWFXVnNaQzVoZEhSeUtGd2libUZ0WlZ3aUtTNXlaWEJzWVdObEtDZGJYU2NzSUNjbktUdGNjbHh1WEhSY2RGeDBkbUZ5SUc5d1pYSmhkRzl5SUQwZ0pHWnBaV3hrTG1GMGRISW9YQ0prWVhSaExXOXdaWEpoZEc5eVhDSXBPMXh5WEc1Y2RGeDBYSFJjY2x4dVhIUmNkRngwWm1sbGJHUldZV3dnUFNCelpXeG1MbWRsZEUxMWJIUnBVMlZzWldOMFZtRnNLQ1JtYVdWc1pDd2diM0JsY21GMGIzSXBPMXh5WEc1Y2RGeDBmVnh5WEc1Y2RGeDBaV3h6WlNCcFppaHBibkIxZEZSNWNHVTlQVndpWTJobFkydGliM2hjSWlsY2NseHVYSFJjZEh0Y2NseHVYSFJjZEZ4MEpHWnBaV3hrSUQwZ0pHTnZiblJoYVc1bGNpNW1hVzVrS0Z3aWRXd2dQaUJzYVNCcGJuQjFkRHBqYUdWamEySnZlRndpS1R0Y2NseHVYSFJjZEZ4MGFXWW9KR1pwWld4a0xteGxibWQwYUQ0d0tWeHlYRzVjZEZ4MFhIUjdYSEpjYmx4MFhIUmNkRngwWm1sbGJHUk9ZVzFsSUQwZ0pHWnBaV3hrTG1GMGRISW9YQ0p1WVcxbFhDSXBMbkpsY0d4aFkyVW9KMXRkSnl3Z0p5Y3BPMXh5WEc1Y2RGeDBYSFJjZEZ4MFhIUmNkRngwWEhSY2RGeHlYRzVjZEZ4MFhIUmNkSFpoY2lCdmNHVnlZWFJ2Y2lBOUlDUmpiMjUwWVdsdVpYSXVabWx1WkNoY0lqNGdkV3hjSWlrdVlYUjBjaWhjSW1SaGRHRXRiM0JsY21GMGIzSmNJaWs3WEhKY2JseDBYSFJjZEZ4MFptbGxiR1JXWVd3Z1BTQnpaV3htTG1kbGRFTm9aV05yWW05NFZtRnNLQ1JtYVdWc1pDd2diM0JsY21GMGIzSXBPMXh5WEc1Y2RGeDBYSFI5WEhKY2JseDBYSFI5WEhKY2JseDBYSFJsYkhObElHbG1LR2x1Y0hWMFZIbHdaVDA5WENKeVlXUnBiMXdpS1Z4eVhHNWNkRngwZTF4eVhHNWNkRngwWEhRa1ptbGxiR1FnUFNBa1kyOXVkR0ZwYm1WeUxtWnBibVFvWENKMWJDQStJR3hwSUdsdWNIVjBPbkpoWkdsdlhDSXBPMXh5WEc1Y2RGeDBYSFJwWmlna1ptbGxiR1F1YkdWdVozUm9QakFwWEhKY2JseDBYSFJjZEh0Y2NseHVYSFJjZEZ4MFhIUm1hV1ZzWkU1aGJXVWdQU0FrWm1sbGJHUXVZWFIwY2loY0ltNWhiV1ZjSWlrdWNtVndiR0ZqWlNnblcxMG5MQ0FuSnlrN1hISmNibHgwWEhSY2RGeDBYSEpjYmx4MFhIUmNkRngwWm1sbGJHUldZV3dnUFNCelpXeG1MbWRsZEZKaFpHbHZWbUZzS0NSbWFXVnNaQ2s3WEhKY2JseDBYSFJjZEgxY2NseHVYSFJjZEgxY2NseHVYSFJjZEZ4eVhHNWNkRngwYVdZb2RIbHdaVzltS0dacFpXeGtWbUZzS1NFOVhDSjFibVJsWm1sdVpXUmNJaWxjY2x4dVhIUmNkSHRjY2x4dVhIUmNkRngwYVdZb1ptbGxiR1JXWVd3aFBWd2lYQ0lwWEhKY2JseDBYSFJjZEh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1LSEpsZEhWeWJsOXZZbXBsWTNROVBYUnlkV1VwWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJSHR1WVcxbE9pQm1hV1ZzWkU1aGJXVXNJSFpoYkhWbE9pQm1hV1ZzWkZaaGJIMDdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbGJITmxYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdMeTl6Wld4bUxuVnliRjlqYjIxd2IyNWxiblJ6SUNzOUlGd2lKbHdpSzJacFpXeGtUbUZ0WlN0Y0lqMWNJaXRtYVdWc1pGWmhiRHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpaV3htTG5WeWJGOXdZWEpoYlhOYlptbGxiR1JPWVcxbFhTQTlJR1pwWld4a1ZtRnNPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4eVhHNWNjbHh1WEhSY2RGeDBmVnh5WEc1Y2RGeDBmVnh5WEc1Y2NseHVJQ0FnSUNBZ0lDQnBaaWh5WlhSMWNtNWZiMkpxWldOMFBUMTBjblZsS1Z4eVhHNGdJQ0FnSUNBZ0lIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUdaaGJITmxPMXh5WEc0Z0lDQWdJQ0FnSUgxY2NseHVYSFI5WEhKY2JuMDdJbDE5IiwiXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdFxyXG5cdHNlYXJjaEZvcm1zOiB7fSxcclxuXHRcclxuXHRpbml0OiBmdW5jdGlvbigpe1xyXG5cdFx0XHJcblx0XHRcclxuXHR9LFxyXG5cdGFkZFNlYXJjaEZvcm06IGZ1bmN0aW9uKGlkLCBvYmplY3Qpe1xyXG5cdFx0XHJcblx0XHR0aGlzLnNlYXJjaEZvcm1zW2lkXSA9IG9iamVjdDtcclxuXHR9LFxyXG5cdGdldFNlYXJjaEZvcm06IGZ1bmN0aW9uKGlkKVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLnNlYXJjaEZvcm1zW2lkXTtcdFxyXG5cdH1cclxuXHRcclxufTsiXX0=
