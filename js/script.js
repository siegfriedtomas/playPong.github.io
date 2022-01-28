import Ball from './ball.js'
import Paddle from './paddle.js'

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");
const modal = document.getElementById("modal");
const modalHeader = document.getElementById("modal-header");
const modalMessage = document.getElementById("modal-message");
const modalButton = document.getElementById("modal-button");

let computerScore = 0;
let playerScore = 0;
let lastTime;
let paused = false;
let finished = false;

function update(time){
    if(!paused && !finished){
        if(lastTime != null){
            const delta = time - lastTime;
            ball.update(delta, [playerPaddle.rect(),computerPaddle.rect()]);
            computerPaddle.update(delta, ball.y);
            if(isLose())handleLose();
            if(playerScore === 10 || computerScore === 10)objetive();
        }
    }
    lastTime = time;
    window.requestAnimationFrame(update);
    
}
function objetive(){
    finished = true;
    ball.x = -100;
    if(playerScore===10){
        modalHeader.textContent = "You Won!";
        modalMessage.textContent = `You are a Champion. I always believed in you =)`;
        modalButton.textContent = "Play again";
    }
    if(computerScore===10){
        modalHeader.textContent = "You Lose!";
        modalMessage.textContent = `Try again, you can do it!`;
        modalButton.textContent = "Try again";
    }
    modal.classList.add("is-visible");
}
function isLose(){
    const rect = ball.rect();
    return rect.right >= window.innerWidth || rect.left <=0;
}
function handleLose(){
    const rect = ball.rect();
    if(rect.right >= window.innerWidth){
        playerScore += 1;
        playerScoreElement.textContent = playerScore;
    }else{
        computerScore += 1;
        computerScoreElement.textContent = computerScore;
    }
    ball.reset();
    computerPaddle.reset();
}
function resetGame(){
    console.log("Reseting game...");
    paused = false;
    finished = false;
    document.getElementById("modal").classList.remove("is-visible");
    playerScore = 0;
    computerScore = 0;
    playerScoreElement.textContent = 0;
    computerScoreElement.textContent = 0;
    ball.reset();
    playerPaddle.reset();
    computerPaddle.reset();
}
function togglePause(){
    if(!paused){
        paused = true;
        modalHeader.textContent = "Pause";
        modalMessage.textContent = "Go get some water, it will help you concentrate! =)";
        modalButton.textContent = "Reset";
        modal.classList.add("is-visible");
    }else if(paused){
        paused=false;
        modal.classList.remove("is-visible");
    }
}

document.addEventListener("mousemove", e =>{
    playerPaddle.position = (e.y / window.innerHeight) * 100;
});

document.addEventListener("keydown", e =>{
    if(e.key === 'r' || e.key === 'R'){
        console.log("TECLA R PRESIONADA - Reiniciando...");
        resetGame();
    }
})

document.addEventListener("keydown", e =>{
    console.log(e);
    if(e.key === "Escape"){
        togglePause();
        console.log(paused);
    }
})

modalButton.addEventListener("click", () =>{
    resetGame();
})


window.requestAnimationFrame(update);


