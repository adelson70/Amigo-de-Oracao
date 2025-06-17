import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import './styles.css';

const ProfileComponent = ({ onMenuClick }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Fecha o dropdown ao clicar fora
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="profile-component" ref={dropdownRef} style={{ position: "relative", display: "inline-block" }}>
            <button
                className="profile-icon-btn"
                onClick={() => setOpen((prev) => !prev)}
                style={{ background: "none", border: "none", cursor: "pointer" }}
                aria-label="Abrir menu do usuário"
            >
                <FontAwesomeIcon icon={faUser} size="2x" color="#003366" />
            </button>
            {open && (
                <div className="profile-dropdown" style={{
                    position: "absolute",
                    right: 0,
                    top: "100%",
                    background: "#fff",
                    border: "1px solid #ddd",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    minWidth: "140px",
                    zIndex: 100
                }}>
                    <button className="dropdown-item" style={{
                        width: "100%",
                        padding: "10px",
                        background: "none",
                        border: "none",
                        textAlign: "left",
                        cursor: "pointer"
                    }}
                    onClick={() => {
                        onMenuClick('perfil');
                        setOpen(false);
                    }}
                    >
                        Perfil
                    </button>
                    <button className="dropdown-item" style={{
                        width: "100%",
                        padding: "10px",
                        background: "none",
                        border: "none",
                        textAlign: "left",
                        cursor: "pointer"
                    }}
                    onClick={() => {
                        onMenuClick('sair');
                        setOpen(false);
                    }}
                    >
                        Sair
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProfileComponent;