var eddystoneBeacon = require('eddystone-beacon');
var options = {
    name: 'MyEddystoneBeacon',
    txPowerLevel: -22,
    tlmCount: 2,
    tlmPeriod: 10
};
var url = 'https://tinyurl.com/';
setInterval(() => {
    var request = require('request');
    request("http://3.213.158.223/Controller/PiPiController.php?act=getBroadCast&id=1&code=0000",
        function (error, response, body) {
            if (!error) {
                var jsonObj = JSON.parse(body);
                var url = jsonObj.data;
                console.log(url);
                eddystoneBeacon.advertiseUrl(url, [options]);
            }
        })
}, 3000)