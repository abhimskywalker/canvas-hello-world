import './assets/scss/app.scss';
console.log('Its working just fine');

// Initial Setup
const backgroundCanvas = document.querySelector('canvas#background')
const canvas = document.querySelector('canvas#foreground')
const c = canvas.getContext('2d')
const b = backgroundCanvas.getContext('2d')

backgroundCanvas.width = innerWidth
backgroundCanvas.height = innerHeight

canvas.width = innerWidth
canvas.height = innerHeight

// Some constants
const minRadius = 2;
const maxRadius = 5;
let numCircles = Math.floor(window.innerHeight / 2 + window.innerWidth / 2);
console.log("numCircles", numCircles);

const colors = [
    '#9C89B8', //LAVENDER PURPLE
    '#F0A6CA', // CARNATION PINK
    '#EFC3E6', // CLASSIC ROSE
    '#F0E6EF', // ISABELLINE
    '#B8BEDD' // LIGHT STEEL BLUE
]

const numClouds = 5;
const cloudColors = ["#E7F2F4", '#c8d1f3', '#A2D2DC']

// Variables
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
    numCircles = Math.floor(window.innerHeight / 2 + window.innerWidth / 2);
    console.log("numCircles", numCircles);
    init()
})

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
        // Whenever circle touhces the end of window, it reverses their velocity
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        // Enlarge if mouse narby, else reset to original rnage radius
        if (Math.abs(this.x - mouse.x) < 40 && Math.abs(this.y - mouse.y) < 40) {
            this.radius = maxRadius * 5;
        } else if (this.radius > maxRadius) {
            this.radius = randomIntFromRange(minRadius, maxRadius);
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

// Cloud
class Cloud {
    constructor(x, y, color, dx, dy = 0) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.dx = dx | 1;
        this.dy = dy;
        this.length = 350;
    }
    update() {
        // if cloud's left end corsses right end of the window, we reset it to left of the left end of the window 
        if (this.x - this.length > innerWidth) {
            this.x = 0 - this.length;
        }
        this.x = this.x + this.dx;
        this.draw();
    }
    draw() {
        b.beginPath();
        b.fillStyle = this.color;
        // This shape was achieved by hit and trial by combining shapes of 4 circles and a rectangle base.
        // To see the exact process, execute each one below one by one and call `b.fill()` after every arc.
        b.arc(this.x + 0, this.y + 60, 40, 0, Math.PI * 2, false);
        b.arc(this.x + 50, this.y + 20, 60, 0, Math.PI * 2, false);
        b.arc(this.x + 150, this.y + 0, 100, 0, Math.PI * 2, false);
        b.arc(this.x + 270, this.y + 30, 70, 0, Math.PI * 2, false);
        b.fillRect(this.x, this.y + 20, 270, 80);
        b.fill();
        b.closePath();
    }
}

// Utility functions:
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

// define circle
let circles;
let clouds;

// Function to initiate and setup our starting canvas. This is called one time only as below at end of file
function init() {
    circles = []

    for (let i = 0; i < numCircles; i++) {
        let radius = randomIntFromRange(minRadius, maxRadius);
        let x = randomIntFromRange(0 + radius, window.innerWidth - radius);
        let y = randomIntFromRange(0 + radius, window.innerHeight - radius);
        let dx = randomIntFromRange(-3, 3) | 2;
        let dy = randomIntFromRange(-3, 3) | 2;
        circles.push(new Circle(x, y, radius, randomColor(colors), dx, dy));
    }

    clouds = []

    for (let i = 0; i < 6; i++) {
        let x = Math.random() * innerWidth;
        let y = Math.random() * innerHeight;
        let dx = randomIntFromRange(2, 4);
        for (let j = 0; j < clouds.length; j++) {
            let cloud = clouds[j];
            if (Math.abs(x - cloud.x) < 380 && Math.abs(y - cloud.y) < 200) {
                x = Math.random() * innerWidth;
                y = Math.random() * innerHeight;
                j = -1;
            }
        }
        clouds.push(new Cloud(x, y, randomColor(cloudColors), dx))
    }
}

// Animation Loop
function animate() {
    // This is what initiates teh loop for animation to run
    requestAnimationFrame(animate)
    // Next we clear the canvas to start fresh
    c.clearRect(0, 0, canvas.width, canvas.height);
    b.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

    // for each circle we update it's position in next frame
    circles.forEach(circle => {
        circle.update();
    });

    clouds.forEach(cloud => {
        cloud.update();
    });

}

// Initiate setup of canvas
init();
animate();