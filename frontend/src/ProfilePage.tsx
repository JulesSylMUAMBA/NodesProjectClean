import * as React from 'react';
const { useEffect, useState  } = React;
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProfilePage.css";

const ProfilePage = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState({
        name: "",
        favorite_club: "",
        vote_count: 0,
    });

    useEffect(() => {

        axios.get(`http://localhost:3000/api/db/profile/${id}`)
            .then((response) => {
                setProfile(response.data);
            })
            .catch((error) => console.error("Erreur lors de la récupération du profil :", error));
    }, [id]);

    return (
        <div className="profile-container">
            <h2>Profil de {profile.name}</h2>
            <p><strong>Club favori:</strong> {profile.favorite_club || "Non spécifié"}</p>
            <p><strong>Nombre de votes:</strong> {profile.vote_count}</p>
        </div>
    );
};

export default ProfilePage;
