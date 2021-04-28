
export const registerError = (error) => {
    return{
        type: "REGISTER_FAILED",
        payload: error
    }
}
export const loginRequested  = () => {
    return {
        type: "LOGIN_REQUESTED"
    }
}

export const loginError = (error) => {
    return{
        type: "LOGIN_FAILED",
        payload: error
    }
}

export const loginSuccess = (user) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: user
    }
}

export const loginWithToken = (user) => {
    return{
        type: "SET_AUTH_TOKEN",
        payload: user
    }
}
export const logout = () => {
    return{
        type: "LOGOUT"
    }
}
