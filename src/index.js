"use strict";

/**
 TABLE OF CONTENTS
 * Modules
 * DOM Variables
 * On Load Actions
 * Header Buttons
 * 
*/

/* ************************************************** */
//* MODULES
/* ************************************************** */
import { MasterList } from "./todo-logic.js";

/* ************************************************** */
//* DOM VARIABLES
/* ************************************************** */
// -- Buttons
const btnListsMenu = document.querySelector(".lists-menu");

// -- Windows
const sidebar = document.querySelector(".sidebar");

/* ************************************************** */
//* ON LOAD ACTIONS
/* ************************************************** */

/* Stops sidebar from popping briefly in view on page load */
sidebar.style.display = "flex";

/* ************************************************** */
//* HEADER BUTTONS
/* ************************************************** */
btnListsMenu.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
});

/* ************************************************** */
/* ************************************************** */

//TESTING AREA
/**
 *
 *
 *
 *
 *
 *
 *
 */
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

// masterList.items[0].items[1].completed = true;
masterList.items[0].items[1].dateCreated = 100;
// masterList.items[0].items[4].completed = true;

console.log(masterList.items[0].items);

masterList.items[0].items[4].toggleCompleted();

masterList.items[0].items[1].togglePriority();
console.table(masterList.items[0].items);
