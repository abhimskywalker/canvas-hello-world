import './assets/scss/app.scss';
console.log('Its working just fine');

// Initial Setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// Make sure canvas occupies all of the visible space in browser window
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// Circle class to creat more circle objects easily later
class Circle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }
}

// define circle
let circle;

// Function to initiate and setup our starting canvas. This is called one time only as below at end of file
function init() {
    circle = new Circle(200, 200, 50, '#6af593');
    circle.draw();
}

// Animation Loop
function animate() {
    // This is what initiates teh loop for animation to run
    requestAnimationFrame(animate)
    // Next we clear the canvas to start fresh
    c.clearRect(0, 0, canvas.width, canvas.height)

    // We move the centre x by 1
    circle.x += 1;
    // Next we draw this moved circle on canvas
    circle.draw();
}

// Initiate setup of canvas
init();
animate();