/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/date-fns/esm/_lib/assign/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/assign/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ assign)
/* harmony export */ });
function assign(target, dirtyObject) {
  if (target == null) {
    throw new TypeError('assign requires that input parameter not be null or undefined');
  }

  dirtyObject = dirtyObject || {};

  for (var property in dirtyObject) {
    if (Object.prototype.hasOwnProperty.call(dirtyObject, property)) {
      target[property] = dirtyObject[property];
    }
  }

  return target;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/cloneObject/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/cloneObject/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ cloneObject)
/* harmony export */ });
/* harmony import */ var _assign_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assign/index.js */ "./node_modules/date-fns/esm/_lib/assign/index.js");

function cloneObject(dirtyObject) {
  return (0,_assign_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, dirtyObject);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getTimezoneOffsetInMilliseconds)
/* harmony export */ });
/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
function getTimezoneOffsetInMilliseconds(date) {
  var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
  utcDate.setUTCFullYear(date.getFullYear());
  return date.getTime() - utcDate.getTime();
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/requiredArgs/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ requiredArgs)
/* harmony export */ });
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/toInteger/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/toInteger/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toInteger)
/* harmony export */ });
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }

  var number = Number(dirtyNumber);

  if (isNaN(number)) {
    return number;
  }

  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/compareAsc/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/compareAsc/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ compareAsc)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name compareAsc
 * @category Common Helpers
 * @summary Compare the two dates and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return 1 if the first date is after the second,
 * -1 if the first date is before the second or 0 if dates are equal.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to compare
 * @param {Date|Number} dateRight - the second date to compare
 * @returns {Number} the result of the comparison
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989:
 * const result = compareAsc(new Date(1987, 1, 11), new Date(1989, 6, 10))
 * //=> -1
 *
 * @example
 * // Sort the array of dates:
 * const result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareAsc)
 * //=> [
 * //   Wed Feb 11 1987 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Sun Jul 02 1995 00:00:00
 * // ]
 */

function compareAsc(dirtyDateLeft, dirtyDateRight) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var dateLeft = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateLeft);
  var dateRight = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateRight);
  var diff = dateLeft.getTime() - dateRight.getTime();

  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1; // Return 0 if diff is 0; return NaN if diff is NaN
  } else {
    return diff;
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/constants/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/esm/constants/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "daysInWeek": () => (/* binding */ daysInWeek),
/* harmony export */   "maxTime": () => (/* binding */ maxTime),
/* harmony export */   "millisecondsInHour": () => (/* binding */ millisecondsInHour),
/* harmony export */   "millisecondsInMinute": () => (/* binding */ millisecondsInMinute),
/* harmony export */   "millisecondsInSecond": () => (/* binding */ millisecondsInSecond),
/* harmony export */   "minTime": () => (/* binding */ minTime),
/* harmony export */   "minutesInHour": () => (/* binding */ minutesInHour),
/* harmony export */   "monthsInQuarter": () => (/* binding */ monthsInQuarter),
/* harmony export */   "monthsInYear": () => (/* binding */ monthsInYear),
/* harmony export */   "quartersInYear": () => (/* binding */ quartersInYear),
/* harmony export */   "secondsInHour": () => (/* binding */ secondsInHour),
/* harmony export */   "secondsInMinute": () => (/* binding */ secondsInMinute)
/* harmony export */ });
/**
 * Days in 1 week.
 *
 * @name daysInWeek
 * @constant
 * @type {number}
 * @default
 */
var daysInWeek = 7;
/**
 * Maximum allowed time.
 *
 * @name maxTime
 * @constant
 * @type {number}
 * @default
 */

var maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1000;
/**
 * Milliseconds in 1 minute
 *
 * @name millisecondsInMinute
 * @constant
 * @type {number}
 * @default
 */

var millisecondsInMinute = 60000;
/**
 * Milliseconds in 1 hour
 *
 * @name millisecondsInHour
 * @constant
 * @type {number}
 * @default
 */

var millisecondsInHour = 3600000;
/**
 * Milliseconds in 1 second
 *
 * @name millisecondsInSecond
 * @constant
 * @type {number}
 * @default
 */

var millisecondsInSecond = 1000;
/**
 * Minimum allowed time.
 *
 * @name minTime
 * @constant
 * @type {number}
 * @default
 */

var minTime = -maxTime;
/**
 * Minutes in 1 hour
 *
 * @name minutesInHour
 * @constant
 * @type {number}
 * @default
 */

var minutesInHour = 60;
/**
 * Months in 1 quarter
 *
 * @name monthsInQuarter
 * @constant
 * @type {number}
 * @default
 */

var monthsInQuarter = 3;
/**
 * Months in 1 year
 *
 * @name monthsInYear
 * @constant
 * @type {number}
 * @default
 */

var monthsInYear = 12;
/**
 * Quarters in 1 year
 *
 * @name quartersInYear
 * @constant
 * @type {number}
 * @default
 */

var quartersInYear = 4;
/**
 * Seconds in 1 hour
 *
 * @name secondsInHour
 * @constant
 * @type {number}
 * @default
 */

var secondsInHour = 3600;
/**
 * Seconds in 1 minute
 *
 * @name secondsInMinute
 * @constant
 * @type {number}
 * @default
 */

var secondsInMinute = 60;

/***/ }),

/***/ "./node_modules/date-fns/esm/formatDistanceStrict/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/esm/formatDistanceStrict/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ formatDistanceStrict)
/* harmony export */ });
/* harmony import */ var _lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_lib/getTimezoneOffsetInMilliseconds/index.js */ "./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js");
/* harmony import */ var _compareAsc_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../compareAsc/index.js */ "./node_modules/date-fns/esm/compareAsc/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_cloneObject_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_lib/cloneObject/index.js */ "./node_modules/date-fns/esm/_lib/cloneObject/index.js");
/* harmony import */ var _locale_en_US_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../locale/en-US/index.js */ "./node_modules/date-fns/esm/locale/en-US/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");






var MILLISECONDS_IN_MINUTE = 1000 * 60;
var MINUTES_IN_DAY = 60 * 24;
var MINUTES_IN_MONTH = MINUTES_IN_DAY * 30;
var MINUTES_IN_YEAR = MINUTES_IN_DAY * 365;
/**
 * @name formatDistanceStrict
 * @category Common Helpers
 * @summary Return the distance between the given dates in words.
 *
 * @description
 * Return the distance between the given dates in words, using strict units.
 * This is like `formatDistance`, but does not use helpers like 'almost', 'over',
 * 'less than' and the like.
 *
 * | Distance between dates | Result              |
 * |------------------------|---------------------|
 * | 0 ... 59 secs          | [0..59] seconds     |
 * | 1 ... 59 mins          | [1..59] minutes     |
 * | 1 ... 23 hrs           | [1..23] hours       |
 * | 1 ... 29 days          | [1..29] days        |
 * | 1 ... 11 months        | [1..11] months      |
 * | 1 ... N years          | [1..N]  years       |
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The function was renamed from `distanceInWordsStrict` to `formatDistanceStrict`
 *   to make its name consistent with `format` and `formatRelative`.
 *
 * - The order of arguments is swapped to make the function
 *   consistent with `differenceIn...` functions.
 *
 *   ```javascript
 *   // Before v2.0.0
 *
 *   distanceInWordsStrict(
 *     new Date(2015, 0, 2),
 *     new Date(2014, 6, 2)
 *   ) //=> '6 months'
 *
 *   // v2.0.0 onward
 *
 *   formatDistanceStrict(
 *     new Date(2014, 6, 2),
 *     new Date(2015, 0, 2)
 *   ) //=> '6 months'
 *   ```
 *
 * - `partialMethod` option is renamed to `roundingMethod`.
 *
 *   ```javascript
 *   // Before v2.0.0
 *
 *   distanceInWordsStrict(
 *     new Date(1986, 3, 4, 10, 32, 0),
 *     new Date(1986, 3, 4, 10, 33, 1),
 *     { partialMethod: 'ceil' }
 *   ) //=> '2 minutes'
 *
 *   // v2.0.0 onward
 *
 *   formatDistanceStrict(
 *     new Date(1986, 3, 4, 10, 33, 1),
 *     new Date(1986, 3, 4, 10, 32, 0),
 *     { roundingMethod: 'ceil' }
 *   ) //=> '2 minutes'
 *   ```
 *
 * - If `roundingMethod` is not specified, it now defaults to `round` instead of `floor`.
 *
 * - `unit` option now accepts one of the strings:
 *   'second', 'minute', 'hour', 'day', 'month' or 'year' instead of 's', 'm', 'h', 'd', 'M' or 'Y'
 *
 *   ```javascript
 *   // Before v2.0.0
 *
 *   distanceInWordsStrict(
 *     new Date(1986, 3, 4, 10, 32, 0),
 *     new Date(1986, 3, 4, 10, 33, 1),
 *     { unit: 'm' }
 *   )
 *
 *   // v2.0.0 onward
 *
 *   formatDistanceStrict(
 *     new Date(1986, 3, 4, 10, 33, 1),
 *     new Date(1986, 3, 4, 10, 32, 0),
 *     { unit: 'minute' }
 *   )
 *   ```
 *
 * @param {Date|Number} date - the date
 * @param {Date|Number} baseDate - the date to compare with
 * @param {Object} [options] - an object with options.
 * @param {Boolean} [options.addSuffix=false] - result indicates if the second date is earlier or later than the first
 * @param {'second'|'minute'|'hour'|'day'|'month'|'year'} [options.unit] - if specified, will force a unit
 * @param {'floor'|'ceil'|'round'} [options.roundingMethod='round'] - which way to round partial units
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @returns {String} the distance in words
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `baseDate` must not be Invalid Date
 * @throws {RangeError} `options.roundingMethod` must be 'floor', 'ceil' or 'round'
 * @throws {RangeError} `options.unit` must be 'second', 'minute', 'hour', 'day', 'month' or 'year'
 * @throws {RangeError} `options.locale` must contain `formatDistance` property
 *
 * @example
 * // What is the distance between 2 July 2014 and 1 January 2015?
 * const result = formatDistanceStrict(new Date(2014, 6, 2), new Date(2015, 0, 2))
 * //=> '6 months'
 *
 * @example
 * // What is the distance between 1 January 2015 00:00:15
 * // and 1 January 2015 00:00:00?
 * const result = formatDistanceStrict(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   new Date(2015, 0, 1, 0, 0, 0)
 * )
 * //=> '15 seconds'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, with a suffix?
 * const result = formatDistanceStrict(new Date(2015, 0, 1), new Date(2016, 0, 1), {
 *   addSuffix: true
 * })
 * //=> '1 year ago'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, in minutes?
 * const result = formatDistanceStrict(new Date(2016, 0, 1), new Date(2015, 0, 1), {
 *   unit: 'minute'
 * })
 * //=> '525600 minutes'
 *
 * @example
 * // What is the distance from 1 January 2015
 * // to 28 January 2015, in months, rounded up?
 * const result = formatDistanceStrict(new Date(2015, 0, 28), new Date(2015, 0, 1), {
 *   unit: 'month',
 *   roundingMethod: 'ceil'
 * })
 * //=> '1 month'
 *
 * @example
 * // What is the distance between 1 August 2016 and 1 January 2015 in Esperanto?
 * import { eoLocale } from 'date-fns/locale/eo'
 * const result = formatDistanceStrict(new Date(2016, 7, 1), new Date(2015, 0, 1), {
 *   locale: eoLocale
 * })
 * //=> '1 jaro'
 */

function formatDistanceStrict(dirtyDate, dirtyBaseDate) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var locale = options.locale || _locale_en_US_index_js__WEBPACK_IMPORTED_MODULE_1__["default"];

  if (!locale.formatDistance) {
    throw new RangeError('locale must contain localize.formatDistance property');
  }

  var comparison = (0,_compareAsc_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(dirtyDate, dirtyBaseDate);

  if (isNaN(comparison)) {
    throw new RangeError('Invalid time value');
  }

  var localizeOptions = (0,_lib_cloneObject_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(options);
  localizeOptions.addSuffix = Boolean(options.addSuffix);
  localizeOptions.comparison = comparison;
  var dateLeft;
  var dateRight;

  if (comparison > 0) {
    dateLeft = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_4__["default"])(dirtyBaseDate);
    dateRight = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_4__["default"])(dirtyDate);
  } else {
    dateLeft = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_4__["default"])(dirtyDate);
    dateRight = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_4__["default"])(dirtyBaseDate);
  }

  var roundingMethod = options.roundingMethod == null ? 'round' : String(options.roundingMethod);
  var roundingMethodFn;

  if (roundingMethod === 'floor') {
    roundingMethodFn = Math.floor;
  } else if (roundingMethod === 'ceil') {
    roundingMethodFn = Math.ceil;
  } else if (roundingMethod === 'round') {
    roundingMethodFn = Math.round;
  } else {
    throw new RangeError("roundingMethod must be 'floor', 'ceil' or 'round'");
  }

  var milliseconds = dateRight.getTime() - dateLeft.getTime();
  var minutes = milliseconds / MILLISECONDS_IN_MINUTE;
  var timezoneOffset = (0,_lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_5__["default"])(dateRight) - (0,_lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_5__["default"])(dateLeft); // Use DST-normalized difference in minutes for years, months and days;
  // use regular difference in minutes for hours, minutes and seconds.

  var dstNormalizedMinutes = (milliseconds - timezoneOffset) / MILLISECONDS_IN_MINUTE;
  var unit;

  if (options.unit == null) {
    if (minutes < 1) {
      unit = 'second';
    } else if (minutes < 60) {
      unit = 'minute';
    } else if (minutes < MINUTES_IN_DAY) {
      unit = 'hour';
    } else if (dstNormalizedMinutes < MINUTES_IN_MONTH) {
      unit = 'day';
    } else if (dstNormalizedMinutes < MINUTES_IN_YEAR) {
      unit = 'month';
    } else {
      unit = 'year';
    }
  } else {
    unit = String(options.unit);
  } // 0 up to 60 seconds


  if (unit === 'second') {
    var seconds = roundingMethodFn(milliseconds / 1000);
    return locale.formatDistance('xSeconds', seconds, localizeOptions); // 1 up to 60 mins
  } else if (unit === 'minute') {
    var roundedMinutes = roundingMethodFn(minutes);
    return locale.formatDistance('xMinutes', roundedMinutes, localizeOptions); // 1 up to 24 hours
  } else if (unit === 'hour') {
    var hours = roundingMethodFn(minutes / 60);
    return locale.formatDistance('xHours', hours, localizeOptions); // 1 up to 30 days
  } else if (unit === 'day') {
    var days = roundingMethodFn(dstNormalizedMinutes / MINUTES_IN_DAY);
    return locale.formatDistance('xDays', days, localizeOptions); // 1 up to 12 months
  } else if (unit === 'month') {
    var months = roundingMethodFn(dstNormalizedMinutes / MINUTES_IN_MONTH);
    return months === 12 && options.unit !== 'month' ? locale.formatDistance('xYears', 1, localizeOptions) : locale.formatDistance('xMonths', months, localizeOptions); // 1 year up to max Date
  } else if (unit === 'year') {
    var years = roundingMethodFn(dstNormalizedMinutes / MINUTES_IN_YEAR);
    return locale.formatDistance('xYears', years, localizeOptions);
  }

  throw new RangeError("unit must be 'second', 'minute', 'hour', 'day', 'month' or 'year'");
}

/***/ }),

/***/ "./node_modules/date-fns/esm/formatDistanceToNowStrict/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/date-fns/esm/formatDistanceToNowStrict/index.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ formatDistanceToNowStrict)
/* harmony export */ });
/* harmony import */ var _formatDistanceStrict_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../formatDistanceStrict/index.js */ "./node_modules/date-fns/esm/formatDistanceStrict/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name formatDistanceToNowStrict
 * @category Common Helpers
 * @summary Return the distance between the given date and now in words.
 * @pure false
 *
 * @description
 * Return the distance between the given dates in words, using strict units.
 * This is like `formatDistance`, but does not use helpers like 'almost', 'over',
 * 'less than' and the like.
 *
 * | Distance between dates | Result              |
 * |------------------------|---------------------|
 * | 0 ... 59 secs          | [0..59] seconds     |
 * | 1 ... 59 mins          | [1..59] minutes     |
 * | 1 ... 23 hrs           | [1..23] hours       |
 * | 1 ... 29 days          | [1..29] days        |
 * | 1 ... 11 months        | [1..11] months      |
 * | 1 ... N years          | [1..N]  years       |
 *
 * @param {Date|Number} date - the given date
 * @param {Object} [options] - an object with options.
 * @param {Boolean} [options.addSuffix=false] - result indicates if the second date is earlier or later than the first
 * @param {'second'|'minute'|'hour'|'day'|'month'|'year'} [options.unit] - if specified, will force a unit
 * @param {'floor'|'ceil'|'round'} [options.roundingMethod='round'] - which way to round partial units
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @returns {String} the distance in words
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `options.locale` must contain `formatDistance` property
 *
 * @example
 * // If today is 1 January 2015, what is the distance to 2 July 2014?
 * var result = formatDistanceToNowStrict(
 *   new Date(2014, 6, 2)
 * )
 * //=> '6 months'
 *
 * @example
 * // If now is 1 January 2015 00:00:00,
 * // what is the distance to 1 January 2015 00:00:15, including seconds?
 * var result = formatDistanceToNowStrict(
 *   new Date(2015, 0, 1, 0, 0, 15)
 * )
 * //=> '20 seconds'
 *
 * @example
 * // If today is 1 January 2015,
 * // what is the distance to 1 January 2016, with a suffix?
 * var result = formatDistanceToNowStrict(
 *   new Date(2016, 0, 1),
 *   {addSuffix: true}
 * )
 * //=> 'in 1 year'
 *
 * @example
 * // If today is 28 January 2015,
 * // what is the distance to 1 January 2015, in months, rounded up??
 * var result = formatDistanceToNowStrict(new Date(2015, 0, 1), {
 *   unit: 'month',
 *   roundingMethod: 'ceil'
 * })
 * //=> '1 month'
 *
 * @example
 * // If today is 1 January 2015,
 * // what is the distance to 1 August 2016 in Esperanto?
 * var eoLocale = require('date-fns/locale/eo')
 * var result = formatDistanceToNowStrict(
 *   new Date(2016, 7, 1),
 *   {locale: eoLocale}
 * )
 * //=> '1 jaro'
 */

function formatDistanceToNowStrict(dirtyDate, dirtyOptions) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  return (0,_formatDistanceStrict_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate, Date.now(), dirtyOptions);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js":
/*!**************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildFormatLongFn)
/* harmony export */ });
function buildFormatLongFn(args) {
  return function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // TODO: Remove String()
    var width = options.width ? String(options.width) : args.defaultWidth;
    var format = args.formats[width] || args.formats[args.defaultWidth];
    return format;
  };
}

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildLocalizeFn)
/* harmony export */ });
function buildLocalizeFn(args) {
  return function (dirtyIndex, dirtyOptions) {
    var options = dirtyOptions || {};
    var context = options.context ? String(options.context) : 'standalone';
    var valuesArray;

    if (context === 'formatting' && args.formattingValues) {
      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      var width = options.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      var _defaultWidth = args.defaultWidth;

      var _width = options.width ? String(options.width) : args.defaultWidth;

      valuesArray = args.values[_width] || args.values[_defaultWidth];
    }

    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex; // @ts-ignore: For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!

    return valuesArray[index];
  };
}

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildMatchFn)
/* harmony export */ });
function buildMatchFn(args) {
  return function (string) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var width = options.width;
    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    var matchResult = string.match(matchPattern);

    if (!matchResult) {
      return null;
    }

    var matchedString = matchResult[0];
    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function (pattern) {
      return pattern.test(matchedString);
    }) : findKey(parsePatterns, function (pattern) {
      return pattern.test(matchedString);
    });
    var value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value: value,
      rest: rest
    };
  };
}

function findKey(object, predicate) {
  for (var key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key;
    }
  }

  return undefined;
}

function findIndex(array, predicate) {
  for (var key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }

  return undefined;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildMatchPatternFn)
/* harmony export */ });
function buildMatchPatternFn(args) {
  return function (string) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    var matchedString = matchResult[0];
    var parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value: value,
      rest: rest
    };
  };
}

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: 'less than a second',
    other: 'less than {{count}} seconds'
  },
  xSeconds: {
    one: '1 second',
    other: '{{count}} seconds'
  },
  halfAMinute: 'half a minute',
  lessThanXMinutes: {
    one: 'less than a minute',
    other: 'less than {{count}} minutes'
  },
  xMinutes: {
    one: '1 minute',
    other: '{{count}} minutes'
  },
  aboutXHours: {
    one: 'about 1 hour',
    other: 'about {{count}} hours'
  },
  xHours: {
    one: '1 hour',
    other: '{{count}} hours'
  },
  xDays: {
    one: '1 day',
    other: '{{count}} days'
  },
  aboutXWeeks: {
    one: 'about 1 week',
    other: 'about {{count}} weeks'
  },
  xWeeks: {
    one: '1 week',
    other: '{{count}} weeks'
  },
  aboutXMonths: {
    one: 'about 1 month',
    other: 'about {{count}} months'
  },
  xMonths: {
    one: '1 month',
    other: '{{count}} months'
  },
  aboutXYears: {
    one: 'about 1 year',
    other: 'about {{count}} years'
  },
  xYears: {
    one: '1 year',
    other: '{{count}} years'
  },
  overXYears: {
    one: 'over 1 year',
    other: 'over {{count}} years'
  },
  almostXYears: {
    one: 'almost 1 year',
    other: 'almost {{count}} years'
  }
};

var formatDistance = function (token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale[token];

  if (typeof tokenValue === 'string') {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace('{{count}}', count.toString());
  }

  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return 'in ' + result;
    } else {
      return result + ' ago';
    }
  }

  return result;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatDistance);

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_lib/buildFormatLongFn/index.js */ "./node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js");

var dateFormats = {
  full: 'EEEE, MMMM do, y',
  long: 'MMMM do, y',
  medium: 'MMM d, y',
  short: 'MM/dd/yyyy'
};
var timeFormats = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong = {
  date: (0,_lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    formats: dateFormats,
    defaultWidth: 'full'
  }),
  time: (0,_lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    formats: timeFormats,
    defaultWidth: 'full'
  }),
  dateTime: (0,_lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    formats: dateTimeFormats,
    defaultWidth: 'full'
  })
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatLong);

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: 'P'
};

var formatRelative = function (token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatRelative);

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_lib/buildLocalizeFn/index.js */ "./node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js");

var eraValues = {
  narrow: ['B', 'A'],
  abbreviated: ['BC', 'AD'],
  wide: ['Before Christ', 'Anno Domini']
};
var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter']
}; // Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.

var monthValues = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};
var dayValues = {
  narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};
var dayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mi',
    noon: 'n',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mi',
    noon: 'n',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  }
};

var ordinalNumber = function (dirtyNumber, _options) {
  var number = Number(dirtyNumber); // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`.
  //
  // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'.

  var rem100 = number % 100;

  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + 'st';

      case 2:
        return number + 'nd';

      case 3:
        return number + 'rd';
    }
  }

  return number + 'th';
};

var localize = {
  ordinalNumber: ordinalNumber,
  era: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    values: eraValues,
    defaultWidth: 'wide'
  }),
  quarter: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    values: quarterValues,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return quarter - 1;
    }
  }),
  month: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    values: monthValues,
    defaultWidth: 'wide'
  }),
  day: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    values: dayValues,
    defaultWidth: 'wide'
  }),
  dayPeriod: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    values: dayPeriodValues,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: 'wide'
  })
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (localize);

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/match/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/match/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_lib/buildMatchFn/index.js */ "./node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js");
/* harmony import */ var _lib_buildMatchPatternFn_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_lib/buildMatchPatternFn/index.js */ "./node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js");


var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: (0,_lib_buildMatchPatternFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns,
    defaultParseWidth: 'any'
  }),
  quarter: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: 'any'
  }),
  day: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns,
    defaultParseWidth: 'any'
  }),
  dayPeriod: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: 'any'
  })
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (match);

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_formatDistance_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/formatDistance/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js");
/* harmony import */ var _lib_formatLong_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_lib/formatLong/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js");
/* harmony import */ var _lib_formatRelative_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_lib/formatRelative/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js");
/* harmony import */ var _lib_localize_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_lib/localize/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js");
/* harmony import */ var _lib_match_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_lib/match/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/match/index.js");






/**
 * @type {Locale}
 * @category Locales
 * @summary English locale (United States).
 * @language English
 * @iso-639-2 eng
 * @author Sasha Koss [@kossnocorp]{@link https://github.com/kossnocorp}
 * @author Lesha Koss [@leshakoss]{@link https://github.com/leshakoss}
 */
var locale = {
  code: 'en-US',
  formatDistance: _lib_formatDistance_index_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  formatLong: _lib_formatLong_index_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  formatRelative: _lib_formatRelative_index_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  localize: _lib_localize_index_js__WEBPACK_IMPORTED_MODULE_3__["default"],
  match: _lib_match_index_js__WEBPACK_IMPORTED_MODULE_4__["default"],
  options: {
    weekStartsOn: 0
    /* Sunday */
    ,
    firstWeekContainsDate: 1
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (locale);

/***/ }),

/***/ "./node_modules/date-fns/esm/parseISO/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/esm/parseISO/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseISO)
/* harmony export */ });
/* harmony import */ var _constants_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/index.js */ "./node_modules/date-fns/esm/constants/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");



/**
 * @name parseISO
 * @category Common Helpers
 * @summary Parse ISO string
 *
 * @description
 * Parse the given string in ISO 8601 format and return an instance of Date.
 *
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If the argument isn't a string, the function cannot parse the string or
 * the values are invalid, it returns Invalid Date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The previous `parse` implementation was renamed to `parseISO`.
 *
 *   ```javascript
 *   // Before v2.0.0
 *   parse('2016-01-01')
 *
 *   // v2.0.0 onward
 *   parseISO('2016-01-01')
 *   ```
 *
 * - `parseISO` now validates separate date and time values in ISO-8601 strings
 *   and returns `Invalid Date` if the date is invalid.
 *
 *   ```javascript
 *   parseISO('2018-13-32')
 *   //=> Invalid Date
 *   ```
 *
 * - `parseISO` now doesn't fall back to `new Date` constructor
 *   if it fails to parse a string argument. Instead, it returns `Invalid Date`.
 *
 * @param {String} argument - the value to convert
 * @param {Object} [options] - an object with options.
 * @param {0|1|2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * const result = parseISO('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert string '+02014101' to date,
 * // if the additional number of digits in the extended year format is 1:
 * const result = parseISO('+02014101', { additionalDigits: 1 })
 * //=> Fri Apr 11 2014 00:00:00
 */

function parseISO(argument, dirtyOptions) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var options = dirtyOptions || {};
  var additionalDigits = options.additionalDigits == null ? 2 : (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(options.additionalDigits);

  if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
    throw new RangeError('additionalDigits must be 0, 1 or 2');
  }

  if (!(typeof argument === 'string' || Object.prototype.toString.call(argument) === '[object String]')) {
    return new Date(NaN);
  }

  var dateStrings = splitDateString(argument);
  var date;

  if (dateStrings.date) {
    var parseYearResult = parseYear(dateStrings.date, additionalDigits);
    date = parseDate(parseYearResult.restDateString, parseYearResult.year);
  }

  if (!date || isNaN(date.getTime())) {
    return new Date(NaN);
  }

  var timestamp = date.getTime();
  var time = 0;
  var offset;

  if (dateStrings.time) {
    time = parseTime(dateStrings.time);

    if (isNaN(time)) {
      return new Date(NaN);
    }
  }

  if (dateStrings.timezone) {
    offset = parseTimezone(dateStrings.timezone);

    if (isNaN(offset)) {
      return new Date(NaN);
    }
  } else {
    var dirtyDate = new Date(timestamp + time); // js parsed string assuming it's in UTC timezone
    // but we need it to be parsed in our timezone
    // so we use utc values to build date in our timezone.
    // Year values from 0 to 99 map to the years 1900 to 1999
    // so set year explicitly with setFullYear.

    var result = new Date(0);
    result.setFullYear(dirtyDate.getUTCFullYear(), dirtyDate.getUTCMonth(), dirtyDate.getUTCDate());
    result.setHours(dirtyDate.getUTCHours(), dirtyDate.getUTCMinutes(), dirtyDate.getUTCSeconds(), dirtyDate.getUTCMilliseconds());
    return result;
  }

  return new Date(timestamp + time + offset);
}
var patterns = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
};
var dateRegex = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
var timeRegex = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
var timezoneRegex = /^([+-])(\d{2})(?::?(\d{2}))?$/;

function splitDateString(dateString) {
  var dateStrings = {};
  var array = dateString.split(patterns.dateTimeDelimiter);
  var timeString; // The regex match should only return at maximum two array elements.
  // [date], [time], or [date, time].

  if (array.length > 2) {
    return dateStrings;
  }

  if (/:/.test(array[0])) {
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];

    if (patterns.timeZoneDelimiter.test(dateStrings.date)) {
      dateStrings.date = dateString.split(patterns.timeZoneDelimiter)[0];
      timeString = dateString.substr(dateStrings.date.length, dateString.length);
    }
  }

  if (timeString) {
    var token = patterns.timezone.exec(timeString);

    if (token) {
      dateStrings.time = timeString.replace(token[1], '');
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }

  return dateStrings;
}

function parseYear(dateString, additionalDigits) {
  var regex = new RegExp('^(?:(\\d{4}|[+-]\\d{' + (4 + additionalDigits) + '})|(\\d{2}|[+-]\\d{' + (2 + additionalDigits) + '})$)');
  var captures = dateString.match(regex); // Invalid ISO-formatted year

  if (!captures) return {
    year: NaN,
    restDateString: ''
  };
  var year = captures[1] ? parseInt(captures[1]) : null;
  var century = captures[2] ? parseInt(captures[2]) : null; // either year or century is null, not both

  return {
    year: century === null ? year : century * 100,
    restDateString: dateString.slice((captures[1] || captures[2]).length)
  };
}

function parseDate(dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) return new Date(NaN);
  var captures = dateString.match(dateRegex); // Invalid ISO-formatted string

  if (!captures) return new Date(NaN);
  var isWeekDate = !!captures[4];
  var dayOfYear = parseDateUnit(captures[1]);
  var month = parseDateUnit(captures[2]) - 1;
  var day = parseDateUnit(captures[3]);
  var week = parseDateUnit(captures[4]);
  var dayOfWeek = parseDateUnit(captures[5]) - 1;

  if (isWeekDate) {
    if (!validateWeekDate(year, week, dayOfWeek)) {
      return new Date(NaN);
    }

    return dayOfISOWeekYear(year, week, dayOfWeek);
  } else {
    var date = new Date(0);

    if (!validateDate(year, month, day) || !validateDayOfYearDate(year, dayOfYear)) {
      return new Date(NaN);
    }

    date.setUTCFullYear(year, month, Math.max(dayOfYear, day));
    return date;
  }
}

function parseDateUnit(value) {
  return value ? parseInt(value) : 1;
}

function parseTime(timeString) {
  var captures = timeString.match(timeRegex);
  if (!captures) return NaN; // Invalid ISO-formatted time

  var hours = parseTimeUnit(captures[1]);
  var minutes = parseTimeUnit(captures[2]);
  var seconds = parseTimeUnit(captures[3]);

  if (!validateTime(hours, minutes, seconds)) {
    return NaN;
  }

  return hours * _constants_index_js__WEBPACK_IMPORTED_MODULE_2__.millisecondsInHour + minutes * _constants_index_js__WEBPACK_IMPORTED_MODULE_2__.millisecondsInMinute + seconds * 1000;
}

function parseTimeUnit(value) {
  return value && parseFloat(value.replace(',', '.')) || 0;
}

function parseTimezone(timezoneString) {
  if (timezoneString === 'Z') return 0;
  var captures = timezoneString.match(timezoneRegex);
  if (!captures) return 0;
  var sign = captures[1] === '+' ? -1 : 1;
  var hours = parseInt(captures[2]);
  var minutes = captures[3] && parseInt(captures[3]) || 0;

  if (!validateTimezone(hours, minutes)) {
    return NaN;
  }

  return sign * (hours * _constants_index_js__WEBPACK_IMPORTED_MODULE_2__.millisecondsInHour + minutes * _constants_index_js__WEBPACK_IMPORTED_MODULE_2__.millisecondsInMinute);
}

function dayOfISOWeekYear(isoWeekYear, week, day) {
  var date = new Date(0);
  date.setUTCFullYear(isoWeekYear, 0, 4);
  var fourthOfJanuaryDay = date.getUTCDay() || 7;
  var diff = (week - 1) * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
} // Validation functions
// February is null to handle the leap year (using ||)


var daysInMonths = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYearIndex(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}

function validateDate(year, month, date) {
  return month >= 0 && month <= 11 && date >= 1 && date <= (daysInMonths[month] || (isLeapYearIndex(year) ? 29 : 28));
}

function validateDayOfYearDate(year, dayOfYear) {
  return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex(year) ? 366 : 365);
}

function validateWeekDate(_year, week, day) {
  return week >= 1 && week <= 53 && day >= 0 && day <= 6;
}

function validateTime(hours, minutes, seconds) {
  if (hours === 24) {
    return minutes === 0 && seconds === 0;
  }

  return seconds >= 0 && seconds < 60 && minutes >= 0 && minutes < 60 && hours >= 0 && hours < 25;
}

function validateTimezone(_hours, minutes) {
  return minutes >= 0 && minutes <= 59;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/toDate/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/toDate/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toDate)
/* harmony export */ });
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */

function toDate(argument) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var argStr = Object.prototype.toString.call(argument); // Clone the date

  if (argument instanceof Date || typeof argument === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"); // eslint-disable-next-line no-console

      console.warn(new Error().stack);
    }

    return new Date(NaN);
  }
}

/***/ }),

/***/ "./src/todo-logic.js":
/*!***************************!*\
  !*** ./src/todo-logic.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "List": () => (/* binding */ List),
/* harmony export */   "MasterList": () => (/* binding */ MasterList),
/* harmony export */   "Task": () => (/* binding */ Task)
/* harmony export */ });


/**
 
 TABLE OF CONTENTS
 * Master List
 * Lists
 * Tasks
 
 */

// MASTER LIST
class MasterList {
  constructor() {
    this.items = [];
  }

  addItem(title) {
    this.items.unshift(new List(title));
    return this;
  }

  deleteItem(index) {
    this.items.splice(index, 1);
    return this;
  }

  /**
   * @param dir = 1 if moved down; -1 if moved up
   */
  moveItem(index, dir) {
    const movedItem = this.items.splice(index, 1)[0];
    this.items.splice(index + dir, 0, movedItem);
    return this;
  }

  sortItems(category) {
    if (category === "completed") {
      this.items.sort((a, b) => a[category] - b[category]);
      console.log("c");
      return this;
    }

    if (category === "dateDue") {
      this.items.sort(
        (a, b) => Date.parse(a[category]) - Date.parse(b[category])
      );
      console.log("d");
      return this;
    }

    this.items.sort((a, b) => b[category] - a[category]);
    console.log("o");
    return this;
  }
}

// LISTS
class List extends MasterList {
  constructor(title) {
    super();
    this.title = title;
    this.id = Date.now();
    this.color = "initial";
    this.items = [];
  }

  // Add Task
  addItem(title, desc, dateDue, priority) {
    this.items.unshift(new Task(title, desc, dateDue, priority));
    return this;
  }

  _clearCompletedTasks() {
    this.items = this.items.filter((a) => a.completed === false);
  }
}

// TASKS
class Task {
  constructor(title, desc, dateDue, priority) {
    this.title = title;
    this.desc = desc;
    this.id = Date.now();
    this.dateDue = dateDue;
    this.priority = priority;
    this.completed = false;
    this.completedDate;
  }

  // Toggle Completed
  toggleCompleted() {
    this.completed === false
      ? (this.completed = true)
      : (this.completed = false);

    if (this.completed === true)
      this.completedDate = new Date().toLocaleString(navigator.languages[0], {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });

    if (this.completed === false) this.completedDate = "";

    return this;
  }

  // Toggle Priority
  togglePriority() {
    this.priority === false ? (this.priority = true) : (this.priority = false);
    return this;
  }
}




/***/ }),

/***/ "./src/visual.js":
/*!***********************!*\
  !*** ./src/visual.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addErrorOutline": () => (/* binding */ addErrorOutline),
/* harmony export */   "addList": () => (/* binding */ addList),
/* harmony export */   "addPriorityVisual": () => (/* binding */ addPriorityVisual),
/* harmony export */   "addTask": () => (/* binding */ addTask),
/* harmony export */   "clearForm": () => (/* binding */ clearForm),
/* harmony export */   "daysLeft": () => (/* binding */ daysLeft),
/* harmony export */   "dimCompletedTasks": () => (/* binding */ dimCompletedTasks),
/* harmony export */   "expandSelectedDetails": () => (/* binding */ expandSelectedDetails),
/* harmony export */   "hideNonSelectedDetails": () => (/* binding */ hideNonSelectedDetails),
/* harmony export */   "hideSidebarListOptions": () => (/* binding */ hideSidebarListOptions),
/* harmony export */   "hideTaskDetails": () => (/* binding */ hideTaskDetails),
/* harmony export */   "removeErrorOutline": () => (/* binding */ removeErrorOutline),
/* harmony export */   "removePriorityVisual": () => (/* binding */ removePriorityVisual),
/* harmony export */   "toggleButtonSpin": () => (/* binding */ toggleButtonSpin),
/* harmony export */   "toggleHideEl": () => (/* binding */ toggleHideEl),
/* harmony export */   "toggleInactiveDetailsBtns": () => (/* binding */ toggleInactiveDetailsBtns),
/* harmony export */   "toggleSidebar": () => (/* binding */ toggleSidebar),
/* harmony export */   "toggleSidebarListOptions": () => (/* binding */ toggleSidebarListOptions),
/* harmony export */   "toggleSidebarNewListTitle": () => (/* binding */ toggleSidebarNewListTitle),
/* harmony export */   "toggleTaskCompletedDueDate": () => (/* binding */ toggleTaskCompletedDueDate),
/* harmony export */   "toggleTaskDetailsBtn": () => (/* binding */ toggleTaskDetailsBtn),
/* harmony export */   "undoCompletedDim": () => (/* binding */ undoCompletedDim),
/* harmony export */   "updateActiveListTitle": () => (/* binding */ updateActiveListTitle)
/* harmony export */ });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/parseISO/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/formatDistanceToNowStrict/index.js");




/**
 * TABLE OF CONTENTS
 
 * Dry Functions
 * Header Buttons
 * Task Buttons
 * Sidebar Buttons
 * Active Task List
 * HTML Inserts
 * Exports
 
 **/

/* ************************************************** */
//* DRY FUNCTIONS
/* ************************************************** */
const clearForm = function (formTitle, formDue, formDesc, formPriority) {
  removeErrorOutline(formTitle);

  formTitle.value = "";
  formDue.value = "";
  formDesc.value = "";
  formPriority.checked = false;
};

const toggleHideEl = (el) => el.classList.toggle("hidden");

const removeErrorOutline = (el) => el.classList.remove("red-outline");
const addErrorOutline = (el) => el.classList.add("red-outline");

/* ************************************************** */
//* HEADER BUTTONS
/* ************************************************** */
// SIDEBAR TOGGLE
const toggleSidebar = function (
  sidebar,
  listsMenuEndBars,
  listsMenuMidBar1,
  listsMenuMidBar2
) {
  // Reveal side bar
  toggleHideEl(sidebar);

  // Tranform close button
  listsMenuEndBars.forEach((bar) => bar.classList.toggle("bar--vanish"));
  listsMenuMidBar1.classList.toggle("bar__mid--rotate");
  listsMenuMidBar2.classList.toggle("bar__mid2--rotate");
};

/* ************************************************** */
//* TASK BUTTONS
/* ************************************************** */
// Change completed task checkbox visual
const dimCompletedTasks = function (clicked) {
  // Change task text color / strikethru
  clicked.parentElement.classList.add("checked");

  // Change task details button color
  clicked.parentElement.lastElementChild.firstElementChild.classList.add(
    "btn__details--completed"
  );

  // Change task item filter
  clicked.parentElement.parentElement.classList.add("completed--true");

  // Change Details due date font color
  clicked.parentElement.parentElement.lastElementChild.lastElementChild.firstElementChild.lastElementChild?.classList.add(
    "checked"
  );
};

const undoCompletedDim = function (clicked) {
  // Change task text color / strikethru
  clicked.parentElement.classList.remove("checked");

  // Change task details button color
  clicked.parentElement.lastElementChild.firstElementChild.classList.remove(
    "btn__details--completed"
  );

  // Change task item filter
  clicked.parentElement.parentElement.classList.remove("completed--true");

  // Change Details due date font color
  clicked.parentElement.parentElement.lastElementChild.lastElementChild.firstElementChild.lastElementChild?.classList.remove(
    "checked"
  );
};

// Visual for open task details button
const toggleTaskDetailsBtn = function (clicked) {
  clicked.classList.contains("btn__details--open")
    ? clicked.classList.remove("btn__details--open")
    : clicked.classList.add("btn__details--open");
};

const toggleInactiveDetailsBtns = function (e) {
  const buttons = document.querySelectorAll(".btn__details");
  for (let button of buttons) {
    // Close any task details open to stop multiple at once
    if (button !== e.target) {
      button.classList.remove("btn__details--open");

      if (
        button.parentElement.parentElement.parentElement.children.length === 2
      )
        hideTaskDetails(button.parentElement.parentElement.parentElement);
    }
  }
};

const expandSelectedDetails = function (
  clicked,
  priority,
  desc,
  completed,
  dateDue
) {
  if (clicked.classList.contains("btn__details--open"))
    expandTaskitem(
      clicked.parentElement.parentElement.parentElement,
      priority,
      desc,
      completed,
      dateDue
    );
};

const hideNonSelectedDetails = function (clicked) {
  if (!clicked.classList.contains("btn__details--open"))
    hideTaskDetails(clicked.parentElement.parentElement.parentElement);
};

// Change priority checkbox visual
const addPriorityVisual = function (clicked) {
  // Change background color of task
  clicked.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add(
    "priority--true"
  );
};

const removePriorityVisual = function (clicked) {
  // Change background color back
  clicked.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove(
    "priority--true"
  );
};

// Change inner details of date due -> completed and back
const toggleTaskCompletedDueDate = function (clicked, activeList, itemIndex) {
  if (clicked.parentElement.parentElement.children.length === 2) {
    clicked.parentElement.parentElement.lastElementChild.lastElementChild.firstElementChild.lastElementChild.firstElementChild.innerHTML = `${
      activeList.items[itemIndex].completed === true ? "Completed" : "Due"
    }`;

    clicked.parentElement.parentElement.lastElementChild.lastElementChild.firstElementChild.lastElementChild.lastElementChild.innerHTML = `${
      activeList.items[itemIndex].completed === false
        ? activeList.items[itemIndex].dateDue.slice(5)
        : `${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(
            new Date().getDate()
          ).padStart(2, "0")}`
    }`;
  }
};

/* ************************************************** */
//* SIDEBAR BUTTONS
/* ************************************************** */
// Sidebar lists options
const toggleSidebarListOptions = function (clicked) {
  toggleHideEl(clicked.parentElement.lastElementChild);
};

const hideSidebarListOptions = function (clicked) {
  toggleHideEl(clicked.parentElement);
};

const toggleSidebarNewListTitle = function (el) {
  el.classList.toggle("add__list-title--visible");
};

const toggleButtonSpin = function (el) {
  el.classList.toggle("spin-45deg");
};

/* ************************************************** */
//* Active Task List
/* ************************************************** */
const updateActiveListTitle = function (listNameEl, listName) {
  listNameEl.textContent = listName;
};

/* ************************************************** */
//* HTML Inserts
/* ************************************************** */
const expandTaskitem = function (el, priority, desc, completed, dateDue) {
  const htmlTaskDetails = `
    <div class="taskitem--expanded">
      <hr class="taskitem__divider" />

      <div class="taskitem__details__container">
        <div class="taskitem__details__txt-container">
          <p>${desc}</p>
          <div class="taskitem__due-date__container ${
            completed === true ? "checked" : ""
          }">
            <div class="taskitem__due-date__title">${
              completed === true ? "Completed" : "Due"
            }</div>
            <div class="taskitem__due-date__date">${
              completed === false
                ? dateDue.slice(5)
                : `${String(new Date().getMonth() + 1).padStart(
                    2,
                    "0"
                  )}-${String(new Date().getDate()).padStart(2, "0")}`
            }</div>
          </div>
        </div>

        <div class="taskitem__details__actions-container">
          <label class="taskitem__priority-check">
            Priority
            <input
              type="checkbox"
              name="priority__checkbox"
              class="taskitem__priority-check__checkbox"
              ${priority === true ? "checked" : ""}
            />
          </label>
          <div class="taskitem__edit__container">
            <img
              src="./images/edit.svg"
              height="22px"
              alt="Edit task"
              title="Edit task"
              class="btn btn__taskitem__edit"
            />
          </div>
          <div class="taskitem__del__container">
            <img
              src="./images/trash.svg"
              height="25px"
              alt="Delete task"
              title="Delete task"
              class="btn btn__taskitem__delete"
            />
          </div>
        </div>
        <!-- end taskitem__details__actions-container -->
      </div>
      <!-- end taskitem__details__container -->
    </div>
  `;

  el.insertAdjacentHTML("beforeend", htmlTaskDetails);
};

const hideTaskDetails = function (el) {
  el.removeChild(el.lastElementChild);
};

const addList = function (el, title, numDue, id, activeListID) {
  const htmlListItem = `
    <div class="sidebar__listitem${
      activeListID === id ? " active-list" : ""
    }" id="${id}">
      <div class="listitem__options__container">
      <img 
        src="./images/lists-menu.png"
        height="20px"
        class="btn btn__listitem__options"
      />
      <div class="listitem__options__menu__container hidden">
        <div class="arrow-up"></div>
        <img
          src="./images/trash.svg"
          class="btn btn__listitem btn__listitem--del"
          height="28px"
        />
        <img
          src="./images/down-triangle.png"
          class="btn btn__listitem btn__listitem--up"
          height="28px"
        />
        <img
          src="./images/down-triangle.png"
          class="btn btn__listitem btn__listitem--down"
          height="28px"
        />
      </div>
      <!-- end listitem__options__menu__container -->
      </div>
        <div class="listitem__title">${title}</div>
        <div class="listitem__due-count">
        <div class="listitem__due-count__title">Tasks Due:</div>
        <div class="listitem__due-count__count">${numDue}</div>
      </div>
    </div>
  `;

  el.insertAdjacentHTML("afterend", htmlListItem);
};

const daysLeft = function (date) {
  const dateISO = (0,date_fns__WEBPACK_IMPORTED_MODULE_0__["default"])(date);
  const result = (0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(dateISO, {
    addSuffix: true,
    unit: "day",
  });

  let output;

  if (result === "0 days ago" || result === "in 0 days") output = "Due today";
  else if (result === "in 1 day") output = "Due tomorrow";
  else if (result === "1 day ago") output = "Due yesterday! AH!";
  else if (result.includes("days ago")) output = "OVERDUE!";
  else output = `Due ${result}`;

  // if (result === "in 0 days") output = "Due tomorrow";
  // else if (result === "1 day ago") output = "Due today";
  // else if (result.includes("days ago")) output = "Overdue!";
  // else {
  //   const fixStupidDate = differenceInCalendarDays(dateISO, new Date());
  //   output = `Due in ${fixStupidDate} days`;
  // }

  return output;
};

const addTask = function (el, title, dateDue, priority, id, completed) {
  const htmlTaskItem = `
  <div id=${id} class="taskitem${priority === true ? " priority--true" : ""}${
    completed ? " completed--true" : ""
  }">
    <div class="taskitem__abbr${completed ? " checked" : ""}">
      <input
        type="checkbox"
        name="completed-checkbox"
        class="taskitem__checkbox"
        ${completed ? "checked" : ""}
      />
      <div class="taskitem__txtbox">
        <h3>${title}</h3>
        <p>${dateDue === "" ? `&nbsp;` : daysLeft(dateDue)}</p>
      </div>
      <div class="taskitem__btn-details__container">
        <img
          src="./images/down-triangle.png"
          alt="Open details"
          title="Details"
          height="20px"
          class="btn btn__details${completed ? " btn__details--completed" : ""}"
        />
      </div>
    </div>
  </div>
`;

  el.insertAdjacentHTML("afterend", htmlTaskItem);
};

/* ************************************************** */
//* EXPORTS
/* ************************************************** */



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _todo_logic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo-logic.js */ "./src/todo-logic.js");
/* harmony import */ var _visual_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./visual.js */ "./src/visual.js");


/**
 
 TABLE OF CONTENTS

 * Modules
 * DOM Variables
 * DRY Functions
 * Header Buttons
 * Task Buttons
 * Sidebar Buttons
 * Form Buttons
 * App Logic

**/

/* ************************************************** */
//* MODULES
/* ************************************************** */



/* ************************************************** */
//* DOM VARIABLES
/* ************************************************** */
// BUTTONS
// ---- Header
const btnListsMenu = document.querySelector(".lists-menu");
const listsMenuEndBars = document.querySelectorAll(".bar__end");
const listsMenuMidBar1 = document.querySelector(".bar__mid");
const listsMenuMidBar2 = document.querySelector(".bar__mid2");
const btnAddTask = document.querySelector(".add-task");

// ---- Tasks

// ---- Sidebar
const btnAddList = document.querySelector(".btn__sidebar__add-list");
const btnAddListTitle = document.querySelector("#add-list__title");

// ---- Form
const btnFormClose = document.querySelector(".btn__form-close");
const btnFormSubmit = document.querySelector(".btn__form-submit");

// SIDEBAR
const sidebar = document.querySelector(".sidebar");
const sidebarHeader = document.querySelector(".sidebar__header");
const sidebarAddListTitleContainer = document.querySelector(
  ".sidebar__add-list__add-title__container"
);
const sidebarAddListTitleInput = document.querySelector(
  ".sidebar__add-list__add-title"
);

// HEADER
const sortOptsContainer = document.querySelector(".sortby__opts__container");

// FORM
const form = document.querySelector(".form");
const formTitle = document.querySelector(".form__title");
const formTaskTitle = document.querySelector(".form__text--title");
const formDue = document.querySelector(".form__date");
const formDesc = document.querySelector(".form__text-area");
const formPriority = document.querySelector(".form__priority__checkbox");
const formPriorityContainer = document.querySelector(
  ".form__priority__container"
);

// MAIN APP
const logo = document.querySelector(".logo__container");
const activeListWindow = document.querySelector(".main-app");
const activeListHeader = document.querySelector(".active-list__header");
const activeListTitle = document.querySelector(".active-list__title");

/* ************************************************** */
//* DRY FUNCTIONS
/* ************************************************** */
const findItemIndex = function (clicked) {
  const taskID = +clicked.closest(".taskitem").id;
  return activeList.items.findIndex((item) => item.id === taskID);
};

const findListIndex = function (clickedBtn) {
  return masterList.items.findIndex(
    (list) => list.id === +clickedBtn.closest(".sidebar__listitem").id
  );
};

const closeAllOpenModals = function (e) {
  if (
    e.target !== btnListsMenu &&
    !e.target.classList.contains("lists-menu__bar")
  ) {
    sidebar.classList.add("hidden");
    listsMenuEndBars.forEach((bar) => bar.classList.remove("bar--vanish"));
    listsMenuMidBar1.classList.remove("bar__mid--rotate");
    listsMenuMidBar2.classList.remove("bar__mid2--rotate");
  }

  if (!e.target.classList.contains("img__add-task"))
    form.classList.add("hidden");

  if (!e.target.classList.contains("btn__show__sort-opts"))
    sortOptsContainer.classList.remove("show-sort-opts");
};

const updateActiveListUI = function () {
  // Clear visible list to allow for update
  while (activeListWindow.children.length > 1) {
    activeListWindow.removeChild(activeListWindow.lastChild);
  }

  // Shallow copy to reverse so items remain in correct order visually
  const copyList = activeList.items.slice();
  copyList.reverse();

  copyList.forEach((task) => {
    (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.addTask)(
      activeListHeader,
      task.title,
      task.dateDue,
      task.priority,
      task.id,
      task.completed
    );
  });
};

const updateSidebarUI = function () {
  // Clear visible list to allow for update
  while (sidebar.children.length > 1) {
    sidebar.removeChild(sidebar.lastChild);
  }

  const copyList = masterList.items.slice();
  copyList.reverse();

  copyList.forEach((list) => {
    const incompleteItems = list.items.filter(
      (item) => item.completed === false
    );

    (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.addList)(
      sidebarHeader,
      list.title,
      incompleteItems.length,
      list.id,
      activeList.id
    );
  });
};

/* ************************************************** */
//* HEADER
/* ************************************************** */
//* ---------- BUTTONS ----------
//* SIDEBAR TOGGLE
btnListsMenu.addEventListener("click", (e) => {
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.toggleSidebar)(sidebar, listsMenuEndBars, listsMenuMidBar1, listsMenuMidBar2);

  closeAllOpenModals(e);

  // Update sidebar UI if opening sidebar
  if (btnListsMenu.firstElementChild.classList.contains("bar--vanish")) {
    updateSidebarUI();
  }
});

//* ADD TASK OPEN
btnAddTask.addEventListener("click", (e) => {
  formTitle.textContent = "Add Task";
  btnFormSubmit.value = "Add Task";
  formPriorityContainer.classList.remove("invisible");
  form.removeAttribute("data-taskid");
  closeAllOpenModals(e);
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.toggleHideEl)(form);
  formTaskTitle.focus();
});

//* ACTIVELIST HEADER BUTTONS
activeListHeader.addEventListener("click", (e) => {
  const openSortOpts = e.target.closest(".btn__show__sort-opts");
  const sortDirFlip = e.target.closest(".btn__active-list__sort-dir");
  const clearCompleted = e.target.closest(".btn__clear-compl");

  if (!openSortOpts && !sortDirFlip && !clearCompleted) return;

  // Open sorting options menu
  if (openSortOpts) sortOptsContainer.classList.toggle("show-sort-opts");

  // Flip Sort Directions
  if (sortDirFlip) {
    activeList.items.reverse();
    updateActiveListUI();
  }

  // Clear Completed
  if (clearCompleted) {
    activeList._clearCompletedTasks();
    updateActiveListUI();
  }
});

//* SORT OPTIONS
sortOptsContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".sortby__opts__item");

  sortOptsContainer.classList.toggle("show-sort-opts");

  if (!clicked) return;

  activeList.sortItems(clicked.dataset.sortid);

  updateActiveListUI();
});

/* ************************************************** */
//* TASK
/* ************************************************** */
//* ---------- BUTTONS ----------
//* COMPLETED TASK CHECKBOX
activeListWindow.addEventListener("click", (e) => {
  const clicked = e.target.closest(".taskitem__checkbox");
  if (!clicked) return;

  const itemIndex = findItemIndex(clicked);

  // Data Change
  activeList.items[itemIndex].toggleCompleted();

  // Visual Change
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.toggleTaskCompletedDueDate)(clicked, activeList, itemIndex);

  if (clicked.checked) {
    (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.dimCompletedTasks)(clicked);
  }

  // Undo Change completed task visual
  if (!clicked.checked) (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.undoCompletedDim)(clicked);
});

//* OPEN TASK DETAILS
activeListWindow.addEventListener("click", (e) => {
  const clicked = e.target.closest(".btn__details");

  if (!clicked) return;

  const taskID = +clicked.closest(".taskitem").id;
  const taskInArr = activeList.items.filter((task) => task.id === taskID);

  // Toggle task details open on click
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.toggleTaskDetailsBtn)(clicked);
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.toggleInactiveDetailsBtns)(e);
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.expandSelectedDetails)(
    clicked,
    taskInArr[0].priority,
    taskInArr[0].desc,
    taskInArr[0].completed,
    taskInArr[0].dateDue
  );
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.hideNonSelectedDetails)(clicked);
});

//* CHANGE PRIORITY CHECKBOX
activeListWindow.addEventListener("click", (e) => {
  const clicked = e.target.closest(".taskitem__priority-check__checkbox");
  if (!clicked) return;

  const itemIndex = findItemIndex(clicked);

  // Data Change
  activeList.items[itemIndex].togglePriority();

  // Visual Change
  if (clicked.checked) (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.addPriorityVisual)(clicked);

  if (!clicked.checked) (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.removePriorityVisual)(clicked);
});

//* EDIT TASK
activeListWindow.addEventListener("click", (e) => {
  const clicked = e.target.closest(".btn__taskitem__edit");
  if (!clicked) return;

  const itemIndex = findItemIndex(clicked);

  formTitle.textContent = "Edit Task";
  btnFormSubmit.value = "Edit Task";
  formPriorityContainer.classList.add("invisible");

  // Populate form with arr info
  formTaskTitle.value = activeList.items[itemIndex].title;
  formDue.value = activeList.items[itemIndex].dateDue;
  formDesc.value = activeList.items[itemIndex].desc;

  // Add data attribute to track arr item placement
  form.setAttribute("data-taskid", activeList.items[itemIndex].id);

  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.toggleHideEl)(form);
});

//* DELETE TASK
activeListWindow.addEventListener("click", (e) => {
  const clicked = e.target.closest(".btn__taskitem__delete");
  if (!clicked) return;

  const itemIndex = findItemIndex(clicked);

  activeList.items.splice(itemIndex, 1);

  updateActiveListUI();
});

/* ************************************************** */
//* SIDEBAR
/* ************************************************** */
// Remove error outline when input selected
sidebarAddListTitleInput.addEventListener("focus", () => {
  sidebarAddListTitleInput.classList.remove("red-outline");
});

// Active List Selection
sidebar.addEventListener("click", (e) => {
  const clicked = e.target.closest(".listitem__title");
  if (!clicked) return;

  const lists = sidebar.querySelectorAll(".sidebar__listitem");
  lists.forEach((list) => {
    list.classList.remove("active-list");
  });

  const selectedListIndex = masterList.items.findIndex(
    (item) => item.id === +clicked.parentElement.id
  );
  activeList = masterList.items[selectedListIndex];

  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.updateActiveListTitle)(activeListTitle, activeList.title);
  updateActiveListUI();

  clicked.parentElement.classList.add("active-list");
});

//* ---------- BUTTONS ----------
//* SIDEBAR OPEN ADD LIST INPUT
btnAddList.addEventListener("click", (e) => {
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.toggleSidebarNewListTitle)(sidebarAddListTitleContainer);
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.toggleButtonSpin)(btnAddList);
  sidebarAddListTitleInput.value = "";
  sidebarAddListTitleInput.focus();
});

//* ADD NEW LIST
btnAddListTitle.addEventListener("click", () => {
  if (sidebarAddListTitleInput.value === "") {
    sidebarAddListTitleInput.classList.add("red-outline");
    return;
  }

  // Change Data
  masterList.addItem(sidebarAddListTitleInput.value);

  // Change Visual
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.addList)(
    sidebarHeader,
    masterList.items[0].title,
    masterList.items[0].items.length,
    masterList.items[0].id
  );

  // Remove active list on previous
  const lists = sidebar.querySelectorAll(".sidebar__listitem");
  lists.forEach((list) => {
    list.classList.remove("active-list");
  });

  // Change active list to new list
  activeList = masterList.items[0];

  // Clear title input and hide
  sidebarAddListTitleInput.value = "";
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.toggleSidebarNewListTitle)(sidebarAddListTitleContainer);
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.toggleButtonSpin)(btnAddList);

  updateSidebarUI();
  updateActiveListUI();
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.updateActiveListTitle)(activeListTitle, activeList.title);
});

//* SIDEBAR LIST OPTIONS
// Open List options
sidebar.addEventListener("click", (e) => {
  const clicked = e.target.closest(".btn__listitem__options");
  if (!clicked) return;

  console.log(clicked);
  console.log(clicked.parentElement.lastElementChild);

  if (!clicked.parentElement.lastElementChild.classList.contains("hidden")) {
    (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.toggleSidebarListOptions)(clicked);
    return;
  }

  const listOpts = document.querySelectorAll(
    ".listitem__options__menu__container"
  );

  listOpts.forEach(function (listOpt) {
    listOpt.classList.add("hidden");
  });

  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.toggleSidebarListOptions)(clicked);
});

// List Options
sidebar.addEventListener("click", (e) => {
  const clickedTrash = e.target.closest(".btn__listitem--del");
  const clickedArrowUp = e.target.closest(".btn__listitem--up");
  const clickedArrowDown = e.target.closest(".btn__listitem--down");

  if (!clickedTrash && !clickedArrowUp && !clickedArrowDown) return;

  // Close menu if any clicked
  if (clickedTrash || clickedArrowUp || clickedArrowDown) {
    const clicked = clickedTrash || clickedArrowUp || clickedArrowDown;
    (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.hideSidebarListOptions)(clicked);
  }

  // Delete selected list
  if (clickedTrash) {
    const itemInArrIndex = masterList.items.findIndex(
      (list) => list.id === +clickedTrash.closest(".sidebar__listitem").id
    );

    if (masterList.items.length === 1) return;
    if (masterList.items[itemInArrIndex].id === activeList.id) {
      activeList = masterList.items[1];
    }

    masterList.deleteItem(itemInArrIndex);

    updateSidebarUI();
    updateActiveListUI();
    (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.updateActiveListTitle)(activeListTitle, activeList.title);
  }

  // Move selected list up
  if (clickedArrowUp) {
    const itemInArrIndex = findListIndex(clickedArrowUp);
    masterList.moveItem(itemInArrIndex, -1);
    updateSidebarUI();
  }

  // Move selected list down
  if (clickedArrowDown) {
    const itemInArrIndex = findListIndex(clickedArrowDown);
    masterList.moveItem(itemInArrIndex, 1);
    updateSidebarUI();
  }
});

/* ************************************************** */
//* FORM
/* ************************************************** */
formTaskTitle.addEventListener("focus", () => {
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.removeErrorOutline)(formTaskTitle);
});

//* ---------- BUTTONS ----------
btnFormClose.addEventListener("click", () => {
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.toggleHideEl)(form);
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.clearForm)(formTaskTitle, formDue, formDesc, formPriority);
});

btnFormSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  // Error if Task title not designated
  if (formTaskTitle.value === "") {
    (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.addErrorOutline)(formTaskTitle);
    return;
  }

  if (!form.hasAttribute("data-taskid")) {
    formTaskTitle.blur();

    // Add task to array
    activeList.addItem(
      formTaskTitle.value,
      formDesc.value,
      formDue.value,
      formPriority.checked
    );

    // Add task to DOM
    (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.addTask)(
      activeListHeader,
      activeList.items[0].title,
      activeList.items[0].dateDue,
      activeList.items[0].priority,
      activeList.items[0].id,
      activeList.items[0].completed
    );
  }

  if (form.hasAttribute("data-taskid")) {
    formTaskTitle.blur();

    const curTaskIndex = activeList.items.findIndex(
      (item) => item.id === +form.dataset.taskid
    );
    activeList.items[curTaskIndex].title = formTaskTitle.value;
    activeList.items[curTaskIndex].desc = formDesc.value;
    activeList.items[curTaskIndex].dateDue = formDue.value;

    updateActiveListUI();
  }

  // Hide and reset form
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.toggleHideEl)(form);
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.clearForm)(formTaskTitle, formDue, formDesc, formPriority);
});

/* ************************************************** */
//* APP LOGIC
/* ************************************************** */
// Initialize Master List
const masterList = new _todo_logic_js__WEBPACK_IMPORTED_MODULE_0__.MasterList();

// Add Default List to Master List
masterList.addItem("Main List");

// Add Default list to sidebar
(0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.addList)(
  sidebarHeader,
  masterList.items[0].title,
  masterList.items[0].items.length,
  masterList.items[0].id
);

// Update activeList visual
let activeList = masterList.items[0];
(0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.updateActiveListTitle)(activeListTitle, activeList.title);

//! TESTING AREA ----------------------------

logo.addEventListener("click", () => {
  console.log(activeList.items[0].dateDue);
  console.log(activeList.items[0].dateDue);
});

formTitle.addEventListener("click", () => {});

activeListHeader.addEventListener("click", function () {});

// console.log(Date.now() / );
/**
 *
 *
 *
 *
 *
 *
 *
 */

/*
// TEST SAMPLES
// Create Master List
const masterList = new MasterList();

// Add Lists to Master List
masterList.addItem("Test List");
masterList.addItem("A Test List 2");
masterList.addItem("Test List 3");
masterList.addItem("Test List 4");

// Add Tasks to List in Master List
masterList.items[0].addItem("test1", "a test1 desc", "8.10");
masterList.items[0].addItem("test2", "b test2 desc", "8.08");
masterList.items[0].addItem("test3", "c test3 desc", "7.16");
masterList.items[0].addItem("test4", "d test4 desc", "12.22");
masterList.items[0].addItem("test5", "e test5 desc", "3.22");

// masterList.items[0].items[1].completed = true;
masterList.items[0].items[1].dateCreated = 100;
// masterList.items[0].items[4].completed = true;

console.log(masterList.items[0].items);

masterList.items[0].items[4].toggleCompleted();

masterList.items[0].items[1].togglePriority();
console.table(masterList.items[0].items);
*/

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDZHdDO0FBQ3pCO0FBQ2YsU0FBUyw0REFBTSxHQUFHO0FBQ2xCOzs7Ozs7Ozs7Ozs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2ZlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDSmU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNad0M7QUFDaUI7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsV0FBVyxhQUFhO0FBQ3hCLGFBQWEsUUFBUTtBQUNyQixZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWU7QUFDZixFQUFFLHNFQUFZO0FBQ2QsaUJBQWlCLDREQUFNO0FBQ3ZCLGtCQUFrQiw0REFBTTtBQUN4Qjs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLGNBQWMsMEJBQTBCO0FBQ3hDLElBQUk7QUFDSjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEh3RjtBQUMvQztBQUNSO0FBQ2U7QUFDRjtBQUNJO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtB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Q0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLHdLQUF3Szs7QUFFeEs7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuRGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWtDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuSHJCOztBQUVrRDs7QUFFL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSSxtREFBTztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEVBQUUsd0RBQVk7QUFDZCxFQUFFLHFEQUFTO0FBQ1gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzREFBVTs7QUFFakM7QUFDQTs7QUFFQTtBQUNBLG1EQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUVBQXFCOztBQUVyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELDRDQUE0Qzs7QUFFNUMseURBQXlEOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9hc3NpZ24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9jbG9uZU9iamVjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL2dldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi90b0ludGVnZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vY29tcGFyZUFzYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9jb25zdGFudHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vZm9ybWF0RGlzdGFuY2VTdHJpY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vZm9ybWF0RGlzdGFuY2VUb05vd1N0cmljdC9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvX2xpYi9idWlsZEZvcm1hdExvbmdGbi9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvX2xpYi9idWlsZExvY2FsaXplRm4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vbG9jYWxlL19saWIvYnVpbGRNYXRjaEZuL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9fbGliL2J1aWxkTWF0Y2hQYXR0ZXJuRm4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vbG9jYWxlL2VuLVVTL19saWIvZm9ybWF0RGlzdGFuY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vbG9jYWxlL2VuLVVTL19saWIvZm9ybWF0TG9uZy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvZW4tVVMvX2xpYi9mb3JtYXRSZWxhdGl2ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvZW4tVVMvX2xpYi9sb2NhbGl6ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvZW4tVVMvX2xpYi9tYXRjaC9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvZW4tVVMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vcGFyc2VJU08vaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vdG9EYXRlL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvdG9kby1sb2dpYy5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL3Zpc3VhbC5qcyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBkaXJ0eU9iamVjdCkge1xuICBpZiAodGFyZ2V0ID09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhc3NpZ24gcmVxdWlyZXMgdGhhdCBpbnB1dCBwYXJhbWV0ZXIgbm90IGJlIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gIH1cblxuICBkaXJ0eU9iamVjdCA9IGRpcnR5T2JqZWN0IHx8IHt9O1xuXG4gIGZvciAodmFyIHByb3BlcnR5IGluIGRpcnR5T2JqZWN0KSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChkaXJ0eU9iamVjdCwgcHJvcGVydHkpKSB7XG4gICAgICB0YXJnZXRbcHJvcGVydHldID0gZGlydHlPYmplY3RbcHJvcGVydHldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59IiwiaW1wb3J0IGFzc2lnbiBmcm9tIFwiLi4vYXNzaWduL2luZGV4LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjbG9uZU9iamVjdChkaXJ0eU9iamVjdCkge1xuICByZXR1cm4gYXNzaWduKHt9LCBkaXJ0eU9iamVjdCk7XG59IiwiLyoqXG4gKiBHb29nbGUgQ2hyb21lIGFzIG9mIDY3LjAuMzM5Ni44NyBpbnRyb2R1Y2VkIHRpbWV6b25lcyB3aXRoIG9mZnNldCB0aGF0IGluY2x1ZGVzIHNlY29uZHMuXG4gKiBUaGV5IHVzdWFsbHkgYXBwZWFyIGZvciBkYXRlcyB0aGF0IGRlbm90ZSB0aW1lIGJlZm9yZSB0aGUgdGltZXpvbmVzIHdlcmUgaW50cm9kdWNlZFxuICogKGUuZy4gZm9yICdFdXJvcGUvUHJhZ3VlJyB0aW1lem9uZSB0aGUgb2Zmc2V0IGlzIEdNVCswMDo1Nzo0NCBiZWZvcmUgMSBPY3RvYmVyIDE4OTFcbiAqIGFuZCBHTVQrMDE6MDA6MDAgYWZ0ZXIgdGhhdCBkYXRlKVxuICpcbiAqIERhdGUjZ2V0VGltZXpvbmVPZmZzZXQgcmV0dXJucyB0aGUgb2Zmc2V0IGluIG1pbnV0ZXMgYW5kIHdvdWxkIHJldHVybiA1NyBmb3IgdGhlIGV4YW1wbGUgYWJvdmUsXG4gKiB3aGljaCB3b3VsZCBsZWFkIHRvIGluY29ycmVjdCBjYWxjdWxhdGlvbnMuXG4gKlxuICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSB0aW1lem9uZSBvZmZzZXQgaW4gbWlsbGlzZWNvbmRzIHRoYXQgdGFrZXMgc2Vjb25kcyBpbiBhY2NvdW50LlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzKGRhdGUpIHtcbiAgdmFyIHV0Y0RhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQyhkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCksIGRhdGUuZ2V0SG91cnMoKSwgZGF0ZS5nZXRNaW51dGVzKCksIGRhdGUuZ2V0U2Vjb25kcygpLCBkYXRlLmdldE1pbGxpc2Vjb25kcygpKSk7XG4gIHV0Y0RhdGUuc2V0VVRDRnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpKTtcbiAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpIC0gdXRjRGF0ZS5nZXRUaW1lKCk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVxdWlyZWRBcmdzKHJlcXVpcmVkLCBhcmdzKSB7XG4gIGlmIChhcmdzLmxlbmd0aCA8IHJlcXVpcmVkKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihyZXF1aXJlZCArICcgYXJndW1lbnQnICsgKHJlcXVpcmVkID4gMSA/ICdzJyA6ICcnKSArICcgcmVxdWlyZWQsIGJ1dCBvbmx5ICcgKyBhcmdzLmxlbmd0aCArICcgcHJlc2VudCcpO1xuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9JbnRlZ2VyKGRpcnR5TnVtYmVyKSB7XG4gIGlmIChkaXJ0eU51bWJlciA9PT0gbnVsbCB8fCBkaXJ0eU51bWJlciA9PT0gdHJ1ZSB8fCBkaXJ0eU51bWJlciA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gTmFOO1xuICB9XG5cbiAgdmFyIG51bWJlciA9IE51bWJlcihkaXJ0eU51bWJlcik7XG5cbiAgaWYgKGlzTmFOKG51bWJlcikpIHtcbiAgICByZXR1cm4gbnVtYmVyO1xuICB9XG5cbiAgcmV0dXJuIG51bWJlciA8IDAgPyBNYXRoLmNlaWwobnVtYmVyKSA6IE1hdGguZmxvb3IobnVtYmVyKTtcbn0iLCJpbXBvcnQgdG9EYXRlIGZyb20gXCIuLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIGNvbXBhcmVBc2NcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgQ29tcGFyZSB0aGUgdHdvIGRhdGVzIGFuZCByZXR1cm4gLTEsIDAgb3IgMS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvbXBhcmUgdGhlIHR3byBkYXRlcyBhbmQgcmV0dXJuIDEgaWYgdGhlIGZpcnN0IGRhdGUgaXMgYWZ0ZXIgdGhlIHNlY29uZCxcbiAqIC0xIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGJlZm9yZSB0aGUgc2Vjb25kIG9yIDAgaWYgZGF0ZXMgYXJlIGVxdWFsLlxuICpcbiAqICMjIyB2Mi4wLjAgYnJlYWtpbmcgY2hhbmdlczpcbiAqXG4gKiAtIFtDaGFuZ2VzIHRoYXQgYXJlIGNvbW1vbiBmb3IgdGhlIHdob2xlIGxpYnJhcnldKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VwZ3JhZGVHdWlkZS5tZCNDb21tb24tQ2hhbmdlcykuXG4gKlxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgZmlyc3QgZGF0ZSB0byBjb21wYXJlXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlUmlnaHQgLSB0aGUgc2Vjb25kIGRhdGUgdG8gY29tcGFyZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIHJlc3VsdCBvZiB0aGUgY29tcGFyaXNvblxuICogQHRocm93cyB7VHlwZUVycm9yfSAyIGFyZ3VtZW50cyByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb21wYXJlIDExIEZlYnJ1YXJ5IDE5ODcgYW5kIDEwIEp1bHkgMTk4OTpcbiAqIGNvbnN0IHJlc3VsdCA9IGNvbXBhcmVBc2MobmV3IERhdGUoMTk4NywgMSwgMTEpLCBuZXcgRGF0ZSgxOTg5LCA2LCAxMCkpXG4gKiAvLz0+IC0xXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFNvcnQgdGhlIGFycmF5IG9mIGRhdGVzOlxuICogY29uc3QgcmVzdWx0ID0gW1xuICogICBuZXcgRGF0ZSgxOTk1LCA2LCAyKSxcbiAqICAgbmV3IERhdGUoMTk4NywgMSwgMTEpLFxuICogICBuZXcgRGF0ZSgxOTg5LCA2LCAxMClcbiAqIF0uc29ydChjb21wYXJlQXNjKVxuICogLy89PiBbXG4gKiAvLyAgIFdlZCBGZWIgMTEgMTk4NyAwMDowMDowMCxcbiAqIC8vICAgTW9uIEp1bCAxMCAxOTg5IDAwOjAwOjAwLFxuICogLy8gICBTdW4gSnVsIDAyIDE5OTUgMDA6MDA6MDBcbiAqIC8vIF1cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21wYXJlQXNjKGRpcnR5RGF0ZUxlZnQsIGRpcnR5RGF0ZVJpZ2h0KSB7XG4gIHJlcXVpcmVkQXJncygyLCBhcmd1bWVudHMpO1xuICB2YXIgZGF0ZUxlZnQgPSB0b0RhdGUoZGlydHlEYXRlTGVmdCk7XG4gIHZhciBkYXRlUmlnaHQgPSB0b0RhdGUoZGlydHlEYXRlUmlnaHQpO1xuICB2YXIgZGlmZiA9IGRhdGVMZWZ0LmdldFRpbWUoKSAtIGRhdGVSaWdodC5nZXRUaW1lKCk7XG5cbiAgaWYgKGRpZmYgPCAwKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9IGVsc2UgaWYgKGRpZmYgPiAwKSB7XG4gICAgcmV0dXJuIDE7IC8vIFJldHVybiAwIGlmIGRpZmYgaXMgMDsgcmV0dXJuIE5hTiBpZiBkaWZmIGlzIE5hTlxuICB9IGVsc2Uge1xuICAgIHJldHVybiBkaWZmO1xuICB9XG59IiwiLyoqXG4gKiBEYXlzIGluIDEgd2Vlay5cbiAqXG4gKiBAbmFtZSBkYXlzSW5XZWVrXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAZGVmYXVsdFxuICovXG5leHBvcnQgdmFyIGRheXNJbldlZWsgPSA3O1xuLyoqXG4gKiBNYXhpbXVtIGFsbG93ZWQgdGltZS5cbiAqXG4gKiBAbmFtZSBtYXhUaW1lXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAZGVmYXVsdFxuICovXG5cbmV4cG9ydCB2YXIgbWF4VGltZSA9IE1hdGgucG93KDEwLCA4KSAqIDI0ICogNjAgKiA2MCAqIDEwMDA7XG4vKipcbiAqIE1pbGxpc2Vjb25kcyBpbiAxIG1pbnV0ZVxuICpcbiAqIEBuYW1lIG1pbGxpc2Vjb25kc0luTWludXRlXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAZGVmYXVsdFxuICovXG5cbmV4cG9ydCB2YXIgbWlsbGlzZWNvbmRzSW5NaW51dGUgPSA2MDAwMDtcbi8qKlxuICogTWlsbGlzZWNvbmRzIGluIDEgaG91clxuICpcbiAqIEBuYW1lIG1pbGxpc2Vjb25kc0luSG91clxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQGRlZmF1bHRcbiAqL1xuXG5leHBvcnQgdmFyIG1pbGxpc2Vjb25kc0luSG91ciA9IDM2MDAwMDA7XG4vKipcbiAqIE1pbGxpc2Vjb25kcyBpbiAxIHNlY29uZFxuICpcbiAqIEBuYW1lIG1pbGxpc2Vjb25kc0luU2Vjb25kXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAZGVmYXVsdFxuICovXG5cbmV4cG9ydCB2YXIgbWlsbGlzZWNvbmRzSW5TZWNvbmQgPSAxMDAwO1xuLyoqXG4gKiBNaW5pbXVtIGFsbG93ZWQgdGltZS5cbiAqXG4gKiBAbmFtZSBtaW5UaW1lXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAZGVmYXVsdFxuICovXG5cbmV4cG9ydCB2YXIgbWluVGltZSA9IC1tYXhUaW1lO1xuLyoqXG4gKiBNaW51dGVzIGluIDEgaG91clxuICpcbiAqIEBuYW1lIG1pbnV0ZXNJbkhvdXJcbiAqIEBjb25zdGFudFxuICogQHR5cGUge251bWJlcn1cbiAqIEBkZWZhdWx0XG4gKi9cblxuZXhwb3J0IHZhciBtaW51dGVzSW5Ib3VyID0gNjA7XG4vKipcbiAqIE1vbnRocyBpbiAxIHF1YXJ0ZXJcbiAqXG4gKiBAbmFtZSBtb250aHNJblF1YXJ0ZXJcbiAqIEBjb25zdGFudFxuICogQHR5cGUge251bWJlcn1cbiAqIEBkZWZhdWx0XG4gKi9cblxuZXhwb3J0IHZhciBtb250aHNJblF1YXJ0ZXIgPSAzO1xuLyoqXG4gKiBNb250aHMgaW4gMSB5ZWFyXG4gKlxuICogQG5hbWUgbW9udGhzSW5ZZWFyXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAZGVmYXVsdFxuICovXG5cbmV4cG9ydCB2YXIgbW9udGhzSW5ZZWFyID0gMTI7XG4vKipcbiAqIFF1YXJ0ZXJzIGluIDEgeWVhclxuICpcbiAqIEBuYW1lIHF1YXJ0ZXJzSW5ZZWFyXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAZGVmYXVsdFxuICovXG5cbmV4cG9ydCB2YXIgcXVhcnRlcnNJblllYXIgPSA0O1xuLyoqXG4gKiBTZWNvbmRzIGluIDEgaG91clxuICpcbiAqIEBuYW1lIHNlY29uZHNJbkhvdXJcbiAqIEBjb25zdGFudFxuICogQHR5cGUge251bWJlcn1cbiAqIEBkZWZhdWx0XG4gKi9cblxuZXhwb3J0IHZhciBzZWNvbmRzSW5Ib3VyID0gMzYwMDtcbi8qKlxuICogU2Vjb25kcyBpbiAxIG1pbnV0ZVxuICpcbiAqIEBuYW1lIHNlY29uZHNJbk1pbnV0ZVxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQGRlZmF1bHRcbiAqL1xuXG5leHBvcnQgdmFyIHNlY29uZHNJbk1pbnV0ZSA9IDYwOyIsImltcG9ydCBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzIGZyb20gXCIuLi9fbGliL2dldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMvaW5kZXguanNcIjtcbmltcG9ydCBjb21wYXJlQXNjIGZyb20gXCIuLi9jb21wYXJlQXNjL2luZGV4LmpzXCI7XG5pbXBvcnQgdG9EYXRlIGZyb20gXCIuLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCBjbG9uZU9iamVjdCBmcm9tIFwiLi4vX2xpYi9jbG9uZU9iamVjdC9pbmRleC5qc1wiO1xuaW1wb3J0IGRlZmF1bHRMb2NhbGUgZnJvbSBcIi4uL2xvY2FsZS9lbi1VUy9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbnZhciBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFID0gMTAwMCAqIDYwO1xudmFyIE1JTlVURVNfSU5fREFZID0gNjAgKiAyNDtcbnZhciBNSU5VVEVTX0lOX01PTlRIID0gTUlOVVRFU19JTl9EQVkgKiAzMDtcbnZhciBNSU5VVEVTX0lOX1lFQVIgPSBNSU5VVEVTX0lOX0RBWSAqIDM2NTtcbi8qKlxuICogQG5hbWUgZm9ybWF0RGlzdGFuY2VTdHJpY3RcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcyBpbiB3b3Jkcy5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMgaW4gd29yZHMsIHVzaW5nIHN0cmljdCB1bml0cy5cbiAqIFRoaXMgaXMgbGlrZSBgZm9ybWF0RGlzdGFuY2VgLCBidXQgZG9lcyBub3QgdXNlIGhlbHBlcnMgbGlrZSAnYWxtb3N0JywgJ292ZXInLFxuICogJ2xlc3MgdGhhbicgYW5kIHRoZSBsaWtlLlxuICpcbiAqIHwgRGlzdGFuY2UgYmV0d2VlbiBkYXRlcyB8IFJlc3VsdCAgICAgICAgICAgICAgfFxuICogfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8IDAgLi4uIDU5IHNlY3MgICAgICAgICAgfCBbMC4uNTldIHNlY29uZHMgICAgIHxcbiAqIHwgMSAuLi4gNTkgbWlucyAgICAgICAgICB8IFsxLi41OV0gbWludXRlcyAgICAgfFxuICogfCAxIC4uLiAyMyBocnMgICAgICAgICAgIHwgWzEuLjIzXSBob3VycyAgICAgICB8XG4gKiB8IDEgLi4uIDI5IGRheXMgICAgICAgICAgfCBbMS4uMjldIGRheXMgICAgICAgIHxcbiAqIHwgMSAuLi4gMTEgbW9udGhzICAgICAgICB8IFsxLi4xMV0gbW9udGhzICAgICAgfFxuICogfCAxIC4uLiBOIHllYXJzICAgICAgICAgIHwgWzEuLk5dICB5ZWFycyAgICAgICB8XG4gKlxuICogIyMjIHYyLjAuMCBicmVha2luZyBjaGFuZ2VzOlxuICpcbiAqIC0gW0NoYW5nZXMgdGhhdCBhcmUgY29tbW9uIGZvciB0aGUgd2hvbGUgbGlicmFyeV0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdXBncmFkZUd1aWRlLm1kI0NvbW1vbi1DaGFuZ2VzKS5cbiAqXG4gKiAtIFRoZSBmdW5jdGlvbiB3YXMgcmVuYW1lZCBmcm9tIGBkaXN0YW5jZUluV29yZHNTdHJpY3RgIHRvIGBmb3JtYXREaXN0YW5jZVN0cmljdGBcbiAqICAgdG8gbWFrZSBpdHMgbmFtZSBjb25zaXN0ZW50IHdpdGggYGZvcm1hdGAgYW5kIGBmb3JtYXRSZWxhdGl2ZWAuXG4gKlxuICogLSBUaGUgb3JkZXIgb2YgYXJndW1lbnRzIGlzIHN3YXBwZWQgdG8gbWFrZSB0aGUgZnVuY3Rpb25cbiAqICAgY29uc2lzdGVudCB3aXRoIGBkaWZmZXJlbmNlSW4uLi5gIGZ1bmN0aW9ucy5cbiAqXG4gKiAgIGBgYGphdmFzY3JpcHRcbiAqICAgLy8gQmVmb3JlIHYyLjAuMFxuICpcbiAqICAgZGlzdGFuY2VJbldvcmRzU3RyaWN0KFxuICogICAgIG5ldyBEYXRlKDIwMTUsIDAsIDIpLFxuICogICAgIG5ldyBEYXRlKDIwMTQsIDYsIDIpXG4gKiAgICkgLy89PiAnNiBtb250aHMnXG4gKlxuICogICAvLyB2Mi4wLjAgb253YXJkXG4gKlxuICogICBmb3JtYXREaXN0YW5jZVN0cmljdChcbiAqICAgICBuZXcgRGF0ZSgyMDE0LCA2LCAyKSxcbiAqICAgICBuZXcgRGF0ZSgyMDE1LCAwLCAyKVxuICogICApIC8vPT4gJzYgbW9udGhzJ1xuICogICBgYGBcbiAqXG4gKiAtIGBwYXJ0aWFsTWV0aG9kYCBvcHRpb24gaXMgcmVuYW1lZCB0byBgcm91bmRpbmdNZXRob2RgLlxuICpcbiAqICAgYGBgamF2YXNjcmlwdFxuICogICAvLyBCZWZvcmUgdjIuMC4wXG4gKlxuICogICBkaXN0YW5jZUluV29yZHNTdHJpY3QoXG4gKiAgICAgbmV3IERhdGUoMTk4NiwgMywgNCwgMTAsIDMyLCAwKSxcbiAqICAgICBuZXcgRGF0ZSgxOTg2LCAzLCA0LCAxMCwgMzMsIDEpLFxuICogICAgIHsgcGFydGlhbE1ldGhvZDogJ2NlaWwnIH1cbiAqICAgKSAvLz0+ICcyIG1pbnV0ZXMnXG4gKlxuICogICAvLyB2Mi4wLjAgb253YXJkXG4gKlxuICogICBmb3JtYXREaXN0YW5jZVN0cmljdChcbiAqICAgICBuZXcgRGF0ZSgxOTg2LCAzLCA0LCAxMCwgMzMsIDEpLFxuICogICAgIG5ldyBEYXRlKDE5ODYsIDMsIDQsIDEwLCAzMiwgMCksXG4gKiAgICAgeyByb3VuZGluZ01ldGhvZDogJ2NlaWwnIH1cbiAqICAgKSAvLz0+ICcyIG1pbnV0ZXMnXG4gKiAgIGBgYFxuICpcbiAqIC0gSWYgYHJvdW5kaW5nTWV0aG9kYCBpcyBub3Qgc3BlY2lmaWVkLCBpdCBub3cgZGVmYXVsdHMgdG8gYHJvdW5kYCBpbnN0ZWFkIG9mIGBmbG9vcmAuXG4gKlxuICogLSBgdW5pdGAgb3B0aW9uIG5vdyBhY2NlcHRzIG9uZSBvZiB0aGUgc3RyaW5nczpcbiAqICAgJ3NlY29uZCcsICdtaW51dGUnLCAnaG91cicsICdkYXknLCAnbW9udGgnIG9yICd5ZWFyJyBpbnN0ZWFkIG9mICdzJywgJ20nLCAnaCcsICdkJywgJ00nIG9yICdZJ1xuICpcbiAqICAgYGBgamF2YXNjcmlwdFxuICogICAvLyBCZWZvcmUgdjIuMC4wXG4gKlxuICogICBkaXN0YW5jZUluV29yZHNTdHJpY3QoXG4gKiAgICAgbmV3IERhdGUoMTk4NiwgMywgNCwgMTAsIDMyLCAwKSxcbiAqICAgICBuZXcgRGF0ZSgxOTg2LCAzLCA0LCAxMCwgMzMsIDEpLFxuICogICAgIHsgdW5pdDogJ20nIH1cbiAqICAgKVxuICpcbiAqICAgLy8gdjIuMC4wIG9ud2FyZFxuICpcbiAqICAgZm9ybWF0RGlzdGFuY2VTdHJpY3QoXG4gKiAgICAgbmV3IERhdGUoMTk4NiwgMywgNCwgMTAsIDMzLCAxKSxcbiAqICAgICBuZXcgRGF0ZSgxOTg2LCAzLCA0LCAxMCwgMzIsIDApLFxuICogICAgIHsgdW5pdDogJ21pbnV0ZScgfVxuICogICApXG4gKiAgIGBgYFxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZVxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gYmFzZURhdGUgLSB0aGUgZGF0ZSB0byBjb21wYXJlIHdpdGhcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBhbiBvYmplY3Qgd2l0aCBvcHRpb25zLlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5hZGRTdWZmaXg9ZmFsc2VdIC0gcmVzdWx0IGluZGljYXRlcyBpZiB0aGUgc2Vjb25kIGRhdGUgaXMgZWFybGllciBvciBsYXRlciB0aGFuIHRoZSBmaXJzdFxuICogQHBhcmFtIHsnc2Vjb25kJ3wnbWludXRlJ3wnaG91cid8J2RheSd8J21vbnRoJ3wneWVhcid9IFtvcHRpb25zLnVuaXRdIC0gaWYgc3BlY2lmaWVkLCB3aWxsIGZvcmNlIGEgdW5pdFxuICogQHBhcmFtIHsnZmxvb3InfCdjZWlsJ3wncm91bmQnfSBbb3B0aW9ucy5yb3VuZGluZ01ldGhvZD0ncm91bmQnXSAtIHdoaWNoIHdheSB0byByb3VuZCBwYXJ0aWFsIHVuaXRzXG4gKiBAcGFyYW0ge0xvY2FsZX0gW29wdGlvbnMubG9jYWxlPWRlZmF1bHRMb2NhbGVdIC0gdGhlIGxvY2FsZSBvYmplY3QuIFNlZSBbTG9jYWxlXXtAbGluayBodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL0xvY2FsZX1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IHRoZSBkaXN0YW5jZSBpbiB3b3Jkc1xuICogQHRocm93cyB7VHlwZUVycm9yfSAyIGFyZ3VtZW50cyByZXF1aXJlZFxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYGRhdGVgIG11c3Qgbm90IGJlIEludmFsaWQgRGF0ZVxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYGJhc2VEYXRlYCBtdXN0IG5vdCBiZSBJbnZhbGlkIERhdGVcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBvcHRpb25zLnJvdW5kaW5nTWV0aG9kYCBtdXN0IGJlICdmbG9vcicsICdjZWlsJyBvciAncm91bmQnXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy51bml0YCBtdXN0IGJlICdzZWNvbmQnLCAnbWludXRlJywgJ2hvdXInLCAnZGF5JywgJ21vbnRoJyBvciAneWVhcidcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBvcHRpb25zLmxvY2FsZWAgbXVzdCBjb250YWluIGBmb3JtYXREaXN0YW5jZWAgcHJvcGVydHlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hhdCBpcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiAyIEp1bHkgMjAxNCBhbmQgMSBKYW51YXJ5IDIwMTU/XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXREaXN0YW5jZVN0cmljdChuZXcgRGF0ZSgyMDE0LCA2LCAyKSwgbmV3IERhdGUoMjAxNSwgMCwgMikpXG4gKiAvLz0+ICc2IG1vbnRocydcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hhdCBpcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiAxIEphbnVhcnkgMjAxNSAwMDowMDoxNVxuICogLy8gYW5kIDEgSmFudWFyeSAyMDE1IDAwOjAwOjAwP1xuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0RGlzdGFuY2VTdHJpY3QoXG4gKiAgIG5ldyBEYXRlKDIwMTUsIDAsIDEsIDAsIDAsIDE1KSxcbiAqICAgbmV3IERhdGUoMjAxNSwgMCwgMSwgMCwgMCwgMClcbiAqIClcbiAqIC8vPT4gJzE1IHNlY29uZHMnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoYXQgaXMgdGhlIGRpc3RhbmNlIGZyb20gMSBKYW51YXJ5IDIwMTZcbiAqIC8vIHRvIDEgSmFudWFyeSAyMDE1LCB3aXRoIGEgc3VmZml4P1xuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0RGlzdGFuY2VTdHJpY3QobmV3IERhdGUoMjAxNSwgMCwgMSksIG5ldyBEYXRlKDIwMTYsIDAsIDEpLCB7XG4gKiAgIGFkZFN1ZmZpeDogdHJ1ZVxuICogfSlcbiAqIC8vPT4gJzEgeWVhciBhZ28nXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoYXQgaXMgdGhlIGRpc3RhbmNlIGZyb20gMSBKYW51YXJ5IDIwMTZcbiAqIC8vIHRvIDEgSmFudWFyeSAyMDE1LCBpbiBtaW51dGVzP1xuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0RGlzdGFuY2VTdHJpY3QobmV3IERhdGUoMjAxNiwgMCwgMSksIG5ldyBEYXRlKDIwMTUsIDAsIDEpLCB7XG4gKiAgIHVuaXQ6ICdtaW51dGUnXG4gKiB9KVxuICogLy89PiAnNTI1NjAwIG1pbnV0ZXMnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoYXQgaXMgdGhlIGRpc3RhbmNlIGZyb20gMSBKYW51YXJ5IDIwMTVcbiAqIC8vIHRvIDI4IEphbnVhcnkgMjAxNSwgaW4gbW9udGhzLCByb3VuZGVkIHVwP1xuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0RGlzdGFuY2VTdHJpY3QobmV3IERhdGUoMjAxNSwgMCwgMjgpLCBuZXcgRGF0ZSgyMDE1LCAwLCAxKSwge1xuICogICB1bml0OiAnbW9udGgnLFxuICogICByb3VuZGluZ01ldGhvZDogJ2NlaWwnXG4gKiB9KVxuICogLy89PiAnMSBtb250aCdcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hhdCBpcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiAxIEF1Z3VzdCAyMDE2IGFuZCAxIEphbnVhcnkgMjAxNSBpbiBFc3BlcmFudG8/XG4gKiBpbXBvcnQgeyBlb0xvY2FsZSB9IGZyb20gJ2RhdGUtZm5zL2xvY2FsZS9lbydcbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdERpc3RhbmNlU3RyaWN0KG5ldyBEYXRlKDIwMTYsIDcsIDEpLCBuZXcgRGF0ZSgyMDE1LCAwLCAxKSwge1xuICogICBsb2NhbGU6IGVvTG9jYWxlXG4gKiB9KVxuICogLy89PiAnMSBqYXJvJ1xuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZvcm1hdERpc3RhbmNlU3RyaWN0KGRpcnR5RGF0ZSwgZGlydHlCYXNlRGF0ZSkge1xuICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDoge307XG4gIHJlcXVpcmVkQXJncygyLCBhcmd1bWVudHMpO1xuICB2YXIgbG9jYWxlID0gb3B0aW9ucy5sb2NhbGUgfHwgZGVmYXVsdExvY2FsZTtcblxuICBpZiAoIWxvY2FsZS5mb3JtYXREaXN0YW5jZSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdsb2NhbGUgbXVzdCBjb250YWluIGxvY2FsaXplLmZvcm1hdERpc3RhbmNlIHByb3BlcnR5Jyk7XG4gIH1cblxuICB2YXIgY29tcGFyaXNvbiA9IGNvbXBhcmVBc2MoZGlydHlEYXRlLCBkaXJ0eUJhc2VEYXRlKTtcblxuICBpZiAoaXNOYU4oY29tcGFyaXNvbikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCB0aW1lIHZhbHVlJyk7XG4gIH1cblxuICB2YXIgbG9jYWxpemVPcHRpb25zID0gY2xvbmVPYmplY3Qob3B0aW9ucyk7XG4gIGxvY2FsaXplT3B0aW9ucy5hZGRTdWZmaXggPSBCb29sZWFuKG9wdGlvbnMuYWRkU3VmZml4KTtcbiAgbG9jYWxpemVPcHRpb25zLmNvbXBhcmlzb24gPSBjb21wYXJpc29uO1xuICB2YXIgZGF0ZUxlZnQ7XG4gIHZhciBkYXRlUmlnaHQ7XG5cbiAgaWYgKGNvbXBhcmlzb24gPiAwKSB7XG4gICAgZGF0ZUxlZnQgPSB0b0RhdGUoZGlydHlCYXNlRGF0ZSk7XG4gICAgZGF0ZVJpZ2h0ID0gdG9EYXRlKGRpcnR5RGF0ZSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0ZUxlZnQgPSB0b0RhdGUoZGlydHlEYXRlKTtcbiAgICBkYXRlUmlnaHQgPSB0b0RhdGUoZGlydHlCYXNlRGF0ZSk7XG4gIH1cblxuICB2YXIgcm91bmRpbmdNZXRob2QgPSBvcHRpb25zLnJvdW5kaW5nTWV0aG9kID09IG51bGwgPyAncm91bmQnIDogU3RyaW5nKG9wdGlvbnMucm91bmRpbmdNZXRob2QpO1xuICB2YXIgcm91bmRpbmdNZXRob2RGbjtcblxuICBpZiAocm91bmRpbmdNZXRob2QgPT09ICdmbG9vcicpIHtcbiAgICByb3VuZGluZ01ldGhvZEZuID0gTWF0aC5mbG9vcjtcbiAgfSBlbHNlIGlmIChyb3VuZGluZ01ldGhvZCA9PT0gJ2NlaWwnKSB7XG4gICAgcm91bmRpbmdNZXRob2RGbiA9IE1hdGguY2VpbDtcbiAgfSBlbHNlIGlmIChyb3VuZGluZ01ldGhvZCA9PT0gJ3JvdW5kJykge1xuICAgIHJvdW5kaW5nTWV0aG9kRm4gPSBNYXRoLnJvdW5kO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwicm91bmRpbmdNZXRob2QgbXVzdCBiZSAnZmxvb3InLCAnY2VpbCcgb3IgJ3JvdW5kJ1wiKTtcbiAgfVxuXG4gIHZhciBtaWxsaXNlY29uZHMgPSBkYXRlUmlnaHQuZ2V0VGltZSgpIC0gZGF0ZUxlZnQuZ2V0VGltZSgpO1xuICB2YXIgbWludXRlcyA9IG1pbGxpc2Vjb25kcyAvIE1JTExJU0VDT05EU19JTl9NSU5VVEU7XG4gIHZhciB0aW1lem9uZU9mZnNldCA9IGdldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMoZGF0ZVJpZ2h0KSAtIGdldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMoZGF0ZUxlZnQpOyAvLyBVc2UgRFNULW5vcm1hbGl6ZWQgZGlmZmVyZW5jZSBpbiBtaW51dGVzIGZvciB5ZWFycywgbW9udGhzIGFuZCBkYXlzO1xuICAvLyB1c2UgcmVndWxhciBkaWZmZXJlbmNlIGluIG1pbnV0ZXMgZm9yIGhvdXJzLCBtaW51dGVzIGFuZCBzZWNvbmRzLlxuXG4gIHZhciBkc3ROb3JtYWxpemVkTWludXRlcyA9IChtaWxsaXNlY29uZHMgLSB0aW1lem9uZU9mZnNldCkgLyBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFO1xuICB2YXIgdW5pdDtcblxuICBpZiAob3B0aW9ucy51bml0ID09IG51bGwpIHtcbiAgICBpZiAobWludXRlcyA8IDEpIHtcbiAgICAgIHVuaXQgPSAnc2Vjb25kJztcbiAgICB9IGVsc2UgaWYgKG1pbnV0ZXMgPCA2MCkge1xuICAgICAgdW5pdCA9ICdtaW51dGUnO1xuICAgIH0gZWxzZSBpZiAobWludXRlcyA8IE1JTlVURVNfSU5fREFZKSB7XG4gICAgICB1bml0ID0gJ2hvdXInO1xuICAgIH0gZWxzZSBpZiAoZHN0Tm9ybWFsaXplZE1pbnV0ZXMgPCBNSU5VVEVTX0lOX01PTlRIKSB7XG4gICAgICB1bml0ID0gJ2RheSc7XG4gICAgfSBlbHNlIGlmIChkc3ROb3JtYWxpemVkTWludXRlcyA8IE1JTlVURVNfSU5fWUVBUikge1xuICAgICAgdW5pdCA9ICdtb250aCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVuaXQgPSAneWVhcic7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHVuaXQgPSBTdHJpbmcob3B0aW9ucy51bml0KTtcbiAgfSAvLyAwIHVwIHRvIDYwIHNlY29uZHNcblxuXG4gIGlmICh1bml0ID09PSAnc2Vjb25kJykge1xuICAgIHZhciBzZWNvbmRzID0gcm91bmRpbmdNZXRob2RGbihtaWxsaXNlY29uZHMgLyAxMDAwKTtcbiAgICByZXR1cm4gbG9jYWxlLmZvcm1hdERpc3RhbmNlKCd4U2Vjb25kcycsIHNlY29uZHMsIGxvY2FsaXplT3B0aW9ucyk7IC8vIDEgdXAgdG8gNjAgbWluc1xuICB9IGVsc2UgaWYgKHVuaXQgPT09ICdtaW51dGUnKSB7XG4gICAgdmFyIHJvdW5kZWRNaW51dGVzID0gcm91bmRpbmdNZXRob2RGbihtaW51dGVzKTtcbiAgICByZXR1cm4gbG9jYWxlLmZvcm1hdERpc3RhbmNlKCd4TWludXRlcycsIHJvdW5kZWRNaW51dGVzLCBsb2NhbGl6ZU9wdGlvbnMpOyAvLyAxIHVwIHRvIDI0IGhvdXJzXG4gIH0gZWxzZSBpZiAodW5pdCA9PT0gJ2hvdXInKSB7XG4gICAgdmFyIGhvdXJzID0gcm91bmRpbmdNZXRob2RGbihtaW51dGVzIC8gNjApO1xuICAgIHJldHVybiBsb2NhbGUuZm9ybWF0RGlzdGFuY2UoJ3hIb3VycycsIGhvdXJzLCBsb2NhbGl6ZU9wdGlvbnMpOyAvLyAxIHVwIHRvIDMwIGRheXNcbiAgfSBlbHNlIGlmICh1bml0ID09PSAnZGF5Jykge1xuICAgIHZhciBkYXlzID0gcm91bmRpbmdNZXRob2RGbihkc3ROb3JtYWxpemVkTWludXRlcyAvIE1JTlVURVNfSU5fREFZKTtcbiAgICByZXR1cm4gbG9jYWxlLmZvcm1hdERpc3RhbmNlKCd4RGF5cycsIGRheXMsIGxvY2FsaXplT3B0aW9ucyk7IC8vIDEgdXAgdG8gMTIgbW9udGhzXG4gIH0gZWxzZSBpZiAodW5pdCA9PT0gJ21vbnRoJykge1xuICAgIHZhciBtb250aHMgPSByb3VuZGluZ01ldGhvZEZuKGRzdE5vcm1hbGl6ZWRNaW51dGVzIC8gTUlOVVRFU19JTl9NT05USCk7XG4gICAgcmV0dXJuIG1vbnRocyA9PT0gMTIgJiYgb3B0aW9ucy51bml0ICE9PSAnbW9udGgnID8gbG9jYWxlLmZvcm1hdERpc3RhbmNlKCd4WWVhcnMnLCAxLCBsb2NhbGl6ZU9wdGlvbnMpIDogbG9jYWxlLmZvcm1hdERpc3RhbmNlKCd4TW9udGhzJywgbW9udGhzLCBsb2NhbGl6ZU9wdGlvbnMpOyAvLyAxIHllYXIgdXAgdG8gbWF4IERhdGVcbiAgfSBlbHNlIGlmICh1bml0ID09PSAneWVhcicpIHtcbiAgICB2YXIgeWVhcnMgPSByb3VuZGluZ01ldGhvZEZuKGRzdE5vcm1hbGl6ZWRNaW51dGVzIC8gTUlOVVRFU19JTl9ZRUFSKTtcbiAgICByZXR1cm4gbG9jYWxlLmZvcm1hdERpc3RhbmNlKCd4WWVhcnMnLCB5ZWFycywgbG9jYWxpemVPcHRpb25zKTtcbiAgfVxuXG4gIHRocm93IG5ldyBSYW5nZUVycm9yKFwidW5pdCBtdXN0IGJlICdzZWNvbmQnLCAnbWludXRlJywgJ2hvdXInLCAnZGF5JywgJ21vbnRoJyBvciAneWVhcidcIik7XG59IiwiaW1wb3J0IGZvcm1hdERpc3RhbmNlU3RyaWN0IGZyb20gXCIuLi9mb3JtYXREaXN0YW5jZVN0cmljdC9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgZm9ybWF0RGlzdGFuY2VUb05vd1N0cmljdFxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGdpdmVuIGRhdGUgYW5kIG5vdyBpbiB3b3Jkcy5cbiAqIEBwdXJlIGZhbHNlXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzIGluIHdvcmRzLCB1c2luZyBzdHJpY3QgdW5pdHMuXG4gKiBUaGlzIGlzIGxpa2UgYGZvcm1hdERpc3RhbmNlYCwgYnV0IGRvZXMgbm90IHVzZSBoZWxwZXJzIGxpa2UgJ2FsbW9zdCcsICdvdmVyJyxcbiAqICdsZXNzIHRoYW4nIGFuZCB0aGUgbGlrZS5cbiAqXG4gKiB8IERpc3RhbmNlIGJldHdlZW4gZGF0ZXMgfCBSZXN1bHQgICAgICAgICAgICAgIHxcbiAqIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfCAwIC4uLiA1OSBzZWNzICAgICAgICAgIHwgWzAuLjU5XSBzZWNvbmRzICAgICB8XG4gKiB8IDEgLi4uIDU5IG1pbnMgICAgICAgICAgfCBbMS4uNTldIG1pbnV0ZXMgICAgIHxcbiAqIHwgMSAuLi4gMjMgaHJzICAgICAgICAgICB8IFsxLi4yM10gaG91cnMgICAgICAgfFxuICogfCAxIC4uLiAyOSBkYXlzICAgICAgICAgIHwgWzEuLjI5XSBkYXlzICAgICAgICB8XG4gKiB8IDEgLi4uIDExIG1vbnRocyAgICAgICAgfCBbMS4uMTFdIG1vbnRocyAgICAgIHxcbiAqIHwgMSAuLi4gTiB5ZWFycyAgICAgICAgICB8IFsxLi5OXSAgeWVhcnMgICAgICAgfFxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGUgLSB0aGUgZ2l2ZW4gZGF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIGFuIG9iamVjdCB3aXRoIG9wdGlvbnMuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmFkZFN1ZmZpeD1mYWxzZV0gLSByZXN1bHQgaW5kaWNhdGVzIGlmIHRoZSBzZWNvbmQgZGF0ZSBpcyBlYXJsaWVyIG9yIGxhdGVyIHRoYW4gdGhlIGZpcnN0XG4gKiBAcGFyYW0geydzZWNvbmQnfCdtaW51dGUnfCdob3VyJ3wnZGF5J3wnbW9udGgnfCd5ZWFyJ30gW29wdGlvbnMudW5pdF0gLSBpZiBzcGVjaWZpZWQsIHdpbGwgZm9yY2UgYSB1bml0XG4gKiBAcGFyYW0geydmbG9vcid8J2NlaWwnfCdyb3VuZCd9IFtvcHRpb25zLnJvdW5kaW5nTWV0aG9kPSdyb3VuZCddIC0gd2hpY2ggd2F5IHRvIHJvdW5kIHBhcnRpYWwgdW5pdHNcbiAqIEBwYXJhbSB7TG9jYWxlfSBbb3B0aW9ucy5sb2NhbGU9ZGVmYXVsdExvY2FsZV0gLSB0aGUgbG9jYWxlIG9iamVjdC4gU2VlIFtMb2NhbGVde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvTG9jYWxlfVxuICogQHJldHVybnMge1N0cmluZ30gdGhlIGRpc3RhbmNlIGluIHdvcmRzXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDEgYXJndW1lbnQgcmVxdWlyZWRcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBkYXRlYCBtdXN0IG5vdCBiZSBJbnZhbGlkIERhdGVcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBvcHRpb25zLmxvY2FsZWAgbXVzdCBjb250YWluIGBmb3JtYXREaXN0YW5jZWAgcHJvcGVydHlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgMSBKYW51YXJ5IDIwMTUsIHdoYXQgaXMgdGhlIGRpc3RhbmNlIHRvIDIgSnVseSAyMDE0P1xuICogdmFyIHJlc3VsdCA9IGZvcm1hdERpc3RhbmNlVG9Ob3dTdHJpY3QoXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDYsIDIpXG4gKiApXG4gKiAvLz0+ICc2IG1vbnRocydcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgbm93IGlzIDEgSmFudWFyeSAyMDE1IDAwOjAwOjAwLFxuICogLy8gd2hhdCBpcyB0aGUgZGlzdGFuY2UgdG8gMSBKYW51YXJ5IDIwMTUgMDA6MDA6MTUsIGluY2x1ZGluZyBzZWNvbmRzP1xuICogdmFyIHJlc3VsdCA9IGZvcm1hdERpc3RhbmNlVG9Ob3dTdHJpY3QoXG4gKiAgIG5ldyBEYXRlKDIwMTUsIDAsIDEsIDAsIDAsIDE1KVxuICogKVxuICogLy89PiAnMjAgc2Vjb25kcydcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgMSBKYW51YXJ5IDIwMTUsXG4gKiAvLyB3aGF0IGlzIHRoZSBkaXN0YW5jZSB0byAxIEphbnVhcnkgMjAxNiwgd2l0aCBhIHN1ZmZpeD9cbiAqIHZhciByZXN1bHQgPSBmb3JtYXREaXN0YW5jZVRvTm93U3RyaWN0KFxuICogICBuZXcgRGF0ZSgyMDE2LCAwLCAxKSxcbiAqICAge2FkZFN1ZmZpeDogdHJ1ZX1cbiAqIClcbiAqIC8vPT4gJ2luIDEgeWVhcidcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgMjggSmFudWFyeSAyMDE1LFxuICogLy8gd2hhdCBpcyB0aGUgZGlzdGFuY2UgdG8gMSBKYW51YXJ5IDIwMTUsIGluIG1vbnRocywgcm91bmRlZCB1cD8/XG4gKiB2YXIgcmVzdWx0ID0gZm9ybWF0RGlzdGFuY2VUb05vd1N0cmljdChuZXcgRGF0ZSgyMDE1LCAwLCAxKSwge1xuICogICB1bml0OiAnbW9udGgnLFxuICogICByb3VuZGluZ01ldGhvZDogJ2NlaWwnXG4gKiB9KVxuICogLy89PiAnMSBtb250aCdcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgMSBKYW51YXJ5IDIwMTUsXG4gKiAvLyB3aGF0IGlzIHRoZSBkaXN0YW5jZSB0byAxIEF1Z3VzdCAyMDE2IGluIEVzcGVyYW50bz9cbiAqIHZhciBlb0xvY2FsZSA9IHJlcXVpcmUoJ2RhdGUtZm5zL2xvY2FsZS9lbycpXG4gKiB2YXIgcmVzdWx0ID0gZm9ybWF0RGlzdGFuY2VUb05vd1N0cmljdChcbiAqICAgbmV3IERhdGUoMjAxNiwgNywgMSksXG4gKiAgIHtsb2NhbGU6IGVvTG9jYWxlfVxuICogKVxuICogLy89PiAnMSBqYXJvJ1xuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZvcm1hdERpc3RhbmNlVG9Ob3dTdHJpY3QoZGlydHlEYXRlLCBkaXJ0eU9wdGlvbnMpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHJldHVybiBmb3JtYXREaXN0YW5jZVN0cmljdChkaXJ0eURhdGUsIERhdGUubm93KCksIGRpcnR5T3B0aW9ucyk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRGb3JtYXRMb25nRm4oYXJncykge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgICAvLyBUT0RPOiBSZW1vdmUgU3RyaW5nKClcbiAgICB2YXIgd2lkdGggPSBvcHRpb25zLndpZHRoID8gU3RyaW5nKG9wdGlvbnMud2lkdGgpIDogYXJncy5kZWZhdWx0V2lkdGg7XG4gICAgdmFyIGZvcm1hdCA9IGFyZ3MuZm9ybWF0c1t3aWR0aF0gfHwgYXJncy5mb3JtYXRzW2FyZ3MuZGVmYXVsdFdpZHRoXTtcbiAgICByZXR1cm4gZm9ybWF0O1xuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkTG9jYWxpemVGbihhcmdzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoZGlydHlJbmRleCwgZGlydHlPcHRpb25zKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBkaXJ0eU9wdGlvbnMgfHwge307XG4gICAgdmFyIGNvbnRleHQgPSBvcHRpb25zLmNvbnRleHQgPyBTdHJpbmcob3B0aW9ucy5jb250ZXh0KSA6ICdzdGFuZGFsb25lJztcbiAgICB2YXIgdmFsdWVzQXJyYXk7XG5cbiAgICBpZiAoY29udGV4dCA9PT0gJ2Zvcm1hdHRpbmcnICYmIGFyZ3MuZm9ybWF0dGluZ1ZhbHVlcykge1xuICAgICAgdmFyIGRlZmF1bHRXaWR0aCA9IGFyZ3MuZGVmYXVsdEZvcm1hdHRpbmdXaWR0aCB8fCBhcmdzLmRlZmF1bHRXaWR0aDtcbiAgICAgIHZhciB3aWR0aCA9IG9wdGlvbnMud2lkdGggPyBTdHJpbmcob3B0aW9ucy53aWR0aCkgOiBkZWZhdWx0V2lkdGg7XG4gICAgICB2YWx1ZXNBcnJheSA9IGFyZ3MuZm9ybWF0dGluZ1ZhbHVlc1t3aWR0aF0gfHwgYXJncy5mb3JtYXR0aW5nVmFsdWVzW2RlZmF1bHRXaWR0aF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBfZGVmYXVsdFdpZHRoID0gYXJncy5kZWZhdWx0V2lkdGg7XG5cbiAgICAgIHZhciBfd2lkdGggPSBvcHRpb25zLndpZHRoID8gU3RyaW5nKG9wdGlvbnMud2lkdGgpIDogYXJncy5kZWZhdWx0V2lkdGg7XG5cbiAgICAgIHZhbHVlc0FycmF5ID0gYXJncy52YWx1ZXNbX3dpZHRoXSB8fCBhcmdzLnZhbHVlc1tfZGVmYXVsdFdpZHRoXTtcbiAgICB9XG5cbiAgICB2YXIgaW5kZXggPSBhcmdzLmFyZ3VtZW50Q2FsbGJhY2sgPyBhcmdzLmFyZ3VtZW50Q2FsbGJhY2soZGlydHlJbmRleCkgOiBkaXJ0eUluZGV4OyAvLyBAdHMtaWdub3JlOiBGb3Igc29tZSByZWFzb24gVHlwZVNjcmlwdCBqdXN0IGRvbid0IHdhbnQgdG8gbWF0Y2ggaXQsIG5vIG1hdHRlciBob3cgaGFyZCB3ZSB0cnkuIEkgY2hhbGxlbmdlIHlvdSB0byB0cnkgdG8gcmVtb3ZlIGl0IVxuXG4gICAgcmV0dXJuIHZhbHVlc0FycmF5W2luZGV4XTtcbiAgfTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZE1hdGNoRm4oYXJncykge1xuICByZXR1cm4gZnVuY3Rpb24gKHN0cmluZykge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICB2YXIgd2lkdGggPSBvcHRpb25zLndpZHRoO1xuICAgIHZhciBtYXRjaFBhdHRlcm4gPSB3aWR0aCAmJiBhcmdzLm1hdGNoUGF0dGVybnNbd2lkdGhdIHx8IGFyZ3MubWF0Y2hQYXR0ZXJuc1thcmdzLmRlZmF1bHRNYXRjaFdpZHRoXTtcbiAgICB2YXIgbWF0Y2hSZXN1bHQgPSBzdHJpbmcubWF0Y2gobWF0Y2hQYXR0ZXJuKTtcblxuICAgIGlmICghbWF0Y2hSZXN1bHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBtYXRjaGVkU3RyaW5nID0gbWF0Y2hSZXN1bHRbMF07XG4gICAgdmFyIHBhcnNlUGF0dGVybnMgPSB3aWR0aCAmJiBhcmdzLnBhcnNlUGF0dGVybnNbd2lkdGhdIHx8IGFyZ3MucGFyc2VQYXR0ZXJuc1thcmdzLmRlZmF1bHRQYXJzZVdpZHRoXTtcbiAgICB2YXIga2V5ID0gQXJyYXkuaXNBcnJheShwYXJzZVBhdHRlcm5zKSA/IGZpbmRJbmRleChwYXJzZVBhdHRlcm5zLCBmdW5jdGlvbiAocGF0dGVybikge1xuICAgICAgcmV0dXJuIHBhdHRlcm4udGVzdChtYXRjaGVkU3RyaW5nKTtcbiAgICB9KSA6IGZpbmRLZXkocGFyc2VQYXR0ZXJucywgZnVuY3Rpb24gKHBhdHRlcm4pIHtcbiAgICAgIHJldHVybiBwYXR0ZXJuLnRlc3QobWF0Y2hlZFN0cmluZyk7XG4gICAgfSk7XG4gICAgdmFyIHZhbHVlO1xuICAgIHZhbHVlID0gYXJncy52YWx1ZUNhbGxiYWNrID8gYXJncy52YWx1ZUNhbGxiYWNrKGtleSkgOiBrZXk7XG4gICAgdmFsdWUgPSBvcHRpb25zLnZhbHVlQ2FsbGJhY2sgPyBvcHRpb25zLnZhbHVlQ2FsbGJhY2sodmFsdWUpIDogdmFsdWU7XG4gICAgdmFyIHJlc3QgPSBzdHJpbmcuc2xpY2UobWF0Y2hlZFN0cmluZy5sZW5ndGgpO1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICByZXN0OiByZXN0XG4gICAgfTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZmluZEtleShvYmplY3QsIHByZWRpY2F0ZSkge1xuICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHByZWRpY2F0ZShvYmplY3Rba2V5XSkpIHtcbiAgICAgIHJldHVybiBrZXk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gZmluZEluZGV4KGFycmF5LCBwcmVkaWNhdGUpIHtcbiAgZm9yICh2YXIga2V5ID0gMDsga2V5IDwgYXJyYXkubGVuZ3RoOyBrZXkrKykge1xuICAgIGlmIChwcmVkaWNhdGUoYXJyYXlba2V5XSkpIHtcbiAgICAgIHJldHVybiBrZXk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZE1hdGNoUGF0dGVybkZuKGFyZ3MpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgdmFyIG1hdGNoUmVzdWx0ID0gc3RyaW5nLm1hdGNoKGFyZ3MubWF0Y2hQYXR0ZXJuKTtcbiAgICBpZiAoIW1hdGNoUmVzdWx0KSByZXR1cm4gbnVsbDtcbiAgICB2YXIgbWF0Y2hlZFN0cmluZyA9IG1hdGNoUmVzdWx0WzBdO1xuICAgIHZhciBwYXJzZVJlc3VsdCA9IHN0cmluZy5tYXRjaChhcmdzLnBhcnNlUGF0dGVybik7XG4gICAgaWYgKCFwYXJzZVJlc3VsdCkgcmV0dXJuIG51bGw7XG4gICAgdmFyIHZhbHVlID0gYXJncy52YWx1ZUNhbGxiYWNrID8gYXJncy52YWx1ZUNhbGxiYWNrKHBhcnNlUmVzdWx0WzBdKSA6IHBhcnNlUmVzdWx0WzBdO1xuICAgIHZhbHVlID0gb3B0aW9ucy52YWx1ZUNhbGxiYWNrID8gb3B0aW9ucy52YWx1ZUNhbGxiYWNrKHZhbHVlKSA6IHZhbHVlO1xuICAgIHZhciByZXN0ID0gc3RyaW5nLnNsaWNlKG1hdGNoZWRTdHJpbmcubGVuZ3RoKTtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgcmVzdDogcmVzdFxuICAgIH07XG4gIH07XG59IiwidmFyIGZvcm1hdERpc3RhbmNlTG9jYWxlID0ge1xuICBsZXNzVGhhblhTZWNvbmRzOiB7XG4gICAgb25lOiAnbGVzcyB0aGFuIGEgc2Vjb25kJyxcbiAgICBvdGhlcjogJ2xlc3MgdGhhbiB7e2NvdW50fX0gc2Vjb25kcydcbiAgfSxcbiAgeFNlY29uZHM6IHtcbiAgICBvbmU6ICcxIHNlY29uZCcsXG4gICAgb3RoZXI6ICd7e2NvdW50fX0gc2Vjb25kcydcbiAgfSxcbiAgaGFsZkFNaW51dGU6ICdoYWxmIGEgbWludXRlJyxcbiAgbGVzc1RoYW5YTWludXRlczoge1xuICAgIG9uZTogJ2xlc3MgdGhhbiBhIG1pbnV0ZScsXG4gICAgb3RoZXI6ICdsZXNzIHRoYW4ge3tjb3VudH19IG1pbnV0ZXMnXG4gIH0sXG4gIHhNaW51dGVzOiB7XG4gICAgb25lOiAnMSBtaW51dGUnLFxuICAgIG90aGVyOiAne3tjb3VudH19IG1pbnV0ZXMnXG4gIH0sXG4gIGFib3V0WEhvdXJzOiB7XG4gICAgb25lOiAnYWJvdXQgMSBob3VyJyxcbiAgICBvdGhlcjogJ2Fib3V0IHt7Y291bnR9fSBob3VycydcbiAgfSxcbiAgeEhvdXJzOiB7XG4gICAgb25lOiAnMSBob3VyJyxcbiAgICBvdGhlcjogJ3t7Y291bnR9fSBob3VycydcbiAgfSxcbiAgeERheXM6IHtcbiAgICBvbmU6ICcxIGRheScsXG4gICAgb3RoZXI6ICd7e2NvdW50fX0gZGF5cydcbiAgfSxcbiAgYWJvdXRYV2Vla3M6IHtcbiAgICBvbmU6ICdhYm91dCAxIHdlZWsnLFxuICAgIG90aGVyOiAnYWJvdXQge3tjb3VudH19IHdlZWtzJ1xuICB9LFxuICB4V2Vla3M6IHtcbiAgICBvbmU6ICcxIHdlZWsnLFxuICAgIG90aGVyOiAne3tjb3VudH19IHdlZWtzJ1xuICB9LFxuICBhYm91dFhNb250aHM6IHtcbiAgICBvbmU6ICdhYm91dCAxIG1vbnRoJyxcbiAgICBvdGhlcjogJ2Fib3V0IHt7Y291bnR9fSBtb250aHMnXG4gIH0sXG4gIHhNb250aHM6IHtcbiAgICBvbmU6ICcxIG1vbnRoJyxcbiAgICBvdGhlcjogJ3t7Y291bnR9fSBtb250aHMnXG4gIH0sXG4gIGFib3V0WFllYXJzOiB7XG4gICAgb25lOiAnYWJvdXQgMSB5ZWFyJyxcbiAgICBvdGhlcjogJ2Fib3V0IHt7Y291bnR9fSB5ZWFycydcbiAgfSxcbiAgeFllYXJzOiB7XG4gICAgb25lOiAnMSB5ZWFyJyxcbiAgICBvdGhlcjogJ3t7Y291bnR9fSB5ZWFycydcbiAgfSxcbiAgb3ZlclhZZWFyczoge1xuICAgIG9uZTogJ292ZXIgMSB5ZWFyJyxcbiAgICBvdGhlcjogJ292ZXIge3tjb3VudH19IHllYXJzJ1xuICB9LFxuICBhbG1vc3RYWWVhcnM6IHtcbiAgICBvbmU6ICdhbG1vc3QgMSB5ZWFyJyxcbiAgICBvdGhlcjogJ2FsbW9zdCB7e2NvdW50fX0geWVhcnMnXG4gIH1cbn07XG5cbnZhciBmb3JtYXREaXN0YW5jZSA9IGZ1bmN0aW9uICh0b2tlbiwgY291bnQsIG9wdGlvbnMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgdmFyIHRva2VuVmFsdWUgPSBmb3JtYXREaXN0YW5jZUxvY2FsZVt0b2tlbl07XG5cbiAgaWYgKHR5cGVvZiB0b2tlblZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJlc3VsdCA9IHRva2VuVmFsdWU7XG4gIH0gZWxzZSBpZiAoY291bnQgPT09IDEpIHtcbiAgICByZXN1bHQgPSB0b2tlblZhbHVlLm9uZTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSB0b2tlblZhbHVlLm90aGVyLnJlcGxhY2UoJ3t7Y291bnR9fScsIGNvdW50LnRvU3RyaW5nKCkpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9ucyAhPT0gdm9pZCAwICYmIG9wdGlvbnMuYWRkU3VmZml4KSB7XG4gICAgaWYgKG9wdGlvbnMuY29tcGFyaXNvbiAmJiBvcHRpb25zLmNvbXBhcmlzb24gPiAwKSB7XG4gICAgICByZXR1cm4gJ2luICcgKyByZXN1bHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXN1bHQgKyAnIGFnbyc7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1hdERpc3RhbmNlOyIsImltcG9ydCBidWlsZEZvcm1hdExvbmdGbiBmcm9tIFwiLi4vLi4vLi4vX2xpYi9idWlsZEZvcm1hdExvbmdGbi9pbmRleC5qc1wiO1xudmFyIGRhdGVGb3JtYXRzID0ge1xuICBmdWxsOiAnRUVFRSwgTU1NTSBkbywgeScsXG4gIGxvbmc6ICdNTU1NIGRvLCB5JyxcbiAgbWVkaXVtOiAnTU1NIGQsIHknLFxuICBzaG9ydDogJ01NL2RkL3l5eXknXG59O1xudmFyIHRpbWVGb3JtYXRzID0ge1xuICBmdWxsOiAnaDptbTpzcyBhIHp6enonLFxuICBsb25nOiAnaDptbTpzcyBhIHonLFxuICBtZWRpdW06ICdoOm1tOnNzIGEnLFxuICBzaG9ydDogJ2g6bW0gYSdcbn07XG52YXIgZGF0ZVRpbWVGb3JtYXRzID0ge1xuICBmdWxsOiBcInt7ZGF0ZX19ICdhdCcge3t0aW1lfX1cIixcbiAgbG9uZzogXCJ7e2RhdGV9fSAnYXQnIHt7dGltZX19XCIsXG4gIG1lZGl1bTogJ3t7ZGF0ZX19LCB7e3RpbWV9fScsXG4gIHNob3J0OiAne3tkYXRlfX0sIHt7dGltZX19J1xufTtcbnZhciBmb3JtYXRMb25nID0ge1xuICBkYXRlOiBidWlsZEZvcm1hdExvbmdGbih7XG4gICAgZm9ybWF0czogZGF0ZUZvcm1hdHMsXG4gICAgZGVmYXVsdFdpZHRoOiAnZnVsbCdcbiAgfSksXG4gIHRpbWU6IGJ1aWxkRm9ybWF0TG9uZ0ZuKHtcbiAgICBmb3JtYXRzOiB0aW1lRm9ybWF0cyxcbiAgICBkZWZhdWx0V2lkdGg6ICdmdWxsJ1xuICB9KSxcbiAgZGF0ZVRpbWU6IGJ1aWxkRm9ybWF0TG9uZ0ZuKHtcbiAgICBmb3JtYXRzOiBkYXRlVGltZUZvcm1hdHMsXG4gICAgZGVmYXVsdFdpZHRoOiAnZnVsbCdcbiAgfSlcbn07XG5leHBvcnQgZGVmYXVsdCBmb3JtYXRMb25nOyIsInZhciBmb3JtYXRSZWxhdGl2ZUxvY2FsZSA9IHtcbiAgbGFzdFdlZWs6IFwiJ2xhc3QnIGVlZWUgJ2F0JyBwXCIsXG4gIHllc3RlcmRheTogXCIneWVzdGVyZGF5IGF0JyBwXCIsXG4gIHRvZGF5OiBcIid0b2RheSBhdCcgcFwiLFxuICB0b21vcnJvdzogXCIndG9tb3Jyb3cgYXQnIHBcIixcbiAgbmV4dFdlZWs6IFwiZWVlZSAnYXQnIHBcIixcbiAgb3RoZXI6ICdQJ1xufTtcblxudmFyIGZvcm1hdFJlbGF0aXZlID0gZnVuY3Rpb24gKHRva2VuLCBfZGF0ZSwgX2Jhc2VEYXRlLCBfb3B0aW9ucykge1xuICByZXR1cm4gZm9ybWF0UmVsYXRpdmVMb2NhbGVbdG9rZW5dO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZm9ybWF0UmVsYXRpdmU7IiwiaW1wb3J0IGJ1aWxkTG9jYWxpemVGbiBmcm9tIFwiLi4vLi4vLi4vX2xpYi9idWlsZExvY2FsaXplRm4vaW5kZXguanNcIjtcbnZhciBlcmFWYWx1ZXMgPSB7XG4gIG5hcnJvdzogWydCJywgJ0EnXSxcbiAgYWJicmV2aWF0ZWQ6IFsnQkMnLCAnQUQnXSxcbiAgd2lkZTogWydCZWZvcmUgQ2hyaXN0JywgJ0Fubm8gRG9taW5pJ11cbn07XG52YXIgcXVhcnRlclZhbHVlcyA9IHtcbiAgbmFycm93OiBbJzEnLCAnMicsICczJywgJzQnXSxcbiAgYWJicmV2aWF0ZWQ6IFsnUTEnLCAnUTInLCAnUTMnLCAnUTQnXSxcbiAgd2lkZTogWycxc3QgcXVhcnRlcicsICcybmQgcXVhcnRlcicsICczcmQgcXVhcnRlcicsICc0dGggcXVhcnRlciddXG59OyAvLyBOb3RlOiBpbiBFbmdsaXNoLCB0aGUgbmFtZXMgb2YgZGF5cyBvZiB0aGUgd2VlayBhbmQgbW9udGhzIGFyZSBjYXBpdGFsaXplZC5cbi8vIElmIHlvdSBhcmUgbWFraW5nIGEgbmV3IGxvY2FsZSBiYXNlZCBvbiB0aGlzIG9uZSwgY2hlY2sgaWYgdGhlIHNhbWUgaXMgdHJ1ZSBmb3IgdGhlIGxhbmd1YWdlIHlvdSdyZSB3b3JraW5nIG9uLlxuLy8gR2VuZXJhbGx5LCBmb3JtYXR0ZWQgZGF0ZXMgc2hvdWxkIGxvb2sgbGlrZSB0aGV5IGFyZSBpbiB0aGUgbWlkZGxlIG9mIGEgc2VudGVuY2UsXG4vLyBlLmcuIGluIFNwYW5pc2ggbGFuZ3VhZ2UgdGhlIHdlZWtkYXlzIGFuZCBtb250aHMgc2hvdWxkIGJlIGluIHRoZSBsb3dlcmNhc2UuXG5cbnZhciBtb250aFZhbHVlcyA9IHtcbiAgbmFycm93OiBbJ0onLCAnRicsICdNJywgJ0EnLCAnTScsICdKJywgJ0onLCAnQScsICdTJywgJ08nLCAnTicsICdEJ10sXG4gIGFiYnJldmlhdGVkOiBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJ10sXG4gIHdpZGU6IFsnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddXG59O1xudmFyIGRheVZhbHVlcyA9IHtcbiAgbmFycm93OiBbJ1MnLCAnTScsICdUJywgJ1cnLCAnVCcsICdGJywgJ1MnXSxcbiAgc2hvcnQ6IFsnU3UnLCAnTW8nLCAnVHUnLCAnV2UnLCAnVGgnLCAnRnInLCAnU2EnXSxcbiAgYWJicmV2aWF0ZWQ6IFsnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0J10sXG4gIHdpZGU6IFsnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknXVxufTtcbnZhciBkYXlQZXJpb2RWYWx1ZXMgPSB7XG4gIG5hcnJvdzoge1xuICAgIGFtOiAnYScsXG4gICAgcG06ICdwJyxcbiAgICBtaWRuaWdodDogJ21pJyxcbiAgICBub29uOiAnbicsXG4gICAgbW9ybmluZzogJ21vcm5pbmcnLFxuICAgIGFmdGVybm9vbjogJ2FmdGVybm9vbicsXG4gICAgZXZlbmluZzogJ2V2ZW5pbmcnLFxuICAgIG5pZ2h0OiAnbmlnaHQnXG4gIH0sXG4gIGFiYnJldmlhdGVkOiB7XG4gICAgYW06ICdBTScsXG4gICAgcG06ICdQTScsXG4gICAgbWlkbmlnaHQ6ICdtaWRuaWdodCcsXG4gICAgbm9vbjogJ25vb24nLFxuICAgIG1vcm5pbmc6ICdtb3JuaW5nJyxcbiAgICBhZnRlcm5vb246ICdhZnRlcm5vb24nLFxuICAgIGV2ZW5pbmc6ICdldmVuaW5nJyxcbiAgICBuaWdodDogJ25pZ2h0J1xuICB9LFxuICB3aWRlOiB7XG4gICAgYW06ICdhLm0uJyxcbiAgICBwbTogJ3AubS4nLFxuICAgIG1pZG5pZ2h0OiAnbWlkbmlnaHQnLFxuICAgIG5vb246ICdub29uJyxcbiAgICBtb3JuaW5nOiAnbW9ybmluZycsXG4gICAgYWZ0ZXJub29uOiAnYWZ0ZXJub29uJyxcbiAgICBldmVuaW5nOiAnZXZlbmluZycsXG4gICAgbmlnaHQ6ICduaWdodCdcbiAgfVxufTtcbnZhciBmb3JtYXR0aW5nRGF5UGVyaW9kVmFsdWVzID0ge1xuICBuYXJyb3c6IHtcbiAgICBhbTogJ2EnLFxuICAgIHBtOiAncCcsXG4gICAgbWlkbmlnaHQ6ICdtaScsXG4gICAgbm9vbjogJ24nLFxuICAgIG1vcm5pbmc6ICdpbiB0aGUgbW9ybmluZycsXG4gICAgYWZ0ZXJub29uOiAnaW4gdGhlIGFmdGVybm9vbicsXG4gICAgZXZlbmluZzogJ2luIHRoZSBldmVuaW5nJyxcbiAgICBuaWdodDogJ2F0IG5pZ2h0J1xuICB9LFxuICBhYmJyZXZpYXRlZDoge1xuICAgIGFtOiAnQU0nLFxuICAgIHBtOiAnUE0nLFxuICAgIG1pZG5pZ2h0OiAnbWlkbmlnaHQnLFxuICAgIG5vb246ICdub29uJyxcbiAgICBtb3JuaW5nOiAnaW4gdGhlIG1vcm5pbmcnLFxuICAgIGFmdGVybm9vbjogJ2luIHRoZSBhZnRlcm5vb24nLFxuICAgIGV2ZW5pbmc6ICdpbiB0aGUgZXZlbmluZycsXG4gICAgbmlnaHQ6ICdhdCBuaWdodCdcbiAgfSxcbiAgd2lkZToge1xuICAgIGFtOiAnYS5tLicsXG4gICAgcG06ICdwLm0uJyxcbiAgICBtaWRuaWdodDogJ21pZG5pZ2h0JyxcbiAgICBub29uOiAnbm9vbicsXG4gICAgbW9ybmluZzogJ2luIHRoZSBtb3JuaW5nJyxcbiAgICBhZnRlcm5vb246ICdpbiB0aGUgYWZ0ZXJub29uJyxcbiAgICBldmVuaW5nOiAnaW4gdGhlIGV2ZW5pbmcnLFxuICAgIG5pZ2h0OiAnYXQgbmlnaHQnXG4gIH1cbn07XG5cbnZhciBvcmRpbmFsTnVtYmVyID0gZnVuY3Rpb24gKGRpcnR5TnVtYmVyLCBfb3B0aW9ucykge1xuICB2YXIgbnVtYmVyID0gTnVtYmVyKGRpcnR5TnVtYmVyKTsgLy8gSWYgb3JkaW5hbCBudW1iZXJzIGRlcGVuZCBvbiBjb250ZXh0LCBmb3IgZXhhbXBsZSxcbiAgLy8gaWYgdGhleSBhcmUgZGlmZmVyZW50IGZvciBkaWZmZXJlbnQgZ3JhbW1hdGljYWwgZ2VuZGVycyxcbiAgLy8gdXNlIGBvcHRpb25zLnVuaXRgLlxuICAvL1xuICAvLyBgdW5pdGAgY2FuIGJlICd5ZWFyJywgJ3F1YXJ0ZXInLCAnbW9udGgnLCAnd2VlaycsICdkYXRlJywgJ2RheU9mWWVhcicsXG4gIC8vICdkYXknLCAnaG91cicsICdtaW51dGUnLCAnc2Vjb25kJy5cblxuICB2YXIgcmVtMTAwID0gbnVtYmVyICUgMTAwO1xuXG4gIGlmIChyZW0xMDAgPiAyMCB8fCByZW0xMDAgPCAxMCkge1xuICAgIHN3aXRjaCAocmVtMTAwICUgMTApIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIG51bWJlciArICdzdCc7XG5cbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIG51bWJlciArICduZCc7XG5cbiAgICAgIGNhc2UgMzpcbiAgICAgICAgcmV0dXJuIG51bWJlciArICdyZCc7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bWJlciArICd0aCc7XG59O1xuXG52YXIgbG9jYWxpemUgPSB7XG4gIG9yZGluYWxOdW1iZXI6IG9yZGluYWxOdW1iZXIsXG4gIGVyYTogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IGVyYVZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6ICd3aWRlJ1xuICB9KSxcbiAgcXVhcnRlcjogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IHF1YXJ0ZXJWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiAnd2lkZScsXG4gICAgYXJndW1lbnRDYWxsYmFjazogZnVuY3Rpb24gKHF1YXJ0ZXIpIHtcbiAgICAgIHJldHVybiBxdWFydGVyIC0gMTtcbiAgICB9XG4gIH0pLFxuICBtb250aDogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IG1vbnRoVmFsdWVzLFxuICAgIGRlZmF1bHRXaWR0aDogJ3dpZGUnXG4gIH0pLFxuICBkYXk6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBkYXlWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiAnd2lkZSdcbiAgfSksXG4gIGRheVBlcmlvZDogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IGRheVBlcmlvZFZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6ICd3aWRlJyxcbiAgICBmb3JtYXR0aW5nVmFsdWVzOiBmb3JtYXR0aW5nRGF5UGVyaW9kVmFsdWVzLFxuICAgIGRlZmF1bHRGb3JtYXR0aW5nV2lkdGg6ICd3aWRlJ1xuICB9KVxufTtcbmV4cG9ydCBkZWZhdWx0IGxvY2FsaXplOyIsImltcG9ydCBidWlsZE1hdGNoRm4gZnJvbSBcIi4uLy4uLy4uL19saWIvYnVpbGRNYXRjaEZuL2luZGV4LmpzXCI7XG5pbXBvcnQgYnVpbGRNYXRjaFBhdHRlcm5GbiBmcm9tIFwiLi4vLi4vLi4vX2xpYi9idWlsZE1hdGNoUGF0dGVybkZuL2luZGV4LmpzXCI7XG52YXIgbWF0Y2hPcmRpbmFsTnVtYmVyUGF0dGVybiA9IC9eKFxcZCspKHRofHN0fG5kfHJkKT8vaTtcbnZhciBwYXJzZU9yZGluYWxOdW1iZXJQYXR0ZXJuID0gL1xcZCsvaTtcbnZhciBtYXRjaEVyYVBhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eKGJ8YSkvaSxcbiAgYWJicmV2aWF0ZWQ6IC9eKGJcXC4/XFxzP2NcXC4/fGJcXC4/XFxzP2NcXC4/XFxzP2VcXC4/fGFcXC4/XFxzP2RcXC4/fGNcXC4/XFxzP2VcXC4/KS9pLFxuICB3aWRlOiAvXihiZWZvcmUgY2hyaXN0fGJlZm9yZSBjb21tb24gZXJhfGFubm8gZG9taW5pfGNvbW1vbiBlcmEpL2lcbn07XG52YXIgcGFyc2VFcmFQYXR0ZXJucyA9IHtcbiAgYW55OiBbL15iL2ksIC9eKGF8YykvaV1cbn07XG52YXIgbWF0Y2hRdWFydGVyUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL15bMTIzNF0vaSxcbiAgYWJicmV2aWF0ZWQ6IC9ecVsxMjM0XS9pLFxuICB3aWRlOiAvXlsxMjM0XSh0aHxzdHxuZHxyZCk/IHF1YXJ0ZXIvaVxufTtcbnZhciBwYXJzZVF1YXJ0ZXJQYXR0ZXJucyA9IHtcbiAgYW55OiBbLzEvaSwgLzIvaSwgLzMvaSwgLzQvaV1cbn07XG52YXIgbWF0Y2hNb250aFBhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eW2pmbWFzb25kXS9pLFxuICBhYmJyZXZpYXRlZDogL14oamFufGZlYnxtYXJ8YXByfG1heXxqdW58anVsfGF1Z3xzZXB8b2N0fG5vdnxkZWMpL2ksXG4gIHdpZGU6IC9eKGphbnVhcnl8ZmVicnVhcnl8bWFyY2h8YXByaWx8bWF5fGp1bmV8anVseXxhdWd1c3R8c2VwdGVtYmVyfG9jdG9iZXJ8bm92ZW1iZXJ8ZGVjZW1iZXIpL2lcbn07XG52YXIgcGFyc2VNb250aFBhdHRlcm5zID0ge1xuICBuYXJyb3c6IFsvXmovaSwgL15mL2ksIC9ebS9pLCAvXmEvaSwgL15tL2ksIC9eai9pLCAvXmovaSwgL15hL2ksIC9ecy9pLCAvXm8vaSwgL15uL2ksIC9eZC9pXSxcbiAgYW55OiBbL15qYS9pLCAvXmYvaSwgL15tYXIvaSwgL15hcC9pLCAvXm1heS9pLCAvXmp1bi9pLCAvXmp1bC9pLCAvXmF1L2ksIC9ecy9pLCAvXm8vaSwgL15uL2ksIC9eZC9pXVxufTtcbnZhciBtYXRjaERheVBhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eW3NtdHdmXS9pLFxuICBzaG9ydDogL14oc3V8bW98dHV8d2V8dGh8ZnJ8c2EpL2ksXG4gIGFiYnJldmlhdGVkOiAvXihzdW58bW9ufHR1ZXx3ZWR8dGh1fGZyaXxzYXQpL2ksXG4gIHdpZGU6IC9eKHN1bmRheXxtb25kYXl8dHVlc2RheXx3ZWRuZXNkYXl8dGh1cnNkYXl8ZnJpZGF5fHNhdHVyZGF5KS9pXG59O1xudmFyIHBhcnNlRGF5UGF0dGVybnMgPSB7XG4gIG5hcnJvdzogWy9ecy9pLCAvXm0vaSwgL150L2ksIC9edy9pLCAvXnQvaSwgL15mL2ksIC9ecy9pXSxcbiAgYW55OiBbL15zdS9pLCAvXm0vaSwgL150dS9pLCAvXncvaSwgL150aC9pLCAvXmYvaSwgL15zYS9pXVxufTtcbnZhciBtYXRjaERheVBlcmlvZFBhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eKGF8cHxtaXxufChpbiB0aGV8YXQpIChtb3JuaW5nfGFmdGVybm9vbnxldmVuaW5nfG5pZ2h0KSkvaSxcbiAgYW55OiAvXihbYXBdXFwuP1xccz9tXFwuP3xtaWRuaWdodHxub29ufChpbiB0aGV8YXQpIChtb3JuaW5nfGFmdGVybm9vbnxldmVuaW5nfG5pZ2h0KSkvaVxufTtcbnZhciBwYXJzZURheVBlcmlvZFBhdHRlcm5zID0ge1xuICBhbnk6IHtcbiAgICBhbTogL15hL2ksXG4gICAgcG06IC9ecC9pLFxuICAgIG1pZG5pZ2h0OiAvXm1pL2ksXG4gICAgbm9vbjogL15uby9pLFxuICAgIG1vcm5pbmc6IC9tb3JuaW5nL2ksXG4gICAgYWZ0ZXJub29uOiAvYWZ0ZXJub29uL2ksXG4gICAgZXZlbmluZzogL2V2ZW5pbmcvaSxcbiAgICBuaWdodDogL25pZ2h0L2lcbiAgfVxufTtcbnZhciBtYXRjaCA9IHtcbiAgb3JkaW5hbE51bWJlcjogYnVpbGRNYXRjaFBhdHRlcm5Gbih7XG4gICAgbWF0Y2hQYXR0ZXJuOiBtYXRjaE9yZGluYWxOdW1iZXJQYXR0ZXJuLFxuICAgIHBhcnNlUGF0dGVybjogcGFyc2VPcmRpbmFsTnVtYmVyUGF0dGVybixcbiAgICB2YWx1ZUNhbGxiYWNrOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgIH1cbiAgfSksXG4gIGVyYTogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaEVyYVBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiAnd2lkZScsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VFcmFQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogJ2FueSdcbiAgfSksXG4gIHF1YXJ0ZXI6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hRdWFydGVyUGF0dGVybnMsXG4gICAgZGVmYXVsdE1hdGNoV2lkdGg6ICd3aWRlJyxcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZVF1YXJ0ZXJQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogJ2FueScsXG4gICAgdmFsdWVDYWxsYmFjazogZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICByZXR1cm4gaW5kZXggKyAxO1xuICAgIH1cbiAgfSksXG4gIG1vbnRoOiBidWlsZE1hdGNoRm4oe1xuICAgIG1hdGNoUGF0dGVybnM6IG1hdGNoTW9udGhQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogJ3dpZGUnLFxuICAgIHBhcnNlUGF0dGVybnM6IHBhcnNlTW9udGhQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogJ2FueSdcbiAgfSksXG4gIGRheTogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaERheVBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiAnd2lkZScsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VEYXlQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogJ2FueSdcbiAgfSksXG4gIGRheVBlcmlvZDogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaERheVBlcmlvZFBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiAnYW55JyxcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZURheVBlcmlvZFBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiAnYW55J1xuICB9KVxufTtcbmV4cG9ydCBkZWZhdWx0IG1hdGNoOyIsImltcG9ydCBmb3JtYXREaXN0YW5jZSBmcm9tIFwiLi9fbGliL2Zvcm1hdERpc3RhbmNlL2luZGV4LmpzXCI7XG5pbXBvcnQgZm9ybWF0TG9uZyBmcm9tIFwiLi9fbGliL2Zvcm1hdExvbmcvaW5kZXguanNcIjtcbmltcG9ydCBmb3JtYXRSZWxhdGl2ZSBmcm9tIFwiLi9fbGliL2Zvcm1hdFJlbGF0aXZlL2luZGV4LmpzXCI7XG5pbXBvcnQgbG9jYWxpemUgZnJvbSBcIi4vX2xpYi9sb2NhbGl6ZS9pbmRleC5qc1wiO1xuaW1wb3J0IG1hdGNoIGZyb20gXCIuL19saWIvbWF0Y2gvaW5kZXguanNcIjtcblxuLyoqXG4gKiBAdHlwZSB7TG9jYWxlfVxuICogQGNhdGVnb3J5IExvY2FsZXNcbiAqIEBzdW1tYXJ5IEVuZ2xpc2ggbG9jYWxlIChVbml0ZWQgU3RhdGVzKS5cbiAqIEBsYW5ndWFnZSBFbmdsaXNoXG4gKiBAaXNvLTYzOS0yIGVuZ1xuICogQGF1dGhvciBTYXNoYSBLb3NzIFtAa29zc25vY29ycF17QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL2tvc3Nub2NvcnB9XG4gKiBAYXV0aG9yIExlc2hhIEtvc3MgW0BsZXNoYWtvc3Nde0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9sZXNoYWtvc3N9XG4gKi9cbnZhciBsb2NhbGUgPSB7XG4gIGNvZGU6ICdlbi1VUycsXG4gIGZvcm1hdERpc3RhbmNlOiBmb3JtYXREaXN0YW5jZSxcbiAgZm9ybWF0TG9uZzogZm9ybWF0TG9uZyxcbiAgZm9ybWF0UmVsYXRpdmU6IGZvcm1hdFJlbGF0aXZlLFxuICBsb2NhbGl6ZTogbG9jYWxpemUsXG4gIG1hdGNoOiBtYXRjaCxcbiAgb3B0aW9uczoge1xuICAgIHdlZWtTdGFydHNPbjogMFxuICAgIC8qIFN1bmRheSAqL1xuICAgICxcbiAgICBmaXJzdFdlZWtDb250YWluc0RhdGU6IDFcbiAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IGxvY2FsZTsiLCJpbXBvcnQgeyBtaWxsaXNlY29uZHNJbkhvdXIsIG1pbGxpc2Vjb25kc0luTWludXRlIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbmltcG9ydCB0b0ludGVnZXIgZnJvbSBcIi4uL19saWIvdG9JbnRlZ2VyL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIHBhcnNlSVNPXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFBhcnNlIElTTyBzdHJpbmdcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFBhcnNlIHRoZSBnaXZlbiBzdHJpbmcgaW4gSVNPIDg2MDEgZm9ybWF0IGFuZCByZXR1cm4gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBGdW5jdGlvbiBhY2NlcHRzIGNvbXBsZXRlIElTTyA4NjAxIGZvcm1hdHMgYXMgd2VsbCBhcyBwYXJ0aWFsIGltcGxlbWVudGF0aW9ucy5cbiAqIElTTyA4NjAxOiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT184NjAxXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzbid0IGEgc3RyaW5nLCB0aGUgZnVuY3Rpb24gY2Fubm90IHBhcnNlIHRoZSBzdHJpbmcgb3JcbiAqIHRoZSB2YWx1ZXMgYXJlIGludmFsaWQsIGl0IHJldHVybnMgSW52YWxpZCBEYXRlLlxuICpcbiAqICMjIyB2Mi4wLjAgYnJlYWtpbmcgY2hhbmdlczpcbiAqXG4gKiAtIFtDaGFuZ2VzIHRoYXQgYXJlIGNvbW1vbiBmb3IgdGhlIHdob2xlIGxpYnJhcnldKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VwZ3JhZGVHdWlkZS5tZCNDb21tb24tQ2hhbmdlcykuXG4gKlxuICogLSBUaGUgcHJldmlvdXMgYHBhcnNlYCBpbXBsZW1lbnRhdGlvbiB3YXMgcmVuYW1lZCB0byBgcGFyc2VJU09gLlxuICpcbiAqICAgYGBgamF2YXNjcmlwdFxuICogICAvLyBCZWZvcmUgdjIuMC4wXG4gKiAgIHBhcnNlKCcyMDE2LTAxLTAxJylcbiAqXG4gKiAgIC8vIHYyLjAuMCBvbndhcmRcbiAqICAgcGFyc2VJU08oJzIwMTYtMDEtMDEnKVxuICogICBgYGBcbiAqXG4gKiAtIGBwYXJzZUlTT2Agbm93IHZhbGlkYXRlcyBzZXBhcmF0ZSBkYXRlIGFuZCB0aW1lIHZhbHVlcyBpbiBJU08tODYwMSBzdHJpbmdzXG4gKiAgIGFuZCByZXR1cm5zIGBJbnZhbGlkIERhdGVgIGlmIHRoZSBkYXRlIGlzIGludmFsaWQuXG4gKlxuICogICBgYGBqYXZhc2NyaXB0XG4gKiAgIHBhcnNlSVNPKCcyMDE4LTEzLTMyJylcbiAqICAgLy89PiBJbnZhbGlkIERhdGVcbiAqICAgYGBgXG4gKlxuICogLSBgcGFyc2VJU09gIG5vdyBkb2Vzbid0IGZhbGwgYmFjayB0byBgbmV3IERhdGVgIGNvbnN0cnVjdG9yXG4gKiAgIGlmIGl0IGZhaWxzIHRvIHBhcnNlIGEgc3RyaW5nIGFyZ3VtZW50LiBJbnN0ZWFkLCBpdCByZXR1cm5zIGBJbnZhbGlkIERhdGVgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBhcmd1bWVudCAtIHRoZSB2YWx1ZSB0byBjb252ZXJ0XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gYW4gb2JqZWN0IHdpdGggb3B0aW9ucy5cbiAqIEBwYXJhbSB7MHwxfDJ9IFtvcHRpb25zLmFkZGl0aW9uYWxEaWdpdHM9Ml0gLSB0aGUgYWRkaXRpb25hbCBudW1iZXIgb2YgZGlnaXRzIGluIHRoZSBleHRlbmRlZCB5ZWFyIGZvcm1hdFxuICogQHJldHVybnMge0RhdGV9IHRoZSBwYXJzZWQgZGF0ZSBpbiB0aGUgbG9jYWwgdGltZSB6b25lXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDEgYXJndW1lbnQgcmVxdWlyZWRcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBvcHRpb25zLmFkZGl0aW9uYWxEaWdpdHNgIG11c3QgYmUgMCwgMSBvciAyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENvbnZlcnQgc3RyaW5nICcyMDE0LTAyLTExVDExOjMwOjMwJyB0byBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gcGFyc2VJU08oJzIwMTQtMDItMTFUMTE6MzA6MzAnKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ29udmVydCBzdHJpbmcgJyswMjAxNDEwMScgdG8gZGF0ZSxcbiAqIC8vIGlmIHRoZSBhZGRpdGlvbmFsIG51bWJlciBvZiBkaWdpdHMgaW4gdGhlIGV4dGVuZGVkIHllYXIgZm9ybWF0IGlzIDE6XG4gKiBjb25zdCByZXN1bHQgPSBwYXJzZUlTTygnKzAyMDE0MTAxJywgeyBhZGRpdGlvbmFsRGlnaXRzOiAxIH0pXG4gKiAvLz0+IEZyaSBBcHIgMTEgMjAxNCAwMDowMDowMFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlSVNPKGFyZ3VtZW50LCBkaXJ0eU9wdGlvbnMpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciBvcHRpb25zID0gZGlydHlPcHRpb25zIHx8IHt9O1xuICB2YXIgYWRkaXRpb25hbERpZ2l0cyA9IG9wdGlvbnMuYWRkaXRpb25hbERpZ2l0cyA9PSBudWxsID8gMiA6IHRvSW50ZWdlcihvcHRpb25zLmFkZGl0aW9uYWxEaWdpdHMpO1xuXG4gIGlmIChhZGRpdGlvbmFsRGlnaXRzICE9PSAyICYmIGFkZGl0aW9uYWxEaWdpdHMgIT09IDEgJiYgYWRkaXRpb25hbERpZ2l0cyAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdhZGRpdGlvbmFsRGlnaXRzIG11c3QgYmUgMCwgMSBvciAyJyk7XG4gIH1cblxuICBpZiAoISh0eXBlb2YgYXJndW1lbnQgPT09ICdzdHJpbmcnIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudCkgPT09ICdbb2JqZWN0IFN0cmluZ10nKSkge1xuICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICB9XG5cbiAgdmFyIGRhdGVTdHJpbmdzID0gc3BsaXREYXRlU3RyaW5nKGFyZ3VtZW50KTtcbiAgdmFyIGRhdGU7XG5cbiAgaWYgKGRhdGVTdHJpbmdzLmRhdGUpIHtcbiAgICB2YXIgcGFyc2VZZWFyUmVzdWx0ID0gcGFyc2VZZWFyKGRhdGVTdHJpbmdzLmRhdGUsIGFkZGl0aW9uYWxEaWdpdHMpO1xuICAgIGRhdGUgPSBwYXJzZURhdGUocGFyc2VZZWFyUmVzdWx0LnJlc3REYXRlU3RyaW5nLCBwYXJzZVllYXJSZXN1bHQueWVhcik7XG4gIH1cblxuICBpZiAoIWRhdGUgfHwgaXNOYU4oZGF0ZS5nZXRUaW1lKCkpKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gIH1cblxuICB2YXIgdGltZXN0YW1wID0gZGF0ZS5nZXRUaW1lKCk7XG4gIHZhciB0aW1lID0gMDtcbiAgdmFyIG9mZnNldDtcblxuICBpZiAoZGF0ZVN0cmluZ3MudGltZSkge1xuICAgIHRpbWUgPSBwYXJzZVRpbWUoZGF0ZVN0cmluZ3MudGltZSk7XG5cbiAgICBpZiAoaXNOYU4odGltZSkpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICAgIH1cbiAgfVxuXG4gIGlmIChkYXRlU3RyaW5ncy50aW1lem9uZSkge1xuICAgIG9mZnNldCA9IHBhcnNlVGltZXpvbmUoZGF0ZVN0cmluZ3MudGltZXpvbmUpO1xuXG4gICAgaWYgKGlzTmFOKG9mZnNldCkpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgZGlydHlEYXRlID0gbmV3IERhdGUodGltZXN0YW1wICsgdGltZSk7IC8vIGpzIHBhcnNlZCBzdHJpbmcgYXNzdW1pbmcgaXQncyBpbiBVVEMgdGltZXpvbmVcbiAgICAvLyBidXQgd2UgbmVlZCBpdCB0byBiZSBwYXJzZWQgaW4gb3VyIHRpbWV6b25lXG4gICAgLy8gc28gd2UgdXNlIHV0YyB2YWx1ZXMgdG8gYnVpbGQgZGF0ZSBpbiBvdXIgdGltZXpvbmUuXG4gICAgLy8gWWVhciB2YWx1ZXMgZnJvbSAwIHRvIDk5IG1hcCB0byB0aGUgeWVhcnMgMTkwMCB0byAxOTk5XG4gICAgLy8gc28gc2V0IHllYXIgZXhwbGljaXRseSB3aXRoIHNldEZ1bGxZZWFyLlxuXG4gICAgdmFyIHJlc3VsdCA9IG5ldyBEYXRlKDApO1xuICAgIHJlc3VsdC5zZXRGdWxsWWVhcihkaXJ0eURhdGUuZ2V0VVRDRnVsbFllYXIoKSwgZGlydHlEYXRlLmdldFVUQ01vbnRoKCksIGRpcnR5RGF0ZS5nZXRVVENEYXRlKCkpO1xuICAgIHJlc3VsdC5zZXRIb3VycyhkaXJ0eURhdGUuZ2V0VVRDSG91cnMoKSwgZGlydHlEYXRlLmdldFVUQ01pbnV0ZXMoKSwgZGlydHlEYXRlLmdldFVUQ1NlY29uZHMoKSwgZGlydHlEYXRlLmdldFVUQ01pbGxpc2Vjb25kcygpKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcmV0dXJuIG5ldyBEYXRlKHRpbWVzdGFtcCArIHRpbWUgKyBvZmZzZXQpO1xufVxudmFyIHBhdHRlcm5zID0ge1xuICBkYXRlVGltZURlbGltaXRlcjogL1tUIF0vLFxuICB0aW1lWm9uZURlbGltaXRlcjogL1taIF0vaSxcbiAgdGltZXpvbmU6IC8oW1orLV0uKikkL1xufTtcbnZhciBkYXRlUmVnZXggPSAvXi0/KD86KFxcZHszfSl8KFxcZHsyfSkoPzotPyhcXGR7Mn0pKT98VyhcXGR7Mn0pKD86LT8oXFxkezF9KSk/fCkkLztcbnZhciB0aW1lUmVnZXggPSAvXihcXGR7Mn0oPzpbLixdXFxkKik/KSg/Ojo/KFxcZHsyfSg/OlsuLF1cXGQqKT8pKT8oPzo6PyhcXGR7Mn0oPzpbLixdXFxkKik/KSk/JC87XG52YXIgdGltZXpvbmVSZWdleCA9IC9eKFsrLV0pKFxcZHsyfSkoPzo6PyhcXGR7Mn0pKT8kLztcblxuZnVuY3Rpb24gc3BsaXREYXRlU3RyaW5nKGRhdGVTdHJpbmcpIHtcbiAgdmFyIGRhdGVTdHJpbmdzID0ge307XG4gIHZhciBhcnJheSA9IGRhdGVTdHJpbmcuc3BsaXQocGF0dGVybnMuZGF0ZVRpbWVEZWxpbWl0ZXIpO1xuICB2YXIgdGltZVN0cmluZzsgLy8gVGhlIHJlZ2V4IG1hdGNoIHNob3VsZCBvbmx5IHJldHVybiBhdCBtYXhpbXVtIHR3byBhcnJheSBlbGVtZW50cy5cbiAgLy8gW2RhdGVdLCBbdGltZV0sIG9yIFtkYXRlLCB0aW1lXS5cblxuICBpZiAoYXJyYXkubGVuZ3RoID4gMikge1xuICAgIHJldHVybiBkYXRlU3RyaW5ncztcbiAgfVxuXG4gIGlmICgvOi8udGVzdChhcnJheVswXSkpIHtcbiAgICB0aW1lU3RyaW5nID0gYXJyYXlbMF07XG4gIH0gZWxzZSB7XG4gICAgZGF0ZVN0cmluZ3MuZGF0ZSA9IGFycmF5WzBdO1xuICAgIHRpbWVTdHJpbmcgPSBhcnJheVsxXTtcblxuICAgIGlmIChwYXR0ZXJucy50aW1lWm9uZURlbGltaXRlci50ZXN0KGRhdGVTdHJpbmdzLmRhdGUpKSB7XG4gICAgICBkYXRlU3RyaW5ncy5kYXRlID0gZGF0ZVN0cmluZy5zcGxpdChwYXR0ZXJucy50aW1lWm9uZURlbGltaXRlcilbMF07XG4gICAgICB0aW1lU3RyaW5nID0gZGF0ZVN0cmluZy5zdWJzdHIoZGF0ZVN0cmluZ3MuZGF0ZS5sZW5ndGgsIGRhdGVTdHJpbmcubGVuZ3RoKTtcbiAgICB9XG4gIH1cblxuICBpZiAodGltZVN0cmluZykge1xuICAgIHZhciB0b2tlbiA9IHBhdHRlcm5zLnRpbWV6b25lLmV4ZWModGltZVN0cmluZyk7XG5cbiAgICBpZiAodG9rZW4pIHtcbiAgICAgIGRhdGVTdHJpbmdzLnRpbWUgPSB0aW1lU3RyaW5nLnJlcGxhY2UodG9rZW5bMV0sICcnKTtcbiAgICAgIGRhdGVTdHJpbmdzLnRpbWV6b25lID0gdG9rZW5bMV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGVTdHJpbmdzLnRpbWUgPSB0aW1lU3RyaW5nO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkYXRlU3RyaW5ncztcbn1cblxuZnVuY3Rpb24gcGFyc2VZZWFyKGRhdGVTdHJpbmcsIGFkZGl0aW9uYWxEaWdpdHMpIHtcbiAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cCgnXig/OihcXFxcZHs0fXxbKy1dXFxcXGR7JyArICg0ICsgYWRkaXRpb25hbERpZ2l0cykgKyAnfSl8KFxcXFxkezJ9fFsrLV1cXFxcZHsnICsgKDIgKyBhZGRpdGlvbmFsRGlnaXRzKSArICd9KSQpJyk7XG4gIHZhciBjYXB0dXJlcyA9IGRhdGVTdHJpbmcubWF0Y2gocmVnZXgpOyAvLyBJbnZhbGlkIElTTy1mb3JtYXR0ZWQgeWVhclxuXG4gIGlmICghY2FwdHVyZXMpIHJldHVybiB7XG4gICAgeWVhcjogTmFOLFxuICAgIHJlc3REYXRlU3RyaW5nOiAnJ1xuICB9O1xuICB2YXIgeWVhciA9IGNhcHR1cmVzWzFdID8gcGFyc2VJbnQoY2FwdHVyZXNbMV0pIDogbnVsbDtcbiAgdmFyIGNlbnR1cnkgPSBjYXB0dXJlc1syXSA/IHBhcnNlSW50KGNhcHR1cmVzWzJdKSA6IG51bGw7IC8vIGVpdGhlciB5ZWFyIG9yIGNlbnR1cnkgaXMgbnVsbCwgbm90IGJvdGhcblxuICByZXR1cm4ge1xuICAgIHllYXI6IGNlbnR1cnkgPT09IG51bGwgPyB5ZWFyIDogY2VudHVyeSAqIDEwMCxcbiAgICByZXN0RGF0ZVN0cmluZzogZGF0ZVN0cmluZy5zbGljZSgoY2FwdHVyZXNbMV0gfHwgY2FwdHVyZXNbMl0pLmxlbmd0aClcbiAgfTtcbn1cblxuZnVuY3Rpb24gcGFyc2VEYXRlKGRhdGVTdHJpbmcsIHllYXIpIHtcbiAgLy8gSW52YWxpZCBJU08tZm9ybWF0dGVkIHllYXJcbiAgaWYgKHllYXIgPT09IG51bGwpIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICB2YXIgY2FwdHVyZXMgPSBkYXRlU3RyaW5nLm1hdGNoKGRhdGVSZWdleCk7IC8vIEludmFsaWQgSVNPLWZvcm1hdHRlZCBzdHJpbmdcblxuICBpZiAoIWNhcHR1cmVzKSByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgdmFyIGlzV2Vla0RhdGUgPSAhIWNhcHR1cmVzWzRdO1xuICB2YXIgZGF5T2ZZZWFyID0gcGFyc2VEYXRlVW5pdChjYXB0dXJlc1sxXSk7XG4gIHZhciBtb250aCA9IHBhcnNlRGF0ZVVuaXQoY2FwdHVyZXNbMl0pIC0gMTtcbiAgdmFyIGRheSA9IHBhcnNlRGF0ZVVuaXQoY2FwdHVyZXNbM10pO1xuICB2YXIgd2VlayA9IHBhcnNlRGF0ZVVuaXQoY2FwdHVyZXNbNF0pO1xuICB2YXIgZGF5T2ZXZWVrID0gcGFyc2VEYXRlVW5pdChjYXB0dXJlc1s1XSkgLSAxO1xuXG4gIGlmIChpc1dlZWtEYXRlKSB7XG4gICAgaWYgKCF2YWxpZGF0ZVdlZWtEYXRlKHllYXIsIHdlZWssIGRheU9mV2VlaykpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICAgIH1cblxuICAgIHJldHVybiBkYXlPZklTT1dlZWtZZWFyKHllYXIsIHdlZWssIGRheU9mV2Vlayk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgwKTtcblxuICAgIGlmICghdmFsaWRhdGVEYXRlKHllYXIsIG1vbnRoLCBkYXkpIHx8ICF2YWxpZGF0ZURheU9mWWVhckRhdGUoeWVhciwgZGF5T2ZZZWFyKSkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gICAgfVxuXG4gICAgZGF0ZS5zZXRVVENGdWxsWWVhcih5ZWFyLCBtb250aCwgTWF0aC5tYXgoZGF5T2ZZZWFyLCBkYXkpKTtcbiAgICByZXR1cm4gZGF0ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZURhdGVVbml0KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA/IHBhcnNlSW50KHZhbHVlKSA6IDE7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVGltZSh0aW1lU3RyaW5nKSB7XG4gIHZhciBjYXB0dXJlcyA9IHRpbWVTdHJpbmcubWF0Y2godGltZVJlZ2V4KTtcbiAgaWYgKCFjYXB0dXJlcykgcmV0dXJuIE5hTjsgLy8gSW52YWxpZCBJU08tZm9ybWF0dGVkIHRpbWVcblxuICB2YXIgaG91cnMgPSBwYXJzZVRpbWVVbml0KGNhcHR1cmVzWzFdKTtcbiAgdmFyIG1pbnV0ZXMgPSBwYXJzZVRpbWVVbml0KGNhcHR1cmVzWzJdKTtcbiAgdmFyIHNlY29uZHMgPSBwYXJzZVRpbWVVbml0KGNhcHR1cmVzWzNdKTtcblxuICBpZiAoIXZhbGlkYXRlVGltZShob3VycywgbWludXRlcywgc2Vjb25kcykpIHtcbiAgICByZXR1cm4gTmFOO1xuICB9XG5cbiAgcmV0dXJuIGhvdXJzICogbWlsbGlzZWNvbmRzSW5Ib3VyICsgbWludXRlcyAqIG1pbGxpc2Vjb25kc0luTWludXRlICsgc2Vjb25kcyAqIDEwMDA7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVGltZVVuaXQodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICYmIHBhcnNlRmxvYXQodmFsdWUucmVwbGFjZSgnLCcsICcuJykpIHx8IDA7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVGltZXpvbmUodGltZXpvbmVTdHJpbmcpIHtcbiAgaWYgKHRpbWV6b25lU3RyaW5nID09PSAnWicpIHJldHVybiAwO1xuICB2YXIgY2FwdHVyZXMgPSB0aW1lem9uZVN0cmluZy5tYXRjaCh0aW1lem9uZVJlZ2V4KTtcbiAgaWYgKCFjYXB0dXJlcykgcmV0dXJuIDA7XG4gIHZhciBzaWduID0gY2FwdHVyZXNbMV0gPT09ICcrJyA/IC0xIDogMTtcbiAgdmFyIGhvdXJzID0gcGFyc2VJbnQoY2FwdHVyZXNbMl0pO1xuICB2YXIgbWludXRlcyA9IGNhcHR1cmVzWzNdICYmIHBhcnNlSW50KGNhcHR1cmVzWzNdKSB8fCAwO1xuXG4gIGlmICghdmFsaWRhdGVUaW1lem9uZShob3VycywgbWludXRlcykpIHtcbiAgICByZXR1cm4gTmFOO1xuICB9XG5cbiAgcmV0dXJuIHNpZ24gKiAoaG91cnMgKiBtaWxsaXNlY29uZHNJbkhvdXIgKyBtaW51dGVzICogbWlsbGlzZWNvbmRzSW5NaW51dGUpO1xufVxuXG5mdW5jdGlvbiBkYXlPZklTT1dlZWtZZWFyKGlzb1dlZWtZZWFyLCB3ZWVrLCBkYXkpIHtcbiAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgwKTtcbiAgZGF0ZS5zZXRVVENGdWxsWWVhcihpc29XZWVrWWVhciwgMCwgNCk7XG4gIHZhciBmb3VydGhPZkphbnVhcnlEYXkgPSBkYXRlLmdldFVUQ0RheSgpIHx8IDc7XG4gIHZhciBkaWZmID0gKHdlZWsgLSAxKSAqIDcgKyBkYXkgKyAxIC0gZm91cnRoT2ZKYW51YXJ5RGF5O1xuICBkYXRlLnNldFVUQ0RhdGUoZGF0ZS5nZXRVVENEYXRlKCkgKyBkaWZmKTtcbiAgcmV0dXJuIGRhdGU7XG59IC8vIFZhbGlkYXRpb24gZnVuY3Rpb25zXG4vLyBGZWJydWFyeSBpcyBudWxsIHRvIGhhbmRsZSB0aGUgbGVhcCB5ZWFyICh1c2luZyB8fClcblxuXG52YXIgZGF5c0luTW9udGhzID0gWzMxLCBudWxsLCAzMSwgMzAsIDMxLCAzMCwgMzEsIDMxLCAzMCwgMzEsIDMwLCAzMV07XG5cbmZ1bmN0aW9uIGlzTGVhcFllYXJJbmRleCh5ZWFyKSB7XG4gIHJldHVybiB5ZWFyICUgNDAwID09PSAwIHx8IHllYXIgJSA0ID09PSAwICYmIHllYXIgJSAxMDAgIT09IDA7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlRGF0ZSh5ZWFyLCBtb250aCwgZGF0ZSkge1xuICByZXR1cm4gbW9udGggPj0gMCAmJiBtb250aCA8PSAxMSAmJiBkYXRlID49IDEgJiYgZGF0ZSA8PSAoZGF5c0luTW9udGhzW21vbnRoXSB8fCAoaXNMZWFwWWVhckluZGV4KHllYXIpID8gMjkgOiAyOCkpO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZURheU9mWWVhckRhdGUoeWVhciwgZGF5T2ZZZWFyKSB7XG4gIHJldHVybiBkYXlPZlllYXIgPj0gMSAmJiBkYXlPZlllYXIgPD0gKGlzTGVhcFllYXJJbmRleCh5ZWFyKSA/IDM2NiA6IDM2NSk7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlV2Vla0RhdGUoX3llYXIsIHdlZWssIGRheSkge1xuICByZXR1cm4gd2VlayA+PSAxICYmIHdlZWsgPD0gNTMgJiYgZGF5ID49IDAgJiYgZGF5IDw9IDY7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlVGltZShob3VycywgbWludXRlcywgc2Vjb25kcykge1xuICBpZiAoaG91cnMgPT09IDI0KSB7XG4gICAgcmV0dXJuIG1pbnV0ZXMgPT09IDAgJiYgc2Vjb25kcyA9PT0gMDtcbiAgfVxuXG4gIHJldHVybiBzZWNvbmRzID49IDAgJiYgc2Vjb25kcyA8IDYwICYmIG1pbnV0ZXMgPj0gMCAmJiBtaW51dGVzIDwgNjAgJiYgaG91cnMgPj0gMCAmJiBob3VycyA8IDI1O1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVRpbWV6b25lKF9ob3VycywgbWludXRlcykge1xuICByZXR1cm4gbWludXRlcyA+PSAwICYmIG1pbnV0ZXMgPD0gNTk7XG59IiwiaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgdG9EYXRlXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENvbnZlcnQgdGhlIGdpdmVuIGFyZ3VtZW50IHRvIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlLCB0aGUgZnVuY3Rpb24gcmV0dXJucyBpdHMgY2xvbmUuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIGEgbnVtYmVyLCBpdCBpcyB0cmVhdGVkIGFzIGEgdGltZXN0YW1wLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBub25lIG9mIHRoZSBhYm92ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgSW52YWxpZCBEYXRlLlxuICpcbiAqICoqTm90ZSoqOiAqYWxsKiBEYXRlIGFyZ3VtZW50cyBwYXNzZWQgdG8gYW55ICpkYXRlLWZucyogZnVuY3Rpb24gaXMgcHJvY2Vzc2VkIGJ5IGB0b0RhdGVgLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGFyZ3VtZW50IC0gdGhlIHZhbHVlIHRvIGNvbnZlcnRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgcGFyc2VkIGRhdGUgaW4gdGhlIGxvY2FsIHRpbWUgem9uZVxuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENsb25lIHRoZSBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKG5ldyBEYXRlKDIwMTQsIDEsIDExLCAxMSwgMzAsIDMwKSlcbiAqIC8vPT4gVHVlIEZlYiAxMSAyMDE0IDExOjMwOjMwXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENvbnZlcnQgdGhlIHRpbWVzdGFtcCB0byBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKDEzOTIwOTg0MzAwMDApXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvRGF0ZShhcmd1bWVudCkge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgdmFyIGFyZ1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudCk7IC8vIENsb25lIHRoZSBkYXRlXG5cbiAgaWYgKGFyZ3VtZW50IGluc3RhbmNlb2YgRGF0ZSB8fCB0eXBlb2YgYXJndW1lbnQgPT09ICdvYmplY3QnICYmIGFyZ1N0ciA9PT0gJ1tvYmplY3QgRGF0ZV0nKSB7XG4gICAgLy8gUHJldmVudCB0aGUgZGF0ZSB0byBsb3NlIHRoZSBtaWxsaXNlY29uZHMgd2hlbiBwYXNzZWQgdG8gbmV3IERhdGUoKSBpbiBJRTEwXG4gICAgcmV0dXJuIG5ldyBEYXRlKGFyZ3VtZW50LmdldFRpbWUoKSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGFyZ3VtZW50ID09PSAnbnVtYmVyJyB8fCBhcmdTdHIgPT09ICdbb2JqZWN0IE51bWJlcl0nKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGFyZ3VtZW50KTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoKHR5cGVvZiBhcmd1bWVudCA9PT0gJ3N0cmluZycgfHwgYXJnU3RyID09PSAnW29iamVjdCBTdHJpbmddJykgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFwiU3RhcnRpbmcgd2l0aCB2Mi4wLjAtYmV0YS4xIGRhdGUtZm5zIGRvZXNuJ3QgYWNjZXB0IHN0cmluZ3MgYXMgZGF0ZSBhcmd1bWVudHMuIFBsZWFzZSB1c2UgYHBhcnNlSVNPYCB0byBwYXJzZSBzdHJpbmdzLiBTZWU6IGh0dHBzOi8vZ2l0LmlvL2ZqdWxlXCIpOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuXG4gICAgICBjb25zb2xlLndhcm4obmV3IEVycm9yKCkuc3RhY2spO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICB9XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuIFxuIFRBQkxFIE9GIENPTlRFTlRTXG4gKiBNYXN0ZXIgTGlzdFxuICogTGlzdHNcbiAqIFRhc2tzXG4gXG4gKi9cblxuLy8gTUFTVEVSIExJU1RcbmNsYXNzIE1hc3Rlckxpc3Qge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLml0ZW1zID0gW107XG4gIH1cblxuICBhZGRJdGVtKHRpdGxlKSB7XG4gICAgdGhpcy5pdGVtcy51bnNoaWZ0KG5ldyBMaXN0KHRpdGxlKSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkZWxldGVJdGVtKGluZGV4KSB7XG4gICAgdGhpcy5pdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBkaXIgPSAxIGlmIG1vdmVkIGRvd247IC0xIGlmIG1vdmVkIHVwXG4gICAqL1xuICBtb3ZlSXRlbShpbmRleCwgZGlyKSB7XG4gICAgY29uc3QgbW92ZWRJdGVtID0gdGhpcy5pdGVtcy5zcGxpY2UoaW5kZXgsIDEpWzBdO1xuICAgIHRoaXMuaXRlbXMuc3BsaWNlKGluZGV4ICsgZGlyLCAwLCBtb3ZlZEl0ZW0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc29ydEl0ZW1zKGNhdGVnb3J5KSB7XG4gICAgaWYgKGNhdGVnb3J5ID09PSBcImNvbXBsZXRlZFwiKSB7XG4gICAgICB0aGlzLml0ZW1zLnNvcnQoKGEsIGIpID0+IGFbY2F0ZWdvcnldIC0gYltjYXRlZ29yeV0pO1xuICAgICAgY29uc29sZS5sb2coXCJjXCIpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKGNhdGVnb3J5ID09PSBcImRhdGVEdWVcIikge1xuICAgICAgdGhpcy5pdGVtcy5zb3J0KFxuICAgICAgICAoYSwgYikgPT4gRGF0ZS5wYXJzZShhW2NhdGVnb3J5XSkgLSBEYXRlLnBhcnNlKGJbY2F0ZWdvcnldKVxuICAgICAgKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiZFwiKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRoaXMuaXRlbXMuc29ydCgoYSwgYikgPT4gYltjYXRlZ29yeV0gLSBhW2NhdGVnb3J5XSk7XG4gICAgY29uc29sZS5sb2coXCJvXCIpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbi8vIExJU1RTXG5jbGFzcyBMaXN0IGV4dGVuZHMgTWFzdGVyTGlzdCB7XG4gIGNvbnN0cnVjdG9yKHRpdGxlKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5pZCA9IERhdGUubm93KCk7XG4gICAgdGhpcy5jb2xvciA9IFwiaW5pdGlhbFwiO1xuICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgfVxuXG4gIC8vIEFkZCBUYXNrXG4gIGFkZEl0ZW0odGl0bGUsIGRlc2MsIGRhdGVEdWUsIHByaW9yaXR5KSB7XG4gICAgdGhpcy5pdGVtcy51bnNoaWZ0KG5ldyBUYXNrKHRpdGxlLCBkZXNjLCBkYXRlRHVlLCBwcmlvcml0eSkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgX2NsZWFyQ29tcGxldGVkVGFza3MoKSB7XG4gICAgdGhpcy5pdGVtcyA9IHRoaXMuaXRlbXMuZmlsdGVyKChhKSA9PiBhLmNvbXBsZXRlZCA9PT0gZmFsc2UpO1xuICB9XG59XG5cbi8vIFRBU0tTXG5jbGFzcyBUYXNrIHtcbiAgY29uc3RydWN0b3IodGl0bGUsIGRlc2MsIGRhdGVEdWUsIHByaW9yaXR5KSB7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIHRoaXMuZGVzYyA9IGRlc2M7XG4gICAgdGhpcy5pZCA9IERhdGUubm93KCk7XG4gICAgdGhpcy5kYXRlRHVlID0gZGF0ZUR1ZTtcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmNvbXBsZXRlZERhdGU7XG4gIH1cblxuICAvLyBUb2dnbGUgQ29tcGxldGVkXG4gIHRvZ2dsZUNvbXBsZXRlZCgpIHtcbiAgICB0aGlzLmNvbXBsZXRlZCA9PT0gZmFsc2VcbiAgICAgID8gKHRoaXMuY29tcGxldGVkID0gdHJ1ZSlcbiAgICAgIDogKHRoaXMuY29tcGxldGVkID0gZmFsc2UpO1xuXG4gICAgaWYgKHRoaXMuY29tcGxldGVkID09PSB0cnVlKVxuICAgICAgdGhpcy5jb21wbGV0ZWREYXRlID0gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZyhuYXZpZ2F0b3IubGFuZ3VhZ2VzWzBdLCB7XG4gICAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxuICAgICAgICBtb250aDogXCJzaG9ydFwiLFxuICAgICAgICBkYXk6IFwiMi1kaWdpdFwiLFxuICAgICAgfSk7XG5cbiAgICBpZiAodGhpcy5jb21wbGV0ZWQgPT09IGZhbHNlKSB0aGlzLmNvbXBsZXRlZERhdGUgPSBcIlwiO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBUb2dnbGUgUHJpb3JpdHlcbiAgdG9nZ2xlUHJpb3JpdHkoKSB7XG4gICAgdGhpcy5wcmlvcml0eSA9PT0gZmFsc2UgPyAodGhpcy5wcmlvcml0eSA9IHRydWUpIDogKHRoaXMucHJpb3JpdHkgPSBmYWxzZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuZXhwb3J0IHsgTWFzdGVyTGlzdCwgTGlzdCwgVGFzayB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IGZvcm1hdERpc3RhbmNlVG9Ob3dTdHJpY3QsIHBhcnNlSVNPIH0gZnJvbSBcImRhdGUtZm5zXCI7XG5cbi8qKlxuICogVEFCTEUgT0YgQ09OVEVOVFNcbiBcbiAqIERyeSBGdW5jdGlvbnNcbiAqIEhlYWRlciBCdXR0b25zXG4gKiBUYXNrIEJ1dHRvbnNcbiAqIFNpZGViYXIgQnV0dG9uc1xuICogQWN0aXZlIFRhc2sgTGlzdFxuICogSFRNTCBJbnNlcnRzXG4gKiBFeHBvcnRzXG4gXG4gKiovXG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogRFJZIEZVTkNUSU9OU1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbmNvbnN0IGNsZWFyRm9ybSA9IGZ1bmN0aW9uIChmb3JtVGl0bGUsIGZvcm1EdWUsIGZvcm1EZXNjLCBmb3JtUHJpb3JpdHkpIHtcbiAgcmVtb3ZlRXJyb3JPdXRsaW5lKGZvcm1UaXRsZSk7XG5cbiAgZm9ybVRpdGxlLnZhbHVlID0gXCJcIjtcbiAgZm9ybUR1ZS52YWx1ZSA9IFwiXCI7XG4gIGZvcm1EZXNjLnZhbHVlID0gXCJcIjtcbiAgZm9ybVByaW9yaXR5LmNoZWNrZWQgPSBmYWxzZTtcbn07XG5cbmNvbnN0IHRvZ2dsZUhpZGVFbCA9IChlbCkgPT4gZWwuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGRlblwiKTtcblxuY29uc3QgcmVtb3ZlRXJyb3JPdXRsaW5lID0gKGVsKSA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKFwicmVkLW91dGxpbmVcIik7XG5jb25zdCBhZGRFcnJvck91dGxpbmUgPSAoZWwpID0+IGVsLmNsYXNzTGlzdC5hZGQoXCJyZWQtb3V0bGluZVwiKTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBIRUFERVIgQlVUVE9OU1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vIFNJREVCQVIgVE9HR0xFXG5jb25zdCB0b2dnbGVTaWRlYmFyID0gZnVuY3Rpb24gKFxuICBzaWRlYmFyLFxuICBsaXN0c01lbnVFbmRCYXJzLFxuICBsaXN0c01lbnVNaWRCYXIxLFxuICBsaXN0c01lbnVNaWRCYXIyXG4pIHtcbiAgLy8gUmV2ZWFsIHNpZGUgYmFyXG4gIHRvZ2dsZUhpZGVFbChzaWRlYmFyKTtcblxuICAvLyBUcmFuZm9ybSBjbG9zZSBidXR0b25cbiAgbGlzdHNNZW51RW5kQmFycy5mb3JFYWNoKChiYXIpID0+IGJhci5jbGFzc0xpc3QudG9nZ2xlKFwiYmFyLS12YW5pc2hcIikpO1xuICBsaXN0c01lbnVNaWRCYXIxLmNsYXNzTGlzdC50b2dnbGUoXCJiYXJfX21pZC0tcm90YXRlXCIpO1xuICBsaXN0c01lbnVNaWRCYXIyLmNsYXNzTGlzdC50b2dnbGUoXCJiYXJfX21pZDItLXJvdGF0ZVwiKTtcbn07XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogVEFTSyBCVVRUT05TXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8gQ2hhbmdlIGNvbXBsZXRlZCB0YXNrIGNoZWNrYm94IHZpc3VhbFxuY29uc3QgZGltQ29tcGxldGVkVGFza3MgPSBmdW5jdGlvbiAoY2xpY2tlZCkge1xuICAvLyBDaGFuZ2UgdGFzayB0ZXh0IGNvbG9yIC8gc3RyaWtldGhydVxuICBjbGlja2VkLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImNoZWNrZWRcIik7XG5cbiAgLy8gQ2hhbmdlIHRhc2sgZGV0YWlscyBidXR0b24gY29sb3JcbiAgY2xpY2tlZC5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQuY2xhc3NMaXN0LmFkZChcbiAgICBcImJ0bl9fZGV0YWlscy0tY29tcGxldGVkXCJcbiAgKTtcblxuICAvLyBDaGFuZ2UgdGFzayBpdGVtIGZpbHRlclxuICBjbGlja2VkLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiY29tcGxldGVkLS10cnVlXCIpO1xuXG4gIC8vIENoYW5nZSBEZXRhaWxzIGR1ZSBkYXRlIGZvbnQgY29sb3JcbiAgY2xpY2tlZC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQubGFzdEVsZW1lbnRDaGlsZC5sYXN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkLmxhc3RFbGVtZW50Q2hpbGQ/LmNsYXNzTGlzdC5hZGQoXG4gICAgXCJjaGVja2VkXCJcbiAgKTtcbn07XG5cbmNvbnN0IHVuZG9Db21wbGV0ZWREaW0gPSBmdW5jdGlvbiAoY2xpY2tlZCkge1xuICAvLyBDaGFuZ2UgdGFzayB0ZXh0IGNvbG9yIC8gc3RyaWtldGhydVxuICBjbGlja2VkLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImNoZWNrZWRcIik7XG5cbiAgLy8gQ2hhbmdlIHRhc2sgZGV0YWlscyBidXR0b24gY29sb3JcbiAgY2xpY2tlZC5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQuY2xhc3NMaXN0LnJlbW92ZShcbiAgICBcImJ0bl9fZGV0YWlscy0tY29tcGxldGVkXCJcbiAgKTtcblxuICAvLyBDaGFuZ2UgdGFzayBpdGVtIGZpbHRlclxuICBjbGlja2VkLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiY29tcGxldGVkLS10cnVlXCIpO1xuXG4gIC8vIENoYW5nZSBEZXRhaWxzIGR1ZSBkYXRlIGZvbnQgY29sb3JcbiAgY2xpY2tlZC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQubGFzdEVsZW1lbnRDaGlsZC5sYXN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkLmxhc3RFbGVtZW50Q2hpbGQ/LmNsYXNzTGlzdC5yZW1vdmUoXG4gICAgXCJjaGVja2VkXCJcbiAgKTtcbn07XG5cbi8vIFZpc3VhbCBmb3Igb3BlbiB0YXNrIGRldGFpbHMgYnV0dG9uXG5jb25zdCB0b2dnbGVUYXNrRGV0YWlsc0J0biA9IGZ1bmN0aW9uIChjbGlja2VkKSB7XG4gIGNsaWNrZWQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYnRuX19kZXRhaWxzLS1vcGVuXCIpXG4gICAgPyBjbGlja2VkLmNsYXNzTGlzdC5yZW1vdmUoXCJidG5fX2RldGFpbHMtLW9wZW5cIilcbiAgICA6IGNsaWNrZWQuY2xhc3NMaXN0LmFkZChcImJ0bl9fZGV0YWlscy0tb3BlblwiKTtcbn07XG5cbmNvbnN0IHRvZ2dsZUluYWN0aXZlRGV0YWlsc0J0bnMgPSBmdW5jdGlvbiAoZSkge1xuICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5idG5fX2RldGFpbHNcIik7XG4gIGZvciAobGV0IGJ1dHRvbiBvZiBidXR0b25zKSB7XG4gICAgLy8gQ2xvc2UgYW55IHRhc2sgZGV0YWlscyBvcGVuIHRvIHN0b3AgbXVsdGlwbGUgYXQgb25jZVxuICAgIGlmIChidXR0b24gIT09IGUudGFyZ2V0KSB7XG4gICAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImJ0bl9fZGV0YWlscy0tb3BlblwiKTtcblxuICAgICAgaWYgKFxuICAgICAgICBidXR0b24ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoID09PSAyXG4gICAgICApXG4gICAgICAgIGhpZGVUYXNrRGV0YWlscyhidXR0b24ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgZXhwYW5kU2VsZWN0ZWREZXRhaWxzID0gZnVuY3Rpb24gKFxuICBjbGlja2VkLFxuICBwcmlvcml0eSxcbiAgZGVzYyxcbiAgY29tcGxldGVkLFxuICBkYXRlRHVlXG4pIHtcbiAgaWYgKGNsaWNrZWQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYnRuX19kZXRhaWxzLS1vcGVuXCIpKVxuICAgIGV4cGFuZFRhc2tpdGVtKFxuICAgICAgY2xpY2tlZC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCxcbiAgICAgIHByaW9yaXR5LFxuICAgICAgZGVzYyxcbiAgICAgIGNvbXBsZXRlZCxcbiAgICAgIGRhdGVEdWVcbiAgICApO1xufTtcblxuY29uc3QgaGlkZU5vblNlbGVjdGVkRGV0YWlscyA9IGZ1bmN0aW9uIChjbGlja2VkKSB7XG4gIGlmICghY2xpY2tlZC5jbGFzc0xpc3QuY29udGFpbnMoXCJidG5fX2RldGFpbHMtLW9wZW5cIikpXG4gICAgaGlkZVRhc2tEZXRhaWxzKGNsaWNrZWQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpO1xufTtcblxuLy8gQ2hhbmdlIHByaW9yaXR5IGNoZWNrYm94IHZpc3VhbFxuY29uc3QgYWRkUHJpb3JpdHlWaXN1YWwgPSBmdW5jdGlvbiAoY2xpY2tlZCkge1xuICAvLyBDaGFuZ2UgYmFja2dyb3VuZCBjb2xvciBvZiB0YXNrXG4gIGNsaWNrZWQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXG4gICAgXCJwcmlvcml0eS0tdHJ1ZVwiXG4gICk7XG59O1xuXG5jb25zdCByZW1vdmVQcmlvcml0eVZpc3VhbCA9IGZ1bmN0aW9uIChjbGlja2VkKSB7XG4gIC8vIENoYW5nZSBiYWNrZ3JvdW5kIGNvbG9yIGJhY2tcbiAgY2xpY2tlZC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcbiAgICBcInByaW9yaXR5LS10cnVlXCJcbiAgKTtcbn07XG5cbi8vIENoYW5nZSBpbm5lciBkZXRhaWxzIG9mIGRhdGUgZHVlIC0+IGNvbXBsZXRlZCBhbmQgYmFja1xuY29uc3QgdG9nZ2xlVGFza0NvbXBsZXRlZER1ZURhdGUgPSBmdW5jdGlvbiAoY2xpY2tlZCwgYWN0aXZlTGlzdCwgaXRlbUluZGV4KSB7XG4gIGlmIChjbGlja2VkLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlbi5sZW5ndGggPT09IDIpIHtcbiAgICBjbGlja2VkLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkLmxhc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQubGFzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5pbm5lckhUTUwgPSBgJHtcbiAgICAgIGFjdGl2ZUxpc3QuaXRlbXNbaXRlbUluZGV4XS5jb21wbGV0ZWQgPT09IHRydWUgPyBcIkNvbXBsZXRlZFwiIDogXCJEdWVcIlxuICAgIH1gO1xuXG4gICAgY2xpY2tlZC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQubGFzdEVsZW1lbnRDaGlsZC5sYXN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkLmxhc3RFbGVtZW50Q2hpbGQubGFzdEVsZW1lbnRDaGlsZC5pbm5lckhUTUwgPSBgJHtcbiAgICAgIGFjdGl2ZUxpc3QuaXRlbXNbaXRlbUluZGV4XS5jb21wbGV0ZWQgPT09IGZhbHNlXG4gICAgICAgID8gYWN0aXZlTGlzdC5pdGVtc1tpdGVtSW5kZXhdLmRhdGVEdWUuc2xpY2UoNSlcbiAgICAgICAgOiBgJHtTdHJpbmcobmV3IERhdGUoKS5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgXCIwXCIpfS0ke1N0cmluZyhcbiAgICAgICAgICAgIG5ldyBEYXRlKCkuZ2V0RGF0ZSgpXG4gICAgICAgICAgKS5wYWRTdGFydCgyLCBcIjBcIil9YFxuICAgIH1gO1xuICB9XG59O1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIFNJREVCQVIgQlVUVE9OU1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vIFNpZGViYXIgbGlzdHMgb3B0aW9uc1xuY29uc3QgdG9nZ2xlU2lkZWJhckxpc3RPcHRpb25zID0gZnVuY3Rpb24gKGNsaWNrZWQpIHtcbiAgdG9nZ2xlSGlkZUVsKGNsaWNrZWQucGFyZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkKTtcbn07XG5cbmNvbnN0IGhpZGVTaWRlYmFyTGlzdE9wdGlvbnMgPSBmdW5jdGlvbiAoY2xpY2tlZCkge1xuICB0b2dnbGVIaWRlRWwoY2xpY2tlZC5wYXJlbnRFbGVtZW50KTtcbn07XG5cbmNvbnN0IHRvZ2dsZVNpZGViYXJOZXdMaXN0VGl0bGUgPSBmdW5jdGlvbiAoZWwpIHtcbiAgZWwuY2xhc3NMaXN0LnRvZ2dsZShcImFkZF9fbGlzdC10aXRsZS0tdmlzaWJsZVwiKTtcbn07XG5cbmNvbnN0IHRvZ2dsZUJ1dHRvblNwaW4gPSBmdW5jdGlvbiAoZWwpIHtcbiAgZWwuY2xhc3NMaXN0LnRvZ2dsZShcInNwaW4tNDVkZWdcIik7XG59O1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIEFjdGl2ZSBUYXNrIExpc3Rcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5jb25zdCB1cGRhdGVBY3RpdmVMaXN0VGl0bGUgPSBmdW5jdGlvbiAobGlzdE5hbWVFbCwgbGlzdE5hbWUpIHtcbiAgbGlzdE5hbWVFbC50ZXh0Q29udGVudCA9IGxpc3ROYW1lO1xufTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBIVE1MIEluc2VydHNcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5jb25zdCBleHBhbmRUYXNraXRlbSA9IGZ1bmN0aW9uIChlbCwgcHJpb3JpdHksIGRlc2MsIGNvbXBsZXRlZCwgZGF0ZUR1ZSkge1xuICBjb25zdCBodG1sVGFza0RldGFpbHMgPSBgXG4gICAgPGRpdiBjbGFzcz1cInRhc2tpdGVtLS1leHBhbmRlZFwiPlxuICAgICAgPGhyIGNsYXNzPVwidGFza2l0ZW1fX2RpdmlkZXJcIiAvPlxuXG4gICAgICA8ZGl2IGNsYXNzPVwidGFza2l0ZW1fX2RldGFpbHNfX2NvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFza2l0ZW1fX2RldGFpbHNfX3R4dC1jb250YWluZXJcIj5cbiAgICAgICAgICA8cD4ke2Rlc2N9PC9wPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YXNraXRlbV9fZHVlLWRhdGVfX2NvbnRhaW5lciAke1xuICAgICAgICAgICAgY29tcGxldGVkID09PSB0cnVlID8gXCJjaGVja2VkXCIgOiBcIlwiXG4gICAgICAgICAgfVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhc2tpdGVtX19kdWUtZGF0ZV9fdGl0bGVcIj4ke1xuICAgICAgICAgICAgICBjb21wbGV0ZWQgPT09IHRydWUgPyBcIkNvbXBsZXRlZFwiIDogXCJEdWVcIlxuICAgICAgICAgICAgfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhc2tpdGVtX19kdWUtZGF0ZV9fZGF0ZVwiPiR7XG4gICAgICAgICAgICAgIGNvbXBsZXRlZCA9PT0gZmFsc2VcbiAgICAgICAgICAgICAgICA/IGRhdGVEdWUuc2xpY2UoNSlcbiAgICAgICAgICAgICAgICA6IGAke1N0cmluZyhuZXcgRGF0ZSgpLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydChcbiAgICAgICAgICAgICAgICAgICAgMixcbiAgICAgICAgICAgICAgICAgICAgXCIwXCJcbiAgICAgICAgICAgICAgICAgICl9LSR7U3RyaW5nKG5ldyBEYXRlKCkuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIil9YFxuICAgICAgICAgICAgfTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFza2l0ZW1fX2RldGFpbHNfX2FjdGlvbnMtY29udGFpbmVyXCI+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzPVwidGFza2l0ZW1fX3ByaW9yaXR5LWNoZWNrXCI+XG4gICAgICAgICAgICBQcmlvcml0eVxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgIG5hbWU9XCJwcmlvcml0eV9fY2hlY2tib3hcIlxuICAgICAgICAgICAgICBjbGFzcz1cInRhc2tpdGVtX19wcmlvcml0eS1jaGVja19fY2hlY2tib3hcIlxuICAgICAgICAgICAgICAke3ByaW9yaXR5ID09PSB0cnVlID8gXCJjaGVja2VkXCIgOiBcIlwifVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YXNraXRlbV9fZWRpdF9fY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIHNyYz1cIi4vaW1hZ2VzL2VkaXQuc3ZnXCJcbiAgICAgICAgICAgICAgaGVpZ2h0PVwiMjJweFwiXG4gICAgICAgICAgICAgIGFsdD1cIkVkaXQgdGFza1wiXG4gICAgICAgICAgICAgIHRpdGxlPVwiRWRpdCB0YXNrXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuX190YXNraXRlbV9fZWRpdFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YXNraXRlbV9fZGVsX19jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgc3JjPVwiLi9pbWFnZXMvdHJhc2guc3ZnXCJcbiAgICAgICAgICAgICAgaGVpZ2h0PVwiMjVweFwiXG4gICAgICAgICAgICAgIGFsdD1cIkRlbGV0ZSB0YXNrXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJEZWxldGUgdGFza1wiXG4gICAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bl9fdGFza2l0ZW1fX2RlbGV0ZVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPCEtLSBlbmQgdGFza2l0ZW1fX2RldGFpbHNfX2FjdGlvbnMtY29udGFpbmVyIC0tPlxuICAgICAgPC9kaXY+XG4gICAgICA8IS0tIGVuZCB0YXNraXRlbV9fZGV0YWlsc19fY29udGFpbmVyIC0tPlxuICAgIDwvZGl2PlxuICBgO1xuXG4gIGVsLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBodG1sVGFza0RldGFpbHMpO1xufTtcblxuY29uc3QgaGlkZVRhc2tEZXRhaWxzID0gZnVuY3Rpb24gKGVsKSB7XG4gIGVsLnJlbW92ZUNoaWxkKGVsLmxhc3RFbGVtZW50Q2hpbGQpO1xufTtcblxuY29uc3QgYWRkTGlzdCA9IGZ1bmN0aW9uIChlbCwgdGl0bGUsIG51bUR1ZSwgaWQsIGFjdGl2ZUxpc3RJRCkge1xuICBjb25zdCBodG1sTGlzdEl0ZW0gPSBgXG4gICAgPGRpdiBjbGFzcz1cInNpZGViYXJfX2xpc3RpdGVtJHtcbiAgICAgIGFjdGl2ZUxpc3RJRCA9PT0gaWQgPyBcIiBhY3RpdmUtbGlzdFwiIDogXCJcIlxuICAgIH1cIiBpZD1cIiR7aWR9XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibGlzdGl0ZW1fX29wdGlvbnNfX2NvbnRhaW5lclwiPlxuICAgICAgPGltZyBcbiAgICAgICAgc3JjPVwiLi9pbWFnZXMvbGlzdHMtbWVudS5wbmdcIlxuICAgICAgICBoZWlnaHQ9XCIyMHB4XCJcbiAgICAgICAgY2xhc3M9XCJidG4gYnRuX19saXN0aXRlbV9fb3B0aW9uc1wiXG4gICAgICAvPlxuICAgICAgPGRpdiBjbGFzcz1cImxpc3RpdGVtX19vcHRpb25zX19tZW51X19jb250YWluZXIgaGlkZGVuXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhcnJvdy11cFwiPjwvZGl2PlxuICAgICAgICA8aW1nXG4gICAgICAgICAgc3JjPVwiLi9pbWFnZXMvdHJhc2guc3ZnXCJcbiAgICAgICAgICBjbGFzcz1cImJ0biBidG5fX2xpc3RpdGVtIGJ0bl9fbGlzdGl0ZW0tLWRlbFwiXG4gICAgICAgICAgaGVpZ2h0PVwiMjhweFwiXG4gICAgICAgIC8+XG4gICAgICAgIDxpbWdcbiAgICAgICAgICBzcmM9XCIuL2ltYWdlcy9kb3duLXRyaWFuZ2xlLnBuZ1wiXG4gICAgICAgICAgY2xhc3M9XCJidG4gYnRuX19saXN0aXRlbSBidG5fX2xpc3RpdGVtLS11cFwiXG4gICAgICAgICAgaGVpZ2h0PVwiMjhweFwiXG4gICAgICAgIC8+XG4gICAgICAgIDxpbWdcbiAgICAgICAgICBzcmM9XCIuL2ltYWdlcy9kb3duLXRyaWFuZ2xlLnBuZ1wiXG4gICAgICAgICAgY2xhc3M9XCJidG4gYnRuX19saXN0aXRlbSBidG5fX2xpc3RpdGVtLS1kb3duXCJcbiAgICAgICAgICBoZWlnaHQ9XCIyOHB4XCJcbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPCEtLSBlbmQgbGlzdGl0ZW1fX29wdGlvbnNfX21lbnVfX2NvbnRhaW5lciAtLT5cbiAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdGl0ZW1fX3RpdGxlXCI+JHt0aXRsZX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxpc3RpdGVtX19kdWUtY291bnRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxpc3RpdGVtX19kdWUtY291bnRfX3RpdGxlXCI+VGFza3MgRHVlOjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdGl0ZW1fX2R1ZS1jb3VudF9fY291bnRcIj4ke251bUR1ZX08L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgO1xuXG4gIGVsLmluc2VydEFkamFjZW50SFRNTChcImFmdGVyZW5kXCIsIGh0bWxMaXN0SXRlbSk7XG59O1xuXG5jb25zdCBkYXlzTGVmdCA9IGZ1bmN0aW9uIChkYXRlKSB7XG4gIGNvbnN0IGRhdGVJU08gPSBwYXJzZUlTTyhkYXRlKTtcbiAgY29uc3QgcmVzdWx0ID0gZm9ybWF0RGlzdGFuY2VUb05vd1N0cmljdChkYXRlSVNPLCB7XG4gICAgYWRkU3VmZml4OiB0cnVlLFxuICAgIHVuaXQ6IFwiZGF5XCIsXG4gIH0pO1xuXG4gIGxldCBvdXRwdXQ7XG5cbiAgaWYgKHJlc3VsdCA9PT0gXCIwIGRheXMgYWdvXCIgfHwgcmVzdWx0ID09PSBcImluIDAgZGF5c1wiKSBvdXRwdXQgPSBcIkR1ZSB0b2RheVwiO1xuICBlbHNlIGlmIChyZXN1bHQgPT09IFwiaW4gMSBkYXlcIikgb3V0cHV0ID0gXCJEdWUgdG9tb3Jyb3dcIjtcbiAgZWxzZSBpZiAocmVzdWx0ID09PSBcIjEgZGF5IGFnb1wiKSBvdXRwdXQgPSBcIkR1ZSB5ZXN0ZXJkYXkhIEFIIVwiO1xuICBlbHNlIGlmIChyZXN1bHQuaW5jbHVkZXMoXCJkYXlzIGFnb1wiKSkgb3V0cHV0ID0gXCJPVkVSRFVFIVwiO1xuICBlbHNlIG91dHB1dCA9IGBEdWUgJHtyZXN1bHR9YDtcblxuICAvLyBpZiAocmVzdWx0ID09PSBcImluIDAgZGF5c1wiKSBvdXRwdXQgPSBcIkR1ZSB0b21vcnJvd1wiO1xuICAvLyBlbHNlIGlmIChyZXN1bHQgPT09IFwiMSBkYXkgYWdvXCIpIG91dHB1dCA9IFwiRHVlIHRvZGF5XCI7XG4gIC8vIGVsc2UgaWYgKHJlc3VsdC5pbmNsdWRlcyhcImRheXMgYWdvXCIpKSBvdXRwdXQgPSBcIk92ZXJkdWUhXCI7XG4gIC8vIGVsc2Uge1xuICAvLyAgIGNvbnN0IGZpeFN0dXBpZERhdGUgPSBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoZGF0ZUlTTywgbmV3IERhdGUoKSk7XG4gIC8vICAgb3V0cHV0ID0gYER1ZSBpbiAke2ZpeFN0dXBpZERhdGV9IGRheXNgO1xuICAvLyB9XG5cbiAgcmV0dXJuIG91dHB1dDtcbn07XG5cbmNvbnN0IGFkZFRhc2sgPSBmdW5jdGlvbiAoZWwsIHRpdGxlLCBkYXRlRHVlLCBwcmlvcml0eSwgaWQsIGNvbXBsZXRlZCkge1xuICBjb25zdCBodG1sVGFza0l0ZW0gPSBgXG4gIDxkaXYgaWQ9JHtpZH0gY2xhc3M9XCJ0YXNraXRlbSR7cHJpb3JpdHkgPT09IHRydWUgPyBcIiBwcmlvcml0eS0tdHJ1ZVwiIDogXCJcIn0ke1xuICAgIGNvbXBsZXRlZCA/IFwiIGNvbXBsZXRlZC0tdHJ1ZVwiIDogXCJcIlxuICB9XCI+XG4gICAgPGRpdiBjbGFzcz1cInRhc2tpdGVtX19hYmJyJHtjb21wbGV0ZWQgPyBcIiBjaGVja2VkXCIgOiBcIlwifVwiPlxuICAgICAgPGlucHV0XG4gICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgIG5hbWU9XCJjb21wbGV0ZWQtY2hlY2tib3hcIlxuICAgICAgICBjbGFzcz1cInRhc2tpdGVtX19jaGVja2JveFwiXG4gICAgICAgICR7Y29tcGxldGVkID8gXCJjaGVja2VkXCIgOiBcIlwifVxuICAgICAgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0YXNraXRlbV9fdHh0Ym94XCI+XG4gICAgICAgIDxoMz4ke3RpdGxlfTwvaDM+XG4gICAgICAgIDxwPiR7ZGF0ZUR1ZSA9PT0gXCJcIiA/IGAmbmJzcDtgIDogZGF5c0xlZnQoZGF0ZUR1ZSl9PC9wPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwidGFza2l0ZW1fX2J0bi1kZXRhaWxzX19jb250YWluZXJcIj5cbiAgICAgICAgPGltZ1xuICAgICAgICAgIHNyYz1cIi4vaW1hZ2VzL2Rvd24tdHJpYW5nbGUucG5nXCJcbiAgICAgICAgICBhbHQ9XCJPcGVuIGRldGFpbHNcIlxuICAgICAgICAgIHRpdGxlPVwiRGV0YWlsc1wiXG4gICAgICAgICAgaGVpZ2h0PVwiMjBweFwiXG4gICAgICAgICAgY2xhc3M9XCJidG4gYnRuX19kZXRhaWxzJHtjb21wbGV0ZWQgPyBcIiBidG5fX2RldGFpbHMtLWNvbXBsZXRlZFwiIDogXCJcIn1cIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuYDtcblxuICBlbC5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlcmVuZFwiLCBodG1sVGFza0l0ZW0pO1xufTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBFWFBPUlRTXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuZXhwb3J0IHtcbiAgY2xlYXJGb3JtLFxuICB0b2dnbGVTaWRlYmFyLFxuICBkaW1Db21wbGV0ZWRUYXNrcyxcbiAgdW5kb0NvbXBsZXRlZERpbSxcbiAgdG9nZ2xlVGFza0RldGFpbHNCdG4sXG4gIHRvZ2dsZUluYWN0aXZlRGV0YWlsc0J0bnMsXG4gIGV4cGFuZFNlbGVjdGVkRGV0YWlscyxcbiAgaGlkZU5vblNlbGVjdGVkRGV0YWlscyxcbiAgYWRkUHJpb3JpdHlWaXN1YWwsXG4gIHJlbW92ZVByaW9yaXR5VmlzdWFsLFxuICB0b2dnbGVTaWRlYmFyTGlzdE9wdGlvbnMsXG4gIGhpZGVTaWRlYmFyTGlzdE9wdGlvbnMsXG4gIGFkZExpc3QsXG4gIHVwZGF0ZUFjdGl2ZUxpc3RUaXRsZSxcbiAgdG9nZ2xlU2lkZWJhck5ld0xpc3RUaXRsZSxcbiAgcmVtb3ZlRXJyb3JPdXRsaW5lLFxuICBhZGRFcnJvck91dGxpbmUsXG4gIHRvZ2dsZUhpZGVFbCxcbiAgdG9nZ2xlQnV0dG9uU3BpbixcbiAgYWRkVGFzayxcbiAgdG9nZ2xlVGFza0NvbXBsZXRlZER1ZURhdGUsXG4gIGRheXNMZWZ0LFxuICBoaWRlVGFza0RldGFpbHMsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gXG4gVEFCTEUgT0YgQ09OVEVOVFNcblxuICogTW9kdWxlc1xuICogRE9NIFZhcmlhYmxlc1xuICogRFJZIEZ1bmN0aW9uc1xuICogSGVhZGVyIEJ1dHRvbnNcbiAqIFRhc2sgQnV0dG9uc1xuICogU2lkZWJhciBCdXR0b25zXG4gKiBGb3JtIEJ1dHRvbnNcbiAqIEFwcCBMb2dpY1xuXG4qKi9cblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBNT0RVTEVTXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuaW1wb3J0IHsgTWFzdGVyTGlzdCB9IGZyb20gXCIuL3RvZG8tbG9naWMuanNcIjtcbmltcG9ydCB7XG4gIGFkZFByaW9yaXR5VmlzdWFsLFxuICBkaW1Db21wbGV0ZWRUYXNrcyxcbiAgZXhwYW5kU2VsZWN0ZWREZXRhaWxzLFxuICBoaWRlTm9uU2VsZWN0ZWREZXRhaWxzLFxuICByZW1vdmVQcmlvcml0eVZpc3VhbCxcbiAgdG9nZ2xlSW5hY3RpdmVEZXRhaWxzQnRucyxcbiAgdG9nZ2xlU2lkZWJhcixcbiAgdG9nZ2xlU2lkZWJhckxpc3RPcHRpb25zLFxuICB0b2dnbGVUYXNrRGV0YWlsc0J0bixcbiAgdW5kb0NvbXBsZXRlZERpbSxcbiAgY2xlYXJGb3JtLFxuICBoaWRlU2lkZWJhckxpc3RPcHRpb25zLFxuICBhZGRMaXN0LFxuICB1cGRhdGVBY3RpdmVMaXN0VGl0bGUsXG4gIHRvZ2dsZVNpZGViYXJOZXdMaXN0VGl0bGUsXG4gIHJlbW92ZUVycm9yT3V0bGluZSxcbiAgYWRkRXJyb3JPdXRsaW5lLFxuICB0b2dnbGVIaWRlRWwsXG4gIHRvZ2dsZUJ1dHRvblNwaW4sXG4gIGFkZFRhc2ssXG4gIHRvZ2dsZVRhc2tDb21wbGV0ZWREdWVEYXRlLFxuICBoaWRlVGFza0RldGFpbHMsXG59IGZyb20gXCIuL3Zpc3VhbC5qc1wiO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIERPTSBWQVJJQUJMRVNcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyBCVVRUT05TXG4vLyAtLS0tIEhlYWRlclxuY29uc3QgYnRuTGlzdHNNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saXN0cy1tZW51XCIpO1xuY29uc3QgbGlzdHNNZW51RW5kQmFycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYmFyX19lbmRcIik7XG5jb25zdCBsaXN0c01lbnVNaWRCYXIxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5iYXJfX21pZFwiKTtcbmNvbnN0IGxpc3RzTWVudU1pZEJhcjIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJhcl9fbWlkMlwiKTtcbmNvbnN0IGJ0bkFkZFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrXCIpO1xuXG4vLyAtLS0tIFRhc2tzXG5cbi8vIC0tLS0gU2lkZWJhclxuY29uc3QgYnRuQWRkTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuX19zaWRlYmFyX19hZGQtbGlzdFwiKTtcbmNvbnN0IGJ0bkFkZExpc3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLWxpc3RfX3RpdGxlXCIpO1xuXG4vLyAtLS0tIEZvcm1cbmNvbnN0IGJ0bkZvcm1DbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuX19mb3JtLWNsb3NlXCIpO1xuY29uc3QgYnRuRm9ybVN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuX19mb3JtLXN1Ym1pdFwiKTtcblxuLy8gU0lERUJBUlxuY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhclwiKTtcbmNvbnN0IHNpZGViYXJIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXJfX2hlYWRlclwiKTtcbmNvbnN0IHNpZGViYXJBZGRMaXN0VGl0bGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICBcIi5zaWRlYmFyX19hZGQtbGlzdF9fYWRkLXRpdGxlX19jb250YWluZXJcIlxuKTtcbmNvbnN0IHNpZGViYXJBZGRMaXN0VGl0bGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gIFwiLnNpZGViYXJfX2FkZC1saXN0X19hZGQtdGl0bGVcIlxuKTtcblxuLy8gSEVBREVSXG5jb25zdCBzb3J0T3B0c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc29ydGJ5X19vcHRzX19jb250YWluZXJcIik7XG5cbi8vIEZPUk1cbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm1cIik7XG5jb25zdCBmb3JtVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm1fX3RpdGxlXCIpO1xuY29uc3QgZm9ybVRhc2tUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybV9fdGV4dC0tdGl0bGVcIik7XG5jb25zdCBmb3JtRHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtX19kYXRlXCIpO1xuY29uc3QgZm9ybURlc2MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm1fX3RleHQtYXJlYVwiKTtcbmNvbnN0IGZvcm1Qcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybV9fcHJpb3JpdHlfX2NoZWNrYm94XCIpO1xuY29uc3QgZm9ybVByaW9yaXR5Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgXCIuZm9ybV9fcHJpb3JpdHlfX2NvbnRhaW5lclwiXG4pO1xuXG4vLyBNQUlOIEFQUFxuY29uc3QgbG9nbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9nb19fY29udGFpbmVyXCIpO1xuY29uc3QgYWN0aXZlTGlzdFdpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1hcHBcIik7XG5jb25zdCBhY3RpdmVMaXN0SGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hY3RpdmUtbGlzdF9faGVhZGVyXCIpO1xuY29uc3QgYWN0aXZlTGlzdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hY3RpdmUtbGlzdF9fdGl0bGVcIik7XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogRFJZIEZVTkNUSU9OU1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbmNvbnN0IGZpbmRJdGVtSW5kZXggPSBmdW5jdGlvbiAoY2xpY2tlZCkge1xuICBjb25zdCB0YXNrSUQgPSArY2xpY2tlZC5jbG9zZXN0KFwiLnRhc2tpdGVtXCIpLmlkO1xuICByZXR1cm4gYWN0aXZlTGlzdC5pdGVtcy5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IHRhc2tJRCk7XG59O1xuXG5jb25zdCBmaW5kTGlzdEluZGV4ID0gZnVuY3Rpb24gKGNsaWNrZWRCdG4pIHtcbiAgcmV0dXJuIG1hc3Rlckxpc3QuaXRlbXMuZmluZEluZGV4KFxuICAgIChsaXN0KSA9PiBsaXN0LmlkID09PSArY2xpY2tlZEJ0bi5jbG9zZXN0KFwiLnNpZGViYXJfX2xpc3RpdGVtXCIpLmlkXG4gICk7XG59O1xuXG5jb25zdCBjbG9zZUFsbE9wZW5Nb2RhbHMgPSBmdW5jdGlvbiAoZSkge1xuICBpZiAoXG4gICAgZS50YXJnZXQgIT09IGJ0bkxpc3RzTWVudSAmJlxuICAgICFlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJsaXN0cy1tZW51X19iYXJcIilcbiAgKSB7XG4gICAgc2lkZWJhci5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgIGxpc3RzTWVudUVuZEJhcnMuZm9yRWFjaCgoYmFyKSA9PiBiYXIuY2xhc3NMaXN0LnJlbW92ZShcImJhci0tdmFuaXNoXCIpKTtcbiAgICBsaXN0c01lbnVNaWRCYXIxLmNsYXNzTGlzdC5yZW1vdmUoXCJiYXJfX21pZC0tcm90YXRlXCIpO1xuICAgIGxpc3RzTWVudU1pZEJhcjIuY2xhc3NMaXN0LnJlbW92ZShcImJhcl9fbWlkMi0tcm90YXRlXCIpO1xuICB9XG5cbiAgaWYgKCFlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJpbWdfX2FkZC10YXNrXCIpKVxuICAgIGZvcm0uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcblxuICBpZiAoIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImJ0bl9fc2hvd19fc29ydC1vcHRzXCIpKVxuICAgIHNvcnRPcHRzQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93LXNvcnQtb3B0c1wiKTtcbn07XG5cbmNvbnN0IHVwZGF0ZUFjdGl2ZUxpc3RVSSA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gQ2xlYXIgdmlzaWJsZSBsaXN0IHRvIGFsbG93IGZvciB1cGRhdGVcbiAgd2hpbGUgKGFjdGl2ZUxpc3RXaW5kb3cuY2hpbGRyZW4ubGVuZ3RoID4gMSkge1xuICAgIGFjdGl2ZUxpc3RXaW5kb3cucmVtb3ZlQ2hpbGQoYWN0aXZlTGlzdFdpbmRvdy5sYXN0Q2hpbGQpO1xuICB9XG5cbiAgLy8gU2hhbGxvdyBjb3B5IHRvIHJldmVyc2Ugc28gaXRlbXMgcmVtYWluIGluIGNvcnJlY3Qgb3JkZXIgdmlzdWFsbHlcbiAgY29uc3QgY29weUxpc3QgPSBhY3RpdmVMaXN0Lml0ZW1zLnNsaWNlKCk7XG4gIGNvcHlMaXN0LnJldmVyc2UoKTtcblxuICBjb3B5TGlzdC5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgYWRkVGFzayhcbiAgICAgIGFjdGl2ZUxpc3RIZWFkZXIsXG4gICAgICB0YXNrLnRpdGxlLFxuICAgICAgdGFzay5kYXRlRHVlLFxuICAgICAgdGFzay5wcmlvcml0eSxcbiAgICAgIHRhc2suaWQsXG4gICAgICB0YXNrLmNvbXBsZXRlZFxuICAgICk7XG4gIH0pO1xufTtcblxuY29uc3QgdXBkYXRlU2lkZWJhclVJID0gZnVuY3Rpb24gKCkge1xuICAvLyBDbGVhciB2aXNpYmxlIGxpc3QgdG8gYWxsb3cgZm9yIHVwZGF0ZVxuICB3aGlsZSAoc2lkZWJhci5jaGlsZHJlbi5sZW5ndGggPiAxKSB7XG4gICAgc2lkZWJhci5yZW1vdmVDaGlsZChzaWRlYmFyLmxhc3RDaGlsZCk7XG4gIH1cblxuICBjb25zdCBjb3B5TGlzdCA9IG1hc3Rlckxpc3QuaXRlbXMuc2xpY2UoKTtcbiAgY29weUxpc3QucmV2ZXJzZSgpO1xuXG4gIGNvcHlMaXN0LmZvckVhY2goKGxpc3QpID0+IHtcbiAgICBjb25zdCBpbmNvbXBsZXRlSXRlbXMgPSBsaXN0Lml0ZW1zLmZpbHRlcihcbiAgICAgIChpdGVtKSA9PiBpdGVtLmNvbXBsZXRlZCA9PT0gZmFsc2VcbiAgICApO1xuXG4gICAgYWRkTGlzdChcbiAgICAgIHNpZGViYXJIZWFkZXIsXG4gICAgICBsaXN0LnRpdGxlLFxuICAgICAgaW5jb21wbGV0ZUl0ZW1zLmxlbmd0aCxcbiAgICAgIGxpc3QuaWQsXG4gICAgICBhY3RpdmVMaXN0LmlkXG4gICAgKTtcbiAgfSk7XG59O1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIEhFQURFUlxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiAtLS0tLS0tLS0tIEJVVFRPTlMgLS0tLS0tLS0tLVxuLy8qIFNJREVCQVIgVE9HR0xFXG5idG5MaXN0c01lbnUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIHRvZ2dsZVNpZGViYXIoc2lkZWJhciwgbGlzdHNNZW51RW5kQmFycywgbGlzdHNNZW51TWlkQmFyMSwgbGlzdHNNZW51TWlkQmFyMik7XG5cbiAgY2xvc2VBbGxPcGVuTW9kYWxzKGUpO1xuXG4gIC8vIFVwZGF0ZSBzaWRlYmFyIFVJIGlmIG9wZW5pbmcgc2lkZWJhclxuICBpZiAoYnRuTGlzdHNNZW51LmZpcnN0RWxlbWVudENoaWxkLmNsYXNzTGlzdC5jb250YWlucyhcImJhci0tdmFuaXNoXCIpKSB7XG4gICAgdXBkYXRlU2lkZWJhclVJKCk7XG4gIH1cbn0pO1xuXG4vLyogQUREIFRBU0sgT1BFTlxuYnRuQWRkVGFzay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgZm9ybVRpdGxlLnRleHRDb250ZW50ID0gXCJBZGQgVGFza1wiO1xuICBidG5Gb3JtU3VibWl0LnZhbHVlID0gXCJBZGQgVGFza1wiO1xuICBmb3JtUHJpb3JpdHlDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImludmlzaWJsZVwiKTtcbiAgZm9ybS5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLXRhc2tpZFwiKTtcbiAgY2xvc2VBbGxPcGVuTW9kYWxzKGUpO1xuICB0b2dnbGVIaWRlRWwoZm9ybSk7XG4gIGZvcm1UYXNrVGl0bGUuZm9jdXMoKTtcbn0pO1xuXG4vLyogQUNUSVZFTElTVCBIRUFERVIgQlVUVE9OU1xuYWN0aXZlTGlzdEhlYWRlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgY29uc3Qgb3BlblNvcnRPcHRzID0gZS50YXJnZXQuY2xvc2VzdChcIi5idG5fX3Nob3dfX3NvcnQtb3B0c1wiKTtcbiAgY29uc3Qgc29ydERpckZsaXAgPSBlLnRhcmdldC5jbG9zZXN0KFwiLmJ0bl9fYWN0aXZlLWxpc3RfX3NvcnQtZGlyXCIpO1xuICBjb25zdCBjbGVhckNvbXBsZXRlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIuYnRuX19jbGVhci1jb21wbFwiKTtcblxuICBpZiAoIW9wZW5Tb3J0T3B0cyAmJiAhc29ydERpckZsaXAgJiYgIWNsZWFyQ29tcGxldGVkKSByZXR1cm47XG5cbiAgLy8gT3BlbiBzb3J0aW5nIG9wdGlvbnMgbWVudVxuICBpZiAob3BlblNvcnRPcHRzKSBzb3J0T3B0c0NvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKFwic2hvdy1zb3J0LW9wdHNcIik7XG5cbiAgLy8gRmxpcCBTb3J0IERpcmVjdGlvbnNcbiAgaWYgKHNvcnREaXJGbGlwKSB7XG4gICAgYWN0aXZlTGlzdC5pdGVtcy5yZXZlcnNlKCk7XG4gICAgdXBkYXRlQWN0aXZlTGlzdFVJKCk7XG4gIH1cblxuICAvLyBDbGVhciBDb21wbGV0ZWRcbiAgaWYgKGNsZWFyQ29tcGxldGVkKSB7XG4gICAgYWN0aXZlTGlzdC5fY2xlYXJDb21wbGV0ZWRUYXNrcygpO1xuICAgIHVwZGF0ZUFjdGl2ZUxpc3RVSSgpO1xuICB9XG59KTtcblxuLy8qIFNPUlQgT1BUSU9OU1xuc29ydE9wdHNDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGNvbnN0IGNsaWNrZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiLnNvcnRieV9fb3B0c19faXRlbVwiKTtcblxuICBzb3J0T3B0c0NvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKFwic2hvdy1zb3J0LW9wdHNcIik7XG5cbiAgaWYgKCFjbGlja2VkKSByZXR1cm47XG5cbiAgYWN0aXZlTGlzdC5zb3J0SXRlbXMoY2xpY2tlZC5kYXRhc2V0LnNvcnRpZCk7XG5cbiAgdXBkYXRlQWN0aXZlTGlzdFVJKCk7XG59KTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBUQVNLXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIC0tLS0tLS0tLS0gQlVUVE9OUyAtLS0tLS0tLS0tXG4vLyogQ09NUExFVEVEIFRBU0sgQ0hFQ0tCT1hcbmFjdGl2ZUxpc3RXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGNvbnN0IGNsaWNrZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiLnRhc2tpdGVtX19jaGVja2JveFwiKTtcbiAgaWYgKCFjbGlja2VkKSByZXR1cm47XG5cbiAgY29uc3QgaXRlbUluZGV4ID0gZmluZEl0ZW1JbmRleChjbGlja2VkKTtcblxuICAvLyBEYXRhIENoYW5nZVxuICBhY3RpdmVMaXN0Lml0ZW1zW2l0ZW1JbmRleF0udG9nZ2xlQ29tcGxldGVkKCk7XG5cbiAgLy8gVmlzdWFsIENoYW5nZVxuICB0b2dnbGVUYXNrQ29tcGxldGVkRHVlRGF0ZShjbGlja2VkLCBhY3RpdmVMaXN0LCBpdGVtSW5kZXgpO1xuXG4gIGlmIChjbGlja2VkLmNoZWNrZWQpIHtcbiAgICBkaW1Db21wbGV0ZWRUYXNrcyhjbGlja2VkKTtcbiAgfVxuXG4gIC8vIFVuZG8gQ2hhbmdlIGNvbXBsZXRlZCB0YXNrIHZpc3VhbFxuICBpZiAoIWNsaWNrZWQuY2hlY2tlZCkgdW5kb0NvbXBsZXRlZERpbShjbGlja2VkKTtcbn0pO1xuXG4vLyogT1BFTiBUQVNLIERFVEFJTFNcbmFjdGl2ZUxpc3RXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGNvbnN0IGNsaWNrZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiLmJ0bl9fZGV0YWlsc1wiKTtcblxuICBpZiAoIWNsaWNrZWQpIHJldHVybjtcblxuICBjb25zdCB0YXNrSUQgPSArY2xpY2tlZC5jbG9zZXN0KFwiLnRhc2tpdGVtXCIpLmlkO1xuICBjb25zdCB0YXNrSW5BcnIgPSBhY3RpdmVMaXN0Lml0ZW1zLmZpbHRlcigodGFzaykgPT4gdGFzay5pZCA9PT0gdGFza0lEKTtcblxuICAvLyBUb2dnbGUgdGFzayBkZXRhaWxzIG9wZW4gb24gY2xpY2tcbiAgdG9nZ2xlVGFza0RldGFpbHNCdG4oY2xpY2tlZCk7XG4gIHRvZ2dsZUluYWN0aXZlRGV0YWlsc0J0bnMoZSk7XG4gIGV4cGFuZFNlbGVjdGVkRGV0YWlscyhcbiAgICBjbGlja2VkLFxuICAgIHRhc2tJbkFyclswXS5wcmlvcml0eSxcbiAgICB0YXNrSW5BcnJbMF0uZGVzYyxcbiAgICB0YXNrSW5BcnJbMF0uY29tcGxldGVkLFxuICAgIHRhc2tJbkFyclswXS5kYXRlRHVlXG4gICk7XG4gIGhpZGVOb25TZWxlY3RlZERldGFpbHMoY2xpY2tlZCk7XG59KTtcblxuLy8qIENIQU5HRSBQUklPUklUWSBDSEVDS0JPWFxuYWN0aXZlTGlzdFdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgY29uc3QgY2xpY2tlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIudGFza2l0ZW1fX3ByaW9yaXR5LWNoZWNrX19jaGVja2JveFwiKTtcbiAgaWYgKCFjbGlja2VkKSByZXR1cm47XG5cbiAgY29uc3QgaXRlbUluZGV4ID0gZmluZEl0ZW1JbmRleChjbGlja2VkKTtcblxuICAvLyBEYXRhIENoYW5nZVxuICBhY3RpdmVMaXN0Lml0ZW1zW2l0ZW1JbmRleF0udG9nZ2xlUHJpb3JpdHkoKTtcblxuICAvLyBWaXN1YWwgQ2hhbmdlXG4gIGlmIChjbGlja2VkLmNoZWNrZWQpIGFkZFByaW9yaXR5VmlzdWFsKGNsaWNrZWQpO1xuXG4gIGlmICghY2xpY2tlZC5jaGVja2VkKSByZW1vdmVQcmlvcml0eVZpc3VhbChjbGlja2VkKTtcbn0pO1xuXG4vLyogRURJVCBUQVNLXG5hY3RpdmVMaXN0V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBjb25zdCBjbGlja2VkID0gZS50YXJnZXQuY2xvc2VzdChcIi5idG5fX3Rhc2tpdGVtX19lZGl0XCIpO1xuICBpZiAoIWNsaWNrZWQpIHJldHVybjtcblxuICBjb25zdCBpdGVtSW5kZXggPSBmaW5kSXRlbUluZGV4KGNsaWNrZWQpO1xuXG4gIGZvcm1UaXRsZS50ZXh0Q29udGVudCA9IFwiRWRpdCBUYXNrXCI7XG4gIGJ0bkZvcm1TdWJtaXQudmFsdWUgPSBcIkVkaXQgVGFza1wiO1xuICBmb3JtUHJpb3JpdHlDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImludmlzaWJsZVwiKTtcblxuICAvLyBQb3B1bGF0ZSBmb3JtIHdpdGggYXJyIGluZm9cbiAgZm9ybVRhc2tUaXRsZS52YWx1ZSA9IGFjdGl2ZUxpc3QuaXRlbXNbaXRlbUluZGV4XS50aXRsZTtcbiAgZm9ybUR1ZS52YWx1ZSA9IGFjdGl2ZUxpc3QuaXRlbXNbaXRlbUluZGV4XS5kYXRlRHVlO1xuICBmb3JtRGVzYy52YWx1ZSA9IGFjdGl2ZUxpc3QuaXRlbXNbaXRlbUluZGV4XS5kZXNjO1xuXG4gIC8vIEFkZCBkYXRhIGF0dHJpYnV0ZSB0byB0cmFjayBhcnIgaXRlbSBwbGFjZW1lbnRcbiAgZm9ybS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2tpZFwiLCBhY3RpdmVMaXN0Lml0ZW1zW2l0ZW1JbmRleF0uaWQpO1xuXG4gIHRvZ2dsZUhpZGVFbChmb3JtKTtcbn0pO1xuXG4vLyogREVMRVRFIFRBU0tcbmFjdGl2ZUxpc3RXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGNvbnN0IGNsaWNrZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiLmJ0bl9fdGFza2l0ZW1fX2RlbGV0ZVwiKTtcbiAgaWYgKCFjbGlja2VkKSByZXR1cm47XG5cbiAgY29uc3QgaXRlbUluZGV4ID0gZmluZEl0ZW1JbmRleChjbGlja2VkKTtcblxuICBhY3RpdmVMaXN0Lml0ZW1zLnNwbGljZShpdGVtSW5kZXgsIDEpO1xuXG4gIHVwZGF0ZUFjdGl2ZUxpc3RVSSgpO1xufSk7XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogU0lERUJBUlxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vIFJlbW92ZSBlcnJvciBvdXRsaW5lIHdoZW4gaW5wdXQgc2VsZWN0ZWRcbnNpZGViYXJBZGRMaXN0VGl0bGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgKCkgPT4ge1xuICBzaWRlYmFyQWRkTGlzdFRpdGxlSW5wdXQuY2xhc3NMaXN0LnJlbW92ZShcInJlZC1vdXRsaW5lXCIpO1xufSk7XG5cbi8vIEFjdGl2ZSBMaXN0IFNlbGVjdGlvblxuc2lkZWJhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgY29uc3QgY2xpY2tlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIubGlzdGl0ZW1fX3RpdGxlXCIpO1xuICBpZiAoIWNsaWNrZWQpIHJldHVybjtcblxuICBjb25zdCBsaXN0cyA9IHNpZGViYXIucXVlcnlTZWxlY3RvckFsbChcIi5zaWRlYmFyX19saXN0aXRlbVwiKTtcbiAgbGlzdHMuZm9yRWFjaCgobGlzdCkgPT4ge1xuICAgIGxpc3QuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZS1saXN0XCIpO1xuICB9KTtcblxuICBjb25zdCBzZWxlY3RlZExpc3RJbmRleCA9IG1hc3Rlckxpc3QuaXRlbXMuZmluZEluZGV4KFxuICAgIChpdGVtKSA9PiBpdGVtLmlkID09PSArY2xpY2tlZC5wYXJlbnRFbGVtZW50LmlkXG4gICk7XG4gIGFjdGl2ZUxpc3QgPSBtYXN0ZXJMaXN0Lml0ZW1zW3NlbGVjdGVkTGlzdEluZGV4XTtcblxuICB1cGRhdGVBY3RpdmVMaXN0VGl0bGUoYWN0aXZlTGlzdFRpdGxlLCBhY3RpdmVMaXN0LnRpdGxlKTtcbiAgdXBkYXRlQWN0aXZlTGlzdFVJKCk7XG5cbiAgY2xpY2tlZC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmUtbGlzdFwiKTtcbn0pO1xuXG4vLyogLS0tLS0tLS0tLSBCVVRUT05TIC0tLS0tLS0tLS1cbi8vKiBTSURFQkFSIE9QRU4gQUREIExJU1QgSU5QVVRcbmJ0bkFkZExpc3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIHRvZ2dsZVNpZGViYXJOZXdMaXN0VGl0bGUoc2lkZWJhckFkZExpc3RUaXRsZUNvbnRhaW5lcik7XG4gIHRvZ2dsZUJ1dHRvblNwaW4oYnRuQWRkTGlzdCk7XG4gIHNpZGViYXJBZGRMaXN0VGl0bGVJbnB1dC52YWx1ZSA9IFwiXCI7XG4gIHNpZGViYXJBZGRMaXN0VGl0bGVJbnB1dC5mb2N1cygpO1xufSk7XG5cbi8vKiBBREQgTkVXIExJU1RcbmJ0bkFkZExpc3RUaXRsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBpZiAoc2lkZWJhckFkZExpc3RUaXRsZUlucHV0LnZhbHVlID09PSBcIlwiKSB7XG4gICAgc2lkZWJhckFkZExpc3RUaXRsZUlucHV0LmNsYXNzTGlzdC5hZGQoXCJyZWQtb3V0bGluZVwiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBDaGFuZ2UgRGF0YVxuICBtYXN0ZXJMaXN0LmFkZEl0ZW0oc2lkZWJhckFkZExpc3RUaXRsZUlucHV0LnZhbHVlKTtcblxuICAvLyBDaGFuZ2UgVmlzdWFsXG4gIGFkZExpc3QoXG4gICAgc2lkZWJhckhlYWRlcixcbiAgICBtYXN0ZXJMaXN0Lml0ZW1zWzBdLnRpdGxlLFxuICAgIG1hc3Rlckxpc3QuaXRlbXNbMF0uaXRlbXMubGVuZ3RoLFxuICAgIG1hc3Rlckxpc3QuaXRlbXNbMF0uaWRcbiAgKTtcblxuICAvLyBSZW1vdmUgYWN0aXZlIGxpc3Qgb24gcHJldmlvdXNcbiAgY29uc3QgbGlzdHMgPSBzaWRlYmFyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2lkZWJhcl9fbGlzdGl0ZW1cIik7XG4gIGxpc3RzLmZvckVhY2goKGxpc3QpID0+IHtcbiAgICBsaXN0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmUtbGlzdFwiKTtcbiAgfSk7XG5cbiAgLy8gQ2hhbmdlIGFjdGl2ZSBsaXN0IHRvIG5ldyBsaXN0XG4gIGFjdGl2ZUxpc3QgPSBtYXN0ZXJMaXN0Lml0ZW1zWzBdO1xuXG4gIC8vIENsZWFyIHRpdGxlIGlucHV0IGFuZCBoaWRlXG4gIHNpZGViYXJBZGRMaXN0VGl0bGVJbnB1dC52YWx1ZSA9IFwiXCI7XG4gIHRvZ2dsZVNpZGViYXJOZXdMaXN0VGl0bGUoc2lkZWJhckFkZExpc3RUaXRsZUNvbnRhaW5lcik7XG4gIHRvZ2dsZUJ1dHRvblNwaW4oYnRuQWRkTGlzdCk7XG5cbiAgdXBkYXRlU2lkZWJhclVJKCk7XG4gIHVwZGF0ZUFjdGl2ZUxpc3RVSSgpO1xuICB1cGRhdGVBY3RpdmVMaXN0VGl0bGUoYWN0aXZlTGlzdFRpdGxlLCBhY3RpdmVMaXN0LnRpdGxlKTtcbn0pO1xuXG4vLyogU0lERUJBUiBMSVNUIE9QVElPTlNcbi8vIE9wZW4gTGlzdCBvcHRpb25zXG5zaWRlYmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBjb25zdCBjbGlja2VkID0gZS50YXJnZXQuY2xvc2VzdChcIi5idG5fX2xpc3RpdGVtX19vcHRpb25zXCIpO1xuICBpZiAoIWNsaWNrZWQpIHJldHVybjtcblxuICBjb25zb2xlLmxvZyhjbGlja2VkKTtcbiAgY29uc29sZS5sb2coY2xpY2tlZC5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQpO1xuXG4gIGlmICghY2xpY2tlZC5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGlkZGVuXCIpKSB7XG4gICAgdG9nZ2xlU2lkZWJhckxpc3RPcHRpb25zKGNsaWNrZWQpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGxpc3RPcHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICBcIi5saXN0aXRlbV9fb3B0aW9uc19fbWVudV9fY29udGFpbmVyXCJcbiAgKTtcblxuICBsaXN0T3B0cy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0T3B0KSB7XG4gICAgbGlzdE9wdC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICB9KTtcblxuICB0b2dnbGVTaWRlYmFyTGlzdE9wdGlvbnMoY2xpY2tlZCk7XG59KTtcblxuLy8gTGlzdCBPcHRpb25zXG5zaWRlYmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBjb25zdCBjbGlja2VkVHJhc2ggPSBlLnRhcmdldC5jbG9zZXN0KFwiLmJ0bl9fbGlzdGl0ZW0tLWRlbFwiKTtcbiAgY29uc3QgY2xpY2tlZEFycm93VXAgPSBlLnRhcmdldC5jbG9zZXN0KFwiLmJ0bl9fbGlzdGl0ZW0tLXVwXCIpO1xuICBjb25zdCBjbGlja2VkQXJyb3dEb3duID0gZS50YXJnZXQuY2xvc2VzdChcIi5idG5fX2xpc3RpdGVtLS1kb3duXCIpO1xuXG4gIGlmICghY2xpY2tlZFRyYXNoICYmICFjbGlja2VkQXJyb3dVcCAmJiAhY2xpY2tlZEFycm93RG93bikgcmV0dXJuO1xuXG4gIC8vIENsb3NlIG1lbnUgaWYgYW55IGNsaWNrZWRcbiAgaWYgKGNsaWNrZWRUcmFzaCB8fCBjbGlja2VkQXJyb3dVcCB8fCBjbGlja2VkQXJyb3dEb3duKSB7XG4gICAgY29uc3QgY2xpY2tlZCA9IGNsaWNrZWRUcmFzaCB8fCBjbGlja2VkQXJyb3dVcCB8fCBjbGlja2VkQXJyb3dEb3duO1xuICAgIGhpZGVTaWRlYmFyTGlzdE9wdGlvbnMoY2xpY2tlZCk7XG4gIH1cblxuICAvLyBEZWxldGUgc2VsZWN0ZWQgbGlzdFxuICBpZiAoY2xpY2tlZFRyYXNoKSB7XG4gICAgY29uc3QgaXRlbUluQXJySW5kZXggPSBtYXN0ZXJMaXN0Lml0ZW1zLmZpbmRJbmRleChcbiAgICAgIChsaXN0KSA9PiBsaXN0LmlkID09PSArY2xpY2tlZFRyYXNoLmNsb3Nlc3QoXCIuc2lkZWJhcl9fbGlzdGl0ZW1cIikuaWRcbiAgICApO1xuXG4gICAgaWYgKG1hc3Rlckxpc3QuaXRlbXMubGVuZ3RoID09PSAxKSByZXR1cm47XG4gICAgaWYgKG1hc3Rlckxpc3QuaXRlbXNbaXRlbUluQXJySW5kZXhdLmlkID09PSBhY3RpdmVMaXN0LmlkKSB7XG4gICAgICBhY3RpdmVMaXN0ID0gbWFzdGVyTGlzdC5pdGVtc1sxXTtcbiAgICB9XG5cbiAgICBtYXN0ZXJMaXN0LmRlbGV0ZUl0ZW0oaXRlbUluQXJySW5kZXgpO1xuXG4gICAgdXBkYXRlU2lkZWJhclVJKCk7XG4gICAgdXBkYXRlQWN0aXZlTGlzdFVJKCk7XG4gICAgdXBkYXRlQWN0aXZlTGlzdFRpdGxlKGFjdGl2ZUxpc3RUaXRsZSwgYWN0aXZlTGlzdC50aXRsZSk7XG4gIH1cblxuICAvLyBNb3ZlIHNlbGVjdGVkIGxpc3QgdXBcbiAgaWYgKGNsaWNrZWRBcnJvd1VwKSB7XG4gICAgY29uc3QgaXRlbUluQXJySW5kZXggPSBmaW5kTGlzdEluZGV4KGNsaWNrZWRBcnJvd1VwKTtcbiAgICBtYXN0ZXJMaXN0Lm1vdmVJdGVtKGl0ZW1JbkFyckluZGV4LCAtMSk7XG4gICAgdXBkYXRlU2lkZWJhclVJKCk7XG4gIH1cblxuICAvLyBNb3ZlIHNlbGVjdGVkIGxpc3QgZG93blxuICBpZiAoY2xpY2tlZEFycm93RG93bikge1xuICAgIGNvbnN0IGl0ZW1JbkFyckluZGV4ID0gZmluZExpc3RJbmRleChjbGlja2VkQXJyb3dEb3duKTtcbiAgICBtYXN0ZXJMaXN0Lm1vdmVJdGVtKGl0ZW1JbkFyckluZGV4LCAxKTtcbiAgICB1cGRhdGVTaWRlYmFyVUkoKTtcbiAgfVxufSk7XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogRk9STVxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbmZvcm1UYXNrVGl0bGUuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsICgpID0+IHtcbiAgcmVtb3ZlRXJyb3JPdXRsaW5lKGZvcm1UYXNrVGl0bGUpO1xufSk7XG5cbi8vKiAtLS0tLS0tLS0tIEJVVFRPTlMgLS0tLS0tLS0tLVxuYnRuRm9ybUNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIHRvZ2dsZUhpZGVFbChmb3JtKTtcbiAgY2xlYXJGb3JtKGZvcm1UYXNrVGl0bGUsIGZvcm1EdWUsIGZvcm1EZXNjLCBmb3JtUHJpb3JpdHkpO1xufSk7XG5cbmJ0bkZvcm1TdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcblxuICAvLyBFcnJvciBpZiBUYXNrIHRpdGxlIG5vdCBkZXNpZ25hdGVkXG4gIGlmIChmb3JtVGFza1RpdGxlLnZhbHVlID09PSBcIlwiKSB7XG4gICAgYWRkRXJyb3JPdXRsaW5lKGZvcm1UYXNrVGl0bGUpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICghZm9ybS5oYXNBdHRyaWJ1dGUoXCJkYXRhLXRhc2tpZFwiKSkge1xuICAgIGZvcm1UYXNrVGl0bGUuYmx1cigpO1xuXG4gICAgLy8gQWRkIHRhc2sgdG8gYXJyYXlcbiAgICBhY3RpdmVMaXN0LmFkZEl0ZW0oXG4gICAgICBmb3JtVGFza1RpdGxlLnZhbHVlLFxuICAgICAgZm9ybURlc2MudmFsdWUsXG4gICAgICBmb3JtRHVlLnZhbHVlLFxuICAgICAgZm9ybVByaW9yaXR5LmNoZWNrZWRcbiAgICApO1xuXG4gICAgLy8gQWRkIHRhc2sgdG8gRE9NXG4gICAgYWRkVGFzayhcbiAgICAgIGFjdGl2ZUxpc3RIZWFkZXIsXG4gICAgICBhY3RpdmVMaXN0Lml0ZW1zWzBdLnRpdGxlLFxuICAgICAgYWN0aXZlTGlzdC5pdGVtc1swXS5kYXRlRHVlLFxuICAgICAgYWN0aXZlTGlzdC5pdGVtc1swXS5wcmlvcml0eSxcbiAgICAgIGFjdGl2ZUxpc3QuaXRlbXNbMF0uaWQsXG4gICAgICBhY3RpdmVMaXN0Lml0ZW1zWzBdLmNvbXBsZXRlZFxuICAgICk7XG4gIH1cblxuICBpZiAoZm9ybS5oYXNBdHRyaWJ1dGUoXCJkYXRhLXRhc2tpZFwiKSkge1xuICAgIGZvcm1UYXNrVGl0bGUuYmx1cigpO1xuXG4gICAgY29uc3QgY3VyVGFza0luZGV4ID0gYWN0aXZlTGlzdC5pdGVtcy5maW5kSW5kZXgoXG4gICAgICAoaXRlbSkgPT4gaXRlbS5pZCA9PT0gK2Zvcm0uZGF0YXNldC50YXNraWRcbiAgICApO1xuICAgIGFjdGl2ZUxpc3QuaXRlbXNbY3VyVGFza0luZGV4XS50aXRsZSA9IGZvcm1UYXNrVGl0bGUudmFsdWU7XG4gICAgYWN0aXZlTGlzdC5pdGVtc1tjdXJUYXNrSW5kZXhdLmRlc2MgPSBmb3JtRGVzYy52YWx1ZTtcbiAgICBhY3RpdmVMaXN0Lml0ZW1zW2N1clRhc2tJbmRleF0uZGF0ZUR1ZSA9IGZvcm1EdWUudmFsdWU7XG5cbiAgICB1cGRhdGVBY3RpdmVMaXN0VUkoKTtcbiAgfVxuXG4gIC8vIEhpZGUgYW5kIHJlc2V0IGZvcm1cbiAgdG9nZ2xlSGlkZUVsKGZvcm0pO1xuICBjbGVhckZvcm0oZm9ybVRhc2tUaXRsZSwgZm9ybUR1ZSwgZm9ybURlc2MsIGZvcm1Qcmlvcml0eSk7XG59KTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBBUFAgTE9HSUNcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyBJbml0aWFsaXplIE1hc3RlciBMaXN0XG5jb25zdCBtYXN0ZXJMaXN0ID0gbmV3IE1hc3Rlckxpc3QoKTtcblxuLy8gQWRkIERlZmF1bHQgTGlzdCB0byBNYXN0ZXIgTGlzdFxubWFzdGVyTGlzdC5hZGRJdGVtKFwiTWFpbiBMaXN0XCIpO1xuXG4vLyBBZGQgRGVmYXVsdCBsaXN0IHRvIHNpZGViYXJcbmFkZExpc3QoXG4gIHNpZGViYXJIZWFkZXIsXG4gIG1hc3Rlckxpc3QuaXRlbXNbMF0udGl0bGUsXG4gIG1hc3Rlckxpc3QuaXRlbXNbMF0uaXRlbXMubGVuZ3RoLFxuICBtYXN0ZXJMaXN0Lml0ZW1zWzBdLmlkXG4pO1xuXG4vLyBVcGRhdGUgYWN0aXZlTGlzdCB2aXN1YWxcbmxldCBhY3RpdmVMaXN0ID0gbWFzdGVyTGlzdC5pdGVtc1swXTtcbnVwZGF0ZUFjdGl2ZUxpc3RUaXRsZShhY3RpdmVMaXN0VGl0bGUsIGFjdGl2ZUxpc3QudGl0bGUpO1xuXG4vLyEgVEVTVElORyBBUkVBIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubG9nby5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBjb25zb2xlLmxvZyhhY3RpdmVMaXN0Lml0ZW1zWzBdLmRhdGVEdWUpO1xuICBjb25zb2xlLmxvZyhhY3RpdmVMaXN0Lml0ZW1zWzBdLmRhdGVEdWUpO1xufSk7XG5cbmZvcm1UaXRsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge30pO1xuXG5hY3RpdmVMaXN0SGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7fSk7XG5cbi8vIGNvbnNvbGUubG9nKERhdGUubm93KCkgLyApO1xuLyoqXG4gKlxuICpcbiAqXG4gKlxuICpcbiAqXG4gKlxuICovXG5cbi8qXG4vLyBURVNUIFNBTVBMRVNcbi8vIENyZWF0ZSBNYXN0ZXIgTGlzdFxuY29uc3QgbWFzdGVyTGlzdCA9IG5ldyBNYXN0ZXJMaXN0KCk7XG5cbi8vIEFkZCBMaXN0cyB0byBNYXN0ZXIgTGlzdFxubWFzdGVyTGlzdC5hZGRJdGVtKFwiVGVzdCBMaXN0XCIpO1xubWFzdGVyTGlzdC5hZGRJdGVtKFwiQSBUZXN0IExpc3QgMlwiKTtcbm1hc3Rlckxpc3QuYWRkSXRlbShcIlRlc3QgTGlzdCAzXCIpO1xubWFzdGVyTGlzdC5hZGRJdGVtKFwiVGVzdCBMaXN0IDRcIik7XG5cbi8vIEFkZCBUYXNrcyB0byBMaXN0IGluIE1hc3RlciBMaXN0XG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLmFkZEl0ZW0oXCJ0ZXN0MVwiLCBcImEgdGVzdDEgZGVzY1wiLCBcIjguMTBcIik7XG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLmFkZEl0ZW0oXCJ0ZXN0MlwiLCBcImIgdGVzdDIgZGVzY1wiLCBcIjguMDhcIik7XG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLmFkZEl0ZW0oXCJ0ZXN0M1wiLCBcImMgdGVzdDMgZGVzY1wiLCBcIjcuMTZcIik7XG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLmFkZEl0ZW0oXCJ0ZXN0NFwiLCBcImQgdGVzdDQgZGVzY1wiLCBcIjEyLjIyXCIpO1xubWFzdGVyTGlzdC5pdGVtc1swXS5hZGRJdGVtKFwidGVzdDVcIiwgXCJlIHRlc3Q1IGRlc2NcIiwgXCIzLjIyXCIpO1xuXG4vLyBtYXN0ZXJMaXN0Lml0ZW1zWzBdLml0ZW1zWzFdLmNvbXBsZXRlZCA9IHRydWU7XG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLml0ZW1zWzFdLmRhdGVDcmVhdGVkID0gMTAwO1xuLy8gbWFzdGVyTGlzdC5pdGVtc1swXS5pdGVtc1s0XS5jb21wbGV0ZWQgPSB0cnVlO1xuXG5jb25zb2xlLmxvZyhtYXN0ZXJMaXN0Lml0ZW1zWzBdLml0ZW1zKTtcblxubWFzdGVyTGlzdC5pdGVtc1swXS5pdGVtc1s0XS50b2dnbGVDb21wbGV0ZWQoKTtcblxubWFzdGVyTGlzdC5pdGVtc1swXS5pdGVtc1sxXS50b2dnbGVQcmlvcml0eSgpO1xuY29uc29sZS50YWJsZShtYXN0ZXJMaXN0Lml0ZW1zWzBdLml0ZW1zKTtcbiovXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=