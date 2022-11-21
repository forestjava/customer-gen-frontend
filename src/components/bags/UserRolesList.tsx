import { Route, Routes, useNavigate } from 'react-router-dom';
import { SortOrder, useUserRolesQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { Button } from '../atoms/Button';
import { Heading } from '../atoms/Heading';
import { Table } from '../atoms/Table';

import { UserRoleDetails } from './UserRoleDetails';

import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/solid';

export const UserRolesList = () => {
  const { data } = useUserRolesQuery({ orderBy: { id: SortOrder.Asc } });
  const navigate = useNavigate();
  return (
    <Box variant='view'>
      <Heading className='text-lg font-bold'>UserRoles</Heading>
      <Box variant='row'>
        <Box className='w-full' data-todo='search' />
        <Button variant='secondary' onClick={() => navigate(`add`)}>
          Add UserRole
        </Button>
      </Box>
      <Table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            
            <th>Name</th>
            
            <th className='w-full'></th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data?.userRoles.map((userRole) => (
            <tr key={userRole.id}>
              <td>{userRole.id}</td>
              
              <td>{userRole.name}</td>
              
              <td className='w-full'></td>
              <td>
                <Button
                  variant='icon'
                  icon={<EllipsisHorizontalCircleIcon />}
                  onClick={() => navigate(String(userRole.id))}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Routes>
        <Route path=':id' element={<UserRoleDetails />} />
        <Route path='add' element={<UserRoleDetails />} />
      </Routes>
    </Box>
  );
};
