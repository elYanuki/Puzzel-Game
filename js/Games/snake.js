let movement = "w";
let snakePos = ["w", "w"];
let snakeMatrix = Array.from(Array(80), () => new Array(40));


function loadSnake(){
    document.getElementById("handy").innerHTML = "";

    let fr1 = ""; let fr2 = "";

        for (let index = 0; index < snakeMatrix.length; index++) {
            fr1 += "1fr "
        }
        for (let index = 0; index < snakeMatrix[0].length; index++) {
            fr2 += "1fr "
        }
        let styleS = `grid-template-columns:${fr1}; grid-template-rows:${fr2};`
        styleS += "background-image: url(./img/snake-grid.jpeg);"
        styleS += "background-size: 3vw;"
        document.getElementById("handy").style += styleS;

        setObjects(20, 20);

       // setInterval(moveSnake, 1000);
}

function moveSnake(){
    console.log("Move Snake")
    if(movement == "w"){
        console.log(snakeMatrix[snakePos[0]][snakePos[1]])
        snakeMatrix[snakePos[0]][snakePos[1]] = "";
        snakeMatrix[snakePos[0]-1][snakePos[1]] = "sn";
    }
    if(movement == "s"){
        console.log(snakeMatrix[snakePos[0]][snakePos[1]])
        snakeMatrix[snakePos[0]][snakePos[1]] = "";
        snakeMatrix[snakePos[0]+1][snakePos[1]] = "sn";
    }
    if(movement == "a"){
        console.log(snakeMatrix[snakePos[0]][snakePos[1]])
        snakeMatrix[snakePos[0]][snakePos[1]] = "";
        snakeMatrix[snakePos[0]][snakePos[1-1]] = "sn";
    }
    if(movement == "d"){
        console.log(snakeMatrix[snakePos[0]][snakePos[1]])
        snakeMatrix[snakePos[0]][snakePos[1]] = "";
        snakeMatrix[snakePos[0]][snakePos[1+1]] = "sn";
    }
    loadSnake();
}

function direction (direction){
    switch(direction){
        case("w"): movement = "w"; break;
        case("s"): movement = "s"; break;
        case("a"): movement = "a"; break;
        case("d"): movement = "d"; break;
    }
}

function setObjects(x, y){
    snakeMatrix[x][y] = "sn"
    let randomX = Math.floor(Math.random()*snakeMatrix.length)
    let randomY = Math.floor(Math.random()*snakeMatrix.length)
    snakeMatrix[randomX][randomY] = "ap"

    for(let i = 0; i < snakeMatrix.length; i++){
        for(let j = 0; j < snakeMatrix[0].length; j++){
                switch(snakeMatrix[i][j]){
                    case("sn"): document.getElementById("handy").innerHTML += `<div style="grid-area: ${(i+1)} / ${j+1} / auto / auto; background-color: rgb(0, 255, 0);" class="fields"></div>`
                                snakePos = [i, j];
                                break;
                    case("ap"): document.getElementById("handy").innerHTML += `<div style="grid-area: ${i+1} / ${j+1} / auto / auto; background-color: rgb(255, 0, 0);" class="fields"></div>`
                }
            }
        
    }
}

