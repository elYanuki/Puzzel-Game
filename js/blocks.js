function trap(){
    dead();
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

    let thisWall = document.getElementById(`tempwall-${data[position[0]-1][position[1]-1].substr(3,2)}`)
    thisWall.style.animationPlayState = "running"

    setTimeout(function(){
        thisWall.style.width = "0%"
        thisWall.style.height = "0%"
    },tempwallLivetime)

    setTimeout(function(){
        if(data[position[0]-1][position[1]-1].substr(0, 2) == "tw"){
            dead();
        }
    },tempwallLivetime+500) //+animation time

    setTimeout(function(){
        thisWall.style.animationPlayState = "paused"
        thisWall.style.width = "100%"
        thisWall.style.height = "100%"
    },tempwallLivetime+500+tempwallDowntime)
}

function ghostItem(){
        if(posPlayer.substr(0, 2) == "gh"){ //muss vor dem edown sein weil es ja bei edown wieder weg sein soll
            createInfoPopup(position[0], position[1],);
        }
        if (eDown == true) {

            clearInfoPopup() //e sorgt ja für den pickup

            if (posPlayer.substr(0, 2) == "gh") {
                let ghost = document.getElementById(`ghost-${data[position[0]-1][position[1]-1].substr(3,1)}`)
                killBlock(ghost)
                effect = "ghost";
                data[position[0] - 1][position[1] - 1] = "-";

                let softwalls = document.getElementsByClassName("softwall")

                playerSprite.classList.add("player-ghostmode")

                for (let i = 0; i < softwalls.length; i++) {
                    softwalls[i].classList.add("softwall-ghostmode")
                }

                countdown(10, "Ghost")

                setTimeout(function () {
                    effect = "normal"

                    playerSprite.classList.remove("player-ghostmode")

                    for (let i = 0; i < softwalls.length; i++) {
                        softwalls[i].classList.remove("softwall-ghostmode")
                    }
                    checkPosition()
                }, 10000)
            }
        }
        return effect;
}

function killBlock(block){
    block.style.width = 0
    block.style.height = 0
    setTimeout(function () {
        block.parentNode.removeChild(block);
    }, 500)
}