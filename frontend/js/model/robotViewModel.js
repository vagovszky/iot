function RobotViewModel(temperatureGauge, humidityGauge, wifiGauge){

    var self = this;

    self.websocket = null;
    self.connected = ko.observable(false);

    self.setWebSocket = function(websocket){
        self.websocket = websocket;
    }

    self.getWebsocket = function(){
        return self.websocket;
    }

    self.setConnected = function(connected){
        self.connected(connected);
    }

    self.buttonReleased = function (key, data, event) {
        console.log('Button ' + key + ' released...');
        var obj = {topic: 'robot/command', command: 'h'}
        if (self.getWebsocket()) {
            self.getWebsocket().send(JSON.stringify(obj));
        }
    }

    self.buttonPressed = function(key, data, event){
        console.log('Button ' + key + ' pressed...');
        var obj = {topic: 'robot/command', command: ''}
        if (self.getWebsocket()) {
            switch (key) {
                case 'up':
                    obj.command = 'f';
                    self.getWebsocket().send(JSON.stringify(obj));
                    break;
                case 'left':
                    obj.command = 'l';
                    self.getWebsocket().send(JSON.stringify(obj));
                    break;
                case 'right':
                    obj.command = 'r';
                    self.getWebsocket().send(JSON.stringify(obj));
                    break;
                case 'down':
                    obj.command = 'b';
                    self.getWebsocket().send(JSON.stringify(obj));
                    break;
            }
        }
    }
}
