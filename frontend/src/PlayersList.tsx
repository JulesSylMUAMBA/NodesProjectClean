import * as React from 'react';
const { useEffect, useState, useContext } = React;
import axios from 'axios';
import './PlayersList.css';
import { UserContext } from './UserContext';


interface Player {
    id: number;
    name: string;
    club: string;
    votes: number;
    photo_url: string;
}

const PlayersList: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        axios
            .get<Player[]>('http://localhost:3000/api/db/players')
            .then((response) => {
                console.log('Données des joueurs :', response.data);
                setPlayers(response.data);
            })
            .catch((error) => console.error('Erreur lors de la récupération des joueurs :', error));
    }, []);

    const handleVote = (playerId: number) => {
        if (!user) {
            alert('Vous devez être connecté pour voter.');
            return;
        }

        axios
            .post('http://localhost:3000/api/db/vote', { playerId, userId: user.id })
            .then(() => {
                alert('Vote enregistré !');


                setPlayers((prevPlayers) =>
                    prevPlayers.map((player) =>
                        player.id === playerId ? { ...player, votes: player.votes + 1 } : player
                    )
                );
            })
            .catch((error) => {
                console.error('Erreur lors de l\'enregistrement du vote :', error.response?.data || error.message);
                alert('Erreur lors du vote : ' + (error.response?.data || 'Veuillez réessayer.'));
            });
    };

    return (
        <div className="player-container">
            <h2>Liste des joueurs</h2>
            <div className="players-grid">
                {players.map((player) => (
                    <div key={player.id} className="player-card">
                        <img src={player.photo_url} alt={player.name} className="player-photo" />
                        <h3>{player.name}</h3>
                        <p>{player.club}</p>
                        <p>Votes : {player.votes}</p>
                        <button onClick={() => handleVote(player.id)}>Voter</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlayersList;
