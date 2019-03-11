var mqtt = require('mqtt');
var client  = mqtt.connect('Borker Address');

const Gpio = require('pigpio').Gpio; 
const led = new Gpio(18, {mode: Gpio.OUTPUT});

var value = 0;
 
client.on('connect', function () {
  client.subscribe('triggers', function (err) {
    if (!err) {
      client.publish('init', 'RPi Online');
    }
  })
})
 
client.on('message', function (topic, message) {
  // message is Buffer
	handleMessage(topic, message);
})

function handleMessage(topic, message) {
	
	var msg = message.toString();
  console.log(msg);
  
  if(msg.indexOf("setIntensity=")){		
		value = msg.slice(13);	
	}  
  client.end()
}

setInterval(() => {
	led.pwmWrite(value);   
}, 5);