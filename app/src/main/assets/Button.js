class Button{
    //Constructor
    constructor(posX, posY, w, h, buttonPath, buttonText){

        //Storing Position and setting position
        this.p = new Movement();
        this.p.position.x = posX;
        this.p.position.y = posY;
        //Storing the size
        this.size = {
            width : w,
            height : h
        };
        //Storing the button text
        this.text = buttonText;
        //Storing the Renderer and Sound
        this.r = new Render(w, h, buttonPath);
        this.s = new Sound("Click.wav")
    }

    Update(){
        //Checking if the X and Y position is within the the button space
        if(input.firstTouch.x > this.p.position.x - (this.size.width / 2) && input.firstTouch.x < this.p.position.x + (this.size.width / 2))
        {
            if(input.firstTouch.y > this.p.position.y - (this.size.height / 2) && input.firstTouch.y < this.p.position.y + (this.size.height / 2))
            {
                if(input.tap == true)
                {
                    //Returning true if clicked
                    return true;
                    this.s.Play();
                }
            }
            else
                return false;
        }
        else
            return false;
        //Returning false if not within X and Y pos
    }

    //Rendering the image and entering the text
    Render(){
        this.r.RenderImage(this.p.position.x, this.p.position.y);
        canvasContext.fillText(this.text, this.p.position.x, this.p.position.y);
    }
}