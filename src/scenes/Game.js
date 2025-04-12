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
    }

    
    preload() {

    }

    create() {
        this.ball = this.physics.add.circle(WIDTH/2, HEIGHT/2, 100, "0x0010ff").refreshBody();
        
        this.healthBar = this.add.rectangle(WIDTH/2, HEIGHT/2 - 128, 200, 8, "0x222222");
        this.health = this.add.rectangle(WIDTH/2, HEIGHT/2 - 128, 200, 8, "0x00ff00");
        this.ball.setInteractive();
        this.ball.on("pointerdown", ()=>{
            this.health.width = this.health.width - 10;
            this.health.y += 5;
            this.healthBar.y += 5;
            this.ballsize -= 0.05;
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
        if ((this.healthNum == 0)) {
            this.healthBar = null;
            this.health = null;
            this.ball = null;
        }
        if (this.wasd.up.isDown){
            this.ball.y -= 5;
            this.healthBar.y -= 5;
            this.health.y -= 5;
        } else if (this.wasd.down.isDown){
            this.ball.y += 5;
            this.healthBar.y += 5;
            this.health.y += 5;
        }
        if (this.wasd.left.isDown){
            this.ball.x -= 5;
            this.healthBar.x -= 5;
            this.health.x -= 5;
        } else if (this.wasd.right.isDown){
            this.ball.x += 5;
            this.healthBar.x += 5;
            this.health.x += 5;
        }
    };

}