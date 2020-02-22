export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        // this.acceleration = 600;
        // this.body.maxVelocity.x = 200;
        // this.body.maxVelocity.y = 500;
        this.animSuffix = '';
        this.small();
    }

    small() {
        this.body.setSize(10, 10);
        // this.body.offset.set(3, 14);
    }


    update(keys, time, delta) {

    }
}