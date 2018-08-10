var query = require('./mysql.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser({extended: false});

var getNowTime = require('./date.js');

// app 管理 get/post
function routesManager(app){	
	// 发布新闻
	app.post('/public/news', urlencodedParser, function(req, res){
		console.log("/public/news");
		var request = req.body;
		var sql = "insert into news(news_title, news_link, timer) values('"
			+request.news_title+"','"+request.news_link+"','"+request.timer+"')";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			var data = {
				code: 1,
				data: "success"
			}
			console.log("/public/news success");
			res.send(data);
	        res.end();  	
	    });
	});

	// 删除新闻
	app.post('/delete/news', urlencodedParser, function(req, res){
		console.log("/news/delete");
		var sql = "delete from news where news_id = '"+req.body.newsId+"'";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			var data = {
				code: 1,
				data: "success"
			}
			console.log("/news/delete success");
			res.send(data);
	        res.end();  	
	    });
	});

	// 删除招聘
	app.post('/delete/employ', urlencodedParser, function(req, res){
		console.log("/employ/delete");
		var sql = "delete from recruit where id = '"+req.body.employId+"'";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			var data = {
				code: 1,
				data: "success"
			}
			console.log("/employ/delete success");
			res.send(data);
	        res.end();  	
	    });
	});

	// 删除话题
	app.post('/delete/question', urlencodedParser, function(req, res){
		console.log("/employ/question");
		var sql = "delete from question where question_id = '"+req.body.questionId+"'";
		var sql2 = "delete from comment where question_id = '"+req.body.questionId+"'";
		var sql3 = "delete from reply where question_id = '"+req.body.questionId+"'";
		query(sql2, function(err, result){});
		query(sql3, function(err, result){});
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			var data = {
				code: 1,
				data: "success"
			}
			console.log("/employ/question success");
			res.send(data);
	        res.end();  	
	    });
	});
}

module.exports = routesManager;