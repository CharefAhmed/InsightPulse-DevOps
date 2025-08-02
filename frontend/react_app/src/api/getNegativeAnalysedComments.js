import api from "./axiosInstance";

const getNegativeAnalysedComments=()=> {
    return api.get('comments?sentiment=Negative');
}
export default getNegativeAnalysedComments;