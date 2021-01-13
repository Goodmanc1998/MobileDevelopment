class Joystick{
    //Constructor
    constructor(){
        //Storing the first touch
        this.firstTouch = {
            x:0,
            y:0
        };
        //Storing the Updated touch
        this.updatedTouch = {
            x:0,
            y:0
        };
        //Storing the dist
        this.dist = {
            x: 0,
            y: 0,
            currentDist: 0,
            max:100
        };
        //Storing the direction
        this.dir = {
            x: 0,
            y:0
        };
        //Storing the restraints
        this.restraints = {
            sx: 0,
            sy: 0,
            ex: canvas.width,
            ey: canvas.height
        };

        //Setting touch active to false
        this.touchActive = false;
        //Storing the front and back Render for the Joystick
        this.fr = new Render(25, 25, 'JoystickMain.png');
        this.br = new Render(50, 50, 'JoystickBkg.png');
    }

    OnClick(posX, posY){
        //Updating the first touch
        this.firstTouch.x = posX;
        this.firstTouch.y = posY;
        //Checking the touch position is within the restraints
        if(this.firstTouch.x >= this.restraints.sx && this.firstTouch.x <= this.restraints.ex)
        {
            if(this.firstTouch.y >= this.restraints.sy && this.firstTouch.y <= this.restraints.ey)
            {
                if(this.touchActive != true)
                {
                    //Setting touch active to true
                    this.touchActive = true;
                }
            }
        }
    }

    OnHold(posX, posY){

        //Updating the touch position
        this.updatedTouch.x = posX;
        this.updatedTouch.y = posY;
        //Updating the distance X, Y
        this.dist.x = this.updatedTouch.x - this.firstTouch.x;
        this.dist.y = this.updatedTouch.y - this.firstTouch.y;

        //Getting total distance
        this.dist.currentDist = Math.sqrt(this.dist.x * this.dist.x + this.dist.y * this.dist.y);

        //Checking the current distance
        if(this.dist.currentDist >= this.dist.max)
        {
            this.dist.currentDist = this.dist.max;
        }
        else if(this.dist.currentDist <= -this.dist.max)
        {
            this.dist.currentDist = -this.dist.max;
        }

        //Checking the dist X, Y
        if(this.dist.x >= this.dist.max)
        {
            this.dist.x = this.dist.max;
        }
        else if(this.dist.x <= -this.dist.max)
        {
            this.dist.x = -this.dist.max;
        }

        if(this.dist.y >= this.dist.max)
        {
            this.dist.y = this.dist.max;
        }
        else if(this.dist.y <= -this.dist.max)
        {
            this.dist.y = -this.dist.max;
        }

        //Updating the Dir X, Y
        this.dir.x = this.dist.x /100;
        this.dir.y = this.dist.y /100;

    }

    //Releasing the touch Active and setting Dir X, Y to 0
    onRelease(){
        this.touchActive = false;
        this.dir.x = 0;
        this.dir.y = 0;
    }
    //Rendering the joystick images
    onRender(){
        if(this.touchActive)
        {
            this.br.RenderImage(this.firstTouch.x, this.firstTouch.y);
            this.fr.RenderImage(this.firstTouch.x + this.dist.x, this.firstTouch.y + this.dist.y);
        }
    }
}