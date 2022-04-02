"use strict";

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
import { MasterList } from "./todo-logic.js";
import {
  addPriorityVisual,
  dimCompletedTasks,
  expandSelectedDetails,
  hideNonSelectedDetails,
  removePriorityVisual,
  toggleInactiveDetailsBtns,
  toggleSidebar,
  toggleSidebarListOptions,
  toggleTaskDetailsBtn,
  undoCompletedDim,
  openAddTask,
  clearForm,
  hideSidebarListOptions,
} from "./visual.js";

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
  toggleSidebar(sidebar, listsMenuEndBars, listsMenuMidBar1, listsMenuMidBar2);
});

// ADD TASK OPEN
btnAddTask.addEventListener("click", () => {
  openAddTask(form);
});

/* ************************************************** */
//* TASK BUTTONS
/* ************************************************** */
// Change completed task checkbox visual
activeListWindow.addEventListener("click", (e) => {
  const clicked = e.target.closest(".taskitem__checkbox");
  if (!clicked) return;

  if (clicked.checked) {
    dimCompletedTasks(clicked);
  }

  // Undo Change completed task visual
  if (!clicked.checked) {
    undoCompletedDim(clicked);
  }
});

// Visual for open task details button
activeListWindow.addEventListener("click", (e) => {
  const clicked = e.target.closest(".btn__details");

  if (!clicked) return;

  // Toggle task details open on click
  toggleTaskDetailsBtn(clicked);
  toggleInactiveDetailsBtns(e);
  expandSelectedDetails(clicked);
  hideNonSelectedDetails(clicked);
});

// Change priority checkbox visual
activeListWindow.addEventListener("click", (e) => {
  const clicked = e.target.closest(".taskitem__priority-check__checkbox");

  if (!clicked) return;

  if (clicked.checked) {
    addPriorityVisual(e, clicked);
  }

  if (!clicked.checked) {
    removePriorityVisual(e, clicked);
  }
});

/* ************************************************** */
//* SIDEBAR BUTTONS
/* ************************************************** */
// Sidebar lists options
sidebar.addEventListener("click", (e) => {
  const clicked = e.target.closest(".btn__listitem__options");
  if (!clicked) return;

  toggleSidebarListOptions(clicked);
});

sidebar.addEventListener("click", (e) => {
  const clickedTrash = e.target.closest(".btn__listitem--del");
  const clickedArrowUp = e.target.closest(".btn__listitem--up");
  const clickedArrowDown = e.target.closest(".btn__listitem--down");

  if (!clickedTrash && !clickedArrowUp && !clickedArrowDown) return;

  if (clickedTrash || clickedArrowUp || clickedArrowDown) {
    const clicked = clickedTrash || clickedArrowUp || clickedArrowDown;
    hideSidebarListOptions(clicked);
  }
});

/* ************************************************** */
//* FORM BUTTONS
/* ************************************************** */
btnFormClose.addEventListener("click", () => {
  clearForm(form, formTask, formDue, formDesc, formPriority);
});

btnFormSubmit.addEventListener("click", () => {
  clearForm(form, formTask, formDue, formDesc, formPriority);
});

/* ************************************************** */
//* APP LOGIC
/* ************************************************** */
const masterList = new MasterList();

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
