class WaveManager{

    constructor(waveLim, timeDiff){
        //Storing list of enemys
        this.enBasics = [];
        //Storing current wave and total enemys created
        this.totalEnemy = 0;
        this.currWave = 1;
        //Storing the total wave limit and time difference to create enemy
        this.totalWave = waveLim;
        this.timeDiff = timeDiff;
        this.currentTime = 0;
        //Storing base health and damage
        this.enemyHealth = 10;
        this.enemyDamage = 5;
        //Storing active state
        this.active = false;
    }
    //Start function
    Start(){
        //Starting the active state end clearing the list of enemys
        this.active = true;
        this.enBasics = [];

        //Resetting current variables for starting enemys
        this.totalEnemy = 0;
        this.currentTime = 0;
        this.enemyHealth = 10;
        this.enemyDamage = 5;
        this.currWave = 1;
    }

    Update(){
        //Updating timer
        this.currentTime += deltaTime;
        //Creating the enenmy if time is correct and if less than total wavel
        if(this.currentTime >= this.timeDiff && this.totalEnemy < this.totalWave)
        {
            //Creating the enemy and resetting the timer
            this.CreateEnemy();
            this.currentTime = 0;
        }
        //Creating a new wave if max amount has been created and total active is 0
        if(this.totalEnemy == this.totalWave && this.enBasics.length == 0)
        {
            this.NewWave();
        }
        //Updating the enemy by moving through each enemy
        if(this.enBasics.length > 0)
        {
            for(this.i = 0; this.i < this.enBasics.length; this.i++)
            {
                //Updating enemy
                this.enBasics[this.i].Update();
                //Removing enemy if outside of screen space
                if(this.enBasics[this.i].m.position.y >= canvas.height + this.enBasics[this.i].r.spriteHeight)
                {
                    this.enBasics.splice(this.i, 1);
                }
                //Removing the enemy if health and death animation have played
                if(this.enBasics[this.i].h.currentHealth <= 0 && this.enBasics[this.i].gun.bullets.length <= 0 && this.enBasics[this.i].deathAnimation.animationFinished == true)
                {
                    this.enBasics.splice(this.i, 1);
                }

            }
        }



    }
    //Rendering the enemy
    Render(){
        for(this.i = 0; this.i < this.enBasics.length; this.i++)
        {
            this.enBasics[this.i].Render();
        }
    }
    //Creating the enemy and adding it to the list of enemys
    CreateEnemy(){
        this.enBasics.push(new EnemyShip('SpaceShip.png', 'Bullet.png', this.enemyHealth, this.enemyDamage));
        this.enBasics[this.enBasics.length - 1].Start(Math.floor(Math.random() * canvas.width - 150) + 150, -75 / 2, 75);
        this.totalEnemy += 1;
    }
    //Creating a new wave an increasing enemy stats
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
    //Removing enemy
    RemoveEnemy(i){
        waveMgr.enBasics.splice(i, 1);
    }
}