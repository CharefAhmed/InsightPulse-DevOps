import api from "./axiosInstance";

const getAllAnalysedComments=()=> {
    return api.get('comments');
}
export default getAllAnalysedComments;