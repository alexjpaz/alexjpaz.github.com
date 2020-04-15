---
title: Creating a Snake Game in JavaScript
layout: post-live
category: gamedev
---

<div id='game'></div>

<script>
var ctx;

var tickrate = 200;

var player = {
  dx: 10,
  dy: 0,
  x: 0,
  y: 0,
  size: 1,
};

var food = {
  x: 90,
  y: 90,
};

function ready() {
    var root = document.querySelector('#game');
    var canvas = document.createElement('canvas');
    canvas.style.border = '1px solid';
    canvas.width = 200;
    canvas.height = 200;
    ctx = canvas.getContext('2d');
    root.appendChild(canvas);

    window.onkeydown = function(e) {
        e.preventDefault();
        e.stopPropagation();

        if(e.keyCode === 37 || e.key === "ArrowLeft") {
            player.dx = -10;
            player.dy = 0;
        }

        if(e.keyCode === 39 || e.key === "ArrowRight") {
            player.dx = 10;
            player.dy = 0;
        }

        if(e.keyCode === 38 || e.key === "ArrowUp") {
            player.dx = 0;
            player.dy = -10;
        }

        if(e.keyCode === 40 || e.key === "ArrowDown") {
            player.dx = 0;
            player.dy = 10;
        }
    }

    window.requestAnimationFrame(update);
}

function update() {
    if(player.x === food.x && player.y === food.y) {
        food.x = 40;
        food.y = 40;
    }

    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, 200, 200);

    player.x += player.dx;
    player.y += player.dy;

    ctx.fillStyle = 'green';
    ctx.fillRect(player.x, player.y, 10, 10);

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);

    setTimeout(function() {
        window.requestAnimationFrame(update);
    }, tickrate);
}

ready();

</script>

## Objective

The objective is to create a [snake](https://en.wikipedia.org/wiki/Snake) like game with the following requirements and constraints:

* The player starts at a random safe location on the game board.
* Eating food increases the game rate.
* The game will be written using standard javascript web apis


### Drawing on the canvas

Given that we have a root `<div>` node to work with we will create and attach a child `<canvas>` element to act as our target container for the game.
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

```javascript
var root = document.querySelector('#game');
var canvas = document.createElement('canvas');
canvas.style.border = '1px solid';
canvas.width = 200;
canvas.height = 200;
ctx = canvas.getContext('2d');
root.appendChild(canvas);

ctx.fillStyle = 'green';
ctx.fillRect(player.x, player.y, 10, 10);
```

### The game loop

I decided to make two primary functions for this game `ready` and `update`.

* `ready` - serves as a function to initialize the game and set up event listeners
* `update` - the game loop. Every iteration will update the state of the game and draw the results on the canvas

```
var ctx;

function ready() {
 // setup canvas and initial state;
 var root = document.querySelector('#game');
 var canvas = document.createElement('canvas');
 canvas.style.border = '1px solid';
 canvas.width = 200;
 canvas.height = 200;
 ctx = canvas.getContext('2d');
 root.appendChild(canvas);

 ctx.fillStyle = 'green';
 ctx.fillRect(player.x, player.y, 10, 10);

}

function update() {
 // update state and draw
}

ready();

```

### Drawing the player

Our first iteration will be to draw a representation of the player on the board. To keep things simple we will represent the player as a green 10x10 pixel box.

```
function update() {
    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, 10, 10);
}
```

Since we eventaully would like to be able to move the player on the game board we can create a `player` variable that will hold the current state of where the player is located and the vector (`dx`,`dy`) which will tell us which direction the player is traveling each frame.

```
var player = {
  x: 10,
  y: 10,
  dx: 10,
  dy: 0
};

var tickrate = 200;

function update() {
    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, 10, 10);

    setTimeout(function() {
    window.requestAnimationFrame(update);
    }, tickrate);
}

```

If we were to play the game at this point we might notice green square fly off the screen to the right. We can slow this down by waiting a given amount of time by using `setTimeout` before requesting another frame.

### Receiving Input

Now we want the player to be able to control the green snake friend.

```
function ready() {
    window.onkeydown = function(e) {
        e.preventDefault();
        e.stopPropagation();

        if(e.keyCode === 37 || e.key === "ArrowLeft") {
            player.dx = -10;
            player.dy = 0;
        }

        if(e.keyCode === 39 || e.key === "ArrowRight") {
            player.dx = 10;
            player.dy = 0;
        }

        if(e.keyCode === 38 || e.key === "ArrowUp") {
            player.dx = 0;
            player.dy = -10;
        }

        if(e.keyCode === 40 || e.key === "ArrowDown") {
            player.dx = 0;
            player.dy = 10;
        }
    }
}
```

### Collecting Items

We need an goal for the player to achieve. In this type of game it involves collecting or "eating" some food. 

First we will start by just drawing something to represent the food.

```
var food = {
  x: 90,
  y: 90,
};

function update() {
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, 200, 200);

    player.x += player.dx;
    player.y += player.dy;

    ctx.fillStyle = 'green';
    ctx.fillRect(player.x, player.y, 10, 10);

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);

    setTimeout(function() {
        window.requestAnimationFrame(update);
    }, tickrate);
}

```

Next we should detect when the player occupies the same space to eat the food. We can do this by adding some logic before the drawing functions.

```
var food = {
  x: 90,
  y: 90,
};

function update() {
    if(player.x === food.x && player.y === food.y) {
        food.x = 40;
        food.y = 40;
    }

    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, 200, 200);

    player.x += player.dx;
    player.y += player.dy;

    ctx.fillStyle = 'green';
    ctx.fillRect(player.x, player.y, 10, 10);

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);

    setTimeout(function() {
        window.requestAnimationFrame(update);
    }, tickrate);
}

```



### Resources

https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations
