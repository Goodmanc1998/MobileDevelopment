class Bullet{

    constructor(width, height, path){

        this.m = new Movement();

        this.r = new Render(width, height, path)

        this.aliveTime = 0;

    }

    Start(posX, posY, acc, dirX, dirY){
        this.m.Start(posX, posY, acc)
        this.m.moveDir.x = dirX;
        this.m.moveDir.y = dirY;
    }

    Update(){
        this.m.Move();

        this.aliveTime += deltaTime;
    }

    Render(){
        this.r.RenderImage(this.m.position.x, this.m.position.y)
    }

}