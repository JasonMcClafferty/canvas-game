window.onload = test;

// var setup = function() {}




function clCanvas() {
    ctx.clearRect(0, 0, 300, 300);
}

function test() {

    var ctx = document.getElementById('canvas').getContext('2d');

    ctx.save();

    ctx.strokestyle = 'black';

    ctx.fillRect(25, 25, 10, 10);
}