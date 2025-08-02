// here was all the code for the rest of importPage.js before using useContext.


// import { useState,useEffect } from 'react';
// import { uploadFile } from '../api/upload';
// import { SlCloudUpload } from "react-icons/sl";
// import analyseOneComment from '../api/analyseOneComment';
// import analyseAllComments from '../api/analyseAllComments';
// import getAllAnalysedComments from '../api/getAllAnalysedComments';
// import { AiOutlineBarChart } from "react-icons/ai";
// import { FiMessageSquare } from "react-icons/fi";
// import { FiCheckCircle } from "react-icons/fi";
// import { PiSmileyMeh } from "react-icons/pi";
// import { PiWarningCircle } from "react-icons/pi";
// import getPositiveAnalysedComments from '../api/getPositiveAnalysedComments';
// import getNeutralAnalysedComments  from '../api/getNeutralAnalysedComments';
// import getNegativeAnalysedComments from '../api/getNegativeAnalysedComments';
// import { FaArrowRight } from "react-icons/fa";
// import { Chart as ChartJS  } from 'chart.js/auto';
// import {Doughnut} from 'react-chartjs-2';
// import { IoIosArrowDown } from "react-icons/io";




// const FileUpload = () => {
//     const [file,setFile]=useState(null);
//     const [msg,setMsg]=useState('');
//     const [comments,setComments]=useState([]);
//     const [analysedComments,setAnalysedComments] =useState([]);
//     const [positivePercentage, setPositivePercentage] = useState(0);
//     const [neutralPercentage, setNeutralPercentage] = useState(0);
//     const [negativePercentage, setNegativePercentage] = useState(0);
//     const [posContent,setPosContent]=useState('');
//     const [neuContent,setNeuContent]=useState('');
//     const [negContent,setNegContent]=useState('');
//     const [filtValue,setFiltValue]=useState('Tous');
//     const [posAnalysedComments,setPosAnalysedComments] =useState([]);
//     const [neuAnalysedComments,setNeuAnalysedComments] =useState([]);
//     const [negAnalysedComments,setNegAnalysedComments] =useState([]);


    
//     const handleChange=(e)=>{
//         setFile(e.target.files[0]);
//         let button=document.querySelector('.uploadFile form button');
//         button.style.opacity='1';
//     };
//     const handleSubmit=async (e)=>{
//         e.preventDefault();
//         if(!file){
//             setMsg('Please choose file')
//             return;
//         }
//         try{
//             let res=await uploadFile(file);
//             setComments(res.data);
//             localStorage.setItem('uploadedComments',JSON.stringify(res.data));
//             setMsg('File uploaded successfully');
//         }catch(error){
//             setMsg('Uploaded failed');
//             console.error(error);
//         }
//     };
//     useEffect(()=>{
//         const saved =JSON.parse(localStorage.getItem('uploadedComments')||'[]');
//         setComments(saved);
//     },[]);
//     useEffect(()=>{
//         const fetchAnalysedComments=async()=>{
//             await handleAllAnalysedComments();
//         }
//         fetchAnalysedComments();
//     },[]); // na7ina analysedComments mi dependecies 
//     const handleAllAnalysedComments=async()=>{
//         const res= await getAllAnalysedComments();
//         setAnalysedComments(res.data);
//         localStorage.setItem('analysedComments',JSON.stringify(res.data));
//     }
//     const removeAnalysedComment=(index)=>{
//         const commentToAnalyse=comments[index];
//         const updatedComments=comments.filter((_,i)=>i!==index);
//         setComments(updatedComments);
//         localStorage.setItem('uploadedComments',JSON.stringify(updatedComments));
//         return {  
//             content:commentToAnalyse.content,
//             author:commentToAnalyse.author,
//         };
//     }
//     const handleAnalyse=async(i)=>{
//         const bodyToSend=removeAnalysedComment(i);
//         await analyseOneComment(bodyToSend);
//         await handleAllAnalysedComments();
//     }
//     const handleAnalyserTout=async()=>{
//         const commentToSend=comments;
//         setComments([]);
//         await analyseAllComments(commentToSend);  
//         localStorage.setItem('uploadedComments', JSON.stringify([])); 
//         await handleAllAnalysedComments();
//         // window.location.reload();
//     }
//     const getPositifNumber=async(analysedComments)=>{
//         const comments = await getPositiveAnalysedComments();
//         const nb=(comments.data.length*100)/analysedComments.length;
//         setPositivePercentage(Math.round(nb));
//         setPosAnalysedComments(comments.data)
//     }
//     const getNeutralNumber=async(analysedComments)=>{
//         const comments = await getNeutralAnalysedComments();
//         const nb=(comments.data.length*100)/analysedComments.length;
//         setNeutralPercentage(Math.round(nb));
//         setNeuAnalysedComments(comments.data)
//     }
//     const getNegatifNumber=async(analysedComments)=>{
//         const comments = await getNegativeAnalysedComments();
//         const nb=(comments.data.length*100)/analysedComments.length;
//         setNegativePercentage(Math.round(nb));
//         setNegAnalysedComments(comments.data)
//     }
//     useEffect(() => {
//         if (analysedComments.length > 0) {
//             getPositifNumber(analysedComments);
//             getNeutralNumber(analysedComments);
//             getNegatifNumber(analysedComments);
//         }        
//     }, [analysedComments]);
    
//     useEffect(() => {
//         const handleCommentsOverview=async()=>{   
//             if(positivePercentage>0){
//                 const posArray = (await getPositiveAnalysedComments()).data;
//                 const pos =posArray[posArray.length-1]['content'];
//                 if(pos){
//             setPosContent(pos);
//             }
//             }
//             if(neutralPercentage>0){
//                 const neuArray = (await getNeutralAnalysedComments()).data;
//                 const neu =neuArray[neuArray.length-1]['content'];
//                 if(neu){
//                 setNeuContent(neu);
//             }
//             }
//             if(negativePercentage>0){
//                 const negArray = (await getNegativeAnalysedComments()).data;
//                 const neg =negArray[negArray.length-1]['content'];
//                 if(neg){
//                 setNegContent(neg);
//             }
//         }
//     }
//         handleCommentsOverview();     
//     },[positivePercentage,neutralPercentage,negativePercentage]);  
//     const handleClick=(el)=>{
//         setFiltValue(el.textContent)
//     }
    
// return (
//     <div className='pageContainer'>
//         <div className='uploadFile'>
//             <h3> <SlCloudUpload className='uploadIcon'/> Importer vos commentaires</h3>
//             <p>Téléchargez un fichier CSV ou JSON pour commencer l'analyse.</p>
//             {msg==='File uploaded successfully' ? <p style={{color:'green',fontWeight:'bold',textAlign:'center',marginTop:"14px",marginBottom:"0px"}}>{msg}</p>:<p style={{color:'red',fontWeight:'bold',textAlign:'center',marginTop:"14px",marginBottom:"0px"}}>{msg}</p>}
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor='upload' className='labelUpload'>
//                     <span className='icon'><SlCloudUpload/></span>
//                     <p>Glissez-déposez votre fichier ici ou cliquez pour sélectionner</p>
//                     <span>(Fichiers .CSV ou .JSON uniquement)</span>
//                     <input type='file'id='upload' accept=".csv,.json" onChange={handleChange}/>
//                 </label>
                
//                 <button type='submit'>Upload</button>
//             </form>
//         </div>
//         {comments.length>0 && <div className='fileComments'>
//             <div className='introText'>
//                 <h3>Commentaires Non Encore Analysés</h3>
//                 <p>Listes des commentaires importés du fichier</p>
//                 <div className='analyserTout'>
//                     <button onClick={handleAnalyserTout}>Analyser Tout</button>
//                 </div>
//             </div>
//             <div className='commentsBox'>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Content</th>
//                             <th>Author</th>   
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {comments && comments.map((comment,i)=>{
//                             return (
//                                 <tr key={i}>
//                                     <td>{comment.content}</td>
//                                     <td>{comment.author}</td>
//                                     <td className='btnTd' ><button onClick={()=>handleAnalyse(i)}>Analyser</button></td>
//                                 </tr>
//                             );
//                         })}
//                     </tbody>
//                 </table>
//             </div>
//         </div>}
//         {analysedComments.length>0 && <div className='analysedComments'>
//             <div className='introText'>
//                 <h3><AiOutlineBarChart className='icon'/>Résultats de l'analyse</h3>
//                 <p>Aperçu des sentiments détectés dans vos commentaires.</p>
//             </div>
//             <div className='stats'>
//                 <div className='totalComments'><FiMessageSquare className='icon'/>Total Commentaires <div className='valeur'>{analysedComments.length}</div></div>
//                 <div className='positifs'> <FiCheckCircle className='icon'/>Positifs <div className='valeur'>{positivePercentage}%</div></div>
//                 <div className='neutres'><PiSmileyMeh className='icon'/>Neutres <div className='valeur'>{neutralPercentage}%</div></div>
//                 <div className='negatifs'><PiWarningCircle className='icon'/>Négatifs <div className='valeur'>{negativePercentage}%</div></div>
//             </div>
//             <div className='twoBoxesContainer'>
//                 <div className='chartContainer'>
//                     <div className='introText'>
//                         <h3>Répartition des Sentiments</h3>
//                         <p>Distribution des sentiments dans le fichier importé.</p>
//                     </div>
//                     <div className='chart'>
//                         <Doughnut
//                         data={{
//                             labels:[`Positif : ${positivePercentage}%`,`Neutre : ${neutralPercentage}%` ,`Négatif : ${negativePercentage}%`],
//                             datasets:[{
//                                 data:[positivePercentage,neutralPercentage,negativePercentage],
//                                 backgroundColor:[
//                                     '#28c762',
//                                     '#c9a71f',
//                                     '#c63535ff'
//                                 ]
//                             }]
//                         }}
//                         options={{
//                             maintainAspectRatio:false,
//                             responsive:true,
//                             plugins:{
//                                 legend:{
//                                     position:'bottom',
//                                     labels:{
//                                         usePointStyle:true,
//                                         pointStyle: 'circle', 
//                                     }
//                                 },
//                                 tooltip:{
//                                     callbacks:{
//                                         title:()=>'',
//                                         label:function(context){ return context.label;}
//                                     }
//                                 }
//                             }
                            
//                         }}
//                         />
//                     </div>
//                 </div>
//                 <div className='comments'>
//                     <div className='introText'>
//                         <h3>Aperçu des Commentaires</h3>
//                         <p>Quelques commentaires analysés récemment.</p>  
//                     </div> 
//                     {posContent && <div className='oneComment'>{posContent} <span className='posSpan'><FiCheckCircle className='icon'/><span>Positif</span></span></div>}
//                     {neuContent && <div className='oneComment'>{neuContent} <span className='neuSpan'><PiSmileyMeh className='icon'/><span>Neutre</span></span></div>}
//                     {negContent && <div className='oneComment'>{negContent} <span className='negSpan'><PiWarningCircle className='icon'/><span>Negatif</span></span></div>}
//                     <a href='#analysedComments' style={{textDecoration:'none'}}><button>Voir tous les commentaires <FaArrowRight className='iconBtn'/></button></a>
//                 </div>
//             </div>
//         </div>}
//         { analysedComments.length>0 && <div className='analysedComments' id='analysedComments'>
//             <div className='title'>
//                 <h3>Tous les Commentaires Analysés</h3>
//                 <p>Liste détaillée avec filtres de recherche par type de sentiment.</p>
//                 <div className='btnFiltre' onClick={()=>{
//                         const btnIcon=document.getElementsByClassName('iconFiltre')[0];
//                         btnIcon.classList.toggle('rotated');
//                         const boxSent=document.getElementsByClassName('boxSentiment')[0];
//                         boxSent.classList.toggle('displayed');
//                     }}>
//                     <span>{filtValue}</span> 
//                     <IoIosArrowDown className='iconFiltre'/>
//                     <div className='boxSentiment'>
//                         <div onClick={(e)=> handleClick(e.target)}>Tous</div>
//                         <div onClick={(e)=> handleClick(e.target)}>Positif</div>
//                         <div onClick={(e)=> handleClick(e.target)}>Neutre</div>
//                         <div onClick={(e)=> handleClick(e.target)}>Négatif</div>
//                     </div>
//                 </div>   
//             </div>
//             <div className='analysedCommentsBox'>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Commentaire</th>
//                             <th>Author</th>
//                             <th>Sentiment</th>
//                             <th>Score</th>
//                             <th>Date</th>
//                         </tr>
//                     </thead>
//                     <tbody>
                        
//                         {( filtValue==='Tous' ? analysedComments:filtValue==='Positif'?posAnalysedComments:filtValue==='Neutre'?neuAnalysedComments:negAnalysedComments )?.map((comment,i)=>{
//                             return (
//                                 <tr key={i}>
//                                     <td>{comment.content}</td>
//                                     <td>{comment.author}</td>
//                                     <td>{comment.sentiment.sentiment}</td>
//                                     <td>{`${comment.sentiment.score} / 5`}</td>
//                                     <td>{comment.updateAt.toString().slice(0, 10)}</td>
//                                 </tr>
//                             );
//                         })}
//                     </tbody>
//                 </table>
                
//             </div>
                
//         </div>}
//     </div>
// )
// }

// export default FileUpload 
