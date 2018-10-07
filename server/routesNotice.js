var query = require('./mysql.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser({extended: false});

var getNowTime = require('./date.js');

// app 管理 get/post
function routesNotice(app){

	// 获取未读公告数量
	app.post('/student/noticesNewNum', urlencodedParser, function(req, res){
		console.log("/student/noticesNewNum");
		var request = req.body;
		var sql = "select * from notice where student_id = '"+request.studentId+"'";

    	query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}

			// 获取该学生未读的条数
			var num = 0;
			 result.map(function(item,i){
			 	if(item.is_read==='0'){
			 		num++;
			 	}
			})

			var data = {
				code: 1,
				data: num,
				msg: "",
			}
			console.log("/student/noticesNewNumber success");
			res.send(data);
			res.end(); 	
	    });
	});

	// 获取公告信息，并将未读该为已读
	app.post('/student/notices', urlencodedParser, function(req, res){
		console.log("/student/notices");
		var request = req.body;
		var sql = "select * from notice where student_id = '"+request.studentId+"'";

    	query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}

			// 将未读该为已读
			var sql2 = "update notice set is_read = '1 'where student_id='"+request.studentId+"'";
			query(sql2, function(err){
	    		if(err) {
					console.log(err.message);
					return;
				}
			})

			var data = {
				code: 1,
				data: result,
				msg: "",
			}
			console.log("/student/notices success");
			res.send(data);
			res.end(); 	
	    });
	});


	// 发布公告
	app.post('/public/notice', urlencodedParser, function(req, res){
		console.log("/public/notice");
		var request = req.body;
		var studentsId = request.studentsId;

		var noticeId = 1; // 每个公告为一个unique_notice_id, 查询到最后的，然后加1
		var sql1 = "select * from notice order by notice_id DESC limit 1;"
		query(sql1, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			if(result.length !==0 ){
			 	noticeId = result[0].unique_notice_id + 1;	
			}
	    
		
			// 老师发布该年级的所带学生的公告，用于学生查询公告
			studentsId.map(function(item, i){
				var sql2 = "insert into notice(unique_notice_id, teacher_name, student_id, notice_content, notice_type, is_read, timer, grade) values ("
					+noticeId+",'"+request.teacherName +"','"+ item +"','"+ request.noticeContent +"','" + request.noticeType +"','"
			    + request.isRead +"','" + request.timer+"','"+request.grade+"')";

		    	query(sql2, function(err, result){
					if(err) {
						console.log(err.message);
						return;
					}	
			    });
			})

			// 插入老师的发布的公告，用于自己查看自己发布的公告
			var sql3 = "insert into notice(unique_notice_id, teacher_name, student_id, notice_content, notice_type, is_read, timer, grade) values ("
				+noticeId+",'"+request.teacherName +"','"+ request.teacherId +"','"+ request.noticeContent +"','" + request.noticeType 
				+"', '1', '" + request.timer+"','"+request.grade+"')";
	    	query(sql3, function(err, result){
				if(err) {
					console.log(err.message);
					return;
				}	
		    });

	    });

		var data = {
				code: 1,
				data: "发布公告成功！",
				msg: "",
		}

		console.log("/public/notice success");
	    res.send(data);
		res.end();  
	});


}

module.exports = routesNotice;
