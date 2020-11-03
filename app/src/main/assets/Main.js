var Map = [];
var cubeSize = 15;
var mapWidth = 28;
var mapHeight = 48;

var fillPercent = 60;

var wallsNeeded = 5;

var canvas;
var canvasContext;

function load(){
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    initMap();

    //renderWall(5 * cubeSize, 5 * cubeSize, 35, 35, "Yellow");
    for(i = 0; i <= 3; i++)
        SmoothMap();

}

function initMap(){
    for(x = 0; x < mapWidth; x++)
    {
    Map[x] = [];
        for(y = 0; y < mapHeight; y++)
        {
            if(x == 0 || x == (mapWidth - 1) || y == 0 || y == (mapHeight - 1))
            {
                Map[x][y] = 'W';
            }
            else
            {
                var rdmRange = Math.round(Math.random() * 100);

                if(rdmRange < fillPercent)
                {
                    Map[x][y] = 'W';
                }
                else
                    Map[x][y] = 'E';
            }
        }
    }

}

function SmoothMap(){
    for(x = 0; x < mapWidth; x++)
    {
        for(y = 0; y < mapHeight; y++)
        {
            var nWalls = getNeighbours(x, y);

            if(nWalls >= wallsNeeded)
            {
                Map[x][y] = 'W';
            }
            else
            {
                Map[x][y] = 'E';
            }
        }
    }

    renderGameMap();
}

function getNeighbours(posX, posY){
    var wallCount = 0;

    for(nPosX = posX - 1; nPosX <= posX + 1; nPosX++)
    {
        for(nPosY = posY - 1; nPosY <= posY + 1; nPosY++)
        {
            if(nPosX >= 0 && nPosX < mapWidth && nPosY >= 0 && nPosY < mapHeight)
            {
                if(nPosX != posX || nPosY != posY)
                {
                    if(Map[nPosX][nPosY] == 'W')
                    {
                        wallCount++;
                    }
                }
            }
            else
                wallCount++;
        }
    }

    return wallCount;
}

function renderGameMap(){
    for(x = 0; x < mapWidth; x++)
    {
        for(y = 0; y < mapHeight; y++)
        {
            switch(Map[x][y])
            {
                case 'W':
                {
                    renderWall(x * cubeSize, y * cubeSize, cubeSize, cubeSize, "black");
                    break;
                }
                case 'E':
                {
                    renderWall(x * cubeSize, y * cubeSize, cubeSize, cubeSize, "white");
                    break;
                }
            }
        }
    }
}

function renderWall(leftX, topY, width, height, drawColor) {
        canvasContext.beginPath();
        canvasContext.fillStyle = drawColor;
        canvasContext.fillRect(leftX, topY, width, height);
        canvasContext.closePath();


}