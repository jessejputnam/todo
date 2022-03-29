/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/


// MASTER LIST
class MasterList {
  constructor() {
    this.items = [];
  }

  addItem(title) {
    this.items.push(new List(title));
    return this;
  }

  deleteItem(index) {
    this.items.splice(index, 1);
    return this;
  }

  moveItem(index, dir) {
    const movedItem = this.items.splice(index, 1)[0];
    console.log(movedItem);
    console.log(index + dir);
    this.items.splice(index + dir, 0, movedItem);
    return this;
  }

  sortItems(category, reverseCheck) {
    if (category === "dateDue" || category === "completed") {
      reverseCheck === false
        ? this.items.sort((a, b) => a[category] - b[category])
        : this.items.sort((a, b) => b[category] - a[category]);
    } else if (category === "title") {
      reverseCheck === false
        ? this.items.sort((a, b) => {
            const nameA = a.title.toUpperCase();
            const nameB = b.title.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }

            return 0;
          })
        : this.items.sort((a, b) => {
            const nameA = a.title.toUpperCase();
            const nameB = b.title.toUpperCase();
            if (nameA < nameB) {
              return 1;
            }
            if (nameA > nameB) {
              return -1;
            }

            return 0;
          });
    } else
      reverseCheck === false
        ? this.items.sort((a, b) => b[category] - a[category])
        : this.items.sort((a, b) => a[category] - b[category]);
    return this;
  }
}

// LISTS
class List extends MasterList {
  constructor(title) {
    super();
    this.title = title;
    this.dateCreated = Date.now();
    this.color = "initial";
    this.items = [];
  }

  // Add Task
  addItem(title, desc, dateDue) {
    this.items.push(new Task(title, desc, dateDue));
    return this;
  }
}

// TASKS
class Task {
  constructor(title, desc, dateDue) {
    this.title = title;
    this.desc = desc;
    this.dateCreated = Date.now();
    this.dateDue = +dateDue;
    this.priority = false;
    this.completed = false;
  }

  // Toggle Completed
  toggleCompleted() {
    this.completed === false
      ? (this.completed = true)
      : (this.completed = false);
    return this;
  }

  //! Toggle Priority
}

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

masterList.items[0].items[1].priority = true;
masterList.items[0].items[1].dateCreated = 100;
masterList.items[0].items[4].priority = true;

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVztBQUNYLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vLyBNQVNURVIgTElTVFxuY2xhc3MgTWFzdGVyTGlzdCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgfVxuXG4gIGFkZEl0ZW0odGl0bGUpIHtcbiAgICB0aGlzLml0ZW1zLnB1c2gobmV3IExpc3QodGl0bGUpKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGRlbGV0ZUl0ZW0oaW5kZXgpIHtcbiAgICB0aGlzLml0ZW1zLnNwbGljZShpbmRleCwgMSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBtb3ZlSXRlbShpbmRleCwgZGlyKSB7XG4gICAgY29uc3QgbW92ZWRJdGVtID0gdGhpcy5pdGVtcy5zcGxpY2UoaW5kZXgsIDEpWzBdO1xuICAgIGNvbnNvbGUubG9nKG1vdmVkSXRlbSk7XG4gICAgY29uc29sZS5sb2coaW5kZXggKyBkaXIpO1xuICAgIHRoaXMuaXRlbXMuc3BsaWNlKGluZGV4ICsgZGlyLCAwLCBtb3ZlZEl0ZW0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc29ydEl0ZW1zKGNhdGVnb3J5LCByZXZlcnNlQ2hlY2spIHtcbiAgICBpZiAoY2F0ZWdvcnkgPT09IFwiZGF0ZUR1ZVwiIHx8IGNhdGVnb3J5ID09PSBcImNvbXBsZXRlZFwiKSB7XG4gICAgICByZXZlcnNlQ2hlY2sgPT09IGZhbHNlXG4gICAgICAgID8gdGhpcy5pdGVtcy5zb3J0KChhLCBiKSA9PiBhW2NhdGVnb3J5XSAtIGJbY2F0ZWdvcnldKVxuICAgICAgICA6IHRoaXMuaXRlbXMuc29ydCgoYSwgYikgPT4gYltjYXRlZ29yeV0gLSBhW2NhdGVnb3J5XSk7XG4gICAgfSBlbHNlIGlmIChjYXRlZ29yeSA9PT0gXCJ0aXRsZVwiKSB7XG4gICAgICByZXZlcnNlQ2hlY2sgPT09IGZhbHNlXG4gICAgICAgID8gdGhpcy5pdGVtcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuYW1lQSA9IGEudGl0bGUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIGNvbnN0IG5hbWVCID0gYi50aXRsZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKG5hbWVBIDwgbmFtZUIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5hbWVBID4gbmFtZUIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgIH0pXG4gICAgICAgIDogdGhpcy5pdGVtcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuYW1lQSA9IGEudGl0bGUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIGNvbnN0IG5hbWVCID0gYi50aXRsZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKG5hbWVBIDwgbmFtZUIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZUEgPiBuYW1lQikge1xuICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgIH0pO1xuICAgIH0gZWxzZVxuICAgICAgcmV2ZXJzZUNoZWNrID09PSBmYWxzZVxuICAgICAgICA/IHRoaXMuaXRlbXMuc29ydCgoYSwgYikgPT4gYltjYXRlZ29yeV0gLSBhW2NhdGVnb3J5XSlcbiAgICAgICAgOiB0aGlzLml0ZW1zLnNvcnQoKGEsIGIpID0+IGFbY2F0ZWdvcnldIC0gYltjYXRlZ29yeV0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbi8vIExJU1RTXG5jbGFzcyBMaXN0IGV4dGVuZHMgTWFzdGVyTGlzdCB7XG4gIGNvbnN0cnVjdG9yKHRpdGxlKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kYXRlQ3JlYXRlZCA9IERhdGUubm93KCk7XG4gICAgdGhpcy5jb2xvciA9IFwiaW5pdGlhbFwiO1xuICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgfVxuXG4gIC8vIEFkZCBUYXNrXG4gIGFkZEl0ZW0odGl0bGUsIGRlc2MsIGRhdGVEdWUpIHtcbiAgICB0aGlzLml0ZW1zLnB1c2gobmV3IFRhc2sodGl0bGUsIGRlc2MsIGRhdGVEdWUpKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG4vLyBUQVNLU1xuY2xhc3MgVGFzayB7XG4gIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjLCBkYXRlRHVlKSB7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIHRoaXMuZGVzYyA9IGRlc2M7XG4gICAgdGhpcy5kYXRlQ3JlYXRlZCA9IERhdGUubm93KCk7XG4gICAgdGhpcy5kYXRlRHVlID0gK2RhdGVEdWU7XG4gICAgdGhpcy5wcmlvcml0eSA9IGZhbHNlO1xuICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2U7XG4gIH1cblxuICAvLyBUb2dnbGUgQ29tcGxldGVkXG4gIHRvZ2dsZUNvbXBsZXRlZCgpIHtcbiAgICB0aGlzLmNvbXBsZXRlZCA9PT0gZmFsc2VcbiAgICAgID8gKHRoaXMuY29tcGxldGVkID0gdHJ1ZSlcbiAgICAgIDogKHRoaXMuY29tcGxldGVkID0gZmFsc2UpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8hIFRvZ2dsZSBQcmlvcml0eVxufVxuXG4vLyBURVNUIFNBTVBMRVNcbi8vIENyZWF0ZSBNYXN0ZXIgTGlzdFxuY29uc3QgbWFzdGVyTGlzdCA9IG5ldyBNYXN0ZXJMaXN0KCk7XG5cbi8vIEFkZCBMaXN0cyB0byBNYXN0ZXIgTGlzdFxubWFzdGVyTGlzdC5hZGRJdGVtKFwiVGVzdCBMaXN0XCIpO1xubWFzdGVyTGlzdC5hZGRJdGVtKFwiQSBUZXN0IExpc3QgMlwiKTtcbm1hc3Rlckxpc3QuYWRkSXRlbShcIlRlc3QgTGlzdCAzXCIpO1xubWFzdGVyTGlzdC5hZGRJdGVtKFwiVGVzdCBMaXN0IDRcIik7XG5cbi8vIEFkZCBUYXNrcyB0byBMaXN0IGluIE1hc3RlciBMaXN0XG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLmFkZEl0ZW0oXCJ0ZXN0MVwiLCBcImEgdGVzdDEgZGVzY1wiLCBcIjguMTBcIik7XG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLmFkZEl0ZW0oXCJ0ZXN0MlwiLCBcImIgdGVzdDIgZGVzY1wiLCBcIjguMDhcIik7XG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLmFkZEl0ZW0oXCJ0ZXN0M1wiLCBcImMgdGVzdDMgZGVzY1wiLCBcIjcuMTZcIik7XG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLmFkZEl0ZW0oXCJ0ZXN0NFwiLCBcImQgdGVzdDQgZGVzY1wiLCBcIjEyLjIyXCIpO1xubWFzdGVyTGlzdC5pdGVtc1swXS5hZGRJdGVtKFwidGVzdDVcIiwgXCJlIHRlc3Q1IGRlc2NcIiwgXCIzLjIyXCIpO1xuXG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLml0ZW1zWzFdLnByaW9yaXR5ID0gdHJ1ZTtcbm1hc3Rlckxpc3QuaXRlbXNbMF0uaXRlbXNbMV0uZGF0ZUNyZWF0ZWQgPSAxMDA7XG5tYXN0ZXJMaXN0Lml0ZW1zWzBdLml0ZW1zWzRdLnByaW9yaXR5ID0gdHJ1ZTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==