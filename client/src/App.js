import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './features/Components/Home/Home';
import Dashboard from './features/Components/Dashboard/Dashboard';
import Login from './features/Components/Login/Login';
import Register from './features/Components/Register/Register';
import ProtectedRoute from './features/Components/ProtectedRoute/ProtectedRoute';
import Logout from './features/Components/Logout/Logout';
import AppContainer from './features/Components/AppContainer/AppContainer';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppContainer />}>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
