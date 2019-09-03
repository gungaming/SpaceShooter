import 'phaser';
import GameScene from './scenes/GameScene';
import MainMenu from './scenes/MainMenu';
import GameOver from './scenes/GameOver';

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: 480,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 }
        }
    },
    scene: [
        MainMenu,
        GameScene,
        GameOver
    ],
    pixelArt: true,
    roundPixels: true
};

const game = new Phaser.Game(config);