window.onload = setup;

var startButton, helpButton, exitButton;

function setup() {
    startButton = document.getElementById("st-btn");
    helpButton = document.getElementById("h-btn");
    exitButton = document.getElementById("ex-btn");


    // Used event listener instead of 'onclick' as it was
    // firing during 'window.onload', launching the game.
    startButton.addEventListener('click',  function(e) {
        window.location.href = 'canvas.html';
    })

    helpButton.addEventListener('click',  function(e) {
        alert('help!');
    })

    exitButton.addEventListener('click', function(e) {
        alert('Exit!');
    })
}
