class Pathfinder {
    constructor(mapData) {
        this.mapData = mapData;
        this.grid = this.createGrid();
    }

    // Fonction heuristique pour estimer la distance restante (ex: distance de Manhattan)
    heuristic(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    // Crée une grille de nœuds avec les informations de chaque tuile (si c'est un mur ou non)
    createGrid() {
        const grid = [];
        for (let y = 0; y < this.mapData.height; y++) {
            const row = [];
            for (let x = 0; x < this.mapData.width; x++) {
                const tileId = this.mapData.layers[0].data[y * this.mapData.width + x];
                row.push({
                    x, y,
                    isWall: tileId !== 0 // 0 signifie une tuile vide, tout autre valeur est un mur
                });
            }
            grid.push(row);
        }
        return grid;
    }

    // Fonction pour trouver le chemin via l'algorithme A*
    findPath(start, goal) {
        let open = [start];
        let closed = new Set();

        start.g = 0;
        start.h = this.heuristic(start, goal);
        start.f = start.g + start.h;
        start.parent = null;

        while (open.length > 0) {
            let current = open.reduce((a, b) => (a.f < b.f ? a : b)); // Nœud avec le coût f le plus bas

            if (current.x === goal.x && current.y === goal.y) {
                let path = [];
                while (current) {
                    path.push({ x: current.x, y: current.y });
                    current = current.parent;
                }
                return path.reverse(); // On renvoie le chemin du début à la fin
            }

            open = open.filter(node => node !== current);
            closed.add(`${current.x},${current.y}`);

            // Exploration des voisins du nœud actuel
            const neighbors = this.getNeighbors(current);
            neighbors.forEach(neighbor => {
                if (closed.has(`${neighbor.x},${neighbor.y}`) || neighbor.isWall) return;

                let tentativeG = current.g + 1; // Déplacement horizontal/vertical = 1

                if (!open.includes(neighbor) || tentativeG < neighbor.g) {
                    neighbor.g = tentativeG;
                    neighbor.h = this.heuristic(neighbor, goal);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.parent = current;

                    if (!open.includes(neighbor)) open.push(neighbor);
                }
            });
        }
        return []; // Aucun chemin trouvé
    }

    // Récupère les voisins d'un nœud (les tuiles adjacentes)
    getNeighbors(node) {
        const directions = [
            { x: -1, y: 0 }, // gauche
            { x: 1, y: 0 },  // droite
            { x: 0, y: -1 }, // haut
            { x: 0, y: 1 }   // bas
        ];

        let neighbors = [];
        directions.forEach(dir => {
            const nx = node.x + dir.x;
            const ny = node.y + dir.y;

            if (nx >= 0 && ny >= 0 && nx < this.mapData.width && ny < this.mapData.height) {
                neighbors.push(this.grid[ny][nx]);
            }
        });

        return neighbors;
    }
}