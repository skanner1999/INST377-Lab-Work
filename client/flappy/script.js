document.addEventListener('DOMContentLoaded', () => {

    const bird = document.querySelector('.bird')
    const game_display = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')

    let birdLeft = 220
    let birdBottom= 100
    let gravity = 2

    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }

    let timerID = setInterval(startGame, 20)

    function control(e) {
        if (e.keyCode === 32) {
            jump()
        }
    }

    function jump() {
        if (birdBottom < 500) {
            birdBottom += 50
        }
        bird.style.bottom = birdBottom + 'px'
    }

    document.addEventListener('keyup', control)
})