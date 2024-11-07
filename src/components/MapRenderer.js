class MapRenderer {
    constructor(ctx, mapTileset, tileWidth, tileHeight) {
        this.ctx = ctx;
        this.mapTileset = mapTileset;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
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

    renderMapToCache(mapData) {
        this.offscreenCanvas.width = mapData.width * this.tileWidth;
        this.offscreenCanvas.height = mapData.height * this.tileHeight;
        this.drawMap(mapData);
    }
}

export default MapRenderer;
