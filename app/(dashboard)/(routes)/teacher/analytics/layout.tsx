// app/teacher/analytics/layout.tsx
import React from 'react';
import { Topbar } from './_components/topbar';

const AnalyticsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Topbar />
      <main>{children}</main>
    </>
  );
};

export default AnalyticsLayout;
