// Global vairables to set the movement intervals. 
// These could change if the size of the canvas changes
// TODO: investigate what the zoom level of the browser
// means to these values.
const X_MOVE = 100;
const Y_MOVE = 80;
// showMessage displays a temporary message to the user.
// Pass in the message and HTML compatible color name.
function showMessage(message,color) {
    var randNum = Math.floor(Math.random() * 1000) + 1;  
    $('body').append('<div id="message-area' + randNum + 
        '" style="font-size:1.5em; color: ' + color + 
        '">' + message + '</div>');
    $('#message-area' + randNum).fadeOut(3000, function() { 
        this.remove();
    });
}

// Reset Game sets the Wins/Losses to 0 
// and resets the players position
function resetGame() {
    player.reset();
    $('#wins').html(0);
    $('#losses').html(0);
    showMessage('Game Reset!','green');
}

// Update score updates the Wins or Losses tally
function updateScore(winOrLose) {
    if (winOrLose == 'win') {
        var currentWins = parseInt($('#wins').html());
        $('#wins').html(++currentWins);
    }
    else if (winOrLose == 'lose')
    {
        var currentLosses = parseInt($('#losses').text());
        $('#losses').html(++currentLosses);
    }
}
// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.direction = 'right';
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= 500 && this.direction == 'right') {
        this.x += this.speed * dt;
    }
    else {
        this.direction = 'left';
    }
    if (this.x >= 0 && this.direction == 'left') {
        this.x -= this.speed * dt;
    }
    else {
        this.direction = 'right';
    }
    this.checkCollision();
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    // Depending on this.direction, the enemy image will flip 
    // horizontally.
    // Credit: https://stackoverflow.com/questions/8168217/html-canvas-how-to-draw-a-flipped-mirrored-image
    // Note: although you can redraw an image without a 
    // save and restore, it seems to kill performance in 
    // the browser.  save/restore are necessary!
    if (this.direction == 'left') {
        ctx.save();
        ctx.scale(-1,1);
        ctx.drawImage(Resources.get(this.sprite), this.x*-1, this.y);
        ctx.restore();
    }
    else
    {
        ctx.save();
        ctx.scale(1,1);
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        ctx.restore();    
    }
    
}; 
Enemy.prototype.checkCollision = function() {
    //Check to see if the Enemy position is the same as the player position
    //TODO: tweak this more so that the xRange and yRange change
    // Depending on whether the enemy is moving left or right
    // because the mouth is what CHOMPS a player
    var xRange = [this.x - 30, this.x + 20];
    var yRange = [this.y - 30, this.y + 20];
    if (player.x >= xRange[0] && player.x < xRange[1] && player.y >= yRange[0] && player.y < yRange[1]) {
        showMessage('CHOMP!','red');
        updateScore('lose');
        player.reset();
    }
};


// Now write your own player class
var Player = function(x,y,playerType) {
    // TODO: Some of these images don't seem to render in canvas.. but this is how they came from the starter code,
    // so I think the images are just not compatible and must be replaced or re-saved in a compatible format.  For example,
    // char-cat-girl.png will not load.
    this.x = x;
    this.y = y;
    switch (playerType) {
        case 'boy':
            this.sprite = 'images/char-boy.png';
        break;
        case 'cat-girl':
            this.sprite = 'images/char-cat-girl.png';
        break;
        case 'horn-girl':
            this.sprite = 'images/char-horn-girl.png';
        break;
        case 'pink-girl':
            this.sprite = 'images/char-pink-girl.png';
        break;
        case 'princess-girl':
            this.sprite = 'images/char-princess-girl.png';
        break;
        default:
            this.sprite = 'images/char-boy.png';
        break;
    }
};
// This class requires an update(), render() and
Player.prototype.update = function() {

};
// Player render() function required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// a handleInput() method.
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'up':
            if (this.y - Y_MOVE <= -50) {
                showMessage('Can\'t move further up!', 'orange');
            }
            else
            {
                this.y -= Y_MOVE;
                if (this.y < 40) {
                    showMessage('WINNER!!!!!!!!! (reset game in 3 seconds)','green');
                    updateScore('win');
                    setTimeout(function() {
                        this.reset();
                    }.bind(this), 3000);
                }
            }
        break;
        case 'down':
            if (this.y + Y_MOVE >= 450) {
                showMessage('Can\'t move further down!', 'orange');
            }
            else
            {
                this.y += Y_MOVE;
            }
        break;
        case 'left':
            if (this.x - X_MOVE <= -1) {
                showMessage('Can\'t move further left!', 'orange');
            }
            else
            {
                this.x -= X_MOVE;
            }
        break;
        case 'right':
            if (this.x + X_MOVE >= 500) {
                showMessage('Can\'t move further right!', 'orange');
            }
            else
            {
                this.x += X_MOVE;
            }
        break;
        default:
            console.log('invalid key pressed');
        break;
    }
};
// Reset method places the player back in the starting position.
Player.prototype.reset = function() {
    this.x = 300;
    this.y = 300;
};

// Now instantiate your objects.
var enemy1 = new Enemy(100,60,50);
var enemy2 = new Enemy(200,140,150);
var enemy3 = new Enemy(300,230,75);
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1,enemy2,enemy3];
// Place the player object in a variable called player
var player = new Player(300,300,'boy');

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
