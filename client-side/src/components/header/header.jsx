import './header.css';
import { links } from '../../Data';
import { FaDiscord, FaLinkedinIn, FaTelegramPlane } from 'react-icons/fa';
import { BsSun, BsMoon } from 'react-icons/bs';
import { useState } from 'react';


const Header = () => {
    const [showMenu, setShowMenu] = useState(false);

    return (
    <header className='header'>
        <nav className='nav'>
            <a href="" className='nav__logo text-cs'>
                Joselyto
            </a>

            <div
                className={`${showMenu ? 'nav__menu show-menu' : 'nav__menu'}`}
            >
                <div className='nav__data'>
                    <ul className='nav__list'>
                        {links.map(({name, path}, index) => {
                            return (
                                <li className='nav__item' key={index}>
                                    <a href={`#${path}`} className="nav__link text-cs">
                                        {name}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="header__socials">
                        <a href="" className="header__social-link">
                            <FaLinkedinIn />
                        </a>

                        <a href="" className="header__social-link">
                            <FaDiscord />
                        </a>

                        <a href="" className="header__social-link">
                            <FaTelegramPlane />
                        </a>
                    </div>
                </div>
            </div>

            <div className="nav__btns">
                <div className="theme_toggler">
                    <BsSun size={20}/>
                </div>

                <div
                    className={`${showMenu ? 'nav__toggle animate-toggle' : 'nav__toggle'}`}
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    </header>

  );
};

export default Header;
