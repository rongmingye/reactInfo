import React from "react";
import { List, Row, Input, Modal, Button, message } from 'antd';
import date from '../../config/date.js';

import Reply from './Reply'

class Question extends React.Component{
	constructor(){
		super();
		this.state = {
			questionInfo: "",
			commentsInfo: [],
			replysInfo: [],
			commentVisible: false,
			replyVisible: false,
			questionAuthor: "",
			replyAuthor: "",
			commentId: "",
		}
	}
	componentDidMount(){
		this.getQuestion();
		this.getComments();
		this.getReplys();
	}


	// 获取话题信息
	getQuestion =()=>{
		var params = {
			questionId: sessionStorage.getItem("questionId")
		}
		window.Axios.post(window.ApiName.boardGetQuestion, params).then(res=>{
			this.setState({
				questionInfo: res.data,
				questionAuthor: res.data.question_author
			})
		}).catch(err=>{
			console.log(err);
		})
	}

	// 获取话题的评论信息
	getComments =()=>{
		var params = {
			questionId: sessionStorage.getItem("questionId")
		}
		window.Axios.post(window.ApiName.boardGetComments, params).then(res=>{
			// console.log(res);
			this.setState({
				commentsInfo: res.data,
			})
		}).catch(err=>{
			console.log(err);
		})
	}

	// 获取话题的回复信息
	getReplys =()=>{
		var params = {
			questionId: sessionStorage.getItem("questionId")
		}
		window.Axios.post(window.ApiName.boardGetReplys, params).then(res=>{
			// console.log(res);
			this.setState({
				replysInfo: res.data,
			})
		}).catch(err=>{
			console.log(err);
		})
	}

	//  评论
	showCommentModal = () => {
		this.setState({
			commentVisible: true
		})
	}

	handleCancel = (e) => {
	    this.setState({
	      	commentVisible: false,
	      	replyVisible: false,
	    });
	}

	// 提交新评论
	submitComment = (e) =>{
		var that = this;
		var author = sessionStorage.getItem("username");
		if(sessionStorage.getItem("studentClass")){
			author = sessionStorage.getItem("studentClass")+" "+author
		}
		var params = {
			questionId: sessionStorage.getItem("questionId"),
			author: author,
			target: this.state.questionAuthor,
			content: document.querySelector("#commentContent").value,
			timer: date.currentMinute()
		}
		// console.log(params);
		window.Axios.post(window.ApiName.boardPublicComment, params).then(res=>{
			// console.log(res);
			message.info("发布评论成功");
			window.setTimeout(function(){
				that.setState({
					commentVisible: false
				});
				that.getComments();
			}, 500);
		}).catch(err=>{
			console.log(err);
		})
	}

	// 回复
	showReplyModal =(id, author)=>{
		this.setState({
			replyVisible: true,
			commentId: id,
			replyAuthor: author,
		})
	}

	// 提交新回复
	submitReply = (e) =>{
		var that = this;
		var author = sessionStorage.getItem("username");
		if(sessionStorage.getItem("studentClass")){
			author = sessionStorage.getItem("studentClass")+" "+author
		}
		var params = {
			questionId: sessionStorage.getItem("questionId"),
			commentId: this.state.commentId,
			author: author,
			target: this.state.replyAuthor,
			content: document.querySelector("#replyContent").value,
			timer: date.currentMinute()
		}
		// console.log(params);
		window.Axios.post(window.ApiName.boardPublicReply, params).then(res=>{
			// console.log(res);
			message.info("发布回复成功");
			window.setTimeout(function(){
				that.setState({
					replyVisible: false
				});
				that.getReplys();
			}, 500);
		}).catch(err=>{
			console.log(err);
		})
	}


	render(){
		var question = this.state.questionInfo;
		var commentsInfo = this.state.commentsInfo;
		return (
			<div className="question">
				<h3 style={{textAlign: 'center', fontSize: "20px", clear: "both"}}>
					{question.question_content}
					<span style={{float: "right"}}>作者：{question.question_author}&nbsp;&nbsp;{question.timer}</span>
				</h3>
				<Button type="primary" onClick={this.showCommentModal} style={{marginBottom: '10px'}}>发布评论</Button>
		        <Modal
		          	title="发布评论"
		         	visible={this.state.commentVisible}
		         	onOk={this.submitComment}
		          	onCancel={this.handleCancel}
		          	width="800px"
		          	cancelText="取消"
		          	okText="提交"

		        >
		        	 <Input.TextArea rows='4' id="commentContent"></Input.TextArea>
		        </Modal>
		        <Modal
		          	title="发布回复"
		         	visible={this.state.replyVisible}
		         	onOk={this.submitReply}
		          	onCancel={this.handleCancel}
		          	width="800px"
		          	cancelText="取消"
		          	okText="提交"
		        >
		        	 <Input.TextArea rows='4' id="replyContent"></Input.TextArea>
		        </Modal>

		       	<List
					header={<h3>评论列表</h3>}
					bordered
					locale={'没有评论喔'}
					dataSource={commentsInfo}
					renderItem={item=>(
					<List.Item>
						<div>
							<Row>{item.comment_author}: {item.comment_content}</Row>
							<Row>
								<span style={{marginLeft: "0"}}>{item.comment_timer}</span>
								<span style={{marginLeft: "20px"}} onClick={()=>this.showReplyModal(item.comment_id, item.comment_author)}>回复</span>
							</Row>
							<Row>
								<Reply replys={this.state.replysInfo} commentId={item.comment_id} />
							</Row>
						</div>
					</List.Item>
					)}/>
			</div>	
		);
	}
}


export default Question;

