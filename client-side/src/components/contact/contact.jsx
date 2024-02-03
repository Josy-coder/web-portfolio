import { useState } from 'react';
import './contact.css';
import {
    FaRegAddressBook,
    FaRegEnvelope,
    FaRegUser,
    FaRegMap
} from 'react-icons/fa';
import { axios } from 'axios';

const Contact = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

     const handleChange =(e) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm({...form, [name]: value});
     };

     const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(
            'https://sheet.best/api/sheets/048205eb-2e54-4d7c-ae88-3b0f40881995',
            form
        ).then((response) => {
            console.log(response);
        });
     };


  return (
    <section className='contact section' id='contact'>
        <h2 className='section__title text-cs'>Contact Me</h2>
        <p className='section__subtitle'>
           Let&apos;s <span> Talk About Ideas</span>
        </p>

        <div className='contact__container container grid'>
            <div className='contact__content'>
                <div className='contact__card'>
                    <span className='contact__card-icon'>
                        <FaRegMap />
                    </span>

                    <h3 className='contact__card-title'>Address</h3>
                    <p className='contact__card-data'>Kigali City, Rwanda</p>
                </div>

                <div className='contact__card'>
                    <span className='contact__card-icon'>
                        <FaRegUser />
                    </span>

                    <h3 className='contact__card-title'>Freelance</h3>
                    <p className='contact__card-data'>Available Right Now</p>
                </div>

                <div className='contact__card'>
                    <span className='contact__card-icon'>
                        <FaRegEnvelope />
                    </span>

                    <h3 className='contact__card-title'>Email</h3>
                    <p className='contact__card-data'>baho.charite@gmail.com</p>
                </div>

                <div className='contact__card'>
                    <span className='contact__card-icon'>
                        <FaRegAddressBook />
                    </span>

                    <h3 className='contact__card-title'>Phone</h3>
                    <p className='contact__card-data'>+250 784 069 806</p>
                </div >
            </div>

            <form className='contact__form'>
                <div className='contact__form-group grid'>
                    <div className='contact__form-div'>
                        <label className='contact__form-tag text-cs'>
                            Your Full Name <b>*</b>
                        </label>
                        <input
                            name='name'
                            value={form.name}
                            onChange={handleChange}
                            className='contact__form-input'
                            type='text'
                        />
                    </div>

                    <div className='contact__form-div'>
                        <label className='contact__form-tag text-cs'>
                            Your Email Address <b>*</b>
                        </label>
                        <input
                            name='email'
                            onChange={handleChange}
                            value={form.email}
                            className='contact__form-input'
                            type='email'
                        />
                    </div>
                </div>

                <div className='contact__form-div'>
                        <label className='contact__form-tag text-cs'>
                            Your Subject <b>*</b>
                        </label>
                        <input
                            name='subject'
                            onChange={handleChange}
                            value={form.subject}
                            className='contact__form-input'
                            type='text'
                        />
                    </div>

                    <div className='contact__form-div contact__form-area'>
                        <label className='contact__form-tag text-cs'>
                            Your Message <b>*</b>
                        </label>
                        <textarea
                            name='message'
                            onChange={handleChange}
                            value={form.message}
                            className='contact__form-input'
                        >

                        </textarea>
                    </div>

                    <div className='contact__submit'>
                        <p>* Accept the terms and conditions.</p>
                        <button type='submit' className='btn text-cs'>
                            Send Message
                        </button>
                    </div>
            </form>
        </div>
    </section>
  )
}

export default Contact;
