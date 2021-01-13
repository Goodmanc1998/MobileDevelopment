class Render{
    //Constructor
    constructor(width, height, filePath){
        //Storing the sprite width and height
        this.spriteWidth = width;
        this.spriteHeight = height;
        //Storing an image if its passed in
        if(filePath !='')
        {
            this.img = new Image();
            this.img.src = 'Images/' + filePath;
        }
    }
    //Rendering an image to the passed in position x, y
    RenderImage(posX, posY){
        canvasContext.drawImage(this.img, posX - (this.spriteWidth / 2), posY - (this.spriteHeight / 2), this.spriteWidth, this.spriteHeight);
    }
    //Rendering a Cube at passed in position
    RenderCube(posX, posY, drawColor) {
            canvasContext.beginPath();
            canvasContext.fillStyle = drawColor;
            canvasContext.fillRect(posX - (this.spriteWidth / 2), posY - (this.spriteHeight / 2), this.spriteWidth, this.spriteHeight);
            canvasContext.closePath();
    }
    //Rendering a circle at passed in position X, Y
    RenderCircle(centerX, centerY, drawColor) {
         canvasContext.fillStyle = drawColor;
         canvasContext.beginPath();
         canvasContext.arc(centerX, centerY, this.spriteWidth, 0,Math.PI*2,true);
         canvasContext.fill();
    }

}