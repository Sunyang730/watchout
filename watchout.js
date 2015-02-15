// ** Object that contains all settings
var settings = {
  m: 600, //max size
  h: 600, //height
  w: 600, //width
  r: 10, //radius
  ec: 'red', //enemy color
  pc: 'black', //Player Color
  n: 10, //number of enemy.
  d: 100 //duration
};

var collisionCounter = 0;
var currentScore = 0;
var highScore = 0;


// ** create random x and random y and pixelate them

var playerLoc = {x: settings.h/2, y: settings.w/2};
var randomNum = function(){ return (Math.random() * settings.m );};
var pixelate = function(num){ return num + 'px';};
var randomX = function(){ return pixelate(randomNum() + settings.r);};
var randomY = function(){ return pixelate(randomNum() + settings.r);};

// ** Drag

var drag = d3.behavior.drag().on('drag', function(){
  var loc = d3.mouse(this);
  playerLoc.x = loc[0];
  playerLoc.y = loc[1];
  playerNode.attr('cx', loc[0])
    .attr('cy', loc[1]);
});

// ** container
var container = d3.select('body').append('svg')
  .style('background-color', '#ecf0f1')
  .attr('class', 'container')
  .attr('width', pixelate(settings.w))
  .attr('height', pixelate(settings.h));

// ** Player
var playerNode = container.append('circle')
  .attr('class', 'playerNode')
  .attr('r', settings.r)
  .attr('fill', settings.pc)
  .attr('cx', pixelate(playerLoc.x))
  .attr('cy', pixelate(playerLoc.y))
  .call(drag);

// ** Enemy
var enemyNode = container.selectAll('.enemyNode')
  .data(d3.range(settings.n))
  .enter().append('circle')
  .attr('class', 'enemyNode')
  .attr('stroke', '#bdc3c7')
  .attr('stroke-width', '5')
  .attr('r', settings.r)
  .attr('fill', settings.ec)
  .attr('cx', randomX)
  .attr('cy', randomY);

var setHighScore = function(){
  highScore = Math.max(currentScore, highScore);
  currentScore = 0;
};

// ** new position of the enemy nodes
var relocate = function(nodes){
  nodes.transition().duration(1500)
    .attr('cx', randomX)
    .attr('cy', randomY)
    .each('end', function(){
      relocate(enemyNode);
    })
};

relocate(enemyNode);

// ** Collision Detection
var detectCollision = function(){
  var collision = false;

  enemyNode.each(function(){
    var enemyX = parseInt(d3.select(this).attr('cx').slice(0, -2)) + settings.r;
    var enemyY = parseInt(d3.select(this).attr('cy').slice(0, -2)) + settings.r;
    var x = enemyX - playerLoc.x;
    var y = enemyY - playerLoc.y;
    // ** a^2 + b^2 = c^2
    if(Math.sqrt(x*x + y*y) < settings.r * 2) {
      collision = true;
      setHighScore()
    }
  });
  if(collision){
    collisionCounter += 1;
  }
};

d3.timer(detectCollision);

// ** update the text.
setInterval(function(){
  currentScore += 1;
  d3.select('.collisions').select('span').text(collisionCounter);
  d3.select('.high').select('span').text(highScore);
  d3.select('.current').select('span').text(currentScore);
}, settings.d)

