/* globals Phaser, menuState */

let game = new Phaser.Game(600, 450, Phaser.AUTO)

game.state.add('boot', bootState)
game.state.add('load', loadState)
game.state.add('menu', menuState)
game.state.add('play', playState)
game.state.add('gameOver', gameOver)

game.state.start('boot')
