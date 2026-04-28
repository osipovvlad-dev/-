input.onButtonPressed(Button.A, function () {
    gravity = gravity * -1
})
function gameOver () {
    basic.showIcon(IconNames.Skull)
    basic.pause(1000)
    control.reset()
}
input.onButtonPressed(Button.B, function () {
    gravity = gravity * -1
})
let y = 0
let x = 0
let gravity = 0
let obstacles: number[] = []
let playerY = 4
// 1 = down, -1 = up
gravity = 1
let speed = 400
basic.forever(function () {
    basic.clearScreen()
    // apply gravity
    playerY += gravity
    // keep inside screen
    if (playerY < 0) {
        playerY = 0
    }
    if (playerY > 4) {
        playerY = 4
    }
    // move obstacles left
    for (let i = 0; i <= obstacles.length - 1; i++) {
        obstacles[i] += -1
    }
    // spawn obstacles on right side
    if (randint(0, 2) == 0) {
        // y * 10 + x
        obstacles.push(randint(0, 4) * 10 + 4)
    }
    // draw obstacles + collision
    for (let o of obstacles) {
        x = o % 10
        y = Math.idiv(o, 10)
        led.plot(x, y)
        if (x == 0 && y == playerY) {
            gameOver()
        }
    }
    obstacles = obstacles.filter(o => o % 10 >= 0)
// draw player
    led.plot(0, playerY)
    basic.pause(speed)
    // increase difficulty
    if (speed > 120) {
        speed += -5
    }
})
