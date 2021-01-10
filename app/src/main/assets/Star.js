class Star{

    constructor(posX, posY, acc, starPath){

        this.r = new Render(10, 10, starPath);
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