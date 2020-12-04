class Joystick{

    constructor(){

        this.firstTouch = {
            x:0,
            y:0
        };

        this.updatedTouch = {
            x:0,
            y:0
        };

        this.dist = {
            x: 0,
            y: 0,
            currentDist: 0,
            max:100
        };

        this.dir = {
            x: 0,
            y:0
        };

        this.restraints = {
            sx: 0,
            sy: 0,
            ex: canvas.width,
            ey: canvas.height
        };

        this.touchActive = false;
        this.fr = new Render(25, 25, 'JoystickMain.png');

        this.br = new Render(50, 50, 'JoystickBkg.png');
    }

    OnClick(posX, posY){

        this.firstTouch.x = posX;
        this.firstTouch.y = posY;

        if(this.firstTouch.x >= this.restraints.sx && this.firstTouch.x <= this.restraints.ex)
        {
            if(this.firstTouch.y >= this.restraints.sy && this.firstTouch.y <= this.restraints.ey)
            {
                if(this.touchActive != true)
                {
                    this.touchActive = true;
                }
            }
        }



    }

    OnHold(posX, posY){

        this.updatedTouch.x = posX;
        this.updatedTouch.y = posY;

        this.dist.x = this.updatedTouch.x - this.firstTouch.x;
        this.dist.y = this.updatedTouch.y - this.firstTouch.y;

        this.dist.currentDist = Math.sqrt(this.dist.x * this.dist.x + this.dist.y * this.dist.y);

        if(this.dist.currentDist >= this.dist.max)
        {
            this.dist.currentDist = this.dist.max;
        }
        else if(this.dist.currentDist <= -this.dist.max)
        {
            this.dist.currentDist = -this.dist.max;
        }

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

        this.dir.x = this.dist.x /100;
        this.dir.y = this.dist.y /100;

    }

    onRelease(){
        this.touchActive = false;

        this.dir.x = 0;
        this.dir.y = 0;
    }

    onRender(){
        if(this.touchActive)
        {
            this.br.RenderImage(this.firstTouch.x, this.firstTouch.y);

            this.fr.RenderImage(this.firstTouch.x + this.dist.x, this.firstTouch.y + this.dist.y);
            //this.r.RenderCircle(this.firstTouch.x, this.firstTouch.y, "Blue");
            //this.r.RenderCircle(this.firstTouch.x + this.dist.x, this.firstTouch.y + this.dist.y, "Blue");
        }

    }




}