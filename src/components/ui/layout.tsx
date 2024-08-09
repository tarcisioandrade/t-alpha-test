import { cn } from '@/lib/utils';
import React, { ComponentProps } from 'react';
import { Outlet } from 'react-router-dom';

const Layout = ({ children, className, ...props }: ComponentProps<'main'>) => {
  return (
    <React.Fragment>
      <main className={cn()} {...props}>
        layout
        <Outlet />
      </main>
    </React.Fragment>
  );
};

export default Layout;
