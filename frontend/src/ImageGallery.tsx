import * as React from 'react';
const { useEffect, useState } = React;

import axios from 'axios';
import './ImageGallery.css';

const ImageGallery: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);
    const [randomImages, setRandomImages] = useState<string[]>([]);


    const shuffleArray = (array: string[]): string[] => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const getRandomImages = (imagesList: string[]): string[] => {
        const shuffled = shuffleArray([...imagesList]);
        return shuffled.slice(0, 9);
    };

    useEffect(() => {
        axios
            .get('http://localhost:3000/api/db/winners')
            .then((response) => {
                const winners = response.data as { image: string }[]; // Ajout du type pour les données
                const imageUrls = winners.map((winner) => winner.image);
                setImages(imageUrls);
                setRandomImages(getRandomImages(imageUrls));
            })
            .catch((error) => console.error('Erreur lors de la récupération des gagnants :', error));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setRandomImages(getRandomImages(images));
        }, 5000);

        return () => clearInterval(interval);
    }, [images]);

    return (
        <div className="flex-container">
            {randomImages.map((img, index) => (
                <figure key={index}>
                    <img src={img} alt={`Winner ${index}`} />
                </figure>
            ))}
        </div>
    );
};

export default ImageGallery;
