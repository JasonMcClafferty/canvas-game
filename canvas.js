
var plX,
    plY,
    speed,
    score;

var goalX,
    goalY,
    goalSize;

var ctx, stopGame;

var keys = {};


// Making sure the page is set up correctly before the game starts.
window.onload = setup;

// Using onkey instead of new event handling to allow
// simultaneous movement across 2 dimensions.
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


// couple the game loop to the browser

window.main = function () {
    stopGame = window.requestAnimationFrame(main);


    update();
    render();


}

// setup method to load everything sequentially before the game starts.
function setup() {
    ctx = document.getElementById('canvas').getContext('2d');

    keys = {
        up: false,
        down: false,
        left: false,
        right: false
    }

    plX = 50;
    plY = 80;

    speed = 2;

    score = 0;

    goalX = 150;
    goalY = 200;

    goalSize = 50;

    document.addEventListener('keydown', function(event) {

        if (event.keyCode == 32) {

            clCanvas();
            window.cancelAnimationFrame(stopGame);
        }
    });


    // Game loop
    main();

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


    if (plX > goalX
        && plX < goalX + goalSize
        && plY > goalY
        && plY < goalY + goalSize)
    {
        score ++;
        resetGoal();
    }

}

function render () {

    // clear and draw the canvas - coupled to the rate at
    // which the browser can push frames.
    clCanvas();
    draw();

    ctx.font = "20px Exo 2";
    ctx.fillText("Score: " + score, 15, 15);
}


function clCanvas() {

    ctx = document.getElementById('canvas').getContext('2d');
    ctx.clearRect(0, 0, 500, 500);

}

function draw() {

    ctx = document.getElementById('canvas').getContext('2d');
    ctx.save();


    drawPlayer();
    drawGoal();

}


function drawPlayer() {
    ctx.strokestyle = 'black';
    ctx.fillRect(plX, plY, 10, 10);
}

function drawGoal() {

    ctx.strokestyle = 'red';
    ctx.fillRect(goalX, goalY, goalSize, goalSize);
}

function resetGoal() {
    goalX = Math.floor(Math.random() * 450);
    goalY = Math.floor(Math.random() * 450);
}