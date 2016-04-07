// UI logic
$(document).ready(function() {

  var total = 0;
  var turnCount = 1;
  var player = null;
  var npc = null;

console.log(turnCount);
  //roll the dice
  $('form#diceRoll').submit(function(event){
    event.preventDefault();
    console.log(turnCount);
    if (turnCount == 1 && player == null){
      player = new Player(total);
    } else if (turnCount == 2 && npc == null){
      npc = new Player(total);
    }

    var dice = rollDice();
    total = addDice(dice, total);

    if (checkBust(dice) == true){
      turnCount = turnSwitch(turnCount);
      total = 0;
      player.playerFloat = 0;
      npc.playerFloat = 0;
    }
    if (turnCount == 1) {
      player.playerFloat += total;
      $('#floatDisplay').text(player.playerFloat);
      total = 0;
    } else if (turnCount == 2){
      npc.playerFloat += total;

      $('#floatDisplay').text(npc.playerFloat);
      total = 0;
    }
    $("#display-number").text(dice);
  });

  $('form#stay').submit(function(event){
    event.preventDefault();
    if (turnCount == 1){
      player.playerTotal += player.addScores();
      player.playerFloat = 0;
      $("#display-score-player").text(player.playerTotal);
      if (player.playerTotal >= 50){
        $('#winspan').text('Player 1');
        $('#winner').show();
        $('#hideme1').hide();
        $('#hideme2').hide();
        var answer = newGame();
        if (answer == true){
          document.location.reload(true);
        }
      }
    }
    else {
      npc.playerTotal += npc.addScores();
      npc.playerFloat = 0;
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
    total = 0;
    $('#hideme1').toggle();
    $('#hideme2').toggle();
    $('#floatDisplay').text('');
    $("#display-number").text('Roll');
    turnCount = turnSwitch(turnCount);
  });
});



// Buissness logic
function turnSwitch(turn){
  if (turn == 1){
    turn = 2;
  }else if(turn == 2){
    turn = 1;
  }
  return turn;
}
function Player(floatingScore){
  this.playerFloat = floatingScore;
  this.playerTotal = 0;
}
Player.prototype.addScores = function() {
  var newTotal = this.playerFloat;
  return newTotal;
}
function rng(min,max) {
  return Math.random() * (max-min) + min;
}

function rollDice(){
  var dice = parseInt(rng(1,6).toPrecision(1));
  $("#display-number").text(dice);
    return dice;
}
function addDice(dice, total){
  total = total + dice;
    return total;
}

function checkBust(dice){
  if (dice == 1){
    $('.bust').show();
    $('#hideme1').toggle();
    $('#hideme2').toggle();
    return true;
  }
}

function newGame(){
  var gameReset = confirm('Would you like to play again?');
  return gameReset;
}
