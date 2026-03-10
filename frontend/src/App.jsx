import React, { Suspense } from 'react';
import { InitialDataProvider } from './hooks/useInitialData';
import NavBar from './components/NavBar';
import Loader from './components/Loader';
import NotFound from './pages/NotFound';

// lazy pages
const Home     = React.lazy(() => import('./pages/Home'));
const CV       = React.lazy(() => import('./pages/CV'));
const Projects = React.lazy(() => import('./pages/Projects'));
const Veille   = React.lazy(() => import('./pages/Veille'));
const Journey  = React.lazy(() => import('./pages/Journey'));
const RSS      = React.lazy(() => import('./pages/RSS'));

const PAGE_MAP = { home: Home, cv: CV, projects: Projects, veille: Veille, journey: Journey, rss: RSS };

function App() {
  const rootEl = document.getElementById('react-root');
  const page   = rootEl?.dataset.page || 'home';

  const PageComp = PAGE_MAP[page] || NotFound;

  return (
    <InitialDataProvider>
      <NavBar page={page} />
      <Suspense fallback={<Loader />}>
        <div className="pt-24 animate-fade-in">
          <PageComp />
        </div>
      </Suspense>
    </InitialDataProvider>
  );
}

export default App;
