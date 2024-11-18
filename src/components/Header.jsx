import { Link } from 'react-scroll';

function Header({ toggleTheme }) {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="home" smooth={true} duration={500}>Home</Link></li>
                    <li><Link to="about" smooth={true} duration={500}>About</Link></li>
                    <li><Link to="projects" smooth={true} duration={500}>Projects</Link></li>
                    <li><Link to="contact" smooth={true} duration={500}>Contact</Link></li>
                </ul>
            </nav>
            <button className="theme-toggle-button" onClick={toggleTheme}>
                Toggle Theme
            </button>
        </header>
    );
}

export default Header;
