var query = require('./mysql.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser({extended: false});

// app 管理 get/post
function routes(app){

	// 获取所有年级和班级
	app.get('/student/grade', urlencodedParser, function(req, res){
		console.log("/student/grade");
		var sql = "select * from student";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			var resultData = {grades:[], classNames: []};
			var resultGradeObj = {};
			var resultClassObj = {};

			result.map(function(item, i){
				item.grade = item.grade.slice(0, -1);
				item.class_name = item.class_name.slice(2);

				if(!resultGradeObj[item.grade]){
					resultData.grades.push(item.grade);
					resultGradeObj[item.grade] = 1;
				}
				if(!resultClassObj[item.class_name]){
					resultData.classNames.push(item.class_name);
					resultClassObj[item.class_name] = 1;
				}
			})

			resultData.grades = resultData.grades.map(function(item,i){
				return item+"级";
			})

			resultData.classNames = resultData.classNames.map(function(item,i){
				return "本科"+item;
			})


			var data = {
				code: 1,
				data: resultData,
				msg: "",
			}
			console.log("/student/grade");
			res.send(data);
			res.end();  
	    });
	});

	// 获取该老师的学生们的实习信息
	app.get('/teacher/practices', urlencodedParser, function(req, res){
		console.log("/teacher/practices");
		var request = req.query;
		console.log(request)
		var sql = "select * from student inner join info on student.student_id = info.student_id where info.teacher_name ='"
			+request.teacher_name+"' AND  student.grade='"+request.grade+"'";
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
			console.log("/teacher/practices success");
			res.send(data);
			res.end();  
	    });
	});

	// 获取该学生的实习信息
	app.get('/student/practice', urlencodedParser, function(req, res){
		console.log("/student/practice");
		var request = req.query;
		var sql = "select * from student inner join info on student.student_id = info.student_id where info.student_name ='"+request.student_name+"'";
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
			console.log("/student/practice success");
			res.send(data);
	        res.end();  	
	    });
	});

	// 获取用户信息
	app.get('/user/info', urlencodedParser, function(req, res){
		console.log("/user/info");
		var request = req.query;
		if(request.userType==="student"){
			var sql = "select * from student where student_name ='"+request.username+"'";
		}else if(request.userType==="teacher"){
			var sql = "select * from teacher where teacher_name ='"+request.username+"'";
		}
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
			console.log("/user/info success");
			res.send(data);
	        res.end();  	
	    });
	});

	// 修改学生实习信息
	app.post('/student/publicPractice', urlencodedParser, function(req, res){
		console.log("/student/publicPractice");
		var sql = "update info set" 
		+" teacher_name = '" + req.body.teacher_name
		+"', teacher_tel = '" + req.body.teacher_tel
		+"', practice_company = '" + req.body.practice_company
		+"', practice_time = '" + req.body.practice_time
		+"', practice_long = '" + req.body.practice_long
		+"', practice_type = '" +req.body.practice_type
		+"', post = '" + req.body.post
		+"', relation_name = '" + req.body.relation_name
		+"', relation_tel = '" + req.body.relation_tel
		+"', arrange = '" + req.body.arrange
		+"', company_taken = '" + req.body.company_taken
		+"', tenBreak = '" + req.body.tenBreak 
		+"', sixteenBreak = '" + req.body.sixteenBreak 
		+"', changed = '" + req.body.changed 
		+"', remark = '"+ req.body.remark
		+"' WHERE student_name ='" + req.body.student_name+"'";

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
			console.log("/student/publicPractice success");
			res.send(data);
	        res.end();  	
	    });
	});

	// 修改密码
	app.post('/user/repassword', urlencodedParser, function(req, res){
		console.log("/user/repassword");
		if(req.body.userType === "teacher"){
			var sql1 = "select * from  teacher where teacher_name = '" + req.body.username+"'";
			query(sql1, function(err, result){
				if(err) {
					console.log(err.message);
					return;
				}
				if(result[0].teacher_pwd === req.body.oldPwd){
					var sql2 = "update teacher set" +" teacher_pwd = '" + req.body.newPwd 
					+ "' WHERE  teacher_name ='" + req.body.username + "'";
					query(sql2, function(err, result){
						if(err) {
							console.log(err.message);
							return;
						}
						console.log("/user/repassword success");
						res.send("success");
		        		res.end();  	
					});
				}else{
					console.log("/user/repassword fail");
					res.send("fail");
		        	res.end(); 
				}
		    });

		}else if(req.body.userType === "student"){
			var sql1 = "select * from  student where student_name = '" + req.body.username+"'";
			query(sql1, function(err, result){
				if(err) {
					console.log(err.message);
					return;
				}
				if(result[0].student_pwd === req.body.oldPwd){
					var sql2 = "update student set" +" student_pwd = '" + req.body.newPwd 
					+ "' WHERE  student_name ='" + req.body.username + "'";
					query(sql2, function(err, result){
						if(err) {
							console.log(err.message);
							return;
						}
						console.log("/user/repassword success");
						res.send("success");
		        		res.end();  	
					});
				}else{
					console.log("/user/repassword fail");
					res.send("fail");
		        	res.end(); 
				}
		    });
		}
	});

	
	// 修改用户信息
	app.post('/user/changeInfo', urlencodedParser, function(req, res){
		console.log("/user/changeInfo");
		if(req.body.userType === "teacher"){
			var sql1 = "update teacher set teacher_tel='"+ req.body.tel+"' where teacher_name = '" + req.body.username+"'";
			query(sql1, function(err, result){
				if(err) {
					console.log(err.message);
					return;
				}
				var data = {
					code: 1,
					data: "success",
					msg: "",
				}
				console.log("/user/changeInfo success");
				res.send(data);
	        	res.end(); 
		    });

		}else if(req.body.userType === "student"){
			var sql1 = "update student set student_tel='"+ req.body.tel+"' WHERE student_name ='" + req.body.username + "'";
			query(sql1, function(err, result){
				if(err) {
					console.log(err.message);
					return;
				}
				var data = {
					code: 1,
					data: "success",
					msg: "",
				}
				console.log("/user/changeInfo success");
				res.send(data);
	        	res.end(); 
				
		    });
		}
	});

}

module.exports = routes;
