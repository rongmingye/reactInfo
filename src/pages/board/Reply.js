import React from "react";
import { Row,  Input, Modal,  message } from 'antd';
import date from '../../config/date.js';


// 回复的组件
class Reply extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			replyVisible: false,
			replyAuthor: "",
			commentId: "",
		}
	}

	showReplyModal =(id, author)=>{
		this.setState({
			replyVisible: true,
			commentId: id,
			replyAuthor: author,
		})
	}

	handleCancel = (e) => {
	    this.setState({
	      	replyVisible: false,
	    });
	}

	submitReply = (e) =>{
		var author = sessionStorage.getItem("username");
		if(sessionStorage.getItem("studentClass")){
			author = sessionStorage.getItem("studentClass")+" "+author
		}
		var params = {
			questionId: sessionStorage.getItem("questionId"),
			commentId: this.state.commentId,
			author: author,
			target: this.state.replyAuthor,
			content: document.querySelector("#replyContent2").value,
			timer: date.currentMinute()
		}
		// console.log(params);
		window.Axios.post(window.ApiName.boardPublicReply, params).then(res=>{
			// console.log(res);
			message.info("发布评论成功");
			window.setTimeout(function(){
				window.location.reload();
			}, 500);
		}).catch(err=>{
			console.log(err);
		})
	}

	render(){
		var currentReplys = this.props.replys.map((item, i)=>{
			if(parseInt(item.comment_id, 10) === parseInt(this.props.commentId, 10)){
				return (
					<div key={i}>
						<Row>{item.reply_author}@{item.target_name}: {item.reply_content}</Row>
						<Row>
							<span style={{marginLeft: "0"}}>{item.reply_timer}</span>
							<span style={{marginLeft: "10px"}} onClick={()=>this.showReplyModal(item.comment_id, item.reply_author)}>回复</span>
						</Row>
					</div>
				);
			}
			return null;
		});

		return(
			<div style={{marginLeft: '20px'}}>
				{currentReplys}
				 <Modal
		          	title="发布回复"
		         	visible={this.state.replyVisible}
		         	onOk={this.submitReply}
		          	onCancel={this.handleCancel}
		          	width="800px"
		          	cancelText="取消"
		          	okText="提交"
		        >
		        	<Input.TextArea rows='4' id="replyContent2"></Input.TextArea>
		        </Modal>
			</div>
		)
	}
}


export default Reply;