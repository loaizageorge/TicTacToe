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
            //console.log(openPositions);
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
    var randomIndex = openPositions.indexOf(randomPosition);
    makeAMove(randomPosition);
    checkForWin(computerPositions);
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
    checkForWin(checkArray);
}

function checkForWin(checkArray) {
    for (var j = 0; j < winningPosition.length; j++) {
        arrayContainsAnotherArray(winningPosition[j], checkArray);
    }
};

function arrayContainsAnotherArray(needle, haystack) {
    for (var i = 0; i < needle.length; i++) {
        if (haystack.indexOf(needle[i]) === -1) {
            return false;
        }
    }
    if (myTurn) {
        $("#gameStatus").html("You Win!");
        newGame();
        gameOver = true;
    }
    else {
        $("#gameStatus").html("Computer Wins!");
        newGame();
        gameOver = true;
    }
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
        $("#gameStatus").html("");
    }
};

function boardIsFull() {
    if (openPositions == 0) {
        return true;
    }
    return false;
};

    
function AI() {

    // Copy array of openPositions so as to not alter the original 
    //while testing it
    var possibleMoves = openPositions.slice(0);
    myTurn = false;
    var foundMove = false;
    // Randomly pick an open square from array of possible moves, remove it from the array, and add it to a copy of currentPositions array
    // Test this array for a winning play
    while(possibleMoves!=0){
        
        var testMove = computerPositions.slice(0);
        
        // Use position to push to array, and index to remove from array
        var randomPosition = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        var randomIndex = possibleMoves.indexOf(randomPosition);
        testMove.push(randomPosition);
        possibleMoves.splice(randomIndex,1);
        if(checkForWins(testMove,randomPosition)){
        	// break loop and make Move  
          alert("Found em!");    
          makeAMove(randomPosition);
          foundMove = true;
          break;
        }        
   }
   if(!foundMove){
       
   	   makeAMove(randomPosition);
   }
     
};

function checkForWins(testMove,randomPosition){
    
  	
    for(var j=0;j<winningPosition.length;j++){
        if(arrayContainsAnotherArrays(winningPosition[j],testMove)){
      //  console.log("Winning move: "+randomPosition);
        return true;
        }
        
    }
    
};    

function arrayContainsAnotherArrays(needle, haystack){
  for(var i = 0; i < needle.length; i++){
    if(haystack.indexOf(needle[i]) === -1){
     //   console.log("false");
       return false;
    } 
  }
  //console.log(randomPosition);
 // console.log("true");
  // console.log(randomPosition);
  return true;
};   

/*var openPositions = ["2","3", "6", "8", "9"];
var winningPosition = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
    ["1", "5", "9"],
    ["3", "5", "7"]
];

var computerPositions = ["4","5","7"];

AI();

function AI() {

    // Copy array of openPositions so as to not alter the original 
    //while testing it
    var possibleMoves = openPositions;
    // Randomly pick an open square from array of possible moves, remove it from the array, and add it to a copy of currentPositions array
    // Test this array for a winning play
    while(possibleMoves!=0){

        var testMove = computerPositions.slice(0);
        var randomPosition = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        var randomIndex = possibleMoves.indexOf(randomPosition);
        testMove.push(possibleMoves[randomIndex]);
        possibleMoves.splice(randomIndex,1);
        checkForWin(testMove,randomPosition);
       // console.log(testMove);

   }   

};

function checkForWin(testMove,randomPosition){


    for(var j=0;j<winningPosition.length;j++){
        if(arrayContainsAnotherArray(winningPosition[j],testMove,randomPosition)){
        console.log("Winning move: "+randomPosition);
        console.log(true);
        }
        console.log(false);
    }

};    

function arrayContainsAnotherArray(needle, haystack,randomPosition){
  for(var i = 0; i < needle.length; i++){
    if(haystack.indexOf(needle[i]) === -1){
     //   console.log("false");
       return false;
    } 
  }
  //console.log(randomPosition);
 // console.log("true");
  // console.log(randomPosition);
  return true;
};
*/
});