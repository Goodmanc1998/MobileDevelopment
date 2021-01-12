var canvas;
var canvasContext;

var FPS = 60;


var lastUpdate = Date.now();
var myInterval;
var now;
var deltaTime;

var playerHealth = 100;


var GameStates = ["Menu", "Playing"]
var currentGameState = "Menu"

var enemy = [];

let Music;

let js;
let m;

let pr;

let bkg;

let player;

let waveMgr;

let button;
let input;

let healthUI;
let scoreUI;
let pScore;

let background;

function load(){

    InitCanvas();

    //Joystick
    js = new Joystick();
    //Player
    player = new PlayerShip('ShipSpaceRocket.png', 'BulletF.png', 100);
    //Background
    background = new Background();
    background.Start();
    //WaveManager
    waveMgr = new WaveManager(5, 2);

    button = new Button(canvas.width / 2, canvas.height / 2 - 100, 100, 50, 'Button.png');
    input = new Input();
    pScore = new Score();

    healthUI = new InGameUI(50, 25, 100, 50, player.h.currentHealth, 'Health.png');
    scoreUI = new InGameUI(canvas.width - 50, 25, 100, 50, pScore.currentScore, 'Health.png')
    //Starting the Player



    music = new Sound("Background.mp3");


    //music.Loop();
    //Calling the Update function within a set interval
    myInterval = setInterval(Update, 1000 / FPS);
    StartMusic();
}

function StartMusic(){

}

//Starting the Player
function GameStart(){
    currentGameState = "Playing";
    player.Start(canvas.width / 2, canvas.height / 2, 500);
    waveMgr.Start();
        music.play();
}

//Starting the Canvas
function InitCanvas(){
    //Canvas Context
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    //Canvas Size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

   canvas.fillStyle = "black";

    //Touch functions
    if(canvas.getContext){
        canvas.addEventListener("touchstart", touchDown, false);
        canvas.addEventListener("touchmove", touchXY, true);
        canvas.addEventListener("touchend", touchUp, false);
    }
}

function Update() {

    //Calculating Time
    CalculateTime();

    background.Update();

    if(currentGameState == "Playing")
    {
            //Updating the Player
            player.Update();

        //Updating Wave manager
        waveMgr.Update();

        healthUI.text = player.h.currentHealth;
        scoreUI.text = pScore.currentScore;
    }
    if(button.Update())
    {
        GameStart();
    }




    //Rendering Updates
    RenderMain();
}





function RenderMain(){

    //Clearing Canvas
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    //Rendering Background First
    background.Render();

    if(currentGameState == GameStates[1])
    {
        //Rendering Joystick
        js.onRender();

        //Rendering Player
        player.Render();

        waveMgr.Render();

        styleText('black', '20px Courier New', 'center', 'middle');

        healthUI.Render();
        scoreUI.Render();
    }

    if(currentGameState == GameStates[0])
    {
        button.Render();
    }






    //Setting up text for debug


    styleText('white', '20px Courier New', 'center', 'middle');

    canvasContext.fillText(waveMgr.enBasics.length, canvas.width/2, 100);
    canvasContext.fillText(waveMgr.totalEnemy, canvas.width/2, 200);

}

function ClampNumber(num, min, max)
{
    var clampNo = Math.max(Math.min(num, Math.max(min, max)), Math.min(min, max));
    return clampNo;
}

function CalculateTime(){
        now = Date.now();
        deltaTime = (now - lastUpdate) / 1000;
        lastUpdate = now;
}

function touchUp(evt) {
     evt.preventDefault();
     // Terminate touch path
     js.onRelease();
     input.onRelease();
}

function touchDown(evt) {
    evt.preventDefault();
    js.OnClick(evt.touches[0].pageX, evt.touches[0].pageY)
    input.OnClick(evt.touches[0].pageX, evt.touches[0].pageY);
}

function touchXY(evt) {
    evt.preventDefault();

    if(js.touchActive == true)
    {
        js.OnHold(evt.touches[0].pageX, evt.touches[0].pageY);
    }

    if(input.touchActive == true)
    {
        input.OnHold(evt.touches[0].pageX, evt.touches[0].pageY);
    }
}

function styleText(txtColour, txtFont, txtAlign, txtBaseline) {
     canvasContext.fillStyle = txtColour;
     canvasContext.font = txtFont;
     canvasContext.textAlign = txtAlign;
     canvasContext.textBaseline = txtBaseline;
}


