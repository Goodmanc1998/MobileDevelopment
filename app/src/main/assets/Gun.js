class Gun{

    constructor(shootDelay, path, heightDiff, dmg, dirX, dirY, acc, type, size, soundPath){
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
        this.currentShootTime += deltaTime;

        if(this.bulRemove.length > 0)
        {
            this.RemoveBullet();
        }

        if(this.currentShootTime >= this.shootDelay && this.active == true)
        {
            this.Shoot(posX, posY);

            this.currentShootTime = 0;
        }


        this.Length = this.bullets.length;
        if(this.bullets.length >= 1 )
        {
            for(this.i = 0; this.i < this.bullets.length; this.i++)
            {
                this.CollisionCheck(this.i);

                this.bullets[this.i].Update();



                if(this.bullets[this.i].m.position.y > canvas.height + 50 || this.bullets[this.i].m.position.y < -50 )
                {
                    this.bulRemove.push(this.i);
                    this.bullets[this.i].used = true;

                }
            }
        }
    }

    Shoot(posX, posY){
        if(this.bullets.length <= this.maxBullets)
        {
            this.s.play();
            this.bullets.push(new Bullet(this.size, this.size, this.imgPath, this.dmg, this.type));
            this.bullets[this.bullets.length -1].Start(posX, posY - this.hDiff, this.bulletAcc, this.dirX, this.dirY);

        }


    }

    CollisionCheck(index){

        if(this.bullets[index].type == 'F')
        {
            for(this.e = 0; this.e < waveMgr.enBasics.length; this.e++)
            {
                if(this.bullets[index].collision.collisionBasicMath(waveMgr.enBasics[this.e].m.position.x, waveMgr.enBasics[this.e].m.position.y, waveMgr.enBasics[this.e].r.spriteWidth) == true)
                {
                    waveMgr.enBasics[this.e].h.TakeDamage(this.dmg);

                    this.bullets[index].used = true;
                    this.bulRemove.push(index);
                }
            }
        }

        if(this.bullets[index].type == 'E')
        {
            if(this.bullets[index].collision.collisionBasicMath(player.m.position.x, player.m.position.x, player.r.spriteWidth) == true)
            {
                player.h.TakeDamage(this.dmg);

                this.bullets[index].used = true;
                this.bulRemove.push(index);

            }

        }


    }

    RemoveBullet(){

        for(this.i = 0; this.i < this.bulRemove.length; this.i++)
        {
            this.bullets.splice(this.bulRemove[this.i], 1);
        }

        this.bulRemove.splice(0, this.bulRemove.length);

    }

    Render(){
        for(this.i = 0; this.i < this.bullets.length; this.i++)
        {
            this.bullets[this.i].Render();
        }
    }


}