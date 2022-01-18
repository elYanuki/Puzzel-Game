document.getElementById("player").style =  "grid-row: 2;grid-column: 2;"

function moveplayer(direction){
    let player = document.getElementById("player")

    switch (direction){
        case 0: //up
            Math.max(--player.style.gridRow, 0)
            break
        case 1: //down
            player.style.gridColumn = Math.min(++player.style.gridRow, 12)
            break
        case 2: //left
            Math.max(--player.style.gridColumn, 0)
            break
        case 3: //right
            player.style.gridColumn = Math.min(++player.style.gridColumn, 12)
            break
    }
    
}

function input(key, elem){
    elem.value = ''

    switch(key.keyCode){
        case 119: moveplayer(0);break
        case 115: moveplayer(1);break
        case 97: moveplayer(2);break
        case 100: moveplayer(3);break
    }
}
