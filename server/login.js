var query = require('./mysql.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser({extended: false});

function login(app){
	// 登陆
	app.post('/user/login', urlencodedParser, function(req, res){
		var request = req.body;
		var sql = "select * from "+ request.userType;
		query(sql, function(err, result){
		    if(err) {
		        console.log(err.message);
		        return;
		     }
		  	var isHave = false;
		  	var username = '';
		  	result.map(function(item, i){
		    	if( request.userType === "teacher"){
		     		 if(request.account == item.teacher_id && request.password == item.teacher_pwd){
		     		 	username = item.teacher_name;
		        		isHave = true;
		      		}
		   		}else if(request.userType === "student"){
		        	if(request.account == item.student_id && request.password == item.student_pwd){
		        		username = item.student_name;
		        		isHave = true;
		      		}
		    	}
		  	});

		    if(isHave){
		        console.log("login success");
		        isHave = false;
		        var data = {
		        	code: 1,
		        	result: { username: username, userType: request.userType },
		        	msg: "登陆成功"
		        }
		        res.send(data);
		    }else{
		        console.log("login fail");
		        var data = {
		        	code: 0,
		        	result: null,
		        	msg: "没有该用户"
		        }
		        res.send(data);
		    }
	      	res.end();  
		});
	});
}

module.exports = login;