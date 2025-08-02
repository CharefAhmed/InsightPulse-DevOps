import { useContext,useState, } from "react";
import DataContext from "../context/DataContext";
import { IoIosArrowDown } from "react-icons/io";



const AnalyseCommentsList=()=>{
    const {analysedComments,posAnalysedComments,neuAnalysedComments,negAnalysedComments}=useContext(DataContext);
    const [filtValue,setFiltValue]=useState('Tous');
    const handleClick=(el)=>{
        setFiltValue(el.textContent)
    }

    return (
        <>
            { analysedComments.length>0 && <div className='analysedComments' id='analysedComments'>
                <div className='title'>
                    <h3>Tous les Commentaires Analysés</h3>
                    <p>Liste détaillée avec filtres de recherche par type de sentiment.</p>
                    <div className='btnFiltre' tabIndex={0}  onClick={()=>{
                            const btnIcon=document.getElementsByClassName('iconFiltre')[0];
                            btnIcon.classList.toggle('rotated');
                            const boxSent=document.getElementsByClassName('boxSentiment')[0];
                            boxSent.classList.toggle('displayed');
                        
                        }} 
                        onBlur={()=>{
                            const btnIcon = document.getElementsByClassName('iconFiltre')[0];
                            const boxSent = document.getElementsByClassName('boxSentiment')[0];
                            boxSent.classList.remove('displayed');
                            btnIcon.classList.remove('rotated');
                        }
                        }>
                        <span>{filtValue}</span> 
                        <IoIosArrowDown className='iconFiltre'/>
                        <div className='boxSentiment'>
                            <div onClick={(e)=> handleClick(e.target)}>Tous</div>
                            <div onClick={(e)=> handleClick(e.target)}>Positif</div>
                            <div onClick={(e)=> handleClick(e.target)}>Neutre</div>
                            <div onClick={(e)=> handleClick(e.target)}>Négatif</div>
                        </div>
                    </div>   
                </div>
                <div className='analysedCommentsBox'>
                    <table>
                        <thead>
                            <tr>
                                <th>Commentaire</th>
                                <th>Author</th>
                                <th>Sentiment</th>
                                <th>Score</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {( filtValue==='Tous' ? analysedComments:filtValue==='Positif'?posAnalysedComments:filtValue==='Neutre'?neuAnalysedComments:negAnalysedComments )?.map((comment,i)=>{
                                return (
                                    <tr key={i}>
                                        <td>{comment.content}</td>
                                        <td>{comment.author}</td>
                                        <td>{comment.sentiment.sentiment || 'N/A'}</td>
                                        <td>{`${comment.sentiment.score || 'N/A'} / 5`}</td>
                                        <td>{comment.updateAt.toString().slice(0, 10)}</td>
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
export default AnalyseCommentsList;