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


/**
 TABLE OF CONTENTS
 * Modules
 * DOM Variables
 * On Load Actions
 * Header Buttons
 * 
*/

/* ************************************************** */
//* MODULES
/* ************************************************** */


/* ************************************************** */
//* DOM VARIABLES
/* ************************************************** */
// -- BUTTONS
// #### Header
const btnListsMenu = document.querySelector(".lists-menu");
const listsMenuEndBars = document.querySelectorAll(".bar__end");
const listsMenuMidBar1 = document.querySelector(".bar__mid");
const listsMenuMidBar2 = document.querySelector(".bar__mid2");
const btnAddTask = document.querySelector(".add-task");

// #### Tasks
const checkboxTaskComplete =
  document.getElementsByClassName("taskitem__checkbox");
const btnTaskDetails = document.getElementsByClassName("btn__details");
const checkboxPriority = document.getElementsByClassName(
  "taskitem__priority-check__checkbox"
);
const btnEditTask = document.getElementsByClassName("btn__taskitem__edit");
const btnDelTask = document.getElementsByClassName("btn__taskitem__delete");

// #### Sidebar
const btnListsOpts = document.getElementsByClassName("btn__listitem__options");

// -- SIDEBAR
const sidebar = document.querySelector(".sidebar");
const listItems = document.getElementsByClassName("sidebar__listitem");
const listItemsOptionsMenu = document.getElementsByClassName(
  "listitem__options__menu__container"
);

// -- MAIN APP
const taskItems = document.getElementsByClassName("taskitem");

/* ************************************************** */
//* HEADER BUTTONS
/* ************************************************** */
// SIDEBAR OPEN
btnListsMenu.addEventListener("click", () => {
  // Reveal side bar
  sidebar.classList.toggle("hidden");

  // Tranform close button
  listsMenuEndBars.forEach((bar) => bar.classList.toggle("bar--vanish"));
  listsMenuMidBar1.classList.toggle("bar__mid--rotate");
  listsMenuMidBar2.classList.toggle("bar__mid2--rotate");
});

// ADD TASK OPEN
btnAddTask.addEventListener("click", () => {});

/* ************************************************** */
//* TASK BUTTONS
/* ************************************************** */
// Change completed task checkbox visual
document.addEventListener("click", (e) => {
  const clicked = e.target.closest(".taskitem__checkbox");
  if (!clicked) return;

  if (clicked.checked) {
    // Change task text color / strikethru
    clicked.parentElement.classList.add("checked");

    // Change task details button color
    clicked.parentElement.lastElementChild.firstElementChild.classList.add(
      "btn__details--completed"
    );

    // Change task item filter
    clicked.parentElement.parentElement.classList.add("completed--true");
  }

  // Undo Change completed task visual
  if (!clicked.checked) {
    clicked.parentElement.classList.remove("checked");
    clicked.parentElement.lastElementChild.firstElementChild.classList.remove(
      "btn__details--completed"
    );
    clicked.parentElement.parentElement.classList.remove("completed--true");
  }
});

// Visual for open task details button
document.addEventListener("click", (e) => {
  const clicked = e.target.closest(".btn__details");

  if (!clicked) return;

  // Toggle task details open on click
  clicked.classList.contains("btn__details--open")
    ? clicked.classList.remove("btn__details--open")
    : clicked.classList.add("btn__details--open");

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

  if (clicked.classList.contains("btn__details--open"))
    expandTaskitem(clicked.parentElement.parentElement.parentElement);
  if (!clicked.classList.contains("btn__details--open"))
    hideTaskDetails(clicked.parentElement.parentElement.parentElement);
});

// Change priority checkbox visual
document.addEventListener("click", (e) => {
  const clicked = e.target.closest(".taskitem__priority-check__checkbox");

  if (!clicked) return;

  if (clicked.checked) {
    // Change box border
    e.target.classList.add("taskitem__priority-check__checkbox--red-border");

    // Change background color of task
    clicked.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add(
      "priority--true"
    );
  }

  if (!clicked.checked) {
    // Change text
    e.target.parentElement.classList.remove(
      "taskitem__priority-check--red-txt"
    );

    // Change box border
    e.target.classList.remove("taskitem__priority-check__checkbox--red-border");

    // Change background color back
    clicked.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove(
      "priority--true"
    );
  }
});

/* ************************************************** */
//* SIDEBAR BUTTONS
/* ************************************************** */
// Sidebar lists options
document.addEventListener("click", (e) => {
  const clicked = e.target.closest(".btn__listitem__options");
  if (!clicked) return;

  clicked.parentElement.lastElementChild.classList.toggle("hidden");
});

const expandTaskitem = function (el, priority, desc) {
  const html = `
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

  el.insertAdjacentHTML("beforeend", html);
};

const hideTaskDetails = function (el) {
  el.removeChild(el.lastElementChild);
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVc7QUFDWCxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFa0M7Ozs7Ozs7VUMzSGxDO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUM2Qzs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0EsNkNBQTZDOztBQUU3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLy4vc3JjL3RvZG8tbG9naWMuanMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIE1BU1RFUiBMSVNUXG5jbGFzcyBNYXN0ZXJMaXN0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pdGVtcyA9IFtdO1xuICB9XG5cbiAgYWRkSXRlbSh0aXRsZSkge1xuICAgIHRoaXMuaXRlbXMucHVzaChuZXcgTGlzdCh0aXRsZSkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGVsZXRlSXRlbShpbmRleCkge1xuICAgIHRoaXMuaXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG1vdmVJdGVtKGluZGV4LCBkaXIpIHtcbiAgICBjb25zdCBtb3ZlZEl0ZW0gPSB0aGlzLml0ZW1zLnNwbGljZShpbmRleCwgMSlbMF07XG4gICAgY29uc29sZS5sb2cobW92ZWRJdGVtKTtcbiAgICBjb25zb2xlLmxvZyhpbmRleCArIGRpcik7XG4gICAgdGhpcy5pdGVtcy5zcGxpY2UoaW5kZXggKyBkaXIsIDAsIG1vdmVkSXRlbSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzb3J0SXRlbXMoY2F0ZWdvcnksIHJldmVyc2VDaGVjaykge1xuICAgIGlmIChjYXRlZ29yeSA9PT0gXCJkYXRlRHVlXCIgfHwgY2F0ZWdvcnkgPT09IFwiY29tcGxldGVkXCIpIHtcbiAgICAgIHJldmVyc2VDaGVjayA9PT0gZmFsc2VcbiAgICAgICAgPyB0aGlzLml0ZW1zLnNvcnQoKGEsIGIpID0+IGFbY2F0ZWdvcnldIC0gYltjYXRlZ29yeV0pXG4gICAgICAgIDogdGhpcy5pdGVtcy5zb3J0KChhLCBiKSA9PiBiW2NhdGVnb3J5XSAtIGFbY2F0ZWdvcnldKTtcbiAgICB9IGVsc2UgaWYgKGNhdGVnb3J5ID09PSBcInRpdGxlXCIpIHtcbiAgICAgIHJldmVyc2VDaGVjayA9PT0gZmFsc2VcbiAgICAgICAgPyB0aGlzLml0ZW1zLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWVBID0gYS50aXRsZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgY29uc3QgbmFtZUIgPSBiLnRpdGxlLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAobmFtZUEgPCBuYW1lQikge1xuICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZUEgPiBuYW1lQikge1xuICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgfSlcbiAgICAgICAgOiB0aGlzLml0ZW1zLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWVBID0gYS50aXRsZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgY29uc3QgbmFtZUIgPSBiLnRpdGxlLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAobmFtZUEgPCBuYW1lQikge1xuICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuYW1lQSA+IG5hbWVCKSB7XG4gICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgfSk7XG4gICAgfSBlbHNlXG4gICAgICByZXZlcnNlQ2hlY2sgPT09IGZhbHNlXG4gICAgICAgID8gdGhpcy5pdGVtcy5zb3J0KChhLCBiKSA9PiBiW2NhdGVnb3J5XSAtIGFbY2F0ZWdvcnldKVxuICAgICAgICA6IHRoaXMuaXRlbXMuc29ydCgoYSwgYikgPT4gYVtjYXRlZ29yeV0gLSBiW2NhdGVnb3J5XSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuLy8gTElTVFNcbmNsYXNzIExpc3QgZXh0ZW5kcyBNYXN0ZXJMaXN0IHtcbiAgY29uc3RydWN0b3IodGl0bGUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB0aGlzLmRhdGVDcmVhdGVkID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLmNvbG9yID0gXCJpbml0aWFsXCI7XG4gICAgdGhpcy5pdGVtcyA9IFtdO1xuICB9XG5cbiAgLy8gQWRkIFRhc2tcbiAgYWRkSXRlbSh0aXRsZSwgZGVzYywgZGF0ZUR1ZSkge1xuICAgIHRoaXMuaXRlbXMucHVzaChuZXcgVGFzayh0aXRsZSwgZGVzYywgZGF0ZUR1ZSkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgX2NsZWFyQ29tcGxldGVkVGFza3MoKSB7XG4gICAgdGhpcy5pdGVtcyA9IHRoaXMuaXRlbXMuZmlsdGVyKChhKSA9PiBhLmNvbXBsZXRlZCA9PT0gZmFsc2UpO1xuICB9XG59XG5cbi8vIFRBU0tTXG5jbGFzcyBUYXNrIHtcbiAgY29uc3RydWN0b3IodGl0bGUsIGRlc2MsIGRhdGVEdWUpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kZXNjID0gZGVzYztcbiAgICB0aGlzLmRhdGVDcmVhdGVkID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLmRhdGVEdWUgPSArZGF0ZUR1ZTtcbiAgICB0aGlzLnByaW9yaXR5ID0gZmFsc2U7XG4gICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmNvbXBsZXRlZERhdGU7XG4gIH1cblxuICAvLyBUb2dnbGUgQ29tcGxldGVkXG4gIHRvZ2dsZUNvbXBsZXRlZCgpIHtcbiAgICB0aGlzLmNvbXBsZXRlZCA9PT0gZmFsc2VcbiAgICAgID8gKHRoaXMuY29tcGxldGVkID0gdHJ1ZSlcbiAgICAgIDogKHRoaXMuY29tcGxldGVkID0gZmFsc2UpO1xuXG4gICAgaWYgKHRoaXMuY29tcGxldGVkID09PSB0cnVlKVxuICAgICAgdGhpcy5jb21wbGV0ZWREYXRlID0gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZyhuYXZpZ2F0b3IubGFuZ3VhZ2VzWzBdLCB7XG4gICAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxuICAgICAgICBtb250aDogXCJzaG9ydFwiLFxuICAgICAgICBkYXk6IFwiMi1kaWdpdFwiLFxuICAgICAgfSk7XG5cbiAgICBpZiAodGhpcy5jb21wbGV0ZWQgPT09IGZhbHNlKSB0aGlzLmNvbXBsZXRlZERhdGUgPSBcIlwiO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBUb2dnbGUgUHJpb3JpdHlcbiAgdG9nZ2xlUHJpb3JpdHkoKSB7XG4gICAgdGhpcy5wcmlvcml0eSA9PT0gZmFsc2UgPyAodGhpcy5wcmlvcml0eSA9IHRydWUpIDogKHRoaXMucHJpb3JpdHkgPSBmYWxzZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuZXhwb3J0IHsgTWFzdGVyTGlzdCwgTGlzdCwgVGFzayB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gVEFCTEUgT0YgQ09OVEVOVFNcbiAqIE1vZHVsZXNcbiAqIERPTSBWYXJpYWJsZXNcbiAqIE9uIExvYWQgQWN0aW9uc1xuICogSGVhZGVyIEJ1dHRvbnNcbiAqIFxuKi9cblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBNT0RVTEVTXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuaW1wb3J0IHsgTWFzdGVyTGlzdCB9IGZyb20gXCIuL3RvZG8tbG9naWMuanNcIjtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBET00gVkFSSUFCTEVTXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8gLS0gQlVUVE9OU1xuLy8gIyMjIyBIZWFkZXJcbmNvbnN0IGJ0bkxpc3RzTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGlzdHMtbWVudVwiKTtcbmNvbnN0IGxpc3RzTWVudUVuZEJhcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJhcl9fZW5kXCIpO1xuY29uc3QgbGlzdHNNZW51TWlkQmFyMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYmFyX19taWRcIik7XG5jb25zdCBsaXN0c01lbnVNaWRCYXIyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5iYXJfX21pZDJcIik7XG5jb25zdCBidG5BZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFza1wiKTtcblxuLy8gIyMjIyBUYXNrc1xuY29uc3QgY2hlY2tib3hUYXNrQ29tcGxldGUgPVxuICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidGFza2l0ZW1fX2NoZWNrYm94XCIpO1xuY29uc3QgYnRuVGFza0RldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYnRuX19kZXRhaWxzXCIpO1xuY29uc3QgY2hlY2tib3hQcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXG4gIFwidGFza2l0ZW1fX3ByaW9yaXR5LWNoZWNrX19jaGVja2JveFwiXG4pO1xuY29uc3QgYnRuRWRpdFRhc2sgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYnRuX190YXNraXRlbV9fZWRpdFwiKTtcbmNvbnN0IGJ0bkRlbFRhc2sgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYnRuX190YXNraXRlbV9fZGVsZXRlXCIpO1xuXG4vLyAjIyMjIFNpZGViYXJcbmNvbnN0IGJ0bkxpc3RzT3B0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJidG5fX2xpc3RpdGVtX19vcHRpb25zXCIpO1xuXG4vLyAtLSBTSURFQkFSXG5jb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyXCIpO1xuY29uc3QgbGlzdEl0ZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNpZGViYXJfX2xpc3RpdGVtXCIpO1xuY29uc3QgbGlzdEl0ZW1zT3B0aW9uc01lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFxuICBcImxpc3RpdGVtX19vcHRpb25zX19tZW51X19jb250YWluZXJcIlxuKTtcblxuLy8gLS0gTUFJTiBBUFBcbmNvbnN0IHRhc2tJdGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0YXNraXRlbVwiKTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBIRUFERVIgQlVUVE9OU1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vIFNJREVCQVIgT1BFTlxuYnRuTGlzdHNNZW51LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIC8vIFJldmVhbCBzaWRlIGJhclxuICBzaWRlYmFyLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRkZW5cIik7XG5cbiAgLy8gVHJhbmZvcm0gY2xvc2UgYnV0dG9uXG4gIGxpc3RzTWVudUVuZEJhcnMuZm9yRWFjaCgoYmFyKSA9PiBiYXIuY2xhc3NMaXN0LnRvZ2dsZShcImJhci0tdmFuaXNoXCIpKTtcbiAgbGlzdHNNZW51TWlkQmFyMS5jbGFzc0xpc3QudG9nZ2xlKFwiYmFyX19taWQtLXJvdGF0ZVwiKTtcbiAgbGlzdHNNZW51TWlkQmFyMi5jbGFzc0xpc3QudG9nZ2xlKFwiYmFyX19taWQyLS1yb3RhdGVcIik7XG59KTtcblxuLy8gQUREIFRBU0sgT1BFTlxuYnRuQWRkVGFzay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge30pO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIFRBU0sgQlVUVE9OU1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vIENoYW5nZSBjb21wbGV0ZWQgdGFzayBjaGVja2JveCB2aXN1YWxcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBjb25zdCBjbGlja2VkID0gZS50YXJnZXQuY2xvc2VzdChcIi50YXNraXRlbV9fY2hlY2tib3hcIik7XG4gIGlmICghY2xpY2tlZCkgcmV0dXJuO1xuXG4gIGlmIChjbGlja2VkLmNoZWNrZWQpIHtcbiAgICAvLyBDaGFuZ2UgdGFzayB0ZXh0IGNvbG9yIC8gc3RyaWtldGhydVxuICAgIGNsaWNrZWQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiY2hlY2tlZFwiKTtcblxuICAgIC8vIENoYW5nZSB0YXNrIGRldGFpbHMgYnV0dG9uIGNvbG9yXG4gICAgY2xpY2tlZC5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQuY2xhc3NMaXN0LmFkZChcbiAgICAgIFwiYnRuX19kZXRhaWxzLS1jb21wbGV0ZWRcIlxuICAgICk7XG5cbiAgICAvLyBDaGFuZ2UgdGFzayBpdGVtIGZpbHRlclxuICAgIGNsaWNrZWQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjb21wbGV0ZWQtLXRydWVcIik7XG4gIH1cblxuICAvLyBVbmRvIENoYW5nZSBjb21wbGV0ZWQgdGFzayB2aXN1YWxcbiAgaWYgKCFjbGlja2VkLmNoZWNrZWQpIHtcbiAgICBjbGlja2VkLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImNoZWNrZWRcIik7XG4gICAgY2xpY2tlZC5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQuY2xhc3NMaXN0LnJlbW92ZShcbiAgICAgIFwiYnRuX19kZXRhaWxzLS1jb21wbGV0ZWRcIlxuICAgICk7XG4gICAgY2xpY2tlZC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImNvbXBsZXRlZC0tdHJ1ZVwiKTtcbiAgfVxufSk7XG5cbi8vIFZpc3VhbCBmb3Igb3BlbiB0YXNrIGRldGFpbHMgYnV0dG9uXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgY29uc3QgY2xpY2tlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIuYnRuX19kZXRhaWxzXCIpO1xuXG4gIGlmICghY2xpY2tlZCkgcmV0dXJuO1xuXG4gIC8vIFRvZ2dsZSB0YXNrIGRldGFpbHMgb3BlbiBvbiBjbGlja1xuICBjbGlja2VkLmNsYXNzTGlzdC5jb250YWlucyhcImJ0bl9fZGV0YWlscy0tb3BlblwiKVxuICAgID8gY2xpY2tlZC5jbGFzc0xpc3QucmVtb3ZlKFwiYnRuX19kZXRhaWxzLS1vcGVuXCIpXG4gICAgOiBjbGlja2VkLmNsYXNzTGlzdC5hZGQoXCJidG5fX2RldGFpbHMtLW9wZW5cIik7XG5cbiAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYnRuX19kZXRhaWxzXCIpO1xuXG4gIGZvciAobGV0IGJ1dHRvbiBvZiBidXR0b25zKSB7XG4gICAgLy8gQ2xvc2UgYW55IHRhc2sgZGV0YWlscyBvcGVuIHRvIHN0b3AgbXVsdGlwbGUgYXQgb25jZVxuICAgIGlmIChidXR0b24gIT09IGUudGFyZ2V0KSB7XG4gICAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImJ0bl9fZGV0YWlscy0tb3BlblwiKTtcblxuICAgICAgaWYgKFxuICAgICAgICBidXR0b24ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoID09PSAyXG4gICAgICApXG4gICAgICAgIGhpZGVUYXNrRGV0YWlscyhidXR0b24ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChjbGlja2VkLmNsYXNzTGlzdC5jb250YWlucyhcImJ0bl9fZGV0YWlscy0tb3BlblwiKSlcbiAgICBleHBhbmRUYXNraXRlbShjbGlja2VkLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KTtcbiAgaWYgKCFjbGlja2VkLmNsYXNzTGlzdC5jb250YWlucyhcImJ0bl9fZGV0YWlscy0tb3BlblwiKSlcbiAgICBoaWRlVGFza0RldGFpbHMoY2xpY2tlZC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCk7XG59KTtcblxuLy8gQ2hhbmdlIHByaW9yaXR5IGNoZWNrYm94IHZpc3VhbFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGNvbnN0IGNsaWNrZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiLnRhc2tpdGVtX19wcmlvcml0eS1jaGVja19fY2hlY2tib3hcIik7XG5cbiAgaWYgKCFjbGlja2VkKSByZXR1cm47XG5cbiAgaWYgKGNsaWNrZWQuY2hlY2tlZCkge1xuICAgIC8vIENoYW5nZSBib3ggYm9yZGVyXG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcInRhc2tpdGVtX19wcmlvcml0eS1jaGVja19fY2hlY2tib3gtLXJlZC1ib3JkZXJcIik7XG5cbiAgICAvLyBDaGFuZ2UgYmFja2dyb3VuZCBjb2xvciBvZiB0YXNrXG4gICAgY2xpY2tlZC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcbiAgICAgIFwicHJpb3JpdHktLXRydWVcIlxuICAgICk7XG4gIH1cblxuICBpZiAoIWNsaWNrZWQuY2hlY2tlZCkge1xuICAgIC8vIENoYW5nZSB0ZXh0XG4gICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFxuICAgICAgXCJ0YXNraXRlbV9fcHJpb3JpdHktY2hlY2stLXJlZC10eHRcIlxuICAgICk7XG5cbiAgICAvLyBDaGFuZ2UgYm94IGJvcmRlclxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJ0YXNraXRlbV9fcHJpb3JpdHktY2hlY2tfX2NoZWNrYm94LS1yZWQtYm9yZGVyXCIpO1xuXG4gICAgLy8gQ2hhbmdlIGJhY2tncm91bmQgY29sb3IgYmFja1xuICAgIGNsaWNrZWQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXG4gICAgICBcInByaW9yaXR5LS10cnVlXCJcbiAgICApO1xuICB9XG59KTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBTSURFQkFSIEJVVFRPTlNcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyBTaWRlYmFyIGxpc3RzIG9wdGlvbnNcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBjb25zdCBjbGlja2VkID0gZS50YXJnZXQuY2xvc2VzdChcIi5idG5fX2xpc3RpdGVtX19vcHRpb25zXCIpO1xuICBpZiAoIWNsaWNrZWQpIHJldHVybjtcblxuICBjbGlja2VkLnBhcmVudEVsZW1lbnQubGFzdEVsZW1lbnRDaGlsZC5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZGVuXCIpO1xufSk7XG5cbmNvbnN0IGV4cGFuZFRhc2tpdGVtID0gZnVuY3Rpb24gKGVsLCBwcmlvcml0eSwgZGVzYykge1xuICBjb25zdCBodG1sID0gYFxuICAgIDxkaXYgY2xhc3M9XCJ0YXNraXRlbS0tZXhwYW5kZWRcIj5cbiAgICAgIDxociBjbGFzcz1cInRhc2tpdGVtX19kaXZpZGVyXCIgLz5cblxuICAgICAgPGRpdiBjbGFzcz1cInRhc2tpdGVtX19kZXRhaWxzX19jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhc2tpdGVtX19kZXRhaWxzX190eHQtY29udGFpbmVyXCI+XG4gICAgICAgICAgPHA+XG4gICAgICAgICAgICBJIGhhdmUgdG8gZm9yZ2l2ZSBteXNlbGYgZm9yIHRoZSB0cmVzcGFzc2VzIG9mIHRoZSBwYXN0IGFuZCBtb3ZlXG4gICAgICAgICAgICB0byB0aGUgcHJvbWlzZSBvZiB0aGUgZnV0dXJlIGxlc3QgSSBoYXZlIHRyb3VibGUgY2xpbWJpbmcgYmFja1xuICAgICAgICAgICAgdXAgPGk+ZGUgcHJvZnVuZGlzPC9pPlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhc2tpdGVtX19kZXRhaWxzX19hY3Rpb25zLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cInRhc2tpdGVtX19wcmlvcml0eS1jaGVja1wiPlxuICAgICAgICAgICAgUHJpb3JpdHlcbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICBuYW1lPVwicHJpb3JpdHlfX2NoZWNrYm94XCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJ0YXNraXRlbV9fcHJpb3JpdHktY2hlY2tfX2NoZWNrYm94XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFza2l0ZW1fX2VkaXRfX2NvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBzcmM9XCIuL2ltYWdlcy9lZGl0LnN2Z1wiXG4gICAgICAgICAgICAgIGhlaWdodD1cIjIycHhcIlxuICAgICAgICAgICAgICBhbHQ9XCJFZGl0IHRhc2tcIlxuICAgICAgICAgICAgICB0aXRsZT1cIkVkaXQgdGFza1wiXG4gICAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bl9fdGFza2l0ZW1fX2VkaXRcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFza2l0ZW1fX2RlbF9fY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIHNyYz1cIi4vaW1hZ2VzL3RyYXNoLnN2Z1wiXG4gICAgICAgICAgICAgIGhlaWdodD1cIjI1cHhcIlxuICAgICAgICAgICAgICBhbHQ9XCJEZWxldGUgdGFza1wiXG4gICAgICAgICAgICAgIHRpdGxlPVwiRGVsZXRlIHRhc2tcIlxuICAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG5fX3Rhc2tpdGVtX19kZWxldGVcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwhLS0gZW5kIHRhc2tpdGVtX19kZXRhaWxzX19hY3Rpb25zLWNvbnRhaW5lciAtLT5cbiAgICAgIDwvZGl2PlxuICAgICAgPCEtLSBlbmQgdGFza2l0ZW1fX2RldGFpbHNfX2NvbnRhaW5lciAtLT5cbiAgICA8L2Rpdj5cbiAgYDtcblxuICBlbC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgaHRtbCk7XG59O1xuXG5jb25zdCBoaWRlVGFza0RldGFpbHMgPSBmdW5jdGlvbiAoZWwpIHtcbiAgZWwucmVtb3ZlQ2hpbGQoZWwubGFzdEVsZW1lbnRDaGlsZCk7XG59O1xuXG4vL1RFU1RJTkcgQVJFQVxuLyoqXG4gKlxuICpcbiAqXG4gKlxuICpcbiAqXG4gKlxuICovXG5cbi8qXG4vLyBURVNUIFNBTVBMRVNcbi8vIENyZWF0ZSBNYXN0ZXIgTGlzdFxuY29uc3QgbWFzdGVyTGlzdCA9IG5ldyBNYXN0ZXJMaXN0KCk7XG5cbi8vIEFkZCBMaXN0cyB0byBNYXN0ZXIgTGlzdFxubWFzdGVyTGlzdC5hZGRJdGVtKFwiVGVzdCBMaXN0XCIpO1xubWFzdGVyTGlzdC5hZGRJdGVtKFwiQSBUZXN0IExpc3QgMlwiKTtcbm1hc3Rlckxpc3QuYWRkSXRlbShcIlRlc3QgTGlzdCAzXCIpO1xubWFzdGVyTGlzdC5hZGRJdGVtKFwiVGVzdCBMaXN0IDRcIik7XG5cbi8vIEFkZCBUYXNrcyB0byBMaXN0IGluIE1hc3RlciBMaXN0XG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLmFkZEl0ZW0oXCJ0ZXN0MVwiLCBcImEgdGVzdDEgZGVzY1wiLCBcIjguMTBcIik7XG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLmFkZEl0ZW0oXCJ0ZXN0MlwiLCBcImIgdGVzdDIgZGVzY1wiLCBcIjguMDhcIik7XG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLmFkZEl0ZW0oXCJ0ZXN0M1wiLCBcImMgdGVzdDMgZGVzY1wiLCBcIjcuMTZcIik7XG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLmFkZEl0ZW0oXCJ0ZXN0NFwiLCBcImQgdGVzdDQgZGVzY1wiLCBcIjEyLjIyXCIpO1xubWFzdGVyTGlzdC5pdGVtc1swXS5hZGRJdGVtKFwidGVzdDVcIiwgXCJlIHRlc3Q1IGRlc2NcIiwgXCIzLjIyXCIpO1xuXG4vLyBtYXN0ZXJMaXN0Lml0ZW1zWzBdLml0ZW1zWzFdLmNvbXBsZXRlZCA9IHRydWU7XG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLml0ZW1zWzFdLmRhdGVDcmVhdGVkID0gMTAwO1xuLy8gbWFzdGVyTGlzdC5pdGVtc1swXS5pdGVtc1s0XS5jb21wbGV0ZWQgPSB0cnVlO1xuXG5jb25zb2xlLmxvZyhtYXN0ZXJMaXN0Lml0ZW1zWzBdLml0ZW1zKTtcblxubWFzdGVyTGlzdC5pdGVtc1swXS5pdGVtc1s0XS50b2dnbGVDb21wbGV0ZWQoKTtcblxubWFzdGVyTGlzdC5pdGVtc1swXS5pdGVtc1sxXS50b2dnbGVQcmlvcml0eSgpO1xuY29uc29sZS50YWJsZShtYXN0ZXJMaXN0Lml0ZW1zWzBdLml0ZW1zKTtcbiovXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=