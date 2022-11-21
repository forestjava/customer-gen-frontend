import { Route, Routes, useNavigate } from 'react-router-dom';
import { SortOrder, useZonesQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { Button } from '../atoms/Button';
import { Heading } from '../atoms/Heading';
import { Table } from '../atoms/Table';

import { ZoneDetails } from './ZoneDetails';

import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/solid';

export const ZonesList = () => {
  const { data } = useZonesQuery({ orderBy: { id: SortOrder.Asc } });
  const navigate = useNavigate();
  return (
    <Box variant='view'>
      <Heading className='text-lg font-bold'>Zones</Heading>
      <Box variant='row'>
        <Box className='w-full' data-todo='search' />
        <Button variant='secondary' onClick={() => navigate(`add`)}>
          Add Zone
        </Button>
      </Box>
      <Table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            
            <th>Name</th>
            
            <th>Formation</th>
            
            <th className='w-full'></th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data?.zones.map((zone) => (
            <tr key={zone.id}>
              <td>{zone.id}</td>
              
              <td>{zone.name}</td>
              
              <td>{zone.formation?.name}</td>
              
              <td className='w-full'></td>
              <td>
                <Button
                  variant='icon'
                  icon={<EllipsisHorizontalCircleIcon />}
                  onClick={() => navigate(String(zone.id))}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Routes>
        <Route path=':id' element={<ZoneDetails />} />
        <Route path='add' element={<ZoneDetails />} />
      </Routes>
    </Box>
  );
};
