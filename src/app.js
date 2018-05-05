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
    constructor(x, y, radius, color, dx) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        // x velocity
        this.dx = dx;
    }
    update() {
        // // if circle's left end corsses right end of the window, we reset it to left of the left end window 
        // if (this.x - this.radius > window.innerWidth) {
        //     this.x = 0 - this.radius;
        // }
        // Let's make it bounc instead:
        // Whenever circle touhces the left or right end of window, it reverses velocity
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        this.x = this.x + this.dx;
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

// define circle
let circle;

// Function to initiate and setup our starting canvas. This is called one time only as below at end of file
function init() {
    circle = new Circle(200, 200, 50, '#6af593', 3);
    circle.draw();
}

// Animation Loop
function animate() {
    // This is what initiates teh loop for animation to run
    requestAnimationFrame(animate)
    // Next we clear the canvas to start fresh
    c.clearRect(0, 0, canvas.width, canvas.height)

    // Next we update this circle on canvas (repeat draw code abstracted in update function of Circle class)
    circle.update();
}

// Initiate setup of canvas
init();
animate();