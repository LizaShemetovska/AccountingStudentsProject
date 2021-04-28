const intialState = {
    user: {},
    ListUsers: [],
    isAuthenticated: false,
    loading: false,
    errors: null
}
const UserReducer = (state = intialState, action) => {
    switch (action.type) {
        case 'USERS_LOADED': 
        return { 
            ...state,
            ListUsers: action.payload,
            loading: false,
         }
        default:
            return state;
    }
}
export default UserReducer;