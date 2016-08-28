$(document).ready(function(){
    var playersTurn = true;
    
   $(".square").click(function(){
       //Store id of clicked square to check if is empty,
       //and based on whose turn it is X or Y class is added.
      var currentId = $(this).attr('id');
       console.log(document.getElementById("r1c1"));
      
      var e = document.getElementById(currentId);
       console.log(e);
       if((e.classList.contains("putX"))||(e.classList.contains("putO"))){
           return false;
           
       }else{
           if(playersTurn==true){
                e.classList.add("putX");
               playersTurn=false;
           } else{
               e.classList.add("putO");
               playersTurn=true;
           }
       }
      // e.classList.contains("putX");
       
      // alert(e.classList.contains("putX"));
      // currentId.className +="putX";
      //$("#currentId").addClass("putX");
      
   }); 

    

   
});



