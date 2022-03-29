/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/


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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vLyBNQVNURVIgTElTVFxuY29uc3QgbWFzdGVyTGlzdCA9IHtcbiAgbGlzdHM6IFtdLFxuXG4gIF9hZGRMaXN0KHRpdGxlKSB7XG4gICAgdGhpcy5saXN0cy5wdXNoKG5ldyBMaXN0KHRpdGxlKSk7XG4gIH0sXG59O1xuXG5jb25zdCBhZGRMaXN0ID0gZnVuY3Rpb24gKCkge307XG5cbi8vIExJU1RTXG5jbGFzcyBMaXN0IHtcbiAgY29uc3RydWN0b3IodGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kYXRlQ3JlYXRlZCA9IERhdGUubm93KCk7XG4gICAgdGhpcy5zb3J0ZWRCeSA9IFwiZGF0ZUNyZWF0ZWRcIjtcbiAgICB0aGlzLnNvcnRSZXZlcnNlID0gZmFsc2U7XG4gICAgdGhpcy5jb2xvciA9IFwiaW5pdGlhbFwiO1xuICAgIHRoaXMudGFza3MgPSBbXTtcbiAgfVxuXG4gIC8vIEFkZCBUYXNrXG4gIF9hZGRUYXNrKHRpdGxlLCBkZXNjLCBkYXRlRHVlKSB7XG4gICAgdGhpcy50YXNrcy5wdXNoKG5ldyBUYXNrKHRpdGxlLCBkZXNjLCBkYXRlRHVlKSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBEZWxldGUgVGFza1xuICBfZGVsZXRlVGFzayhpbmRleCkge1xuICAgIHRoaXMudGFza3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIFNvcnQgVGFza3NcbiAgX3NvcnRMaXN0KGNhdGVnb3J5LCByZXZlcnNlQ2hlY2spIHtcbiAgICBpZiAoY2F0ZWdvcnkgPT09IFwiZGF0ZUR1ZVwiIHx8IGNhdGVnb3J5ID09PSBcImNvbXBsZXRlZFwiKSB7XG4gICAgICByZXZlcnNlQ2hlY2sgPT09IGZhbHNlXG4gICAgICAgID8gdGhpcy50YXNrcy5zb3J0KChhLCBiKSA9PiBhW2NhdGVnb3J5XSAtIGJbY2F0ZWdvcnldKVxuICAgICAgICA6IHRoaXMudGFza3Muc29ydCgoYSwgYikgPT4gYltjYXRlZ29yeV0gLSBhW2NhdGVnb3J5XSk7XG4gICAgfSBlbHNlXG4gICAgICByZXZlcnNlQ2hlY2sgPT09IGZhbHNlXG4gICAgICAgID8gdGhpcy50YXNrcy5zb3J0KChhLCBiKSA9PiBiW2NhdGVnb3J5XSAtIGFbY2F0ZWdvcnldKVxuICAgICAgICA6IHRoaXMudGFza3Muc29ydCgoYSwgYikgPT4gYVtjYXRlZ29yeV0gLSBiW2NhdGVnb3J5XSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuLy8gVEFTS1NcbmNsYXNzIFRhc2sge1xuICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzYywgZGF0ZUR1ZSkge1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB0aGlzLmRlc2MgPSBkZXNjO1xuICAgIHRoaXMuZGF0ZUR1ZSA9IGRhdGVEdWU7XG4gICAgdGhpcy5wcmlvcml0eSA9IGZhbHNlO1xuICAgIHRoaXMuZGF0ZUNyZWF0ZWQgPSBEYXRlLm5vdygpO1xuICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2U7XG4gIH1cblxuICAvLyBUb2dnbGUgQ29tcGxldGVkXG4gIF90b2dnbGVDb21wbGV0ZWQoKSB7XG4gICAgdGhpcy5jb21wbGV0ZWQgPT09IGZhbHNlXG4gICAgICA/ICh0aGlzLmNvbXBsZXRlZCA9IHRydWUpXG4gICAgICA6ICh0aGlzLmNvbXBsZXRlZCA9IGZhbHNlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG4vLyBURVNUIFNBTVBMRVNcbm1hc3Rlckxpc3QuX2FkZExpc3QoXCJUZXN0IExpc3RcIik7XG5cbi8vIGNvbnN0IHRlc3RMaXN0ID0gbmV3IExpc3QoXCJUZXN0IExpc3RcIik7XG5tYXN0ZXJMaXN0Lmxpc3RzWzBdLl9hZGRUYXNrKFwidGVzdDFcIiwgXCJ0ZXN0MSBkZXNjXCIsIFwiOC4xMFwiKTtcbm1hc3Rlckxpc3QubGlzdHNbMF0uX2FkZFRhc2soXCJ0ZXN0MlwiLCBcInRlc3QyIGRlc2NcIiwgXCI4LjA4XCIpO1xubWFzdGVyTGlzdC5saXN0c1swXS5fYWRkVGFzayhcInRlc3QzXCIsIFwidGVzdDMgZGVzY1wiLCBcIjcuMTZcIik7XG5tYXN0ZXJMaXN0Lmxpc3RzWzBdLl9hZGRUYXNrKFwidGVzdDRcIiwgXCJ0ZXN0NCBkZXNjXCIsIFwiMTIuMjJcIik7XG5tYXN0ZXJMaXN0Lmxpc3RzWzBdLl9hZGRUYXNrKFwidGVzdDVcIiwgXCJ0ZXN0NSBkZXNjXCIsIFwiMy4yMlwiKTtcblxubWFzdGVyTGlzdC5saXN0c1swXS50YXNrc1sxXS5wcmlvcml0eSA9IHRydWU7XG5tYXN0ZXJMaXN0Lmxpc3RzWzBdLnRhc2tzWzFdLmRhdGVDcmVhdGVkID0gMTAwO1xubWFzdGVyTGlzdC5saXN0c1swXS50YXNrc1s0XS5wcmlvcml0eSA9IHRydWU7XG5cbi8vIG1hc3Rlckxpc3QubGlzdHNbMF0uX3NvcnRMaXN0KFwicHJpb3JpdHlcIiwgZmFsc2UpO1xuXG4vLyBjb25zb2xlLmxvZyh0ZXN0TGlzdC50YXNrc1swXSk7XG5tYXN0ZXJMaXN0Lmxpc3RzWzBdLnRhc2tzWzJdLl90b2dnbGVDb21wbGV0ZWQoKTtcbm1hc3Rlckxpc3QubGlzdHNbMF0udGFza3NbNF0uX3RvZ2dsZUNvbXBsZXRlZCgpO1xuXG5jb25zb2xlLnRhYmxlKG1hc3Rlckxpc3QubGlzdHNbMF0udGFza3MpO1xuXG5tYXN0ZXJMaXN0Lmxpc3RzWzBdLl9zb3J0TGlzdChcImNvbXBsZXRlZFwiLCBmYWxzZSk7XG5cbmNvbnNvbGUudGFibGUobWFzdGVyTGlzdC5saXN0c1swXS50YXNrcyk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=