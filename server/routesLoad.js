var query = require('./mysql.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser({extended: false});

var excel = require('node-excel-export');

function routesLoad(app){

	// 下载excel表
	app.post('/teacher/excelExport', urlencodedParser, function(req, res){
		console.log("/teacher/excelExport");
		var request = req.body;
		var sql = "select * from student inner join info on student.student_id = info.student_id where info.teacher_name='"
				 +request.teacher_name+"' AND student.grade='"+request.grade+"'";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}

			const styles = {
			  header: {
			    font: {
			      sz: 18,
			      bold: true,
			    }
			  },
			   headerTitle: {
			    font: {
			      sz: 12,
			      bold: true,
			    }
			  },
			
			};

			const heading = [
				[{value:'14级实习信息表', style: styles.header}],
			];

			const merges = [
				  { start: { row: 1, column: 1 }, end: { row: 1, column: 3 } },
				]

			const specification = {
				school: { 
				    displayName: '学校', 
				    headerStyle: styles.headerTitle, 
				    width: 100,
				},
				academe: {
				    displayName: '院系',
				    headerStyle: styles.headerTitle,
				    width: 160
				},
				grade: {
				    displayName: '年级',
				    headerStyle: styles.headerTitle,
				    width: 80
				},
				profession: {
				    displayName: '专业名称',
				    headerStyle: styles.headerTitle,
				    width: 150
				},
				profession_id: {
				    displayName: '专业代码',
				    headerStyle: styles.headerTitle,
				    width: 100
				},

				student_name: {
				    displayName: '实习学生名字',
				    headerStyle: styles.headerTitle,
				    width: 100
				},
				student_tel: {
				    displayName: '学生电话',
				    headerStyle: styles.headerTitle,
				    width: 100
				},

				teacher_name: {
				    displayName: '负责老师',
				    headerStyle: styles.headerTitle,
				    width: 80
				},
				teacher_tel: {
				    displayName: '老师电话',
				    headerStyle: styles.headerTitle,
				    width: 100
				},

				practice_time: {
				    displayName: '实习起止时间',
				    headerStyle: styles.headerTitle,
				    width: 200
				},
				practice_type: {
				    displayName: '实习类型',
				    headerStyle: styles.headerTitle,
				    width: 80
				},
				practice_long: {
				    displayName: '实习时长(月)',
				    headerStyle: styles.headerTitle,
				    width: 100
				},
				practice_company: {
				    displayName: '实习公司',
				    headerStyle: styles.headerTitle,
				    width: 220
				},
				relation_name: {
				    displayName: '实习公司联系人',
				    headerStyle: styles.headerTitle,
				    width: 110
				},
				relation_tel: {
				    displayName: '联系人电话',
				    headerStyle: styles.headerTitle,
				    width: 100
				},
				arrange: {
				    displayName: '安排形式',
				    headerStyle: styles.headerTitle,
				    width: 80
				},

				post: {
				    displayName: '实习岗位',
				    headerStyle: styles.headerTitle,
				    width: 100
				},
				salary: {
				    displayName: '实习工资',
				    headerStyle: styles.headerTitle,
				    width: 80
				},
				company_taken: {
				    displayName: '企业是否录用',
				    headerStyle: styles.headerTitle,
				    width: 100
				},
				tenBreak: {
				    displayName: '是否突破《规定》第十条要求',
				    headerStyle: styles.headerTitle,
				    width: 200
				},
				sixteenBreak: {
				    displayName: '是否突破《规定》第十六条要求',
				    headerStyle: styles.headerTitle,
				    width: 250
				},
				changed: {
				    displayName: '工作变动记录',
				    headerStyle: styles.headerTitle,
				    width: 200
				},
				remark: {
				    displayName: '备注',
				    headerStyle: styles.headerTitle,
				    width: 200
				}

			}
			 
			var  dataset = [];
			result.forEach(function(item, i){
				var _data = {
					school: item.school,
					academe: item.academe,
					grade: item.grade,
					
					profession: item.profession,
					profession_id: item.profession_id,
					student_name: item.student_name,
					student_tel: item.student_tel, 

					teacher_name: item.teacher_name,
					teacher_tel: item.teacher_tel, 

					practice_time: item.practice_time,
					practice_type: item.practice_type, 
					practice_long: item.practice_long, 
					practice_company: item.practice_company,
					relation_name: item.relation_name, 
					relation_tel: item.relation_tel, 
					arrange: item.arrange, 

					post: item.post, 
					salary: item.salary,
					company_taken: item.company_taken, 
					tenBreak: item.tenBreak, 
					sixteenBreak: item.sixteenBreak, 
					changed: item.changed, 
					remark: item.remark,
				}

				dataset.push(_data);
			})
			
			const report = excel.buildExport(
			  [ 
			    {
			      name: grade, 
			      heading: heading, 
			      merges: merges,
			      specification: specification, 
			      data: dataset 
			    }
			  ]
			);
			 
			res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8');
			res.setHeader("Content-Disposition", "attachment; filename=" + "fileName.xlsx");
			console.log('/teacher/excelExport end');
			res.end(report);
	    });
	});
}

module.exports = routesLoad;
