import React, { useState, useEffect, useRef } from 'react';
import Ant from './Ant';
import Renderer from './Renderer';

// AntSimulation.js
const AntSimulation = () => {
    // State to keep track of the array of ant objects in the simulation
    const [ants, setAnts] = useState([]);
    // Reference to the canvas DOM element
    const canvasRef = useRef(null);
    // Reference for the animation frame, allowing control over the animation loop
    const animationRef = useRef(null); 
    // Reference to the Renderer instance, used for drawing on the canvas
    const rendererRef = useRef(null);
    // State to store the loaded sprite sheet image for ants
    const [spriteSheet, setSpriteSheet] = useState(null);

    // Maximum number of ants allowed in the simulation
    const MAX_ANTS = 500; // Adjust this value for the desired number of ants

    // Effect to load the sprite sheet image when the component mounts
    useEffect(() => {
        const loadSpriteSheet = async () => {
            const img = new Image();
            img.src = 'assets/img/sprites/ants.png'; // Path to the sprite sheet
            img.onload = () => setSpriteSheet(img); // Set sprite sheet in state after it loads
        };
        loadSpriteSheet();
    }, []);

    // Effect to handle spawning new ants periodically
    useEffect(() => {
        const spawnAnt = () => {
            // Check if the maximum number of ants has been reached
            if (ants.length < MAX_ANTS) {
                const newAnt = new Ant(400, 300); // Create a new ant at a specific position
                setAnts(prevAnts => [...prevAnts, newAnt]); // Add the new ant to the state
            }
        };

        // Set an interval to spawn ants at a specified rate
        const spawnInterval = setInterval(spawnAnt, 5);

        // Cleanup function to clear interval and animation frame when component unmounts
        return () => {
            clearInterval(spawnInterval);
            cancelAnimationFrame(animationRef.current);
        };
    }, [ants]); // Adding 'ants' as a dependency to monitor ant count

    // Effect to start the animation once the sprite sheet has loaded
    useEffect(() => {
        // Exit if sprite sheet is not loaded yet
        if (!spriteSheet) return; 

        // Get the canvas context for drawing
        const ctx = canvasRef.current.getContext('2d');
        // Initialize the Renderer instance, passing the canvas context and sprite sheet
        rendererRef.current = new Renderer(ctx, spriteSheet);

        // Animation function to update and render each ant
        const animate = () => {
            rendererRef.current.clear(1900, 800); // Clear the canvas each frame
            ants.forEach(ant => {
                ant.update(); // Update ant's position and state
                const { x, y, hasFood, state, frameIndex, angle } = ant.getPosition(); // Get ant properties
                rendererRef.current.drawAnt(x, y, hasFood, state, frameIndex, angle); // Draw ant using Renderer
            });
            animationRef.current = requestAnimationFrame(animate); // Loop the animation
        };

        animationRef.current = requestAnimationFrame(animate); // Start the animation
        return () => cancelAnimationFrame(animationRef.current); // Cleanup on unmount
    }, [ants, spriteSheet]); // Depend on ants and spriteSheet to re-run when they change

    return (
        <div>
            <h2>Ant Simulation</h2>
            <canvas ref={canvasRef} width={1900} height={800} /> {/* Canvas for rendering the simulation */}
        </div>
    );
};

export default AntSimulation;
