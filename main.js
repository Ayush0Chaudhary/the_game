import './style.css'
// const Phaser =  require('phaser')
import Phaser from 'phaser';


const speedDown = 300

class GameScene extends Phaser.Scene {
  constructor() {
    super("scene-game")
  }

  preload() {
    // load assets
    this.load.image('land', 'assets/PNG/Default size/Tile/medievalTile_58.png')
  }
  create() {
    // create game objects
    this.add.image(0, 0, 'land').setOrigin(0, 0)
  }
  // update() {

  // }
}

const config = {
  typw: Phaser.canvas,
  width: 500,
  height: 500,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: speedDown },
      debug: true
    }
  },
  scene: [
    GameScene
  ]
}

const game = new Phaser.Game(config)