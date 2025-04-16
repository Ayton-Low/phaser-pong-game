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
        this.ballSpeed = 5;
        this.damage = 10;
        this.easyButton = null;
        this.mediumButton = null;
        this.hardButton = null;
        this.easyButtonCollider = null;
        this.mediumButtonCollider = null;
        this.hardButtonCollider = null;
        this.graphics = null;
        this.gameStarted = false;
    }

    
    preload() {

    }

    create() {
        
        this.graphics = this.add.graphics();
        this.graphics.fillStyle("0xffffff");
        this.graphics.fillRoundedRect(WIDTH/2 - 105, (HEIGHT/4 * 1) - 55, 210, 110, 30);
        this.graphics.fillRoundedRect(WIDTH/2 - 105, (HEIGHT/4 * 2) - 55, 210, 110, 30);
        this.graphics.fillRoundedRect(WIDTH/2 - 105, (HEIGHT/4 * 3) - 55, 210, 110, 30);
        
        this.graphics.fillStyle("0x00ff00");
        this.add.text(WIDTH/2 - 300, 10, "Choose your difficulty", {fontSize: "50px"})
        this.easyButton = this.graphics.fillRoundedRect(WIDTH/2 - 100, HEIGHT/4 - 50, 200, 100, 30);
        this.add.text(WIDTH/2 - 50, HEIGHT/4 - 25, "Easy", {fontSize: "50px"});
        this.mediumButton = this.graphics.fillRoundedRect(WIDTH/2 - 100, (HEIGHT/4 * 2) - 50, 200, 100, 30);
        this.add.text(WIDTH/2 - 80, (HEIGHT/4 * 2) - 25, "Medium", {fontSize: "50px"});
        this.hardButton = this.graphics.fillRoundedRect(WIDTH/2 - 100, (HEIGHT/4 * 3) - 50, 200, 100, 30);
        
        this.add.text(WIDTH/2 - 50, (HEIGHT/4 * 3) - 25, "Hard", {fontSize: "50px"});
        this.fillStyle("0x000000", 0);
        this.easyButtonCollider = this.add.rectangle(WIDTH/2 - 105, (HEIGHT/4 * 1) - 55, 210, 110, 30);
        this.mediumButtonCollider = this.add.rectangle(WIDTH/2 - 100, (HEIGHT/4 * 2) - 50, 200, 100, 30);
        this.hardButtonCollider = this.add.rectangle(WIDTH/2 - 100, (HEIGHT/4 * 3) - 50, 200, 100, 30);
        this.easyButtonCollider.setInteractive();
        this.mediumButtonCollider.setInteractive();
        this.hardButtonCollider.setInteractive();
        this.easyButtonCollider.on("pointerdown", ()=>{
            this.ballSpeed = 5;
            this.damage = 5;
            this.startGame();
        });
        this.mediumButtonCollider.on("pointerdown", ()=>{
            this.ballSpeed = 10;
            this.damage = 10;
            this.startGame();
        });
        this.hardButtonCollider.on("pointerdown", ()=>{
            this.ballSpeed = 20;
            this.damage = 20;
            this.startGame();
        });

    }

    update() {
        if (this.gameStarted) {
        if ((this.healthNum < 1)) {
            this.healthBar.setVisible(false);
            this.health.setVisible(false);
            this.ball.setVisible(false);
            this.gameOverText.setVisible(true);
            this.gameStarted = false;
        }
        if (this.wasd.up.isDown && this.ball.y > (this.ball.width)){
            this.ball.y -= this.ballSpeed;
            this.healthBar.y -= this.ballSpeed;
            this.health.y -= this.ballSpeed;
        } else if (this.wasd.down.isDown && this.ball.y < HEIGHT - this.ball.width){
            this.ball.y += this.ballSpeed;
            this.healthBar.y += this.ballSpeed;
            this.health.y += this.ballSpeed;
        }
        if (this.wasd.left.isDown && this.ball.x > (this.ball.width)){
            this.ball.x -= this.ballSpeed;
            this.healthBar.x -= this.ballSpeed;
            this.health.x -= this.ballSpeed;
        } else if (this.wasd.right.isDown && this.ball.x < (WIDTH - this.ball.width)){
            this.ball.x += this.ballSpeed;
            this.healthBar.x += this.ballSpeed;
            this.health.x += this.ballSpeed;
        }
    }
    };
    startGame() {
        this.gameStarted = true;
        this.ball = this.add.circle(WIDTH/2, HEIGHT/2, 100, "0x0010ff");
        this.gameOverText = this.add.text((WIDTH/2 - 150), HEIGHT/2, 'Game Over!', {
            fontSize: "50px",
            fill: "white"
        });
        this.gameOverText.setVisible(false);
        this.healthBar = this.add.rectangle(WIDTH/2, HEIGHT/2 - 128, 200, 8, "0x222222");
        this.health = this.add.rectangle(WIDTH/2, HEIGHT/2 - 128, 200, 8, "0x00ff00");
        this.ball.setInteractive();
        this.ball.on("pointerdown", ()=>{
            this.health.width = this.health.width - this.damage;
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

}