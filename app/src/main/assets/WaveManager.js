class WaveManager{

    constructor(waveLim, timeDiff){
        this.enBasic = new EnemyShip('SpaceShip.png', 'Bullet.png', 10);

        this.enBasics = [];

        this.currentEnemyAmt = 0;

        this.totalWave = waveLim;

        this.timeDiff = timeDiff;

        this.currentTime = 0;

    }

    Start(){

    }

    Update(){

        this.currentTime += deltaTime;

        if(this.currentTime >= this.timeDiff && this.currentEnemyAmt < this.totalWave)
        {
            this.CreateEnemy();

            this.currentTime = 0;
        }

        if(this.enBasics.length > 0)
        {
            for(this.i = 0; this.i < this.enBasics.length; this.i++)
            {
                this.enBasics[this.i].Update();

                if(this.enBasics[this.i].m.position.y >= canvas.height + this.enBasics[this.i].r.spriteHeight)
                {
                    this.enBasics.splice(this.i, 1);
                }

                if(this.enBasics[this.i].h.currentHealth <= 0 && this.enBasics[this.i].gun.bullets.length <= 0)
                {
                    this.enBasics.splice(this.i, 1);
                }

            }
        }



    }

    Render(){

        for(this.i = 0; this.i < this.enBasics.length; this.i++)
        {
            this.enBasics[this.i].Render();
        }


    }

    CreateEnemy(){
        this.enBasics.push(new EnemyShip('SpaceShip.png', 'Bullet.png', 10));
        this.enBasics[this.enBasics.length - 1].Start(Math.floor(Math.random() * canvas.width - 100) + 100, -75 / 2, 75);
        this.currentEnemyAmt += 1;
    }

    RemoveEnemy(i){
        waveMgr.enBasics.splice(i, 1);
    }
}