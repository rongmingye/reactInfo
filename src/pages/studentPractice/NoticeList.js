import React from "react";
import { List, Row } from 'antd';

class NoticeList extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			notices: []
		}
	}

	componentDidMount(){
		this.getNotices()
	}

	 // 请求学生的公告 或者 老师自己发布的公告
	 // params: {studentId}
	getNotices(){
		var params = {
			studentId: sessionStorage.getItem("account")
		}
		window.Axios.post(window.ApiName.studentNotices, params).then(res=>{
			this.setState({
				notices: res.data,
			})
		}).catch(err=>{
			console.log(err);
		})
	}

	render(){
		return (
			<div className="teacher">
				<h3 className="show-list-title" >
					公告列表
				</h3>
				<List 
					dataSource={this.state.notices}
					renderItem={item=>(
						<List.Item>
							<div>
								<Row>内容：{item.notice_content}</Row>
								<Row>
									<span style={{marginLeft: "0"}}>发布者：{item.teacher_name}</span>
									<span style={{marginLeft: "20px"}}>{item.timer}</span>
									<span style={{marginLeft: "20px"}}>{item.notice_type === '1'?"实习公告":""}</span>
									<span style={{marginLeft: "20px"}}>{sessionStorage.userType === 'teacher'?item.grade:""}</span>
								</Row>
							</div>
						</List.Item>
					)}/>	
			</div>	
		);
	}
}

export default NoticeList;