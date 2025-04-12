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

    }

    create() {
        this.ball = this.add.circle(WIDTH/2, HEIGHT/2, 100, "0x0010ff");
        
        this.health = this.add.rectangle(WIDTH/2, HEIGHT/2 - 128, 200, 8, "0x111111");
        this.health = this.add.rectangle(WIDTH/2, HEIGHT/2 - 128, 200, 8, "0x00ff00");
    }

    update() {
        
    };

}