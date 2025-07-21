
import './App.css';
import Home from './pages/Home';
import { Routes,Route } from 'react-router-dom';
import ImportPage from './pages/ImportPage';

function App() {

  return (
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/import' element={<ImportPage/>}/>
      </Routes>
      
      
  );
}

export default App;
