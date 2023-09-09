import React, { useEffect, useState } from 'react'
import loginpic from './../images/loginpic.png'
import { Link, useNavigate } from 'react-router-dom'
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            // navigate("/")
        }
    }, [])

    const handleLogin = async () => {
        console.log(email, password, role )
        let result = await fetch("http://localhost:3400/login", {
            method: 'post',
            body: JSON.stringify({ email, password, role }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        // console.log(result.registration)
        if (result.registration.role === "user") {
            localStorage.setItem('email', JSON.stringify(result.registration.email));
            navigate("/userDashboard")
        } else if(result.registration.role === "admin") {
            localStorage.setItem('email', JSON.stringify(result.registration.email));
            navigate("/adminDashboard")
        }else{
            alert(result.error)
        }
    }

    return (
        <div className='login'>
            <section className='imageBox'>
                <img src={loginpic} />
            </section>
            <section className='LoginForm'>
                <h1>Login</h1>
                <p>Hello! Please enter your details for login.</p>
                <input type="text" className="form-control" placeholder='Enter Email'
                    onChange={(e) => setEmail(e.target.value)} value={email} />
                <input type="password" className="form-control" placeholder='Enter Password'
                    onChange={(e) => setPassword(e.target.value)} value={password} />
                <div class="input-group border-bottom mb-3">
                    <span class="input-group-text"><i class="zmdi zmdi-laptop-chromebook"></i></span>
                    <select className='form-control' name='role' onChange={(e)=>setRole(e.target.value)}>
                        <option value="">Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>
                <p>Forgot Password</p>

                <button onClick={handleLogin} className="btn btn-primary" type="button">Login</button>

                <p>i Dont have an account for review & rating</p>
                <Link to='register'>Register Now</Link>
            </section>
        </div>
    )
}

export default Login