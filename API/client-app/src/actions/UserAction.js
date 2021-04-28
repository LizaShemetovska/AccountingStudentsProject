export const usersLoaded = (listUsers) =>{
    return{
        type: "USERS_LOADED",
        payload: listUsers
    };
};