import domready from 'domready';

import PixelCanvas from './canvas';

require('./stylesheets/main.scss');

class Main {

    constructor() {

        this.bind();

        this.domTrigger = document.getElementById('ps-trigger');

        this.addEventListeners();

        this.start();

    }

    bind() {

        this.resize = this.resize.bind(this);
        this.mouseOver = this.mouseOver.bind(this);
        this.mouseOut = this.mouseOut.bind(this);

    }

    addEventListeners() {

        window.addEventListener('resize',    this.resize);

        this.domTrigger.addEventListener('mouseover', this.mouseOver);
        this.domTrigger.addEventListener('mouseout',  this.mouseOut);

    }

    start() {

        PixelCanvas.start();

    }

    resize() {

        PixelCanvas.resize();

    }

    mouseOver() {

        PixelCanvas.mouseOver();

    }

    mouseOut() {

        PixelCanvas.mouseOut();

    }

}

domready(() => {

    new Main();

});
