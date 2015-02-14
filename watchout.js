//** Create container for the circle.
var container = d3.select('body').append('svg')
                  .attr('width', 250 + 'px')
                  .attr('height', 250 + 'px');

// ** Create/Update circles
var updateCirclePos = function(circlePos, data){
  var circle = container.selectAll('circle')
      .data(data);
  //** Update circle position.
  circle.transition().duration(500)
      .attr('r', '5')
      .attr('fill', 'red')
      .attr('cx', function(d,i){
        return circlePos[0][i] + 'px';
      })
      .attr('cy', function(d,i){
        return circlePos[1][i] + 'px';
      });

  //** Create circle at random position.
  circle.enter().append('circle')
      .attr('r', '5')
      .attr('fill', 'black')
      .attr('cx', function(d,i){
        return circlePos[0][i] + 'em';
      })
      .attr('cy', function(d,i){
        return circlePos[1][i] + 'em';
      });


};

//** Generate random number for a given max

var randomNum = function(max){
  return (Math.random() * max);
};

// ** Generate the top and left for circle.

var circlePos = function(value){
  var list = [];
  for(var i = 0; i < value; i++){
    list.push(randomNum(240));
  }
  return list;
};
// ** update current score
var currentScore = function(value){

};

// ** Initialize the first set of circles
var circleArray = [];
circleArray.push(circlePos(10));
circleArray.push(circlePos(10));
updateCirclePos(circleArray, Array(10));


//** Generate the next set of circles
setInterval(function(){
  var circleArray = [];
  circleArray.push(circlePos(10));
  circleArray.push(circlePos(10));
  updateCirclePos(circleArray, Array(10));
}, 1500);



