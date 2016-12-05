/* globals game  */

let menuState = {
  create () {
    game.add.sprite(0, 0, 'menu')

    game.input.onDown.add(this.startGame, this)
  },
  startGame () {
    game.state.start('play')
  }
}
