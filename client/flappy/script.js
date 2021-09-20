document.addEventListener('DOMContentLoaded', () => {

    const bird = document.querySelector('.bird')
    const game_display = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')

    let birdleft = 220
    let birdBottom= 100

    function startGame() {
        bird.style.bottom = birdBottom + 'px'
    }
    startGame()
})