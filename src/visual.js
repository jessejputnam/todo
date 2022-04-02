"use strict";
/* ************************************************** */
//* DRY FUNCTIONS
/* ************************************************** */
const clearForm = function (form, formTask, formDue, formDesc, formPriority) {
  form.classList.add("hidden");

  formTask.value = "";
  formDue.value = "";
  formDesc.value = "";
  formPriority.checked = false;
};

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
  sidebar.classList.toggle("hidden");

  // Tranform close button
  listsMenuEndBars.forEach((bar) => bar.classList.toggle("bar--vanish"));
  listsMenuMidBar1.classList.toggle("bar__mid--rotate");
  listsMenuMidBar2.classList.toggle("bar__mid2--rotate");
};

// ADD TASK OPEN
const openAddTask = function (form) {
  form.classList.remove("hidden");
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
    expandTaskitem(clicked.parentElement.parentElement.parentElement);
};

const hideNonSelectedDetails = function (clicked) {
  if (!clicked.classList.contains("btn__details--open"))
    hideTaskDetails(clicked.parentElement.parentElement.parentElement);
};

// Change priority checkbox visual
const addPriorityVisual = function (e, clicked) {
  // Change box border
  e.target.classList.add("taskitem__priority-check__checkbox--red-border");

  // Change background color of task
  clicked.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add(
    "priority--true"
  );
};

const removePriorityVisual = function (e, clicked) {
  // Change box border
  e.target.classList.remove("taskitem__priority-check__checkbox--red-border");

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
  clicked.parentElement.lastElementChild.classList.toggle("hidden");
};

const hideSidebarListOptions = function (clicked) {
  clicked.parentElement.classList.add("hidden");
};

/* ************************************************** */
//* FORM BUTTONS
/* ************************************************** */
const expandTaskitem = function (el, priority, desc) {
  const htmlTaskDetails = `
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

  el.insertAdjacentHTML("beforeend", htmlTaskDetails);
};

const hideTaskDetails = function (el) {
  el.removeChild(el.lastElementChild);
};

const htmlTaskItem = `
  <div class="taskitem">
    <div class="taskitem__abbr">
      <input
        type="checkbox"
        name="completed-checkbox"
        class="taskitem__checkbox"
      />
      <div class="taskitem__txtbox">
        <h3>Task Item 1</h3>
        <p>due in 5 days</p>
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
    <div class="listitem__title">Default List</div>
    <div class="listitem__due-count">
      <div class="listitem__due-count__title">Tasks Due:</div>
      <div class="listitem__due-count__count">10</div>
    </div>
  </div>
`;

export {
  clearForm,
  toggleSidebar,
  openAddTask,
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
};
