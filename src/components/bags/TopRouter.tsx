import { Route, Routes } from 'react-router-dom';

import routes from '../pages/routes';

export const TopRouter = () => (
  <Routes>
    {routes.map((route) => (
      <Route key={route.id} path={`/${route.url}/*`} element={route.element} />
    ))}
    <Route path='/' element='' />
  </Routes>
);
