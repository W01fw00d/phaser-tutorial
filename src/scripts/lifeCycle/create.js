export default function create() {
  let stars;
  let bombs;
  let platforms;
  let score = 0;
  let scoreText;

  function collectStar(player, star) {
    star.disableBody(true, true);

    score += 10;
    scoreText.setText("Score: " + score);

    if (stars.countActive(true) === 0) {
      stars.children.iterate((child) => {
        child.enableBody(true, child.x, 0, true, true);
      });

      //Put bomb on opposite part of the world from the player
      const x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      const bomb = bombs.create(x, 16, "bomb");
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }

  function hitBomb(player) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play("turn");
  }

  // this.add.image(400, 300, 'sky'); //Position image from background center, as this background is 800 x 600, we use 400 and 300
  this.add.image(0, 0, "sky").setOrigin(0, 0); //Reset the drawing position to the top-left

  //Platforms creation
  platforms = this.physics.add.staticGroup();

  platforms.create(400, 568, "ground").setScale(2).refreshBody();

  platforms.create(600, 400, "ground");
  platforms.create(50, 250, "ground");
  platforms.create(750, 220, "ground");

  //Stars creation
  stars = this.physics.add.group({
    key: "star",
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 },
  });

  stars.children.iterate((child) => {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  this.physics.add.collider(stars, platforms);

  //Bombs creation
  bombs = this.physics.add.group();

  this.physics.add.collider(bombs, platforms);

  //Player creation
  this.player = this.physics.add.sprite(100, 450, "dude");

  //player.setBounce(0.2);
  this.player.setCollideWorldBounds(true);

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "dude", frame: 4 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  this.physics.add.collider(this.player, platforms);

  this.physics.add.overlap(this.player, stars, collectStar, null, this);

  this.physics.add.collider(this.player, bombs, hitBomb, null, this);

  this.cursors = this.input.keyboard.createCursorKeys();

  scoreText = this.add.text(16, 16, "score: 0", {
    fontSize: "32px",
    fill: "#000",
  });
}
