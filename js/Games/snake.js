function loadSnake(){
    let snakeMatrix = [ ["", "", "", "", "", "", "", "", "", ""],
                        ["", "", "", "", "", "", "", "", "", ""],
                        ["", "", "", "", "", "", "", "", "", ""],
                        ["", "", "", "", "", "", "", "", "", ""],
                        ["", "", "", "", "", "", "", "", "", ""],
                        ["", "", "", "", "", "", "", "", "", ""],
                        ["", "", "", "", "", "", "", "", "", ""],
                        ["", "", "", "", "", "", "", "", "", ""],
                        ["", "", "", "", "", "", "", "", "", ""],
                        ["", "", "", "", "", "", "", "", "", ""],
                        ["", "", "", "", "", "sn", "", "", "", ""],
                        ["", "", "", "", "", "", "", "", "", "" ],
                        ["", "", "", "ap", "", "", "", "", "", ""],
                        ["", "", "", "", "", "", "", "", "", ""],
                        ["", "", "", "", "", "", "", "", "", ""],
                        ["", "", "", "", "", "", "", "", "", ""],
                        ["", "", "", "", "", "", "", "", "", ""],
                        ["", "", "", "", "", "", "", "", "", ""],
                        ["", "", "", "", "", "", "", "", "", ""],
                        ["", "", "", "", "", "", "", "", "", ""]]


        document.getElementById("handy").innerHTML = "";
        for(let i = 0; i < snakeMatrix.length; i++){
            for(let j = 0; j < snakeMatrix[0].length; j++){
                    switch(snakeMatrix[i][j]){
                        case (""): if((j+i) % 2 == 0){
                                        document.getElementById("handy").innerHTML += `<div style="grid-area: ${i+1} / ${j+1} / auto / auto; background-color: rgb(0, 32, 10);" class="field"></div>`
                                    } else{
                                        document.getElementById("handy").innerHTML += `<div style="grid-area: ${i+1} / ${j+1} / auto / auto; background-color: rgb(43, 134, 100);" class="field"></div>`
                                    }
                                    break;
                        case("sn"): document.getElementById("handy").innerHTML += `<div style="grid-area: ${(i+1)} / ${j+1} / auto / auto; background-color: rgb(0, 255, 0);" class="field"></div>`
                                    break;
                        case("ap"): document.getElementById("handy").innerHTML += `<div style="grid-area: ${i+1} / ${j+1} / auto / auto; background-color: rgb(255, 0, 0);" class="field"></div>`
                    }
                }
            
        }
    
        document.getElementById("handy").style = `grid-template-columns:${snakeMatrix.length};grid-template-rows:${snakeMatrix[0].length};`
    }

