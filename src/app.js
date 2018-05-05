import './assets/scss/app.scss';
console.log('Its working just fine');

// Initial Setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// Make sure canvas occupies all of the visible space in browser window
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// Some constants
const minRadius = 10;
const maxRadius = 30;
const numCircles = 100;

// Circle class to creat more circle objects easily later
class Circle {
    constructor(x, y, radius, color, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        // velocities:
        this.dx = dx;
        this.dy = dy;
    }
    update() {
        // // if circle's left end corsses right end of the window, we reset it to left of the left end window 
        // if (this.x - this.radius > window.innerWidth) {
        //     this.x = 0 - this.radius;
        // }
        // Whenever circle touhces the end of window, it reverses their velocity
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
        this.draw();
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }
}

// Utility functions:
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// define circle
let circles;

// Function to initiate and setup our starting canvas. This is called one time only as below at end of file
function init() {
    circles = []

    for (let i = 0; i < numCircles; i++) {
        let radius = randomIntFromRange(minRadius, maxRadius);
        let x = randomIntFromRange(0 + radius, window.innerWidth - radius);
        let y = randomIntFromRange(0 + radius, window.innerHeight - radius);
        let dx = randomIntFromRange(-3, 3) | 2;
        let dy = randomIntFromRange(-3, 3) | 2;
        circles.push(new Circle(x, y, radius, '#6af593', dx, dy));
    }
}

// Animation Loop
function animate() {
    // This is what initiates teh loop for animation to run
    requestAnimationFrame(animate)
    // Next we clear the canvas to start fresh
    c.clearRect(0, 0, canvas.width, canvas.height)

    // for each circle we update it's position in next frame
    circles.forEach(circle => {
        circle.update();
    });
    
}

// Initiate setup of canvas
init();
animate();