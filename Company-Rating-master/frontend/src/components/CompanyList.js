import { useEffect, useState } from "react";

export default function CompanyList() {
	const [company, setCompany] = useState([]);
	const [rating, setRating] = useState([])
	useEffect(() => {
		getCompanies();
		getrating()
	}, [])

	const getCompanies = async () => {
		const res = await fetch("http://localhost:3400/companyList")

		const data = await res.json();
		if (data) {
			console.log(data);
			setCompany(data);
		}
	}

	const getrating = async (id) => {
		const res = await fetch(`http://localhost:3400/ratings`)

		const data = await res.json();
		if (data) {
			// console.log(data);
			setRating(data.result)
		}
	}

	return (
		<>
			<table className="table table-bordered table-stripped mt-3 mx-auto" style={{width: "70%"}}>
				<thead>
					<tr>
						<th>S.No.</th>
						<th>Company Name</th>
						<th>Company Location</th>
						<th>City</th>
						<th>Founded Date</th>
						<th>Company Rating</th>
					</tr>
				</thead>
				{
					company.map((value, i) => {
						return (
							<tbody>
							<tr>
								<td>{i + 1}</td>
								<td>{value.companyName}</td>
								<td>{value.companyLocation}</td>
								<td>{value.city}</td>
								<td>{value.foundedon}</td>
								<td>{rating.find(rate => rate._id === value._id)?.averageRating}</td>
							</tr>
							</tbody>
						)
					})
				}
			</table>
		</>
	)
}