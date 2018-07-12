// constructor function that's going to create the instances of enemies
var Enemy = function(y) {
    this.x = Math.floor(Math.random() * -1) - 500; //starting position on the X-axis
    this.y = y; //starting position on the Y-axis
    this.speed = Math.floor(Math.random() * 201) + difficultySpeed; // rng to differentiate the speed between different enemies 
    this.image = 'images/enemy-bug.png'; //the image asset of the enemy
};

//update method that animates the movement of enemies and resets them to the start
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt 

//if enemy's position on X-axis exceeds the border of the canvas, it is set back to the starting position
    if (this.x > 707) {
        this.x = Math.floor(Math.random() * -1) - 500;
        this.speed = Math.floor(Math.random() * 201) + difficultySpeed; //rng to diffentiate the speed of the resetted enemy
    }
};

//checks collision of player and enemy
Enemy.prototype.collision= function() {
    //setting the player's hitbox that is 100px wide and 50px tall
    var leftHitbox = player.x - 50; 
    var rightHitbox = player.x + 50;
    var upHitbox = player.y - 25;
    var downHitbox = player.y + 25;
    //checks to see if the enemy is inside the player's hitbox
        if (this.x >= leftHitbox && this.x <= rightHitbox && this.y >= upHitbox && this.y <= downHitbox) {
        player.reset(); //reset's the location of the player at the starting point
        life1.loseOne();
    }
}

//draws the enemy
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.image), this.x, this.y);
};

// constructor function that's going to create the instance of player
var Player = function() {
    this.x = 303; //starting position on the X-axis
    this.y = 457; //starting position on the Y-axis
    this.image = 'images/char-boy.png' //the image asset of the player
    this.heart = 'images/Heart.png';
}

var Life = function(xPosition) {
    this.heart = 'images/Heart.png';
    this.xPosition = xPosition;
}

Life.prototype.lifesRender = function() {
    ctx.drawImage(Resources.get(this.heart), this.xPosition, -5, 40, 65);
}

Life.prototype.loseOne = function() {
    let lifesCounter = allLifes.length - 1;
    allLifes.splice(lifesCounter, 1);
}

//method that resets the player's position back to the starting point
Player.prototype.reset = function () {
    this.x = 303;
    this.y = 457;
}

//checks to see if player made it to the water, and reset's him
Player.prototype.win = function () {
    if (this.y < 41) {
        this.reset();
        this.level();
    }
}

//draws the player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.image), this.x, this.y);
}

Player.prototype.level = function() {
    currentLevel += 1;
    difficultySpeed += 25;
}



//checks to which arrow key is the user pressing
//moves the player one block to the corresponding direction of the arrow
//prevent player from moving outside the border
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

var difficultySpeed = 100; //initial speed of the enemies

var currentLevel = 1; //inital level of the player

//creating 8 instances of the Enemy class
var enemy1 = new Enemy(57);
var enemy2 = new Enemy(140);
var enemy3 = new Enemy(223);
var enemy4 = new Enemy(306);
var enemy5 = new Enemy(57);
var enemy6 = new Enemy(140);
var enemy7 = new Enemy(223);
var enemy8 = new Enemy(306);


//putting all enemies in an array that's going to be looped through
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8];


//creating new instance of Player class
var player = new Player();

var life1 = new Life(595);
var life2 = new Life(632);
var life3 = new Life(669);

var allLifes = [life1, life2, life3];



//checks to see if the key that was pressed was an arrow key
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
