import Navbar from './components/Navbar';
import './components/styles.css';
import Container from './components/Container';
import ReactDOM from 'react-dom';
import "./App.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { byPrefixAndName } from '@awesome.me/kit-KIT_CODE/icons'

import "./App.css"
import Footer from './components/Footer';
function App() {
  return (
    <div className='app'>
      <Navbar />
      <Container />
      <Footer />
    </div>
  );
}

export default App;
