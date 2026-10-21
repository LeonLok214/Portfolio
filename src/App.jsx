import { Cursor } from './components/Cursor';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Work } from './components/Work';
import { Archive } from './components/Archive';
import { Expertise } from './components/Expertise';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { usePortfolioMotion } from './hooks/usePortfolioMotion';

export default function App() {
  usePortfolioMotion();

  return (
    <div className="site">
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Archive />
        <Expertise />
        <Achievements />
        <Contact />
      </main>
    </div>
  );
}
