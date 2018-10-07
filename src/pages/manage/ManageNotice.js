import React from 'react';
import {List, Button, Popconfirm, message } from 'antd';

class ManagerNotice extends React.Component{

	constructor(){
		super();
		this.state = {
			noticeInfo: []
		}
	}
	
	componentWillMount(){
		this.getNoticeInfo();
	}

	// 请求公告列表
	getNoticeInfo(){
		window.Axios.post(window.ApiName.noticeInfo).then(res=>{
			this.setState({
				noticeInfo: res.data
			})
		}).catch(err=>{
			console.log(err);
		})
	}

	// 提交删除招聘
	deleteNotice = (id) =>{
		var that = this;
		var params = {
			noticeId: id
		}

		window.Axios.post(window.ApiName.deleteNotice, params).then(res=>{
			message.info("删除成功");
			setTimeout(function(){
				that.getNoticeInfo();
			}, 1000);
		}).catch(err=>{
			console.log(err);
		})
	}

	render(){

		return(
				<div className="employ">
					<List
				     	header={<h3>公告列表</h3>}
				      	bordered
				     	dataSource={this.state.noticeInfo}
				     	 renderItem={(item, i) => (
				      	<List.Item>
				      		<p style={{display: 'block', width: '100%', clear: "both"}}>
				      			{i+1}、{item.notice_content} {item.teacher_name} {item.grade}
				      			<Popconfirm title="确定删除该公告吗" 
				      			 onConfirm={()=>{this.deleteNotice(item.unique_notice_id)}} 
				      			 	okText="确定" cancelText="取消">
								   	<Button type='danger' 
								   		style={{float: "right"}}>
								   		删除
								   	</Button>
								 </Popconfirm>
				      			
				      		</p>
				      	</List.Item>)} />
				</div>	
		);
	}
}

export default  ManagerNotice;