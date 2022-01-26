let tetrisMatrix = Array.from(Array(10), () => new Array(20));

function loadTetris(){
    let styleS = `display: grid;
    grid-template-columns: repeat(${tetrisMatrix.length-1}, 1fr); grid-template-rows: repeat(${tetrisMatrix[0].length-1}, 1fr);`

    //Background
    styleS += "background-color: black;"
    console.log(styleS)
    document.getElementById("game").style += styleS;

    loadDrop();
    console.log(tetrisMatrix)
}
function loadDrop(){
    tetrisMatrix[tetrisMatrix.length / 2][0] = "block"
    tetrisMatrix[tetrisMatrix.length / 2 - 1][0] = "block"
    tetrisMatrix[tetrisMatrix.length / 2 + 1][0] = "block"
    tetrisMatrix[tetrisMatrix.length / 2][1] = "block"
}