import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './features/Components/Home/Home';
import Dashboard from './features/Components/Dashboard/Dashboard';
import Login from './features/Components/Login/Login';
import Register from './features/Components/Register/Register';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;