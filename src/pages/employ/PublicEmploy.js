import React from 'react';
import { Button, Form, Input, message} from 'antd';
const FormItem = Form.Item;

// 查看招聘信息
class PublicEmployForm extends React.Component{

	handleSubmit = (e) => {
		var that = this;
	    e.preventDefault();
	    this.props.form.validateFieldsAndScroll((err, values) => {
		    if (!err) {
		        // console.log('Received values of form: ', values);
		        window.Axios.post(window.ApiName.employPublish, values).then(res=>{
		        	// console.log(res);
		        	message.info("发布成功");
		        	window.setTimeout(function(){
		        		that.props.history.push('/main/employ');
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
				<FormItem label="公司：">
					{getFieldDecorator('company', {
			            rules: [{ required: true, message: '请输入公司名称', whitespace: true }],
			          })(
			           <Input />
			          )}
				</FormItem>
				<FormItem label="地址：">
					{getFieldDecorator('address', {
			            rules: [{ required: true, message: '请输入公司地址', whitespace: true }],
			          })(
			           <Input />
			        )}
				</FormItem>
				<FormItem label="职位：">
					{getFieldDecorator('post', {
			            rules: [{ required: true, message: '请输入职位', whitespace: true }],
			          })(
			           <Input />
			        )}
				</FormItem>
				<FormItem label="要求：">
					{getFieldDecorator('required', {
			            rules: [{ required: true, message: '请输入要求', whitespace: true }],
			          })(
			           <Input.TextArea rows='4'></Input.TextArea>
			        )}
				</FormItem>
				<FormItem label="工资：">
					{getFieldDecorator('salary', {
			            rules: [{ required: true, message: '请输入工资', whitespace: true }],
			          })(
			           <Input />
			        )}
				</FormItem>
				<FormItem label="吃住：">
					{getFieldDecorator('eatLive', {
			            rules: [{ required: true, message: '请输入吃住情况', whitespace: true }],
			          })(
			           <Input />
			        )}
				</FormItem>
				<FormItem label="联系人：">
					{getFieldDecorator('relation', {
			            rules: [{ required: true, message: '请输入联系人及其电话', whitespace: true }],
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

const PublicEmploy = Form.create()(PublicEmployForm);

export default  PublicEmploy;