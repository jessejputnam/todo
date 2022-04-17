# To-Do List
live: https://jessejputnam.github.io/todo/

A challenge from the Odin Project to create a todo application

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  
## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- View all projects and select one at a time as active
- View all to-dos in each project in summary
- Expand each task to see details
- Delete a to-do
- Come back to saved list after refresh/exit

## My process

### Built with

- Semantic HTML5 markup
- Flexbox
- Mobile-first workflow
- NPM
- Webpack
- API (date-fns: https://date-fns.org/)


### What I learned

The focus of this project was two-fold: (I) practice using a more complete dev environment, (II) try to keep functionality modular by separating app logic from visual logic, and (III) learn about persistent storage through practice using and manipulating JSON data through the local storage API.

(I) Practice dev environment
- - Before beginning the project, I attempted to write out the major object of the project, then created user stories of how I wanted my user to interact with my app. I then created a flow-chart to being planning out the functionalty of the app and begin organizing the structure.
- - Then, I began with putting into practice setting up a more complete web dev environment by initializing NPM and using WebPack. This prepared me to beign to plan to separate my code into ES6 modules. For this, I have to learn and practice such actions as setting up my dist folder, correctly pathing my src folder, engaging with webpack config, learning how to "watch" my changing JS code, and problem solve for dealing with errors across multiple sources.

(II)
- - This was my first attempt at not just separating code functionality into modules, but also at truly attempting to encapsulate separate behaviors. In effect, I got to see how writing the app logic first, without regard to visual, helped me to focus on the inner logic. It also led to faster development by the end when I realized I had abstracted a lot of functionality and could easily find and reuse code. It was also of great value in trouble shooting: I was able to pinpoint where errors lay much faster and, as issues did arise, I could make aestheitc changes without affecting the underlying logic.

(III)
- - One of the more interesting challenges in this app was figuring out how to recreate the JSON data to include the methods and such on my returned objects, having been previously stringified. It proved once more the effectiveness of modular code and good abstractions (as well as the usefulness of classes, as pseudo as they may be in JS). By taking the JSON data for each list and looping over them in an array, I could simply plug in the data from each task item as the arguments creating "new" objects from their respective classes.

```js
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
```

### Continued development

Further exploration of the module concept is needed. Further practice with webpack is also necessary for better grasp.
