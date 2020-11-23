import './App.css';
import NavBar from './components/NavBar';
import { Router } from '@reach/router';
import BestiaryList from './components/BestiaryList';
import BestiaryDetails from './components/BestiaryDetails';
import TemplateList from './components/TemplateList';

function App() {
  return (
    <>
    <NavBar />
    <main>
      <Router>
        <BestiaryList path="/"/>
        <BestiaryDetails path="bestiary/:id"/>
        <TemplateList path="/templates"/>
      </Router>
    </main>
    </>
  );
}

export default App;
