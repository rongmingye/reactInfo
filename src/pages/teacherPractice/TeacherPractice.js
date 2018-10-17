import React from "react";
import { List, Modal, Divider, Button, Popconfirm, Form, Input, message } from 'antd';
import date from  '../../config/utils/date.js';
const FormItem = Form.Item;

class TeacherPractice extends React.Component{

	// 获取sessionStorage数据
	constructor(props){
		super(props);
		this.state = {
			studentsPractice: [],
			studentsId: [],
			targetStudent: "",
			visible: false,
			noticeVisible: false,
			grade: this.props.history.location.state
		}
	}

	componentDidMount(){
		this.getGradeStudent(this.state.grade)
	}

	componentWillReceiveProps(newProps){
		this.setState({
			grade: newProps.history.location.state
		})
		this.getGradeStudent(newProps.history.location.state);
	}

	 // 请求实习学生的信息
	 // params: {grade, teacher_name}
	getGradeStudent(grade){
		var params = {
			grade: grade,
			teacher_name: sessionStorage.getItem("username")
		}
		console.log(params);
		window.Axios.get(window.ApiName.teacherPractices, {params: params}).then(res=>{
			console.log(res);
			var studentsId = res.data.map((item, i)=>{
				return item.student_id
			})
			this.setState({
				studentsPractice: res.data,
				studentsId: studentsId
			})
		}).catch(err=>{
			console.log(err);
		})
	}

	// 下载excel表
	downloadExcel(){
		var params = {
			teacher_name: sessionStorage.getItem("username"),
			grade: this.state.grade,
		}
		window.Axios.post(window.ApiName.excelExport, params ,{ responseType: 'blob' })
   		.then((res) => {
		    var blob = new Blob([res], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
		    var link = document.createElement('a');
		    var href = window.URL.createObjectURL(blob);
		    link.href =  href;
		    link.download = this.state.grade + '实习信息表.xlsx';
		    document.body.appendChild(link);
            link.click(); 
            window.URL.revokeObjectURL(href); 
            document.body.removeChild(link);
	   });
	}

	// 点击哪个学生，获取该学生信息，并展示在模态框
	changeStudent=(item)=>{
		this.setState({
			targetStudent: item,
			visible: true,
		})
	}

	publiceNotice(){
		this.setState({
			noticeVisible: true,
		})
	}

	handleCancel=(e)=>{
		this.setState({
			visible: false,
			noticeVisible: false,
		})
	}

	// 提交发布公告内容
	submitNotice=()=>{
		var params = {
			teacherName: sessionStorage.username,
			studentsId: this.state.studentsId,
			teacherId: sessionStorage.account,
			noticeContent: document.querySelector("#noticeContent").value,
			noticeType: '1',
			isRead: '0',
			timer: date.currentMinute(),
			grade: this.state.grade,
		}
		console.log('公告:'+JSON.stringify(params));
		window.Axios.post(window.ApiName.publicNotice, params) 
   		.then((res) => {
   			console.log(res);
   			message.info(res.data);
   			document.querySelector("#noticeContent").value = "";
   			this.setState({
				noticeVisible: false
			})
   		})
	}

	render(){
		var item = this.state.targetStudent; // 学生们的信息
		return (
			<div className="teacher">
				<h3 className="show-list-title" style={{clear: "both", marginBottom: "20px"}}>
					指导的学生名单 &nbsp;及其实习信息
					 <Popconfirm title="确定下载该年级实习信息表？" 
					 	onConfirm={()=>this.downloadExcel()} okText="确定" cancelText="取消"> 
                        <Button 
							icon="download" type="primary" style={{float: "right"}}>
							下载{this.state.grade}实习信息表
						</Button>
                    </Popconfirm>
					<Button
					onClick={()=>this.publiceNotice()}
					style={{float: "right", marginRight: '20px'}}
					>发布公告</Button>
				
				</h3>
				<List 
					dataSource={this.state.studentsPractice}
					renderItem={item=>(
						<List.Item
							onClick={()=>this.changeStudent(item)}
							style={{cursor: 'pointer'}}
						>
							 {item.student_name}
						</List.Item>
					)}/>

				<Modal
		          	title="发布公告"
		         	visible={this.state.noticeVisible}
		          	onCancel={this.handleCancel}
		          	onOk={this.submitNotice}
		          	width="800px"
		          	cancelText="取消"
		          	okText="提交"
		        >
		        	<FormItem label="公告内容">
	            		<Input.TextArea id="noticeContent"/>
	            	</FormItem>
		        </Modal>
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
					<Divider />
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