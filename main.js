// import "./style.css";
// const Phaser =  require('phaser')
import Phaser from "phaser";
const speedDown = 300;

// static group for ground
var ground = null; 
var trees = null; 

// static group for castle
var castle = null;
var soldiers = null;


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
    this.load.image("soldier", "assets/Vector/dot.svg");
  }
  create() {
    // create game static objects
    ground = this.physics.add.staticGroup();
    castle = this.physics.add.staticGroup();    
    
    ground.create(640, 480, "land")
    trees = this.physics.add.staticGroup();

    const numberOfTrees = 100;;

    for (let i = 0; i < numberOfTrees; i++) {
        const x = Phaser.Math.Between(0, 1280);
        const y = Phaser.Math.Between(0, 960);

        const treeType = Phaser.Math.Between(1, 4); // Randomly select a tree type between 1 and 4
        const treeName = "tree" + treeType;
        trees.create(x, y, treeName);
    }

    castle.create(500, 500, "castle");
    
    soldiers = this.physics.add.group({
      key: 'soldier',
      repeat: 9,
      setXY: { x: 1100, y: 900, stepX: 50 }, // Starting position and spacing of soldiers
      setScale: { x: 0.3, y: 0.3 }, // Scale down the soldiers
    }
    );
    // soldiers.setBounce(0.05);
    // soldiers.setCollideWorldBounds(true);
    // Set castle position
    this.castlePosition = new Phaser.Math.Vector2(700, 700);
    this.physics.add.collider(soldiers, trees, this.handleTreeCollision, null, this);
    this.physics.add.collider(soldiers, castle);
  }
  handleTreeCollision(soldier, tree) {
    const avoidanceDirection = new Phaser.Math.Vector2(soldier.x - tree.x, soldier.y - tree.y).normalize();
    soldier.setData('avoidanceDirection', avoidanceDirection);
    this.time.delayedCall(200, () => { // Avoid trees for 500ms
      soldier.setData('avoidanceDirection', null);
    }, [], this);
    const overlapX = (soldier.width + tree.width) / 2 - Math.abs(soldier.x - tree.x);
    const overlapY = (soldier.height + tree.height) / 2 - Math.abs(soldier.y - tree.y);

    if (overlapX < overlapY) {
      soldier.x += overlapX * Math.sign(soldier.x - tree.x);
    } else {
      soldier.y += overlapY * Math.sign(soldier.y - tree.y);
    }
  }
  update() {
    soldiers.children.iterate((soldier) => {
      let direction;
      const avoidanceDirection = soldier.getData('avoidanceDirection');
      if (avoidanceDirection) {
        direction = avoidanceDirection;
      } else {
        direction = this.castlePosition.clone().subtract(new Phaser.Math.Vector2(soldier.x, soldier.y)).normalize();
      }

      soldier.x += direction.x * 2;
      soldier.y += direction.y * 2;

      // Optional: Adjust rotation to face towards the direction of movement
      soldier.rotation = Phaser.Math.Angle.Between(soldier.x, soldier.y, soldier.x + direction.x, soldier.y + direction.y);
    });
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 960,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scene: [GameScene],
};

const game = new Phaser.Game(config);
