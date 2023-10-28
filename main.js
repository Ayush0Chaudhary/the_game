import "./style.css";
// const Phaser =  require('phaser')
import Phaser from "phaser";
const speedDown = 300;

// static group for ground
var ground = null; 

class GameScene extends Phaser.Scene {
  constructor() {
    super("scene-game");
  }


  preload() {
    // load assets
    this.load.image(
      "land1",
      "assets/map.png"
    );
  }
  create() {
    // create game objects


    ground = this.physics.add.staticGroup();
    ground.create(0, 0, "land1").setOrigin(0, 0);
    
  }
  // update() {

  // }
}

const config = {
  typw: Phaser.AUTO,
  width: 1280,
  height: 960,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: speedDown },
      debug: true,
    },
  },
  scene: [GameScene],
};

const game = new Phaser.Game(config);
