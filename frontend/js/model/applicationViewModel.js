function ApplicationViewModel(temperatureGauge, humidityGauge, wifiGauge){

    var self = this;

    self.websocket = null;

    self.temperature = ko.observable(0);
    self.humidity = ko.observable(0);
    self.wifi = ko.observable(0);

    self.connected = ko.observable(false);

    self.input = ko.observableArray([0,0,0,0,0,0,0,0]);
    self.output = ko.observableArray([0,0,0,0,0,0,0,0]);

    self.setWebSocket = function(websocket){
        self.websocket = websocket;
    }

    self.getWebsocket = function(){
        return self.websocket;
    }

    self.setTemperature = function(temperature){
        self.temperature(temperature);
        temperatureGauge.set(temperature);
    }

    self.setHumidity = function(humidity){
        self.humidity(humidity)
        humidityGauge.set(humidity);
    }

    self.setWifi = function(wifi){
        self.wifi(wifi);
        wifiGauge.set(wifi);
    }

    self.setRegister = function(register){
        for (var i = 0; i < 8; i++){
            var bit = (register >> i) & 1;
            self.output.setAt(i , ((bit == 0) ? 1 : 0 ));
        }
    }

    self.triggerInput = function(index){
        self.input.setAt(index, 1);
        setTimeout(function(){ self.input.setAt(index, 0); }, 1000);
    }

    self.setOutput = function(index, value){
        var newVal = 0;

        if(value == 1) {
            self.output.setAt(index, 0);
        }else{
            newVal = 1;
            self.output.setAt(index, 1);
        }
        $('.btn').blur();
        var obj = {topic: 'iotmodule/output', bit: index, state: newVal};
        if(self.getWebsocket()) {
            self.getWebsocket().send(JSON.stringify(obj));
        }
    }

    self.setConnected = function(connected){
        self.connected(connected);
    }
}
