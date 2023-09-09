import React from 'react';
import loginpic from './../images/loginpic.png'
// import { Link } from 'react-router-dom';
import { useState, useNavigate } from 'react';
import { Link } from 'react-router-dom';

const Registration = () => {

	const [user, setUser] = useState({
		name: "", email: "", password: "", cpassword: "", phone: "", city: "", state: "", role: ""
	});

	let name, value;
	const handleFormData = (e) => {
		// console.log(e);
		name = e.target.name;
		value = e.target.value;

		setUser({ ...user, [name]: value });
		console.log(user)
	}

	const postData = async (e) => {
		e.preventDefault();

		const { name, email, password, cpassword, city, phone, state, role } = user;
		console.log(user)

		const res = await fetch("http://localhost:3400/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name, email, password, cpassword, city, phone, state, role
			})
		});

		const data = await res.json();
		if (data.error) {
			window.alert(data.error);
		} else {
			window.alert("Registration Successfull");
			// navigate('/register');
		}
	}

	return (
		<>
			<section className="login">
				<section className='imageBox'>
					<img src={loginpic} />
				</section>
				<div className="container mt-5 signupbox LoginForm">
					<div className="signup-form">
						<h2 className='form-title text-center mb-4'>Sign Up</h2>
						<form className='register-form' method='POST'>
							<div class="input-group border-bottom mb-3">
								<span class="input-group-text"><i class="zmdi zmdi-account"></i></span>
								<input type="text" class="form-control" name="name"
									value={user.name}
									onChange={handleFormData}
									placeholder="Enter Full Name" />
							</div>
							<div class="input-group border-bottom mb-3">
								<span class="input-group-text"><i class="zmdi zmdi-email"></i></span>
								<input type="email" class="form-control" name="email"
									value={user.email}
									onChange={handleFormData}
									placeholder="Enter Email" />
							</div>
							<div class="input-group border-bottom mb-3">
								<span class="input-group-text"><i class="zmdi zmdi-lock"></i></span>
								<input type="password" class="form-control" name="password"
									value={user.password}
									onChange={handleFormData}
									placeholder="Enter Password" />
							</div>
							<div class="input-group border-bottom mb-3">
								<span class="input-group-text"><i class="zmdi zmdi-lock"></i></span>
								<input type="password" class="form-control" name="cpassword"
									value={user.cpassword}
									onChange={handleFormData}
									placeholder="Enter Confirm password" />
							</div>
							<div class="input-group border-bottom mb-3">
								<span class="input-group-text"><i class="zmdi zmdi-phone-in-talk"></i></span>
								<input type="number" class="form-control" name="phone"
									value={user.phone}
									onChange={handleFormData}
									placeholder="Enter Contact" size="27" />
							</div>
							<div class="input-group border-bottom mb-3">
								<span class="input-group-text"><i class="zmdi zmdi-laptop-chromebook"></i></span>
								<input type="text" class="form-control" name="city"
									value={user.city}
									onChange={handleFormData}
									placeholder="Enter City" />
							</div>
							<div class="input-group border-bottom mb-3">
								<span class="input-group-text"><i class="zmdi zmdi-laptop-chromebook"></i></span>
								<input type="text" class="form-control" name="state"
									value={user.state}
									onChange={handleFormData}
									placeholder="Enter state" />
							</div>
							<div class="input-group border-bottom mb-3">
								<span class="input-group-text"><i class="zmdi zmdi-laptop-chromebook"></i></span>
								<select className='form-control' name='role' onChange={handleFormData}>
									<option value="">Role</option>
									<option value="admin">Admin</option>
									<option value="user">User</option>
								</select>
							</div>
							<div class="input-group border-bottom mb-3">
								<input type="submit" class="btn btn-primary" value="Register" onClick={postData} />
							</div>

						</form>
					</div>
					<div className="signup-image">
						{/* <img src={loginpic} className="img-fluid" /> */}
						<p>I am Already Registered !!<Link to="/" class="nav-link me-4 text-primary">Login Here</Link></p>
				</div>
			</div>
		</section >
		</>
	)
}

export default Registration;