import domready from 'domready';

import Application from './application';

class Main {

    constructor() {

        this.bind();

        this.addEventListeners();

        this.start();

    }

    bind() {

    }

    addEventListeners() {

        window.addEventListener('resize', Application.resize);

    }

    start() {

        Application.start();

    }

}

domready(() => {

    new Main();

});
