import { AntStates, AntAnimations } from './AntStates';

// Ant.js
class Ant {
    constructor(mapData) {
        this.mapData = mapData;
        this.angle = Math.random() * 2 * Math.PI;
        this.hasFood = false;
        this.state = AntStates.WALK;
        this.frameIndex = 0;
        this.frameTimer = 0;
        this.animation = AntAnimations[this.state];
        this.spawnAtHome();
    }

    spawnAtHome() {
        const homeTiles = [];
    
        const homeLayer = this.mapData.layers.find(layer => layer.name === "Home");
        if (homeLayer) {
            for (let y = 0; y < homeLayer.height; y++) {
                for (let x = 0; x < homeLayer.width; x++) {
                    const tileId = homeLayer.data[y * homeLayer.width + x];
                    if (tileId !== 0) {
                        homeTiles.push({ x, y });
                    }
                }
            }
        }

        if (homeTiles.length > 0) {
            const randomIndex = Math.floor(Math.random() * homeTiles.length);
            const { x, y } = homeTiles[randomIndex];
            this.x = x * this.mapData.tilewidth;
            this.y = y * this.mapData.tileheight;
        } else {
            console.log("no 'Home' found !");
        }
    }

    setState(state) {
        if (this.state !== state) {
            this.state = state;
            this.frameIndex = 0; 
            this.animation = AntAnimations[this.state];
            this.frameTimer = 0; 
        }
    }

    update() {
        if (this.state === AntStates.DEATH) {
            const { frameCount } = this.animation;
            if (this.frameIndex < frameCount - 1) {
                this.frameTimer++;
                if (this.frameTimer >= this.animation.frameDelay) {
                    this.frameIndex++;
                    this.frameTimer = 0;
                }
            } else {
                this.frameIndex = frameCount - 1;
                return;
            }
        } else if (this.state !== AntStates.IDLE && this.state !== AntStates.IDLE_FOOD) {
            this.frameTimer++;
            if (this.frameTimer >= this.animation.frameDelay) {
                this.frameIndex = (this.frameIndex + 1) % this.animation.frameCount;
                this.frameTimer = 0;
            }
        }
    }

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
