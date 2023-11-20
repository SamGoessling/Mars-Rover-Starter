const Command = require('../command.js');

describe("Command class", function() {
  //-- Test1: checks that a command type passes as 1st argument --//
  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    expect(function() { new Command(); }).toThrow(new Error('Command type required.'));
  });

  //-- Test2: checks constructor in Command class correctly sets the commandType --//
  it("constructor sets command type", function() {
    let commandType = 'MOVE';
    let command = new Command(commandType);
    expect(command.commandType).toEqual(commandType);
  });

  //-- Test3: checks constructor sets value prop in new object correctly --//
  it("constructor sets a value passed in as the 2nd argument", function() {
    let commandType = 'MOVE';
    let value = 12000;
    let command = new Command(commandType, value);
    expect(command.value).toEqual(value);
  });
});
