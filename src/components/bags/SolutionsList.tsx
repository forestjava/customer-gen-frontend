import { Route, Routes, useNavigate } from 'react-router-dom';
import { SortOrder, useSolutionsQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { Button } from '../atoms/Button';
import { Heading } from '../atoms/Heading';
import { Table } from '../atoms/Table';

import { SolutionDetails } from './SolutionDetails';

import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/solid';

export const SolutionsList = () => {
  const { data } = useSolutionsQuery({ orderBy: { id: SortOrder.Asc } });
  const navigate = useNavigate();
  return (
    <Box variant='view'>
      <Heading className='text-lg font-bold'>Solutions</Heading>
      <Box variant='row'>
        <Box className='w-full' data-todo='search' />
        <Button variant='secondary' onClick={() => navigate(`add`)}>
          Add Solution
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
          {data?.solutions.map((solution) => (
            <tr key={solution.id}>
              <td>{solution.id}</td>
              
              <td>{solution.name}</td>
              
              <td className='w-full'></td>
              <td>
                <Button
                  variant='icon'
                  icon={<EllipsisHorizontalCircleIcon />}
                  onClick={() => navigate(String(solution.id))}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Routes>
        <Route path=':id' element={<SolutionDetails />} />
        <Route path='add' element={<SolutionDetails />} />
      </Routes>
    </Box>
  );
};
