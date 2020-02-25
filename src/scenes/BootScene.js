import makeAnimations from '../helpers/animations';

class BootScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'BootScene'
        });
    }
    preload() {
        const progress = this.add.graphics();
        // Register a load progress event to show a load bar
        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
        });

        // Register a load complete event to launch the title screen when all files are loaded
        this.load.on('complete', () => {
            // prepare all animations, defined in a separate file
            makeAnimations(this);
            progress.destroy();
            this.scene.start('GameScene');

        });

        this.load.image('sky', 'assets/images/sky.png');
        this.load.image('ground', 'assets/images/platform.png');
        this.load.image('star', 'assets/images/star.png');
        this.load.image('bullet', 'assets/images/bullet.png');

        this.load.image('bomb', 'assets/images/fireball.png');
        this.load.spritesheet('dude',
            'assets/images/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
        this.load.spritesheet('touch',
            'assets/images/touch.png',
            { frameWidth: 64, frameHeight: 64 }
        );
    }
}

export default BootScene;
