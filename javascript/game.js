exports = typeof window !== "undefined" && window !== null ? window : global;

function Player(playerName) {
    this.name = playerName;
    this.places = 0;
    this.purses = 0;
    this.inPenaltyBox = false;
}

// todo reduce state (currentPlayer,..?)
// todo what is this notAWinner = game.wrongAnswer(); at the bottom?
// todo reusable + testable + maintainable + understandable
// few side effects, only in central places
exports.Game = function(log) {
    var players = [];

    var popQuestions = [];
    var scienceQuestions = [];
    var sportsQuestions = [];
    var rockQuestions = [];

    var currentPlayer = 0;
    var isGettingOutOfPenaltyBox = false; // todo baaaaad state everywhere!

    var didPlayerWin = function() {
        return !(players[currentPlayer].purses === 6)
    };

    var currentCategory = function() {
        switch (players[currentPlayer].places) {
            case 0:
            case 4:
            case 8:
                return 'Pop';
                break;
            case 1:
            case 5:
            case 9:
                return 'Science';
                break;
            case 2:
            case 6:
            case 10:
                return 'Sports';
                break;
            default:
                return 'Rock';
        }
    };

    this.createRockQuestion = function(index) {
        return "Rock Question " + index;
    };

    for (var i = 0; i < 50; i++) {
        popQuestions.push("Pop Question " + i);
        scienceQuestions.push("Science Question " + i);
        sportsQuestions.push("Sports Question " + i);
        rockQuestions.push(this.createRockQuestion(i));
    }

    this.isPlayable = function(howManyPlayers) {
        return howManyPlayers >= 2;
    };

    this.addPlayer = function(playerName) {
        var newPlayer = new Player(playerName);
        players.push(newPlayer);

        log(newPlayer.name + " was added");
        log("They are player number " + players.length);

        return newPlayer;
    };

    this.howManyPlayers = function() {
        return players.length;
    };

    var askQuestion = function() {
        switch (currentCategory()) {
            case 'Pop':
                log(popQuestions.shift());
                break;
            case 'Science':
                log(scienceQuestions.shift());
                break;
            case 'Sports':
                log(sportsQuestions.shift());
                break;
            case 'Rock':
                log(rockQuestions.shift());
                break;
        }
    };

// todo break into sub methods
    this.roll = function(roll) {
        var player = players[currentPlayer];
        log(player.name + " is the current player");
        log("They have rolled a " + roll);

        if (player.inPenaltyBox) {
            // GO OUT OF PENALTY BOX + MOVE
            if (roll % 2 !== 0) {
                isGettingOutOfPenaltyBox = true;

                log(player.name + " is getting out of the penalty box");

                // todo extract into method and reuse
                player.places = player.places + roll;
                if (player.places > 11) {
                    player.places = player.places - 12;
                }

                log(player.name + "'s new location is " + player.places);
                log("The category is " + currentCategory());
                askQuestion();
            } else {
                log(player.name + " is not getting out of the penalty box");
                isGettingOutOfPenaltyBox = false;
            }
        } else {

            player.places = player.places + roll;
            if (player.places > 11) {
                player.places = player.places - 12;
            }

            log(player.name + "'s new location is " + player.places);
            log("The category is " + currentCategory());
            askQuestion();
        }
    };

// todo break into sub methods
    this.wasCorrectlyAnswered = function() {
        var player = players[currentPlayer];
        if (player.inPenaltyBox) {
            if (isGettingOutOfPenaltyBox) {
                log('Answer was correct!!!!');
                player.purses += 1;
                log(player.name + " now has " + player.purses + " Gold Coins.");

                var winner = didPlayerWin();
                // todo extract method
                currentPlayer += 1;
                if (currentPlayer === players.length)
                    currentPlayer = 0;

                return winner;
            } else {
                currentPlayer += 1;
                if (currentPlayer === players.length)
                    currentPlayer = 0;
                return true;
            }
        } else {
            log("Answer was correct!!!!");
            player.purses += 1;
            log(player.name + " now has " + player.purses + " Gold Coins.");

            var winner = didPlayerWin();

            currentPlayer += 1;
            if (currentPlayer === players.length)
                currentPlayer = 0;

            return winner;
        }
    };

    this.sendCurrentPlayerToPenaltyBox = function() {
        var player = players[currentPlayer];
        log('Question was incorrectly answered');
        log(player.name + " was sent to the penalty box");
        player.inPenaltyBox = true;

        currentPlayer += 1;
        if (currentPlayer === players.length)
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

            var Chet = game.addPlayer('Chet');
            var Pat = game.addPlayer('Pat');
            var Sue = game.addPlayer('Sue');

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
                if (Math.floor(getRandomNumber() * 10) === 7) {
                    notAWinner = game.sendCurrentPlayerToPenaltyBox();
                } else {
                    notAWinner = game.wasCorrectlyAnswered();
                }

            } while (notAWinner);
        }
    }
};
