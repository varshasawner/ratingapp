
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Registration from './components/Registration';
import Login from './components/Login';
import AddCompany from './components/add-company';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Navbar from './components/Navbar';
import Logout from './components/Logout';

function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Navbar />
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/addCompany" element={<AddCompany />} />
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path="/userDashboard" element={<UserDashboard />} />
            <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
