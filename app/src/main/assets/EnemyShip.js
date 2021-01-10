class EnemyShip{

    constructor(rocketPath, bulletPath, maxHealth){

        this.r = new Render(75, 75, rocketPath);

        this.m = new Movement();

        this.h = new Health(maxHealth);

        this.gun = new Gun(1.5, bulletPath, this.r.spriteHeight / 2, 10, 0, 1, 150, 'E', 8);


        this.aliveTime = true;

    }

    Start(posX, posY, acc){
        this.m.Start(posX, posY, acc);

        this.m.moveDir.x = 0;
        this.m.moveDir.y = 1;
    }

    Update(){


        if(this.h.currentHealth > 0)
        {
            this.m.Move();
        }
        else
        {
            this.gun.active = false;
        }

        this.aliveTime += deltaTime;

        this.gun.Update(this.m.position.x, this.m.position.y);


    }


    Render(){

        if(this.h.currentHealth > 0)
        {
            this.r.RenderImage(this.m.position.x, this.m.position.y);
        }


        this.gun.Render();
    }
}