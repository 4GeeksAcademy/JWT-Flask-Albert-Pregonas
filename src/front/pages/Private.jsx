import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Private = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        fetch("https://silver-palm-tree-wrg6vw6j45wgcx79-3001.app.github.dev/api/private", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                if (res.status === 401) {
                    sessionStorage.removeItem("token");
                    navigate("/login");
                }
                return res.json();
            })
            .then((data) => {
                setMessage(data.msg);
            })
            .catch(() => {
                setMessage("Error al cargar el mensaje privado");
            });
    }, [navigate]);

    return (
        <div className="private-container">
            <h2>Zona Privada</h2>
            <p>{message}</p>
        </div>
    );
};

export default Private; 