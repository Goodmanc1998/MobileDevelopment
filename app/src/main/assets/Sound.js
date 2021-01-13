class Sound{
    //Constructor
    constructor(soundPath){
        this.sound = document.createElement("audio");
        this.sound.src = 'Sounds/' + soundPath;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        //Play function to play sound
        this.Play = function(){
            this.sound.play();
        }
        //loop function to loop sound
        this.Loop = function(){
            this.sound.Loop();
        }
    }
}