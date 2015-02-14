var height = 250;
var width = 250;



//** Create container for the circle.
var container = d3.select('body').append('svg')
                  .attr('width', width + 'px')
                  .attr('height', height + 'px');

// ** Player node
var playerNode = d3.select('svg').append('circle')
                .attr('class', 'playerNode')
                .attr('r', '5')
                .attr('fill', 'black')
                .attr('cx', 100)
                .attr('cy', 100);

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

// playerNode.on('drag', function(){
//   var mousePos = d3.mouse(this);
//   console.log(mousePos);
// });

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



