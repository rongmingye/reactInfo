var express = require('express'); // 快速构建服务器
var app = express();
var cors = require('cors');

app.use(cors({
    credentials: true, 
    origin: "http://localhost:3000" 
}));

app.use(express.static(__dirname+"/src")); //views路径

// 后台模块包
var query = require('./server/mysql.js');
var login = require('./server/login.js');
var routes = require('./server/routes.js');
var routes2 = require('./server/routes2.js');
var routesManager = require('./server/routesManager.js');
var routesLoad = require('./server/routesLoad.js');
var routesNotice = require('./server/routesNotice.js');
var routesDesign = require('./server/routesDesign.js');

login(app);
routes(app);
routes2(app);
routesManager(app);
routesLoad(app);
routesNotice(app);
routesDesign(app);

// 所有的请求都回到index页面
app.get('/', function(req, res){
    res.sendFile(__dirname+'/public/index.html');
});

// 监听端口
var server = app.listen(8080, '0.0.0.0', function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("http://%s:%s", host, port);
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