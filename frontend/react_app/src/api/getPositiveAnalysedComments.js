import api from "./axiosInstance";

const getPositiveAnalysedComments=()=> {
    return api.get('comments?sentiment=Positive');
}
export default getPositiveAnalysedComments;