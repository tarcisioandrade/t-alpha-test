import { cn } from '@/lib/utils';
import React, { ComponentProps } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header';

const Layout = ({ children, className, ...props }: ComponentProps<'main'>) => {
  return (
    <React.Fragment>
      <main className={cn()} {...props}>
        <Header />
        <Outlet />
      </main>
    </React.Fragment>
  );
};

export default Layout;
