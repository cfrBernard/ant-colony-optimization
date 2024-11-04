import React, { useRef, useEffect, useState } from "react";

// Ant Class
class Ant {
    constructor(colonyX, colonyY) {
        this.x = colonyX; // Initial x position (position of the anthill)
        this.y = colonyY; // Initial y position (position of the anthill)
        this.angle = Math.random() * 2 * Math.PI; // Random angle for direction
        this.hasFood = false; // Indicates if the ant is carrying food
        this.speed = 0.001; // Initial speed
        this.maxSpeed = 0.001; // Maximum speed
    }

    update(foodSources, colonyX, colonyY, canvasWidth = 800, canvasHeight = 600) {
        // Cap the speed at maxSpeed
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }

        if (!this.hasFood) {
            // Searching for food
            for (const food of foodSources) {
                const distance = Math.hypot(this.x - food.x, this.y - food.y);
                if (distance < 5) {
                    this.hasFood = true; // The ant has found food
                    break; // Exit the loop if it finds food
                }
            }
        } else {
            // Returning to the colony
            const angleToColony = Math.atan2(colonyY - this.y, colonyX - this.x);
            this.angle = angleToColony; // Update angle towards the colony
        }

        // Move in the current direction based on speed
        this.x += Math.cos(this.angle) * this.speed; // Move the ant according to its speed
        this.y += Math.sin(this.angle) * this.speed; // Move the ant according to its speed

        // Random change of direction
        if (Math.random() < 0.002) { // 2% chance to change direction at each update
            this.angle += (Math.random() - 0.5) * Math.PI / 4; // Randomly change the angle
        }

        // Check the edges to keep ants within the canvas
        if (this.x <= 0 || this.x >= canvasWidth) {
            this.angle = Math.PI - this.angle; // Reverse horizontal direction
            this.x = Math.max(0, Math.min(this.x, canvasWidth)); // Keep the ant within bounds
        }
        if (this.y <= 0 || this.y >= canvasHeight) {
            this.angle = -this.angle; // Reverse vertical direction
            this.y = Math.max(0, Math.min(this.y, canvasHeight)); // Keep the ant within bounds
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.hasFood ? "green" : "black"; // Change color based on state
        ctx.beginPath(); // Start a new path
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2); // Draw the ant
        ctx.fill(); // Fill the ant with the current color
    }
}

function AntSimulation() {
    const canvasRef = useRef(null); // Reference for the canvas
    const [ants, setAnts] = useState([]); // State for the ants
    const [foodSources, setFoodSources] = useState(generateRandomFoodSources()); // State for food sources
    const colonyX = 400; // Center x position of the anthill (800 / 2)
    const colonyY = 300; // Fixed y position of the anthill (near the bottom of the canvas)

    // Function to generate random food sources with minimum distance
    function generateRandomFoodSources() {
        const numFoodSources = Math.floor(Math.random() * 2) + 3; // Random number of food points between 3 and 4
        const foodPoints = [];

        while (foodPoints.length < numFoodSources) {
            const foodX = Math.random() * 800; // Random x position
            const foodY = Math.random() * 600; // Random y position

            // Check if the new food point is at least a minimum distance from existing points
            const isFarEnough = foodPoints.every(food => {
                const distance = Math.hypot(foodX - food.x, foodY - food.y);
                return distance >= 200; // Minimum distance of 50 pixels
            });

            if (isFarEnough) {
                foodPoints.push({ x: foodX, y: foodY });
            }
        }

        return foodPoints;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setAnts((prevAnts) => {
                // Limit the number of ants to a maximum of 200
                if (prevAnts.length < 200) {
                    return [...prevAnts, new Ant(colonyX, colonyY)]; // Spawn ants at the anthill position
                }
                return prevAnts;
            });
        }, 100); // Spawn a new ant every 100 milliseconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []); // This useEffect runs only on the first render

    useEffect(() => {
        const canvas = canvasRef.current; // Get the canvas reference
        const ctx = canvas.getContext("2d"); // Get the 2D context for drawing

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas for the new frame

            // Draw food sources
            foodSources.forEach(food => {
                ctx.fillStyle = "red"; // Food color
                ctx.beginPath(); // Start a new path
                ctx.arc(food.x, food.y, 5, 0, Math.PI * 2); // Draw the food
                ctx.fill(); // Fill the food with the current color
            });

            // Update and draw each ant
            ants.forEach(ant => {
                ant.update(foodSources, colonyX, colonyY, 800, 600); // Update the state and position of ants
                ant.draw(ctx); // Draw each ant on the canvas
            });

            requestAnimationFrame(draw); // Request the next frame
        }

        draw(); // Start the drawing process
    }, [ants, foodSources]); // React to changes in ants and foodSources

    return <canvas ref={canvasRef} width="800" height="600" />; // Render the canvas element
}

export default AntSimulation; // Export the AntSimulation component
