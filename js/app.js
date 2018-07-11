// Enemies our player must avoid
var Enemy = function(x, y) {
    this.x = x;// Variables applied to each of our instances go here,
    this.y = y;// we've provided one for you to get started
    this.speed = Math.floor(Math.random() * 201) + 120;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt// You should multiply any movement by the dt parameter
    
    if (this.x > 707) {
        this.x = -100;
        this.speed = Math.floor(Math.random() * 201) + 120;
    }
};

Enemy.prototype.collision= function() {
    var leftHitbox = player.x - 50;
    var rightHitbox = player.x + 50;
    var upHitbox = player.y - 25;
    var downHitbox = player.y + 25;
        if (this.x >= leftHitbox && this.x <= rightHitbox && this.y >= upHitbox && this.y <= downHitbox) {
        player.x = 303;
        player.y = 467;
    }
}


Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    this.sprite = 'images/char-boy.png'
    this.x = 303;
    this.y = 457;
}

Player.prototype.reset = function () {
    if (this.y < 41) {
        this.x = 303;
        this.y = 457;
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.update = function() {
};



Player.prototype.handleInput = function(e) {
    if (e === "left" && this.x >= 101) {
        this.x = this.x  - 101;
    } else if (e === "right" && this.x < 606) {
        this.x = this.x + 101;
    } else if (e === "up" && this.y >= 42) {
        this.y = this.y - 83;
    } else if (e === "down" && this.y < 457) {
        this.y = this.y + 83;
    }

}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var enemy1 = new Enemy(-220, 57);
var enemy2 = new Enemy(-100, 140);
var enemy3 = new Enemy(-150, 223);
var enemy4 = new Enemy(-150, 306);
var allEnemies = [enemy1, enemy2, enemy3, enemy4]// Place all enemy objects in an array called allEnemies
var player = new Player();// Place the player object in a variable called player



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
    player.reset();
});
