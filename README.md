# homebridge-panasonictv

A homebridge plugin for controlling an analog LED Strip with a rapsberry pi. 

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
            "accessory": "TV",
            "name": "TV",
            "description": "Livingroom tv",
            "ip": "192.168.178.20",
            "maxVolume": 15
        }

    ]
```
