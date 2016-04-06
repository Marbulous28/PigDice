// UI logic
$(document).ready(function() {


  var total = 0;
  var turnCount = 2;
  var player = null;
  var npc = null;

  //roll the dice
  $('form#diceRoll').submit(function(event){
    event.preventDefault();
    var dice = parseInt(rng(1,6).toPrecision(1));
    total = total + dice;
    $("#display-number").text(dice);
    // if (dice == 1){
    //   alert('you lose');
    //   total = 0;
    // }
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
      console.log(player.playerTotal);
    } else {
      npc.playerTotal += npc.addScores();
      console.log(npc.playerTotal);
    }
    turnCount++
    total = 0;
    $('#floatDisplay').text('');
    $("#display-number").text('Roll');
    $("#display-score-player").text(player.playerTotal);
    $("#display-score-npc").text(npc.playerTotal);
  });

  // convert score to perma score + pass the turn

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
