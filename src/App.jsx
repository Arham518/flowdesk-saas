import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import SaaSProduct from './pages/SaaSProduct';
import WorkspaceConsole from './pages/WorkspaceConsole';

const pageVariants = {
  initial: { opacity: 0, y: 18, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit:    { opacity: 0, y: -12, filter: 'blur(6px)' },
};

function App() {
  const [activePage, setActivePage] = useState('landing');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F2', display: 'flex', flexDirection: 'column' }}>
      <motion.div aria-hidden style={{ scaleX: progress, transformOrigin: '0%', position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 1000, background: 'linear-gradient(90deg, #C9A227, #E4C35A, #7C6CFF)' }} />
      {/* Navbar hidden inside workspace since it has its own header */}
      {activePage !== 'workspace' && (
        <Navbar activePage={activePage} setActivePage={setActivePage} />
      )}

      <main style={{ flexGrow: 1 }}>
        <AnimatePresence mode="wait">
          {activePage === 'landing' && (
            <motion.div key="landing" variants={pageVariants}
              initial="initial" animate="animate" exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <SaaSProduct setActivePage={setActivePage} />
            </motion.div>
          )}

          {activePage === 'workspace' && (
            <motion.div key="workspace" variants={pageVariants}
              initial="initial" animate="animate" exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <WorkspaceConsole setActivePage={setActivePage} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
