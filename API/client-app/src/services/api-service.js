import axios  from 'axios';

axios.defaults.baseURL = "/api";
axios.interceptors.request.use((config) => {
const token = window.localStorage.getItem('studAcc-Token');
if(token) {
config.headers.Authorization = `Bearer ${token}`;
}
return config;
}, error =>{
return Promise.reject(error);
})

const responseBody = (response) => response.data;

const requests = {
    get: (url) => axios.get(url).then().then(responseBody),
    post: (url, body) => axios.post(url, body).then().then(responseBody),
    put: (url, body) => axios.put(url, body).then().then(responseBody),
}

const User = {
    listUsers: (numberPage) => requests.get(`/user/adminList/${numberPage}`),
    register: (user) => requests.post(`/user/register`, user),
    login: (user) => requests.post(`/user/login`, user),
    updateUser: (user) => requests.put("/user/", user),
    getUserById: (Id) => requests.get(`/user/${Id}`),
}
export default  class ApiStoreService{

    async register(user){
            const  data = await User.register(user)
            .then((responce) => {
                return {     
                    data: responce
                }
            }).catch(error => {
                return error.response;
            })
            return data;
    }
    async login(user){
        const  data = await User.login(user)
        .then((responce) => {
            return {     
                data: responce
            }
        }).catch(error => {
            return error.response;
        })
        return data;
    }
    async getAllUsers(numberPage){
        const ListUsers = await User.listUsers(numberPage)
        .then((responce) => {
            return responce;
        })
        .catch(error => {
            return error.responce;
        });
        return ListUsers;
    }
    async updateUser(user) {
        const users = await User.updateUser(user)
        .then((responce) => {
            return responce;
        }).catch(error => {
            return error.response;
        })
        return users;
    }
    async getUserById(Id) {
        const user = await User.getUserById(Id)
        .then((responce) => {
            return responce;
        }).catch(error => {
            return error.response;
        })
        return user;
    }
}