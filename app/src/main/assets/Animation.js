class Animation{

    //Constructor
    constructor(w, h, path,xMax, yMax, tMax, max){

        //Render
        this.r = new Render(w, h, path)
        //Frame rate stats
        this.frameX = 0;
        this.frameXMax = xMax;
        this.frameY = 0;
        this.frameYMax = yMax;
        this.currFrame = 0;
        this.frameMax = max;
        this.frameTimer = tMax;
        this.frameMaxTimer = tMax;

        //Animation loop / finished
        this.animationFinished = false;
        this.loop = false;
    }

    //Drawing the correct frame of the animation
    AnimateFrame(posX, posY){
        //Checking if looping or if animation finished
        if(this.animationFinished == false || this.looping == true)
        {
            //Updating the timer
            this.frameTimer = this.frameTimer - deltaTime;
		    if(this.frameTimer <= 0)
		    {
		        //Resetting the timer and updating position X
			    this.frameTimer = this.frameMaxTimer;
			    this.frameX++;
			    if(this.frameX > this.frameXMax)
			    {
			        //Resetting the X frame and increasing the Y frames
			        this.frameX = 0;
			        this.frameY++;
			        //Resetting the Y frame after y max
			        if(this.frameY > this.frameYMax)
			        {
				        this.frameY = 0;
			        }
			    }
			    //Updating the current frame
			    this.currFrame++;

			    //Finishing the animation and resetting the frame, x and y
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
            //Drawing the image
		    canvasContext.drawImage(this.r.img, this.r.spriteWidth * this.frameX, this.r.spriteHeight * this.frameY, this.r.spriteWidth, this.r.spriteHeight, posX - (this.r.spriteWidth / 2), posY - (this.r.spriteHeight / 2), 75, 75);
        }
    }
}