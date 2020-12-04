class EnemyShip{

    constructor(rocketPath, bulletPath, maxHealth){

        this.r = new Render(75, 75, rocketPath);

        this.m = new Movement();

        this.gun = new Gun(10000, bulletPath, -this.r.spriteHeight / 2, 10, 0, 1, 120);

        this.h = new Health(maxHealth);

        this.aliveTime = 0;



    }

    Start(posX, posY, acc){
        this.m.Start(posX, posY, acc);
    }

    Update(){

        this.m.moveDir.x = 0;
        this.m.moveDir.y = 1;

        this.m.Move();

        this.gun.Update(this.m.position.x, this.m.position.y);

        this.aliveTime += deltaTime;


    }


    Render(){
        this.r.RenderImage(this.m.position.x, this.m.position.y);
        this.gun.Render()
    }
}