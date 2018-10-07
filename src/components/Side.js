import React from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from 'antd';
import ShowClassName from './ShowClassName';
import { getGrades } from '../reducers/grades.js';
import { getClassNames } from '../reducers/classNames.js';
import { connect } from "react-redux";
const SubMenu = Menu.SubMenu;

// 用户信息
class Side extends React.Component{

	constructor(){
		super();
		this.state = {
			account: sessionStorage.getItem('account'),
			userType: sessionStorage.getItem('userType'),
			grades: [],
			classNames: [],
		}
	}

	componentWillMount(){
		window.Axios.get(window.ApiName.getGrade).then(res=>{
            // console.log(JSON.stringify(res));
            this.setState({
            	grades: res.data.grades,
            	classNames: res.data.classNames
            })
            this.props.getGrades(res.data.grades);
            this.props.getClassNames(res.data.classNames);
        }).catch(err=>{
            console.log(err);
        })
	}

	// 改变标题，当前位置
	changeTitle = (title1, title2) => {
		sessionStorage.setItem("title1", title1);
		sessionStorage.setItem("title2", title2);
	}

	render(){
		var linksPractice = "";  // 实习模块
		var linksEmploy = ""; // 招聘模块
		var linkDesign = ""; // 毕业设计模块
		
		if(this.state.userType === 'student'){
			linksPractice = (
				<SubMenu key="sub1"  title={<span><Icon type="smile-o" /><span>实习</span></span>} >
	     			<Menu.Item key="14" ref='teacherNotLink' onClick={()=>{this.changeTitle('实习', '实习信息')}} >
		              	<Link to={"/main/studentPractice"}><Icon type="profile" />实习信息</Link>
		            </Menu.Item>
	     		</SubMenu>
	     	);
	     	linksEmploy= ( 
	     		<SubMenu key="sub2" title={<span><Icon type="smile-o" /><span>招聘</span></span>} >
	     			<Menu.Item key="23" onClick={()=>{this.changeTitle('招聘', '招聘列表')}} >			              	
		              	<Link to="/main/employ"><Icon type="profile" /> 招聘列表</Link>
		            </Menu.Item>
	     		</SubMenu>
	     	);
	     	linkDesign = (
	     		<SubMenu key="sub7" title={<span><Icon type="smile-o" /><span>毕业设计</span></span>} >
	     			<Menu.Item key="71" onClick={()=>{this.changeTitle('毕业设计', '我的选题')}} >			              	
		              	<Link to="/main/studentDesign"><Icon type="profile" /> 我的选题</Link>
		            </Menu.Item>
		            <Menu.Item key="73" onClick={()=>{this.changeTitle('毕业设计', '所有题目')}} >			              	
		              	<Link to="/main/teachersDesign"><Icon type="profile" /> 所有题目</Link>
		            </Menu.Item>
	     		</SubMenu>
	     	);
		}
		else if(this.state.userType === 'teacher'){
			linksPractice = (
				<SubMenu key="sub1"  title={<span><Icon type="smile-o" /><span>实习</span></span>} >
					{this.state.grades.map((item, i)=>{
	         				return (
	         					 <Menu.Item key={`1`+i} onClick={()=>{this.changeTitle('实习', item+'实习信息')}}>
					             	<Link to={{pathname:"/main/teacherPractice", state: item}}>
					             		<Icon type="profile" />{item}实习信息
					             	</Link>
					            </Menu.Item>
			            	);
	         		})}
	     		</SubMenu>
	     	);
	     	linksEmploy = (
	     		<SubMenu key="sub2" title={<span><Icon type="smile-o" /><span>招聘</span></span>} >
	     			<Menu.Item key="21" onClick={()=>{this.changeTitle('招聘', '招聘列表')}} >			              	
		              	<Link to="/main/employ"><Icon type="profile" /> 招聘列表</Link>
		            </Menu.Item>
		            <Menu.Item key="22" onClick={()=>{this.changeTitle('招聘', '发布招聘')}} >
		             	<Link to="/main/publicEmploy"><Icon type="profile" /> 发布招聘</Link>
		            </Menu.Item>
	     		</SubMenu>
	     	);

	     	linkDesign = (
	     		<SubMenu key="sub7" title={<span><Icon type="smile-o" /><span>毕业设计</span></span>} >
	     			<Menu.Item key="72" onClick={()=>{this.changeTitle('毕业设计', '我的题目')}} >			              	
		              	<Link to="/main/teacherDesign"><Icon type="profile" /> 我的题目</Link>
		            </Menu.Item>
	     			<Menu.Item key="73" onClick={()=>{this.changeTitle('毕业设计', '所有题目')}} >			              	
		              	<Link to="/main/teachersDesign"><Icon type="profile" /> 所有题目</Link>
		            </Menu.Item>
	     		</SubMenu>
	     	);
		}

		//  管理员
		let manager = "";
		if(this.state.account === "2015127051"){
			manager = ( 
				<SubMenu key="sub6" title={<span><Icon type="smile-o" /><span>管理员</span></span>} >
					<Menu.Item key="61"  onClick={()=>{this.changeTitle('管理员', '管理新闻')}}>
			            <Link to="/main/manageNews" ><Icon type="profile" />管理新闻</Link>
			        </Menu.Item>
			        <Menu.Item key="62"  onClick={()=>{this.changeTitle('管理员', '管理招聘')}}>
			            <Link to="/main/manageEmploy" ><Icon type="profile" />管理招聘</Link>
			        </Menu.Item>
			        <Menu.Item key="63"  onClick={()=>{this.changeTitle('管理员', '管理话题')}}>
			            <Link to="/main/manageQuestion" ><Icon type="profile" />管理话题</Link>
			        </Menu.Item>
			          <Menu.Item key="64" onClick={()=>{this.changeTitle('管理员', '管理公告')}}>
			            <Link to="/main/manageNotice" ><Icon type="profile" />管理公告</Link>
			        </Menu.Item>
				</SubMenu>
			);
		}

		return (
	         	<Menu 
	         		theme="dark" 
	         		mode="inline" 
	         		defaultSelectedKeys={['41']} 
	         		defaultOpenKeys = {['sub4']}
	         		style={{ height:'90vh',overflow: 'auto',color:"#fff"}} 
	         		id="omenu"
	         		>
	         		{linksPractice}
	         		{linkDesign}
	         		{linksEmploy}
	         		<SubMenu key="sub3" title={<span><Icon type="smile-o" /><span>论坛</span></span>}>
	         			<Menu.Item key="31"  onClick={()=>{this.changeTitle('论坛', '所有话题')}} >
			              	<Link to="/main/board"><Icon type="profile" /> 所有话题</Link>
			            </Menu.Item>
	         		</SubMenu>
	         		<SubMenu key="sub4" title={<span><Icon type="smile-o" /><span>校园新闻</span></span>}>
	         			<Menu.Item key="41"  onClick={()=>{this.changeTitle('校园新闻', '校园风采')}}>
			              	<Link to="/main" ><Icon type="profile" />校园风采</Link>
			            </Menu.Item>
	         		</SubMenu>
	         		<SubMenu key="sub5" title={<span><Icon type="smile-o" /><span>班级名单</span></span>}>
	         			{this.state.classNames.map((item, i)=>{
	         				return (
		         				<Menu.Item key={`5`+i} onClick={()=>this.changeTitle('班级名单', item)}>
				              		<ShowClassName oname={item} />
				            	</Menu.Item>
			            	);
	         			})}
	         		</SubMenu>
	         		{manager}
	         	</Menu>
		);
	}
}


const mapDispatchToProps = (dispatch) => {
	return {
		getGrades: (val)=>{dispatch(getGrades(val))},
		getClassNames: (val)=>{dispatch(getClassNames(val))}
	}
}

export default connect(undefined, mapDispatchToProps)(Side);

