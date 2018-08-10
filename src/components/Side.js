import React from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from 'antd';
import ShowClassName from './ShowClassName'
const SubMenu = Menu.SubMenu;

// 用户信息
class Side extends React.Component{

	constructor(){
		super();
		this.state = {
			username: sessionStorage.getItem('username'),
			userType: sessionStorage.getItem('userType')
		}
	}

	// 改变标题，当前位置
	changeTitle = (title1, title2) =>{
		sessionStorage.setItem("title1", title1);
		sessionStorage.setItem("title2", title2);
	}

	render(){
		var linksPractice = "";
		var linksEmploy = "";
		if(this.state.userType === 'student'){
			linksPractice = (
				<SubMenu key="sub1"  title={<span><Icon type="smile-o" /><span>实习</span></span>} >
	     			<Menu.Item key="1" ref='teacherNotLink' onClick={()=>{this.changeTitle('实习', '实习信息')}} >
		              	<Link to={"/main/studentPractice"}><Icon type="profile" />实习信息</Link>
		            </Menu.Item>
	     		</SubMenu>
	     	);
	     	linksEmploy= ( 
	     		<SubMenu key="sub2" title={<span><Icon type="smile-o" /><span>招聘</span></span>} >
	     			<Menu.Item key="3" onClick={()=>{this.changeTitle('招聘', '招聘列表')}} >			              	
		              	<Link to="/main/employ"><Icon type="profile" /> 招聘列表</Link>
		            </Menu.Item>
	     		</SubMenu>
	     	);
		}
		else if(this.state.userType === 'teacher'){
			linksPractice = (
				<SubMenu key="sub1"  title={<span><Icon type="smile-o" /><span>实习</span></span>} >
		            <Menu.Item key="2" ref='studentNotLink' onClick={()=>{this.changeTitle('实习', '学生们实习信息')}}>
		             	<Link to="/main/teacherPractice"><Icon type="profile" />学生们实习信息</Link>
		            </Menu.Item>
	     		</SubMenu>
	     	);
	     	linksEmploy = (
	     		<SubMenu key="sub2" title={<span><Icon type="smile-o" /><span>招聘</span></span>} >
	     			<Menu.Item key="3" onClick={()=>{this.changeTitle('招聘', '招聘列表')}} >			              	
		              	<Link to="/main/employ"><Icon type="profile" /> 招聘列表</Link>
		            </Menu.Item>
		            <Menu.Item key="4"  ref='studentNotLink' onClick={()=>{this.changeTitle('招聘', '发布招聘')}} >
		             	<Link to="/main/publicEmploy"><Icon type="profile" /> 发布招聘</Link>
		            </Menu.Item>
	     		</SubMenu>
	     	);
		}

		//  管理员
		let manager = "";
		if(this.state.username === "容铭业"){
			manager = ( 
				<SubMenu key="sub6" title={<span><Icon type="smile-o" /><span>管理员</span></span>} >
					<Menu.Item key="11"  onClick={()=>{this.changeTitle('管理员', '管理新闻')}}>
			            <Link to="/main/manageNews" ><Icon type="profile" />管理新闻</Link>
			        </Menu.Item>
			        <Menu.Item key="12"  onClick={()=>{this.changeTitle('管理员', '管理招聘')}}>
			            <Link to="/main/managerEmploy" ><Icon type="profile" />管理招聘</Link>
			        </Menu.Item>
			        <Menu.Item key="13"  onClick={()=>{this.changeTitle('管理员', '管理话题')}}>
			            <Link to="/main/managerQuestion" ><Icon type="profile" />管理话题</Link>
			        </Menu.Item>
				</SubMenu>
			);
		}

		return (
	         	<Menu 
	         		theme="dark" 
	         		mode="inline" 
	         		defaultSelectedKeys={['6']} 
	         		defaultOpenKeys = {['sub4']}
	         		style={{ height:'90vh',overflow: 'auto',color:"#fff"}} 
	         		id="omenu"
	         		>
	         		{linksPractice}
	         		{linksEmploy}
	         		<SubMenu key="sub3" title={<span><Icon type="smile-o" /><span>论坛</span></span>}>
	         			<Menu.Item key="5"  onClick={()=>{this.changeTitle('论坛', '所有话题')}} >
			              	<Link to="/main/board"><Icon type="profile" /> 所有话题</Link>
			            </Menu.Item>
	         		</SubMenu>
	         		<SubMenu key="sub4" title={<span><Icon type="smile-o" /><span>校园新闻</span></span>}>
	         			<Menu.Item key="6"  onClick={()=>{this.changeTitle('校园新闻', '校园风采')}}>
			              	<Link to="/main" ><Icon type="profile" />校园风采</Link>
			            </Menu.Item>
	         		</SubMenu>
	         		<SubMenu key="sub5" title={<span><Icon type="smile-o" /><span>班级名单</span></span>}>
	         			<Menu.Item key="7" onClick={()=>this.changeTitle('班级名单','本科20141271')}>
			              	<ShowClassName oname="本科20141271" />
			            </Menu.Item>
			            <Menu.Item key="8" onClick={()=>this.changeTitle('班级名单','本科20141272')}>
			              	<ShowClassName oname="本科20141272" />
			            </Menu.Item>
			            <Menu.Item key="9" onClick={()=>this.changeTitle('班级名单','本科20151271')}>
			              	<ShowClassName oname="本科20151271" />
			            </Menu.Item>
			            <Menu.Item key="10" onClick={()=>this.changeTitle('班级名单','本科20151272')}>
			              	<ShowClassName oname="本科20151272" />
			            </Menu.Item>
	         		</SubMenu>
	         		{manager}
	         	</Menu>
		);
	}
}



export default Side;
