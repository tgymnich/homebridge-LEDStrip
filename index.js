var Service, Characteristic;
var PiFastGpio = require('pi-fast-gpio');
var gpio = new PiFastGpio();


module.exports = function(homebridge) {

  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("LEDStrip", "LED", LED);
}

function LED(log, config) {
  this.log = log;
  this.name = config.name;
  this.h = 0;
  this.s = 0;
  this.l = 0;
  this.LED_1_GPIO = 17;
  this.LED_2_GPIO = 22;
  this.LED_3_GPIO = 24;
  this.HOST = '127.0.0.1';
  this.PORT = 8888;
  
  	gpio.connect(HOST, PORT, function(err) {
  		if (err) throw err;

	})
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
	
	var r = 0
	var g = 0
	var b = 0
	this.h = hue
	
	var rgb = hslToRgb(hue, this.s, this.l)
	gpio.setPwmDutycycle(LED_1_GPIO, rgb[0]);
	gpio.setPwmDutycycle(LED_2_GPIO, rgb[1]);
	gpio.setPwmDutycycle(LED_3_GPIO, rgb[2]);
	

	 callback();
}

LED.prototype.setBrightness = function(brightness, callback) {
 
 	var r = 0
	var g = 0
	var b = 0
	this.l = brightness
	
	var rgb = hslToRgb(this.h, this.s, brightness)
	
	gpio.setPwmDutycycle(LED_1_GPIO, rgb[0]);
	gpio.setPwmDutycycle(LED_2_GPIO, rgb[1]);
	gpio.setPwmDutycycle(LED_3_GPIO, rgb[2]);
 
  callback();
}

LED.prototype.setSaturation = function(saturation, callback) {
  
  	var r = 0
	var g = 0
	var b = 0
	this.s = saturation
	
	var rgb = hslToRgb(this.hue, saturation, this.l)
	
	gpio.setPwmDutycycle(LED_1_GPIO, rgb[0]);
	gpio.setPwmDutycycle(LED_2_GPIO, rgb[1]);
	gpio.setPwmDutycycle(LED_3_GPIO, rgb[2]);
	
  callback();
}

LED.prototype.setOn = function(on, callback) {

  callback();
}

LED.prototype.hslToRgb = function(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
