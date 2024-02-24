import Items from './sub-components/Items';
import List from './sub-components/List';
import { projects } from '../../Data';
import shapeOne from '../../assets/shape-1.png';
import './portfolio.css';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';


const allNavList = [
    'all',
    ...new Set(projects.map((project) => project.category)),
];
console.log(allNavList);

const Portfolio = () => {

    const [projectItems, setMenuItems] = useState(projects);
    const [navList]= useState(allNavList);
    const filterItems = (category) => {

        if(category === 'all') {
            setMenuItems(projects);
            return;
        }


        const newProjectItems = projects.filter((item) => item.category ===category
        );

        setMenuItems(newProjectItems);
    };

  return (
    <section className='portfolio section' id='work'>
        <h2 className='section__title text-cs'>
            Portfolio
        </h2>

        <p className='section__subtitle'>
            My <span>Cases</span>
        </p>

        <List list={navList} filterItems={filterItems}/>

        <div className='portfolio__container container grid'>
            <AnimatePresence initial={false}>
                <Items projectItems={projectItems} />
            </AnimatePresence>
        </div>

        <div className='section__deco deco__right'>
            <img src={shapeOne} alt='' className='shape' />
        </div>

        <div className='section__bg-wrapper'>
                <span className='bg__title'>Portfolio</span>
            </div>
    </section>
  )
}

export default Portfolio;
