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
  hideTaskDetails,
  removePriorityVisual,
  toggleInactiveDetailsBtns,
  toggleSidebar,
  toggleSidebarListOptions,
  toggleTaskDetailsBtn,
  undoCompletedDim,
  clearForm,
  hideSidebarListOptions,
  addList,
  updateActiveListTitle,
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
const sortOptsContainer = document.querySelector(".sortby__opts__container");

// ---- Tasks

// ---- Sidebar
const btnAddList = document.querySelector(".btn__sidebar__add-list");

// ---- Form
const btnFormClose = document.querySelector(".btn__form-close");
const btnFormSubmit = document.querySelector(".btn__form-submit");

// SIDEBAR
const sidebar = document.querySelector(".sidebar");
const sidebarHeader = document.querySelector(".sidebar__header");
const sidebarAddListTitle = document.querySelector(
  ".sidebar__add-list__add-title__container"
);

// FORM
const form = document.querySelector(".form");
const formTitle = document.querySelector(".form__title");
const formTaskTitle = document.querySelector(".form__text--title");
const formDue = document.querySelector(".form__date");
const formDesc = document.querySelector(".form__text-area");
const formPriority = document.querySelector(".form__priority__checkbox");
const formPriorityContainer = document.querySelector(
  ".form__priority__container"
);

// -- MAIN APP
const logo = document.querySelector(".logo__container");
const activeListWindow = document.querySelector(".main-app");
const activeListHeader = document.querySelector(".active-list__header");
const activeListTitle = document.querySelector(".active-list__title");

/* ************************************************** */
//* DRY FUNCTIONS
/* ************************************************** */
const findItemIndex = function (clicked) {
  const taskID = +clicked.closest(".taskitem").id;
  return activeList.items.findIndex((item) => item.id === taskID);
};

const updateUI = function () {
  // Clear visible list to allow for update
  while (activeListWindow.children.length > 1) {
    activeListWindow.removeChild(activeListWindow.lastChild);
  }

  const copyList = activeList.items.slice();
  copyList.reverse();

  copyList.forEach((task) => {
    addTask(
      activeListHeader,
      task.title,
      task.dateDue,
      task.priority,
      task.id,
      task.completed
    );
  });
};

const convertDateToUTC = function (date) {
  +Date.parse(date);
};

/* ************************************************** */
//* HEADER
/* ************************************************** */
//* ---------- BUTTONS ----------
//* SIDEBAR TOGGLE
btnListsMenu.addEventListener("click", () => {
  toggleSidebar(sidebar, listsMenuEndBars, listsMenuMidBar1, listsMenuMidBar2);
});

//* ADD TASK OPEN
btnAddTask.addEventListener("click", () => {
  formTitle.textContent = "Add Task";
  btnFormSubmit.value = "Add Task";
  formPriorityContainer.classList.remove("invisible");
  form.removeAttribute("data-taskid");
  toggleHideEl(form);
  formTaskTitle.focus();
});

//* ACTIVELIST HEADER BUTTONS
activeListHeader.addEventListener("click", (e) => {
  const openSortOpts = e.target.closest(".btn__show__sort-opts");
  const sortDirFlip = e.target.closest(".btn__active-list__sort-dir");
  const clearCompleted = e.target.closest(".btn__clear-compl");

  if (!openSortOpts && !sortDirFlip && !clearCompleted) return;

  // Open sorting options menu
  if (openSortOpts) sortOptsContainer.classList.toggle("show-sort-opts");

  // Flip Sort Directions
  if (sortDirFlip) {
    activeList.items.reverse();
    updateUI();
  }

  // Clear Completed
  if (clearCompleted) {
    activeList._clearCompletedTasks();
    updateUI();
  }
});

//* SORT OPTIONS
sortOptsContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".sortby__opts__item");

  sortOptsContainer.classList.toggle("show-sort-opts");

  if (!clicked) return;
  // Sort order for Completed
  else if (clicked.dataset.sortid === "completed")
    activeList.items.sort(
      (a, b) => a[clicked.dataset.sortid] - b[clicked.dataset.sortid]
    );
  // Sort order for Date Due
  else if (clicked.dataset.sortid === "dateDue") {
    console.log(activeList.items[0].dateDue);
    console.log(Date.parse(activeList.items[0].dateDue));

    activeList.items.sort(
      (a, b) =>
        Date.parse(a[clicked.dataset.sortid]) -
        Date.parse(b[clicked.dataset.sortid])
    );
  }

  // Sort order for Date Created && Priority
  else
    activeList.items.sort(
      (a, b) => b[clicked.dataset.sortid] - a[clicked.dataset.sortid]
    );

  updateUI();
});

/* ************************************************** */
//* TASK
/* ************************************************** */
//* ---------- BUTTONS ----------
//* COMPLETED TASK CHECKBOX
activeListWindow.addEventListener("click", (e) => {
  const clicked = e.target.closest(".taskitem__checkbox");
  if (!clicked) return;

  const itemIndex = findItemIndex(clicked);

  // Data Change
  activeList.items[itemIndex].toggleCompleted();

  // Visual Change
  toggleTaskCompletedDueDate(clicked, activeList, itemIndex);

  if (clicked.checked) {
    dimCompletedTasks(clicked);
  }

  // Undo Change completed task visual
  if (!clicked.checked) undoCompletedDim(clicked);

  console.table(activeList.items);
});

//* OPEN TASK DETAILS
activeListWindow.addEventListener("click", (e) => {
  const clicked = e.target.closest(".btn__details");

  if (!clicked) return;

  const taskID = +clicked.closest(".taskitem").id;
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

//* CHANGE PRIORITY CHECKBOX
activeListWindow.addEventListener("click", (e) => {
  const clicked = e.target.closest(".taskitem__priority-check__checkbox");
  if (!clicked) return;

  const itemIndex = findItemIndex(clicked);

  // Data Change
  activeList.items[itemIndex].togglePriority();

  // Visual Change
  if (clicked.checked) addPriorityVisual(clicked);

  if (!clicked.checked) removePriorityVisual(clicked);
});

//* EDIT TASK
activeListWindow.addEventListener("click", (e) => {
  const clicked = e.target.closest(".btn__taskitem__edit");
  if (!clicked) return;

  const itemIndex = findItemIndex(clicked);

  formTitle.textContent = "Edit Task";
  btnFormSubmit.value = "Edit Task";
  formPriorityContainer.classList.add("invisible");

  // Populate form with arr info
  formTaskTitle.value = activeList.items[itemIndex].title;
  formDue.value = activeList.items[itemIndex].dateDue;
  formDesc.value = activeList.items[itemIndex].desc;

  // Add data attribute to track arr item placement
  form.setAttribute("data-taskid", activeList.items[itemIndex].id);

  toggleHideEl(form);
});

//* DELETE TASK
activeListWindow.addEventListener("click", (e) => {
  const clicked = e.target.closest("btn__taskitem__delete");
  if (!clicked) return;
});

/* ************************************************** */
//* SIDEBAR
/* ************************************************** */
//* ---------- BUTTONS ----------
//* SIDEBAR LIST OPTIONS
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
formTaskTitle.addEventListener("focus", () => {
  removeErrorOutline(formTaskTitle);
});

//* ---------- BUTTONS ----------
btnFormClose.addEventListener("click", () => {
  toggleHideEl(form);
  clearForm(formTaskTitle, formDue, formDesc, formPriority);
});

btnFormSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  // Error if Task title not designated
  if (formTaskTitle.value === "") {
    addErrorOutline(formTaskTitle);
    return;
  }

  if (!form.hasAttribute("data-taskid")) {
    formTaskTitle.blur();

    // Add task to array
    activeList.addItem(
      formTaskTitle.value,
      formDesc.value,
      formDue.value,
      formPriority.checked
    );

    // Add task to DOM
    addTask(
      activeListHeader,
      activeList.items[0].title,
      activeList.items[0].dateDue,
      activeList.items[0].priority,
      activeList.items[0].id,
      activeList.items[0].completed
    );
  }

  if (form.hasAttribute("data-taskid")) {
    formTaskTitle.blur();

    const curTaskIndex = activeList.items.findIndex(
      (item) => item.id === +form.dataset.taskid
    );
    activeList.items[curTaskIndex].title = formTaskTitle.value;
    activeList.items[curTaskIndex].desc = formDesc.value;
    activeList.items[curTaskIndex].dateDue = formDue.value;

    updateUI();
  }

  // Hide and reset form
  toggleHideEl(form);
  clearForm(formTaskTitle, formDue, formDesc, formPriority);
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
updateActiveListTitle(activeListTitle, activeList.title);

//! TESTING AREA ----------------------------

logo.addEventListener("click", () => {
  console.table(Date.parse(activeList.items[0].dateDue));
});

formTitle.addEventListener("click", () => {});

activeListHeader.addEventListener("click", function () {});

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
