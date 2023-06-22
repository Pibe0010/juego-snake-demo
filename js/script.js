const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controles i")

let gameOver = false;
let foodX, foodY ;
let snakeX = 5, snakeY = 10;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = `High Score : ${highScore}`;


const changFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;    
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
   
    Swal.fire({
        title: 'GAME OVER!',
        text: 'Pulse OK para volver a jugar.',
        imageUrl: '/img/snake.webp',
        imageWidth: 500,
        imageHeight: 200,
        imageAlt: 'Custom image',
        confirmButtonColor: 'rgba(36, 37, 37, 0.5)',
        color: 'rgb(36, 37, 37, )',
      }).then((result) => {
            if (result.isConfirmed) {

                location.reload();
            }
          })
                
}

const changeDirection = (e) => {
    
    if(e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else  if(e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else  if(e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else  if(e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
    initGame();
}

controls.forEach(key => {
    key.addEventListener('click',() => changeDirection({key: key.dataset.key}));
})

const initGame = () => {
    if(gameOver) return handleGameOver(); {

    }
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    
    if(snakeX === foodX && snakeY === foodY) {
        changFoodPosition();
        snakeBody.push([foodX, foodY]);
        score++;

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerHTML = `Score: ${score}`;

        highScoreElement.innerHTML = `High Score : ${highScore}`;
    }

    for (let i = snakeBody.length -1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
        
    }
    
    snakeBody[0] = [snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
         gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;

        }       
    }

    playBoard.innerHTML = htmlMarkup;
}
changFoodPosition();

setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);


