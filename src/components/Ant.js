class Ant {
    constructor(colonyX, colonyY) {
        this.x = colonyX;
        this.y = colonyY;
        this.angle = Math.random() * 2 * Math.PI;
        this.hasFood = false;
    }

    move() {
        // Déplacement à vitesse constante
        const speed = 2; // Ajuste la vitesse si nécessaire
        this.x += Math.cos(this.angle) * speed;
        this.y += Math.sin(this.angle) * speed;
    }

    update() {
        this.move();
    }

    draw(ctx) {
        ctx.fillStyle = this.hasFood ? "green" : "black";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

export default Ant;
