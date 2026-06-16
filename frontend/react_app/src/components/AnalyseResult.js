import { AiOutlineBarChart } from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";
import { PiSmileyMeh } from "react-icons/pi";
import { PiWarningCircle } from "react-icons/pi";
import { FaArrowRight } from "react-icons/fa";
import { Chart as ChartJS  } from 'chart.js/auto';
import {Doughnut} from 'react-chartjs-2';
import { useContext,useState,useEffect } from "react";
import DataContext from "../context/DataContext";



const AnalyseResult=()=>{
    const {analysedComments} = useContext(DataContext);
    const {positivePercentage,neutralPercentage,negativePercentage} = useContext(DataContext);
    const [posContent,setPosContent] = useState('');
    const [neuContent,setNeuContent] = useState('');
    const [negContent,setNegContent] = useState('');
    const {handleAllAnalysedComments,userId,} = useContext(DataContext)
    const {posAnalysedComments,neuAnalysedComments,negAnalysedComments} = useContext(DataContext)
    const {printRef} = useContext(DataContext);
    useEffect(()=>{
        handleAllAnalysedComments();

    },[userId]);
    useEffect(() => {
        const handleCommentsOverview=async()=>{   
            if(positivePercentage>0){
                const pos =posAnalysedComments?.[posAnalysedComments.length-1]?.content;
                if(pos){
            setPosContent(pos);
            }
        }
            if(neutralPercentage>0){
                const neu =neuAnalysedComments?.[neuAnalysedComments.length-1]?.content;
                if(neu){
                setNeuContent(neu);
            }
        }
            if(negativePercentage>0){
                const neg =negAnalysedComments?.[negAnalysedComments.length-1]?.content;
                if(neg){
                setNegContent(neg);
            }
    }
    }
        handleCommentsOverview();     
    },[posAnalysedComments,neuAnalysedComments,negAnalysedComments,userId]);  

    return(
        <>
            {analysedComments.length>0 && <div className='analysedComments' >
                <div className='introText'>
                    <h3><AiOutlineBarChart className='icon'/>Résultats de l'analyse</h3>
                    <p>Aperçu des sentiments détectés dans vos commentaires.</p>
                </div>
                <div className='stats' >
                    <div className='totalComments'><FiMessageSquare className='icon'/>Total Commentaires <div className='valeur'>{analysedComments.length}</div></div>
                    <div className='positifs'> <FiCheckCircle className='icon'/>Positifs <div className='valeur'>{positivePercentage}%</div></div>
                    <div className='neutres'><PiSmileyMeh className='icon'/>Neutres <div className='valeur'>{neutralPercentage}%</div></div>
                    <div className='negatifs'><PiWarningCircle className='icon'/>Négatifs <div className='valeur'>{negativePercentage}%</div></div>
                </div>
                <div className='twoBoxesContainer'>
                    <div className='chartContainer' >
                        <div className='introText'>
                            <h3>Répartition des Sentiments</h3>
                            <p>Distribution des sentiments dans le fichier importé.</p>
                        </div>
                        <div className='chart'>
                            <Doughnut
                            data={{
                                labels:[`Positif : ${positivePercentage}%`,`Neutre : ${neutralPercentage}%` ,`Négatif : ${negativePercentage}%`],
                                datasets:[{
                                    data:[positivePercentage,neutralPercentage,negativePercentage],
                                    backgroundColor:[
                                        '#28c762',
                                        '#c9a71f',
                                        '#c63535ff'
                                    ]
                                }]
                            }}
                            options={{
                                maintainAspectRatio:false,
                                responsive:true,
                                plugins:{
                                    legend:{
                                        position:'bottom',
                                        labels:{
                                            usePointStyle:true,
                                            pointStyle: 'circle', 
                                        }
                                    },
                                    tooltip:{
                                        callbacks:{
                                            title:()=>'',
                                            label:function(context){ return context.label;}
                                        }
                                    }
                                }
                                
                            }}
                            />
                        </div>
                    </div>
                    <div className='comments'>
                        <div className='introText'>
                            <h3>Aperçu des Commentaires</h3>
                            <p>Quelques commentaires analysés récemment.</p>  
                        </div> 
                        {posContent && <div className='oneComment'>{posContent} <span className='posSpan'><FiCheckCircle className='icon'/><span>Positif</span></span></div>}
                        {neuContent && <div className='oneComment'>{neuContent} <span className='neuSpan'><PiSmileyMeh className='icon'/><span>Neutre</span></span></div>}
                        {negContent && <div className='oneComment'>{negContent} <span className='negSpan'><PiWarningCircle className='icon'/><span>Negatif</span></span></div>}
                        <a href='#analysedComments' style={{textDecoration:'none'}}><button>Voir tous les commentaires <FaArrowRight className='iconBtn'/></button></a>
                    </div>
                </div>
            </div>}
        </>
    )
}
export default AnalyseResult;