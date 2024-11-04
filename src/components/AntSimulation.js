import React, { useRef, useEffect } from "react";

function AntSimulation() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Initialise la carte, les fourmis, et la nourriture ici plus tard

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Logique de dessin ici : fourmis, nourriture, etc.
            requestAnimationFrame(draw);
        }

        draw();
    }, []);

    return <canvas ref={canvasRef} width="800" height="600" />;
}

export default AntSimulation;
