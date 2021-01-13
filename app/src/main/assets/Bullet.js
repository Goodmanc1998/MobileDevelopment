class Bullet{
    //Constructor
    constructor(width, height, path, dmg, type){
        //Storing Movement
        this.m = new Movement();
        //Storing Renderer
        this.r = new Render(width, height, path);
        //Storing damage, used tye and collision
        this.damage = dmg;
        this.used = false;
        this.type = type;
        this.collision = new CollisionDetection();
    }
    //Starting the projectile and taking in pos X, Y, acceleration and dir X, Y
    Start(posX, posY, acc, dirX, dirY){
        this.m.Start(posX, posY, acc)
        this.m.moveDir.x = dirX;
        this.m.moveDir.y = dirY;
    }

    Update(){
        //Moving the Projectile
        this.m.Move();
        //Checking collisions if the bullet is within screen space
        if(this.m.position.y > 0)
        {
            this.collision.position.x = this.m.position.x;
            this.collision.position.y = this.m.position.y;
        }
    }
    //Rendering the Projectile
    Render(){
        this.r.RenderImage(this.m.position.x, this.m.position.y)
    }

}