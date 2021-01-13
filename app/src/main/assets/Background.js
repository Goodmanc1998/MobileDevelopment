class Background{
    //Constructor
    constructor(){
        //Background renderer
        this.r = new Render(canvas.width, canvas.height, 'backgroundBasic.png');
        //List of Stars
        this.stars = [];
        //Maximum stars
        this.starStats = {
            max: 40,
        }
    }

    Start(){
        //Running through the stars to start their positions and movement
        for(this.i = 0; this.i < this.starStats.max; this.i++)
        {
            var size = Math.floor(Math.random() * 15) + 5;
            this.stars.push(new Star(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height), size, Math.floor(Math.random() * 50) + 25, 'Star.png'));
        }
    }

    Update(){

        //Creating more stars if required
        if(this.stars.length <= this.starStats.max)
        {
            //Creating the new stars
            this.CreateStar();
        }
        //Iterating through all of the stars
        for(this.i = 0; this.i < this.stars.length; this.i++)
        {
            //Updating the star
            this.stars[this.i].Update();

            //Removing the star is its outside of screen space
            if(this.stars[this.i].m.position.y > canvas.height + 20)
            {
               this.stars.splice(this.i, 1);
            }
        }
    }
    //Creating a new star and assigning a random size, speed and position
    CreateStar(){
        var size = Math.floor(Math.random() * 15) + 5;
        this.stars.push(new Star(Math.floor(Math.random() * canvas.width), -20, size, Math.floor(Math.random() * 50) + 20, 'Star.png'));
    }

    Render(){
        //Rendering the background image then all of the stars
        this.r.RenderImage(canvas.width / 2, canvas.height / 2);
        for(this.i = 0; this.i < this.stars.length; this.i++)
        {
            this.stars[this.i].Render();
        }
    }
}