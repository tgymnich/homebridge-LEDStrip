var Service, Characteristic;
var red = require('pigpio').Gpio,
  	redLED = new red(17, {mode: redLED.OUTPUT}),
  	dutyCycle = 0;
var green = require('pigpio').Gpio,
  	greeLED = new green(22, {mode: greenLED.OUTPUT}),
  	dutyCycle = 0;
var blue = require('pigpio').Gpio,
  	blueLED = new blue(24, {mode: blueLED.OUTPUT}),
  	dutyCycle = 0;

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
  this.HOST = '127.0.0.1';
  this.PORT = 8888;
 
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
		redLED.pwmWrite(rgb[0]);
  	greenLED.pwmWrite(rgb[1]);
  	blueLED.pwmWrite(rgb[2]);
	

	 callback();
}

LED.prototype.setBrightness = function(brightness, callback) {
 
 	var r = 0
	var g = 0
	var b = 0
	this.l = brightness
	
	var rgb = hslToRgb(this.h, this.s, brightness)
 
  	redLED.pwmWrite(rgb[0]);
  	greenLED.pwmWrite(rgb[1]);
  	blueLED.pwmWrite(rgb[2]);
 
 
 
  callback();
}

LED.prototype.setSaturation = function(saturation, callback) {
  
  	var r = 0
	var g = 0
	var b = 0
	this.s = saturation
	
	var rgb = hslToRgb(this.hue, saturation, this.l)
	
		redLED.pwmWrite(rgb[0]);
  	greenLED.pwmWrite(rgb[1]);
  	blueLED.pwmWrite(rgb[2]);
	
  callback();
}

LED.prototype.setOn = function(on, callback) {

  callback();
}

function hslToRgb(h, s, l) {
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
