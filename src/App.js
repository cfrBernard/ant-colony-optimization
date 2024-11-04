import React, { useState, useEffect } from 'react';
import Canvas from './components/Canvas';
import Ant from './components/Ant';

const App = () => {
    const [ants, setAnts] = useState([]);

    useEffect(() => {
        const initialAnts = [];
        for (let i = 0; i < 50; i++) {
            initialAnts.push(new Ant(400, 300)); // Commencer au centre
        }
        setAnts(initialAnts);
    }, []);

    const draw = (ctx) => {
        ctx.clearRect(0, 0, 800, 600);
        ants.forEach(ant => {
            ant.update();
            ant.draw(ctx);
        });
    };

    return (
        <div>
            <h1>Simulation de Fourmis</h1>
            <Canvas draw={draw} />
        </div>
    );
};

export default App;

