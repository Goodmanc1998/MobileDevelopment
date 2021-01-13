class Star{
    //Constructor
    constructor(posX, posY, size, acc, starPath){
        //Storing the renderer and movement
        this.r = new Render(size, size, starPath);
        this.m = new Movement();
        //setting its movement direction
        this.m.moveDir.x = 0;
        this.m.moveDir.y = 1;
        //Starting the movement
        this.m.Start(posX, posY, acc);
    }
    //Updating the movement
    Update(){
        this.m.Move();
    }
    //Rendering the star
    Render(){
        this.r.RenderImage(this.m.position.x, this.m.position.y);
    }


}