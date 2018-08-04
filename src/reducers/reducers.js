import { combineReducers } from 'redux';

// 目标班级
const targetClass = (state = sessionStorage.getItem('targetClass'), action) => {
	switch(action.type){
		case "TARGET_CLASS": state = action.val; return state;
		default: return state;
	}
}

const reducers = combineReducers({
	targetClass,
});

export default reducers;