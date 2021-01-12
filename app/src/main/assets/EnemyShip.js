class EnemyShip{

    constructor(rocketPath, bulletPath, maxHealth, damage){

        this.r = new Render(75, 75, rocketPath);

        this.m = new Movement();

        this.h = new Health(maxHealth);

        this.gun = new Gun(1.5, bulletPath, -this.r.spriteHeight / 2, damage, 0, 1, 150, 'E', 8, "PlayerShoot.wav");


        this.aliveTime = true;
        this.scoreAdded = false;

        this.deathAnimation = new Animation(96, 96, 'Explosion.png', 10,0,0.1,10);
        this.s = new Sound("Explosion.mp3");
        this.soundP = false;

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
            if(this.scoreAdded != true)
            {
                this.scoreAdded = true;
                pScore.UpdateScore(10);
            }
        }

        this.aliveTime += deltaTime;


        this.gun.Update(this.m.position.x, this.m.position.y);

    }


    Render(){

        if(this.h.currentHealth > 0)
        {
            this.r.RenderImage(this.m.position.x, this.m.position.y);
        }
        else
        {
            this.deathAnimation.AnimateFrame(this.m.position.x, this.m.position.y);
            if(!this.soundP)
            {
                this.soundP = true;
                this.s.Play();
            }
        }


        this.gun.Render();
    }
}