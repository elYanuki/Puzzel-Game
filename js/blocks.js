function trap(){
    dead();
    console.log("You dead");
}

function portale(nextY, nextX){
    noMove = true
    setTimeout(function () {
        player.style.width = "90%"
        player.style.height = " 90%"
    }, 10)
    
    setTimeout(function () {
        player.style.width = "0%"
        player.style.height = " 0%"
    }, 200)

    setTimeout(function () {
    position[0] = parseInt(data[nextY-1][nextX-1].substr(3,2))
    position[1] = parseInt(data[nextY-1][nextX-1].substr(6,2))

    player.style = `grid-area: ${position[0]} / ${position[1]} / auto / auto;`
    }, 400)
    noMove = false
}