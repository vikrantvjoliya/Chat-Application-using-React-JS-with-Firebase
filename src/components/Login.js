import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { db, auth, provider } from "../firebase";
import { actionTypes } from "../reducer";
import { useStateValue } from "../StateProvider";

import LottieAnimation from './Extras/Lottie';
import home from './Extras/logauth_1.json';

function Login() {
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [state, dispatch] = useStateValue();


	const isEntered = () => {
		if (email !== "") {
		return true;
		} else {
		return false;
		}
	};
	
	const submit = (e) => {
		e.preventDefault();
	
		auth
		.sendPasswordResetEmail(email)
		.then(
			() => setMessage("Check your inbox"),
			setTimeout(() => {
			setMessage("");
			}, 3000)
		)
		.catch((error) => alert(error.message));
	};

	useEffect(() => {
		document.title = `Login | KluMedia`;
	}, [])

	const signInGoogle = () => {
		auth.signInWithPopup(provider)
			.then((result) => {
				dispatch({
					type: actionTypes.SET_USER,
					user: result.user,
				});
				history.push("/home");

			})
			.catch((error) => {
				alert(error.message);
			});
	};
	
	const SignIn = (e) => {
		e.preventDefault();

		auth.signInWithEmailAndPassword(email, password)
			.then((auth) => {
				dispatch({
					type: actionTypes.SET_USER,
					user: auth.user,
				});
				console.log(auth);
				history.push("/home");

			})
			.catch((error) => alert(error.message));
	};

	const SignUp = (e) => {
		e.preventDefault();

		auth.createUserWithEmailAndPassword(email, password)
			.then((auth) => {
				if (auth) {
					dispatch({
						type: actionTypes.SET_USER,
						user: auth.user,
					});
					history.push("/");
				}
			})
			.catch((error) => alert(error.message));
	};

	return (
		<div className="login">
			<div className="loginContainer">
				<Link to="/" className="link">
					<h1 className="loginLogo">KluMedia</h1>
				</Link>
				<LottieAnimation lotti={home} height={200} width={200} />

				<h1>Sign-in</h1>

				<form>
					<h5>E-mail</h5>
					<input
						type="text"
						placeholder="Enter your email "
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>

					<h5>Password</h5>
					<input
						type="password"
						placeholder="Enter your Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button
						type="submit"
						onClick={SignIn}
						className="loginSignInButton"
					>
						Sign In

					</button>
					<button  onClick={submit}
					type="submit"
					disabled={!isEntered()}
					style={{
						backgroundColor: email.length > 6 ? "#0095f6" : "rgb(0 149 246 / 30%)",
						cursor: isEntered() ? "pointer" : "auto",
					}}
				>
					Forget Your Password
				</button>
				</form>

				

				<button className="loginRegisterButton" onClick={SignUp} >
					Create your KluMedia Account
				</button>

				<br/><h5>OR</h5>
				<button onClick={signInGoogle} className="loginSignInButtonGoogle">
					<i className="fab fa-google"></i> Sign In with Google
				</button>

				<p>
					Disclaimer:
				</p>

			</div>
		</div>
	);
}

export default Login;

/*


*/