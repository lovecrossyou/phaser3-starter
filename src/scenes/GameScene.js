import Player from '../sprites/Player';
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
        this.add.image(400, 300, 'sky');
        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        this.player = new Player({
            scene: this,
            key: 'dude',
            x: 16 * 6,
            y: this.sys.game.config.height - 48 - 48
        })
    }
}

export default GameScene;
