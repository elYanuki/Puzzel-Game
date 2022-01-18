let position = [2,2]//[row][column]
let maxWidth

function loadLevel(index){
    let data = lvl1()
    document.getElementById("test").innerHTML = `${data[1][1]}`

    maxWidth = data[1].length
    
    document.getElementById("player").style = `grid-area: ${data[data.length-1][0]} / ${data[data.length-1][1]} / auto / auto;`
    position = [data[data.length-1][0],data[data.length-1][1]]

    let gridItems = ""
    for (let i = 0; i < data.length-2; i++) {
        gridItems += " 1fr"
    }
    document.getElementById("board").style = `grid-template-columns:${gridItems};grid-template-rows:${gridItems};`
}

function movePlayer(direction){
    let player = document.getElementById("player")

    switch (direction){
        case 0: //up w
            position[0] = Math.max(--position[0], 1) //1 damit nicht aus dem feld läuft
            break
        case 1: //down s
            position[0] = Math.min(++position[0], maxWidth)
            break
        case 2: //left a 
            position[1] = Math.max(--position[1], 1)
            break
        case 3: //right d 
            position[1] = Math.min(++position[1], maxWidth)
            break
    }


    player.style = `grid-area: ${position[0]} / ${position[1]} / auto / auto;`
    console.log(position[0] + " " + position[1]);
}

//Select Keys for Movement
document.addEventListener('keydown', function(event) {
        switch(event.key){
            case 'w': movePlayer(0);break;
            case 's': movePlayer(1);break;
            case 'a': movePlayer(2);break;
            case 'd': movePlayer(3);break;
    }
});
