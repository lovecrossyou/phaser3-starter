import { Bullet } from "../sprites/Bullet";

class GameScene extends Phaser.Scene {

    constructor(test) {
        super({
            key: 'GameScene'
        });
        this.platforms = null;
        this.player = null;
        this.stars = null;
        this.bullets = null;
        this.gamePadMode = false;
    }

    preload() {
        // this.load.scenePlugin('animatedTiles', AnimatedTiles, 'animatedTiles', 'animatedTiles');
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        var pic = this.add.image(400, 300, 'sky');
        Phaser.Display.Align.In.Center(pic, this.add.zone(400, 300, 800, 600));

        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');


        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(this.player, this.platforms);


        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        })
        this.stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);


        // 手柄 大圈
        this.gamePad = this.add.sprite(100, 260, "touch", 0).setScale(1.6);
        Phaser.Display.Align.In.BottomLeft(this.gamePad, this.add.zone(400, 300, 800, 600));

        // 手柄 内部滑动小圈
        this.innerGamePad = this.add.sprite(0, 0, 'touch').setInteractive().setScale(0.5);
        this.input.setDraggable(this.innerGamePad);
        this.gamePadContainer = this.add.container(0, 0);
        this.gamePadContainer.add(this.innerGamePad);
        Phaser.Display.Align.In.Center(this.gamePadContainer, this.gamePad);


        this.input.on('dragstart', (pointer, gameObject) => {
            gameObject.setTint(0xff0000);
            this.gamePadMode = true;
        });

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {

            var d = Math.sqrt(dragX * dragX + dragY * dragY); // 计算拖动距离(第3、4个参数很有用)
            if (d > 30) {
                d = 30;
            }

            var r = Math.atan2(dragY, dragX);

            gameObject.x = Math.cos(r) * d;

            gameObject.y = Math.sin(r) * d;

        });

        this.input.on('dragend', (pointer, gameObject) => {
            gameObject.clearTint();
            gameObject.x = 0;
            gameObject.y = 0;
            this.gamePadMode = false;
        });


        // 子弹
        this.bullets = this.add.group({
            classType: Bullet,
            maxSize: 200,
            runChildUpdate: true
        });

    }

    collectStar(player, star) {
        star.disableBody(true, true);
    }

    update() {
        if (this.gamePadMode == true) {// 手柄操作
            if (this.innerGamePad.x < 0) {
                this.player.play('left', true);
                this.player.x += this.innerGamePad.x / 10;
            }
            else if (this.innerGamePad.x > 0) {
                this.player.play('right', true);
                this.player.x += this.innerGamePad.x / 10;
            }
            else {
                this.player.play('right', true);
            }
        }
        else { // 键盘操作
            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-160);
                this.player.play('left', true);
            }
            else if (this.cursors.right.isDown) {
                this.player.setVelocityX(160);
                this.player.play('right', true);
            }
            else if (this.cursors.up.isDown) {
                this.player.setVelocityY(-260);
                this.player.play('idle', true);
            }
            else {
                this.player.setVelocityX(0);
                this.player.play('idle', true);
            }

            if (this.keySpace.isDown) {
                var bullet = this.bullets.get();
                if (bullet) {
                    bullet.fire(this.player.x, this.player.y);
                }
            }

        }
    }
}

export default GameScene;
