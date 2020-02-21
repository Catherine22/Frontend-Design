import {
    EMPLOYEE_UPDATE,
    EMPLOYEE_CREATE,
    EMPLOYEE_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    phone: '',
    shift: ''
};

export default (state = INITIAL_STATE, action) => {
    console.log('EmployeeFormReducer', action);
    switch (action.type) {
        case EMPLOYEE_UPDATE:
        
            // if we call a action creator with a prop of 'name', the whole segment '[action.payload.prop]' will turn into 'name',
            // like action.payload === { prop: 'name', value: 'jane' }
            return { ...state, [action.payload.prop]: action.payload.value };
        case EMPLOYEE_CREATE: // reset
            return INITIAL_STATE;
        case EMPLOYEE_SAVE_SUCCESS:
            return INITIAL_STATE;
        default:
            return state;
    }
};