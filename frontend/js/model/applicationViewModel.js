function ApplicationViewModel(temperatureGauge, humidityGauge, wifiGauge){

    var self = this;

    self.temperature = ko.observable(0);
    self.humidity = ko.observable(0);
    self.wifi = ko.observable(0);

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
}
