"use strict";

// MASTER LIST
const masterList = {
  lists: [],

  _addList(title) {
    this.lists.push(new List(title));
  },
};

const addList = function () {};

// LISTS
class List {
  constructor(title) {
    this.title = title;
    this.dateCreated = Date.now();
    this.sortedBy = "dateCreated";
    this.sortReverse = false;
    this.color = "initial";
    this.tasks = [];
  }

  // Add Task
  _addTask(title, desc, dateDue) {
    this.tasks.push(new Task(title, desc, dateDue));
    return this;
  }

  // Delete Task
  _deleteTask(index) {
    this.tasks.splice(index, 1);
    return this;
  }

  // Sort Tasks
  _sortList(category, reverseCheck) {
    if (category === "dateDue" || category === "completed") {
      reverseCheck === false
        ? this.tasks.sort((a, b) => a[category] - b[category])
        : this.tasks.sort((a, b) => b[category] - a[category]);
    } else
      reverseCheck === false
        ? this.tasks.sort((a, b) => b[category] - a[category])
        : this.tasks.sort((a, b) => a[category] - b[category]);
    return this;
  }
}

// TASKS
class Task {
  constructor(title, desc, dateDue) {
    this.title = title;
    this.desc = desc;
    this.dateDue = dateDue;
    this.priority = false;
    this.dateCreated = Date.now();
    this.completed = false;
  }

  // Toggle Completed
  _toggleCompleted() {
    this.completed === false
      ? (this.completed = true)
      : (this.completed = false);
    return this;
  }
}

// TEST SAMPLES
masterList._addList("Test List");

// const testList = new List("Test List");
masterList.lists[0]._addTask("test1", "test1 desc", "8.10");
masterList.lists[0]._addTask("test2", "test2 desc", "8.08");
masterList.lists[0]._addTask("test3", "test3 desc", "7.16");
masterList.lists[0]._addTask("test4", "test4 desc", "12.22");
masterList.lists[0]._addTask("test5", "test5 desc", "3.22");

masterList.lists[0].tasks[1].priority = true;
masterList.lists[0].tasks[1].dateCreated = 100;
masterList.lists[0].tasks[4].priority = true;

// masterList.lists[0]._sortList("priority", false);

// console.log(testList.tasks[0]);
masterList.lists[0].tasks[2]._toggleCompleted();
masterList.lists[0].tasks[4]._toggleCompleted();

console.table(masterList.lists[0].tasks);

masterList.lists[0]._sortList("completed", false);

console.table(masterList.lists[0].tasks);
