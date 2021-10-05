document.addEventListener('DOMContentLoaded', () => {
  const bird = document.querySelector('.bird');
  const game_display = document.querySelector('.game-container');
  const ground = document.querySelector('.ground');

  const birdLeft = 220;
  let birdBottom = 100;
  const gravity = 2;
  let isGameOver = false;
  const gap = 430;

  function startGame() {
    birdBottom -= gravity;
    bird.style.bottom = `${birdBottom}px`;
    bird.style.left = `${birdLeft}px`;
  }

  const gameTimerID = setInterval(startGame, 20);

  function control(e) {
    if (e.keyCode === 32) {
      jump();
    }
  }

  function jump() {
    if (birdBottom < 500) {
      birdBottom += 50;
    }
    bird.style.bottom = `${birdBottom}px`;
  }

  document.addEventListener('keyup', control);

  function createObstacle() {
    let obstacleLeft = 500;
    const randomHieght = Math.random() * 60;
    const obstacleBottom = randomHieght;
    const obstacle = document.createElement('div');
    const topObstacle = document.createElement('div');
    if (!isGameOver) {
      obstacle.classList.add('obstacle');
      topObstacle.classList.add('topObstacle');
    }
    game_display.appendChild(obstacle);
    game_display.appendChild(topObstacle);
    obstacle.style.left = `${obstacleLeft}px`;
    topObstacle.style.left = `${obstacleLeft}px`;
    obstacle.style.bottom = `${obstacleBottom}px`;
    topObstacle.style.bottom = `${obstacleBottom + gap}px`;

    function moveObstacle() {
      obstacleLeft -= 2;
      obstacle.style.left = `${obstacleLeft}px`;
      topObstacle.style.left = `${obstacleLeft}px`;

      if (obstacleLeft === -60) {
        clearInterval(timerID);
        game_display.removeChild(obstacle);
        game_display.removeChild(topObstacle);
      }
      if (obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220
                && (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 200)
                || birdBottom === 0) {
        gameOver();
        clearInterval(timerID);
      }
    }
    let timerID = setInterval(moveObstacle, 20);
    if (!isGameOver) setTimeout(createObstacle, 3000);
  }

  createObstacle();

  function gameOver() {
    clearInterval(gameTimerID);
    isGameOver = true;
    document.removeEventListener('keyup', control);
  }
});