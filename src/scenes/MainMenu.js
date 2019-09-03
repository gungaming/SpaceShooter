class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: "MainMenu" });
    }

    preload() {
        this.load.image("sprBg0", "./../../images/sprBg0.png");
        this.load.image("sprBg1", "./../../images/sprBg1.png");
        this.load.image("sprBtnPlay", "./../../images/sprBtnPlay.png");
        this.load.image("sprBtnPlayHover", "./../../images/sprBtnPlayHover.png");
        this.load.image("sprBtnPlayDown", "./../../images/sprBtnPlayDown.png");
        this.load.image("sprBtnRestart", "./../../images/sprBtnRestart.png");
        this.load.image("sprBtnRestartHover", "./../../images/sprBtnRestartHover.png");
        this.load.image("sprBtnRestartDown", "./../../images/sprBtnRestartDown.png");
        this.load.audio("sndBtnOver", "./../../images/sndBtnOver.wav");
        this.load.audio("sndBtnDown", "./../../images/sndBtnDown.wav");
    }

    create() {
        this.sfx = {
            btnOver: this.sound.add("sndBtnOver"),
            btnDown: this.sound.add("sndBtnDown")
        };

        this.btnPlay = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "sprBtnPlay"
        );

        this.btnPlay.setInteractive();

        this.btnPlay.on("pointerover", function () {
            this.btnPlay.setTexture("sprBtnPlayHover"); // set the button texture to sprBtnPlayHover
            this.sfx.btnOver.play(); // play the button over sound
        }, this);

        this.btnPlay.on("pointerout", function () {
            this.setTexture("sprBtnPlay");
        });

        this.btnPlay.on("pointerdown", function () {
            this.btnPlay.setTexture("sprBtnPlayDown");
            this.sfx.btnDown.play();
        }, this);

        this.btnPlay.on("pointerup", function () {
            this.btnPlay.setTexture("sprBtnPlay");
            this.scene.start('GameScene');
        }, this);

        this.title = this.add.text(this.game.config.width * 0.5, 128, "SPACE SHOOTER", {
            fontFamily: 'monospace',
            fontSize: 48,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.title.setOrigin(0.5);

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
export default MainMenu;
