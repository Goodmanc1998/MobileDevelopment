class Movement{
    //Constructor
    constructor(){
        //Storing position x, y
        this.position = {
            x : 0,
            y : 0
        };
        //Storing move direction x, y
        this.moveDir = {
            x : 0,
            y : 0
        };

    }
    //Starting the position in pos X, Y and acceleration
    Start(posX, posY, acc){
        this.position.x = posX;
        this.position.y = posY;
        this.acceleration = acc;
    }
    //Moving the position by updating it related to direction, acceleration
    Move(){
        this.position.x += Math.floor(this.moveDir.x * this.acceleration * deltaTime);
        this.position.y += Math.floor(this.moveDir.y * this.acceleration * deltaTime);
    }



}