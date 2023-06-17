const playBoard = document.querySelector('.play-board')
const scoreElement=document.querySelector('.score')
const highScoreElement=document.querySelector('.high-score')
const controls=document.querySelectorAll('.controls i')
var foodX, foodY;
var snakeX = 5, snakeY = 17;
var velocityX = 0, velocityY = 0;
const snakeBody = [];
let gameOver=false
let closeIntervel;
let score=0;
let highScore=localStorage.getItem('highscore');

//change food position using random method
const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1
    foodY = Math.floor(Math.random() * 30) + 1
}
//changing velocity value based on arrow key press
const changeDirection = (e) => {

    if (e.key === 'ArrowUp'&& velocityX !=1) {
        velocityX = -1
        velocityY = 0
    }
    else if (e.key === 'ArrowDown'&& velocityX !=-1) {
        velocityX = 1
        velocityY = 0
    }
    else if (e.key === 'ArrowLeft'&& velocityY !=1) {
        velocityX = 0
        velocityY = -1
    }
    else if (e.key === 'ArrowRight' && velocityY  !=-1) {
        velocityX = 0
        velocityY = 1 }}


        //handlegameover
         const handleGameOver=()=>{
            clearInterval(closeIntervel);
            alert('Game over press ok to continue')
            location.reload();

         }

         controls.forEach((e)=>{
               e.addEventListener('click',()=>{changeDirection({key:e.dataset.key})})
         })

//initialize game 
const initGame = () => {

    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class='food' style='grid-area:${foodX}/${foodY}'></div>`


    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        
          score++
        highScore=score>=highScore?score:highScore;
        localStorage.setItem('highscore',highScore);
        snakeBody.push([foodX, foodY]) //pushing food position to snake body array
    };
    for (i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1]
    }

    //udating velocity
    snakeX = velocityX + snakeX
    snakeY = velocityY + snakeY

    if(snakeX <= 0||snakeX > 30 ||snakeY <= 0 ||snakeY > 30){
        gameOver=true
    }

    
    snakeBody[0] = [snakeX, snakeY]

    for (i = 0; i < snakeBody.length; i++) {
        //adding a div for the each part of the snake body
        htmlMarkup += `<div class='snake' style='grid-area:${snakeBody[i][0]}/${snakeBody[i][1]}'></div>`
        //checking snake head hit the body 
        if(i!= 0&& snakeBody[0][1]===snakeBody[i][1]&&snakeBody[0][0]===snakeBody[i][0]){
            gameOver=true;
        }
    }
    playBoard.innerHTML = htmlMarkup
    scoreElement.innerHTML=`score :${score}`
    highScoreElement.innerHTML=`HighScore: ${highScore}`
}

changeFoodPosition()
 closeIntervel=setInterval(initGame, 200)
document.addEventListener('keydown', changeDirection);


