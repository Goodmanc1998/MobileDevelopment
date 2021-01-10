class Input{

    constructor(){

        this.firstTouch = {
            x:0,
            y:0
        };

        this.updatedTouch = {
            x:0,
            y:0
        };

        this.touchActive = false;
    }

    OnClick(posX, posY){

        this.firstTouch.x = posX;
        this.firstTouch.y = posY;

        if(this.touchActive != true)
        {
            this.touchActive = true;
        }
    }

    OnHold(posX, posY){
        this.firstTouch.x = posX;
        this.firstTouch.y = posY;
    }

    onRelease(){
        this.touchActive = false;
    }
}