import React, { Component } from 'react';
import './App.css';
import { Layout, Row, Col, Icon, Popconfirm} from 'antd';

// 引入所有基础配置
import './config/globalConfig';
import fresh from './config/fresh'

// 引入导航组件
import { BrowserRouter, Switch, Route} from "react-router-dom";

// 引入组件
import UserMenu from './components/UserMenu';
import Side from './components/Side';

// 引入页面组件
import Login from './pages/login/Login';
import StudentPractice from './pages/studentPractice/StudentPractice';
import TeacherPractice from './pages/teacherPractice/TeacherPractice';

import Employ from './pages/employ/Employ';
import PublicEmploy from './pages/employ/PublicEmploy';
import ManagerEmploy from './pages/employ/ManagerEmploy';
import Board from './pages/board/Board';
import Question from './pages/board/Question';
import ManagerQuestion from './pages/board/ManagerQuestion';
import News from './pages/news/News';
import ManageNews from './pages/news/ManageNews';
import ClassStudents from './pages/classStudents/ClassStudents';


// 引入样式文件
import "antd/dist/antd.css";
import './App.css';

const { Header, Sider, Content } = Layout;

class App extends Component{
    render() {
        return (
            <div className="app">
                <BrowserRouter>    
                    <Switch>
                        <Route exact path='/' component={Login} />
                        <Route path='/main' component={Main} ></Route>
                    </Switch>
                </BrowserRouter>
            </div>  
        );
    }
}

class Main extends Component {
    state = {
        collapsed: false,
        marginLeft: 200,
        logo: "高本协同管理系统"
    };

    // 判断有没有登陆
    componentWillMount(){
        // this.props.history.replace('/main');
        fresh();
        var isLogin = window.sessionStorage.getItem("isLogin");
        if(!isLogin){
            this.props.history.push("/"); // 没有登陆过就返回login页面
        }
    }



    // 侧边的折叠
    toggle = () => {
        if(!this.state.collapsed){ // 合上的时候
            this.setState({
                collapsed: !this.state.collapsed,
                logo: this.state.collapsed? '高本协同管理系统': '系统',
            });
            var that = this;
            setTimeout(function(){
                that.setState({
                    marginLeft: that.state.collapsed? 80 : 200,
                });
            }, 80);
        }else{ // 展开的时候
            this.setState({
                collapsed: !this.state.collapsed,
                logo: this.state.collapsed? '高本协同管理系统': '系统',
                marginLeft: this.state.collapsed? 200 : 80,

            });
        }
    }

    // 退出系统
    logout = () => {
        this.props.history.push('/');
        sessionStorage.clear();
    }

    render() {
        return (
            <div>
                <Layout>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                        style={{ overflow: 'auto', height: '100vh'}}
                        className="sidebar"
                    >   
                        <div className="logo" style={{color:'#fff', textAlign:'center', height:"50px",
                            lineHeight:"50px", fontSize: "18px"}}>
                            {this.state.logo}
                        </div>
                        <Side /> 
                    </Sider>

                    <Layout style={{ overflow: 'auto', height: '100vh'}}>
                        <Header className="header" style={{ background: '#fff', padding: "0 24px", height: '8vh'}}>
                            <Row>
                                <Col span={2}>
                                    <Icon
                                        className="trigger"
                                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                        onClick={this.toggle} />
                                </Col>
                                
                                <Col span={18} style={{fontSize: "8px"}}>
                                    <span>{sessionStorage.getItem('title1')}</span>
                                    &nbsp;&nbsp;<Icon type="double-right" />&nbsp;&nbsp;
                                    <span>{sessionStorage.getItem('title2')}</span>
                                </Col>
                            
                                <Col span={2}>
                                    <UserMenu/>
                                </Col>
                                <Col span={2}>
                                    <Popconfirm title="确定要退出系统" onConfirm={this.logout} okText="确定" cancelText="取消"> 
                                        <Icon type="poweroff" />
                                    </Popconfirm >
                                </Col>
                            </Row>
                        </Header>

                        <Content style={{ padding: 24, background: '#fff', height: '92vh',  overflow: 'auto', }}>
                            <Switch>
                                <Route exact path='/main' component={News} />
                                <Route path='/main/studentPractice' component={StudentPractice} />
                                <Route path='/main/teacherPractice' component={TeacherPractice} />

                                <Route path='/main/employ' component={Employ} />      
                                <Route path='/main/PublicEmploy' component={PublicEmploy} />
                                <Route path='/main/board' component={Board} />
                                <Route path='/main/question' component={Question} />
                                <Route path='/main/classStudents' component={ClassStudents} />

                                <Route path='/main/manageNews' component={ManageNews} />
                                <Route path='/main/managerEmploy' component={ManagerEmploy} />
                                <Route path='/main/managerQuestion' component={ManagerQuestion} />
                            </Switch>
                        </Content>
                     </Layout>

                </Layout>
            </div>
        );
    }
}

export default App;
