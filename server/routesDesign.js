// routesDesign.js  毕业设计模块

var query = require('./mysql.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser({extended: false});

// app 管理 get/post
function routesDesign(app){

	// 查询该老师的所有毕业设计题目
	app.get('/teacher/designs', urlencodedParser, function(req, res){
		console.log("/teacher/designs");
		var resultData = "";
		var request = req.query;
		var sql = "select * from design where teacher_id ='"+request.teacherId+"' and grade='"+request.grade+"'";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			resultData = result;

			return new Promise(function(resolve, reject){
				if(result.length != 0){
					let j = 0;
					result.map((item,i) => {
						var sql2 = "select * from design_info where design_id ='"+item.design_id+"'";
						query(sql2, (err, result2)=>{
							resultData[i].students = result2;
							j++;
							if(j == result.length){
								resolve();
							}
				        });
					})
				}else{
					resolve();
				}
			}).then(()=>{
				var data = {
		    		code: 1,
		    		data: resultData,
		    		msg: "",
		    	}
				console.log("/teacher/designs success");
				res.send(data);
		        res.end(); 
			})
	    });
	});

	// 老师发布/删除毕业设计题目
	app.post('/design/publish', urlencodedParser, function(req, res){
		var request = req.body;
		if(request.submitType == "add"){
			console.log("/design/publish");
			var sql = "insert into design(teacher_id, teacher_name, grade, design_title) values('"
				+request.teacherId+"','"+request.teacherName+"','"+request.grade+"','"+request.designTitle+"')";

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
				console.log("/design/publish success");
				res.send(data);
		        res.end();  	
		    });
		}else if(request.submitType == "delete"){
			console.log("/design/deleted");
			var sql = "delete from design where design_id = '"+ request.designId+"' and teacher_id ='"+ request.teacherId+"'";
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
				console.log("/student/deleted success");
				res.send(data);
				res.end();  
		    });
		}

	});

	// 获取所有老师
	app.get('/teacher/all', urlencodedParser, function(req, res){
		console.log("/teacher/all");
		var sql = "select * from teacher";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}

			var resultData = [];
			result.map((item, i)=>{
				if(item.teacher_id !== 2015127051){
					resultData.push(item);
				}
				return null;
			})

			var data = {
				code: 1,
				data: resultData,
				msg: "",
			}
			console.log("/teacher/all success");
			res.send(data);
			res.end();  
	    });
	});

	// 学生选择/取消选择题目
	app.post('/student/selectDesign', urlencodedParser, function(req, res){
		console.log("/student/selectDesign");
		var request = req.body;

		// 选择题目
		if(request.selectType){
			var sql = "insert into design_info(design_id, student_id, student_name, selected) values('"
				+request.designId+"','"+request.studentId+"','"+request.studentName+"','false')";
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
				console.log("student/selectDesign success");
				res.send(data);
				res.end();  
		    })
		}
		else{  // 取消题目
			var sql = "delete from design_info where student_id = '"+ request.studentId+"' and design_id ="+ request.designId;
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
				console.log("/student/cancelSelectedDesign success");
				res.send(data);
				res.end();  
		    });
		}
		
	});

	// 老师选择/取消选择学生
	app.post('/teacher/selectStudent', urlencodedParser, function(req, res){
		console.log("/teacher/selectStudent");
		var request = req.body;
		// 为改题目选择学生
		if(request.selectType){
			var sql =  "update design_info set selected = 'true' where student_id = '"+ request.studentId+"' and design_id ='"+ request.designId+"'";
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
				console.log("/teacher/selectStudent success");
				res.send(data);
				res.end();  
		    });
		}else{ // 为该题目取消选择该学生
			var sql =  "update design_info set selected = 'false', remark='"+request.remark+"' where student_id = '"+ request.studentId+"' and design_id ='"+ request.designId+"'";
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
				console.log("/teacher/selectStudent success");
				res.send(data);
				res.end();  
		    });
		}
	});

	// 查询该该学生所有选择的毕业设计题目
	app.get('/student/selecteds', urlencodedParser, function(req, res){
		console.log("/student/selecteds");
		var request = req.query;
		var sql = "select * from design left join design_info on design.design_id = design_info.design_id where student_id ='"
			+request.studentId+"'";
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
			console.log("/student/selecteds success");
			res.send(data);
	        res.end();  	
	    });
	});

}

module.exports = routesDesign;
