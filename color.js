const canvasColor = document.createElement('canvas');
const h = canvasColor.height = 450
const w = canvasColor.width = 50

canvasColor.setAttribute("id", "gradient");
canvasColor.style.borderRadius = "6px";
canvasColor.style.position = "flex";
canvasColor.style.float = "Left";
canvasColor.style.border = 0;
canvasColor.style.marginTop = "20px";

const contextColor = canvasColor.getContext('2d');

var mrgLeft = 0;
var mrgTop = 0;

var R = 0;
var G = 255;
var B = 255;


for(var i = 0; i < 900; i++) {
    
    contextColor.fillStyle = `rgb(${R}, ${G}, ${B})`;
    contextColor.fillRect(mrgLeft, mrgTop, 5, 5);

    mrgLeft+=5;

    if (mrgLeft >= 50) {
        mrgLeft = 0;
        mrgTop+=5;
    }
    
    //цвета
    if (i < 100) {
        R+=2.2;
        B-=1.4;
        
    }
    else if (i < 200) {
        G-=1.2;
    }
    else if (i < 300) {
        G++;
        B++;
    }
    else if (i < 400) {
        R--;
    }
    else if (i < 500) {
        R++;
        G--;
    }
    else if (i < 600) {
        R++;
        B++;
    }
    else if (i < 700) {
        R--;
        G--;
        B--;
    }
    else if (i < 800) {
        R+=2;
        G-=2;
        B-=2;
    }
    
}

canvasColor.onclick = function(e) {

    const x = e.offsetX;
    const y = e.offsetY;

    const data = contextColor.getImageData(x, y, 1, 1);
    const pixels = data.data;

    const red = pixels[0];
    const green = pixels[1];
    const blue = pixels[2];
    const alpha = pixels[3];

    context.strokeStyle = `rgba(${pixels.join(',')})`;

    document.getElementById('colorNOW').style.color = `rgba(${pixels.join(',')})`;
}

document.getElementById('tools').appendChild(canvasColor);


function random(max) {
    return Math.floor(Math.random() * max);
}




//colorSAVER

colorSAVER = document.getElementById('colorSAVER');
for(var i = 0; i < 9; i++) {
    colorSAVER.innerHTML += "<div class='colorSAVERsquere'></div>";
}


colorSAVERsqueres = document.getElementsByClassName('colorSAVERsquere');
for(var i = 0; i < 9; i++) {
    colorSAVERsqueres[i].addEventListener('dblclick', saveColor);
    colorSAVERsqueres[i].addEventListener('click', getColor, false);
}

function saveColor() {
    this.style.backgroundColor = context.strokeStyle;
}

function getColor() {
    context.strokeStyle = this.style.backgroundColor;
    document.getElementById('colorNOW').style.color = context.strokeStyle;
}



//кнопки
pip = document.getElementById('pip');
pip.addEventListener('click', checkPip)
function checkPip() {
    getColorFromImg = true;
    
    document.getElementById('emphasis_pip').style.visibility = "visible";
}




/* buck = document.getElementById('b');
buck.addEventListener('click', checkFill);
 */
function checkFill() {
    startFill = true;
}

//ластик
cl = document.getElementById('cleaner');
cl.addEventListener('click', startClear);

var alredy = false;
function startClear() {

    if(alredy == false) {
        document.getElementById('cleaner').style.border = "3px gray solid";
        context.strokeStyle = "rgb(245, 245, 245)";
        

        //cur
        document.body.style.cursor = "url(cleaner.png) 9 28, auto";

        //видимость 
        document.getElementById('cleaner').style.position = "relative";
        document.getElementById('changeWidth').style.position = "relative";

        document.getElementById('cleaner').style.zIndex = "3";
        document.getElementById('changeWidth').style.zIndex = "3";

        document.getElementById('emphasis_pip').style.visibility = "visible";

        alredy = true;
    }

    else {
        //cur
        document.body.style.cursor = "url(cursor.png) 9 28, auto";
        
        //видимость
        document.getElementById('cleaner').style.border = "0";

        document.getElementById('cleaner').style.zIndex = "1";
        document.getElementById('emphasis_pip').style.visibility = "hidden";
        
        alredy = false;
    }
}