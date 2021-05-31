import { SKY, GROUND, NPC_1, BUBBLE } from "../../constants/assets";

import { applyScoreTemplate } from "./constants/literals";
import createPlayer from "./player.js";

export default function create() {
  const createPlatforms = () => {
    const createPlatform = (width, height) =>
      this.platforms.create(width, height, GROUND);

    this.platforms = this.physics.add.staticGroup();

    createPlatform(400, 568)
      .setScale(2)
      .refreshBody();
    createPlatform(600, 400);
    createPlatform(50, 250);
    createPlatform(750, 220);
  };

  const createNPCs = () => {
    const createCharacters = () => {
      this.npcs = this.physics.add.group({
        key: NPC_1,
        repeat: 1,
        //setXY: { x: 450, y: 0, stepX: 50 }, // Up the lower platform
        setXY: { x: 320, y: 510, stepX: 50 },
      });

      const rightAnim = "right_npc1";
      this.anims.create({
        key: rightAnim,
        frames: [{ key: NPC_1, frame: 5 }],
        frameRate: 20,
      });

      this.npcs.children.entries[0].play(rightAnim);

      this.npcs.children.entries[0].data = { name: "jj", patience: 100 };
      this.npcs.children.entries[1].data = { name: "nacho", patience: 100 };

      this.physics.add.collider(this.npcs, this.platforms);
    };

    const createBubbles = () => {
      this.bubbles = this.physics.add.group({
        key: BUBBLE,
        repeat: 1,
        setXY: { x: 325, y: 490, stepX: 40 },
        allowGravity: false,
      });
      this.bubbles.children.entries[0].flipX = true;
    };

    createCharacters();
    createBubbles();
  };

  const createScoreText = (score) => {
    const BLACK = "#000";
    this.scoreText = this.add.text(16, 16, applyScoreTemplate(score), {
      fontSize: "32px",
      fill: BLACK,
    });
  };

  const INITIAL_SCORE = 100;

  this.add.image(0, 0, SKY).setOrigin(0, 0);
  createPlatforms();
  createNPCs();
  createPlayer(this);

  this.score = INITIAL_SCORE;
  createScoreText(this.score);

  this.cursors = this.input.keyboard.createCursorKeys();
}
