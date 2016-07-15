import _ from 'lodash';

import {
    CANVAS_WIDTH, CANVAS_HEIGHT, FACE_BASE_SCALE, FACE_FINAL_SCALE
} from './core/config'

import VideoLayer from './layers/video';
import TitleLayer from './layers/title';

class PixelCanvas {

    constructor() {

        this.isRunning = true;

        this._clockDelta = 0.0;
        this._clockSpeed = 0.1;

        this.bind();

        this.renderer = new PIXI.autoDetectRenderer(CANVAS_WIDTH, CANVAS_HEIGHT);
        this.renderer.autoResize = true;
        document.body.appendChild(this.renderer.view);

        this.stage = new PIXI.Container();

        this.setlayers();

        this.addEventListener();

    }

    bind() {
        this.animate = this.animate.bind(this);
        this.stop = this.stop.bind(this);

    }

    addEventListener() {

    }

    setlayers() {
        this.video = VideoLayer;
        this.stage.addChild(this.video.sprite);

        this.title = TitleLayer;
        // this.stage.addChild(this.title.sprite);

    }

    start() {
        this.animate();

    }

    stop() {
        this.isRunning = false;

    }

    animate() {

        if (this.isRunning) {

            requestAnimationFrame(this.animate);

            this.video.animate(this._clockDelta);

            this.title.animate(this._clockDelta);

            this.renderer.render(this.stage);

        }

    }

    mouseOver() {

        this._clockDelta = this._clockSpeed;
        this.video.glitch();

    }

    mouseOut() {

        this._clockDelta = -this._clockSpeed;
        this.video.unGlitch();

    }

    resize(w, h) {

        this.renderer.view.style.width = w + "px";
        this.renderer.view.style.height = h + "px";

    }

}

PixelCanvas.lodashFunction = function(myArray) {
  return _.reduce(myArray, function(total, next) {
    return total + next;
  });
}

export default (new PixelCanvas());
