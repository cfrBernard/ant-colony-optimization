# Ant Simulation

A simple graphical simulation of ants using React and an HTML5 canvas. This project was designed as a learning exercise to explore concepts like simulation, sprite animation, and canvas interaction.

## Features

- **Basic Ant Simulation:**
  - Ants move on a map based on their state (`IDLE`, `WALK`, etc.).
  - Interaction with the map: home, food, walls.
  - Sprite animations based on ant states.

- **Graphical Rendering:**
  - Map generated from a tileset and a JSON structure (Tiled Map Editor).
  - Ants rendered using a sprite sheet and a canvas.
 
## Project Goals

This project aimed to:
- Learn how to manipulate a canvas within a React environment.
- Work with tilesets and sprite sheets to manage animations.
- Explore basic simulation concepts like pathfinding and state-driven behavior.

### Current Limitations
- Pathfinding logic (e.g., A*) is not yet implemented.
- The project is in an early stage and offers only basic functionality.
- No advanced AI or complex behavior is implemented.

## Installation and Running

### Prerequisites
- Node.js and npm installed on your machine.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/ant-simulation.git
   cd ant-simulation

2. Istall and start dependencies:
   ```bash
   npm install
   npm start

3. Open the application in your browser at http://localhost:3000.
   
## Code Structure
- Ant.js: Handles ant logic (states, movement, etc.).
- AntRenderer.js: Renders ants on the canvas based on their state.
- MapRenderer.js: Renders the map using a tileset and map data in JSON format.
- AntSimulation.js: Main React component orchestrating the simulation.

## Resources
### Tileset and sprites:
- assets/maps/AntMap.json: Map structure generated with Tiled Map Editor.
- assets/img/sprites/ants.png: Sprite sheet for ant animations.
- assets/img/tileset/MainLev2.0.png: Tileset used for the map.

Future Development
While this project is not a priority at the moment, here are some ideas for improvement:

- Implement a pathfinding algorithm like A*.
- Add more states and behaviors for the ants (e.g., exploration, returning home with food, etc.).
- Refactor the code to make it more modular and easier to extend.

## License
This project is available under the MIT License. Feel free to use, modify, and distribute it.
