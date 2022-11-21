import { Box } from '../atoms/Box';
import { NavLink } from '../atoms/NavLink';

import routes from '../pages/routes';

export const NavBar = () => (
  <Box variant='nav-bar'>
    {routes.map((route) => (
      <NavLink key={route.id} variant='nav-link' to={route.url}>
        {route.name}
      </NavLink>
    ))}
  </Box>
);
