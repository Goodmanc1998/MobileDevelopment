class InGameUI{

    constructor(posX, posY, w, h, textVar, uiPath){

        this.p = new Movement();

        this.p.position.x = posX;
        this.p.position.y = posY;

        this.r = new Render(w, h, uiPath);

        this.size = {
            width : w,
            height : h
        };

        this.text = textVar;

    }

    Update(){
        this.text;
    }

    Render(){
        this.r.RenderImage(this.p.position.x, this.p.position.y);
        canvasContext.fillText(this.text, this.p.position.x, this.p.position.y);
    }
}