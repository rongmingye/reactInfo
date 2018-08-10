import React from 'react';
import {Collapse} from 'antd';
import './employ.css'

const Panel = Collapse.Panel;

class Employ extends React.Component{

	constructor(){
		super();
		this.state = {
			employInfo: []
		}
	}

	// 请求招聘信息
	componentWillMount(){
		window.Axios.post(window.ApiName.employInfo).then(res=>{
			this.setState({
				employInfo: res.data
			})
		}).catch(err=>{
			console.log(err);
		})
	}

	render(){
		// 遍历招聘信息
		var dataSource = [];
		this.state.employInfo.map((item, i)=>{
			dataSource.unshift(item);
			return null;
		});
		var employList = dataSource.map((item, i)=>{
			return(
					<Panel header={<h3>{i+1}、{item.company}</h3>} key={i}>
					     <div className="employ-content">
							<div><span> 公司：</span><p>{item.company} </p></div>
							<div><span> 地址：</span><p>{item.address} </p></div>
							<div><span> 职位：</span><p>{item.post} </p></div>
							<div><span> 要求：</span><p dangerouslySetInnerHTML={{ __html: item.required }}  /> </div>  
							<div><span> 工资：</span><p>{item.salary} </p></div>
							<div><span> 吃住：</span><p>{item.eatLive} </p></div>
							<div><span> 联系人：</span> <p>{item.relation}</p></div>
						</div>	
					</Panel>
			);
		});

		return(
				<div className="employ">
					<Collapse defaultActiveKey={[]}>
					    {employList}
					</Collapse>
				</div>	
		);
	}
}

export default Employ;