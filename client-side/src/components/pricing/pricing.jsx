import { FaArrowRight, FaCheck } from "react-icons/fa";
import "./pricing.css";

const Pricing = () => {
  return (
    <section className="pricing section" id="pricing">
        <h2 className="section__title text-cs">Pricing</h2>
        <p className="section__subtitle">
            My<span>Pricing Board</span>
        </p>

        <div className="prcing__container container grid">
            <div className="pricing__item card card-one">
                <span className="pricing__subtitle text-cs">Hourly Basis</span>
                <h3 className="pricing__price">
                   39 <span>$</span> <em>Hour</em>
                </h3>

                <p className="pricing__description">
                    Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidiunt ut
                </p>

                <ul className="pricing__list">
                    <li className="list__item">
                        <FaCheck className="list__icon"></FaCheck>
                        <span>Brand Design</span>
                    </li>

                    <li className="list__item">
                        <FaCheck className="list__icon"></FaCheck>
                        <span>Web Development</span>
                    </li>

                    <li className="list__item">
                        <del>Advertising</del>
                    </li>

                    <li className="list__item">
                        <del>Photography</del>
                    </li>
                </ul>

                <a href="" className="btn pricing__btn">
                    Download Quote
                    <FaArrowRight className="pricing__btn-icon"></FaArrowRight>
                </a>

            </div>

        </div>
    </section>
  )
}

export default Pricing;
