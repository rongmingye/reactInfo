// TeachersDesign.js 

import React from "react";
import {message, Table, Checkbox, Tabs, Icon, Select } from "antd";
import { connect } from "react-redux";
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class TeachersDesign extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			teacherId: "", // 导航栏老师的id
			teachers: [], // 所有老师的数据
			designTitles: [], // 一个老师的所有毕业设计题目
			grade: "2015级",
			grades: this.props.grades
		}
	}

	componentWillMount(){
		this.getTeachers();
	}

	// 获取老师名单
	getTeachers = () => {
		window.Axios.get(window.ApiName.getTeachers).then(res=>{
			this.setState({
				teachers: res.data,
				teacherId: res.data[0].teacher_id,
			}, ()=>{
				this.getTeacherDesign();
			})
		}).catch(err=>{
			console.log(err);
		})
	}

	// 选择导航栏的老师
	selectTeacherNav = (teacherId) => {
		this.setState({
			teacherId: teacherId,
			designTitles: []
		}, ()=>{
			this.getTeacherDesign();
		});
	}

	// 获取该老师的所有题目
	getTeacherDesign = () => {
		var params = {
			teacherId: this.state.teacherId,
			grade: this.state.grade
		}
		window.Axios.post(window.ApiName.teacherDesign, params).then(res=>{
			this.setState({
				designTitles: res.data 
			})
		}).catch(err=>{
			console.log(err);
		})
	}

	// 学生选择/取消题目
	selectDesignTitle = (e, designId) => {
		var params = "";
		var msg = ""
		if(e.target.checked){
			params = {
				designId: designId,
				studentId: sessionStorage.account,
				studentName: sessionStorage.username,
				selectType: true
			}
			msg = "选择题目成功";
		}else{
			params = {
				designId: designId,
				studentId: sessionStorage.account,
				selectType: false
			}
			msg = "取消题目成功";	
		}
		window.Axios.post(window.ApiName.selectDesign, params).then(res=>{
				message.info(msg);
				this.getTeacherDesign();
			}).catch(err=>{
				console.log(err);
		})		
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
		var selectColumn = {
			dataIndex: "",
			title: "操作",
			render: (text, row)=>{
				var students = row.students;
				var selected = false;
				students.map((item, i)=>{
					if(item.student_id === sessionStorage.account){
						selected = true;
					}
					return null;
				})
				if(sessionStorage.userType === 'teacher'){
					return null;
				}else if(sessionStorage.userType === 'student'){
					return (
						<div>
							<Checkbox disabled={selected} 
								onChange={(e)=>this.selectDesignTitle(e, row.design_id)} />&nbsp;&nbsp;选择该题目
						</div>
					)
				}
			}
		}

		var columns = [{
			dataIndex: "design_title",
			title: "题目",
			width: "50%",
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
					itemsHtml = students.map((item, i)=>{
						var selected = item.selected === 'true'? <Icon type='check' theme="outline" />: "";
						return (<div key={i}> {item.student_id} {item.student_name} {selected}</div>)
					});
					return (
						<div> {itemsHtml} </div>
					)
				}
			}
		}, selectColumn
		];

		var nav = "";
		if(this.state.teachers.length){
			nav = this.state.teachers.map( (item, i)=>{
				return <TabPane tab={item.teacher_name} key={item.teacher_id}></TabPane>
			})
		}

		return (
			<div id="teacherDesign">
				<Select defaultValue={this.state.grade} style={{ marginRight: 10 }} onChange={this.selectGrade}>
					{this.state.grades.map((item, i)=>{
						return (<Option value={item}> {item} </Option>)
					})}
				 </Select>
				<Tabs onChange={this.selectTeacherNav}> 
					{nav}
				</Tabs>
		     	<Table dataSource={this.state.designTitles}  columns={columns} bordered 
		     		rowKey={ (record)=>{
		     			return record.design_id;
		     	}}  />
			</div>
		);
	}

}


const mapStateToProps = (state) =>{
	return {
		grades: state.grades
	}
}

export default connect(mapStateToProps, undefined)(TeachersDesign);
