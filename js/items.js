function loadHandy(posPlayer){
    document.getElementById("date").style.opacity = "0"
    document.getElementById("date2").style.opacity = "0"
    document.getElementById("handy").innerHTML = "<div id='game'></div>"

    if(posPlayer.substr(3,2) == "sn"){
        loadSnake();
    }
    if(posPlayer.substr(3,2) == "te"){
        loadTetris();
    }
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

function key(){
    let myrow = position[0]-1
    let mycol = position[1]-1

    createInfoPopup(position[0], position[1],);

    if (eDown == true) {
        clearInfoPopup() //e sorgt ja für den pickup
        document.getElementById("items").innerHTML = `<div><img src="./img/blocks/key.png"></div>`
    }
}

