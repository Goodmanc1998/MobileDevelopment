var canvas;
var canvasContext;

var FPS = 60;


var lastUpdate = Date.now();
var myInterval;
var now;
var deltaTime;

let js;
let m;

let pr;

let bullet;
let playerGun;

let bkg;

let player;


function load(){

    InitCanvas();

    js = new Joystick();


    player = new PlayerShip('ShipSpaceRocket.png', 'BulletF.png');


    bkg = new Render(canvas.width, canvas.height, 'backgroundBasic.png');

    myInterval = setInterval(Update, 1000 / FPS);

    StartPlayer();
}

function StartPlayer(){
    player.Start(canvas.width / 2, canvas.height / 2, 500);
}

function InitCanvas(){
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if(canvas.getContext){
        canvas.addEventListener("touchstart", touchDown, false);
        canvas.addEventListener("touchmove", touchXY, true);
        canvas.addEventListener("touchend", touchUp, false);
    }


}

function Update() {

    CalculateTime();

    player.Update();

    player.m.moveDir.x = js.dir.x;
    player.m.moveDir.y = js.dir.y;

    RenderMain();
}

function touchUp(evt) {
     evt.preventDefault();
     // Terminate touch path

     js.onRelease();
}

function touchDown(evt) {
    evt.preventDefault();
    //touchXY(evt);

    js.OnClick(evt.touches[0].pageX, evt.touches[0].pageY)
}

function touchXY(evt) {
    evt.preventDefault();

    if(js.touchActive == true)
    {
        js.OnHold(evt.touches[0].pageX, evt.touches[0].pageY);
    }


}

function RenderMain(){
    //Clearing Canvas
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    styleText('white', '20px Courier New', 'center', 'middle');

    bkg.RenderImage(canvas.width/ 2, canvas.height / 2);

    js.onRender();

    player.Render()



    //canvasContext.fillText(playerGun.bullets.length, canvas.width/2, canvas.height/2 + 100);

}

function CalculateTime(){
        now = Date.now();
        deltaTime = (now - lastUpdate) / 1000;
        lastUpdate = now;
}

function styleText(txtColour, txtFont, txtAlign, txtBaseline) {
     canvasContext.fillStyle = txtColour;
     canvasContext.font = txtFont;
     canvasContext.textAlign = txtAlign;
     canvasContext.textBaseline = txtBaseline;
}

