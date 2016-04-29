var Service, Characteristic;
var raspi = require('raspi-llio');


module.exports = function(homebridge) {

  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("LEDStrip", "LED", LED);
}

function LED(log, config) {
  this.log = log;
  this.name = config.name;
  this.HOST = "192.168.178.7";
  this.PORT = 200;
}

LED.prototype.getServices = function() {
  
  var lightbulbService = new Service.Lightbulb(this.name);
	
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
  
  
  return [lightbulbService];
}

LED.prototype.setHue = function(hue, callback) {
	var pwm = new raspi.PWM();
	raspi.PWM.setMode(0);
	raspi.PWM.setClockDivisor(400);
	raspi.PWM.setRange(1000);

	var value = 40;
	pwm.write(value);


	 callback();
}

LED.prototype.setBrightness = function(brightness, callback) {
 
  callback();
}

LED.prototype.setSaturation = function(saturation, callback) {
  
  callback();
}

LED.prototype.setOn = function(on, callback) {

  callback();
}
