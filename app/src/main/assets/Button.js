class Button{

    constructor(posX, posY, w, h, buttonPath, buttonText){

        this.p = new Movement();

        this.p.position.x = posX;
        this.p.position.y = posY;

        this.size = {
            width : w,
            height : h
        };

        this.text = buttonText;

        this.r = new Render(w, h, buttonPath);

        this.s = new Sound("Click.wav")


    }

    Update(){

        if(input.firstTouch.x > this.p.position.x - (this.size.width / 2) && input.firstTouch.x < this.p.position.x + (this.size.width / 2))
        {
            if(input.firstTouch.y > this.p.position.y - (this.size.height / 2) && input.firstTouch.y < this.p.position.y + (this.size.height / 2))
            {
                if(input.tap == true)
                {
                  return true;
                  this.s.Play();
                }
            }
            else
                return false;
        }
        else
            return false;

    }

    Render(){
        this.r.RenderImage(this.p.position.x, this.p.position.y);
        canvasContext.fillText(this.text, this.p.position.x, this.p.position.y);
    }
}