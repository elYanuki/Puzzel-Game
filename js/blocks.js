function trap(){
    dead();
    console.log("You dead");
}

function portale(nextY, nextX){
    position[0] = parseInt(data[nextY-1][nextX-1].substr(3,2))
    position[1] = parseInt(data[nextY-1][nextX-1].substr(6,2))

    document.getElementById("player").style = `grid-area: ${position[0]} / ${position[1]} / auto / auto;`
}