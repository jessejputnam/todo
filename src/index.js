"use strict";

const lists = [];

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
}

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
  }

  // Delete Task
  _deleteTask(index) {
    this.tasks.splice(index, 1);
  }

  _sortList(category, reverseCheck) {
    if (category === "dateDue") {
      console.log();
      reverseCheck === false
        ? this.tasks.sort((a, b) => a[category] - b[category])
        : this.tasks.sort((a, b) => b[category] - a[category]);
    } else
      reverseCheck === false
        ? this.tasks.sort((a, b) => b[category] - a[category])
        : this.tasks.sort((a, b) => a[category] - b[category]);
  }
}

// TEST SAMPLES
const defaultList = new List("Default List");
defaultList._addTask("test1", "test1 desc", "8.10");
defaultList._addTask("test2", "test2 desc", "8.08");
defaultList._addTask("test3", "test3 desc", "7.16");
defaultList._addTask("test4", "test4 desc", "12.22");
defaultList._addTask("test5", "test5 desc", "3.22");

defaultList.tasks[1].priority = true;
defaultList.tasks[1].dateCreated = 100;
defaultList.tasks[4].priority = true;

defaultList._sortList("priority", false);

console.table(defaultList.tasks);
