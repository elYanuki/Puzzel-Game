let position = [2,2]//[row][column]
let data
let effect = "normal"
let eDown = false
let noMove = false
let level
let player
let keydown
let posPlayer

function loadLevelData(){
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

    let gridItems = "1fr"
    for (let i = 0; i < data.length-2; i++) { //lässt breite des array die breite des grid bestimmen
        gridItems += " 1fr"
    }
    document.getElementById("board").style = `grid-template-columns:${gridItems};grid-template-rows:${gridItems};` //setzt grid breite und höhe
    
    loadTime();
    setInterval(loadTime, 1000);
}

function loadLevelHtml(){
    document.getElementsByTagName("body")[0].innerHTML=`<div id="countdown-box"><p id="countdown-text"></p><div id="countdown"></div></div><div class="flex"><main id="board"><div id="player"><div id="player-sprite"></div></div> <div id="info-relative"><div id="info"><p id="info-text">Press E to pick up the item.</p></div><div id="info-arrow"></div></div></main><div id="handy"><div id="game"></div></div><div id="settings"></div></div><p>test</p><div id="win-overlay"> <div id="win-box"> <h1>Level Completed</h1> <div> <div onclick="level++; loadLevelHtml()"> <p>next level</p><img src="./img/arrow.png" alt="arrow"> </div> <div onclick="loadMenuHtml()"> <p>home</p><img src="./img/home.png" alt="home"> </div> </div> </div> </div>`
    document.getElementById("handy").innerHTML += `<h1 id="date"></h1><h2 id="date2"></h2>`
    document.getElementById("handy").innerHTML += `<div id="unlock"></div>`

    loadLevelData();
    setElements();
    player = document.getElementById('player')
}

function loadMenuHtml(){
    document.getElementsByTagName("body")[0].innerHTML=`<div class="flex" id="menu-flex"> <main id="level-selector"> <div onclick="level = 1;loadLevelHtml();"> <p>Level 1</p> <img src="./img/preview_1.jpg" alt="blöd jelaufen"> </div> <div onclick="level = 1;loadLevelHtml();"> <p>Level 2</p> <img src="./img/preview_1.jpg" alt="blöd jelaufen"> </div> <div onclick="level = 1;loadLevelHtml();"> <p>Level 3</p> <img src="./img/preview_1.jpg" alt="blöd jelaufen"> </div> <div onclick="level = 1;loadLevelHtml();"> <p>Level 4</p> <img src="./img/preview_1.jpg" alt="blöd jelaufen"> </div> <div onclick="level = 1;loadLevelHtml();"> <p>Level 5</p> <img src="./img/preview_1.jpg" alt="blöd jelaufen"> </div> <div onclick="level = 1;loadLevelHtml();"> <p>Level 6</p> <img src="./img/preview_1.jpg" alt="blöd jelaufen"> </div> <div onclick="level = 1;loadLevelHtml();"> <p>Level 7</p> <img src="./img/preview_1.jpg" alt="blöd jelaufen"> </div> <div onclick="level = 1;loadLevelHtml();"> <p>Level 8</p> <img src="./img/preview_1.jpg" alt="blöd jelaufen"> </div> <div onclick="level = 1;loadLevelHtml();"> <p>Level 9</p> <img src="./img/preview_1.jpg" alt="blöd jelaufen"> </div> </main> <main id="main-info"> <div> <h2>Game Name</h2> <p>Use W A S D or the arrow Keys to move arround. Press E or hold SPACE to interact with objects or Items.</p> </div> <div> <h2>Objects and Items</h2> <ul> <li> <h3>Wall</h3> <p>You shall not PAAASS</p> </li> <li> <h3>Trap</h3> <p>dangerous pointy spikes hurt</p> </li> <li> <h3>SoftWall</h3> <p>You shall pass, only if u r in the ghostmode tho</p> </li> </ul> </div> </main> </div>`
}

function movePlayer(){
    if(effect == "handy"){
        switch (keydown){
            case 0: //up w
                direction("w");
                break
            case 1: //down s
                direction("s")
                break
            case 2: //left a
                direction("a")
                break
            case 3: //right d 
                direction("d")
                break
        }
    } else{
        console.log("movepl");
        let move = false;
        let pos0 = position[0]
        let pos1 = position[1]
        let playerSprite = document.getElementById("player-sprite")
    
        switch (keydown){
            case 0: //up w
                move = checkMove(Math.max(--pos0, 1), pos1);
                if(move == true){
                    position[0] = Math.max(--position[0], 1) //1 damit nicht aus dem feld läuft
                    /* playerSprite.style = `transition: all 0.5s;transform: translateY(calc(-90vh/${data[0].length}));` */ //remove me to make movement snappy again (fix it)
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
        setTimeout(function () {
        player.style = `grid-area: ${position[0]} / ${position[1]} / auto / auto;` 
        }, 5);
    
        /* setTimeout(function () {
            player.style = `grid-area: ${position[0]} / ${position[1]} / auto / auto;` 
            playerSprite.style = "transition: none;transform: translateY(0rem);"
        }, 500) */
        
        /* console.log("coordinates: r:" + position[0] + " c:" + position[1]); */
    
        checkPosition();
        /* setTimeout(movePlayer, 50); // async recursion */
    }
}

//Diese Funktion schaut ob der nächste Schritt von dem Spieler möglich ist
function checkMove(nextY, nextX){
    if(noMove == true){
        return false
    }
    else if(data[nextY-1][nextX-1]){
        switch (data[nextY-1][nextX-1].substr(0,2)){
            case "wa": //wall
                return false;
                break
            case "bu": //button
                return true;
                break
            case "le": //lever
                return true;
                break
            case "tr": //trap
                trap();
                return true;
                break
            case "po": //portal
                portal(nextY, nextX);
                return true;
                break
            case "sw": //softwall
                if(effect == "ghost"){
                    return true;
                } else{
                    return false;
                }
                break
            case "tw": //idk
                return true;
                break
            default: //feld ist ghost etc.
                return true;
                break
        }
    }
    else{ //feld ist leer - kann betreten werden
        return true
    }
}

//schaut ob ein Item auf dem Feld auf dem der Spielr steht, liegt
let active = false;
function checkPosition(){
    posPlayer = data[position[0]-1][position[1]-1];
    switch(posPlayer.substr(0,2)){
        case "lo": 
            if (eDown == true) {
                effect = "handy";
                clearInfoPopup();
                handyUnlock();
                active = true;
            } else if(active == false){
                createInfoPopup(position[0], position[1],)
            }
            return true;
        case "tw":
            tempwall()
            break;
        case "gh":
            ghostItem()
            break;
        case "sw":
            if(effect != "ghost"){
                dead()
                }
            break;
        case "wn":
            win()
        default:
            clearInfoPopup()
            break
    }
    console.log(data[position[0]-1][position[1]-1])
    //falls du das return tru hier absochtlich hattest.. sryyy habs put gemacht
}

//Platziert alle Gegenstände auf dem Spiel
function setElements(){
    let last = false
    for(let i = 0; i < data.length; i++){
        for(let j = 0; j < data[0].length; j++){
            if(data[i][j]){
                let chooseRNG = Math.random()
                let rotateRNG = Math.random()
                let sub = data[i][j].substr(0,2)
                let back
                if(rotateRNG <0.25){
                    rotateRNG = 90
                }
                else if(rotateRNG <0.50){
                    rotateRNG = 180
                }
                else if(rotateRNG <0.75){
                    rotateRNG = 270
                }
                else{
                    rotateRNG = 0
                }

                switch(sub){
                    //wall
                    case ("wa"): 
                        if(chooseRNG<0.5){
                            back = "bush_v2"
                        }
                        else{
                            if(last == true){
                                back = "bush_v2"
                                last = false
                            }
                            else{
                            last = true
                            back= "bush_v2_berry"
                            }
                        }
                        document.getElementById("board").innerHTML += `<div style="grid-area: ${i+1} / ${j+1} / auto / auto; background-image: url(./img/${back}.png); transform: rotate(${rotateRNG}deg);" class="block"></div>`
                                    break;
                    //trap
                    case ("tr"): document.getElementById("board").innerHTML += `<div style="grid-area: ${i+1} / ${j+1} / auto / auto; background-image: url(./img/water.png)" class="block"></div>`  
                                    break;
                    //portal
                    case ("po"): document.getElementById("board").innerHTML += `<div style="grid-area: ${i+1} / ${j+1} / auto / auto; background-color: rgb(0, 0, 0);" class="block"></div>`  
                                    break;
                    //softwall
                    case ("sw"): document.getElementById("board").innerHTML += `<div style="grid-area: ${i+1} / ${j+1} / auto / auto; background-color: rgb(0, 80, 128);" class="block softwall"></div>`  
                                    break;
                    //ghost
                    case ("gh"): document.getElementById("board").innerHTML += `<div id="ghost-${data[i][j].substr(3,1)}" style="grid-area: ${i+1} / ${j+1} / auto / auto; background-image: url(./img/ghost.png); animation-delay:-${Math.random()*3}s" class="ghost block"></div>`  
                                    break;
                    //lever?
                    case ("lo"): document.getElementById("board").innerHTML += `<div style="grid-area: ${i+1} / ${j+1} / auto / auto; background-color: rgb(100, 80, 0);" class="block"></div>`  
                                    break;
                    //temp wall
                    case ("tw"): document.getElementById("board").innerHTML += `<div style="grid-area: ${i+1} / ${j+1} / auto / auto; background-color: rgb(200, 100, 28); display:grid" class="block"><div style="background-color: red;" class="tempwall" id="tempwall-${data[i][j].substr(3,2)}"></div></div>`
                                    break;
                    case ("wn"): document.getElementById("board").innerHTML += `<div style="grid-area: ${i+1} / ${j+1} / auto / auto; background-color: gold" class="block"></div>`
                }
            }
        }
    }
    movePlayer()
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
        console.log(event.keyCode);
        switch (event.keyCode) {
            case 87:
            case 38:
            case 'W': keydown = 0; movePlayer(); break;
            case 83:
            case 40:
            case 'S': keydown = 1; movePlayer();break;
            case 65:
            case 37:
            case 'A': keydown = 2; movePlayer();break;
            case 68:
            case 39:
            case 'D': keydown = 3; movePlayer();break;
            case 69:
            case 'E': eDown = true; checkPosition(); break
        }
    }
});

    document.addEventListener('keyup', function(event) {
        if (data) {
            switch (event.keyCode) {
                case 87:
                case 38:
                case 'W': keydown = ""; break;
                case 83:
                case 40:
                case 'S': keydown = ""; break;
                case 65:
                case 37:
                case 'A': keydown = ""; break;
                case 68:
                case 39:
                case 'D': keydown = ""; break;
                case 69:
                case 'E': eDown = false; checkPosition(); break
            }
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
        SetPlayerPos(data[data.length-1][0],data[data.length-1][1])
        effect = "normal"
        noMove = "false"
    }, 1200)
}

function SetPlayerPos(row,column){
    position[0] = row
    position[1] = column
    
    player.style = `grid-area: ${row} / ${column} / auto / auto;`
    }

function win(){
    document.getElementById("win-overlay").style = "visibility: visible; opacity: 1"
    setTimeout(function(){
        document.getElementById("win-box").style = "transform: translateY(0); opacity: 1"
    },500)
}

function Datum(temp){
    var today = new Date();

    if(temp == "datum"){
        var month = today.getMonth();
        var day = today.getDate();
        var tag = today.getDay();

        let monat = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let tage = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        
        var datum = `${tage[tag-1]}, ${monat[month]} ${day}`
        return datum;
    }
    if(temp == "zeit"){
        var hour = today.getHours();
        var minutes = today.getMinutes();
        if(hour < 10){
            hour = "0" + hour;
        }
        if(minutes < 10){
            minutes = "0" + minutes;
        }
        zeit = `${hour}:${minutes}`
        return zeit;
    }
}

function loadTime(){
    //Zeit und Datum für Handy
    let datum = Datum("datum")
    let zeit = Datum("zeit")

    document.getElementById("date").innerHTML = zeit
    document.getElementById("date2").innerHTML = datum
}

function handyUnlock(){
    document.getElementById("unlock").style = "margin-top: 28vw; opacity: 0;"
    document.getElementById("date").style = "padding-top: 2vw; opacity: 0;"
    document.getElementById("date2").style = "opacity: 0;"

    setTimeout(function() {
        loadHandy(posPlayer);
      }, 400);    
}