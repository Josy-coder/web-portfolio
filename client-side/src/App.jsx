import './App.css';
import Home from './components/home/home';
import Services from './components/services/services';
import Skills from './components/skills/skills';
import Portfolio from './components/portfolio/portfolio';
import Resume from './components/resume/resume';
import Testimonials from './components/testimonials/testimonials';
import Pricing from './components/pricing/pricing';
import Blog from './components/blog/blog';
import Contact from './components/contact/contact';
import Footer from './components/footer/footer';
import Header from './components/header/header';

function App() {
  return (
    <main className="main">
      <Header />
      <Home />
      <Services />
      <Skills />
      <Portfolio />
      <Resume />
      <Testimonials />
      <Pricing />
      <Blog />
      <Contact />
      <Footer />
    </main>
  )
}

export default App;