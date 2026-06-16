import api from './axiosInstance';

const login=({email,password})=>{
    return api.post('/auth/login',{email,password});
}
export default login;