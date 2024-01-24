const spanEmojis = document.querySelectorAll('.emoji');
const emojisBoxes = document.querySelectorAll('.box');
const movesCounter = document.querySelector('.moves-counter');
const timer = document.querySelector('.time-counter');
const restartGameBtns = document.querySelectorAll('.restart');
const newGameBtns = document.querySelectorAll('.new-game');
const gameOver = document.querySelector('.gameover-dialog');
const gameOverTimeResult = document.querySelector('.game-result-time');
const gameOverMovesResult = document.querySelector('.game-result-moves');

let emojis = ["😀","😂","🙃","😍","🥰","😎","😭","😳"];
let emojisCopy = [...emojis,...emojis];
let counter = 0;
let moves = 0;
let timeCounter = 0;
let minuteCounter = 0;
let score = 0;
let clickedEmojis = [];
let disabledClick = false;
let gameTimerInterval = setInterval(gameTimer, 1000);

function resetGame(){
    counter = 0;
    moves = 0;
    timeCounter = 0;
    minuteCounter = 0;
    score = 0;
    clickedEmojis = [];
    disabledClick = false;
    shuffleEmojis();
    setTimeout(hideEmojis,1000);
    for (let i = 0 ; i < emojisBoxes.length ; i++) {
        spanEmojis[i].textContent = emojisCopy[i];
        spanEmojis[i].style.opacity = 1;
        emojisBoxes[i].style.pointerEvents = 'initial';
        emojisBoxes[i].style.backgroundColor = '#304859';
    }
    movesCounter.innerHTML = moves;
    gameTimerInterval = setInterval(gameTimer, 1000);
}

function init(){
    shuffleEmojis();
    for (let i = 0 ; i < emojisBoxes.length ; i++) {
        spanEmojis[i].textContent = emojisCopy[i];
        spanEmojis[i].style.opacity = 1;
        emojisBoxes[i].addEventListener('click',(e) => emojiBoxClicked(e));
    }
    setTimeout(hideEmojis,1000);
}

function emojiBoxClicked(e){
    if(!disabledClick){
        let item = e.target.closest('.box').children[0];
        item.parentElement.style.pointerEvents = 'none';
        item.parentElement.style.backgroundColor = '#FDA214';
        visibleEmoji(item)
        clickedEmojis.push(item);
        counter++;
        if(counter == 2){
            disabledClick = true;
            if(clickedEmojis[0].textContent != clickedEmojis[1].textContent){
                setTimeout(hideFalseClickedEmojis,1000);
            }else{
                score++;
                clickedEmojis[0].parentElement.style.backgroundColor = "#BCCED9";
                clickedEmojis[1].parentElement.style.backgroundColor = "#BCCED9";
            }
            setTimeout(continueGame,1000);
            moves ++;
            movesCounter.textContent = moves
            counter = 0;
        }
    }
    if(score == 8){
        gameOverTimeResult.innerHTML = `Time: ${timer.innerHTML}` ;
        gameOverMovesResult.innerHTML = `Moves: ${movesCounter.innerHTML}`;
        gameOver.showModal();
        clearInterval(gameTimerInterval);
    }
}

function shuffleEmojis(){
    emojisCopy.sort(() => Math.random() - 0.5);
}

function hideEmojis(){
    for (let i = 0 ; i < emojisBoxes.length ; i++) {
        spanEmojis[i].style.opacity = 0;
    }
}

function hideFalseClickedEmojis(){
    clickedEmojis[0].style.opacity = 0;
    clickedEmojis[1].style.opacity = 0;
    clickedEmojis[0].parentElement.style.pointerEvents = 'initial';
    clickedEmojis[1].parentElement.style.pointerEvents = 'initial';
    clickedEmojis[0].parentElement.style.backgroundColor = '#304859';
    clickedEmojis[1].parentElement.style.backgroundColor = '#304859';
}

function continueGame(){
    disabledClick = false;
    clickedEmojis.length = 0;
}

function visibleEmoji(emoji){
    emoji.style.opacity = 1;
}

function gameTimer(){
    if(timeCounter < 10){
        timer.innerHTML = `${minuteCounter} : 0${timeCounter}`;
    }else{
        timer.innerHTML = `${minuteCounter} : ${timeCounter}`;
    }
    if(timeCounter % 59 == 0 && timeCounter != 0){
        minuteCounter++;
        timeCounter = -1;
    }
    timeCounter++;
}

for (let i = 0 ; i < newGameBtns.length ; i++) {
    restartGameBtns[i].addEventListener('click',function(){
        gameOver.close();
        setTimeout(resetGame,1000)
    })
    
    newGameBtns[i].addEventListener('click',function(){
        gameOver.close();
        setTimeout(resetGame,1000)
    })
}



init();