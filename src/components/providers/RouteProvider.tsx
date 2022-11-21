import React from 'react';
import { BrowserRouter } from 'react-router-dom';

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export const RouteProvider: React.FC<Props> = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;
