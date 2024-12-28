import * as React from 'react';
const { useState, useContext  } = React;

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';
import './SigninPage.css';

const SigninPage: React.FC = () => {
    const [formData, setFormData] = useState<{ name: string; password: string }>({
        name: '',
        password: '',
    });
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/db/signin', formData);
            alert('Connexion réussie !');
            setUser(response.data.user);
            navigate(`/profile/${response.data.user.id}`);
        } catch (error: any) {
            console.error('Erreur lors de la connexion :', error.response?.data || error.message);
            alert('Connexion échouée. Veuillez vérifier vos informations.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Connexion</h2>
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
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default SigninPage;
