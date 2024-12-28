import 'bootstrap/dist/css/bootstrap.min.css';
import 'core-js/es/promise';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import './index.css';
import { UserProvider } from './UserContext';


createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <UserProvider> {/* Entoure l'application avec UserProvider */}
            <App />
        </UserProvider>
    </React.StrictMode>
);
