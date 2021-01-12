class Bullet{

    constructor(width, height, path, dmg, type){

        this.m = new Movement();

        this.r = new Render(width, height, path);

        this.damage = dmg;

        this.used = false;

        this.type = type;

        this.collision = new CollisionDetection();
    }

    Start(posX, posY, acc, dirX, dirY){
        this.m.Start(posX, posY, acc)
        this.m.moveDir.x = dirX;
        this.m.moveDir.y = dirY;
    }

    Update(){
        this.m.Move();
        if(this.m.position.y > 0)
        {
            this.collision.position.x = this.m.position.x;
            this.collision.position.y = this.m.position.y;
        }


    }

    Render(){
        this.r.RenderImage(this.m.position.x, this.m.position.y)
    }

}