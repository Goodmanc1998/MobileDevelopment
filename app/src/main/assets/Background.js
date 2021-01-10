class Background{

    constructor(){

        this.r = new Render(canvas.width, canvas.height, '');
        this.stars = [];

        this.starStats = {
            max: 40,
            min: 5

        }

    }

    Update(){

        if(this.stars.length <= this.starStats.max)
        {
            this.CreateStar();
        }

        for(this.i = 0; this.i < this.stars.length; this.i++)
        {
            this.stars[this.i].Update();

            if(this.stars[this.i].m.position.y > canvas.height + 20)
            {
               this.stars.splice(this.i, 1);
            }

        }
    }

    CreateStar(){
        this.stars.push(new Star(Math.floor(Math.random() * canvas.width), -20, Math.random() * 75 + 20, 'Star.png'));
    }

    RemoveStar(i){
        this.stars.splice(i, 1);
    }

    Render(){

        this.r.RenderCube(canvas.width / 2, canvas.height / 2, 'black');
        for(this.i = 0; this.i < this.stars.length; this.i++)
        {
            this.stars[this.i].Render();
        }
    }
}