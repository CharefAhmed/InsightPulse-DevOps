import api from './axiosInstance';

export const uploadFile=async(file)=>{
    const formData=new FormData();
    formData.append('file',file); 
    return api.post('/upload/file',formData,{
        headers:{
            'Content-Type':'multipart/form-data',   
        },
    });
};