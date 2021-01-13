class PlayerShip{
    //Constructor
    constructor(rocketPath, bulletPath, maxHealth){
        //Storing the Renderer and movement
        this.r = new Render(75, 75, rocketPath);
        this.m = new Movement();
        //Storing the Gun and Health
        this.gun = new Gun(1.5, bulletPath, this.r.spriteHeight / 2, 10, 0, -1, 150, 'F', 8, "PlayerShoot.wav");
        this.h = new Health(maxHealth);
        //Storing the death animation
        this.deathAnimation = new Animation(96, 96, 'Explosion.png', 10,0,0.1,10);
        //Storing the current level
        this.currentLevel = 1;
        //Storing death sound and played state
        this.s = new Sound("Explosion.mp3");
        this.soundP = false;
    }

    //Start Function - Create the Player
    Start(posX, posY, acc){
        //Placing player at correct position
        this.m.Start(posX, posY, acc);
        this.h.currentHealth = this.h.maxHealth;
        //Getting the gun and health and setting them to variables dependant on level
        this.gun.damage = 5 + Math.floor((10 * this.currentLevel) / 2);
        this.h.maxHealth = 95 + Math.floor((10 * this.currentLevel) / 2);
    }

    Update(){

        //Clamping the players position to the screen
        this.m.position.x = ClampNumber(this.m.position.x, 0, canvas.width - (this.r.spriteWidth / 2));
        this.m.position.y = ClampNumber(this.m.position.y, 0, canvas.height - (this.r.spriteHeight / 2));

        if(this.h.currentHealth > 0)
        {
            //Setting the moving Direction
            this.m.moveDir.x = js.dir.x;
            this.m.moveDir.y = js.dir.y;
            //Moving the Player
            this.m.Move();
            //Updating the Gun
            this.gun.Update(this.m.position.x, this.m.position.y);
        }
        else if(this.deathAnimation.animationFinished == true)
        {
            //Setting death state
            DeathStart();
        }
    }

    Render(){
        //Rendering the player Image and Gun
        if(this.h.currentHealth <= 0)
        {
            //Rendering the death animation and playing the death sound
            this.deathAnimation.AnimateFrame(this.m.position.x, this.m.position.y);
            if(!this.soundP)
            {
                this.s.Play();
            }
        }
        else
        {
            //Rendering the player
            this.r.RenderImage(this.m.position.x, this.m.position.y);
        }
        //Rendering the Gun
        this.gun.Render()
    }
}