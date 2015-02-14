var height = 250;
var width = 250;



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
        return (circlePos[0][i]) + 'px';
      })
      .attr('cy', function(d,i){
        return (circlePos[1][i]) + 'px';
      });

  //** Create circle at random position.
  circle.enter().append('circle')
      .attr('class', 'enemyNode')
      .attr('r', '5')
      .attr('fill', 'red')
      .attr('cx', function(d,i){
        return (circlePos[0][i]) + 'px';
      })
      .attr('cy', function(d,i){
        return (circlePos[1][i]) + 'px';
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

//** drag fn for playerNode
var dragged = function(d){
  playerNode.attr('cx', d3.event.x)
    .attr('cy', d3.event.y);

};

// ** Initialize the first set of circles
var circleArray = [];
var score = 0;
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



