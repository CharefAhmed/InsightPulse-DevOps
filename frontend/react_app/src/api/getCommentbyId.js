import api from './axiosInstance';

const getCommentbyId=(id)=>{
    return api.get(`comments/${id}`)
}
export default getCommentbyId;