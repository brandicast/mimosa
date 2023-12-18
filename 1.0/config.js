module.exports = {
    line_notify : {
        client_id  :  '' ,  // your client id goes here
        client_secret : '',   // your secret goes here
        redirect_uri : 'http://192.168.0.120:8888/code_receiver',   // this is for redirect page
        success_page : './success.html'  , 
        token_file : "./token_list.json" ,   // this is for keep subscriber's token
        port : 8888
    }, 
    gateway : {
        port : 9613 
    }, 
    line_bot: {
        port : 9999,
        channelId: 16000000,  // your line channel id
        channelSecret: 'xxxxx',  // your channel secret
        channelAccessToken: 'xxxx'  , // channel token
        user_id_file : './user_id.json' , 
        notify_uri : 'http://192.168.0.120:8888/'
    },
    log4js_set: {
        appenders: {
                out: {
                        type: 'console'
                },
                app: {
                        type: 'file',
                        filename: 'logs/mimosa',
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
}

}