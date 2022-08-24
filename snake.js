class Snake{
    constructor(x, y, size){
        this.x = x
        this.y = y
        this.size = size
        this.tail = [{x:this.x, y:this.y}]
        this.rotateX = 0
        this.rotatey = 1
    }
    
    move(){
        var newRect;
        if(this.rotateX == 1){
            newRect = {
                x: this.tail[this.tail.length - 1].x + this.size,
                y: this.tail[this.tail.length - 1].y
            }
        } else if(this.rotateX == -1){
            newRect = {
                x: this.tail[this.tail.length - 1].x - this.size,
                y: this.tail[this.tail.length - 1].y
            }
        } else if(this.rotateY == 1){
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y + this.size
            }
        } else if(this.rotateY == -1){
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y - this.size
            }
        }

        this.tail.shift()
        this.tail.push(newRect)
    }
}

class Appple{
    constructor(){
        console.log("apple")
        console.log(snake.size)
        var isTouching = false;
        while(true){
            this.x = Math.floor(math.random() * canvas.width / snake.size) * snake.size
            this.y = Math.floor(math.random() * canvas.height  / snake.size) * snake.size
            for(var i = 0; i <snake.tail.length;i++){
                if(this.x == snake.tail[i].x && this.y == snake.tail[i].y){
                    isTouching = true
                }
            }
            this.color = "red"
            this.size = snake.size
            console.log(this.x, this.y)
            if(!isTouching){
                break;
            }
        }
    }
}


var canvas = document.getElementById("canvas")

var snake = new Snake(20,20,20);

var apple = new Apple();

var canvasContext = canvas.getContext('2d')

window.onload = () =>{
    gameloop();
}

function gameloop(){
    setInterval(show, 1000/25) // Valor do Fps = 15
}

function show(){
    update();
    draw();
}


function update(){
    canvasContext.clearRect(0,0, canvas.width, canvas.height)
    console.log("update")
   snake.move();
   eatApple();
   checkHitWall();
}

function checkHitwall(){
    var headTail = snake.tail[snake.tail.length -1]
    if(headTail.x == - snake.size){
        headTail.x = canvas.width - snake.size
    } else if(headTail.x == canvas.width){
        headTail.x = 0
    } else if(headTail.y == - snake.size){
        head.tail.y = canvas.height - snake.size
    } else if(headTail.y == canvas.height){
        headTail.y = 0
    }
}


function eatApple(){
    if(snake.tail[snake.tail.length - 1].x == apple.x &&
        snake.tail[snake.tail.length - 1].y == apple.y){
            snake.tail[snake.tail.length] = {x:apple.x, y: apple.y}
            apple = new Apple();
        }
}
function draw(){
    createRect(0,0,canvas.width, canvas.width, "black")
    createRect(0,0, canvas.width, canvas.height)
    for(var i = 0; i < snake.tail.length; i++){
         createRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5,
            snake.size - 5, snake.size - 5, "white")
    }

    canvasContext.font = "20px Arial"
    canvasContext.fillStyle = "#00FF42"
    canvasContext.filltext("Score: ", (snake.tail.length -1),
        canvas.width - 120, 18);
    createRect(apple.x, apple.y, apple.size, apple.size, size.color)
}


function createRect(x,y,width, height){
    canvasContext.fillStyle = color
    canvas.Context.fillRect(x,y,width,height)
}


window.addEventListener("Keydown", (event) =>{
    setTimeout(()=>{
        if(event.keyCode == 37 && snake.rotateX != 1){
            snake.rotateX = -1
            snake.rotatey = 0;
        } else if(event.keyCode == 38 && snake.rotateY != 1){
            snake.rotateX = 0
            snake.rotatey = -1;
        } else if(event.keyCode == 39 && snake.rotateX != -1){
            snake.rotateX = 1
            snake.rotatey = 0;
        } else if(event.keyCode == 40 && snake.rotateY != -1){
            snake.rotateX = 0
            snake.rotatey = 1;
        }
    })
})