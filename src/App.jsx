import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Terminal from './components/Terminal';
import Education from './components/Education';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Logs from './components/Logs';
import Contact from './components/Contact';
import ActionDock from './components/ActionDock';
import CustomCursor from './components/utils/CustomCursor';
import { ThemeProvider } from './context/ThemeContext';
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <div className='app'>
        <div className="telemetry-grid-bg"></div>
        <CustomCursor />
        <div className="relative z-10 flex flex-col min-h-screen w-full">
          <Navbar />
          <main className="flex-1 w-full max-w-[1440px] mx-auto px-8 md:px-12 pt-32 pb-24 flex flex-col gap-[120px]">
            <Hero />
            <Terminal />
            <Education />
            <Projects />
            <Skills />
            <Logs />
            <Contact />
          </main>

          <ActionDock />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
