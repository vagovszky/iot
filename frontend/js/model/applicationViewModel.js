function ApplicationViewModel(temperatureGauge, humidityGauge, wifiGauge){

    var self = this;

    self.websocket = null;

    self.temperature = ko.observable(0.00).extend({numeric: 1});
    self.humidity = ko.observable(0.00).extend({numeric: 1});
    self.wifi = ko.observable(0);

    self.connected = ko.observable(false);

    self.input = ko.observableArray();
    self.input()[0] = ko.observable(0);
    self.input()[1] = ko.observable(0);
    self.input()[2] = ko.observable(0);
    self.input()[3] = ko.observable(0);
    self.input()[4] = ko.observable(0);
    self.input()[5] = ko.observable(0);
    self.input()[6] = ko.observable(0); 
    self.input()[7] = ko.observable(0);
    
    self.output = ko.observableArray();
    self.output()[0] = ko.observable(0);
    self.output()[1] = ko.observable(0);
    self.output()[2] = ko.observable(0);
    self.output()[3] = ko.observable(0);
    self.output()[4] = ko.observable(0);
    self.output()[5] = ko.observable(0);
    self.output()[6] = ko.observable(0);
    self.output()[7] = ko.observable(0);

    self.setWebSocket = function(websocket){
        self.websocket = websocket;
    }

    self.getWebsocket = function(){
        return self.websocket;
    }

    self.setTemperature = function(temperature){
        temperature = parseFloat(temperature);
        self.temperature(temperature);
        temperatureGauge.set(temperature);
    }

    self.setHumidity = function(humidity){
        humidity = parseFloat(humidity);
        self.humidity(humidity);
        humidityGauge.set(humidity);
    }

    self.setWifi = function(wifi){
        wifi = parseInt(wifi);
        self.wifi(wifi);
        wifiGauge.set(wifi);
    }

    self.setRegister = function(register){
        register = parseInt(register);
        for (var index = 0; index < 8; index++){
            var bit = (register >> index) & 1;
            //self.output.setAt(i , ((bit == 0) ? 1 : 0 ));
            self.output()[index]((bit == 0) ? 1 : 0 );
        }
    }

    self.triggerInput = function(index){
        console.log('Zmacknuto tlacitko na IoT Modulu: '+index);
        index = parseInt(index);
        //self.input.setAt(index, 1);
        //setTimeout(function(){ self.input().setAt(index, 0); }, 1000);
        self.input()[index](1);
        setTimeout(function(){ self.input()[index](0); }, 1000);
    }

    self.setOutput = function(index, value){
        var newVal = 0;
        index = parseInt(index);
        value = parseInt(value);
        
        console.log('Zmacknuto tlacitko na strance: '+index+', hodnota: ' + (value == 1 ? 0 : 1));
        
        if(value == 1) {
            //self.output.setAt(index, 0);
            self.output()[index](0);
        }else{
            newVal = 1;
            //self.output.setAt(index, 1);
            self.output()[index](1);
        }
        
        var obj = {topic: 'iotmodule/output', bit: index, state: newVal};
        if(self.getWebsocket()) {
            self.getWebsocket().send(JSON.stringify(obj));
        }
    }

    self.setConnected = function(connected){
        self.connected(connected);
    }
}
