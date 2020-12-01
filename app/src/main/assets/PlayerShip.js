class PlayerShip{

    constructor(rocketPath, bulletPath){

        this.r = new Render(75, 75, rocketPath);

        this.m = new Movement();

        this.gun = new Gun(2, bulletPath, this.r.spriteHeight);

    }

    Start(posX, posY, acc){
        this.m.Start(posX, posY, acc);
    }

    Update(){

        this.m.moveDir.x = js.dir.x;
        this.m.moveDir.y = js.dir.y;

        this.m.Move();

        this.gun.Update(this.m.position.x, this.m.position.y);
    }

    Render(){
        this.r.RenderImage(this.m.position.x, this.m.position.y);
        this.gun.Render()
    }
}