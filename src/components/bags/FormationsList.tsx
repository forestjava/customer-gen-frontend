import { Route, Routes, useNavigate } from 'react-router-dom';
import { SortOrder, useFormationsQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { Button } from '../atoms/Button';
import { Heading } from '../atoms/Heading';
import { Table } from '../atoms/Table';

import { FormationDetails } from './FormationDetails';

import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/solid';

export const FormationsList = () => {
  const { data } = useFormationsQuery({ orderBy: { id: SortOrder.Asc } });
  const navigate = useNavigate();
  return (
    <Box variant='view'>
      <Heading className='text-lg font-bold'>Formations</Heading>
      <Box variant='row'>
        <Box className='w-full' data-todo='search' />
        <Button variant='secondary' onClick={() => navigate(`add`)}>
          Add Formation
        </Button>
      </Box>
      <Table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            
            <th>Name</th>
            
            <th>Address</th>
            
            <th>Region</th>
            
            <th className='w-full'></th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data?.formations.map((formation) => (
            <tr key={formation.id}>
              <td>{formation.id}</td>
              
              <td>{formation.name}</td>
              
              <td>{formation.address}</td>
              
              <td>{formation.region?.name}</td>
              
              <td className='w-full'></td>
              <td>
                <Button
                  variant='icon'
                  icon={<EllipsisHorizontalCircleIcon />}
                  onClick={() => navigate(String(formation.id))}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Routes>
        <Route path=':id' element={<FormationDetails />} />
        <Route path='add' element={<FormationDetails />} />
      </Routes>
    </Box>
  );
};
