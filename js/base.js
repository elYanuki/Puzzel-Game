let position = [2,2]//[row][column]
let data
let effect = "normal"
let eDown = false
let noMove = false
let level
let player //position des player
let playerSprite //style des player
let keydown
let posPlayer
let Inventory = []
let locked = []
let levelCount = 9

loadLocalStorrage()
loadMenuHtml()

function loadLocalStorrage(){
    if(localStorage['lockedLevels']){
    locked = JSON.parse(localStorage['lockedLevels'])
    console.log("defined");
    }

    else{
        locked[0] = false
        for (let i = 1; i < 9; i++) {
            locked[i] = true
        }
        console.log("set all true");
    }

    console.log(locked)
}

function writeLocalStorrage(){
    localStorage['lockedLevels'] = JSON.stringify(locked)
}

function nextLevel(){
    console.log(locked);
    loadLevelHtml()
}

function enterLevel(i){
    if(locked[i-1] == false){
        level = 1
        loadLevelHtml()
    }
}

function loadLevelData(){
    ifhome = false;
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

}

function loadLevelHtml(){
    document.getElementsByTagName("body")[0].innerHTML= levelHtml
    document.getElementById("handy").innerHTML += `<h1 id="date"></h1><h2 id="date2"></h2>`
    document.getElementById("handy").innerHTML += `<div id="unlock"></div>`

    loadLevelData();
    setElements();
    updateObjects()
    player = document.getElementById('player')
    playerSprite = document.getElementById('player-sprite')

    loadTime();
    
    setInterval(loadTime, 1000);
    setInterval(trap,3000);
}

function loadMenuHtml(){
    ifhome = true
    document.getElementsByTagName("body")[0].innerHTML = mainHTML

    for (let i = 0; i < levelCount; i++) {
        if(locked[i] == true){
            document.getElementById(`locked-overlay-${i+1}`).style.visibility = "visible"
        }
    }
}

function movePlayer(){
    if(effect == "handy"){
        switch (keydown){
            case 0: //up w
                moveBlocks("w");
                break
            case 1: //down s
                
            moveBlocks("s")
                break
            case 2: //left a
                moveBlocks("a")
                break
            case 3: //right d 
                moveBlocks("d")
                break
        }
    } else{
        if(noMove != true){
        let move = false;
        let pos0 = position[0]
        let pos1 = position[1]
    
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
                if(trapState==1){
                    dead();
                }
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
            case "tw": //temporary wall
                return true;
                break
            case "ky": //key
                return true;
                break
            case "dr": //door
                if (data[nextY - 1][nextX - 1].substr(3, 2) == "ky") {
                    
                }
                else {
                    if (data[nextY - 1][nextX - 1].substr(12, 2) == "op") {
                        return true;
                    }
                    else if (data[nextY - 1][nextX - 1].substr(12, 2) == "cl") {
                        return false;
                    }
                }
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
                active = true;
                effect = "handy";
                clearInfoPopup();
                handyUnlock();
            } else if(active == false){
                createInfoPopup(position[0], position[1],)
            }
            return true;
        case "tw":
            if (posPlayer.substr(6,4)!='kill'){
            tempwall()
            }
            if(posPlayer.substr(6,4)=='kill'){
                dead()
            }
            break;
        case "gh":
            ghostItem()
            break;
        case "ky":
            key()
            break;
        case "sw":
            if(effect != "ghost"){
                dead()
                }
            break;
        case "wn":
            win()
            break
        case "lv":
            lever()
            break
        case "bt":
            button()
            break
        case "dr":
            break
        case "tr":
            if(trapState==1){
                dead();
            }
            break
        default:
            clearInfoPopup()
            break
    }

    if(position[0] == data[data.length-1][2] && position[1] == data[data.length-1][3]){
        win()
    }

    if(posPlayer.substr(0,2) != "bt"){
        resetButtons()
    }
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
                /* if(rotateRNG <0.25){
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
                } */
                rotateRNG = 0

                switch(sub){
                    //wall
                    case ("wa"): 
                        document.getElementById("board").innerHTML += `<div style="grid-area: ${i+1} / ${j+1} / auto / auto; background-image: url(./img/blocks/wall.png); transform: rotate(${0}deg);" class="block"></div>`
                                    break;
                    //trap
                    case ("tr"): document.getElementById("board").innerHTML += `<div style="grid-area: ${i+1} / ${j+1} / auto / auto;" class="block trap"></div>`  
                                    break;
                    //portal
                    case ("po"): document.getElementById("board").innerHTML += `<div style="grid-area: ${i+1} / ${j+1} / auto / auto; background-image: url(./img/blocks/portal.png);" class="block portal"></div>`  
                                    break;
                    //softwall
                    case ("sw"): 
                        if (chooseRNG < 0.4) {
                            back = "bush_v2"
                        }
                        else {
                            if (last == true) {
                                back = "bush_v2"
                                last = false
                            }
                            else {
                                last = true
                                back = "bush_v2_berry"
                            }
                        }
                        document.getElementById("board").innerHTML += `<div style="grid-area: ${i + 1} / ${j + 1} / auto / auto; background-image: url(./img/blocks/${back}.png);  transform: rotate(${rotateRNG}deg);" class="block softwall"></div>`  
                        break;
                    //ghost
                    case ("gh"): document.getElementById("board").innerHTML += `<div id="ghost-${data[i][j].substr(3,1)}" style="grid-area: ${i+1} / ${j+1} / auto / auto; animation-delay:-${Math.random()*6}s" class="ghost block"></div>`  
                                    break;
                    //lever
                    case ("lv"): 
                    document.getElementById("board").innerHTML += `<div id="lever-${data[i][j].substr(3,2)}" style="grid-area: ${i+1} / ${j+1} / auto / auto;" class="relativ"><div class="lever"></div></div>`  
                                    break;
                    //lever
                    case ("bt"): 
                    document.getElementById("board").innerHTML += `<div id="button-${data[i][j].substr(3,2)}" style="grid-area: ${i+1} / ${j+1} / auto / auto;" class="button block"></div>`  
                                    break;
                    //locked
                    case ("lo"): document.getElementById("board").innerHTML += `<div style="grid-area: ${i+1} / ${j+1} / auto / auto; background-color: rgb(100, 80, 0);" class="block"></div>`  
                                    break;
                    //temp wall
                    case ("tw"): 
                    document.getElementById("board").innerHTML += `<div style="grid-area: ${i+1} / ${j+1} / auto / auto; background-color: lightgreen; display:grid" class="block"><div style="background-color: red;" class="tempwall" id="tempwall-${data[i][j].substr(3,2)}"></div></div>`
                                    break;
                    //door
                    case ("dr"): 
                    document.getElementById("board").innerHTML += `<div style="grid-area: ${i+1} / ${j+1} / auto / auto; display:grid;" class="block door" id="door-${data[i][j].substr(3,2)}"><div class="sub-door"></div><div class="sub-door"></div><div class="sub-door"></div><div class="sub-door"></div></div>`
                                    break;
                    //key
                    case ("ky"): 
                    document.getElementById("board").innerHTML += `<div style="grid-area: ${i+1} / ${j+1} / auto / auto;" class="block key"></div>`
                                    break;
                }
            }
        }
    }
    document.getElementById("board").innerHTML += `<div style="grid-area: ${data[data.length-1][2]} / ${data[data.length-1][3]} / auto / auto; background-color: gold" class="block"></div>`
    movePlayer()
}

function createInfoPopup(x,y,text) {
    if(text) { //dont specifie text to use default
        document.getElementById("info-text").innerHTML = text
    }
    else{
        document.getElementById("info-text").innerHTML = `Press E or Enter to pick up the item`
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
/*     console.log(event); */
    if (data) {
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
            case 13: eDown = true; checkPosition(); break
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
                case 13: eDown = false; checkPosition(); break
            }
        }
    });

function dead(){
    effect = "normal"

    playerSprite.classList.remove("player-ghostmode")

    let softwalls = document.getElementsByClassName("softwall")

    for (let i = 0; i < softwalls.length; i++) {
        softwalls[i].classList.remove("softwall-ghostmode")
    }

    document.getElementById("countdown-text").innerHTML = ""
    document.getElementById("countdown").style = `animation-name: none;`
    noMove = true

    setTimeout(function () {
        playerSprite.style.visibility = "hidden"
    }, 200)
    setTimeout(function () {
        playerSprite.style.visibility = "visible"
    }, 400)
    setTimeout(function () {
        playerSprite.style.visibility = "hidden"
    }, 600)
    setTimeout(function () {
        playerSprite.style.visibility = "visible"
    }, 800)
    setTimeout(function () {
        playerSprite.style.visibility = "hidden"
    }, 1000)

    setTimeout(function () {
        playerSprite.style.visibility = "visible"
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
    if(ifhome == false){
        locked[level] = false
        level++
        writeLocalStorrage()
        document.getElementById("win-overlay").style = "visibility: visible; opacity: 1"
        setTimeout(function(){
            document.getElementById("win-box").style = "transform: translateY(0); opacity: 1"
        },500)
    }
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
    if(effect != "handy" && ifhome == false){
    //Zeit und Datum für Handy
    let datum = Datum("datum")
    let zeit = Datum("zeit")

    document.getElementById("date").innerHTML = zeit
    document.getElementById("date2").innerHTML = datum
}
}

function handyUnlock(){
    document.getElementById("unlock").style = "margin-top: 28vw; opacity: 0;"
    document.getElementById("date").style = "padding-top: 2vw; opacity: 0;"
    document.getElementById("date2").style = "opacity: 0;"

    setTimeout(function() {
        loadHandy(posPlayer);
      }, 400);    
}