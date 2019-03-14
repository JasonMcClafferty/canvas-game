

/*
    TODO: Scale up everything by x10 in terms of pixel size
        - Need to implement acceleration and can't have velocity
          increasing by .2 pixels per frame, because it can only
          move an integer number of pixels per frame.
            ------------DONE-------------------
        - Need to scale up HUD - text etc.

 */

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

var acceleration, maxSpeed;

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

    plX = 500;
    plY = 800;

    speed = 20;

    score = 0;

    goalX = 1500;
    goalY = 2000;

    goalSize = 500;

    chX =  4500;
    chY = 800;
    chaseSpeed = 15;

    acceleration = 1;
    maxSpeed = 12;

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
    //


    if (speed < maxSpeed) {
        speed += acceleration * 2;
    }

    if (!keys.up
        && !keys.down
        && !keys.right
        && !keys.left) {
        speed = 20;
    }
    if (keys.up) {
        plY -= speed;

        if (plY < -80) {
            plY = 5000;
        }
    }

    if (keys.down) {

        plY += speed;

        if (plY > 5000) {
            plY = 0;
        }
    }

    if (keys.left) {
        plX -= speed;

        if (plX < 0) {
            plX = 5000;
        }
    }

    if (keys.right) {
        plX += speed;

        if (plX > 5000) {
            plX = -100;
        }
    }


    if (plX > goalX
        && plX < goalX + goalSize
        && plY > goalY
        && plY < goalY + goalSize)
    {
        score ++;
        maxSpeed++;
        resetGoal();
    }

    if ((plX + 50) >= (chX)
        && (plX + 50) <= (chX + 150)
        && (plY + 50) >= (chY)
        && (plY + 50)<= (chY + 150)) {

        score -= 2;
        resetChaser();
    }

    chase();

    if (maxSpeed % 10 == 0) {
        chX
    }
}

function render () {

    // clear and draw the canvas - coupled to the rate at
    // which the browser can push frames.
    clCanvas();
    draw();

    ctx.font = "200px Exo 2";
    ctx.fillText("Score: " + score, 150, 150);

    var dirStr = unitVector(directionVector(chX, chY, plX, plY)).toString();
    ctx. fillText(dirStr, 4000, 150);
}


function clCanvas() {

    ctx = document.getElementById('canvas').getContext('2d');
    ctx.clearRect(0, 0, 6000, 6000);

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
    ctx.fillRect(plX, plY, 100, 100);

}

function drawGoal() {

    // ctx.fillStyle = 'red';
    ctx.fillRect(goalX, goalY, goalSize, goalSize);
}

function resetGoal() {
    goalX = Math.floor(Math.random() * 4500);
    goalY = Math.floor(Math.random() * 4500);
}

function drawChaser() {

    ctx.lineWidth = 10;
    ctx.strokeRect(chX, chY, 150, 150);
}

function resetChaser() {

    chX = 4500;
    chY = 800;
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
 *  The vector is rounded because when travelling
 *  diagonally the unit vector becomes a fraction.
 *
 *  TODO -NOTE-
 *      Remember that the unit vector is rounded,
 *      it may be something that works itself out
 *     when more math is applied.
 */
function unitVector(x) {

    var i = x[0];
    var j = x[1];

    var mag =  Math.sqrt((i*i) + (j*j));

    return [Math.round(i/mag), Math.round(j/mag)];
}


/*
 *  Function to chase the player
 *
 * TODO
 *      Look at why the chaser doesn't
 *      catch the player if they're both moving.
 *      - Something to do with the interpolation maybe.
 *      _______KNOWN_______
 *      - Chaser size initially not accounted for meaning the player's (0,0)
 *        had to match the chaser's (0,0). Need to play with the
 *        overlap range.
 *
 *  TODO
 *      Sort out vector based movement
 *      -   Use a vector for current velocity (Vector A).
 *      -   Use a Vector for Target Velocity i.e. the vector from chaser
 *          position to player position (Vector B).
 *      -   Interpolate Vector A towards Vector B using
 *      '
 *                  A =  (A*t + (1 - t)*B)
 *      '
 *          where t is an arbitrary constant.
 *
 */
function chase() {

    if (chaseSpeed < maxSpeed) {
        chaseSpeed += acceleration;
    }


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

function vectorChase() {

}

    /* TODO
    *   Organise a debug class that renders useful information
    *   Can be commented out.
    *
    */
function myDebug() {

}