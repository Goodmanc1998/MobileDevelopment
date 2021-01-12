class Animation{

    constructor(w, h, path,xMax, yMax, tMax, max){

        this.r = new Render(w, h, path)

        this.frameX = 0;
        this.frameXMax = xMax;
        this.frameY = 0;
        this.frameYMax = yMax;
        this.currFrame = 0;
        this.frameMax = max;
        this.frameTimer = tMax;
        this.frameMaxTimer = tMax;

        this.animationFinished = false;
        this.loop = false;

    }

    AnimateFrame(posX, posY){
        if(this.animationFinished == false || this.looping == true)
        {
            this.frameTimer = this.frameTimer - deltaTime;
		    if(this.frameTimer <= 0)
		    {
			    this.frameTimer = this.frameMaxTimer;
			    this.frameX++;
			    if(this.frameX > this.frameXMax)
			    {
			        this.frameX = 0;
			        this.frameY++;
			        //end of row, move down to next row in sheet
			        if(this.frameY > this.frameYMax)
			        {
				        this.frameY = 0;
			        }
			    }
			    this.currFrame++;
			    //reset frames to 0 in event that there are empty spaces on sprite sheet
			    if(this.currFrame == this.frameMax)
			    {
                    this.animationFinished = true;

			    }
			    if(this.currFrame >= this.frameMax)
			    {
			        this.frame = 0;
			        this.frameX = 0;
			        this.frameY = 0;

			    }
		    }

		    canvasContext.drawImage(this.r.img, this.r.spriteWidth * this.frameX, this.r.spriteHeight * this.frameY, this.r.spriteWidth, this.r.spriteHeight, posX - (this.r.spriteWidth / 2), posY - (this.r.spriteHeight / 2), 75, 75);

        }

    }

}