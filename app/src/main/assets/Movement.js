class Movement{

    constructor(posX, posY, acc){

        this.position = {
            x : posX,
            y : posY
        };

        this.acceleration = acc;

        this.moveDir = {
            x : 0,
            y : 0
        };

    }

    Move(){
        this.position.x += this.moveDir.x * this.acceleration;
        this.position.y += this.moveDir.y * this.acceleration;
    }



}