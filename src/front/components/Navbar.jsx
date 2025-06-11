import { Link, useNavigate } from "react-router-dom";
import React from "react";

export const Navbar = () => {
	const navigate = useNavigate();
	const isLoggedIn = !!sessionStorage.getItem("token");

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
					{isLoggedIn ? (
						<button className="btn btn-danger" onClick={handleLogout}>Logout</button>
					) : (
						<>
							<Link to="/login">
								<button className="btn btn-primary mr-2">Iniciar sesión</button>
							</Link>
							<Link to="/signup">
								<button className="btn btn-secondary">Registro</button>
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};