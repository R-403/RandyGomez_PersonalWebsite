import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import P4Menu from './components/P4Menu/P4Menu';
import AboutMe from './components/P4Menu/AboutMe';
import SideProjects from './components/P4Menu/SideProjects';
import Resume from './components/P4Menu/Resume';
import SfxToggle from './components/P4Menu/SfxToggle';

// How long each half of the route-wipe transition takes, in ms. Must match
// the transition duration on .p4-wipe--covering / .p4-wipe--revealing in index.css.
const WIPE_MS = 260;

function Home() {
  const navigate = useNavigate();
  return <P4Menu onNavigate={navigate} />;
}

function Page({ component: Component }) {
  const navigate = useNavigate();
  return <Component onBack={() => navigate('/')} onNavigate={navigate} />;
}

/**
 * Swaps routes behind a brief diagonal wipe instead of an abrupt cut: cover the
 * screen, swap the page underneath, then reveal it. No animation library —
 * just a delayed route swap plus a CSS transform (see .p4-wipe in index.css).
 */
function AnimatedRoutes() {
  const location = useLocation();
  const [shown, setShown] = useState(location);
  const [stage, setStage] = useState('idle'); // 'idle' | 'covering' | 'revealing'

  useEffect(() => {
    if (location.pathname === shown.pathname) return undefined;
    setStage('covering');
    const cover = setTimeout(() => {
      setShown(location);
      setStage('revealing');
    }, WIPE_MS);
    return () => clearTimeout(cover);
  }, [location, shown]);

  useEffect(() => {
    if (stage !== 'revealing') return undefined;
    const reveal = setTimeout(() => setStage('idle'), WIPE_MS);
    return () => clearTimeout(reveal);
  }, [stage]);

  return (
    <>
      <div className={`p4-wipe p4-wipe--${stage}`} aria-hidden="true" />
      <Routes location={shown}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Page component={AboutMe} />} />
        <Route path="/projects" element={<Page component={SideProjects} />} />
        <Route path="/resume" element={<Page component={Resume} />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="p4-grain" aria-hidden="true" />
      <SfxToggle />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
