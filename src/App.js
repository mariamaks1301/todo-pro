import '../src/styles/style.scss';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import { useEffect } from 'react';
import { CustomContext } from './utils/Context';
import { useContext } from 'react';

function App() {


  const {setUser} = useContext(CustomContext);

  useEffect(()=> {
    if(localStorage.getItem('user') !== null){
      setUser(JSON.parse(localStorage.getItem('user')))
    }

  }, [setUser])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>


      </Routes>
      
    </div>
  );
}

export default App;
