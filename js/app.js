// Enemies our player must avoid
// 10 seconds
let numcoor = [];
let pos = 0;
let pos2 = 0;
let pos3 = 0;
let loc = 83;
var allEnemies = [
];
var right = null;
var left = null;


var fps, fpsInterval, startTime, now, then, elapsed;
class Enemy {
    constructor(_x = 0, _y = 0, _speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        this._x += _x;

        this._speed += _speed;
        this._y += _y;
        this.sprite = 'images/enemy-bug.png';
        this._w = 101;      
        this._h  = 171;
        //this.leftX = getLeft(data, this._w, this._h);
        //this.rightX = getRight(data, this._w, this._h);
        //this.topY = getTop(data, this._w, this._h);
        //this.bottomY = getBottom(data, this._w, this._h); 
        this.radius = Math.sqrt((Math.pow(((this._w * this._h) / 2), 2) * 2)); 
    
        //iterate to increase the speed of movement

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        
        
        //allEnemies.push(this);

    }  // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks



    update(dt) {
       
        allEnemies[0]._x = pos;
        allEnemies[1]._x = pos2;
        allEnemies[2]._x = pos3;
        //allEnemies[5]._x = pos;
        pos3 += 0.5;
        pos2 += 1;
      pos += 2;
        if (Math.abs(pos) === 500) {
            pos = 0;
            
        }

        if(Math.abs(pos2)=== 500){
            pos2 = 0;
        }

        if(Math.abs(pos3) === 500){
            pos3 = 0;
        }

        return dt;

       

    }

    collision(turn){

        /*const dx = (this._x + this.radius) - (this._x + this.radius);
        const dy = (this._y + this.radius) - (this._y + this.radius);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.radius + player.radius) {
            // collision detected!
            
        } else{
            player.win(turn);
        }*/

             

        

        if(this._x > player._x + 80 &&//player._w &&
           this._x + 80 > player._x &&
           this._y < player._y + 100 && //player._h &&
           100 + this._y > player._y 
        ){
            player._y = 404;
            player._x = 202;
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
    constructor(_x, _y, sprite, _h, _w) {
        this._x = _x;
        this._y = _y;
        this.sprite = 'images/char-boy.png';
        
        this._w = 101;
        this._h = 171;
        this.radius = Math.sqrt((Math.pow(((this._w * this._h) / 2), 2) * 2));
       

    }


    //render method
    render() {

        ctx.drawImage(Resources.get(this.sprite), this._x, this._y, this._w, this._h);




    }


    //updtae method
    update(dt) {

        allEnemies.forEach(function (enem) {
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
                this.update(this._y += 64);
                break;
            case 'down':
                this.update(this._y -= 74);
        }
    }

    win(turn){
        const finish = turn;
        if(this._y <= -6){
            reset();
           this._y = 0;

        }
        
        if (this._x > 500) {
                this._x = 404;
        }
        
        if (this._y >= 404) {
                this._y = 404;
            }

        if (this._x > 500) {
                this._x = 500;
            }

        if(this._x < -1){
            this._x = 0;
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
var player = new Player(202, 404);
var bug = new Enemy(100, 70, 1);
var bug2 = new Enemy(100, 70, 0.1);
var bug3 = new Enemy(100, 70, 4);

// Place all enemy objects in an array called allEnemies
(function () {
    // const bug = new Enemy(0, 83);

   allEnemies.push(bug);
   allEnemies.push(bug2);
   allEnemies.push(bug3);

})();

// positioning the allthe enemies
(function () {
    let start = -1;
    for (let i = 0; i < 3; i++) {
        start += 75;
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

//reset function for displaying modal and repeating the game
function reset(){

    const modal = document.getElementById('myModal');
    //adding the modal to pop up
    const btn = document.getElementById("myBtn");
    const clsbtn = document.querySelector(".close");
    clsbtn.addEventListener("click", function (){
          modal.classList.remove("pop-up");
          modal.classList.add("gone");
    });

    btn.addEventListener('click', function () {

        modal.classList.remove("pop-up");
        modal.classList.add("gone");
        window.location.reload(true);
    });
    modal.classList.add("pop-up");

    return true;
}



function getLeft(data, width, height) {
    for (var x = 0; x < width; x++)
        for (var y = 0; y < height; y++) {
            if (data[(width * y + x) * 4 + 3] > 0) {
                return (x);
            }
        }
}

function getRight(data, width, height) {
    for (var x = width - 1; x >= 0; x--)
        for (var y = height - 1; y >= 0; y--) {
            if (data[(width * y + x) * 4 + 3] > 0) {
                return (x);
            }
        }
}

function getTop(data, width, height) {
    for (var y = 0; y < height; y++)
        for (var x = 0; x < width; x++) {
            if (data[(width * y + x) * 4 + 3] > 0) {
                return (y);
            }
        }
}

function getBottom(data, width, height) {
    for (var y = height - 1; y >= 0; y--)
        for (var x = width - 1; x >= 0; x--) {
            if (data[(width * y + x) * 4 + 3] > 0) {
                return (y);
            }
        }
}