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
// -- Buttons
// ---- Header
const btnListsMenu = document.querySelector(".lists-menu");
const listsMenuEndBars = document.querySelectorAll(".bar__end");
const listsMenuMidBar1 = document.querySelector(".bar__mid");
const listsMenuMidBar2 = document.querySelector(".bar__mid2");

// ---- Tasks
const checkboxTaskComplete =
  document.getElementsByClassName("taskitem__checkbox");
const btnTaskDetails = document.getElementsByClassName("btn__details");
const checkboxPriority = document.getElementsByClassName(
  "taskitem__priority-check__checkbox"
);

// -- Windows
const sidebar = document.querySelector(".sidebar");

// --

/* ************************************************** */
//* ON LOAD ACTIONS
/* ************************************************** */

/* Stops sidebar from popping briefly in view on page load */

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
    e.target.classList.contains("btn__details--open")
      ? e.target.classList.remove("btn__details--open")
      : e.target.classList.add("btn__details--open");

    for (let button of btnTaskDetails) {
      if (button !== e.target) button.classList.remove("btn__details--open");
    }
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
