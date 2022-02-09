let movement = "w";
let snakePos = ["w", "w"];
let snakeMatrix = Array.from(Array(40), () => new Array(20));


function loadSnake(){
    document.getElementById("handy").innerHTML = "";

    let fr1 = ""; let fr2 = "";

        //Grid Collumns erstellen
        for (let index = 0; index < snakeMatrix.length; index++) {
            fr1 += "1fr "
        }
        //Grid Rows erstellen
        for (let index = 0; index < snakeMatrix[0].length; index++) {
            fr2 += "1fr "
        }
        let styleS = `grid-template-columns:${fr1}; grid-template-rows:${fr2};`
        //Background
        styleS += "background-image: url(./img/minigames/snake-grid.jpeg);"
        styleS += "background-size: 3vw;"
        styleS += "display: grid;"
        document.getElementById("handy").style += styleS;

        setObjects(0, 0);

       // setInterval(moveSnake, 1000);
}

function moveSnake(){
    //Change Direction Up
    if(movement == "w"){
        console.log(snakeMatrix[snakePos[0]][snakePos[1]])
        snakeMatrix[snakePos[0]][snakePos[1]] = "";
        snakeMatrix[snakePos[0]-1][snakePos[1]] = "sn";
    }
    //Change Direction Down
    if(movement == "s"){
        console.log(snakeMatrix[snakePos[0]][snakePos[1]])
        snakeMatrix[snakePos[0]][snakePos[1]] = "";
        snakeMatrix[snakePos[0]+1][snakePos[1]] = "sn";
    }
    //Change Direction Left
    if(movement == "a"){
        console.log(snakeMatrix[snakePos[0]][snakePos[1]])
        snakeMatrix[snakePos[0]][snakePos[1]] = "";
        snakeMatrix[snakePos[0]][snakePos[1-1]] = "sn";
    }
    //Change Direction Right
    if(movement == "d"){
        console.log(snakeMatrix[snakePos[0]][snakePos[1]])
        snakeMatrix[snakePos[0]][snakePos[1]] = "";
        snakeMatrix[snakePos[0]][snakePos[1+1]] = "sn";
    }
    loadSnake();
}

function setObjects(x, y){
    snakeMatrix[x][y] = "sn"
    //Random Apfel Koordinaten
    let randomY = Math.floor(Math.random()*snakeMatrix.length)
    let randomX = Math.floor(Math.random()*snakeMatrix.length)
    snakeMatrix[randomX][randomY] = "ap"
    console.log(snakeMatrix)

    for(let i = 0; i < snakeMatrix.length; i++){
        for(let j = 0; j < snakeMatrix[0].length; j++){
                switch(snakeMatrix[i][j]){
                    case("sn"): document.getElementById("handy").innerHTML += `<div style="grid-area: ${x} / ${y} / auto / auto; background-color: rgb(0, 255, 0);" class="fields"></div>`
                                snakePos = [x, y];
                                console.log(snakePos)
                                break;
                    case("ap"): document.getElementById("handy").innerHTML += `<div style="grid-area: ${i} / ${j} / auto / auto; background-color: rgb(255, 0, 0);" class="fields"></div>`
                                console.log(i, j)
                                break;
                }
            }
        
    }
}

