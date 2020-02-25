import 'phaser';
import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';

const config = {
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 800
            },
            debug: false
        }
    },
};

class Game extends Phaser.Game {
    constructor() {
        super(config);
        this.scene.add('BootScene', BootScene);
        this.scene.add('GameScene', GameScene);

        this.scene.start('BootScene');
    }
}

window.onload = function () {
    window.game = new Game();
    window.focus();
    resize();
    window.addEventListener('resize', resize, false);
    function resize() {
        var canvas = document.querySelector('canvas');
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var windowRatio = windowWidth / windowHeight;
        var gameRatio = config.width / config.height;
        if (windowRatio < gameRatio) {
            // canvas.style.width = windowWidth + 'px';
            canvas.style.width = '100%';
            canvas.style.height = (windowWidth / gameRatio) + 'px';
        } else {
            // canvas.style.width = (windowHeight * gameRatio) + 'px';
            canvas.style.width = '100%';
            // canvas.style.height = '100%';
            canvas.style.height = windowHeight + 'px';
        }
    }
}