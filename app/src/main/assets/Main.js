var canvas;
var canvasContext;

var FPS = 60;


let js;
let m;

let pr;


function load(){

    InitCanvas();

    js = new Joystick();
    m = new Movement(canvas.width / 2, canvas.height / 2, 5);

    pr = new Render(75, 75, 'RTS_Crate_0.png')


    setInterval(Update, 1000 / FPS);
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

    styleText('black', '20px Courier New', 'center', 'middle');
}

function Update() {

    RenderMain();

    m.moveDir.x = js.dir.x;
    m.moveDir.y = js.dir.y;

    m.Move();

}

function touchUp(evt) {
     evt.preventDefault();
     // Terminate touch path
     lastPt=null;

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

    js.onRender();

    pr.RenderImage(m.position.x, m.position.y);



}

function styleText(txtColour, txtFont, txtAlign, txtBaseline) {
     canvasContext.fillStyle = txtColour;
     canvasContext.font = txtFont;
     canvasContext.textAlign = txtAlign;
     canvasContext.textBaseline = txtBaseline;
}

