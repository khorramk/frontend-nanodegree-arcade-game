// Enemies our player must avoid
// 10 seconds
let numcoor = [];
let pos = 0;
let loc = 83;
var allEnemies = [
];
var framesPerSecond = 2500;
var requestID;
var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    Window.msRequestAnimationFrame;
var stop = false;
var frameCount = 0;

var fps, fpsInterval, startTime, now, then, elapsed;
class Enemy {
    constructor(_x = 100, _y = 70, _speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        this._x += _x;

        this.speed = _speed;
        this._y += _y;
        this.image = new Image();
        this.image.src = this.sprite;
        this._w = 70;
        this._h = 100;
        //iterate to increase the speed of movement

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        allEnemies.push(this)
        //allEnemies.push(this);

    }  // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks


    /*spawnAtRandom() {
      // add your code here.
      setTimeout(this.spawnAtRandom,  minimum + (Math.random() * (miliseconds - minimum)));
    };*/


    update(dt) {

        return dt;

    }

    collision(turn){
        if(this._x > player._x + player._w &&
           this._x + this._w > player._x &&
           this._y < player._y + player._h &&
           this._h + this._y > player._y 
        ){
            player._y = 450;
            player._x = 303;
        }else{

            player.win(turn);
        
        }
    }

    // Draw the enemy on the screen, required method for game

    render() {

        ctx.drawImage(Resources.get(this.sprite), this._x, this._y, this._w, this._h);


    }
}
function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min + 1)) + min;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor(_x, _y) {
        this._x = _x;
        this._y = _y;
        this.im = 'images/char-boy.png';
        this.image = new Image();
        this.image.src = this.im;
        this._w = 110;
        this._h = 120;

    }


    //render method
    render() {

        ctx.drawImage(Resources.get(this.im), this._x, this._y, this._w, this._h
    );




    }


    //updtae method
    update(dt) {
        allEnemies.forEach(function(enem){
              enem.collision(dt);
        });
      
    }

    //handling input
    handleInput(obj) {
        switch (obj) {
            case 'left':
                this.update(this._x -= 101);
                break;
            case 'right':
                this.update(this._x += 101);
                break;
            case 'up':
                this.update(this._y += 60);
                break;
            case 'down':
                this.update(this._y -= 90);
        }
    }

    win(turn){
        const finish = turn;
        if(this._y === -90){
            reset();


           this._y = 450;
           this._x = 303;
        document.removeEventListener('keyup', function (e) {
                var allowedKeys = {
                    37: 'left',
                    40: 'up',
                    39: 'right',
                    38: 'down'
                };
                player.handleInput(allowedKeys[e.keyCode]);
            }, true);
        }else{
            return turn;
        }
    }
}
//instanting for changing the prototype method
Player.prototype.constructor = Player;

Enemy.prototype.constructor = Enemy;
// Now instantiate your objects.
// Place the player object in a variable called player
var player = new Player(303, 450);
var bug = new Enemy();

// Place all enemy objects in an array called allEnemies
(function () {
    // const bug = new Enemy(0, 83);

    //
    for (let i = 0; i < 6; i++) {
        new Enemy();
    }

})();

// positioning the allthe enemies
(function () {
    let start = -1;
    for (let i = 0; i < 3; i++) {
        start += 83;
        allEnemies[i]._y = start;
        /*for(let j= i + 3; i < allEnemies.length; i++){
          allEnemies[i]._y = start;
            console.log(allEnemies[i]);
        }*/
    }

})();


//enemy.render();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
function moveplayer(){
    document.addEventListener('keyup', function (e) {
        var allowedKeys = {
            37: 'left',
            40: 'up',
            39: 'right',
            38: 'down'
        };
        player.handleInput(allowedKeys[e.keyCode]);
    });
}

//put the function so can later use for other functionality
moveplayer();
//animating the enemies as window loads
startAnimating(100);

//

function startAnimating(fps) {
    //frame per interval
    fpsInterval = 1000 / fps;
    //getting the current dates
    then = Date.now();
    startTime = then;
    console.log(startTime);
    //start aniamting
    animate();
}


function
    animate() {

    // stop
    if (stop) {
        return;
    }

    // request another frame

    requestAnimationFrame(animate);

    // calc elapsed time since last loop

    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval) {

        // Get ready for next frame by setting then=now, but...
        // Also, adjust for fpsInterval not being multiple of 16.67
        then = now - (elapsed % fpsInterval);

        // draw stuff here
        allEnemies.forEach(function (enem) {
            enem._x = pos;
            

           
        })
        //allEnemies[5]._x = pos;
        pos += 5;
        if (Math.abs(pos) === 500) {
            pos = 0;

        }

        // TESTING...Report #seconds since start and achieved fps.
        var sinceStart = now - startTime;
        var currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100;
        //console.log("Elapsed time= " + Math.round(sinceStart / 1000 * 100) / 100 + " secs @ " + currentFps + " fps.");

    }
}

//reset function for displaying modal and repeating the game
function reset(){

    const modal = document.getElementById('myModal');
    //adding the modal to pop up
    modal.classList.add("pop-up");

    return true;
}



