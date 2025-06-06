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
        this.leftScore = 0;
        this.rightScore = 0;
        this.leftScoreText = null;
        this.rightScoreText = null;
    }

    
    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.image('ball', 'assets/ball.png');
        this.load.image('paddle', 'assets/paddle.png');
    }

    create() {
        this.leftScoreText = this.add.text(100, 50, '0', {fontSize: '50px'});
        this.rightScoreText = this.add.text(924, 50, '0', {fontSize: '50px'});
        this.input.keyboard.on('keydown-SPACE', this.startBall, this);
        this.add.image(WIDTH/2, HEIGHT/2, 'background').setScale(0.8, 0.8);
        this.ball = this.physics.add.image(WIDTH/2, HEIGHT/2, 'ball').setScale(0.05, 0.05).refreshBody();
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1, 1);
        this.leftPaddle = this.physics.add.image(50, 384, "paddle");
        this.leftPaddle.setImmovable(true);
        this.rightPaddle = this.physics.add.image(974, 384, "paddle");
        this.rightPaddle.setImmovable(true);
        this.physics.add.collider(this.ball, this.leftPaddle, this.hitPaddle, null, this);
        this.physics.add.collider(this.ball, this.rightPaddle, this.hitPaddle, null, this);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys(
            {
                up: Phaser.Input.Keyboard.Keycodes.W,
                down: Phaser.Input.Keyboard.Keycodes.S
            }
        )
    }

    update() {
        if (this.wasd.up.isDown && this.leftPaddle.y > 0) {
            this.leftPaddle.y -= 5;
        } else if (this.wasd.down.isDown && this.leftPaddle.y < HEIGHT) {
            this.leftPaddle.y += 5;
        }
        if (this.cursors.up.isDown && this.rightPaddle.y > 0) {
            this.rightPaddle.y -= 5;
        } else if (this.cursors.down.isDown && this.rightPaddle.y < HEIGHT) {
            this.rightPaddle.y += 5;
        }
        const margin = 30;
        if(this.ball.x < margin) {
            this.rightScore += 1;
            this.rightScoreText.setText(this.rightScore);
            this.resetBall();

        } else if (this.ball.x > (WIDTH - margin)) {
            this.leftScore += 1;
            this.leftScoreText.setText(this.leftScore);
            this.resetBall();
        }
    };

    startBall() {
            if (!this.ballInMotion) {
                
                let initialVelocityX = 300 * (Phaser.Math.Between(0, 1) ? 1 : -1); 
                let initialVelocityY = 300 * (Phaser.Math.Between(0, 1) ? 1 : -1); 
                this.ball.setVelocity(initialVelocityX, initialVelocityY);
                this.ballInMotion = true;
            }
    };

    hitPaddle() {

    }

    resetBall() {
        this.ball.setPosition(WIDTH/2, 384);
        this.ball.setVelocity(0, 0);
        this.ballInMotion = false;
        this.startBall();
    }

}