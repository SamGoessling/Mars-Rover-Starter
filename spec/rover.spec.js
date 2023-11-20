const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

describe("Rover class", function() {
  //-- Test7: Constructor sets position and default values --//
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(100);
    expect(rover.position).toEqual(100);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });

  //-- Test8: Response includes the name of the message --//
  it("response returned by receiveMessage contains the name of the message", function() {
    let rover = new Rover(100);
    let message = new Message('Test message', []);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual('Test message');
  });

  //-- Test9: Response includes results for each command --//
  it("response returned by receiveMessage includes results for each command", function() {
    let rover = new Rover(100);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(2);
  });

  //-- Test10: Status check command --//
  it("responds correctly to status check command", function() {
    let rover = new Rover(100);
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message with STATUS_CHECK', commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0].roverStatus).toEqual({
      mode: 'NORMAL',
      generatorWatts: 110,
      position: 100
    });
  });

  //-- Test11: Mode change command --//
  it("responds correctly to mode change command", function() {
    let rover = new Rover(100);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test message with MODE_CHANGE', commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBeTruthy();
    expect(rover.mode).toEqual('LOW_POWER');
  });

  //-- Test12: Move command in LOW_POWER mode --//
  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let rover = new Rover(100);
    rover.mode = 'LOW_POWER';
    let commands = [new Command('MOVE', 500)];
    let message = new Message('Test message with MOVE in LOW_POWER', commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBeFalsy();
    expect(rover.position).toEqual(100);
  });

  //-- Test13: Move command in NORMAL mode --//
  it("responds with updated position for move command", function() {
    let rover = new Rover(100);
    let commands = [new Command('MOVE', 500)];
    let message = new Message('Test message with MOVE', commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBeTruthy();
    expect(rover.position).toEqual(500);
  });
});