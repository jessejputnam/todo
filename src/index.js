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
import { App } from "./todo-logic.js";
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
  updateActiveListTitle,
  toggleSidebarNewListTitle,
  removeErrorOutline,
  addErrorOutline,
  toggleHideEl,
  toggleButtonSpin,
  addTask,
  toggleTaskCompletedDueDate,
  hideTaskDetails
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

// ---- Sidebar
const btnAddList = document.querySelector(".btn__sidebar__add-list");
const btnAddListTitle = document.querySelector("#add-list__title");

// ---- Form
const btnFormClose = document.querySelector(".btn__form-close");
const btnFormSubmit = document.querySelector(".btn__form-submit");

// SIDEBAR
const sidebar = document.querySelector(".sidebar");
const sidebarHeader = document.querySelector(".sidebar__header");
const sidebarTitle = document.querySelector(".sidebar__title");
const sidebarAddListTitleContainer = document.querySelector(
  ".sidebar__add-list__add-title__container"
);
const sidebarAddListTitleInput = document.querySelector(
  ".sidebar__add-list__add-title"
);

// HEADER
const sortOptsContainer = document.querySelector(".sortby__opts__container");

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

// MAIN APP
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

const findListIndex = function (clickedBtn) {
  return masterList.items.findIndex(
    (list) => list.id === +clickedBtn.closest(".sidebar__listitem").id
  );
};

const closeAllOpenModals = function (e) {
  if (
    e.target !== btnListsMenu &&
    !e.target.classList.contains("lists-menu__bar")
  ) {
    sidebar.classList.add("hidden");
    listsMenuEndBars.forEach((bar) => bar.classList.remove("bar--vanish"));
    listsMenuMidBar1.classList.remove("bar__mid--rotate");
    listsMenuMidBar2.classList.remove("bar__mid2--rotate");
  }

  if (!e.target.classList.contains("img__add-task"))
    form.classList.add("hidden");

  if (!e.target.classList.contains("btn__show__sort-opts"))
    sortOptsContainer.classList.remove("show-sort-opts");
};

const updateActiveListUI = function () {
  // Clear visible list to allow for update
  while (activeListWindow.children.length > 1) {
    activeListWindow.removeChild(activeListWindow.lastChild);
  }

  // Shallow copy to reverse so items remain in correct order visually
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

const updateSidebarUI = function () {
  // Clear visible list to allow for update
  while (sidebar.children.length > 1) {
    sidebar.removeChild(sidebar.lastChild);
  }

  const copyList = masterList.items.slice();
  copyList.reverse();

  copyList.forEach((list) => {
    const incompleteItems = list.items.filter(
      (item) => item.completed === false
    );

    addList(
      sidebarHeader,
      list.title,
      incompleteItems.length,
      list.id,
      activeList.id
    );
  });
};

/* ************************************************** */
//* HEADER
/* ************************************************** */
//* ---------- BUTTONS ----------
// SIDEBAR TOGGLE
btnListsMenu.addEventListener("click", (e) => {
  toggleSidebar(sidebar, listsMenuEndBars, listsMenuMidBar1, listsMenuMidBar2);

  closeAllOpenModals(e);

  // Update sidebar UI if opening sidebar
  if (btnListsMenu.firstElementChild.classList.contains("bar--vanish")) {
    updateSidebarUI();
  }
});

// ADD TASK OPEN
btnAddTask.addEventListener("click", (e) => {
  formTitle.textContent = "Add Task";
  btnFormSubmit.value = "Add Task";
  formPriorityContainer.classList.remove("invisible");
  form.removeAttribute("data-taskid");
  closeAllOpenModals(e);
  toggleHideEl(form);
  formTaskTitle.focus();
});

// ACTIVELIST HEADER BUTTONS
activeListHeader.addEventListener("click", (e) => {
  const openSortOpts = e.target.closest(".btn__show__sort-opts");
  const sortDirFlip = e.target.closest(".btn__active-list__sort-dir");
  const clearCompleted = e.target.closest(".btn__clear-compl");

  if (!openSortOpts && !sortDirFlip && !clearCompleted) return;

  // Open sorting options menu
  if (openSortOpts) sortOptsContainer.classList.toggle("show-sort-opts");

  // Flip Sort Directions
  if (sortDirFlip) {
    // Data Change
    activeList.items.reverse();
    masterList._setLocalStorage();

    // Visual Change
    updateActiveListUI();
  }

  // Clear Completed
  if (clearCompleted) {
    // Data Change
    activeList._clearCompletedTasks();
    masterList._setLocalStorage();

    // Visual Change
    updateActiveListUI();
  }
});

// SORT OPTIONS
sortOptsContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".sortby__opts__item");

  sortOptsContainer.classList.toggle("show-sort-opts");

  if (!clicked) return;

  // Data Change
  activeList.sortItems(clicked.dataset.sortid);
  masterList._setLocalStorage();

  // Visual Update
  updateActiveListUI();
});

/* ************************************************** */
//* TASK
/* ************************************************** */
//* ---------- BUTTONS ----------
// COMPLETED TASK CHECKBOX
activeListWindow.addEventListener("click", (e) => {
  const clicked = e.target.closest(".taskitem__checkbox");
  if (!clicked) return;

  const itemIndex = findItemIndex(clicked);

  // Data Change
  activeList.items[itemIndex].toggleCompleted();
  masterList._setLocalStorage();

  // Visual Change
  toggleTaskCompletedDueDate(clicked, activeList, itemIndex);
  if (clicked.checked) {
    dimCompletedTasks(clicked);
  }
  if (!clicked.checked) undoCompletedDim(clicked);
});

// OPEN TASK DETAILS
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

// CHANGE PRIORITY CHECKBOX
activeListWindow.addEventListener("click", (e) => {
  const clicked = e.target.closest(".taskitem__priority-check__checkbox");
  if (!clicked) return;

  const itemIndex = findItemIndex(clicked);

  // Data Change
  activeList.items[itemIndex].togglePriority();
  masterList._setLocalStorage();

  // Visual Change
  if (clicked.checked) addPriorityVisual(clicked);
  if (!clicked.checked) removePriorityVisual(clicked);
});

// EDIT TASK
activeListWindow.addEventListener("click", (e) => {
  const clicked = e.target.closest(".btn__taskitem__edit");
  if (!clicked) return;

  const itemIndex = findItemIndex(clicked);

  // Visual change to reflect edit rather than add
  formTitle.textContent = "Edit Task";
  btnFormSubmit.value = "Edit Task";
  formPriorityContainer.classList.add("invisible");

  // Populate form with item info
  formTaskTitle.value = activeList.items[itemIndex].title;
  formDue.value = activeList.items[itemIndex].dateDue;
  formDesc.value = activeList.items[itemIndex].desc;

  // Add data attribute to track arr item placement
  form.setAttribute("data-taskid", activeList.items[itemIndex].id);

  toggleHideEl(form);
});

// DELETE TASK
activeListWindow.addEventListener("click", (e) => {
  const clicked = e.target.closest(".btn__taskitem__delete");
  if (!clicked) return;

  const itemIndex = findItemIndex(clicked);

  // Data Change
  activeList.items.splice(itemIndex, 1);
  masterList._setLocalStorage();

  // Visual Change
  updateActiveListUI();
});

/* ************************************************** */
//* SIDEBAR
/* ************************************************** */
// Remove ?error outline on TITLE when input selected
sidebarAddListTitleInput.addEventListener("focus", () => {
  sidebarAddListTitleInput.classList.remove("red-outline");
});

// ACTIVE LIST SELECTION
sidebar.addEventListener("click", (e) => {
  const clicked = e.target.closest(".listitem__title");
  if (!clicked) return;

  const lists = sidebar.querySelectorAll(".sidebar__listitem");
  lists.forEach((list) => {
    list.classList.remove("active-list");
  });

  const selectedListIndex = masterList.items.findIndex(
    (item) => item.id === +clicked.parentElement.id
  );
  activeList = masterList.items[selectedListIndex];

  updateActiveListTitle(activeListTitle, activeList.title);
  updateActiveListUI();

  clicked.parentElement.classList.add("active-list");
});

//* ---------- BUTTONS ----------
// SIDEBAR OPEN ADD LIST INPUT
btnAddList.addEventListener("click", (e) => {
  toggleSidebarNewListTitle(sidebarAddListTitleContainer);
  toggleButtonSpin(btnAddList);
  sidebarAddListTitleInput.value = "";
  sidebarAddListTitleInput.focus();
});

// ADD NEW LIST
btnAddListTitle.addEventListener("click", () => {
  if (sidebarAddListTitleInput.value === "") {
    sidebarAddListTitleInput.classList.add("red-outline");
    return;
  }

  // Change Data
  masterList.addItem(sidebarAddListTitleInput.value);
  masterList._setLocalStorage();

  // Change Visual
  addList(
    sidebarHeader,
    masterList.items[0].title,
    masterList.items[0].items.length,
    masterList.items[0].id
  );

  // Remove active list on previous
  const lists = sidebar.querySelectorAll(".sidebar__listitem");
  lists.forEach((list) => {
    list.classList.remove("active-list");
  });

  // Change active list to newly created list
  activeList = masterList.items[0];

  // Clear title input and hide
  sidebarAddListTitleInput.value = "";
  toggleSidebarNewListTitle(sidebarAddListTitleContainer);
  toggleButtonSpin(btnAddList);

  updateSidebarUI();
  updateActiveListUI();
  updateActiveListTitle(activeListTitle, activeList.title);
});

//* SIDEBAR LIST OPTIONS
// OPEN LIST OPTIONS
sidebar.addEventListener("click", (e) => {
  const clicked = e.target.closest(".btn__listitem__options");
  if (!clicked) return;

  if (!clicked.parentElement.lastElementChild.classList.contains("hidden")) {
    toggleSidebarListOptions(clicked);
    return;
  }

  const listOpts = document.querySelectorAll(
    ".listitem__options__menu__container"
  );

  listOpts.forEach(function (listOpt) {
    listOpt.classList.add("hidden");
  });

  toggleSidebarListOptions(clicked);
});

// LIST OPTIONS
sidebar.addEventListener("click", (e) => {
  const clickedTrash = e.target.closest(".btn__listitem--del");
  const clickedArrowUp = e.target.closest(".btn__listitem--up");
  const clickedArrowDown = e.target.closest(".btn__listitem--down");

  if (!clickedTrash && !clickedArrowUp && !clickedArrowDown) return;

  // Close menu if any clicked
  if (clickedTrash || clickedArrowUp || clickedArrowDown) {
    const clicked = clickedTrash || clickedArrowUp || clickedArrowDown;
    hideSidebarListOptions(clicked);
  }

  // Delete selected list
  if (clickedTrash) {
    const itemInArrIndex = masterList.items.findIndex(
      (list) => list.id === +clickedTrash.closest(".sidebar__listitem").id
    );

    if (masterList.items.length === 1) return;
    if (masterList.items[itemInArrIndex].id === activeList.id) {
      activeList = masterList.items[1];
    }

    // Data Change
    masterList.deleteItem(itemInArrIndex);
    masterList._setLocalStorage();

    // Visual Change
    updateSidebarUI();
    updateActiveListUI();
    updateActiveListTitle(activeListTitle, activeList.title);
  }

  // Move selected list up
  if (clickedArrowUp) {
    const itemInArrIndex = findListIndex(clickedArrowUp);

    // Data Change
    masterList.moveItem(itemInArrIndex, -1);
    masterList._setLocalStorage();

    // Visual Change
    updateSidebarUI();
  }

  // Move selected list down
  if (clickedArrowDown) {
    const itemInArrIndex = findListIndex(clickedArrowDown);

    // Data Change
    masterList.moveItem(itemInArrIndex, 1);
    masterList._setLocalStorage();

    // Visual Change
    updateSidebarUI();
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

    // Data Change -- Add task to array
    activeList.addItem(
      formTaskTitle.value,
      formDesc.value,
      formDue.value,
      formPriority.checked
    );
    masterList._setLocalStorage();

    // Visual Change -- Add task to DOM
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

    // Data Change
    activeList.items[curTaskIndex].title = formTaskTitle.value;
    activeList.items[curTaskIndex].desc = formDesc.value;
    activeList.items[curTaskIndex].dateDue = formDue.value;
    masterList._setLocalStorage();

    // Visual Change
    updateActiveListUI();
  }

  // Hide and reset form
  toggleHideEl(form);
  clearForm(formTaskTitle, formDue, formDesc, formPriority);
});

/* ************************************************** */
//* APP LOGIC
/* ************************************************** */
// Initialize Master List
/* Initializes the master list that will contain all project lists */
const masterList = new App();
let activeList;

// Load previous session data and display
masterList._getLocalStorage(masterList);

// Load new list if no previous data
if (masterList.prevDataCheck === false) {
  // Add Default List set to Main List
  masterList.addItem("Main List");

  // Add Default list to sidebar
  addList(
    sidebarHeader,
    masterList.items[0].title,
    masterList.items[0].items.length,
    masterList.items[0].id
  );
}

// Initialize the Active List
activeList = masterList.items[0];

// Update activeList visual
updateActiveListTitle(activeListTitle, activeList.title);
updateActiveListUI();
updateSidebarUI();
