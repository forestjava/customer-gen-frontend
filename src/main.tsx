import React from 'react';
import ReactDOM from 'react-dom/client';

import './main.scss';
import { Dashboard } from './components/pages/Dashboard';

import { DataAccessProvider } from './components/providers/DataAccessProvider';
import { RouteProvider } from './components/providers/RouteProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouteProvider>
      <DataAccessProvider>
        <Dashboard />
      </DataAccessProvider>
    </RouteProvider>
  </React.StrictMode>,
);
