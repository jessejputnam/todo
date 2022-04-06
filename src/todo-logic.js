"use strict";

/**
 
 TABLE OF CONTENTS
 * Master List
 * Lists
 * Tasks
 
 */

// MASTER LIST
class App {
  constructor() {
    this.items = [];
    this.prevDataCheck;
  }

  addItem(title) {
    this.items.unshift(new List(title));
    return this;
  }

  deleteItem(index) {
    this.items.splice(index, 1);
    return this;
  }

  /**
   * @param dir = 1 if moved down; -1 if moved up
   */
  moveItem(index, dir) {
    const movedItem = this.items.splice(index, 1)[0];
    this.items.splice(index + dir, 0, movedItem);
    return this;
  }

  sortItems(category) {
    if (category === "completed") {
      this.items.sort((a, b) => a[category] - b[category]);
      console.log("c");
      return this;
    }

    if (category === "dateDue") {
      this.items.sort(
        (a, b) => Date.parse(a[category]) - Date.parse(b[category])
      );
      console.log("d");
      return this;
    }

    this.items.sort((a, b) => b[category] - a[category]);
    console.log("o");
    return this;
  }

  _setLocalStorage() {
    localStorage.setItem("lists", JSON.stringify(this.items));
  }

  _getLocalStorage(masterList) {
    const data = JSON.parse(localStorage.getItem("lists"));

    // Check for local storage data
    if (!data) {
      masterList.prevDataCheck = false;
      return;
    }

    for (let i = 0; i < data.length; i++) {
      masterList.items.push(new List(data[i].title));
      masterList.items[i].id = data[i].id;

      if (data[i].items.length === 0) continue;

      for (let j = 0; j < data[i].items.length; j++) {
        masterList.items[i].items.push(
          new Task(
            data[i].items[j].title,
            data[i].items[j].desc,
            data[i].items[j].dateDue,
            data[i].items[j].priority
          )
        );
        masterList.items[i].items[j].id = data[i].items[j].id;
        masterList.items[i].items[j].completed = data[i].items[j].completed;
        masterList.items[i].items[j].completedDate =
          data[i].items[j].completedDate;
      }
    }
  }

  _reset() {
    localStorage.removeItem("lists");
    this.items = [];
    this.addItem("Main List");
  }
}

// LISTS
class List extends App {
  constructor(title) {
    super();
    this.title = title;
    this.id = Date.now();
    this.items = [];
  }

  // Add Task
  addItem(title, desc, dateDue, priority) {
    this.items.unshift(new Task(title, desc, dateDue, priority));
    return this;
  }

  _clearCompletedTasks() {
    this.items = this.items.filter((a) => a.completed === false);
  }
}

// TASKS
class Task {
  constructor(title, desc, dateDue, priority) {
    this.title = title;
    this.desc = desc;
    this.id = Date.now();
    this.dateDue = dateDue;
    this.priority = priority;
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
        day: "2-digit"
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

export { App, List, Task };
