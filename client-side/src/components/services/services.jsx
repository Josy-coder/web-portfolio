import './services.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { services } from '../../Data';
import { FaArrowRight } from 'react-icons/fa';



const Services = () => {
  return (
    <section className='services section' id='services'>
        <h2 className='section__title text-cs'>What I Do</h2>
        <p className='section__subtitle'>
            My <span>Services</span>
        </p>

        <Swiper
            pagination={{
                clickable: true
            }}
            slidesPerView={1}
            spaceBetween={10}
            breakpoints={{
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 50,
                },
            }}
            modules={[Pagination]}
            className='services__container container mySwiper'
        >
            {services.map(({name,title, description}, index) => {
                return (
                    <SwiperSlide key={index} className='services__item card card-one'>
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

                    </SwiperSlide>
                )
            })}
        </Swiper>
    </section>
  )
}

export default Services;
