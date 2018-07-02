// Enemies our player must avoid
var allEnemies = [];
class Enemy {
    constructor(_x = 100, _y = 83, _speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.speed = _speed;
        this._y += _y;

        this.width = 50;
        this.height = 60
        //iterate to increase the speed of movement

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        allEnemies.push(this)
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    
}



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(_x, _y, _speed) {
        this._x += _x;
        this._y += _y;
        this._speed = _speed;
        this.sprite = "images/boy.png"
    }

    update(dt){

    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this._x, this._y);
    }

    handleInput(obj) {
        switch (obj) {
            case 'left':
                this.update(this._x -= 101);
                break;
            case 'right':
                this.update(this._x += 101);
                break;
            case 'up':
                this.update(this._y += 83);
                break;
            case 'down':
                this.update(this._y -= 83);
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
