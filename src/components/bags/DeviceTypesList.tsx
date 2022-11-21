import { Route, Routes, useNavigate } from 'react-router-dom';
import { SortOrder, useDeviceTypesQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { Button } from '../atoms/Button';
import { Heading } from '../atoms/Heading';
import { Table } from '../atoms/Table';

import { DeviceTypeDetails } from './DeviceTypeDetails';

import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/solid';

export const DeviceTypesList = () => {
  const { data } = useDeviceTypesQuery({ orderBy: { id: SortOrder.Asc } });
  const navigate = useNavigate();
  return (
    <Box variant='view'>
      <Heading className='text-lg font-bold'>DeviceTypes</Heading>
      <Box variant='row'>
        <Box className='w-full' data-todo='search' />
        <Button variant='secondary' onClick={() => navigate(`add`)}>
          Add DeviceType
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
          {data?.deviceTypes.map((deviceType) => (
            <tr key={deviceType.id}>
              <td>{deviceType.id}</td>
              
              <td>{deviceType.name}</td>
              
              <td className='w-full'></td>
              <td>
                <Button
                  variant='icon'
                  icon={<EllipsisHorizontalCircleIcon />}
                  onClick={() => navigate(String(deviceType.id))}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Routes>
        <Route path=':id' element={<DeviceTypeDetails />} />
        <Route path='add' element={<DeviceTypeDetails />} />
      </Routes>
    </Box>
  );
};
