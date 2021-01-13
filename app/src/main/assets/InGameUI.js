class InGameUI{
    //Constructor
    constructor(posX, posY, w, h, textVar, uiPath, txt){
        //Storing Position and x, y position
        this.p = new Movement();
        this.p.position.x = posX;
        this.p.position.y = posY;
        //Storing the renderer
        this.r = new Render(w, h, uiPath);
        //Storing the size
        this.size = {
            width : w,
            height : h
        };
        //Storing the passed in variable path and text
        this.text = textVar;
        this.textW = txt;
    }
    //Rendering the Game UI with text
    Render(){
        this.r.RenderImage(this.p.position.x, this.p.position.y);
        canvasContext.fillText(this.textW + this.text, this.p.position.x, this.p.position.y);
    }
}