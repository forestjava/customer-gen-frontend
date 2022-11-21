import { Route, Routes, useNavigate } from 'react-router-dom';
import { SortOrder, useSmartPolesQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { Button } from '../atoms/Button';
import { Heading } from '../atoms/Heading';
import { Table } from '../atoms/Table';

import { SmartPoleDetails } from './SmartPoleDetails';

import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/solid';

export const SmartPolesList = () => {
  const { data } = useSmartPolesQuery({ orderBy: { id: SortOrder.Asc } });
  const navigate = useNavigate();
  return (
    <Box variant='view'>
      <Heading className='text-lg font-bold'>SmartPoles</Heading>
      <Box variant='row'>
        <Box className='w-full' data-todo='search' />
        <Button variant='secondary' onClick={() => navigate(`add`)}>
          Add SmartPole
        </Button>
      </Box>
      <Table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            
            <th>Name</th>
            
            <th>Serial Number</th>
            
            <th>Latitude</th>
            
            <th>Longitude</th>
            
            <th>Zone</th>
            
            <th>External Location ID</th>
            
            <th>External Device ID</th>
            
            <th className='w-full'></th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data?.smartPoles.map((smartPole) => (
            <tr key={smartPole.id}>
              <td>{smartPole.id}</td>
              
              <td>{smartPole.name}</td>
              
              <td>{smartPole.serial}</td>
              
              <td>{smartPole.latitude}</td>
              
              <td>{smartPole.longitude}</td>
              
              <td>{smartPole.zone?.name}</td>
              
              <td>{smartPole.connectLocationId}</td>
              
              <td>{smartPole.connectDeviceId}</td>
              
              <td className='w-full'></td>
              <td>
                <Button
                  variant='icon'
                  icon={<EllipsisHorizontalCircleIcon />}
                  onClick={() => navigate(String(smartPole.id))}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Routes>
        <Route path=':id' element={<SmartPoleDetails />} />
        <Route path='add' element={<SmartPoleDetails />} />
      </Routes>
    </Box>
  );
};
