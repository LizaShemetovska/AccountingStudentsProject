const intialState = {
    user: {},
    isAuthenticated: false,
    loading: false,
    errors: null
}

const AccountReducer = (state = intialState, action) => {
    switch (action.type) {
        case "REGISTER_FAILED":
                return {
                    ...state, 
                    loading: false,
                    errors: action.payload
        }

        case "LOGIN_FAILED":
                return {
                    ...state, 
                    loading: false,
                    errors: action.payload
                }
        case "SET_AUTH_TOKEN":
                    const { token,role} = action.payload;
                    localStorage.setItem("studAcc-Token", token);
                    localStorage.setItem("studAcc-Role", role);
                    return {
                        ...state, 
                        user: action.payload,
                        isAuthenticated: true,
                        loading: false,
                    };
                    
        case "LOGOUT":
            localStorage.removeItem("studAcc-Token");
            localStorage.removeItem("studAcc-Role");
            return{
                ...state,
                isAuthenticated: false,
                user: null
            }
      
        default:
            return state;
    }
}
export default AccountReducer;