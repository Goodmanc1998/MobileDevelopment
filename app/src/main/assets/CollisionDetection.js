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

    collisionBasicMath(entityX, entityY, size){

        this.dist.x = entityX - this.position.x;
        this.dist.y = entityY - this.position.y;



        if(this.dist.x <= (size / 2) && this.dist.x >= (-size / 2))
        {
            if(this.dist.y <=  (size / 2) && this.dist.y >= (-size / 2))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        else
        {
            return false;
        }
    }
}