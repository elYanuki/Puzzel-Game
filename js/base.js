document.getElementById("player").style =  "grid-row: 2;grid-column: 2;"

function moveplayer(direction){
    let player = document.getElementById("player")

    switch (direction){
        case 0: //up
            Math.max(--player.style.gridRow, 1)
            break
        case 1: //down
            player.style.gridRow = Math.min(++player.style.gridRow, 12)
            break
        case 2: //left
            Math.max(--player.style.gridColumn, 1)
            break
        case 3: //right
            player.style.gridColumn = Math.min(++player.style.gridColumn, 12)
            break
    }
}

//Select Keys for Movement
document.addEventListener('keydown', function(event) {
        switch(event.key){
            case 'w': moveplayer(0);break
            case 's': moveplayer(1);break
            case 'a': moveplayer(2);break
            case 'd': moveplayer(3);break
    }
});

//Import Java Script File
var script = document.createElement('script');
script.src = "./js/lvl1.js";
document.head.appendChild(script)
