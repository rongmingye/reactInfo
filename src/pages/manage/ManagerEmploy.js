import React from 'react';
import {List, Button, Popconfirm, message } from 'antd';

class ManagerEmploy extends React.Component{

	constructor(){
		super();
		this.state = {
			employInfo: []
		}
	}
	
	componentWillMount(){
		this.getEmployInfo();
	}

	// 请求招聘信息
	getEmployInfo(){
		window.Axios.post(window.ApiName.employInfo).then(res=>{
			this.setState({
				employInfo: res.data
			})
		}).catch(err=>{
			console.log(err);
		})
	}

	// 提交删除招聘
	deleteEmploy = (id) =>{
		var that = this;
		var params = {
			employId: id
		}

		window.Axios.post(window.ApiName.deleteEmploy, params).then(res=>{
			message.info("删除成功");
			setTimeout(function(){
				that.getEmployInfo();
			}, 1000);
		}).catch(err=>{
			console.log(err);
		})
	}

	render(){
		var dataSource = [];
		this.state.employInfo.map((item, i)=>{
			dataSource.unshift(item);
			return null;
		});

		return(
				<div className="employ">
					<List
				     	header={<h3>招聘列表</h3>}
				      	bordered
				     	dataSource={dataSource}
				     	 renderItem={(item, i) => (
				      	<List.Item>
				      		<p style={{display: 'block', width: '100%',clear: "both"}}>
				      			{i+1}、{item.company} 
				      			 <Popconfirm title="确定删除该招聘信息吗" onConfirm={()=>{this.deleteEmploy(item.id)}} 
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

export default ManagerEmploy;