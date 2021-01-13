class Health{
    //Constructor
    constructor(mH){
        //Storing max Health, current Health, and alive state
        this.maxHealth = mH;
        this.currentHealth = mH;
        this.alive = true;
    }
    //Removing passed in dmg from current health
    TakeDamage(dmg){
        this.currentHealth = this.currentHealth - dmg;
    }

}