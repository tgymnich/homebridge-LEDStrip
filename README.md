# homebridge-LEDStrip [![npm version](https://badge.fury.io/js/homebridge-LEDStrip.svg)](https://badge.fury.io/js/homebridge-LEDStrip)

A homebridge plugin for controlling an analog LED Strip using a Rapsberry Pi. 

# Installation

1. Install homebridge using: `npm install -g homebridge`
2. Install pigpio `sudo apt-get install pigpio`
3. Install this plugin using: `npm install -g homebridge-LEDStrip`
4. Update your configuration file. See sample-config.json in this repository for a sample. 
5. Run Homebridge as root

# Configuration

Configuration sample:

 ```
"accessories": [
        {
            "accessory": "LED",
            "name": "OSRAM LED Strip"
        }
    ]
```

# Schematic

Watch out while wiring up your pi. I am not responsible if you fry your Pi.

![alt text](https://github.com/TG908/homebridge-LEDStrip/blob/master/Homebridge%20LEDStrip%20-%20Schematic.png?raw=true "Schematic")

