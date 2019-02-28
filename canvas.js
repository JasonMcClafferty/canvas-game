
var plX,
    plY,
    speed,
    score;

var goalX,
    goalY,
    goalSize;

var chX,
    chY,
    chaseSpeed;

var ctx, stopGame;

var keys = {};

var dir;


// Making sure the page is set up correctly before the game starts.
window.onload = setup;

/*  Using onkey instead of new event handling to allow
 *  simultaneous movement across 2 dimensions.
 *
 *  Changes keys boolean values to true/false,
 *  the values are then accessed in the update
 *  and player moves accordingly.
 */
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


// couple the game loop to the browser event loop
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

    chX =  450;
    chY = 80;
    chaseSpeed = 2;

    dir = directionVector(chX, chY, plX, plY);

    // Spacebar closes the program,
    // stops the browser event loop calling main().
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

    /*  See lines 31, 51 for keys.direction use
     *
     *  If player goes out of bounds,
     *  snake style teleportation to the other side of the canvas.
     *  -   Adds an avoidance mechanic as the chaser
     *      is faster than the player.
     */
    // s
    if (keys.up) {
        plY -= speed;

        if (plY < -8) {
            plY = 500;
        }
    }

    if (keys.down) {
        plY += speed;

        if (plY > 500) {
            plY = 0;
        }
    }

    if (keys.left) {
        plX -= speed;

        if (plX < 0) {
            plX = 500;
        }
    }

    if (keys.right) {
        plX += speed;

        if (plX > 500) {
            plX = -10;
        }
    }


    if (plX > goalX
        && plX < goalX + goalSize
        && plY > goalY
        && plY < goalY + goalSize)
    {
        score ++;
        resetGoal();
    }

    if ((plX ) >= (chX)
        && (plX) <= (chX)
        && (plY) >= (chY)
        && (plY)<= (chY)) {

        score -= 2;
        resetChaser();
    }

    chase();

}

function render () {

    // clear and draw the canvas - coupled to the rate at
    // which the browser can push frames.
    clCanvas();
    draw();

    ctx.font = "20px Exo 2";
    ctx.fillText("Score: " + score, 15, 15);

    var dirStr = directionVector(chX, chY, plX, plY).toString();
    ctx. fillText(dirStr, 400, 15);
}


function clCanvas() {

    ctx = document.getElementById('canvas').getContext('2d');
    ctx.clearRect(0, 0, 500, 500);

}

function draw() {

    ctx = document.getElementById('canvas').getContext('2d');
    ctx.save();

    drawPlayer();
    drawGoal()
    drawChaser();

    //myDebug();

}


function drawPlayer() {

    ctx.strokeStyle = 'black';
    ctx.fillRect(plX, plY, 10, 10);

}

function drawGoal() {

    // ctx.fillStyle = 'red';
    ctx.fillRect(goalX, goalY, goalSize, goalSize);
}
function resetGoal() {
    goalX = Math.floor(Math.random() * 450);
    goalY = Math.floor(Math.random() * 450);
}

function drawChaser() {

    ctx.strokeRect(chX, chY, 15, 15);
}

function resetChaser() {

    chX = 450;
    chY = 80;

    // Begin follow algorithm
}

/*
    Finding the direction vector to give the chaser
    a movement direction, towards the player's
    current location.

 */
function directionVector(x, y, a, b) {

    var Vdx = a - x;
    var Vdy = b - y;

    return [Vdx, Vdy];
}

/* Finding unit vector to scale the direction
 * vector by a given speed. Accepts an array to
 * suit the output of the direction vector method.
 *
function unitVector(x) {

    return [Math.sqrt(x[0]^2 + x[1]^2) * x[0], Math.sqrt(x[0]^2 + x[1]^2) * x[1]];
}*/


/*
    Function to chase the player
 */
function chase() {
    if (chX < plX) {
        chX += chaseSpeed;
    }

    else if (chX > plX) {
        chX -= chaseSpeed;
    }

    if (chY < plY) {
        chY += chaseSpeed;
    }

    else if (chY > plY) {
        chY -= chaseSpeed;
    }
}


function myDebug() {

}