class Rover {
   constructor(position) {
     this.position = position;
     this.mode = 'NORMAL';
     this.generatorWatts = 110;
   }
 
   receiveMessage(message) {
     let results = [];
     for (let command of message.commands) {
       let result = { completed: true };
       switch (command.commandType) {
         case 'STATUS_CHECK':
           result.roverStatus = {
             mode: this.mode,
             generatorWatts: this.generatorWatts,
             position: this.position
           };
           break;
         case 'MODE_CHANGE':
           this.mode = command.value;
           break;
         case 'MOVE':
           if (this.mode !== 'LOW_POWER') {
             this.position = command.value;
           } else {
             result.completed = false;
           }
           break;
       }
       results.push(result);
     }
     return {
       message: message.name,
       results: results
     };
   }
 }
 
 module.exports = Rover;