import './style.css'
const Phaser =  require('phaser')

const speedDown = 300

class GameScene extends Phaser.Scene {
  constructor() {
    super("scene-game")
  }

  preload() {}
  create() {}
  update() {}
}

const config = {
  typw: Phaser.AUTO,
  width: 500,
  height: 500,
  canvas: gameCanvas,
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