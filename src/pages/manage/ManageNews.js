import React from 'react';
import { Modal, Button, Form, Input, message, List, Popconfirm} from 'antd';
const FormItem = Form.Item;

class ManagerNews extends React.Component{
		constructor(){
		super();
		this.state = {
			news: [],
			visible: false
		}
	}

	componentWillMount(){
		this.getNews();
	}

	// 请求新闻信息
	getNews(){
		window.Axios.get(window.ApiName.schoolNews).then(res=>{
			this.setState({
				news: res.data
			})
		}).catch(err=>{
			console.log(err);
		})
	}

	// 提交删除新闻
	deleteNews = (id) =>{
		var that = this;
		var params = {
			newsId: id
		}

		window.Axios.post(window.ApiName.deleteNews, params).then(res=>{
			message.info("删除成功");
			setTimeout(function(){
				that.getNews();
			}, 1000);
		}).catch(err=>{
			console.log(err);
		})
	}

	// 模态框
	showModal = () => {
	    this.setState({
	      	visible: true,
	    });
	}

	handleCancel = (e) => {
	    this.setState({
	      	visible: false,
	    });
	}

	render(){
		return(
				<div className="employ">
					<Button type='primary' onClick={this.showModal} style={{marginBottom: '10px'}}>发布新闻</Button>
					<Modal
			          	title="填写/修改实习信息"
			         	visible={this.state.visible}
			         	onOk={this.handleOk}
			          	onCancel={this.handleCancel}
			          	width="800px"
			          	footer={null}
			        >
						<PublicEmploy />
					</Modal>
					<List
				     	header={<h3>新闻列表</h3>}
				      	bordered
				     	dataSource={this.state.news}
				     	 renderItem={(item, i) => (
				      	<List.Item>
				      		<p style={{display: 'block', width: '100%',clear: "both"}}>
				      			{i+1}、{item.news_title}
				      			 <Popconfirm title="确定删除该招聘信息吗" onConfirm={()=>{this.deleteNews(item.news_id)}} 
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




// 填写新闻内容
class PublicNewsForm extends React.Component{

	// 提交新的新闻
	handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFieldsAndScroll((err, values) => {
		    if (!err) {
		        // console.log('Received values of form: ', values);
		        window.Axios.post(window.ApiName.publicNews, values).then(res=>{
		        	// console.log(res);
		        	message.info("发布新闻成功");
		        	window.setTimeout(function(){
		        		sessionStorage.setItem("title1", "校园新闻");
        				sessionStorage.setItem("title2", "校园风采");
		        		window.location.href="/main";
		        	}, 1000);
		        }).catch(err=>{
		        	console.log(err);
		        })
		    }
	    });
	}

	render(){
		const { getFieldDecorator } = this.props.form;
		return(
		 	<Form onSubmit={this.handleSubmit} >
				<FormItem label="标题">
					{getFieldDecorator('news_title', {
			            rules: [{ required: true, message: '请输入标题', whitespace: true }],
			          })(
			           <Input />
			          )}
				</FormItem>
				<FormItem label="链接：">
					{getFieldDecorator('news_link', {
			            rules: [{ required: true, message: '请输入链接', whitespace: true }],
			          })(
			           <Input />
			        )}
				</FormItem>
				<FormItem label="时间：">
					{getFieldDecorator('timer', {
			            rules: [{ required: true, message: '请输入文章的发布时间', whitespace: true }],
			          })(
			           <Input />
			        )}
				</FormItem>
				<FormItem>
					<Button  type="primary" htmlType='submit'>提交</Button>
				</FormItem>
			</Form>
		)
	}
}

const PublicEmploy = Form.create()(PublicNewsForm);

export default  ManagerNews;