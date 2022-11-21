import { Route, Routes, useNavigate } from 'react-router-dom';
import { SortOrder, usePrioritiesQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { Button } from '../atoms/Button';
import { Heading } from '../atoms/Heading';
import { Table } from '../atoms/Table';

import { PriorityDetails } from './PriorityDetails';

import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/solid';

export const PrioritiesList = () => {
  const { data } = usePrioritiesQuery({ orderBy: { id: SortOrder.Asc } });
  const navigate = useNavigate();
  return (
    <Box variant='view'>
      <Heading className='text-lg font-bold'>Priorities</Heading>
      <Box variant='row'>
        <Box className='w-full' data-todo='search' />
        <Button variant='secondary' onClick={() => navigate(`add`)}>
          Add Priority
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
          {data?.priorities.map((priority) => (
            <tr key={priority.id}>
              <td>{priority.id}</td>
              
              <td>{priority.name}</td>
              
              <td className='w-full'></td>
              <td>
                <Button
                  variant='icon'
                  icon={<EllipsisHorizontalCircleIcon />}
                  onClick={() => navigate(String(priority.id))}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Routes>
        <Route path=':id' element={<PriorityDetails />} />
        <Route path='add' element={<PriorityDetails />} />
      </Routes>
    </Box>
  );
};
