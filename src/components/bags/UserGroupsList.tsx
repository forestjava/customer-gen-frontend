import { Route, Routes, useNavigate } from 'react-router-dom';
import { SortOrder, useUserGroupsQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { Button } from '../atoms/Button';
import { Heading } from '../atoms/Heading';
import { Table } from '../atoms/Table';

import { UserGroupDetails } from './UserGroupDetails';

import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/solid';

export const UserGroupsList = () => {
  const { data } = useUserGroupsQuery({ orderBy: { id: SortOrder.Asc } });
  const navigate = useNavigate();
  return (
    <Box variant='view'>
      <Heading className='text-lg font-bold'>UserGroups</Heading>
      <Box variant='row'>
        <Box className='w-full' data-todo='search' />
        <Button variant='secondary' onClick={() => navigate(`add`)}>
          Add UserGroup
        </Button>
      </Box>
      <Table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            
            <th>Name</th>
            
            <th>Description</th>
            
            <th>Color</th>
            
            <th className='w-full'></th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data?.userGroups.map((userGroup) => (
            <tr key={userGroup.id}>
              <td>{userGroup.id}</td>
              
              <td>{userGroup.name}</td>
              
              <td>{userGroup.description}</td>
              
              <td>{userGroup.color}</td>
              
              <td className='w-full'></td>
              <td>
                <Button
                  variant='icon'
                  icon={<EllipsisHorizontalCircleIcon />}
                  onClick={() => navigate(String(userGroup.id))}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Routes>
        <Route path=':id' element={<UserGroupDetails />} />
        <Route path='add' element={<UserGroupDetails />} />
      </Routes>
    </Box>
  );
};
