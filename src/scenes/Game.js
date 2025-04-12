import { Scene } from 'phaser';

const WIDTH = 1024;
const HEIGHT = 768;
export class Game extends Scene {
    constructor() {
        super('Game');
        this.ball = null;
        this.healthBar = null;
    }

    
    preload() {
        this.load.image('healthBar', 'assets/pixil-frame-0.png');
    }

    create() {
        this.ball = this.add.circle(WIDTH/2, HEIGHT/2, 100, "0x0010ff");
        this.healthBar = this.add.image(WIDTH/2, HEIGHT/2 - 128, 'healthBar');
    }

    update() {
        
    };

}