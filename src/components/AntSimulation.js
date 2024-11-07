import React, { useState, useEffect, useRef } from 'react';
import MapRenderer from './MapRenderer';
import AntRenderer from './AntRenderer';
import Ant from './Ant';

const MAX_ANTS = 1;

const AntSimulation = () => {
    const canvasRef = useRef(null);
    const [mapData, setMapData] = useState(null);
    const [spriteSheet, setSpriteSheet] = useState(null);
    const [ants, setAnts] = useState([]);
    const mapRendererRef = useRef(null);
    const antRendererRef = useRef(null);

    const createGridFromMapData = (mapData) => {
        const grid = Array.from({ length: mapData.height }, () =>
            Array.from({ length: mapData.width }, () => ({
                isWall: false,
                isFood: false,
                isHome: false,
            }))
        );

        const layers = { Home: 'isHome', Food: 'isFood', Walls: 'isWall' };

        for (const [layerName, property] of Object.entries(layers)) {
            const layer = mapData.layers.find(layer => layer.name === layerName);
            if (layer) {
                for (let y = 0; y < layer.height; y++) {
                    for (let x = 0; x < layer.width; x++) {
                        const tileId = layer.data[y * layer.width + x];
                        if (tileId !== 0) {
                            grid[y][x][property] = true;
                        }
                    }
                }
            }
        }

        return grid;
    };

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
            mapRendererRef.current = new MapRenderer(ctx, mapTileset, 32, 32);
            antRendererRef.current = new AntRenderer(ctx, spriteSheet, 124, 137);

            mapRendererRef.current.renderMapToCache(mapData);

            const grid = createGridFromMapData(mapData);
            const initialAnts = [];
            for (let i = 0; i < MAX_ANTS; i++) {
                initialAnts.push(new Ant(mapData, grid));
            }
            setAnts(initialAnts);
        };
    }, [spriteSheet, mapData]);

    useEffect(() => {
        if (!ants.length || !spriteSheet || !mapData) return;

        const animate = () => {
            const ctx = canvasRef.current.getContext('2d');

            ctx.drawImage(mapRendererRef.current.offscreenCanvas, 0, 0);

            ants.forEach(ant => {
                ant.update();
                const { x, y, hasFood, state, frameIndex,} = ant.getPosition();
                antRendererRef.current.drawAnt(x, y, hasFood, state, frameIndex,);
            });

            requestAnimationFrame(animate);
        };

        animate();
    }, [ants, spriteSheet, mapData]);

    return <canvas ref={canvasRef} width={1856} height={928} />;
};

export default AntSimulation;
