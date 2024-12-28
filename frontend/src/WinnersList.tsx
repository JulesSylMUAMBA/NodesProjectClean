import * as React from 'react';
const { useEffect, useState } = React;

import axios from "axios";
import "./WinnersList.css";

// Définir une interface pour typer les gagnants
interface Winner {
    year: number;
    image: string;
    name: string;
}

const WinnersList: React.FC = () => {
    const [winners, setWinners] = useState<Winner[]>([]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/db/winners")
            .then((response) => {
                console.log("Données des gagnants :", response.data);
                setWinners(response.data);
            })
            .catch((error) =>
                console.error("Erreur lors de la récupération des gagnants :", error)
            );
    }, []);

    return (
        <div className="winners-container">
            <h2>Palmarès des Ballon d'Or</h2>
            <div className="winners-grid">
                {winners.map((winner) => (
                    <div key={winner.year} className="winner-card">
                        <div
                            className="winner-picture"
                            style={{ backgroundImage: `url(${winner.image})` }}
                        ></div>
                        <div className="winner-details">
                            <span className="winner-year">{winner.year}</span>
                            <span className="winner-name">{winner.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WinnersList;
