let position = [2,2]//[row][column]
let data
let effekt = "normal";

loadLevel(1)
setElements();

function loadLevel(index){
    switch (index){
        case 1: data = lvl1();break;
        case 2: data = lvl2();break;
        case 3: data = lvl3();break;
        case 4: data = lvl4();break;
    }

    document.getElementById("player").style = `grid-area: ${data[data.length-1][0]} / ${data[data.length-1][1]} / auto / auto;` //setzt startpos des character auf coordinaten in letzter zeile der data
    position = [data[data.length-1][0],data[data.length-1][1]] //wie oben nur für gespeicherte pos

    let gridItems = ""
    for (let i = 0; i < data.length-2; i++) { //lässt breite des array die breite des grid bestimmen
        gridItems += " 1fr"
    }
    document.getElementById("board").style = `grid-template-columns:${gridItems};grid-template-rows:${gridItems};` //setzt grid breite und höhe
}

function movePlayer(direction){
    let player = document.getElementById("player")
    let move = false;


    let pos0 = position[0]
    let pos1 = position[1]

    switch (direction){
        case 0: //up w
            move = checkMove(--pos0, pos1);
            if(move == true){
                position[0] = Math.max(--position[0], 1) //1 damit nicht aus dem feld läuft
            }   
            break
        case 1: //down s
            move = checkMove(++pos0, pos1);
            if(move == true){
                position[0] = Math.min(++position[0], data[1].length)
            }
            break
        case 2: //left a
            move = checkMove(pos0, --pos1)
            if(move == true){
                position[1] = Math.max(--position[1], 1)
            }          
            break
        case 3: //right d 
            move = checkMove(pos0, ++pos1)
            if(move == true){
                position[1] = Math.min(++position[1], data[1].length)
            }   
            break
    }


    player.style = `grid-area: ${position[0]} / ${position[1]} / auto / auto;`
    console.log("coordinates: r:" + position[0] + " c:" + position[1]);

    checkPosition();
}

//Diese Funktion schaut ob der nächste Schritt von dem Spieler möglich ist
function checkMove(nextY, nextX){
    if(data[nextY-1][nextX-1]){
        //Next Position is a Wall
        if(data[nextY-1][nextX-1].substr(0,2) == "wa"){
            return false;
        }
        //Next Position is a Button
        if(data[nextY-1][nextX-1].substr(0,2) == "bu"){
            return true;
        }
        //Next Position is a Lever
        if(data[nextY-1][nextX-1].substr(0,2) == "le"){
            return true;
        }
        //Next Position is a LockedItem
        if(data[nextY-1][nextX-1].substr(0,6) == "locked"){
            return true;
        }
        //Next Position is a Trap
        if(data[nextY-1][nextX-1].substr(0,2) == "tr"){
            trap();
            return false;
        } 
        //Next Position is a Portale
        if(data[nextY-1][nextX-1].substr(0,2) == "po"){
            portale(nextY, nextX);
            return false;
        } 
        //Next Position is a Softwall
        if(data[nextY-1][nextX-1].substr(0,2) == "sw"){
            if(effekt == "ghost"){
                return true;
            } else{
                return false;
            }
        } 
        return true;
    }
    else{ //feld ist leer - kann betreten werden
        return true;
    }
}

//Diese Funktion schaut ob ein Item auf dem Feld liegt
function checkPosition(){
    let posPlayer = data[position[0]-1][position[1]-1]
    if(posPlayer){
        if(posPlayer.substr(0,2) == "gh"){
            ghost.parentNode.removeChild(ghost);
            effekt = "ghost";
            data[position[0]-1][position[1]-1] = "";

            setTimeout(function(){
                effekt = "normal"
            }, 10000)

            pickupPopup(position[0], position[1]);
        }
    }
    console.log(effekt)

    return effekt;
}

//Platziert alle Gegenstände auf dem Spiel
function setElements(){
    console.log(data[1][1].substr(0,2))
    for(let i = 0; i < data.length; i++){
        for(let j = 0; j < data[0].length; j++){
            if(data[i][j]){
                let sub = data[i][j].substr(0,2)
                switch(sub){
                    case ("wa"): document.getElementById("board").innerHTML += `<div style="grid-area: ${i+1} / ${j+1} / auto / auto; background-color: rgb(0, 41, 128);" class="blocks"></div>`
                                    //thing.style = `backgroundImage: url(block.png);`  
                                    break;
                    case ("tr"): document.getElementById("board").innerHTML += `<div style="grid-area: ${i+1} / ${j+1} / auto / auto; background-color: rgb(200, 100, 28);" class="blocks"></div>`
                                    //thing.style = `backgroundImage: url(block.png);`  
                                    break;
                    case ("po"): document.getElementById("board").innerHTML += `<div style="grid-area: ${i+1} / ${j+1} / auto / auto; background-color: rgb(0, 0, 0);" class="blocks"></div>`
                                    //thing.style = `backgroundImage: url(block.png);`  
                                    break;
                    case ("sw"): document.getElementById("board").innerHTML += `<div style="grid-area: ${i+1} / ${j+1} / auto / auto; background-color: rgb(0, 80, 128);" class="things"></div>`
                                    //thing.style = `backgroundImage: url(block.png);`  
                                    break;
                    case ("gh"): document.getElementById("board").innerHTML += `<div id="ghost" style="grid-area: ${i+1} / ${j+1} / auto / auto; background-color: rgb(255, 255, 255);" class="things"></div>`
                                    //thing.style = `backgroundImage: url(block.png);`  
                                    break;
                }
            }
        }
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

function dead(){
    loadLevel(1);
}

function SetPlayerPos(row,column){
    position[0] = row
    position[1] = column
    
    document.getElementById("player").style = `grid-area: ${row} / ${column} / auto / auto;`
}