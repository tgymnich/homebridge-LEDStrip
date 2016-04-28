var Service, Characteristic;
var net = require('net');

module.exports = function(homebridge) {

  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("ledStrip", "LED", LED);
}

function LED(log, config) {
  this.log = log;
  this.name = config.name;
  this.HOST = "192.168.178.7";
  this.PORT = 200;

  this.lightbulbService = new Service.Lightbulb(this.name);
	
	lightbulbService
		.addCharacteristic(Characteristic.Hue)
		.on('set', this.setHue.bind(this));

  lightbulbService
	  .getCharacteristic(Characteristic.On)
		.on('set', this.setOn.bind(this));

  lightbulbService
		.addCharacteristic(Characteristic.Saturation)
		.on('set', this.setSaturation.bind(this));

	lightbulbService
		.addCharacteristic(new Characteristic.Brightness())
		.on('set', this.setBrightness.bind(this));
}

LED.prototype.getServices = function() {
  return [this.lightbulbService];
}

LED.prototype.setHue = function(hue, callback) {
  var client = new net.Socket();
    client.connect(this.PORT, this.HOST, function() {

    console.log('CONNECTED TO: ' + this.HOST + ':' + this.PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
    client.write(hue);
    
    client.destroy();
  
});
     //Add a 'close' event handler for the client sock
    client.on('close', function() {
    console.log('Connection closed');

});

    client.on('close', function() {
    console.log('Connection closed');
    
});
 
    client.on('error', function(ex) {
    console.log("handled error");
    console.log(ex);
    
}); 
  callback();
}

LED.prototype.setBrightness = function(brightness, callback) {
  var client = new net.Socket();
    client.connect(this.PORT, this.HOST, function() {

    console.log('CONNECTED TO: ' + this.HOST + ':' + this.PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
    client.write(brightness);
    
    client.destroy();
  
});
     //Add a 'close' event handler for the client sock
    client.on('close', function() {
    console.log('Connection closed');

});

    client.on('close', function() {
    console.log('Connection closed');
    
});
 
    client.on('error', function(ex) {
    console.log("handled error");
    console.log(ex);
    
}); 
  callback();
}

LED.prototype.setSaturation = function(saturation, callback) {
  var client = new net.Socket();
    client.connect(this.PORT, this.HOST, function() {

    console.log('CONNECTED TO: ' + this.HOST + ':' + this.PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
    client.write(saturation);
    
    client.destroy();
  
});
     //Add a 'close' event handler for the client sock
    client.on('close', function() {
    console.log('Connection closed');

});

    client.on('close', function() {
    console.log('Connection closed');
    
});
 
    client.on('error', function(ex) {
    console.log("handled error");
    console.log(ex);
    
}); 
  callback();
}

LED.prototype.setOn = function(on, callback) {
  var client = new net.Socket();
    client.connect(this.PORT, this.HOST, function() {

    console.log('CONNECTED TO: ' + this.HOST + ':' + this.PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
    client.write("on");
    
    client.destroy();
  
});
     //Add a 'close' event handler for the client sock
    client.on('close', function() {
    console.log('Connection closed');

});

    client.on('close', function() {
    console.log('Connection closed');
    
});
 
    client.on('error', function(ex) {
    console.log("handled error");
    console.log(ex);
    
}); 
  callback();
}
