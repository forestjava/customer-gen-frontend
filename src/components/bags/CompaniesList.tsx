import { Route, Routes, useNavigate } from 'react-router-dom';
import { SortOrder, useCompaniesQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { Button } from '../atoms/Button';
import { Heading } from '../atoms/Heading';
import { Table } from '../atoms/Table';

import { CompanyDetails } from './CompanyDetails';

import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/solid';

export const CompaniesList = () => {
  const { data } = useCompaniesQuery({ orderBy: { id: SortOrder.Asc } });
  const navigate = useNavigate();
  return (
    <Box variant='view'>
      <Heading className='text-lg font-bold'>Companies</Heading>
      <Box variant='row'>
        <Box className='w-full' data-todo='search' />
        <Button variant='secondary' onClick={() => navigate(`add`)}>
          Add Company
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
          {data?.companies.map((company) => (
            <tr key={company.id}>
              <td>{company.id}</td>
              
              <td>{company.name}</td>
              
              <td className='w-full'></td>
              <td>
                <Button
                  variant='icon'
                  icon={<EllipsisHorizontalCircleIcon />}
                  onClick={() => navigate(String(company.id))}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Routes>
        <Route path=':id' element={<CompanyDetails />} />
        <Route path='add' element={<CompanyDetails />} />
      </Routes>
    </Box>
  );
};
