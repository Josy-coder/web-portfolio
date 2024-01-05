import './App.css';
import Home from './components/home/home';
import Services from './components/services/services';
import Skills from './components/skills/skills';
import Portfolio from './components/portfolio/portfolio';

function App() {
  return (
    <main className="main">
      <Home />
      <Services />
      <Skills />
      <Portfolio />
    </main>
  )
}

export default App;