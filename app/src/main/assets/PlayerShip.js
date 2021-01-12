class PlayerShip{

    constructor(rocketPath, bulletPath, maxHealth){

        this.r = new Render(75, 75, rocketPath);
        this.m = new Movement();
        this.gun = new Gun(1.5, bulletPath, this.r.spriteHeight / 2, 10, 0, -1, 150, 'F', 8, "PlayerShoot.wav");
        this.h = new Health(maxHealth);

    }

    //Start Function - Create the Player
    Start(posX, posY, acc){
        //Placing player at correct position
        this.m.Start(posX, posY, acc);
        this.h.currentHealth = this.h.maxHealth;
    }

    Update(){

        //Clamping the players position to the screen
        this.m.position.x = ClampNumber(this.m.position.x, 0, canvas.width - (this.r.spriteWidth / 2));
        this.m.position.y = ClampNumber(this.m.position.y, 0, canvas.height - (this.r.spriteHeight / 2));

        //Setting the moving Direction
        this.m.moveDir.x = js.dir.x;
        this.m.moveDir.y = js.dir.y;

        //Moving the Player
        this.m.Move();

        //Updating the Gun
        this.gun.Update(this.m.position.x, this.m.position.y);

        if(this.h.currentHealth <= 0)
        {
            currentGameState = "Menu";
        }
    }

    Render(){
        //Rendering the player Image and Gun
        this.r.RenderImage(this.m.position.x, this.m.position.y);
        this.gun.Render()
    }
}