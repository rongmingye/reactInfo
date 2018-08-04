var express = require('express'); // 快速构建服务器
var app = express();
var cors = require('cors');
const https = require('https');
const fs = require('fs');

app.use(cors({
    credentials: true, 
    origin: "https://39.108.97.182:443",
}));

app.use(express.static(__dirname+"/build")); //views路径

// 后台模块包
var query = require('./server/mysql.js');
var login = require('./server/login.js');
var routes = require('./server/routes.js');
var routes2 = require('./server/routes2.js');

login(app);
routes(app);
routes2(app);

// 所有的请求都回到index页面
app.get('*', function(req, res){
    res.sendFile(__dirname+'/build/index.html');
});

let key = fs.readFileSync('./server/prove/214699898810685.key');
let cert = fs.readFileSync('./server/prove/214699898810685.pem');

let options = {
  key: key,
  cert: cert
};

const httpsServer = https.createServer(options, app);

httpsServer.listen(443, () => {
  console.log('listening 443 port');
});


// 定时连接mysql， 解决8小时断开连接mysql问题
let count = 0;
setInterval(function(){
    let sql = "select * from student where id = '1'";
    query(sql, function(err, result){
        if(err) {
            console.log(err.message);
            return null;
        }
        count++;
        if(count == 100){
            count = 1;
        }
        console.log("mysql+request"+ count);
  });
}, 1000*60*60*7);