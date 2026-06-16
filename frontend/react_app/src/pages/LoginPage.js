import Header from "../components/Header"
import Login from "../components/Login"


const LoginPage = () => {
return (
<div>
    <Header showRightContent={false} title={"Se connecter ou Créer un compte"}/>
    <Login/>
</div>
)
}

export default LoginPage;
