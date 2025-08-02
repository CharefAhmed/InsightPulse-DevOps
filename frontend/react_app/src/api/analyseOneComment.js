import api from './axiosInstance';

const analyseOneComment=(body)=>api.post(`analyse/oneComment`,body);
export default analyseOneComment;