import "./style.css";
// const Phaser =  require('phaser')
import Phaser from "phaser";
const speedDown = 300;

// static group for ground
var ground = null; 

// static group for castle
var castle = null;


class GameScene extends Phaser.Scene {
  constructor() {
    super("scene-game");
  }


  preload() {
    // load assets
    this.load.image(
      "land",
      "assets/map.png"
    );
    this.load.image(
      "castle",
      "assets/castle.png"
    );
  }
  create() {
    // create game static objects
    ground = this.physics.add.staticGroup();
    castle = this.physics.add.staticGroup();    
    
    ground.create(0, 0, "land").setOrigin(0, 0);
    castle.create(0, 0, "castle").setOrigin(0, 0);
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
