import Items from './sub-components/Items';
import List from './sub-components/List';
import { projects } from '../../Data';
import './portfolio.css';
import { useState } from 'react';


const allNavList = [
    'all',
    ...new Set(projects.map((project) => project.category)),
];
console.log(allNavList);

const Portfolio = () => {

    const [projectItems, setMenuItems] = useState(projects);
    const [navList, setCategories]= useState(allNavList);

  return (
    <section className='portfolio section' id='work'>
        <h2 className='section__title text-cs'>
            Portfolio
        </h2>

        <p className='section__subtitle'>
            My <span>Cases</span>
        </p>

        <List list={navList}/>

        <div className='portfolio__container container grid'>
            <Items projectItems={projectItems} />
        </div>
    </section>
  )
}

export default Portfolio;
