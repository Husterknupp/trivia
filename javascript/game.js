exports = typeof window !== "undefined" && window !== null ? window : global;

// todo reduce state (currentPlayer,..?)
// todo what is this notAWinner = game.wrongAnswer(); at the bottom?
// todo reusable + testable + maintainable + understandable
// few side effects, only in central places
// todo player, places, purses, inPenaltyBox should be one model
exports.Game = function(log) {
  var players = new Array();
  var places = new Array(6);
  var purses = new Array(6);
  var inPenaltyBox = new Array(6);

  var popQuestions = new Array();
  var scienceQuestions = new Array();
  var sportsQuestions = new Array();
  var rockQuestions = new Array();

  var currentPlayer = 0;
  var isGettingOutOfPenaltyBox = false;

  var didPlayerWin = function() {
    return !(purses[currentPlayer] == 6)
  };

// todo switch case?
  var currentCategory = function() {
    if (places[currentPlayer] == 0)
      return 'Pop';
    if (places[currentPlayer] == 4)
      return 'Pop';
    if (places[currentPlayer] == 8)
      return 'Pop';
    if (places[currentPlayer] == 1)
      return 'Science';
    if (places[currentPlayer] == 5)
      return 'Science';
    if (places[currentPlayer] == 9)
      return 'Science';
    if (places[currentPlayer] == 2)
      return 'Sports';
    if (places[currentPlayer] == 6)
      return 'Sports';
    if (places[currentPlayer] == 10)
      return 'Sports';
    return 'Rock';
  };

  this.createRockQuestion = function(index) {
    return "Rock Question " + index;
  };

  for (var i = 0; i < 50; i++) {
    popQuestions.push("Pop Question " + i);
    scienceQuestions.push("Science Question " + i);
    sportsQuestions.push("Sports Question " + i);
    rockQuestions.push(this.createRockQuestion(i));
  };

  this.isPlayable = function(howManyPlayers) {
    return howManyPlayers >= 2;
  };

  this.addPlayer = function(playerName) {
    players.push(playerName);
    places[this.howManyPlayers() - 1] = 0;
    purses[this.howManyPlayers() - 1] = 0;
    inPenaltyBox[this.howManyPlayers() - 1] = false;

    log(playerName + " was added");
    log("They are player number " + players.length);

    return true;
  };

  this.howManyPlayers = function() {
    return players.length;
  };

// todo switch case?
  var askQuestion = function() {
    if (currentCategory() == 'Pop')
      log(popQuestions.shift());
    if (currentCategory() == 'Science')
      log(scienceQuestions.shift());
    if (currentCategory() == 'Sports')
      log(sportsQuestions.shift());
    if (currentCategory() == 'Rock')
      log(rockQuestions.shift());
  };

// todo break into sub methods
  this.roll = function(roll) {
    log(players[currentPlayer] + " is the current player");
    log("They have rolled a " + roll);

    if (inPenaltyBox[currentPlayer]) {
      if (roll % 2 != 0) {
        isGettingOutOfPenaltyBox = true;

        log(players[currentPlayer] + " is getting out of the penalty box");
        places[currentPlayer] = places[currentPlayer] + roll;
        if (places[currentPlayer] > 11) {
          places[currentPlayer] = places[currentPlayer] - 12;
        }

        log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
        log("The category is " + currentCategory());
        askQuestion();
      } else {
        log(players[currentPlayer] + " is not getting out of the penalty box");
        isGettingOutOfPenaltyBox = false;
      }
    } else {

      places[currentPlayer] = places[currentPlayer] + roll;
      if (places[currentPlayer] > 11) {
        places[currentPlayer] = places[currentPlayer] - 12;
      }

      log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
      log("The category is " + currentCategory());
      askQuestion();
    }
  };

// todo break into sub methods
  this.wasCorrectlyAnswered = function() {
    if (inPenaltyBox[currentPlayer]) {
      if (isGettingOutOfPenaltyBox) {
        log('Answer was correct!!!!');
        purses[currentPlayer] += 1;
        log(players[currentPlayer] + " now has " +
          purses[currentPlayer] + " Gold Coins.");

        var winner = didPlayerWin();
        currentPlayer += 1;
        if (currentPlayer == players.length)
          currentPlayer = 0;

        return winner;
      } else {
        currentPlayer += 1;
        if (currentPlayer == players.length)
          currentPlayer = 0;
        return true;
      }



    } else {

      log("Answer was correct!!!!");

      purses[currentPlayer] += 1;
      log(players[currentPlayer] + " now has " +
        purses[currentPlayer] + " Gold Coins.");

      var winner = didPlayerWin();

      currentPlayer += 1;
      if (currentPlayer == players.length)
        currentPlayer = 0;

      return winner;
    }
  };

  this.sendCurrentPlayerToPenaltyBox = function() {
    log('Question was incorrectly answered');
    log(players[currentPlayer] + " was sent to the penalty box");
    inPenaltyBox[currentPlayer] = true;

    currentPlayer += 1;
    if (currentPlayer == players.length)
      currentPlayer = 0;
    return true;
  };
};

exports.App = function(ngRollFunc, logFunc) {
  var getRandomNumber = ngRollFunc || function() {
    return Math.random();
  };
  var log = logFunc || function(text) {
    console.log(text);
  };

  return {
    start: function() {
      var notAWinner = false;

      var game = new Game(log);

      game.addPlayer('Chet');
      game.addPlayer('Pat');
      game.addPlayer('Sue');

// while (!game.isOver()) {
//  forEach (player in players) {
//    game.move(player)
//    if (!game.isOver()) {
//      break;
//    }
//  }
// }
      do {
        game.roll(Math.floor(getRandomNumber() * 6) + 1);

// what happens here?
        if (Math.floor(getRandomNumber() * 10) == 7) {
          notAWinner = game.sendCurrentPlayerToPenaltyBox();
        } else {
          notAWinner = game.wasCorrectlyAnswered();
        }

      } while (notAWinner);
    }
  }
}