class Gun{
    //Constructor
    constructor(shootDelay, path, heightDiff, dmg, dirX, dirY, acc, type, size, soundPath){
        //storing the base variables
        this.canShoot = false;
        this.hDiff = heightDiff;
        this.bullets = [];
        this.bulRemove = [];
        this.currentShootTime = 0;
        this.shootDelay = shootDelay;
        this.maxBullets = 10;
        this.dmg = dmg;
        this.imgPath = path;
        this.dirX = dirX;
        this.dirY = dirY;
        this.bulletAcc = acc;
        this.type = type;
        this.size = size;
        this.active = true;
        this.s = new Sound(soundPath)
    }



    Update(posX, posY){

        //Updating the time to shoot
        this.currentShootTime += deltaTime;
        if(this.bulRemove.length > 0)
        {
            this.RemoveBullet();
        }
        //Shooting if time is greater than shoot delay and if the gun is active
        if(this.currentShootTime >= this.shootDelay && this.active == true)
        {
            this.Shoot(posX, posY);
            //Resetting the timer
            this.currentShootTime = 0;
        }
        //Updating Bullets
        if(this.bullets.length >= 1 )
        {
            //Iterating through the bullets
            for(this.i = 0; this.i < this.bullets.length; this.i++)
            {
                //Updating the bullet
                this.bullets[this.i].Update();
                //Checking for collisions on the bullets
                this.CollisionCheck(this.i);
                //Removing the bullets if outside screen space
                if(this.bullets[this.i].m.position.y > canvas.height + 50 || this.bullets[this.i].m.position.y < -50 )
                {
                    this.bulRemove.push(this.i);
                    this.bullets[this.i].used = true;
                }
            }
        }
    }
    //Shooting taking in a pos X, Y
    Shoot(posX, posY){
        //Shooting if the bullets is less than maximum bullets
        if(this.bullets.length <= this.maxBullets)
        {
            //Creating the new bullet and starting it, playing shooting sound
            this.s.Play();
            this.bullets.push(new Bullet(this.size, this.size, this.imgPath, this.dmg, this.type));
            this.bullets[this.bullets.length -1].Start(posX, posY - this.hDiff, this.bulletAcc, this.dirX, this.dirY);
        }
    }

    CollisionCheck(index){
        //Checking if bullet is Friendly
        if(this.bullets[index].type == 'F')
        {
            //Running through each enemy
            for(this.e = 0; this.e < waveMgr.enBasics.length; this.e++)
            {
                //Checking collision against enemy
                if(this.bullets[index].collision.collisionBasicMath(waveMgr.enBasics[this.e].m.position.x, waveMgr.enBasics[this.e].m.position.y, waveMgr.enBasics[this.e].r.spriteWidth) == true)
                {
                    //Enemy taking damage, and removing the bullet
                    waveMgr.enBasics[this.e].h.TakeDamage(this.dmg);
                    this.bullets[index].used = true;
                    this.bulRemove.push(index);
                }
            }
        }
        //Checking if the bullet is Enemy
        if(this.bullets[index].type == 'E')
        {
            //Checking collisions with the player
            if(this.bullets[index].collision.collisionBasicMath(player.m.position.x, player.m.position.y, player.r.spriteWidth) == true)
            {
                //Player taking damage, and removing the enemy
                player.h.TakeDamage(this.dmg);
                this.bullets[index].used = true;
                this.bulRemove.push(index);
            }
        }
    }

    //Removing any left over bullets
    RemoveBullet(){

        for(this.i = 0; this.i < this.bulRemove.length; this.i++)
        {
            this.bullets.splice(this.bulRemove[this.i], 1);
        }
        this.bulRemove.splice(0, this.bulRemove.length);
    }
    //Rendering the bullets
    Render(){
        for(this.i = 0; this.i < this.bullets.length; this.i++)
        {
            this.bullets[this.i].Render();
        }
    }


}