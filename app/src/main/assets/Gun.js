class Gun{

    constructor(shootDelay, path, heightDiff, dmg, dirX, dirY, acc){
        this.canShoot = false;
        this.hDiff = heightDiff;

        this.bullets = [];

        this.currentShootTime = 0;
        this.shootDelay = shootDelay;

        this.maxBullets = 10;

        this.dmg = dmg;

        this.imgPath = path;

        this.dirX = dirX;
        this.dirY = dirY;

        this.bulletAcc = acc;



    }



    Update(posX, posY){
        this.currentShootTime += deltaTime;

        if(this.currentShootTime >= this.shootDelay)
        {
            this.Shoot(posX, posY);

            this.currentShootTime = 0;
        }


        this.Length = this.bullets.length;
        if(this.bullets.length >= 1 )
        {
            for(this.i = 0; this.i < this.bullets.length; this.i++)
            {
                this.bullets[this.i].Update();

                this.CollisionCheck(this.i);

                if(this.bullets[this.i].m.position.y > canvas.height + 50 || this.bullets[this.i].m.position.y < -50 )
                {
                    //this.RemoveBullet(i);
                    this.bullets[this.i].used = true;
                    this.bullets.splice(this.i, 1);
                }
            }
        }
    }

    Shoot(posX, posY){
        if(this.bullets.length <= this.maxBullets)
        {
            this.bullets.push(new Bullet(8, 8, this.imgPath, this.dmg));
            this.bullets[this.bullets.length -1].Start(posX, posY - this.hDiff, this.bulletAcc, this.dirX, this.dirY);

        }


    }

    CollisionCheck(index){

        for(this.e = 0; this.e < waveMgr.enBasics.length; this.e++)
        {
            if(this.bullets[index].collision.collisionBasicMath(waveMgr.enBasics[this.e].m.position.x, waveMgr.enBasics[this.e].m.position.y) == true)
            {
                waveMgr.enBasics[this.e].h.TakeDamage(this.dmg);

                this.bullets[index].used = true;
                this.bullets.splice(index, 1);
            }
        }

    }

    RemoveBullet(i){
        this.bullets.splice(i, 1);
    }

    Render(){
        for(this.i = 0; this.i < this.bullets.length; this.i++)
        {
            this.bullets[this.i].Render();
        }
    }


}