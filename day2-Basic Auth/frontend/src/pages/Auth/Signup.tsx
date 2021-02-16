import React, { useState } from "react";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import equals from "validator/lib/equals";
import isEmpty from "validator/lib/isEmpty";
import "./auth.scss";
import { useDispatch } from "react-redux";
import { signupApiCall } from "../../api/auth";
const Signup = () => {
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		password2: "",
	});
	const [errorMsg, setErrorMsg] = useState("");
	const [successMsg, setSuccessMsg] = useState("");
	const { firstName, lastName, email, password, password2 } = formData;

	const handleChange = (e: any) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
		setErrorMsg("");
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		//Validate inputs

		if (
			isEmpty(email) ||
			isEmpty(firstName) ||
			isEmpty(lastName) ||
			isEmpty(password) ||
			isEmpty(password2)
		) {
			setErrorMsg("All fields are required");
		} else if (!isEmail(email)) {
			setErrorMsg("Invalid email format");
		} else if (!equals(password, password2)) {
			setErrorMsg("Passwords are not same");
		} else {
			let { firstName, lastName, email, password } = formData;
			let body = { firstName, lastName, email, password };

			const response = await signupApiCall(body);
			if (response && response.errors) {
				setErrorMsg(response.errors);
				setSuccessMsg("");
			} else {
				setSuccessMsg("Successfully created! Please login");
				setErrorMsg("");
				setFormData({
					firstName: "",
					lastName: "",
					email: "",
					password: "",
					password2: "",
				});
			}
		}
	};

	const showSignupForm = () => {
		return (
			<div className='d-flex flex-column mt-4'>
				<div className='login-input-wrap mb-4'>
					<p className='login-label mb-0'>Name</p>
					<input
						type='text'
						name='firstName'
						onChange={handleChange}
						value={firstName}></input>
				</div>

				<div className='login-input-wrap mb-4'>
					<p className='login-label mb-0'>Surname</p>
					<input
						type='text'
						name='lastName'
						onChange={handleChange}
						value={lastName}></input>
				</div>

				<div className='login-input-wrap mb-4'>
					<p className='login-label mb-0'>Email</p>
					<input
						type='email'
						name='email'
						onChange={handleChange}
						value={email}></input>
				</div>
				<div className='login-input-wrap mb-2'>
					<p className='login-label mb-0'>Password</p>
					<input
						type='password'
						name='password'
						onChange={handleChange}
						value={password}></input>
				</div>

				<div className='login-input-wrap mb-2'>
					<p className='login-label mb-0'>Confirm Password</p>
					<input
						type='password'
						name='password2'
						onChange={handleChange}
						value={password2}></input>
				</div>

				{errorMsg && (
					<small className='mb-2 mt-0 text-danger text-center'>
						{errorMsg}
					</small>
				)}

				{successMsg && (
					<small className='mb-2 mt-0 text-success text-center'>
						{successMsg}
					</small>
				)}
				<hr />

				<button onClick={handleSubmit} className='sign-in-btn'>
					Sign up
				</button>

				<div className='text-center'>
					<p className='mt-2'>
						Already have an account?{" "}
						<Link to='/login' className='font-weight-bold'>
							Login
						</Link>
					</p>
				</div>
			</div>
		);
	};

	return (
		<div
			id='login-main-container'
			className='d-flex flex-column justify-content-center align-items-center'>
			<div>
				<div className='signup-content-container mb-5'>
					<div className='mb-4'>
						<h2 className='mb-1'>Sign up</h2>
					</div>
					{showSignupForm()}
				</div>
			</div>
		</div>
	);
};

export default Signup;
