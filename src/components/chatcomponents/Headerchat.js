import React, { useEffect } from "react";
import './Headerchat.css'
import { Link } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { auth  } from "../../firebase";


function Headerchat() {
	const [{ user }, dispatch] = useStateValue();

	const handleAuthenticaton = () => {
		if (user) {
			auth.signOut();
		}
	};

    useEffect(() => {
		const btnToggle = document.querySelector("#themeToggle i");
		const theme = localStorage.getItem("theme");

		if (theme === "light") {
			btnToggle.classList.add("fa-sun");
			btnToggle.classList.remove("fa-moon");
			document.querySelector("body").classList.add(theme);
		}

		btnToggle.addEventListener("click", () => {
			if (btnToggle.classList.contains("fa-moon")) {
				btnToggle.classList.add("fa-sun");
				btnToggle.classList.remove("fa-moon");
				localStorage.setItem("theme", "light");
			} else {
				btnToggle.classList.add("fa-moon");
				btnToggle.classList.remove("fa-sun");
				localStorage.clear();
			}
			document.querySelector("body").classList.toggle("light");
		});
	}, []);

    return (
        <div className="header">
				<Link className="link headerTitle" to={`/home`}>
				<h1 className="headerLogo">
					KluMedia
					
					<img className="Logo" src="data:image/png;base64,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"style={{ height: "30px", width: "30px" } }

							alt=""/>
				
				</h1>
			</Link>

			<div className="headerSearchContainer">
				
			</div>
			<div className="break" ></div>

			<div className="headerNavContainer">
				<Link to={`/home`} className="link headerOptionBasket">
					<div className="headerOptionBasket">
						<i className="fas fa-home"></i>
					</div>
				</Link>

				<Link target="_blank" to="/refresh" className="link headerOptionBasket" onClick={(event) => {event.preventDefault(); window.location.reload("REFRESH");}}>
					<div className="headerOptionBasket">
						<i className="fas fa-redo-alt fa-spin"></i>
					</div>
				</Link>

				<Link target="_blank" to="/git_vikrant" className="link headerOptionBasket" onClick={(event) => {event.preventDefault(); window.open("http://github.com/vikrantvjoliya");}}>
					<div className="headerOptionBasket">
						<i className="	fas fa-compass fa-spin"></i>
					</div>
				</Link>

				<Link target="_blank" to="/git_kunal" className="link headerOptionBasket" onClick={(event) => {event.preventDefault(); window.open("https://github.com/kunalvasudevan");}}>
					<div className="headerOptionBasket">
						<i className="	fas fa-dice-d6 fa-spin"></i>
					</div>
				</Link>

				<Link to={`/profile/${user?.email}`} className="link headerOptionBasket">
					<div className="headerOptionBasket">
						{user && <img className=" headerAvatar" src={user?.photoURL || `https://avatars.dicebear.com/api/gridy/${user?.email}.svg`} alt={user?.email} title={user?.email}/>}
					</div>
				</Link>

				<Link to={!user ? "/login" : ""} className="link headerOptionBasket">
					<div onClick={handleAuthenticaton} >
						<span className="headerOption">
							<span className="headerOptionLineOne">
								{user ? user.email.split('@')[0] : "Hello Guest"}
							</span>
							<span className="headerOptionLineTwo">
								{user ? "Sign Out" : "Sign In"}
							</span>
						</span>
					</div>
				</Link>
				


			</div>

			<div id="themeToggle" className="headerTheme">
				<i className="far fa-moon fa-spin"></i>
			</div>
		</div>
    )
}

export default Headerchat


/*
<h3 className="logo">
                <a href="/home">Message Me</a>
            </h3>
*/