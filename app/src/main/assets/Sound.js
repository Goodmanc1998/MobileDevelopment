class Sound{

    constructor(soundPath){
        this.sound = document.createElement("audio");
        this.sound.src = 'Sounds/' + soundPath;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);

        this.play = function(){
            this.sound.play();
        }
    }


    Loop(){
        this.sound.Loop();
    }
}