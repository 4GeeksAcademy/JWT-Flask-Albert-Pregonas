import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            const res = await fetch("https://silver-palm-tree-wrg6vw6j45wgcx79-3001.app.github.dev/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                sessionStorage.setItem("token", data.token);
                navigate("/private");
            } else {
                setMessage(data.msg || "Error en el inicio de sesión");
            }
        } catch (err) {
            setMessage("Error de conexión con el servidor");
        }
    };

    return (
        <div className="auth-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Entrar</button>
            </form>
            {message && <p className="auth-message">{message}</p>}
        </div>
    );
};

export default Login; 