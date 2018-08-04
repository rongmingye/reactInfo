import React from "react";
import {Form, Input, Radio, Button } from 'antd';
import './login.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class Login extends React.Component{

	constructor(){
		super();
		this.changeUserType = this.changeUserType.bind(this);
		this.changeUsername = this.changeUsername.bind(this);
		this.changePwd = this.changePwd.bind(this);
		this.state = {
			username: "",
			pwd: "",
			userType: "student" 
		}
	}

	// 登陆处理
	// 根据userType跳转到student/teacher页面
	// 保存uesrType username isLogin到sessionStorage
	loginHandle(){
		var params = {
			username: this.state.username,
			password: this.state.pwd,
			userType: this.state.userType
		}
		// console.log(params);
		window.Axios.post(window.ApiName.userLogin, params).then( res => {
			// console.log("res:"+JSON.stringify(res));
			if(res.result){
				sessionStorage.setItem("isLogin", true);
				sessionStorage.setItem("title1", "校园新闻");
        		sessionStorage.setItem("title2", "校园风采");
	
				if(this.state.userType === "student"){
					sessionStorage.setItem("username", this.state.username);
					sessionStorage.setItem("userType", "student");
					this.props.history.push("/main"); 
				
				}else if(this.state.userType === "teacher"){
					sessionStorage.setItem("username", this.state.username);
					sessionStorage.setItem("userType", "teacher");
					this.props.history.push("/main");
				}
			}else{
				alert("密码错误");
			}
		})
		.catch(function(err){
			console.log(err)
		});
	}

	// 处理单选框 teacher/student
	changeUserType(e){
		this.setState({
			userType: e.target.value
		});
	}

	// 改变用户名
	changeUsername(e){
		this.setState({
			username: e.target.value
		})
	}

	// 改变密码
	changePwd(e){
		this.setState({
			pwd: e.target.value
		})
	}
	
	render(){
		return (
			<div className="login">
				<Form>
					<div className="loginlogo">
	                    <h3 style={{fontSize: "18px", fontWeight: "bold"}}>高本协同管理系统</h3>
	                </div>
	                <p className="text-left login-a h5">登录</p>
	                <hr className="no-margins no-padding hr" />
					<FormItem>
					    <Input type="text" id="username" placeholder="用户名" onChange={this.changeUsername} />
					</FormItem>
					<FormItem>
					    <Input type="password" id="pwd" placeholder="密码" onChange={this.changePwd} />
					</FormItem>
					<RadioGroup  onChange={this.changeUserType} value={this.state.userType}>
						<Radio value="teacher">老师</Radio>
        				<Radio value="student">学生</Radio>
					</RadioGroup>
			  		<FormItem> 
			          	<Button  type="primary" onClick={ ()=>{
			          		this.loginHandle();
			          	}}>登录</Button>
					</FormItem>
				</Form>	     	
			</div>
		);
	}
}

export default Login;
