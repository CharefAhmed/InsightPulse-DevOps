import './App.css';
import Home from './pages/Home';
import { Routes,Route } from 'react-router-dom';
import ImportPage from './pages/ImportPage';
import LoginPage from './pages/LoginPage';

function App() {

  return (
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/import' element={<ImportPage/>}/>
        <Route exact path='/login' element={<LoginPage/>}/>
      </Routes>
      
      
  );
}

export default App;
