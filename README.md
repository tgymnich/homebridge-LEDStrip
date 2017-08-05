# homebridge-LEDStrip

A homebridge plugin for controlling an analog LED Strip using a Rapsberry Pi. 

# Installation

1. Install homebridge using: `npm install -g homebridge`
2. Install this plugin using: `npm install -g homebridge-LEDStrip`
3. Update your configuration file. See sample-config.json in this repository for a sample. 
4. Run Homebridge as root

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

![alt text](https://github.com/TG908/homebridge-LEDStrip/blob/master/Homebridge%20LEDStrip%20-%20Schematic.png?raw=true "Logo Title Text 1")

