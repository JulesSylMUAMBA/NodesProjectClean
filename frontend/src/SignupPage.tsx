import * as React from 'react';
const { useState, useContext } = React;

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";
import "./SignupPage.css";


interface FormData {
    name: string;
    password: string;
    favorite_club: string;
    profile_photo: File | null;
}

const SignupPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        password: "",
        favorite_club: "",
        profile_photo: null,
    });
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, profile_photo: e.target.files[0] });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.password) {
            alert("Veuillez remplir tous les champs requis.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:3000/api/db/signup",
                {
                    name: formData.name,
                    password: formData.password,
                    favorite_club: formData.favorite_club || "",
                },
                {
                    headers: {
                        "Content-Type": "application/json", // Envoyer en JSON
                    },
                }
            );
            alert("Inscription réussie !");
            setUser(response.data.user);
            navigate(`/profile/${response.data.user.id}`);
        } catch (error: any) {
            console.error(
                "Erreur lors de l'inscription :",
                error.response?.data || error.message
            );
            alert("Inscription échouée. Veuillez vérifier les informations saisies.");
        }
    };

    return (
        <div className="auth-container">
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nom d'utilisateur"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="favorite_club"
                    placeholder="Club favori"
                    value={formData.favorite_club}
                    onChange={handleChange}
                />
                <input
                    type="file"
                    name="profile_photo"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                />
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
};

export default SignupPage;
