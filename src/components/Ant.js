import { AntStates, AntAnimations } from './AntStates';

// Ant.js
class Ant {
    constructor(mapData, grid) {
        this.mapData = mapData;
        this.grid = grid;
        this.angle = Math.random() * 2 * Math.PI;
        this.hasFood = false;
        this.state = AntStates.IDLE;
        this.frameIndex = 0;
        this.frameTimer = 0;
        this.animation = AntAnimations[this.state];

        this.homeTiles = this.extractTiles("isHome");
        this.foodTiles = this.extractTiles("isFood");
        this.spawnAtHome();
    }

    // Extraire les tuiles de type donné depuis la grille
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
            // Prenons la première cellule "Home"
            const { x, y } = this.homeTiles[0];
            
            // Position au centre de la cellule Home
            const centerX = (x * this.mapData.tilewidth) + (this.mapData.tilewidth / 2);
            const centerY = (y * this.mapData.tileheight) + (this.mapData.tileheight / 2);
    
            // Positionne la fourmi au centre avec un léger décalage
            const offsetX = Math.random() * this.mapData.tilewidth * 0.5 - this.mapData.tilewidth * 0.25;
            const offsetY = Math.random() * this.mapData.tileheight * 0.5 - this.mapData.tileheight * 0.25;
    
            this.x = centerX + offsetX;
            this.y = centerY + offsetY;
        } else {
            console.log("Aucune position 'Home' trouvée sur la carte !");
        }
    }
    
    

    // Vérifie si une tuile est un mur
    isWallTile(x, y) {
        return this.grid[y] && this.grid[y][x] && this.grid[y][x].isWall;
    }

    // Vérifie si une tuile est de la nourriture
    isFoodTile(x, y) {
        return this.grid[y] && this.grid[y][x] && this.grid[y][x].isFood;
    }

    // Vérifie si une tuile est une maison (zone de spawn)
    isHomeTile(x, y) {
        return this.grid[y] && this.grid[y][x] && this.grid[y][x].isHome;
    }

    // Fonction pour essayer de déplacer la fourmi
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

    // Fonction d'update de l'animation
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

    // Fonction pour obtenir la position de la fourmi
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

    // Nouvelle fonction pour définir une destination
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