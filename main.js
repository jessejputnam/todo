/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
    this.items.push(new List(title));
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
    this.dateCreated = Date.now();
    this.color = "initial";
    this.items = [];
  }

  // Add Task
  addItem(title, desc, dateDue, priority) {
    this.items.push(new Task(title, desc, dateDue, priority));
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
    this.dateCreated = Date.now();
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
/* harmony export */   "addListItem": () => (/* binding */ addListItem),
/* harmony export */   "addPriorityVisual": () => (/* binding */ addPriorityVisual),
/* harmony export */   "clearForm": () => (/* binding */ clearForm),
/* harmony export */   "dimCompletedTasks": () => (/* binding */ dimCompletedTasks),
/* harmony export */   "expandSelectedDetails": () => (/* binding */ expandSelectedDetails),
/* harmony export */   "hideNonSelectedDetails": () => (/* binding */ hideNonSelectedDetails),
/* harmony export */   "hideSidebarListOptions": () => (/* binding */ hideSidebarListOptions),
/* harmony export */   "removeErrorOutline": () => (/* binding */ removeErrorOutline),
/* harmony export */   "removePriorityVisual": () => (/* binding */ removePriorityVisual),
/* harmony export */   "toggleHideEl": () => (/* binding */ toggleHideEl),
/* harmony export */   "toggleInactiveDetailsBtns": () => (/* binding */ toggleInactiveDetailsBtns),
/* harmony export */   "toggleSidebar": () => (/* binding */ toggleSidebar),
/* harmony export */   "toggleSidebarListOptions": () => (/* binding */ toggleSidebarListOptions),
/* harmony export */   "toggleSidebarNewListTitle": () => (/* binding */ toggleSidebarNewListTitle),
/* harmony export */   "toggleTaskDetailsBtn": () => (/* binding */ toggleTaskDetailsBtn),
/* harmony export */   "undoCompletedDim": () => (/* binding */ undoCompletedDim),
/* harmony export */   "updateActiveListUI": () => (/* binding */ updateActiveListUI)
/* harmony export */ });


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
};

const undoCompletedDim = function (clicked) {
  clicked.parentElement.classList.remove("checked");
  clicked.parentElement.lastElementChild.firstElementChild.classList.remove(
    "btn__details--completed"
  );
  clicked.parentElement.parentElement.classList.remove("completed--true");
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

const expandSelectedDetails = function (clicked, priority, desc) {
  if (clicked.classList.contains("btn__details--open"))
    expandTaskitem(clicked.parentElement.parentElement.parentElement);
};

const hideNonSelectedDetails = function (clicked) {
  if (!clicked.classList.contains("btn__details--open"))
    hideTaskDetails(clicked.parentElement.parentElement.parentElement);
};

// Change priority checkbox visual
const addPriorityVisual = function (e, clicked) {
  // Change box border
  e.target.classList.add("red-border");

  // Change background color of task
  clicked.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add(
    "priority--true"
  );
};

const removePriorityVisual = function (e, clicked) {
  // Change box border
  e.target.classList.remove("red-border");

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

/* ************************************************** */
//* Active Task List
/* ************************************************** */
const updateActiveListUI = function (listNameEl, listName) {
  listNameEl.textContent = listName;
};

/* ************************************************** */
//* HTML Inserts
/* ************************************************** */
const expandTaskitem = function (el, priority, desc) {
  const htmlTaskDetails = `
    <div class="taskitem--expanded">
      <hr class="taskitem__divider" />

      <div class="taskitem__details__container">
        <div class="taskitem__details__txt-container">
          <p>
            I have to forgive myself for the trespasses of the past and move
            to the promise of the future lest I have trouble climbing back
            up <i>de profundis</i>
          </p>
        </div>

        <div class="taskitem__details__actions-container">
          <label class="taskitem__priority-check">
            Priority
            <input
              type="checkbox"
              name="priority__checkbox"
              class="taskitem__priority-check__checkbox"
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

const addListItem = function (el, title, numDue) {
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

const htmlTaskItem = `
  <div class="taskitem">
    <div class="taskitem__abbr">
      <input
        type="checkbox"
        name="completed-checkbox"
        class="taskitem__checkbox"
      />
      <div class="taskitem__txtbox">
        <h3>Task Item 1</h3>
        <p>due in 5 days</p>
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
// Change completed task checkbox visual
activeListWindow.addEventListener("click", (e) => {
  const clicked = e.target.closest(".taskitem__checkbox");
  if (!clicked) return;

  if (clicked.checked) {
    (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.dimCompletedTasks)(clicked);
  }

  // Undo Change completed task visual
  if (!clicked.checked) {
    (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.undoCompletedDim)(clicked);
  }
});

// Visual for open task details button
activeListWindow.addEventListener("click", (e) => {
  const clicked = e.target.closest(".btn__details");

  if (!clicked) return;

  // Toggle task details open on click
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.toggleTaskDetailsBtn)(clicked);
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.toggleInactiveDetailsBtns)(e);
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.expandSelectedDetails)(clicked);
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.hideNonSelectedDetails)(clicked);
});

// Change priority checkbox visual
activeListWindow.addEventListener("click", (e) => {
  const clicked = e.target.closest(".taskitem__priority-check__checkbox");

  if (!clicked) return;

  if (clicked.checked) {
    (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.addPriorityVisual)(e, clicked);
  }

  if (!clicked.checked) {
    (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.removePriorityVisual)(e, clicked);
  }
});

/* ************************************************** */
//* SIDEBAR
/* ************************************************** */
//? ---------- BUTTONS ----------
// Sidebar lists options
btnAddList.addEventListener("click", (e) => {
  // if ()
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.toggleSidebarNewListTitle)(sidebarAddListTitle);
  // addListItem(sidebarHeader, "Main List", 0);
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

  // Add task to list
  activeList.addItem(
    formTitle.value,
    formDesc.value,
    formDue.value,
    formPriority.checked
  );

  console.table(activeList.items);

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
(0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.addListItem)(sidebarHeader, masterList.items[0].title, 0);

// Update activeList visual
let activeList = masterList.items[0];
(0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.updateActiveListUI)(activeListTitle, activeList.title);

//TESTING AREA
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVc7QUFDWCxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFa0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0hyQjs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsTUFBTTtBQUN2QztBQUNBO0FBQ0EsNENBQTRDLE9BQU87QUFDbkQ7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Q0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby8uL3NyYy90b2RvLWxvZ2ljLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvdmlzdWFsLmpzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vLyBNQVNURVIgTElTVFxuY2xhc3MgTWFzdGVyTGlzdCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgfVxuXG4gIGFkZEl0ZW0odGl0bGUpIHtcbiAgICB0aGlzLml0ZW1zLnB1c2gobmV3IExpc3QodGl0bGUpKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGRlbGV0ZUl0ZW0oaW5kZXgpIHtcbiAgICB0aGlzLml0ZW1zLnNwbGljZShpbmRleCwgMSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBtb3ZlSXRlbShpbmRleCwgZGlyKSB7XG4gICAgY29uc3QgbW92ZWRJdGVtID0gdGhpcy5pdGVtcy5zcGxpY2UoaW5kZXgsIDEpWzBdO1xuICAgIGNvbnNvbGUubG9nKG1vdmVkSXRlbSk7XG4gICAgY29uc29sZS5sb2coaW5kZXggKyBkaXIpO1xuICAgIHRoaXMuaXRlbXMuc3BsaWNlKGluZGV4ICsgZGlyLCAwLCBtb3ZlZEl0ZW0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc29ydEl0ZW1zKGNhdGVnb3J5LCByZXZlcnNlQ2hlY2spIHtcbiAgICBpZiAoY2F0ZWdvcnkgPT09IFwiZGF0ZUR1ZVwiIHx8IGNhdGVnb3J5ID09PSBcImNvbXBsZXRlZFwiKSB7XG4gICAgICByZXZlcnNlQ2hlY2sgPT09IGZhbHNlXG4gICAgICAgID8gdGhpcy5pdGVtcy5zb3J0KChhLCBiKSA9PiBhW2NhdGVnb3J5XSAtIGJbY2F0ZWdvcnldKVxuICAgICAgICA6IHRoaXMuaXRlbXMuc29ydCgoYSwgYikgPT4gYltjYXRlZ29yeV0gLSBhW2NhdGVnb3J5XSk7XG4gICAgfSBlbHNlIGlmIChjYXRlZ29yeSA9PT0gXCJ0aXRsZVwiKSB7XG4gICAgICByZXZlcnNlQ2hlY2sgPT09IGZhbHNlXG4gICAgICAgID8gdGhpcy5pdGVtcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuYW1lQSA9IGEudGl0bGUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIGNvbnN0IG5hbWVCID0gYi50aXRsZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKG5hbWVBIDwgbmFtZUIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5hbWVBID4gbmFtZUIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgIH0pXG4gICAgICAgIDogdGhpcy5pdGVtcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuYW1lQSA9IGEudGl0bGUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIGNvbnN0IG5hbWVCID0gYi50aXRsZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKG5hbWVBIDwgbmFtZUIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZUEgPiBuYW1lQikge1xuICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgIH0pO1xuICAgIH0gZWxzZVxuICAgICAgcmV2ZXJzZUNoZWNrID09PSBmYWxzZVxuICAgICAgICA/IHRoaXMuaXRlbXMuc29ydCgoYSwgYikgPT4gYltjYXRlZ29yeV0gLSBhW2NhdGVnb3J5XSlcbiAgICAgICAgOiB0aGlzLml0ZW1zLnNvcnQoKGEsIGIpID0+IGFbY2F0ZWdvcnldIC0gYltjYXRlZ29yeV0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbi8vIExJU1RTXG5jbGFzcyBMaXN0IGV4dGVuZHMgTWFzdGVyTGlzdCB7XG4gIGNvbnN0cnVjdG9yKHRpdGxlKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kYXRlQ3JlYXRlZCA9IERhdGUubm93KCk7XG4gICAgdGhpcy5jb2xvciA9IFwiaW5pdGlhbFwiO1xuICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgfVxuXG4gIC8vIEFkZCBUYXNrXG4gIGFkZEl0ZW0odGl0bGUsIGRlc2MsIGRhdGVEdWUsIHByaW9yaXR5KSB7XG4gICAgdGhpcy5pdGVtcy5wdXNoKG5ldyBUYXNrKHRpdGxlLCBkZXNjLCBkYXRlRHVlLCBwcmlvcml0eSkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgX2NsZWFyQ29tcGxldGVkVGFza3MoKSB7XG4gICAgdGhpcy5pdGVtcyA9IHRoaXMuaXRlbXMuZmlsdGVyKChhKSA9PiBhLmNvbXBsZXRlZCA9PT0gZmFsc2UpO1xuICB9XG59XG5cbi8vIFRBU0tTXG5jbGFzcyBUYXNrIHtcbiAgY29uc3RydWN0b3IodGl0bGUsIGRlc2MsIGRhdGVEdWUsIHByaW9yaXR5KSB7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIHRoaXMuZGVzYyA9IGRlc2M7XG4gICAgdGhpcy5kYXRlQ3JlYXRlZCA9IERhdGUubm93KCk7XG4gICAgdGhpcy5kYXRlRHVlID0gZGF0ZUR1ZTtcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmNvbXBsZXRlZERhdGU7XG4gIH1cblxuICAvLyBUb2dnbGUgQ29tcGxldGVkXG4gIHRvZ2dsZUNvbXBsZXRlZCgpIHtcbiAgICB0aGlzLmNvbXBsZXRlZCA9PT0gZmFsc2VcbiAgICAgID8gKHRoaXMuY29tcGxldGVkID0gdHJ1ZSlcbiAgICAgIDogKHRoaXMuY29tcGxldGVkID0gZmFsc2UpO1xuXG4gICAgaWYgKHRoaXMuY29tcGxldGVkID09PSB0cnVlKVxuICAgICAgdGhpcy5jb21wbGV0ZWREYXRlID0gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZyhuYXZpZ2F0b3IubGFuZ3VhZ2VzWzBdLCB7XG4gICAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxuICAgICAgICBtb250aDogXCJzaG9ydFwiLFxuICAgICAgICBkYXk6IFwiMi1kaWdpdFwiLFxuICAgICAgfSk7XG5cbiAgICBpZiAodGhpcy5jb21wbGV0ZWQgPT09IGZhbHNlKSB0aGlzLmNvbXBsZXRlZERhdGUgPSBcIlwiO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBUb2dnbGUgUHJpb3JpdHlcbiAgdG9nZ2xlUHJpb3JpdHkoKSB7XG4gICAgdGhpcy5wcmlvcml0eSA9PT0gZmFsc2UgPyAodGhpcy5wcmlvcml0eSA9IHRydWUpIDogKHRoaXMucHJpb3JpdHkgPSBmYWxzZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuZXhwb3J0IHsgTWFzdGVyTGlzdCwgTGlzdCwgVGFzayB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogVEFCTEUgT0YgQ09OVEVOVFNcbiBcbiAqIERyeSBGdW5jdGlvbnNcbiAqIEhlYWRlciBCdXR0b25zXG4gKiBUYXNrIEJ1dHRvbnNcbiAqIFNpZGViYXIgQnV0dG9uc1xuICogQWN0aXZlIFRhc2sgTGlzdFxuICogSFRNTCBJbnNlcnRzXG4gXG4gKiovXG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogRFJZIEZVTkNUSU9OU1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbmNvbnN0IGNsZWFyRm9ybSA9IGZ1bmN0aW9uIChmb3JtVGl0bGUsIGZvcm1EdWUsIGZvcm1EZXNjLCBmb3JtUHJpb3JpdHkpIHtcbiAgcmVtb3ZlRXJyb3JPdXRsaW5lKGZvcm1UaXRsZSk7XG5cbiAgZm9ybVRpdGxlLnZhbHVlID0gXCJcIjtcbiAgZm9ybUR1ZS52YWx1ZSA9IFwiXCI7XG4gIGZvcm1EZXNjLnZhbHVlID0gXCJcIjtcbiAgZm9ybVByaW9yaXR5LmNoZWNrZWQgPSBmYWxzZTtcbn07XG5cbmNvbnN0IHRvZ2dsZUhpZGVFbCA9IChlbCkgPT4gZWwuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGRlblwiKTtcblxuY29uc3QgcmVtb3ZlRXJyb3JPdXRsaW5lID0gKGVsKSA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKFwicmVkLW91dGxpbmVcIik7XG5jb25zdCBhZGRFcnJvck91dGxpbmUgPSAoZWwpID0+IGVsLmNsYXNzTGlzdC5hZGQoXCJyZWQtb3V0bGluZVwiKTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBIRUFERVIgQlVUVE9OU1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vIFNJREVCQVIgVE9HR0xFXG5jb25zdCB0b2dnbGVTaWRlYmFyID0gZnVuY3Rpb24gKFxuICBzaWRlYmFyLFxuICBsaXN0c01lbnVFbmRCYXJzLFxuICBsaXN0c01lbnVNaWRCYXIxLFxuICBsaXN0c01lbnVNaWRCYXIyXG4pIHtcbiAgLy8gUmV2ZWFsIHNpZGUgYmFyXG4gIHRvZ2dsZUhpZGVFbChzaWRlYmFyKTtcblxuICAvLyBUcmFuZm9ybSBjbG9zZSBidXR0b25cbiAgbGlzdHNNZW51RW5kQmFycy5mb3JFYWNoKChiYXIpID0+IGJhci5jbGFzc0xpc3QudG9nZ2xlKFwiYmFyLS12YW5pc2hcIikpO1xuICBsaXN0c01lbnVNaWRCYXIxLmNsYXNzTGlzdC50b2dnbGUoXCJiYXJfX21pZC0tcm90YXRlXCIpO1xuICBsaXN0c01lbnVNaWRCYXIyLmNsYXNzTGlzdC50b2dnbGUoXCJiYXJfX21pZDItLXJvdGF0ZVwiKTtcbn07XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogVEFTSyBCVVRUT05TXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8gQ2hhbmdlIGNvbXBsZXRlZCB0YXNrIGNoZWNrYm94IHZpc3VhbFxuY29uc3QgZGltQ29tcGxldGVkVGFza3MgPSBmdW5jdGlvbiAoY2xpY2tlZCkge1xuICAvLyBDaGFuZ2UgdGFzayB0ZXh0IGNvbG9yIC8gc3RyaWtldGhydVxuICBjbGlja2VkLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImNoZWNrZWRcIik7XG5cbiAgLy8gQ2hhbmdlIHRhc2sgZGV0YWlscyBidXR0b24gY29sb3JcbiAgY2xpY2tlZC5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQuY2xhc3NMaXN0LmFkZChcbiAgICBcImJ0bl9fZGV0YWlscy0tY29tcGxldGVkXCJcbiAgKTtcblxuICAvLyBDaGFuZ2UgdGFzayBpdGVtIGZpbHRlclxuICBjbGlja2VkLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiY29tcGxldGVkLS10cnVlXCIpO1xufTtcblxuY29uc3QgdW5kb0NvbXBsZXRlZERpbSA9IGZ1bmN0aW9uIChjbGlja2VkKSB7XG4gIGNsaWNrZWQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiY2hlY2tlZFwiKTtcbiAgY2xpY2tlZC5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQuY2xhc3NMaXN0LnJlbW92ZShcbiAgICBcImJ0bl9fZGV0YWlscy0tY29tcGxldGVkXCJcbiAgKTtcbiAgY2xpY2tlZC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImNvbXBsZXRlZC0tdHJ1ZVwiKTtcbn07XG5cbi8vIFZpc3VhbCBmb3Igb3BlbiB0YXNrIGRldGFpbHMgYnV0dG9uXG5jb25zdCB0b2dnbGVUYXNrRGV0YWlsc0J0biA9IGZ1bmN0aW9uIChjbGlja2VkKSB7XG4gIGNsaWNrZWQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYnRuX19kZXRhaWxzLS1vcGVuXCIpXG4gICAgPyBjbGlja2VkLmNsYXNzTGlzdC5yZW1vdmUoXCJidG5fX2RldGFpbHMtLW9wZW5cIilcbiAgICA6IGNsaWNrZWQuY2xhc3NMaXN0LmFkZChcImJ0bl9fZGV0YWlscy0tb3BlblwiKTtcbn07XG5cbmNvbnN0IHRvZ2dsZUluYWN0aXZlRGV0YWlsc0J0bnMgPSBmdW5jdGlvbiAoZSkge1xuICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5idG5fX2RldGFpbHNcIik7XG4gIGZvciAobGV0IGJ1dHRvbiBvZiBidXR0b25zKSB7XG4gICAgLy8gQ2xvc2UgYW55IHRhc2sgZGV0YWlscyBvcGVuIHRvIHN0b3AgbXVsdGlwbGUgYXQgb25jZVxuICAgIGlmIChidXR0b24gIT09IGUudGFyZ2V0KSB7XG4gICAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImJ0bl9fZGV0YWlscy0tb3BlblwiKTtcblxuICAgICAgaWYgKFxuICAgICAgICBidXR0b24ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoID09PSAyXG4gICAgICApXG4gICAgICAgIGhpZGVUYXNrRGV0YWlscyhidXR0b24ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgZXhwYW5kU2VsZWN0ZWREZXRhaWxzID0gZnVuY3Rpb24gKGNsaWNrZWQsIHByaW9yaXR5LCBkZXNjKSB7XG4gIGlmIChjbGlja2VkLmNsYXNzTGlzdC5jb250YWlucyhcImJ0bl9fZGV0YWlscy0tb3BlblwiKSlcbiAgICBleHBhbmRUYXNraXRlbShjbGlja2VkLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KTtcbn07XG5cbmNvbnN0IGhpZGVOb25TZWxlY3RlZERldGFpbHMgPSBmdW5jdGlvbiAoY2xpY2tlZCkge1xuICBpZiAoIWNsaWNrZWQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYnRuX19kZXRhaWxzLS1vcGVuXCIpKVxuICAgIGhpZGVUYXNrRGV0YWlscyhjbGlja2VkLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KTtcbn07XG5cbi8vIENoYW5nZSBwcmlvcml0eSBjaGVja2JveCB2aXN1YWxcbmNvbnN0IGFkZFByaW9yaXR5VmlzdWFsID0gZnVuY3Rpb24gKGUsIGNsaWNrZWQpIHtcbiAgLy8gQ2hhbmdlIGJveCBib3JkZXJcbiAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcInJlZC1ib3JkZXJcIik7XG5cbiAgLy8gQ2hhbmdlIGJhY2tncm91bmQgY29sb3Igb2YgdGFza1xuICBjbGlja2VkLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFxuICAgIFwicHJpb3JpdHktLXRydWVcIlxuICApO1xufTtcblxuY29uc3QgcmVtb3ZlUHJpb3JpdHlWaXN1YWwgPSBmdW5jdGlvbiAoZSwgY2xpY2tlZCkge1xuICAvLyBDaGFuZ2UgYm94IGJvcmRlclxuICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwicmVkLWJvcmRlclwiKTtcblxuICAvLyBDaGFuZ2UgYmFja2dyb3VuZCBjb2xvciBiYWNrXG4gIGNsaWNrZWQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXG4gICAgXCJwcmlvcml0eS0tdHJ1ZVwiXG4gICk7XG59O1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIFNJREVCQVIgQlVUVE9OU1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vIFNpZGViYXIgbGlzdHMgb3B0aW9uc1xuY29uc3QgdG9nZ2xlU2lkZWJhckxpc3RPcHRpb25zID0gZnVuY3Rpb24gKGNsaWNrZWQpIHtcbiAgdG9nZ2xlSGlkZUVsKGNsaWNrZWQucGFyZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkKTtcbiAgLy8gY2xpY2tlZC5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGRlblwiKTtcbn07XG5cbmNvbnN0IGhpZGVTaWRlYmFyTGlzdE9wdGlvbnMgPSBmdW5jdGlvbiAoY2xpY2tlZCkge1xuICB0b2dnbGVIaWRlRWwoY2xpY2tlZC5wYXJlbnRFbGVtZW50KTtcbiAgLy8gY2xpY2tlZC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG59O1xuXG5jb25zdCB0b2dnbGVTaWRlYmFyTmV3TGlzdFRpdGxlID0gZnVuY3Rpb24gKGVsKSB7XG4gIGVsLmNsYXNzTGlzdC50b2dnbGUoXCJhZGRfX2xpc3QtdGl0bGUtLXZpc2libGVcIik7XG59O1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIEFjdGl2ZSBUYXNrIExpc3Rcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5jb25zdCB1cGRhdGVBY3RpdmVMaXN0VUkgPSBmdW5jdGlvbiAobGlzdE5hbWVFbCwgbGlzdE5hbWUpIHtcbiAgbGlzdE5hbWVFbC50ZXh0Q29udGVudCA9IGxpc3ROYW1lO1xufTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBIVE1MIEluc2VydHNcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5jb25zdCBleHBhbmRUYXNraXRlbSA9IGZ1bmN0aW9uIChlbCwgcHJpb3JpdHksIGRlc2MpIHtcbiAgY29uc3QgaHRtbFRhc2tEZXRhaWxzID0gYFxuICAgIDxkaXYgY2xhc3M9XCJ0YXNraXRlbS0tZXhwYW5kZWRcIj5cbiAgICAgIDxociBjbGFzcz1cInRhc2tpdGVtX19kaXZpZGVyXCIgLz5cblxuICAgICAgPGRpdiBjbGFzcz1cInRhc2tpdGVtX19kZXRhaWxzX19jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhc2tpdGVtX19kZXRhaWxzX190eHQtY29udGFpbmVyXCI+XG4gICAgICAgICAgPHA+XG4gICAgICAgICAgICBJIGhhdmUgdG8gZm9yZ2l2ZSBteXNlbGYgZm9yIHRoZSB0cmVzcGFzc2VzIG9mIHRoZSBwYXN0IGFuZCBtb3ZlXG4gICAgICAgICAgICB0byB0aGUgcHJvbWlzZSBvZiB0aGUgZnV0dXJlIGxlc3QgSSBoYXZlIHRyb3VibGUgY2xpbWJpbmcgYmFja1xuICAgICAgICAgICAgdXAgPGk+ZGUgcHJvZnVuZGlzPC9pPlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhc2tpdGVtX19kZXRhaWxzX19hY3Rpb25zLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cInRhc2tpdGVtX19wcmlvcml0eS1jaGVja1wiPlxuICAgICAgICAgICAgUHJpb3JpdHlcbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICBuYW1lPVwicHJpb3JpdHlfX2NoZWNrYm94XCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJ0YXNraXRlbV9fcHJpb3JpdHktY2hlY2tfX2NoZWNrYm94XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFza2l0ZW1fX2VkaXRfX2NvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBzcmM9XCIuL2ltYWdlcy9lZGl0LnN2Z1wiXG4gICAgICAgICAgICAgIGhlaWdodD1cIjIycHhcIlxuICAgICAgICAgICAgICBhbHQ9XCJFZGl0IHRhc2tcIlxuICAgICAgICAgICAgICB0aXRsZT1cIkVkaXQgdGFza1wiXG4gICAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bl9fdGFza2l0ZW1fX2VkaXRcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFza2l0ZW1fX2RlbF9fY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIHNyYz1cIi4vaW1hZ2VzL3RyYXNoLnN2Z1wiXG4gICAgICAgICAgICAgIGhlaWdodD1cIjI1cHhcIlxuICAgICAgICAgICAgICBhbHQ9XCJEZWxldGUgdGFza1wiXG4gICAgICAgICAgICAgIHRpdGxlPVwiRGVsZXRlIHRhc2tcIlxuICAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG5fX3Rhc2tpdGVtX19kZWxldGVcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwhLS0gZW5kIHRhc2tpdGVtX19kZXRhaWxzX19hY3Rpb25zLWNvbnRhaW5lciAtLT5cbiAgICAgIDwvZGl2PlxuICAgICAgPCEtLSBlbmQgdGFza2l0ZW1fX2RldGFpbHNfX2NvbnRhaW5lciAtLT5cbiAgICA8L2Rpdj5cbiAgYDtcblxuICBlbC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgaHRtbFRhc2tEZXRhaWxzKTtcbn07XG5cbmNvbnN0IGhpZGVUYXNrRGV0YWlscyA9IGZ1bmN0aW9uIChlbCkge1xuICBlbC5yZW1vdmVDaGlsZChlbC5sYXN0RWxlbWVudENoaWxkKTtcbn07XG5cbmNvbnN0IGFkZExpc3RJdGVtID0gZnVuY3Rpb24gKGVsLCB0aXRsZSwgbnVtRHVlKSB7XG4gIGNvbnN0IGh0bWxMaXN0SXRlbSA9IGBcbiAgPGRpdiBjbGFzcz1cInNpZGViYXJfX2xpc3RpdGVtXCI+XG4gIDxkaXYgY2xhc3M9XCJsaXN0aXRlbV9fb3B0aW9uc19fY29udGFpbmVyXCI+XG4gIDxpbWdcbiAgc3JjPVwiLi9pbWFnZXMvbGlzdHMtbWVudS5wbmdcIlxuICBoZWlnaHQ9XCIyMHB4XCJcbiAgY2xhc3M9XCJidG4gYnRuX19saXN0aXRlbV9fb3B0aW9uc1wiXG4gIC8+XG4gIDxkaXYgY2xhc3M9XCJsaXN0aXRlbV9fb3B0aW9uc19fbWVudV9fY29udGFpbmVyIGhpZGRlblwiPlxuICA8ZGl2IGNsYXNzPVwiYXJyb3ctdXBcIj48L2Rpdj5cbiAgPGltZ1xuICBzcmM9XCIuL2ltYWdlcy90cmFzaC5zdmdcIlxuICBjbGFzcz1cImJ0biBidG5fX2xpc3RpdGVtIGJ0bl9fbGlzdGl0ZW0tLWRlbFwiXG4gIGhlaWdodD1cIjI4cHhcIlxuICAvPlxuICA8aW1nXG4gIHNyYz1cIi4vaW1hZ2VzL2Rvd24tdHJpYW5nbGUucG5nXCJcbiAgY2xhc3M9XCJidG4gYnRuX19saXN0aXRlbSBidG5fX2xpc3RpdGVtLS11cFwiXG4gIGhlaWdodD1cIjI4cHhcIlxuICAvPlxuICA8aW1nXG4gIHNyYz1cIi4vaW1hZ2VzL2Rvd24tdHJpYW5nbGUucG5nXCJcbiAgY2xhc3M9XCJidG4gYnRuX19saXN0aXRlbSBidG5fX2xpc3RpdGVtLS1kb3duXCJcbiAgaGVpZ2h0PVwiMjhweFwiXG4gIC8+XG4gIDwvZGl2PlxuICA8IS0tIGVuZCBsaXN0aXRlbV9fb3B0aW9uc19fbWVudV9fY29udGFpbmVyIC0tPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImxpc3RpdGVtX190aXRsZVwiPiR7dGl0bGV9PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJsaXN0aXRlbV9fZHVlLWNvdW50XCI+XG4gIDxkaXYgY2xhc3M9XCJsaXN0aXRlbV9fZHVlLWNvdW50X190aXRsZVwiPlRhc2tzIER1ZTo8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImxpc3RpdGVtX19kdWUtY291bnRfX2NvdW50XCI+JHtudW1EdWV9PC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgYDtcblxuICBlbC5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlcmVuZFwiLCBodG1sTGlzdEl0ZW0pO1xufTtcblxuY29uc3QgaHRtbFRhc2tJdGVtID0gYFxuICA8ZGl2IGNsYXNzPVwidGFza2l0ZW1cIj5cbiAgICA8ZGl2IGNsYXNzPVwidGFza2l0ZW1fX2FiYnJcIj5cbiAgICAgIDxpbnB1dFxuICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICBuYW1lPVwiY29tcGxldGVkLWNoZWNrYm94XCJcbiAgICAgICAgY2xhc3M9XCJ0YXNraXRlbV9fY2hlY2tib3hcIlxuICAgICAgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0YXNraXRlbV9fdHh0Ym94XCI+XG4gICAgICAgIDxoMz5UYXNrIEl0ZW0gMTwvaDM+XG4gICAgICAgIDxwPmR1ZSBpbiA1IGRheXM8L3A+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0YXNraXRlbV9fYnRuLWRldGFpbHNfX2NvbnRhaW5lclwiPlxuICAgICAgICA8aW1nXG4gICAgICAgICAgc3JjPVwiLi9pbWFnZXMvZG93bi10cmlhbmdsZS5wbmdcIlxuICAgICAgICAgIGFsdD1cIk9wZW4gZGV0YWlsc1wiXG4gICAgICAgICAgdGl0bGU9XCJEZXRhaWxzXCJcbiAgICAgICAgICBoZWlnaHQ9XCIyMHB4XCJcbiAgICAgICAgICBjbGFzcz1cImJ0biBidG5fX2RldGFpbHNcIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuYDtcblxuZXhwb3J0IHtcbiAgY2xlYXJGb3JtLFxuICB0b2dnbGVTaWRlYmFyLFxuICBkaW1Db21wbGV0ZWRUYXNrcyxcbiAgdW5kb0NvbXBsZXRlZERpbSxcbiAgdG9nZ2xlVGFza0RldGFpbHNCdG4sXG4gIHRvZ2dsZUluYWN0aXZlRGV0YWlsc0J0bnMsXG4gIGV4cGFuZFNlbGVjdGVkRGV0YWlscyxcbiAgaGlkZU5vblNlbGVjdGVkRGV0YWlscyxcbiAgYWRkUHJpb3JpdHlWaXN1YWwsXG4gIHJlbW92ZVByaW9yaXR5VmlzdWFsLFxuICB0b2dnbGVTaWRlYmFyTGlzdE9wdGlvbnMsXG4gIGhpZGVTaWRlYmFyTGlzdE9wdGlvbnMsXG4gIGFkZExpc3RJdGVtLFxuICB1cGRhdGVBY3RpdmVMaXN0VUksXG4gIHRvZ2dsZVNpZGViYXJOZXdMaXN0VGl0bGUsXG4gIHJlbW92ZUVycm9yT3V0bGluZSxcbiAgYWRkRXJyb3JPdXRsaW5lLFxuICB0b2dnbGVIaWRlRWwsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gXG4gVEFCTEUgT0YgQ09OVEVOVFNcblxuICogTW9kdWxlc1xuICogRE9NIFZhcmlhYmxlc1xuICogRFJZIEZ1bmN0aW9uc1xuICogSGVhZGVyIEJ1dHRvbnNcbiAqIFRhc2sgQnV0dG9uc1xuICogU2lkZWJhciBCdXR0b25zXG4gKiBGb3JtIEJ1dHRvbnNcbiAqIEFwcCBMb2dpY1xuXG4qKi9cblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBNT0RVTEVTXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuaW1wb3J0IHsgTWFzdGVyTGlzdCB9IGZyb20gXCIuL3RvZG8tbG9naWMuanNcIjtcbmltcG9ydCB7XG4gIGFkZFByaW9yaXR5VmlzdWFsLFxuICBkaW1Db21wbGV0ZWRUYXNrcyxcbiAgZXhwYW5kU2VsZWN0ZWREZXRhaWxzLFxuICBoaWRlTm9uU2VsZWN0ZWREZXRhaWxzLFxuICByZW1vdmVQcmlvcml0eVZpc3VhbCxcbiAgdG9nZ2xlSW5hY3RpdmVEZXRhaWxzQnRucyxcbiAgdG9nZ2xlU2lkZWJhcixcbiAgdG9nZ2xlU2lkZWJhckxpc3RPcHRpb25zLFxuICB0b2dnbGVUYXNrRGV0YWlsc0J0bixcbiAgdW5kb0NvbXBsZXRlZERpbSxcbiAgY2xlYXJGb3JtLFxuICBoaWRlU2lkZWJhckxpc3RPcHRpb25zLFxuICBhZGRMaXN0SXRlbSxcbiAgdXBkYXRlQWN0aXZlTGlzdFVJLFxuICB0b2dnbGVTaWRlYmFyTmV3TGlzdFRpdGxlLFxuICByZW1vdmVFcnJvck91dGxpbmUsXG4gIGFkZEVycm9yT3V0bGluZSxcbiAgdG9nZ2xlSGlkZUVsLFxufSBmcm9tIFwiLi92aXN1YWwuanNcIjtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBET00gVkFSSUFCTEVTXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8gQlVUVE9OU1xuLy8gLS0tLSBIZWFkZXJcbmNvbnN0IGJ0bkxpc3RzTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGlzdHMtbWVudVwiKTtcbmNvbnN0IGxpc3RzTWVudUVuZEJhcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJhcl9fZW5kXCIpO1xuY29uc3QgbGlzdHNNZW51TWlkQmFyMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYmFyX19taWRcIik7XG5jb25zdCBsaXN0c01lbnVNaWRCYXIyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5iYXJfX21pZDJcIik7XG5jb25zdCBidG5BZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFza1wiKTtcblxuLy8gLS0tLSBUYXNrc1xuY29uc3QgY2hlY2tib3hUYXNrQ29tcGxldGUgPVxuICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidGFza2l0ZW1fX2NoZWNrYm94XCIpO1xuY29uc3QgYnRuVGFza0RldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYnRuX19kZXRhaWxzXCIpO1xuY29uc3QgY2hlY2tib3hQcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXG4gIFwidGFza2l0ZW1fX3ByaW9yaXR5LWNoZWNrX19jaGVja2JveFwiXG4pO1xuY29uc3QgYnRuRWRpdFRhc2sgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYnRuX190YXNraXRlbV9fZWRpdFwiKTtcbmNvbnN0IGJ0bkRlbFRhc2sgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYnRuX190YXNraXRlbV9fZGVsZXRlXCIpO1xuXG4vLyAtLS0tIFNpZGViYXJcbmNvbnN0IGJ0bkFkZExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bl9fc2lkZWJhcl9fYWRkLWxpc3RcIik7XG5jb25zdCBidG5MaXN0c09wdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYnRuX19saXN0aXRlbV9fb3B0aW9uc1wiKTtcblxuLy8gLS0tLSBGb3JtXG5jb25zdCBidG5Gb3JtQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bl9fZm9ybS1jbG9zZVwiKTtcbmNvbnN0IGJ0bkZvcm1TdWJtaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bl9fZm9ybS1zdWJtaXRcIik7XG5cbi8vIFNJREVCQVJcbmNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXJcIik7XG5jb25zdCBzaWRlYmFySGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyX19oZWFkZXJcIik7XG5jb25zdCBzaWRlYmFyQWRkTGlzdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgXCIuc2lkZWJhcl9fYWRkLWxpc3RfX2FkZC10aXRsZV9fY29udGFpbmVyXCJcbik7XG5jb25zdCBsaXN0SXRlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic2lkZWJhcl9fbGlzdGl0ZW1cIik7XG5jb25zdCBsaXN0SXRlbXNPcHRpb25zTWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXG4gIFwibGlzdGl0ZW1fX29wdGlvbnNfX21lbnVfX2NvbnRhaW5lclwiXG4pO1xuXG4vLyBGT1JNXG5jb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtXCIpO1xuY29uc3QgZm9ybVRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtX190ZXh0LS10aXRsZVwiKTtcbmNvbnN0IGZvcm1EdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm1fX2RhdGVcIik7XG5jb25zdCBmb3JtRGVzYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybV9fdGV4dC1hcmVhXCIpO1xuY29uc3QgZm9ybVByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtX19wcmlvcml0eV9fY2hlY2tib3hcIik7XG5cbi8vIC0tIE1BSU4gQVBQXG5jb25zdCBhY3RpdmVMaXN0V2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLWFwcFwiKTtcbmNvbnN0IGFjdGl2ZUxpc3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWN0aXZlLWxpc3RfX3RpdGxlXCIpO1xuY29uc3QgdGFza0l0ZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRhc2tpdGVtXCIpO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIERSWSBGVU5DVElPTlNcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogSEVBREVSXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8/IC0tLS0tLS0tLS0gQlVUVE9OUyAtLS0tLS0tLS0tXG4vLyBTSURFQkFSIFRPR0dMRVxuYnRuTGlzdHNNZW51LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIHRvZ2dsZVNpZGViYXIoc2lkZWJhciwgbGlzdHNNZW51RW5kQmFycywgbGlzdHNNZW51TWlkQmFyMSwgbGlzdHNNZW51TWlkQmFyMik7XG59KTtcblxuLy8gQUREIFRBU0sgT1BFTlxuYnRuQWRkVGFzay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICB0b2dnbGVIaWRlRWwoZm9ybSk7XG59KTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBUQVNLXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8/IC0tLS0tLS0tLS0gQlVUVE9OUyAtLS0tLS0tLS0tXG4vLyBDaGFuZ2UgY29tcGxldGVkIHRhc2sgY2hlY2tib3ggdmlzdWFsXG5hY3RpdmVMaXN0V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBjb25zdCBjbGlja2VkID0gZS50YXJnZXQuY2xvc2VzdChcIi50YXNraXRlbV9fY2hlY2tib3hcIik7XG4gIGlmICghY2xpY2tlZCkgcmV0dXJuO1xuXG4gIGlmIChjbGlja2VkLmNoZWNrZWQpIHtcbiAgICBkaW1Db21wbGV0ZWRUYXNrcyhjbGlja2VkKTtcbiAgfVxuXG4gIC8vIFVuZG8gQ2hhbmdlIGNvbXBsZXRlZCB0YXNrIHZpc3VhbFxuICBpZiAoIWNsaWNrZWQuY2hlY2tlZCkge1xuICAgIHVuZG9Db21wbGV0ZWREaW0oY2xpY2tlZCk7XG4gIH1cbn0pO1xuXG4vLyBWaXN1YWwgZm9yIG9wZW4gdGFzayBkZXRhaWxzIGJ1dHRvblxuYWN0aXZlTGlzdFdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgY29uc3QgY2xpY2tlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIuYnRuX19kZXRhaWxzXCIpO1xuXG4gIGlmICghY2xpY2tlZCkgcmV0dXJuO1xuXG4gIC8vIFRvZ2dsZSB0YXNrIGRldGFpbHMgb3BlbiBvbiBjbGlja1xuICB0b2dnbGVUYXNrRGV0YWlsc0J0bihjbGlja2VkKTtcbiAgdG9nZ2xlSW5hY3RpdmVEZXRhaWxzQnRucyhlKTtcbiAgZXhwYW5kU2VsZWN0ZWREZXRhaWxzKGNsaWNrZWQpO1xuICBoaWRlTm9uU2VsZWN0ZWREZXRhaWxzKGNsaWNrZWQpO1xufSk7XG5cbi8vIENoYW5nZSBwcmlvcml0eSBjaGVja2JveCB2aXN1YWxcbmFjdGl2ZUxpc3RXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGNvbnN0IGNsaWNrZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiLnRhc2tpdGVtX19wcmlvcml0eS1jaGVja19fY2hlY2tib3hcIik7XG5cbiAgaWYgKCFjbGlja2VkKSByZXR1cm47XG5cbiAgaWYgKGNsaWNrZWQuY2hlY2tlZCkge1xuICAgIGFkZFByaW9yaXR5VmlzdWFsKGUsIGNsaWNrZWQpO1xuICB9XG5cbiAgaWYgKCFjbGlja2VkLmNoZWNrZWQpIHtcbiAgICByZW1vdmVQcmlvcml0eVZpc3VhbChlLCBjbGlja2VkKTtcbiAgfVxufSk7XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogU0lERUJBUlxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vPyAtLS0tLS0tLS0tIEJVVFRPTlMgLS0tLS0tLS0tLVxuLy8gU2lkZWJhciBsaXN0cyBvcHRpb25zXG5idG5BZGRMaXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAvLyBpZiAoKVxuICB0b2dnbGVTaWRlYmFyTmV3TGlzdFRpdGxlKHNpZGViYXJBZGRMaXN0VGl0bGUpO1xuICAvLyBhZGRMaXN0SXRlbShzaWRlYmFySGVhZGVyLCBcIk1haW4gTGlzdFwiLCAwKTtcbn0pO1xuXG5zaWRlYmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBjb25zdCBjbGlja2VkID0gZS50YXJnZXQuY2xvc2VzdChcIi5idG5fX2xpc3RpdGVtX19vcHRpb25zXCIpO1xuICBpZiAoIWNsaWNrZWQpIHJldHVybjtcblxuICB0b2dnbGVTaWRlYmFyTGlzdE9wdGlvbnMoY2xpY2tlZCk7XG59KTtcblxuc2lkZWJhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgY29uc3QgY2xpY2tlZFRyYXNoID0gZS50YXJnZXQuY2xvc2VzdChcIi5idG5fX2xpc3RpdGVtLS1kZWxcIik7XG4gIGNvbnN0IGNsaWNrZWRBcnJvd1VwID0gZS50YXJnZXQuY2xvc2VzdChcIi5idG5fX2xpc3RpdGVtLS11cFwiKTtcbiAgY29uc3QgY2xpY2tlZEFycm93RG93biA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIuYnRuX19saXN0aXRlbS0tZG93blwiKTtcblxuICBpZiAoIWNsaWNrZWRUcmFzaCAmJiAhY2xpY2tlZEFycm93VXAgJiYgIWNsaWNrZWRBcnJvd0Rvd24pIHJldHVybjtcblxuICBpZiAoY2xpY2tlZFRyYXNoIHx8IGNsaWNrZWRBcnJvd1VwIHx8IGNsaWNrZWRBcnJvd0Rvd24pIHtcbiAgICBjb25zdCBjbGlja2VkID0gY2xpY2tlZFRyYXNoIHx8IGNsaWNrZWRBcnJvd1VwIHx8IGNsaWNrZWRBcnJvd0Rvd247XG4gICAgaGlkZVNpZGViYXJMaXN0T3B0aW9ucyhjbGlja2VkKTtcbiAgfVxufSk7XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogRk9STVxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbmZvcm1UaXRsZS5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgKCkgPT4ge1xuICByZW1vdmVFcnJvck91dGxpbmUoZm9ybVRpdGxlKTtcbn0pO1xuXG4vLz8gLS0tLS0tLS0tLSBCVVRUT05TIC0tLS0tLS0tLS1cbmJ0bkZvcm1DbG9zZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICB0b2dnbGVIaWRlRWwoZm9ybSk7XG4gIGNsZWFyRm9ybShmb3JtVGl0bGUsIGZvcm1EdWUsIGZvcm1EZXNjLCBmb3JtUHJpb3JpdHkpO1xufSk7XG5cbmJ0bkZvcm1TdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcblxuICAvLyBFcnJvciBpZiBUYXNrIHRpdGxlIG5vdCBkZXNpZ25hdGVkXG4gIGlmIChmb3JtVGl0bGUudmFsdWUgPT09IFwiXCIpIHtcbiAgICBhZGRFcnJvck91dGxpbmUoZm9ybVRpdGxlKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBBZGQgdGFzayB0byBsaXN0XG4gIGFjdGl2ZUxpc3QuYWRkSXRlbShcbiAgICBmb3JtVGl0bGUudmFsdWUsXG4gICAgZm9ybURlc2MudmFsdWUsXG4gICAgZm9ybUR1ZS52YWx1ZSxcbiAgICBmb3JtUHJpb3JpdHkuY2hlY2tlZFxuICApO1xuXG4gIGNvbnNvbGUudGFibGUoYWN0aXZlTGlzdC5pdGVtcyk7XG5cbiAgLy8gSGlkZSBhbmQgcmVzZXQgZm9ybVxuICB0b2dnbGVIaWRlRWwoZm9ybSk7XG4gIGNsZWFyRm9ybShmb3JtVGl0bGUsIGZvcm1EdWUsIGZvcm1EZXNjLCBmb3JtUHJpb3JpdHkpO1xufSk7XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogQVBQIExPR0lDXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8gSW5pdGlhbGl6ZSBNYXN0ZXIgTGlzdFxuY29uc3QgbWFzdGVyTGlzdCA9IG5ldyBNYXN0ZXJMaXN0KCk7XG5cbi8vIEFkZCBEZWZhdWx0IExpc3QgdG8gTWFzdGVyIExpc3Rcbm1hc3Rlckxpc3QuYWRkSXRlbShcIk1haW4gTGlzdFwiKTtcblxuLy8gQWRkIERlZmF1bHQgbGlzdCB0byBzaWRlYmFyXG5hZGRMaXN0SXRlbShzaWRlYmFySGVhZGVyLCBtYXN0ZXJMaXN0Lml0ZW1zWzBdLnRpdGxlLCAwKTtcblxuLy8gVXBkYXRlIGFjdGl2ZUxpc3QgdmlzdWFsXG5sZXQgYWN0aXZlTGlzdCA9IG1hc3Rlckxpc3QuaXRlbXNbMF07XG51cGRhdGVBY3RpdmVMaXN0VUkoYWN0aXZlTGlzdFRpdGxlLCBhY3RpdmVMaXN0LnRpdGxlKTtcblxuLy9URVNUSU5HIEFSRUFcbi8qKlxuICpcbiAqXG4gKlxuICpcbiAqXG4gKlxuICpcbiAqL1xuXG4vKlxuLy8gVEVTVCBTQU1QTEVTXG4vLyBDcmVhdGUgTWFzdGVyIExpc3RcbmNvbnN0IG1hc3Rlckxpc3QgPSBuZXcgTWFzdGVyTGlzdCgpO1xuXG4vLyBBZGQgTGlzdHMgdG8gTWFzdGVyIExpc3Rcbm1hc3Rlckxpc3QuYWRkSXRlbShcIlRlc3QgTGlzdFwiKTtcbm1hc3Rlckxpc3QuYWRkSXRlbShcIkEgVGVzdCBMaXN0IDJcIik7XG5tYXN0ZXJMaXN0LmFkZEl0ZW0oXCJUZXN0IExpc3QgM1wiKTtcbm1hc3Rlckxpc3QuYWRkSXRlbShcIlRlc3QgTGlzdCA0XCIpO1xuXG4vLyBBZGQgVGFza3MgdG8gTGlzdCBpbiBNYXN0ZXIgTGlzdFxubWFzdGVyTGlzdC5pdGVtc1swXS5hZGRJdGVtKFwidGVzdDFcIiwgXCJhIHRlc3QxIGRlc2NcIiwgXCI4LjEwXCIpO1xubWFzdGVyTGlzdC5pdGVtc1swXS5hZGRJdGVtKFwidGVzdDJcIiwgXCJiIHRlc3QyIGRlc2NcIiwgXCI4LjA4XCIpO1xubWFzdGVyTGlzdC5pdGVtc1swXS5hZGRJdGVtKFwidGVzdDNcIiwgXCJjIHRlc3QzIGRlc2NcIiwgXCI3LjE2XCIpO1xubWFzdGVyTGlzdC5pdGVtc1swXS5hZGRJdGVtKFwidGVzdDRcIiwgXCJkIHRlc3Q0IGRlc2NcIiwgXCIxMi4yMlwiKTtcbm1hc3Rlckxpc3QuaXRlbXNbMF0uYWRkSXRlbShcInRlc3Q1XCIsIFwiZSB0ZXN0NSBkZXNjXCIsIFwiMy4yMlwiKTtcblxuLy8gbWFzdGVyTGlzdC5pdGVtc1swXS5pdGVtc1sxXS5jb21wbGV0ZWQgPSB0cnVlO1xubWFzdGVyTGlzdC5pdGVtc1swXS5pdGVtc1sxXS5kYXRlQ3JlYXRlZCA9IDEwMDtcbi8vIG1hc3Rlckxpc3QuaXRlbXNbMF0uaXRlbXNbNF0uY29tcGxldGVkID0gdHJ1ZTtcblxuY29uc29sZS5sb2cobWFzdGVyTGlzdC5pdGVtc1swXS5pdGVtcyk7XG5cbm1hc3Rlckxpc3QuaXRlbXNbMF0uaXRlbXNbNF0udG9nZ2xlQ29tcGxldGVkKCk7XG5cbm1hc3Rlckxpc3QuaXRlbXNbMF0uaXRlbXNbMV0udG9nZ2xlUHJpb3JpdHkoKTtcbmNvbnNvbGUudGFibGUobWFzdGVyTGlzdC5pdGVtc1swXS5pdGVtcyk7XG4qL1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9