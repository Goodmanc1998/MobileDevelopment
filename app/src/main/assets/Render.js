class Render{

    constructor(width, height, filePath){

        this.spriteWidth = width;
        this.spriteHeight = height;
        if(filePath !='')
        {
            this.img = new Image();
            this.img.src = 'Images/' + filePath;
        }

    }

    RenderImage(posX, posY){
        canvasContext.drawImage(this.img, posX - (this.spriteWidth / 2), posY - (this.spriteHeight / 2), this.spriteWidth, this.spriteHeight);
    }

    RenderAnimation(){

    }


    RenderCube(posX, posY, drawColor) {
            canvasContext.beginPath();
            canvasContext.fillStyle = drawColor;
            canvasContext.fillRect(posX - (this.spriteWidth / 2), posY - (this.spriteHeight / 2), this.spriteWidth, this.spriteHeight);
            canvasContext.closePath();
    }

    RenderCircle(centerX, centerY, drawColor) {
         canvasContext.fillStyle = drawColor;
         canvasContext.beginPath();
         canvasContext.arc(centerX, centerY, this.spriteWidth, 0,Math.PI*2,true);
         canvasContext.fill();
    }

}