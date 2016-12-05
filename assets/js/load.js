/* globals game */

let loadState = {
  preload () {
    game.load.path = 'assets/images/'
    game.load.images(['apple', 'gameover', 'menu', 'snake'])
  },
  create () {
    game.state.start('play')
  }
}
