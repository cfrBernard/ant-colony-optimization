// src/App.js
import React, { useState } from "react";
import AntSimulation from "./components/AntSimulation";

function App() {
    const [isRunning, setIsRunning] = useState(true);

    const toggleSimulation = () => setIsRunning(!isRunning);

    return (
        <div className="App">
            <h1>Ant Simulation</h1>
            <button onClick={toggleSimulation}>
                {isRunning ? "Pause" : "Démarrer"}
            </button>
            {isRunning && <AntSimulation />}
        </div>
    );
}

export default App;
