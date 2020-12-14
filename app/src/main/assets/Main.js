var canvas;
var canvasContext;

var FPS = 60;


var lastUpdate = Date.now();
var myInterval;
var now;
var deltaTime;

var playerHealth = 100;

var enemy = [];

let js;
let m;

let pr;

let bkg;

let player;

let waveMgr;



function load(){

    InitCanvas();

    js = new Joystick();


    player = new PlayerShip('ShipSpaceRocket.png', 'BulletF.png', 100);

    //enemyBasic = new EnemyShip('SpaceShip.png', 'Bullet.png', 10);

    bkg = new Render(canvas.width, canvas.height, 'backgroundBasic.png');

    waveMgr = new WaveManager(20, 2);



    StartPlayer();


    myInterval = setInterval(Update, 1000 / FPS);
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

    //Calculating Time
    CalculateTime();

        //checkForCollisions();

    //Updating the players Joystick
    player.m.moveDir.x = js.dir.x;
    player.m.moveDir.y = js.dir.y;

    //Updating the Player
    player.Update();

    waveMgr.Update();






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

    //Setting up text for debug
    styleText('white', '20px Courier New', 'center', 'middle');

    //waveMgr.enBasics.length

    /*
    for(i = 0; i < player.gun.bullets.length; i++)
    {
        canvasContext.fillText(i + " Bull Y: " + player.gun.bullets[i].m.position.y, canvas.width/2 +100, canvas.height/2 + (i * 50));
    }

    for(i = 0; i < waveMgr.enBasics.length; i++)
    {
        canvasContext.fillText(i + " EnnY: " + waveMgr.enBasics[i].m.position.y + "H: " + waveMgr.enBasics[i].h.currentHealth, canvas.width/2 -150, canvas.height/2 + (i * 50));
    }

    canvasContext.fillText(player.gun.bullets.length, canvas.width/2, 100);
    //canvasContext.fillText(waveMgr.enBasics[0].h.currentHealth, canvas.width/2, canvas.height/2 - 100);

    */

        canvasContext.fillText(player.h.currentHealth, canvas.width/2, 100);

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
}

function touchDown(evt) {
    evt.preventDefault();

    js.OnClick(evt.touches[0].pageX, evt.touches[0].pageY)
}

function touchXY(evt) {
    evt.preventDefault();

    if(js.touchActive == true)
    {
        js.OnHold(evt.touches[0].pageX, evt.touches[0].pageY);
    }
}

function styleText(txtColour, txtFont, txtAlign, txtBaseline) {
     canvasContext.fillStyle = txtColour;
     canvasContext.font = txtFont;
     canvasContext.textAlign = txtAlign;
     canvasContext.textBaseline = txtBaseline;
}


