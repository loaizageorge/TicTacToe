$(document).ready(function () {
var openPositions = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var winningPosition = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["1", "4", "7"], ["2", "5", "8"], ["3", "6", "9"], ["1", "5", "9"], ["3", "5", "7"]];
var playerPositions = [];
var computerPositions = [];
var myTurn = true;
var gameOver = false;
$(".square").click(function () {
    //Store id of clicked square to check if is empty,
    //and based on whose turn it is X or Y class is added.
    myTurn = true;
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
        // makePlayerMove
        makeAMove(currentId);
        if (gameOver == false) {
            // Choose random square for computer 
            // check for open spaces, if none left, game resets
            // If there are, computers turn
            if (boardIsFull()) {
                newGame();
            }
            else {
                // computerTurn
               AI();
            }
        }
        gameOver = false;
    }
};

function randomComputerMove() {
    myTurn = false;
    var randomPosition = generateRandomMove();
    var indexOfRandomPosition = openPositions.indexOf(randomPosition);
    makeAMove(randomPosition);
    winHandler(computerPositions);
}

function generateRandomMove() {
    var randomPosition = openPositions[Math.floor(Math.random() * openPositions.length)];
    return randomPosition;
}

function makeAMove(id) {
    var e = document.getElementById(id);
    var checkArray;
    // If my(player)Turn is true, push to playerPositions and add X to the id
    if (myTurn) {
        playerPositions.push(id);
        checkArray = playerPositions.slice(0);
        e.classList.add("putX");
    }
    else {
        computerPositions.push(id);
        checkArray = playerPositions.slice(0);
        e.classList.add("putO");
    }
    removeFromOpenPositions(id);
    winHandler(checkArray,false);
}

function winHandler(checkArray,test){
    //
    if(checkForWin(checkArray)){
        if(!test){
            checkWhoWon(); 
        }else{
            return true;
        }
    }
}    
    
function checkWhoWon(){
    if (myTurn) {
        $("#winner").html("You Win!");
        newGame();
        gameOver = true;
    }
    else {
        $("#winner").html("Computer Wins!");
        newGame();
        gameOver = true;
    }
}    
    
function checkForWin(checkArray) {
    for (var j = 0; j < winningPosition.length; j++) {
       if(arrayContainsAnotherArray(winningPosition[j], checkArray)){
           return true;
       }
    }
};

function arrayContainsAnotherArray(needle, haystack) {
    for (var i = 0; i < needle.length; i++) {
        if (haystack.indexOf(needle[i]) === -1) {
            return false;
        }
    }
    return true;
};

function removeFromOpenPositions(positionId) {
    var index = openPositions.indexOf(positionId);
    openPositions.splice(index, 1);
};

function newGame() {
    setTimeout(function () {
        resetBoard();
    }, 1000);
};

function resetBoard() {
    openPositions = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    playerPositions = [];
    computerPositions = [];
    for (var i = 1; i < 10; i++) {
        var e = document.getElementById(i);
        if (e.classList.contains("putX")) {
            e.classList.remove("putX");
        }
        else {
            e.classList.remove("putO");
        }
        $("#winner").html("");
    }
};

function boardIsFull() {
    if (openPositions == 0) {
        return true;
    }
    return false;
};

function AI(){
    myTurn = false;
    evaluate(computerPositions,true);
}    
    
function evaluate(array,compTurn) {
  var possibleMoves = openPositions.slice(0);
  var moveFound = false;
  while (possibleMoves != 0) {
    var moveToTest = [];
    moveToTest = array.slice(0);
    var randomPosition = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    var indexOfRandomPosition = possibleMoves.indexOf(randomPosition);
    moveToTest.push(randomPosition);
    possibleMoves.splice(indexOfRandomPosition, 1);

    if (winHandler(moveToTest,true)) {
      // break loop and make Move  
      moveFound = true;
      break;
    }
  }
  if (moveFound) {
    // make that move, will be either winning move or block
    makeAMove(randomPosition);
    winHandler(computerPositions,false);  
  } else if (!moveFound && !compTurn) {
    // make random move, only if no win or block found
      makeAMove(randomPosition);
  } else if (!moveFound) {
      // Check for opponent win
    evaluate(playerPositions, false);
  }
}  

});