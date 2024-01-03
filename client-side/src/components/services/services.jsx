import './services.css';
import { services } from '../../Data';
import { FaArrowRight } from 'react-icons/fa';



const Services = () => {
  return (
    <section className='services section' id='services'>
        <h2 className='section__title text-cs'>What I Do</h2>
        <p className='section__subtitle'>
            My <span>Services</span>
        </p>

        <div className='services__container container'>
            {services.map(({name,title, description}, index) => {
                return (
                    <div className='services__item card card-one'>
                        <span className='services__subtitle text-cs'>
                            {name}
                        </span>

                        <h3 className='services__item title'>
                            {title}
                        </h3>

                        <p className='serices__description'>
                            {description}
                        </p>

                        <a href="" className='link'>
                           See Pricing
                           <FaArrowRight className='link__icon'></FaArrowRight>
                        </a>

                    </div>
                )
            })}
        </div>
    </section>
  )
}

export default Services;
