import React from "react";
import { Link } from "react-router-dom";
import { Icon } from 'antd';
import { connect } from "react-redux";
import { changeTargetClass } from '../reducers/action';

class ShowClassName extends React.Component{

	changeTargetClass =(e)=>{
		this.props.changeTargetClass(e.target.innerText);
	}

	render(){
		return(
			<Link to="/main/classStudents" onClick={this.changeTargetClass}><Icon type="profile" />{this.props.oname}</Link>
		)
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		changeTargetClass: (val)=>{dispatch(changeTargetClass(val))}
	}
}

export default connect(undefined, mapDispatchToProps)(ShowClassName);