document.getElementById("player").style =  "grid-row: 2;grid-column: 2;"
let position = [2,2]//[row][column]
let maxWidth = 12

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

document.addEventListener('keydown', function(event) {
    console.log(event.key);
        switch(event.key){
            case 'w': movePlayer(0);break;
            case 's': movePlayer(1);break;
            case 'a': movePlayer(2);break;
            case 'd': movePlayer(3);break;
    }
});