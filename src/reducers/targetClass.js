export const changeTargetClass = (val) =>{
	return{
		type: "TARGET_CLASS",
		val: val
	}
}

// 目标班级
export const targetClass = (state = sessionStorage.getItem('targetClass'), action) => {
	switch(action.type){
		case "TARGET_CLASS": state = action.val; return state;
		default: return state;
	}
}