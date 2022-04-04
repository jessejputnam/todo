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
/* harmony export */   "removeErrorOutline": () => (/* binding */ removeErrorOutline),
/* harmony export */   "removePriorityVisual": () => (/* binding */ removePriorityVisual),
/* harmony export */   "toggleButtonSpin": () => (/* binding */ toggleButtonSpin),
/* harmony export */   "toggleHideEl": () => (/* binding */ toggleHideEl),
/* harmony export */   "toggleInactiveDetailsBtns": () => (/* binding */ toggleInactiveDetailsBtns),
/* harmony export */   "toggleSidebar": () => (/* binding */ toggleSidebar),
/* harmony export */   "toggleSidebarListOptions": () => (/* binding */ toggleSidebarListOptions),
/* harmony export */   "toggleSidebarNewListTitle": () => (/* binding */ toggleSidebarNewListTitle),
/* harmony export */   "toggleTaskDetailsBtn": () => (/* binding */ toggleTaskDetailsBtn),
/* harmony export */   "undoCompletedDim": () => (/* binding */ undoCompletedDim),
/* harmony export */   "updateActiveListUI": () => (/* binding */ updateActiveListUI)
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
const updateActiveListUI = function (listNameEl, listName) {
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

    if (diff === 0) {
      return "Today";
    }
    if (diff === 1) {
      return "Tomorrow";
    }

    return `Due in ${diff} days`;
  }
};

const addTask = function (el, title, dateDue, priority, id) {
  const htmlTaskItem = `
  <div id=${id} class="taskitem${priority === true ? " priority--true" : ""}">
    <div class="taskitem__abbr">
      <input
        type="checkbox"
        name="completed-checkbox"
        class="taskitem__checkbox"
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
          class="btn btn__details"
        />
      </div>
    </div>
  </div>
`;

  el.insertAdjacentHTML("afterend", htmlTaskItem);
};




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
const checkboxTaskComplete =
  document.getElementsByClassName("taskitem__checkbox");
const btnTaskDetails = document.getElementsByClassName("btn__details");
const checkboxPriority = document.getElementsByClassName(
  "taskitem__priority-check__checkbox"
);
const btnEditTask = document.getElementsByClassName("btn__taskitem__edit");
const btnDelTask = document.getElementsByClassName("btn__taskitem__delete");

// ---- Sidebar
const btnAddList = document.querySelector(".btn__sidebar__add-list");
const btnListsOpts = document.getElementsByClassName("btn__listitem__options");

// ---- Form
const btnFormClose = document.querySelector(".btn__form-close");
const btnFormSubmit = document.querySelector(".btn__form-submit");

// SIDEBAR
const sidebar = document.querySelector(".sidebar");
const sidebarHeader = document.querySelector(".sidebar__header");
const sidebarAddListTitle = document.querySelector(
  ".sidebar__add-list__add-title__container"
);
const listItems = document.getElementsByClassName("sidebar__listitem");
const listItemsOptionsMenu = document.getElementsByClassName(
  "listitem__options__menu__container"
);

// FORM
const form = document.querySelector(".form");
const formTitle = document.querySelector(".form__text--title");
const formDue = document.querySelector(".form__date");
const formDesc = document.querySelector(".form__text-area");
const formPriority = document.querySelector(".form__priority__checkbox");

// -- MAIN APP
const activeListWindow = document.querySelector(".main-app");
const activeListTitle = document.querySelector(".active-list__title");
const taskItems = document.getElementsByClassName("taskitem");

/* ************************************************** */
//* DRY FUNCTIONS
/* ************************************************** */

/* ************************************************** */
//* HEADER
/* ************************************************** */
//? ---------- BUTTONS ----------
// SIDEBAR TOGGLE
btnListsMenu.addEventListener("click", () => {
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.toggleSidebar)(sidebar, listsMenuEndBars, listsMenuMidBar1, listsMenuMidBar2);
});

// ADD TASK OPEN
btnAddTask.addEventListener("click", () => {
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.toggleHideEl)(form);
});

/* ************************************************** */
//* TASK
/* ************************************************** */
//? ---------- BUTTONS ----------
// Change completed task checkbox
activeListWindow.addEventListener("click", (e) => {
  const clicked = e.target.closest(".taskitem__checkbox");
  if (!clicked) return;

  const taskID = +clicked.parentElement.parentElement.id;
  const itemIndex = activeList.items.findIndex((item) => item.id === taskID);

  // Data Change
  activeList.items[itemIndex].toggleCompleted();

  // Visual Change

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

  if (clicked.checked) {
    (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.dimCompletedTasks)(clicked);
  }

  // Undo Change completed task visual
  if (!clicked.checked) (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.undoCompletedDim)(clicked);
});

// Visual for open task details button
activeListWindow.addEventListener("click", (e) => {
  const clicked = e.target.closest(".btn__details");

  if (!clicked) return;

  const taskID = +clicked.parentElement.parentElement.parentElement.id;
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

// Change priority checkbox
activeListWindow.addEventListener("click", (e) => {
  const clicked = e.target.closest(".taskitem__priority-check__checkbox");

  if (!clicked) return;
  const taskID =
    +clicked.parentElement.parentElement.parentElement.parentElement
      .parentElement.id;
  const itemIndex = activeList.items.findIndex((item) => item.id === taskID);

  // Data Change
  activeList.items[itemIndex].togglePriority();

  // Visual Change
  if (clicked.checked) (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.addPriorityVisual)(clicked);

  if (!clicked.checked) (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.removePriorityVisual)(clicked);
});

/* ************************************************** */
//* SIDEBAR
/* ************************************************** */
//? ---------- BUTTONS ----------
// Sidebar lists options
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
formTitle.addEventListener("focus", () => {
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.removeErrorOutline)(formTitle);
});

//? ---------- BUTTONS ----------
btnFormClose.addEventListener("click", () => {
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.toggleHideEl)(form);
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.clearForm)(formTitle, formDue, formDesc, formPriority);
});

btnFormSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  // Error if Task title not designated
  if (formTitle.value === "") {
    (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.addErrorOutline)(formTitle);
    return;
  }

  // Add task to array
  activeList.addItem(
    formTitle.value,
    formDesc.value,
    formDue.value,
    formPriority.checked
  );

  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.addTask)(
    activeListTitle,
    activeList.items[0].title,
    activeList.items[0].dateDue,
    activeList.items[0].priority,
    activeList.items[0].id
  );

  // console.log(activeListWindow.children);

  // while (activeListWindow.children > 1) {
  //   activeListWindow.removeChild(activeListWindow.lastElementChild);
  // }

  // activeList.items.forEach((task) => {});

  // console.table(activeList.items);

  // Hide and reset form
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.toggleHideEl)(form);
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.clearForm)(formTitle, formDue, formDesc, formPriority);
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
(0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.updateActiveListUI)(activeListTitle, activeList.title);

//TESTING AREa

// const date = "2023-04-05";
// console.log(new Date());

// console.log(date);

// console.log(daysLeft(date));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFa0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzSHJCOztBQUU2RDs7QUFFMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztB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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxFQUFFLG1EQUFPO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwwQ0FBMEM7O0FBRTFDOztBQUVBO0FBQ0EsRUFBRSx3REFBWTtBQUNkLEVBQUUscURBQVM7QUFDWCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNEQUFVOztBQUVqQztBQUNBOztBQUVBO0FBQ0EsbURBQU87O0FBRVA7QUFDQTtBQUNBLDhEQUFrQjs7QUFFbEI7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9jb21wYXJlQXNjL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2RpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9zdGFydE9mRGF5L2luZGV4LmpzIiwid2VicGFjazovL3RvZG8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL3RvRGF0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL3RvZG8tbG9naWMuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy92aXN1YWwuanMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBHb29nbGUgQ2hyb21lIGFzIG9mIDY3LjAuMzM5Ni44NyBpbnRyb2R1Y2VkIHRpbWV6b25lcyB3aXRoIG9mZnNldCB0aGF0IGluY2x1ZGVzIHNlY29uZHMuXG4gKiBUaGV5IHVzdWFsbHkgYXBwZWFyIGZvciBkYXRlcyB0aGF0IGRlbm90ZSB0aW1lIGJlZm9yZSB0aGUgdGltZXpvbmVzIHdlcmUgaW50cm9kdWNlZFxuICogKGUuZy4gZm9yICdFdXJvcGUvUHJhZ3VlJyB0aW1lem9uZSB0aGUgb2Zmc2V0IGlzIEdNVCswMDo1Nzo0NCBiZWZvcmUgMSBPY3RvYmVyIDE4OTFcbiAqIGFuZCBHTVQrMDE6MDA6MDAgYWZ0ZXIgdGhhdCBkYXRlKVxuICpcbiAqIERhdGUjZ2V0VGltZXpvbmVPZmZzZXQgcmV0dXJucyB0aGUgb2Zmc2V0IGluIG1pbnV0ZXMgYW5kIHdvdWxkIHJldHVybiA1NyBmb3IgdGhlIGV4YW1wbGUgYWJvdmUsXG4gKiB3aGljaCB3b3VsZCBsZWFkIHRvIGluY29ycmVjdCBjYWxjdWxhdGlvbnMuXG4gKlxuICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSB0aW1lem9uZSBvZmZzZXQgaW4gbWlsbGlzZWNvbmRzIHRoYXQgdGFrZXMgc2Vjb25kcyBpbiBhY2NvdW50LlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzKGRhdGUpIHtcbiAgdmFyIHV0Y0RhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQyhkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCksIGRhdGUuZ2V0SG91cnMoKSwgZGF0ZS5nZXRNaW51dGVzKCksIGRhdGUuZ2V0U2Vjb25kcygpLCBkYXRlLmdldE1pbGxpc2Vjb25kcygpKSk7XG4gIHV0Y0RhdGUuc2V0VVRDRnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpKTtcbiAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpIC0gdXRjRGF0ZS5nZXRUaW1lKCk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVxdWlyZWRBcmdzKHJlcXVpcmVkLCBhcmdzKSB7XG4gIGlmIChhcmdzLmxlbmd0aCA8IHJlcXVpcmVkKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihyZXF1aXJlZCArICcgYXJndW1lbnQnICsgKHJlcXVpcmVkID4gMSA/ICdzJyA6ICcnKSArICcgcmVxdWlyZWQsIGJ1dCBvbmx5ICcgKyBhcmdzLmxlbmd0aCArICcgcHJlc2VudCcpO1xuICB9XG59IiwiaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBjb21wYXJlQXNjXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENvbXBhcmUgdGhlIHR3byBkYXRlcyBhbmQgcmV0dXJuIC0xLCAwIG9yIDEuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb21wYXJlIHRoZSB0d28gZGF0ZXMgYW5kIHJldHVybiAxIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGFmdGVyIHRoZSBzZWNvbmQsXG4gKiAtMSBpZiB0aGUgZmlyc3QgZGF0ZSBpcyBiZWZvcmUgdGhlIHNlY29uZCBvciAwIGlmIGRhdGVzIGFyZSBlcXVhbC5cbiAqXG4gKiAjIyMgdjIuMC4wIGJyZWFraW5nIGNoYW5nZXM6XG4gKlxuICogLSBbQ2hhbmdlcyB0aGF0IGFyZSBjb21tb24gZm9yIHRoZSB3aG9sZSBsaWJyYXJ5XShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91cGdyYWRlR3VpZGUubWQjQ29tbW9uLUNoYW5nZXMpLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGVMZWZ0IC0gdGhlIGZpcnN0IGRhdGUgdG8gY29tcGFyZVxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIHNlY29uZCBkYXRlIHRvIGNvbXBhcmVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSByZXN1bHQgb2YgdGhlIGNvbXBhcmlzb25cbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMiBhcmd1bWVudHMgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ29tcGFyZSAxMSBGZWJydWFyeSAxOTg3IGFuZCAxMCBKdWx5IDE5ODk6XG4gKiBjb25zdCByZXN1bHQgPSBjb21wYXJlQXNjKG5ldyBEYXRlKDE5ODcsIDEsIDExKSwgbmV3IERhdGUoMTk4OSwgNiwgMTApKVxuICogLy89PiAtMVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTb3J0IHRoZSBhcnJheSBvZiBkYXRlczpcbiAqIGNvbnN0IHJlc3VsdCA9IFtcbiAqICAgbmV3IERhdGUoMTk5NSwgNiwgMiksXG4gKiAgIG5ldyBEYXRlKDE5ODcsIDEsIDExKSxcbiAqICAgbmV3IERhdGUoMTk4OSwgNiwgMTApXG4gKiBdLnNvcnQoY29tcGFyZUFzYylcbiAqIC8vPT4gW1xuICogLy8gICBXZWQgRmViIDExIDE5ODcgMDA6MDA6MDAsXG4gKiAvLyAgIE1vbiBKdWwgMTAgMTk4OSAwMDowMDowMCxcbiAqIC8vICAgU3VuIEp1bCAwMiAxOTk1IDAwOjAwOjAwXG4gKiAvLyBdXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tcGFyZUFzYyhkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICByZXF1aXJlZEFyZ3MoMiwgYXJndW1lbnRzKTtcbiAgdmFyIGRhdGVMZWZ0ID0gdG9EYXRlKGRpcnR5RGF0ZUxlZnQpO1xuICB2YXIgZGF0ZVJpZ2h0ID0gdG9EYXRlKGRpcnR5RGF0ZVJpZ2h0KTtcbiAgdmFyIGRpZmYgPSBkYXRlTGVmdC5nZXRUaW1lKCkgLSBkYXRlUmlnaHQuZ2V0VGltZSgpO1xuXG4gIGlmIChkaWZmIDwgMCkge1xuICAgIHJldHVybiAtMTtcbiAgfSBlbHNlIGlmIChkaWZmID4gMCkge1xuICAgIHJldHVybiAxOyAvLyBSZXR1cm4gMCBpZiBkaWZmIGlzIDA7IHJldHVybiBOYU4gaWYgZGlmZiBpcyBOYU5cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZGlmZjtcbiAgfVxufSIsImltcG9ydCBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzIGZyb20gXCIuLi9fbGliL2dldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMvaW5kZXguanNcIjtcbmltcG9ydCBzdGFydE9mRGF5IGZyb20gXCIuLi9zdGFydE9mRGF5L2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xudmFyIE1JTExJU0VDT05EU19JTl9EQVkgPSA4NjQwMDAwMDtcbi8qKlxuICogQG5hbWUgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzXG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbnVtYmVyIG9mIGNhbGVuZGFyIGRheXMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIG51bWJlciBvZiBjYWxlbmRhciBkYXlzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLiBUaGlzIG1lYW5zIHRoYXQgdGhlIHRpbWVzIGFyZSByZW1vdmVkXG4gKiBmcm9tIHRoZSBkYXRlcyBhbmQgdGhlbiB0aGUgZGlmZmVyZW5jZSBpbiBkYXlzIGlzIGNhbGN1bGF0ZWQuXG4gKlxuICogIyMjIHYyLjAuMCBicmVha2luZyBjaGFuZ2VzOlxuICpcbiAqIC0gW0NoYW5nZXMgdGhhdCBhcmUgY29tbW9uIGZvciB0aGUgd2hvbGUgbGlicmFyeV0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdXBncmFkZUd1aWRlLm1kI0NvbW1vbi1DaGFuZ2VzKS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBsYXRlciBkYXRlXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlUmlnaHQgLSB0aGUgZWFybGllciBkYXRlXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgbnVtYmVyIG9mIGNhbGVuZGFyIGRheXNcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMiBhcmd1bWVudHMgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSG93IG1hbnkgY2FsZW5kYXIgZGF5cyBhcmUgYmV0d2VlblxuICogLy8gMiBKdWx5IDIwMTEgMjM6MDA6MDAgYW5kIDIgSnVseSAyMDEyIDAwOjAwOjAwP1xuICogY29uc3QgcmVzdWx0ID0gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKFxuICogICBuZXcgRGF0ZSgyMDEyLCA2LCAyLCAwLCAwKSxcbiAqICAgbmV3IERhdGUoMjAxMSwgNiwgMiwgMjMsIDApXG4gKiApXG4gKiAvLz0+IDM2NlxuICogLy8gSG93IG1hbnkgY2FsZW5kYXIgZGF5cyBhcmUgYmV0d2VlblxuICogLy8gMiBKdWx5IDIwMTEgMjM6NTk6MDAgYW5kIDMgSnVseSAyMDExIDAwOjAxOjAwP1xuICogY29uc3QgcmVzdWx0ID0gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKFxuICogICBuZXcgRGF0ZSgyMDExLCA2LCAzLCAwLCAxKSxcbiAqICAgbmV3IERhdGUoMjAxMSwgNiwgMiwgMjMsIDU5KVxuICogKVxuICogLy89PiAxXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGRpcnR5RGF0ZUxlZnQsIGRpcnR5RGF0ZVJpZ2h0KSB7XG4gIHJlcXVpcmVkQXJncygyLCBhcmd1bWVudHMpO1xuICB2YXIgc3RhcnRPZkRheUxlZnQgPSBzdGFydE9mRGF5KGRpcnR5RGF0ZUxlZnQpO1xuICB2YXIgc3RhcnRPZkRheVJpZ2h0ID0gc3RhcnRPZkRheShkaXJ0eURhdGVSaWdodCk7XG4gIHZhciB0aW1lc3RhbXBMZWZ0ID0gc3RhcnRPZkRheUxlZnQuZ2V0VGltZSgpIC0gZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyhzdGFydE9mRGF5TGVmdCk7XG4gIHZhciB0aW1lc3RhbXBSaWdodCA9IHN0YXJ0T2ZEYXlSaWdodC5nZXRUaW1lKCkgLSBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzKHN0YXJ0T2ZEYXlSaWdodCk7IC8vIFJvdW5kIHRoZSBudW1iZXIgb2YgZGF5cyB0byB0aGUgbmVhcmVzdCBpbnRlZ2VyXG4gIC8vIGJlY2F1c2UgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaW4gYSBkYXkgaXMgbm90IGNvbnN0YW50XG4gIC8vIChlLmcuIGl0J3MgZGlmZmVyZW50IGluIHRoZSBkYXkgb2YgdGhlIGRheWxpZ2h0IHNhdmluZyB0aW1lIGNsb2NrIHNoaWZ0KVxuXG4gIHJldHVybiBNYXRoLnJvdW5kKCh0aW1lc3RhbXBMZWZ0IC0gdGltZXN0YW1wUmlnaHQpIC8gTUlMTElTRUNPTkRTX0lOX0RBWSk7XG59IiwiaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBzdGFydE9mRGF5XG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgc3RhcnQgb2YgYSBkYXkgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBzdGFydCBvZiBhIGRheSBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqICMjIyB2Mi4wLjAgYnJlYWtpbmcgY2hhbmdlczpcbiAqXG4gKiAtIFtDaGFuZ2VzIHRoYXQgYXJlIGNvbW1vbiBmb3IgdGhlIHdob2xlIGxpYnJhcnldKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VwZ3JhZGVHdWlkZS5tZCNDb21tb24tQ2hhbmdlcykuXG4gKlxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZSAtIHRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIHN0YXJ0IG9mIGEgZGF5XG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDEgYXJndW1lbnQgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGEgZGF5IGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogY29uc3QgcmVzdWx0ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApKVxuICogLy89PiBUdWUgU2VwIDAyIDIwMTQgMDA6MDA6MDBcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdGFydE9mRGF5KGRpcnR5RGF0ZSkge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgdmFyIGRhdGUgPSB0b0RhdGUoZGlydHlEYXRlKTtcbiAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgcmV0dXJuIGRhdGU7XG59IiwiaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgdG9EYXRlXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENvbnZlcnQgdGhlIGdpdmVuIGFyZ3VtZW50IHRvIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlLCB0aGUgZnVuY3Rpb24gcmV0dXJucyBpdHMgY2xvbmUuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIGEgbnVtYmVyLCBpdCBpcyB0cmVhdGVkIGFzIGEgdGltZXN0YW1wLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBub25lIG9mIHRoZSBhYm92ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgSW52YWxpZCBEYXRlLlxuICpcbiAqICoqTm90ZSoqOiAqYWxsKiBEYXRlIGFyZ3VtZW50cyBwYXNzZWQgdG8gYW55ICpkYXRlLWZucyogZnVuY3Rpb24gaXMgcHJvY2Vzc2VkIGJ5IGB0b0RhdGVgLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGFyZ3VtZW50IC0gdGhlIHZhbHVlIHRvIGNvbnZlcnRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgcGFyc2VkIGRhdGUgaW4gdGhlIGxvY2FsIHRpbWUgem9uZVxuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENsb25lIHRoZSBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKG5ldyBEYXRlKDIwMTQsIDEsIDExLCAxMSwgMzAsIDMwKSlcbiAqIC8vPT4gVHVlIEZlYiAxMSAyMDE0IDExOjMwOjMwXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENvbnZlcnQgdGhlIHRpbWVzdGFtcCB0byBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKDEzOTIwOTg0MzAwMDApXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvRGF0ZShhcmd1bWVudCkge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgdmFyIGFyZ1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudCk7IC8vIENsb25lIHRoZSBkYXRlXG5cbiAgaWYgKGFyZ3VtZW50IGluc3RhbmNlb2YgRGF0ZSB8fCB0eXBlb2YgYXJndW1lbnQgPT09ICdvYmplY3QnICYmIGFyZ1N0ciA9PT0gJ1tvYmplY3QgRGF0ZV0nKSB7XG4gICAgLy8gUHJldmVudCB0aGUgZGF0ZSB0byBsb3NlIHRoZSBtaWxsaXNlY29uZHMgd2hlbiBwYXNzZWQgdG8gbmV3IERhdGUoKSBpbiBJRTEwXG4gICAgcmV0dXJuIG5ldyBEYXRlKGFyZ3VtZW50LmdldFRpbWUoKSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGFyZ3VtZW50ID09PSAnbnVtYmVyJyB8fCBhcmdTdHIgPT09ICdbb2JqZWN0IE51bWJlcl0nKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGFyZ3VtZW50KTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoKHR5cGVvZiBhcmd1bWVudCA9PT0gJ3N0cmluZycgfHwgYXJnU3RyID09PSAnW29iamVjdCBTdHJpbmddJykgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFwiU3RhcnRpbmcgd2l0aCB2Mi4wLjAtYmV0YS4xIGRhdGUtZm5zIGRvZXNuJ3QgYWNjZXB0IHN0cmluZ3MgYXMgZGF0ZSBhcmd1bWVudHMuIFBsZWFzZSB1c2UgYHBhcnNlSVNPYCB0byBwYXJzZSBzdHJpbmdzLiBTZWU6IGh0dHBzOi8vZ2l0LmlvL2ZqdWxlXCIpOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuXG4gICAgICBjb25zb2xlLndhcm4obmV3IEVycm9yKCkuc3RhY2spO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICB9XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIE1BU1RFUiBMSVNUXG5jbGFzcyBNYXN0ZXJMaXN0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pdGVtcyA9IFtdO1xuICB9XG5cbiAgYWRkSXRlbSh0aXRsZSkge1xuICAgIHRoaXMuaXRlbXMudW5zaGlmdChuZXcgTGlzdCh0aXRsZSkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGVsZXRlSXRlbShpbmRleCkge1xuICAgIHRoaXMuaXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG1vdmVJdGVtKGluZGV4LCBkaXIpIHtcbiAgICBjb25zdCBtb3ZlZEl0ZW0gPSB0aGlzLml0ZW1zLnNwbGljZShpbmRleCwgMSlbMF07XG4gICAgY29uc29sZS5sb2cobW92ZWRJdGVtKTtcbiAgICBjb25zb2xlLmxvZyhpbmRleCArIGRpcik7XG4gICAgdGhpcy5pdGVtcy5zcGxpY2UoaW5kZXggKyBkaXIsIDAsIG1vdmVkSXRlbSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzb3J0SXRlbXMoY2F0ZWdvcnksIHJldmVyc2VDaGVjaykge1xuICAgIGlmIChjYXRlZ29yeSA9PT0gXCJkYXRlRHVlXCIgfHwgY2F0ZWdvcnkgPT09IFwiY29tcGxldGVkXCIpIHtcbiAgICAgIHJldmVyc2VDaGVjayA9PT0gZmFsc2VcbiAgICAgICAgPyB0aGlzLml0ZW1zLnNvcnQoKGEsIGIpID0+IGFbY2F0ZWdvcnldIC0gYltjYXRlZ29yeV0pXG4gICAgICAgIDogdGhpcy5pdGVtcy5zb3J0KChhLCBiKSA9PiBiW2NhdGVnb3J5XSAtIGFbY2F0ZWdvcnldKTtcbiAgICB9IGVsc2UgaWYgKGNhdGVnb3J5ID09PSBcInRpdGxlXCIpIHtcbiAgICAgIHJldmVyc2VDaGVjayA9PT0gZmFsc2VcbiAgICAgICAgPyB0aGlzLml0ZW1zLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWVBID0gYS50aXRsZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgY29uc3QgbmFtZUIgPSBiLnRpdGxlLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAobmFtZUEgPCBuYW1lQikge1xuICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZUEgPiBuYW1lQikge1xuICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgfSlcbiAgICAgICAgOiB0aGlzLml0ZW1zLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWVBID0gYS50aXRsZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgY29uc3QgbmFtZUIgPSBiLnRpdGxlLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAobmFtZUEgPCBuYW1lQikge1xuICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuYW1lQSA+IG5hbWVCKSB7XG4gICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgfSk7XG4gICAgfSBlbHNlXG4gICAgICByZXZlcnNlQ2hlY2sgPT09IGZhbHNlXG4gICAgICAgID8gdGhpcy5pdGVtcy5zb3J0KChhLCBiKSA9PiBiW2NhdGVnb3J5XSAtIGFbY2F0ZWdvcnldKVxuICAgICAgICA6IHRoaXMuaXRlbXMuc29ydCgoYSwgYikgPT4gYVtjYXRlZ29yeV0gLSBiW2NhdGVnb3J5XSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuLy8gTElTVFNcbmNsYXNzIExpc3QgZXh0ZW5kcyBNYXN0ZXJMaXN0IHtcbiAgY29uc3RydWN0b3IodGl0bGUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB0aGlzLmlkID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLmNvbG9yID0gXCJpbml0aWFsXCI7XG4gICAgdGhpcy5pdGVtcyA9IFtdO1xuICB9XG5cbiAgLy8gQWRkIFRhc2tcbiAgYWRkSXRlbSh0aXRsZSwgZGVzYywgZGF0ZUR1ZSwgcHJpb3JpdHkpIHtcbiAgICB0aGlzLml0ZW1zLnVuc2hpZnQobmV3IFRhc2sodGl0bGUsIGRlc2MsIGRhdGVEdWUsIHByaW9yaXR5KSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBfY2xlYXJDb21wbGV0ZWRUYXNrcygpIHtcbiAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtcy5maWx0ZXIoKGEpID0+IGEuY29tcGxldGVkID09PSBmYWxzZSk7XG4gIH1cbn1cblxuLy8gVEFTS1NcbmNsYXNzIFRhc2sge1xuICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzYywgZGF0ZUR1ZSwgcHJpb3JpdHkpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kZXNjID0gZGVzYztcbiAgICB0aGlzLmlkID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLmRhdGVEdWUgPSBkYXRlRHVlO1xuICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB0aGlzLmNvbXBsZXRlZCA9IGZhbHNlO1xuICAgIHRoaXMuY29tcGxldGVkRGF0ZTtcbiAgfVxuXG4gIC8vIFRvZ2dsZSBDb21wbGV0ZWRcbiAgdG9nZ2xlQ29tcGxldGVkKCkge1xuICAgIHRoaXMuY29tcGxldGVkID09PSBmYWxzZVxuICAgICAgPyAodGhpcy5jb21wbGV0ZWQgPSB0cnVlKVxuICAgICAgOiAodGhpcy5jb21wbGV0ZWQgPSBmYWxzZSk7XG5cbiAgICBpZiAodGhpcy5jb21wbGV0ZWQgPT09IHRydWUpXG4gICAgICB0aGlzLmNvbXBsZXRlZERhdGUgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKG5hdmlnYXRvci5sYW5ndWFnZXNbMF0sIHtcbiAgICAgICAgeWVhcjogXCJudW1lcmljXCIsXG4gICAgICAgIG1vbnRoOiBcInNob3J0XCIsXG4gICAgICAgIGRheTogXCIyLWRpZ2l0XCIsXG4gICAgICB9KTtcblxuICAgIGlmICh0aGlzLmNvbXBsZXRlZCA9PT0gZmFsc2UpIHRoaXMuY29tcGxldGVkRGF0ZSA9IFwiXCI7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIFRvZ2dsZSBQcmlvcml0eVxuICB0b2dnbGVQcmlvcml0eSgpIHtcbiAgICB0aGlzLnByaW9yaXR5ID09PSBmYWxzZSA/ICh0aGlzLnByaW9yaXR5ID0gdHJ1ZSkgOiAodGhpcy5wcmlvcml0eSA9IGZhbHNlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5leHBvcnQgeyBNYXN0ZXJMaXN0LCBMaXN0LCBUYXNrIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzLCBjb21wYXJlQXNjLCBwYXJzZUlTTyB9IGZyb20gXCJkYXRlLWZuc1wiO1xuXG4vKipcbiAqIFRBQkxFIE9GIENPTlRFTlRTXG4gXG4gKiBEcnkgRnVuY3Rpb25zXG4gKiBIZWFkZXIgQnV0dG9uc1xuICogVGFzayBCdXR0b25zXG4gKiBTaWRlYmFyIEJ1dHRvbnNcbiAqIEFjdGl2ZSBUYXNrIExpc3RcbiAqIEhUTUwgSW5zZXJ0c1xuIFxuICoqL1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIERSWSBGVU5DVElPTlNcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5jb25zdCBjbGVhckZvcm0gPSBmdW5jdGlvbiAoZm9ybVRpdGxlLCBmb3JtRHVlLCBmb3JtRGVzYywgZm9ybVByaW9yaXR5KSB7XG4gIHJlbW92ZUVycm9yT3V0bGluZShmb3JtVGl0bGUpO1xuXG4gIGZvcm1UaXRsZS52YWx1ZSA9IFwiXCI7XG4gIGZvcm1EdWUudmFsdWUgPSBcIlwiO1xuICBmb3JtRGVzYy52YWx1ZSA9IFwiXCI7XG4gIGZvcm1Qcmlvcml0eS5jaGVja2VkID0gZmFsc2U7XG59O1xuXG5jb25zdCB0b2dnbGVIaWRlRWwgPSAoZWwpID0+IGVsLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRkZW5cIik7XG5cbmNvbnN0IHJlbW92ZUVycm9yT3V0bGluZSA9IChlbCkgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZShcInJlZC1vdXRsaW5lXCIpO1xuY29uc3QgYWRkRXJyb3JPdXRsaW5lID0gKGVsKSA9PiBlbC5jbGFzc0xpc3QuYWRkKFwicmVkLW91dGxpbmVcIik7XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogSEVBREVSIEJVVFRPTlNcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyBTSURFQkFSIFRPR0dMRVxuY29uc3QgdG9nZ2xlU2lkZWJhciA9IGZ1bmN0aW9uIChcbiAgc2lkZWJhcixcbiAgbGlzdHNNZW51RW5kQmFycyxcbiAgbGlzdHNNZW51TWlkQmFyMSxcbiAgbGlzdHNNZW51TWlkQmFyMlxuKSB7XG4gIC8vIFJldmVhbCBzaWRlIGJhclxuICB0b2dnbGVIaWRlRWwoc2lkZWJhcik7XG5cbiAgLy8gVHJhbmZvcm0gY2xvc2UgYnV0dG9uXG4gIGxpc3RzTWVudUVuZEJhcnMuZm9yRWFjaCgoYmFyKSA9PiBiYXIuY2xhc3NMaXN0LnRvZ2dsZShcImJhci0tdmFuaXNoXCIpKTtcbiAgbGlzdHNNZW51TWlkQmFyMS5jbGFzc0xpc3QudG9nZ2xlKFwiYmFyX19taWQtLXJvdGF0ZVwiKTtcbiAgbGlzdHNNZW51TWlkQmFyMi5jbGFzc0xpc3QudG9nZ2xlKFwiYmFyX19taWQyLS1yb3RhdGVcIik7XG59O1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIFRBU0sgQlVUVE9OU1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vIENoYW5nZSBjb21wbGV0ZWQgdGFzayBjaGVja2JveCB2aXN1YWxcbmNvbnN0IGRpbUNvbXBsZXRlZFRhc2tzID0gZnVuY3Rpb24gKGNsaWNrZWQpIHtcbiAgLy8gQ2hhbmdlIHRhc2sgdGV4dCBjb2xvciAvIHN0cmlrZXRocnVcbiAgY2xpY2tlZC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjaGVja2VkXCIpO1xuXG4gIC8vIENoYW5nZSB0YXNrIGRldGFpbHMgYnV0dG9uIGNvbG9yXG4gIGNsaWNrZWQucGFyZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkLmNsYXNzTGlzdC5hZGQoXG4gICAgXCJidG5fX2RldGFpbHMtLWNvbXBsZXRlZFwiXG4gICk7XG5cbiAgLy8gQ2hhbmdlIHRhc2sgaXRlbSBmaWx0ZXJcbiAgY2xpY2tlZC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImNvbXBsZXRlZC0tdHJ1ZVwiKTtcblxuICAvLyBDaGFuZ2UgRGV0YWlscyBkdWUgZGF0ZSBmb250IGNvbG9yXG4gIGNsaWNrZWQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQubGFzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5sYXN0RWxlbWVudENoaWxkPy5jbGFzc0xpc3QuYWRkKFxuICAgIFwiY2hlY2tlZFwiXG4gICk7XG59O1xuXG5jb25zdCB1bmRvQ29tcGxldGVkRGltID0gZnVuY3Rpb24gKGNsaWNrZWQpIHtcbiAgLy8gQ2hhbmdlIHRhc2sgdGV4dCBjb2xvciAvIHN0cmlrZXRocnVcbiAgY2xpY2tlZC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJjaGVja2VkXCIpO1xuXG4gIC8vIENoYW5nZSB0YXNrIGRldGFpbHMgYnV0dG9uIGNvbG9yXG4gIGNsaWNrZWQucGFyZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkLmNsYXNzTGlzdC5yZW1vdmUoXG4gICAgXCJidG5fX2RldGFpbHMtLWNvbXBsZXRlZFwiXG4gICk7XG5cbiAgLy8gQ2hhbmdlIHRhc2sgaXRlbSBmaWx0ZXJcbiAgY2xpY2tlZC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImNvbXBsZXRlZC0tdHJ1ZVwiKTtcblxuICAvLyBDaGFuZ2UgRGV0YWlscyBkdWUgZGF0ZSBmb250IGNvbG9yXG4gIGNsaWNrZWQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQubGFzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5sYXN0RWxlbWVudENoaWxkPy5jbGFzc0xpc3QucmVtb3ZlKFxuICAgIFwiY2hlY2tlZFwiXG4gICk7XG59O1xuXG4vLyBWaXN1YWwgZm9yIG9wZW4gdGFzayBkZXRhaWxzIGJ1dHRvblxuY29uc3QgdG9nZ2xlVGFza0RldGFpbHNCdG4gPSBmdW5jdGlvbiAoY2xpY2tlZCkge1xuICBjbGlja2VkLmNsYXNzTGlzdC5jb250YWlucyhcImJ0bl9fZGV0YWlscy0tb3BlblwiKVxuICAgID8gY2xpY2tlZC5jbGFzc0xpc3QucmVtb3ZlKFwiYnRuX19kZXRhaWxzLS1vcGVuXCIpXG4gICAgOiBjbGlja2VkLmNsYXNzTGlzdC5hZGQoXCJidG5fX2RldGFpbHMtLW9wZW5cIik7XG59O1xuXG5jb25zdCB0b2dnbGVJbmFjdGl2ZURldGFpbHNCdG5zID0gZnVuY3Rpb24gKGUpIHtcbiAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYnRuX19kZXRhaWxzXCIpO1xuICBmb3IgKGxldCBidXR0b24gb2YgYnV0dG9ucykge1xuICAgIC8vIENsb3NlIGFueSB0YXNrIGRldGFpbHMgb3BlbiB0byBzdG9wIG11bHRpcGxlIGF0IG9uY2VcbiAgICBpZiAoYnV0dG9uICE9PSBlLnRhcmdldCkge1xuICAgICAgYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJidG5fX2RldGFpbHMtLW9wZW5cIik7XG5cbiAgICAgIGlmIChcbiAgICAgICAgYnV0dG9uLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuLmxlbmd0aCA9PT0gMlxuICAgICAgKVxuICAgICAgICBoaWRlVGFza0RldGFpbHMoYnV0dG9uLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IGV4cGFuZFNlbGVjdGVkRGV0YWlscyA9IGZ1bmN0aW9uIChcbiAgY2xpY2tlZCxcbiAgcHJpb3JpdHksXG4gIGRlc2MsXG4gIGNvbXBsZXRlZCxcbiAgZGF0ZUR1ZVxuKSB7XG4gIGlmIChjbGlja2VkLmNsYXNzTGlzdC5jb250YWlucyhcImJ0bl9fZGV0YWlscy0tb3BlblwiKSlcbiAgICBleHBhbmRUYXNraXRlbShcbiAgICAgIGNsaWNrZWQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQsXG4gICAgICBwcmlvcml0eSxcbiAgICAgIGRlc2MsXG4gICAgICBjb21wbGV0ZWQsXG4gICAgICBkYXRlRHVlXG4gICAgKTtcbn07XG5cbmNvbnN0IGhpZGVOb25TZWxlY3RlZERldGFpbHMgPSBmdW5jdGlvbiAoY2xpY2tlZCkge1xuICBpZiAoIWNsaWNrZWQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYnRuX19kZXRhaWxzLS1vcGVuXCIpKVxuICAgIGhpZGVUYXNrRGV0YWlscyhjbGlja2VkLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KTtcbn07XG5cbi8vIENoYW5nZSBwcmlvcml0eSBjaGVja2JveCB2aXN1YWxcbmNvbnN0IGFkZFByaW9yaXR5VmlzdWFsID0gZnVuY3Rpb24gKGNsaWNrZWQpIHtcbiAgLy8gQ2hhbmdlIGJhY2tncm91bmQgY29sb3Igb2YgdGFza1xuICBjbGlja2VkLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFxuICAgIFwicHJpb3JpdHktLXRydWVcIlxuICApO1xufTtcblxuY29uc3QgcmVtb3ZlUHJpb3JpdHlWaXN1YWwgPSBmdW5jdGlvbiAoY2xpY2tlZCkge1xuICAvLyBDaGFuZ2UgYmFja2dyb3VuZCBjb2xvciBiYWNrXG4gIGNsaWNrZWQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXG4gICAgXCJwcmlvcml0eS0tdHJ1ZVwiXG4gICk7XG59O1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIFNJREVCQVIgQlVUVE9OU1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vIFNpZGViYXIgbGlzdHMgb3B0aW9uc1xuY29uc3QgdG9nZ2xlU2lkZWJhckxpc3RPcHRpb25zID0gZnVuY3Rpb24gKGNsaWNrZWQpIHtcbiAgdG9nZ2xlSGlkZUVsKGNsaWNrZWQucGFyZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkKTtcbiAgLy8gY2xpY2tlZC5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGRlblwiKTtcbn07XG5cbmNvbnN0IGhpZGVTaWRlYmFyTGlzdE9wdGlvbnMgPSBmdW5jdGlvbiAoY2xpY2tlZCkge1xuICB0b2dnbGVIaWRlRWwoY2xpY2tlZC5wYXJlbnRFbGVtZW50KTtcbiAgLy8gY2xpY2tlZC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG59O1xuXG5jb25zdCB0b2dnbGVTaWRlYmFyTmV3TGlzdFRpdGxlID0gZnVuY3Rpb24gKGVsKSB7XG4gIGVsLmNsYXNzTGlzdC50b2dnbGUoXCJhZGRfX2xpc3QtdGl0bGUtLXZpc2libGVcIik7XG59O1xuXG5jb25zdCB0b2dnbGVCdXR0b25TcGluID0gZnVuY3Rpb24gKGVsKSB7XG4gIGVsLmNsYXNzTGlzdC50b2dnbGUoXCJzcGluLTQ1ZGVnXCIpO1xufTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBBY3RpdmUgVGFzayBMaXN0XG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuY29uc3QgdXBkYXRlQWN0aXZlTGlzdFVJID0gZnVuY3Rpb24gKGxpc3ROYW1lRWwsIGxpc3ROYW1lKSB7XG4gIGxpc3ROYW1lRWwudGV4dENvbnRlbnQgPSBsaXN0TmFtZTtcbn07XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogSFRNTCBJbnNlcnRzXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuY29uc3QgZXhwYW5kVGFza2l0ZW0gPSBmdW5jdGlvbiAoZWwsIHByaW9yaXR5LCBkZXNjLCBjb21wbGV0ZWQsIGRhdGVEdWUpIHtcbiAgY29uc3QgaHRtbFRhc2tEZXRhaWxzID0gYFxuICAgIDxkaXYgY2xhc3M9XCJ0YXNraXRlbS0tZXhwYW5kZWRcIj5cbiAgICAgIDxociBjbGFzcz1cInRhc2tpdGVtX19kaXZpZGVyXCIgLz5cblxuICAgICAgPGRpdiBjbGFzcz1cInRhc2tpdGVtX19kZXRhaWxzX19jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhc2tpdGVtX19kZXRhaWxzX190eHQtY29udGFpbmVyXCI+XG4gICAgICAgICAgPHA+JHtkZXNjfTwvcD5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFza2l0ZW1fX2R1ZS1kYXRlX19jb250YWluZXIgJHtcbiAgICAgICAgICAgIGNvbXBsZXRlZCA9PT0gdHJ1ZSA/IFwiY2hlY2tlZFwiIDogXCJcIlxuICAgICAgICAgIH1cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YXNraXRlbV9fZHVlLWRhdGVfX3RpdGxlXCI+JHtcbiAgICAgICAgICAgICAgY29tcGxldGVkID09PSB0cnVlID8gXCJDb21wbGV0ZWRcIiA6IFwiRHVlXCJcbiAgICAgICAgICAgIH08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YXNraXRlbV9fZHVlLWRhdGVfX2RhdGVcIj4ke1xuICAgICAgICAgICAgICBjb21wbGV0ZWQgPT09IGZhbHNlXG4gICAgICAgICAgICAgICAgPyBkYXRlRHVlLnNsaWNlKDUpXG4gICAgICAgICAgICAgICAgOiBgJHtTdHJpbmcobmV3IERhdGUoKS5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoXG4gICAgICAgICAgICAgICAgICAgIDIsXG4gICAgICAgICAgICAgICAgICAgIFwiMFwiXG4gICAgICAgICAgICAgICAgICApfS0ke1N0cmluZyhuZXcgRGF0ZSgpLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpfWBcbiAgICAgICAgICAgIH08L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhc2tpdGVtX19kZXRhaWxzX19hY3Rpb25zLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cInRhc2tpdGVtX19wcmlvcml0eS1jaGVja1wiPlxuICAgICAgICAgICAgUHJpb3JpdHlcbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICBuYW1lPVwicHJpb3JpdHlfX2NoZWNrYm94XCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJ0YXNraXRlbV9fcHJpb3JpdHktY2hlY2tfX2NoZWNrYm94XCJcbiAgICAgICAgICAgICAgJHtwcmlvcml0eSA9PT0gdHJ1ZSA/IFwiY2hlY2tlZFwiIDogXCJcIn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFza2l0ZW1fX2VkaXRfX2NvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBzcmM9XCIuL2ltYWdlcy9lZGl0LnN2Z1wiXG4gICAgICAgICAgICAgIGhlaWdodD1cIjIycHhcIlxuICAgICAgICAgICAgICBhbHQ9XCJFZGl0IHRhc2tcIlxuICAgICAgICAgICAgICB0aXRsZT1cIkVkaXQgdGFza1wiXG4gICAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bl9fdGFza2l0ZW1fX2VkaXRcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFza2l0ZW1fX2RlbF9fY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIHNyYz1cIi4vaW1hZ2VzL3RyYXNoLnN2Z1wiXG4gICAgICAgICAgICAgIGhlaWdodD1cIjI1cHhcIlxuICAgICAgICAgICAgICBhbHQ9XCJEZWxldGUgdGFza1wiXG4gICAgICAgICAgICAgIHRpdGxlPVwiRGVsZXRlIHRhc2tcIlxuICAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG5fX3Rhc2tpdGVtX19kZWxldGVcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwhLS0gZW5kIHRhc2tpdGVtX19kZXRhaWxzX19hY3Rpb25zLWNvbnRhaW5lciAtLT5cbiAgICAgIDwvZGl2PlxuICAgICAgPCEtLSBlbmQgdGFza2l0ZW1fX2RldGFpbHNfX2NvbnRhaW5lciAtLT5cbiAgICA8L2Rpdj5cbiAgYDtcblxuICBlbC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgaHRtbFRhc2tEZXRhaWxzKTtcbn07XG5cbmNvbnN0IGhpZGVUYXNrRGV0YWlscyA9IGZ1bmN0aW9uIChlbCkge1xuICBlbC5yZW1vdmVDaGlsZChlbC5sYXN0RWxlbWVudENoaWxkKTtcbn07XG5cbmNvbnN0IGFkZExpc3QgPSBmdW5jdGlvbiAoZWwsIHRpdGxlLCBudW1EdWUpIHtcbiAgY29uc3QgaHRtbExpc3RJdGVtID0gYFxuICAgIDxkaXYgY2xhc3M9XCJzaWRlYmFyX19saXN0aXRlbVwiPlxuICAgICAgPGRpdiBjbGFzcz1cImxpc3RpdGVtX19vcHRpb25zX19jb250YWluZXJcIj5cbiAgICAgIDxpbWcgXG4gICAgICAgIHNyYz1cIi4vaW1hZ2VzL2xpc3RzLW1lbnUucG5nXCJcbiAgICAgICAgaGVpZ2h0PVwiMjBweFwiXG4gICAgICAgIGNsYXNzPVwiYnRuIGJ0bl9fbGlzdGl0ZW1fX29wdGlvbnNcIlxuICAgICAgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJsaXN0aXRlbV9fb3B0aW9uc19fbWVudV9fY29udGFpbmVyIGhpZGRlblwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXJyb3ctdXBcIj48L2Rpdj5cbiAgICAgICAgPGltZ1xuICAgICAgICAgIHNyYz1cIi4vaW1hZ2VzL3RyYXNoLnN2Z1wiXG4gICAgICAgICAgY2xhc3M9XCJidG4gYnRuX19saXN0aXRlbSBidG5fX2xpc3RpdGVtLS1kZWxcIlxuICAgICAgICAgIGhlaWdodD1cIjI4cHhcIlxuICAgICAgICAvPlxuICAgICAgICA8aW1nXG4gICAgICAgICAgc3JjPVwiLi9pbWFnZXMvZG93bi10cmlhbmdsZS5wbmdcIlxuICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bl9fbGlzdGl0ZW0gYnRuX19saXN0aXRlbS0tdXBcIlxuICAgICAgICAgIGhlaWdodD1cIjI4cHhcIlxuICAgICAgICAvPlxuICAgICAgICA8aW1nXG4gICAgICAgICAgc3JjPVwiLi9pbWFnZXMvZG93bi10cmlhbmdsZS5wbmdcIlxuICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bl9fbGlzdGl0ZW0gYnRuX19saXN0aXRlbS0tZG93blwiXG4gICAgICAgICAgaGVpZ2h0PVwiMjhweFwiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDwhLS0gZW5kIGxpc3RpdGVtX19vcHRpb25zX19tZW51X19jb250YWluZXIgLS0+XG4gICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxpc3RpdGVtX190aXRsZVwiPiR7dGl0bGV9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0aXRlbV9fZHVlLWNvdW50XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0aXRlbV9fZHVlLWNvdW50X190aXRsZVwiPlRhc2tzIER1ZTo8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxpc3RpdGVtX19kdWUtY291bnRfX2NvdW50XCI+JHtudW1EdWV9PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYDtcblxuICBlbC5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlcmVuZFwiLCBodG1sTGlzdEl0ZW0pO1xufTtcblxuY29uc3QgZGF5c0xlZnQgPSBmdW5jdGlvbiAoZGF0ZSkge1xuICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gIGNvbnN0IGRhdGVEdWUgPSBEYXRlLnBhcnNlKGRhdGUpO1xuXG4gIGlmIChjb21wYXJlQXNjKHRvZGF5LCBkYXRlRHVlKSA9PT0gMSkge1xuICAgIHJldHVybiBcIk9WRVJEVUUhXCI7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZGlmZiA9IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhkYXRlRHVlLCB0b2RheSkgKyAxO1xuXG4gICAgaWYgKGRpZmYgPT09IDApIHtcbiAgICAgIHJldHVybiBcIlRvZGF5XCI7XG4gICAgfVxuICAgIGlmIChkaWZmID09PSAxKSB7XG4gICAgICByZXR1cm4gXCJUb21vcnJvd1wiO1xuICAgIH1cblxuICAgIHJldHVybiBgRHVlIGluICR7ZGlmZn0gZGF5c2A7XG4gIH1cbn07XG5cbmNvbnN0IGFkZFRhc2sgPSBmdW5jdGlvbiAoZWwsIHRpdGxlLCBkYXRlRHVlLCBwcmlvcml0eSwgaWQpIHtcbiAgY29uc3QgaHRtbFRhc2tJdGVtID0gYFxuICA8ZGl2IGlkPSR7aWR9IGNsYXNzPVwidGFza2l0ZW0ke3ByaW9yaXR5ID09PSB0cnVlID8gXCIgcHJpb3JpdHktLXRydWVcIiA6IFwiXCJ9XCI+XG4gICAgPGRpdiBjbGFzcz1cInRhc2tpdGVtX19hYmJyXCI+XG4gICAgICA8aW5wdXRcbiAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgbmFtZT1cImNvbXBsZXRlZC1jaGVja2JveFwiXG4gICAgICAgIGNsYXNzPVwidGFza2l0ZW1fX2NoZWNrYm94XCJcbiAgICAgIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwidGFza2l0ZW1fX3R4dGJveFwiPlxuICAgICAgICA8aDM+JHt0aXRsZX08L2gzPlxuICAgICAgICA8cD4ke2RhdGVEdWUgPT09IFwiXCIgPyBgJm5ic3A7YCA6IGRheXNMZWZ0KGRhdGVEdWUpfTwvcD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInRhc2tpdGVtX19idG4tZGV0YWlsc19fY29udGFpbmVyXCI+XG4gICAgICAgIDxpbWdcbiAgICAgICAgICBzcmM9XCIuL2ltYWdlcy9kb3duLXRyaWFuZ2xlLnBuZ1wiXG4gICAgICAgICAgYWx0PVwiT3BlbiBkZXRhaWxzXCJcbiAgICAgICAgICB0aXRsZT1cIkRldGFpbHNcIlxuICAgICAgICAgIGhlaWdodD1cIjIwcHhcIlxuICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bl9fZGV0YWlsc1wiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5gO1xuXG4gIGVsLmluc2VydEFkamFjZW50SFRNTChcImFmdGVyZW5kXCIsIGh0bWxUYXNrSXRlbSk7XG59O1xuXG5leHBvcnQge1xuICBjbGVhckZvcm0sXG4gIHRvZ2dsZVNpZGViYXIsXG4gIGRpbUNvbXBsZXRlZFRhc2tzLFxuICB1bmRvQ29tcGxldGVkRGltLFxuICB0b2dnbGVUYXNrRGV0YWlsc0J0bixcbiAgdG9nZ2xlSW5hY3RpdmVEZXRhaWxzQnRucyxcbiAgZXhwYW5kU2VsZWN0ZWREZXRhaWxzLFxuICBoaWRlTm9uU2VsZWN0ZWREZXRhaWxzLFxuICBhZGRQcmlvcml0eVZpc3VhbCxcbiAgcmVtb3ZlUHJpb3JpdHlWaXN1YWwsXG4gIHRvZ2dsZVNpZGViYXJMaXN0T3B0aW9ucyxcbiAgaGlkZVNpZGViYXJMaXN0T3B0aW9ucyxcbiAgYWRkTGlzdCxcbiAgdXBkYXRlQWN0aXZlTGlzdFVJLFxuICB0b2dnbGVTaWRlYmFyTmV3TGlzdFRpdGxlLFxuICByZW1vdmVFcnJvck91dGxpbmUsXG4gIGFkZEVycm9yT3V0bGluZSxcbiAgdG9nZ2xlSGlkZUVsLFxuICB0b2dnbGVCdXR0b25TcGluLFxuICBkYXlzTGVmdCwgLy8gRGVsZXRlIHdoZW4gZG9uZSB0ZXN0aW5nXG4gIGFkZFRhc2ssXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gXG4gVEFCTEUgT0YgQ09OVEVOVFNcblxuICogTW9kdWxlc1xuICogRE9NIFZhcmlhYmxlc1xuICogRFJZIEZ1bmN0aW9uc1xuICogSGVhZGVyIEJ1dHRvbnNcbiAqIFRhc2sgQnV0dG9uc1xuICogU2lkZWJhciBCdXR0b25zXG4gKiBGb3JtIEJ1dHRvbnNcbiAqIEFwcCBMb2dpY1xuXG4qKi9cblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBNT0RVTEVTXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuaW1wb3J0IHsgTWFzdGVyTGlzdCB9IGZyb20gXCIuL3RvZG8tbG9naWMuanNcIjtcbmltcG9ydCB7XG4gIGFkZFByaW9yaXR5VmlzdWFsLFxuICBkaW1Db21wbGV0ZWRUYXNrcyxcbiAgZXhwYW5kU2VsZWN0ZWREZXRhaWxzLFxuICBoaWRlTm9uU2VsZWN0ZWREZXRhaWxzLFxuICByZW1vdmVQcmlvcml0eVZpc3VhbCxcbiAgdG9nZ2xlSW5hY3RpdmVEZXRhaWxzQnRucyxcbiAgdG9nZ2xlU2lkZWJhcixcbiAgdG9nZ2xlU2lkZWJhckxpc3RPcHRpb25zLFxuICB0b2dnbGVUYXNrRGV0YWlsc0J0bixcbiAgdW5kb0NvbXBsZXRlZERpbSxcbiAgY2xlYXJGb3JtLFxuICBoaWRlU2lkZWJhckxpc3RPcHRpb25zLFxuICBhZGRMaXN0LFxuICB1cGRhdGVBY3RpdmVMaXN0VUksXG4gIHRvZ2dsZVNpZGViYXJOZXdMaXN0VGl0bGUsXG4gIHJlbW92ZUVycm9yT3V0bGluZSxcbiAgYWRkRXJyb3JPdXRsaW5lLFxuICB0b2dnbGVIaWRlRWwsXG4gIHRvZ2dsZUJ1dHRvblNwaW4sXG4gIGRheXNMZWZ0LCAvLyBEZWxldGUgd2hlbiBkb25lIHRlc3RpbmdcbiAgYWRkVGFzayxcbn0gZnJvbSBcIi4vdmlzdWFsLmpzXCI7XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogRE9NIFZBUklBQkxFU1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vIEJVVFRPTlNcbi8vIC0tLS0gSGVhZGVyXG5jb25zdCBidG5MaXN0c01lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxpc3RzLW1lbnVcIik7XG5jb25zdCBsaXN0c01lbnVFbmRCYXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5iYXJfX2VuZFwiKTtcbmNvbnN0IGxpc3RzTWVudU1pZEJhcjEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJhcl9fbWlkXCIpO1xuY29uc3QgbGlzdHNNZW51TWlkQmFyMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYmFyX19taWQyXCIpO1xuY29uc3QgYnRuQWRkVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2tcIik7XG5cbi8vIC0tLS0gVGFza3NcbmNvbnN0IGNoZWNrYm94VGFza0NvbXBsZXRlID1cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRhc2tpdGVtX19jaGVja2JveFwiKTtcbmNvbnN0IGJ0blRhc2tEZXRhaWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImJ0bl9fZGV0YWlsc1wiKTtcbmNvbnN0IGNoZWNrYm94UHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFxuICBcInRhc2tpdGVtX19wcmlvcml0eS1jaGVja19fY2hlY2tib3hcIlxuKTtcbmNvbnN0IGJ0bkVkaXRUYXNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImJ0bl9fdGFza2l0ZW1fX2VkaXRcIik7XG5jb25zdCBidG5EZWxUYXNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImJ0bl9fdGFza2l0ZW1fX2RlbGV0ZVwiKTtcblxuLy8gLS0tLSBTaWRlYmFyXG5jb25zdCBidG5BZGRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG5fX3NpZGViYXJfX2FkZC1saXN0XCIpO1xuY29uc3QgYnRuTGlzdHNPcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImJ0bl9fbGlzdGl0ZW1fX29wdGlvbnNcIik7XG5cbi8vIC0tLS0gRm9ybVxuY29uc3QgYnRuRm9ybUNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG5fX2Zvcm0tY2xvc2VcIik7XG5jb25zdCBidG5Gb3JtU3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG5fX2Zvcm0tc3VibWl0XCIpO1xuXG4vLyBTSURFQkFSXG5jb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyXCIpO1xuY29uc3Qgc2lkZWJhckhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhcl9faGVhZGVyXCIpO1xuY29uc3Qgc2lkZWJhckFkZExpc3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gIFwiLnNpZGViYXJfX2FkZC1saXN0X19hZGQtdGl0bGVfX2NvbnRhaW5lclwiXG4pO1xuY29uc3QgbGlzdEl0ZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNpZGViYXJfX2xpc3RpdGVtXCIpO1xuY29uc3QgbGlzdEl0ZW1zT3B0aW9uc01lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFxuICBcImxpc3RpdGVtX19vcHRpb25zX19tZW51X19jb250YWluZXJcIlxuKTtcblxuLy8gRk9STVxuY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybVwiKTtcbmNvbnN0IGZvcm1UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybV9fdGV4dC0tdGl0bGVcIik7XG5jb25zdCBmb3JtRHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtX19kYXRlXCIpO1xuY29uc3QgZm9ybURlc2MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm1fX3RleHQtYXJlYVwiKTtcbmNvbnN0IGZvcm1Qcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybV9fcHJpb3JpdHlfX2NoZWNrYm94XCIpO1xuXG4vLyAtLSBNQUlOIEFQUFxuY29uc3QgYWN0aXZlTGlzdFdpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1hcHBcIik7XG5jb25zdCBhY3RpdmVMaXN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjdGl2ZS1saXN0X190aXRsZVwiKTtcbmNvbnN0IHRhc2tJdGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0YXNraXRlbVwiKTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBEUlkgRlVOQ1RJT05TXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIEhFQURFUlxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vPyAtLS0tLS0tLS0tIEJVVFRPTlMgLS0tLS0tLS0tLVxuLy8gU0lERUJBUiBUT0dHTEVcbmJ0bkxpc3RzTWVudS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICB0b2dnbGVTaWRlYmFyKHNpZGViYXIsIGxpc3RzTWVudUVuZEJhcnMsIGxpc3RzTWVudU1pZEJhcjEsIGxpc3RzTWVudU1pZEJhcjIpO1xufSk7XG5cbi8vIEFERCBUQVNLIE9QRU5cbmJ0bkFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgdG9nZ2xlSGlkZUVsKGZvcm0pO1xufSk7XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogVEFTS1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vPyAtLS0tLS0tLS0tIEJVVFRPTlMgLS0tLS0tLS0tLVxuLy8gQ2hhbmdlIGNvbXBsZXRlZCB0YXNrIGNoZWNrYm94XG5hY3RpdmVMaXN0V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBjb25zdCBjbGlja2VkID0gZS50YXJnZXQuY2xvc2VzdChcIi50YXNraXRlbV9fY2hlY2tib3hcIik7XG4gIGlmICghY2xpY2tlZCkgcmV0dXJuO1xuXG4gIGNvbnN0IHRhc2tJRCA9ICtjbGlja2VkLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZDtcbiAgY29uc3QgaXRlbUluZGV4ID0gYWN0aXZlTGlzdC5pdGVtcy5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IHRhc2tJRCk7XG5cbiAgLy8gRGF0YSBDaGFuZ2VcbiAgYWN0aXZlTGlzdC5pdGVtc1tpdGVtSW5kZXhdLnRvZ2dsZUNvbXBsZXRlZCgpO1xuXG4gIC8vIFZpc3VhbCBDaGFuZ2VcblxuICBpZiAoY2xpY2tlZC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoID09PSAyKSB7XG4gICAgY2xpY2tlZC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQubGFzdEVsZW1lbnRDaGlsZC5sYXN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkLmxhc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQuaW5uZXJIVE1MID0gYCR7XG4gICAgICBhY3RpdmVMaXN0Lml0ZW1zW2l0ZW1JbmRleF0uY29tcGxldGVkID09PSB0cnVlID8gXCJDb21wbGV0ZWRcIiA6IFwiRHVlXCJcbiAgICB9YDtcbiAgICBjbGlja2VkLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkLmxhc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQubGFzdEVsZW1lbnRDaGlsZC5sYXN0RWxlbWVudENoaWxkLmlubmVySFRNTCA9IGAke1xuICAgICAgYWN0aXZlTGlzdC5pdGVtc1tpdGVtSW5kZXhdLmNvbXBsZXRlZCA9PT0gZmFsc2VcbiAgICAgICAgPyBhY3RpdmVMaXN0Lml0ZW1zW2l0ZW1JbmRleF0uZGF0ZUR1ZS5zbGljZSg1KVxuICAgICAgICA6IGAke1N0cmluZyhuZXcgRGF0ZSgpLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIil9LSR7U3RyaW5nKFxuICAgICAgICAgICAgbmV3IERhdGUoKS5nZXREYXRlKClcbiAgICAgICAgICApLnBhZFN0YXJ0KDIsIFwiMFwiKX1gXG4gICAgfWA7XG4gIH1cblxuICBpZiAoY2xpY2tlZC5jaGVja2VkKSB7XG4gICAgZGltQ29tcGxldGVkVGFza3MoY2xpY2tlZCk7XG4gIH1cblxuICAvLyBVbmRvIENoYW5nZSBjb21wbGV0ZWQgdGFzayB2aXN1YWxcbiAgaWYgKCFjbGlja2VkLmNoZWNrZWQpIHVuZG9Db21wbGV0ZWREaW0oY2xpY2tlZCk7XG59KTtcblxuLy8gVmlzdWFsIGZvciBvcGVuIHRhc2sgZGV0YWlscyBidXR0b25cbmFjdGl2ZUxpc3RXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGNvbnN0IGNsaWNrZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiLmJ0bl9fZGV0YWlsc1wiKTtcblxuICBpZiAoIWNsaWNrZWQpIHJldHVybjtcblxuICBjb25zdCB0YXNrSUQgPSArY2xpY2tlZC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZDtcbiAgY29uc3QgdGFza0luQXJyID0gYWN0aXZlTGlzdC5pdGVtcy5maWx0ZXIoKHRhc2spID0+IHRhc2suaWQgPT09IHRhc2tJRCk7XG5cbiAgLy8gVG9nZ2xlIHRhc2sgZGV0YWlscyBvcGVuIG9uIGNsaWNrXG4gIHRvZ2dsZVRhc2tEZXRhaWxzQnRuKGNsaWNrZWQpO1xuICB0b2dnbGVJbmFjdGl2ZURldGFpbHNCdG5zKGUpO1xuICBleHBhbmRTZWxlY3RlZERldGFpbHMoXG4gICAgY2xpY2tlZCxcbiAgICB0YXNrSW5BcnJbMF0ucHJpb3JpdHksXG4gICAgdGFza0luQXJyWzBdLmRlc2MsXG4gICAgdGFza0luQXJyWzBdLmNvbXBsZXRlZCxcbiAgICB0YXNrSW5BcnJbMF0uZGF0ZUR1ZVxuICApO1xuICBoaWRlTm9uU2VsZWN0ZWREZXRhaWxzKGNsaWNrZWQpO1xufSk7XG5cbi8vIENoYW5nZSBwcmlvcml0eSBjaGVja2JveFxuYWN0aXZlTGlzdFdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgY29uc3QgY2xpY2tlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIudGFza2l0ZW1fX3ByaW9yaXR5LWNoZWNrX19jaGVja2JveFwiKTtcblxuICBpZiAoIWNsaWNrZWQpIHJldHVybjtcbiAgY29uc3QgdGFza0lEID1cbiAgICArY2xpY2tlZC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50XG4gICAgICAucGFyZW50RWxlbWVudC5pZDtcbiAgY29uc3QgaXRlbUluZGV4ID0gYWN0aXZlTGlzdC5pdGVtcy5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IHRhc2tJRCk7XG5cbiAgLy8gRGF0YSBDaGFuZ2VcbiAgYWN0aXZlTGlzdC5pdGVtc1tpdGVtSW5kZXhdLnRvZ2dsZVByaW9yaXR5KCk7XG5cbiAgLy8gVmlzdWFsIENoYW5nZVxuICBpZiAoY2xpY2tlZC5jaGVja2VkKSBhZGRQcmlvcml0eVZpc3VhbChjbGlja2VkKTtcblxuICBpZiAoIWNsaWNrZWQuY2hlY2tlZCkgcmVtb3ZlUHJpb3JpdHlWaXN1YWwoY2xpY2tlZCk7XG59KTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBTSURFQkFSXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8/IC0tLS0tLS0tLS0gQlVUVE9OUyAtLS0tLS0tLS0tXG4vLyBTaWRlYmFyIGxpc3RzIG9wdGlvbnNcbmJ0bkFkZExpc3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIHRvZ2dsZVNpZGViYXJOZXdMaXN0VGl0bGUoc2lkZWJhckFkZExpc3RUaXRsZSk7XG4gIHRvZ2dsZUJ1dHRvblNwaW4oYnRuQWRkTGlzdCk7XG59KTtcblxuc2lkZWJhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgY29uc3QgY2xpY2tlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIuYnRuX19saXN0aXRlbV9fb3B0aW9uc1wiKTtcbiAgaWYgKCFjbGlja2VkKSByZXR1cm47XG5cbiAgdG9nZ2xlU2lkZWJhckxpc3RPcHRpb25zKGNsaWNrZWQpO1xufSk7XG5cbnNpZGViYXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGNvbnN0IGNsaWNrZWRUcmFzaCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIuYnRuX19saXN0aXRlbS0tZGVsXCIpO1xuICBjb25zdCBjbGlja2VkQXJyb3dVcCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIuYnRuX19saXN0aXRlbS0tdXBcIik7XG4gIGNvbnN0IGNsaWNrZWRBcnJvd0Rvd24gPSBlLnRhcmdldC5jbG9zZXN0KFwiLmJ0bl9fbGlzdGl0ZW0tLWRvd25cIik7XG5cbiAgaWYgKCFjbGlja2VkVHJhc2ggJiYgIWNsaWNrZWRBcnJvd1VwICYmICFjbGlja2VkQXJyb3dEb3duKSByZXR1cm47XG5cbiAgaWYgKGNsaWNrZWRUcmFzaCB8fCBjbGlja2VkQXJyb3dVcCB8fCBjbGlja2VkQXJyb3dEb3duKSB7XG4gICAgY29uc3QgY2xpY2tlZCA9IGNsaWNrZWRUcmFzaCB8fCBjbGlja2VkQXJyb3dVcCB8fCBjbGlja2VkQXJyb3dEb3duO1xuICAgIGhpZGVTaWRlYmFyTGlzdE9wdGlvbnMoY2xpY2tlZCk7XG4gIH1cbn0pO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIEZPUk1cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5mb3JtVGl0bGUuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsICgpID0+IHtcbiAgcmVtb3ZlRXJyb3JPdXRsaW5lKGZvcm1UaXRsZSk7XG59KTtcblxuLy8/IC0tLS0tLS0tLS0gQlVUVE9OUyAtLS0tLS0tLS0tXG5idG5Gb3JtQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgdG9nZ2xlSGlkZUVsKGZvcm0pO1xuICBjbGVhckZvcm0oZm9ybVRpdGxlLCBmb3JtRHVlLCBmb3JtRGVzYywgZm9ybVByaW9yaXR5KTtcbn0pO1xuXG5idG5Gb3JtU3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgLy8gRXJyb3IgaWYgVGFzayB0aXRsZSBub3QgZGVzaWduYXRlZFxuICBpZiAoZm9ybVRpdGxlLnZhbHVlID09PSBcIlwiKSB7XG4gICAgYWRkRXJyb3JPdXRsaW5lKGZvcm1UaXRsZSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gQWRkIHRhc2sgdG8gYXJyYXlcbiAgYWN0aXZlTGlzdC5hZGRJdGVtKFxuICAgIGZvcm1UaXRsZS52YWx1ZSxcbiAgICBmb3JtRGVzYy52YWx1ZSxcbiAgICBmb3JtRHVlLnZhbHVlLFxuICAgIGZvcm1Qcmlvcml0eS5jaGVja2VkXG4gICk7XG5cbiAgYWRkVGFzayhcbiAgICBhY3RpdmVMaXN0VGl0bGUsXG4gICAgYWN0aXZlTGlzdC5pdGVtc1swXS50aXRsZSxcbiAgICBhY3RpdmVMaXN0Lml0ZW1zWzBdLmRhdGVEdWUsXG4gICAgYWN0aXZlTGlzdC5pdGVtc1swXS5wcmlvcml0eSxcbiAgICBhY3RpdmVMaXN0Lml0ZW1zWzBdLmlkXG4gICk7XG5cbiAgLy8gY29uc29sZS5sb2coYWN0aXZlTGlzdFdpbmRvdy5jaGlsZHJlbik7XG5cbiAgLy8gd2hpbGUgKGFjdGl2ZUxpc3RXaW5kb3cuY2hpbGRyZW4gPiAxKSB7XG4gIC8vICAgYWN0aXZlTGlzdFdpbmRvdy5yZW1vdmVDaGlsZChhY3RpdmVMaXN0V2luZG93Lmxhc3RFbGVtZW50Q2hpbGQpO1xuICAvLyB9XG5cbiAgLy8gYWN0aXZlTGlzdC5pdGVtcy5mb3JFYWNoKCh0YXNrKSA9PiB7fSk7XG5cbiAgLy8gY29uc29sZS50YWJsZShhY3RpdmVMaXN0Lml0ZW1zKTtcblxuICAvLyBIaWRlIGFuZCByZXNldCBmb3JtXG4gIHRvZ2dsZUhpZGVFbChmb3JtKTtcbiAgY2xlYXJGb3JtKGZvcm1UaXRsZSwgZm9ybUR1ZSwgZm9ybURlc2MsIGZvcm1Qcmlvcml0eSk7XG59KTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBBUFAgTE9HSUNcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyBJbml0aWFsaXplIE1hc3RlciBMaXN0XG5jb25zdCBtYXN0ZXJMaXN0ID0gbmV3IE1hc3Rlckxpc3QoKTtcblxuLy8gQWRkIERlZmF1bHQgTGlzdCB0byBNYXN0ZXIgTGlzdFxubWFzdGVyTGlzdC5hZGRJdGVtKFwiTWFpbiBMaXN0XCIpO1xuXG4vLyBBZGQgRGVmYXVsdCBsaXN0IHRvIHNpZGViYXJcbmFkZExpc3Qoc2lkZWJhckhlYWRlciwgbWFzdGVyTGlzdC5pdGVtc1swXS50aXRsZSwgMCk7XG5cbi8vIFVwZGF0ZSBhY3RpdmVMaXN0IHZpc3VhbFxubGV0IGFjdGl2ZUxpc3QgPSBtYXN0ZXJMaXN0Lml0ZW1zWzBdO1xudXBkYXRlQWN0aXZlTGlzdFVJKGFjdGl2ZUxpc3RUaXRsZSwgYWN0aXZlTGlzdC50aXRsZSk7XG5cbi8vVEVTVElORyBBUkVhXG5cbi8vIGNvbnN0IGRhdGUgPSBcIjIwMjMtMDQtMDVcIjtcbi8vIGNvbnNvbGUubG9nKG5ldyBEYXRlKCkpO1xuXG4vLyBjb25zb2xlLmxvZyhkYXRlKTtcblxuLy8gY29uc29sZS5sb2coZGF5c0xlZnQoZGF0ZSkpO1xuXG4vKipcbiAqXG4gKlxuICpcbiAqXG4gKlxuICpcbiAqXG4gKi9cblxuLypcbi8vIFRFU1QgU0FNUExFU1xuLy8gQ3JlYXRlIE1hc3RlciBMaXN0XG5jb25zdCBtYXN0ZXJMaXN0ID0gbmV3IE1hc3Rlckxpc3QoKTtcblxuLy8gQWRkIExpc3RzIHRvIE1hc3RlciBMaXN0XG5tYXN0ZXJMaXN0LmFkZEl0ZW0oXCJUZXN0IExpc3RcIik7XG5tYXN0ZXJMaXN0LmFkZEl0ZW0oXCJBIFRlc3QgTGlzdCAyXCIpO1xubWFzdGVyTGlzdC5hZGRJdGVtKFwiVGVzdCBMaXN0IDNcIik7XG5tYXN0ZXJMaXN0LmFkZEl0ZW0oXCJUZXN0IExpc3QgNFwiKTtcblxuLy8gQWRkIFRhc2tzIHRvIExpc3QgaW4gTWFzdGVyIExpc3Rcbm1hc3Rlckxpc3QuaXRlbXNbMF0uYWRkSXRlbShcInRlc3QxXCIsIFwiYSB0ZXN0MSBkZXNjXCIsIFwiOC4xMFwiKTtcbm1hc3Rlckxpc3QuaXRlbXNbMF0uYWRkSXRlbShcInRlc3QyXCIsIFwiYiB0ZXN0MiBkZXNjXCIsIFwiOC4wOFwiKTtcbm1hc3Rlckxpc3QuaXRlbXNbMF0uYWRkSXRlbShcInRlc3QzXCIsIFwiYyB0ZXN0MyBkZXNjXCIsIFwiNy4xNlwiKTtcbm1hc3Rlckxpc3QuaXRlbXNbMF0uYWRkSXRlbShcInRlc3Q0XCIsIFwiZCB0ZXN0NCBkZXNjXCIsIFwiMTIuMjJcIik7XG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLmFkZEl0ZW0oXCJ0ZXN0NVwiLCBcImUgdGVzdDUgZGVzY1wiLCBcIjMuMjJcIik7XG5cbi8vIG1hc3Rlckxpc3QuaXRlbXNbMF0uaXRlbXNbMV0uY29tcGxldGVkID0gdHJ1ZTtcbm1hc3Rlckxpc3QuaXRlbXNbMF0uaXRlbXNbMV0uZGF0ZUNyZWF0ZWQgPSAxMDA7XG4vLyBtYXN0ZXJMaXN0Lml0ZW1zWzBdLml0ZW1zWzRdLmNvbXBsZXRlZCA9IHRydWU7XG5cbmNvbnNvbGUubG9nKG1hc3Rlckxpc3QuaXRlbXNbMF0uaXRlbXMpO1xuXG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLml0ZW1zWzRdLnRvZ2dsZUNvbXBsZXRlZCgpO1xuXG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLml0ZW1zWzFdLnRvZ2dsZVByaW9yaXR5KCk7XG5jb25zb2xlLnRhYmxlKG1hc3Rlckxpc3QuaXRlbXNbMF0uaXRlbXMpO1xuKi9cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==