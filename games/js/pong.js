var dataRef = firebase.database().ref("Games/Pong");
var key = dataRef.push().key;
dataRef = dataRef.child(key);

var output = document.getElementById("canvas");

var screen = [];
screen[0] = [];

function initGame() {
  dataRef.push({
    p1: 0,
    p2: 0,
    pa1: 0,
    pa2: 0,
    dir: 45,
    xPos: 0,
    yPos: 0
  });
  
  for (var i = 0; i < output.rows; i++) {
    for (var j = 0; j < output.cols; j++) {
      screen[i][j] = " ";
      if (i == 2 || i == output.rows-2)
        screen[i][j] = "=";
      if (((i + 4 >= (output.rows / 2)) && (i - 4 <= (output.rows / 2)) && ((j == 3) || (j == output.cols-3)))
        screen[i][j] = "|";
      if ((i == Math.floor(output.rows/2)) && (j == Math.floor(output.cols/2)))
        screen[i][j] = "@";
    }
  }
  render();
}

function render() {
  var outputString = "";
  for (var i = 0; i < output.rows; i++) {
    for (var j = 0; j < output.cols; j++) {
      outputString += screen[i][j];
    }
  }
  output.value = outputString;
}
