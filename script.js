
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let rows = 20;
let cols = 20;
let snake = [
    {x: 19, y:3},
];
let food = {
    x: 4,
    y: 5
};
let cellWidth = canvas.width / cols;
let cellHeight = canvas.height / rows;
let direction = 'LEFT';
let foodCollected = false;
let score = 1;


const coinSound = new Audio("coinSound.mp3");
const gameOverSound = new Audio("gameOverSound.wav");
const SnakeMusic = new Audio("Snake Music.mp3");


if (typeof SnakeMusic.loop == 'boolean')
{
    SnakeMusic.loop = true;
}
else
{
    SnakeMusic.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}
SnakeMusic.play();

gameOverSound.volume = 0.2;
coinSound.volume = 0.4;


placeFood(); //Futter random setzen anwenden

setInterval(gameLoop, 200); //Interval setzen zur Nachfrage
document.addEventListener('keydown', keyDown); //anwenden des Tastendrucks

draw(); //Zeichnen anwenden


function draw(){

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';

    snake.forEach(part => add(part.x, part.y));

    ctx.fillStyle = 'purple';
    add(food.x, food.y); // Futter

    drawScore(); //score

    requestAnimationFrame(draw); //Animation Frame
}

function isGameOver(){
    let gameOver = false;
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '15px Arial'
    ctx.fillText("Score " + score, canvas.width -470, 470);
}

function testGameOver(){

    let firstPart = snake[0];
    let otherParts = snake.slice(1);
    let duplicatePart = otherParts.find(part => part.x == firstPart.x && part.y == firstPart.y);
    let gameOver = false;


    //1. Schlange läuft gegen die Wand
    if (snake[0].x < 0 ||
        snake[0].x > cols - 1 ||
        snake[0].y < 0 ||
        snake[0].y > rows - 1 ||
        duplicatePart
    ) {
        placeFood();
        snake = [
        {x: 19, y:3},
        ];
        direction = 'LEFT';
        score = 1;   
        gameOverSound.play();
        window.alert('Game Over!');
    }
}


function placeFood(){
    let randomX = Math.floor(Math.random() * cols); //Futter random in den Zeilen platzieren  
    let randomY = Math.floor(Math.random()* rows); //Futter random in den Reihen platzieren

    food = {x: randomX, y: randomY}; //Futter random platzieren
}

function add(x, y){
    ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth -1, cellHeight -1);
}

function shiftSnake(){
    for (let i = snake.length - 1; i > 0; i--) {
        const part = snake[i];
        const lastPart = snake[i -1];
        part.x = lastPart.x;
        part.y = lastPart.y;
    }
}

function gameLoop(){
    testGameOver();
    if(foodCollected) {
        snake = [{x: snake[0].x, y: snake[0].y}, ...snake];

        foodCollected = false;
    }

    shiftSnake();

    if(direction == 'LEFT') { //Richtung ändern nach links
        snake[0].x--;
    }

    if(direction == 'UP') { //Richtung ändern nach oben
        snake[0].y--;
    }

    if(direction == 'RIGHT') { //Richtung ändern nach rechts
        snake[0].x++;
    }

    if(direction == 'DOWN') { //Richtung ändern nach unten
        snake[0].y++;
    }

    if(snake[0].x == food.x && //Futter einsammeln
        snake[0].y == food.y) {
        foodCollected = true;
        score++;     
        placeFood();
        coinSound.play();
    }

}

function keyDown(e) { //Tasten drücken
    if(e.keyCode == 37) { //links
        direction = 'LEFT';
    }
    if(e.keyCode == 38) { //hoch
        direction = 'UP';
    }
    if(e.keyCode == 39) { //rechts
        direction = 'RIGHT';
    }
    if(e.keyCode == 40) { //unten
        direction = 'DOWN';
    }
}
