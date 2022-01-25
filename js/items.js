function loadHandy(posPlayer){
    document.getElementById("date").style.opacity = "0"
    document.getElementById("date2").style.opacity = "0"
    document.getElementById("handy").innerHTML = ""

    document.getElementById("handy").style.backgroundColor = "darkblue"
    document.getElementById("handy").innerHTML = "<h2>Press W A S D to move</h2>"

    console.log(posPlayer.substr(3,2))
    if(posPlayer.substr(3,2) == "sn"){
        loadSnake();
    }
}



