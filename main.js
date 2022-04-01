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
btnListsMenu.addEventListener("click", () => {
  // Reveal side bar
  sidebar.classList.toggle("hidden");

  // Tranform close button
  listsMenuEndBars.forEach((bar) => bar.classList.toggle("bar--vanish"));
  listsMenuMidBar1.classList.toggle("bar__mid--rotate");
  listsMenuMidBar2.classList.toggle("bar__mid2--rotate");
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVc7QUFDWCxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFa0M7Ozs7Ozs7VUMzSGxDO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUM2Qzs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby8uL3NyYy90b2RvLWxvZ2ljLmpzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vLyBNQVNURVIgTElTVFxuY2xhc3MgTWFzdGVyTGlzdCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgfVxuXG4gIGFkZEl0ZW0odGl0bGUpIHtcbiAgICB0aGlzLml0ZW1zLnB1c2gobmV3IExpc3QodGl0bGUpKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGRlbGV0ZUl0ZW0oaW5kZXgpIHtcbiAgICB0aGlzLml0ZW1zLnNwbGljZShpbmRleCwgMSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBtb3ZlSXRlbShpbmRleCwgZGlyKSB7XG4gICAgY29uc3QgbW92ZWRJdGVtID0gdGhpcy5pdGVtcy5zcGxpY2UoaW5kZXgsIDEpWzBdO1xuICAgIGNvbnNvbGUubG9nKG1vdmVkSXRlbSk7XG4gICAgY29uc29sZS5sb2coaW5kZXggKyBkaXIpO1xuICAgIHRoaXMuaXRlbXMuc3BsaWNlKGluZGV4ICsgZGlyLCAwLCBtb3ZlZEl0ZW0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc29ydEl0ZW1zKGNhdGVnb3J5LCByZXZlcnNlQ2hlY2spIHtcbiAgICBpZiAoY2F0ZWdvcnkgPT09IFwiZGF0ZUR1ZVwiIHx8IGNhdGVnb3J5ID09PSBcImNvbXBsZXRlZFwiKSB7XG4gICAgICByZXZlcnNlQ2hlY2sgPT09IGZhbHNlXG4gICAgICAgID8gdGhpcy5pdGVtcy5zb3J0KChhLCBiKSA9PiBhW2NhdGVnb3J5XSAtIGJbY2F0ZWdvcnldKVxuICAgICAgICA6IHRoaXMuaXRlbXMuc29ydCgoYSwgYikgPT4gYltjYXRlZ29yeV0gLSBhW2NhdGVnb3J5XSk7XG4gICAgfSBlbHNlIGlmIChjYXRlZ29yeSA9PT0gXCJ0aXRsZVwiKSB7XG4gICAgICByZXZlcnNlQ2hlY2sgPT09IGZhbHNlXG4gICAgICAgID8gdGhpcy5pdGVtcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuYW1lQSA9IGEudGl0bGUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIGNvbnN0IG5hbWVCID0gYi50aXRsZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKG5hbWVBIDwgbmFtZUIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5hbWVBID4gbmFtZUIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgIH0pXG4gICAgICAgIDogdGhpcy5pdGVtcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuYW1lQSA9IGEudGl0bGUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIGNvbnN0IG5hbWVCID0gYi50aXRsZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKG5hbWVBIDwgbmFtZUIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZUEgPiBuYW1lQikge1xuICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgIH0pO1xuICAgIH0gZWxzZVxuICAgICAgcmV2ZXJzZUNoZWNrID09PSBmYWxzZVxuICAgICAgICA/IHRoaXMuaXRlbXMuc29ydCgoYSwgYikgPT4gYltjYXRlZ29yeV0gLSBhW2NhdGVnb3J5XSlcbiAgICAgICAgOiB0aGlzLml0ZW1zLnNvcnQoKGEsIGIpID0+IGFbY2F0ZWdvcnldIC0gYltjYXRlZ29yeV0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbi8vIExJU1RTXG5jbGFzcyBMaXN0IGV4dGVuZHMgTWFzdGVyTGlzdCB7XG4gIGNvbnN0cnVjdG9yKHRpdGxlKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kYXRlQ3JlYXRlZCA9IERhdGUubm93KCk7XG4gICAgdGhpcy5jb2xvciA9IFwiaW5pdGlhbFwiO1xuICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgfVxuXG4gIC8vIEFkZCBUYXNrXG4gIGFkZEl0ZW0odGl0bGUsIGRlc2MsIGRhdGVEdWUpIHtcbiAgICB0aGlzLml0ZW1zLnB1c2gobmV3IFRhc2sodGl0bGUsIGRlc2MsIGRhdGVEdWUpKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIF9jbGVhckNvbXBsZXRlZFRhc2tzKCkge1xuICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1zLmZpbHRlcigoYSkgPT4gYS5jb21wbGV0ZWQgPT09IGZhbHNlKTtcbiAgfVxufVxuXG4vLyBUQVNLU1xuY2xhc3MgVGFzayB7XG4gIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjLCBkYXRlRHVlKSB7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIHRoaXMuZGVzYyA9IGRlc2M7XG4gICAgdGhpcy5kYXRlQ3JlYXRlZCA9IERhdGUubm93KCk7XG4gICAgdGhpcy5kYXRlRHVlID0gK2RhdGVEdWU7XG4gICAgdGhpcy5wcmlvcml0eSA9IGZhbHNlO1xuICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2U7XG4gICAgdGhpcy5jb21wbGV0ZWREYXRlO1xuICB9XG5cbiAgLy8gVG9nZ2xlIENvbXBsZXRlZFxuICB0b2dnbGVDb21wbGV0ZWQoKSB7XG4gICAgdGhpcy5jb21wbGV0ZWQgPT09IGZhbHNlXG4gICAgICA/ICh0aGlzLmNvbXBsZXRlZCA9IHRydWUpXG4gICAgICA6ICh0aGlzLmNvbXBsZXRlZCA9IGZhbHNlKTtcblxuICAgIGlmICh0aGlzLmNvbXBsZXRlZCA9PT0gdHJ1ZSlcbiAgICAgIHRoaXMuY29tcGxldGVkRGF0ZSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcobmF2aWdhdG9yLmxhbmd1YWdlc1swXSwge1xuICAgICAgICB5ZWFyOiBcIm51bWVyaWNcIixcbiAgICAgICAgbW9udGg6IFwic2hvcnRcIixcbiAgICAgICAgZGF5OiBcIjItZGlnaXRcIixcbiAgICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuY29tcGxldGVkID09PSBmYWxzZSkgdGhpcy5jb21wbGV0ZWREYXRlID0gXCJcIjtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gVG9nZ2xlIFByaW9yaXR5XG4gIHRvZ2dsZVByaW9yaXR5KCkge1xuICAgIHRoaXMucHJpb3JpdHkgPT09IGZhbHNlID8gKHRoaXMucHJpb3JpdHkgPSB0cnVlKSA6ICh0aGlzLnByaW9yaXR5ID0gZmFsc2UpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbmV4cG9ydCB7IE1hc3Rlckxpc3QsIExpc3QsIFRhc2sgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuIFRBQkxFIE9GIENPTlRFTlRTXG4gKiBNb2R1bGVzXG4gKiBET00gVmFyaWFibGVzXG4gKiBPbiBMb2FkIEFjdGlvbnNcbiAqIEhlYWRlciBCdXR0b25zXG4gKiBcbiovXG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogTU9EVUxFU1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbmltcG9ydCB7IE1hc3Rlckxpc3QgfSBmcm9tIFwiLi90b2RvLWxvZ2ljLmpzXCI7XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogRE9NIFZBUklBQkxFU1xuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vIC0tIEJVVFRPTlNcbi8vICMjIyMgSGVhZGVyXG5jb25zdCBidG5MaXN0c01lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxpc3RzLW1lbnVcIik7XG5jb25zdCBsaXN0c01lbnVFbmRCYXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5iYXJfX2VuZFwiKTtcbmNvbnN0IGxpc3RzTWVudU1pZEJhcjEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJhcl9fbWlkXCIpO1xuY29uc3QgbGlzdHNNZW51TWlkQmFyMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYmFyX19taWQyXCIpO1xuXG4vLyAjIyMjIFRhc2tzXG5jb25zdCBjaGVja2JveFRhc2tDb21wbGV0ZSA9XG4gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0YXNraXRlbV9fY2hlY2tib3hcIik7XG5jb25zdCBidG5UYXNrRGV0YWlscyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJidG5fX2RldGFpbHNcIik7XG5jb25zdCBjaGVja2JveFByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcbiAgXCJ0YXNraXRlbV9fcHJpb3JpdHktY2hlY2tfX2NoZWNrYm94XCJcbik7XG5jb25zdCBidG5FZGl0VGFzayA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJidG5fX3Rhc2tpdGVtX19lZGl0XCIpO1xuY29uc3QgYnRuRGVsVGFzayA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJidG5fX3Rhc2tpdGVtX19kZWxldGVcIik7XG5cbi8vICMjIyMgU2lkZWJhclxuY29uc3QgYnRuTGlzdHNPcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImJ0bl9fbGlzdGl0ZW1fX29wdGlvbnNcIik7XG5cbi8vIC0tIFNJREVCQVJcbmNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXJcIik7XG5jb25zdCBsaXN0SXRlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic2lkZWJhcl9fbGlzdGl0ZW1cIik7XG5jb25zdCBsaXN0SXRlbXNPcHRpb25zTWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXG4gIFwibGlzdGl0ZW1fX29wdGlvbnNfX21lbnVfX2NvbnRhaW5lclwiXG4pO1xuXG4vLyAtLSBNQUlOIEFQUFxuY29uc3QgdGFza0l0ZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRhc2tpdGVtXCIpO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIEhFQURFUiBCVVRUT05TXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuYnRuTGlzdHNNZW51LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIC8vIFJldmVhbCBzaWRlIGJhclxuICBzaWRlYmFyLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRkZW5cIik7XG5cbiAgLy8gVHJhbmZvcm0gY2xvc2UgYnV0dG9uXG4gIGxpc3RzTWVudUVuZEJhcnMuZm9yRWFjaCgoYmFyKSA9PiBiYXIuY2xhc3NMaXN0LnRvZ2dsZShcImJhci0tdmFuaXNoXCIpKTtcbiAgbGlzdHNNZW51TWlkQmFyMS5jbGFzc0xpc3QudG9nZ2xlKFwiYmFyX19taWQtLXJvdGF0ZVwiKTtcbiAgbGlzdHNNZW51TWlkQmFyMi5jbGFzc0xpc3QudG9nZ2xlKFwiYmFyX19taWQyLS1yb3RhdGVcIik7XG59KTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBUQVNLIEJVVFRPTlNcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyBDaGFuZ2UgY29tcGxldGVkIHRhc2sgY2hlY2tib3ggdmlzdWFsXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgY29uc3QgY2xpY2tlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIudGFza2l0ZW1fX2NoZWNrYm94XCIpO1xuICBpZiAoIWNsaWNrZWQpIHJldHVybjtcblxuICBpZiAoY2xpY2tlZC5jaGVja2VkKSB7XG4gICAgLy8gQ2hhbmdlIHRhc2sgdGV4dCBjb2xvciAvIHN0cmlrZXRocnVcbiAgICBjbGlja2VkLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImNoZWNrZWRcIik7XG5cbiAgICAvLyBDaGFuZ2UgdGFzayBkZXRhaWxzIGJ1dHRvbiBjb2xvclxuICAgIGNsaWNrZWQucGFyZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkLmNsYXNzTGlzdC5hZGQoXG4gICAgICBcImJ0bl9fZGV0YWlscy0tY29tcGxldGVkXCJcbiAgICApO1xuXG4gICAgLy8gQ2hhbmdlIHRhc2sgaXRlbSBmaWx0ZXJcbiAgICBjbGlja2VkLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiY29tcGxldGVkLS10cnVlXCIpO1xuICB9XG5cbiAgLy8gVW5kbyBDaGFuZ2UgY29tcGxldGVkIHRhc2sgdmlzdWFsXG4gIGlmICghY2xpY2tlZC5jaGVja2VkKSB7XG4gICAgY2xpY2tlZC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJjaGVja2VkXCIpO1xuICAgIGNsaWNrZWQucGFyZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkLmNsYXNzTGlzdC5yZW1vdmUoXG4gICAgICBcImJ0bl9fZGV0YWlscy0tY29tcGxldGVkXCJcbiAgICApO1xuICAgIGNsaWNrZWQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJjb21wbGV0ZWQtLXRydWVcIik7XG4gIH1cbn0pO1xuXG4vLyBWaXN1YWwgZm9yIG9wZW4gdGFzayBkZXRhaWxzIGJ1dHRvblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGNvbnN0IGNsaWNrZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiLmJ0bl9fZGV0YWlsc1wiKTtcblxuICBpZiAoIWNsaWNrZWQpIHJldHVybjtcblxuICAvLyBUb2dnbGUgdGFzayBkZXRhaWxzIG9wZW4gb24gY2xpY2tcbiAgY2xpY2tlZC5jbGFzc0xpc3QuY29udGFpbnMoXCJidG5fX2RldGFpbHMtLW9wZW5cIilcbiAgICA/IGNsaWNrZWQuY2xhc3NMaXN0LnJlbW92ZShcImJ0bl9fZGV0YWlscy0tb3BlblwiKVxuICAgIDogY2xpY2tlZC5jbGFzc0xpc3QuYWRkKFwiYnRuX19kZXRhaWxzLS1vcGVuXCIpO1xuXG4gIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJ0bl9fZGV0YWlsc1wiKTtcblxuICBmb3IgKGxldCBidXR0b24gb2YgYnV0dG9ucykge1xuICAgIC8vIENsb3NlIGFueSB0YXNrIGRldGFpbHMgb3BlbiB0byBzdG9wIG11bHRpcGxlIGF0IG9uY2VcbiAgICBpZiAoYnV0dG9uICE9PSBlLnRhcmdldCkge1xuICAgICAgYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJidG5fX2RldGFpbHMtLW9wZW5cIik7XG5cbiAgICAgIGlmIChcbiAgICAgICAgYnV0dG9uLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuLmxlbmd0aCA9PT0gMlxuICAgICAgKVxuICAgICAgICBoaWRlVGFza0RldGFpbHMoYnV0dG9uLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBpZiAoY2xpY2tlZC5jbGFzc0xpc3QuY29udGFpbnMoXCJidG5fX2RldGFpbHMtLW9wZW5cIikpXG4gICAgZXhwYW5kVGFza2l0ZW0oY2xpY2tlZC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCk7XG4gIGlmICghY2xpY2tlZC5jbGFzc0xpc3QuY29udGFpbnMoXCJidG5fX2RldGFpbHMtLW9wZW5cIikpXG4gICAgaGlkZVRhc2tEZXRhaWxzKGNsaWNrZWQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpO1xufSk7XG5cbi8vIENoYW5nZSBwcmlvcml0eSBjaGVja2JveCB2aXN1YWxcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBjb25zdCBjbGlja2VkID0gZS50YXJnZXQuY2xvc2VzdChcIi50YXNraXRlbV9fcHJpb3JpdHktY2hlY2tfX2NoZWNrYm94XCIpO1xuXG4gIGlmICghY2xpY2tlZCkgcmV0dXJuO1xuXG4gIGlmIChjbGlja2VkLmNoZWNrZWQpIHtcbiAgICAvLyBDaGFuZ2UgYm94IGJvcmRlclxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJ0YXNraXRlbV9fcHJpb3JpdHktY2hlY2tfX2NoZWNrYm94LS1yZWQtYm9yZGVyXCIpO1xuXG4gICAgLy8gQ2hhbmdlIGJhY2tncm91bmQgY29sb3Igb2YgdGFza1xuICAgIGNsaWNrZWQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXG4gICAgICBcInByaW9yaXR5LS10cnVlXCJcbiAgICApO1xuICB9XG5cbiAgaWYgKCFjbGlja2VkLmNoZWNrZWQpIHtcbiAgICAvLyBDaGFuZ2UgdGV4dFxuICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcbiAgICAgIFwidGFza2l0ZW1fX3ByaW9yaXR5LWNoZWNrLS1yZWQtdHh0XCJcbiAgICApO1xuXG4gICAgLy8gQ2hhbmdlIGJveCBib3JkZXJcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwidGFza2l0ZW1fX3ByaW9yaXR5LWNoZWNrX19jaGVja2JveC0tcmVkLWJvcmRlclwiKTtcblxuICAgIC8vIENoYW5nZSBiYWNrZ3JvdW5kIGNvbG9yIGJhY2tcbiAgICBjbGlja2VkLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFxuICAgICAgXCJwcmlvcml0eS0tdHJ1ZVwiXG4gICAgKTtcbiAgfVxufSk7XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyogU0lERUJBUiBCVVRUT05TXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8gU2lkZWJhciBsaXN0cyBvcHRpb25zXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgY29uc3QgY2xpY2tlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIuYnRuX19saXN0aXRlbV9fb3B0aW9uc1wiKTtcbiAgaWYgKCFjbGlja2VkKSByZXR1cm47XG5cbiAgY2xpY2tlZC5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGRlblwiKTtcbn0pO1xuXG5jb25zdCBleHBhbmRUYXNraXRlbSA9IGZ1bmN0aW9uIChlbCwgcHJpb3JpdHksIGRlc2MpIHtcbiAgY29uc3QgaHRtbCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwidGFza2l0ZW0tLWV4cGFuZGVkXCI+XG4gICAgICA8aHIgY2xhc3M9XCJ0YXNraXRlbV9fZGl2aWRlclwiIC8+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0YXNraXRlbV9fZGV0YWlsc19fY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YXNraXRlbV9fZGV0YWlsc19fdHh0LWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxwPlxuICAgICAgICAgICAgSSBoYXZlIHRvIGZvcmdpdmUgbXlzZWxmIGZvciB0aGUgdHJlc3Bhc3NlcyBvZiB0aGUgcGFzdCBhbmQgbW92ZVxuICAgICAgICAgICAgdG8gdGhlIHByb21pc2Ugb2YgdGhlIGZ1dHVyZSBsZXN0IEkgaGF2ZSB0cm91YmxlIGNsaW1iaW5nIGJhY2tcbiAgICAgICAgICAgIHVwIDxpPmRlIHByb2Z1bmRpczwvaT5cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YXNraXRlbV9fZGV0YWlsc19fYWN0aW9ucy1jb250YWluZXJcIj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJ0YXNraXRlbV9fcHJpb3JpdHktY2hlY2tcIj5cbiAgICAgICAgICAgIFByaW9yaXR5XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgbmFtZT1cInByaW9yaXR5X19jaGVja2JveFwiXG4gICAgICAgICAgICAgIGNsYXNzPVwidGFza2l0ZW1fX3ByaW9yaXR5LWNoZWNrX19jaGVja2JveFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRhc2tpdGVtX19lZGl0X19jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgc3JjPVwiLi9pbWFnZXMvZWRpdC5zdmdcIlxuICAgICAgICAgICAgICBoZWlnaHQ9XCIyMnB4XCJcbiAgICAgICAgICAgICAgYWx0PVwiRWRpdCB0YXNrXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJFZGl0IHRhc2tcIlxuICAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG5fX3Rhc2tpdGVtX19lZGl0XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRhc2tpdGVtX19kZWxfX2NvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBzcmM9XCIuL2ltYWdlcy90cmFzaC5zdmdcIlxuICAgICAgICAgICAgICBoZWlnaHQ9XCIyNXB4XCJcbiAgICAgICAgICAgICAgYWx0PVwiRGVsZXRlIHRhc2tcIlxuICAgICAgICAgICAgICB0aXRsZT1cIkRlbGV0ZSB0YXNrXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuX190YXNraXRlbV9fZGVsZXRlXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8IS0tIGVuZCB0YXNraXRlbV9fZGV0YWlsc19fYWN0aW9ucy1jb250YWluZXIgLS0+XG4gICAgICA8L2Rpdj5cbiAgICAgIDwhLS0gZW5kIHRhc2tpdGVtX19kZXRhaWxzX19jb250YWluZXIgLS0+XG4gICAgPC9kaXY+XG4gIGA7XG5cbiAgZWwuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGh0bWwpO1xufTtcblxuY29uc3QgaGlkZVRhc2tEZXRhaWxzID0gZnVuY3Rpb24gKGVsKSB7XG4gIGVsLnJlbW92ZUNoaWxkKGVsLmxhc3RFbGVtZW50Q2hpbGQpO1xufTtcblxuLy9URVNUSU5HIEFSRUFcbi8qKlxuICpcbiAqXG4gKlxuICpcbiAqXG4gKlxuICpcbiAqL1xuXG4vKlxuLy8gVEVTVCBTQU1QTEVTXG4vLyBDcmVhdGUgTWFzdGVyIExpc3RcbmNvbnN0IG1hc3Rlckxpc3QgPSBuZXcgTWFzdGVyTGlzdCgpO1xuXG4vLyBBZGQgTGlzdHMgdG8gTWFzdGVyIExpc3Rcbm1hc3Rlckxpc3QuYWRkSXRlbShcIlRlc3QgTGlzdFwiKTtcbm1hc3Rlckxpc3QuYWRkSXRlbShcIkEgVGVzdCBMaXN0IDJcIik7XG5tYXN0ZXJMaXN0LmFkZEl0ZW0oXCJUZXN0IExpc3QgM1wiKTtcbm1hc3Rlckxpc3QuYWRkSXRlbShcIlRlc3QgTGlzdCA0XCIpO1xuXG4vLyBBZGQgVGFza3MgdG8gTGlzdCBpbiBNYXN0ZXIgTGlzdFxubWFzdGVyTGlzdC5pdGVtc1swXS5hZGRJdGVtKFwidGVzdDFcIiwgXCJhIHRlc3QxIGRlc2NcIiwgXCI4LjEwXCIpO1xubWFzdGVyTGlzdC5pdGVtc1swXS5hZGRJdGVtKFwidGVzdDJcIiwgXCJiIHRlc3QyIGRlc2NcIiwgXCI4LjA4XCIpO1xubWFzdGVyTGlzdC5pdGVtc1swXS5hZGRJdGVtKFwidGVzdDNcIiwgXCJjIHRlc3QzIGRlc2NcIiwgXCI3LjE2XCIpO1xubWFzdGVyTGlzdC5pdGVtc1swXS5hZGRJdGVtKFwidGVzdDRcIiwgXCJkIHRlc3Q0IGRlc2NcIiwgXCIxMi4yMlwiKTtcbm1hc3Rlckxpc3QuaXRlbXNbMF0uYWRkSXRlbShcInRlc3Q1XCIsIFwiZSB0ZXN0NSBkZXNjXCIsIFwiMy4yMlwiKTtcblxuLy8gbWFzdGVyTGlzdC5pdGVtc1swXS5pdGVtc1sxXS5jb21wbGV0ZWQgPSB0cnVlO1xubWFzdGVyTGlzdC5pdGVtc1swXS5pdGVtc1sxXS5kYXRlQ3JlYXRlZCA9IDEwMDtcbi8vIG1hc3Rlckxpc3QuaXRlbXNbMF0uaXRlbXNbNF0uY29tcGxldGVkID0gdHJ1ZTtcblxuY29uc29sZS5sb2cobWFzdGVyTGlzdC5pdGVtc1swXS5pdGVtcyk7XG5cbm1hc3Rlckxpc3QuaXRlbXNbMF0uaXRlbXNbNF0udG9nZ2xlQ29tcGxldGVkKCk7XG5cbm1hc3Rlckxpc3QuaXRlbXNbMF0uaXRlbXNbMV0udG9nZ2xlUHJpb3JpdHkoKTtcbmNvbnNvbGUudGFibGUobWFzdGVyTGlzdC5pdGVtc1swXS5pdGVtcyk7XG4qL1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9