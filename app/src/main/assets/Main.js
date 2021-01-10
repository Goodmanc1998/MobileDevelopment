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

let js;
let m;

let pr;

let bkg;

let player;

let waveMgr;

let button;
let input;

function load(){

    InitCanvas();

    //Joystick
    js = new Joystick();
    //Player
    player = new PlayerShip('ShipSpaceRocket.png', 'BulletF.png', 100);
    //Background
    bkg = new Render(canvas.width, canvas.height, 'backgroundBasic.png');
    //WaveManager
    waveMgr = new WaveManager(20, 2);

    button = new Button(canvas.width / 2, canvas.height / 2 - 100, 100, 50, 'Button.png');
    input = new Input();
    //Starting the Player


    //Calling the Update function within a set interval
    myInterval = setInterval(Update, 1000 / FPS);
}

//Starting the Player
function GameStart(){
    currentGameState = "Playing";
    player.Start(canvas.width / 2, canvas.height / 2, 500);
    waveMgr.Start();
}

//Starting the Canvas
function InitCanvas(){
    //Canvas Context
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    //Canvas Size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
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

    if(currentGameState == "Playing")
    {
            //Updating the Player
            player.Update();

        //Updating Wave manager
        waveMgr.Update();
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
    bkg.RenderImage(canvas.width/ 2, canvas.height / 2);

    //Rendering Joystick
    js.onRender();

    //Rendering Player
    player.Render();

    waveMgr.Render();

    button.Render();

    //Setting up text for debug
    styleText('white', '20px Courier New', 'center', 'middle');


    canvasContext.fillText(currentGameState, canvas.width/2, 100);

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


