require('./game.js');

describe("The test environment", function() {
	it("should pass", function() {
		expect(true).toBe(true);
	});

	it("should access game", function() {
		// console.log(Game);
		expect(Game).toBeDefined();
	});
});

describe("Your specs...", function() {
	// run with App().start()
	// it ...
});