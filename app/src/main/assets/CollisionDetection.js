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

    collisionBasicMath(entityX, EntityY, size){

        this.dist.x = entityX - this.position.x;
        this.dist.y = EntityY - this.position.y;



        if(this.dist.x <= (size / 2) && this.dist.x >= (-size / 2))
        {
            if(this.dist.y <=  (size / 2) && this.dist.y >= (-size / 2))
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
}