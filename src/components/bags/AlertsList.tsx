import { Route, Routes, useNavigate } from 'react-router-dom';
import { SortOrder, useAlertsQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { Button } from '../atoms/Button';
import { Heading } from '../atoms/Heading';
import { Table } from '../atoms/Table';

import { AlertDetails } from './AlertDetails';

import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/solid';

export const AlertsList = () => {
  const { data } = useAlertsQuery({ orderBy: { id: SortOrder.Asc } });
  const navigate = useNavigate();
  return (
    <Box variant='view'>
      <Heading className='text-lg font-bold'>Alerts</Heading>
      <Box variant='row'>
        <Box className='w-full' data-todo='search' />
        <Button variant='secondary' onClick={() => navigate(`add`)}>
          Add Alert
        </Button>
      </Box>
      <Table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            
            <th>Device</th>
            
            <th>Message</th>
            
            <th>Priority</th>
            
            <th className='w-full'></th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data?.alerts.map((alert) => (
            <tr key={alert.id}>
              <td>{alert.id}</td>
              
              <td>{alert.device?.name}</td>
              
              <td>{alert.message}</td>
              
              <td>{alert.priority?.name}</td>
              
              <td className='w-full'></td>
              <td>
                <Button
                  variant='icon'
                  icon={<EllipsisHorizontalCircleIcon />}
                  onClick={() => navigate(String(alert.id))}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Routes>
        <Route path=':id' element={<AlertDetails />} />
        <Route path='add' element={<AlertDetails />} />
      </Routes>
    </Box>
  );
};
