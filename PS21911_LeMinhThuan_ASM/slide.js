var imagess = [
    'slide5.jpg',
    'slide6.jpg',
    'slide7.jpg'
];
var i = 0;
var t;
var vSlide = document.getElementById("mySlide");
function fNext(){
    i++;
    if(i >= imagess.length){
        i = 0;
    }
    vSlide.src = "images/" + imagess[i];
}

function fStart() {
    t = window.setInterval(fNext, 3000);
    
}