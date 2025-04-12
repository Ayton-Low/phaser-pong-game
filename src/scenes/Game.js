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
    }

    
    preload() {

    }

    create() {
        this.ball = this.add.circle(WIDTH/2, HEIGHT/2, 100, "0x0010ff");
        
        this.healthBar = this.add.rectangle(WIDTH/2, HEIGHT/2 - 128, 200, 8, "0x111111");
        this.health = this.add.rectangle(WIDTH/2, HEIGHT/2 - 128, 200, 8, "0x00ff00");
        this.ball.setInteractive();
        this.ball.on("pointerdown", ()=>{
            this.health.width = this.health.width - 10;
            this.health.y += 5;
            this.healthBar.y += 5;
            this.ballsize -= 0.05;
            this.ball.setScale(this.ballsize, this.ballsize);
        })
    }

    update() {
        if (!this.health.width) {
            this.healthBar = null;
            this.health = null;
            this.ball = null;
        }
    };

}