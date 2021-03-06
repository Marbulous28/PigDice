// UI logic
$(document).ready(function() {



  var total = 0;
  var turnCount = 2;
  var player = null;
  var npc = null;


  //roll the dice
  $('form#diceRoll').submit(function(event){
    event.preventDefault();

    $('.bust').hide();
    var dice = parseInt(rng(1,6).toPrecision(1));
    total = total + dice;
    $("#display-number").text(dice);
    if (dice == 1){
      total = 0;
      turnCount++;
      $('.bust').show();
      $('#hideme1').toggle();
      $('#hideme2').toggle();
    }
    $('#floatDisplay').text(total);
    if (turnCount % 2 == 0 && player == null){
      player = new Scores(total);
    } else if (turnCount % 2 != 0 && npc == null){
      npc = new Scores(total);
    }
    if (turnCount % 2 == 0 && player != null){
      player.playerFloat = total;
    } else if (turnCount % 2 != 0 && npc != null){
      npc.playerFloat = total;
    }
  });

  $('form#stay').submit(function(event){
    event.preventDefault();

    if (turnCount % 2 == 0){
      player.playerTotal += player.addScores();
      $("#display-score-player").text(player.playerTotal);
      if (player.playerTotal >= 50){
        $('#winspan').text('Player 1');
        $('#winner').show();
        $('#hideme1').hide();
        $('#hideme2').hide();
        var answer = newGame();
        console.log(answer);
        if (answer == true){
          document.location.reload(true);
        }
      }
    } else {
      npc.playerTotal += npc.addScores();
      $("#display-score-npc").text(npc.playerTotal);
      if (npc.playerTotal >= 50){
        $('#winspan').text('NPC');
        $('#winner').show();
        $('#hideme1').hide();
        $('#hideme2').hide();
        var answer = newGame();
        if (answer == true){
          document.location.reload(true);
        }
      }
    }
    turnCount++
    total = 0;
    $('#hideme1').toggle();
    $('#hideme2').toggle();
    $('#floatDisplay').text('');
    $("#display-number").text('Roll');
  });
});



// Buissness logic
function Scores(floatingScore){
  this.playerFloat = floatingScore;
  this.playerTotal = 0;
}
Scores.prototype.addScores = function() {
  var newTotal = this.playerFloat;
  return newTotal;
}
function rng(min,max) {
  return Math.random() * (max-min) + min;
}
function newGame(){
  var gameReset = confirm('Would you like to play again?');
  return gameReset;
}
