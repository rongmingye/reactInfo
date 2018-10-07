export const getClassNames = (val) =>{
	return{
		type: "CLASSNAMES",
		val: val
	}
}

// 所有班级
export const classNames = (state=[], action) => {
	switch(action.type){
		case "CLASSNAMES": state = action.val; return state;
		default: return state;
	}
}