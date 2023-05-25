canvas = document.getElementById('layer');
context = canvas.getContext("2d");
context.lineWidth = 2;

canvas.onmousedown = startDraw;
canvas.onmouseup = stopDraw;
canvas.onmouseout = stopDraw;
canvas.onmousemove = Draw;

//для пипетки
var getColorFromImg = false;

//fill
var startFill = false;

//DRAWING
isDraw = false;
function startDraw(e) {
    isDraw = true;
    
    context.beginPath();
    context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);


    //ПИПЕТКА НА ОДИН КЛИК
    if(getColorFromImg) {
        const x = e.offsetX;
        const y = e.offsetY;


        const data = context.getImageData(x, y, 1, 1);
        const pixels = data.data;

        const red = pixels[0];
        const green = pixels[1];
        const blue = pixels[2];
        const alpha = pixels[3];

        if(`rgba(${pixels.join(',')})` != `rgba(0,0,0,0)`) {
            context.strokeStyle = `rgba(${pixels.join(',')})`;
            //console.log(`rgba(${pixels.join(',')})`);
            document.getElementById('colorNOW').style.color = `rgba(${pixels.join(',')})`;
            
        }
        else {
            context.strokeStyle = `rgba(255, 255, 255, 255)`;
            document.getElementById('colorNOW').style.color = `rgba(255, 255, 255, 255)`;
        }

        document.getElementById('emphasis_pip').style.visibility = "hidden";
        getColorFromImg = false;
    }

    //fill
    /* if (startFill) {
        
        //позиция текущая курсора
        const x = e.offsetX;

        const matrix = context.getImageData(0, 0, 500, 500);
        const color = context.strokeStyle;


        newImg = context.createImageData(500, 500);

        newImg = flood_fill(matrix, x, color);

        console.log(newImg)

        context.putImageData(newImg, 500, 500);


        checkFill = false;
    } */
}

//fill
function flood_fill(matrix, x, color) {

    var x_len = matrix.Length; 
    var cur_color = matrix[x];
    if(cur_color == color) {
        return matrix
    }

    function fill(r) {
        if(matrix[r] == cur_color) {
            matrix[r] = color;

            if(r >= 1) {
                fill(r - 1);
            }

            if(r + 1 < x_len) {
                fill(r + 1);
            }
  
        }
    }

    fill(x);
    return matrix;  
}



function stopDraw() {
   isDraw = false;
}

function Draw(e) {
    if (isDraw) {
        x = e.pageX - canvas.offsetLeft;
        y = e.pageY - canvas.offsetTop;

        context.lineTo(x, y);
        context.stroke();
    }
}



box = document.getElementById("box");
box.onchange = changeWidth;


//ТЕКУЩЕЕ ЗНАЧЕНИЕ
box.oninput = function() {
    valueWidth = document.getElementById('valueWidth');
    valueWidth.innerHTML = this.value;

    
    

    
    if (this.value > 10 && this.value % 1 != 0) {
        valueWidth.style.left = `${(this.value*1.8)}px`;
    }
    else {
        valueWidth.style.left = `${(this.value*1.8)+2.55}px`;
    }
    
    

}


//WIDTH CHANGE
function changeWidth() {

    value = this.value;
    context.lineWidth = value;
    
}


