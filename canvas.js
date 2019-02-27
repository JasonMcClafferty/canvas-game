
var plX,
    plY,
    speed;

var clearButton, drawButton;

var ctx, stopGame;


var Keys;
// Making sure the page is set up correctly before the game starts.
window.onload = setup;

// couple the game loop to the browser

window.main = function () {
    stopGame = window.requestAnimationFrame(main);


    update();
    render();


}


// setup method to load everything sequentially before the game starts.
function setup() {

    keys = {
        up: false,
        down: false,
        left: false,
        right: false
    }

    plX = 50;
    plY = 80;

    speed = 2;

    drawButton = document.getElementById("draw-button");
    clearButton = document.getElementById("clear-button");

    drawButton.onclick = draw;
    clearButton.onclick = clCanvas;

    document.addEventListener('keydown', function(event) {

        if (event.keyCode == 32) {

            clCanvas();
            window.cancelAnimationFrame(stopGame);
        }
    });


    // Game loop
    main();



}
        window.onkeydown = function(e) {

            var kc = e.keyCode;

            if (kc === 65) {
                keys.left = true;
            }
            if (kc === 68) {
                keys.right = true;
            }

            if (kc === 87) {
                keys.up = true;
            }

            if (kc === 83) {
                keys.down = true;
            }
        }

        window.onkeyup = function(e) {

            var kc = e.keyCode;

            if(kc === 65) {
                keys.left = false;
            }
            if(kc === 68) {
                keys.right = false;
            }

            if (kc === 87) {
                keys.up = false;
            }

            if (kc === 83) {
                keys.down = false;
            }

        }


function update() {
    //console.log('update');

    if (keys.up) {
        plY -= speed;
    }

    if (keys.down) {
        plY += speed;
    }

    if (keys.left) {
        plX -= speed;
    }

    if (keys.right) {
        plX += speed;
    }



}

function render () {
    //console.log('render');

    clCanvas();
    draw();

}


function clCanvas() {
    
    ctx = document.getElementById('canvas').getContext('2d');

    ctx.clearRect(0, 0, 500, 500);

}

function draw() {

    ctx = document.getElementById('canvas').getContext('2d');

    ctx.save();

    ctx.strokestyle = 'black';

    ctx.fillRect(plX, plY, 10, 10);
}

