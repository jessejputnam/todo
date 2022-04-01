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
for (let box of checkboxTaskComplete) {
  box.addEventListener("click", (e) => {
    if (e.target.checked === true) {
      // Change task text color / strikethru
      e.target.parentElement.classList.add("checked");
      // Change task details button color
      e.target.parentElement.lastElementChild.firstElementChild.classList.add(
        "btn__details--completed"
      );
    }

    // Undo Change completed task visual
    if (e.target.checked === false) {
      e.target.parentElement.classList.remove("checked");
      e.target.parentElement.lastElementChild.firstElementChild.classList.remove(
        "btn__details--completed"
      );
    }
  });
}

// Visual for open task details button
for (let btn of btnTaskDetails) {
  btn.addEventListener("click", (e) => {
    // Toggle task details open on click
    e.target.classList.contains("btn__details--open")
      ? e.target.classList.remove("btn__details--open")
      : e.target.classList.add("btn__details--open");

    for (let button of btnTaskDetails) {
      // Close any task details open to stop multiple at once
      if (button !== e.target) {
        button.classList.remove("btn__details--open");

        if (
          button.parentElement.parentElement.parentElement.children.length === 2
        )
          hideTaskDetails(button.parentElement.parentElement.parentElement);
      }
    }

    if (e.target.classList.contains("btn__details--open"))
      expandTaskitem(e.target.parentElement.parentElement.parentElement);
    if (!e.target.classList.contains("btn__details--open"))
      hideTaskDetails(e.target.parentElement.parentElement.parentElement);
  });
}

// Change priority checkbox visual
for (let box of checkboxPriority) {
  box.addEventListener("click", (e) => {
    if (e.target.checked === true) {
      // Change text
      e.target.parentElement.classList.add("taskitem__priority-check--red-txt");

      // Change box border
      e.target.classList.add("taskitem__priority-check__checkbox--red-border");
    }

    if (e.target.checked === false) {
      // Change text
      e.target.parentElement.classList.remove(
        "taskitem__priority-check--red-txt"
      );

      // Change box border
      e.target.classList.remove(
        "taskitem__priority-check__checkbox--red-border"
      );
    }
  });
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVc7QUFDWCxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFa0M7Ozs7Ozs7VUMzSGxDO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUM2Qzs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8vLi9zcmMvdG9kby1sb2dpYy5qcyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuLy8gTUFTVEVSIExJU1RcbmNsYXNzIE1hc3Rlckxpc3Qge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLml0ZW1zID0gW107XG4gIH1cblxuICBhZGRJdGVtKHRpdGxlKSB7XG4gICAgdGhpcy5pdGVtcy5wdXNoKG5ldyBMaXN0KHRpdGxlKSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkZWxldGVJdGVtKGluZGV4KSB7XG4gICAgdGhpcy5pdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbW92ZUl0ZW0oaW5kZXgsIGRpcikge1xuICAgIGNvbnN0IG1vdmVkSXRlbSA9IHRoaXMuaXRlbXMuc3BsaWNlKGluZGV4LCAxKVswXTtcbiAgICBjb25zb2xlLmxvZyhtb3ZlZEl0ZW0pO1xuICAgIGNvbnNvbGUubG9nKGluZGV4ICsgZGlyKTtcbiAgICB0aGlzLml0ZW1zLnNwbGljZShpbmRleCArIGRpciwgMCwgbW92ZWRJdGVtKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNvcnRJdGVtcyhjYXRlZ29yeSwgcmV2ZXJzZUNoZWNrKSB7XG4gICAgaWYgKGNhdGVnb3J5ID09PSBcImRhdGVEdWVcIiB8fCBjYXRlZ29yeSA9PT0gXCJjb21wbGV0ZWRcIikge1xuICAgICAgcmV2ZXJzZUNoZWNrID09PSBmYWxzZVxuICAgICAgICA/IHRoaXMuaXRlbXMuc29ydCgoYSwgYikgPT4gYVtjYXRlZ29yeV0gLSBiW2NhdGVnb3J5XSlcbiAgICAgICAgOiB0aGlzLml0ZW1zLnNvcnQoKGEsIGIpID0+IGJbY2F0ZWdvcnldIC0gYVtjYXRlZ29yeV0pO1xuICAgIH0gZWxzZSBpZiAoY2F0ZWdvcnkgPT09IFwidGl0bGVcIikge1xuICAgICAgcmV2ZXJzZUNoZWNrID09PSBmYWxzZVxuICAgICAgICA/IHRoaXMuaXRlbXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmFtZUEgPSBhLnRpdGxlLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBjb25zdCBuYW1lQiA9IGIudGl0bGUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChuYW1lQSA8IG5hbWVCKSB7XG4gICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuYW1lQSA+IG5hbWVCKSB7XG4gICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICB9KVxuICAgICAgICA6IHRoaXMuaXRlbXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmFtZUEgPSBhLnRpdGxlLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBjb25zdCBuYW1lQiA9IGIudGl0bGUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChuYW1lQSA8IG5hbWVCKSB7XG4gICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5hbWVBID4gbmFtZUIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICB9KTtcbiAgICB9IGVsc2VcbiAgICAgIHJldmVyc2VDaGVjayA9PT0gZmFsc2VcbiAgICAgICAgPyB0aGlzLml0ZW1zLnNvcnQoKGEsIGIpID0+IGJbY2F0ZWdvcnldIC0gYVtjYXRlZ29yeV0pXG4gICAgICAgIDogdGhpcy5pdGVtcy5zb3J0KChhLCBiKSA9PiBhW2NhdGVnb3J5XSAtIGJbY2F0ZWdvcnldKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG4vLyBMSVNUU1xuY2xhc3MgTGlzdCBleHRlbmRzIE1hc3Rlckxpc3Qge1xuICBjb25zdHJ1Y3Rvcih0aXRsZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIHRoaXMuZGF0ZUNyZWF0ZWQgPSBEYXRlLm5vdygpO1xuICAgIHRoaXMuY29sb3IgPSBcImluaXRpYWxcIjtcbiAgICB0aGlzLml0ZW1zID0gW107XG4gIH1cblxuICAvLyBBZGQgVGFza1xuICBhZGRJdGVtKHRpdGxlLCBkZXNjLCBkYXRlRHVlKSB7XG4gICAgdGhpcy5pdGVtcy5wdXNoKG5ldyBUYXNrKHRpdGxlLCBkZXNjLCBkYXRlRHVlKSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBfY2xlYXJDb21wbGV0ZWRUYXNrcygpIHtcbiAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtcy5maWx0ZXIoKGEpID0+IGEuY29tcGxldGVkID09PSBmYWxzZSk7XG4gIH1cbn1cblxuLy8gVEFTS1NcbmNsYXNzIFRhc2sge1xuICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzYywgZGF0ZUR1ZSkge1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB0aGlzLmRlc2MgPSBkZXNjO1xuICAgIHRoaXMuZGF0ZUNyZWF0ZWQgPSBEYXRlLm5vdygpO1xuICAgIHRoaXMuZGF0ZUR1ZSA9ICtkYXRlRHVlO1xuICAgIHRoaXMucHJpb3JpdHkgPSBmYWxzZTtcbiAgICB0aGlzLmNvbXBsZXRlZCA9IGZhbHNlO1xuICAgIHRoaXMuY29tcGxldGVkRGF0ZTtcbiAgfVxuXG4gIC8vIFRvZ2dsZSBDb21wbGV0ZWRcbiAgdG9nZ2xlQ29tcGxldGVkKCkge1xuICAgIHRoaXMuY29tcGxldGVkID09PSBmYWxzZVxuICAgICAgPyAodGhpcy5jb21wbGV0ZWQgPSB0cnVlKVxuICAgICAgOiAodGhpcy5jb21wbGV0ZWQgPSBmYWxzZSk7XG5cbiAgICBpZiAodGhpcy5jb21wbGV0ZWQgPT09IHRydWUpXG4gICAgICB0aGlzLmNvbXBsZXRlZERhdGUgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKG5hdmlnYXRvci5sYW5ndWFnZXNbMF0sIHtcbiAgICAgICAgeWVhcjogXCJudW1lcmljXCIsXG4gICAgICAgIG1vbnRoOiBcInNob3J0XCIsXG4gICAgICAgIGRheTogXCIyLWRpZ2l0XCIsXG4gICAgICB9KTtcblxuICAgIGlmICh0aGlzLmNvbXBsZXRlZCA9PT0gZmFsc2UpIHRoaXMuY29tcGxldGVkRGF0ZSA9IFwiXCI7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIFRvZ2dsZSBQcmlvcml0eVxuICB0b2dnbGVQcmlvcml0eSgpIHtcbiAgICB0aGlzLnByaW9yaXR5ID09PSBmYWxzZSA/ICh0aGlzLnByaW9yaXR5ID0gdHJ1ZSkgOiAodGhpcy5wcmlvcml0eSA9IGZhbHNlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5leHBvcnQgeyBNYXN0ZXJMaXN0LCBMaXN0LCBUYXNrIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiBUQUJMRSBPRiBDT05URU5UU1xuICogTW9kdWxlc1xuICogRE9NIFZhcmlhYmxlc1xuICogT24gTG9hZCBBY3Rpb25zXG4gKiBIZWFkZXIgQnV0dG9uc1xuICogXG4qL1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIE1PRFVMRVNcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5pbXBvcnQgeyBNYXN0ZXJMaXN0IH0gZnJvbSBcIi4vdG9kby1sb2dpYy5qc1wiO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIERPTSBWQVJJQUJMRVNcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyAtLSBCVVRUT05TXG4vLyAjIyMjIEhlYWRlclxuY29uc3QgYnRuTGlzdHNNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saXN0cy1tZW51XCIpO1xuY29uc3QgbGlzdHNNZW51RW5kQmFycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYmFyX19lbmRcIik7XG5jb25zdCBsaXN0c01lbnVNaWRCYXIxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5iYXJfX21pZFwiKTtcbmNvbnN0IGxpc3RzTWVudU1pZEJhcjIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJhcl9fbWlkMlwiKTtcblxuLy8gIyMjIyBUYXNrc1xuY29uc3QgY2hlY2tib3hUYXNrQ29tcGxldGUgPVxuICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidGFza2l0ZW1fX2NoZWNrYm94XCIpO1xuY29uc3QgYnRuVGFza0RldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYnRuX19kZXRhaWxzXCIpO1xuY29uc3QgY2hlY2tib3hQcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXG4gIFwidGFza2l0ZW1fX3ByaW9yaXR5LWNoZWNrX19jaGVja2JveFwiXG4pO1xuY29uc3QgYnRuRWRpdFRhc2sgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYnRuX190YXNraXRlbV9fZWRpdFwiKTtcbmNvbnN0IGJ0bkRlbFRhc2sgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYnRuX190YXNraXRlbV9fZGVsZXRlXCIpO1xuXG4vLyAjIyMjIFNpZGViYXJcbmNvbnN0IGJ0bkxpc3RzT3B0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJidG5fX2xpc3RpdGVtX19vcHRpb25zXCIpO1xuXG4vLyAtLSBTSURFQkFSXG5jb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyXCIpO1xuY29uc3QgbGlzdEl0ZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNpZGViYXJfX2xpc3RpdGVtXCIpO1xuXG4vLyAtLSBNQUlOIEFQUFxuY29uc3QgdGFza0l0ZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRhc2tpdGVtXCIpO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLy8qIEhFQURFUiBCVVRUT05TXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuYnRuTGlzdHNNZW51LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIC8vIFJldmVhbCBzaWRlIGJhclxuICBzaWRlYmFyLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRkZW5cIik7XG5cbiAgLy8gVHJhbmZvcm0gY2xvc2UgYnV0dG9uXG4gIGxpc3RzTWVudUVuZEJhcnMuZm9yRWFjaCgoYmFyKSA9PiBiYXIuY2xhc3NMaXN0LnRvZ2dsZShcImJhci0tdmFuaXNoXCIpKTtcbiAgbGlzdHNNZW51TWlkQmFyMS5jbGFzc0xpc3QudG9nZ2xlKFwiYmFyX19taWQtLXJvdGF0ZVwiKTtcbiAgbGlzdHNNZW51TWlkQmFyMi5jbGFzc0xpc3QudG9nZ2xlKFwiYmFyX19taWQyLS1yb3RhdGVcIik7XG59KTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8vKiBUQVNLIEJVVFRPTlNcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vLyBDaGFuZ2UgY29tcGxldGVkIHRhc2sgY2hlY2tib3ggdmlzdWFsXG5mb3IgKGxldCBib3ggb2YgY2hlY2tib3hUYXNrQ29tcGxldGUpIHtcbiAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5jaGVja2VkID09PSB0cnVlKSB7XG4gICAgICAvLyBDaGFuZ2UgdGFzayB0ZXh0IGNvbG9yIC8gc3RyaWtldGhydVxuICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiY2hlY2tlZFwiKTtcbiAgICAgIC8vIENoYW5nZSB0YXNrIGRldGFpbHMgYnV0dG9uIGNvbG9yXG4gICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQuY2xhc3NMaXN0LmFkZChcbiAgICAgICAgXCJidG5fX2RldGFpbHMtLWNvbXBsZXRlZFwiXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFVuZG8gQ2hhbmdlIGNvbXBsZXRlZCB0YXNrIHZpc3VhbFxuICAgIGlmIChlLnRhcmdldC5jaGVja2VkID09PSBmYWxzZSkge1xuICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiY2hlY2tlZFwiKTtcbiAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQubGFzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5jbGFzc0xpc3QucmVtb3ZlKFxuICAgICAgICBcImJ0bl9fZGV0YWlscy0tY29tcGxldGVkXCJcbiAgICAgICk7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gVmlzdWFsIGZvciBvcGVuIHRhc2sgZGV0YWlscyBidXR0b25cbmZvciAobGV0IGJ0biBvZiBidG5UYXNrRGV0YWlscykge1xuICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgLy8gVG9nZ2xlIHRhc2sgZGV0YWlscyBvcGVuIG9uIGNsaWNrXG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYnRuX19kZXRhaWxzLS1vcGVuXCIpXG4gICAgICA/IGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJidG5fX2RldGFpbHMtLW9wZW5cIilcbiAgICAgIDogZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImJ0bl9fZGV0YWlscy0tb3BlblwiKTtcblxuICAgIGZvciAobGV0IGJ1dHRvbiBvZiBidG5UYXNrRGV0YWlscykge1xuICAgICAgLy8gQ2xvc2UgYW55IHRhc2sgZGV0YWlscyBvcGVuIHRvIHN0b3AgbXVsdGlwbGUgYXQgb25jZVxuICAgICAgaWYgKGJ1dHRvbiAhPT0gZS50YXJnZXQpIHtcbiAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJidG5fX2RldGFpbHMtLW9wZW5cIik7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIGJ1dHRvbi5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlbi5sZW5ndGggPT09IDJcbiAgICAgICAgKVxuICAgICAgICAgIGhpZGVUYXNrRGV0YWlscyhidXR0b24ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJidG5fX2RldGFpbHMtLW9wZW5cIikpXG4gICAgICBleHBhbmRUYXNraXRlbShlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCk7XG4gICAgaWYgKCFlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJidG5fX2RldGFpbHMtLW9wZW5cIikpXG4gICAgICBoaWRlVGFza0RldGFpbHMoZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpO1xuICB9KTtcbn1cblxuLy8gQ2hhbmdlIHByaW9yaXR5IGNoZWNrYm94IHZpc3VhbFxuZm9yIChsZXQgYm94IG9mIGNoZWNrYm94UHJpb3JpdHkpIHtcbiAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5jaGVja2VkID09PSB0cnVlKSB7XG4gICAgICAvLyBDaGFuZ2UgdGV4dFxuICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidGFza2l0ZW1fX3ByaW9yaXR5LWNoZWNrLS1yZWQtdHh0XCIpO1xuXG4gICAgICAvLyBDaGFuZ2UgYm94IGJvcmRlclxuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcInRhc2tpdGVtX19wcmlvcml0eS1jaGVja19fY2hlY2tib3gtLXJlZC1ib3JkZXJcIik7XG4gICAgfVxuXG4gICAgaWYgKGUudGFyZ2V0LmNoZWNrZWQgPT09IGZhbHNlKSB7XG4gICAgICAvLyBDaGFuZ2UgdGV4dFxuICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFxuICAgICAgICBcInRhc2tpdGVtX19wcmlvcml0eS1jaGVjay0tcmVkLXR4dFwiXG4gICAgICApO1xuXG4gICAgICAvLyBDaGFuZ2UgYm94IGJvcmRlclxuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcbiAgICAgICAgXCJ0YXNraXRlbV9fcHJpb3JpdHktY2hlY2tfX2NoZWNrYm94LS1yZWQtYm9yZGVyXCJcbiAgICAgICk7XG4gICAgfVxuICB9KTtcbn1cblxuY29uc3QgZXhwYW5kVGFza2l0ZW0gPSBmdW5jdGlvbiAoZWwsIHByaW9yaXR5LCBkZXNjKSB7XG4gIGNvbnN0IGh0bWwgPSBgXG4gICAgPGRpdiBjbGFzcz1cInRhc2tpdGVtLS1leHBhbmRlZFwiPlxuICAgICAgPGhyIGNsYXNzPVwidGFza2l0ZW1fX2RpdmlkZXJcIiAvPlxuXG4gICAgICA8ZGl2IGNsYXNzPVwidGFza2l0ZW1fX2RldGFpbHNfX2NvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFza2l0ZW1fX2RldGFpbHNfX3R4dC1jb250YWluZXJcIj5cbiAgICAgICAgICA8cD5cbiAgICAgICAgICAgIEkgaGF2ZSB0byBmb3JnaXZlIG15c2VsZiBmb3IgdGhlIHRyZXNwYXNzZXMgb2YgdGhlIHBhc3QgYW5kIG1vdmVcbiAgICAgICAgICAgIHRvIHRoZSBwcm9taXNlIG9mIHRoZSBmdXR1cmUgbGVzdCBJIGhhdmUgdHJvdWJsZSBjbGltYmluZyBiYWNrXG4gICAgICAgICAgICB1cCA8aT5kZSBwcm9mdW5kaXM8L2k+XG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFza2l0ZW1fX2RldGFpbHNfX2FjdGlvbnMtY29udGFpbmVyXCI+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzPVwidGFza2l0ZW1fX3ByaW9yaXR5LWNoZWNrXCI+XG4gICAgICAgICAgICBQcmlvcml0eVxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgIG5hbWU9XCJwcmlvcml0eV9fY2hlY2tib3hcIlxuICAgICAgICAgICAgICBjbGFzcz1cInRhc2tpdGVtX19wcmlvcml0eS1jaGVja19fY2hlY2tib3hcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YXNraXRlbV9fZWRpdF9fY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIHNyYz1cIi4vaW1hZ2VzL2VkaXQuc3ZnXCJcbiAgICAgICAgICAgICAgaGVpZ2h0PVwiMjJweFwiXG4gICAgICAgICAgICAgIGFsdD1cIkVkaXQgdGFza1wiXG4gICAgICAgICAgICAgIHRpdGxlPVwiRWRpdCB0YXNrXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuX190YXNraXRlbV9fZWRpdFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YXNraXRlbV9fZGVsX19jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgc3JjPVwiLi9pbWFnZXMvdHJhc2guc3ZnXCJcbiAgICAgICAgICAgICAgaGVpZ2h0PVwiMjVweFwiXG4gICAgICAgICAgICAgIGFsdD1cIkRlbGV0ZSB0YXNrXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJEZWxldGUgdGFza1wiXG4gICAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bl9fdGFza2l0ZW1fX2RlbGV0ZVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPCEtLSBlbmQgdGFza2l0ZW1fX2RldGFpbHNfX2FjdGlvbnMtY29udGFpbmVyIC0tPlxuICAgICAgPC9kaXY+XG4gICAgICA8IS0tIGVuZCB0YXNraXRlbV9fZGV0YWlsc19fY29udGFpbmVyIC0tPlxuICAgIDwvZGl2PlxuICBgO1xuXG4gIGVsLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBodG1sKTtcbn07XG5cbmNvbnN0IGhpZGVUYXNrRGV0YWlscyA9IGZ1bmN0aW9uIChlbCkge1xuICBlbC5yZW1vdmVDaGlsZChlbC5sYXN0RWxlbWVudENoaWxkKTtcbn07XG5cbi8vVEVTVElORyBBUkVBXG4vKipcbiAqXG4gKlxuICpcbiAqXG4gKlxuICpcbiAqXG4gKi9cblxuLypcbi8vIFRFU1QgU0FNUExFU1xuLy8gQ3JlYXRlIE1hc3RlciBMaXN0XG5jb25zdCBtYXN0ZXJMaXN0ID0gbmV3IE1hc3Rlckxpc3QoKTtcblxuLy8gQWRkIExpc3RzIHRvIE1hc3RlciBMaXN0XG5tYXN0ZXJMaXN0LmFkZEl0ZW0oXCJUZXN0IExpc3RcIik7XG5tYXN0ZXJMaXN0LmFkZEl0ZW0oXCJBIFRlc3QgTGlzdCAyXCIpO1xubWFzdGVyTGlzdC5hZGRJdGVtKFwiVGVzdCBMaXN0IDNcIik7XG5tYXN0ZXJMaXN0LmFkZEl0ZW0oXCJUZXN0IExpc3QgNFwiKTtcblxuLy8gQWRkIFRhc2tzIHRvIExpc3QgaW4gTWFzdGVyIExpc3Rcbm1hc3Rlckxpc3QuaXRlbXNbMF0uYWRkSXRlbShcInRlc3QxXCIsIFwiYSB0ZXN0MSBkZXNjXCIsIFwiOC4xMFwiKTtcbm1hc3Rlckxpc3QuaXRlbXNbMF0uYWRkSXRlbShcInRlc3QyXCIsIFwiYiB0ZXN0MiBkZXNjXCIsIFwiOC4wOFwiKTtcbm1hc3Rlckxpc3QuaXRlbXNbMF0uYWRkSXRlbShcInRlc3QzXCIsIFwiYyB0ZXN0MyBkZXNjXCIsIFwiNy4xNlwiKTtcbm1hc3Rlckxpc3QuaXRlbXNbMF0uYWRkSXRlbShcInRlc3Q0XCIsIFwiZCB0ZXN0NCBkZXNjXCIsIFwiMTIuMjJcIik7XG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLmFkZEl0ZW0oXCJ0ZXN0NVwiLCBcImUgdGVzdDUgZGVzY1wiLCBcIjMuMjJcIik7XG5cbi8vIG1hc3Rlckxpc3QuaXRlbXNbMF0uaXRlbXNbMV0uY29tcGxldGVkID0gdHJ1ZTtcbm1hc3Rlckxpc3QuaXRlbXNbMF0uaXRlbXNbMV0uZGF0ZUNyZWF0ZWQgPSAxMDA7XG4vLyBtYXN0ZXJMaXN0Lml0ZW1zWzBdLml0ZW1zWzRdLmNvbXBsZXRlZCA9IHRydWU7XG5cbmNvbnNvbGUubG9nKG1hc3Rlckxpc3QuaXRlbXNbMF0uaXRlbXMpO1xuXG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLml0ZW1zWzRdLnRvZ2dsZUNvbXBsZXRlZCgpO1xuXG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLml0ZW1zWzFdLnRvZ2dsZVByaW9yaXR5KCk7XG5jb25zb2xlLnRhYmxlKG1hc3Rlckxpc3QuaXRlbXNbMF0uaXRlbXMpO1xuKi9cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==