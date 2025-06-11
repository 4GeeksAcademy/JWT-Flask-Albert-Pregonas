import React, { useState } from "react";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            const res = await fetch("https://silver-palm-tree-wrg6vw6j45wgcx79-3001.app.github.dev/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                sessionStorage.setItem("token", data.token);
                window.location.href = "/private";
            } else {
                setMessage(data.msg || "Error en el registro");
            }
        } catch (err) {
            setMessage("Error de conexión con el servidor");
        }
    };

    return (
        <div className="auth-container">
            <h2>Registro</h2>
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
                <button type="submit">Registrarse</button>
            </form>
            {message && <p className="auth-message">{message}</p>}
        </div>
    );
};

export default Signup; 