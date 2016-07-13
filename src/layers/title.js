import {
    CANVAS_WIDTH, CANVAS_HEIGHT, VIDEO_SPEED, VIDEO_LOOP, BACKGROUND_PATH
} from '../core/config'

class TitleLayer {

    constructor() {

        this.text = new PIXI.Text("EXPERIMENT", {
            font: "20pt helvetica",
            fill: "white",
            align: "center"
        });

        this.texture = PIXI.Texture.fromImage(BACKGROUND_PATH);

        this.sprite = this.text;
        this.sprite.width = CANVAS_WIDTH;
        this.sprite.height = CANVAS_HEIGHT;

        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;

        this.sprite.x = 0.5 * CANVAS_WIDTH;
        this.sprite.y = 0.5 * CANVAS_HEIGHT;

        this.createShader();

    }

    createShader() {

        this.uniforms = {
            iResolution: {
                type: 'v2',
                value: {
                    x: CANVAS_WIDTH,
                    y: CANVAS_HEIGHT
                }
            },
            uSampler: {
                type: 't',
                value: this.texture
            },
            uText: {
                type: 't',
                value: this.text.baseTexture
            }
        };

        this.shader = new PIXI.AbstractFilter('', require('../shaders/title.glsl'), this.uniforms);

        this.applyFilters();

    }

    applyFilters() {

        this.greyFilter = new PIXI.filters.GrayFilter();
        this.greyFilter.gray = 1.0;

        this.sprite.filters = [this.shader, this.greyFilter];

    }

    animate(delta) {

    }

}

export default (new TitleLayer());
