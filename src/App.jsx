import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from "../components/Register/Register";
import Login from '../components/Login/Login';
import Settings from '../components/MainPage/Settings';
import Dashboard from '../components/MainPage/Dashboard';
import Layout from "../components/PageLayout/Layout";
import Links from '../components/MainPage/Links';
import Analytics from "../components/MainPage/Analytics";


const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/links" element={<Layout><Links /></Layout>} />
            <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
            <Route path="/settings" element={<Layout><Settings /></Layout> }/>
            
        </Routes>
    </BrowserRouter>
);

export default App;