function portale(nextY, nextX){
    position[0] = data[nextY-1][nextX-1].substr(2,2)
    position[1] = data[nextY-1][nextX-1].substr(4,2)
    document.getElementById("player").style = `grid-area: ${data[nextY-1][nextX-1].substr(2,2)} / ${data[nextY-1][nextX-1].substr(4,2)} / auto / auto;` //setzt startpos des character auf coordinaten in letzter zeile der data
    fixPosition(data[nextY-1][nextX-1].substr(2,2), data[nextY-1][nextX-1].substr(4,2));
}