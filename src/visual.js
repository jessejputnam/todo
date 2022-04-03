"use strict";

import { differenceInCalendarDays, compareAsc, parseISO } from "date-fns";

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
const clearForm = function (formTitle, formDue, formDesc, formPriority) {
  removeErrorOutline(formTitle);

  formTitle.value = "";
  formDue.value = "";
  formDesc.value = "";
  formPriority.checked = false;
};

const toggleHideEl = (el) => el.classList.toggle("hidden");

const removeErrorOutline = (el) => el.classList.remove("red-outline");
const addErrorOutline = (el) => el.classList.add("red-outline");

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
  toggleHideEl(sidebar);

  // Tranform close button
  listsMenuEndBars.forEach((bar) => bar.classList.toggle("bar--vanish"));
  listsMenuMidBar1.classList.toggle("bar__mid--rotate");
  listsMenuMidBar2.classList.toggle("bar__mid2--rotate");
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
    expandTaskitem(
      clicked.parentElement.parentElement.parentElement,
      priority,
      desc
    );
};

const hideNonSelectedDetails = function (clicked) {
  if (!clicked.classList.contains("btn__details--open"))
    hideTaskDetails(clicked.parentElement.parentElement.parentElement);
};

// Change priority checkbox visual
const addPriorityVisual = function (e, clicked) {
  // Change box border
  e.target.classList.add("red-border");

  // Change background color of task
  clicked.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add(
    "priority--true"
  );
};

const removePriorityVisual = function (e, clicked) {
  // Change box border
  e.target.classList.remove("red-border");

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
  toggleHideEl(clicked.parentElement.lastElementChild);
  // clicked.parentElement.lastElementChild.classList.toggle("hidden");
};

const hideSidebarListOptions = function (clicked) {
  toggleHideEl(clicked.parentElement);
  // clicked.parentElement.classList.add("hidden");
};

const toggleSidebarNewListTitle = function (el) {
  el.classList.toggle("add__list-title--visible");
};

const toggleButtonSpin = function (el) {
  el.classList.toggle("spin-45deg");
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
          <p>${desc}</p>
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

const addList = function (el, title, numDue) {
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

const daysLeft = function (date) {
  const today = new Date();
  const dateDue = Date.parse(date);

  if (compareAsc(today, dateDue) === 1) {
    return "OVERDUE!";
  } else {
    const diff = differenceInCalendarDays(dateDue, today) + 1;

    if (diff === 0) {
      return "Today";
    }
    if (diff === 1) {
      return "Tomorrow";
    }

    return `Due in ${diff} days`;
  }
};

const addTask = function (el, title, dateDue, priority, id) {
  const htmlTaskItem = `
  <div id=${id} class="taskitem${priority === true ? " priority--true" : ""}">
    <div class="taskitem__abbr">
      <input
        type="checkbox"
        name="completed-checkbox"
        class="taskitem__checkbox"
      />
      <div class="taskitem__txtbox">
        <h3>${title}</h3>
        <p>${dateDue === "" ? `&nbsp;` : daysLeft(dateDue)}</p>
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

  el.insertAdjacentHTML("afterend", htmlTaskItem);
};

export {
  clearForm,
  toggleSidebar,
  dimCompletedTasks,
  undoCompletedDim,
  toggleTaskDetailsBtn,
  toggleInactiveDetailsBtns,
  expandSelectedDetails,
  hideNonSelectedDetails,
  addPriorityVisual,
  removePriorityVisual,
  toggleSidebarListOptions,
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
};
