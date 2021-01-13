class Score{
    //Constructor
    constructor(){
        //Setting the base scores
        this.currentScore = 0;
        this.earnedScore = 0;
        //Storing updates and score to level
        this.updates = false;
        this.scoreToLevel = 0;
    }
    //Resetting the current score
    Start(){
        this.currentScore = 0;
    }
    //Updating the current score
    UpdateScore(newScore){
        this.currentScore += newScore;
    }
    //Updating earned score
    StoreScore(){
        this.earnedScore += this.currentScore;
    }
    //Updating the users level by 1
    UpdateLevel(){
        this.scoreToLevel = 100 * (player.currentLevel / 2);

        if(this.earnedScore >= this.scoreToLevel)
        {
            this.earnedScore -= this.scoreToLevel;
            player.currentLevel++;

        }

    }
}