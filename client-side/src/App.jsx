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

function App() {
  return (
    <main className="main">
      <Home />
      <Services />
      <Skills />
      <Portfolio />
      <Resume />
      <Testimonials />
      <Pricing />
      <Blog />
      <Contact />
    </main>
  )
}

export default App;