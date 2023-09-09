import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddCompany() {
	const [token, setToken] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("")
	const navigate = useNavigate();

	useEffect(() => {
		setToken(localStorage.getItem('id'));
	})
	if (!localStorage.getItem('id')) {
		navigate("/")
	}

	const [company, setCompany] = useState({
		companyName: "", companyLocation: "", city: "", foundedon: ""
	});

	let name, value;
	const handleFormData = (e) => {
		// console.log(e);
		name = e.target.name;
		value = e.target.value;
		setCompany({ ...company, [name]: value });
	}


	const postData = async (e) => {
		e.preventDefault();
		// console.log(company)
		const { companyName, companyLocation, city, foundedon} = company;

		const res = await fetch("http://localhost:3400/addCompany", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				companyName, companyLocation, city, foundedon
			})
		});

		const data = await res.json();
		if (data.error) {
			setError(data.error);
			setTimeout(()=>{
				setError("")
			}, 5000)
		} else {
			setMsg(data.message);
			setTimeout(()=>{
				setMsg("")
			}, 7000)
		}
	}

	return (
		<>
			{/* <h1>Welcome {token}</h1>
			<Link to='/logout'>Logout</Link>
			<Link to='/addCompany'>Add Company</Link> */}
			<section className="box mt-5">
					
						<h2 className='form-title text-center mb-4'>Enter Company Detail</h2>
						{
							error ? <p className='text-center text-danger mb-2'>{error}</p> : ""
						}
						{
							msg ? <p className='text-center text-success mb-2'>{msg}</p> : ""
						}
						<form className='register-form' method='POST'>
							<div class="input-group mb-3">
								<span class="input-group-text"><i class="zmdi zmdi-account"></i></span>
								<input type="text" class="form-control" name="companyName"
									value={company.companyName}
									onChange={handleFormData}
									placeholder="Enter Company Name" />
							</div>
							<div class="input-group mb-3">
								<span class="input-group-text"><i class="zmdi zmdi-email"></i></span>
								<input type="text" class="form-control" name="companyLocation"
									value={company.companyLocation}
									onChange={handleFormData}
									placeholder="Enter Company Location" />
							</div>
							<div class="input-group mb-3">
								<span class="input-group-text"><i class="zmdi zmdi-phone-in-talk"></i></span>
								<input type="text" class="form-control" name="city"
									value={company.city}
									onChange={handleFormData}
									placeholder="city" size="27" />
							</div>
							<div class="input-group mb-3">
								<span class="input-group-text"><i class="zmdi zmdi-laptop-chromebook"></i></span>
								<input type="date" class="form-control" name="foundedon"
									value={company.foundedon}
									onChange={handleFormData}
									placeholder="Founded on" />
							</div>
							<div class="input-group mb-3">
								<input type="submit" class="btn btn-primary" value="Add Company" onClick={postData} />
							</div>

						</form>
			
			</section >
		</>
	)
}