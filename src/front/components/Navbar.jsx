import { Link, useNavigate } from "react-router-dom";
import React from "react";

export const Navbar = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		sessionStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<button className="logout-btn" onClick={handleLogout}>
						Logout
					</button>
				</div>
			</div>
		</nav>
	);
};