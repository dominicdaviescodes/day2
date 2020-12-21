# day2


The effect is purely CSS a line moves forward and back also highlighting the circles.

## What is the JavaScript doing in this project?

Controlling this is JS.  The buttons are clickable allowing a user to move forwards/back.

![the project](/img/app.JPG)

### in summary
Clicking Next takes us forward a step
Clicking Prev takes us back a step
At the start Prev is grey
At the end Next is grey

There is a calculation to perform allowing us to move precisely between step 1 to 2, 2 to 3 and 4 to 4 and back again. This isn't a neat 100 / 4 = 25 as it looks, as there are really only 3 clicks each way.

### What DOM elements will we need?

* the progress line, is its own div
* the circles are divs - we will add active class to these
* the buttons that allow us to interact

for the circles as there are more than one, we use querySelectorAll which will bring them all in as a node list (like an array)
```js

// DOM elements
const progress = document.getElementById('progress');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const circles = document.querySelectorAll('.circle');
```
we set the current step (1) to active.

```js
let currentActive = 1;
```

### When we click on the next button:

We add an addEventListener to Next to listen for a click. We we click it will run a function taking what currentActive is at the time and increment by 1.

```js
next.addEventListener('click', () => {
  currentActive++;

})

```
if we console.log currentActive here: we get 1,2,3,4,5,6....

We'll need to stop this at 4 (the end).

if currentActive is > cirles.length then set currentActive = circles.length.

```js
// don't let next be clicked over 4 times
next.addEventListener('click', () => {
  currentActive++;

  if (currentActive > circles.length) {
    currentActive = circles.length;
  }
    console.log(currentActive)
});
```
console.log(currentActive) here we get 2,3,4,4,4,4,4. it just stays at 4 not 5,6,7,8 etc.

### When we click on the Prev button:

Clicking Prev will decrement by 1 step.
If currentActive < 1 we know we're at the beginning and set currentActive = 1.
```js
prev.addEventListener('click', () => {
  currentActive--;

  if (currentActive < 1) {
    currentActive = 1;
  }
});
```

### in both these event listeners we need to call a function to update the DOM.

loop through our circles. forEach circle we'll also get the index.  Then we'll check to see if the index
is < currentActive.  So going forward if step 1 is the current index, clicking Next will make step 2 the current index. step 1 is now < currentActive (step 2) so the active class will be added to step 2 making it the currentActive. Clicking Next again will make it < currentActive.

The opposite is true clicking Prev.
Going back down the steps to 1. Lets stay step 4 is currentActive.  Clicking Prev will make step 3 makes the index < currentActive meaning the active class will be removed from step 4.

```js
function update() {
  circles.forEach((circle, idx) => {
    if (idx < currentActive) {
      circle.classList.add('active');
    } else {
      circle.classList.remove('active');
    }
  });
```

### Updating the DOM

we add call this new function 

```js
  update();
```

at the end of our event listeners

```js
next.addEventListener('click', () => {
  currentActive++;

  if (currentActive > circles.length) {
    currentActive = circles.length;
  }
  // update the DOM
  update();
});

// decrement by 1 for previous button
prev.addEventListener('click', () => {
  currentActive--;

  if (currentActive < 1) {
    currentActive = 1;
  }

  update();
});
```
![a photo of the project](/img/actives.JPG)
### Now the circles are active we need the progress line to match up with them

```js
const actives = document.querySelectorAll('.active');
```
if we console log actives.length and circles.length we have actives on 2,3,4 and circles.length is always 4.

## the math bit
actives.length / circles.length * 100 gives us 50, 75, 100.  we'll need 33% from 1 - 2,  66% from 2-3 and 3 to step 4 will total 100%.

### We need a % for our progress line to move using width css property

subtracting 1 from actives.length and circles.length gives us the correct %.  As far as I can tell actives.length -1 gives us 3 possible steps and circles.length is now 3.  giving us 3 split 33% values on 2,3 and step 4.

```js
progress.style.width =
    ((actives.length - 1) / (circles.length - 1)) * 100 + '%';

```

### Lets control when Prev and Next buttons are disabled.

```js
if (currentActive === 1) {
  prev.disabled = true;
} else if (currentActive === circles.length) {
  next.disabled = true;
``` 
and when we're in the middle, steps 2 and 3.
Prev and Next won't be disabled.
```js

  if (currentActive === 1) {
    prev.disabled = true;
  } else if (currentActive === circles.length) {
    next.disabled = true;
  } else {
    prev.disabled = false;
    next.disabled = false;
  }
}
```