import React from 'react';
import { useState } from 'react';
import { uploadFile } from '../api/upload';
import { SlCloudUpload } from "react-icons/sl";

const FileUpload = () => {
    const [file,setFile]=useState(null);
    const [msg,setMsg]=useState('');
    
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
            await uploadFile(file);
            setMsg('File uploaded successfully');
        }catch(error){
            setMsg('Uploaded failed');
            console.error(error);
        }

    };

return (
    <div className='uploadFile'>
        <h3> <SlCloudUpload className='uploadIcon'/> Importer vos commentaires</h3>
        <p>Téléchargez un fichier CSV ou JSON pour commencer l'analyse.</p>
        {msg==='File uploaded successfully' ? <p style={{color:'green',fontWeight:'bold',textAlign:'center'}}>{msg}</p>:<p style={{color:'red',fontWeight:'bold',textAlign:'center'}}>{msg}</p>}
        <form onSubmit={handleSubmit}>
            <label htmlFor='upload' className='labelUpload'>
                <span className='icon'><SlCloudUpload/></span>
                <p>Glissez-déposez votre fichier ici ou cliquez pour sélectionner</p>
                <span>(Fichiers .CSV ou .JSON uniquement)</span>
                <input type='file'id='upload' accept=".csv,.json" onChange={handleChange}/>
            </label>
            
            <button type='submit'>Lancer l'analyse</button>
        </form>
    </div>
)
}

export default FileUpload
