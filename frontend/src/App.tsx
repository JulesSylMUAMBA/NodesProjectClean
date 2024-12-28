import * as React from 'react';
const { useContext } = React;

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import ImageGallery from './ImageGallery';
import PlayersList from './PlayersList';
import WinnersList from './WinnersList';
import ResultsPage from './ResultsPage';
import SearchPage from "./SearchPage";
import ProfilePage from "./ProfilePage";
import SignupPage from './SignupPage';
import SigninPage from './SigninPage';
import { UserContext } from './UserContext';
import './App.css';

const App: React.FC = () => {
    const { user, setUser } = useContext(UserContext);

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <Router>
            <div className="app-container">
                {/* Navigation Bar */}
                <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
                    <Container>
                        <Navbar.Brand as={Link} to="/" className="navbar-brand">
                            Ballon d'Or
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" role="navigation">
                        <Nav className="me-auto">
                                <Nav.Link as={Link} to="/players" className="nav-link">
                                    Nominés 2025
                                </Nav.Link>
                                <Nav.Link as={Link} to="/winners" className="nav-link">
                                    Anciens gagnants
                                </Nav.Link>
                                <Nav.Link as={Link} to="/results" className="nav-link">
                                    Résultats
                                </Nav.Link>
                                <Nav.Link as={Link} to="/search" className="nav-link">
                                    Recherche
                                </Nav.Link>
                            </Nav>
                            <Nav>
                                {user ? (
                                    <>
                                        <Nav.Link as={Link} to={`/profile/${user.id}`} className="ms-auto nav-link">
                                            Profil
                                        </Nav.Link>
                                        <Nav.Link
                                            onClick={handleLogout}
                                            className="ms-auto nav-link logout-link"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            Déconnexion
                                        </Nav.Link>
                                    </>
                                ) : (
                                    <>
                                        <Nav.Link as={Link} to="/signup" className="ms-auto nav-link">
                                            Signup
                                        </Nav.Link>
                                        <Nav.Link as={Link} to="/signin" className="ms-auto nav-link">
                                            Signin
                                        </Nav.Link>
                                    </>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                {/* Page Content */}
                <div className="content-container">
                    <Routes>
                        <Route path="/" element={<ImageGallery />} />
                        <Route path="/players" element={<PlayersList />} />
                        <Route path="/winners" element={<WinnersList />} />
                        <Route path="/results" element={<ResultsPage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/profile/:id" element={<ProfilePage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/signin" element={<SigninPage />} />
                       
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
