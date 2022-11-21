import { Route, Routes, useNavigate } from 'react-router-dom';
import { SortOrder, useUsersQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { Button } from '../atoms/Button';
import { Heading } from '../atoms/Heading';
import { Table } from '../atoms/Table';

import { UserDetails } from './UserDetails';

import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/solid';

export const UsersList = () => {
  const { data } = useUsersQuery({ orderBy: { id: SortOrder.Asc } });
  const navigate = useNavigate();
  return (
    <Box variant='view'>
      <Heading className='text-lg font-bold'>Users</Heading>
      <Box variant='row'>
        <Box className='w-full' data-todo='search' />
        <Button variant='secondary' onClick={() => navigate(`add`)}>
          Add User
        </Button>
      </Box>
      <Table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            
            <th>Username</th>
            
            <th>First name</th>
            
            <th>Last name</th>
            
            <th>Email</th>
            
            <th>Role</th>
            
            <th>Phone</th>
            
            <th>Job Title</th>
            
            <th className='w-full'></th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data?.users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              
              <td>{user.username}</td>
              
              <td>{user.firstName}</td>
              
              <td>{user.lastName}</td>
              
              <td>{user.email}</td>
              
              <td>{user.role?.name}</td>
              
              <td>{user.phone}</td>
              
              <td>{user.jobTitle}</td>
              
              <td className='w-full'></td>
              <td>
                <Button
                  variant='icon'
                  icon={<EllipsisHorizontalCircleIcon />}
                  onClick={() => navigate(String(user.id))}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Routes>
        <Route path=':id' element={<UserDetails />} />
        <Route path='add' element={<UserDetails />} />
      </Routes>
    </Box>
  );
};
