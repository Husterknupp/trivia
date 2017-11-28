exports = typeof window !== "undefined" && window !== null ? window : global;

function Player(playerName) {
    this.name = playerName;
    this.places = 0;
    this.purses = 0;
    // todo consolidate both penalty props
    this.inPenaltyBox = false;
    isGettingOutOfPenaltyBox = false;
}

// todo reduce state (currentPlayer,..?)
// todo what is this notAWinner = game.wrongAnswer(); at the bottom?
// todo reusable + testable + maintainable + understandable
// few side effects, only in central places
exports.Game = function(log) {
    var players = [];

    var popQuestions = generate50Quesions("Pop Question");
    var scienceQuestions = generate50Quesions("Science Question");
    var sportsQuestions = generate50Quesions("Sports Question");
    var rockQuestions = generate50Quesions("Rock Question");
    function generate50Quesions(questionType) {
        var result = [];
        for (var i = 0; i < 50; i++) {
            result.push(questionType + " " + i);
        }
        return result;
    }

    var currentPlayer = 0;

    var didPlayerWin = function() {
        return players[currentPlayer].purses !== 6;
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

    this.addPlayer = function(playerName) {
        var newPlayer = new Player(playerName);
        players.push(newPlayer);

        log(newPlayer.name + " was added");
        log("They are player number " + players.length);

        return newPlayer;
    };

// todo break into sub methods
    this.roll = function(roll) {
        function roll_moveForwardAndConsiderMaxGameFields(currentPosition) {
            currentPosition += roll;
            if (currentPosition > 11) {
                currentPosition -= 12;
            }
            return currentPosition;
        }
        // todo questionService.askNextQuestion(player.place): void
        function roll_askQuestion() {
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
        }
        function roll_moveIfProperlyRolled(player, roll) {
            if (player.inPenaltyBox && roll % 2 === 0) {
                log(player.name + " is not getting out of the penalty box");
                player.isGettingOutOfPenaltyBox = false;
            } else {
                if (roll % 2 !== 0) {
                    player.isGettingOutOfPenaltyBox = true;
                    log(player.name + " is getting out of the penalty box");
                }
                player.places = roll_moveForwardAndConsiderMaxGameFields(player.places);
                log(player.name + "'s new location is " + player.places);
                log("The category is " + currentCategory());
                roll_askQuestion();
            }
        }

        var player = players[currentPlayer];
        log(player.name + " is the current player");
        log("They have rolled a " + roll);

        roll_moveIfProperlyRolled(player, roll);
    };

// todo break into sub methods
    this.wasCorrectlyAnswered = function() {
        function wasCorrectlyAnswered_nextPlayersTurn() {
            currentPlayer += 1;
            if (currentPlayer === players.length)
                currentPlayer = 0;
        }

        var player = players[currentPlayer];

        if (player.inPenaltyBox) {
            if (player.isGettingOutOfPenaltyBox) {
                log('Answer was correct!!!!');
                player.purses += 1;
                log(player.name + " now has " + player.purses + " Gold Coins.");

                var isWinner = didPlayerWin();
                wasCorrectlyAnswered_nextPlayersTurn();

                return isWinner;
            } else {
                wasCorrectlyAnswered_nextPlayersTurn();
                return true;
            }
        } else {
            log("Answer was correct!!!!");
            player.purses += 1;
            log(player.name + " now has " + player.purses + " Gold Coins.");

            var winner = didPlayerWin();

            wasCorrectlyAnswered_nextPlayersTurn();
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

                // todo what happens here?
                if (Math.floor(getRandomNumber() * 10) === 7) {
                    notAWinner = game.sendCurrentPlayerToPenaltyBox();
                } else {
                    notAWinner = game.wasCorrectlyAnswered();
                }

            } while (notAWinner);
        }
    }
};
