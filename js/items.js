function loadHandy(posPlayer){
    document.getElementById("date").style.opacity = "0"
    document.getElementById("date2").style.opacity = "0"
    document.getElementById("handy").innerHTML = "<div id='game'></div>"

    console.log(posPlayer.substr(3,2))
    if(posPlayer.substr(3,2) == "sn"){
        loadSnake();
    }
    if(posPlayer.substr(3,2) == "te"){
        loadTetris();
    }
}



