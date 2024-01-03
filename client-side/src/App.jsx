import './App.css';
import Home from './components/home/home';
import Services from './components/services/services';
import Skills from './components/skills/skills';

function App() {
  return (
    <main className="main">
      <Home />
      <Services />
      <Skills />
    </main>
  )
}

export default App;