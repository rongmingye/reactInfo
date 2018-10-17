// studentDesign.js

import React from "react";
import {message, Table, Button, Icon} from "antd";

class studentDesign extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			designTitles: [] //学生所有选择的毕业设计题目
		}
	}

	componentWillMount(){
		this.getStudentDesign();
	}

	// 获取该学生选择的题目
	getStudentDesign = () => {
		var params = {
			studentId: sessionStorage.account,
		}
		window.Axios.get(window.ApiName.getStudentDesign, {params: params}).then(res=>{
			this.setState({
				designTitles: res.data
			})
		}).catch(err=>{
			console.log(err);
		})
	}

	// 学生取消题目
	cancelDesignTitle = (designId) => {
		var params = {
			designId: designId,
			studentId: sessionStorage.account,
			selectType: false
		}
		window.Axios.post(window.ApiName.selectDesign, params).then(res=>{
			message.info("取消题目成功");
			this.getStudentDesign();
		}).catch(err=>{
			console.log(err);
		})		
	}

	render(){
		
		let columns = [{
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
			dataIndex: "teacher_name",
			title: "指导老师",
			render: (text, record)=>{
				var item = record;
				return (<div> {item.teacher_name} </div>);
			}
		}, {
			dataIndex: "selected",
			title: "双向选择",
			width: "20%",
			render: (text, row)=>{
				var selected = row.selected === "true"? true: false;
				if(selected)
					return (<div> <Icon type="check-circle" style={{color: "green"}} /> 老师通过你的选择</div>);
				else if( !selected && row.remark)
					return (<div> <Icon type="close-circle" style={{color: "red"}} /> 老师不通过你的选择，原因：{row.remark}</div>)
			}
		},{
			dataIndex: "",
			title: "操作",
			render: (text, row)=>{
				return (
					<Button 
						onClick={()=>{this.cancelDesignTitle(row.design_id)}}>
							取消选择
					</Button>
				)
			}
		}
		];

		return (
			<div id="studentDesign">
		     	<Table dataSource={this.state.designTitles}  columns={columns} bordered 
		     		rowKey={ (record)=>{
		     			return record.design_id;
		     	}} />
			</div>

		);
	}

}

export default studentDesign;