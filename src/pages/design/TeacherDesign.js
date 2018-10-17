// TeacherDesign.js

import React from "react";
import { Modal, message, Table, Input,Button, Icon, Select, Row, Popconfirm} from "antd";
import { connect } from "react-redux";
const Option = Select.Option;

class TeacherDesign extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			visible: false,
			visibleReason: false,
			designTitles: [],
			designId: "",
			studentId: "",
			grade: "2015级",
			grades: this.props.grades
		}
	}

	componentWillMount(){
		this.getTeacherDesign();
	}

	// 获取该老师的所有题目
	getTeacherDesign = () => {
		var params = {
			teacherId: sessionStorage.account,
			grade: this.state.grade
		}
		window.Axios.get(window.ApiName.teacherDesign, {params: params}).then(res=>{
			this.setState({
				designTitles: res.data
			})
		}).catch(err=>{
			console.log(err);
		})
	}

	// 发布毕业设计题目
	submitDesignTitle = () => {
		var title = document.querySelector('#designTitle').value;
		if(title){
			var params = {
				designTitle: title,
				teacherId: sessionStorage.account,
				teacherName: sessionStorage.username,
				grade: this.state.grade,
				submitType: "add",
			}
			window.Axios.post(window.ApiName.publishDesign, params).then(res=>{
				message.info("发布成功");
				this.setState({
					visible: false,
				}, ()=>{
					this.getTeacherDesign();
				})
				
			}).catch(err=>{
				console.log(err);
			})
		}else{
			message.info("请输入毕业设计题目！");
		}
	}

	// 删除毕业设计题目
	deleteDesignTitle = (designId) => {
		var params = {
			designId: designId,
			teacherId: sessionStorage.account,
			submitType: "delete",
		}
		window.Axios.post(window.ApiName.publishDesign, params).then(res=>{
			message.info("删除成功");
			this.getTeacherDesign();
		}).catch(err=>{
			console.log(err);
		})
	}

	handleCancel = () => {
		this.setState({
			visible: false,
			visibleReason: false
		});
	}

	// 老师选择学生
	selectDesignStudent = (designId, studentId, otype) => {
		if(otype === "choose"){
			var params = {
				designId: designId,
				studentId: studentId,
				selectType: true
			}
			window.Axios.post(window.ApiName.selectDesignStudent, params).then(res=>{
				message.info("选择该题目学生成功");
				this.getTeacherDesign();
			}).catch(err=>{
				console.log(err);
			})	
		}else if(otype === "unchoose"){
			this.setState({
				visibleReason: true,
				designId: designId,
				studentId: studentId
			});
		}	
	}

	/* 老师不选择该学生，
	*  params: {designId, studentId, selectType, remark}
	*/
	submitUnchooseReason = () => {
		var reason = document.querySelector("#reason").value;
		if(reason){
			var params = {
				designId: this.state.designId,
				studentId: this.state.studentId,
				selectType: false,
				remark: reason
			}
				 
			window.Axios.post(window.ApiName.selectDesignStudent, params).then(res=>{
				message.info("取消选择该题目学生成功");
				this.setState({visibleReason: false});
				this.getTeacherDesign();
			}).catch(err=>{
					console.log(err);
			});				
		}else{
			message.info("不选择该学生的内容不能为空");
		}
	}

	// 选年级
	selectGrade = (grade) => {
		this.setState({
			grade: grade
		}, ()=>{
			this.getTeacherDesign();
		});
	}

	render(){
		var columns = [{
			dataIndex: "design_title",
			title: "题目",
			width: "45%",
			render: (text, row)=>{
				return (
					<div> {row.design_title} </div>
				)
			}
		},{
			dataIndex: "grade",
			title: "年级",
			render: (text, row)=>{
				return (
					<div> {row.grade} </div>
				)
			}
		},{
			dataIndex: "students",
			title: "学生 ('√'代表老师选择了该同学)",
			render: (text, row)=>{
				var students = row.students;
				var itemsHtml = "";
				if(Array.isArray(students)){
					itemsHtml =  students.map((item, i)=>{
						var selectedIcon = item.selected === 'true'? <Icon type='check'/> 
							: <span style={{width: "14px", display: "inline-block"}}></span>;
						var selected = item.selected === 'true'? true : false;
						return (
							<div key={i} style={{marginBottom: 5}}>
								{item.student_id} &nbsp;&nbsp; {item.student_name} &nbsp;&nbsp; {selectedIcon} &nbsp;&nbsp;
							   	<Button
							   		style={{marginLeft: "10px"}}
							   		disabled = {selected}
							   		onClick={(e)=>this.selectDesignStudent(item.design_id, item.student_id, "choose")} >
							   		选择
							   	</Button>
							   	<Button
							   		style={{marginLeft: "10px"}}
							   		onClick={(e)=>this.selectDesignStudent(item.design_id, item.student_id, "unchoose")} >
							   		不选择
							   	</Button>
							</div>
						);
					});
				}
				return (
					<div> {itemsHtml} </div>
				)
			}	
		},{
			dataIndex: "",
			title: "操作",
			render: (text, row)=>{
				return (

					   	 <Popconfirm title="确定删除该题目吗" 
					   	 	onConfirm={(e)=>this.deleteDesignTitle(row.design_id)} 
					   	 	okText="确定" cancelText="取消">
					    		<Button>删除题目</Button>
					  	</Popconfirm>
				)
				
			}
		}];

		return (
			<div id="teacherDesign">
				<Select defaultValue={this.state.grade} style={{ marginRight: 10 }} onChange={this.selectGrade}>
				    {this.state.grades.map((item, i)=>{
						return (<Option value={item}> {item} </Option>)
					})}
				 </Select>

				<Button 
					onClick={()=>{this.setState({visible:true})}}
					style={{marginBottom: '10px'}}
					type="primary"
				>
					发布题目
				</Button>

				<Modal
		          	title="发布毕业设计题目"
		         	visible={this.state.visible}
		         	onOk={this.submitDesignTitle}
		          	onCancel={this.handleCancel}
		          	width="800px"
		          	cancelText="取消"
		          	okText="提交"
		        >
		        	<Row>题目：<Input id="designTitle" /></Row>
		        	<Row style={{marginTop: 10}}>年级：{this.state.grade} </Row>
		        </Modal>
		        <Modal
		          	title="不选择该学生的原因"
		         	visible={this.state.visibleReason}
		         	onOk={this.submitUnchooseReason}
		          	onCancel={this.handleCancel}
		          	width="800px"
		          	cancelText="取消"
		          	okText="提交"
		        >
		        	<Input id="reason"></Input>	
		        </Modal>
		     	<Table dataSource={this.state.designTitles}  columns={columns} bordered 
		     		rowKey={ (record)=>{
		     			return record.design_id;
		     	}} />
			</div>
		);
	}

}


const mapStateToProps = (state) =>{
	return {
		grades: state.grades
	}
}

export default connect(mapStateToProps, undefined)(TeacherDesign);