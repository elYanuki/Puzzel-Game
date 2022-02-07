function lvl1(){
    let levelTemplate = [["lv-01-of","-","bt-02-on","ky","gh-0","-","sw","-","-","-",],["-","-","-","wa","-","-","tr","-","-","-",],["-","-","-","wa","-","po-09-09","sw","tr","-","-",],["wa","tw-00","wa","wa","wa","wa","wa","-","-","-",],["tr","tw-01","tr","-","-","-","-","-","-","-",],["-","-","-","-","-","-","dr-01-01-01-y-op","-","-","-",],["-","-","-","-","-","-","-","-","-","-",],["sw","sw","sw","sw","-","dr-02-01-03-cl","dr-03-01-03-cl","-","-","-",],["-","-","-","sw","-","-","-","-","po-03-06s","-",],["-","-","-","sw","-","-","-","-","-","-",],["1","2","10","1"]]
    return levelTemplate
    }

function lvl2(){
    let levelTemplate = [["wa","wa","wa","-","-","-","-","-","-","-",],["-","-","wa","-","-","-","-","-","-","-",],["-","-","wa","-","-","-","-","-","-","-",],["-","-","wa","-","-","sw","sw","-","-","-",],["wa","-","wa","tw-00","-","-","sw","sw","-","-",],["-","-","-","tw-01","-","-","sw","-","-","-",],["-","-","-","tw-02","tw-03","tw-04","-","sw","-","-",],["-","-","-","-","-","-","-","-","-","-",],["-","tr","tr","tr","-","-","-","-","-","gh-0",],["-","-","-","tr","tr","tr","-","-","-","-",],["2","1","9","5"]]
    return levelTemplate
    }

function lvl3(){
    let levelTemplate = [["-","wa","wa","wa","wa","wa","lv-02-on","-","-","-",],["-","wa","lv-03-on","sw","gh-0","wa","-","-","sw","-",],["-","wa","wa","wa","tr","wa","wa","wa","-","wa",],["-","-","-","wa","tw-00","tr","tr","sw","tr","wa",],["-","-","-","wa","wa","wa","wa","wa","-","wa",],["-","-","-","-","dr-02-02-03-cl","tr","tr","dr-01-01-07-cl","sw","wa",],["-","wa","wa","wa","wa","wa","wa","wa","wa","wa",],["-","-","-","-","-","-","-","-","-","-",],["-","-","-","-","-","-","-","-","-","-",],["-","-","-","-","-","-","-","-","-","-",],["04","05","10","10"]]
    return levelTemplate
    }

var mainHTML = `<div class="flex" id="menu-flex">
<main id="level-selector">
    <div onclick="enterLevel(1)">
        <div class="relativ">
        <div id="locked-overlay-1" class="locked-overlay">
            <img src="./img/icons/lock.png" alt="locked">
        </div>
        <p>Level 1</p>
        <img src="./img/preview/preview_1.jpg" alt="preview image">
        </div>
    </div>
    <div onclick="enterLevel(2)">
        <div class="relativ">
        <div id="locked-overlay-2" class="locked-overlay">
            <img src="./img/icons/lock.png" alt="locked">
        </div>
        <p>Level 2</p>
        <img src="./img/preview/preview_2.jpg" alt="preview image">
        </div>
    </div>
    <div onclick="enterLevel(3)">
        <div class="relativ">
        <div id="locked-overlay-3" class="locked-overlay">
            <img src="./img/icons/lock.png" alt="locked">
        </div>
        <p>Level 3</p>
        <img src="./img/preview/preview_3.jpg" alt="preview image">
        </div>
    </div>
    <div onclick="enterLevel(4)">
        <div class="relativ">
        <div id="locked-overlay-4" class="locked-overlay">
            <img src="./img/icons/lock.png" alt="locked">
        </div>
        <p>Level 4</p>
        <img src="./img/preview/preview_4.jpg" alt="preview image">
        </div>
    </div>
    <div onclick="enterLevel(5)">
        <div class="relativ">
        <div id="locked-overlay-5" class="locked-overlay">
            <img src="./img/icons/lock.png" alt="locked">
        </div>
        <p>Level 5</p>
        <img src="./img/preview/preview_5.jpg" alt="preview image">
        </div>
    </div>
    <div onclick="enterLevel(6)">
        <div class="relativ">
        <div id="locked-overlay-6" class="locked-overlay">
            <img src="./img/icons/lock.png" alt="locked">
        </div>
        <p>Level 6</p>
        <img src="./img/preview/preview_6.jpg" alt="preview image">
        </div>
    </div>
    <div onclick="enterLevel(7)">
        <div class="relativ">
        <div id="locked-overlay-7" class="locked-overlay">
            <img src="./img/icons/lock.png" alt="locked">
        </div>
        <p>Level 7</p>
        <img src="./img/preview/preview_7.jpg" alt="preview image">
        </div>
    </div>
    <div onclick="enterLevel(8)">
        <div class="relativ">
        <div id="locked-overlay-8" class="locked-overlay">
            <img src="./img/icons/lock.png" alt="locked">
        </div>
        <p>Level 8</p>
        <img src="./img/preview/preview_8.jpg" alt="preview image">
        </div>
    </div>
    <div onclick="enterLevel(9)">
        <div class="relativ">
        <div id="locked-overlay-9" class="locked-overlay">
            <img src="./img/icons/lock.png" alt="locked">
        </div>
        <p>Level 9</p>
        <img src="./img/preview/preview_9.jpg" alt="preview image">
        </div>
    </div>
</main>
<main id="main-info">
    <div>
        <h2>Game Name</h2>
        <p>Use W A S D or the arrow Keys to move around. Press E or hold SPACE to interact with objects or Items.</p>
    </div>
    <div>
        <h2>Objects and Items</h2>
        <ul>
            <li>
                <h3>Wall</h3>
                <p>You shall not PAAASS</p>
            </li>
            <li>
                <h3>Trap</h3>
                <p>dangerous pointy spikes hurt</p>
            </li>
            <li>
                <h3>SoftWall</h3>
                <p>You shall pass, only if u r in the ghostmode tho</p>
            </li>
        </ul>
    </div>
</main>
</div>`

var levelHtml = `<div id="countdown-box"><p id="countdown-text"></p><div id="countdown"></div></div><div class="flex"><main id="board"><div id="player"><div id="player-sprite"></div></div> <div id="info-relative"><div id="info"><p id="info-text">Press E to pick up the item.</p></div><div id="info-arrow"></div></div></main><div id="handy"></div><div id="settings"><div id="items"></div></div></div><div id="win-overlay"> <div id="win-box"> <h1>Level Completed</h1> <div> <div onclick="nextLevel()"> <p>next level</p><img src="./img/icons/arrow.png" alt="arrow"> </div> <div onclick="loadMenuHtml()"> <p>home</p><img src="./img/icons/home.png" alt="home"> </div> </div> </div> </div>`