$(document).ready(function () {
    var openPositions = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    $(".square").click(function () {
        console.log("OPEN POSITION CHECK"+openPositions);
        //Store id of clicked square to check if is empty,
        //and based on whose turn it is X or Y class is added.
        var currentId = $(this).attr('id');
        playerTurn(currentId);
    });
    
//FUNCTIONS    
    
function playerTurn(currentId) {
    var e = document.getElementById(currentId);
    if ((e.classList.contains("putX")) || (e.classList.contains("putO"))) {
        return false;
    }
    else {
        e.classList.add("putX");
        removeFromOpenPositions(currentId);
        var randomPosition = openPositions[Math.floor(Math.random()*openPositions.length)];
        var randomIndex= openPositions.indexOf(randomPosition);
        console.log("Random Position" + randomPosition);
        computerTurn(openPositions[randomIndex]);
    }
};

function computerTurn(gridPosition) {
    var e = document.getElementById(gridPosition);
    e.classList.add("putO");
    removeFromOpenPositions(gridPosition);
};
    
function removeFromOpenPositions(positionId){
  var index = openPositions.indexOf(positionId);
  console.log("Original Array"+openPositions);    
  console.log("Position to be removed"+positionId);       
  console.log("index"+index);    
  openPositions.splice(index,1);
  console.log("Updated Array"+openPositions);    
     
};    



});

