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

describe("App", function() {
	// todo make outcome automatically comparable
	it("should do the same output given the same random numbers", function() {
		App(function() {
			return 0.234;
		}).start();
	});
});