import React, { useRef, useEffect } from 'react';

const Canvas = ({ draw }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const render = () => {
            draw(context);
            requestAnimationFrame(render);
        };
        render();
    }, [draw]);

    return <canvas ref={canvasRef} width={800} height={600} />;
};

export default Canvas;
