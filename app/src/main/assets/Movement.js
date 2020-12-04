class Movement{

    constructor(){

        this.position = {
            x : 0,
            y : 0
        };

        this.moveDir = {
            x : 0,
            y : 0
        };

    }

    Start(posX, posY, acc){
        this.position.x = posX;
        this.position.y = posY;
        this.acceleration = acc;
    }

    Move(){
        this.position.x += Math.floor(this.moveDir.x * this.acceleration * deltaTime);
        this.position.y += Math.floor(this.moveDir.y * this.acceleration * deltaTime);
    }



}