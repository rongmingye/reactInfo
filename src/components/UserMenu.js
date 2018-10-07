import React from 'react';
import { Menu, Dropdown, Icon, Row, Col, Button, Modal, Form, Input, message, Popconfirm } from 'antd';
import './css/userMenu.css';
const FormItem = Form.Item;

class UserMenu extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			userInfo: "",
			username: sessionStorage.getItem('username'),
			userType: sessionStorage.getItem('userType'),
			changePwdVisible: false,
			changeTelVisible: false,
		}
	}
	componentDidMount(){
		var params = {
			username: sessionStorage.getItem('username'),
			userType: sessionStorage.getItem('userType'),
		}
		window.Axios.post(window.ApiName.userInfo, params).then(res=>{
			// console.log(res);
			this.setState({
				userInfo: res.data
			})
			if(this.state.userType === 'student'){
				var studentClass = res.data.class_name;
	            studentClass = studentClass.slice(4,6)+studentClass.slice(8,10);
		        sessionStorage.setItem("studentClass", studentClass);
		    }
		}).catch(err=>{
			console.log(err);
		})
	}

	openRepasswordModal = (e) =>{
		this.setState({
			changePwdVisible: true
		})
	}

	handleCancel = (e) =>{
		this.setState({
			changePwdVisible: false,
			changeTelVisible: false
		})
	}


	// 修改电话
	openChangeTelModal = (e) =>{
		this.setState({
			changeTelVisible: true
		})
	}

	submitTel = (e) =>{
		var params = {
			username: sessionStorage.getItem('username'),
			userType: sessionStorage.getItem('userType'),
			tel: document.querySelector("#tel").value
		}
		// console.log(params);
		window.Axios.post(window.ApiName.userInfo, params).then(res=>{
			// console.log(res);
			message.info("修改电话成功");
			this.setState({
				changeTelVisible: false
			})
		}).catch(err=>{
			console.log(err);
		})
	}

    // 退出系统
    logout = (e) => {
    	console.log('logout');
       window.location.href = '/';
        sessionStorage.clear();
    }

	render(){
		var menu = <div></div>;
		var item = this.state.userInfo;
		if(this.state.userType === 'teacher'){
			 menu = (
				<Menu style={{width: '250px', marginLeft: '-100px'}}>
			        <Menu.Item>
			           	<Row><Col span={4}>用户名</Col> <Col span={14} offset={6}>{item.teacher_name}</Col></Row>
			        </Menu.Item>
			        <Menu.Divider />
			        <Menu.Item>
			        	<Row><Col span={4}>工号</Col> <Col span={14} offset={6}>{item.teacher_id}</Col></Row>
			        </Menu.Item>
			        <Menu.Item>
			        	<Row><Col span={4}>电话</Col> <Col span={14} offset={6}>{item.teacher_tel}</Col></Row>
			        </Menu.Item>
			        <Menu.Divider />
			        <Menu.Item>
			        	<Row>
			        		<Col span={4}><Button onClick={this.openRepasswordModal}>修改密码</Button></Col> 
			        		<Col span={4} offset={6}><Button onClick={this.openChangeTelModal}>修改电话</Button></Col>
			        	</Row>
			        </Menu.Item>
			        <Menu.Divider />
			        <Menu.Item>
			        	<Popconfirm title="确定要退出系统" onConfirm={this.logout} okText="确定" cancelText="取消"> 
                            <Icon type="poweroff" />&nbsp;&nbsp;退出系统
                        </Popconfirm >
			     	</Menu.Item>
		    	</Menu>);
		}

		else if(this.state.userType === 'student'){
			menu = (
				<Menu style={{width: '250px', marginLeft: '-100px'}}>
			        <Menu.Item>
			           	<Row><Col span={4}>用户名</Col> <Col span={14} offset={6}>{item.student_name}</Col></Row>
			        </Menu.Item>
			        <Menu.Divider />
			         <Menu.Item>
			        	<Row><Col span={4}>电话</Col> <Col span={14} offset={6}>{item.student_tel}</Col></Row>
			        </Menu.Item>
			        <Menu.Item>
			        	<Row><Col span={4}>班级</Col> <Col span={14} offset={6}>{item.class_name}</Col></Row>
			        </Menu.Item>
			        <Menu.Item>
			        	<Row><Col span={4}>学号</Col> <Col span={14} offset={6}>{item.student_id}</Col></Row>
			        </Menu.Item>
			       	<Menu.Item>
			        	<Row><Col span={4}>专业</Col> <Col span={14} offset={6}>{item.profession}</Col></Row>
			        </Menu.Item>
			       	<Menu.Item>
			        	<Row><Col span={4}>年级</Col> <Col span={14} offset={6}>{item.grade}</Col></Row>
			        </Menu.Item>
			        <Menu.Item>
			        	<Row><Col span={4}>学校</Col> <Col span={14} offset={6}>{item.school}</Col></Row>
			        </Menu.Item>
			        <Menu.Divider />
			        <Menu.Item>
			        	<Row>
			        		<Col span={4}><Button onClick={this.openRepasswordModal}>修改密码</Button></Col> 
			        		<Col span={4} offset={6}><Button onClick={this.openChangeTelModal}>修改电话</Button></Col>
			        	</Row>
			        </Menu.Item>
			         <Menu.Divider />
			        <Menu.Item>
			        	<Popconfirm title="确定要退出系统" onConfirm={this.logout} okText="确定" cancelText="取消"> 
                            <Icon type="poweroff" />&nbsp;&nbsp;退出系统
                        </Popconfirm >
	               	</Menu.Item>
		    	</Menu>);
		}

		return(
			<div>
				<Dropdown overlay={menu} trigger={['click']}>
	                    <span className="ant-dropdown-link" style={{color:'#000',cursor:'pointer'}}>
	                        <Icon type="user" />
	                    </span>
	            </Dropdown>
	            <Modal
	            	title="修改密码"
		         	visible={this.state.changePwdVisible}
		          	onCancel={this.handleCancel}
		          	width="800px"
		          	cancelText="取消"
		          	okText="提交"
		          	footer={null}
	            >
	            	<Repassword />
	            </Modal>
	           	<Modal
	            	title="修改电话"
		         	visible={this.state.changeTelVisible}
		          	onCancel={this.handleCancel}
		          	onOk={this.submitTel}
		          	width="800px"
		          	cancelText="取消"
		          	okText="提交"
	            >	
	            	<FormItem label="电话">
	            		<Input id="tel"/>
	            	</FormItem>
	            </Modal>
            </div>
		);
	}
}


//  修改密码的组件

class RepasswordForm extends React.Component{

	handleSubmit=(e)=>{
	    e.preventDefault();
	    this.props.form.validateFieldsAndScroll((err, values) => {
		    if (!err) {
		    	if(values.againPassword === values.newPassword){
		    		var params = {
						username: sessionStorage.getItem('username'),
						userType: sessionStorage.getItem('userType'),
						oldPwd: values.oldPassword,
						newPwd: values.newPassword
					}
			        window.Axios.post(window.ApiName.userRepassword, params).then(res=>{
			        	message.info("修改密码成功");
			        	window.setTimeout(function(){
			        		window.location.reload();
			        	}, 1000);
			        }).catch(err=>{
			        	console.log(err);
			        })
		    	}else{
		    		message.info("两次输入的新密码不一致");
		    	}
		    }
	    });
	}

	render(){
		const { getFieldDecorator } = this.props.form;
		return(
			<Form onSubmit={this.handleSubmit}>
				<FormItem label="旧密码">
					{getFieldDecorator('oldPassword', {
			            rules: [{ required: true, message: '请输入旧密码', whitespace: true }],
			        })(
			           <Input type="password" />
			        )}
				</FormItem>
				<FormItem label="新密码">
					{getFieldDecorator('newPassword', {
			            rules: [{ required: true, message: '请输入新密码', whitespace: true }],
			        })(
			           <Input type="password" />
			        )}
				</FormItem>
				<FormItem label="再次输入新密码">
					{getFieldDecorator('againPassword', {
			            rules: [{ required: true, message: '请再次输入旧密码', whitespace: true }],
			        })(
			           <Input type="password" />
			        )}
				</FormItem>
				<FormItem>
					<Button  type="primary" htmlType='submit'>提交</Button>
				</FormItem>
			</Form>
		);
	}
}

const Repassword = Form.create()(RepasswordForm);

export default UserMenu;