import { AntStates, AntAnimations } from './AntStates';

class Ant {
    constructor(mapData, grid) {
        this.mapData = mapData;
        this.grid = grid;
        this.hasFood = false;
        this.state = AntStates.IDLE;
        this.frameIndex = 0;
        this.frameTimer = 0;
        this.animation = AntAnimations[this.state];
        
        this.homeTiles = this.extractTiles("isHome");
        this.foodTiles = this.extractTiles("isFood");
        this.spawnAtHome();
    }

    extractTiles(type) {
        const tiles = [];
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
                if (this.grid[y][x][type]) {
                    tiles.push({ x, y });
                }
            }
        }
        return tiles;
    }

    spawnAtHome() {
        if (this.homeTiles.length > 0) {
    
            const { x, y } = this.homeTiles[0];
            
            const centerX = (x * this.mapData.tilewidth) + (this.mapData.tilewidth / 2);
            const centerY = (y * this.mapData.tileheight) + (this.mapData.tileheight / 2);
    
            this.x = centerX 
            this.y = centerY 
        } else {
            console.log("Aucune position 'Home' trouvée sur la carte !");
        }
    }

    isWallTile(x, y) {
        return this.grid[y] && this.grid[y][x] && this.grid[y][x].isWall;
    }

    isFoodTile(x, y) {
        return this.grid[y] && this.grid[y][x] && this.grid[y][x].isFood;
    }

    isHomeTile(x, y) {
        return this.grid[y] && this.grid[y][x] && this.grid[y][x].isHome;
    }

    attemptMove(newX, newY) {
        const tileX = Math.floor(newX / this.mapData.tilewidth);
        const tileY = Math.floor(newY / this.mapData.tileheight);

        if (!this.isWallTile(tileX, tileY)) {
            this.x = newX;
            this.y = newY;
        } else {
            console.log("Collision détectée avec un mur !");
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
        } else {
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
            frameIndex: this.frameIndex
        };
    }

    setDestination(destination) {
        // D'abord vérifier si la destination est valide (Food ou Home)
        const tileX = Math.floor(destination.x / this.mapData.tilewidth);
        const tileY = Math.floor(destination.y / this.mapData.tileheight);

        if (this.isFoodTile(tileX, tileY)) {
            console.log("Destination définie sur la nourriture");
            // Gérer les déplacements vers la nourriture ici
        } else if (this.isHomeTile(tileX, tileY)) {
            console.log("Destination définie sur la maison");
            // Gérer les déplacements vers la maison ici
        } else {
            console.log("Destination invalide");
        }
    }

    // Gérer le déplacement vers une destination avec la logique A* ou autre
    // À faire plus tard avec la grille
}

export default Ant;
