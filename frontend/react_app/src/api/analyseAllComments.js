import api from './axiosInstance'

const analyseAllComments = async (comments) => {
    return api.post('/analyse', comments); 
};

export default analyseAllComments;
