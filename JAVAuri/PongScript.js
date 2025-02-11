var canvas = document.querySelector("canvas")
var ctx = canvas.getContext('2d')
canvas.style.background = "#003049"
let dirX = true
let dirY = true
var Pad1YPos, Pad2YPos
var WKeyState = false
var SKeyState = false
var OKeyState = false
var LKeyState = false
var Score1 = 0
var Score2 = 0
var RequestFrame = false;
var ballAnimation = 0

const WIDTH = 800
const HEIGHT = 500

document.addEventListener('keydown', (e) => {

    if (e.key == "w") WKeyState = true
    if (e.key == "s") SKeyState = true
    if (e.key == "o") OKeyState = true
    if (e.key == "l") LKeyState = true
    if (e.key == "Enter") {
        if (!RequestFrame) {
            var ball = new Obj(WIDTH / 2, HEIGHT / 2, 10)
            ball.drawBall()
            RequestFrame = true
            MoveBallLoop(ball)
        }

    }

})
document.addEventListener('keyup', (e) => {
    if (e.key == "w") WKeyState = false
    if (e.key == "s") SKeyState = false
    if (e.key == "o") OKeyState = false
    if (e.key == "l") LKeyState = false

})
class Obj {
    constructor(x, y, radius, height) {
        this.color = "white"
        this.x = x
        this.y = y
        this.radius = radius
        this.height = height
        this.speed = 5

    }
    drawBall() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
    }
    drawPad() {
        ctx.fillRect(this.x, this.y, this.radius, this.height)
        ctx.fillStyle = this.color
    }
    moveBall() {
        if (dirY) this.y += this.speed
        if (dirX) this.x += this.speed
        if (!dirY) this.y -= this.speed
        if (!dirX) this.x -= this.speed
        if (this.y > HEIGHT) dirY = false
        if (this.x > WIDTH) {


            dirX = GenerateRandomDir();
            dirY = GenerateRandomDir()
            this.y = HEIGHT / 2
            this.x = WIDTH / 2
            Score1++;
            RequestFrame = false
            ctx.clearRect(0, 0, WIDTH + 100, HEIGHT)
            DrawPads(Pad1YPos, Pad2YPos)
            ctx.fillRect(WIDTH / 2 - 5, 0, 10, HEIGHT)
            ctx.fillStyle = "white"
            ctx.fill()
            this.drawBall()

        }
        if (this.y < 0) dirY = true
        if (this.x < 0) {


            dirX = GenerateRandomDir();
            dirY = GenerateRandomDir()
            this.y = HEIGHT / 2
            this.x = WIDTH / 2
            Score2++;
            RequestFrame = false
            ctx.clearRect(0, 0, WIDTH + 100, HEIGHT)
            DrawPads(Pad1YPos, Pad2YPos)
            ctx.fillRect(WIDTH / 2 - 5, 0, 10, HEIGHT)
            ctx.fillStyle = "white"
            ctx.fill()
            this.drawBall()
        }

        ctx.clearRect(0, 0, WIDTH + 100, HEIGHT)
        DrawPads(Pad1YPos, Pad2YPos)
        ctx.fillRect(WIDTH / 2 - 5, 0, 10, HEIGHT)
        ctx.fillStyle = "white"
        ctx.fill()
        this.drawBall()
        checkCollision(this.y, this.x)
        document.querySelector("#Player1").innerHTML = Score1
        document.querySelector("#Player2").innerHTML = Score2
    }
}
canvasSetup()
window.onresize = canvasSetup

function canvasSetup() {
    Pad2YPos = HEIGHT / 2
    Pad1YPos = HEIGHT / 2
    canvas.height = HEIGHT
    canvas.width = WIDTH
    dirX = GenerateRandomDir()
    dirY = GenerateRandomDir()
    DrawPads(Pad1YPos, Pad2YPos)
    var ball = new Obj(WIDTH / 2, HEIGHT / 2, 10)
    ball.drawBall()
    ctx.fillRect(WIDTH / 2 - 5, 0, 10, HEIGHT)
    ctx.fillStyle = "white"
    ctx.fill()
}
function DrawPads(Pad1YPos, Pad2YPos) {


    var Pad1 = new Obj(50, Pad1YPos, 25, 100)
    var Pad2 = new Obj(WIDTH - 50, Pad2YPos, 25, 100)

    Pad1.drawPad()
    Pad2.drawPad()
}
canvas.onclick = () => {
    if (!RequestFrame) {
        var ball = new Obj(WIDTH / 2, HEIGHT / 2, 10)
        ball.drawBall()
        RequestFrame = true
        MoveBallLoop(ball)
    }
}

function MoveBallLoop(ball) {

    if (WKeyState && Pad1YPos > 0) Pad1YPos -= 10
    if (SKeyState && Pad1YPos < window.innerHeight - 100) Pad1YPos += 10
    if (OKeyState && Pad2YPos > 0) Pad2YPos -= 10
    if (LKeyState && Pad2YPos < window.innerHeight - 100) Pad2YPos += 10
    ball.moveBall()
    if (RequestFrame) requestAnimationFrame(() => { MoveBallLoop(ball) })
}
function checkCollision(ballY, ballX) {
    ballX = ballX - 5
    let LoclPad1XPos = 50 + 12.5
    distance1 = Math.abs(ballX - LoclPad1XPos)

    if (distance1 < 5 && ballY > (Pad1YPos - 50) && Pad1YPos + 100 > ballY) dirX = true
    ballX = ballX + 10
    let LoclPad2XPos = WIDTH - 50
    distance2 = Math.abs(ballX - LoclPad2XPos)
    if (distance2 < 5 && ballY > (Pad2YPos - 50) && Pad2YPos + 100 > ballY) dirX = false
if(Score1>4){
    RequestFrame=false
    canvas.onclick=()=>{}
    document.querySelector("#WinMsg").style.display="block"
    document.querySelector('#WinPlayerId').innerHTML=1
}
if(Score2>4){
    RequestFrame=false
    canvas.onclick=()=>{}
    document.querySelector("#WinMsg").style.display="block"
    document.querySelector('#WinPlayerId').innerHTML=2
}
}
function GenerateRandomDir() {

    return Boolean(Math.floor(Math.random() * 2))
}