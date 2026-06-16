import { useContext } from "react";
import DataContext from "../context/DataContext";

const Login = () => {
    const {username,setUsername,email,setEmail,password,setPassword,handleLogin,handleSignUp}=useContext(DataContext);

    const showLeftContent=()=>{
        const signUpForm = document.querySelector('.signUp form');
        signUpForm.style.display='block';
        const signInForm = document.querySelector('.signIn form');
        signInForm.style.display='none';
        const rightContent = document.querySelector('.rightContent');
        rightContent.style.display='none';
        const leftContent = document.querySelector('.leftContent');
        leftContent.style.display='flex';
        setUsername('');
        setEmail('');
        setPassword('');
    }

    const showRightContent=()=>{
        const signUpForm = document.querySelector('.signUp form');
        signUpForm.style.display='none';
        const signInForm = document.querySelector('.signIn form');
        signInForm.style.display='block';
        const rightContent = document.querySelector('.rightContent');
        rightContent.style.display='flex';
        const leftContent = document.querySelector('.leftContent');
        leftContent.style.display='none';
        setEmail('');
        setPassword('');
    }
    
return (
<div className='loginContainer'>
    <div className='signIn'>
        <form onSubmit={handleLogin} >
            <h1>Se connecter</h1>
            <p className="resMsg" > </p>
            <div className='inputBox'>
                <input type='email' 
                    required 
                    placeholder='Email' 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}/>

                <input type='password'
                    required 
                    placeholder='Mot de passe'
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)}/> 

                <button>Se connecter</button>
            </div>
        </form>
        <div className="leftContent" style={{display:"none"}}>
            <h1>Bienvenue à nouveau !</h1>
            <p>Connectez-vous avec vos données personnelles pour utiliser toutes les fonctionnalités du site</p>
            
            <button className="sideContentBtn" onClick={showRightContent}>Se connecter</button>
        </div>
    </div>
    
    <div className='signUp'>
        <form onSubmit={handleSignUp}>
            <h1>Créer un compte</h1>
            <p className="resMsg" > </p>
            <div className='inputBox'>
                <input type='text' 
                required 
                placeholder="Nom d'utilisateur"
                value={username} 
                onChange={(e)=>setUsername(e.target.value)}/> 

                <input type='email' required
                placeholder='Email'
                value={email} 
                onChange={(e)=>setEmail(e.target.value)}/>

                <input type='password'
                required 
                placeholder='Mot de passe'
                value={password} 
                onChange={(e)=>setPassword(e.target.value)}/> 
                
                <button>S'inscrire</button>
            </div>
        </form>
        <div className="rightContent">
            <h1> Bienvenue !</h1>
            <p>Inscrivez-vous avec vos données personnelles pour utiliser toutes les fonctionnalités du site</p>
            
            <button className="sideContentBtn" onClick={showLeftContent}> S'inscrire</button>
        </div>
    </div>
</div>
)
}

export default Login;
