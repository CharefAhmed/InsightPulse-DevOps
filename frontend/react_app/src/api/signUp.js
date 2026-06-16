import api from './axiosInstance';

const signUp=({username,email,password})=>{
    return api.post('users',{username,email,password});
}
export default signUp;