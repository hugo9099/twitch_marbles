const tmi = require('tmi.js');
let CONFIG = require('./config.json');


// Define configuration options from config file
const opts = {
  identity: {
    username: CONFIG.username,
    password: CONFIG.password
  },
  channels: [
    CONFIG.channel
  ]
};


// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();



// Time to wait before chatting
var minwait = 2000;
var maxwait = 8000;
var multitimeout = 2000;



wait = 0;

play_counts = 0;

//setTimeout(entermarble, getRandom(minwait, maxwait));

function play_counter() {
  // counts the !plays before jumping in..

}



// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === '!play' && wait === 0 ) {

    wait_time = getRandom(minwait, maxwait);

    setTimeout(function () {
      // nothing
    }, wait_time);

    console.log(`Waiting ${wait_time} msec.`);

    client.say(target, '!play8');

    wait = 1;

    asyncCall();



    //const num = rollDice();
    //client.say(target, `You rolled a ${num}`);



    //client.say(target, '!play8');

    //setTimeout(rollMarble, 3000);


    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }


}


function resolveAfter2Minutes() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 120000);
  });
}

//async function:
async function asyncCall() {
  console.log('calling');
  const result = await resolveAfter2Minutes();
  wait = 0;
  console.log(result);
  // expected output: 'resolved'
}




// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}



function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

