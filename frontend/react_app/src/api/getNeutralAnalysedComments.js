import api from "./axiosInstance";

const getNeutralAnalysedComments=()=> {
    return api.get('comments?sentiment=Neutral');
}
export default getNeutralAnalysedComments;