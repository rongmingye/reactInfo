import { combineReducers } from 'redux';

import {targetClass} from './targetClass.js';
import {grades} from './grades.js';
import {classNames} from './classNames.js';

const reducers = combineReducers({
	targetClass,
	grades,
	classNames
});

export default reducers;