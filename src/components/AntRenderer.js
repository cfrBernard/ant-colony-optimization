import { AntStates } from './AntStates';

class AntRenderer {
    constructor(ctx, spriteSheet, frameWidth, frameHeight, scaleFactor = 0.25) {
        this.ctx = ctx;
        this.spriteSheet = spriteSheet;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.scaleFactor = scaleFactor;
    }

    drawAnt(x, y, hasFood, state, frameIndex) {
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
        this.ctx.drawImage(
            this.spriteSheet,
            sx, sy,
            this.frameWidth, this.frameHeight,
            -scaledWidth / 2, -scaledHeight / 2,
            scaledWidth, scaledHeight
        );
        this.ctx.restore();
    }
}

export default AntRenderer;

