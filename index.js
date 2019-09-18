var Service, Characteristic;
var Gpio = require('pigpio').Gpio,
  	redLED = new Gpio(17, {mode: Gpio.OUTPUT}),
  	dutyCycle = 0,
  	greenLED = new Gpio(22, {mode: Gpio.OUTPUT}),
  	dutyCycle = 0,
  	blueLED = new Gpio(24, {mode: Gpio.OUTPUT}),
  	dutyCycle = 0;
  var h = 0;
  var s = 0;
  var l = 0.5;

module.exports = function(homebridge) {

  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("LEDStrip", "LED", LED);
}

function LED(log, config) {
  this.log = log;
  this.name = config.name;
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
	
	h = hue/360;
	var rgb = hslToRgb(h, s, l);

	redLED.pwmWrite(rgb[0]);
  	greenLED.pwmWrite(rgb[1]);
  	blueLED.pwmWrite(rgb[2]);
	
	 callback();
}

LED.prototype.setBrightness = function(brightness, callback) { 
	
	l = brightness/200;
	var rgb = hslToRgb(h, s, l);

	redLED.pwmWrite(rgb[0]);
  	greenLED.pwmWrite(rgb[1]);
  	blueLED.pwmWrite(rgb[2]);
 
  callback();
}

LED.prototype.setSaturation = function(saturation, callback) {
  
	s = saturation/100;
	
		var rgb = hslToRgb(h, s, l);

		redLED.pwmWrite(rgb[0]);
  		greenLED.pwmWrite(rgb[1]);
  		blueLED.pwmWrite(rgb[2]);
	
 	callback();
}

LED.prototype.setOn = function(on, callback) {
	
	if (on == true) {
		
		var rgb = hslToRgb(h, s, l);

		redLED.pwmWrite(rgb[0]);
  		greenLED.pwmWrite(rgb[1]);
  		blueLED.pwmWrite(rgb[2]);

	} else {
		redLED.pwmWrite(0);
  		greenLED.pwmWrite(0);
  		blueLED.pwmWrite(0);		
	}
	
	callback();
}

function hslToRgb(h, s, l) {
    var r, g, b;

    if(s == 0){
        r = g = b = l;
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
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
