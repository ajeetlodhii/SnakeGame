let inputDir = {x: 0, y: 0};
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeAry = [
    {x: 13, y: 15}
];

food = {x: 6, y: 7};

// Game Functon 

function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}


function isCollide(snake){
   // yourself
   for(let i = 1; i < snakeAry.length; i++){
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
        return true;
    } 
}
     // wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
   }
}

function gameEngine(){
    // updating array & food
    if(isCollide(snakeAry)){
        inputDir = {x: 0, y: 0}
        alert("Game Over For Playing Again Press Any Key");
        snakeAry = [{x: 13, y: 15}];
        score = 0;
    }

      // score increment and regenerate food
      if(snakeAry[0].y === food.y && snakeAry[0].x === food.x){
        score++;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML = "high Score: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeAry.unshift({x: snakeAry[0].x + inputDir.x, y: snakeAry[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
      }

     // moving snake
     for( let i = snakeAry.length-2; i>=0; i--){
        
        snakeAry[i+1] = {...snakeAry[i]};
     }

snakeAry[0].x += inputDir.x;
snakeAry[0].y += inputDir.y;

    // display snake
    board.innerHTML = "";
    snakeAry.forEach((e, index)=> {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head'); 
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // display food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
   
}

// Main Logic
let hiscore = localStorage.getItem('hiscore');
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
} else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "high Score: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y:1} // start the game
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});