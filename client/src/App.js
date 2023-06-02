import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './features/Components/Home/Home';
import Dashboard from './features/Components/Dashboard/Dashboard';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;