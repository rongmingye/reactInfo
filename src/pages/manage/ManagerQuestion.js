import React from 'react';
import {List, Button, Popconfirm, message } from 'antd';

class ManagerQuestion extends React.Component{

	constructor(){
		super();
		this.state = {
			questions: []
		}
	}

	componentWillMount(){
		this.getQuestions();
	}

	// 请求话题信息
	getQuestions(){
		window.Axios.get(window.ApiName.boardGetQuestions).then(res=>{
			this.setState({
				questions: res.data
			})
		}).catch(err=>{
			console.log(err);
		})
	}

	// 提交删除话题
	deleteQuestion = (id) =>{
		var that = this;
		var params = {
			questionId: id
		}

		window.Axios.post(window.ApiName.deleteQuestion, params).then(res=>{
			message.info("删除成功");
			setTimeout(function(){
				that.getQuestions();
			}, 1000);
		}).catch(err=>{
			console.log(err);
		})
	}

	render(){
		var dataSource = [];
		this.state.questions.map((item, i)=>{
			dataSource.unshift(item);
			return null;
		});

		return(
				<div className="employ">
					<List
				     	header={<h3>话题列表</h3>}
				      	bordered
				     	dataSource={dataSource}
				     	 renderItem={(item, i) => (
				      	<List.Item>
				      		<p style={{display: 'block', width: '100%',clear: "both"}}>
				      			{i+1}、{item.question_author} : {item.question_content} 
				      			 <Popconfirm title="确定删除该招聘信息吗" onConfirm={()=>{this.deleteQuestion(item.question_id)}} 
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

export default ManagerQuestion;