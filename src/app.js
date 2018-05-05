import './assets/scss/app.scss';
console.log('Its working just fine');

// Initial Setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// Make sure canvas occupies all of the visible space in browser window
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// begin drawing a path
c.beginPath();
// move to a starting point without drawing anything
c.moveTo(100,100);
// define a path line from starting point (x:100, y:100) to another point(x:300, y:100)
c.lineTo(300,100);
// actually draw the stroke of the path
c.stroke();
// close the path
c.closePath();

