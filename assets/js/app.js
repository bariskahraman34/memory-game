const spanEmojis = document.querySelectorAll('.emoji');
const emojisBoxes = document.querySelectorAll('.box');

let emojis = ["😀","😂","🙃","😍","🥰","😎","😭","😳"];
let emojisCopy = [...emojis,...emojis];
let counter = 0;
let moves = 0;
let clickedEmojis = [];

function init(){
    
    shuffleEmojis();

    for (let i = 0 ; i < emojis.length*2 ; i++) {
        spanEmojis[i].textContent = emojisCopy[i];
    }

    for (let i = 0 ; i < emojisBoxes.length ; i++) {
        spanEmojis[i].style.opacity = 1;
        emojisBoxes[i].addEventListener('click',(e) => emojiBoxClicked(e));
    }

    setTimeout(hideEmojis,2000);
}

function shuffleEmojis(){
    emojisCopy.sort(() => Math.random() - 0.5);
}

function hideEmojis(){
    for (let i = 0 ; i < emojisBoxes.length ; i++) {
        spanEmojis[i].style.opacity = 0;
    }
}

function visibleEmoji(emoji){
    emoji.style.opacity = 1;
}

function emojiBoxClicked(e){
    let item = e.target.closest('.box').children[0]
    clickedEmojis.push(item.textContent);
    counter++;
    if(counter == 2){
        if(clickedEmojis[0] != clickedEmojis[1]){
            
        }
        clickedEmojis.length = 0;
        moves ++;
        counter = 0;
    }
    visibleEmoji(item)
}

function matchedEmojis(){

}

init();