class CollisionDetection{
    //Constructor
    constructor(){
        //Storing position
        this.position = {
            x: 0,
            y: 0
        };
        //Storing the dist
        this.dist = {
            x: 0,
            y: 0,
        };
    }
    //Collsion function taking in pos X, Y and size of entity
    collisionBasicMath(entityX, entityY, size){
        //Getting the distance
        this.dist.x = entityX - this.position.x;
        this.dist.y = entityY - this.position.y;
        //Checking the distance and returning false if not within distance
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