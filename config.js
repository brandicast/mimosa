module.exports = {
    line_notify : {
        client_id  :  '1Co3qNTYnvw9x1X9Zd5dt5' ,
        client_secret : '1fh5AuEEMYEBqZeuZNI6uVQortnrByxwOsrF1QVebuI', 
        redirect_uri : 'http://192.168.0.120:8888/code_receiver',
        success_page : '/home/brandon/Dropbox/workbench/nodejs/Personal/mimosa/LineNotify/success.html'  , 
        token_file : "./token_list.json" , 
        port : 8888
    }, 
    gateway : {
        port : 9613 
    }, 
    line_bot: {
        port : 9999,
        channelId: 1617614710,
        channelSecret: 'ef099e1e2bd3fa9e9207d89eca8ea964',
        channelAccessToken: 'Q6gHlttD7UhYxxKWirRghT9NiguF1e5jiGqOCbaNpNmma8c+BXXyRmlXPyzAvLsvHWkc/wZYKfH9pbJpmKR+oHHsu24ac9BhVIrcLHCV+U4rBAomcU3vnEfoiiU9Qurx7SCBikcOJ7hhnc2QsSCLjAdB04t89/1O/w1cDnyilFU='  ,
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