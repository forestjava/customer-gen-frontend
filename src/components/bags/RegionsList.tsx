import { Route, Routes, useNavigate } from 'react-router-dom';
import { SortOrder, useRegionsQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { Button } from '../atoms/Button';
import { Heading } from '../atoms/Heading';
import { Table } from '../atoms/Table';

import { RegionDetails } from './RegionDetails';

import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/solid';

export const RegionsList = () => {
  const { data } = useRegionsQuery({ orderBy: { id: SortOrder.Asc } });
  const navigate = useNavigate();
  return (
    <Box variant='view'>
      <Heading className='text-lg font-bold'>Regions</Heading>
      <Box variant='row'>
        <Box className='w-full' data-todo='search' />
        <Button variant='secondary' onClick={() => navigate(`add`)}>
          Add Region
        </Button>
      </Box>
      <Table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            
            <th>Name</th>
            
            <th>Company</th>
            
            <th className='w-full'></th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data?.regions.map((region) => (
            <tr key={region.id}>
              <td>{region.id}</td>
              
              <td>{region.name}</td>
              
              <td>{region.company?.name}</td>
              
              <td className='w-full'></td>
              <td>
                <Button
                  variant='icon'
                  icon={<EllipsisHorizontalCircleIcon />}
                  onClick={() => navigate(String(region.id))}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Routes>
        <Route path=':id' element={<RegionDetails />} />
        <Route path='add' element={<RegionDetails />} />
      </Routes>
    </Box>
  );
};
