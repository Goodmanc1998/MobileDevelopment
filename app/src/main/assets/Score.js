class Score{

    constructor(){
        this.currentScore = 0;
        this.earnedScore = 0;
        this.updates = false;

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
}