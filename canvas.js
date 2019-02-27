
var plX, plY;

var clearButton, drawButton;

var ctx;

// Making sure the page is set up correctly before the game starts.
window.onload = setup;

// couple the game loop to the browser
window.main = function () {
    window.requestAnimationFrame(main);


    update();
    render();
}


// setup method to load everything sequentially before the game starts.
function setup() {

    plX = 50;
    plY = 80;

    drawButton = document.getElementById("draw-button");
    clearButton = document.getElementById("clear-button");

    drawButton.onclick = test;
    clearButton.onclick = clCanvas;

    document.addEventListener('keydown', function(event) {

        if(event.keyCode == 65) {
            // alert('Left was pressed');
            plX = plX - 5;
        }
        else if(event.keyCode == 68) {
            // alert('Right was pressed');
            plX = plX + 5;
        }

        else if (event.keyCode == 87) {
            // alert('Up Arrow');
            plY = plY - 5;
        }

        else if (event.keyCode == 83) {
            // alert('Down Arrow');
            plY =  plY + 5;
        }

        if (event.keyCode == 32) {
            clCanvas();
        }
    });

    // Game loop
    main();
}


function update() {


}
function render () {

}


function clCanvas() {
    
    ctx = document.getElementById('canvas').getContext('2d');

    ctx.clearRect(0, 0, 300, 300);

}

function test() {

    ctx = document.getElementById('canvas').getContext('2d');

    ctx.save();

    ctx.strokestyle = 'black';

    ctx.fillRect(plX, plY, 10, 10);
}

