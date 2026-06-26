import Navbar from './components/Navbar';
import './components/styles.css';
import Container from './components/Container';
import ReactDOM from 'react-dom';
import "./App.css";

import "./App.css"
import Footer from './components/Footer';
import CustomCursor from './components/utils/CustomCursor';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className='app'>
        <CustomCursor />
        <Navbar />
        <Container />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
