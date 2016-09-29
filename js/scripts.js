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
        e.classList.add("putX");
        removeFromOpenPositions(currentId);
        playerPositions.push(currentId);
        myTurn=true;
        checkForWin(winningPosition,playerPositions,computerPositions,myTurn);
        if(gameOver==false){
        
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



});