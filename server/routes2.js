var query = require('./mysql.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser({extended: false});

// app 管理 get/post
function routes2(app){

	// 发布招聘信息
	app.post('/employ/publish', urlencodedParser, function(req, res){
		console.log("/employ/publish");
		var request = req.body;
		var sql = "insert into recruit(company, address, post, required, salary, eatLive, relation) values('"
			+request.company+"','"+request.address+"','"+request.post+"','"+request.required
			+"','"+request.salary+"','"+request.eatLive+"','"+request.relation+"')";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			var data = {
	    		code: 1,
	    		data: "success",
	    		msg: "",
	    	}
			console.log("/employ/publish success");
			res.send(data);
	        res.end();  	
	    });
	});

	// 查询招聘信息
	app.get('/employ/info', urlencodedParser, function(req, res){
		console.log("/employ/info");
		var sql = "select * from recruit";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}

			// 最新的放到数组最前面
			var _result = [];
			result.map(function(item, index){
				// console.log(item);
				item.required = item.required.replace(/</g, "&lt;").replace(/>/g, "&gt;");
				item.required = item.required.replace(/ /g, "&nbsp;").replace(/\r\n/g, "<br />");
				item.required = item.required.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
				_result.unshift(item);
			});

	    	var data = {
	    		code: 1,
	    		data: result,
	    		msg: "",
	    	}
			console.log("/employ/info success");
			res.send(data);
	        res.end();  	
	    });
	});

	// 获取校园风采列表
	app.get('/school/news', urlencodedParser, function(req, res){
		console.log("/school/news");
		var sql = "select * from news";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}

			// 最新的放到数组最前面
			var _result = [];
			result.map(function(item,i){
			 	_result.unshift(item);
			});

			var data = {
				code: 1,
				data: _result,
				msg: "",
			}
			console.log("/school/news success");
			res.send(data);
			res.end();  
	    });
	});



	// 获取班级学生的信息
	app.get('/school/classStudents', urlencodedParser, function(req, res){
		console.log("/school/classStudents");
		var request = req.query;
		var sql = "select * from student where class_name ='"+request.className+"'";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			var data = {
				code: 1,
				data: result,
				msg: "",
			}
			console.log("/school/classStudents success");
			res.send(data);
			res.end();  
	    });
	});

	// 获取问题列表
	app.get('/board/getQuestions', urlencodedParser, function(req, res){
		console.log("/board/getQuestions");
		var sql = "select * from question";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}

			// 最新的放到数组最前面
			var _result = [];
			result.map(function(item,i){
				item.key = i;
			 	_result.unshift(item);
			});

			var data = {
				code: 1,
				data: _result,
				msg: "",
			}
			console.log("/board/getQuestions success");
			res.send(data);
			res.end();  
	    });
	});

	// 获取当前问题
	app.get('/board/getQuestion', urlencodedParser, function(req, res){
		console.log("/board/getQuestion");
		var request = req.query;
		var sql =  "select * from question where question_id = '"+request.questionId+"'";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			var data = {
				code: 1,
				data: result[0],
				msg: "",
			}
			console.log("/board/getQuestion success");
			res.send(data);
			res.end();  
	    });
	});

	// 获取当前问题的评论
	app.get('/board/getComments', urlencodedParser, function(req, res){
		console.log("/board/getComments");
		var request = req.query;
		var sql =  "select * from comment where question_id = '" + request.questionId+"'";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			var data = {
				code: 1,
				data: result,
				msg: "",
			}
			console.log("/board/getComments success");
			res.send(data);
			res.end();  
	    });
	});

	// 获取当前问题的回复
	app.get('/board/getReplys', urlencodedParser, function(req, res){
		console.log("/board/getReplys");
		var request = req.query;
		var sql = "select * from reply where question_id = '" + request.questionId+"'";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			var data = {
				code: 1,
				data: result,
				msg: "",
			}
			console.log("/board/getReplys success");
			res.send(data);
			res.end();  
	    });
	});

	// 发布问题
	app.post('/board/publicQuestion', urlencodedParser, function(req, res){
		console.log("/board/publishQuestion");
		var request = req.body;
		var sql = "insert into question(question_author, question_content, timer) values('"
			+request.author+"','"+request.content+"','"+request.timer+"')";
		console.log(sql);
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			var data = {
				code: 1,
				data: "success",
				msg: "",
			}
			console.log("/board/publicQuestion success");
			res.send(data);
	        res.end();  	
	    });
	});

	// 发布评论
	app.post('/board/publicComment', urlencodedParser, function(req, res){
		console.log("/board/publicComment");
		var request = req.body;
		var sql = "insert into comment(question_Id, comment_author, target_name , comment_timer, comment_content) values('"
			+request.questionId+"','"+request.author+"','"+request.target+"','"+ request.timer+"','"+request.content+"')";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			var data = {
				code: 1,
				data: "success",
				msg: "",
			}
			console.log("/board/publicComment success");
			res.send(data);
	        res.end();  	
	    });
	});

	// 发布回复
	app.post('/board/publicReply', urlencodedParser, function(req, res){
		console.log("/board/publicReply");
		var request = req.body;
		var sql = "insert into reply(question_id,comment_id, reply_author, target_name , reply_timer, reply_content) values('"
			+request.questionId+"','"+request.commentId+"','"+request.author+"','"+request.target+"','"+ request.timer+"','"+request.content+"')";
		console.log(sql);
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			var data = {
				code: 1,
				data: "success",
				msg: "",
			}
			console.log("/board/publicComment success");
			res.send(data);
	        res.end();  	
	    });
	});

}

module.exports = routes2;
