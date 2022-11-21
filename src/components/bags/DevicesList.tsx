import { Route, Routes, useNavigate } from 'react-router-dom';
import { SortOrder, useDevicesQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { Button } from '../atoms/Button';
import { Heading } from '../atoms/Heading';
import { Table } from '../atoms/Table';

import { DeviceDetails } from './DeviceDetails';

import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/solid';

export const DevicesList = () => {
  const { data } = useDevicesQuery({ orderBy: { id: SortOrder.Asc } });
  const navigate = useNavigate();
  return (
    <Box variant='view'>
      <Heading className='text-lg font-bold'>Devices</Heading>
      <Box variant='row'>
        <Box className='w-full' data-todo='search' />
        <Button variant='secondary' onClick={() => navigate(`add`)}>
          Add Device
        </Button>
      </Box>
      <Table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            
            <th>Serial number </th>
            
            <th>Device Type</th>
            
            <th>UUID</th>
            
            <th>Smart Pole</th>
            
            <th>Name</th>
            
            <th>External Parameter Index</th>
            
            <th className='w-full'></th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data?.devices.map((device) => (
            <tr key={device.id}>
              <td>{device.id}</td>
              
              <td>{device.serial}</td>
              
              <td>{device.type?.name}</td>
              
              <td>{device.uuid}</td>
              
              <td>{device.smartPole?.name}</td>
              
              <td>{device.name}</td>
              
              <td>{device.connectParamIndex}</td>
              
              <td className='w-full'></td>
              <td>
                <Button
                  variant='icon'
                  icon={<EllipsisHorizontalCircleIcon />}
                  onClick={() => navigate(String(device.id))}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Routes>
        <Route path=':id' element={<DeviceDetails />} />
        <Route path='add' element={<DeviceDetails />} />
      </Routes>
    </Box>
  );
};
