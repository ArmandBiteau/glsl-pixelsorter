import {
    CANVAS_WIDTH, CANVAS_HEIGHT, VIDEO_SPEED, VIDEO_LOOP, BACKGROUND_PATH
} from '../core/config'

class VideoLayer {

    constructor() {

        // this.texture = PIXI.Texture.fromVideo('assets/particles.mp4');

        this.texture = PIXI.Texture.fromImage(BACKGROUND_PATH);

        this.displaceTexture = PIXI.Texture.fromImage('assets/sorter.jpg');

        this.sorterTexture = PIXI.Texture.fromImage('assets/BxYkOZWIcAEzjjf.png');

        this.sprite = new PIXI.Sprite(this.texture);
        this.sprite.width = CANVAS_WIDTH;
        this.sprite.height = CANVAS_HEIGHT;

        this.domElement = this.texture.baseTexture.source;
        this.domElement.loop = VIDEO_LOOP;
        this.domElement.playbackRate = VIDEO_SPEED;

        this.createShader();

    }

    createShader() {

        this.uniforms = {
            iResolution: {
                type: 'v3',
                value: {
                    x: CANVAS_WIDTH,
                    y: CANVAS_HEIGHT,
                    z: 0
                }
            },
            iTime: {
                type: 'f',
                value: 0.0
            },
            uSampler: {
                type: 't',
                value: this.texture
            },
            uDisplacement: {
                type: 't',
                value: this.displaceTexture
            },
            uSorter: {
                type: 't',
                value: this.sorterTexture
            },
            uInvert : {
                type: 'f',
                value: 0.0
            }
        };

        this.shader = new PIXI.AbstractFilter('', require('../shaders/glass.glsl'), this.uniforms);

        this.applyFilters();

    }

    applyFilters() {

        this.greyFilter = new PIXI.filters.GrayFilter();
        this.greyFilter.gray = 1.0;

        this.sprite.filters = [this.shader, this.greyFilter];
        // this.sprite.filters = [this.shader];

    }

    glitch() {

        this.uniforms.iTime.value = 0;

    }

    unGlitch() {

        this.uniforms.iTime.value = 1;

    }

    animate(delta) {

        this.uniforms.iTime.value += delta;

    }

}

export default (new VideoLayer());
