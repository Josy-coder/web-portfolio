import { FaDiscord, FaLinkedinIn, FaTelegramPlane } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer__container container grid">
            <div className="footer__socials">
                <a href="" className="footer__social-link">
                    <FaLinkedinIn/>
                </a>

                <a href="" className="footer__social-link">
                    <FaDiscord />
                </a>

                <a href="" className="footer__social-link">
                    <FaTelegramPlane />
                </a>
            </div>

            <p className="footer__copyright text-cs">
                &copy; 2024 <span>Portfolio</span>. All Rights Reserved
            </p>

            <p className="footer__copyright text-cs">
                Developed By <span>Joselyto</span>
            </p>
        </div>
    </footer>
  );
};

export default Footer;
