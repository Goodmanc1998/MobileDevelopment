class Gun{

    constructor(shootDelay, path, heightDiff){
        this.canShoot = false;
        this.hDiff = heightDiff;

        this.bullets = [];

        this.currentShootTime = 0;
        this.shootDelay = shootDelay;

        this.maxBullets = 10;

        this.imgPath = path;

    }



    Update(posX, posY){
        this.currentShootTime += deltaTime;

        if(this.currentShootTime >= this.shootDelay)
        {
            this.Shoot(posX, posY);

            this.currentShootTime = 0;
        }

        if(this.bullets.length >= 1)
        {
            for(this.i = 0; this.i < this.bullets.length; this.i++)
            {
                this.bullets[this.i].Update();

                if(this.bullets[this.i].aliveTime >= this.bulletDelay)
                {
                    this.bullets.shift();
                }
            }
        }



    }

    Shoot(posX, posY){
        if(this.bullets.length <= this.maxBullets)
        {
            this.bullets.push(new Bullet(8, 8, this.imgPath));
            this.bullets[this.bullets.length -1].Start(posX, posY - this.hDiff, 150, 0, -1);

        }


    }

    Render(){
        for(this.i = 0; this.i < this.bullets.length; this.i++)
        {
            this.bullets[this.i].Render();
        }
    }


}