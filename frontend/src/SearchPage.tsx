import * as React from 'react';
const { useState } = React;
import axios from "axios";
import "./SearchPage.css";


interface Player {
    id: number;
    name: string;
    photo_url: string;
}

interface Winner {
    year: number;
    name: string;
    photo_url: string;
    player_name: string;
}


interface SearchResults {
    players: Player[];
    winners: Winner[];
}

const SearchPage: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [club, setClub] = useState<string>("");
    const [year, setYear] = useState<string>("");
    const [results, setResults] = useState<SearchResults>({ players: [], winners: [] });

    const handleSearch = () => {
        axios
            .get<SearchResults>("http://localhost:3000/api/db/search", {
                params: { name, club, year },
            })
            .then((response) => {
                setResults(response.data);
            })
            .catch((error) => {
                console.error("Erreur lors de la recherche :", error);
            });
    };

    return (
        <div className="search-container">
            <h2>Recherche</h2>
            <div className="search-filters">
                <input
                    type="text"
                    placeholder="Nom du joueur"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Club"
                    value={club}
                    onChange={(e) => setClub(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Année (pour les gagnants)"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
                <button onClick={handleSearch}>Rechercher</button>
            </div>
            <div className="search-results">
                <h3>Résultats des Nominés 2025</h3>
                <div className="results-grid">
                    {results.players.map((player) => (
                        <div key={player.id} className="result-card">
                            <img src={player.photo_url} alt={player.name} />
                            <h4>{player.name}</h4>
                        </div>
                    ))}
                </div>

                <h3>Résultats des Anciens Gagnants</h3>
                <div className="results-grid">
                    {results.winners.map((winner) => (
                        <div key={winner.year} className="result-card">
                            <img src={winner.photo_url} alt={winner.name} />
                            <h4>{winner.player_name}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
