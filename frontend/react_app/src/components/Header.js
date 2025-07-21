import { BsStars } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = ({showRightContent,title}) => {
return (
<header>
    <div className="heading">
        <div className="logo">
            <BsStars className="logIcon"/> 
            <h2>InsightPulse</h2>
        </div>
        {title && <div className="importHeader">
            <h1>Import & Analyse des Commentaires</h1>
            <Link to="/" className="retour"><button className="btn">Retour</button></Link>
        </div>}
        {showRightContent && <ul>
            <li><a href="#Fonctions">Fonctionnalités</a></li> 
            <li><a href="#processus">Comment ça marche ?</a></li> 
            <li className="active"><button className="btn">Se connecter</button></li> 
        </ul>}
    </div>
</header>

)
}

export default Header
