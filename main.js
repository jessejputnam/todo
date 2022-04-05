/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

/***/ "./node_modules/date-fns/esm/differenceInCalendarDays/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/date-fns/esm/differenceInCalendarDays/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ differenceInCalendarDays)
/* harmony export */ });
/* harmony import */ var _lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_lib/getTimezoneOffsetInMilliseconds/index.js */ "./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js");
/* harmony import */ var _startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../startOfDay/index.js */ "./node_modules/date-fns/esm/startOfDay/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");



var MILLISECONDS_IN_DAY = 86400000;
/**
 * @name differenceInCalendarDays
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates. This means that the times are removed
 * from the dates and then the difference in days is calculated.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar days
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 * // How many calendar days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInCalendarDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 1
 */

function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var startOfDayLeft = (0,_startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateLeft);
  var startOfDayRight = (0,_startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateRight);
  var timestampLeft = startOfDayLeft.getTime() - (0,_lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(startOfDayLeft);
  var timestampRight = startOfDayRight.getTime() - (0,_lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(startOfDayRight); // Round the number of days to the nearest integer
  // because the number of milliseconds in a day is not constant
  // (e.g. it's different in the day of the daylight saving time clock shift)

  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/startOfDay/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/startOfDay/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ startOfDay)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a day
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */

function startOfDay(dirtyDate) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
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

  moveItem(index, dir) {
    const movedItem = this.items.splice(index, 1)[0];
    console.log(movedItem);
    console.log(index + dir);
    this.items.splice(index + dir, 0, movedItem);
    return this;
  }

  sortItems(category, reverseCheck) {
    if (category === "dateDue" || category === "completed") {
      reverseCheck === false
        ? this.items.sort((a, b) => a[category] - b[category])
        : this.items.sort((a, b) => b[category] - a[category]);
    } else if (category === "title") {
      reverseCheck === false
        ? this.items.sort((a, b) => {
            const nameA = a.title.toUpperCase();
            const nameB = b.title.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }

            return 0;
          })
        : this.items.sort((a, b) => {
            const nameA = a.title.toUpperCase();
            const nameB = b.title.toUpperCase();
            if (nameA < nameB) {
              return 1;
            }
            if (nameA > nameB) {
              return -1;
            }

            return 0;
          });
    } else
      reverseCheck === false
        ? this.items.sort((a, b) => b[category] - a[category])
        : this.items.sort((a, b) => a[category] - b[category]);
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
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/compareAsc/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/differenceInCalendarDays/index.js");




/**
 * TABLE OF CONTENTS
 
 * Dry Functions
 * Header Buttons
 * Task Buttons
 * Sidebar Buttons
 * Active Task List
 * HTML Inserts
 
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
  // clicked.parentElement.lastElementChild.classList.toggle("hidden");
};

const hideSidebarListOptions = function (clicked) {
  toggleHideEl(clicked.parentElement);
  // clicked.parentElement.classList.add("hidden");
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

const addList = function (el, title, numDue) {
  const htmlListItem = `
    <div class="sidebar__listitem">
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
  const today = new Date();
  const dateDue = Date.parse(date);

  if ((0,date_fns__WEBPACK_IMPORTED_MODULE_0__["default"])(today, dateDue) === 1) {
    return "OVERDUE!";
  } else {
    const diff = (0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(dateDue, today) + 1;

    if (diff == 0) {
      return "Today";
    }
    if (diff === 1) {
      return "Tomorrow";
    }

    return `Due in ${diff} days`;
  }
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
//* FIND PARENT ELEMENTS AND CORRESPONDING ARRAY INDEXES
/* ************************************************** */

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
const sortOptsContainer = document.querySelector(".sortby__opts__container");

// ---- Tasks

// ---- Sidebar
const btnAddList = document.querySelector(".btn__sidebar__add-list");

// ---- Form
const btnFormClose = document.querySelector(".btn__form-close");
const btnFormSubmit = document.querySelector(".btn__form-submit");

// SIDEBAR
const sidebar = document.querySelector(".sidebar");
const sidebarHeader = document.querySelector(".sidebar__header");
const sidebarAddListTitle = document.querySelector(
  ".sidebar__add-list__add-title__container"
);

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

// -- MAIN APP
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

const updateUI = function () {
  // Clear visible list to allow for update
  while (activeListWindow.children.length > 1) {
    activeListWindow.removeChild(activeListWindow.lastChild);
  }

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

const convertDateToUTC = function (date) {
  +Date.parse(date);
};

/* ************************************************** */
//* HEADER
/* ************************************************** */
//* ---------- BUTTONS ----------
//* SIDEBAR TOGGLE
btnListsMenu.addEventListener("click", () => {
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.toggleSidebar)(sidebar, listsMenuEndBars, listsMenuMidBar1, listsMenuMidBar2);
});

//* ADD TASK OPEN
btnAddTask.addEventListener("click", () => {
  formTitle.textContent = "Add Task";
  btnFormSubmit.value = "Add Task";
  formPriorityContainer.classList.remove("invisible");
  form.removeAttribute("data-taskid");
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
    updateUI();
  }

  // Clear Completed
  if (clearCompleted) {
    activeList._clearCompletedTasks();
    updateUI();
  }
});

//* SORT OPTIONS
sortOptsContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".sortby__opts__item");

  sortOptsContainer.classList.toggle("show-sort-opts");

  if (!clicked) return;
  // Sort order for Completed
  else if (clicked.dataset.sortid === "completed")
    activeList.items.sort(
      (a, b) => a[clicked.dataset.sortid] - b[clicked.dataset.sortid]
    );
  // Sort order for Date Due
  else if (clicked.dataset.sortid === "dateDue") {
    console.log(activeList.items[0].dateDue);
    console.log(Date.parse(activeList.items[0].dateDue));

    activeList.items.sort(
      (a, b) =>
        Date.parse(a[clicked.dataset.sortid]) -
        Date.parse(b[clicked.dataset.sortid])
    );
  }

  // Sort order for Date Created && Priority
  else
    activeList.items.sort(
      (a, b) => b[clicked.dataset.sortid] - a[clicked.dataset.sortid]
    );

  updateUI();
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

  console.table(activeList.items);
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
  const clicked = e.target.closest("btn__taskitem__delete");
  if (!clicked) return;
});

/* ************************************************** */
//* SIDEBAR
/* ************************************************** */
//* ---------- BUTTONS ----------
//* SIDEBAR LIST OPTIONS
btnAddList.addEventListener("click", (e) => {
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.toggleSidebarNewListTitle)(sidebarAddListTitle);
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.toggleButtonSpin)(btnAddList);
});

sidebar.addEventListener("click", (e) => {
  const clicked = e.target.closest(".btn__listitem__options");
  if (!clicked) return;

  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.toggleSidebarListOptions)(clicked);
});

sidebar.addEventListener("click", (e) => {
  const clickedTrash = e.target.closest(".btn__listitem--del");
  const clickedArrowUp = e.target.closest(".btn__listitem--up");
  const clickedArrowDown = e.target.closest(".btn__listitem--down");

  if (!clickedTrash && !clickedArrowUp && !clickedArrowDown) return;

  if (clickedTrash || clickedArrowUp || clickedArrowDown) {
    const clicked = clickedTrash || clickedArrowUp || clickedArrowDown;
    (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.hideSidebarListOptions)(clicked);
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

    updateUI();
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
(0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.addList)(sidebarHeader, masterList.items[0].title, 0);

// Update activeList visual
let activeList = masterList.items[0];
(0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.updateActiveListTitle)(activeListTitle, activeList.title);

//! TESTING AREA ----------------------------

logo.addEventListener("click", () => {
  console.table(Date.parse(activeList.items[0].dateDue));
});

formTitle.addEventListener("click", () => {});

activeListHeader.addEventListener("click", function () {});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2ZlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKd0M7QUFDaUI7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsV0FBVyxhQUFhO0FBQ3hCLGFBQWEsUUFBUTtBQUNyQixZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWU7QUFDZixFQUFFLHNFQUFZO0FBQ2QsaUJBQWlCLDREQUFNO0FBQ3ZCLGtCQUFrQiw0REFBTTtBQUN4Qjs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLGNBQWMsMEJBQTBCO0FBQ3hDLElBQUk7QUFDSjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEQrRjtBQUMvQztBQUNTO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsV0FBVyxhQUFhO0FBQ3hCLGFBQWEsUUFBUTtBQUNyQixZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZTtBQUNmLEVBQUUsc0VBQVk7QUFDZCx1QkFBdUIsZ0VBQVU7QUFDakMsd0JBQXdCLGdFQUFVO0FBQ2xDLGlEQUFpRCx5RkFBK0I7QUFDaEYsbURBQW1ELHlGQUErQixtQkFBbUI7QUFDckc7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDakR3QztBQUNpQjtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixhQUFhLE1BQU07QUFDbkIsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZTtBQUNmLEVBQUUsc0VBQVk7QUFDZCxhQUFhLDREQUFNO0FBQ25CO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDOUJ5RDtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixhQUFhLE1BQU07QUFDbkIsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWU7QUFDZixFQUFFLHNFQUFZO0FBQ2QseURBQXlEOztBQUV6RDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLHdLQUF3Szs7QUFFeEs7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuRGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVc7QUFDWCxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFa0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNIckI7O0FBRTZEOztBQUUxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQSxpRUFBcUI7O0FBRXJCOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVELDRDQUE0Qzs7QUFFNUMseURBQXlEOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9jb21wYXJlQXNjL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2RpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9zdGFydE9mRGF5L2luZGV4LmpzIiwid2VicGFjazovL3RvZG8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL3RvRGF0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL3RvZG8tbG9naWMuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy92aXN1YWwuanMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBHb29nbGUgQ2hyb21lIGFzIG9mIDY3LjAuMzM5Ni44NyBpbnRyb2R1Y2VkIHRpbWV6b25lcyB3aXRoIG9mZnNldCB0aGF0IGluY2x1ZGVzIHNlY29uZHMuXG4gKiBUaGV5IHVzdWFsbHkgYXBwZWFyIGZvciBkYXRlcyB0aGF0IGRlbm90ZSB0aW1lIGJlZm9yZSB0aGUgdGltZXpvbmVzIHdlcmUgaW50cm9kdWNlZFxuICogKGUuZy4gZm9yICdFdXJvcGUvUHJhZ3VlJyB0aW1lem9uZSB0aGUgb2Zmc2V0IGlzIEdNVCswMDo1Nzo0NCBiZWZvcmUgMSBPY3RvYmVyIDE4OTFcbiAqIGFuZCBHTVQrMDE6MDA6MDAgYWZ0ZXIgdGhhdCBkYXRlKVxuICpcbiAqIERhdGUjZ2V0VGltZXpvbmVPZmZzZXQgcmV0dXJucyB0aGUgb2Zmc2V0IGluIG1pbnV0ZXMgYW5kIHdvdWxkIHJldHVybiA1NyBmb3IgdGhlIGV4YW1wbGUgYWJvdmUsXG4gKiB3aGljaCB3b3VsZCBsZWFkIHRvIGluY29ycmVjdCBjYWxjdWxhdGlvbnMuXG4gKlxuICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSB0aW1lem9uZSBvZmZzZXQgaW4gbWlsbGlzZWNvbmRzIHRoYXQgdGFrZXMgc2Vjb25kcyBpbiBhY2NvdW50LlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzKGRhdGUpIHtcbiAgdmFyIHV0Y0RhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQyhkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCksIGRhdGUuZ2V0SG91cnMoKSwgZGF0ZS5nZXRNaW51dGVzKCksIGRhdGUuZ2V0U2Vjb25kcygpLCBkYXRlLmdldE1pbGxpc2Vjb25kcygpKSk7XG4gIHV0Y0RhdGUuc2V0VVRDRnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpKTtcbiAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpIC0gdXRjRGF0ZS5nZXRUaW1lKCk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVxdWlyZWRBcmdzKHJlcXVpcmVkLCBhcmdzKSB7XG4gIGlmIChhcmdzLmxlbmd0aCA8IHJlcXVpcmVkKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihyZXF1aXJlZCArICcgYXJndW1lbnQnICsgKHJlcXVpcmVkID4gMSA/ICdzJyA6ICcnKSArICcgcmVxdWlyZWQsIGJ1dCBvbmx5ICcgKyBhcmdzLmxlbmd0aCArICcgcHJlc2VudCcpO1xuICB9XG59IiwiaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBjb21wYXJlQXNjXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENvbXBhcmUgdGhlIHR3byBkYXRlcyBhbmQgcmV0dXJuIC0xLCAwIG9yIDEuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb21wYXJlIHRoZSB0d28gZGF0ZXMgYW5kIHJldHVybiAxIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGFmdGVyIHRoZSBzZWNvbmQsXG4gKiAtMSBpZiB0aGUgZmlyc3QgZGF0ZSBpcyBiZWZvcmUgdGhlIHNlY29uZCBvciAwIGlmIGRhdGVzIGFyZSBlcXVhbC5cbiAqXG4gKiAjIyMgdjIuMC4wIGJyZWFraW5nIGNoYW5nZXM6XG4gKlxuICogLSBbQ2hhbmdlcyB0aGF0IGFyZSBjb21tb24gZm9yIHRoZSB3aG9sZSBsaWJyYXJ5XShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91cGdyYWRlR3VpZGUubWQjQ29tbW9uLUNoYW5nZXMpLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGVMZWZ0IC0gdGhlIGZpcnN0IGRhdGUgdG8gY29tcGFyZVxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIHNlY29uZCBkYXRlIHRvIGNvbXBhcmVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSByZXN1bHQgb2YgdGhlIGNvbXBhcmlzb25cbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMiBhcmd1bWVudHMgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ29tcGFyZSAxMSBGZWJydWFyeSAxOTg3IGFuZCAxMCBKdWx5IDE5ODk6XG4gKiBjb25zdCByZXN1bHQgPSBjb21wYXJlQXNjKG5ldyBEYXRlKDE5ODcsIDEsIDExKSwgbmV3IERhdGUoMTk4OSwgNiwgMTApKVxuICogLy89PiAtMVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTb3J0IHRoZSBhcnJheSBvZiBkYXRlczpcbiAqIGNvbnN0IHJlc3VsdCA9IFtcbiAqICAgbmV3IERhdGUoMTk5NSwgNiwgMiksXG4gKiAgIG5ldyBEYXRlKDE5ODcsIDEsIDExKSxcbiAqICAgbmV3IERhdGUoMTk4OSwgNiwgMTApXG4gKiBdLnNvcnQoY29tcGFyZUFzYylcbiAqIC8vPT4gW1xuICogLy8gICBXZWQgRmViIDExIDE5ODcgMDA6MDA6MDAsXG4gKiAvLyAgIE1vbiBKdWwgMTAgMTk4OSAwMDowMDowMCxcbiAqIC8vICAgU3VuIEp1bCAwMiAxOTk1IDAwOjAwOjAwXG4gKiAvLyBdXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tcGFyZUFzYyhkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICByZXF1aXJlZEFyZ3MoMiwgYXJndW1lbnRzKTtcbiAgdmFyIGRhdGVMZWZ0ID0gdG9EYXRlKGRpcnR5RGF0ZUxlZnQpO1xuICB2YXIgZGF0ZVJpZ2h0ID0gdG9EYXRlKGRpcnR5RGF0ZVJpZ2h0KTtcbiAgdmFyIGRpZmYgPSBkYXRlTGVmdC5nZXRUaW1lKCkgLSBkYXRlUmlnaHQuZ2V0VGltZSgpO1xuXG4gIGlmIChkaWZmIDwgMCkge1xuICAgIHJldHVybiAtMTtcbiAgfSBlbHNlIGlmIChkaWZmID4gMCkge1xuICAgIHJldHVybiAxOyAvLyBSZXR1cm4gMCBpZiBkaWZmIGlzIDA7IHJldHVybiBOYU4gaWYgZGlmZiBpcyBOYU5cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZGlmZjtcbiAgfVxufSIsImltcG9ydCBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzIGZyb20gXCIuLi9fbGliL2dldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMvaW5kZXguanNcIjtcbmltcG9ydCBzdGFydE9mRGF5IGZyb20gXCIuLi9zdGFydE9mRGF5L2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xudmFyIE1JTExJU0VDT05EU19JTl9EQVkgPSA4NjQwMDAwMDtcbi8qKlxuICogQG5hbWUgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzXG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbnVtYmVyIG9mIGNhbGVuZGFyIGRheXMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIG51bWJlciBvZiBjYWxlbmRhciBkYXlzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLiBUaGlzIG1lYW5zIHRoYXQgdGhlIHRpbWVzIGFyZSByZW1vdmVkXG4gKiBmcm9tIHRoZSBkYXRlcyBhbmQgdGhlbiB0aGUgZGlmZmVyZW5jZSBpbiBkYXlzIGlzIGNhbGN1bGF0ZWQuXG4gKlxuICogIyMjIHYyLjAuMCBicmVha2luZyBjaGFuZ2VzOlxuICpcbiAqIC0gW0NoYW5nZXMgdGhhdCBhcmUgY29tbW9uIGZvciB0aGUgd2hvbGUgbGlicmFyeV0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdXBncmFkZUd1aWRlLm1kI0NvbW1vbi1DaGFuZ2VzKS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBsYXRlciBkYXRlXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlUmlnaHQgLSB0aGUgZWFybGllciBkYXRlXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgbnVtYmVyIG9mIGNhbGVuZGFyIGRheXNcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMiBhcmd1bWVudHMgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSG93IG1hbnkgY2FsZW5kYXIgZGF5cyBhcmUgYmV0d2VlblxuICogLy8gMiBKdWx5IDIwMTEgMjM6MDA6MDAgYW5kIDIgSnVseSAyMDEyIDAwOjAwOjAwP1xuICogY29uc3QgcmVzdWx0ID0gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKFxuICogICBuZXcgRGF0ZSgyMDEyLCA2LCAyLCAwLCAwKSxcbiAqICAgbmV3IERhdGUoMjAxMSwgNiwgMiwgMjMsIDApXG4gKiApXG4gKiAvLz0+IDM2NlxuICogLy8gSG93IG1hbnkgY2FsZW5kYXIgZGF5cyBhcmUgYmV0d2VlblxuICogLy8gMiBKdWx5IDIwMTEgMjM6NTk6MDAgYW5kIDMgSnVseSAyMDExIDAwOjAxOjAwP1xuICogY29uc3QgcmVzdWx0ID0gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKFxuICogICBuZXcgRGF0ZSgyMDExLCA2LCAzLCAwLCAxKSxcbiAqICAgbmV3IERhdGUoMjAxMSwgNiwgMiwgMjMsIDU5KVxuICogKVxuICogLy89PiAxXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGRpcnR5RGF0ZUxlZnQsIGRpcnR5RGF0ZVJpZ2h0KSB7XG4gIHJlcXVpcmVkQXJncygyLCBhcmd1bWVudHMpO1xuICB2YXIgc3RhcnRPZkRheUxlZnQgPSBzdGFydE9mRGF5KGRpcnR5RGF0ZUxlZnQpO1xuICB2YXIgc3RhcnRPZkRheVJpZ2h0ID0gc3RhcnRPZkRheShkaXJ0eURhdGVSaWdodCk7XG4gIHZhciB0aW1lc3RhbXBMZWZ0ID0gc3RhcnRPZkRheUxlZnQuZ2V0VGltZSgpIC0gZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyhzdGFydE9mRGF5TGVmdCk7XG4gIHZhciB0aW1lc3RhbXBSaWdodCA9IHN0YXJ0T2ZEYXlSaWdodC5nZXRUaW1lKCkgLSBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzKHN0YXJ0T2ZEYXlSaWdodCk7IC8vIFJvdW5kIHRoZSBudW1iZXIgb2YgZGF5cyB0byB0aGUgbmVhcmVzdCBpbnRlZ2VyXG4gIC8vIGJlY2F1c2UgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaW4gYSBkYXkgaXMgbm90IGNvbnN0YW50XG4gIC8vIChlLmcuIGl0J3MgZGlmZmVyZW50IGluIHRoZSBkYXkgb2YgdGhlIGRheWxpZ2h0IHNhdmluZyB0aW1lIGNsb2NrIHNoaWZ0KVxuXG4gIHJldHVybiBNYXRoLnJvdW5kKCh0aW1lc3RhbXBMZWZ0IC0gdGltZXN0YW1wUmlnaHQpIC8gTUlMTElTRUNPTkRTX0lOX0RBWSk7XG59IiwiaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBzdGFydE9mRGF5XG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgc3RhcnQgb2YgYSBkYXkgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBzdGFydCBvZiBhIGRheSBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqICMjIyB2Mi4wLjAgYnJlYWtpbmcgY2hhbmdlczpcbiAqXG4gKiAtIFtDaGFuZ2VzIHRoYXQgYXJlIGNvbW1vbiBmb3IgdGhlIHdob2xlIGxpYnJhcnldKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VwZ3JhZGVHdWlkZS5tZCNDb21tb24tQ2hhbmdlcykuXG4gKlxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZSAtIHRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIHN0YXJ0IG9mIGEgZGF5XG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDEgYXJndW1lbnQgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGEgZGF5IGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogY29uc3QgcmVzdWx0ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApKVxuICogLy89PiBUdWUgU2VwIDAyIDIwMTQgMDA6MDA6MDBcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdGFydE9mRGF5KGRpcnR5RGF0ZSkge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgdmFyIGRhdGUgPSB0b0RhdGUoZGlydHlEYXRlKTtcbiAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgcmV0dXJuIGRhdGU7XG59IiwiaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgdG9EYXRlXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENvbnZlcnQgdGhlIGdpdmVuIGFyZ3VtZW50IHRvIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlLCB0aGUgZnVuY3Rpb24gcmV0dXJucyBpdHMgY2xvbmUuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIGEgbnVtYmVyLCBpdCBpcyB0cmVhdGVkIGFzIGEgdGltZXN0YW1wLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBub25lIG9mIHRoZSBhYm92ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgSW52YWxpZCBEYXRlLlxuICpcbiAqICoqTm90ZSoqOiAqYWxsKiBEYXRlIGFyZ3VtZW50cyBwYXNzZWQgdG8gYW55ICpkYXRlLWZucyogZnVuY3Rpb24gaXMgcHJvY2Vzc2VkIGJ5IGB0b0RhdGVgLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGFyZ3VtZW50IC0gdGhlIHZhbHVlIHRvIGNvbnZlcnRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgcGFyc2VkIGRhdGUgaW4gdGhlIGxvY2FsIHRpbWUgem9uZVxuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENsb25lIHRoZSBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKG5ldyBEYXRlKDIwMTQsIDEsIDExLCAxMSwgMzAsIDMwKSlcbiAqIC8vPT4gVHVlIEZlYiAxMSAyMDE0IDExOjMwOjMwXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENvbnZlcnQgdGhlIHRpbWVzdGFtcCB0byBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKDEzOTIwOTg0MzAwMDApXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvRGF0ZShhcmd1bWVudCkge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgdmFyIGFyZ1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudCk7IC8vIENsb25lIHRoZSBkYXRlXG5cbiAgaWYgKGFyZ3VtZW50IGluc3RhbmNlb2YgRGF0ZSB8fCB0eXBlb2YgYXJndW1lbnQgPT09ICdvYmplY3QnICYmIGFyZ1N0ciA9PT0gJ1tvYmplY3QgRGF0ZV0nKSB7XG4gICAgLy8gUHJldmVudCB0aGUgZGF0ZSB0byBsb3NlIHRoZSBtaWxsaXNlY29uZHMgd2hlbiBwYXNzZWQgdG8gbmV3IERhdGUoKSBpbiBJRTEwXG4gICAgcmV0dXJuIG5ldyBEYXRlKGFyZ3VtZW50LmdldFRpbWUoKSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGFyZ3VtZW50ID09PSAnbnVtYmVyJyB8fCBhcmdTdHIgPT09ICdbb2JqZWN0IE51bWJlcl0nKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGFyZ3VtZW50KTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoKHR5cGVvZiBhcmd1bWVudCA9PT0gJ3N0cmluZycgfHwgYXJnU3RyID09PSAnW29iamVjdCBTdHJpbmddJykgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFwiU3RhcnRpbmcgd2l0aCB2Mi4wLjAtYmV0YS4xIGRhdGUtZm5zIGRvZXNuJ3QgYWNjZXB0IHN0cmluZ3MgYXMgZGF0ZSBhcmd1bWVudHMuIFBsZWFzZSB1c2UgYHBhcnNlSVNPYCB0byBwYXJzZSBzdHJpbmdzLiBTZWU6IGh0dHBzOi8vZ2l0LmlvL2ZqdWxlXCIpOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuXG4gICAgICBjb25zb2xlLndhcm4obmV3IEVycm9yKCkuc3RhY2spO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICB9XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIE1BU1RFUiBMSVNUXG5jbGFzcyBNYXN0ZXJMaXN0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pdGVtcyA9IFtdO1xuICB9XG5cbiAgYWRkSXRlbSh0aXRsZSkge1xuICAgIHRoaXMuaXRlbXMudW5zaGlmdChuZXcgTGlzdCh0aXRsZSkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGVsZXRlSXRlbShpbmRleCkge1xuICAgIHRoaXMuaXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG1vdmVJdGVtKGluZGV4LCBkaXIpIHtcbiAgICBjb25zdCBtb3ZlZEl0ZW0gPSB0aGlzLml0ZW1zLnNwbGljZShpbmRleCwgMSlbMF07XG4gICAgY29uc29sZS5sb2cobW92ZWRJdGVtKTtcbiAgICBjb25zb2xlLmxvZyhpbmRleCArIGRpcik7XG4gICAgdGhpcy5pdGVtcy5zcGxpY2UoaW5kZXggKyBkaXIsIDAsIG1vdmVkSXRlbSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzb3J0SXRlbXMoY2F0ZWdvcnksIHJldmVyc2VDaGVjaykge1xuICAgIGlmIChjYXRlZ29yeSA9PT0gXCJkYXRlRHVlXCIgfHwgY2F0ZWdvcnkgPT09IFwiY29tcGxldGVkXCIpIHtcbiAgICAgIHJldmVyc2VDaGVjayA9PT0gZmFsc2VcbiAgICAgICAgPyB0aGlzLml0ZW1zLnNvcnQoKGEsIGIpID0+IGFbY2F0ZWdvcnldIC0gYltjYXRlZ29yeV0pXG4gICAgICAgIDogdGhpcy5pdGVtcy5zb3J0KChhLCBiKSA9PiBiW2NhdGVnb3J5XSAtIGFbY2F0ZWdvcnldKTtcbiAgICB9IGVsc2UgaWYgKGNhdGVnb3J5ID09PSBcInRpdGxlXCIpIHtcbiAgICAgIHJldmVyc2VDaGVjayA9PT0gZmFsc2VcbiAgICAgICAgPyB0aGlzLml0ZW1zLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWVBID0gYS50aXRsZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgY29uc3QgbmFtZUIgPSBiLnRpdGxlLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAobmFtZUEgPCBuYW1lQikge1xuICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZUEgPiBuYW1lQikge1xuICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgfSlcbiAgICAgICAgOiB0aGlzLml0ZW1zLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWVBID0gYS50aXRsZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgY29uc3QgbmFtZUIgPSBiLnRpdGxlLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAobmFtZUEgPCBuYW1lQikge1xuICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuYW1lQSA+IG5hbWVCKSB7XG4gICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgfSk7XG4gICAgfSBlbHNlXG4gICAgICByZXZlcnNlQ2hlY2sgPT09IGZhbHNlXG4gICAgICAgID8gdGhpcy5pdGVtcy5zb3J0KChhLCBiKSA9PiBiW2NhdGVnb3J5XSAtIGFbY2F0ZWdvcnldKVxuICAgICAgICA6IHRoaXMuaXRlbXMuc29ydCgoYSwgYikgPT4gYVtjYXRlZ29yeV0gLSBiW2NhdGVnb3J5XSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuLy8gTElTVFNcbmNsYXNzIExpc3QgZXh0ZW5kcyBNYXN0ZXJMaXN0IHtcbiAgY29uc3RydWN0b3IodGl0bGUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB0aGlzLmlkID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLmNvbG9yID0gXCJpbml0aWFsXCI7XG4gICAgdGhpcy5pdGVtcyA9IFtdO1xuICB9XG5cbiAgLy8gQWRkIFRhc2tcbiAgYWRkSXRlbSh0aXRsZSwgZGVzYywgZGF0ZUR1ZSwgcHJpb3JpdHkpIHtcbiAgICB0aGlzLml0ZW1zLnVuc2hpZnQobmV3IFRhc2sodGl0bGUsIGRlc2MsIGRhdGVEdWUsIHByaW9yaXR5KSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBfY2xlYXJDb21wbGV0ZWRUYXNrcygpIHtcbiAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtcy5maWx0ZXIoKGEpID0+IGEuY29tcGxldGVkID09PSBmYWxzZSk7XG4gIH1cbn1cblxuLy8gVEFTS1NcbmNsYXNzIFRhc2sge1xuICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzYywgZGF0ZUR1ZSwgcHJpb3JpdHkpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kZXNjID0gZGVzYztcbiAgICB0aGlzLmlkID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLmRhdGVEdWUgPSBkYXRlRHVlO1xuICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB0aGlzLmNvbXBsZXRlZCA9IGZhbHNlO1xuICAgIHRoaXMuY29tcGxldGVkRGF0ZTtcbiAgfVxuXG4gIC8vIFRvZ2dsZSBDb21wbGV0ZWRcbiAgdG9nZ2xlQ29tcGxldGVkKCkge1xuICAgIHRoaXMuY29tcGxldGVkID09PSBmYWxzZVxuICAgICAgPyAodGhpcy5jb21wbGV0ZWQgPSB0cnVlKVxuICAgICAgOiAodGhpcy5jb21wbGV0ZWQgPSBmYWxzZSk7XG5cbiAgICBpZiAodGhpcy5jb21wbGV0ZWQgPT09IHRydWUpXG4gICAgICB0aGlzLmNvbXBsZXRlZERhdGUgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKG5hdmlnYXRvci5sYW5ndWFnZXNbMF0sIHtcbiAgICAgICAgeWVhcjogXCJudW1lcmljXCIsXG4gICAgICAgIG1vbnRoOiBcInNob3J0XCIsXG4gICAgICAgIGRheTogXCIyLWRpZ2l0XCIsXG4gICAgICB9KTtcblxuICAgIGlmICh0aGlzLmNvbXBsZXRlZCA9PT0gZmFsc2UpIHRoaXMuY29tcGxldGVkRGF0ZSA9IFwiXCI7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIFRvZ2dsZSBQcmlvcml0eVxuICB0b2dnbGVQcmlvcml0eSgpIHtcbiAgICB0aGlzLnByaW9yaXR5ID09PSBmYWxzZSA/ICh0aGlzLnByaW9yaXR5ID0gdHJ1ZSkgOiAodGhpcy5wcmlvcml0eSA9IGZhbHNlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5leHBvcnQgeyBNYXN0ZXJMaXN0LCBMaXN0LCBUYXNrIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzLCBjb21wYXJlQXNjLCBwYXJzZUlTTyB9IGZyb20gXCJkYXRlLWZuc1wiO1xuXG4vKipcbiAqIFRBQkxFIE9GIENPTlRFTlRTXG4gXG4gKiBEcnkgRnVuY3Rpb25zXG4gKiBIZWFkZXIgQnV0dG9uc1xuICogVGFzayBCdXR0b25zXG4gKiBTaWRlYmFyIEJ1dHRvbnNcbiAqIEFjdGl2ZSBUYXNrIExpc3RcbiAqIEhUTUwgSW5zZXJ0c1xuIFxuICoqL1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIERSWSBGVU5DVElPTlNcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5jb25zdCBjbGVhckZvcm0gPSBmdW5jdGlvbiAoZm9ybVRpdGxlLCBmb3JtRHVlLCBmb3JtRGVzYywgZm9ybVByaW9yaXR5KSB7XG4gIHJlbW92ZUVycm9yT3V0bGluZShmb3JtVGl0bGUpO1xuXG4gIGZvcm1UaXRsZS52YWx1ZSA9IFwiXCI7XG4gIGZvcm1EdWUudmFsdWUgPSBcIlwiO1xuICBmb3JtRGVzYy52YWx1ZSA9IFwiXCI7XG4gIGZvcm1Qcmlvcml0eS5jaGVja2VkID0gZmFsc2U7XG59O1xuXG5jb25zdCB0b2dnbGVIaWRlRWwgPSAoZWwpID0+IGVsLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRkZW5cIik7XG5cbmNvbnN0IHJlbW92ZUVycm9yT3V0bGluZSA9IChlbCkgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZShcInJlZC1vdXRsaW5lXCIpO1xuY29uc3QgYWRkRXJyb3JPdXRsaW5lID0gKGVsKSA9PiBlbC5jbGFzc0xpc3QuYWRkKFwicmVkLW91dGxpbmVcIik7XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogSEVBREVSIEJVVFRPTlNcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyBTSURFQkFSIFRPR0dMRVxuY29uc3QgdG9nZ2xlU2lkZWJhciA9IGZ1bmN0aW9uIChcbiAgc2lkZWJhcixcbiAgbGlzdHNNZW51RW5kQmFycyxcbiAgbGlzdHNNZW51TWlkQmFyMSxcbiAgbGlzdHNNZW51TWlkQmFyMlxuKSB7XG4gIC8vIFJldmVhbCBzaWRlIGJhclxuICB0b2dnbGVIaWRlRWwoc2lkZWJhcik7XG5cbiAgLy8gVHJhbmZvcm0gY2xvc2UgYnV0dG9uXG4gIGxpc3RzTWVudUVuZEJhcnMuZm9yRWFjaCgoYmFyKSA9PiBiYXIuY2xhc3NMaXN0LnRvZ2dsZShcImJhci0tdmFuaXNoXCIpKTtcbiAgbGlzdHNNZW51TWlkQmFyMS5jbGFzc0xpc3QudG9nZ2xlKFwiYmFyX19taWQtLXJvdGF0ZVwiKTtcbiAgbGlzdHNNZW51TWlkQmFyMi5jbGFzc0xpc3QudG9nZ2xlKFwiYmFyX19taWQyLS1yb3RhdGVcIik7XG59O1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIFRBU0sgQlVUVE9OU1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vIENoYW5nZSBjb21wbGV0ZWQgdGFzayBjaGVja2JveCB2aXN1YWxcbmNvbnN0IGRpbUNvbXBsZXRlZFRhc2tzID0gZnVuY3Rpb24gKGNsaWNrZWQpIHtcbiAgLy8gQ2hhbmdlIHRhc2sgdGV4dCBjb2xvciAvIHN0cmlrZXRocnVcbiAgY2xpY2tlZC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjaGVja2VkXCIpO1xuXG4gIC8vIENoYW5nZSB0YXNrIGRldGFpbHMgYnV0dG9uIGNvbG9yXG4gIGNsaWNrZWQucGFyZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkLmNsYXNzTGlzdC5hZGQoXG4gICAgXCJidG5fX2RldGFpbHMtLWNvbXBsZXRlZFwiXG4gICk7XG5cbiAgLy8gQ2hhbmdlIHRhc2sgaXRlbSBmaWx0ZXJcbiAgY2xpY2tlZC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImNvbXBsZXRlZC0tdHJ1ZVwiKTtcblxuICAvLyBDaGFuZ2UgRGV0YWlscyBkdWUgZGF0ZSBmb250IGNvbG9yXG4gIGNsaWNrZWQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQubGFzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5sYXN0RWxlbWVudENoaWxkPy5jbGFzc0xpc3QuYWRkKFxuICAgIFwiY2hlY2tlZFwiXG4gICk7XG59O1xuXG5jb25zdCB1bmRvQ29tcGxldGVkRGltID0gZnVuY3Rpb24gKGNsaWNrZWQpIHtcbiAgLy8gQ2hhbmdlIHRhc2sgdGV4dCBjb2xvciAvIHN0cmlrZXRocnVcbiAgY2xpY2tlZC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJjaGVja2VkXCIpO1xuXG4gIC8vIENoYW5nZSB0YXNrIGRldGFpbHMgYnV0dG9uIGNvbG9yXG4gIGNsaWNrZWQucGFyZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkLmNsYXNzTGlzdC5yZW1vdmUoXG4gICAgXCJidG5fX2RldGFpbHMtLWNvbXBsZXRlZFwiXG4gICk7XG5cbiAgLy8gQ2hhbmdlIHRhc2sgaXRlbSBmaWx0ZXJcbiAgY2xpY2tlZC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImNvbXBsZXRlZC0tdHJ1ZVwiKTtcblxuICAvLyBDaGFuZ2UgRGV0YWlscyBkdWUgZGF0ZSBmb250IGNvbG9yXG4gIGNsaWNrZWQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQubGFzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5sYXN0RWxlbWVudENoaWxkPy5jbGFzc0xpc3QucmVtb3ZlKFxuICAgIFwiY2hlY2tlZFwiXG4gICk7XG59O1xuXG4vLyBWaXN1YWwgZm9yIG9wZW4gdGFzayBkZXRhaWxzIGJ1dHRvblxuY29uc3QgdG9nZ2xlVGFza0RldGFpbHNCdG4gPSBmdW5jdGlvbiAoY2xpY2tlZCkge1xuICBjbGlja2VkLmNsYXNzTGlzdC5jb250YWlucyhcImJ0bl9fZGV0YWlscy0tb3BlblwiKVxuICAgID8gY2xpY2tlZC5jbGFzc0xpc3QucmVtb3ZlKFwiYnRuX19kZXRhaWxzLS1vcGVuXCIpXG4gICAgOiBjbGlja2VkLmNsYXNzTGlzdC5hZGQoXCJidG5fX2RldGFpbHMtLW9wZW5cIik7XG59O1xuXG5jb25zdCB0b2dnbGVJbmFjdGl2ZURldGFpbHNCdG5zID0gZnVuY3Rpb24gKGUpIHtcbiAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYnRuX19kZXRhaWxzXCIpO1xuICBmb3IgKGxldCBidXR0b24gb2YgYnV0dG9ucykge1xuICAgIC8vIENsb3NlIGFueSB0YXNrIGRldGFpbHMgb3BlbiB0byBzdG9wIG11bHRpcGxlIGF0IG9uY2VcbiAgICBpZiAoYnV0dG9uICE9PSBlLnRhcmdldCkge1xuICAgICAgYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJidG5fX2RldGFpbHMtLW9wZW5cIik7XG5cbiAgICAgIGlmIChcbiAgICAgICAgYnV0dG9uLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuLmxlbmd0aCA9PT0gMlxuICAgICAgKVxuICAgICAgICBoaWRlVGFza0RldGFpbHMoYnV0dG9uLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IGV4cGFuZFNlbGVjdGVkRGV0YWlscyA9IGZ1bmN0aW9uIChcbiAgY2xpY2tlZCxcbiAgcHJpb3JpdHksXG4gIGRlc2MsXG4gIGNvbXBsZXRlZCxcbiAgZGF0ZUR1ZVxuKSB7XG4gIGlmIChjbGlja2VkLmNsYXNzTGlzdC5jb250YWlucyhcImJ0bl9fZGV0YWlscy0tb3BlblwiKSlcbiAgICBleHBhbmRUYXNraXRlbShcbiAgICAgIGNsaWNrZWQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQsXG4gICAgICBwcmlvcml0eSxcbiAgICAgIGRlc2MsXG4gICAgICBjb21wbGV0ZWQsXG4gICAgICBkYXRlRHVlXG4gICAgKTtcbn07XG5cbmNvbnN0IGhpZGVOb25TZWxlY3RlZERldGFpbHMgPSBmdW5jdGlvbiAoY2xpY2tlZCkge1xuICBpZiAoIWNsaWNrZWQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYnRuX19kZXRhaWxzLS1vcGVuXCIpKVxuICAgIGhpZGVUYXNrRGV0YWlscyhjbGlja2VkLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KTtcbn07XG5cbi8vIENoYW5nZSBwcmlvcml0eSBjaGVja2JveCB2aXN1YWxcbmNvbnN0IGFkZFByaW9yaXR5VmlzdWFsID0gZnVuY3Rpb24gKGNsaWNrZWQpIHtcbiAgLy8gQ2hhbmdlIGJhY2tncm91bmQgY29sb3Igb2YgdGFza1xuICBjbGlja2VkLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFxuICAgIFwicHJpb3JpdHktLXRydWVcIlxuICApO1xufTtcblxuY29uc3QgcmVtb3ZlUHJpb3JpdHlWaXN1YWwgPSBmdW5jdGlvbiAoY2xpY2tlZCkge1xuICAvLyBDaGFuZ2UgYmFja2dyb3VuZCBjb2xvciBiYWNrXG4gIGNsaWNrZWQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXG4gICAgXCJwcmlvcml0eS0tdHJ1ZVwiXG4gICk7XG59O1xuXG4vLyBDaGFuZ2UgaW5uZXIgZGV0YWlscyBvZiBkYXRlIGR1ZSAtPiBjb21wbGV0ZWQgYW5kIGJhY2tcbmNvbnN0IHRvZ2dsZVRhc2tDb21wbGV0ZWREdWVEYXRlID0gZnVuY3Rpb24gKGNsaWNrZWQsIGFjdGl2ZUxpc3QsIGl0ZW1JbmRleCkge1xuICBpZiAoY2xpY2tlZC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoID09PSAyKSB7XG4gICAgY2xpY2tlZC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQubGFzdEVsZW1lbnRDaGlsZC5sYXN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkLmxhc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQuaW5uZXJIVE1MID0gYCR7XG4gICAgICBhY3RpdmVMaXN0Lml0ZW1zW2l0ZW1JbmRleF0uY29tcGxldGVkID09PSB0cnVlID8gXCJDb21wbGV0ZWRcIiA6IFwiRHVlXCJcbiAgICB9YDtcblxuICAgIGNsaWNrZWQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQubGFzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5sYXN0RWxlbWVudENoaWxkLmxhc3RFbGVtZW50Q2hpbGQuaW5uZXJIVE1MID0gYCR7XG4gICAgICBhY3RpdmVMaXN0Lml0ZW1zW2l0ZW1JbmRleF0uY29tcGxldGVkID09PSBmYWxzZVxuICAgICAgICA/IGFjdGl2ZUxpc3QuaXRlbXNbaXRlbUluZGV4XS5kYXRlRHVlLnNsaWNlKDUpXG4gICAgICAgIDogYCR7U3RyaW5nKG5ldyBEYXRlKCkuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKX0tJHtTdHJpbmcoXG4gICAgICAgICAgICBuZXcgRGF0ZSgpLmdldERhdGUoKVxuICAgICAgICAgICkucGFkU3RhcnQoMiwgXCIwXCIpfWBcbiAgICB9YDtcbiAgfVxufTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBTSURFQkFSIEJVVFRPTlNcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyBTaWRlYmFyIGxpc3RzIG9wdGlvbnNcbmNvbnN0IHRvZ2dsZVNpZGViYXJMaXN0T3B0aW9ucyA9IGZ1bmN0aW9uIChjbGlja2VkKSB7XG4gIHRvZ2dsZUhpZGVFbChjbGlja2VkLnBhcmVudEVsZW1lbnQubGFzdEVsZW1lbnRDaGlsZCk7XG4gIC8vIGNsaWNrZWQucGFyZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRkZW5cIik7XG59O1xuXG5jb25zdCBoaWRlU2lkZWJhckxpc3RPcHRpb25zID0gZnVuY3Rpb24gKGNsaWNrZWQpIHtcbiAgdG9nZ2xlSGlkZUVsKGNsaWNrZWQucGFyZW50RWxlbWVudCk7XG4gIC8vIGNsaWNrZWQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xufTtcblxuY29uc3QgdG9nZ2xlU2lkZWJhck5ld0xpc3RUaXRsZSA9IGZ1bmN0aW9uIChlbCkge1xuICBlbC5jbGFzc0xpc3QudG9nZ2xlKFwiYWRkX19saXN0LXRpdGxlLS12aXNpYmxlXCIpO1xufTtcblxuY29uc3QgdG9nZ2xlQnV0dG9uU3BpbiA9IGZ1bmN0aW9uIChlbCkge1xuICBlbC5jbGFzc0xpc3QudG9nZ2xlKFwic3Bpbi00NWRlZ1wiKTtcbn07XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogQWN0aXZlIFRhc2sgTGlzdFxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbmNvbnN0IHVwZGF0ZUFjdGl2ZUxpc3RUaXRsZSA9IGZ1bmN0aW9uIChsaXN0TmFtZUVsLCBsaXN0TmFtZSkge1xuICBsaXN0TmFtZUVsLnRleHRDb250ZW50ID0gbGlzdE5hbWU7XG59O1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIEhUTUwgSW5zZXJ0c1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbmNvbnN0IGV4cGFuZFRhc2tpdGVtID0gZnVuY3Rpb24gKGVsLCBwcmlvcml0eSwgZGVzYywgY29tcGxldGVkLCBkYXRlRHVlKSB7XG4gIGNvbnN0IGh0bWxUYXNrRGV0YWlscyA9IGBcbiAgICA8ZGl2IGNsYXNzPVwidGFza2l0ZW0tLWV4cGFuZGVkXCI+XG4gICAgICA8aHIgY2xhc3M9XCJ0YXNraXRlbV9fZGl2aWRlclwiIC8+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0YXNraXRlbV9fZGV0YWlsc19fY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YXNraXRlbV9fZGV0YWlsc19fdHh0LWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxwPiR7ZGVzY308L3A+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRhc2tpdGVtX19kdWUtZGF0ZV9fY29udGFpbmVyICR7XG4gICAgICAgICAgICBjb21wbGV0ZWQgPT09IHRydWUgPyBcImNoZWNrZWRcIiA6IFwiXCJcbiAgICAgICAgICB9XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFza2l0ZW1fX2R1ZS1kYXRlX190aXRsZVwiPiR7XG4gICAgICAgICAgICAgIGNvbXBsZXRlZCA9PT0gdHJ1ZSA/IFwiQ29tcGxldGVkXCIgOiBcIkR1ZVwiXG4gICAgICAgICAgICB9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFza2l0ZW1fX2R1ZS1kYXRlX19kYXRlXCI+JHtcbiAgICAgICAgICAgICAgY29tcGxldGVkID09PSBmYWxzZVxuICAgICAgICAgICAgICAgID8gZGF0ZUR1ZS5zbGljZSg1KVxuICAgICAgICAgICAgICAgIDogYCR7U3RyaW5nKG5ldyBEYXRlKCkuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KFxuICAgICAgICAgICAgICAgICAgICAyLFxuICAgICAgICAgICAgICAgICAgICBcIjBcIlxuICAgICAgICAgICAgICAgICAgKX0tJHtTdHJpbmcobmV3IERhdGUoKS5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKX1gXG4gICAgICAgICAgICB9PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YXNraXRlbV9fZGV0YWlsc19fYWN0aW9ucy1jb250YWluZXJcIj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJ0YXNraXRlbV9fcHJpb3JpdHktY2hlY2tcIj5cbiAgICAgICAgICAgIFByaW9yaXR5XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgbmFtZT1cInByaW9yaXR5X19jaGVja2JveFwiXG4gICAgICAgICAgICAgIGNsYXNzPVwidGFza2l0ZW1fX3ByaW9yaXR5LWNoZWNrX19jaGVja2JveFwiXG4gICAgICAgICAgICAgICR7cHJpb3JpdHkgPT09IHRydWUgPyBcImNoZWNrZWRcIiA6IFwiXCJ9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRhc2tpdGVtX19lZGl0X19jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgc3JjPVwiLi9pbWFnZXMvZWRpdC5zdmdcIlxuICAgICAgICAgICAgICBoZWlnaHQ9XCIyMnB4XCJcbiAgICAgICAgICAgICAgYWx0PVwiRWRpdCB0YXNrXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJFZGl0IHRhc2tcIlxuICAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG5fX3Rhc2tpdGVtX19lZGl0XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRhc2tpdGVtX19kZWxfX2NvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBzcmM9XCIuL2ltYWdlcy90cmFzaC5zdmdcIlxuICAgICAgICAgICAgICBoZWlnaHQ9XCIyNXB4XCJcbiAgICAgICAgICAgICAgYWx0PVwiRGVsZXRlIHRhc2tcIlxuICAgICAgICAgICAgICB0aXRsZT1cIkRlbGV0ZSB0YXNrXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuX190YXNraXRlbV9fZGVsZXRlXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8IS0tIGVuZCB0YXNraXRlbV9fZGV0YWlsc19fYWN0aW9ucy1jb250YWluZXIgLS0+XG4gICAgICA8L2Rpdj5cbiAgICAgIDwhLS0gZW5kIHRhc2tpdGVtX19kZXRhaWxzX19jb250YWluZXIgLS0+XG4gICAgPC9kaXY+XG4gIGA7XG5cbiAgZWwuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGh0bWxUYXNrRGV0YWlscyk7XG59O1xuXG5jb25zdCBoaWRlVGFza0RldGFpbHMgPSBmdW5jdGlvbiAoZWwpIHtcbiAgZWwucmVtb3ZlQ2hpbGQoZWwubGFzdEVsZW1lbnRDaGlsZCk7XG59O1xuXG5jb25zdCBhZGRMaXN0ID0gZnVuY3Rpb24gKGVsLCB0aXRsZSwgbnVtRHVlKSB7XG4gIGNvbnN0IGh0bWxMaXN0SXRlbSA9IGBcbiAgICA8ZGl2IGNsYXNzPVwic2lkZWJhcl9fbGlzdGl0ZW1cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJsaXN0aXRlbV9fb3B0aW9uc19fY29udGFpbmVyXCI+XG4gICAgICA8aW1nIFxuICAgICAgICBzcmM9XCIuL2ltYWdlcy9saXN0cy1tZW51LnBuZ1wiXG4gICAgICAgIGhlaWdodD1cIjIwcHhcIlxuICAgICAgICBjbGFzcz1cImJ0biBidG5fX2xpc3RpdGVtX19vcHRpb25zXCJcbiAgICAgIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwibGlzdGl0ZW1fX29wdGlvbnNfX21lbnVfX2NvbnRhaW5lciBoaWRkZW5cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFycm93LXVwXCI+PC9kaXY+XG4gICAgICAgIDxpbWdcbiAgICAgICAgICBzcmM9XCIuL2ltYWdlcy90cmFzaC5zdmdcIlxuICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bl9fbGlzdGl0ZW0gYnRuX19saXN0aXRlbS0tZGVsXCJcbiAgICAgICAgICBoZWlnaHQ9XCIyOHB4XCJcbiAgICAgICAgLz5cbiAgICAgICAgPGltZ1xuICAgICAgICAgIHNyYz1cIi4vaW1hZ2VzL2Rvd24tdHJpYW5nbGUucG5nXCJcbiAgICAgICAgICBjbGFzcz1cImJ0biBidG5fX2xpc3RpdGVtIGJ0bl9fbGlzdGl0ZW0tLXVwXCJcbiAgICAgICAgICBoZWlnaHQ9XCIyOHB4XCJcbiAgICAgICAgLz5cbiAgICAgICAgPGltZ1xuICAgICAgICAgIHNyYz1cIi4vaW1hZ2VzL2Rvd24tdHJpYW5nbGUucG5nXCJcbiAgICAgICAgICBjbGFzcz1cImJ0biBidG5fX2xpc3RpdGVtIGJ0bl9fbGlzdGl0ZW0tLWRvd25cIlxuICAgICAgICAgIGhlaWdodD1cIjI4cHhcIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8IS0tIGVuZCBsaXN0aXRlbV9fb3B0aW9uc19fbWVudV9fY29udGFpbmVyIC0tPlxuICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0aXRlbV9fdGl0bGVcIj4ke3RpdGxlfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdGl0ZW1fX2R1ZS1jb3VudFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdGl0ZW1fX2R1ZS1jb3VudF9fdGl0bGVcIj5UYXNrcyBEdWU6PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0aXRlbV9fZHVlLWNvdW50X19jb3VudFwiPiR7bnVtRHVlfTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGA7XG5cbiAgZWwuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYWZ0ZXJlbmRcIiwgaHRtbExpc3RJdGVtKTtcbn07XG5cbmNvbnN0IGRheXNMZWZ0ID0gZnVuY3Rpb24gKGRhdGUpIHtcbiAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCBkYXRlRHVlID0gRGF0ZS5wYXJzZShkYXRlKTtcblxuICBpZiAoY29tcGFyZUFzYyh0b2RheSwgZGF0ZUR1ZSkgPT09IDEpIHtcbiAgICByZXR1cm4gXCJPVkVSRFVFIVwiO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGRpZmYgPSBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoZGF0ZUR1ZSwgdG9kYXkpICsgMTtcblxuICAgIGlmIChkaWZmID09IDApIHtcbiAgICAgIHJldHVybiBcIlRvZGF5XCI7XG4gICAgfVxuICAgIGlmIChkaWZmID09PSAxKSB7XG4gICAgICByZXR1cm4gXCJUb21vcnJvd1wiO1xuICAgIH1cblxuICAgIHJldHVybiBgRHVlIGluICR7ZGlmZn0gZGF5c2A7XG4gIH1cbn07XG5cbmNvbnN0IGFkZFRhc2sgPSBmdW5jdGlvbiAoZWwsIHRpdGxlLCBkYXRlRHVlLCBwcmlvcml0eSwgaWQsIGNvbXBsZXRlZCkge1xuICBjb25zdCBodG1sVGFza0l0ZW0gPSBgXG4gIDxkaXYgaWQ9JHtpZH0gY2xhc3M9XCJ0YXNraXRlbSR7cHJpb3JpdHkgPT09IHRydWUgPyBcIiBwcmlvcml0eS0tdHJ1ZVwiIDogXCJcIn0ke1xuICAgIGNvbXBsZXRlZCA/IFwiIGNvbXBsZXRlZC0tdHJ1ZVwiIDogXCJcIlxuICB9XCI+XG4gICAgPGRpdiBjbGFzcz1cInRhc2tpdGVtX19hYmJyJHtjb21wbGV0ZWQgPyBcIiBjaGVja2VkXCIgOiBcIlwifVwiPlxuICAgICAgPGlucHV0XG4gICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgIG5hbWU9XCJjb21wbGV0ZWQtY2hlY2tib3hcIlxuICAgICAgICBjbGFzcz1cInRhc2tpdGVtX19jaGVja2JveFwiXG4gICAgICAgICR7Y29tcGxldGVkID8gXCJjaGVja2VkXCIgOiBcIlwifVxuICAgICAgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0YXNraXRlbV9fdHh0Ym94XCI+XG4gICAgICAgIDxoMz4ke3RpdGxlfTwvaDM+XG4gICAgICAgIDxwPiR7ZGF0ZUR1ZSA9PT0gXCJcIiA/IGAmbmJzcDtgIDogZGF5c0xlZnQoZGF0ZUR1ZSl9PC9wPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwidGFza2l0ZW1fX2J0bi1kZXRhaWxzX19jb250YWluZXJcIj5cbiAgICAgICAgPGltZ1xuICAgICAgICAgIHNyYz1cIi4vaW1hZ2VzL2Rvd24tdHJpYW5nbGUucG5nXCJcbiAgICAgICAgICBhbHQ9XCJPcGVuIGRldGFpbHNcIlxuICAgICAgICAgIHRpdGxlPVwiRGV0YWlsc1wiXG4gICAgICAgICAgaGVpZ2h0PVwiMjBweFwiXG4gICAgICAgICAgY2xhc3M9XCJidG4gYnRuX19kZXRhaWxzJHtjb21wbGV0ZWQgPyBcIiBidG5fX2RldGFpbHMtLWNvbXBsZXRlZFwiIDogXCJcIn1cIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuYDtcblxuICBlbC5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlcmVuZFwiLCBodG1sVGFza0l0ZW0pO1xufTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBGSU5EIFBBUkVOVCBFTEVNRU5UUyBBTkQgQ09SUkVTUE9ORElORyBBUlJBWSBJTkRFWEVTXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIEVYUE9SVFNcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5leHBvcnQge1xuICBjbGVhckZvcm0sXG4gIHRvZ2dsZVNpZGViYXIsXG4gIGRpbUNvbXBsZXRlZFRhc2tzLFxuICB1bmRvQ29tcGxldGVkRGltLFxuICB0b2dnbGVUYXNrRGV0YWlsc0J0bixcbiAgdG9nZ2xlSW5hY3RpdmVEZXRhaWxzQnRucyxcbiAgZXhwYW5kU2VsZWN0ZWREZXRhaWxzLFxuICBoaWRlTm9uU2VsZWN0ZWREZXRhaWxzLFxuICBoaWRlVGFza0RldGFpbHMsXG4gIGFkZFByaW9yaXR5VmlzdWFsLFxuICByZW1vdmVQcmlvcml0eVZpc3VhbCxcbiAgdG9nZ2xlU2lkZWJhckxpc3RPcHRpb25zLFxuICBoaWRlU2lkZWJhckxpc3RPcHRpb25zLFxuICBhZGRMaXN0LFxuICB1cGRhdGVBY3RpdmVMaXN0VGl0bGUsXG4gIHRvZ2dsZVNpZGViYXJOZXdMaXN0VGl0bGUsXG4gIHJlbW92ZUVycm9yT3V0bGluZSxcbiAgYWRkRXJyb3JPdXRsaW5lLFxuICB0b2dnbGVIaWRlRWwsXG4gIHRvZ2dsZUJ1dHRvblNwaW4sXG4gIGRheXNMZWZ0LCAvLyBEZWxldGUgd2hlbiBkb25lIHRlc3RpbmdcbiAgYWRkVGFzayxcbiAgdG9nZ2xlVGFza0NvbXBsZXRlZER1ZURhdGUsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gXG4gVEFCTEUgT0YgQ09OVEVOVFNcblxuICogTW9kdWxlc1xuICogRE9NIFZhcmlhYmxlc1xuICogRFJZIEZ1bmN0aW9uc1xuICogSGVhZGVyIEJ1dHRvbnNcbiAqIFRhc2sgQnV0dG9uc1xuICogU2lkZWJhciBCdXR0b25zXG4gKiBGb3JtIEJ1dHRvbnNcbiAqIEFwcCBMb2dpY1xuXG4qKi9cblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBNT0RVTEVTXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuaW1wb3J0IHsgTWFzdGVyTGlzdCB9IGZyb20gXCIuL3RvZG8tbG9naWMuanNcIjtcbmltcG9ydCB7XG4gIGFkZFByaW9yaXR5VmlzdWFsLFxuICBkaW1Db21wbGV0ZWRUYXNrcyxcbiAgZXhwYW5kU2VsZWN0ZWREZXRhaWxzLFxuICBoaWRlTm9uU2VsZWN0ZWREZXRhaWxzLFxuICBoaWRlVGFza0RldGFpbHMsXG4gIHJlbW92ZVByaW9yaXR5VmlzdWFsLFxuICB0b2dnbGVJbmFjdGl2ZURldGFpbHNCdG5zLFxuICB0b2dnbGVTaWRlYmFyLFxuICB0b2dnbGVTaWRlYmFyTGlzdE9wdGlvbnMsXG4gIHRvZ2dsZVRhc2tEZXRhaWxzQnRuLFxuICB1bmRvQ29tcGxldGVkRGltLFxuICBjbGVhckZvcm0sXG4gIGhpZGVTaWRlYmFyTGlzdE9wdGlvbnMsXG4gIGFkZExpc3QsXG4gIHVwZGF0ZUFjdGl2ZUxpc3RUaXRsZSxcbiAgdG9nZ2xlU2lkZWJhck5ld0xpc3RUaXRsZSxcbiAgcmVtb3ZlRXJyb3JPdXRsaW5lLFxuICBhZGRFcnJvck91dGxpbmUsXG4gIHRvZ2dsZUhpZGVFbCxcbiAgdG9nZ2xlQnV0dG9uU3BpbixcbiAgZGF5c0xlZnQsIC8vIERlbGV0ZSB3aGVuIGRvbmUgdGVzdGluZ1xuICBhZGRUYXNrLFxuICB0b2dnbGVUYXNrQ29tcGxldGVkRHVlRGF0ZSxcbn0gZnJvbSBcIi4vdmlzdWFsLmpzXCI7XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogRE9NIFZBUklBQkxFU1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vIEJVVFRPTlNcbi8vIC0tLS0gSGVhZGVyXG5jb25zdCBidG5MaXN0c01lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxpc3RzLW1lbnVcIik7XG5jb25zdCBsaXN0c01lbnVFbmRCYXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5iYXJfX2VuZFwiKTtcbmNvbnN0IGxpc3RzTWVudU1pZEJhcjEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJhcl9fbWlkXCIpO1xuY29uc3QgbGlzdHNNZW51TWlkQmFyMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYmFyX19taWQyXCIpO1xuY29uc3QgYnRuQWRkVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2tcIik7XG5jb25zdCBzb3J0T3B0c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc29ydGJ5X19vcHRzX19jb250YWluZXJcIik7XG5cbi8vIC0tLS0gVGFza3NcblxuLy8gLS0tLSBTaWRlYmFyXG5jb25zdCBidG5BZGRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG5fX3NpZGViYXJfX2FkZC1saXN0XCIpO1xuXG4vLyAtLS0tIEZvcm1cbmNvbnN0IGJ0bkZvcm1DbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuX19mb3JtLWNsb3NlXCIpO1xuY29uc3QgYnRuRm9ybVN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuX19mb3JtLXN1Ym1pdFwiKTtcblxuLy8gU0lERUJBUlxuY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhclwiKTtcbmNvbnN0IHNpZGViYXJIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXJfX2hlYWRlclwiKTtcbmNvbnN0IHNpZGViYXJBZGRMaXN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICBcIi5zaWRlYmFyX19hZGQtbGlzdF9fYWRkLXRpdGxlX19jb250YWluZXJcIlxuKTtcblxuLy8gRk9STVxuY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybVwiKTtcbmNvbnN0IGZvcm1UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybV9fdGl0bGVcIik7XG5jb25zdCBmb3JtVGFza1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtX190ZXh0LS10aXRsZVwiKTtcbmNvbnN0IGZvcm1EdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm1fX2RhdGVcIik7XG5jb25zdCBmb3JtRGVzYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybV9fdGV4dC1hcmVhXCIpO1xuY29uc3QgZm9ybVByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtX19wcmlvcml0eV9fY2hlY2tib3hcIik7XG5jb25zdCBmb3JtUHJpb3JpdHlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICBcIi5mb3JtX19wcmlvcml0eV9fY29udGFpbmVyXCJcbik7XG5cbi8vIC0tIE1BSU4gQVBQXG5jb25zdCBsb2dvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb2dvX19jb250YWluZXJcIik7XG5jb25zdCBhY3RpdmVMaXN0V2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLWFwcFwiKTtcbmNvbnN0IGFjdGl2ZUxpc3RIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjdGl2ZS1saXN0X19oZWFkZXJcIik7XG5jb25zdCBhY3RpdmVMaXN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjdGl2ZS1saXN0X190aXRsZVwiKTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBEUlkgRlVOQ1RJT05TXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuY29uc3QgZmluZEl0ZW1JbmRleCA9IGZ1bmN0aW9uIChjbGlja2VkKSB7XG4gIGNvbnN0IHRhc2tJRCA9ICtjbGlja2VkLmNsb3Nlc3QoXCIudGFza2l0ZW1cIikuaWQ7XG4gIHJldHVybiBhY3RpdmVMaXN0Lml0ZW1zLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gdGFza0lEKTtcbn07XG5cbmNvbnN0IHVwZGF0ZVVJID0gZnVuY3Rpb24gKCkge1xuICAvLyBDbGVhciB2aXNpYmxlIGxpc3QgdG8gYWxsb3cgZm9yIHVwZGF0ZVxuICB3aGlsZSAoYWN0aXZlTGlzdFdpbmRvdy5jaGlsZHJlbi5sZW5ndGggPiAxKSB7XG4gICAgYWN0aXZlTGlzdFdpbmRvdy5yZW1vdmVDaGlsZChhY3RpdmVMaXN0V2luZG93Lmxhc3RDaGlsZCk7XG4gIH1cblxuICBjb25zdCBjb3B5TGlzdCA9IGFjdGl2ZUxpc3QuaXRlbXMuc2xpY2UoKTtcbiAgY29weUxpc3QucmV2ZXJzZSgpO1xuXG4gIGNvcHlMaXN0LmZvckVhY2goKHRhc2spID0+IHtcbiAgICBhZGRUYXNrKFxuICAgICAgYWN0aXZlTGlzdEhlYWRlcixcbiAgICAgIHRhc2sudGl0bGUsXG4gICAgICB0YXNrLmRhdGVEdWUsXG4gICAgICB0YXNrLnByaW9yaXR5LFxuICAgICAgdGFzay5pZCxcbiAgICAgIHRhc2suY29tcGxldGVkXG4gICAgKTtcbiAgfSk7XG59O1xuXG5jb25zdCBjb252ZXJ0RGF0ZVRvVVRDID0gZnVuY3Rpb24gKGRhdGUpIHtcbiAgK0RhdGUucGFyc2UoZGF0ZSk7XG59O1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIEhFQURFUlxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiAtLS0tLS0tLS0tIEJVVFRPTlMgLS0tLS0tLS0tLVxuLy8qIFNJREVCQVIgVE9HR0xFXG5idG5MaXN0c01lbnUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgdG9nZ2xlU2lkZWJhcihzaWRlYmFyLCBsaXN0c01lbnVFbmRCYXJzLCBsaXN0c01lbnVNaWRCYXIxLCBsaXN0c01lbnVNaWRCYXIyKTtcbn0pO1xuXG4vLyogQUREIFRBU0sgT1BFTlxuYnRuQWRkVGFzay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBmb3JtVGl0bGUudGV4dENvbnRlbnQgPSBcIkFkZCBUYXNrXCI7XG4gIGJ0bkZvcm1TdWJtaXQudmFsdWUgPSBcIkFkZCBUYXNrXCI7XG4gIGZvcm1Qcmlvcml0eUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwiaW52aXNpYmxlXCIpO1xuICBmb3JtLnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtdGFza2lkXCIpO1xuICB0b2dnbGVIaWRlRWwoZm9ybSk7XG4gIGZvcm1UYXNrVGl0bGUuZm9jdXMoKTtcbn0pO1xuXG4vLyogQUNUSVZFTElTVCBIRUFERVIgQlVUVE9OU1xuYWN0aXZlTGlzdEhlYWRlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgY29uc3Qgb3BlblNvcnRPcHRzID0gZS50YXJnZXQuY2xvc2VzdChcIi5idG5fX3Nob3dfX3NvcnQtb3B0c1wiKTtcbiAgY29uc3Qgc29ydERpckZsaXAgPSBlLnRhcmdldC5jbG9zZXN0KFwiLmJ0bl9fYWN0aXZlLWxpc3RfX3NvcnQtZGlyXCIpO1xuICBjb25zdCBjbGVhckNvbXBsZXRlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIuYnRuX19jbGVhci1jb21wbFwiKTtcblxuICBpZiAoIW9wZW5Tb3J0T3B0cyAmJiAhc29ydERpckZsaXAgJiYgIWNsZWFyQ29tcGxldGVkKSByZXR1cm47XG5cbiAgLy8gT3BlbiBzb3J0aW5nIG9wdGlvbnMgbWVudVxuICBpZiAob3BlblNvcnRPcHRzKSBzb3J0T3B0c0NvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKFwic2hvdy1zb3J0LW9wdHNcIik7XG5cbiAgLy8gRmxpcCBTb3J0IERpcmVjdGlvbnNcbiAgaWYgKHNvcnREaXJGbGlwKSB7XG4gICAgYWN0aXZlTGlzdC5pdGVtcy5yZXZlcnNlKCk7XG4gICAgdXBkYXRlVUkoKTtcbiAgfVxuXG4gIC8vIENsZWFyIENvbXBsZXRlZFxuICBpZiAoY2xlYXJDb21wbGV0ZWQpIHtcbiAgICBhY3RpdmVMaXN0Ll9jbGVhckNvbXBsZXRlZFRhc2tzKCk7XG4gICAgdXBkYXRlVUkoKTtcbiAgfVxufSk7XG5cbi8vKiBTT1JUIE9QVElPTlNcbnNvcnRPcHRzQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBjb25zdCBjbGlja2VkID0gZS50YXJnZXQuY2xvc2VzdChcIi5zb3J0YnlfX29wdHNfX2l0ZW1cIik7XG5cbiAgc29ydE9wdHNDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZShcInNob3ctc29ydC1vcHRzXCIpO1xuXG4gIGlmICghY2xpY2tlZCkgcmV0dXJuO1xuICAvLyBTb3J0IG9yZGVyIGZvciBDb21wbGV0ZWRcbiAgZWxzZSBpZiAoY2xpY2tlZC5kYXRhc2V0LnNvcnRpZCA9PT0gXCJjb21wbGV0ZWRcIilcbiAgICBhY3RpdmVMaXN0Lml0ZW1zLnNvcnQoXG4gICAgICAoYSwgYikgPT4gYVtjbGlja2VkLmRhdGFzZXQuc29ydGlkXSAtIGJbY2xpY2tlZC5kYXRhc2V0LnNvcnRpZF1cbiAgICApO1xuICAvLyBTb3J0IG9yZGVyIGZvciBEYXRlIER1ZVxuICBlbHNlIGlmIChjbGlja2VkLmRhdGFzZXQuc29ydGlkID09PSBcImRhdGVEdWVcIikge1xuICAgIGNvbnNvbGUubG9nKGFjdGl2ZUxpc3QuaXRlbXNbMF0uZGF0ZUR1ZSk7XG4gICAgY29uc29sZS5sb2coRGF0ZS5wYXJzZShhY3RpdmVMaXN0Lml0ZW1zWzBdLmRhdGVEdWUpKTtcblxuICAgIGFjdGl2ZUxpc3QuaXRlbXMuc29ydChcbiAgICAgIChhLCBiKSA9PlxuICAgICAgICBEYXRlLnBhcnNlKGFbY2xpY2tlZC5kYXRhc2V0LnNvcnRpZF0pIC1cbiAgICAgICAgRGF0ZS5wYXJzZShiW2NsaWNrZWQuZGF0YXNldC5zb3J0aWRdKVxuICAgICk7XG4gIH1cblxuICAvLyBTb3J0IG9yZGVyIGZvciBEYXRlIENyZWF0ZWQgJiYgUHJpb3JpdHlcbiAgZWxzZVxuICAgIGFjdGl2ZUxpc3QuaXRlbXMuc29ydChcbiAgICAgIChhLCBiKSA9PiBiW2NsaWNrZWQuZGF0YXNldC5zb3J0aWRdIC0gYVtjbGlja2VkLmRhdGFzZXQuc29ydGlkXVxuICAgICk7XG5cbiAgdXBkYXRlVUkoKTtcbn0pO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIFRBU0tcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogLS0tLS0tLS0tLSBCVVRUT05TIC0tLS0tLS0tLS1cbi8vKiBDT01QTEVURUQgVEFTSyBDSEVDS0JPWFxuYWN0aXZlTGlzdFdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgY29uc3QgY2xpY2tlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIudGFza2l0ZW1fX2NoZWNrYm94XCIpO1xuICBpZiAoIWNsaWNrZWQpIHJldHVybjtcblxuICBjb25zdCBpdGVtSW5kZXggPSBmaW5kSXRlbUluZGV4KGNsaWNrZWQpO1xuXG4gIC8vIERhdGEgQ2hhbmdlXG4gIGFjdGl2ZUxpc3QuaXRlbXNbaXRlbUluZGV4XS50b2dnbGVDb21wbGV0ZWQoKTtcblxuICAvLyBWaXN1YWwgQ2hhbmdlXG4gIHRvZ2dsZVRhc2tDb21wbGV0ZWREdWVEYXRlKGNsaWNrZWQsIGFjdGl2ZUxpc3QsIGl0ZW1JbmRleCk7XG5cbiAgaWYgKGNsaWNrZWQuY2hlY2tlZCkge1xuICAgIGRpbUNvbXBsZXRlZFRhc2tzKGNsaWNrZWQpO1xuICB9XG5cbiAgLy8gVW5kbyBDaGFuZ2UgY29tcGxldGVkIHRhc2sgdmlzdWFsXG4gIGlmICghY2xpY2tlZC5jaGVja2VkKSB1bmRvQ29tcGxldGVkRGltKGNsaWNrZWQpO1xuXG4gIGNvbnNvbGUudGFibGUoYWN0aXZlTGlzdC5pdGVtcyk7XG59KTtcblxuLy8qIE9QRU4gVEFTSyBERVRBSUxTXG5hY3RpdmVMaXN0V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBjb25zdCBjbGlja2VkID0gZS50YXJnZXQuY2xvc2VzdChcIi5idG5fX2RldGFpbHNcIik7XG5cbiAgaWYgKCFjbGlja2VkKSByZXR1cm47XG5cbiAgY29uc3QgdGFza0lEID0gK2NsaWNrZWQuY2xvc2VzdChcIi50YXNraXRlbVwiKS5pZDtcbiAgY29uc3QgdGFza0luQXJyID0gYWN0aXZlTGlzdC5pdGVtcy5maWx0ZXIoKHRhc2spID0+IHRhc2suaWQgPT09IHRhc2tJRCk7XG5cbiAgLy8gVG9nZ2xlIHRhc2sgZGV0YWlscyBvcGVuIG9uIGNsaWNrXG4gIHRvZ2dsZVRhc2tEZXRhaWxzQnRuKGNsaWNrZWQpO1xuICB0b2dnbGVJbmFjdGl2ZURldGFpbHNCdG5zKGUpO1xuICBleHBhbmRTZWxlY3RlZERldGFpbHMoXG4gICAgY2xpY2tlZCxcbiAgICB0YXNrSW5BcnJbMF0ucHJpb3JpdHksXG4gICAgdGFza0luQXJyWzBdLmRlc2MsXG4gICAgdGFza0luQXJyWzBdLmNvbXBsZXRlZCxcbiAgICB0YXNrSW5BcnJbMF0uZGF0ZUR1ZVxuICApO1xuICBoaWRlTm9uU2VsZWN0ZWREZXRhaWxzKGNsaWNrZWQpO1xufSk7XG5cbi8vKiBDSEFOR0UgUFJJT1JJVFkgQ0hFQ0tCT1hcbmFjdGl2ZUxpc3RXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGNvbnN0IGNsaWNrZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiLnRhc2tpdGVtX19wcmlvcml0eS1jaGVja19fY2hlY2tib3hcIik7XG4gIGlmICghY2xpY2tlZCkgcmV0dXJuO1xuXG4gIGNvbnN0IGl0ZW1JbmRleCA9IGZpbmRJdGVtSW5kZXgoY2xpY2tlZCk7XG5cbiAgLy8gRGF0YSBDaGFuZ2VcbiAgYWN0aXZlTGlzdC5pdGVtc1tpdGVtSW5kZXhdLnRvZ2dsZVByaW9yaXR5KCk7XG5cbiAgLy8gVmlzdWFsIENoYW5nZVxuICBpZiAoY2xpY2tlZC5jaGVja2VkKSBhZGRQcmlvcml0eVZpc3VhbChjbGlja2VkKTtcblxuICBpZiAoIWNsaWNrZWQuY2hlY2tlZCkgcmVtb3ZlUHJpb3JpdHlWaXN1YWwoY2xpY2tlZCk7XG59KTtcblxuLy8qIEVESVQgVEFTS1xuYWN0aXZlTGlzdFdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgY29uc3QgY2xpY2tlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIuYnRuX190YXNraXRlbV9fZWRpdFwiKTtcbiAgaWYgKCFjbGlja2VkKSByZXR1cm47XG5cbiAgY29uc3QgaXRlbUluZGV4ID0gZmluZEl0ZW1JbmRleChjbGlja2VkKTtcblxuICBmb3JtVGl0bGUudGV4dENvbnRlbnQgPSBcIkVkaXQgVGFza1wiO1xuICBidG5Gb3JtU3VibWl0LnZhbHVlID0gXCJFZGl0IFRhc2tcIjtcbiAgZm9ybVByaW9yaXR5Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJpbnZpc2libGVcIik7XG5cbiAgLy8gUG9wdWxhdGUgZm9ybSB3aXRoIGFyciBpbmZvXG4gIGZvcm1UYXNrVGl0bGUudmFsdWUgPSBhY3RpdmVMaXN0Lml0ZW1zW2l0ZW1JbmRleF0udGl0bGU7XG4gIGZvcm1EdWUudmFsdWUgPSBhY3RpdmVMaXN0Lml0ZW1zW2l0ZW1JbmRleF0uZGF0ZUR1ZTtcbiAgZm9ybURlc2MudmFsdWUgPSBhY3RpdmVMaXN0Lml0ZW1zW2l0ZW1JbmRleF0uZGVzYztcblxuICAvLyBBZGQgZGF0YSBhdHRyaWJ1dGUgdG8gdHJhY2sgYXJyIGl0ZW0gcGxhY2VtZW50XG4gIGZvcm0uc2V0QXR0cmlidXRlKFwiZGF0YS10YXNraWRcIiwgYWN0aXZlTGlzdC5pdGVtc1tpdGVtSW5kZXhdLmlkKTtcblxuICB0b2dnbGVIaWRlRWwoZm9ybSk7XG59KTtcblxuLy8qIERFTEVURSBUQVNLXG5hY3RpdmVMaXN0V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBjb25zdCBjbGlja2VkID0gZS50YXJnZXQuY2xvc2VzdChcImJ0bl9fdGFza2l0ZW1fX2RlbGV0ZVwiKTtcbiAgaWYgKCFjbGlja2VkKSByZXR1cm47XG59KTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBTSURFQkFSXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIC0tLS0tLS0tLS0gQlVUVE9OUyAtLS0tLS0tLS0tXG4vLyogU0lERUJBUiBMSVNUIE9QVElPTlNcbmJ0bkFkZExpc3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIHRvZ2dsZVNpZGViYXJOZXdMaXN0VGl0bGUoc2lkZWJhckFkZExpc3RUaXRsZSk7XG4gIHRvZ2dsZUJ1dHRvblNwaW4oYnRuQWRkTGlzdCk7XG59KTtcblxuc2lkZWJhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgY29uc3QgY2xpY2tlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIuYnRuX19saXN0aXRlbV9fb3B0aW9uc1wiKTtcbiAgaWYgKCFjbGlja2VkKSByZXR1cm47XG5cbiAgdG9nZ2xlU2lkZWJhckxpc3RPcHRpb25zKGNsaWNrZWQpO1xufSk7XG5cbnNpZGViYXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGNvbnN0IGNsaWNrZWRUcmFzaCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIuYnRuX19saXN0aXRlbS0tZGVsXCIpO1xuICBjb25zdCBjbGlja2VkQXJyb3dVcCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIuYnRuX19saXN0aXRlbS0tdXBcIik7XG4gIGNvbnN0IGNsaWNrZWRBcnJvd0Rvd24gPSBlLnRhcmdldC5jbG9zZXN0KFwiLmJ0bl9fbGlzdGl0ZW0tLWRvd25cIik7XG5cbiAgaWYgKCFjbGlja2VkVHJhc2ggJiYgIWNsaWNrZWRBcnJvd1VwICYmICFjbGlja2VkQXJyb3dEb3duKSByZXR1cm47XG5cbiAgaWYgKGNsaWNrZWRUcmFzaCB8fCBjbGlja2VkQXJyb3dVcCB8fCBjbGlja2VkQXJyb3dEb3duKSB7XG4gICAgY29uc3QgY2xpY2tlZCA9IGNsaWNrZWRUcmFzaCB8fCBjbGlja2VkQXJyb3dVcCB8fCBjbGlja2VkQXJyb3dEb3duO1xuICAgIGhpZGVTaWRlYmFyTGlzdE9wdGlvbnMoY2xpY2tlZCk7XG4gIH1cbn0pO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIEZPUk1cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5mb3JtVGFza1RpdGxlLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCAoKSA9PiB7XG4gIHJlbW92ZUVycm9yT3V0bGluZShmb3JtVGFza1RpdGxlKTtcbn0pO1xuXG4vLyogLS0tLS0tLS0tLSBCVVRUT05TIC0tLS0tLS0tLS1cbmJ0bkZvcm1DbG9zZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICB0b2dnbGVIaWRlRWwoZm9ybSk7XG4gIGNsZWFyRm9ybShmb3JtVGFza1RpdGxlLCBmb3JtRHVlLCBmb3JtRGVzYywgZm9ybVByaW9yaXR5KTtcbn0pO1xuXG5idG5Gb3JtU3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgLy8gRXJyb3IgaWYgVGFzayB0aXRsZSBub3QgZGVzaWduYXRlZFxuICBpZiAoZm9ybVRhc2tUaXRsZS52YWx1ZSA9PT0gXCJcIikge1xuICAgIGFkZEVycm9yT3V0bGluZShmb3JtVGFza1RpdGxlKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoIWZvcm0uaGFzQXR0cmlidXRlKFwiZGF0YS10YXNraWRcIikpIHtcbiAgICBmb3JtVGFza1RpdGxlLmJsdXIoKTtcblxuICAgIC8vIEFkZCB0YXNrIHRvIGFycmF5XG4gICAgYWN0aXZlTGlzdC5hZGRJdGVtKFxuICAgICAgZm9ybVRhc2tUaXRsZS52YWx1ZSxcbiAgICAgIGZvcm1EZXNjLnZhbHVlLFxuICAgICAgZm9ybUR1ZS52YWx1ZSxcbiAgICAgIGZvcm1Qcmlvcml0eS5jaGVja2VkXG4gICAgKTtcblxuICAgIC8vIEFkZCB0YXNrIHRvIERPTVxuICAgIGFkZFRhc2soXG4gICAgICBhY3RpdmVMaXN0SGVhZGVyLFxuICAgICAgYWN0aXZlTGlzdC5pdGVtc1swXS50aXRsZSxcbiAgICAgIGFjdGl2ZUxpc3QuaXRlbXNbMF0uZGF0ZUR1ZSxcbiAgICAgIGFjdGl2ZUxpc3QuaXRlbXNbMF0ucHJpb3JpdHksXG4gICAgICBhY3RpdmVMaXN0Lml0ZW1zWzBdLmlkLFxuICAgICAgYWN0aXZlTGlzdC5pdGVtc1swXS5jb21wbGV0ZWRcbiAgICApO1xuICB9XG5cbiAgaWYgKGZvcm0uaGFzQXR0cmlidXRlKFwiZGF0YS10YXNraWRcIikpIHtcbiAgICBmb3JtVGFza1RpdGxlLmJsdXIoKTtcblxuICAgIGNvbnN0IGN1clRhc2tJbmRleCA9IGFjdGl2ZUxpc3QuaXRlbXMuZmluZEluZGV4KFxuICAgICAgKGl0ZW0pID0+IGl0ZW0uaWQgPT09ICtmb3JtLmRhdGFzZXQudGFza2lkXG4gICAgKTtcbiAgICBhY3RpdmVMaXN0Lml0ZW1zW2N1clRhc2tJbmRleF0udGl0bGUgPSBmb3JtVGFza1RpdGxlLnZhbHVlO1xuICAgIGFjdGl2ZUxpc3QuaXRlbXNbY3VyVGFza0luZGV4XS5kZXNjID0gZm9ybURlc2MudmFsdWU7XG4gICAgYWN0aXZlTGlzdC5pdGVtc1tjdXJUYXNrSW5kZXhdLmRhdGVEdWUgPSBmb3JtRHVlLnZhbHVlO1xuXG4gICAgdXBkYXRlVUkoKTtcbiAgfVxuXG4gIC8vIEhpZGUgYW5kIHJlc2V0IGZvcm1cbiAgdG9nZ2xlSGlkZUVsKGZvcm0pO1xuICBjbGVhckZvcm0oZm9ybVRhc2tUaXRsZSwgZm9ybUR1ZSwgZm9ybURlc2MsIGZvcm1Qcmlvcml0eSk7XG59KTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBBUFAgTE9HSUNcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyBJbml0aWFsaXplIE1hc3RlciBMaXN0XG5jb25zdCBtYXN0ZXJMaXN0ID0gbmV3IE1hc3Rlckxpc3QoKTtcblxuLy8gQWRkIERlZmF1bHQgTGlzdCB0byBNYXN0ZXIgTGlzdFxubWFzdGVyTGlzdC5hZGRJdGVtKFwiTWFpbiBMaXN0XCIpO1xuXG4vLyBBZGQgRGVmYXVsdCBsaXN0IHRvIHNpZGViYXJcbmFkZExpc3Qoc2lkZWJhckhlYWRlciwgbWFzdGVyTGlzdC5pdGVtc1swXS50aXRsZSwgMCk7XG5cbi8vIFVwZGF0ZSBhY3RpdmVMaXN0IHZpc3VhbFxubGV0IGFjdGl2ZUxpc3QgPSBtYXN0ZXJMaXN0Lml0ZW1zWzBdO1xudXBkYXRlQWN0aXZlTGlzdFRpdGxlKGFjdGl2ZUxpc3RUaXRsZSwgYWN0aXZlTGlzdC50aXRsZSk7XG5cbi8vISBURVNUSU5HIEFSRUEgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5sb2dvLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGNvbnNvbGUudGFibGUoRGF0ZS5wYXJzZShhY3RpdmVMaXN0Lml0ZW1zWzBdLmRhdGVEdWUpKTtcbn0pO1xuXG5mb3JtVGl0bGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHt9KTtcblxuYWN0aXZlTGlzdEhlYWRlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge30pO1xuXG4vKipcbiAqXG4gKlxuICpcbiAqXG4gKlxuICpcbiAqXG4gKi9cblxuLypcbi8vIFRFU1QgU0FNUExFU1xuLy8gQ3JlYXRlIE1hc3RlciBMaXN0XG5jb25zdCBtYXN0ZXJMaXN0ID0gbmV3IE1hc3Rlckxpc3QoKTtcblxuLy8gQWRkIExpc3RzIHRvIE1hc3RlciBMaXN0XG5tYXN0ZXJMaXN0LmFkZEl0ZW0oXCJUZXN0IExpc3RcIik7XG5tYXN0ZXJMaXN0LmFkZEl0ZW0oXCJBIFRlc3QgTGlzdCAyXCIpO1xubWFzdGVyTGlzdC5hZGRJdGVtKFwiVGVzdCBMaXN0IDNcIik7XG5tYXN0ZXJMaXN0LmFkZEl0ZW0oXCJUZXN0IExpc3QgNFwiKTtcblxuLy8gQWRkIFRhc2tzIHRvIExpc3QgaW4gTWFzdGVyIExpc3Rcbm1hc3Rlckxpc3QuaXRlbXNbMF0uYWRkSXRlbShcInRlc3QxXCIsIFwiYSB0ZXN0MSBkZXNjXCIsIFwiOC4xMFwiKTtcbm1hc3Rlckxpc3QuaXRlbXNbMF0uYWRkSXRlbShcInRlc3QyXCIsIFwiYiB0ZXN0MiBkZXNjXCIsIFwiOC4wOFwiKTtcbm1hc3Rlckxpc3QuaXRlbXNbMF0uYWRkSXRlbShcInRlc3QzXCIsIFwiYyB0ZXN0MyBkZXNjXCIsIFwiNy4xNlwiKTtcbm1hc3Rlckxpc3QuaXRlbXNbMF0uYWRkSXRlbShcInRlc3Q0XCIsIFwiZCB0ZXN0NCBkZXNjXCIsIFwiMTIuMjJcIik7XG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLmFkZEl0ZW0oXCJ0ZXN0NVwiLCBcImUgdGVzdDUgZGVzY1wiLCBcIjMuMjJcIik7XG5cbi8vIG1hc3Rlckxpc3QuaXRlbXNbMF0uaXRlbXNbMV0uY29tcGxldGVkID0gdHJ1ZTtcbm1hc3Rlckxpc3QuaXRlbXNbMF0uaXRlbXNbMV0uZGF0ZUNyZWF0ZWQgPSAxMDA7XG4vLyBtYXN0ZXJMaXN0Lml0ZW1zWzBdLml0ZW1zWzRdLmNvbXBsZXRlZCA9IHRydWU7XG5cbmNvbnNvbGUubG9nKG1hc3Rlckxpc3QuaXRlbXNbMF0uaXRlbXMpO1xuXG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLml0ZW1zWzRdLnRvZ2dsZUNvbXBsZXRlZCgpO1xuXG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLml0ZW1zWzFdLnRvZ2dsZVByaW9yaXR5KCk7XG5jb25zb2xlLnRhYmxlKG1hc3Rlckxpc3QuaXRlbXNbMF0uaXRlbXMpO1xuKi9cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==