import React from "react";
import { List } from 'antd';

class News extends React.Component{
	constructor(){
		super();
		this.state = {
			newsInfo: []
		}
	}

	componentDidMount(){
		window.Axios.post(window.ApiName.schoolNews).then( res => {
			// console.log(res);
			this.setState({
				newsInfo: res.data
			})
		}).catch(err => {
			console.log(err);
		})
	}

	render(){
		return (
			<div className="news">
				<List
			      header={<h3>校园风采奖</h3>}
			      bordered
			      dataSource={this.state.newsInfo}
			      renderItem={item => (
			      	<List.Item>
			      	<a href={item.news_link} target='_blank'>
			      		{item.news_title}
			      		<span>{item.timer}</span>
						</a></List.Item>)} />
			</div>	
		);
	}
}


export default News;