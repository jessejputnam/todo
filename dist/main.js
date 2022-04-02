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
  addItem(title, desc, dateDue) {
    this.items.push(new Task(title, desc, dateDue));
    return this;
  }

  _clearCompletedTasks() {
    this.items = this.items.filter((a) => a.completed === false);
  }
}

// TASKS
class Task {
  constructor(title, desc, dateDue) {
    this.title = title;
    this.desc = desc;
    this.dateCreated = Date.now();
    this.dateDue = +dateDue;
    this.priority = false;
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
/* harmony export */   "addPriorityVisual": () => (/* binding */ addPriorityVisual),
/* harmony export */   "clearForm": () => (/* binding */ clearForm),
/* harmony export */   "dimCompletedTasks": () => (/* binding */ dimCompletedTasks),
/* harmony export */   "expandSelectedDetails": () => (/* binding */ expandSelectedDetails),
/* harmony export */   "hideNonSelectedDetails": () => (/* binding */ hideNonSelectedDetails),
/* harmony export */   "hideSidebarListOptions": () => (/* binding */ hideSidebarListOptions),
/* harmony export */   "openAddTask": () => (/* binding */ openAddTask),
/* harmony export */   "removePriorityVisual": () => (/* binding */ removePriorityVisual),
/* harmony export */   "toggleInactiveDetailsBtns": () => (/* binding */ toggleInactiveDetailsBtns),
/* harmony export */   "toggleSidebar": () => (/* binding */ toggleSidebar),
/* harmony export */   "toggleSidebarListOptions": () => (/* binding */ toggleSidebarListOptions),
/* harmony export */   "toggleTaskDetailsBtn": () => (/* binding */ toggleTaskDetailsBtn),
/* harmony export */   "undoCompletedDim": () => (/* binding */ undoCompletedDim)
/* harmony export */ });

/* ************************************************** */
//* DRY FUNCTIONS
/* ************************************************** */
const clearForm = function (form, formTask, formDue, formDesc, formPriority) {
  form.classList.add("hidden");

  formTask.value = "";
  formDue.value = "";
  formDesc.value = "";
  formPriority.checked = false;
};

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
  sidebar.classList.toggle("hidden");

  // Tranform close button
  listsMenuEndBars.forEach((bar) => bar.classList.toggle("bar--vanish"));
  listsMenuMidBar1.classList.toggle("bar__mid--rotate");
  listsMenuMidBar2.classList.toggle("bar__mid2--rotate");
};

// ADD TASK OPEN
const openAddTask = function (form) {
  form.classList.remove("hidden");
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
  e.target.classList.add("taskitem__priority-check__checkbox--red-border");

  // Change background color of task
  clicked.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add(
    "priority--true"
  );
};

const removePriorityVisual = function (e, clicked) {
  // Change box border
  e.target.classList.remove("taskitem__priority-check__checkbox--red-border");

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
  clicked.parentElement.lastElementChild.classList.toggle("hidden");
};

const hideSidebarListOptions = function (clicked) {
  clicked.parentElement.classList.add("hidden");
};

/* ************************************************** */
//* FORM BUTTONS
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
    <div class="listitem__title">Default List</div>
    <div class="listitem__due-count">
      <div class="listitem__due-count__title">Tasks Due:</div>
      <div class="listitem__due-count__count">10</div>
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
const btnListsOpts = document.getElementsByClassName("btn__listitem__options");

// ---- Form
const btnFormClose = document.querySelector(".btn__form-close");
const btnFormSubmit = document.querySelector(".btn__form-submit");

// SIDEBAR
const sidebar = document.querySelector(".sidebar");
const listItems = document.getElementsByClassName("sidebar__listitem");
const listItemsOptionsMenu = document.getElementsByClassName(
  "listitem__options__menu__container"
);

// FORM
const form = document.querySelector(".form");
const formTask = document.querySelector(".form__text--title");
const formDue = document.querySelector(".form__date");
const formDesc = document.querySelector(".form__text-area");
const formPriority = document.querySelector(".form__priority__checkbox");

// -- MAIN APP
const activeListWindow = document.querySelector(".main-app");
const taskItems = document.getElementsByClassName("taskitem");

/* ************************************************** */
//* DRY FUNCTIONS
/* ************************************************** */

/* ************************************************** */
//* HEADER BUTTONS
/* ************************************************** */
// SIDEBAR TOGGLE
btnListsMenu.addEventListener("click", () => {
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.toggleSidebar)(sidebar, listsMenuEndBars, listsMenuMidBar1, listsMenuMidBar2);
});

// ADD TASK OPEN
btnAddTask.addEventListener("click", () => {
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.openAddTask)(form);
});

/* ************************************************** */
//* TASK BUTTONS
/* ************************************************** */
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
//* SIDEBAR BUTTONS
/* ************************************************** */
// Sidebar lists options
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
//* FORM BUTTONS
/* ************************************************** */
btnFormClose.addEventListener("click", () => {
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.clearForm)(form, formTask, formDue, formDesc, formPriority);
});

btnFormSubmit.addEventListener("click", () => {
  (0,_visual_js__WEBPACK_IMPORTED_MODULE_1__.clearForm)(form, formTask, formDue, formDesc, formPriority);
});

/* ************************************************** */
//* APP LOGIC
/* ************************************************** */
const masterList = new _todo_logic_js__WEBPACK_IMPORTED_MODULE_0__.MasterList();

masterList.addItem("Main List");

console.log(masterList);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVc7QUFDWCxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFa0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNIckI7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBZ0JFOzs7Ozs7O1VDcFFGO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTmE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQzZDO0FBZXhCOztBQUVyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLHlEQUFhO0FBQ2YsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsRUFBRSx1REFBVztBQUNiLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLDZEQUFpQjtBQUNyQjs7QUFFQTtBQUNBO0FBQ0EsSUFBSSw0REFBZ0I7QUFDcEI7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEVBQUUsZ0VBQW9CO0FBQ3RCLEVBQUUscUVBQXlCO0FBQzNCLEVBQUUsaUVBQXFCO0FBQ3ZCLEVBQUUsa0VBQXNCO0FBQ3hCLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsSUFBSSw2REFBaUI7QUFDckI7O0FBRUE7QUFDQSxJQUFJLGdFQUFvQjtBQUN4QjtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsRUFBRSxvRUFBd0I7QUFDMUIsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSSxrRUFBc0I7QUFDMUI7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxxREFBUztBQUNYLENBQUM7O0FBRUQ7QUFDQSxFQUFFLHFEQUFTO0FBQ1gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0RBQVU7O0FBRWpDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLy4vc3JjL3RvZG8tbG9naWMuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy92aXN1YWwuanMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIE1BU1RFUiBMSVNUXG5jbGFzcyBNYXN0ZXJMaXN0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pdGVtcyA9IFtdO1xuICB9XG5cbiAgYWRkSXRlbSh0aXRsZSkge1xuICAgIHRoaXMuaXRlbXMucHVzaChuZXcgTGlzdCh0aXRsZSkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGVsZXRlSXRlbShpbmRleCkge1xuICAgIHRoaXMuaXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG1vdmVJdGVtKGluZGV4LCBkaXIpIHtcbiAgICBjb25zdCBtb3ZlZEl0ZW0gPSB0aGlzLml0ZW1zLnNwbGljZShpbmRleCwgMSlbMF07XG4gICAgY29uc29sZS5sb2cobW92ZWRJdGVtKTtcbiAgICBjb25zb2xlLmxvZyhpbmRleCArIGRpcik7XG4gICAgdGhpcy5pdGVtcy5zcGxpY2UoaW5kZXggKyBkaXIsIDAsIG1vdmVkSXRlbSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzb3J0SXRlbXMoY2F0ZWdvcnksIHJldmVyc2VDaGVjaykge1xuICAgIGlmIChjYXRlZ29yeSA9PT0gXCJkYXRlRHVlXCIgfHwgY2F0ZWdvcnkgPT09IFwiY29tcGxldGVkXCIpIHtcbiAgICAgIHJldmVyc2VDaGVjayA9PT0gZmFsc2VcbiAgICAgICAgPyB0aGlzLml0ZW1zLnNvcnQoKGEsIGIpID0+IGFbY2F0ZWdvcnldIC0gYltjYXRlZ29yeV0pXG4gICAgICAgIDogdGhpcy5pdGVtcy5zb3J0KChhLCBiKSA9PiBiW2NhdGVnb3J5XSAtIGFbY2F0ZWdvcnldKTtcbiAgICB9IGVsc2UgaWYgKGNhdGVnb3J5ID09PSBcInRpdGxlXCIpIHtcbiAgICAgIHJldmVyc2VDaGVjayA9PT0gZmFsc2VcbiAgICAgICAgPyB0aGlzLml0ZW1zLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWVBID0gYS50aXRsZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgY29uc3QgbmFtZUIgPSBiLnRpdGxlLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAobmFtZUEgPCBuYW1lQikge1xuICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZUEgPiBuYW1lQikge1xuICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgfSlcbiAgICAgICAgOiB0aGlzLml0ZW1zLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWVBID0gYS50aXRsZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgY29uc3QgbmFtZUIgPSBiLnRpdGxlLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAobmFtZUEgPCBuYW1lQikge1xuICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuYW1lQSA+IG5hbWVCKSB7XG4gICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgfSk7XG4gICAgfSBlbHNlXG4gICAgICByZXZlcnNlQ2hlY2sgPT09IGZhbHNlXG4gICAgICAgID8gdGhpcy5pdGVtcy5zb3J0KChhLCBiKSA9PiBiW2NhdGVnb3J5XSAtIGFbY2F0ZWdvcnldKVxuICAgICAgICA6IHRoaXMuaXRlbXMuc29ydCgoYSwgYikgPT4gYVtjYXRlZ29yeV0gLSBiW2NhdGVnb3J5XSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuLy8gTElTVFNcbmNsYXNzIExpc3QgZXh0ZW5kcyBNYXN0ZXJMaXN0IHtcbiAgY29uc3RydWN0b3IodGl0bGUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB0aGlzLmRhdGVDcmVhdGVkID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLmNvbG9yID0gXCJpbml0aWFsXCI7XG4gICAgdGhpcy5pdGVtcyA9IFtdO1xuICB9XG5cbiAgLy8gQWRkIFRhc2tcbiAgYWRkSXRlbSh0aXRsZSwgZGVzYywgZGF0ZUR1ZSkge1xuICAgIHRoaXMuaXRlbXMucHVzaChuZXcgVGFzayh0aXRsZSwgZGVzYywgZGF0ZUR1ZSkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgX2NsZWFyQ29tcGxldGVkVGFza3MoKSB7XG4gICAgdGhpcy5pdGVtcyA9IHRoaXMuaXRlbXMuZmlsdGVyKChhKSA9PiBhLmNvbXBsZXRlZCA9PT0gZmFsc2UpO1xuICB9XG59XG5cbi8vIFRBU0tTXG5jbGFzcyBUYXNrIHtcbiAgY29uc3RydWN0b3IodGl0bGUsIGRlc2MsIGRhdGVEdWUpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kZXNjID0gZGVzYztcbiAgICB0aGlzLmRhdGVDcmVhdGVkID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLmRhdGVEdWUgPSArZGF0ZUR1ZTtcbiAgICB0aGlzLnByaW9yaXR5ID0gZmFsc2U7XG4gICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmNvbXBsZXRlZERhdGU7XG4gIH1cblxuICAvLyBUb2dnbGUgQ29tcGxldGVkXG4gIHRvZ2dsZUNvbXBsZXRlZCgpIHtcbiAgICB0aGlzLmNvbXBsZXRlZCA9PT0gZmFsc2VcbiAgICAgID8gKHRoaXMuY29tcGxldGVkID0gdHJ1ZSlcbiAgICAgIDogKHRoaXMuY29tcGxldGVkID0gZmFsc2UpO1xuXG4gICAgaWYgKHRoaXMuY29tcGxldGVkID09PSB0cnVlKVxuICAgICAgdGhpcy5jb21wbGV0ZWREYXRlID0gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZyhuYXZpZ2F0b3IubGFuZ3VhZ2VzWzBdLCB7XG4gICAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxuICAgICAgICBtb250aDogXCJzaG9ydFwiLFxuICAgICAgICBkYXk6IFwiMi1kaWdpdFwiLFxuICAgICAgfSk7XG5cbiAgICBpZiAodGhpcy5jb21wbGV0ZWQgPT09IGZhbHNlKSB0aGlzLmNvbXBsZXRlZERhdGUgPSBcIlwiO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBUb2dnbGUgUHJpb3JpdHlcbiAgdG9nZ2xlUHJpb3JpdHkoKSB7XG4gICAgdGhpcy5wcmlvcml0eSA9PT0gZmFsc2UgPyAodGhpcy5wcmlvcml0eSA9IHRydWUpIDogKHRoaXMucHJpb3JpdHkgPSBmYWxzZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuZXhwb3J0IHsgTWFzdGVyTGlzdCwgTGlzdCwgVGFzayB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIERSWSBGVU5DVElPTlNcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5jb25zdCBjbGVhckZvcm0gPSBmdW5jdGlvbiAoZm9ybSwgZm9ybVRhc2ssIGZvcm1EdWUsIGZvcm1EZXNjLCBmb3JtUHJpb3JpdHkpIHtcbiAgZm9ybS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuXG4gIGZvcm1UYXNrLnZhbHVlID0gXCJcIjtcbiAgZm9ybUR1ZS52YWx1ZSA9IFwiXCI7XG4gIGZvcm1EZXNjLnZhbHVlID0gXCJcIjtcbiAgZm9ybVByaW9yaXR5LmNoZWNrZWQgPSBmYWxzZTtcbn07XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogSEVBREVSIEJVVFRPTlNcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyBTSURFQkFSIFRPR0dMRVxuY29uc3QgdG9nZ2xlU2lkZWJhciA9IGZ1bmN0aW9uIChcbiAgc2lkZWJhcixcbiAgbGlzdHNNZW51RW5kQmFycyxcbiAgbGlzdHNNZW51TWlkQmFyMSxcbiAgbGlzdHNNZW51TWlkQmFyMlxuKSB7XG4gIC8vIFJldmVhbCBzaWRlIGJhclxuICBzaWRlYmFyLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRkZW5cIik7XG5cbiAgLy8gVHJhbmZvcm0gY2xvc2UgYnV0dG9uXG4gIGxpc3RzTWVudUVuZEJhcnMuZm9yRWFjaCgoYmFyKSA9PiBiYXIuY2xhc3NMaXN0LnRvZ2dsZShcImJhci0tdmFuaXNoXCIpKTtcbiAgbGlzdHNNZW51TWlkQmFyMS5jbGFzc0xpc3QudG9nZ2xlKFwiYmFyX19taWQtLXJvdGF0ZVwiKTtcbiAgbGlzdHNNZW51TWlkQmFyMi5jbGFzc0xpc3QudG9nZ2xlKFwiYmFyX19taWQyLS1yb3RhdGVcIik7XG59O1xuXG4vLyBBREQgVEFTSyBPUEVOXG5jb25zdCBvcGVuQWRkVGFzayA9IGZ1bmN0aW9uIChmb3JtKSB7XG4gIGZvcm0uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbn07XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogVEFTSyBCVVRUT05TXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8gQ2hhbmdlIGNvbXBsZXRlZCB0YXNrIGNoZWNrYm94IHZpc3VhbFxuY29uc3QgZGltQ29tcGxldGVkVGFza3MgPSBmdW5jdGlvbiAoY2xpY2tlZCkge1xuICAvLyBDaGFuZ2UgdGFzayB0ZXh0IGNvbG9yIC8gc3RyaWtldGhydVxuICBjbGlja2VkLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImNoZWNrZWRcIik7XG5cbiAgLy8gQ2hhbmdlIHRhc2sgZGV0YWlscyBidXR0b24gY29sb3JcbiAgY2xpY2tlZC5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQuY2xhc3NMaXN0LmFkZChcbiAgICBcImJ0bl9fZGV0YWlscy0tY29tcGxldGVkXCJcbiAgKTtcblxuICAvLyBDaGFuZ2UgdGFzayBpdGVtIGZpbHRlclxuICBjbGlja2VkLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiY29tcGxldGVkLS10cnVlXCIpO1xufTtcblxuY29uc3QgdW5kb0NvbXBsZXRlZERpbSA9IGZ1bmN0aW9uIChjbGlja2VkKSB7XG4gIGNsaWNrZWQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiY2hlY2tlZFwiKTtcbiAgY2xpY2tlZC5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQuY2xhc3NMaXN0LnJlbW92ZShcbiAgICBcImJ0bl9fZGV0YWlscy0tY29tcGxldGVkXCJcbiAgKTtcbiAgY2xpY2tlZC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImNvbXBsZXRlZC0tdHJ1ZVwiKTtcbn07XG5cbi8vIFZpc3VhbCBmb3Igb3BlbiB0YXNrIGRldGFpbHMgYnV0dG9uXG5jb25zdCB0b2dnbGVUYXNrRGV0YWlsc0J0biA9IGZ1bmN0aW9uIChjbGlja2VkKSB7XG4gIGNsaWNrZWQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYnRuX19kZXRhaWxzLS1vcGVuXCIpXG4gICAgPyBjbGlja2VkLmNsYXNzTGlzdC5yZW1vdmUoXCJidG5fX2RldGFpbHMtLW9wZW5cIilcbiAgICA6IGNsaWNrZWQuY2xhc3NMaXN0LmFkZChcImJ0bl9fZGV0YWlscy0tb3BlblwiKTtcbn07XG5cbmNvbnN0IHRvZ2dsZUluYWN0aXZlRGV0YWlsc0J0bnMgPSBmdW5jdGlvbiAoZSkge1xuICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5idG5fX2RldGFpbHNcIik7XG4gIGZvciAobGV0IGJ1dHRvbiBvZiBidXR0b25zKSB7XG4gICAgLy8gQ2xvc2UgYW55IHRhc2sgZGV0YWlscyBvcGVuIHRvIHN0b3AgbXVsdGlwbGUgYXQgb25jZVxuICAgIGlmIChidXR0b24gIT09IGUudGFyZ2V0KSB7XG4gICAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImJ0bl9fZGV0YWlscy0tb3BlblwiKTtcblxuICAgICAgaWYgKFxuICAgICAgICBidXR0b24ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoID09PSAyXG4gICAgICApXG4gICAgICAgIGhpZGVUYXNrRGV0YWlscyhidXR0b24ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgZXhwYW5kU2VsZWN0ZWREZXRhaWxzID0gZnVuY3Rpb24gKGNsaWNrZWQsIHByaW9yaXR5LCBkZXNjKSB7XG4gIGlmIChjbGlja2VkLmNsYXNzTGlzdC5jb250YWlucyhcImJ0bl9fZGV0YWlscy0tb3BlblwiKSlcbiAgICBleHBhbmRUYXNraXRlbShjbGlja2VkLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KTtcbn07XG5cbmNvbnN0IGhpZGVOb25TZWxlY3RlZERldGFpbHMgPSBmdW5jdGlvbiAoY2xpY2tlZCkge1xuICBpZiAoIWNsaWNrZWQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYnRuX19kZXRhaWxzLS1vcGVuXCIpKVxuICAgIGhpZGVUYXNrRGV0YWlscyhjbGlja2VkLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KTtcbn07XG5cbi8vIENoYW5nZSBwcmlvcml0eSBjaGVja2JveCB2aXN1YWxcbmNvbnN0IGFkZFByaW9yaXR5VmlzdWFsID0gZnVuY3Rpb24gKGUsIGNsaWNrZWQpIHtcbiAgLy8gQ2hhbmdlIGJveCBib3JkZXJcbiAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcInRhc2tpdGVtX19wcmlvcml0eS1jaGVja19fY2hlY2tib3gtLXJlZC1ib3JkZXJcIik7XG5cbiAgLy8gQ2hhbmdlIGJhY2tncm91bmQgY29sb3Igb2YgdGFza1xuICBjbGlja2VkLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFxuICAgIFwicHJpb3JpdHktLXRydWVcIlxuICApO1xufTtcblxuY29uc3QgcmVtb3ZlUHJpb3JpdHlWaXN1YWwgPSBmdW5jdGlvbiAoZSwgY2xpY2tlZCkge1xuICAvLyBDaGFuZ2UgYm94IGJvcmRlclxuICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwidGFza2l0ZW1fX3ByaW9yaXR5LWNoZWNrX19jaGVja2JveC0tcmVkLWJvcmRlclwiKTtcblxuICAvLyBDaGFuZ2UgYmFja2dyb3VuZCBjb2xvciBiYWNrXG4gIGNsaWNrZWQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXG4gICAgXCJwcmlvcml0eS0tdHJ1ZVwiXG4gICk7XG59O1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIFNJREVCQVIgQlVUVE9OU1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vIFNpZGViYXIgbGlzdHMgb3B0aW9uc1xuY29uc3QgdG9nZ2xlU2lkZWJhckxpc3RPcHRpb25zID0gZnVuY3Rpb24gKGNsaWNrZWQpIHtcbiAgY2xpY2tlZC5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGRlblwiKTtcbn07XG5cbmNvbnN0IGhpZGVTaWRlYmFyTGlzdE9wdGlvbnMgPSBmdW5jdGlvbiAoY2xpY2tlZCkge1xuICBjbGlja2VkLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbn07XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogRk9STSBCVVRUT05TXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuY29uc3QgZXhwYW5kVGFza2l0ZW0gPSBmdW5jdGlvbiAoZWwsIHByaW9yaXR5LCBkZXNjKSB7XG4gIGNvbnN0IGh0bWxUYXNrRGV0YWlscyA9IGBcbiAgICA8ZGl2IGNsYXNzPVwidGFza2l0ZW0tLWV4cGFuZGVkXCI+XG4gICAgICA8aHIgY2xhc3M9XCJ0YXNraXRlbV9fZGl2aWRlclwiIC8+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0YXNraXRlbV9fZGV0YWlsc19fY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YXNraXRlbV9fZGV0YWlsc19fdHh0LWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxwPlxuICAgICAgICAgICAgSSBoYXZlIHRvIGZvcmdpdmUgbXlzZWxmIGZvciB0aGUgdHJlc3Bhc3NlcyBvZiB0aGUgcGFzdCBhbmQgbW92ZVxuICAgICAgICAgICAgdG8gdGhlIHByb21pc2Ugb2YgdGhlIGZ1dHVyZSBsZXN0IEkgaGF2ZSB0cm91YmxlIGNsaW1iaW5nIGJhY2tcbiAgICAgICAgICAgIHVwIDxpPmRlIHByb2Z1bmRpczwvaT5cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YXNraXRlbV9fZGV0YWlsc19fYWN0aW9ucy1jb250YWluZXJcIj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJ0YXNraXRlbV9fcHJpb3JpdHktY2hlY2tcIj5cbiAgICAgICAgICAgIFByaW9yaXR5XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgbmFtZT1cInByaW9yaXR5X19jaGVja2JveFwiXG4gICAgICAgICAgICAgIGNsYXNzPVwidGFza2l0ZW1fX3ByaW9yaXR5LWNoZWNrX19jaGVja2JveFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRhc2tpdGVtX19lZGl0X19jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgc3JjPVwiLi9pbWFnZXMvZWRpdC5zdmdcIlxuICAgICAgICAgICAgICBoZWlnaHQ9XCIyMnB4XCJcbiAgICAgICAgICAgICAgYWx0PVwiRWRpdCB0YXNrXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJFZGl0IHRhc2tcIlxuICAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG5fX3Rhc2tpdGVtX19lZGl0XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRhc2tpdGVtX19kZWxfX2NvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBzcmM9XCIuL2ltYWdlcy90cmFzaC5zdmdcIlxuICAgICAgICAgICAgICBoZWlnaHQ9XCIyNXB4XCJcbiAgICAgICAgICAgICAgYWx0PVwiRGVsZXRlIHRhc2tcIlxuICAgICAgICAgICAgICB0aXRsZT1cIkRlbGV0ZSB0YXNrXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuX190YXNraXRlbV9fZGVsZXRlXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8IS0tIGVuZCB0YXNraXRlbV9fZGV0YWlsc19fYWN0aW9ucy1jb250YWluZXIgLS0+XG4gICAgICA8L2Rpdj5cbiAgICAgIDwhLS0gZW5kIHRhc2tpdGVtX19kZXRhaWxzX19jb250YWluZXIgLS0+XG4gICAgPC9kaXY+XG4gIGA7XG5cbiAgZWwuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGh0bWxUYXNrRGV0YWlscyk7XG59O1xuXG5jb25zdCBoaWRlVGFza0RldGFpbHMgPSBmdW5jdGlvbiAoZWwpIHtcbiAgZWwucmVtb3ZlQ2hpbGQoZWwubGFzdEVsZW1lbnRDaGlsZCk7XG59O1xuXG5jb25zdCBodG1sVGFza0l0ZW0gPSBgXG4gIDxkaXYgY2xhc3M9XCJ0YXNraXRlbVwiPlxuICAgIDxkaXYgY2xhc3M9XCJ0YXNraXRlbV9fYWJiclwiPlxuICAgICAgPGlucHV0XG4gICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgIG5hbWU9XCJjb21wbGV0ZWQtY2hlY2tib3hcIlxuICAgICAgICBjbGFzcz1cInRhc2tpdGVtX19jaGVja2JveFwiXG4gICAgICAvPlxuICAgICAgPGRpdiBjbGFzcz1cInRhc2tpdGVtX190eHRib3hcIj5cbiAgICAgICAgPGgzPlRhc2sgSXRlbSAxPC9oMz5cbiAgICAgICAgPHA+ZHVlIGluIDUgZGF5czwvcD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInRhc2tpdGVtX19idG4tZGV0YWlsc19fY29udGFpbmVyXCI+XG4gICAgICAgIDxpbWdcbiAgICAgICAgICBzcmM9XCIuL2ltYWdlcy9kb3duLXRyaWFuZ2xlLnBuZ1wiXG4gICAgICAgICAgYWx0PVwiT3BlbiBkZXRhaWxzXCJcbiAgICAgICAgICB0aXRsZT1cIkRldGFpbHNcIlxuICAgICAgICAgIGhlaWdodD1cIjIwcHhcIlxuICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bl9fZGV0YWlsc1wiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5gO1xuXG5jb25zdCBodG1sTGlzdEl0ZW0gPSBgXG4gIDxkaXYgY2xhc3M9XCJzaWRlYmFyX19saXN0aXRlbVwiPlxuICAgIDxkaXYgY2xhc3M9XCJsaXN0aXRlbV9fb3B0aW9uc19fY29udGFpbmVyXCI+XG4gICAgICA8aW1nXG4gICAgICAgIHNyYz1cIi4vaW1hZ2VzL2xpc3RzLW1lbnUucG5nXCJcbiAgICAgICAgaGVpZ2h0PVwiMjBweFwiXG4gICAgICAgIGNsYXNzPVwiYnRuIGJ0bl9fbGlzdGl0ZW1fX29wdGlvbnNcIlxuICAgICAgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJsaXN0aXRlbV9fb3B0aW9uc19fbWVudV9fY29udGFpbmVyIGhpZGRlblwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXJyb3ctdXBcIj48L2Rpdj5cbiAgICAgICAgPGltZ1xuICAgICAgICAgIHNyYz1cIi4vaW1hZ2VzL3RyYXNoLnN2Z1wiXG4gICAgICAgICAgY2xhc3M9XCJidG4gYnRuX19saXN0aXRlbSBidG5fX2xpc3RpdGVtLS1kZWxcIlxuICAgICAgICAgIGhlaWdodD1cIjI4cHhcIlxuICAgICAgICAvPlxuICAgICAgICA8aW1nXG4gICAgICAgICAgc3JjPVwiLi9pbWFnZXMvZG93bi10cmlhbmdsZS5wbmdcIlxuICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bl9fbGlzdGl0ZW0gYnRuX19saXN0aXRlbS0tdXBcIlxuICAgICAgICAgIGhlaWdodD1cIjI4cHhcIlxuICAgICAgICAvPlxuICAgICAgICA8aW1nXG4gICAgICAgICAgc3JjPVwiLi9pbWFnZXMvZG93bi10cmlhbmdsZS5wbmdcIlxuICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bl9fbGlzdGl0ZW0gYnRuX19saXN0aXRlbS0tZG93blwiXG4gICAgICAgICAgaGVpZ2h0PVwiMjhweFwiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDwhLS0gZW5kIGxpc3RpdGVtX19vcHRpb25zX19tZW51X19jb250YWluZXIgLS0+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImxpc3RpdGVtX190aXRsZVwiPkRlZmF1bHQgTGlzdDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJsaXN0aXRlbV9fZHVlLWNvdW50XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibGlzdGl0ZW1fX2R1ZS1jb3VudF9fdGl0bGVcIj5UYXNrcyBEdWU6PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibGlzdGl0ZW1fX2R1ZS1jb3VudF9fY291bnRcIj4xMDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbmA7XG5cbmV4cG9ydCB7XG4gIGNsZWFyRm9ybSxcbiAgdG9nZ2xlU2lkZWJhcixcbiAgb3BlbkFkZFRhc2ssXG4gIGRpbUNvbXBsZXRlZFRhc2tzLFxuICB1bmRvQ29tcGxldGVkRGltLFxuICB0b2dnbGVUYXNrRGV0YWlsc0J0bixcbiAgdG9nZ2xlSW5hY3RpdmVEZXRhaWxzQnRucyxcbiAgZXhwYW5kU2VsZWN0ZWREZXRhaWxzLFxuICBoaWRlTm9uU2VsZWN0ZWREZXRhaWxzLFxuICBhZGRQcmlvcml0eVZpc3VhbCxcbiAgcmVtb3ZlUHJpb3JpdHlWaXN1YWwsXG4gIHRvZ2dsZVNpZGViYXJMaXN0T3B0aW9ucyxcbiAgaGlkZVNpZGViYXJMaXN0T3B0aW9ucyxcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiBcbiBUQUJMRSBPRiBDT05URU5UU1xuXG4gKiBNb2R1bGVzXG4gKiBET00gVmFyaWFibGVzXG4gKiBEUlkgRnVuY3Rpb25zXG4gKiBIZWFkZXIgQnV0dG9uc1xuICogVGFzayBCdXR0b25zXG4gKiBTaWRlYmFyIEJ1dHRvbnNcbiAqIEZvcm0gQnV0dG9uc1xuICogQXBwIExvZ2ljXG5cbioqL1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIE1PRFVMRVNcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5pbXBvcnQgeyBNYXN0ZXJMaXN0IH0gZnJvbSBcIi4vdG9kby1sb2dpYy5qc1wiO1xuaW1wb3J0IHtcbiAgYWRkUHJpb3JpdHlWaXN1YWwsXG4gIGRpbUNvbXBsZXRlZFRhc2tzLFxuICBleHBhbmRTZWxlY3RlZERldGFpbHMsXG4gIGhpZGVOb25TZWxlY3RlZERldGFpbHMsXG4gIHJlbW92ZVByaW9yaXR5VmlzdWFsLFxuICB0b2dnbGVJbmFjdGl2ZURldGFpbHNCdG5zLFxuICB0b2dnbGVTaWRlYmFyLFxuICB0b2dnbGVTaWRlYmFyTGlzdE9wdGlvbnMsXG4gIHRvZ2dsZVRhc2tEZXRhaWxzQnRuLFxuICB1bmRvQ29tcGxldGVkRGltLFxuICBvcGVuQWRkVGFzayxcbiAgY2xlYXJGb3JtLFxuICBoaWRlU2lkZWJhckxpc3RPcHRpb25zLFxufSBmcm9tIFwiLi92aXN1YWwuanNcIjtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBET00gVkFSSUFCTEVTXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8gQlVUVE9OU1xuLy8gLS0tLSBIZWFkZXJcbmNvbnN0IGJ0bkxpc3RzTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGlzdHMtbWVudVwiKTtcbmNvbnN0IGxpc3RzTWVudUVuZEJhcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJhcl9fZW5kXCIpO1xuY29uc3QgbGlzdHNNZW51TWlkQmFyMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYmFyX19taWRcIik7XG5jb25zdCBsaXN0c01lbnVNaWRCYXIyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5iYXJfX21pZDJcIik7XG5jb25zdCBidG5BZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFza1wiKTtcblxuLy8gLS0tLSBUYXNrc1xuY29uc3QgY2hlY2tib3hUYXNrQ29tcGxldGUgPVxuICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidGFza2l0ZW1fX2NoZWNrYm94XCIpO1xuY29uc3QgYnRuVGFza0RldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYnRuX19kZXRhaWxzXCIpO1xuY29uc3QgY2hlY2tib3hQcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXG4gIFwidGFza2l0ZW1fX3ByaW9yaXR5LWNoZWNrX19jaGVja2JveFwiXG4pO1xuY29uc3QgYnRuRWRpdFRhc2sgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYnRuX190YXNraXRlbV9fZWRpdFwiKTtcbmNvbnN0IGJ0bkRlbFRhc2sgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYnRuX190YXNraXRlbV9fZGVsZXRlXCIpO1xuXG4vLyAtLS0tIFNpZGViYXJcbmNvbnN0IGJ0bkxpc3RzT3B0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJidG5fX2xpc3RpdGVtX19vcHRpb25zXCIpO1xuXG4vLyAtLS0tIEZvcm1cbmNvbnN0IGJ0bkZvcm1DbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuX19mb3JtLWNsb3NlXCIpO1xuY29uc3QgYnRuRm9ybVN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuX19mb3JtLXN1Ym1pdFwiKTtcblxuLy8gU0lERUJBUlxuY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhclwiKTtcbmNvbnN0IGxpc3RJdGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzaWRlYmFyX19saXN0aXRlbVwiKTtcbmNvbnN0IGxpc3RJdGVtc09wdGlvbnNNZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcbiAgXCJsaXN0aXRlbV9fb3B0aW9uc19fbWVudV9fY29udGFpbmVyXCJcbik7XG5cbi8vIEZPUk1cbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm1cIik7XG5jb25zdCBmb3JtVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybV9fdGV4dC0tdGl0bGVcIik7XG5jb25zdCBmb3JtRHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtX19kYXRlXCIpO1xuY29uc3QgZm9ybURlc2MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm1fX3RleHQtYXJlYVwiKTtcbmNvbnN0IGZvcm1Qcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybV9fcHJpb3JpdHlfX2NoZWNrYm94XCIpO1xuXG4vLyAtLSBNQUlOIEFQUFxuY29uc3QgYWN0aXZlTGlzdFdpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1hcHBcIik7XG5jb25zdCB0YXNrSXRlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidGFza2l0ZW1cIik7XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogRFJZIEZVTkNUSU9OU1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBIRUFERVIgQlVUVE9OU1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vIFNJREVCQVIgVE9HR0xFXG5idG5MaXN0c01lbnUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgdG9nZ2xlU2lkZWJhcihzaWRlYmFyLCBsaXN0c01lbnVFbmRCYXJzLCBsaXN0c01lbnVNaWRCYXIxLCBsaXN0c01lbnVNaWRCYXIyKTtcbn0pO1xuXG4vLyBBREQgVEFTSyBPUEVOXG5idG5BZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIG9wZW5BZGRUYXNrKGZvcm0pO1xufSk7XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogVEFTSyBCVVRUT05TXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8gQ2hhbmdlIGNvbXBsZXRlZCB0YXNrIGNoZWNrYm94IHZpc3VhbFxuYWN0aXZlTGlzdFdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgY29uc3QgY2xpY2tlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIudGFza2l0ZW1fX2NoZWNrYm94XCIpO1xuICBpZiAoIWNsaWNrZWQpIHJldHVybjtcblxuICBpZiAoY2xpY2tlZC5jaGVja2VkKSB7XG4gICAgZGltQ29tcGxldGVkVGFza3MoY2xpY2tlZCk7XG4gIH1cblxuICAvLyBVbmRvIENoYW5nZSBjb21wbGV0ZWQgdGFzayB2aXN1YWxcbiAgaWYgKCFjbGlja2VkLmNoZWNrZWQpIHtcbiAgICB1bmRvQ29tcGxldGVkRGltKGNsaWNrZWQpO1xuICB9XG59KTtcblxuLy8gVmlzdWFsIGZvciBvcGVuIHRhc2sgZGV0YWlscyBidXR0b25cbmFjdGl2ZUxpc3RXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGNvbnN0IGNsaWNrZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiLmJ0bl9fZGV0YWlsc1wiKTtcblxuICBpZiAoIWNsaWNrZWQpIHJldHVybjtcblxuICAvLyBUb2dnbGUgdGFzayBkZXRhaWxzIG9wZW4gb24gY2xpY2tcbiAgdG9nZ2xlVGFza0RldGFpbHNCdG4oY2xpY2tlZCk7XG4gIHRvZ2dsZUluYWN0aXZlRGV0YWlsc0J0bnMoZSk7XG4gIGV4cGFuZFNlbGVjdGVkRGV0YWlscyhjbGlja2VkKTtcbiAgaGlkZU5vblNlbGVjdGVkRGV0YWlscyhjbGlja2VkKTtcbn0pO1xuXG4vLyBDaGFuZ2UgcHJpb3JpdHkgY2hlY2tib3ggdmlzdWFsXG5hY3RpdmVMaXN0V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBjb25zdCBjbGlja2VkID0gZS50YXJnZXQuY2xvc2VzdChcIi50YXNraXRlbV9fcHJpb3JpdHktY2hlY2tfX2NoZWNrYm94XCIpO1xuXG4gIGlmICghY2xpY2tlZCkgcmV0dXJuO1xuXG4gIGlmIChjbGlja2VkLmNoZWNrZWQpIHtcbiAgICBhZGRQcmlvcml0eVZpc3VhbChlLCBjbGlja2VkKTtcbiAgfVxuXG4gIGlmICghY2xpY2tlZC5jaGVja2VkKSB7XG4gICAgcmVtb3ZlUHJpb3JpdHlWaXN1YWwoZSwgY2xpY2tlZCk7XG4gIH1cbn0pO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIFNJREVCQVIgQlVUVE9OU1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vIFNpZGViYXIgbGlzdHMgb3B0aW9uc1xuc2lkZWJhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgY29uc3QgY2xpY2tlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIuYnRuX19saXN0aXRlbV9fb3B0aW9uc1wiKTtcbiAgaWYgKCFjbGlja2VkKSByZXR1cm47XG5cbiAgdG9nZ2xlU2lkZWJhckxpc3RPcHRpb25zKGNsaWNrZWQpO1xufSk7XG5cbnNpZGViYXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGNvbnN0IGNsaWNrZWRUcmFzaCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIuYnRuX19saXN0aXRlbS0tZGVsXCIpO1xuICBjb25zdCBjbGlja2VkQXJyb3dVcCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIuYnRuX19saXN0aXRlbS0tdXBcIik7XG4gIGNvbnN0IGNsaWNrZWRBcnJvd0Rvd24gPSBlLnRhcmdldC5jbG9zZXN0KFwiLmJ0bl9fbGlzdGl0ZW0tLWRvd25cIik7XG5cbiAgaWYgKCFjbGlja2VkVHJhc2ggJiYgIWNsaWNrZWRBcnJvd1VwICYmICFjbGlja2VkQXJyb3dEb3duKSByZXR1cm47XG5cbiAgaWYgKGNsaWNrZWRUcmFzaCB8fCBjbGlja2VkQXJyb3dVcCB8fCBjbGlja2VkQXJyb3dEb3duKSB7XG4gICAgY29uc3QgY2xpY2tlZCA9IGNsaWNrZWRUcmFzaCB8fCBjbGlja2VkQXJyb3dVcCB8fCBjbGlja2VkQXJyb3dEb3duO1xuICAgIGhpZGVTaWRlYmFyTGlzdE9wdGlvbnMoY2xpY2tlZCk7XG4gIH1cbn0pO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIEZPUk0gQlVUVE9OU1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbmJ0bkZvcm1DbG9zZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBjbGVhckZvcm0oZm9ybSwgZm9ybVRhc2ssIGZvcm1EdWUsIGZvcm1EZXNjLCBmb3JtUHJpb3JpdHkpO1xufSk7XG5cbmJ0bkZvcm1TdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgY2xlYXJGb3JtKGZvcm0sIGZvcm1UYXNrLCBmb3JtRHVlLCBmb3JtRGVzYywgZm9ybVByaW9yaXR5KTtcbn0pO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIEFQUCBMT0dJQ1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbmNvbnN0IG1hc3Rlckxpc3QgPSBuZXcgTWFzdGVyTGlzdCgpO1xuXG5tYXN0ZXJMaXN0LmFkZEl0ZW0oXCJNYWluIExpc3RcIik7XG5cbmNvbnNvbGUubG9nKG1hc3Rlckxpc3QpO1xuXG4vL1RFU1RJTkcgQVJFQVxuLyoqXG4gKlxuICpcbiAqXG4gKlxuICpcbiAqXG4gKlxuICovXG5cbi8qXG4vLyBURVNUIFNBTVBMRVNcbi8vIENyZWF0ZSBNYXN0ZXIgTGlzdFxuY29uc3QgbWFzdGVyTGlzdCA9IG5ldyBNYXN0ZXJMaXN0KCk7XG5cbi8vIEFkZCBMaXN0cyB0byBNYXN0ZXIgTGlzdFxubWFzdGVyTGlzdC5hZGRJdGVtKFwiVGVzdCBMaXN0XCIpO1xubWFzdGVyTGlzdC5hZGRJdGVtKFwiQSBUZXN0IExpc3QgMlwiKTtcbm1hc3Rlckxpc3QuYWRkSXRlbShcIlRlc3QgTGlzdCAzXCIpO1xubWFzdGVyTGlzdC5hZGRJdGVtKFwiVGVzdCBMaXN0IDRcIik7XG5cbi8vIEFkZCBUYXNrcyB0byBMaXN0IGluIE1hc3RlciBMaXN0XG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLmFkZEl0ZW0oXCJ0ZXN0MVwiLCBcImEgdGVzdDEgZGVzY1wiLCBcIjguMTBcIik7XG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLmFkZEl0ZW0oXCJ0ZXN0MlwiLCBcImIgdGVzdDIgZGVzY1wiLCBcIjguMDhcIik7XG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLmFkZEl0ZW0oXCJ0ZXN0M1wiLCBcImMgdGVzdDMgZGVzY1wiLCBcIjcuMTZcIik7XG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLmFkZEl0ZW0oXCJ0ZXN0NFwiLCBcImQgdGVzdDQgZGVzY1wiLCBcIjEyLjIyXCIpO1xubWFzdGVyTGlzdC5pdGVtc1swXS5hZGRJdGVtKFwidGVzdDVcIiwgXCJlIHRlc3Q1IGRlc2NcIiwgXCIzLjIyXCIpO1xuXG4vLyBtYXN0ZXJMaXN0Lml0ZW1zWzBdLml0ZW1zWzFdLmNvbXBsZXRlZCA9IHRydWU7XG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLml0ZW1zWzFdLmRhdGVDcmVhdGVkID0gMTAwO1xuLy8gbWFzdGVyTGlzdC5pdGVtc1swXS5pdGVtc1s0XS5jb21wbGV0ZWQgPSB0cnVlO1xuXG5jb25zb2xlLmxvZyhtYXN0ZXJMaXN0Lml0ZW1zWzBdLml0ZW1zKTtcblxubWFzdGVyTGlzdC5pdGVtc1swXS5pdGVtc1s0XS50b2dnbGVDb21wbGV0ZWQoKTtcblxubWFzdGVyTGlzdC5pdGVtc1swXS5pdGVtc1sxXS50b2dnbGVQcmlvcml0eSgpO1xuY29uc29sZS50YWJsZShtYXN0ZXJMaXN0Lml0ZW1zWzBdLml0ZW1zKTtcbiovXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=