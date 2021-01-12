class WaveManager{

    constructor(waveLim, timeDiff){
        this.enBasic = new EnemyShip('SpaceShip.png', 'Bullet.png', 10);

        this.enBasics = [];


        this.totalEnemy = 0;
        this.currWave = 1;

        this.totalWave = waveLim;
        this.timeDiff = timeDiff;

        this.currentTime = 0;

        this.enemyHealth = 10;
        this.enemyDamage = 5;

        this.active = false;

    }

    Start(){
        this.active = true;
        this.enBasics = [];
        this.totalEnemy = 0;
        this.currentTime = 0;

        this.enemyHealth = 10;
        this.enemyDamage = 5;
        this.currWave = 1;
    }

    Update(){

        this.currentTime += deltaTime;

        if(this.waveFinished = true)
        {

        }

        if(this.currentTime >= this.timeDiff && this.totalEnemy < this.totalWave)
        {
            this.CreateEnemy();

            this.currentTime = 0;
        }

        if(this.totalEnemy == this.totalWave && this.enBasics.length == 0)
        {
            this.NewWave();
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

                if(this.enBasics[this.i].h.currentHealth <= 0 && this.enBasics[this.i].gun.bullets.length <= 0 && this.enBasics[this.i].deathAnimation.animationFinished == true)
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
        this.enBasics.push(new EnemyShip('SpaceShip.png', 'Bullet.png', this.enemyHealth, this.enemyDamage));
        this.enBasics[this.enBasics.length - 1].Start(Math.floor(Math.random() * canvas.width - 150) + 150, -75 / 2, 75);
        this.totalEnemy += 1;
    }

    NewWave(){
        this.totalWave = Math.floor(this.totalWave * 1.2);
        this.enemyHealth += 5;
        this.enemyDamage += 5;

        this.currentTime = 0;
        this.totalEnemy = 0;

        this.currWave += 1;

        player.h.currentHealth += (this.currWave * 10) / 2;
        pScore.currentScore += (this.currWave * 10) / 2;
    }

    RemoveEnemy(i){
        waveMgr.enBasics.splice(i, 1);
    }
}