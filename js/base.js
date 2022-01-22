let position = [2,2]//[row][column]
let data
let effect = "normal"
let eDown = false
let noMove = false
let level
let player

function loadLevel(){
    switch (level){
        case 1: data = lvl1();break;
        case 2: data = lvl2();break;
        case 3: data = lvl3();break;
        case 4: data = lvl4();break;
    }

    effect = "normal"
    noMove = "false"

    document.getElementById("player").style = `grid-area: ${data[data.length-1][0]} / ${data[data.length-1][1]} / auto / auto;` //setzt startpos des character auf coordinaten in letzter zeile der data
    position = [data[data.length-1][0],data[data.length-1][1]] //wie oben nur für gespeicherte pos

    let gridItems = ""
    for (let i = 0; i < data.length-2; i++) { //lässt breite des array die breite des grid bestimmen
        gridItems += " 1fr"
    }
    document.getElementById("board").style = `grid-template-columns:${gridItems};grid-template-rows:${gridItems};` //setzt grid breite und höhe
}

function loadHtml(){
    document.getElementsByTagName("body")[0].innerHTML=`<div id="countdown-box"><p id="countdown-text"></p><div id="countdown"></div></div><div class="flex"><main id="board"><div id="player"></div> <div id="info-relative"><div id="info"><p id="info-text">Press E to pick up the item.</p></div><div id="info-arrow"></div></div></main><div id="handy"><div id="game"></div></div><div id="settings"></div>`

    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    var date = today.getFullYear()+'.'+(today.getMonth()+1)+'.'+today.getDate();
    
    document.getElementById("handy").innerHTML = `<h1 id="date">${time}</h1><h2 id="date2">${date}</h2>`
}

function movePlayer(direction){
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
    /* console.log("coordinates: r:" + position[0] + " c:" + position[1]); */

    checkPosition();
}

//Diese Funktion schaut ob der nächste Schritt von dem Spieler möglich ist
function checkMove(nextY, nextX){
    if(noMove == true){
        return false
    }
    else if(data[nextY-1][nextX-1]){
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
        //Next Position is a Trap
        if(data[nextY-1][nextX-1].substr(0,2) == "tr"){
            trap();
            return true;
        } 
        //Next Position is a Portal
        if(data[nextY-1][nextX-1].substr(0,2) == "po"){
            portal(nextY, nextX);
            return true;
        } 
        //Next Position is a Softwall
        if(data[nextY-1][nextX-1].substr(0,2) == "sw"){
            if(effect == "ghost"){
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

//schaut ob ein Item auf dem Feld auf dem der Spielr steht, liegt
function checkPosition(){
    let posPlayer = data[position[0]-1][position[1]-1]

    //Position Item is locked
    if(posPlayer.substr(0, 2) == "lo"){
        createInfoPopup(position[0], position[1],)
        if(eDown == true){
            clearInfoPopup();
            loadHandy(posPlayer);
        }
        return true;
    }

    if (posPlayer.substr(0, 2) == "sw" && effect != "ghost") {
        dead()
    }
        if(posPlayer.substr(0, 2) == "gh"){ //muss vor dem edown sein weil es ja bei edown wieder weg sein soll
            console.log("in if");
            createInfoPopup(position[0], position[1],);
        }
        else{
            clearInfoPopup()
        }
        if (eDown == true) {

            clearInfoPopup() //e sorgt ja für den pickup

            if (posPlayer.substr(0, 2) == "gh") {
                let ghost = document.getElementById(`ghost-${posPlayer.substr(3,1)}`)
                ghost.style.width = 0
                ghost.style.height = 0

                setTimeout(function () {
                    ghost.parentNode.removeChild(ghost);        
                }, 500)

                effect = "ghost";
                data[position[0] - 1][position[1] - 1] = "";

                let softwalls = document.getElementsByClassName("softwall")

                player.classList.add("player-ghostmode")

                for (let i = 0; i < softwalls.length; i++) {
                    softwalls[i].classList.add("softwall-ghostmode")
                }

                countdown(10, "Ghost")

                setTimeout(function () {
                    effect = "normal"

                    player.classList.remove("player-ghostmode")

                    for (let i = 0; i < softwalls.length; i++) {
                        softwalls[i].classList.remove("softwall-ghostmode")
                    }
                    checkPosition()
                }, 10000)
            }
        
    }

    return effect;
}

//Platziert alle Gegenstände auf dem Spiel
function setElements(){
    for(let i = 0; i < data.length; i++){
        for(let j = 0; j < data[0].length; j++){
            if(data[i][j]){
                let sub = data[i][j].substr(0,2)
                switch(sub){
                    case ("wa"): document.getElementById("board").innerHTML += `<div style="grid-area: ${i+1} / ${j+1} / auto / auto; background-color: rgb(0, 41, 128);" class="block"></div>`
                                    //thing.style = `backgroundImage: url(block.png);`  
                                    break;
                    case ("tr"): document.getElementById("board").innerHTML += `<div style="grid-area: ${i+1} / ${j+1} / auto / auto; background-color: rgb(200, 100, 28);" class="block"></div>`
                                    //thing.style = `backgroundImage: url(block.png);`  
                                    break;
                    case ("po"): document.getElementById("board").innerHTML += `<div style="grid-area: ${i+1} / ${j+1} / auto / auto; background-color: rgb(0, 0, 0);" class="block"></div>`
                                    //thing.style = `backgroundImage: url(block.png);`  
                                    break;
                    case ("sw"): document.getElementById("board").innerHTML += `<div style="grid-area: ${i+1} / ${j+1} / auto / auto; background-color: rgb(0, 80, 128);" class="softwall"></div>`
                                    //thing.style = `backgroundImage: url(block.png);`  
                                    break;
                    case ("gh"): document.getElementById("board").innerHTML += `<div id="ghost-${data[i][j].substr(3,1)}" style="grid-area: ${i+1} / ${j+1} / auto / auto; background-color: rgb(255, 255, 255);" class="block"></div>`
                                    //thing.style = `backgroundImage: url(block.png);`  
                                    break;
                    case ("lo"): document.getElementById("board").innerHTML += `<div style="grid-area: ${i+1} / ${j+1} / auto / auto; background-color: rgb(100, 80, 0);" class="softwall"></div>`
                                    //thing.style = `backgroundImage: url(block.png);`  
                                    break;
                }
            }
        }
    }
}

function createInfoPopup(x,y,text) {
    if(text) { //dont specifie text to use default
        document.getElementById("info-text").innerHTML = text
    }
    else{
        document.getElementById("info-text").innerHTML = `Press E to pick up the item`
    }
    document.getElementById("info-relative").style = `grid-area: ${x} / ${y} / auto / auto;visibility:visible;`
    document.getElementById("info").style.width = "10rem"
    document.getElementById("info").style.opacity = "1"
    document.getElementById("info-arrow").style.opacity = "1"

    setTimeout(function () {
        document.getElementById("info-text").style.opacity = "1"
    }, 300)
    
}

function clearInfoPopup(){
    document.getElementById("info-text").style.opacity = "0"
    document.getElementById("info").style.width = "0rem"
    document.getElementById("info").style.opacity = "0"
    document.getElementById("info-arrow").style.opacity = "0"
    document.getElementById("info-relative").style.visibility = "hidden"
}

function countdown(duration, name){
    document.getElementById("countdown").style = `animation-name: countdown; animation-duration: ${duration}s;`
    document.getElementById("countdown-text").innerHTML = name;

    setTimeout(function () {
        document.getElementById("countdown-text").innerHTML = ""
    }, duration*1000)
}

//Select Keys for Movement
document.addEventListener('keydown', function(event) {
    if (data) {
        switch (event.keyCode) {
            case 87:
            case 38:
            case 'W': movePlayer(0); break;
            case 83:
            case 40:
            case 'S': movePlayer(1); break;
            case 65:
            case 37:
            case 'A': movePlayer(2); break;
            case 68:
            case 39:
            case 'D': movePlayer(3); break;
            case 69:
            case 'E': eDown = true; checkPosition(); break
        }
    }
});

document.addEventListener('keyup',function(event) {
    switch(event.key){
        case 'e': eDown = false;break
}
});

function dead(){
    effect = "normal"

    player.classList.remove("player-ghostmode")

    let softwalls = document.getElementsByClassName("softwall")

    for (let i = 0; i < softwalls.length; i++) {
        softwalls[i].classList.remove("softwall-ghostmode")
    }

    document.getElementById("countdown-text").innerHTML = ""
    document.getElementById("countdown").style = `animation-name: none;`
    noMove = true

    setTimeout(function () {
        player.style.visibility = "hidden"
    }, 200)
    setTimeout(function () {
        player.style.visibility = "visible"
    }, 400)
    setTimeout(function () {
        player.style.visibility = "hidden"
    }, 600)
    setTimeout(function () {
        player.style.visibility = "visible"
    }, 800)
    setTimeout(function () {
        player.style.visibility = "hidden"
    }, 1000)

    setTimeout(function () {
        player.style.visibility = "visible"
        loadLevel();
    }, 1200)
}

function SetPlayerPos(row,column){
    position[0] = row
    position[1] = column
    
    player.style = `grid-area: ${row} / ${column} / auto / auto;`
    }