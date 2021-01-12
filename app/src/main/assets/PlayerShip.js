class PlayerShip{

    constructor(rocketPath, bulletPath, maxHealth){

        this.r = new Render(75, 75, rocketPath);
        this.m = new Movement();
        this.gun = new Gun(1.5, bulletPath, this.r.spriteHeight / 2, 10, 0, -1, 150, 'F', 8, "PlayerShoot.wav");
        this.h = new Health(maxHealth);

        this.deathAnimation = new Animation(96, 96, 'Explosion.png', 10,0,0.1,10);

        this.currentLevel = 1;

        this.s = new Sound("Explosion.mp3");
        this.soundP = false;

    }

    //Start Function - Create the Player
    Start(posX, posY, acc){
        //Placing player at correct position
        this.m.Start(posX, posY, acc);
        this.h.currentHealth = this.h.maxHealth;

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
            //currentGameState = "Menu";
        }
        else if(this.deathAnimation.animationFinished == true)
        {
            DeathStart();
        }
    }

    Render(){
        //Rendering the player Image and Gun
        if(this.h.currentHealth <= 0)
        {
            this.deathAnimation.AnimateFrame(this.m.position.x, this.m.position.y);
            if(!this.soundP)
            {
                this.s.Play();
            }
        }
        else
        {
            this.r.RenderImage(this.m.position.x, this.m.position.y);

        }
        this.gun.Render()
    }
}