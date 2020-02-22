import Enemy from '../sprites/DemoSprite';
class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        // this.load.scenePlugin('animatedTiles', AnimatedTiles, 'animatedTiles', 'animatedTiles');
    }

    create() {

        this.add.sprite(0,0,'background-clouds');
        // CREATE MARIO!!!
        this.mario = new Enemy({
            scene: this,
            key: 'touch',
            x: 16 * 6,
            y: this.sys.game.config.height - 48 - 48
        });
    }
}

export default GameScene;
