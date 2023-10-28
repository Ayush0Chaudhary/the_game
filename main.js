import "./style.css";
// const Phaser =  require('phaser')
import Phaser from "phaser";
const speedDown = 300;

// static group for ground
var ground = null; 
var trees = null; 

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
    this.load.image(
      "tree1",
      "assets/PNG/Default size/Environment/medievalEnvironment_01.png"
    );
    this.load.image(
      "tree2",
      "assets/PNG/Default size/Environment/medievalEnvironment_02.png"
    );
    this.load.image(
      "tree3",
      "assets/PNG/Default size/Environment/medievalEnvironment_03.png"
    );
    this.load.image(
      "tree4",
      "assets/PNG/Default size/Environment/medievalEnvironment_04.png"
    );
  }
  create() {
    // create game objects


    ground = this.physics.add.staticGroup();
    ground.create(0, 0, "land1").setOrigin(0, 0);
    trees = this.physics.add.staticGroup(); // create a group for trees

    const numberOfTrees = 30; // change this to the number of trees you want

    for (let i = 0; i < numberOfTrees; i++) {
        const x = Phaser.Math.Between(0, 1280);
        const y = Phaser.Math.Between(0, 960);

        const treeType = Phaser.Math.Between(1, 4); // Randomly select a tree type between 1 and 4
        const treeName = "tree" + treeType;
        console.log(treeName);
        trees.create(x, y, treeName).setOrigin(0, 0);
    }
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
