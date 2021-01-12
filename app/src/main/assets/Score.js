class Score{

    constructor(){
        this.currentScore = 0;
        this.earnedScore = 0;
        this.updates = false;

        this.scoreToLevel = 0;
    }

    Start(){
        this.currentScore = 0;
    }

    UpdateScore(newScore){
        this.currentScore += newScore;
    }

    StoreScore(){
        this.earnedScore += this.currentScore;
    }

    UpdateLevel(){
        this.scoreToLevel = 100 * (player.currentLevel / 2);

        if(this.earnedScore >= this.scoreToLevel)
        {
            this.earnedScore -= this.scoreToLevel;
            player.currentLevel++;

        }

    }
}