const SerialPort = require("serialport");
const Readline = require('@serialport/parser-readline');
const sp = new SerialPort("COM5", {     // /dev/ttyACM0(라즈베리 파이에서 오픈경우)
    baudRate: 115200,
    autoOPen: false
});

const spp = sp.pipe(new Readline());        //Serial Port parser
                                                    //autoOpen: false
var message = `PUT {"red":50, "green":100, "blue":255, "relay":1}\n`;
sp.open(function() {                          //또는 sp.open(funtion() {...})
    console.log('Serial Port OPEN');                //or sp.on('open', function() { 
    spp.on('error', function(error) {
        console.log("Error : ", error.message);
    });
    spp.on('data', function(data) {
        if(data.indexOf('Ready') == 0) {
            console.log(data);
            
            sp.write(message, function(err) {
                console.log('Write "PUT"');
                if(err) {
                    console.log('Write error:', err);
                }
                sp.close();
            });
        }
    });
}); 