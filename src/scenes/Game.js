import { Scene } from 'phaser';

const WIDTH = 1024;
const HEIGHT = 768;
export class Game extends Scene {
    constructor() {
        super('Game');
        this.ball = null;
        this.healthBar = null;
        this.health = null;
        this.ballsize = 1;
        this.wasd = null;
        this.healthNum = 20;
        this.gameOverText = null;
    }

    
    preload() {

    }

    create() {
        this.ball = this.add.circle(WIDTH/2, HEIGHT/2, 100, "0x0010ff");
        this.gameOverText = this.add.text((WIDTH/2 - 100), HEIGHT/2, 'Game Over!', {
            fontSize: "50px",
            fill: "white"
        });
        this.gameOverText.setVisible(false);
        this.healthBar = this.add.rectangle(WIDTH/2, HEIGHT/2 - 128, 200, 8, "0x222222");
        this.health = this.add.rectangle(WIDTH/2, HEIGHT/2 - 128, 200, 8, "0x00ff00");
        this.ball.setInteractive();
        this.ball.on("pointerdown", ()=>{
            this.health.width = this.health.width - 10;
            this.health.y += 2.5;
            this.healthBar.y += 2.5;
            this.ballsize -= 0.025;
            this.ball.setScale(this.ballsize, this.ballsize);
            this.healthNum--;
        })
        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
    }

    update() {
        if ((this.healthNum < 1)) {
            this.healthBar.setVisible(false);
            this.health.setVisible(false);
            this.ball.setVisible(false);
            this.gameOverText.setVisible(true);
        }
        if (this.wasd.up.isDown && this.ball.y > (this.ball.width)){
            this.ball.y -= 5;
            this.healthBar.y -= 5;
            this.health.y -= 5;
        } else if (this.wasd.down.isDown && this.ball.y < WIDTH - this.ball.width){
            this.ball.y += 5;
            this.healthBar.y += 5;
            this.health.y += 5;
        }
        if (this.wasd.left.isDown && this.ball.x > (this.ball.width)){
            this.ball.x -= 5;
            this.healthBar.x -= 5;
            this.health.x -= 5;
        } else if (this.wasd.right.isDown && this.ball.x < (HEIGHT - this.ball.width)){
            this.ball.x += 5;
            this.healthBar.x += 5;
            this.health.x += 5;
        }
    };

}