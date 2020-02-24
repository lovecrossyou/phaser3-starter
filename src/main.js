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
}