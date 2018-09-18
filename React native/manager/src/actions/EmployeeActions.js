import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    EMPLOYEE_UPDATE,
    EMPLOYEE_CREATE,
    EMPLOYEES_FETCH_SUCCESS
} from './types';

export const employeeUpdate = ({ prop, value }) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: { prop, value }
    };
};

// Go to https://console.firebase.google.com/project/manager-9c412/database/manager-9c412/data to check what we just create

export const employeeCreate = ({ phone, name, shift }) => {
    const { currentUser } = firebase.auth();
    console.log('currentUser', currentUser);
    console.log(`phone:${phone} name:${name} shift:${shift}`);

    return (dispatch) => {
        // ES6 coding style `${}`
        firebase.database().ref(`users/${currentUser.uid}/employees`)
            .push({ name, phone, shift })
            .then(() => {
                dispatch({ type: EMPLOYEE_CREATE });
                Actions.pop();
            });
    };
};

export const employeeFetch = () => {
    const { currentUser } = firebase.auth();
    console.log('currentUser', currentUser);

    return (dispatch) => {
        firebase.database().ref(`users/${currentUser.uid}/employees`)
            .on('value', snapshot => {
                dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};
