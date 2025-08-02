import { createContext,useState,useEffect } from "react";
import getAllAnalysedComments from '../api/getAllAnalysedComments';
import getPositiveAnalysedComments from '../api/getPositiveAnalysedComments';
import getNeutralAnalysedComments  from '../api/getNeutralAnalysedComments';
import getNegativeAnalysedComments from '../api/getNegativeAnalysedComments';



const DataContext =createContext({});
export const DataProvider=({children})=>{

    const [analysedComments,setAnalysedComments] =useState([]);
    const [positivePercentage, setPositivePercentage] = useState(0);
    const [neutralPercentage, setNeutralPercentage] = useState(0);
    const [negativePercentage, setNegativePercentage] = useState(0);
    const [posAnalysedComments,setPosAnalysedComments] =useState([]);
    const [neuAnalysedComments,setNeuAnalysedComments] =useState([]);
    const [negAnalysedComments,setNegAnalysedComments] =useState([]);

    const handleAllAnalysedComments=async()=>{
        const res= await getAllAnalysedComments();
        setAnalysedComments(res.data);
        localStorage.setItem('analysedComments',JSON.stringify(res.data));
    }
    
    const getPositifNumber=async(analysedComments)=>{
        const comments = await getPositiveAnalysedComments();
        const nb=(comments.data.length*100)/analysedComments.length;
        setPositivePercentage(Math.round(nb));
        setPosAnalysedComments(comments.data)
    }
    const getNeutralNumber=async(analysedComments)=>{
        const comments = await getNeutralAnalysedComments();
        const nb=(comments.data.length*100)/analysedComments.length;
        setNeutralPercentage(Math.round(nb));
        setNeuAnalysedComments(comments.data)
    }
    const getNegatifNumber=async(analysedComments)=>{
        const comments = await getNegativeAnalysedComments();
        const nb=(comments.data.length*100)/analysedComments.length;
        setNegativePercentage(Math.round(nb));
        setNegAnalysedComments(comments.data)
    }
    useEffect(() => {
        if (analysedComments.length > 0) {
            getPositifNumber(analysedComments);
            getNeutralNumber(analysedComments);
            getNegatifNumber(analysedComments);
        }        
    }, [analysedComments]);
    
    return(
        <DataContext.Provider value={{
            analysedComments,setAnalysedComments,positivePercentage,neutralPercentage,negativePercentage,posAnalysedComments,setPosAnalysedComments,neuAnalysedComments,setNeuAnalysedComments,negAnalysedComments, setNegAnalysedComments,handleAllAnalysedComments
            
        }}>
            {children} 
        </DataContext.Provider>
    )
}
export default DataContext;