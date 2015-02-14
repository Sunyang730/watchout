var height = 250;
var width = 250;
var collisions = 0;
var circleArray = [];
var score = 0;
var currentScore = 0;



//** Create container for the circle.
var container = d3.select('body').append('svg')
  .attr('class', 'container')
  .attr('width', width + 'px')
  .attr('height', height + 'px');

// ** drag class constructor
var drag = d3.behavior.drag()
  .origin(function(d){return d;})
  .on("drag", function(d){ return dragged(d);});


// ** Player node
var playerNode = container.selectAll('.playerNode')
  .data([{x: 100, y:100}])
  .enter()
  .append('circle')
  .attr('class', 'playerNode')
  .attr('r', '5')
  .attr('fill', 'black')
  .attr('cx', function(d){ return d.x;})
  .attr('cy', function(d){ return d.y;})
  .call(drag);


// ** Create/Update circles
var updateCirclePos = function(circlePos, data){
  var circle = container.selectAll('.enemyNode')
      .data(data);
  //** Update circle position.
  circle.transition().duration(1000)
      .attr('class', 'enemyNode')
      .attr('r', '5')
      .attr('fill', 'red')
      .attr('cx', function(d,i){
        return (circlePos[0][i]);
      })
      .attr('cy', function(d,i){
        return (circlePos[1][i]);
      });

  //** Create circle at random position.
  circle.enter().append('circle')
      .attr('class', 'enemyNode')
      .attr('r', '5')
      .attr('fill', 'red')
      .attr('cx', function(d,i){
        return (circlePos[0][i]);
      })
      .attr('cy', function(d,i){
        return (circlePos[1][i]);
      });


};
// ** Generate scores

var updateScore = function(score){
  d3.select('.current').select('span').text(score+1);
  return score+1;
};

//** Generate random number for a given max

var randomNum = function(max){
  return (Math.random() * max);
};

// ** Generate the top and left for circle.

var circlePos = function(value){
  var list = [];
  for(var i = 0; i < value; i++){
    list.push(randomNum(200));
  }
  return list;
};

// ** Collision detection

var collision = function(collisions){
  var edx = 0;
  var edy = 0;

  container.selectAll('.enemyNode').each(function(d){
    if(currentScore < score){
      currentScore = score;
    }
    if(Math.abs(d3.select(this).attr('cx') - playerNode.attr('cx')) <10 && Math.abs(d3.select(this).attr('cy') - playerNode.attr('cy'))<10){
      d3.select('.collisions').select('span').text(collisions);
      d3.select('.high').select('span').text(currentScore);
      score =0;
      d3.select('.current').select('span').text(score);

    }

  });

  return collisions+1;

};
//** drag fn for playerNode also check for collision if cx and cy match
var dragged = function(d){
  playerNode.attr('cx', d3.event.x)
    .attr('cy', d3.event.y);
};

// ** time to detect collision
setInterval(function(){
  collisions += collision(collisions);
}, 1000);

// ** Initialize the first set of circles
circleArray.push(circlePos(10));
circleArray.push(circlePos(10));
updateCirclePos(circleArray, Array(10));




//** Generate the next set of circles
setInterval(function(){
  var circleArray = [];
  circleArray.push(circlePos(10));
  circleArray.push(circlePos(10));
  updateCirclePos(circleArray, Array(10));
  score = updateScore(score);
}, 1500);



