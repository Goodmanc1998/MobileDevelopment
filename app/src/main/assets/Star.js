class Star{

    constructor(posX, posY, size, acc, starPath){

        this.r = new Render(size, size, starPath);
        this.m = new Movement();

        this.m.moveDir.x = 0;
        this.m.moveDir.y = 1;

        this.m.Start(posX, posY, acc);
    }

    Update(){
        this.m.Move();
    }

    Render(){
        this.r.RenderImage(this.m.position.x, this.m.position.y);
    }


}