import Header from "../components/Header"
import FileUpload from "../components/FileUpload"
import AnalyseResult from "../components/AnalyseResult"
import AnalyseCommentsList from "../components/AnalysedCommentsList"
import { DataProvider } from "../context/DataContext"

const ImportPage = () => {
return (
<div>
    <Header showRightContent={false} title={"Import & Analyse des Commentaires"}/>
    <DataProvider>
        <div className="pageContainer">
            <FileUpload/> 
            <AnalyseResult/>
            <AnalyseCommentsList/>
        </div>
    </DataProvider>
</div>
)
}

export default ImportPage
