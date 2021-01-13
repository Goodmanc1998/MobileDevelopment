class EnemyShip{
    //Constructor
    constructor(rocketPath, bulletPath, maxHealth, damage){
        //storing the Renderer
        this.r = new Render(75, 75, rocketPath);
        //Storing movement
        this.m = new Movement();
        //Storing Health
        this.h = new Health(maxHealth);
        //Storing Gun
        this.gun = new Gun(1.5, bulletPath, -this.r.spriteHeight / 2, damage, 0, 1, 150, 'E', 8, "PlayerShoot.wav");
        //Storing the alive time and score added bool
        this.aliveTime = 0;
        this.scoreAdded = false;
        //Storing Animation, sound and setting sound played to false
        this.deathAnimation = new Animation(96, 96, 'Explosion.png', 10,0,0.1,10);
        this.s = new Sound("Explosion.mp3");
        this.soundP = false;
    }
    //Starting the entity at position and setting moving direction
    Start(posX, posY, acc){
        this.m.Start(posX, posY, acc);
        this.m.moveDir.x = 0;
        this.m.moveDir.y = 1;
    }

    Update(){

        //Moving if the current health is > 0
        if(this.h.currentHealth > 0)
        {
            this.m.Move();
        }
        else
        {
            //Setting the gun to false and adding score
            this.gun.active = false;
            if(this.scoreAdded != true)
            {
                this.scoreAdded = true;
                pScore.UpdateScore(10);
            }
        }
        //Updating alive time and updating the Gun
        this.aliveTime += deltaTime;
        this.gun.Update(this.m.position.x, this.m.position.y);
    }

    Render(){
        //Rendering the enemy image if health is > 0
        if(this.h.currentHealth > 0)
        {
            this.r.RenderImage(this.m.position.x, this.m.position.y);
        }
        else
        {
            //Playing the death animation and playing the death sound
            this.deathAnimation.AnimateFrame(this.m.position.x, this.m.position.y);
            if(!this.soundP)
            {
                this.soundP = true;
                this.s.Play();
            }
        }
        //Rendering the Gun
        this.gun.Render();
    }
}