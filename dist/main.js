/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("\n\nconst lists = [];\n\n// TASKS\nclass Task {\n  constructor(title, desc, dateDue) {\n    this.title = title;\n    this.desc = desc;\n    this.dateDue = dateDue;\n    this.priority = false;\n    this.dateCreated = Date.now();\n    this.completed = false;\n  }\n}\n\n// LISTS\nclass List {\n  constructor(title) {\n    this.title = title;\n    this.dateCreated = Date.now();\n    this.sortedBy = \"dateCreated\";\n    this.sortReverse = false;\n    this.color = \"initial\";\n    this.tasks = [];\n  }\n\n  // Add Task\n  _addTask(title, desc, dateDue) {\n    this.tasks.push(new Task(title, desc, dateDue));\n  }\n\n  // Delete Task\n  _deleteTask(index) {\n    this.tasks.splice(index, 1);\n  }\n\n  _sortList(category, reverseCheck) {\n    if (category === \"dateDue\") {\n      console.log();\n      reverseCheck === false\n        ? this.tasks.sort((a, b) => a[category] - b[category])\n        : this.tasks.sort((a, b) => b[category] - a[category]);\n    } else\n      reverseCheck === false\n        ? this.tasks.sort((a, b) => b[category] - a[category])\n        : this.tasks.sort((a, b) => a[category] - b[category]);\n  }\n}\n\n// TEST SAMPLES\nconst defaultList = new List(\"Default List\");\ndefaultList._addTask(\"test1\", \"test1 desc\", \"8.10\");\ndefaultList._addTask(\"test2\", \"test2 desc\", \"8.08\");\ndefaultList._addTask(\"test3\", \"test3 desc\", \"7.16\");\ndefaultList._addTask(\"test4\", \"test4 desc\", \"12.22\");\ndefaultList._addTask(\"test5\", \"test5 desc\", \"3.22\");\n\ndefaultList.tasks[1].priority = true;\ndefaultList.tasks[1].dateCreated = 100;\ndefaultList.tasks[4].priority = true;\n\ndefaultList._sortList(\"priority\", false);\n\nconsole.table(defaultList.tasks);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLy4vc3JjL2luZGV4LmpzP2I2MzUiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGxpc3RzID0gW107XG5cbi8vIFRBU0tTXG5jbGFzcyBUYXNrIHtcbiAgY29uc3RydWN0b3IodGl0bGUsIGRlc2MsIGRhdGVEdWUpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kZXNjID0gZGVzYztcbiAgICB0aGlzLmRhdGVEdWUgPSBkYXRlRHVlO1xuICAgIHRoaXMucHJpb3JpdHkgPSBmYWxzZTtcbiAgICB0aGlzLmRhdGVDcmVhdGVkID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLmNvbXBsZXRlZCA9IGZhbHNlO1xuICB9XG59XG5cbi8vIExJU1RTXG5jbGFzcyBMaXN0IHtcbiAgY29uc3RydWN0b3IodGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kYXRlQ3JlYXRlZCA9IERhdGUubm93KCk7XG4gICAgdGhpcy5zb3J0ZWRCeSA9IFwiZGF0ZUNyZWF0ZWRcIjtcbiAgICB0aGlzLnNvcnRSZXZlcnNlID0gZmFsc2U7XG4gICAgdGhpcy5jb2xvciA9IFwiaW5pdGlhbFwiO1xuICAgIHRoaXMudGFza3MgPSBbXTtcbiAgfVxuXG4gIC8vIEFkZCBUYXNrXG4gIF9hZGRUYXNrKHRpdGxlLCBkZXNjLCBkYXRlRHVlKSB7XG4gICAgdGhpcy50YXNrcy5wdXNoKG5ldyBUYXNrKHRpdGxlLCBkZXNjLCBkYXRlRHVlKSk7XG4gIH1cblxuICAvLyBEZWxldGUgVGFza1xuICBfZGVsZXRlVGFzayhpbmRleCkge1xuICAgIHRoaXMudGFza3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIF9zb3J0TGlzdChjYXRlZ29yeSwgcmV2ZXJzZUNoZWNrKSB7XG4gICAgaWYgKGNhdGVnb3J5ID09PSBcImRhdGVEdWVcIikge1xuICAgICAgY29uc29sZS5sb2coKTtcbiAgICAgIHJldmVyc2VDaGVjayA9PT0gZmFsc2VcbiAgICAgICAgPyB0aGlzLnRhc2tzLnNvcnQoKGEsIGIpID0+IGFbY2F0ZWdvcnldIC0gYltjYXRlZ29yeV0pXG4gICAgICAgIDogdGhpcy50YXNrcy5zb3J0KChhLCBiKSA9PiBiW2NhdGVnb3J5XSAtIGFbY2F0ZWdvcnldKTtcbiAgICB9IGVsc2VcbiAgICAgIHJldmVyc2VDaGVjayA9PT0gZmFsc2VcbiAgICAgICAgPyB0aGlzLnRhc2tzLnNvcnQoKGEsIGIpID0+IGJbY2F0ZWdvcnldIC0gYVtjYXRlZ29yeV0pXG4gICAgICAgIDogdGhpcy50YXNrcy5zb3J0KChhLCBiKSA9PiBhW2NhdGVnb3J5XSAtIGJbY2F0ZWdvcnldKTtcbiAgfVxufVxuXG4vLyBURVNUIFNBTVBMRVNcbmNvbnN0IGRlZmF1bHRMaXN0ID0gbmV3IExpc3QoXCJEZWZhdWx0IExpc3RcIik7XG5kZWZhdWx0TGlzdC5fYWRkVGFzayhcInRlc3QxXCIsIFwidGVzdDEgZGVzY1wiLCBcIjguMTBcIik7XG5kZWZhdWx0TGlzdC5fYWRkVGFzayhcInRlc3QyXCIsIFwidGVzdDIgZGVzY1wiLCBcIjguMDhcIik7XG5kZWZhdWx0TGlzdC5fYWRkVGFzayhcInRlc3QzXCIsIFwidGVzdDMgZGVzY1wiLCBcIjcuMTZcIik7XG5kZWZhdWx0TGlzdC5fYWRkVGFzayhcInRlc3Q0XCIsIFwidGVzdDQgZGVzY1wiLCBcIjEyLjIyXCIpO1xuZGVmYXVsdExpc3QuX2FkZFRhc2soXCJ0ZXN0NVwiLCBcInRlc3Q1IGRlc2NcIiwgXCIzLjIyXCIpO1xuXG5kZWZhdWx0TGlzdC50YXNrc1sxXS5wcmlvcml0eSA9IHRydWU7XG5kZWZhdWx0TGlzdC50YXNrc1sxXS5kYXRlQ3JlYXRlZCA9IDEwMDtcbmRlZmF1bHRMaXN0LnRhc2tzWzRdLnByaW9yaXR5ID0gdHJ1ZTtcblxuZGVmYXVsdExpc3QuX3NvcnRMaXN0KFwicHJpb3JpdHlcIiwgZmFsc2UpO1xuXG5jb25zb2xlLnRhYmxlKGRlZmF1bHRMaXN0LnRhc2tzKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;