/* globals game */

let playState = {
  create () {
    game.stage.backgroundColor = '#061f27'

    this.snake = []
    this.apple = {}
    this.squareSize = 15
    this.score = 0
    this.speed = 0
    this.updateDelay = 0
    this.direction = 'right'
    this.newDirection = null
    this.addNew = false

    // add cursors as controls
    this.cursors = game.input.keyboard.createCursorKeys()

    for (let i = 0; i < 10; i++) {
      this.snake[i] = game.add.sprite(150 + i * this.squareSize, 150, 'snake')
    }

    // generate apple in random location
    this.generateAppple()

    this.scoreValue = game.add.text(
      30, 20, `SCORE: ${this.score}`,
      { font: 'bold 14px sans-serif', fill: '#46c0f9' }
    )

    this.speedValue = game.add.text(
      500, 20, `SPEED: ${this.speed}`,
      { font: 'bold 14px sans-serif', fill: '#46c0f9' }
    )
  },
  update () {
    if (this.cursors.right.isDown && this.direction !== 'left') {
      this.newDirection = 'right'
    } else if (this.cursors.left.isDown && this.direction !== 'rigth') {
      this.newDirection = 'left'
    } else if (this.cursors.up.isDown && this.direction !== 'down') {
      this.newDirection = 'up'
    } else if (this.cursors.down.isDown && this.direction !== 'up') {
      this.newDirection = 'down'
    }

    this.speed = Math.min(10, Math.floor(this.score / 5))

    this.updateDelay++
    if (this.updateDelay % (10 - this.speed) === 0) {
      let firstCell = this.snake[this.snake.length - 1]
      let lastCell = this.snake.shift()
      let oldLastCellX = lastCell.x
      let oldLastCellY = lastCell.y

      if (this.newDirection) {
        this.direction = this.newDirection
        this.newDirection = null
      }

      if (this.direction === 'right') {
        lastCell.x = firstCell.x + 15
        lastCell.y = firstCell.y
      } else if (this.direction === 'left') {
        lastCell.x = firstCell.x - 15
        lastCell.y = firstCell.y
      } else if (this.direction === 'up') {
        lastCell.x = firstCell.x
        lastCell.y = firstCell.y - 15
      } else if (this.direction === 'down') {
        lastCell.x = firstCell.x
        lastCell.y = firstCell.y + 15
      }

      this.snake.push(lastCell)
      firstCell = lastCell

      if (this.addNew) {
        this.snake.unshift(game.add.sprite(oldLastCellX, oldLastCellY, 'snake'))
        this.addNew = false
      }

      // check collision with apple
      this.appleCollision()
      // check self collision
      this.checkSelfCollision(firstCell)
      // check wall collision
      this.wallCollision(firstCell)
    }
  },
  generateAppple () {
    const randomPos = num => Math.floor(Math.random() * num) * this.squareSize

    this.apple = game.add.sprite(randomPos(40), randomPos(30), 'apple')
  },
  appleCollision () {
    for (let i = 0; i < this.snake.length; i++) {
      if (this.snake[i].x === this.apple.x && this.snake[i].y === this.apple.y) {
        this.addNew = true
        // remove old apple
        this.apple.destroy()
        // generate new apple
        this.generateAppple()
        // increment score
        this.score++
      }
    }
  },
  checkSelfCollision (head) {
    for (let i = 0; i < this.snake.length - 1; i++) {
      if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
        game.state.start('gameOver')
      }
    }
  },
  wallCollision (head) {
    if (head.x >= 600 || head.x <= 0 || head.y >= 450 || head.y < 0) {
      game.state.start('gameOver')
    }
  }
}
