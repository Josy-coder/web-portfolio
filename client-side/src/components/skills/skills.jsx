import './skills.css';
import { skills } from '../../Data';


const Skills = () => {
  return (
    <section className='skills section' id='skills'>
        <h2 className='section__title text-cs'>
            Professional Skills
        </h2>
        <p className='section__subtitle'>
            My <span>Talent</span>
        </p>

        <div className='skills__container container grid'>
            {skills.map(({name, percentage, description}, index) => {
                return (
                    <div key={index} className='skills__item'>
                        <div className='skills__titles'>
                            <h3 className='skills__name'>
                                {name}
                            </h3>
                            <span className='skills__number'>
                                {percentage} <span>%</span>
                            </span>
                        </div>
                        <p className='skills__description'>
                            {description}
                        </p>
                        <div className='skills__bar'>
                            <span className='skills__percentage skills'>
                                <span></span>
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    </section>
  )
}

export default Skills;

