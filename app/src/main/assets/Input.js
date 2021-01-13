class Input{
    //Constructor
    constructor(){
        //Storing the First touch X, Y
        this.firstTouch = {
            x:0,
            y:0
        };
        //Storing the Updated touch X, Y
        this.updatedTouch = {
            x:0,
            y:0
        };
        //Storing touch active and tap
        this.touchActive = false;
        this.tap = false;
    }

    OnClick(posX, posY){
        //Updating the first touch positions
        this.firstTouch.x = posX;
        this.firstTouch.y = posY;
        //Setting touch active to true if its not true, same with false
        if(this.touchActive != true)
        {
            this.touchActive = true;
            this.tap = true;
        }
    }
    //Updating the on hold positions
    OnHold(posX, posY){
        this.firstTouch.x = posX;
        this.firstTouch.y = posY;
    }
    //Releasing the touch active
    onRelease(){
        this.touchActive = false;
    }
}