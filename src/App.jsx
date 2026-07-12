import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import SaaSProduct from './pages/SaaSProduct';
import WorkspaceConsole from './pages/WorkspaceConsole';

const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -10 },
};

function App() {
  const [activePage, setActivePage] = useState('landing');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F2', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar hidden inside workspace since it has its own header */}
      {activePage !== 'workspace' && (
        <Navbar activePage={activePage} setActivePage={setActivePage} />
      )}

      <main style={{ flexGrow: 1 }}>
        <AnimatePresence mode="wait">
          {activePage === 'landing' && (
            <motion.div key="landing" variants={pageVariants}
              initial="initial" animate="animate" exit="exit"
              transition={{ duration: 0.24, ease: [0.25, 1, 0.5, 1] }}
            >
              <SaaSProduct setActivePage={setActivePage} />
            </motion.div>
          )}

          {activePage === 'workspace' && (
            <motion.div key="workspace" variants={pageVariants}
              initial="initial" animate="animate" exit="exit"
              transition={{ duration: 0.24, ease: [0.25, 1, 0.5, 1] }}
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
