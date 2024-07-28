// src/routes.tsx
import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MapPage from './private/map/MapPage';
import MainLayout from './public/layouts/main/MainLayout';

class AppRoutes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<MapPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default AppRoutes;
