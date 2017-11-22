require('./game.js');

describe("The test environment", function() {
	it("should access game", function() {
		expect(Game).toBeDefined();
	});
});

describe("The app", function() {
	it("should do the same output given the same non-random numbers", function() {
		var gameOutPut = '';
		App(function() {
			return 0.234;
		}, function(text) {
			gameOutPut += text + '\n';
		}).start();
		// if comparison fails search in log statement for 'to equal'
		expect(gameOutPut).toEqual(expectedOutPut);
	});
});

var expectedOutPut = 'Chet was added\n' +
'They are player number 1\n' +
'Pat was added\n' +
'They are player number 2\n' +
'Sue was added\n' +
'They are player number 3\n' +
'Chet is the current player\n' +
'They have rolled a 2\n' +
'Chet\'s new location is 2\n' +
'The category is Sports\n' +
'Sports Question 0\n' +
'Answer was correct!!!!\n' +
'Chet now has 1 Gold Coins.\n' +
'Pat is the current player\n' +
'They have rolled a 2\n' +
'Pat\'s new location is 2\n' +
'The category is Sports\n' +
'Sports Question 1\n' +
'Answer was correct!!!!\n' +
'Pat now has 1 Gold Coins.\n' +
'Sue is the current player\n' +
'They have rolled a 2\n' +
'Sue\'s new location is 2\n' +
'The category is Sports\n' +
'Sports Question 2\n' +
'Answer was correct!!!!\n' +
'Sue now has 1 Gold Coins.\n' +
'Chet is the current player\n' +
'They have rolled a 2\n' +
'Chet\'s new location is 4\n' +
'The category is Pop\n' +
'Pop Question 0\n' +
'Answer was correct!!!!\n' +
'Chet now has 2 Gold Coins.\n' +
'Pat is the current player\n' +
'They have rolled a 2\n' +
'Pat\'s new location is 4\n' +
'The category is Pop\n' +
'Pop Question 1\n' +
'Answer was correct!!!!\n' +
'Pat now has 2 Gold Coins.\n' +
'Sue is the current player\n' +
'They have rolled a 2\n' +
'Sue\'s new location is 4\n' +
'The category is Pop\n' +
'Pop Question 2\n' +
'Answer was correct!!!!\n' +
'Sue now has 2 Gold Coins.\n' +
'Chet is the current player\n' +
'They have rolled a 2\n' +
'Chet\'s new location is 6\n' +
'The category is Sports\n' +
'Sports Question 3\n' +
'Answer was correct!!!!\n' +
'Chet now has 3 Gold Coins.\n' +
'Pat is the current player\n' +
'They have rolled a 2\n' +
'Pat\'s new location is 6\n' +
'The category is Sports\n' +
'Sports Question 4\n' +
'Answer was correct!!!!\n' +
'Pat now has 3 Gold Coins.\n' +
'Sue is the current player\n' +
'They have rolled a 2\n' +
'Sue\'s new location is 6\n' +
'The category is Sports\n' +
'Sports Question 5\n' +
'Answer was correct!!!!\n' +
'Sue now has 3 Gold Coins.\n' +
'Chet is the current player\n' +
'They have rolled a 2\n' +
'Chet\'s new location is 8\n' +
'The category is Pop\n' +
'Pop Question 3\n' +
'Answer was correct!!!!\n' +
'Chet now has 4 Gold Coins.\n' +
'Pat is the current player\n' +
'They have rolled a 2\n' +
'Pat\'s new location is 8\n' +
'The category is Pop\n' +
'Pop Question 4\n' +
'Answer was correct!!!!\n' +
'Pat now has 4 Gold Coins.\n' +
'Sue is the current player\n' +
'They have rolled a 2\n' +
'Sue\'s new location is 8\n' +
'The category is Pop\n' +
'Pop Question 5\n' +
'Answer was correct!!!!\n' +
'Sue now has 4 Gold Coins.\n' +
'Chet is the current player\n' +
'They have rolled a 2\n' +
'Chet\'s new location is 10\n' +
'The category is Sports\n' +
'Sports Question 6\n' +
'Answer was correct!!!!\n' +
'Chet now has 5 Gold Coins.\n' +
'Pat is the current player\n' +
'They have rolled a 2\n' +
'Pat\'s new location is 10\n' +
'The category is Sports\n' +
'Sports Question 7\n' +
'Answer was correct!!!!\n' +
'Pat now has 5 Gold Coins.\n' +
'Sue is the current player\n' +
'They have rolled a 2\n' +
'Sue\'s new location is 10\n' +
'The category is Sports\n' +
'Sports Question 8\n' +
'Answer was correct!!!!\n' +
'Sue now has 5 Gold Coins.\n' +
'Chet is the current player\n' +
'They have rolled a 2\n' +
'Chet\'s new location is 0\n' +
'The category is Pop\n' +
'Pop Question 6\n' +
'Answer was correct!!!!\n' +
'Chet now has 6 Gold Coins.\n';
