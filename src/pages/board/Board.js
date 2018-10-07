import React from "react";
import { Table, Row, Col, Input, Modal, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import date from '../../config/date.js';

class Board extends React.Component{
	constructor(){
		super();
		this.state = {
			questions: [],
			visible: false
		}
	}

	componentDidMount(){
		this.getQuestions();
	}

	// 获取话题列表信息
	getQuestions =()=>{
		window.Axios.post(window.ApiName.boardGetQuestions).then(res=>{
			this.setState({
				questions: res.data
			})
		}).catch(err=>{
			console.log(err);
		})
	}

	showModal = () => {
		this.setState({
			visible: true
		})
	}

	handleCancel = (e) => {
	    this.setState({
	      	visible: false,
	    });
	}

	// 提交新话题
	submitQuestion = (e) =>{
		var that = this;
		var author = sessionStorage.getItem("username");
		if(sessionStorage.getItem("studentClass")){
			author = sessionStorage.getItem("studentClass")+" "+author
		}
		var params = {
			author: author,
			content: document.querySelector("#content").value,
			timer: date.currentMinute()
		}
		console.log(params);
		window.Axios.post(window.ApiName.boardPublicQuestion, params).then(res=>{
			console.log(res);
			message.info("发布话题成功");
			window.setTimeout(function(){
				that.setState({
					visible: false
				});
				that.getQuestions();
			}, 500);
		}).catch(err=>{
			console.log(err);
		})
	}

	linkQuestion = (questionId) => {
		sessionStorage.setItem("questionId", questionId)
	}

	render(){

		var columns = [{
			dataIndex: "question_content",
			title: "话题",
			render: (text, record)=>{
				var item = record;
				return (
					<div >
						<Link to='/main/question' onClick={()=>this.linkQuestion(item.question_id)}>
							<Row>
								<Col> {item.question_content} </Col>
								<Col> 作者：{item.question_author} {item.timer} </Col>
							</Row>
						</Link>
					</div>
				)
			}
		}]
		return (
			<div className="board">
				<Button type="primary" onClick={this.showModal} style={{marginBottom: "10px"}}>发布话题</Button>
		        <Modal
		          	title="发布话题"
		         	visible={this.state.visible}
		         	onOk={this.submitQuestion}
		          	onCancel={this.handleCancel}
		          	width="800px"
		          	cancelText="取消"
		          	okText="提交"
		        >
		        	 <Input.TextArea rows='4' id="content"></Input.TextArea>
		        </Modal>
				<Table dataSource={this.state.questions}  columns={columns} bordered />
				 	
			</div>	
		);
	}
}


export default Board;