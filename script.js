// Get the canvas element and set its dimensions
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Get the 2D rendering context
var c = canvas.getContext('2d');

// Constructor for ShootingStar objects
function ShootingStar(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.originalColor = color; // Store the original color
    this.color = color; // Current color

    // Draw the shooting star
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        c.closePath();
        c.fillStyle = this.color;
        c.fill();
    };

    // Update the shooting star's position and reset if it goes off-screen
    this.update = function() {
        this.x += this.dx;
        this.y += this.dy;

        // Check for screen boundaries and reset if necessary
        if (this.x + this.radius < 0 || this.x - this.radius > canvas.width ||
            this.y + this.radius < 0 || this.y - this.radius > canvas.height) {
            this.reset();
        } else {
            this.draw();
        }
    };

    // Reset the shooting star's position and properties
    this.reset = function() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.dx = (Math.random() - 0.5) * 10;
        this.dy = (Math.random() - 0.5) * 10;
        this.radius = (Math.random() * 2) + 1;
        // Retain the original color when resetting
        this.color = this.originalColor; 
    };
}

// Function to generate a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Create an array to hold the shooting stars
var shootingStars = [];

// Generate a random number of shooting stars between 3 and 10
var numStars = Math.floor(Math.random() * 3) + 1; // Random number between 3 and 10

for (let i = 0; i < numStars; i++) {
    // Create a shooting star with random properties and add it to the array
    const initialColor = getRandomColor(); // Get a random color once
    shootingStars.push(new ShootingStar(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() * 2) + 1,
        initialColor // Use the random color
    ));
}

// Animate the canvas
function animate() {
    requestAnimationFrame(animate);

    // Clear the canvas with a translucent rectangle
    c.fillStyle = 'rgba(11, 21, 56, 0.3)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw each shooting star
    shootingStars.forEach(star => star.update());
}

// Start the animation
animate();
