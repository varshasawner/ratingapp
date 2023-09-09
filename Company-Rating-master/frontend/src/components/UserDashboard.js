import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillStar } from 'react-icons/ai';
import { AiOutlineStar } from 'react-icons/ai';

export default function UserDashboard() {
	const [token, setToken] = useState("");
	const [rating, setRating] = useState(0)
	const [company, setCompany] = useState([]);
	const [companyId, setCompanyId] = useState("");
	const [msg, setMsg] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		setToken(localStorage.getItem('id'));
		// console.log(localStorage.getItem('id'))
	}, [])

	if (!(localStorage.getItem('role') === "user")) {
		navigate("/")
	}

	useEffect(() => {
		getCompanies();
	}, [])

	const getCompanies = async () => {
		const res = await fetch("http://localhost:3400/companyList")

		const data = await res.json();
		if (data) {
			// console.log(data);
			setCompany(data);
		}
	}

	const submitRating = async () => {
		// console.log(companyId, rating, token)
		const res = await fetch("http://localhost:3400/rating", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				companyId, rating, userId: token
			})
		});

		const data = await res.json();
		console.log(data)
		if (data.error) {
			window.alert(data.error);
		} else {
			setMsg(data.message);
			setTimeout(()=>{
				setMsg("")
			}, 5000)
			setRating(0)
		}
	}

	return (
		<>
			<nav class="navbar navbar-expand-sm bg-dark">
				<div class="container-fluid">
					<ul class="navbar-nav">
						<li class="nav-item">
							<div className="mx-5 my-1 text-white">Welcome User, You can Rate Companies Here </div>
						</li>
						<li class="nav-item">
							<Link to='/logout' className="btn btn-danger ms-5">Logout</Link>
						</li>
					</ul>
				</div>
			</nav>
			{
				msg ? <p className='text-center text-success my-4'>{msg}</p> : ""
			}

			<ul className="mt-5 ms-5">
				{
					company.map((value, i) => {
						return (
							<li key={i} className="mb-3 listing">{value.companyName}
								<button type="button" class="btn btn-warning ms-3" data-bs-toggle="modal" data-bs-target={`#myModal${i}`}>
									Rate Me
								</button>
							
								<div class="modal" id={`myModal${i}`}>
									<div class="modal-dialog">
										<div class="modal-content">

											<div class="modal-header">
												<h4 class="modal-title text-center">{value.companyName}</h4>
												<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
											</div>

											<div class="modal-body">
												<ul>
													{
														[1, 2, 3, 4, 5].map((item) =>
															<li className="star m-2" key={item} onClick={() => {
																setRating(item);
																setCompanyId(value._id)
															}
															}>
																{item <= rating ? <AiFillStar /> : <AiOutlineStar />}
															</li>
														)
													}
													<p>Company Rating : {rating}</p>
												</ul>

											</div>

											<div class="modal-footer">
												<button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={submitRating}>Submit</button>
											</div>

										</div>
									</div>
								</div>
							</li>
						)
					})
				}
			</ul>

		</>
	)
}