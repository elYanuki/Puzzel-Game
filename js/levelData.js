function lvl1(){
    let levelTemplate = [["lv-01-of","lv-02-on","bt-02-on","ky","gh-0","-","sw","-","-","-",],["-","-","-","wa","-","-","tr","-","-","-",],["-","ls","-","wa","-","po-09-09","sw","tr","-","-",],["wa","tw-00","wa","wa","wa","wa","wa","-","-","-",],["tr","tw-01","tr","ow-01-0","-","ow-02-1","-","ow-03-2","-","ow-04-3",],["-","-","-","-","-","-","dr-01-01-01-y-op","-","-","-",],["-","-","-","-","-","-","-","-","-","-",],["sw","sw","sw","-ww","-","dr-02-01-03-cl","dr-03-01-03-cl","-","-","-",],["-","-","-","sw","-","-","-","-","po-03-06s","-",],["-","-","-","sw","-","-","-","-","-","-",],["1","2","10","1"]]
    return levelTemplate
    }

function lvl2(){
    let levelTemplate = [["tw-00","tw-01","tw-02","wa","wa","wa","wa","-","-","tr",],["tw-03","-","tw-04","tr","tr","tr","ow-01-3","-","-","-",],["tw-05","tw-06","tw-07","wa","wa","wa","wa","wa","dr-00-07-02-cl","wa",],["wa","tr","wa","-","-","-","wa","-","-","-",],["wa","tr","wa","-","po-09-01","-","wa","-","po-05-05","-",],["wa","tr","wa","-","-","-","wa","wa","wa","wa",],["wa","lv-00-on","wa","-","-","-","wa","-","-","-",],["wa","wa","wa","-","-","-","wa","-","-","-",],["po-05-05","-","wa","-","-","-","dr-01-10-02-cl","-","-","-",],["-","lv-01-on","wa","-","-","-","wa","-","-","-",],["2","2","9","9"]]
    return levelTemplate
    }

function lvl3(){
    let levelTemplate = [["lv-02-of","gh-0","sw","-","-","ow-13-2","-","-",],["gh-1","-","lv-04-of","dr-01-01-01-cl","-","ow-12-0","-","-",],["-","dr-04-01-01-cl","po-04-03","dr-02-01-01-cl","-","ow-11-0","-","-",],["sw","sw","dr-06-02-03-cl","-","-","ow-10-0","-","-",],["-","sw","sw","ow-01-1","ow-02-3","ow-09-0","ow-04-1","ow-06-3",],["-","-","-","ow-00-1","ow-03-3","ow-08-0","ow-05-1","ow-07-3",],["sw","-","-","dr-05-08-04-cl","-","-","-","-",],["-","-","-","lv-03-on","-","-","-","-",],["2","2","1","6"]]
    return levelTemplate
    }

function lvl4() {
    let levelTemplate = [["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-",],["-","-","-","tr","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-",],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-",],["-","-","-","-","-","-","-","-","-","-","-","bt-00-on","-","-","-","-","-","-","-","-",],["-","-","-","-","-","-","-","-","-","-","-","dr-01-05-20-cl","-","-","-","-","-","-","-","-",],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","lv-00-09-14","-","-",],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-",],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-",],["-","-","tr","-","-","-","-","-","tr","-","-","-","-","-","-","-","-","-","-","-",],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-",],["-","-","-","-","-","-","-","-","-","-","-","dr-00-lksdfjhgö-cl","-","-","-","tw-00","tw-01","tw-02","-","-",],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-",],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","tr","-","-",],["-","-","-","-","-","-","tr","-","-","-","-","-","-","-","-","-","-","-","-","-",],["-","-","-","-","-","-","-","tr","-","-","-","-","-","-","-","-","-","-","-","-",],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-",],["-","-","-","-","-","-","-","-","-","-","-","po-09-09","-","-","-","-","-","-","-","-",],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-",],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-",],["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-",],["1","1","2","2"]]
    return levelTemplate
}

var mainHTML = `<div class="flex" id="menu-flex">
<main id="level-selector">
    <div onclick="enterLevel(1,this)">
        <div class="relativ">
        <div id="locked-overlay-1" class="locked-overlay">
            <img src="./img/icons/lock.png" alt="locked">
        </div>
        <p>Level 1</p>
        <img src="./img/preview/preview_1.jpg" alt="preview image">
        </div>
    </div>
    <div onclick="enterLevel(2,this)">
        <div class="relativ">
        <div id="locked-overlay-2" class="locked-overlay">
            <img src="./img/icons/lock.png" alt="locked">
        </div>
        <p>Level 2</p>
        <img src="./img/preview/preview_2.jpg" alt="preview image">
        </div>
    </div>
    <div onclick="enterLevel(3,this)">
        <div class="relativ">
        <div id="locked-overlay-3" class="locked-overlay">
            <img src="./img/icons/lock.png" alt="locked">
        </div>
        <p>Level 3</p>
        <img src="./img/preview/preview_3.jpg" alt="preview image">
        </div>
    </div>
    <div onclick="enterLevel(4,this)">
        <div class="relativ">
        <div id="locked-overlay-4" class="locked-overlay">
            <img src="./img/icons/lock.png" alt="locked">
        </div>
        <p>Level 4</p>
        <img src="./img/preview/preview_4.jpg" alt="preview image">
        </div>
    </div>
    <div onclick="enterLevel(5,this)">
        <div class="relativ">
        <div id="locked-overlay-5" class="locked-overlay">
            <img src="./img/icons/lock.png" alt="locked">
        </div>
        <p>Level 5</p>
        <img src="./img/preview/preview_5.jpg" alt="preview image">
        </div>
    </div>
    <div onclick="enterLevel(6,this)">
        <div class="relativ">
        <div id="locked-overlay-6" class="locked-overlay">
            <img src="./img/icons/lock.png" alt="locked">
        </div>
        <p>Level 6</p>
        <img src="./img/preview/preview_6.jpg" alt="preview image">
        </div>
    </div>
    <div onclick="enterLevel(7,this)">
        <div class="relativ">
        <div id="locked-overlay-7" class="locked-overlay">
            <img src="./img/icons/lock.png" alt="locked">
        </div>
        <p>Level 7</p>
        <img src="./img/preview/preview_7.jpg" alt="preview image">
        </div>
    </div>
    <div onclick="enterLevel(8,this)">
        <div class="relativ">
        <div id="locked-overlay-8" class="locked-overlay">
            <img src="./img/icons/lock.png" alt="locked">
        </div>
        <p>Level 8</p>
        <img src="./img/preview/preview_8.jpg" alt="preview image">
        </div>
    </div>
    <div onclick="enterLevel(9,this)">
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
        <p>Use W A S D or the arrow Keys to move around. Press E or hold SPACE to interact with objects or Items.<br>Your goal is to get to the golden field.</p>
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

var levelHtml = `
<div class="flex" id="level-flex">
<div id="countdown-box">
    <p id="countdown-text"></p>
    <div id="countdown"></div>
</div>
<main id="board">
    <div id="player">
        <div id="player-sprite"></div>
    </div>
    <div id="info-relative">
        <div id="info">
            <p id="info-text">Press E to pick up the item.</p>
        </div>
        <div id="info-arrow"></div>
    </div>
</main>
<div id="handy"></div>
<div id="settings">
    <div id="items">
        <div id="item-1" class="item-slot"></div>
        <div id="item-2" class="item-slot"></div>
        <div id="item-3" class="item-slot"></div>
    </div>
    <div onclick="loadMenuHtml()" class="nav">
        <h1>home</h1>
        <img src="./img/icons/home.png" alt="home">
    </div>
    <div onclick="level--; loadLevelHtml()" class="nav">
        <h1>retry</h1>
        <img src="./img/icons/retry.png" alt="retry">
    </div>
</div>
</div>
<div id="win-overlay">
<div id="win-box">
    <h1>Level Completed</h1>
    <div>
        <div onclick="nextLevel()">
            <p>next level</p>
            <img src="./img/icons/arrow.png" alt="arrow">
        </div>
        <div onclick="loadMenuHtml()">
            <p>home</p>
            <img src="./img/icons/home.png" alt="home">
        </div>
        <div onclick="level--; loadLevelHtml()">
            <p>retry</p>
            <img src="./img/icons/retry.png" alt="retry">
        </div>
    </div>
</div>
</div>`