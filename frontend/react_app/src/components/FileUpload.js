import { useState,useEffect,useContext } from 'react';
import { uploadFile } from '../api/upload';
import { SlCloudUpload } from "react-icons/sl";
import analyseOneComment from '../api/analyseOneComment';
import analyseAllComments from '../api/analyseAllComments';
import DataContext from "../context/DataContext";

const FileUpload = () => {
    const [file,setFile]=useState(null);
    const [msg,setMsg]=useState('');
    const [comments,setComments]=useState([]);
    const {handleAllAnalysedComments,userId}=useContext(DataContext);

    const handleChange=(e)=>{
        setFile(e.target.files[0]);
        let button=document.querySelector('.uploadFile form button');
        button.style.opacity='1';
    };
    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(!file){
            setMsg('Please choose file')
            return;
        }
        try{
            let res=await uploadFile(file);
            setComments(res.data);
            localStorage.setItem(`uploadedComments_${userId}`,JSON.stringify(res.data));
            setMsg('File uploaded successfully');
        }catch(error){
            setMsg('Uploaded failed');
            console.error(error);
        }
    };
    useEffect(()=>{
        const saved =JSON.parse(localStorage.getItem(`uploadedComments_${userId}`)||'[]');
        setComments(saved);
    },[]);
    const removeAnalysedComment=(index)=>{
        const commentToAnalyse=comments[index];
        const updatedComments=comments.filter((_,i)=>i!==index);
        setComments(updatedComments);
        localStorage.setItem(`uploadedComments_${userId}`,JSON.stringify(updatedComments));
        return {  
            content:commentToAnalyse.content,
            author:commentToAnalyse.author,
            userId:userId,
        };
    }
    const handleAnalyse=async(i)=>{
        let bodyToSend=removeAnalysedComment(i);
        const res=await analyseOneComment(bodyToSend);
        console.log(res.data);
        await handleAllAnalysedComments();
    }
    const handleAnalyserTout=async()=>{
        const commentToSend=comments.map((comment)=>({...comment,userId: userId}));
        setComments([]);
        await analyseAllComments(commentToSend);  
        localStorage.setItem(`uploadedComments_${userId}`, JSON.stringify([])); 
        await handleAllAnalysedComments();
    }
return (
    <>
        <div className='uploadFile exclude'>
            <h3> <SlCloudUpload className='uploadIcon'/> Importer vos commentaires</h3>
            <p>Téléchargez un fichier CSV ou JSON pour commencer l'analyse.</p>
            {msg==='File uploaded successfully' ? <p style={{color:'green',fontWeight:'bold',textAlign:'center',marginTop:"14px",marginBottom:"0px"}}>{msg}</p>:<p style={{color:'red',fontWeight:'bold',textAlign:'center',marginTop:"14px",marginBottom:"0px"}}>{msg}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor='upload' className='labelUpload'>
                    <span className='icon'><SlCloudUpload/></span>
                    <p>Glissez-déposez votre fichier ici ou cliquez pour sélectionner</p>
                    <span>(Fichiers .CSV ou .JSON uniquement)</span>
                    <input type='file'id='upload' accept=".csv,.json" onChange={handleChange}/>
                </label>
                
                <button type='submit'>Upload</button>
            </form>
        </div>
        {comments.length>0 && <div className='fileComments'>
            <div className='introText'>
                <h3>Commentaires Non Encore Analysés</h3>
                <p>Listes des commentaires importés du fichier</p>
                <div className='analyserTout'>
                    <button onClick={handleAnalyserTout}>Analyser Tout</button>
                </div>
            </div>
            <div className='commentsBox'>
                <table>
                    <thead>
                        <tr>
                            <th>Content</th>
                            <th>Author</th>   
                        </tr>
                    </thead>
                    <tbody>
                        {comments && comments.map((comment,i)=>{
                            return (
                                <tr key={i}>
                                    <td>{comment.content}</td>
                                    <td>{comment.author}</td>
                                    <td className='btnTd' ><button onClick={()=>handleAnalyse(i)}>Analyser</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>}
    </>
)
}
export default FileUpload 
