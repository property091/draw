saverButton = document.getElementById('saver');
saverButton.onclick = saveImg;


function saveImg() {
    
    var ImgCopy = document.getElementById('layer');

    ImgCopy.src = canvas.toDataURL();

    //console.log(ImgCopy.src);
    
    //ссылка скачивания
    var link = document.createElement("a");
    link.setAttribute("href", ImgCopy.src);
    link.setAttribute("download", "image.png");

    link.click();
}


