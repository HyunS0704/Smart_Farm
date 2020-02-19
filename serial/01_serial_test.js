const SerialPort = require("serialport");

const sp = new SerialPort("COM5", {     // /dev/ttyACM0(라즈베리 파이에서 오픈경우)
    baudRate: 115200,
    autoOPen: false
});

                                                    //autoOpen: false
sp.on('open', function() {                          //또는 sp.open(funtion() {...})
    console.log('Serial Port OPEN');
    sp.on('data', function(data) {
        console.log("CDS Sensor Value: ", data[0]);
        sp.write('OK\n', function(err) {
            if(err) {
                console.log(err);
            }
        });
    });
});