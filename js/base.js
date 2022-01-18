let position = [2,2]//[row][column]
let data

loadLevel(1)

function loadLevel(index){
    switch (index){
        case 1: data = lvl1();break;
        case 2: data = lvl2();break;
        case 3: data = lvl3();break;
        case 4: data = lvl4();break;
    }
    
    document.getElementById("player").style = `grid-area: ${data[data.length-1][0]} / ${data[data.length-1][1]} / auto / auto;` //setzt startpos des character auf coordinaten in letzter zeile der data
    position = [data[data.length-1][0],data[data.length-1][1]] //wie oben nur für gespeicherte pos

    let gridItems = ""
    for (let i = 0; i < data.length-2; i++) { //lässt breite des array die breite des grid bestimmen
        gridItems += " 1fr"
    }
    document.getElementById("board").style = `grid-template-columns:${gridItems};grid-template-rows:${gridItems};` //setzt grid breite und höhe
}

function movePlayer(direction){
    let player = document.getElementById("player")

    switch (direction){
        case 0: //up w
            position[0] = Math.max(--position[0], 1) //1 damit nicht aus dem feld läuft
            break
        case 1: //down s
            position[0] = Math.min(++position[0], data[1].length)
            break
        case 2: //left a 
            position[1] = Math.max(--position[1], 1)
            break
        case 3: //right d 
            position[1] = Math.min(++position[1], data[1].length)
            break
    }


    player.style = `grid-area: ${position[0]} / ${position[1]} / auto / auto;`
    console.log("coordinates: r:" + position[0] + " c:" + position[1]);
}

//Select Keys for Movement
document.addEventListener('keydown', function(event) {
        switch(event.key){
            case 'w': movePlayer(0);break;
            case 's': movePlayer(1);break;
            case 'a': movePlayer(2);break;
            case 'd': movePlayer(3);break;
    }
});
