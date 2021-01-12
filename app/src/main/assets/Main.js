var canvas;
var canvasContext;

var FPS = 60;


var lastUpdate = Date.now();
var myInterval;
var now;
var deltaTime;

var playerHealth = 100;


var GameStates = ["Menu", "Playing", "Death"]
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

    button = new Button(canvas.width / 2, canvas.height / 2 - 100, 100, 50, 'Button.png', "Play");
    lvlUpButton = new Button(canvas.width / 2, canvas.height / 2 + 100, 100, 50, 'Button.png', "Level Up");

    deathButton = new Button(canvas.width / 2, canvas.height / 2 - 100, 100, 50, 'Button.png', "Menu");
    escButton = new Button(canvas.width - 50, 25, 100, 50, 'Button.png', "Escape");


    input = new Input();
    pScore = new Score();

    healthUI = new InGameUI(50, 25, 100, 50, player.h.currentHealth, 'Health.png', "H:");
    scoreUI = new InGameUI(50, 75, 100, 50, pScore.currentScore, 'Score.png', "S:");
    totalScoreUI = new InGameUI(canvas.width / 2 - 100, 200, 100, 50, pScore.earnedScore, 'Score.png', "TS:");
    levelScoreUI = new InGameUI(canvas.width / 2 + 100, 200, 100, 50, player.currentLevel, 'Score.png', "Level:");

    scoreTotalUI = new InGameUI(canvas.width / 2 + 100, 200, 150, 50, pScore.earnedScore, 'Score.png', "Total:");
    scoreEarnedUI = new InGameUI(canvas.width / 2 - 100, 200, 150, 50, pScore.currentScore, 'Score.png', "Earned:");

    //Starting the Player

    music = new Sound("Background.mp3");

    //music.Loop();

    //Calling the Update function within a set interval
    myInterval = setInterval(Update, 1000 / FPS);
    MenuStart();
}

//Starting the Player
function GameStart(){
    currentGameState = GameStates[1];
    currentGameState = "Playing";
    player.Start(canvas.width / 2, canvas.height / 2, 500);
    waveMgr.Start();
    pScore.Start();
    music.Play();
    //music.Loop();
}

function MenuStart(){
    currentGameState = GameStates[0];
    music.Play();
}

function DeathStart(){
    currentGameState = GameStates[2];
    pScore.StoreScore();
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

        canvas.addEventListener("mousedown", touchDown, false);
        canvas.addEventListener("mouseup", touchUp, false);
        canvas.addEventListener("mousemove", touchXY, true);
    }
}

function Update() {

    //Calculating Time
    CalculateTime();

    background.Update();

    if(currentGameState == GameStates[1])
    {
        //Updating the Player
        player.Update();

        //Updating Wave manager
        waveMgr.Update();

        healthUI.text = player.h.currentHealth;
        scoreUI.text = pScore.currentScore;

        if(escButton.Update())
        {
            DeathStart();
        }
    }

    if(currentGameState == GameStates[0])
    {
        totalScoreUI.text = pScore.earnedScore;
        levelScoreUI.text = player.currentLevel;

        if(button.Update())
        {
            GameStart();
        }

        if(lvlUpButton.Update())
        {
            pScore.UpdateLevel();
        }
    }


    if(currentGameState == GameStates[2])
    {
        scoreTotalUI.text = pScore.earnedScore;
        scoreEarnedUI.text = pScore.currentScore;

        if(deathButton.Update())
        {
            MenuStart();
        }
    }





    //Rendering Updates
    RenderMain();
    input.tap = false;
}





function RenderMain(){

    //Clearing Canvas
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    //Rendering Background First
    background.Render();

    styleText('white', '20px Times New Roman', 'center', 'middle');

    if(currentGameState == GameStates[1])
    {
        //Rendering Joystick
        js.onRender();

        //Rendering Player
        player.Render();

        waveMgr.Render();

        healthUI.Render();
        scoreUI.Render();

        escButton.Render();
    }

    if(currentGameState == GameStates[0])
    {
        totalScoreUI.Render();
        levelScoreUI.Render();
        button.Render();

        lvlUpButton.Render();
    }

    if(currentGameState == GameStates[2])
    {
        deathButton.Render();
        scoreTotalUI.Render();
        scoreEarnedUI.Render();
    }



    //Setting up text for debug

    //canvasContext.fillText(waveMgr.enBasics[0].gun.bullets[0].collision.dist.x, canvas.width/2, 100);
    //canvasContext.fillText(waveMgr.enBasics[0].gun.bullets[0].collision.dist.x, canvas.width/2 + 50, 100);

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
    js.OnClick(evt.clientX, evt.clientY);
    input.OnClick(evt.clientX, evt.clientY);

    js.OnClick(evt.touches[0].pageX, evt.touches[0].pageY);
    input.OnClick(evt.touches[0].pageX, evt.touches[0].pageY);

}

function touchXY(evt) {
    evt.preventDefault();

    if(js.touchActive == true)
    {
        js.OnHold(evt.clientX, evt.clientY);

        js.OnHold(evt.touches[0].pageX, evt.touches[0].pageY);
    }

    if(input.touchActive == true)
    {
        input.OnHold(evt.clientX, evt.clientY);
        input.OnHold(evt.touches[0].pageX, evt.touches[0].pageY);
    }
}

function styleText(txtColour, txtFont, txtAlign, txtBaseline) {
     canvasContext.fillStyle = txtColour;
     canvasContext.font = txtFont;
     canvasContext.textAlign = txtAlign;
     canvasContext.textBaseline = txtBaseline;
}


