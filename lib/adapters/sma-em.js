var tools = require(__dirname + '/../tools.js');
// based on miele
var adapterName = 'sma-em';
var reIsSMAEM = /<div class='tvboxlarge'>SMA Energy Meter<\/div>/;

function detect(ip, device, options, callback) {
    if (device._source !== 'ip') return callback(null, false, ip);
    
    tools.httpGet('http://' + ip + '/settings_transformer.php', function (err, data) {
        var ar;
        if (!err && data && reIsSMAEM.test(data)) {
            var instance = tools.findInstance (options, adapterName, function (obj) {
                return true;
            });
            if (!instance) {
                var name = device._name ? device._name : '';
                instance = {
                    _id: tools.getNextInstanceID (adapterName, options),
                    common: {
                        name: adapterName,
                        title: 'SMA Energy Meter (' + ip + (name ? (' - ' + name) : '') + ')'
                    },
                    native: {
                        ip: ip
                    },
                    comment: {
                        add: [name, ip]
                    }
                };
                options.newInstances.push (instance);
                return callback (null, true, ip);
            }
        }
        callback(null, false, ip);
    });
}

exports.detect = detect;
exports.type = ['ip'];

  


exports.detect = detect;
exports.type = ['ip'];
exports.timeout = 1500;
