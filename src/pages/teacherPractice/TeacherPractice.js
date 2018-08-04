import React from "react";
import { List, Modal } from 'antd';

class TeacherPractice extends React.Component{

	// 获取sessionStorage数据
	constructor(){
		super();
		this.state = {
			studentsPractice: [],
			targetStudent: "",
			visible: false,
		}
	}

	// 加载页面
	// 获取老师的学生们的信息，保存studentsInfo到store
	componentDidMount(){
		var params = {
			teacher_name: sessionStorage.getItem("username")
		}
		window.Axios.post(window.ApiName.teacherPractices, params).then(res=>{
			// console.log(res);
			this.setState({
				studentsPractice: res.data
			})
		}).catch(err=>{
			console.log(err);
		})
	}

	// 先改变目标学生store.targetStudent，让页面更顺畅
	changeStudent=(item)=>{
		this.setState({
			targetStudent: item,
			visible: true,
		})
	}

	handleCancel=(e)=>{
		this.setState({
			visible: false,
		})
	}

	render(){
		var item = this.state.targetStudent; // 学生们的信息
		return (
			<div className="teacher">
				<h3 className="show-list-title">指导的学生名单 &nbsp;及其实习信息</h3>
				<List 
					dataSource={this.state.studentsPractice}
					renderItem={item=>(
						<List.Item onClick={()=>this.changeStudent(item)}>{item.student_name}</List.Item>
					)}/>
				<Modal
		          	title="学生详细实习信息"
		         	visible={this.state.visible}
		          	onCancel={this.handleCancel}
		          	width="800px"
		          	cancelText="取消"
		          	footer={null}
		        >
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
		        </Modal>
			</div>	
		);
	}
}



export default TeacherPractice;