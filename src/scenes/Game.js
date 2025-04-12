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
        
    }

    update() {
        
    };

}