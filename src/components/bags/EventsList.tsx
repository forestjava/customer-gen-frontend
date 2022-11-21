import { Route, Routes, useNavigate } from 'react-router-dom';
import { SortOrder, useEventsQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { Button } from '../atoms/Button';
import { Heading } from '../atoms/Heading';
import { Table } from '../atoms/Table';

import { EventDetails } from './EventDetails';

import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/solid';

export const EventsList = () => {
  const { data } = useEventsQuery({ orderBy: { id: SortOrder.Asc } });
  const navigate = useNavigate();
  return (
    <Box variant='view'>
      <Heading className='text-lg font-bold'>Events</Heading>
      <Box variant='row'>
        <Box className='w-full' data-todo='search' />
        <Button variant='secondary' onClick={() => navigate(`add`)}>
          Add Event
        </Button>
      </Box>
      <Table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            
            <th>Moment</th>
            
            <th>Message</th>
            
            <th>Device</th>
            
            <th>Priority</th>
            
            <th className='w-full'></th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data?.events.map((event) => (
            <tr key={event.id}>
              <td>{event.id}</td>
              
              <td>{event.moment}</td>
              
              <td>{event.message}</td>
              
              <td>{event.device?.name}</td>
              
              <td>{event.priority?.name}</td>
              
              <td className='w-full'></td>
              <td>
                <Button
                  variant='icon'
                  icon={<EllipsisHorizontalCircleIcon />}
                  onClick={() => navigate(String(event.id))}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Routes>
        <Route path=':id' element={<EventDetails />} />
        <Route path='add' element={<EventDetails />} />
      </Routes>
    </Box>
  );
};
