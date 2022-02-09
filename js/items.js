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

function ghostItem() {
    createInfoPopup(position[0], position[1],);

    if (eDown == true) {

        clearInfoPopup() //E triggers the pickup - popup is gone

        let ghost = document.getElementById(`ghost-${data[position[0] - 1][position[1] - 1].substr(3, 1)}`)

        killBlock(ghost)
        effect = "ghost";

        data[position[0] - 1][position[1] - 1] = "-"; //clears item from array

        playerSprite.classList.add("player-ghostmode")

        let softwalls = document.getElementsByClassName("softwall")
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
    return effect;
}

