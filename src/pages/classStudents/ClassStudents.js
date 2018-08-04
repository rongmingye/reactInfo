import React from "react";
import {List, Row, Col} from 'antd';
import { connect } from "react-redux";

class ClassStudents extends React.Component{
	constructor(){
		super();
		this.state = {
			classStudents: "",
		}
	}

	componentDidMount(){
		sessionStorage.setItem("targetClass", this.props.targetClass);
		this.getClassStudents();
	}

	// 当props改变时
	componentWillReceiveProps(nextProps){
		sessionStorage.setItem("targetClass", nextProps.targetClass);
		this.getClassStudents();
	}

	getClassStudents(targetClass){
		var params = {
			className: sessionStorage.getItem('targetClass')
		}
		window.Axios.post(window.ApiName.schoolClassStudents, params).then( res =>{
			this.setState({
				classStudents: res.data
			})
		}).catch(err=>{
			console.log(err);
		})
	}

	render(){
		return (
			<div className="className">
				<List 
					header={<Row><Col span={6}>姓名</Col><Col span={8}>班级</Col><Col span={6}>电话</Col></Row>}
			      	bordered
					dataSource={this.state.classStudents}
					renderItem={item=>(
							<Row><List.Item>
								<Col span={6}>{item.student_name}</Col>
								<Col span={8}>{item.class_name}</Col>
								<Col span={6}>{item.student_tel}</Col>
							</List.Item></Row>
					)}/>
			</div>	
		);
	}
}

const mapStateToProps = (state) =>{
	return {
		targetClass: state.targetClass
	}
}

export default connect(mapStateToProps, undefined)(ClassStudents);