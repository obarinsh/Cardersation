import '../css/navbar.css';
import { Link } from 'react-router-dom';

const NavBar = ({ user, isAuthenticated, onLogout }:
    {
        user: any,
        isAuthenticated: boolean,
        onLogout: () => void
    }) => {
    return (
        <header className="main-header">
            <div className="header-left">
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h1>Cardersation</h1>
                </Link>
            </div>
            <div className="header-right">
                {isAuthenticated ? (
                    <>
                        <span className="welcome-text">Welcome, {user?.username}!</span>
                        <button className="auth-button" onClick={onLogout}>Log out</button>
                    </>
                ) : (
                    <div className="auth-buttons">
                        <Link to="/signup" className="auth-button">Sign up</Link>
                        <Link to="/signin" className="auth-button">Log in</Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default NavBar;
