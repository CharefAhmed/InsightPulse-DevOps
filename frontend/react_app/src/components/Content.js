import { FaArrowRight } from "react-icons/fa";
import { SlCloudUpload } from "react-icons/sl";
import { FiCpu } from "react-icons/fi";
import { AiOutlineBarChart } from "react-icons/ai";
import { TbMessageCircleSearch } from "react-icons/tb";
import { IoMdTrendingUp  } from "react-icons/io";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Content = () => {
    return (
    <div className="content">
        <div className="landing">
            <div class="intro-text">
                <h1><span>InsightPulse :</span>L'Intelligence au Service de vos Données Clients. </h1>
                <p>InsightPulse transforme les retours clients bruts en insights clairs 
                    et actionnables grâce à l'IA.
                </p>
            </div>
            <div className="intro-btn">
                <button className="colored"><Link to="/import" style={{textDecoration:"none",color:"white"}}>Commencer l'analyse <FaArrowRight className="arrowIcon" /></Link> </button>
                <button className="not-colored"><a href="#Fonctions" style={{textDecoration:"none",color:"black"}}>En savoir plus</a></button>
            </div>
        </div>
        <div className="fonctions" id="Fonctions">
            <div className="container">
                <div className="contText"> 
                    <h1>Des Fonctionnalités Avancées pour des Insights Profonds</h1>
                    <p>InsightPulse vous offre les outils essentiels pour transformer le feedback en intelligence stratégique.</p>
                </div>
                <div className="features">
                        <div className="feat1">
                            <span><SlCloudUpload className="featIcon"/></span>
                            <h3>Importation Sécurisée</h3>
                            <p>Importez vos commentaires depuis des fichiers CSV ou JSON en quelques secondes.</p>
                        </div>

                        <div className="feat2">
                            <span><FiCpu className="featIcon"/></span>
                            <h3>Analyse IA Intelligente</h3>
                            <p>Utilisez des modèles d'IA avancés pour une détection fine des sentiments (positif, neutre, négatif).</p>
                        </div>
                        <div className="feat3">
                            <span><AiOutlineBarChart className="featIcon"/></span>
                            <h3>Visualisations Interactives</h3>
                            <p>Des tableaux de bord dynamiques pour explorer la répartition et l'évolution des sentiments.</p>
                        </div>
                        <div className="feat4">
                            <span><TbMessageCircleSearch className="featIcon"/></span>
                            <h3>Analyse Contextuelle</h3>
                            <p>Comprenez le sens derrière chaque commentaire en tenant compte du ton utilisé par les utilisateurs.</p>
                        </div>
                        <div className="feat5">
                            <span><IoMdTrendingUp   className="featIcon"/></span>
                            <h3>Tableau de Bord Intuitif</h3>
                            <p>Visualisez la répartition et l'évolution des sentiments avec des graphiques clairs.</p>
                        </div>
                        <div className="feat6">
                            <span><HiOutlineShieldCheck className="featIcon"/></span>
                            <h3>Conformité et Sécurité</h3>
                            <p>Vos données sont traitées avec les plus hauts standards de sécurité et de confidentialité.</p>
                        </div>
                </div>
            </div>
        </div>
        <div className="processus" id="processus" >
            <div className="container" >
                <div className="contText"> 
                    <h1>Notre Processus : De la Donnée à l'Insight</h1>
                    <p>Découvrez comment InsightPulse transforme vos commentaires en intelligence stratégique en quelques étapes.</p>
                </div>  
                <div className="etapes">
                    <div className="etape1">
                        <span>1</span>
                        <h3>Collecte & Import</h3>
                        <p>Importez vos commentaires depuis diverses sources (CSV, JSON) vers notre plateforme sécurisée.</p>
                    </div>
                    <div className="etape2">
                        <span>2</span>
                        <h3>Analyse IA</h3>
                        <p>Notre moteur d'IA analyse chaque texte pour en extraire le sentiment et les entités clés.</p>
                    </div>
                    <div className="etape3">
                        <span>3</span>
                        <h3>Visualisation & Action</h3>
                        <p>Accédez à des tableaux de bord interactifs pour des insights clairs et prenez des décisions éclairées.</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="commenceAnalyse">
            
                <h1>Prêt à transformer vos commentaires <br></br>en actions ?</h1>
                <p>Commencez dès maintenant à utiliser InsightPulse et découvrez le potentiel de vos données clients.</p>
                <Link to="/import" style={{textDecoration:"none"}}><button>Démarrer l'analyse</button></Link>
            
        </div>
        
        <footer>
            © {new Date().getFullYear()}  Tous droits réservés.
        </footer>
        
    </div>
        
    
    )
}

export default Content
