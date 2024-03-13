
import './App.css';
import Navbar from './componenets/navbar/Navbar';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './componenets/navbar_pages/home';
import Dashboard from './componenets/navbar_pages/dashboard';
import MyWhiteboard from './small components/Whiteboard';

function App() {

  const [theme,setTheme]=useState('light');

  return (
    
    <Router>
      <div className="big-container">
      <Navbar theme={theme} setTheme={setTheme}/>
        <div className='App'>
          <Routes>
            <Route path='/' element = {<Home/>}/>
            <Route path='/dashboard' element = {<Dashboard/>}/>
            <Route path='/whiteboard' element ={<MyWhiteboard/>}/>
          </Routes>
        </div>
      
      </div>

    </Router>

      
      

    
    
  );
}

export default App;
