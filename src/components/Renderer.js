import { AntStates } from './AntStates';

// Renderer.js
class Renderer {
    constructor(ctx, spriteSheet, tileWidth, tileHeight, mapTileset) {
        this.ctx = ctx;
        this.spriteSheet = spriteSheet;
        this.mapTileset = mapTileset;
        this.frameWidth = 124;
        this.frameHeight = 137;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.scaleFactor = 0.25;
        this.offscreenCanvas = document.createElement('canvas');
        this.offscreenCtx = this.offscreenCanvas.getContext('2d');
    }

    drawTile(x, y, tileId) {
        const tilesetX = (tileId % (this.mapTileset.width / this.tileWidth)) * this.tileWidth;
        const tilesetY = Math.floor(tileId / (this.mapTileset.width / this.tileWidth)) * this.tileHeight;

        this.offscreenCtx.drawImage(
            this.mapTileset,
            tilesetX, tilesetY, this.tileWidth, this.tileHeight, 
            x, y, this.tileWidth, this.tileHeight
        );
    }

    drawMap(mapData) {
        mapData.layers.forEach(layer => {
            if (layer.type === "tilelayer") {
                layer.data.forEach((tileId, index) => {
                    if (tileId !== 0) {
                        const x = (index % mapData.width) * this.tileWidth;
                        const y = Math.floor(index / mapData.width) * this.tileHeight;
                        this.drawTile(x, y, tileId - 1);
                    }
                });
            }
        });
    }

    clear(width, height) {
        this.ctx.clearRect(0, 0, width, height);
    }

    drawAnt(x, y, hasFood, state, frameIndex, angle) {
        let row;

        switch (state) {
            case AntStates.DEATH:
                row = 0;
                break;
            case AntStates.IDLE:
                row = 1;
                break;
            case AntStates.IDLE_FOOD:
                row = 2;
                break;
            case AntStates.WALK:
                row = 3;
                break;
            case AntStates.WALK_FOOD:
                row = 4;
                break;
            default:
                row = 1;
                break;
        }

        const sx = frameIndex * this.frameWidth;
        const sy = row * this.frameHeight;

        const scaledWidth = this.frameWidth * this.scaleFactor;
        const scaledHeight = this.frameHeight * this.scaleFactor;

        this.ctx.save();
        this.ctx.translate(x, y);
        const rotationOffset = Math.PI / 2;
        this.ctx.rotate(angle + rotationOffset);
        this.ctx.drawImage(
            this.spriteSheet,
            sx, sy,
            this.frameWidth, this.frameHeight,
            -scaledWidth / 2, -scaledHeight / 2,
            scaledWidth, scaledHeight
        );
        this.ctx.restore();
    }

    renderMapToCache(mapData) {
        this.offscreenCanvas.width = mapData.width * this.tileWidth;
        this.offscreenCanvas.height = mapData.height * this.tileHeight;
        this.drawMap(mapData);
    }
}

export default Renderer;
