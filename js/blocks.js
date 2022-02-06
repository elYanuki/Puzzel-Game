let trapState = 0
let lastButtonRow
let lastButtonCol

function trap(){
    if(ifhome == false){
    if(trapState==0){
        for (let i = 0; i < document.getElementsByClassName("trap").length; i++) {
            document.getElementsByClassName("trap")[i].style.background = "url(./img/blocks/trap_out.png)"
            document.getElementsByClassName("trap")[i].style.backgroundSize = "100%"
        }
        trapState = 1
        checkPosition()
    }

    else if(trapState==1){
        for (let i = 0; i < document.getElementsByClassName("trap").length; i++) {
            document.getElementsByClassName("trap")[i].style.background = "url(./img/blocks/trap.png)"
            document.getElementsByClassName("trap")[i].style.backgroundSize = "100%"
        }
        trapState = 0
        checkPosition()
    }
}
}

function portal(nextY, nextX){
    noMove = true
    setTimeout(function () {
        playerSprite.style.width = "120%"
        playerSprite.style.height = " 120%"
    }, 10)
    
    setTimeout(function () {
        playerSprite.style.width = "0%"
        playerSprite.style.height = " 0%"
    }, 200)

    setTimeout(function () {
        playerSprite.style.width = "100%"
        playerSprite.style.height = " 100%"
    }, 320)

    setTimeout(function () {
    position[0] = parseInt(data[nextY-1][nextX-1].substr(3,2))
    position[1] = parseInt(data[nextY-1][nextX-1].substr(6,2))

    player.style = `grid-area: ${position[0]} / ${position[1]} / auto / auto;`
    }, 400)
    noMove = false
}

function tempwall(){
    let tempwallLivetime = 1000
    let tempwallDowntime = 1500 //immer nur in 300er schitten ändern wegen animation
    let myrow = position[0]-1
    let mycol = position[1]-1

    let thisWall = document.getElementById(`tempwall-${data[position[0]-1][position[1]-1].substr(3,2)}`)
    thisWall.style.animationPlayState = "running"

    setTimeout(function(){
        thisWall.style.width = "0%"
        thisWall.style.height = "0%"
    },tempwallLivetime)

    setTimeout(function(){
        data[myrow][mycol] = `${data[myrow][mycol]}-kill`
        checkPosition()
    },tempwallLivetime+500) //+animation time

    setTimeout(function(){
        data[myrow][mycol] = data[myrow][mycol].substr(0,5)
        thisWall.style.animationPlayState = "paused"
        thisWall.style.width = "100%"
        thisWall.style.height = "100%"
    },tempwallLivetime+500+tempwallDowntime)

    
}

function lever(){
    let myrow = position[0]-1
    let mycol = position[1]-1
    
    createInfoPopup(position[0], position[1], "press E or Enter to flip the lever");
    
    if (eDown == true) {
        clearInfoPopup() //e sorgt ja für den pickup
    
            let lever = document.getElementById(`lever-${data[position[0]-1][position[1]-1].substr(3,1)}`)
    
            if(data[myrow][mycol].substr(6,2) == "on"){
                data[myrow][mycol] = `${data[myrow][mycol].substr(0,6)}of`
            }
            else if(data[myrow][mycol].substr(6,2) == "of"){
                data[myrow][mycol] = `${data[myrow][mycol].substr(0,6)}on`
            }
            updateObjects()
    }
}

function button(){
    let myrow = position[0]-1
    let mycol = position[1]-1

    let button = document.getElementById(`button-${data[myrow][mycol].substr(3,1)}`)

    data[myrow][mycol] = `${data[myrow][mycol].substr(0,6)}of`
    lastButtonRow = myrow
    lastButtonCol = mycol
    updateObjects()
}

function resetButtons(){1
    if(lastButtonCol){
        data[lastButtonRow][lastButtonCol] = `${data[lastButtonRow][lastButtonCol].substr(0,6)}on`
        updateObjects()
    }
}

function updateObjects(){
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length; j++) { //cycled durch jede zelle   
            if(data[i][j]){
                if (data[i][j].substr(0, 2) == "dr") {//wenn zelle door ist && kein key gesteurtes lock
                    let door = document.getElementById(`door-${data[i][j].substr(3, 2)}`)
                    if (data[i][j].substr(2, 2) == "ky") {
                        
                    }
                    else {
                        if (data[parseInt(data[i][j].substr(6, 2)) - 1][parseInt(data[i][j].substr(9, 2)) - 1].substr(6, 2) == "on") { //wenn lever oder button an den coordinaten die in der zelle angegeben sind "on" ist
                            for (let i = 0; i < 4; i++) {
                                door.childNodes[i].style = `width: 100%;height:100%`
                            }
                            data[i][j] = `${data[i][j].substr(0, 12)}cl`
                        }
                        if (data[parseInt(data[i][j].substr(6, 2)) - 1][parseInt(data[i][j].substr(9, 2)) - 1].substr(6, 2) == "of") { //wenn lever oder button an den coordinaten die in der zelle angegeben sind "of" ist 
                            for (let i = 0; i < 4; i++) {
                                door.childNodes[i].style = `width: 30%;height:30%;`
                            }
                            data[i][j] = `${data[i][j].substr(0, 12)}op`
                        }
                    }
                }
            }
        }
    }
}

function killBlock(block){
    block.style.width = 0
    block.style.height = 0
    setTimeout(function () {
        block.parentNode.removeChild(block);
    }, 500)
}