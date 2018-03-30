$(document).ready(function(){

  $("#reset").hide();

   var sequence = [];
   var player = [];
   var moveCount = 1;
   var round = 0;
   var active = false;
   var strict = false;
   var k = 1;
   var tone1 = $("#greenSound")[0];
   var tone2 = $("#redSound")[0];
   var tone3 = $("#yellowSound")[0];
   var tone4 = $("#blueSound")[0];

   $("#start").on("click", function(){
      getMoves();
      startRound();
      active = true;
      $("#start").hide();
      $("#reset").show();
   });

   function getMoves(){
     sequence = [];
     round = 0;
     while (sequence.length < 20) {
         var temp = Math.ceil(Math.random() * 4);
         sequence.push(temp);
      }
      //console.log(sequence);
   }
   function startRound() {
      round++;
      if (round === 21){
        $("#score").html("<h3>WIN</h3>");
        setTimeout(function(){
          if (strict == true){
            $("#strict").toggleClass("btn-default , btn-danger");
            strict = false;
          }
          getMoves();
          startRound();

        }, 3000);
      }else {
      moveCount = 1;
      $("#score").html("<h1>" + round + "</h1>");
      playRound();
      //console.log("new round");
    }
   }
   function playRound(){
      setTimeout(function(){
       if (sequence[k-1] ===1){
        $("#green").toggleClass("brighten");
        tone1.currentTime = 0;
        tone1.play();
        setTimeout(function(){$("#green").toggleClass("brighten");}, 250);
      } else if (sequence[k-1] ===2){
        $("#red").toggleClass("brighten");
        tone2.currentTime = 0;
        tone2.play();
        setTimeout(function(){$("#red").toggleClass("brighten");}, 250);
      } else if (sequence[k-1] ===3){
          $("#yellow").toggleClass("brighten");
          tone3.currentTime = 0;
          tone3.play();
          setTimeout(function(){$("#yellow").toggleClass("brighten");}, 250);
       } else if (sequence[k-1] ===4){
          $("#blue").toggleClass("brighten");
          tone4.currentTime = 0;
          tone4.play();
          setTimeout(function(){$("#blue").toggleClass("brighten");}, 250);
    }
    if (k < round){
        k++;
        tone1.pause();
        tone2.pause();
        tone3.pause();
        tone4.pause();
        playRound();
    }else{
        k=0;
    }
}, 700);
   };

   function checkMove(move){
      if (active === true){
          if (move === sequence[moveCount-1]){
            if (moveCount == round){
                startRound();
              }else{
                moveCount ++;
              }
            }else if (strict == true){
              getMoves();
              startRound();
              $("#score").html("<h1>!!</h1>");
              setTimeout(function(){$("#score").html("<h1>" + round + "</h1>");},1000);
            }else{
              moveCount = 1;
              playRound();
              $("#score").html("<h1>!!</h1>");
              setTimeout(function(){$("#score").html("<h1>" + round + "</h1>");},1000);
            }
      }
  }

    $("#strict").on("click", function(){
      if (strict == false){
        strict = true;
        $("#strict").toggleClass("btn-default , btn-danger");
      }
    })

  $("#green").on("click", function(){
     player.push(1);
     checkMove(1);
     tone1.currentTime = 0;
     tone1.play();
  });
  $("#red").on("click", function(){
     player.push(2);
     checkMove(2);
     tone2.currentTime = 0;
     tone2.play();
  });
  $("#yellow").on("click", function(){
     player.push(3);
     checkMove(3);
     tone3.currentTime = 0;
     tone3.play();
  });
  $("#blue").on("click", function(){
     player.push(4);
     checkMove(4);
     tone4.currentTime = 0;
     tone4.play();
  });

  $("#reset").on("click" , function(){
    if (strict == true){
      $("#strict").toggleClass("btn-default , btn-danger");
      strict = false;
    }
    getMoves();
    startRound();

  });

});
