import React from "react";

class DetialPractice extends React.Component{

	constructor(){
		super();
		this.state = {
			StudentPractice: "",
		}
	}
	// 加载页面
	componentDidMount(){
		this.getStudentPractice();
	}

	//获取该目标学生的信息
	getStudentPractice(){
		var params = {
			student_name: sessionStorage.username,
		}
		window.Axios.post(window.ApiName.student.practice, params).then( res => {
			this.setState({
				StudentPractice: res.result
			})
		}).catch( err => {
			console.log(err);
		});
	}

	backList(){
		this.props.history.goBack();
	}

	render(){
		var item = this.state.StudentPractice; // 学生们的信息

		return (
			<div className="follow">
				<h3 className="show-list-title clearfix">学生信息：
					<input type="button" value="返回学生名单" 
						onClick={()=>{ this.backList() }} id="backListBtn" />
				</h3>
				<div className="content-list">
					<p><span>学生名字：</span>{item.student_name}</p>
					<p><span>学号：</span>{item.student_id}</p>
					<p><span>班级：</span>{item.class_name}</p>
					<p><span>专业：</span>{item.profession}</p>
					<p><span>学院：</span>{item.academe}</p>
					<p><span>学校：</span>{item.school}</p>
				</div>
				<h3 className="show-list-title">学生实习信息：</h3>
				<div className="content-list">
					<p><span>指导老师：</span>{item.teacher_name}</p>
					<p><span>指导老师电话：</span>{item.teacher_tel}</p>
					<p><span>实习公司：</span>{item.practice_company}</p>
					<p><span>实习岗位：</span>{item.post}</p>
					<p><span>实习时间：</span>{item.practice_time}</p>
					<p><span>实习多久：</span>{item.practice_long}</p>
					<p><span>安排形式：</span>{item.practice_type}</p>

					<p><span>实习公司联系人：</span>{item.relation_name}</p>
					<p><span>实习公司联系人电话：</span>{item.relation_tel}</p>
					<p><span>安排形式：</span>{item.arrange}</p>
					
					<p><span>企业是否录用：</span>{item.company_taken}</p>
					<p><span>是否突破《规定》第十条要求：</span>{item.tenBreak}</p>
					<p><span>是否突破《规定》第十六条要求，突破内容：</span>{item.sixteenBreak}</p>
					<p><span>工作变动记录(可不填)：</span>{item.changed}</p>
					<p><span>备注(可不填)：</span>{item.remark}</p>
				</div>
			</div>	
		);
	}
}

export default DetialPractice;