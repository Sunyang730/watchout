// start slingin' some d3 here.
//*** create a general circle with D3
//

var container = d3.select('body').append('div')
    .attr('class', 'container')

//** Fn that creates circle in the container
//** Each circle should take a different x and y
//** After each update the circle will transform to
//   another position
//
var updateCirclePos = function(circlePos, data){
  var circle = container.selectAll('span')
      .data(data);
  //** Update circle position.
  circle.transition().duration(500)
      .style('top', function(d,i){
        return circlePos[0][i] + 'px';
      })
      .style('left', function(d,i){
        return circlePos[1][i] + 'px';
      });

  //** Create circle at random position.
  circle.enter().append('span')
      .attr('class', 'circle')
      .style('top', function(d,i){
        return circlePos[0][i] + 'px';
      })
      .style('left', function(d,i){
        return circlePos[1][i] + 'px';
      });



      //data will be the x and y position generate by
      //the fn.

};

//** Generate random number for a given max

var randomNum = function(max){
  return (Math.random() * max);
};

// ** Generate the top and left for circle.

var circlePos = function(value){
  var list = [];
  for(var i = 0; i < value; i++){
    list.push(randomNum(190));
  }
  return list;
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



