import Header from "../components/Header"
import FileUpload from "../components/FileUpload"
import AnalyseResult from "../components/AnalyseResult"
import AnalyseCommentsList from "../components/AnalysedCommentsList"
import { useContext } from "react";
import DataContext from "../context/DataContext";

const ImportPage = () => {
    const { isLoggedIn } = useContext(DataContext);
    const {printRef} = useContext(DataContext);
    const {handleDownloadPDF} = useContext(DataContext);


    
return (
    isLoggedIn && <div>
    <Header showRightContent={false} title={"Import & Analyse des Commentaires"}/>
        <div className="pageContainer" ref={printRef}>
            <FileUpload/> 
            <AnalyseResult />
            <AnalyseCommentsList/>
            <button className='downloadBtn exclude' onClick={handleDownloadPDF}>Download</button>
        </div>
</div>
);
}

export default ImportPage
