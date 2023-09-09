import React, { useEffect, useState } from 'react'
import loginpic from './../images/loginpic.png'
import { Link, useNavigate } from 'react-router-dom'
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(email, password, role )
        let result = await fetch("http://localhost:3400/login", {
            method: 'post',
            body: JSON.stringify({ email, password, role }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result.registration)
        if(!result.registration){
            setError(result.error);
            setTimeout(()=>{
				setError("")
			}, 5000)
        }else
        if (result.registration.role === "user") {
            localStorage.setItem('role', result.registration.role);
            localStorage.setItem('id', result.registration._id);
            navigate("/userDashboard")
        } else if(result.registration.role === "admin") {
            localStorage.setItem('role', result.registration.role);
            localStorage.setItem('id', result.registration._id);
            navigate("/adminDashboard")
        }
    }

    return (
        <div className='login'>
            <section className='imageBox'>
                <img src={loginpic} />
            </section>
            <section className='LoginForm'>
                <h1 className='text-center'>Login</h1>
                <p className='text-center'>Hello! Please enter your details for login.</p>
                {
                    error ? <p className='text-center text-danger mb-2'>{error}</p> : ""
                }
                <form onSubmit={handleLogin}>
                <div class="input-group border-bottom mb-3">
                <input type="text" className="form-control" placeholder='Enter Email'
                    onChange={(e) => setEmail(e.target.value)} value={email} required/>
                </div>
                <div class="input-group border-bottom mb-3">
                <input type="password" className="form-control" placeholder='Enter Password'
                    onChange={(e) => setPassword(e.target.value)} value={password} required/>
                </div>
                <div class="input-group border-bottom mb-3">
                    <select className='form-control' required name='role' onChange={(e)=>setRole(e.target.value)}>
                        <option value="">Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>
                <div class="input-group border-bottom mb-3">
                <input type="submit" className="btn btn-primary"/>
                </div>
                {/* <button onClick={handleLogin} className="btn btn-primary mb-4" type="button">Login</button> */}
                </form>
                <p>I Dont have an account for review & rating</p>
                <Link to='register'>Register Now</Link>
            </section>
        </div>
    )
}

export default Login