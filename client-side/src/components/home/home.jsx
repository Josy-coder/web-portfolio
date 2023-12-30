
import { useState, useEffect, useMemo } from 'react';
import profileImg from '../../assets/profile-img.png';
import shapeOne from '../../assets/shape-1.png';
import shapeTwo from '../../assets/shape-2.png';
import { FaLinkedinIn, FaDiscord, FaTelegramPlane} from "react-icons/fa";
import './home.css';

const Home = () => {
    const names = useMemo(() => ["Kemana", "Joselyto", "Charite"], []);

    const [nameIndex, setNameIndex] = useState(0);
    const [name, setName] = useState(names[nameIndex]);

    useEffect(() => {
        const timer = setInterval(() => {
            setNameIndex((prevIndex) => (prevIndex + 1) % names.length);
        }, 2000);

        return () => clearInterval(timer);
    }, [names.length]);

    useEffect(() => {
        setName(names[nameIndex]);
    }, [nameIndex, names]);

    return (
        <section className='home' id='home'>
            <div className='home__container container'>

                <p className='home__subtitle text-cs'>
                    Hello, <span>My Name Is</span>
                </p>

                <h1 className='home__title text-cs'>
                    <span>Baho</span> {name}
                </h1>

                <p className='home__job'>
                    <span className='text-cs'>I Am A </span> <b>Fullstack Developer</b>
                </p>

                <div className='home__img-wrapper'>
                    <div className='home__banner'>
                        <img src={profileImg} alt='profile image' className='home__profile' />
                    </div>

                    <p className='home__data home__data-one'>
                        <span className='text-lg'>
                            4 <b>+</b>
                        </span>

                        <span className='text-sm text-cs'>
                            Years of <span>Experience</span>
                        </span>
                    </p>

                    <p className='home__data home__data-two'>
                        <span className='text-lg'>
                            50
                        </span>

                        <span className='text-sm text-cs'>
                            Completed <span>Projects</span>
                        </span>
                    </p>
                </div>

                <p className='home__text'>
                Tech Enthusiast with vibrant vibes. I code with the enthusiasm—no coffee required! Sci-fi movies are my escape pods, and books are my DIY movies – I&apos;m the director in my mind cinema. Dream? Build my own tech company, but first, a stint in the tech trenches. Jamming to 21 Pilots, Imagine Dragons, and secretly wishing Sia could narrate my life. Laughter is my code&apos;s best friend—keeping it nerdy & nice!
                </p>

                <div className='home__socials'>

                    <a href="" className='home__social-link'>
                        <FaLinkedinIn />
                    </a>

                    <a href="" className='home__social-link'>
                        <FaDiscord />
                    </a>

                    <a href="" className='home__social-link'>
                        <FaTelegramPlane />
                    </a>

                </div>

                <div className='home__btns'>

                    <a href='' className='btn text-cs'>Download CV</a>

                    <a href='' className='hero__link text-cs'>My Skills</a>

                </div>
            </div>
        </section>
    );
};

export default Home
