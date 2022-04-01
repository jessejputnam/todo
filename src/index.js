"use strict";

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
import { MasterList } from "./todo-logic.js";

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
