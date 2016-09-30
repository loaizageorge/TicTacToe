$(document).ready(function () {
    var openPositions = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var winningPosition = [["1","2","3"],["4","5","6"],["7","8","9"],["1","4","7"],["2","5","8"],["3","6","9"],["1","5","9"],["3","5","7"]];
    var playerPositions=[];
    var computerPositions=[];
    var myTurn=true;
    var gameOver=false;
    
    $(".square").click(function () {
        
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
        // makePlayerMove
        makePlayerMove(e,currentId);
        if(gameOver==false){
            
        // Choose random square for computer 
        //console.log(openPositions);    
        
        var randomPosition = openPositions[Math.floor(Math.random()*openPositions.length)];
        
        if(randomPosition==undefined){
            newGame();   
        }
        else{
        var randomIndex= openPositions.indexOf(randomPosition);
        computerPositions.push(openPositions[randomIndex]);     
        computerTurn(openPositions[randomIndex]);
        }
        
       
    }
       gameOver=false; 
    }
    
};
    
function makePlayerMove(e,id){
        e.classList.add("putX");
        removeFromOpenPositions(id);
        playerPositions.push(id);
        myTurn=true;
        checkForWin(winningPosition,playerPositions,computerPositions,myTurn);
    
}    

function checkForWin(winningPosition,playerPositions,computerPositions,myTurn){
    var checkArray=[];
    
    if(myTurn){
        checkArray=playerPositions; 
       
        
    }else{
        checkArray=computerPositions;  
        
    }
    
    for(var j=0;j<winningPosition.length;j++){
        arrayContainsAnotherArray(winningPosition[j],checkArray);
    }
    
};    
    
function arrayContainsAnotherArray(needle, haystack){
  for(var i = 0; i < needle.length; i++){
    if(haystack.indexOf(needle[i]) === -1){
        
       return false;
    }
  }
    if(myTurn){
         $("#gameStatus").html("You Win!");
        newGame();
        gameOver=true;
    }else{
         $("#gameStatus").html("Computer Wins!");
        newGame();
        gameOver=true;
    }
};
    

function computerTurn(gridPosition) {
    var e = document.getElementById(gridPosition);
    e.classList.add("putO");
    myTurn=false;
    checkForWin(winningPosition,playerPositions,computerPositions,myTurn);
   
    removeFromOpenPositions(gridPosition);
    
};
    
function removeFromOpenPositions(positionId){
  var index = openPositions.indexOf(positionId);
  openPositions.splice(index,1);   
     
};

function GridIsFull(){
    if(openPositions.length==0){
        return true;
    }else{
        return false;
    }
};   

function newGame(){
            
    
    setTimeout(function() {
        resetBoard();
    }, 1000);
};

function resetBoard(){
    
    openPositions = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    playerPositions=[];
    computerPositions=[];
   
    for(var i=1; i<10; i++){
        var e = document.getElementById(i);
        if(e.classList.contains("putX")){
            e.classList.remove("putX");
        }
        else{
            e.classList.remove("putO");
        }
         $("#gameStatus").html("");
    }
  
};

function AI(){
    // Copy array of openPositions so as to not alter the original while testing it
    var possibleMoves = openPositions;
    // Randomly pick an open square from array of possible moves, remove it from the array, and add it to a copy of currentPositions array
    // Test this array for a winning play
    while(possibleMoves.length!=0){
        var testMove = computerPositions;
        var randomPosition = possibleMoves[Math.floor(Math.random()*openPositions.length)];
        var randomIndex= possibleMoves.indexOf(randomPosition);
        testMove.push(openPositions[randomIndex]);
        possibleMoves.splice(randomIndex,1);
        console.log(testForWin);
        
        
    }
};
    
function testForWin(arrayToTest){
    
    for(var j=0;j<winningPosition.length;j++){
        winLogic(winningPosition[j],arrayToTest);
        
        for(var i = 0; i<winningPosition[j].length; i++){
            if(arrayToTest.indexOf(winningPosition[j][i]) === -1){
                return false;
            } else{
                return true;
            }
        }
    }
    
};

function winLogic(needle, haystack){
  for(var i = 0; i < needle.length; i++){
    if(haystack.indexOf(needle[i]) === -1){
        
       return false;
    } else{
        //save winning move
        return true;
    }
  }
   
};    



});