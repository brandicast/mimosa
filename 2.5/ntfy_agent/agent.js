var mqtt = require('mqtt');
const config = require('./config.js');

const log4js = require("log4js");
log4js.configure(config.log4js_set);
const logger = log4js.getLogger("ntfy_agent");

const fetch = require('node-fetch');

const g = require ('./globals.js') ;

var client = mqtt.connect(config.mqtt.url, config.mqtt.opt);

client.on('connect', function () {
    logger.info('Connected to MQTT broker on ' + config.mqtt.url + ' with parameter ' + JSON.stringify(config.mqtt.opt));
    client.subscribe(config.mqtt.topic);
}
);

client.on('message', function (topic, msg) {
    logger.debug('Receiving from [' + topic + '] with message : ' + msg) ;

    sendMessage(formatMessage (msg)) ;
});


function formatMessage (raw) {
    var message_to_line_notify = "" ;

    var eventObject = JSON.parse(raw) ;

    var funcName = eventObject.funcName ;
    var device_id = eventObject.uid;
    var funcType = eventObject.funcType;
    var productCode = eventObject.productCode.toString(16).toUpperCase().padStart(8, "0");
    var eventCode = eventObject.eventCode;
    var battery = eventObject.battery;
    if(g.mapping_table.philio.productCode[productCode].name ) {
        message_to_line_notify =  g.mapping_table.philio.productCode[productCode].name + "(" + device_id +") : " + funcName + " ----> " ;
    } else {
        message_to_line_notify =  " Not define ";
    }
    
    switch (eventCode) {
        case 4101: { //PIR
            message_to_line_notify = g.mapping_table.philio.function_type[funcType] + " is  Triggered"
            break;
        }
        case 4801: { //Temperature
            var unit = eventObject.dataUnit;
            var sensorValue = eventObject.sensorValue;

            message_to_line_notify += "reports temperature : " ;
            if (unit == 2)
                message_to_line_notify += (((sensorValue * 0.1) - 32) * 5 / 9).toPrecision(3) + "°C";
            else
                message_to_line_notify += (sensorValue * 0.1).toPrecision(3) + "°C";
            break;
        }
        case 4802: { // Illumination
            var unit = eventObject.dataUnit;
            var sensorValue = eventObject.sensorValue;

            message_to_line_notify += "reports illumination : " ;
            message_to_line_notify += sensorValue + "" + ((unit == 3) ? "%" : " lux");
            break;
        }
        case 4804: { // Meter report
            if (funcType == 22) {
                
                message_to_line_notify +=  g.mapping_table.philio.function_type[funcType] + " is " + (eventObject.basicValue == 0 ? "Off" : "On") + " with meter report :";
                message_to_line_notify += JSON.stringify(eventObject.meter);

            } else
                message_to_line_notify += g.mapping_table.philio.eventCode[eventCode]; //  funcType == 44, but no definition in document.  -> scene 
            break;
        }
        case 5002: { // Meter switch  
            if (funcType == 22)
                message_to_line_notify +=  g.mapping_table.philio.function_type[funcType] + " is " + (eventObject.basicValue == 0 ? "Off" : "On");
            else
                message_to_line_notify +=  g.mapping_table.philio.eventCode[eventCode]; //  funcType == 44, but no definition in document.  -> scene 
            break;
        }
        default: {
            if (g.mapping_table.philio.eventCode[eventCode])
                message_to_line_notify +=  g.mapping_table.philio.eventCode[eventCode];
            else
                message_to_line_notify +=  "new event code found : "  + eventCode;
            break;
        }
    }

    // Footer
    
    switch (battery) {
        case 255: { // device is AC adaptor
            message_to_line_notify +=  " [Battery : AC adaptor] ";
            break;
        }
        case 238: { // device battery is low
            message_to_line_notify +=  " [Battery : LOW  !!!] ";
            break;
        }
        default: { // battery level 0 -100
            message_to_line_notify += " [Battery : " + battery + "%] ";
            break;
        }
    }

    var timestamp = Number(eventObject.timeStamp + "" + (eventObject.timeStamp_ms).toString().padStart(3, "0"));
    var d = new Date(timestamp);

    message_to_line_notify +=   d.toLocaleString('en-US', { timeZone: 'Asia/Taipei'}); //d.getFullYear() +"/"+(d.getMonth()+1)+"/"+d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":"  + d.getSeconds() ;

    return message_to_line_notify ;
}




function sendMessage(msg) {
    logger.debug ("Sending message : " + msg + " to " + config.ntfy_service.url);
    // Perform the POST request
    fetch(config.ntfy_service.url, {
        method: 'POST', // PUT works too
        body: msg
    })
    .then(response => {
      console.log('Message sent successfully:', response.status);
    })
    .catch(error => {
      console.error('Error sending message:', error);
    });
}