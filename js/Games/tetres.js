let tetrisMatrix = Array.from(Array(10), () => new Array(20));

for(let i = 0; i < tetrisMatrix.length; i++){
    for(let j = 0; j < tetrisMatrix[0].length; j++){
        tetrisMatrix[i][j] = " ";
    }
}

let block = [[0, 0],[0, 0],[0, 0],[0, 0]]   
let blockType;
let farbe;
let intervall

function loadTetris(){
    let styleS = `display: grid;
    grid-template-columns: repeat(${tetrisMatrix.length}, 1fr); grid-template-rows: repeat(${tetrisMatrix[0].length}, 1fr);`

    //Background
    styleS += "background-image: url(./img/tetris_background.jpg);"
    document.getElementById("game").style += styleS;

    randomObject();
    setBlocks();
    intervall = setInterval(blockFall, 100);
}

function moveBlocks(movement){
    let block1, block2, block3, block4;

    //Drehen
    if(movement == "w"){
        rotateBlock();
    }
    //Schneller Fallen
    if(movement == "s"){

    }

    //Change Direction Left
    if(movement == "a"){
        block1 = block[0][0] - 1; block2 = block[1][0] - 1; block3 = block[2][0] - 1; block4 = block[3][0] - 1;
        if(block1 >= 0 && block2 >= 0 && block3 >= 0 && block4 >= 0){
            if(tetrisMatrix[block1][block[0][1]] != "block" && tetrisMatrix[block2][block[1][1]] != "block" && tetrisMatrix[block3][block[2][1]] != "block" && tetrisMatrix[block4][block[3][1]] != "block"){
            block[0][0]--
            block[1][0]--
            block[2][0]--
            block[3][0]--
            }
        }
    }
    //Change Direction Right
    if(movement == "d"){
        block1 = block[0][0] + 1; block2 = block[1][0] + 1; block3 = block[2][0] + 1; block4 = block[3][0] + 1;
        if(block1 < 10 && block2 < 10 && block3 < 10 && block4 < 10){
            if(tetrisMatrix[block1][block[0][1]] != "block" && tetrisMatrix[block2][block[1][1]] != "block" && tetrisMatrix[block3][block[2][1]] != "block" && tetrisMatrix[block4][block[3][1]] != "block"){
                block[0][0]++
                block[1][0]++
                block[2][0]++
                block[3][0]++
            }
        }
    }
    removeBlocks();
    setBlocks();
}

function blockFall(){
    let block1, block2, block3, block4;
    //Block kann nicht aus dem Feld fallen
    if(block[0][1] < 19 && block[1][1] < 19 && block[2][1] < 19 && block[3][1] < 19){
        //Block kann nicht durch anderen Block fallen
            block1 = block[0][1] + 1; block2 = block[1][1] + 1; block3 = block[2][1] + 1; block4 = block[3][1] + 1;
            if(tetrisMatrix[block[0][0]][block1] != "block" && tetrisMatrix[block[1][0]][block2] != "block" && tetrisMatrix[block[2][0]][block3] != "block" && tetrisMatrix[block[3][0]][block4] != "block"){
                block[0][1]++;
                block[1][1]++;
                block[2][1]++;
                block[3][1]++;
            } else{
                for(let i = 0; i < 4; i++){
                    tetrisMatrix[block[i][0]][block[i][1]] = "block"
                }
                blocksFixed();
                randomObject();
            }
    } else{
        for(let i = 0; i < 4; i++){
            tetrisMatrix[block[i][0]][block[i][1]] = "block"
        }
        blocksFixed();
        randomObject();
    }
    removeBlocks();
    setBlocks();
}
function blocksFixed(){
    document.getElementById("game").innerHTML += `<div style="grid-area: ${block[0][1]+1} / ${block[0][0]+1} / auto / auto; background-color: ${farbe};" class='blocksF' class="tetris${block[0][1]+1}}"></div>`
    document.getElementById("game").innerHTML += `<div style="grid-area: ${block[1][1]+1} / ${block[1][0]+1} / auto / auto; background-color: ${farbe};" class='blocksF' class="tetris${block[0][1]+1}}"></div>`
    document.getElementById("game").innerHTML += `<div style="grid-area: ${block[2][1]+1} / ${block[2][0]+1} / auto / auto; background-color: ${farbe};" class='blocksF' class="tetris${block[0][1]+1}"></div>`
    document.getElementById("game").innerHTML += `<div style="grid-area: ${block[3][1]+1} / ${block[3][0]+1} / auto / auto; background-color: ${farbe};" class='blocksF' class="tetris${block[0][1]+1}"></div>`
    checkRows();
}
function setBlocks(){
    document.getElementById("game").innerHTML += `<div style="grid-area: ${block[0][1]+1} / ${block[0][0]+1} / auto / auto; background-color: ${farbe}" class="blocks" id="tetris1"></div>`
    document.getElementById("game").innerHTML += `<div style="grid-area: ${block[1][1]+1} / ${block[1][0]+1} / auto / auto; background-color: ${farbe}" class="blocks" id="tetris2"></div>`
    document.getElementById("game").innerHTML += `<div style="grid-area: ${block[2][1]+1} / ${block[2][0]+1} / auto / auto; background-color: ${farbe}" class="blocks" id="tetris3"></div>`
    document.getElementById("game").innerHTML += `<div style="grid-area: ${block[3][1]+1} / ${block[3][0]+1} / auto / auto; background-color: ${farbe}" class="blocks" id="tetris4"></div>`
}
function removeBlocks(){
    document.getElementById("tetris1").remove();
    document.getElementById("tetris2").remove();
    document.getElementById("tetris3").remove();
    document.getElementById("tetris4").remove();

}

function rotateBlock(){
    if(blockType == "T"){

    }
    if(blockType == "I"){
        block[0][0] = block[0][2] + 1
        block[0][1] = block[0][2] + 2
        block[0][3] = block[0][2] - 1

    }
    if(blockType == "J"){

    }
    if(blockType == "L"){

    }
    if(blockType == "Z"){

    }
    if(blockType == "S"){

    }
    setBlocks();
}

function checkRows(){
    for(let i = 0; i < tetrisMatrix[0].length; i++){
        let rowCheck = 0;
        for(let j = 0; j < tetrisMatrix.length; j++){
            if(tetrisMatrix[j][i] != " "){
                rowCheck++;
            }
        }
        if(rowCheck == 10){
            console.log("Remove")
            var elements = document.getElementsByClassName(`tetris${i}`);
            while(elements.length > 0){
                elements[0].parentNode.removeChild(elements[0]);
            }
        }
    }
}
function randomObject(){
    let zahl = Math.floor(Math.random()* 7 + 1);
    let text;
    switch (zahl){  
        //3 Linie 1 in der Mitte darunter
        case 1: block[0][0] = tetrisMatrix.length/2;    block[0][1] = 0;
                block[1][0] = tetrisMatrix.length/2 - 1;block[1][1] = 0;
                block[2][0] = tetrisMatrix.length/2 + 1;block[2][1] = 0;
                block[3][0] = tetrisMatrix.length/2;    block[3][1] = 1; 
                blockType = "T"
                farbe = "#a032a8"
                break;

        //2 oben 2 unten
        case 2: block[0][0] = tetrisMatrix.length/2;    block[0][1] = 0;
                block[1][0] = tetrisMatrix.length/2 - 1;block[1][1] = 0;
                block[2][0] = tetrisMatrix.length/2;    block[2][1] = 1;
                block[3][0] = tetrisMatrix.length/2 - 1;block[3][1] = 1; 
                blockType = "O"
                farbe = "#00f2ff"
                break;
                
        //4 in einer Linie
        case 3: block[0][0] = tetrisMatrix.length/2;    block[0][1] = 0;
                block[1][0] = tetrisMatrix.length/2 - 1;block[1][1] = 0;
                block[2][0] = tetrisMatrix.length/2 + 1;block[2][1] = 0;
                block[3][0] = tetrisMatrix.length/2 - 2;block[3][1] = 0; 
                blockType = "I"
                farbe = "#eeff00"
                break;

        //1 Block 3 darunter nach rechts
        case 4: block[0][0] = tetrisMatrix.length/2;    block[0][1] = 0;
                block[1][0] = tetrisMatrix.length/2;    block[1][1] = 1;
                block[2][0] = tetrisMatrix.length/2 + 1;block[2][1] = 1;
                block[3][0] = tetrisMatrix.length/2 + 2;block[3][1] = 1; 
                blockType = "J"
                farbe = "#ff9500"
                break;

        //1 Block 3 darunter nach links
        case 5: block[0][0] = tetrisMatrix.length/2;    block[0][1] = 0;
                block[1][0] = tetrisMatrix.length/2;    block[1][1] = 1;
                block[2][0] = tetrisMatrix.length/2 - 1;block[2][1] = 1;
                block[3][0] = tetrisMatrix.length/2 - 2;block[3][1] = 1; 
                blockType = "L"
                farbe = "#2600ff"
                break;

        //2 unten 2 oben nach rechts
        case 6: block[0][0] = tetrisMatrix.length/2;    block[0][1] = 0;
                block[1][0] = tetrisMatrix.length/2 - 1;block[1][1] = 0;
                block[2][0] = tetrisMatrix.length/2;    block[2][1] = 1;
                block[3][0] = tetrisMatrix.length/2 + 1;block[3][1] = 1; 
                blockType = "Z"
                farbe = "#ff0400"
                break;

        //2 unten 2 oben nach links
        case 7: block[0][0] = tetrisMatrix.length/2;    block[0][1] = 0;
                block[1][0] = tetrisMatrix.length/2 + 1;block[1][1] = 0;
                block[2][0] = tetrisMatrix.length/2;    block[2][1] = 1;
                block[3][0] = tetrisMatrix.length/2 - 1;block[3][1] = 1; 
                blockType = "S"
                farbe = "#26ff00"
                break;
    }
    console.log(blockType)
}