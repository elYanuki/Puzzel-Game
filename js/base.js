let position = [2,2]//[row][column]
let maxWidth
let data = lvl1()

function loadLevel(index){
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
    let move;

    switch (direction){
        case 0: //up w
            move = checkMove(Math.max(position[0]-1, 1), position[1]);
            if(move == true){
                position[0] = Math.max(--position[0], 1) //1 damit nicht aus dem feld läuft
            }   
            break
        case 1: //down s
            move = checkMove(Math.max(position[0]+1, 1), position[1]);
            if(move == true){
                position[0] = Math.min(++position[0], data[1].length)
            }
            break
        case 2: //left a 
            move = checkMove(position[0], Math.max(position[1]-1, 1))
            if(move == true){
                position[1] = Math.max(--position[1], 1)
            }          
            break
        case 3: //right d 
            move = checkMove(position[0], Math.max(position[1] +1, 1))
            if(move == true){
                position[1] = Math.min(++position[1], data[1].length)
            }   
            break
    }


    player.style = `grid-area: ${position[0]} / ${position[1]} / auto / auto;`
    console.log(position[0] + " " + position[1]);
}

//This Function checks the following move of the Player and returns if the move is possible or not
function checkMove(nextY, nextX){
    //Next Position is a Block
    if(data[nextY-1][nextX-1] == "block"){
        return false;
    } else{
        return true;
    }
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
