// AntSimulation.js
import React, { useState, useEffect, useRef } from 'react';
import Renderer from './Renderer';
import Ant from './Ant';

const AntSimulation = () => {
    const canvasRef = useRef(null);
    const rendererRef = useRef(null);
    const [mapData, setMapData] = useState(null);
    const [spriteSheet, setSpriteSheet] = useState(null);
    const [ants, setAnts] = useState([]);

    useEffect(() => {
        const img = new Image();
        img.src = 'assets/img/sprites/ants.png';
        img.onload = () => setSpriteSheet(img);
    }, []);

    useEffect(() => {
        const loadMapData = async () => {
            const response = await fetch('assets/maps/AntMap.json');
            const data = await response.json();
            setMapData(data);
        };
        loadMapData();
    }, []);

    useEffect(() => {
        if (!spriteSheet || !mapData) return;

        const ctx = canvasRef.current.getContext('2d');
        const mapTileset = new Image();
        mapTileset.src = 'assets/img/tileset/MainLev2.0.png';

        mapTileset.onload = () => {
            rendererRef.current = new Renderer(ctx, spriteSheet, 32, 32, mapTileset);
            rendererRef.current.renderMapToCache(mapData);
            const initialAnts = [];
            for (let i = 0; i < 10; i++) {
                initialAnts.push(new Ant(mapData));  
            }
            setAnts(initialAnts);
        };
    }, [spriteSheet, mapData]);

    useEffect(() => {
        if (!ants.length || !spriteSheet || !mapData) return;

        const animate = () => {
            rendererRef.current.clear(1856, 928);
            rendererRef.current.ctx.drawImage(rendererRef.current.offscreenCanvas, 0, 0);

            ants.forEach(ant => {
                ant.update();
                const { x, y, hasFood, state, frameIndex } = ant.getPosition();
                rendererRef.current.drawAnt(x, y, hasFood, state, frameIndex);
            });

            requestAnimationFrame(animate);
        };

        animate();
    }, [ants, spriteSheet, mapData]);

    return <canvas ref={canvasRef} width={1856} height={928} />;
};

export default AntSimulation;