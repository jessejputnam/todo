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
/* harmony export */   "addListItem": () => (/* binding */ addListItem),
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
const formTask = document.querySelector(".form__text--title");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVc7QUFDWCxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFa0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNIckI7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsTUFBTTtBQUMzQztBQUNBO0FBQ0Esa0RBQWtELE9BQU87QUFDekQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBbUJFOzs7Ozs7O1VDcFNGO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTmE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQzZDO0FBa0J4Qjs7QUFFckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSx5REFBYTtBQUNmLENBQUM7O0FBRUQ7QUFDQTtBQUNBLEVBQUUsdURBQVc7QUFDYixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSSw2REFBaUI7QUFDckI7O0FBRUE7QUFDQTtBQUNBLElBQUksNERBQWdCO0FBQ3BCO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxFQUFFLGdFQUFvQjtBQUN0QixFQUFFLHFFQUF5QjtBQUMzQixFQUFFLGlFQUFxQjtBQUN2QixFQUFFLGtFQUFzQjtBQUN4QixDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLElBQUksNkRBQWlCO0FBQ3JCOztBQUVBO0FBQ0EsSUFBSSxnRUFBb0I7QUFDeEI7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUscUVBQXlCO0FBQzNCO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUEsRUFBRSxvRUFBd0I7QUFDMUIsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSSxrRUFBc0I7QUFDMUI7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxxREFBUztBQUNYLENBQUM7O0FBRUQ7QUFDQSxFQUFFLHFEQUFTO0FBQ1gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzREFBVTs7QUFFakM7QUFDQTs7QUFFQTtBQUNBLHVEQUFXOztBQUVYO0FBQ0E7QUFDQSw4REFBa0I7O0FBRWxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLy4vc3JjL3RvZG8tbG9naWMuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy92aXN1YWwuanMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIE1BU1RFUiBMSVNUXG5jbGFzcyBNYXN0ZXJMaXN0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pdGVtcyA9IFtdO1xuICB9XG5cbiAgYWRkSXRlbSh0aXRsZSkge1xuICAgIHRoaXMuaXRlbXMucHVzaChuZXcgTGlzdCh0aXRsZSkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGVsZXRlSXRlbShpbmRleCkge1xuICAgIHRoaXMuaXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG1vdmVJdGVtKGluZGV4LCBkaXIpIHtcbiAgICBjb25zdCBtb3ZlZEl0ZW0gPSB0aGlzLml0ZW1zLnNwbGljZShpbmRleCwgMSlbMF07XG4gICAgY29uc29sZS5sb2cobW92ZWRJdGVtKTtcbiAgICBjb25zb2xlLmxvZyhpbmRleCArIGRpcik7XG4gICAgdGhpcy5pdGVtcy5zcGxpY2UoaW5kZXggKyBkaXIsIDAsIG1vdmVkSXRlbSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzb3J0SXRlbXMoY2F0ZWdvcnksIHJldmVyc2VDaGVjaykge1xuICAgIGlmIChjYXRlZ29yeSA9PT0gXCJkYXRlRHVlXCIgfHwgY2F0ZWdvcnkgPT09IFwiY29tcGxldGVkXCIpIHtcbiAgICAgIHJldmVyc2VDaGVjayA9PT0gZmFsc2VcbiAgICAgICAgPyB0aGlzLml0ZW1zLnNvcnQoKGEsIGIpID0+IGFbY2F0ZWdvcnldIC0gYltjYXRlZ29yeV0pXG4gICAgICAgIDogdGhpcy5pdGVtcy5zb3J0KChhLCBiKSA9PiBiW2NhdGVnb3J5XSAtIGFbY2F0ZWdvcnldKTtcbiAgICB9IGVsc2UgaWYgKGNhdGVnb3J5ID09PSBcInRpdGxlXCIpIHtcbiAgICAgIHJldmVyc2VDaGVjayA9PT0gZmFsc2VcbiAgICAgICAgPyB0aGlzLml0ZW1zLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWVBID0gYS50aXRsZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgY29uc3QgbmFtZUIgPSBiLnRpdGxlLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAobmFtZUEgPCBuYW1lQikge1xuICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZUEgPiBuYW1lQikge1xuICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgfSlcbiAgICAgICAgOiB0aGlzLml0ZW1zLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWVBID0gYS50aXRsZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgY29uc3QgbmFtZUIgPSBiLnRpdGxlLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAobmFtZUEgPCBuYW1lQikge1xuICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuYW1lQSA+IG5hbWVCKSB7XG4gICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgfSk7XG4gICAgfSBlbHNlXG4gICAgICByZXZlcnNlQ2hlY2sgPT09IGZhbHNlXG4gICAgICAgID8gdGhpcy5pdGVtcy5zb3J0KChhLCBiKSA9PiBiW2NhdGVnb3J5XSAtIGFbY2F0ZWdvcnldKVxuICAgICAgICA6IHRoaXMuaXRlbXMuc29ydCgoYSwgYikgPT4gYVtjYXRlZ29yeV0gLSBiW2NhdGVnb3J5XSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuLy8gTElTVFNcbmNsYXNzIExpc3QgZXh0ZW5kcyBNYXN0ZXJMaXN0IHtcbiAgY29uc3RydWN0b3IodGl0bGUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB0aGlzLmRhdGVDcmVhdGVkID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLmNvbG9yID0gXCJpbml0aWFsXCI7XG4gICAgdGhpcy5pdGVtcyA9IFtdO1xuICB9XG5cbiAgLy8gQWRkIFRhc2tcbiAgYWRkSXRlbSh0aXRsZSwgZGVzYywgZGF0ZUR1ZSkge1xuICAgIHRoaXMuaXRlbXMucHVzaChuZXcgVGFzayh0aXRsZSwgZGVzYywgZGF0ZUR1ZSkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgX2NsZWFyQ29tcGxldGVkVGFza3MoKSB7XG4gICAgdGhpcy5pdGVtcyA9IHRoaXMuaXRlbXMuZmlsdGVyKChhKSA9PiBhLmNvbXBsZXRlZCA9PT0gZmFsc2UpO1xuICB9XG59XG5cbi8vIFRBU0tTXG5jbGFzcyBUYXNrIHtcbiAgY29uc3RydWN0b3IodGl0bGUsIGRlc2MsIGRhdGVEdWUpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kZXNjID0gZGVzYztcbiAgICB0aGlzLmRhdGVDcmVhdGVkID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLmRhdGVEdWUgPSArZGF0ZUR1ZTtcbiAgICB0aGlzLnByaW9yaXR5ID0gZmFsc2U7XG4gICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmNvbXBsZXRlZERhdGU7XG4gIH1cblxuICAvLyBUb2dnbGUgQ29tcGxldGVkXG4gIHRvZ2dsZUNvbXBsZXRlZCgpIHtcbiAgICB0aGlzLmNvbXBsZXRlZCA9PT0gZmFsc2VcbiAgICAgID8gKHRoaXMuY29tcGxldGVkID0gdHJ1ZSlcbiAgICAgIDogKHRoaXMuY29tcGxldGVkID0gZmFsc2UpO1xuXG4gICAgaWYgKHRoaXMuY29tcGxldGVkID09PSB0cnVlKVxuICAgICAgdGhpcy5jb21wbGV0ZWREYXRlID0gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZyhuYXZpZ2F0b3IubGFuZ3VhZ2VzWzBdLCB7XG4gICAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxuICAgICAgICBtb250aDogXCJzaG9ydFwiLFxuICAgICAgICBkYXk6IFwiMi1kaWdpdFwiLFxuICAgICAgfSk7XG5cbiAgICBpZiAodGhpcy5jb21wbGV0ZWQgPT09IGZhbHNlKSB0aGlzLmNvbXBsZXRlZERhdGUgPSBcIlwiO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBUb2dnbGUgUHJpb3JpdHlcbiAgdG9nZ2xlUHJpb3JpdHkoKSB7XG4gICAgdGhpcy5wcmlvcml0eSA9PT0gZmFsc2UgPyAodGhpcy5wcmlvcml0eSA9IHRydWUpIDogKHRoaXMucHJpb3JpdHkgPSBmYWxzZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuZXhwb3J0IHsgTWFzdGVyTGlzdCwgTGlzdCwgVGFzayB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogVEFCTEUgT0YgQ09OVEVOVFNcbiBcbiAqIERyeSBGdW5jdGlvbnNcbiAqIEhlYWRlciBCdXR0b25zXG4gKiBUYXNrIEJ1dHRvbnNcbiAqIFNpZGViYXIgQnV0dG9uc1xuICogQWN0aXZlIFRhc2sgTGlzdFxuICogSFRNTCBJbnNlcnRzXG4gXG4gKiovXG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogRFJZIEZVTkNUSU9OU1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbmNvbnN0IGNsZWFyRm9ybSA9IGZ1bmN0aW9uIChmb3JtLCBmb3JtVGFzaywgZm9ybUR1ZSwgZm9ybURlc2MsIGZvcm1Qcmlvcml0eSkge1xuICBmb3JtLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG5cbiAgZm9ybVRhc2sudmFsdWUgPSBcIlwiO1xuICBmb3JtRHVlLnZhbHVlID0gXCJcIjtcbiAgZm9ybURlc2MudmFsdWUgPSBcIlwiO1xuICBmb3JtUHJpb3JpdHkuY2hlY2tlZCA9IGZhbHNlO1xufTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBIRUFERVIgQlVUVE9OU1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vIFNJREVCQVIgVE9HR0xFXG5jb25zdCB0b2dnbGVTaWRlYmFyID0gZnVuY3Rpb24gKFxuICBzaWRlYmFyLFxuICBsaXN0c01lbnVFbmRCYXJzLFxuICBsaXN0c01lbnVNaWRCYXIxLFxuICBsaXN0c01lbnVNaWRCYXIyXG4pIHtcbiAgLy8gUmV2ZWFsIHNpZGUgYmFyXG4gIHNpZGViYXIuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGRlblwiKTtcblxuICAvLyBUcmFuZm9ybSBjbG9zZSBidXR0b25cbiAgbGlzdHNNZW51RW5kQmFycy5mb3JFYWNoKChiYXIpID0+IGJhci5jbGFzc0xpc3QudG9nZ2xlKFwiYmFyLS12YW5pc2hcIikpO1xuICBsaXN0c01lbnVNaWRCYXIxLmNsYXNzTGlzdC50b2dnbGUoXCJiYXJfX21pZC0tcm90YXRlXCIpO1xuICBsaXN0c01lbnVNaWRCYXIyLmNsYXNzTGlzdC50b2dnbGUoXCJiYXJfX21pZDItLXJvdGF0ZVwiKTtcbn07XG5cbi8vIEFERCBUQVNLIE9QRU5cbmNvbnN0IG9wZW5BZGRUYXNrID0gZnVuY3Rpb24gKGZvcm0pIHtcbiAgZm9ybS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xufTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBUQVNLIEJVVFRPTlNcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyBDaGFuZ2UgY29tcGxldGVkIHRhc2sgY2hlY2tib3ggdmlzdWFsXG5jb25zdCBkaW1Db21wbGV0ZWRUYXNrcyA9IGZ1bmN0aW9uIChjbGlja2VkKSB7XG4gIC8vIENoYW5nZSB0YXNrIHRleHQgY29sb3IgLyBzdHJpa2V0aHJ1XG4gIGNsaWNrZWQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiY2hlY2tlZFwiKTtcblxuICAvLyBDaGFuZ2UgdGFzayBkZXRhaWxzIGJ1dHRvbiBjb2xvclxuICBjbGlja2VkLnBhcmVudEVsZW1lbnQubGFzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5jbGFzc0xpc3QuYWRkKFxuICAgIFwiYnRuX19kZXRhaWxzLS1jb21wbGV0ZWRcIlxuICApO1xuXG4gIC8vIENoYW5nZSB0YXNrIGl0ZW0gZmlsdGVyXG4gIGNsaWNrZWQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjb21wbGV0ZWQtLXRydWVcIik7XG59O1xuXG5jb25zdCB1bmRvQ29tcGxldGVkRGltID0gZnVuY3Rpb24gKGNsaWNrZWQpIHtcbiAgY2xpY2tlZC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJjaGVja2VkXCIpO1xuICBjbGlja2VkLnBhcmVudEVsZW1lbnQubGFzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5jbGFzc0xpc3QucmVtb3ZlKFxuICAgIFwiYnRuX19kZXRhaWxzLS1jb21wbGV0ZWRcIlxuICApO1xuICBjbGlja2VkLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiY29tcGxldGVkLS10cnVlXCIpO1xufTtcblxuLy8gVmlzdWFsIGZvciBvcGVuIHRhc2sgZGV0YWlscyBidXR0b25cbmNvbnN0IHRvZ2dsZVRhc2tEZXRhaWxzQnRuID0gZnVuY3Rpb24gKGNsaWNrZWQpIHtcbiAgY2xpY2tlZC5jbGFzc0xpc3QuY29udGFpbnMoXCJidG5fX2RldGFpbHMtLW9wZW5cIilcbiAgICA/IGNsaWNrZWQuY2xhc3NMaXN0LnJlbW92ZShcImJ0bl9fZGV0YWlscy0tb3BlblwiKVxuICAgIDogY2xpY2tlZC5jbGFzc0xpc3QuYWRkKFwiYnRuX19kZXRhaWxzLS1vcGVuXCIpO1xufTtcblxuY29uc3QgdG9nZ2xlSW5hY3RpdmVEZXRhaWxzQnRucyA9IGZ1bmN0aW9uIChlKSB7XG4gIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJ0bl9fZGV0YWlsc1wiKTtcbiAgZm9yIChsZXQgYnV0dG9uIG9mIGJ1dHRvbnMpIHtcbiAgICAvLyBDbG9zZSBhbnkgdGFzayBkZXRhaWxzIG9wZW4gdG8gc3RvcCBtdWx0aXBsZSBhdCBvbmNlXG4gICAgaWYgKGJ1dHRvbiAhPT0gZS50YXJnZXQpIHtcbiAgICAgIGJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYnRuX19kZXRhaWxzLS1vcGVuXCIpO1xuXG4gICAgICBpZiAoXG4gICAgICAgIGJ1dHRvbi5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlbi5sZW5ndGggPT09IDJcbiAgICAgIClcbiAgICAgICAgaGlkZVRhc2tEZXRhaWxzKGJ1dHRvbi5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBleHBhbmRTZWxlY3RlZERldGFpbHMgPSBmdW5jdGlvbiAoY2xpY2tlZCwgcHJpb3JpdHksIGRlc2MpIHtcbiAgaWYgKGNsaWNrZWQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYnRuX19kZXRhaWxzLS1vcGVuXCIpKVxuICAgIGV4cGFuZFRhc2tpdGVtKGNsaWNrZWQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpO1xufTtcblxuY29uc3QgaGlkZU5vblNlbGVjdGVkRGV0YWlscyA9IGZ1bmN0aW9uIChjbGlja2VkKSB7XG4gIGlmICghY2xpY2tlZC5jbGFzc0xpc3QuY29udGFpbnMoXCJidG5fX2RldGFpbHMtLW9wZW5cIikpXG4gICAgaGlkZVRhc2tEZXRhaWxzKGNsaWNrZWQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpO1xufTtcblxuLy8gQ2hhbmdlIHByaW9yaXR5IGNoZWNrYm94IHZpc3VhbFxuY29uc3QgYWRkUHJpb3JpdHlWaXN1YWwgPSBmdW5jdGlvbiAoZSwgY2xpY2tlZCkge1xuICAvLyBDaGFuZ2UgYm94IGJvcmRlclxuICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwidGFza2l0ZW1fX3ByaW9yaXR5LWNoZWNrX19jaGVja2JveC0tcmVkLWJvcmRlclwiKTtcblxuICAvLyBDaGFuZ2UgYmFja2dyb3VuZCBjb2xvciBvZiB0YXNrXG4gIGNsaWNrZWQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXG4gICAgXCJwcmlvcml0eS0tdHJ1ZVwiXG4gICk7XG59O1xuXG5jb25zdCByZW1vdmVQcmlvcml0eVZpc3VhbCA9IGZ1bmN0aW9uIChlLCBjbGlja2VkKSB7XG4gIC8vIENoYW5nZSBib3ggYm9yZGVyXG4gIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJ0YXNraXRlbV9fcHJpb3JpdHktY2hlY2tfX2NoZWNrYm94LS1yZWQtYm9yZGVyXCIpO1xuXG4gIC8vIENoYW5nZSBiYWNrZ3JvdW5kIGNvbG9yIGJhY2tcbiAgY2xpY2tlZC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcbiAgICBcInByaW9yaXR5LS10cnVlXCJcbiAgKTtcbn07XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogU0lERUJBUiBCVVRUT05TXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8gU2lkZWJhciBsaXN0cyBvcHRpb25zXG5jb25zdCB0b2dnbGVTaWRlYmFyTGlzdE9wdGlvbnMgPSBmdW5jdGlvbiAoY2xpY2tlZCkge1xuICBjbGlja2VkLnBhcmVudEVsZW1lbnQubGFzdEVsZW1lbnRDaGlsZC5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZGVuXCIpO1xufTtcblxuY29uc3QgaGlkZVNpZGViYXJMaXN0T3B0aW9ucyA9IGZ1bmN0aW9uIChjbGlja2VkKSB7XG4gIGNsaWNrZWQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xufTtcblxuY29uc3QgdG9nZ2xlU2lkZWJhck5ld0xpc3RUaXRsZSA9IGZ1bmN0aW9uIChlbCkge1xuICBlbC5jbGFzc0xpc3QudG9nZ2xlKFwiYWRkX19saXN0LXRpdGxlLS12aXNpYmxlXCIpO1xufTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBBY3RpdmUgVGFzayBMaXN0XG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5jb25zdCB1cGRhdGVBY3RpdmVMaXN0VUkgPSBmdW5jdGlvbiAobGlzdE5hbWVFbCwgbGlzdE5hbWUpIHtcbiAgbGlzdE5hbWVFbC50ZXh0Q29udGVudCA9IGxpc3ROYW1lO1xufTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBIVE1MIEluc2VydHNcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5jb25zdCBleHBhbmRUYXNraXRlbSA9IGZ1bmN0aW9uIChlbCwgcHJpb3JpdHksIGRlc2MpIHtcbiAgY29uc3QgaHRtbFRhc2tEZXRhaWxzID0gYFxuICAgIDxkaXYgY2xhc3M9XCJ0YXNraXRlbS0tZXhwYW5kZWRcIj5cbiAgICAgIDxociBjbGFzcz1cInRhc2tpdGVtX19kaXZpZGVyXCIgLz5cblxuICAgICAgPGRpdiBjbGFzcz1cInRhc2tpdGVtX19kZXRhaWxzX19jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhc2tpdGVtX19kZXRhaWxzX190eHQtY29udGFpbmVyXCI+XG4gICAgICAgICAgPHA+XG4gICAgICAgICAgICBJIGhhdmUgdG8gZm9yZ2l2ZSBteXNlbGYgZm9yIHRoZSB0cmVzcGFzc2VzIG9mIHRoZSBwYXN0IGFuZCBtb3ZlXG4gICAgICAgICAgICB0byB0aGUgcHJvbWlzZSBvZiB0aGUgZnV0dXJlIGxlc3QgSSBoYXZlIHRyb3VibGUgY2xpbWJpbmcgYmFja1xuICAgICAgICAgICAgdXAgPGk+ZGUgcHJvZnVuZGlzPC9pPlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhc2tpdGVtX19kZXRhaWxzX19hY3Rpb25zLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cInRhc2tpdGVtX19wcmlvcml0eS1jaGVja1wiPlxuICAgICAgICAgICAgUHJpb3JpdHlcbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICBuYW1lPVwicHJpb3JpdHlfX2NoZWNrYm94XCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJ0YXNraXRlbV9fcHJpb3JpdHktY2hlY2tfX2NoZWNrYm94XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFza2l0ZW1fX2VkaXRfX2NvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBzcmM9XCIuL2ltYWdlcy9lZGl0LnN2Z1wiXG4gICAgICAgICAgICAgIGhlaWdodD1cIjIycHhcIlxuICAgICAgICAgICAgICBhbHQ9XCJFZGl0IHRhc2tcIlxuICAgICAgICAgICAgICB0aXRsZT1cIkVkaXQgdGFza1wiXG4gICAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bl9fdGFza2l0ZW1fX2VkaXRcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFza2l0ZW1fX2RlbF9fY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIHNyYz1cIi4vaW1hZ2VzL3RyYXNoLnN2Z1wiXG4gICAgICAgICAgICAgIGhlaWdodD1cIjI1cHhcIlxuICAgICAgICAgICAgICBhbHQ9XCJEZWxldGUgdGFza1wiXG4gICAgICAgICAgICAgIHRpdGxlPVwiRGVsZXRlIHRhc2tcIlxuICAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG5fX3Rhc2tpdGVtX19kZWxldGVcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwhLS0gZW5kIHRhc2tpdGVtX19kZXRhaWxzX19hY3Rpb25zLWNvbnRhaW5lciAtLT5cbiAgICAgIDwvZGl2PlxuICAgICAgPCEtLSBlbmQgdGFza2l0ZW1fX2RldGFpbHNfX2NvbnRhaW5lciAtLT5cbiAgICA8L2Rpdj5cbiAgYDtcblxuICBlbC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgaHRtbFRhc2tEZXRhaWxzKTtcbn07XG5cbmNvbnN0IGhpZGVUYXNrRGV0YWlscyA9IGZ1bmN0aW9uIChlbCkge1xuICBlbC5yZW1vdmVDaGlsZChlbC5sYXN0RWxlbWVudENoaWxkKTtcbn07XG5cbmNvbnN0IGh0bWxUYXNrSXRlbSA9IGBcbiAgPGRpdiBjbGFzcz1cInRhc2tpdGVtXCI+XG4gICAgPGRpdiBjbGFzcz1cInRhc2tpdGVtX19hYmJyXCI+XG4gICAgICA8aW5wdXRcbiAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgbmFtZT1cImNvbXBsZXRlZC1jaGVja2JveFwiXG4gICAgICAgIGNsYXNzPVwidGFza2l0ZW1fX2NoZWNrYm94XCJcbiAgICAgIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwidGFza2l0ZW1fX3R4dGJveFwiPlxuICAgICAgICA8aDM+VGFzayBJdGVtIDE8L2gzPlxuICAgICAgICA8cD5kdWUgaW4gNSBkYXlzPC9wPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwidGFza2l0ZW1fX2J0bi1kZXRhaWxzX19jb250YWluZXJcIj5cbiAgICAgICAgPGltZ1xuICAgICAgICAgIHNyYz1cIi4vaW1hZ2VzL2Rvd24tdHJpYW5nbGUucG5nXCJcbiAgICAgICAgICBhbHQ9XCJPcGVuIGRldGFpbHNcIlxuICAgICAgICAgIHRpdGxlPVwiRGV0YWlsc1wiXG4gICAgICAgICAgaGVpZ2h0PVwiMjBweFwiXG4gICAgICAgICAgY2xhc3M9XCJidG4gYnRuX19kZXRhaWxzXCJcbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbmA7XG5cbmNvbnN0IGFkZExpc3RJdGVtID0gZnVuY3Rpb24gKGVsLCB0aXRsZSwgbnVtRHVlKSB7XG4gIGNvbnN0IGh0bWxMaXN0SXRlbSA9IGBcbiAgICA8ZGl2IGNsYXNzPVwic2lkZWJhcl9fbGlzdGl0ZW1cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJsaXN0aXRlbV9fb3B0aW9uc19fY29udGFpbmVyXCI+XG4gICAgICAgIDxpbWdcbiAgICAgICAgICBzcmM9XCIuL2ltYWdlcy9saXN0cy1tZW51LnBuZ1wiXG4gICAgICAgICAgaGVpZ2h0PVwiMjBweFwiXG4gICAgICAgICAgY2xhc3M9XCJidG4gYnRuX19saXN0aXRlbV9fb3B0aW9uc1wiXG4gICAgICAgIC8+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0aXRlbV9fb3B0aW9uc19fbWVudV9fY29udGFpbmVyIGhpZGRlblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcnJvdy11cFwiPjwvZGl2PlxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIHNyYz1cIi4vaW1hZ2VzL3RyYXNoLnN2Z1wiXG4gICAgICAgICAgICBjbGFzcz1cImJ0biBidG5fX2xpc3RpdGVtIGJ0bl9fbGlzdGl0ZW0tLWRlbFwiXG4gICAgICAgICAgICBoZWlnaHQ9XCIyOHB4XCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIHNyYz1cIi4vaW1hZ2VzL2Rvd24tdHJpYW5nbGUucG5nXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bl9fbGlzdGl0ZW0gYnRuX19saXN0aXRlbS0tdXBcIlxuICAgICAgICAgICAgaGVpZ2h0PVwiMjhweFwiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBzcmM9XCIuL2ltYWdlcy9kb3duLXRyaWFuZ2xlLnBuZ1wiXG4gICAgICAgICAgICBjbGFzcz1cImJ0biBidG5fX2xpc3RpdGVtIGJ0bl9fbGlzdGl0ZW0tLWRvd25cIlxuICAgICAgICAgICAgaGVpZ2h0PVwiMjhweFwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwhLS0gZW5kIGxpc3RpdGVtX19vcHRpb25zX19tZW51X19jb250YWluZXIgLS0+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJsaXN0aXRlbV9fdGl0bGVcIj4ke3RpdGxlfTwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImxpc3RpdGVtX19kdWUtY291bnRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxpc3RpdGVtX19kdWUtY291bnRfX3RpdGxlXCI+VGFza3MgRHVlOjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdGl0ZW1fX2R1ZS1jb3VudF9fY291bnRcIj4ke251bUR1ZX08L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgO1xuXG4gIGVsLmluc2VydEFkamFjZW50SFRNTChcImFmdGVyZW5kXCIsIGh0bWxMaXN0SXRlbSk7XG59O1xuXG5leHBvcnQge1xuICBjbGVhckZvcm0sXG4gIHRvZ2dsZVNpZGViYXIsXG4gIG9wZW5BZGRUYXNrLFxuICBkaW1Db21wbGV0ZWRUYXNrcyxcbiAgdW5kb0NvbXBsZXRlZERpbSxcbiAgdG9nZ2xlVGFza0RldGFpbHNCdG4sXG4gIHRvZ2dsZUluYWN0aXZlRGV0YWlsc0J0bnMsXG4gIGV4cGFuZFNlbGVjdGVkRGV0YWlscyxcbiAgaGlkZU5vblNlbGVjdGVkRGV0YWlscyxcbiAgYWRkUHJpb3JpdHlWaXN1YWwsXG4gIHJlbW92ZVByaW9yaXR5VmlzdWFsLFxuICB0b2dnbGVTaWRlYmFyTGlzdE9wdGlvbnMsXG4gIGhpZGVTaWRlYmFyTGlzdE9wdGlvbnMsXG4gIGFkZExpc3RJdGVtLFxuICB1cGRhdGVBY3RpdmVMaXN0VUksXG4gIHRvZ2dsZVNpZGViYXJOZXdMaXN0VGl0bGUsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gXG4gVEFCTEUgT0YgQ09OVEVOVFNcblxuICogTW9kdWxlc1xuICogRE9NIFZhcmlhYmxlc1xuICogRFJZIEZ1bmN0aW9uc1xuICogSGVhZGVyIEJ1dHRvbnNcbiAqIFRhc2sgQnV0dG9uc1xuICogU2lkZWJhciBCdXR0b25zXG4gKiBGb3JtIEJ1dHRvbnNcbiAqIEFwcCBMb2dpY1xuXG4qKi9cblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBNT0RVTEVTXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuaW1wb3J0IHsgTWFzdGVyTGlzdCB9IGZyb20gXCIuL3RvZG8tbG9naWMuanNcIjtcbmltcG9ydCB7XG4gIGFkZFByaW9yaXR5VmlzdWFsLFxuICBkaW1Db21wbGV0ZWRUYXNrcyxcbiAgZXhwYW5kU2VsZWN0ZWREZXRhaWxzLFxuICBoaWRlTm9uU2VsZWN0ZWREZXRhaWxzLFxuICByZW1vdmVQcmlvcml0eVZpc3VhbCxcbiAgdG9nZ2xlSW5hY3RpdmVEZXRhaWxzQnRucyxcbiAgdG9nZ2xlU2lkZWJhcixcbiAgdG9nZ2xlU2lkZWJhckxpc3RPcHRpb25zLFxuICB0b2dnbGVUYXNrRGV0YWlsc0J0bixcbiAgdW5kb0NvbXBsZXRlZERpbSxcbiAgb3BlbkFkZFRhc2ssXG4gIGNsZWFyRm9ybSxcbiAgaGlkZVNpZGViYXJMaXN0T3B0aW9ucyxcbiAgYWRkTGlzdEl0ZW0sXG4gIHVwZGF0ZUFjdGl2ZUxpc3RVSSxcbiAgdG9nZ2xlU2lkZWJhck5ld0xpc3RUaXRsZSxcbn0gZnJvbSBcIi4vdmlzdWFsLmpzXCI7XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogRE9NIFZBUklBQkxFU1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vIEJVVFRPTlNcbi8vIC0tLS0gSGVhZGVyXG5jb25zdCBidG5MaXN0c01lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxpc3RzLW1lbnVcIik7XG5jb25zdCBsaXN0c01lbnVFbmRCYXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5iYXJfX2VuZFwiKTtcbmNvbnN0IGxpc3RzTWVudU1pZEJhcjEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJhcl9fbWlkXCIpO1xuY29uc3QgbGlzdHNNZW51TWlkQmFyMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYmFyX19taWQyXCIpO1xuY29uc3QgYnRuQWRkVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2tcIik7XG5cbi8vIC0tLS0gVGFza3NcbmNvbnN0IGNoZWNrYm94VGFza0NvbXBsZXRlID1cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRhc2tpdGVtX19jaGVja2JveFwiKTtcbmNvbnN0IGJ0blRhc2tEZXRhaWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImJ0bl9fZGV0YWlsc1wiKTtcbmNvbnN0IGNoZWNrYm94UHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFxuICBcInRhc2tpdGVtX19wcmlvcml0eS1jaGVja19fY2hlY2tib3hcIlxuKTtcbmNvbnN0IGJ0bkVkaXRUYXNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImJ0bl9fdGFza2l0ZW1fX2VkaXRcIik7XG5jb25zdCBidG5EZWxUYXNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImJ0bl9fdGFza2l0ZW1fX2RlbGV0ZVwiKTtcblxuLy8gLS0tLSBTaWRlYmFyXG5jb25zdCBidG5BZGRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG5fX3NpZGViYXJfX2FkZC1saXN0XCIpO1xuY29uc3QgYnRuTGlzdHNPcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImJ0bl9fbGlzdGl0ZW1fX29wdGlvbnNcIik7XG5cbi8vIC0tLS0gRm9ybVxuY29uc3QgYnRuRm9ybUNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG5fX2Zvcm0tY2xvc2VcIik7XG5jb25zdCBidG5Gb3JtU3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG5fX2Zvcm0tc3VibWl0XCIpO1xuXG4vLyBTSURFQkFSXG5jb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyXCIpO1xuY29uc3Qgc2lkZWJhckhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhcl9faGVhZGVyXCIpO1xuY29uc3Qgc2lkZWJhckFkZExpc3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gIFwiLnNpZGViYXJfX2FkZC1saXN0X19hZGQtdGl0bGVfX2NvbnRhaW5lclwiXG4pO1xuY29uc3QgbGlzdEl0ZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNpZGViYXJfX2xpc3RpdGVtXCIpO1xuY29uc3QgbGlzdEl0ZW1zT3B0aW9uc01lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFxuICBcImxpc3RpdGVtX19vcHRpb25zX19tZW51X19jb250YWluZXJcIlxuKTtcblxuLy8gRk9STVxuY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybVwiKTtcbmNvbnN0IGZvcm1UYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtX190ZXh0LS10aXRsZVwiKTtcbmNvbnN0IGZvcm1EdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm1fX2RhdGVcIik7XG5jb25zdCBmb3JtRGVzYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybV9fdGV4dC1hcmVhXCIpO1xuY29uc3QgZm9ybVByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtX19wcmlvcml0eV9fY2hlY2tib3hcIik7XG5cbi8vIC0tIE1BSU4gQVBQXG5jb25zdCBhY3RpdmVMaXN0V2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLWFwcFwiKTtcbmNvbnN0IGFjdGl2ZUxpc3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWN0aXZlLWxpc3RfX3RpdGxlXCIpO1xuY29uc3QgdGFza0l0ZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRhc2tpdGVtXCIpO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIERSWSBGVU5DVElPTlNcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogSEVBREVSIEJVVFRPTlNcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyBTSURFQkFSIFRPR0dMRVxuYnRuTGlzdHNNZW51LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIHRvZ2dsZVNpZGViYXIoc2lkZWJhciwgbGlzdHNNZW51RW5kQmFycywgbGlzdHNNZW51TWlkQmFyMSwgbGlzdHNNZW51TWlkQmFyMik7XG59KTtcblxuLy8gQUREIFRBU0sgT1BFTlxuYnRuQWRkVGFzay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBvcGVuQWRkVGFzayhmb3JtKTtcbn0pO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIFRBU0sgQlVUVE9OU1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vIENoYW5nZSBjb21wbGV0ZWQgdGFzayBjaGVja2JveCB2aXN1YWxcbmFjdGl2ZUxpc3RXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGNvbnN0IGNsaWNrZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiLnRhc2tpdGVtX19jaGVja2JveFwiKTtcbiAgaWYgKCFjbGlja2VkKSByZXR1cm47XG5cbiAgaWYgKGNsaWNrZWQuY2hlY2tlZCkge1xuICAgIGRpbUNvbXBsZXRlZFRhc2tzKGNsaWNrZWQpO1xuICB9XG5cbiAgLy8gVW5kbyBDaGFuZ2UgY29tcGxldGVkIHRhc2sgdmlzdWFsXG4gIGlmICghY2xpY2tlZC5jaGVja2VkKSB7XG4gICAgdW5kb0NvbXBsZXRlZERpbShjbGlja2VkKTtcbiAgfVxufSk7XG5cbi8vIFZpc3VhbCBmb3Igb3BlbiB0YXNrIGRldGFpbHMgYnV0dG9uXG5hY3RpdmVMaXN0V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBjb25zdCBjbGlja2VkID0gZS50YXJnZXQuY2xvc2VzdChcIi5idG5fX2RldGFpbHNcIik7XG5cbiAgaWYgKCFjbGlja2VkKSByZXR1cm47XG5cbiAgLy8gVG9nZ2xlIHRhc2sgZGV0YWlscyBvcGVuIG9uIGNsaWNrXG4gIHRvZ2dsZVRhc2tEZXRhaWxzQnRuKGNsaWNrZWQpO1xuICB0b2dnbGVJbmFjdGl2ZURldGFpbHNCdG5zKGUpO1xuICBleHBhbmRTZWxlY3RlZERldGFpbHMoY2xpY2tlZCk7XG4gIGhpZGVOb25TZWxlY3RlZERldGFpbHMoY2xpY2tlZCk7XG59KTtcblxuLy8gQ2hhbmdlIHByaW9yaXR5IGNoZWNrYm94IHZpc3VhbFxuYWN0aXZlTGlzdFdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgY29uc3QgY2xpY2tlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIudGFza2l0ZW1fX3ByaW9yaXR5LWNoZWNrX19jaGVja2JveFwiKTtcblxuICBpZiAoIWNsaWNrZWQpIHJldHVybjtcblxuICBpZiAoY2xpY2tlZC5jaGVja2VkKSB7XG4gICAgYWRkUHJpb3JpdHlWaXN1YWwoZSwgY2xpY2tlZCk7XG4gIH1cblxuICBpZiAoIWNsaWNrZWQuY2hlY2tlZCkge1xuICAgIHJlbW92ZVByaW9yaXR5VmlzdWFsKGUsIGNsaWNrZWQpO1xuICB9XG59KTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBTSURFQkFSIEJVVFRPTlNcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyBTaWRlYmFyIGxpc3RzIG9wdGlvbnNcbmJ0bkFkZExpc3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIC8vIGlmICgpXG4gIHRvZ2dsZVNpZGViYXJOZXdMaXN0VGl0bGUoc2lkZWJhckFkZExpc3RUaXRsZSk7XG4gIC8vIGFkZExpc3RJdGVtKHNpZGViYXJIZWFkZXIsIFwiTWFpbiBMaXN0XCIsIDApO1xufSk7XG5cbnNpZGViYXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGNvbnN0IGNsaWNrZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiLmJ0bl9fbGlzdGl0ZW1fX29wdGlvbnNcIik7XG4gIGlmICghY2xpY2tlZCkgcmV0dXJuO1xuXG4gIHRvZ2dsZVNpZGViYXJMaXN0T3B0aW9ucyhjbGlja2VkKTtcbn0pO1xuXG5zaWRlYmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBjb25zdCBjbGlja2VkVHJhc2ggPSBlLnRhcmdldC5jbG9zZXN0KFwiLmJ0bl9fbGlzdGl0ZW0tLWRlbFwiKTtcbiAgY29uc3QgY2xpY2tlZEFycm93VXAgPSBlLnRhcmdldC5jbG9zZXN0KFwiLmJ0bl9fbGlzdGl0ZW0tLXVwXCIpO1xuICBjb25zdCBjbGlja2VkQXJyb3dEb3duID0gZS50YXJnZXQuY2xvc2VzdChcIi5idG5fX2xpc3RpdGVtLS1kb3duXCIpO1xuXG4gIGlmICghY2xpY2tlZFRyYXNoICYmICFjbGlja2VkQXJyb3dVcCAmJiAhY2xpY2tlZEFycm93RG93bikgcmV0dXJuO1xuXG4gIGlmIChjbGlja2VkVHJhc2ggfHwgY2xpY2tlZEFycm93VXAgfHwgY2xpY2tlZEFycm93RG93bikge1xuICAgIGNvbnN0IGNsaWNrZWQgPSBjbGlja2VkVHJhc2ggfHwgY2xpY2tlZEFycm93VXAgfHwgY2xpY2tlZEFycm93RG93bjtcbiAgICBoaWRlU2lkZWJhckxpc3RPcHRpb25zKGNsaWNrZWQpO1xuICB9XG59KTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBGT1JNIEJVVFRPTlNcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5idG5Gb3JtQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgY2xlYXJGb3JtKGZvcm0sIGZvcm1UYXNrLCBmb3JtRHVlLCBmb3JtRGVzYywgZm9ybVByaW9yaXR5KTtcbn0pO1xuXG5idG5Gb3JtU3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGNsZWFyRm9ybShmb3JtLCBmb3JtVGFzaywgZm9ybUR1ZSwgZm9ybURlc2MsIGZvcm1Qcmlvcml0eSk7XG59KTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBBUFAgTE9HSUNcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyBJbml0aWFsaXplIE1hc3RlciBMaXN0XG5jb25zdCBtYXN0ZXJMaXN0ID0gbmV3IE1hc3Rlckxpc3QoKTtcblxuLy8gQWRkIERlZmF1bHQgTGlzdCB0byBNYXN0ZXIgTGlzdFxubWFzdGVyTGlzdC5hZGRJdGVtKFwiTWFpbiBMaXN0XCIpO1xuXG4vLyBBZGQgRGVmYXVsdCBsaXN0IHRvIHNpZGViYXJcbmFkZExpc3RJdGVtKHNpZGViYXJIZWFkZXIsIG1hc3Rlckxpc3QuaXRlbXNbMF0udGl0bGUsIDApO1xuXG4vLyBVcGRhdGUgYWN0aXZlTGlzdCB2aXN1YWxcbmxldCBhY3RpdmVMaXN0ID0gbWFzdGVyTGlzdC5pdGVtc1swXTtcbnVwZGF0ZUFjdGl2ZUxpc3RVSShhY3RpdmVMaXN0VGl0bGUsIGFjdGl2ZUxpc3QudGl0bGUpO1xuXG4vL1RFU1RJTkcgQVJFQVxuLyoqXG4gKlxuICpcbiAqXG4gKlxuICpcbiAqXG4gKlxuICovXG5cbi8qXG4vLyBURVNUIFNBTVBMRVNcbi8vIENyZWF0ZSBNYXN0ZXIgTGlzdFxuY29uc3QgbWFzdGVyTGlzdCA9IG5ldyBNYXN0ZXJMaXN0KCk7XG5cbi8vIEFkZCBMaXN0cyB0byBNYXN0ZXIgTGlzdFxubWFzdGVyTGlzdC5hZGRJdGVtKFwiVGVzdCBMaXN0XCIpO1xubWFzdGVyTGlzdC5hZGRJdGVtKFwiQSBUZXN0IExpc3QgMlwiKTtcbm1hc3Rlckxpc3QuYWRkSXRlbShcIlRlc3QgTGlzdCAzXCIpO1xubWFzdGVyTGlzdC5hZGRJdGVtKFwiVGVzdCBMaXN0IDRcIik7XG5cbi8vIEFkZCBUYXNrcyB0byBMaXN0IGluIE1hc3RlciBMaXN0XG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLmFkZEl0ZW0oXCJ0ZXN0MVwiLCBcImEgdGVzdDEgZGVzY1wiLCBcIjguMTBcIik7XG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLmFkZEl0ZW0oXCJ0ZXN0MlwiLCBcImIgdGVzdDIgZGVzY1wiLCBcIjguMDhcIik7XG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLmFkZEl0ZW0oXCJ0ZXN0M1wiLCBcImMgdGVzdDMgZGVzY1wiLCBcIjcuMTZcIik7XG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLmFkZEl0ZW0oXCJ0ZXN0NFwiLCBcImQgdGVzdDQgZGVzY1wiLCBcIjEyLjIyXCIpO1xubWFzdGVyTGlzdC5pdGVtc1swXS5hZGRJdGVtKFwidGVzdDVcIiwgXCJlIHRlc3Q1IGRlc2NcIiwgXCIzLjIyXCIpO1xuXG4vLyBtYXN0ZXJMaXN0Lml0ZW1zWzBdLml0ZW1zWzFdLmNvbXBsZXRlZCA9IHRydWU7XG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLml0ZW1zWzFdLmRhdGVDcmVhdGVkID0gMTAwO1xuLy8gbWFzdGVyTGlzdC5pdGVtc1swXS5pdGVtc1s0XS5jb21wbGV0ZWQgPSB0cnVlO1xuXG5jb25zb2xlLmxvZyhtYXN0ZXJMaXN0Lml0ZW1zWzBdLml0ZW1zKTtcblxubWFzdGVyTGlzdC5pdGVtc1swXS5pdGVtc1s0XS50b2dnbGVDb21wbGV0ZWQoKTtcblxubWFzdGVyTGlzdC5pdGVtc1swXS5pdGVtc1sxXS50b2dnbGVQcmlvcml0eSgpO1xuY29uc29sZS50YWJsZShtYXN0ZXJMaXN0Lml0ZW1zWzBdLml0ZW1zKTtcbiovXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=