// DOM elements
const progress = document.getElementById('progress');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
// more than one
const circles = document.querySelectorAll('.circle');

let currentActive = 1;

// don't let next be clicked over 4 times
next.addEventListener('click', () => {
  currentActive++;

  if (currentActive > circles.length) {
    currentActive = circles.length;
  }

  console.log(currentActive);
});
