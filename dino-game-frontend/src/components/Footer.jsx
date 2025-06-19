import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <p className="footer-text">
                    &copy; {new Date().getFullYear()} Dino Game. All rights reserved.
                </p>
                <div className="footer-icons">
                    <a
                        href="https://www.linkedin.com/in/mohammad-farman-900289220/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin size={24} />
                    </a>
                    <a
                        href="https://github.com/farman13/EndlessRunnerGame-web3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                        aria-label="GitHub"
                    >
                        <FaGithub size={24} />
                    </a>
                    <a
                        href="mailto:farman327440@gmail.com"
                        className="footer-link"
                        aria-label="Email"
                    >
                        <FaEnvelope size={24} />
                    </a>
                </div>
            </div>
            <div className="footer-credit">
                ~ Developed by Farman
            </div>
        </footer>
    );
};

export { Footer };
