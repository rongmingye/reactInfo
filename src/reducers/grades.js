export const getGrades = (val) =>{
	return{
		type: "GRADES",
		val: val
	}
}

// 所有年级
export const grades = (state=[], action) => {
	switch(action.type){
		case "GRADES": state = action.val; return state;
		default: return state;
	}
}