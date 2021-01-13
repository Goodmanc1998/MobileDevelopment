//Storing the canvas and FPS
var canvas;
var canvasContext;
var FPS = 60;
//Storing Time related variables
var lastUpdate = Date.now();
var myInterval;
var now;
var deltaTime;
//Storing states and current state
var GameStates = ["Menu", "Playing", "Death"]
var currentGameState = "Menu"

let js;
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
    //Buttons
    button = new Button(canvas.width / 2, canvas.height / 2 - 100, 100, 50, 'Button.png', "Play");
    lvlUpButton = new Button(canvas.width / 2, canvas.height / 2 + 100, 100, 50, 'Button.png', "Level Up");
    deathButton = new Button(canvas.width / 2, canvas.height / 2 - 100, 100, 50, 'Button.png', "Menu");
    escButton = new Button(canvas.width - 50, 25, 100, 50, 'Button.png', "Escape");
    //Input
    input = new Input();
    //Score
    pScore = new Score();
    //UI
    healthUI = new InGameUI(50, 25, 100, 50, player.h.currentHealth, 'Health.png', "H:");
    scoreUI = new InGameUI(50, 75, 100, 50, pScore.currentScore, 'Score.png', "S:");
    totalScoreUI = new InGameUI(canvas.width / 2 - 100, 200, 100, 50, pScore.earnedScore, 'Score.png', "TS:");
    levelScoreUI = new InGameUI(canvas.width / 2 + 100, 200, 100, 50, player.currentLevel, 'Score.png', "Level:");
    scoreTotalUI = new InGameUI(canvas.width / 2 + 100, 200, 150, 50, pScore.earnedScore, 'Score.png', "Total:");
    scoreEarnedUI = new InGameUI(canvas.width / 2 - 100, 200, 150, 50, pScore.currentScore, 'Score.png', "Earned:");
    //music
    music = new Sound("Background.mp3");
    //Calling the Update function within a set interval
    myInterval = setInterval(Update, 1000 / FPS);
    MenuStart();
}

//Starting the Game
function GameStart(){
    currentGameState = GameStates[1];
    currentGameState = "Playing";
    player.Start(canvas.width / 2, canvas.height / 2, 500);
    waveMgr.Start();
    pScore.Start();
    music.Play();
}
//Starting the Menu
function MenuStart(){
    currentGameState = GameStates[0];
    music.Play();
}
//Starting the Death screen
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
    //Canvas filling with black
    canvas.fillStyle = "black";
    //Touch functions & Click Functions
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
    //Updating the Background
    background.Update();

    //Playing Game State
    if(currentGameState == GameStates[1])
    {
        //Updating the Player
        player.Update();

        //Updating Wave manager
        waveMgr.Update();
        //Updating in game UI text
        healthUI.text = player.h.currentHealth;
        scoreUI.text = pScore.currentScore;
        //Checking if button pressed
        if(escButton.Update())
        {
            DeathStart();
        }
    }
    //Menu Game State
    if(currentGameState == GameStates[0])
    {
        //Updating in game UI text
        totalScoreUI.text = pScore.earnedScore;
        levelScoreUI.text = player.currentLevel;
        //Checking Button press
        if(button.Update())
        {
            GameStart();
        }
        if(lvlUpButton.Update())
        {
            pScore.UpdateLevel();
        }
    }

    //Death Menu Game State
    if(currentGameState == GameStates[2])
    {
        //Updating UI text used
        scoreTotalUI.text = pScore.earnedScore;
        scoreEarnedUI.text = pScore.currentScore;
        //Checking button pressed
        if(deathButton.Update())
        {
            MenuStart();
        }
    }
    //Rendering Updates
    RenderMain();
    //Setting tap to false
    input.tap = false;
}





function RenderMain(){

    //Clearing Canvas
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    //Rendering Background First
    background.Render();
    //Setting up text
    styleText('white', '20px Times New Roman', 'center', 'middle');
    //Playing Game State
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
    //Menu Game State
    if(currentGameState == GameStates[0])
    {
        totalScoreUI.Render();
        levelScoreUI.Render();
        button.Render();
        lvlUpButton.Render();
    }
    //Death Menu Game State
    if(currentGameState == GameStates[2])
    {
        deathButton.Render();
        scoreTotalUI.Render();
        scoreEarnedUI.Render();
    }
}
//Claming a number between its min and max value passed in
function ClampNumber(num, min, max)
{
    var clampNo = Math.max(Math.min(num, Math.max(min, max)), Math.min(min, max));
    return clampNo;
}
//Calculating time passed for delta time
function CalculateTime(){
        now = Date.now();
        deltaTime = (now - lastUpdate) / 1000;
        lastUpdate = now;
}
//Touch Up function
function touchUp(evt) {
     evt.preventDefault();
     // Terminate touch path
     //Releasing the js and input
     js.onRelease();
     input.onRelease();
}
//Touch down function
function touchDown(evt) {
    evt.preventDefault();
    //Storing mouse click positions
    js.OnClick(evt.clientX, evt.clientY);
    input.OnClick(evt.clientX, evt.clientY);
    //Storing tap positions
    js.OnClick(evt.touches[0].pageX, evt.touches[0].pageY);
    input.OnClick(evt.touches[0].pageX, evt.touches[0].pageY);

}
//Touch move function
function touchXY(evt) {
    evt.preventDefault();
    //Updating the mouse and touch positions
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
//Setting style of text
function styleText(txtColour, txtFont, txtAlign, txtBaseline) {
     canvasContext.fillStyle = txtColour;
     canvasContext.font = txtFont;
     canvasContext.textAlign = txtAlign;
     canvasContext.textBaseline = txtBaseline;
}


