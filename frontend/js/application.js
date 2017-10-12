var opts = {
    angle: 0.15, // The span of the gauge arc
    lineWidth: 0.44, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
        length: 0.6, // // Relative to gauge radius
        strokeWidth: 0.035, // The thickness
        color: '#000000' // Fill color
    },
    limitMax: false,     // If false, max value increases automatically if value > maxValue
    limitMin: false,     // If true, the min value of the gauge will be fixed
    strokeColor: '#E0E0E0',  // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true,     // High resolution support
    percentColors: [[0.0, "#a9d70b" ], [0.50, "#f9c802"], [1.0, "#cd0000"]]
};

var temperature = new Gauge(document.getElementById('temperature')).setOptions(opts);
temperature.maxValue = 60; // set max gauge value
temperature.setMinValue(0);  // Prefer setter over gauge.minValue = 0
temperature.animationSpeed = 32; // set animation speed (32 is default value)
temperature.set(0); // set actual value

var humidity = new Gauge(document.getElementById('humidity')).setOptions(opts);
humidity.maxValue = 100; // set max gauge value
humidity.setMinValue(0);  // Prefer setter over gauge.minValue = 0
humidity.animationSpeed = 32; // set animation speed (32 is default value)
humidity.set(0); // set actual value

var wifi = new Gauge(document.getElementById('wifi')).setOptions(opts);
wifi.maxValue = 100; // set max gauge value
wifi.setMinValue(0);  // Prefer setter over gauge.minValue = 0
wifi.animationSpeed = 32; // set animation speed (32 is default value)
wifi.set(0); // set actual value

// Init Knockout
var applicationViewModel = new ApplicationViewModel(temperature, humidity, wifi);
ko.applyBindings(applicationViewModel);

// Websocket handling
window.WebSocket = window.WebSocket || window.MozWebSocket;

if ("WebSocket" in window) {

    var ws = new WebSocket('ws://192.168.0.1:1880/ws/application');

    ws.onerror = function (event) {
        alert("Websockets - nastala chyba...")
        applicationViewModel.setConnected(false);
    }
    ws.onmessage = function (message) {
        try {
            var json = JSON.parse(message.data);
            console.log("Data: " + message.data);
            if(json.topic == 'iotmodule/sensors') {
                applicationViewModel.setTemperature(json.temperature);
                applicationViewModel.setHumidity(json.humidity);
                applicationViewModel.setWifi(json.wifi);
                applicationViewModel.setRegister(json.register);
            }else if(json.topic == 'iotmodule/input'){
                applicationViewModel.triggerInput(json.bit);
            }
        } catch (e) {
            console.log('Format dat neni spravny: ', message.data);
            return;
        }
    };
    ws.onopen = function()
    {
        applicationViewModel.setWebSocket(ws);
        applicationViewModel.setConnected(true);
        console.log('Pripojeno pres Websockets...');
    };
    ws.onclose = function()
    {
        applicationViewModel.setConnected(false);
        console.log('Odpojeno od Websockets...');
    };
    window.onbeforeunload = function(event) {
        ws.close();
    };
}else{
    alert("Vas browser nepodporuje WebSockets!");
}
