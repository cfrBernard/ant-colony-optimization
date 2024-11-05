import AntStates from './AntStates';

class Ant {
    constructor(colonyX, colonyY) {
        // Initialize the ant's position based on the colony's coordinates
        this.x = colonyX; 
        this.y = colonyY;
        // Set a random initial angle for the ant's movement
        this.angle = Math.random() * 2 * Math.PI;
        this.hasFood = false; // Initially, the ant does not have food
        this.speed = 0.5; // Speed of the ant's movement
        this.state = AntStates.IDLE; // Default state of the ant
        this.frameIndex = 0; // Index to keep track of the current animation frame
        // Frame counts for different states to manage animations
        this.frameCount = {
            [AntStates.DEATH]: 8,
            [AntStates.IDLE]: 8,
            [AntStates.IDLE_FOOD]: 8,
            [AntStates.WALK]: 8,
            [AntStates.WALK_FOOD]: 8
        };
        this.frameDelay = 5; // Delay between animation frames
        this.frameTimer = 0; // Timer to manage the delay for frame updates
    }

    // Method to handle the movement of the ant
    move() {
        const maxTurnAngle = Math.PI / 30; // Maximum angle the ant can turn each step
        const randomTurn = (Math.random() - 0.5) * maxTurnAngle; // Randomize the turn angle
        
        // Gradually adjust the angle to avoid abrupt direction changes
        this.angle += randomTurn;
    
        // Update the ant's position based on its angle and speed
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        // Update the ant's state based on whether it has food
        this.state = this.hasFood ? AntStates.WALK_FOOD : AntStates.WALK;
    }

    // Update method to handle the ant's logic and animation
    update() {
        // Logic for changing the ant's state
        if (this.state !== AntStates.DEATH) {
            if (Math.random() < 0.01) {
                this.state = AntStates.IDLE; // Randomly switch to the idle state
            } else if (Math.random() < 0.01) {
                this.state = AntStates.WALK; // Switch back to walking state
            }
        }
    
        // Call move method only if the ant is in WALK or WALK_FOOD state
        if (this.state === AntStates.WALK || this.state === AntStates.WALK_FOOD) {
            this.move();
        }
    
        // Manage the animation frame updates
        this.frameTimer++;
        // Change the frame index based on the frame delay
        if (this.frameTimer >= this.frameDelay) {
            this.frameIndex = (this.frameIndex + 1) % this.frameCount[this.state]; // Loop through frames
            this.frameTimer = 0; // Reset the timer
        }
    }

    // Method to retrieve the current position and state of the ant
    getPosition() {
        return { 
            x: this.x, 
            y: this.y, 
            hasFood: this.hasFood, 
            state: this.state, 
            frameIndex: this.frameIndex, 
            angle: this.angle 
        };
    }
}

export default Ant;
