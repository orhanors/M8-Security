import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import "./auth.scss";
import { useDispatch } from "react-redux";
import { login } from "../../store/user";
import useCustomSelector from "../../store/helpers/useCustomSelector";
function Login() {
	const { data, errorMessage, loading } = useCustomSelector(
		(state) => state.user
	);
	const history = useHistory();
	useEffect(() => {
		if (data.email) {
			history.push("/user");
		}
	}, [data]);
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [errorMsg, setErrorMsg] = useState("");
	const handleChange = (e: any) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
		setErrorMsg("");
	};

	const { email, password } = formData;

	const handleSubmit = async (e: any) => {
		if (isEmpty(email) || isEmpty(password)) {
			setErrorMsg("All fields are required");
		} else if (!isEmail(email)) {
			setErrorMsg("Invalid email format!");
		} else {
			dispatch(login({ email, password }));
		}
	};
	const showLoginForm = () => {
		return (
			<div className='d-flex flex-column'>
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
				<Link
					className='forgot-password mb-4'
					to='/login/forgotpassword'>
					Forgot Password?
				</Link>
				{errorMsg && (
					<small className='mb-2 mt-0 text-danger text-center'>
						{errorMsg}
					</small>
				)}

				{errorMessage && (
					<small className='mb-2 mt-0 text-danger text-center'>
						{errorMessage}
					</small>
				)}
				<button onClick={handleSubmit} className='sign-in-btn'>
					Sign in
				</button>
			</div>
		);
	};
	return (
		<div
			id='login-main-container'
			className='d-flex flex-column justify-content-center align-items-center'>
			<div>
				<div className='login-content-container mb-5'>
					<div className='mb-4'>
						<h2 className='mb-1'>Sign in</h2>
					</div>
					{showLoginForm()}
				</div>
				<div className='text-center'>
					<p>
						Don't have an account?{" "}
						<Link to='/signup' className='font-weight-bold'>
							Join now
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Login;
