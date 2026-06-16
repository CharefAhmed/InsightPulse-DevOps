import api from "./axiosInstance";

const getAllAnalysedComments=(userId)=> {
    return api.get(`comments?userId=${userId}`);
}
export default getAllAnalysedComments;