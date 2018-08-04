import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserInfo }  from "../reducers/action";
import  $ from "jquery";
import 'bootstrap/dist/js/bootstrap.js';

class Title extends React.Component{

	constructor(){
		super();
		var myStorage = window.sessionStorage;
		this.state = {
			username: myStorage.getItem("username"),
			userType: myStorage.getItem("userType"),
		}
	}

	componentDidMount(){
		this.getUserInfoHandle();
	}

	// 获取用户的信息
	getUserInfoHandle(){
		$.ajax({
			url: "/getSideInfo",
			type: "post",
			contentType: "application/json;charser=utf-8",
			data: JSON.stringify({
				'userType': this.state.userType,
				'username': this.state.username
			}),
			success: function(result){
				this.props.getUserInfo(result);
			}.bind(this),
			fail: function(err){
				console.log(err);
			}
		});
	}

	render(){

		var item = this.props.userInfo;
		var userInfo=""; // 显示侧边的内容的容器
		if(this.state.userType === "student"){
  			userInfo = <Student userInfo={item} />
		}else if(this.state.userType === "teacher"){
			userInfo = <Teacher userInfo={item} />
		} 

		return (
			<div>
				{userInfo}
			</div>
		);
	}
}

class Student extends React.Component{
	constructor(){
		super();
		var myStorage = window.sessionStorage;
		this.state = {
			username: myStorage.getItem("username"),
			userType: myStorage.getItem("userType"),
		}
	}

	render(){
		var item = this.props.userInfo;
		return(
			<div className="userInfo dropdown">
				<button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" 
					aria-haspopup="true" aria-expanded="true">
			    	{item.student_name}
			   		<span className="caret"></span>
			 	</button>
			 	<ul className="dropdown-menu"  style={{minWidth:"300px", padding: "0 10px"}}>
			 		<li>学号： {item.student_id}</li>
					<li>姓名：{item.student_name}</li>
					<li>专业：{item.profession}</li>
					<li>学校：{item.school}</li>
					<li>年级：{item.grade}</li>
					<li>
						<Link className="text-primary" to="/" >注销</Link>&nbsp;&nbsp;
						<Link className="text-primary" to={{
							pathname: "/main/modifyPwd",
							state: { 
								 userType: this.state.userType,
								 username: this.state.username,
							}
						}} >修改密码</Link>
					</li>
				</ul>
			</div>);
	}
}

class Teacher extends React.Component{
	constructor(){
		super();
		var myStorage = window.sessionStorage;
		this.state = {
			username: myStorage.getItem("username"),
			userType: myStorage.getItem("userType"),
		}
	}

	render(){
		var item = this.props.userInfo;
		return(<div className="userInfo dropdown">
				<button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" 
					aria-haspopup="true" aria-expanded="true">
			    	{item.teacher_name}
			   		<span className="caret"></span>
			 	</button>
			 	<ul className="dropdown-menu"  style={{minWidth:"300px", padding: "0 10px"}}>
				 	<li>工号：{item.teacher_id}</li>
					<li>老师：{item.teacher_name}</li>
					<li>电话：{item.teacher_tel}</li>
					<li>
						<Link className="text-primary" to="/" >注销</Link>&nbsp;&nbsp;
						<Link className="text-primary" to={{
							pathname: "/main/modifyPwd",
							state: { 
								 userType: this.state.userType,
								 username: this.state.username,
							}
						}} >修改密码</Link>
					</li>
				</ul>
			</div>);
	}
}	

const mapStateToProps = (state) => {
	return {
		userInfo: state.userInfo,
	}
}

const mapDispatchToPorps = (dispatch) => {
	return {
		getUserInfo: (val)=>{ dispatch(getUserInfo(val)); }
	}
}

export default connect(mapStateToProps, mapDispatchToPorps)(Title);