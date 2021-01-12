class Background{

    constructor(){

        this.r = new Render(canvas.width, canvas.height, 'backgroundBasic.png');
        this.stars = [];

        this.starStats = {
            max: 40,
            min: 20

        }

    }

    Start(){
        for(this.i = 0; this.i < this.starStats.min; this.i++)
        {
            var size = Math.floor(Math.random() * 15) + 5;
            this.stars.push(new Star(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height), size, Math.floor(Math.random() * 50) + 25, 'Star.png'));

        }
    }

    Update(){

        if(this.stars.length <= this.starStats.min)
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

        var size = Math.floor(Math.random() * 15) + 5;
        this.stars.push(new Star(Math.floor(Math.random() * canvas.width), -20, size, Math.floor(Math.random() * 50) + 20, 'Star.png'));
    }

    RemoveStar(i){
        this.stars.splice(i, 1);
    }

    Render(){

        this.r.RenderImage(canvas.width / 2, canvas.height / 2);
        for(this.i = 0; this.i < this.stars.length; this.i++)
        {
            this.stars[this.i].Render();
        }
    }
}