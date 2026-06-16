import { BsStars } from "react-icons/bs";
import { Link } from "react-router-dom";
import DataContext from "../context/DataContext";
import { useContext } from "react";

const Header = ({showRightContent,title}) => {
const {isLoggedIn,handleLogOut,userLoggedIn} = useContext(DataContext);
return (
<header>
    <div className="heading">
        <div className="logo">
            <BsStars className="logIcon"/> 
            <Link to="/"><h2>InsightPulse</h2></Link>
        </div>
        {title && <div className="importHeader">
            <h1>{title}</h1>
            <Link to="/" className="retour"><button className="btn">Retour</button></Link>
        </div>}
        {showRightContent && <ul>
            <li><a href="#Fonctions">Fonctionnalités</a></li> 
            <li><a href="#processus">Comment ça marche ?</a></li>
            {isLoggedIn ? (
                <><li className="welcomeText">Bienvenue, {userLoggedIn}</li>
                <li className="active"> <Link to="/" className="btn" onClick={handleLogOut}>Log out</Link></li></>)

            :(
                <li className="active"> <Link to="/login" className="btn">Se connecter</Link></li>)
            }
        </ul>}
        
    </div>
</header>

)
}

export default Header
