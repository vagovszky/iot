// Init Knockout
robotViewModel = new RobotViewModel()
ko.applyBindings(robotViewModel);

// Websocket handling


window.WebSocket = window.WebSocket || window.MozWebSocket;

if ("WebSocket" in window) {

    var ws = new WebSocket('ws://192.168.0.1:1880/ws/robot');

    ws.onerror = function (event) {
        alert("Websockets - nastala chyba...")
        robotViewModel.setConnected(false);
    }

    ws.onmessage = function (message) {
        try {
            var json = JSON.parse(message);
            console.log("Data: " + message);
        } catch (e) {
            console.log('Format dat neni spravny: ', message);
            return;
        }
    };
    ws.onopen = function()
    {
        robotViewModel.setWebSocket(ws);
        robotViewModel.setConnected(true);
        console.log('Pripojeno pres Websockets...');
    };
    ws.onclose = function()
    {
        robotViewModel.setConnected(false);
        console.log('Odpojeno od Websockets...');
    };
    window.onbeforeunload = function(event) {
        ws.close();
    };
}else{
    alert("Vas browser nepodporuje WebSockets!");
}