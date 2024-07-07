// src/components/Layout.tsx
import React from 'react';
import NavBar from './NavBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main className="container mx-auto p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;
