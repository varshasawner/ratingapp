import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AdminDashboard(){
    const [token, setToken] = useState("");
    const navigate = useNavigate();

     useEffect(()=>{
        setToken(localStorage.getItem('id'));
     }, [])
     if(! (localStorage.getItem('role') === 'admin') ){
        navigate("/")
     }
    return (
        <>
   
            <nav class="navbar navbar-expand-sm bg-dark">
				<div class="container-fluid">
					<ul class="navbar-nav">
						<li class="nav-item">
						<div className="mx-5 my-1 text-white">Welcome Admin </div>
						</li>
						<li class="nav-item">
						    <Link to='/logout' className="btn btn-danger ms-5">Logout</Link>
						</li>
					</ul>
				</div>
			</nav>

            <div className="mt-3">
                <Link to='addCompany' className="links ms-5">Add Company</Link>
                <Link to='companyList' className="links ms-3">Show Companies</Link>
            </div>
            <Outlet />

        </>
    )
}