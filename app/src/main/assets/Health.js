class Health{

    constructor(mH){

        this.maxHealth = mH;
        this.currentHealth = mH;

        this.alive = true;
    }

    TakeDamage(dmg){
        this.currentHealth = this.currentHealth - dmg;

    }

}