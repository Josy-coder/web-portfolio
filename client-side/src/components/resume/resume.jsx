import './resume.css'
import './sub-components/Card'
import { cv } from '../../Data';

const Resume = () => {
  return (
    <section className='resume section' id='resume'>
        <h2 className='section__title text-cs'>
            Resume
        </h2>

        <p className='section__subtitle'>
            My <span>Story</span>
        </p>

        <div className='resume__container container grid'>
            <div className='resume__group'>
                <h3 className='resume__heading'>
                    Education
                </h3>

                <div className='resume__items'>

                </div>

            </div>
        </div>
    </section>
  );
};

export default Resume;
