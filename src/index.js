import { MasterList, List, Task } from "./todo-logic.js";

("use strict");
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

// masterList.items[0].items[1].priority = true;
masterList.items[0].items[1].dateCreated = 100;
// masterList.items[0].items[4].priority = true;

console.log(masterList.items[0].items);

masterList.items[0].items[1].togglePriority();
console.log(masterList.items[0].items[1]);
