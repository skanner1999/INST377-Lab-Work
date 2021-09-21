document.addEventListener('DOMContentLoaded', () => {

    const bird = document.querySelector('.bird')
    const game_display = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')

    let birdLeft = 220
    let birdBottom= 100
    let gravity = 2
    let isGameOver = false

    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }

    let gameTimerID = setInterval(startGame, 20)

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

    function createObstacle() {
        let obstacleLeft = 500
        let randomHieght = Math.random() * 60
        let obstacleBottom = randomHieght
        const obstacle = document.createElement('div')
        obstacle.classList.add('obstacle')
        game_display.appendChild(obstacle)
        obstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'

        function moveObstacle() {
            obstacleLeft -= 2
            obstacle.style.left = obstacleLeft + 'px'

            if (obstacleLeft === -60) {
                clearInterval(timerID)
                game_display.removeChild(obstacle)
            }
        }
        let timerID = setInterval(moveObstacle, 20)
        setTimeout(createObstacle, 3000)
    }
    
    createObstacle()

    function gameOver() {
        clearInterval(gameTimerID)
        isGameOver = true
        document.removeEventListener('keyup', control)
    }

})