const Message = require('../message.js');
const Command = require('../command.js');

describe("Message class", function() {
  //-- Test4: checks error throwing if name is not provided --//
  it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
    expect(function() { new Message(); }).toThrow(new Error('Name required.'));
  });

  //-- Test5: checks if name is correctly set --//
  it("constructor sets name", function() {
    let name = 'Test message';
    let message = new Message(name, []);
    expect(message.name).toEqual(name);
  });

  //-- Test6: checks if commands array is correctly set --//
  it("contains a commands array passed into the constructor as the 2nd argument", function() {
    let name = 'Test message with commands';
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message(name, commands);
    expect(message.commands).toEqual(commands);
  });
});