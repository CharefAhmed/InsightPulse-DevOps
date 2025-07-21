import FileUpload from "../components/FileUpload"
import Header from "../components/Header"

const ImportPage = () => {
return (
<div>
    <Header showRightContent={false} title={"Import & Analyse des Commentaires"}/>
    <FileUpload/>
</div>
)
}

export default ImportPage
