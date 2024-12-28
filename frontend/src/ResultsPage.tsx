import * as React from 'react';
const { useEffect, useState } = React;
import axios from 'axios';
import './ResultsPage.css';

// Définition de l'interface Player
interface Player {
    id: number;
    name: string;
    club: string;
    votes: number;
}

const ResultsPage: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        axios
            .get<Player[]>('http://localhost:3000/api/db/results')
            .then((response) => {
                console.log('Résultats des joueurs :', response.data);
                setPlayers(response.data);
            })
            .catch((error) => console.error('Erreur lors de la récupération des résultats :', error));
    }, []);

    return (
        <div className="results-container">
            <h2>Résultats des votes</h2>
            <table className="results-table">
                <thead>
                <tr>
                    <th>Rang</th>
                    <th>Nom</th>
                    <th>Club</th>
                    <th>Votes</th>
                </tr>
                </thead>
                <tbody>
                {players.map((player, index) => (
                    <tr key={player.id}>
                        <td>{index + 1}</td>
                        <td>{player.name}</td>
                        <td>{player.club}</td>
                        <td>{player.votes}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultsPage;
