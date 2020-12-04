class CollisionDetection{

    constructor(){
        this.position = {
            x: 0,
            y: 0
        };

        this.dist = {
            x: 0,
            y: 0,
            currentDist : 1000
        };
    }

    collisionBasicMath(entityX, EntityY){

        this.dist.x = entityX - this.position.x;
        this.dist.y = EntityY - this.position.y;



        if(this.dist.x <= 75 / 2 && this.dist.x >= -75 / 2)
        {
            if(this.dist.y <=  75 / 2 && this.dist.y >= -75 / 2)
            {
                return true;
                //return this.collisionMath(this.distX, this.distY);
            }
            else
            {
                return false;
            }
        }


    }


    collisionMath(distX, distY) {

        this.dist.currentDist =  Math.sqrt(distX * distX + distY * distY);

        //Math.floor(this.dist.currentDist);

        if(this.dist.currentDist <= 75 )
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}