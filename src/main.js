import domready from 'domready';

import TweenMax from 'gsap';

import PixelCanvas from './canvas';

require('./stylesheets/main.scss');

class Main {

    constructor() {

        this.bind();

        this.domTrigger = document.getElementById('ps-trigger');
        this.domTitle = document.getElementById('ps-heading');

        this.domTitle.innerHTML = this.split(this.domTitle);

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

        this.domTitle.style.display = 'block';

        PixelCanvas.start();

    }

    // utils

    split(domElement) {

        let splitedString = '';
        domElement.innerText.split('').map((char, index) => {

            splitedString += '<div class="letter letter-'+index+'">'+char+'</div>';
            return char;

        });
        return splitedString;

    }

    // events

    resize() {

        PixelCanvas.resize();

    }

    mouseOver() {

        PixelCanvas.mouseOver();

        this.explode();

    }

    mouseOut() {

        PixelCanvas.mouseOut();

        this.implode();

    }


    // animation

    explode() {

        for (let i = 0; i < this.domTitle.innerText.length; i++) {

            let rand = 75 - Math.random() * 150;

            TweenMax.to('.ps__heading .letter-'+i, 0.3, {
                css: {
                    opacity: 0.3,
                    letterSpacing: '0.7em',
                    transform: 'translateY('+rand+'px)'
                },
                ease: Power3.easeOut
            });

        }

    }

    implode() {

        for (let i = 0; i < this.domTitle.innerText.length; i++) {

            TweenMax.to('.ps__heading .letter-'+i, 0.3, {
                css: {
                    opacity: 1.0,
                    letterSpacing: '0.5em',
                    transform: 'translateY(0px)'
                },
                ease: Power3.easeOut
            });

        }

    }

}

domready(() => {

    new Main();

});
