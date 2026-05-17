import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { BackToTop } from './components/layout/BackToTop';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import NotFoundPage from './pages/NotFoundPage';
import ProgrammePage from './pages/Programme';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header />
            <HomePage />
            <Footer />
            <BackToTop />
          </>
        }
      />
      <Route
        path="/gallery"
        element={
          <>
            <Header />
            <GalleryPage />
            <Footer />
            <BackToTop />
          </>
        }
      />
      <Route
        path="/programme"
        element={
          <>
            <Header />
            <ProgrammePage />
            <Footer />
            <BackToTop />
          </>
        }
      />
      <Route
        path="*"
        element={
          <>
            <Header />
            <NotFoundPage />
            <Footer />
          </>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default App;
