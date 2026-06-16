import { createContext,useState,useEffect,useRef } from "react";
import getAllAnalysedComments from '../api/getAllAnalysedComments';
import login from "../api/login";
import signUp from "../api/signUp";
import { useNavigate } from "react-router-dom";
import { setLogoutHandler } from '../api/axiosInstance';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const DataContext =createContext({});
export const DataProvider=({children})=>{

    const [analysedComments,setAnalysedComments] = useState([]);
    const [positivePercentage, setPositivePercentage] = useState(0);
    const [neutralPercentage, setNeutralPercentage] = useState(0);
    const [negativePercentage, setNegativePercentage] = useState(0);
    const [posAnalysedComments,setPosAnalysedComments] = useState([]);
    const [neuAnalysedComments,setNeuAnalysedComments] = useState([]);
    const [negAnalysedComments,setNegAnalysedComments] = useState([]);
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate=useNavigate();
    const[isLoggedIn,setIsLoggedIn] = useState(false);
    const[userLoggedIn,setUserLoggedIn] = useState('');
    const[userId,setUserId] = useState(null);
    const printRef = useRef(null);

    const handleAllAnalysedComments=async()=>{
        if(userId){
            const res= await getAllAnalysedComments(userId);
            setAnalysedComments(res.data);
            console.log(res.data)
            localStorage.setItem(`analysedComments_${userId}`,JSON.stringify(res.data));
            
        }
    }
    const getPositiveAnalysedComments=(analysedComments)=>{
        return analysedComments.filter((c)=>c.sentiment.sentiment==="Positive");
    }
    const getNeutralAnalysedComments=(analysedComments)=>{
        return analysedComments.filter((c)=>c.sentiment.sentiment==="Neutral");
    }
    const getNegativeAnalysedComments=(analysedComments)=>{
        return analysedComments.filter((c)=>c.sentiment.sentiment==="Negative");
    }
    const getPositifNumber=async(analysedComments)=>{
        const comments=getPositiveAnalysedComments(analysedComments);
        const nb=(comments.length*100)/analysedComments.length;
        setPositivePercentage(Math.round(nb));
        setPosAnalysedComments(comments);
    }
    const getNeutralNumber=async(analysedComments)=>{
        const comments=getNeutralAnalysedComments(analysedComments);
        const nb=(comments.length*100)/analysedComments.length;
        setNeutralPercentage(Math.round(nb));
        setNeuAnalysedComments(comments);
    }
    const getNegatifNumber=async(analysedComments)=>{
        const comments = getNegativeAnalysedComments(analysedComments);
        const nb=(comments.length*100)/analysedComments.length;
        setNegativePercentage(Math.round(nb));
        setNegAnalysedComments(comments);
    }
    useEffect(() => {
        if (analysedComments.length > 0) {
            getPositifNumber(analysedComments);
            getNeutralNumber(analysedComments);
            getNegatifNumber(analysedComments);
        }        
    }, [analysedComments]);
    
    
    const handleLogin=async (e)=>{
        e.preventDefault();
        try{
            const res = await login({email,password});
            const  userId = res.data.user.id;
            setUserId(userId);
            console.log(userId);
            let username= res.data.user.username ;
            username=username[0].toUpperCase() + username.slice(1)
            console.log(username);
            setUserLoggedIn(username);
            setIsLoggedIn(true);
            localStorage.setItem("isLoggedIn","true");
            localStorage.setItem("isLoggedIn","true");
            localStorage.setItem("userLoggedIn",JSON.stringify({username,userId}));
            showLoginResultMsg('Connexion réussie');
            setTimeout(() => {
                showLoginResultMsg('');
                navigate('/')}, 1500);
            setEmail('');
            setPassword('');
        }
        catch(error) {
            showLoginResultMsg('Connexion échoue');
            setTimeout(() => showLoginResultMsg(''), 1500);
        } 
    }
    const handleLogOut=()=>{
        setIsLoggedIn(false);
        setUserLoggedIn('')
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userLoggedIn");
        setUserId(null);
        setPosAnalysedComments([]);
        setNeuAnalysedComments([]);
        setNegAnalysedComments([]);
    }
    const showLoginResultMsg=(msg)=>{
        const element = document.querySelector('.signIn form .resMsg');
        element.style.visibility="visible";
        element.textContent=msg;
        if(msg==="Connexion réussie"){     
            element.style.color="green";
        }else if (msg==="Connexion échoue") {     
            element.style.color="red";
        }
    }
    const handleSignUp=async(e)=>{
        e.preventDefault();
        try{
            await signUp({username,email,password});
            showSignUpResultMsg('Création du compte avec succés')
            setTimeout(() => {showSignUpResultMsg('')}, 1500);
        }catch(error){
            showSignUpResultMsg('Création du compte échoue ')
            setTimeout(() => {showSignUpResultMsg('')}, 1500);
        }
    }
    const showSignUpResultMsg=(msg)=>{
        const element = document.querySelector('.signUp form .resMsg');
        element.style.visibility="visible";
        element.textContent=msg;
        if(msg==="Création du compte avec succés"){     
            element.style.color="green";
            setUsername('');
            setEmail('');
            setPassword('');
        }else {     
            element.style.color="red";
        }
    }
    
    useEffect(()=>{
        setLogoutHandler(handleLogOut);
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
            if(isLoggedIn){
                const user = JSON.parse(localStorage.getItem("userLoggedIn"))
                const username =user.username;
                const userId =user.userId;
                setIsLoggedIn(true);
                setUserLoggedIn(username);
                setUserId(userId);
            }
            
    },[]);
    const handleDownloadPDF= async()=>{
        const element= printRef.current;
        if (!element) return;
        const canvas = await html2canvas(element, {
            scale: 2,
            onclone: (clonedElem) => {
                clonedElem.querySelectorAll('.exclude').forEach(el => el.remove());
                const scrollBox = clonedElem.body.querySelector('#analysedComments');
                if (scrollBox) {
                    scrollBox.style.overflow = 'visible';
                    scrollBox.style.height = 'auto';
                }
                clonedElem.body.querySelectorAll('.analysedComments .stats >* ').forEach(el=>el.style.boxShadow='none');
            }
        });
        const data = canvas.toDataURL('image/png');
        const pdf= new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: 'a3',
        });
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth() ;
        const pdfheight = (imgProperties.height * pdfWidth) / imgProperties.width ; 
        pdf.addImage(data,'PNG',0,10,pdfWidth,pdfheight);
        pdf.save('Dashboard.pdf');
    }
    
    return(
        <DataContext.Provider value={{
            analysedComments,setAnalysedComments,positivePercentage,neutralPercentage,negativePercentage,posAnalysedComments,setPosAnalysedComments,neuAnalysedComments,setNeuAnalysedComments,negAnalysedComments, setNegAnalysedComments,handleAllAnalysedComments,username,setUsername,email,setEmail,password,setPassword,handleLogin,handleSignUp,isLoggedIn,handleLogOut,userLoggedIn,userId,setUserId,getPositiveAnalysedComments,getNeutralAnalysedComments,getNegativeAnalysedComments,printRef,handleDownloadPDF
            
        }}>
            {children} 
        </DataContext.Provider>
    )
}
export default DataContext;