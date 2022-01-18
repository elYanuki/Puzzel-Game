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

document.addEventListener('keydown', function(event) {
    console.log(event.key);
        switch(event.key){
            case 'w': moveplayer(0);
            case 'a': moveplayer(1);
            case 's': moveplayer(2);
            case 'd': moveplayer(3);
    }
});