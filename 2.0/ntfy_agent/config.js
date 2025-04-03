module.exports = {
    log4js_set: {
            appenders: {
                    out: {
                            type: 'stdout'
                    },
                    app: {
                            type: 'file',
                            filename: 'logs/ntfy_agent.log',
                            maxLogSize: 4096000,
                            backups: 9
                    }
            },
            categories: {
                    default: {
                            appenders: ['out', 'app'],
                            level: 'debug'
                    }
            }
    },
    gateway: {
            port: 9613
    },
    mqtt: {
            enable: true,
            url: 'mqtt://mqtt',
            opt :{
                port:1883,
                clientId: 'ntfy_agent'
            },
            topic : 'brandon/iot/zwave/philio/event/#'   // To fit into mqtt model, user {prefix}/{uid}/{event}
    },
    ntfy_service: {
            enable: true,
            url: 'http://192.168.68.57:7777/mimosa/',
    }
}