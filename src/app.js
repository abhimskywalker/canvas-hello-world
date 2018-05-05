import './assets/scss/app.scss';
console.log('Its working just fine');

// Initial Setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// Make sure canvas occupies all of the visible space in browser window
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// // begin drawing a path
// c.beginPath();
// // move to a starting point without drawing anything
// c.moveTo(100,100);
// // define a path line from starting point (x:100, y:100) to another point(x:300, y:100)
// c.lineTo(300,100);
// // actually draw the stroke of the path
// c.stroke();
// // close the path
// c.closePath();

// Time to draw a circle this time:
c.beginPath();
// Define an arc of a circle with center at point(x:200, y:200) with radius of 50px
// arc starts from 0 degree to full 2*pie angle, thus creating a full circle
c.arc(200, 200, 50, 0, Math.PI * 2, false);
// assign color to fill with a hexcode. Default if black fill
c.fillStyle = "#6af593";
// actually fill the path
c.fill();
c.closePath();

