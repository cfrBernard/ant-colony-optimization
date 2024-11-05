import AntStates from './AntStates';

class Renderer {
    constructor(ctx, spriteSheet) {
        // Store the drawing context and sprite sheet for rendering ants
        this.ctx = ctx;
        this.spriteSheet = spriteSheet; // Reference to the sprite sheet image
        this.frameWidth = 124; // Width of each frame in the sprite sheet (adjust as needed)
        this.frameHeight = 137; // Height of each frame in the sprite sheet (adjust as needed)
        this.scaleFactor = 0.25; // Default scaling factor for resizing ants
    }

    // Method to adjust the scale of rendered ants
    setScale(scale) {
        this.scaleFactor = scale;
    }

    // Clears the canvas within the specified width and height
    clear(width, height) {
        this.ctx.clearRect(0, 0, width, height);
    }

    // Draws an ant at a specified position with a specific state and orientation
    drawAnt(x, y, hasFood, state, frameIndex, angle) {
        let row;
    
        // Determine the row in the sprite sheet based on the ant's state
        switch (state) {
            case AntStates.DEATH:
                row = 0; // Row 1 for death
                break;
            case AntStates.IDLE:
                row = 1; // Row 2 for idle
                break;
            case AntStates.IDLE_FOOD:
                row = 2; // Row 3 for idle with food
                break;
            case AntStates.WALK:
                row = 3; // Row 4 for walking
                break;
            case AntStates.WALK_FOOD:
                row = 4; // Row 5 for walking with food
                break;
            default:
                row = 1; // Default row if state is unrecognized
                break;
        }
    
        // Calculate x-coordinate in the sprite sheet based on frame index
        const sx = frameIndex * this.frameWidth;
        // Calculate y-coordinate based on determined row
        const sy = row * this.frameHeight;
    
        // Calculate scaled dimensions for rendering the ant
        const scaledWidth = this.frameWidth * this.scaleFactor;
        const scaledHeight = this.frameHeight * this.scaleFactor;
    
        // Save the current canvas context state to prevent cumulative transformations
        this.ctx.save();
    
        // Translate context to the center of the ant's position
        this.ctx.translate(x, y);
    
        // Rotation offset to align the sprite correctly with movement direction
        const rotationOffset = Math.PI / 2; // Adjust this offset based on sprite orientation
        this.ctx.rotate(angle + rotationOffset);
    
        // Draw the ant's frame from the sprite sheet with scaling and rotation adjustments
        this.ctx.drawImage(
            this.spriteSheet,
            sx, sy, // Source x and y from sprite sheet
            this.frameWidth, this.frameHeight, // Source frame dimensions
            -scaledWidth / 2, -scaledHeight / 2, // Center the image on x and y
            scaledWidth, scaledHeight // Apply scaled width and height
        );
    
        // Restore the canvas context to its original state
        this.ctx.restore();
    }
}

export default Renderer;
