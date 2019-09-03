class GameOver extends Phaser.Scene {
    constructor() {
      super({ key: "GameOver" });
    }

    preload() {
        this.load.image("sprBg0", "./../../images/sprBg0.png");
        this.load.image("sprBg1", "./../../images/sprBg1.png");
        this.load.image("sprBtnRestart", "./../../images/sprBtnRestart.png");
        this.load.image("sprBtnRestartHover", "./../../images/sprBtnRestartHover.png");
        this.load.image("sprBtnRestartDown", "./../../images/sprBtnRestartDown.png");
        this.load.audio("sndBtnOver", "./../../images/sndBtnOver.wav");
        this.load.audio("sndBtnDown", "./../../images/sndBtnDown.wav");
    }

    create() {
  
      this.title = this.add.text(this.game.config.width * 0.5, 128, "GAME OVER", {
        fontFamily: 'monospace',
        fontSize: 48,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center'
      });
      this.title.setOrigin(0.5);
  
      this.sfx = {
        btnOver: this.sound.add("sndBtnOver"),
        btnDown: this.sound.add("sndBtnDown")
      };
  
      this.btnRestart = this.add.sprite(
        this.game.config.width * 0.5,
        this.game.config.height * 0.5,
        "sprBtnRestart"
      );
  
      this.btnRestart.setInteractive();
  
      this.btnRestart.on("pointerover", function() {
        this.btnRestart.setTexture("sprBtnRestartHover"); // set the button texture to sprBtnPlayHover
        this.sfx.btnOver.play(); // play the button over sound
      }, this);
  
      this.btnRestart.on("pointerout", function() {
        this.setTexture("sprBtnRestart");
      });
  
      this.btnRestart.on("pointerdown", function() {
        this.btnRestart.setTexture("sprBtnRestartDown");
        this.sfx.btnDown.play();
        this.scene.start("GameScene")
      }, this);
  
      this.btnRestart.on("pointerup", function() {
        this.btnRestart.setTexture("sprBtnRestart");
        this.scene.start("MainMenu");
      }, this);
  
      this.backgrounds = [];
      for (var i = 0; i < 5; i++) {
        var keys = ["sprBg0", "sprBg1"];
        var key = keys[Phaser.Math.Between(0, keys.length - 1)];
        var bg = new ScrollingBackground(this, key, i * 10);
        this.backgrounds.push(bg);
      }
    }
  
    update() {
      for (var i = 0; i < this.backgrounds.length; i++) {
        this.backgrounds[i].update();
      }
    }
  }

  class ScrollingBackground {
    constructor(scene, key, velocityY) {
        this.scene = scene;
        this.key = key;
        this.velocityY = velocityY;

        this.layers = this.scene.add.group();

        this.createLayers();
    }

    createLayers() {
        for (var i = 0; i < 2; i++) {
            // creating two backgrounds will allow a continuous flow giving the illusion that they are moving.
            var layer = this.scene.add.sprite(0, 0, this.key);
            layer.y = (layer.displayHeight * i);
            var flipX = Phaser.Math.Between(0, 10) >= 5 ? -1 : 1;
            var flipY = Phaser.Math.Between(0, 10) >= 5 ? -1 : 1;
            layer.setScale(flipX * 2, flipY * 2);
            layer.setDepth(-5 - (i - 1));
            this.scene.physics.world.enableBody(layer, 0);
            layer.body.velocity.y = this.velocityY;

            this.layers.add(layer);
        }
    }

    update() {
        if (this.layers.getChildren()[0].y > 0) {
            for (var i = 0; i < this.layers.getChildren().length; i++) {
                var layer = this.layers.getChildren()[i];
                layer.y = (-layer.displayHeight) + (layer.displayHeight * i);
            }
        }
    }
}

export default GameOver;