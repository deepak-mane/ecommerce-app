import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter} from 'react-router-dom'

// Import components Routed
import HomePage from './pages/HomePage/HomePage'
import DashboardPage from './pages/DashboardPage/DashboardPage'
import CustomersPage from './pages/CustomersPage/CustomersPage'
import MessagePage from './pages/MessagePage/MessagePage'
import HelpPage from './pages/HelpPage/HelpPage'
import SettingsPage from './pages/SettingsPage/SettingsPage'
import LogoutPage from './pages/LogoutPage/LogoutPage'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import NotfoundPage from './pages/NotfoundPage/NotfoundPage'

// Import this component specific stylesheet
import './App.css';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} exact='true'/>
        <Route path="/home" element={<HomePage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route path="/customers" element={<CustomersPage/>} />
        <Route path="/message" element={<MessagePage/>} />
        <Route path="/help" element={<HelpPage/>} />
        <Route path="/settings" element={<SettingsPage/>} />
        <Route path="/logout" element={<LogoutPage/>} />
        <Route path="/notfound" element={<NotfoundPage/>} />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
