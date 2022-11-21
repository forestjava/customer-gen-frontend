import { useParams } from 'react-router-dom';

import { useCompanyForm } from '../../api/forms/company';

import { Box } from '../atoms/Box';
import { Heading } from '../atoms/Heading';
import { Form } from '../atoms/Form';
import { Button } from '../atoms/Button';


import { InputString } from './InputString';

import { InputRegions } from './InputRegions';
  

export const CompanyDetails = () => {
  const { id: parameter } = useParams();
  const id = parameter ? parseInt(parameter) : undefined;

  const form = useCompanyForm(id);

  return (
    <Box variant='drawer'>
      <Heading className='text-lg font-bold'>Company Details</Heading>
      <Form className='form' onSubmit={form.submit}>
        
        <InputString label='Name' required={true} placeholder='' {...form.input('name')} />
        
        <InputString label='Icon image' required={true} placeholder='' {...form.input('icon')} />
        
        <InputString label='Logo image' required={true} placeholder='' {...form.input('logo')} />
        
        <InputRegions label='Regions' required={false} placeholder='' {...form.input('regions')} />
        
        <Box variant='row'>
          {!form.isCreate && (
            <Button variant='dangerous' {...form.button()} onClick={form.remove}>
              Remove
            </Button>
          )}
          <Box className='w-full' />
          <Button variant='primary' {...form.button('submit')}>
            {form.isCreate ? 'Add' : 'Save'}
          </Button>
          <Button variant='secondary' {...form.button()} onClick={form.close}>
            Close
          </Button>
        </Box>
      </Form>
    </Box>
  );
};
