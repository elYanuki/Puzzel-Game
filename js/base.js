let position = [2,2]//[row][column]
let data

loadLevel(1);

 fixPosition(data[data.length-1][0], data[data.length-1][1]);

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
}

//Diese Funktion schaut ob der nächste Schritt von dem Spieler möglich ist
function checkMove(nextY, nextX){
    console.log("checkmove");
    if(data[nextY-1][nextX-1]){
        console.log("existing");
        //Next Position is a Wall
        if(data[nextY-1][nextX-1].substr(0,2) == "wa"){
            console.log("wall");
            return false;
        }
        //Next Position is a Button
        if(data[nextY-1][nextX-1].substr(0,2) == "bu"){
            console.log("action")
            return true;
        }
        //Next Position is a Lever
        if(data[nextY-1][nextX-1].substr(0,2) == "le"){
            console.log("action")
            return true;
        }
        //Next Position is a LockedItem
        if(data[nextY-1][nextX-1].substr(0,6) == "locked"){
            console.log("Start MiniGame")
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
    }
    else{ //feld ist leer - kann betreten werden
        return true;
    }
}

//Platziert alle Gegenstände auf dem Spiel
function setTargets(){
    console.log(data[1][1].substr(0,2))
    for(let i = 0; i < data.length; i++){
        for(let j = 0; j < data[0].length; j++){
            if(data[i][j]){
                let sub = data[i][j].substr(0,2)
                switch(sub){
                    case ("wa"): document.getElementById("board").innerHTML += `<div style="grid-area: ${i+1} / ${j+1} / auto / auto; background-color: rgb(0, 41, 128);" class="things"></div>`
                                    //thing.style = `backgroundImage: url(block.png);`  
                                    break;
                    case ("tr"): document.getElementById("board").innerHTML += `<div style="grid-area: ${i+1} / ${j+1} / auto / auto; background-color: rgb(200, 100, 28);" class="things"></div>`
                                    //thing.style = `backgroundImage: url(block.png);`  
                                    break;
                    case ("po"): document.getElementById("board").innerHTML += `<div style="grid-area: ${i+1} / ${j+1} / auto / auto; background-color: rgb(0, 0, 0);" class="things"></div>`
                                    //thing.style = `backgroundImage: url(block.png);`  
                                    break;
                }
            }
        }
    }
}
setTargets();

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