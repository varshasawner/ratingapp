
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Registration from './components/Registration';
import Login from './components/Login';
import AddCompany from './components/add-company';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Navbar from './components/Navbar';
import Logout from './components/Logout';
import CompanyList from './components/CompanyList';

function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Navbar />
        <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/adminDashboard/" element={<AdminDashboard />}>
                <Route path="addCompany" element={<AddCompany />} />
                <Route path="companyList" element={<CompanyList />} />
            </Route>
            <Route path="/userDashboard" element={<UserDashboard />} />
            <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
