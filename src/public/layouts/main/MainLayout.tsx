// src/components/Layout.tsx
import { Component } from 'react';
import { Outlet } from 'react-router-dom';
import HeaderComponent from './HeaderComponent';

class MainLayout extends Component {
  render() {
    return (
      <div>
        <HeaderComponent />
        <main>
          <Outlet />
        </main>
      </div>
    );
  }
}

export default MainLayout;
