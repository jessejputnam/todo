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
  clearForm,
  hideSidebarListOptions,
  addList,
  updateActiveListUI,
  toggleSidebarNewListTitle,
  removeErrorOutline,
  addErrorOutline,
  toggleHideEl,
  toggleButtonSpin,
  daysLeft, // Delete when done testing
  addTask,
  toggleTaskCompletedDueDate,
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
  toggleSidebar(sidebar, listsMenuEndBars, listsMenuMidBar1, listsMenuMidBar2);
});

// ADD TASK OPEN
btnAddTask.addEventListener("click", () => {
  toggleHideEl(form);
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
  toggleTaskCompletedDueDate(clicked, activeList, itemIndex);

  if (clicked.checked) {
    dimCompletedTasks(clicked);
  }

  // Undo Change completed task visual
  if (!clicked.checked) undoCompletedDim(clicked);
});

// Visual for open task details button
activeListWindow.addEventListener("click", (e) => {
  const clicked = e.target.closest(".btn__details");

  if (!clicked) return;

  const taskID = +clicked.parentElement.parentElement.parentElement.id;
  const taskInArr = activeList.items.filter((task) => task.id === taskID);

  // Toggle task details open on click
  toggleTaskDetailsBtn(clicked);
  toggleInactiveDetailsBtns(e);
  expandSelectedDetails(
    clicked,
    taskInArr[0].priority,
    taskInArr[0].desc,
    taskInArr[0].completed,
    taskInArr[0].dateDue
  );
  hideNonSelectedDetails(clicked);
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
  if (clicked.checked) addPriorityVisual(clicked);

  if (!clicked.checked) removePriorityVisual(clicked);
});

/* ************************************************** */
//* SIDEBAR
/* ************************************************** */
//? ---------- BUTTONS ----------
// Sidebar lists options
btnAddList.addEventListener("click", (e) => {
  toggleSidebarNewListTitle(sidebarAddListTitle);
  toggleButtonSpin(btnAddList);
});

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
//* FORM
/* ************************************************** */
formTitle.addEventListener("focus", () => {
  removeErrorOutline(formTitle);
});

//? ---------- BUTTONS ----------
btnFormClose.addEventListener("click", () => {
  toggleHideEl(form);
  clearForm(formTitle, formDue, formDesc, formPriority);
});

btnFormSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  // Error if Task title not designated
  if (formTitle.value === "") {
    addErrorOutline(formTitle);
    return;
  }

  // Add task to array
  activeList.addItem(
    formTitle.value,
    formDesc.value,
    formDue.value,
    formPriority.checked
  );

  addTask(
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
  toggleHideEl(form);
  clearForm(formTitle, formDue, formDesc, formPriority);
});

/* ************************************************** */
//* APP LOGIC
/* ************************************************** */
// Initialize Master List
const masterList = new MasterList();

// Add Default List to Master List
masterList.addItem("Main List");

// Add Default list to sidebar
addList(sidebarHeader, masterList.items[0].title, 0);

// Update activeList visual
let activeList = masterList.items[0];
updateActiveListUI(activeListTitle, activeList.title);

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
