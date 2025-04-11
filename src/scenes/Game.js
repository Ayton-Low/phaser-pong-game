import { Scene } from 'phaser';

const WIDTH = 1024;
const HEIGHT = 768;

export class Game extends Scene {
    constructor() {
        super('Game');
        this.ball = null;
        this.leftPaddle = null;
        this.rightPaddle = null;
        this.ballInMotion = false;
        this.cursors = null;
        this.wasd = null;
    }

    
    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.image('ball', 'assets/ball.png');
        this.load.image('paddle', 'assets/paddle.png');
    }

    create() {
        this.add.image(WIDTH/2, HEIGHT/2, 'background').setScale(0.8, 0.8);
        this.ball = this.physics.add.image(WIDTH/2, HEIGHT/2, 'ball').setScale(0.1, 0.1).refreshBody();
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1, 1);
        this.leftPaddle = this.physics.add.image(50, 384, "paddle");
        this.leftPaddle.setImmovable(true);
        this.rightPaddle = this.physics.add.image(974, 384, "paddle");
        this.rightPaddlePaddle.setImmovable(true);
        this.physics.add.collider(this.ball, this.leftPaddle, this.hitPaddle, null, this);
        this.physics.add.collider(this.ball, this.rightPaddle, this.hitPaddle, null, this);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys(
            {
                up: Phaser.Input.Keyboard.Keycodes.W,
                down: Phaser.Input.Keyboard.Keycodes.S,
            }
        )
    }

    update() {
        this.input.keyboard.on('keydown-SPACE', this.startBall, this);
        if (this.wasd.up.isDown && leftPaddle.y > 0) {
            leftPaddle.y -= 5;
        } else if (this.wasd.down.isDown && leftPaddle.y < HEIGHT) {
            leftPaddle.y += 5;
        }
        if (this.cursors.up.isDown && rightPaddle.y > 0) {
            rightPaddle.y -= 5;
        } else if (this.cursors.down.isDown && rightPaddle.y < HEIGHT) {
            rightPaddle.y += 5;
        }
    }

    startBall() {
            if (!this.ballInMotion) {
                this.ball.setVelocity(((Math.random() * 200) - 200), ((Math.random() * 200) - 200));
                this.ballInMotion = true;
            }
    }

    hitPaddle() {

    }

}