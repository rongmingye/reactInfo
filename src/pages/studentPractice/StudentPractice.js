import React from "react";
import { Modal, Button, Form, Input, message} from 'antd';
const FormItem = Form.Item;

class StudentPractice extends React.Component{

	constructor(){
		super();
		this.state = {
			visible: false,
			studentPractice: "",
			studentName: sessionStorage.getItem('username')
		}
	}

	componentDidMount(){
		this.getStudentPractice();
	}

	// 获取该学生的信息, this.state.studentName
	getStudentPractice(){
		var params = {
			student_name: sessionStorage.getItem("username"),
		}
		// console.log("params:"+JSON.stringify(params));
		window.Axios.post(window.ApiName.studentPractice, params).then( res => {
			// console.log(res);
			this.setState({
				studentPractice: res.data
			})
		}).catch( err => {
			console.log(err);
		});
	}

	// 模态框
	showModal = () => {
	    this.setState({
	      	visible: true,
	    });
	}

	handleCancel = (e) => {
	    this.setState({
	      	visible: false,
	    });
	}

	// 提交修改信息
	handleOk = (e) => {
		var that = this;
		if(window.confirm("确定提交修改！") ){
			var params = {
				'student_name': this.state.studentName,
				'teacher_name': document.querySelector("#teacher_name").value,
				'teacher_tel': document.querySelector("#teacher_tel").value,
				'practice_company': document.querySelector("#practice_company").value,
				'practice_time': document.querySelector("#practice_time").value,
				'practice_long': document.querySelector("#practice_long").value,
				'practice_type': document.querySelector("#practice_type").value,
				'post': document.querySelector("#post").value,
				'relation_name': document.querySelector("#relation_name").value,
				'relation_tel':  document.querySelector("#relation_tel").value,
				'arrange': document.querySelector("#arrange").value,
				'company_taken': document.querySelector("#company_taken").value,
				'tenBreak': document.querySelector("#tenBreak").value,
				'sixteenBreak': document.querySelector("#sixteenBreak").value,
				'changed': document.querySelector("#changed").value,
				'remark': document.querySelector("#remark").value
			}
			// console.log(params);
			window.Axios.post(window.ApiName.studentPublicPractice, params).then( res=>{
				message.info('发布成功');
				this.setState({
			      	visible: false,
			    });
			    that.getStudentPractice();
			})
			.catch( err => {
				message.info('发布失败');
				console.log(err);
			})
		}
	}

	
	render(){
		var item = this.state.studentPractice; // 学生的信息
		return (
			<div className="student">
				<Button type="primary" onClick={this.showModal}>填写/修改实习信息</Button>
		        <Modal
		          	title="填写/修改实习信息"
		         	visible={this.state.visible}
		         	onOk={this.handleOk}
		          	onCancel={this.handleCancel}
		          	width="800px"
		          	cancelText="取消"
		          	okText="提交"
		        >
		          	<Form  id="publicPractice" className="login-form">
	                   	<FormItem>
	                        <label>指导老师：</label>
	                        <Input type="text" name="teacher_name" id="teacher_name" defaultValue={item.teacher_name} />
	                    </FormItem>
	                   	<FormItem>
							<label >指导老师电话：</label>
	                        <Input type="text" name="teacher_tel" id="teacher_tel" defaultValue={item.teacher_tel} />
	                    </FormItem>
	                   	<FormItem>
							<label >实习公司：</label>
	                        <Input type="text" name="practice_company" id="practice_company" defaultValue={item.practice_company} />
	                    </FormItem>
	                   	<FormItem>
							<label >实习岗位：</label>
	                        <Input type="text" name="post" id="post" defaultValue={item.post} />
	                    </FormItem>
	                   	<FormItem>
							<label >实习时间：</label>
	                        <Input type="text" name="practice_time" id="practice_time" defaultValue={item.practice_time} />
	                    </FormItem>
	                   	<FormItem>
							<label >实习多久：</label>
	                        <Input type="text" name="practice_long" id="practice_long" defaultValue={item.practice_long} />
	                    </FormItem>
	                   	<FormItem>
							<label >安排形式：</label>
	                        <Input type="text" name="practice_type" id="practice_type" defaultValue={item.practice_type} />
	                    </FormItem>
	                   	<FormItem>
							<label >实习公司联系人：</label>
	                        <Input type="text" name="relation_name" id="relation_name" defaultValue={item.relation_name} />
	                    </FormItem>
	                   	<FormItem>
							<label >实习公司联系人电话：</label>
	                        <Input type="text" name="relation_tel" id="relation_tel" defaultValue={item.relation_tel} />
	                   	</FormItem>
	                   	<FormItem>
							<label >安排形式：</label>
	                        <Input type="text" name="arrange" id="arrange" defaultValue={item.arrange} />
	                    </FormItem>
	                   	<FormItem>
							<label >企业是否录用：</label>
	                        <Input type="text" name="company_taken" id="company_taken" defaultValue={item.company_taken} />
	                    </FormItem>
	                   	<FormItem>
							<label >是否突破《规定》第十条要求：</label>
	                        <Input type="text" name="tenBreak" id="tenBreak" defaultValue={item.tenBreak} />
	                     </FormItem>
	                   	<FormItem>
							<label >是否突破《规定》第十六条要求，突破内容：</label>
	                        <Input type="text" name="sixteenBreak" id="sixteenBreak" defaultValue={item.sixteenBreak} />
	                    </FormItem>
	                   	<FormItem>
							<label >工作变动记录：</label>
	                        <Input type="text" name="changed" id="changed" defaultValue={item.changed} />
	                    </FormItem>
	                   <FormItem>
							<label >备注：</label>
	                        <Input type="text" name="remark" id="remark" defaultValue={item.remark}/>
	                    </FormItem>
	                    <div className="text-danger m-b-n-md">
	                        <p id="errorMsg"></p>
	                    </div>
	                </Form>
		        </Modal>
				<div style={{marginTop: "10px"}}>
					<p><span>指导老师：</span> {item.teacher_name}</p>
					<p><span>指导老师电话：</span> {item.teacher_tel}</p>
					<p><span>实习公司：</span> {item.practice_company}</p>
					<p><span>实习岗位：</span> {item.post}</p>
					<p><span>实习时间：</span> {item.practice_time}</p>
					<p><span>实习多久：</span> {item.practice_long}</p>
					<p><span>安排形式：</span> {item.practice_type}</p>
					
					<p><span>实习公司联系人：</span> {item.relation_name}</p>
					<p><span>实习公司联系人电话：</span> {item.relation_tel}</p>
					<p><span>安排形式：</span> {item.arrange}</p>
					
					<p><span>企业是否录用：</span> {item.company_taken}</p>
					<p><span>是否突破《规定》第十条要求：</span> {item.tenBreak}</p>
					<p><span>是否突破《规定》第十六条要求，突破内容：</span> {item.sixteenBreak}</p>
					<p><span>工作变动记录：</span> {item.changed}</p>
					<p><span>备注：</span> {item.remark}</p>
				</div>
			</div>	
		);
	}
}



export default StudentPractice;